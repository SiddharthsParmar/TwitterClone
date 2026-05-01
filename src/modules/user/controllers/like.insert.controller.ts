import { NextFunction, Request, Response } from "express";
import asyncHandler from "../../../utils/asyncHandler";
import { likeInsertService } from "../services/like.insert.service";

export const insertLikeController=asyncHandler(
 async   (req:Request , res:Response , next:NextFunction)=>{
    const userId = req.userId;
const {tweetId} = req.body;
console.log("userid",userId);
console.log("tweetId",tweetId);

const likeupdateStatus =  await likeInsertService(userId as number,tweetId as number)




}
)