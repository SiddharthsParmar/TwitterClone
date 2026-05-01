import { NextFunction, Request, Response } from "express";
import asyncHandler from "../../../utils/asyncHandler";
import { fetchTweetsByUserId } from "../services/fetchTweetsByUserId.service";

export const fetchAllTweetsforuser = asyncHandler(async(req:Request , res:Response,next:NextFunction)=>{
const id = req.userId;
const data= await fetchTweetsByUserId(id as number);

res.status(200).json({
    data:data
})





})