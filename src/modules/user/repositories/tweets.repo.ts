import { pool } from "../../../config/db";

export class TweetsRepository{


// fetchTweetsFromUserId = async(userId:number)=>{

// const fetchTweetQuery = "SELECT * FROM tweets_table WHERE user_id = ?"

//      const [result]: any = await pool.query(fetchTweetQuery, [userId])

//     return result;

// }



// Assuming you're using Sequelize or any SQL ORM like MySQL, etc.

 fetchTweetsFromUserId = async (userId:number) => {
    const query = `
        SELECT t.tweet_original_id, t.tweet_content, t.tweet_media, COUNT(l.like_id) AS like_count
        FROM tweets_table t
        LEFT JOIN likes_table l ON t.tweet_original_id = l.tweet_original_id
        WHERE t.user_id = ?
        GROUP BY t.tweet_original_id
    `;

    const [result] = await pool.query(query, [userId]);
    return result;
};




// insertLike = async(tweet_id:number)=>{

//     const LikeUpdate = await pool.query("insert into likes_table ( tweet_original_id ) where user_id=?",[tweet_id]);

// }
insertLike = async (userId: number, tweetId: number) => {
    const query = `
        INSERT INTO likes_table (user_id, tweet_original_id)
        VALUES (?, ?)
    `;
    await pool.query(query, [userId, tweetId]);
};

toggleLike = async (userId: number, tweetId: number) => {

    const checkQuery = `
        SELECT * FROM likes_table 
        WHERE user_id = ? AND tweet_original_id = ?
    `;

    const [rows]: any = await pool.query(checkQuery, [userId, tweetId]);

    if (rows.length > 0) {
        // UNLIKE
        await pool.query(
            `DELETE FROM likes_table WHERE user_id=? AND tweet_original_id=?`,
            [userId, tweetId]
        );
        return { liked: false };
    } else {
        // LIKE
        await pool.query(
            `INSERT INTO likes_table (user_id, tweet_original_id) VALUES (?, ?)`,
            [userId, tweetId]
        );
        return { liked: true };
    }
};



async deleteTweet(tweetId: string, userId: string) {
        try {
            const result = await pool.query(
                "DELETE FROM tweets_table WHERE tweet_original_id = ? AND user_id = ?",
                [tweetId, userId]
            );
            return result;
        } catch (e) {
            console.error("Error in repository:", e);
            throw new Error("Database query failed");
        }
    }







}