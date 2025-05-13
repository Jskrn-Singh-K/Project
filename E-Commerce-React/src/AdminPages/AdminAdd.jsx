import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function AdminAdd() {
  const { type } = useParams();
  const navigate = useNavigate();

  console.log(type);
  const initialProductData = {
    name: '',
    price: '',
    salePrice: '',
    category: '',
    description: '',
  };

  const initialUserData = {
    username: '',
    email: '',
    password: '',
    phone: '',
    role: '',
    shippingAddress: '',
  };

  const [formData, setFormData] = useState(type === "products" ? initialProductData : initialUserData);
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
     console.log(formData);

    try {
      const endpoint =
        type === "products"
          ? "http://localhost:4000/api/product"
          : "http://localhost:4000/api/user";

      await axios.post(endpoint, formData, {
        headers: { 'Content-Type': 'application/json' },
      });

      setMessage(`${type} added successfully!`);
      setTimeout(() => navigate(`/admin/${type === "product" ? "products" : "users"}`), 1500);
    } catch (err) {
      console.error("Add failed:", err);
      setMessage(`Failed to add ${type}.`);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 mt-10 shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Add {type === "products" ? "Product" : "User"}</h2>
      {message && <p className="mb-4 text-blue-500">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {type === "products" ? (
          <>
            <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="w-full border px-3 py-2" required />
            <input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="Price" className="w-full border px-3 py-2" required />
            <input name="salePrice" type="number" value={formData.salePrice} onChange={handleChange} placeholder="Sale Price" className="w-full border px-3 py-2" />
            <input name="category" value={formData.category} onChange={handleChange} placeholder="Category" className="w-full border px-3 py-2" required />
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="w-full border px-3 py-2" required />
            <input type="file" onChange={handleImageChange} />
          </>
        ) : (
          <>
            <input name="username" value={formData.username} onChange={handleChange} placeholder="Username" className="w-full border px-3 py-2" required />
            <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full border px-3 py-2" required />
            <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" className="w-full border px-3 py-2" required />
            <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="w-full border px-3 py-2" />
            <input name="role" value={formData.role} onChange={handleChange} placeholder="Role" className="w-full border px-3 py-2" />
            <input name="shippingAddress" value={formData.shippingAddress} onChange={handleChange} placeholder="Shipping Address" className="w-full border px-3 py-2" />
          </>
        )}
        <button type="submit" className="bg-black text-white px-4 py-2">Add {type}</button>
      </form>
    </div>
  );
}

export default AdminAdd;
