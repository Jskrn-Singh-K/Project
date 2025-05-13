import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function AdminUpdate() {
  const { id,type } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    salePrice: '',
    category: '',
    description: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log(type,id)
        const res = await axios.get(`http://localhost:4000/api/${type}/${id}`);
        console.log(res);
        let product="";
        if(type=='products')
        {
          product = res.data.data.product;
        }
        else if(type=='user')
        {
          product=res.data.data.user;
        }
       

        console.log(product);
        setFormData(product);
      } catch (err) {
        console.error("Failed to fetch product:", err);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);


    if(type==='products'){

    try {
      await axios.patch(`http://localhost:4000/api/products/${id}`, formData, {
        headers: {
         'Content-Type': 'application/json'
        },
      });
      setMessage("Product updated successfully!");
      setTimeout(() => navigate("/admin/products"), 2000);
    } catch (err) {
      console.error("Update failed:", err);
      setMessage("Failed to update product.");
    }
  }
  else if(type==='user')
  {
  try {
    await axios.patch(`http://localhost:4000/api/user/${id}`, formData, {
      headers: {
       'Content-Type': 'application/json'
      },
    });
    setMessage("User updated successfully!");
    setTimeout(() => navigate("/admin/user"), 2000);
  } catch (err) {
    console.error("Update failed:", err);
    setMessage("Failed to update users.");
  }}
};
  async function handleDelete(){
    try{
      await axios.delete(`http://localhost:4000/api/${type}/${id}`);
      setMessage(`${type} deleted successfully!`);
      setTimeout(() => navigate(`/admin/${type}`), 2000);
    }
    catch(err){
      console.log(err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-16 mt-1 shadow-md rounded-md">
         <input type="button" value="DELETE" className=" w-full p-2  bg-black text-white mb-4" onClick={handleDelete}/>

      <h2 className="text-2xl font-bold mb-4">Edit {type}</h2>
      {message && <p className="mb-4 text-blue-500">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
      {type === 'products' && (
         <>
        <label htmlFor="name">Name :</label>
        <input name="name" value={formData.name} onChange={handleChange} className="w-full border px-3 py-2" required />
        <label htmlFor="name">Price :</label>
        <input name="price" type="number" value={formData.price} onChange={handleChange} className="w-full border px-3 py-2" required />
        <label htmlFor="salePrice">SalePrice :</label>
        <input name="salePrice" type="number" value={formData.salePrice} onChange={handleChange} className="w-full border px-3 py-2" />
        <label htmlFor="category">Category :</label>
        <input name="category" value={formData.category} onChange={handleChange} className="w-full border px-3 py-2" required />
        
          <label htmlFor="size" className="block font-medium">Sizes:</label>
        
          <input name="size" value={formData.size} onChange={handleChange} className="w-full border px-3 py-2" required />
       
        <label htmlFor="material">Material :</label>
        <input name="material" value={formData.material} onChange={handleChange} className="w-full border px-3 py-2" required />


        <label htmlFor="brand">Brand:</label>
        <input name="brand" value={formData.brand} onChange={handleChange} className="w-full border px-3 py-2" required />

        <label htmlFor="subCategory">Subcategory:</label>
        <input name="subCategory" value={formData.subCategory} onChange={handleChange} className="w-full border px-3 py-2" />

        <label htmlFor="careGuide">Care Guide:</label>
        <textarea name="careGuide" value={formData.careGuide} onChange={handleChange} className="w-full border px-3 py-2" />

        <label htmlFor="description">Description:</label>
        <textarea name="description" value={formData.description} onChange={handleChange} className="w-full border px-3 py-2" />

        <label htmlFor="stock">Stock:</label>
        <input name="stock" type="number" value={formData.stock} onChange={handleChange} className="w-full border px-3 py-2" />

        <label htmlFor="viewsCount">Views Count:</label>
        <input name="viewsCount" type="number" value={formData.viewsCount} onChange={handleChange} className="w-full border px-3 py-2" />

        <label htmlFor="salesCount">Sales Count:</label>
        <input name="salesCount" type="number" value={formData.salesCount} onChange={handleChange} className="w-full border px-3 py-2" />

        <label htmlFor="rate">Rating:</label>
        <div className="flex gap-3">
          <input
            name="rate"
            type="number"
            step="0.1"
            value={formData.rating?.rate || ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                rating: { ...prev.rating, rate: parseFloat(e.target.value) },
              }))
            }
            placeholder="Rate"
            className="w-full border px-3 py-2"
          />
          <input
            name="count"
            type="number"
            value={formData.rating?.count || ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                rating: { ...prev.rating, count: parseInt(e.target.value) },
              }))
            }
            placeholder="Count"
            className="w-full border px-3 py-2"
          />
        </div>
        <label htmlFor="display">Display :</label>
        <input name="display" type="text" value={formData.display} onChange={handleChange} className="w-full border px-3 py-2" />
        <label htmlFor="image"/>
        <input name="image" type="text" value={formData.image} onChange={handleChange} className="w-full border px-3 py-2"/>

        </>
      )}

      
      {type === 'user' && (
        <>
        <label htmlFor="username">Username:</label>
      <input
        name="username"
        value={formData.username || ''}
        onChange={handleChange}
        className="w-full border px-3 py-2"
      />

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        name="email"
        value={formData.email || ''}
        onChange={handleChange}
        className="w-full border px-3 py-2"
      />

      <label htmlFor="password">Password:</label>
      <input
        type="text"
        name="password"
        value={formData.password || ''}
        onChange={handleChange}
        className="w-full border px-3 py-2"
      />

      <label htmlFor="role">Role:</label>
      <input
        name="role"
        value={formData.role || ''}
        onChange={handleChange}
        className="w-full border px-3 py-2"
      />

      <label htmlFor="shippingAddress">Shipping Address:</label>
      <input
        name="shippingAddress"
        value={formData.shippingAddress || ''}
        onChange={handleChange}
        className="w-full border px-3 py-2"
      />

      <label htmlFor="phoneNumber">Phone Number:</label>
      <input
        type="tel"
        name="phoneNumber"
        value={formData.phone || ''}
        onChange={handleChange}
        className="w-full border px-3 py-2"
      />

    
      <label htmlFor="firstname">First Name:</label>
      <input
        name="name.first"
        value={formData.name?.firstname || ''}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            name: { ...prev.name, firstname: e.target.value },
          }))
        }
        className="w-full border px-3 py-2"
      />

      <label htmlFor="name.last">Last Name:</label>
      <input
        name="name.last"
        value={formData.name?.lastname || ''}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            name: { ...prev.name, lastname: e.target.value },
          }))
        }
        className="w-full border px-3 py-2"
      />
        </>
)}

        <button type="submit" className="bg-black text-white px-4 py-2">Update Product</button>
</form>
    </div>
  );
}

export default AdminUpdate;
