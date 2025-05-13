import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
 function  Search() {
    const [value,setValue]=useState();
    const [searchParams]=useSearchParams();
    useEffect(()=>{
        const query= searchParams.toString();
        const fetchDst=async() =>{
            const res=await fetch(`http://localhost:4000/search?${query}`)
            
            const data=await res.json();
            
            setValue(data)}
    fetchDst();
    },[searchParams])
    console.log(value);
            return(
        <div>
            <div className="col-span-3">
            {value?.data?.result ? (
            value.data.result.map((category)=>(
                    
                    <div key={category._id}>
                    <span>{category.name}</span>
                    <img className="w-72" src={category.image}/>
                    <span>{category.price}</span>
                    <button onClick={()=>addCart(category)}>Add to Cart</button>
                    </div>
                
            ))):(
                <p>Loading...</p>
            )}
         </div>  
        </div>
        )
  }
  export default Search;