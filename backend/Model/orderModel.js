import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    UserID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],

    PaymentStatus: {
      type: String,
      enum: ['Pending', 'Completed', 'Failed', 'Refunded', 'Canceled'],
      default: 'Pending',
    },

    ShippingAddress: { type: String },

    OrderStatus: {
      type: String,
      enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Canceled', 'Returned'],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;

