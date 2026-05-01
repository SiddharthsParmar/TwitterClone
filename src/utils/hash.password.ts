
import brcypt from 'bcrypt'
export const hashPassword = (password:string)=>{


    const hashedPassword = brcypt.hash(password , 10)


return hashedPassword;





}