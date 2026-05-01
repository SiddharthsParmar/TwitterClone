import { Request, Response, Router } from "express";
import { UserController } from "../controllers/user.controller";
import { Routes } from "../../../common/routes.interface";
import { verifyJWT } from "../../../middlerwares/verify.jwt.middleware";
import { viewEmail } from "../controllers/email.view.controller";
import { validateOTPController } from "../controllers/otp.validate.controller";
import { resetPasswordController } from "../controllers/reset.password.controller";
import { emailFromToken } from "../../../middlerwares/idfrom.token.middleware";
import { pool } from "../../../config/db";
import { fetchAllTweetsforuser } from "../controllers/fetch.user.tweets.controller";
import { fetchTweetsByUserId } from "../services/fetchTweetsByUserId.service";
import { insertLikeController } from "../controllers/like.insert.controller";
import { findBySearch } from "../controllers/findbySearch.controller";
import { getSingleUserProfile } from "../controllers/singleUser.controller";
import { extractIdfromToken } from "../../../middlerwares/extractid.from.token.middleware";
import { followController } from "../controllers/follow.controller";
import { UserRepository } from "../repositories/user.repo";
import { upload } from "../../../config/multer.config";
import { tweetUploadeController } from "../controllers/tweet.upload.controller";
import { deleteTweetController } from "../controllers/tweet.controller";

export class UserRoutes implements Routes{

path = "/users";
router = Router();
controller = new UserController()
constructor(){
    this.initializeRoutes();
}

