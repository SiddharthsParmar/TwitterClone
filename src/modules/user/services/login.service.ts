import ApiError from "../../../utils/ApiError";
import { GenerateToken } from "../../../utils/GenerateToken.utils";
import { UserRepository } from "../repositories/user.repo";
import bcrypt from 'bcrypt'

const userRepo = new UserRepository();






export const loginUserService = async(email:string,password:string)=>{

try{
    const UserExist : any = await userRepo.findUserByEmail(email);
   
    
    console.log("user is" , UserExist);
    
    if(!UserExist){
        throw new ApiError(422 , "User Does not Exists")
    }
    
        console.log(UserExist[0].password_hash);
        
        // compare password
        const isMatch = await  bcrypt.compare(password , UserExist[0].password_hash);
        console.log(isMatch);
        
if(!isMatch){
    throw new ApiError(402,"password no match")
}
    // if password matches than generate token
        const generatedToken =await GenerateToken(UserExist[0].email , UserExist[0].user_id);

        // return generated token with email
    return{
        token:generatedToken,
        user:UserExist
        
    }
}catch(err){
    throw err
}



    }







