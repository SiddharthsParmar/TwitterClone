import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import ApiError from "../utils/ApiError";

declare global {
  namespace Express {
    interface Request {
      userId?: string | number;
    }
  }
}

declare global  {
  namespace Express {
    interface JwtPayLoad {
      user_id?: string | number;
    }
  }
}



export const verifyJWT  =async(req:Request,res:Response,next:NextFunction)=>{
try{
const token  =await req.cookies.authTokenfromtwitter
// console.log(token);

    const isTokenValid =  jwt.verify(token , process.env.JWT_SECRET as string)
    console.log("token is ",isTokenValid);
    

    req.userId = isTokenValid.user_id;

    
    
    next()
    
    if(!token){

    }
    // if(!isTokenValid){

        
    //     throw new ApiError(402,"Token invalid")

    // }

}catch(error){

    if(error instanceof jwt.JsonWebTokenError || error instanceof jwt.TokenExpiredError ){
        res.redirect("/api/v1/users/login")
}

    }








}