import { NextFunction, Request, Response } from "express";
import ApiError from "../utils/ApiError";

const errorHandler = (err:any,req:Request , res:Response ,next:NextFunction)=>{


    let error = err;
    if(!(error instanceof ApiError)){
        error = new ApiError(
            err.statusCode || 500,
            err.message || "internal server Error"
        );
    }
const response  = {
    success:false,
    message:error.message,
    errors:error.errors,
    stack:process.env.NODE_ENV === "development" ? error.stack:undefined
}
res.status(error.statusCode).json(response)

}
export default errorHandler