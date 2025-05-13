const Review=require("../Model/reviewModel");
const catchAsync=require("../utils/catchAsync");
const AppError=require("../utils/AppError");

exports.getAll=catchAsync(async(req,res)=>{
    
    const review=await Review.find().limit(10);

    
    if(!review){
        res.status("500").json({
            status:"fail",
            message:"No review found"
        })
    }
    res.status("200").json({
        status:"Success",
        review:review
    });

});

exports.getReviewById=catchAsync(async (req,res,next)=>{
   
        const review=await Review.find({product:req.params.id}).populate('user','name');
        if(!review){
            return next(new AppError('No reveiw found with that ID',404));
        }

        res.status(202).json({
            status:"success",
            data:{
                review:review
            }
        })
    
    // catch(err){
    //     res.status(500).json({
    //         status:"Error",
    //         Error:{
    //            err
    //         }
    //     })
    // }
});

exports.postReviewById=async (req,res)=>{
    try{
        const review=await Review.create({
            user:req.body.user,
            product:req.body.product,
            rating:req.body.rating,
            comment:req.body.comment,
            image:req.body.image
        })
        if(!review){
            res.status(500).json({
                status:"Error",
                message:"No review found on this product"
            })
        }

        res.status(202).json({
            status:"success",
            data:{
                review:review
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
}

exports.updateReview=async (req,res)=>{
    try{
        const review=await Review.findByIdAndUpdate(req.params.reviewId,req.body);
        if(!review){
            res.status(500).json({
                status:"Error",
                message:"No review found on this product"
            })
        }

        res.status(202).json({
            status:"success",
            data:{
                review:review
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
}

exports.deleteReview=async (req,res)=>{
    try{
        const review=await Review.findByIdAndDelete(req.params.reviewId);
        if(!review){
            res.status(500).json({
                status:"Error",
                message:"No review found "
            })
        }

        res.status(202).json({
            status:"success",
            data:{
                review:review
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
}
