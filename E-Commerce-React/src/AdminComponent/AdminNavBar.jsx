import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Link } from "react-router-dom";
import axios from "axios";

function AdminNavBar() {
  const [visible, setVisible] = useState(false);

  // Sample data for categories and subcategories
  const [category,setCategory] =useState();
const navigate=useNavigate();
  const handleProduct=()=>{
    navigate("/admin/Product");
  };
  const handleUser=()=>{
    navigate("/admin/User");
  };
  const handleOrder=()=>{
    navigate("/admin/Order");
  };
  const handleAnalysis=()=>{
    navigate("/admin/Analysis");
  };



  return (
    <div className="fleex flex-col items-center m-2">
      <div className=" ">
        <span onClick={() => handleProduct()} className="cursor-pointer p-4 text-xl">
         Products
        </span>
      </div>

      <div className=" ">
        <span onClick={() => handleUser()} className="cursor-pointer p-4 text-xl">
         Users
        </span>
      </div>
      <div className=" ">
        <span onClick={() => handleOrder()} className="cursor-pointer p-4 text-xl">
         Orders
        </span>
      </div>
      <div className=" ">
        <span onClick={() => handleAnalysis()} className="cursor-pointer p-4 text-xl">
         Analysis
        </span>
      </div>

    
    </div>
  )
}

export default AdminNavBar;
