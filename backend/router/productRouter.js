const express=require("express");
const productController=require("../Controller/productController");
const CategoryController=require("../Controller/categoryController");
const reviewController=require("../Controller/reviewController");
const userContoller=require("./../Controller/userController");
const router=express.Router();
router.route("/").get(productController.allProducts).post(productController.postProduct);

router.route("/mostviewed").get(productController.getMostViewed);
router.route("/latest").get(productController.getMostLatest);


router.route("/categories/subcategory").get(CategoryController.getSubCategory);
router.route("/categories").get(CategoryController.getAllCategories);
router.route("/:id")
.get(productController.getProductById)
.delete(productController.deleteProduct)
.patch(productController.updateProduct);

router.route("/:id/reveiw").get(reviewController.getReviewById).post(reviewController.postReviewById);
router.route("/:id/reveiw/:reviewId").patch(reviewController.updateReview).delete(reviewController.deleteReview);
router.route("/categories/:categoryName").get(CategoryController.getCategoryByName);


module.exports=router;  