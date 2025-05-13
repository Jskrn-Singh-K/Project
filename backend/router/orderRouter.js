const express=require("express");
const orderController=require("./../Controller/orderController");
const userContoller=require("./../Controller/userController");
const Router=express.Router();

Router.route("/").get(orderController.getAllOrders).post(orderController.createOrder);
Router.route("/:id").delete(orderController.deleteOrder).patch(userContoller.protect,orderController.updateOrder);
module.exports=Router;

