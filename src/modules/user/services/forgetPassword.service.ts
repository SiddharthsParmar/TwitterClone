import { pool } from "../../../config/db";
import ApiError from "../../../utils/ApiError";
import { UserRepository } from "../repositories/user.repo"

 
 const userRepo = new UserRepository();
 
 export const  ForgetPasswordService=async(email:string)=>{

try{
    const isEmailExist = await userRepo.findUserByEmail(email)

    if(!isEmailExist){
        throw new ApiError(402, "email does not exist")
    }




}catch(e){
    throw e;
}







    
}
export const ValidateOTP=async(email:string,OTP:string)=>{

try{
    const [isEmailExist]:any = await userRepo.findUserByEmail(email)

    if(!isEmailExist){
        throw new ApiError(402, "email does not exist")
    }
console.log(isEmailExist.user_id);

 const [OTP_DATA]:any = await pool.query("select * from OTPs_table where user_id = ? && is_used = 0" , [isEmailExist.user_id] )
        console.log(OTP_DATA[0]);

    const StoredOTP = OTP_DATA[0].otp_value;
    console.log(StoredOTP);
    
    const OTPTIME = OTP_DATA[0].expiryTime;
    if(StoredOTP !== OTP || OTPTIME ===0 ){
        throw new ApiError(402 , "TOKEN INVALID");
      
    }




    
    return true;
    
    





}catch(e){
    throw e;
}

       
        



}

