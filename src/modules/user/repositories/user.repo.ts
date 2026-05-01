import { pool } from "../../../config/db"
import ApiError from "../../../utils/ApiError"

export interface FoundUser {
  user_id:number,
  firstname: string,
  lastname: string,
  email: string,
  phone_number: string,
  username: string,
  password_hash: string,
  birth_date: string,
  joined_date: string,
  profile_image_path: string,
  cover_image_path: string,
  account_based_in: string,
  connected_via: string
}

export class UserRepository {

  registerUser = async (
    firstname: string,
    lastname: string,
    email: string,
    phone_number: string,
    username: string,
    password_hash: string,
    birth_date: string,
    joined_date: string,
    profile_image_path: string,
    cover_image_path: string,
    account_based_in: string,
    connected_via: string
  ) => {
    const RegisterUserQuery = `INSERT INTO users_table 
    (firstname, lastname, email, phone_number, username, password_hash, birth_date, joined_date, profile_image_path, cover_image_path, account_based_in, connected_via)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

    const [result]: any = await pool.query(RegisterUserQuery, [
      firstname,
      lastname,
      email,
      phone_number,
      username,
      password_hash,
      birth_date,
      joined_date,
      profile_image_path,
      cover_image_path,
      account_based_in,
      connected_via
    ])

    return result;
  }

  findUserByEmail = async (email: string): Promise<FoundUser | null> => {
    const findOne = "SELECT * FROM users_table WHERE email = ?";
    const [rows]: any = await pool.query(findOne, [email]);

    // Return null if not found, otherwise return the first user
    return rows.length === 0 ? null : rows;
  }

  findUserByUsername = async (username: string): Promise<FoundUser | null> => {
    const findOne = "SELECT * FROM users_table WHERE username = ?";
    const [rows]: any = await pool.query(findOne, [username]);

    return rows.length === 0 ? null : rows;
  }

  findUserByPhoneNumber = async (phone_number: string): Promise<FoundUser | null> => {
    const findOne = "SELECT * FROM users_table WHERE phone_number = ?";
    const [rows]: any = await pool.query(findOne, [phone_number]);

    return rows.length === 0 ? null : rows;
  }

  findUserByUserId = async(user_id:number):Promise<FoundUser | null>=>{


    const findOne = "SELECT * FROM users_table WHERE user_id = ?";
    const [rows]:any = await pool.query(findOne , [user_id])
    return rows.length===0 ? null : rows;
  }


// fetchUserByQuery = async(search:string): Promise<FoundUser | null>=>{
//   const 






}



