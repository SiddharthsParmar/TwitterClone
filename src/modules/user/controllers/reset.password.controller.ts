import { NextFunction, Request, Response } from "express";
import { pool } from "../../../config/db";
import ApiError from "../../../utils/ApiError";
import { hashPassword } from "../../../utils/hash.password"
import { UserRepository } from "../repositories/user.repo";
const userRepo = new UserRepository()

export const resetPasswordController = async(req:Request , res:Response , next:NextFunction)=>{
const {password ,email} = req.body;

// console.log(password , email);

const hashedPassword =await hashPassword(password);

const userExist:any = await userRepo.findUserByEmail(email as string)


const [rows] = await pool.query("UPDATE users_table SET password_hash = ? where user_id = ? " , [hashedPassword , userExist[0].user_id])

if(!rows){
    throw new ApiError(402,"password is not updated")
}
 res.status(200).json({
      success: true,
      message: "User registered successfully",
    //   data: user,
    
  })





}