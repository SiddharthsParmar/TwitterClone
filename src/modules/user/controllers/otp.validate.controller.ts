import { NextFunction, Request, Response } from "express";
import { ValidateOTP } from "../services/forgetPassword.service";
import asyncHandler from "../../../utils/asyncHandler";
import ApiError from "../../../utils/ApiError";

export const validateOTPController =asyncHandler(


async(req:Request , res:Response , next:NextFunction)=>{

    const {email , OTP } = req.body;
    console.log("done",OTP , email);
    if(!email || !OTP){
        throw new ApiError(400,"email and otp required")
    }
  const isValid =  await ValidateOTP(email , OTP);
  console.log("status ",isValid);
  
  if(!isValid){
    throw new ApiError(400,"token is not valid")
  }
  
res.status(200).json({
  message:"token Verified"
})





}
    








)