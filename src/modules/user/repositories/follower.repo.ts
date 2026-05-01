import { pool } from "../../../config/db"

export class FollowerRepo {



follow = async(follower_id:number , followee_id:number)=>{

const query = 'INSERT INTO follows_table (follower_id , followee_id) VALUES (?,?)'

await pool.query(query, [follower_id , followee_id]);



}







}