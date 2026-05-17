import { pool } from "../../dbNeon";
import type { user } from "../userType";

 
  const userPostService=async(payload:user)=>{
        const {name,email,password,age}=payload

       const result= await   pool.query(`
                    INSERT INTO userDB(name,email,password,age) VALUES($1,$2,$3,$4)  
                    RETURNING *        
              `,[name,email,password,age])        //* here asterisk means all value you use specific key for value like RETURNING name,email
         console.log(result);
         return result;
    // res.send(body)
    
  }

  export const postService=userPostService