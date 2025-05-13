const sendEmail = require("../email");
const User=require("./../Model/userModel");
const jwt=require("jsonwebtoken");
const crypto=require("crypto");
const { promisify } = require("util");
const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });
  };
  const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
  
    // Ensure JWT_COOKIE_EXPIRES_IN is a number
    const expiryInMillis = parseInt(process.env.JWT_COOKIE_EXPIRES_IN, 10) * 24 * 60 * 60 * 1000;
    
    if (isNaN(expiryInMillis)) {
      return res.status(500).json({
        status: 'fail',
        message: 'Invalid JWT_COOKIE_EXPIRES_IN value'
      });
    }
  
    // Log the expiry value to ensure it's valid
    console.log('Expiry in milliseconds:', expiryInMillis);
  
    const cookieOptions = {
      expires: new Date(Date.now() + expiryInMillis),
      httpOnly: true
    };
    console.log(token);
  
    // Set the JWT token as a cookie
    res.cookie('jwt', token, cookieOptions);
  
    // Remove password from the user object before sending to the client
    user.password = undefined;
  
    // Send the response
    res.status(statusCode).json({
      status: 'success',
      token,
      data: {
        user
      }
    });
  };


  exports.ristrictTo = (...roles) => {
    return async (req, res, next) => {
      try {
        const user = await User.findById(req.params.id);
        if (!user) {
          return res.status(404).json({
            status: "fail",
            message: "User not found"
          });
        }    
        if (!roles.includes(user.role)) {
          return res.status(403).json({
            status: "fail",
            message: "You don't have permission to perform this action"
          });
        }
        next();
      } catch (err) {
        next(err); 
      }
    };
  };
  
  

exports.getUser=(async (req,res)=>{
    try{ 
      const allUser=await User.find();
      res.status(200).json({
          status:"success",
          results:allUser.length,
          data:{
              allUser
          }
      })}
      catch(err){
          res.status(500).json({
              status:"Error",
              Error:err
          })
      }
  })

exports.addUser=(async (req,res)=>{
    try{
      console.log(req.body);
        const user=await User.create(req.body);
        res.status(200).json({
            status:"success",
            data:{
                user
            }
        })
    }
    catch(err){
        res.status(500).json({
            status:"Error",
            Error:err.message
        })
    }
});

exports.updateUser=(async (req,res)=>{
    try{
        const user=await User.findByIdAndUpdate(req.params.id,req.body);
        if(!user){
            res.status(404).json({
                status:"fail",
                Error:"could not find any user with this id"
            })
        }
        res.status(200).json({
            status:"success",
            data:{
                user
            }
        })
    }
    catch(err){
        res.status(500).json({
            status:"Error",
            Error:err
        })
    }
});

exports.removeUser=(async (req,res)=>{
    try{
        const user=await User.findByIdAndDelete(req.params.id);
        if(!user){
            res.status(404).json({
                status:"fail",
                Error:"could not find any user with this id"
            })
        }
        res.status(200).json({
            status:"success",
            data:{
                user
            }
        })
    }
    catch(err){
        res.status(500).json({
            status:"Error",
            Error:err
        })
    }
});

// exports.ristrictTo=(...roles)=>{
//     return (req,res,next)=>{
//       if(!roles.includes(req.user.role)){
//         return res.status(500).json({
//           status: 'error',
//           message: 'You donot have access for this'
//         });
//       }
//       next();
//     }
//   }
    
  exports.forgotPassword=(async (req,res)=>{
    //Get user based on there email
    const user=await User.findOne({email:req.body.email});
  
    if(!user){
      return (res.status(400).json({
        status: 'fail',
        message: 'You need to write email'
      }))
    }
    //Generate the random reset token
    
    const resetToken=user.createPasswordResetToken();
    await user.save({validateBeforeSave:false});

    //send it to user's email
    const resetURL=`${req.protocol}://${req.get('host')}/api/user/resetPassword/${resetToken}`;
    const message=`Forgot your password? Submit a patch request with your new password and passwordConfirm to:${resetURL}.\nIF you dont forgot the password just ignore the email`;
    try{
    await sendEmail({
        email:user.email,
        subject:'Your password reset token (valid for 10 min)',
        message
    });

    res.status(200).json({
        status:"success",
        message:"the Token sent to email"
    });}
    catch(err){
        user.passwordResetToken=undefined;
        user.passwordResetExpires=undefined;
        await user.save({validateBeforeSave:false})

        return (res.status(400).json({
            status: 'fail',
            message: 'There is error sending the email'
          }))
    }
  })

