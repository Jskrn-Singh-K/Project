import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function FeaturedProduct({category}){
    
    const [val,setVal]=useState([]);
    console.log(category);
    console.log(typeof(category));
    useEffect(()=>{
        const fetchProduct=(async()=>{
            try{
                let url="";
                if(category){
                    category.foreach((item)=>{
                        url+=`&category=${item}`
                    })
                    
                    category=category.join(",");
                }
                
           const res=await axios.get(`http://localhost:4000/api/products?display=isFeatured${url}`);
           console.log(res);
           setVal(res.data.data.allProducts || []);
            }
            catch(err){
                console.error("Failed to fetch featured products:", err);
            }

        });
        fetchProduct();
    },[category]);



    const navigate=useNavigate();
    const handleProductClick = (id) => {
        navigate(`/product/${id}`);
     }; 

    return(
        <div className="m-5" >
        <p className="text-xl font-semibold mb-4">Featured Products</p>
        <div className="grid grid-cols-2 md:grid-cols-4 overflow-x-auto w-screen gap-0">
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
      
    )
}
export default FeaturedProduct;