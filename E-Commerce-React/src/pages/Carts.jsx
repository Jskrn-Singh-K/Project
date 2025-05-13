// import { useContext } from "react"
// import { CartContext } from './../App';
// import { useEffect, useState } from "react";
// function Cart() {
//   //  const {removeToCart}=useContext(CartContext);
//   //  const cart=JSON.parse(localStorage.getItem('cart'));

import CartPayment from "../Components/CartPayment";
import CartShoppingBag from "../Components/CartShoppingBag";
import SimilarProducts from "../Components/SimilarProducts";
import { useEffect, useState } from "react";

function Cart(){

const [cart, setCart] = useState([]);
      useEffect(()=>{
        setCart(JSON.parse(localStorage.getItem("Cart")))
      },[]
      )
 
  return(
    <div>
      <div className="text-5xl p-10">
        Shopping Cart
      </div>
      <div className="grid grid-cols-2">
        <CartShoppingBag cart={cart}/>
        <CartPayment cart={cart}/>  
      </div>
      <div>
        <SimilarProducts />
      </div>
    </div>
  )
}
export default Cart;