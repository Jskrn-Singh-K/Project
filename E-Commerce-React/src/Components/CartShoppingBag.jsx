// function CartShoppingBag(){
//     return(<div>
//         <h2>Shopping Bag</h2>
//         <div>
//         <div >
//                 <span>Brown Bag</span>
//                 <img className="w-72" src="https://res.cloudinary.com/derc8yoxs/image/upload/v1736292024/craiyon_185332_a_brown_bag_with_white_background_mtf9gw.png"/>
//                 <span>$231</span>
//                 <button>Add to Cart</button>
//                 </div>
//         </div>
//     </div>)
// }
// export default CartShoppingBag;

import { useContext } from "react"
import { CartContext } from './../App';
import { useEffect, useState } from "react";
function CartShoppingBag({cart}) {
  //  const {removeToCart}=useContext(CartContext);
  //  const cart=JSON.parse(localStorage.getItem('cart'));
      // const [cart, setCart] = useState([]);
      // useEffect(()=>{
      //   setCart(JSON.parse(localStorage.getItem("Cart")))
      // },[]
      // )
      //  useEffect(()=>{
      //  fetch("http://localhost:4000/api/cart").then(res=>res.json()).then(data=>setCart(data));
      //  },[])
      console.log(cart.length);
  return (
    <div className="flex flex-col gap-7">
        {cart&&cart.length>0?
        cart.map(item => (
          <div className="flex flex-row gap-4 hover:bg-slate-300" key={item._id}>
             <div><img src={item.image} alt={item.title} /></div>
             <div className="flex flex-col"><span>{item.title}</span>
            <span>{item.price}</span></div>
          </div>
        )):<p>
        <span className="text-gray-950">our Shopping Bag is empty!</span><br/>
        <span>Sign in to save or access already saved items in your shopping bag.</span></p>}
    
      </div>
      
  )
}
export default CartShoppingBag;
