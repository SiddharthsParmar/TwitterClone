import { ResultSetHeader } from "mysql2";
import { TweetsRepository } from "../repositories/tweets.repo";
import { FoundUser } from "../repositories/user.repo";


const tweetRepo  = new TweetsRepository()
export const  deleteTweet=async(tweetId: string, userId: string)=> {
        try {
            const result:any= await tweetRepo.deleteTweet(tweetId, userId);
            if (result.affectedRows > 0) {
                return { success: true };
            } else {
                return { success: false };
            }
        } catch (e) {
            console.error("Error in service layer:", e);
            throw new Error("Database error during tweet deletion");
        }
    }