import FeaturedProduct from "../Components/FeaturedProduct";
import WhishlistProduct from "../Components/WhishlistProduct";
import React, { useEffect, useState } from 'react';

function Whishlist() {
  const [value,setValue]=useState([]);
  const [categories,setCategories]=useState([]);
  useEffect(() => {
    const fetchFavorite =  () => {
    const items = JSON.parse(localStorage.getItem("whishlist")) || [];
    setValue(items);
   

    console.log(items.length);
  }     
    fetchFavorite();
}, []);
useEffect(() => {
  if (value.length > 0) {
    const category = value.map(item => item.category);
    setCategories(category);
  }
}, [value]);
console.log(typeof(categories));
  return (
    <div className="px-5 mt-4 mb-9">
      <div>
      <WhishlistProduct value={value} setValue={setValue}/>

      </div>
     <div>
      <FeaturedProduct category={categories}/>
     </div>
</div>

  );
  }
  export default Whishlist;

  