import { useState,useEffect } from "react";
import {  useNavigate} from 'react-router-dom';
import axios from "axios";
function AdminOrder() {
  const [value,setValue]=useState([]);
  const navigate = useNavigate();
 

    console.log(value);
    const handleOrderClick = (id) => {
      navigate(`/admin/order/${id}`);
   }; 
   const total=0;
    return (
  
        <div>
            <div className="flex flex-row justify-between">
                <span>
                  All Orders
                </span>
                <span onClick={()=>{navigate(`/admin/add/order`)}}>
                  ADD New Orders
                </span>
            </div>
            <div className="grid md:grid-cols-3" >
              {value?.map((item,index)=>{
                return(
                  <div onClick={()=>handleOrderClick(item?._id)}>
                  {item.products.map((product, idx) => (
                <div key={idx} className="min-w-[200px] w-full bg-zinc-50 p-5 m-0">
                  <img
                    src={product?.image?.[0]}
                    alt={product?.name || `Product ${idx + 1}`}
                    className="w-full h-96 object-cover rounded"
                  />
                  <p className="mt-2 pl-2 text-xl">{product?.name}</p>
                </div>
                
                ))}
                <p className="pl-2 mt-2 text-lg font-semibold">
                Total Price: ${item.products.reduce((sum, p) => sum + (p?.price || 0), 0)}
              </p>

            
            </div>
              )})

              }

            </div>
            
        </div>
    )
  }

export default AdminOrder;