import React from "react";

const UserDashboard = () => {

    const user=req.user;
    const orders = [
    {
      id: "ORD1234",
      date: "2025-04-20",
      total: "$129.99",
      status: "Delivered",
    },
    {
      id: "ORD1235",
      date: "2025-03-15",
      total: "$89.99",
      status: "Shipped",
    },
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* User Info */}
      <div className="bg-white shadow rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Welcome, {user?.name || "User"}</h2>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Joined:</strong> {new Date(user?.createdAt).toLocaleDateString()}</p>
      </div>

      {/* Order History */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Order History</h3>
        <div className="space-y-4">
          {orders.map((order, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg flex justify-between">
              <div>
                <p><strong>Order ID:</strong> {order.id}</p>
                <p><strong>Date:</strong> {order.date}</p>
              </div>
              <div>
                <p><strong>Total:</strong> {order.total}</p>
                <p><strong>Status:</strong> {order.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
