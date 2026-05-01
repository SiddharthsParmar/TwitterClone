import { TweetsRepository } from "../repositories/tweets.repo"



const tweetRepo = new TweetsRepository();
export const fetchTweetsByUserId=async(userId:number)=>{


    const tweetByIdData = await tweetRepo.fetchTweetsFromUserId(userId);
    console.log(tweetByIdData);
    
    return tweetByIdData;


}