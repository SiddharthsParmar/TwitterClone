import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
export const  extractIdfromToken =async (req:Request,res:Response,next:NextFunction)=>{

    const token =await req.cookies.authTokenfromtwitter;
    console.log(token);
    

    const user_id  = jwt.verify(token , process.env.JWT_SECRET as string);
    console.log("user id is " , user_id);
    


    next()





}