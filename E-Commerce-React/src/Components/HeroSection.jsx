import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function HeroSection() {
  const [val,setVal]=useState([]);
  useEffect(()=>{
      const fetchProduct=(async()=>{
          try
          {
          const res=await axios.get(`http://localhost:4000/api/products?display=homeDisplay`);
          console.log(res);
          setVal(res.data.data.allProducts || []);
          }
          catch(err)
          {
              console.error("Failed to fetch featured products:", err);
          }

      });
      fetchProduct();
  },[]);

  const navigate=useNavigate();
  const handleProductClick = (id) => {
      navigate(`/product/${id}`);
   }; 

  return (
    <div className="grid md:grid-cols-2 sm:grid-cols-1">
    <div className="h-screen flex justify-center items-center">
      <img src={val[0]?.image[0]} className="max-h-full max-w-full object-contain" />
    </div>
    <div className="h-screen flex justify-center items-center">
      <img src={val[3]?.image[0]} className="max-h-full max-w-full object-contain" />
    </div>
  </div>
  
  );
}

export default HeroSection;
