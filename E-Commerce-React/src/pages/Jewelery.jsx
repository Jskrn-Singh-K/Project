import {  useContext,useState } from "react";
import { CartContext } from './../App';
import useFetcher from "./../fetcher/FetchProduct";
import { Button } from "@mui/material";

 function Jwellery() {
    const [check,setCheck]=useState(false);
    const [filters, setFilters] = useState({
        category: false,
        color: false,
        brand: false,
        size: false,
      });
    
    const {addToCart}=useContext(CartContext);
    const {value}=useFetcher("Jwellery");
    console.log(value); 
    function addCart(data){
        console.log(data.name);
        const newCart={
            id:data.id,
            title:data.name,
            image:data.image,
            price:data.price
        }
        addToCart(newCart);
       console.log(newCart);

    }
    const toggleFilter = (filter) => {
        setFilters((prevFilters) => ({
          ...prevFilters,
          [filter]: !prevFilters[filter],
        }));
      };


    return (


        <div>
        <div className="headingMens h-44 content-start">
            <span className="font-medium text-4xl p-6">
                Jwellery </span>
        </div>
        <div className="grid grid-cols-4 gap-4">
            <div>
            <div className="">
                <div className="font-medium text-2xl p-3 my-4">
                 <span>Filter</span>
            </div>
                </div>
                <div className="font-medium text-2xl p-3 my-4">
              <p onClick={()=>toggleFilter("category")}>
                 <span>Category</span>
                {filters.category?<span className="float-end">-</span>:<span className="float-end">+</span>}</p>
                {filters.category&&<div>
                <div>
                    Outwear
                </div>
                <div>
                Pants
            </div>
            </div>
                }
                </div>
                <div className="font-medium text-2xl p-3 my-4">
              <p onClick={()=>toggleFilter("color")}>
                 <span>Color</span>
                {filters.color?<span className="float-end">-</span>:<span className="float-end">+</span>}</p>
                {filters.color&&<div>
                <div>
                    Outwear
                </div>
                <div>
                Pants
            </div>
            </div>
                }
                </div>
                <div className="font-medium text-2xl p-3 my-4">
              <p onClick={()=>toggleFilter("brand")}>
                 <span>Brand</span>
                {filters.brand?<span className="float-end">-</span>:<span className="float-end">+</span>}</p>
                {filters.brand&&<div>
                <div>
                    Outwear
                </div>
                <div>
                Pants
            </div>
            </div>
                }
                </div>
                <div className="font-medium text-2xl p-3 my-4">
              <p onClick={()=>toggleFilter("size")}>
                 <span>Size</span>
                {filters.size?<span className="float-end">-</span>:<span className="float-end">+</span>}</p>
                {filters.size&&<div>
                <div>
                    Outwear
                </div>
                <div>
                Pants
            </div>
            </div>
                }
                </div>
                <div className="font-medium text-2xl p-3 my-4">
                <span>Clear All</span>
                </div>
               
            </div>
            
        <div className="col-span-3">
            {value?.data?.Category ? (
            value.data.Category.map((category)=>(
                    
                    <div key={category._id}>
                    <span>{category.name}</span>
                    <img className="w-72" src={category.image}/>
                    <span>{category.price}</span>
                    <button onClick={()=>addCart(category)}>Add to Cart</button>
                    </div>
                
            ))):(
                <p>Loading...</p>
            )}
         <div>

         </div>
        </div>
        
        </div>
        </div>
    )
  }
  export default Jwellery;
  