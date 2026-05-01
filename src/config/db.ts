import mysql from 'mysql2/promise'


const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:"Dev@Mysql",
    database:"twitter_clone_db1"
})


export {pool}