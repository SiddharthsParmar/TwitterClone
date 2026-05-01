import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
export const emailFromToken = (req:Request,res:Response,next:NextFunction)=>{
    const userToken = req.cookies.authTokenfromtwitter;
    console.log(userToken);
    
const decodedEmail= jwt.verify(userToken,process.env.JWT_SECRET as string);

// req.email = decodedEmail.email
console.log(decodedEmail);


next()




}