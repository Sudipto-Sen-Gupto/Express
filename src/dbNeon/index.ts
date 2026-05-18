import { Pool } from "pg";
 
import dotenv from 'dotenv'
dotenv.config()

 export const pool=new Pool({
    connectionString:process.env.DATABASE_URL
  })


 export  const initDB=async()=>{
         try{
                await pool.query(`
                     CREATE TABLE IF NOT EXISTS userDB(
                       id SERIAL PRIMARY KEY,
                       name VARCHAR(30) NOT NULL,
                       email VARCHAR(30) UNIQUE NOT NULL,
                       password VARCHAR(20) NOT NULL,
                       age INT,
                       created_at TIMESTAMP DEFAULT NOW(),
                       updated_at TIMESTAMP DEFAULT NOW()
                     )
                `)

                await pool.query(`
                         CREATE TABLE IF NOT EXISTS profile(
                           id SERIAL PRIMARY KEY,
                          user_id INT UNIQUE REFERENCES userDB(id) ON DELETE CASCADE,
                           bio TEXT,
                           address TEXT,
                           phone_number VARCHAR(15),
                           gender VARCHAR(10),
                           created_at TIMESTAMP DEFAULT NOW(),
                           updated_at TIMESTAMP DEFAULT NOW()
                           

                         )  
                  `)

                console.log("Database connect successfully");
         }
         catch(error:any){
             console.log(error);
         }
   }
  
