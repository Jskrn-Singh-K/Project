import { createContext, useState } from 'react';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import Jewelery from './pages/jewelery';
import Mens from './pages/CategoryPage';
import Womens from './pages/Womens';
import Cart from './pages/Carts';
import AppLayout from './AppLayout';
import Electronics from './pages/Electronics';
import Product from './pages/Product';
import Favorites from './pages/Whishlist';
import Login from './pages/Login';
import Search from './pages/Search';
import ProfilePage from './pages/Profile';
import ProductDiscription from './pages/ProductDescription';
import CategoryPage from './pages/CategoryPage';
import NotFound from './pages/NotFound';
import ServerError from './pages/serverError';
import Forbidden from './pages/Forbidden';
import Dashboard from './pages/Dashboard';
import Protection from './pages/protection';
import AdminLayout from './AdminLayout';
import AdminProduct from './AdminPages/AdminProduct';
import AdminOrder from './AdminPages/AdminOrder';
import AdminUser from './AdminPages/AdminUser';
import AdminAnalysis from './AdminPages/AdminAnalysis';
import AdminUpdate from './AdminPages/AdminUpdate';
import AdminAdd from './AdminPages/AdminAdd';
export const CartContext = createContext();

function App() {

  const CartProvider=({children})=>{
    const [cart,setCart]=useState([]);

    const addToCart=(item)=>{
      if(!cart.some(data => data.id === item.id)){
        setCart((prev)=>[...prev,item]);
        localStorage.setItem('cart',JSON.stringify(cart));
      }
      
    };
    const removeToCart=(item)=>{
      if(item){
        localStorage.removeItem(item.id);
      }
      
    };
    const value={cart,addToCart,removeToCart};
    return(
      <CartContext.Provider value={value}>
        { children}
      </CartContext.Provider>
    )
  }
  return (
      <div>
        <CartProvider>
          <Router>
            <Routes>
            <Route path="/" element={<AppLayout/>}>
            <Route index path="/Home" element={<Home/>} />
            <Route path="/Mens" element={<Mens/>}/>
            {/* <Route path="/Womens" element={<Womens/>}/> */}
            <Route path="/Electronics" element={<Electronics/>}/>
            <Route path="/category/:categoryName" element={<CategoryPage/>}/>
            <Route path="/Cart" element={<Cart/>}/>
            <Route path="/Jewelery" element={<Jewelery/>}/>
            <Route path='/Product' element={<Product/>}/>
            <Route path='/Favorities' element={<Favorites/>}/>
            <Route path='/search' element={<Search/>}/>
            <Route path='/Login' element={<Login/>}/>
            <Route path="/dashboard" element={
          <Protection>
            <Dashboard />
          </Protection>
        }/>
            <Route path="/Notfound" element={<NotFound/>}/>
            <Route path="/forbidden" element={<Forbidden/>}/>
            <Route path="/error" element={<ServerError/>}/>
            <Route path='/Profile' element={<ProfilePage/>}/>
            <Route path="/product/:id" element={<ProductDiscription />}/>
            </Route>
            <Route path="/admin" element={<AdminLayout/>}>
              <Route path='product' element={<AdminProduct/>}/>
              <Route path=":type/:id" element={<AdminUpdate/>} />
              <Route path="add/:type" element={<AdminAdd/>} />
              <Route path='Order' element={<AdminOrder/>}/>
              <Route path='User' element={<AdminUser/>}/>
              <Route path='Analysis' element={<AdminAnalysis/>}/>
            </Route>
            </Routes>
          </Router>
        </CartProvider>
      </div>
  )
}
export default App