 initializeRoutes(){
    this.router.get("/",(req,res)=>{res.render("Loader")})
        this.router.get("/home",verifyJWT,async(req,res)=>{

const userRepo = new UserRepository();
console.log("run");
const id = req.userId;

    const [homeData]:any = await userRepo.findUserByUserId(id as number)


 const [feed]:any = await pool.query(`
        
        SELECT t.tweet_original_id,
        t.tweet_content,
        t.tweet_media,
        t.created_at, 
        u.user_id AS user_id,u.username,u.profile_image_path FROM tweets_table t 
        JOIN users_table u ON t.user_id = u.user_id 
        JOIN follows_table f ON f.follower_id = t.user_id 
        WHERE f.followee_id = ?
        ORDER BY t.created_at DESC;
        ` , [req.userId , req.userId])
        console.log(feed);
        //  res.status(200).json({
        //     message:"data got",
        //     feed:feed
        // })
const [followerList]:any = await pool.query(`
        
        SELECT u.user_id , u.username
        FROM follows_table f
        JOIN users_table u ON f.follower_id = u.user_id
        WHERE f.followee_id = ?
        
        ` , [req.userId])




console.log(homeData);

   res.render("Home",{Userdata:homeData , feed:feed , followerList})
        });
    

        
        

    this.router.get("/register",verifyJWT, (req,res)=>{res.render("Registration"   )})
    this.router.post("/register",this.controller.registeUserController)
    this.router.post("/login",this.controller.loginUser)
    this.router.get("/login",(req,res)=>{res.render("Login")})
    this.router.get("/forgetPassword",(req,res)=>{res.render("ForgotPassword")})
    // this.router.get('/forgetPassword',this.controller.)
    this.router.get("/email-ui",viewEmail)
    this.router.post("/validateOTP",validateOTPController)
    
    this.router.get("/resetpassword",(req,res)=>{
        
        const {email} = req.query;
        // res.render("resetPassword",{email:email})
    })
    this.router.post("/resetpassword",resetPasswordController)
    this.router.get("/profile",verifyJWT,async(req,res)=>{
        console.log("user id from is profile" , req.userId);
        
        const [data]:any  =await  pool.query("SELECT * FROM users_table WHERE user_id=?" ,[req.userId])
        const tweetsData = await fetchTweetsByUserId(req.userId as number)
        console.log(data[0]);
        console.log("tweet dataq",tweetsData);
        
        const profileData = data[0]
        // UPDATE `twitter_clone_db1`.`users_table` SET `profile_image_path` = 'https://preview.redd.it/cool-monkey-v0-jyee1gdy48rb1.jpeg?width=450&format=pjpg&auto=webp&s=0170cdac2583de684c6d7e8894350cdb99478a60' WHERE (`user_id` = '1');
        res.render("ProfilePage",{profileData:profileData , data:tweetsData})
    })

// update profile routes

this.router.get("/update_profile",(req,res)=>{res.render("updateProfile")})
this.router.get("/fetchtweets" , verifyJWT ,fetchAllTweetsforuser)
//like tweet routes

this.router.post("/like",verifyJWT,insertLikeController)




// search routes
this.router.get("/searchPage",(req,res)=>{res.render("SearchPage")})
this.router.get("/search",findBySearch)
this.router.get("/singleuser",getSingleUserProfile)

this.router.post("/follow", verifyJWT,followController)


// follower routes 


// get all the followers for the current user

this.router.get("/followers" ,verifyJWT, async (req,res)=>{

    const [followerList]:any = await pool.query(`
        
        SELECT u.user_id , u.username
        FROM follows_table f
        JOIN users_table u ON f.follower_id = u.user_id
        WHERE f.followee_id = ?
        
        ` , [req.userId])

res.status(200).json({followerList,followerCount:followerList.length})


})


// get following lisrt

this.router.get("/following" ,verifyJWT, async (req,res)=>{

    const [followerList]:any = await pool.query(`
        
        SELECT u.user_id , u.username
        FROM follows_table f
        JOIN users_table u ON f.followee_id = u.user_id
        WHERE f.follower_id = ?
        
        ` , [req.userId])
res.status(200).json({followerList ,followingCount:followerList.length} )


})



// ------------home data










// upload tweet route

this.router.post("/uploadtweet" ,upload.single("tweet_image"),  tweetUploadeController)
//delete tweet route

this.router.post("/delete",deleteTweetController)
this.router.get("/feed",async(req,res)=>{

try{

 const [feed]:any = await pool.query(`
        
        SELECT t.tweet_original_id,
        t.tweet_content,
        t.tweet_media,
        t.created_at, 
        u.user_id AS user_id,u.username,u.profile_image_path FROM tweets_table t 
        JOIN users_table u ON t.user_id = u.user_id 
        JOIN follows_table f ON f.follower_id = t.user_id 
        WHERE f.followee_id = ? 
        ORDER BY t.created_at DESC;
        ` , [7])
        console.log(feed);
         res.status(200).json({
            message:"data got",
            feed:feed
        })


}catch(e){
    console.log(e);
    }
   
})

// comment routes -------------------------

this.router.post("/submit_comment",async(req,res)=>{

    try{
const {tweet_id , user_id , comment_content ,parent_id} =req.body;

console.log(req.body);

        await pool.query("INSERT INTO comments_table(tweet_id , user_id , comment_content,parent_id) VALUES (?,?,?,?)",[tweet_id , user_id ,comment_content, parent_id])

        res.status(200).json({message:"comment added"})
    }catch(e){
        console.log(e);
        
    }



})

this.router.get("/getTweetComments",async(req,res)=>{
    const {tweet_id} = req.query;

    const [comments]:any  =await pool.query("SELECT * FROM comments_table WHERE tweet_id = ?" ,[tweet_id] )
    console.log(comments);
    
    res.status(200).json({
        message:"success",
        data:comments
    })

})




this.router.post("/uploadCover", upload.single("coverimage"), async(req,res)=>{

const file:any | null = req.file;
const id = req.userId || req.body.user_id;
if(!id){
    return res.status(400).json({message:"kya nakhis file mara bhoda ma"})
}
if(!file){
    return res.status(400).json({message:" file upload kar ne dofa"});

}
let imagePath = file.filename;

await pool.query("UPDATE users_table SET cover_image_path = ? WHERE user_id = ? ",[imagePath, id])

res.status(200).json({

    message:"success",
    imagePath:imagePath || null
})
})

// profile image into profile page



this.router.post("/profileUpload", upload.single("profileimage"), async(req,res)=>{
try{
const file:any | null = req.file;
const id = req.userId || req.body.user_id;
if(!id){
    return res.status(400).json({message:"kya nakhis file mara bhoda ma"})
}
if(!file){
    return res.status(400).json({message:" file upload kar ne dofa"});

}
let imagePath = file.filename;

await pool.query("UPDATE users_table SET profile_image_path = ? WHERE user_id = ? ",[imagePath, id])

res.status(200).json({

    message:"success",
    imagePath:imagePath || null
})
}
catch(e){
    console.log(e);
    
}
})



//  is following---------------------------------
this.router.get("/isFollowing", async (req, res) => {
    const user_id = req.userId;
    const { rendereduser } = req.query;

    // Validate input to prevent SQL injection via undefined values
    if (!rendereduser) {
        return res.status(400).json({ message: "Missing rendereduser query parameter", isFollowing: false });
    }

    try {
        const [isFollowing]:any = await pool.query(
            "SELECT * FROM follows_table WHERE follower_id = ? AND followee_id = ?", 
            [user_id, rendereduser]
        );


        if (!isFollowing && isFollowing.length < 0) {
            // Follow exists
            return res.status(200).json({
                message: "User is not following",
                isFollowing: false
            });
        } else {
            // Follow does not exist
            return res.status(200).json({
                message: "User is  following",
                isFollowing: true
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error", isFollowing: false });
    }
});



}



}
