import { useState,useEffect } from "react";
import {  useNavigate} from 'react-router-dom';
import axios from "axios";
function AdminUser() {
  const [value,setValue]=useState([]);
  const navigate = useNavigate();
  // const [visible,setVisible]=useState(false);
  // const [tic,setTic]=useState(false);
  // const [searchParams,setSearchParams] = useSearchParams();
  // const navigate=useNavigate();
  // const { categoryName } = useParams();
  // const name=categoryName.toLowerCase();     
useEffect(() => {

      const fetchUsers = async () => {
      
        try {
          const res = await axios.get(`http://localhost:4000/api/user`);
          setValue(res.data.data.allUser);
          console.log(res);
        } catch (err) {
          console.error(err);
        }
      };
      fetchUsers();
    }, []);

    const handleUserClick = (id) => {
      navigate(`/admin/user/${id}`);
   }; 
   const addUser = () => {
    navigate(`/admin/user/${id}`);
 }; 

    return (
  
        <div>
            <div className="flex flex-row justify-between">
                <span>
                  All Products
                </span>
                <span onClick={()=>{navigate('/admin/add/user')}}>
                  ADD New Users
                </span>
            </div>
            <div className="grid md:grid-cols-3">
              {value?.map((item,index)=>{
                return(
                <div key={index} className="min-w-[200px] w-full bg-zinc-50 p-2 m-5 " onClick={()=>handleUserClick(item._id)}>
                <span className="mt-2  text-xl">{item?.name?.firstname}</span>
                <span className="mt-2 text-xl">{item?.name?.lastname}</span>     
                <br/>
                <span className="mt-2   text-lg" >{item.email}</span>
            </div>
              )})

              }
            </div>
        </div>
    )
  }

export default AdminUser;