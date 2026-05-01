import { Request, Response } from "express";
import { deleteTweet } from "../services/delete.tweet.service";

 export const deleteTweetController=async(req: Request, res: Response): Promise<Response>=> {
        const { tweetId, userId } = req.body;

        try {
            const result = await deleteTweet(tweetId, userId);

            if (!result) {
                return res.status(400).json({ message: "Tweet not found or user mismatch" });
            } else {
                return res.status(200).json({ message: "Tweet deleted successfully" });

                
            }
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: "An error occurred" });
        }
    }