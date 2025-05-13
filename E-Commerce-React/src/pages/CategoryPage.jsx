import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import axios from 'axios';
import {  useCallback, useContext,useEffect,useState } from "react";
import { CartContext } from '../App';
import useFetcher from "../fetcher/FetchProduct";
import { Button } from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import Filter from "../Components/CategoryPage/Filter";
function CategoryPage() {
    const [check,setCheck]=useState(false);
    
    
    const {addToCart}=useContext(CartContext);

    const [value,setValue]=useState("");
    const [visible,setVisible]=useState(false);
    const [tic,setTic]=useState(false);
    const [searchParams,setSearchParams] = useSearchParams();
    const navigate=useNavigate();
    const { categoryName } = useParams();
    const name=categoryName.toLowerCase();     
  useEffect(() => {

        const fetchFilteredProducts = async () => {
          const params = Object.fromEntries([...searchParams.entries()]);
          try {
            const res = await axios.get(`http://localhost:4000/api/products?category=${name}`, { params });
            setValue(res);
          } catch (err) {
            console.error(err);
          }
        };
        fetchFilteredProducts();
      }, [searchParams,name]);


    
      const handleFilterChange =useCallback( (key, value) => {
        
        const newParams = new URLSearchParams(searchParams.toString());
        console.log(newParams);
        if(value==""||value==undefined||value==null)
            {
                newParams.delete(key);
            }
            else{
                newParams.set(key, value); 
            }
        setSearchParams(newParams);
        //? dont update the whole url just the param
        navigate(`?${newParams.toString()}`);


      },[searchParams, navigate]);
      const handleSortChange  = (key, value,item) => {
        const newParams = new URLSearchParams(window.location.search);
        if (item && item !== "") {
            newParams.set('sort', item);
        }
        if(value==""||value==undefined||value==null)
            {
                newParams.delete(key);
            }
            else{
                newParams.set(key, value); 
            }
            setSearchParams(newParams);
            //? dont update the whole url just the param
            navigate(`?${newParams.toString()}`);
      };

    console.log(value); 
      function addCart(data){
          console.log(data.name);
          let newCart={
              id:data.id,
              title:data.name,
              image:data.image,
              price:data.price
          };
          const prevCart=JSON.parse(localStorage.getItem('Cart'))||[];
          
            const updatedCart = [...prevCart, newCart];

          localStorage.setItem('Cart',JSON.stringify(updatedCart));
        console.log(updatedCart);

      }
    const toggleFilter = (filter) => {
        setFilters((prevFilters) => ({
          ...prevFilters,
          [filter]: !prevFilters[filter],
        }));
      };

      const handleProductClick = (id) => {
         navigate(`/product/${id}`);
      }; 

      const addWhishlist=(category)=>{
        const data=JSON.parse(localStorage.getItem("whishlist"))||[];
        const updatedWhishlist=[...data,category];
        localStorage.setItem(JSON.stringify(updatedWhishlist));
      }

    return (

        <div>
        {value?.data?.data?.allProducts && value.data.data.allProducts[0] ? (
      <div className="headingMens h-44  mt-10">
        <span className="font-medium text-7xl p-6 mt-16">{value.data.data.allProducts[0].category}</span>
      </div>
) : (
  <p>Loading...</p>
)}
      <div className="w-full">
            <Filter searchParams={searchParams} setSearchParams={setSearchParams} />
          </div>
        <div className="grid ">
          
            <div className="grid grid-cols-2 md:grid-cols-4 overflow-x-auto w-screen gap-0">
    {value?.data?.data?.allProducts ? (
      value.data.data.allProducts.map((item,index) => (
        <div key={index} className="min-w-[200px] w-full bg-zinc-50 p-5 m-0" onClick={()=>handleProductClick(item._id)}>
              <img
                src={item.image[0]}
                alt={item.name || `Product ${index + 1}`}
                className="w-full h-96 object-cover rounded"
              />
              <p className="mt-2 pl-2 text-xl">{item.name}</p>
              <span className="mt-2 pl-2 line-through text-red-500 text-lg" >${item.price}</span>
              <span className="pl-9 text-lg">${item.salePrice}</span>
            
          {/* <button onClick={() => addWhishlist(category)}>Add to Whishlist</button>
          <button onClick={() => addCart(category)}>Add to Cart</button> */}
          </div>
      ))
    ) : (
      <p>Loading...</p>
    )}
  </div>
        
        </div>

        </div>
    )}
  
  export default CategoryPage;
  