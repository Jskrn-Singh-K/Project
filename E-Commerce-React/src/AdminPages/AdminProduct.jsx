import { useState,useEffect } from "react";
import {  useNavigate} from 'react-router-dom';
import axios from "axios";
function AdminProduct() {
  const [value,setValue]=useState([]);
  const navigate = useNavigate();
  // const [visible,setVisible]=useState(false);
  // const [tic,setTic]=useState(false);
  // const [searchParams,setSearchParams] = useSearchParams();
  // const navigate=useNavigate();
  // const { categoryName } = useParams();
  // const name=categoryName.toLowerCase();     
useEffect(() => {

      const fetchProducts = async () => {
      
        try {
          const res = await axios.get(`http://localhost:4000/api/products`);
          setValue(res.data.data.allProducts);
        } catch (err) {
          console.error(err);
        }
      };
      fetchProducts();
    }, []);

    const handleProductClick = (id) => {
      navigate(`/admin/products/${id}`);
   }; 
    return (
  
        <div>
            <div className="flex flex-row justify-between">
                <span>
                  All Products
                </span>
                <span onClick={()=>{navigate(`/admin/add/products`)}}>
                  ADD New Products
                </span>
            </div>
            <div className="grid md:grid-cols-3">
              {value?.map((item,index)=>{
                return(
                <div key={index} className="min-w-[200px] w-full bg-zinc-50 p-5 m-0" onClick={()=>handleProductClick(item._id)}>
                <img
                  src={item.image[0]}
                  alt={item.name || `Product ${index + 1}`}
                  className="w-full h-96 object-cover rounded"
                />
                <p className="mt-2 pl-2 text-xl">{item.name}</p>
                <span className="mt-2 pl-2 line-through text-red-500 text-lg" >${item.price}</span>
                <span className="pl-9 text-lg">${item.salePrice}</span>
            </div>
              )})

              }
            </div>
        </div>
    )
  }

export default AdminProduct;