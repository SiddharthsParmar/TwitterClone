import { TweetsRepository } from "../repositories/tweets.repo"

const tweetRepo = new TweetsRepository()
export const 
likeInsertService = (user_id:number , tweet_id:number ,)=>{

        const data = tweetRepo.toggleLike(user_id,tweet_id);
        return data;
    

}