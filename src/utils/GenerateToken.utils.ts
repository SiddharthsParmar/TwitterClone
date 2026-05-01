
import jwt from 'jsonwebtoken'
export const GenerateToken = async(email:string ,user_id:number)=>{


const generatedToken = jwt.sign({email:email , user_id:user_id},process.env.JWT_SECRET as string , {expiresIn:'1d'});
 
// const decodedData =jwt.verify(generatedToken ,process.env.JWT_SECRET as string );

// console.log(`the token generated with ${email} token is ${decodedData.toString()}`);



return generatedToken;
}