exports.resetPassword=async (req,res)=>{
//Get user based on the token 
const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

const user=await User.findOne({passwordResetToken:hashedToken,passwordResetExpires:{$gt:Date.now()}});
//if token has not expired , there is user , set the new password
if(!user){
    return res.status("400").json({
        status:"fail",
        Error:"Token is invalid or has expired"
    });
}
user.password=req.body.password;
user.passwordResetExpires=undefined;
user.passwordResetToken=undefined;
await user.save();

// log the user in and jwt
    createSendToken(user,200,res);  
}

exports.protect=async(req,res,next)=>{

  //Getting token and check if its there
  let token;
  // if(req.headers.authorization&&req.headers.authorization.startsWith("Bearer"))
  // {
  //   token =req.headers.authorization.split(' ')[1];
  // }
  console.log(req.cookie.jwt);
  if (req.cookies.jwt) {
    // Split the cookies into individual key-value pairs
    token = req.cookies.jwt;
  
    // Loop through the cookies and look for 'jwt'
    // for (let cookie of cookies) {
    //   // Trim any spaces around the cookie
    //   cookie = cookie.trim();
      
    //   // If the cookie name is 'jwt', extract its value
    //   if (cookie.startsWith('jwt=')) {
    //     token = cookie.substring(4);  // Extract everything after 'jwt='
    //     break;  // Exit the loop once the token is found
    //   }
    // }
  }
  if(!token)
  {
    return res.status(404).json({
      status:'fail',
      Error:"The token can't be find"
    })
  }
  //Verification token
  const decode=await promisify(jwt.verify)(token,process.env.JWT_SECRET);
  //Check if the user still there
  const currentUser=await User.findById(decode.id);
  if(!currentUser){
    return res.status(404).json({
      status:'fail',
      Error:"The User is no longer present"
    })
  }
  //check if user changed password after the token was issued
  if(currentUser.changePasswordAfter(decode.iat)){
    return res.status(404).json({
      status:'fail',
      Error:"The User changed the pasword please login again"
    })
  }
  //Grant access to the Protected Route
  console.log(currentUser);
  req.user=currentUser;
  next();
}

exports.checkAuth = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const token = req.cookies.jwt;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const currentUser = await User.findById(decoded.id);

      if (currentUser) {
        req.user = currentUser;
      } else {
        req.user = null;
      }
    } catch (err) {
      req.user = null;
    }
  } else {
    req.user = null;  
  }
  next();
};



exports.getProfile=async(req,res)=>{
  try{
    const user=req.user;
  if(!req.user)
  {
      return res.status(404).json({
        status:"fail",
        Error:"No User Found"
    });
      }
      return res.status(200).json({
        status:"success",
        data:{
            user
        }
    })
    }
    catch(err)
    {
      res.status(500).json({
        status:"Error",
        Error:err
    })
    }
  }

exports.postFavorities=async(req,res)=>{
  if(req.user)
  {
    try{const { productId } = req.body;

    if (!req.user.wishlist.includes(productId)) {
        req.user.wishlist.push(productId);
        await req.user.save();
    }
    return res.status(200).json({ message: 'Added to wishlist', wishlist: req.user.wishlist });
  }
    catch(err)
    {
      console.log(err);
      return res.status(500).json({ error: 'Server error' });
    }
  }
  else {
    return res.status(401).json({ error: 'User not logged in' });
  }

}

exports.getFavorities=async(req,res)=>{
  try{const user=await User.findById(req.user.id).populate('wishlist');
  if(!user)
  {
    return res.status(404).json({
      status:"fail",
      error :"User not authenticate"
    })
  }
  return res.status(200).json({
    status:"success",
    data:{
        wishlist:user.wishlist
    }
  })
}
catch(err)
{
  return res.status(500).json({
    status:"Error",
    Error:err
})
}

};
exports.getUserID=(async (req,res)=>{
  try{ 
    const user=await User.findById(req.params.id);
    if(!user){
      return res.status(404).json({
          status: "fail",
          message: "User not found"
      })
    }
    res.status(200).json({
        status:"success",
        results:user.length,
        data:{
            user
        }
    })}
    catch(err){
        res.status(500).json({
            status:"Error",
            Error:err.message
        })
    }
})