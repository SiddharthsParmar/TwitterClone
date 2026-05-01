import { Request, Response, NextFunction } from "express"
import asyncHandler from "../../../utils/asyncHandler"
import ApiError from "../../../utils/ApiError"
import { registerUserService } from "../services/registerUser.service"
import { loginUserService } from "../services/login.service"

export class UserController  {
  
  logUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.render("Loader", {})
  })

  registeUserController = asyncHandler(async (req: Request, res: Response,next:NextFunction) => {
    const {
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
    } = req.body;

    // Validate required fields
    if (!firstname || !lastname || !email || !phone_number || !username || !password_hash) {
      throw new ApiError(400, "Missing required fields: firstname, lastname, email, phone_number, username, password");
    }

    // Call service
    const user = await registerUserService(
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
    );

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  })






loginUser=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{

const {email , password}  =req.body;
console.log(req.body);

console.log(email);
console.log(password);





  
try{

//  await loginUserService(email , password)
const {token , user }= await loginUserService(email,password);

 res.cookie("authTokenfromtwitter",token,{
  httpOnly:true,
  secure:process.env.NODE_ENV == 'production',
  sameSite:'strict',
  maxAge:7*24*60*60*1000

 })


  res.status(200).json({
    status:"success",
    data:{
      token:token,
      user:user
    }
  })

}catch(error){
  next(error)
}



})


forgetPassword=asyncHandler(async(req:Request , res:Response ,next:NextFunction)=>{


  



})



}