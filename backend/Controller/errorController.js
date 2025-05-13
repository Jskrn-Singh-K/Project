const { stack } = require("../app");
const AppError = require("../utils/AppError");

const sendErrorProd=(err,res)=>{
    if(err.isOperational)
    {
        res.status(err.statusCode).json({
            status:err.status,
            message:err.message});
    }
    else{
        console.log('ERROR',err);
        res.status(500).json({
            status:'error',
            message:"something went wrong"});
    }
};

const handleCastError=()=>{
    const value=err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    const message= `Duplicate field value ${value} , Please use another value`;
    return new AppError(message,400);
}
const handleDuplicateFieldsDB=()=>{
    const message= `Invalid ${err.path} : ${err.value}`;
    return new AppError(message,400);
}
const handleValidationErrorDB=()=>{
    const error=Object.values(err.error).map(el=>el.message);
    const message=`Invalid input error`;
    return new AppError(message,400);
}
const sendErrorDev=(err,res)=>{
    res.status(err.statusCode).json({
        status:err.status,
        message:err.message,
        error:err,
        stack:err.stack
    });
}

module.exports=(err,req,res,next)=>{
    // console.log(err.stack);

    err.statusCode=err.statusCode||500;
    err.status=err.status||'error';
    if(process.env.NODE_ENV=="production"){
        let error={...err};
        if(error.name=='CastError') error=handleCastError(error);
        if(error.code===11000)error=handleDuplicateFieldsDB(error);
        if(error.name==='ValidationError')error=handleValidationErrorDB(error);
        sendErrorProd(error,res);
    } 
    else{
        sendErrorDev(err,res);
    }  
    
};