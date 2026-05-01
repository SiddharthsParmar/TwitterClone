import { Request, Response } from "express";
import { pool } from "../../../config/db";

export const findBySearch=async(req:Request , res:Response)=>{
const { search } = req.query;

// Use % wildcards in the parameter values, not in the SQL string
const query = `
  SELECT * 
  FROM users_table 
  WHERE email LIKE ? 

`;

const searchParam = `%${search}%`;
const [data] = await pool.query(query, [searchParam]);
    console.log(data);
    
res.status(200).json({
    data:data
})









}