import type { Request, Response } from "express";
import { pool } from "../../dbNeon";

 const userPost=async(req:Request,res:Response)=>{
    const {name,email,password,age} =req.body;

          
       try{
                       const result= await   pool.query(`
                    INSERT INTO userDB(name,email,password,age) VALUES($1,$2,$3,$4)  
                    RETURNING *        
              `,[name,email,password,age])        //* here asterisk means all value you use specific key for value like RETURNING name,email
         console.log(result);
    // res.send(body)
    res.status(201).json({
        message:"Created post",
         data:{
           data:result.rows[0]
         }
    })
       }
        catch(error:any){
                 res.status(500).json({
        message:"Internal error",
         data:{
           error:error.message
         }
    })
        }
        
}


 export const userController={
     userPost
 }