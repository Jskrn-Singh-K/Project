import AdminNavBar from "./AdminNavBar";
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
const AdminNavigation = ()=>{
    const [value, setValue] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
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
    
return(
    <div>


    <div className="flex flex-row justify-between p-3">
        <div>
            EverDay
        </div>

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
        <div className="pr-6">
            <span>
                Admin
            </span>
        </div>
    </div>
    
    </div>
)
}

export default AdminNavigation;