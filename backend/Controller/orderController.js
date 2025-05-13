import Order from '../Model/orderModel.js';
import catchAsync from '../utils/catchAsync.js';

export const getAllOrders = async (req, res) => {
    try {
      const order = await Order.aggregate([
        { $unwind: "$products" }, // Flatten the products array
        {
          $lookup: {
            from: "products", // Name of the collection in the database
            localField: "products.product", // Reference to the product's ObjectId
            foreignField: "_id", // The ObjectId field in the Product collection
            as: "productDetails" // Name of the new field to store the result
          }
        },
        { $unwind: "$productDetails" }, // Flatten the productDetails array
        {
          $lookup: {
            from: "users", // Name of the User collection
            localField: "UserID", // Reference to the User's ObjectId in Order
            foreignField: "_id", // The ObjectId field in the User collection
            as: "userDetails" // Name of the new field to store the result
          }
        },
        { $unwind: "$userDetails" }, // Flatten the userDetails array
        {
          $group: {
            _id: "$_id",
            UserID: { $first: "$UserID" },
            userName: { $first: "$userDetails.name.firstname" }, // Get the user's name
            userEmail: { $first: "$userDetails.email" }, // Get the user's email
            TotalPrice: { $first: "$TotalPrice" },
            PaymentStatus: { $first: "$PaymentStatus" },
            ShippingAddress: { $first: "$ShippingAddress" },
            OrderStatus: { $first: "$OrderStatus" },
            CreatedAt: { $first: "$createdAt" },
            products: {
              $push: {
                productId: "$products.product",
                quantity: "$products.quantity",
                price: "$products.price",
                name: "$productDetails.name", // Get the product's name
                image: "$productDetails.image" // Get the product's image
              }
            }
          }
        }
      ]);
      console.log(order);
  
      res.status(200).json({
        status: "success",
        results: order.length,
        data: order
      });
    } catch (err) {
      console.error("Error fetching orders:", err);
      res.status(500).json({ status: "fail", message: "Something went wrong." });
    }
  };

  

export const getAll=catchAsync(async(req,res)=>{


    const order=await Order.find();

    if(!order){
        res.status("500").json({
            status:"fail",
            message:"No order found"
        })
    }
    res.status("200").json({
        status:"Success",
        order:order
    });

});

export const updateOrder=async(req,res)=>{

    
    const order=await Order.findByIdAndUpdate(req.params.id,
        req.body,
      );
   
    if(!order){
        res.status("500").json({
            status:"fail",
            message:"No order found"
        })
    }
    res.status("200").json({
        status:"Success",
        order:order
    });

};

export const deleteOrder=async(req,res)=>{
    
    const order=await Order.findByIdAndDelete(req.params.id);
   
    if(!order){
        res.status("500").json({
            status:"fail",
            message:"No order found"
        })
    }
    res.status("200").json({
        status:"Success",
        order:order
    });

};

export const createOrder=catchAsync(async(req,res)=>{
    const order= await Order.create(req.body);
    if(!order){
        res.status("500").json({
            status:"Fail",
            message:"please provide proper information for order"
        });
    }

    res.status("200").json({
        status:"Success",
        order:order
})});
  