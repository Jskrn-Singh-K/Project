import axios from "axios";
import SimilarProducts from "../Components/SimilarProducts";
import FavoriteIcon from '@mui/icons-material/Favorite';
import useCart from "../hooks/useCart";

function WhishlistProduct({value,setValue}){

   const removeWhishlist=(id)=>{
    const updated = value.filter(item => item._id !== id);
    localStorage.setItem("whishlist", JSON.stringify(updated));
    setValue(updated);
  }
  
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
    localStorage.removeItem("whishlist");
  console.log(updatedCart);
  
  }
    return(
        <div>

      
  <div className="text-6xl mb-4">Wishlist</div>
  <span className="text-lg text-gray-600">{value.length||0} Item</span>

  <div className="grid grid-cols-2 md:grid-cols-4 overflow-x-auto w-screen gap-0">
    {value && value.length > 0 ? (
      value.map((product) => (
        <div
          key={product._id}
          className="min-w-[200px] w-full bg-zinc-50 p-5 m-0 relative"
        >
          <span className="absolute right-5 w-fit" onClick={()=>removeWhishlist(product._id)}>
            <FavoriteIcon/>
          </span>
          <img
            className="w-full h-96 object-cover rounded"
            src={product.image[0]}
            alt={product.name}
          />
          <div className="mt-2 pl-2 text-xl">{product.name}</div>
          <div className="mt-2 pl-2 text-lg ">${product.price}</div>
          <button
            className="w-full mt-4 bg-black text-white py-2 rounded hover:bg-gray-800 transition"
            onClick={() => useCart(product)}
          >
            Add to Cart
          </button>
        </div>
      ))
    ) : (
      <div className="text-gray-500 col-span-full">No items in your wishlist.</div>
    )}
  </div>
  </div>
      
    )
}
export default WhishlistProduct;