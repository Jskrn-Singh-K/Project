import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function HomeMostViewed() {
  const [val,setVal]=useState([]);
    useEffect(()=>{
        const fetchProduct=(async()=>{
            try
            {
            const res=await axios.get(`http://localhost:4000/api/products/mostviewed`);
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
    <div className="m-5">
      <h2 className="text-3xl font-bold mb-8">Most Viewed</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 overflow-x-auto gap-0">
          {val.map((item, index) => (
            <div key={index} className="min-w-[200px] w-full bg-zinc-50 p-5 m-0" onClick={()=>handleProductClick(item._id)}>
              <img
                src={item.image[0]}
                alt={item.name || `Product ${index + 1}`}
                className="w-full h-96 object-cover rounded"
              />
              <p className="mt-2 pl-2">{item.name}</p>
              <span className="mt-2 pl-2 line-through text-red-500" >${item.price}</span>
              <span className="pl-9">${item.salePrice}</span>
            </div>
          ))}
        </div>
    </div>
  );
}

export default HomeMostViewed;
