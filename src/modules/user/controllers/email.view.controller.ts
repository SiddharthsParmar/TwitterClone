import { Request, Response } from "express";
import { UserRepository } from "../repositories/user.repo";
import asyncHandler from "../../../utils/asyncHandler";
import ApiError from "../../../utils/ApiError";
import { pool } from "../../../config/db";
const userRepo = new UserRepository()
export const viewEmail =asyncHandler(async(req:Request ,res:Response)=>{

    const {email}= req.query;
    console.log(email);
    
    const [isEmailValid]:any = await userRepo.findUserByEmail(email as string);
    console.log("is email",isEmailValid);
    // let id = isEmailValid.user_id;
    // console.log("here s id",id);
    
    if(!isEmailValid){
        throw new ApiError(402 , "forgot password mail not valid")
    }

    let OTP = "";
    let length = 4;

    const expiry = 2;

    for(let i=0;i<length;i++){
        OTP+=Math.floor((Math.random()*10));
    }
    const deleteOtherOTPs = await pool.query("DELETE from OTPs_table where user_id =?",[isEmailValid.user_id]);
    const rows:any = await pool.query("insert into OTPs_table (user_id  , email, otp_value  ,expiryTime) values(?,?,?,?)" , [isEmailValid.user_id, email,OTP , expiry ]);
   
   const data = rows[0];

  

    if(!rows[0]){
        console.log("token isnot entered");
        
    }

    console.log(OTP);

    const [OTP_DATA] = await pool.query("select *  from OTPs_table where email = ?" , [email]);
    const newData =  OTP_DATA;
        console.log("otp data" ,newData);
    
    res.render("emailView",{OTP:OTP , email:email})

}) 