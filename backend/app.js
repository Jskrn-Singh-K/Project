const express=require("express");
const app=express();
const globalErrorHandler=require("./Controller/errorController");
const cors = require('cors');
const morgan=require("morgan");
const productRouter=require("./router/productRouter");
const userRouter=require("./router/userRouter");
const rateLimiter=require("express-rate-limit");
const helmet = require("helmet");
const cookieParser=require("cookie-parser");
const mongoSanitizer=require("express-mongo-sanitize");
const xss=require("xss-clean");
const AppError = require("./utils/AppError");
const orderRouter=require("./router/orderRouter");
const limiter=rateLimiter({
    max:100,
    window:60*60*1000,
    message:"Too much request from your side! Try again after one hour"
})

app.use(helmet());
app.use('/api',limiter);
app.use(cors({
    origin: 'http://localhost:5173',
  credentials: true 
}));  


app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev")); 
app.use(mongoSanitizer());
app.use(xss());
app.use("/api/products",productRouter);
app.use("/api/user",userRouter);
app.use("/api/order",orderRouter)

app.all('*',(req,res,next)=>{
    // res.status(404).json({
    //     status:'fail',
    //     message:`Can't find ${req.originalUrl} on the server`
    // })

    next(new AppError(`Can't find ${req.originalUrl} on this server!`,404));
})
app.use(globalErrorHandler);


module.exports=app;     