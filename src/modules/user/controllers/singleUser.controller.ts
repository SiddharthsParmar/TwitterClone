import { Request, Response } from "express"
import { pool } from "../../../config/db"

export const getSingleUserProfile=async(req:Request , res:Response)=>{
    const {username} = req.query
    console.log(username);
    


    const [data]:any = await pool.query("SELECT * FROM users_table WHERE username = ?" , [username]);
    console.log(data);
    const tweets_data = await pool.query("SELECT * FROM tweets_table WHERE user_id = ?" , data[0].user_id)
    console.log(tweets_data);
    
    res.render("Profile",{profileData:data , tweet:tweets_data[0]})




}