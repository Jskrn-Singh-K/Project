const express=require("express");
const reviewController=require("../Controller/reviewController");
const userContoller=require("./../Controller/userController");
const Router=express.Router();

Router.route("/").get(reviewController.getAll).post(userContoller.protect,reviewController.postReviewById);
Router.route("/:id").get(userContoller.ristrictTo("admin"),reviewController.getAll).delete(userContoller.ristrictTo("admin"),reviewController.deleteReview).patch(userContoller.protect,reviewController.updateReview);
module.exports=Router;

