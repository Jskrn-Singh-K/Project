import { useEffect, useState } from "react";

 function FetchProduct(data) {
    const [value,setValue]=useState([]);

   useEffect(()=>{


   fetch(`http://localhost:4000/api/products/categories/${data}`)
    .then(res=>res.json())
    .then(el=>setValue(el))
    .catch(err => {
      console.error('Fetch error:', err);
    });
    },[]) 

    return { value};
  }
  export default FetchProduct;
  