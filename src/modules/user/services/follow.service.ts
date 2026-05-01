import ApiError from "../../../utils/ApiError";
import { FollowerRepo } from "../repositories/follower.repo"

const followRepo = new FollowerRepo()
export const followService=async(follower_id:number , followee_id:number)=>{



    const insertedFollower:any = await followRepo.follow(follower_id , followee_id);

    if(!insertedFollower){
        throw new ApiError(402 , "no follower added")
    }


}