import { Request, Response } from "express";
import { pool } from "../../../config/db";

export const tweetUploadeController = async (req: Request, res: Response) => {
    try {
        const file: any | null = req.file;
        const id = req.userId || req.body.user_id;
        const { tweet_content } = req.body;

        // 1. Validate User ID (File is now optional, so remove "no file found" from this message)
        if (!id) {
            return res.status(400).json({ message: "User ID is missing" });
        }

        // 2. Handle File (Optional)
        let imagePath: string | null = null;
        
        if (file) {
            imagePath = file.filename;
        }

        // 3. Handle Text Content (Optional? Usually tweets need text OR media)
        if (!tweet_content && !imagePath) {
            return res.status(400).json({ message: "Tweet must contain text or an image" });
        }

        // 4. Execute Query
        // Pass 'imagePath' (which might be null) as the second parameter
        await pool.query(
            "INSERT INTO tweets_table (tweet_media, user_id, tweet_content) VALUES (?, ?, ?)",
            [imagePath, id, tweet_content || null] // Allow text to be null if only image is posted
        );

        return res.status(200).json({ 
            message: "Tweet uploaded successfully", 
            imagePath: imagePath || null 
        });

    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Server error" });
    }
};