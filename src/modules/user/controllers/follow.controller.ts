import { NextFunction, Request, Response } from "express";
import asyncHandler from "../../../utils/asyncHandler";
import { followService } from "../services/follow.service";
import { pool } from "../../../config/db";

export const followController = asyncHandler(async(req:Request , res:Response , next:NextFunction)=>{
const follower_id  = req.userId;
const {followee_id} = req.body;
console.log("followee id ",req.body);
console.log("follwer is " , follower_id);

if(follower_id === followee_id){
    return res.status(400).send("You cannot follow yourself")
}

const [existing] = await pool.query("SELECT * FROM follows_table WHERE follower_id =? AND followee_id = ?" , [follower_id , followee_id])
if(existing.length > 0){
    return res.status(400).send("already folllower")
}

    const caller = await followService(follower_id as number ,followee_id as number )
res.status(200).send("done")
console.log(caller);



})