import axios from 'axios';
import  { useState } from 'react';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true); 
  const [formData,setFormData]=useState({
    firstname:"",
    lastname:"",
    email:"",
    password:"",
    confirmPassword:""
  });
  
  const handleChange=(e)=>{
    setFormData({...formData,
      [e.target.name]:e.target.value
    })
  }
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(isLogin);

    if(!isLogin){
      try{
      const res=await axios.post('http://localhost:4000/api/user/signup',{    
        firstname:formData.firstname,
        lastname:formData.lastname,
        email:formData.email,
        password:formData.password,
        confirmPassword:formData.confirmPassword
      });
      console.log(res.data);




    }
    catch(err){
      console.log(err);
    }
  }
  else{
    console.log(formData);
    try{
      const res=await axios.post("http://localhost:4000/api/user/login",{
      
        email:formData.email,
        password:formData.password
      }, {
        withCredentials: true 
      })
      console.log(res);
      
    }
    catch(err)
    {
      console.log(err);
    }

  }
  };



  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl text-center font-semibold mb-6">{isLogin ? 'Login' : 'Sign Up'}</h2>
      
      <form onSubmit={handleSubmit}>
      {!isLogin && (
      <div className="mb-4">
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            name='firstname'
            id="firstName"
            required
            className="w-full p-3 border border-gray-300 rounded-lg mt-1"
            onChange={handleChange}
            placeholder="Enter your first name"
          />
        </div>
      )}
       {!isLogin && (
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            name='lastname'
            id="lastName"
            required
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg mt-1"
            placeholder="Enter your last name"
          />
        </div>
       )} 
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name='email'
            id="email"
            required
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg mt-1"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name='password'
            id="password"
            required
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg mt-1"
            placeholder="Enter your password"
          />
        </div>

        {!isLogin && (
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              name='confirmPassword'
              id="confirmPassword"
              required
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg mt-1"
              placeholder="Confirm your password"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-lg mt-4 hover:bg-blue-700"
        >
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
      </form>

      <div className="mt-4 text-center">
        <button 
          onClick={() => setIsLogin(!isLogin)} 
          className="text-blue-600 hover:underline"
        >
          {isLogin ? 'Create an account' : 'Already have an account? Login'}
        </button>
      </div>
    </div>
  );
};

export default Login;
