import { useState,useCallback } from "react";
import { Navigate ,useNavigate} from "react-router-dom";
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
function Filter({searchParams,setSearchParams}){
    
const [visible,setVisible]=useState(false);
const [tic,setTic]=useState(false);
const [open, setOpen] = useState({
    category: "",
    color: "",
    brand: "",
    size: ""
  });
  const [filters, setFilters] = useState({
          Reveiw: "",
          Rating: "",
          Price: "",
          size: "",
          sort:"",
          priceMin:""
        });
 const navigate=useNavigate();
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

    const toggleFilter = (filter) => {
        setFilters((prevFilters) => ({
          ...prevFilters,
          [filter]: !prevFilters[filter],
        }));
      };

return(
    <div>

    
    <div className="flex justify-between items-center p-4 ">
        <span onClick={() => setVisible(!visible)} className="cursor-pointer text-xl">
          Filter<FilterListIcon fontSize="large"/>
        </span>
        <span onClick={() => setTic(!tic)} className="cursor-pointer ml-auto text-xl">
          Sort<SortIcon fontSize="large"/>
        </span>
      </div>
    <div className="">
            
    {(tic)&& <div className="font-medium text-2xl p-3 my-4 z-10 right-0 absolute  bg-slate-50 w-96 ">
             <p onClick={()=>toggleFilter("sort")}>
                <span>Sort By</span>
               {filters.sort?<span className="float-end">-</span>:<span className="float-end">+</span>}</p>
               {filters.sort&&<div>
               <div>
               <input type='checkbox' id="Asc" name="Asc" value="Asc" onChange={(e)=>handleSortChange("order",e.target.checked?e.target.value:e.target.value="",'price')}/>
               <label for="Asc"> Low to High</label><br/>
                   
               </div>
               <div>
               <input type='checkbox' id="Asc" name="Asc" value="Asc" onChange={(e)=>handleSortChange("order",e.target.checked?e.target.value:e.target.value="",'price')}/>
               <label for="Asc">High To Low</label><br/>
           </div>
           </div>
               }
               </div>}
         {visible&&  
         <div className="absolute top-0 left-0 w-96 h-full bg-slate-50 z-10">

           <div className="flex flex-row items-center">
             <div className="font-large text-4xl p-3 my-4">
               <span>Filter</span>
             </div>
             <div className="font-large text-4xl p-3 mt-2 ml-auto cursor-pointer" onClick={() => setVisible(false)}>
               <span>&times;</span>
             </div>
           </div>
               <div className="font-medium text-2xl p-3 my-4">
             <p onClick={()=>toggleFilter("category")}>
                <span>Category</span>
               {open.category?<span className="float-end">-</span>:<span className="float-end">+</span>}</p>
               {filters.category&&<div>
               <div>
               <input type='checkbox' id="jacket" name="jacket" value="jacket" onChange={(e)=>handleFilterChange("Category",e.target.checked?e.target.value:e.target.value="")}/>
               <label for="jacket"> Jacket</label><br/>
               </div>
               <div>
               <input type='checkbox' id="Pants" name="Pants" value="Pants" onChange={(e)=>handleFilterChange("Category",e.target.checked?e.target.value:e.target.value="")}/>
               <label for="Pants"> Pants</label><br/>
           </div>
           </div>
               }
               </div>
               <div className="font-medium text-2xl p-3 my-4">
             <p onClick={()=>toggleFilter("color")}>
                <span>Color</span>
               {open.color?<span className="float-end">-</span>:<span className="float-end">+</span>}</p>
               {filters.color&&<div>
               <div>
               <input type='checkbox' id="Black" name="Black" value="Black" onChange={(e)=>handleFilterChange("Color",e.target.checked?e.target.value:e.target.value="")}/>
               <label for="Black"> Black</label><br/>
               </div>
               <div>
               <input type='checkbox' id="Red" name="Red" value="Red" onChange={(e)=>handleFilterChange("Color",e.target.checked?e.target.value:e.target.value="")}/>
               <label for="Red"> Red</label><br/>
           </div>
           </div>
               }
               </div>
               <div className="font-medium text-2xl p-3 my-4">
             <p onClick={()=>toggleFilter("brand")}>
                <span>Brand</span>
               {open.brand?<span className="float-end">-</span>:<span className="float-end">+</span>}</p>
               {filters.brand&&<div>
               <div>
               <input type='checkbox' id="Nike" name="Nike" value="Nike" onChange={(e)=>handleFilterChange("Brand",e.target.checked?e.target.value:e.target.value="")}/>
               <label for="Nike"> Nike</label><br/>
               </div>
               <div>
               <input type='checkbox' id="Puma" name="Puma" value="Puma" onChange={(e)=>handleFilterChange("Brand",e.target.checked?e.target.value:e.target.value="")}/>
               <label for="Puma"> Puma</label><br/>
           </div>
           </div>
               }
               </div>
               
               <div className="font-medium text-2xl p-3 my-4">
             <p onClick={()=>toggleFilter("size")}>
                <span>Size</span>
               {open.size?<span className="float-end">-</span>:<span className="float-end">+</span>}</p>
               {filters.size&&<div>
               <div>
                   <input type='checkbox' id="s" name="s" value="s" onChange={(e)=>handleFilterChange("size",e.target.checked?e.target.value:e.target.value="")}/>
                   <label for="s"> S</label><br/>
               </div>
               <div>
               <input type='checkbox' id="m" name="m" value="m"  onChange={(e)=>handleFilterChange("size",e.target.checked?e.target.value:e.target.value="")}/>
               <label for="m"> M</label><br/>
           </div>
           <div>
               <input type='checkbox' id="l" name="l" value="l" onChange={(e)=>handleFilterChange("size",e.target.checked?e.target.value:e.target.value="")}/>
               <label for="l"> L</label><br/>
           </div>
           </div>
               }
               </div>
               <div className="font-medium text-2xl p-3 my-4">
               <span>Clear All</span>
               </div>
              
           </div>}
           </div>
           </div>
)
};

export default Filter;