const Product =require("./../Model/productModel");

exports.getAll=async(req,res)=>{
    try{
        const searchQuery = req.query.search; 
        console.log(searchQuery);
        const result=await Product.find({name:{
            $regex:searchQuery,$options:"i"
            
        }});
        // if(result.length==0){
        //     res.status(404).json({
        //         status:"Not Found",
        //         results:result.length,
        //         data:"Oops nothing Found"
                
        //     })
        //}
        res.status(200).json({
            status:"success",
            results:result.length,
            data:{
                result
            }

        })
    }
    catch(err){
        res.status(500).json({
            status:"Error",
            Error:err
        })
    }
}