const express = require("express");
const Product = require("./../Model/productModel");
const { dropSearchIndex } = require("../Model/userModel");

exports.allProducts = async (req, res) => {
  try {
    const { sort = null, IsFeatured, category, size, order ,brand,color,subCategory} = req.query;
    console.log("Query Params:", req.query);

    // 1. Build a clean filteredProduct object
    const allowedFields = ['price', 'rating', 'name', 'category', 'IsFeatured', 'size','color','brand','subCategory'];
    const filteredProduct = {};

    allowedFields.forEach(field => {
      if (req.query[field] !== undefined) {
        filteredProduct[field] = req.query[field];
      }
    });

    // 2. Handle IsFeatured separately
    if (IsFeatured && !['true', 'false'].includes(IsFeatured)) {
      return res.status(400).json({ message: 'Invalid value for IsFeatured, must be "true" or "false".' });
    }

    if (IsFeatured) {
      filteredProduct.IsFeatured = IsFeatured === 'true'; // Convert string to Boolean
    }

    const allowedBrand = ['nike', 'puma', 'HandM', 'Zara'];
    if(brand&&!allowedBrand.includes(brand)){
      return res.status(400).json({
        status: 'Error',
        message: `Invalid category '${brand}'. `
      });
    }
    const allowedColor = ['black', 'white', 'red', 'brown'];
    if(color&&!allowedColor.includes(color)){
      return res.status(400).json({
        status: 'Error',
        message: `Invalid category '${color}'. `
      });
    }

    // 3. Handle category validation
    const allowedCategories = ['men', 'women', 'kids', 'electronics'];
    // if (category && !allowedCategories.includes(category)) {
    //   return res.status(400).json({
    //     status: 'Error',
    //     message: `Invalid category '${category}'.`
    //   });
    // }

    // Apply category filter if exists
    if (category) {
      filteredProduct.category = category;
    }

    console.log("Filtered Product:", filteredProduct);

    // 4. Query products
    let query = Product.find(filteredProduct); // This applies the filters

    // 5. Apply sorting if requested
    if (sort) {
      const allowedSortFields = ['price', 'rating', 'name'];
      const sortField = sort;
      const sortOrder = (order === 'Dsc' || order === 'desc') ? -1 : 1; // Default ascending if not 'desc'

      if (allowedSortFields.includes(sortField)) {
        query = query.sort({ [sortField]: sortOrder });
      } else {
        return res.status(400).json({
          status: "Error",
          message: "Invalid field for sorting"
        });
      }
    }

    // 6. Execute query
    const allProducts = await query;

    res.status(200).json({
      status: "success",
      results: allProducts.length,
      data: { allProducts }
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "Error",
      error: err.message
    });
  }
};

  

exports.getProductById=(async (req,res)=>{
    try{
        const product=await Product.findById(req.params.id);
        console.log(product);
        if(!product){
            return res.status(404).json({
                status: "fail",
                message: "Product not found"
            })
        }

        if(product.view)
        {
          product.view += 1;
          await product.save();
        }
        res.status(200).json({
            status:"success",
            results:product.length,
            data:{
                product
            }
    })}
    catch(err){
        res.status(500).json({
            status:"Error",
            Error:err
        })
    }
});

exports.getMostViewed=(async(req,res)=>{
  try{
    const product = await Product.find().sort({ viewsCount: -1 }).limit(5);

  console.log(product);
  if(!product)
  {
    res.status(404).json({
      status:"Not found",
      Error:"No product found"
  })
  }
  return res.status(200).json({
    status: "success",
    data:{
      allProducts:product
  }
})

  }
  catch(err){
    res.status(500).json({
      status:"Error",
      Error:{
         err
      }
  })
  }

});

exports.postProduct=(async (req,res)=>{

    try{
        const newProduct=await Product.create(req.body);
    res.status(202).json({
        status:"success",
        data:{
            product:newProduct
        }
    })}
    catch(err){
        res.status(500).json({
            status:"Error",
            Error:{
               err
            }
        })
    }

});

exports.deleteProduct=(async(req,res)=>{
    try{
        const product=await Product.findByIdAndDelete(req.params.id);
        if(!product){
            return res.status(404).json({
                status: "fail",
                message: "Product not found"
            })
        }
    res.status(202).json({
        status:"success",
        data:{
            product:product
        }
    })}
    catch(err){
        res.status(500).json({
            status:"Error",
            Error:{
               err
            }
        })
    }
});

exports.updateProduct=(async(req,res)=>{
    try{
        const product=await Product.findByIdAndUpdate(req.params.id,req.body);
        if(!product){
            return res.status(404).json({
                status: "fail",
                message: "Product not found"
            })
        }
        res.status(202).json({
            status:"success",
            data:{
                product:product
            }
        })}
    catch(err){
        res.status(500).json({
            status:"Error",
            Error:{
               err
            }
        })
    }
});

exports.filterThings=(params)=>{

}
const buildFilterQuery = (queryParams) => {
    const filterQuery = {};
  
    // Filter by category
    if (queryParams.category) {
      filterQuery.category = queryParams.category;
    }
  
    // Filter by price range
    if (queryParams.minPrice) {
      filterQuery.price = filterQuery.price || {};
      filterQuery.price.$gte = queryParams.minPrice;
    }
    if (queryParams.maxPrice) {
      filterQuery.price = filterQuery.price || {};
      filterQuery.price.$lte = queryParams.maxPrice;
    }
  
    // Filter by rating
    if (queryParams.rating) {
      filterQuery.rating = { $gte: queryParams.rating };
    }
  
    // Filter by stock availability
    if (queryParams.inStock !== undefined) {
      filterQuery.inStock = queryParams.inStock === 'true';
    }
  
    return filterQuery;
  };

  exports.getMostLatest=(async(req,res)=>{
    try{
      const product=await Product.find({
       createdAt: { $gte: new Date("2025-05-05") } 

    });
    console.log(product);
    if(!product)
    {
      res.status(404).json({
        status:"Not found",
        Error:"No product found"
    })
    }
    return res.status(200).json({
      status: "success",
      data:{
        allProducts:product
    }
  })

    }
    catch(err){
      res.status(500).json({
        status:"Error",
        Error:{
           err
        }
    })
    }

  });