import { useEffect, useState } from "react";

 function useFetchCart() {
    const [value,setValue]=useState([]);

   useEffect(()=>{


   fetch(`https://fakestoreapi.com/carts`)
    .then(res=>res.json())
    .then(el=>setValue(el))
    .catch(err => {
      console.error('Fetch error:', err);
    });
    },[]) 

    return { value};
  }
  export default useFetchCart;
  