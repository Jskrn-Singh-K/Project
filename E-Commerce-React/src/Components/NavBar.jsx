import { useEffect, useState } from "react";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Link } from "react-router-dom";
import axios from "axios";

function NavBar() {
  const [visible, setVisible] = useState(false);

  // Sample data for categories and subcategories
  const [category,setCategory] =useState();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/products/categories/subcategory');
        setCategory(res.data.data.Subcategory); 
        console.log(res.data.data.Subcategory);
      } catch (err) {
        console.log(err);
        // Navigation like this must be inside a component or use useNavigate
        // Example:
        // navigate('/servererror');
      }
    };
  
    fetchCategory();
  }, []);

  return (
    <div>
      {/* Menu Icon to Toggle Visibility */}
      <div className="flex justify-between items-center p-4 ">
        <span onClick={() => setVisible(!visible)} className="cursor-pointer">
          <MenuOutlinedIcon fontSize="large"/>
        </span>
      </div>

      {/* Navigation Menu */}
      {visible && (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-85 z-10">
          <div className="flex justify-end p-6">
            {/* Close Button */}
            <span
              onClick={() => setVisible(false)}
              className="text-white text-3xl cursor-pointer"
            >
              &times;
            </span>
          </div>

          <div className="flex justify-center mt-10 h-full ">
          <div className="flex flex-row w-full">
  {category.map((el) => {
    return<div className="w-96"> <h1 key={el.name} className="mr-4 mb-40 text-white text-4xl cursor-pointer" onClick={() => setVisible(false)}><Link to={`/category/${el.name}`}>{el.name}</Link></h1> 
    <ul className="space-y-10  ">
        {el.subcategories.map((sub, i) => (
          <li key={i} className="cursor-pointer hover:underline text-white text-lg" onClick={() => setVisible(false)}>
            {sub}
          </li>
        ))}
      </ul>
    </div>
    ;
  })}
</div>

          </div>
        </div>
      )}
    </div>
  );
}

export default NavBar;
