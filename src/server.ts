import express from 'express'
import dotenv from 'dotenv'
import { buildApiRouter } from './routes';
import ejs from 'ejs'
import path from 'path'
import bodyParser from 'body-parser';
import errorHandler from './middlerwares/error.handler.middlware';
import cookieParser from 'cookie-parser'
const app = express()
dotenv.config();
// app.use(bodyParser)
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cookieParser())

app.set("view engine","ejs");
app.use(express.static(path.join(__dirname , "public")))

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

const PORT = process.env.SERVER_PORT;
app.listen(PORT,()=>{
    console.log(`server running on the http://localhost:/${PORT}`);
    
})

app.use("/api/v1",buildApiRouter())
app.use(errorHandler)