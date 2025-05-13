import { useEffect, useState } from 'react'
import HomeTopCarousel from './../Components/HomeTopCarousel';
import HomeMostViewed from '../Components/HomeMostViewed';
import HomeFeaturing from '../Components/HomeFeaturing';
import HomeFooter from '../Components/HomeFooter';
import HomeNewArrival from '../Components/HomeNewArrival';
import HomeTwoImage from '../Components/HomeTwoImage';
import HeroSection from '../Components/HeroSection';
function Home() {
  const [product, setProduct] = useState([])
  useEffect(()=>{
  fetch("http://localhost:4000/api/products?IsFeatured=true").then(res=>res.json()).then(data=>setProduct(data.data.allProducts));
  },[])
 console.log(product);
 function addCart(item){
  localStorage.setItem('Cart',JSON.stringify(item));
 }


  return (

    <div className='body'>
       <div className='topImage'>
          <HomeTopCarousel/>
          </div>
          <div className='topImage'>
          <HeroSection/>
          </div>
          <div className='NewArrivals'>
            <HomeNewArrival/>
          </div>
      <div className='topSale'>
        <HomeMostViewed/>
      </div>  
    
    <div>
      
      {/* <div className='grid grid-cols-3 gap-6'>      
           { product.map((item)=>(
               <div className='w-fit ' key={item.id}> <span>{item.title}</span>
               <img className='w-72' src={item.image}/>
               <span>{item.price}</span>
               <span><button onClick={addCart(item)}>Add to cart</button></span>
               </div>
           ))}   
      </div> */}
      
    </div>
    </div>
  )
}

export default Home
