function useCart(data){
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
export default useCart;