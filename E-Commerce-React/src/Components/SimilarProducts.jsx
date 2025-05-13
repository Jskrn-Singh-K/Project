import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SimilarProducts({category,subCategory}){
    console.log(category,subCategory);
    const [val,setVal]=useState([]);
    useEffect(()=>{
        const fetchProduct=(async()=>{
           const res=await axios.get(`http://localhost:4000/api/products?category=${category}&subCategory=${subCategory}`);
           console.log(res);
           setVal(res.data.data.allProducts || []);

        });
        fetchProduct();
    },[category,subCategory])
    const navigate=useNavigate();
    const handleProductClick = (id) => {
        navigate(`/product/${id}`);
     }; 

    console.log(val);
    return(
        <div className="m-5">
        <p className="text-xl font-semibold mb-4">Similar Products</p>
        <div className="grid grid-cols-2 md:grid-cols-4 overflow-x-auto  gap-0">
          {val.map((item, index) => (
            <div key={index} className="min-w-[200px] w-full bg-zinc-50 p-5 m-0" onClick={()=>handleProductClick(item._id)}>
              <img
                src={item.image[0]}
                alt={item.name || `Product ${index + 1}`}
                className="w-full h-96 object-cover rounded"
              />
              <p className="mt-2 pl-2 text-xl">{item.name}</p>
              <span className="mt-2 pl-2 text-lg line-through text-red-500" >${item.price}</span>
              <span className="pl-9 text-lg">${item.salePrice}</span>
            </div>
          ))}
        </div>
      </div>
      
    )
}
export default SimilarProducts;