import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/user/Profile", {
          withCredentials: true, 
        });
        setUser(res.data.data.user);
      } catch (err) {
        console.error("User not authenticated");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p>Loading...</p>;
//   if (!user) return <Navigate to="/login" />;

//   const handleLogout = async () => {
//     try {
//       await axios.post("http://localhost:4000/api/logout", {}, {
//         withCredentials: true,
//       });
//       window.location.href = "/login";
//     } catch (err) {
//       console.error("Logout failed", err);
//     }
//   };

  return (
    <div className="profile-page">
    {user ? (
      <>
        <h1>Welcome to Your Profile, {user.name?.firstname}!</h1>
        <div className="profile-info">
          <p><strong>Name:</strong> {user.name?.firstname} {user.name?.lastname}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
          <p><strong>Shipping Address:</strong> {user.shippingAddress}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>

        <button className="logout-btn">
          Logout
        </button>

        <div>
          <a href="/update-profile">Update Profile</a>
        </div>
      </>
    ) : (
      <p>Loading...</p>
    )}
  </div>
    
  );
};

export default ProfilePage;
