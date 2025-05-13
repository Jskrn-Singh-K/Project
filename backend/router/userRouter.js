const express=require("express");
const router=express.Router();
const userContoller=require("./../Controller/userController");
const authController=require("./../Controller/authController")
router.route("/").get(userContoller.getUser).post(userContoller.addUser);
router.route("/:id").get(userContoller.getUserID).patch(userContoller.updateUser).delete(userContoller.removeUser);
router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login)
router.route("/forgotPasssword").post(userContoller.forgotPassword);
router.route("/resetPassword/:token").patch(userContoller.resetPassword)
router.route("/Profile").get(userContoller.protect,userContoller.getProfile);
router.route("/favorites").post(userContoller.checkAuth,userContoller.postFavorities).get(userContoller.checkAuth,userContoller.getFavorities);
module.exports=router;

