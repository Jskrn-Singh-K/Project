const express= require("express");
const Product=require("./../Model/productModel")
const Subcategory=require("./../utils/SubCategories.json");

console.log(Subcategory);
exports.getAllCategories = async (req, res) => {
    try {
        console.log(req.query);
        const queryObj={...req.query};
        const exculeFields=["sr"];
        exculeFields.forEach((el)=>delete(queryObj(el)));
        const sortItem=req.query.sortBy||"price";
        const sortOrder=(req.query.sort=="Ascending")?1:-1;
        const queryStr=JSON.stringify(queryObj);
        queryStr=queryStr.replace(/\b(gte||lte||lt||gt)\b/g, match=>'$${match}');
        const allProduct=await Product.find(JSON.parse(queryObj)) .sort({ [sortItem]: sortOrder });

        // const allProduct =  Product.find();
        console.log(allProduct);
        // If no products are found, return an error
        if (allProduct.length === 0) {
            return res.status(404).json({
                status: "fail",
                message: "No products found"
            });
        }

        // Extract unique categories from the products
        const allCategory = [...new Set(allProduct.map(product => product.category))];
        console.log(allCategory);
        // If no categories are found
        if (allCategory.length === 0) {
            return res.status(404).json({
                status: "fail",
                message: "No categories found"
            });
        }


        // Success response
        res.status(200).json({
            status: "success",
            results: allCategory.length,
            data: {
                allCategory
            }
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message
        });
    }
};


exports.getCategoryByName=(async(req,res)=>{
    try{ 
        const Category=await Product.find({ category: req.params.categoryName });
        if(Category.length==0){
            return res.status(404).json({
                status:"fail",
                Error:"not found"
            })
        }
        res.status(200).json({
            status:"success",
            results:Category.length,
            data:{
                Category
            }
        })}
        catch(err){
            return res.status(500).json({
                status:"Error",
                Error:err
            })
        }
});

exports.getSubCategory=(req,res)=>{
    console.log(Subcategory);
    try{ 
       
    res.status(200).json({
        status:"success",
        results:Subcategory.length,
        data:{
            Subcategory
        }
    })}
    catch(err){
        return res.status(500).json({
            status:"Error",
            Error:err
        })
    }

};