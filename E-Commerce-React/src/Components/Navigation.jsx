import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import NavBar from './NavBar';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SearchIcon from '@mui/icons-material/Search';
import Home from '../pages/Home';

function Navigation() {
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const sanitizeInput = (input) => {
    return input.replace(/[^\w\s-]/gi, '');
  };
  const handleSubmit = (value) => {
    const newParams = new URLSearchParams(searchParams.toString());
    value =sanitizeInput(value);
    newParams.set("search", value);
    setSearchParams(newParams);
    navigate(`/search?${newParams.toString()}`);
  };

  function handleSearchChange(event) {
    setValue(event.target.value);
  }

  return (
    <div className="p-4 border-b pb-8">
      <div className="flex items-center justify-between gap-6">

        {/* Logo */}
        <div className="flex-shrink-0" onClick={()=>navigate("/Home")}>
          <h1 className="text-3xl font-bold">EverDay</h1>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-xl">
          <div className="flex">
            <input 
              type="text" 
              placeholder="Search..." 
              value={value} 
              onChange={handleSearchChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button 
              onClick={() => handleSubmit(value)} 
              className="px-4 bg-black text-white rounded-r-md hover:bg-gray-800 flex items-center justify-center"
            >
              <SearchIcon />
            </button>
          </div>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-3">
          <Link to="/Login" className="text-gray-600 hover:text-black">
            <PersonOutlinedIcon fontSize="large" />
          </Link>
          <Link to="/Favorities" className="text-gray-600 hover:text-black">
            <FavoriteBorderOutlinedIcon fontSize="large" />
          </Link>
          <Link to="/Cart" className="text-gray-600 hover:text-black">
            <ShoppingCartOutlinedIcon fontSize="large" />
          </Link>
          <div className=" m-0 p-0" >
          <NavBar />
          </div>
          
        </div>
      
      </div>

      {/* NavBar (below in another row) */}
      

    </div>
  );
}

export default Navigation;
