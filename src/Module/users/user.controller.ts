import type { Request, Response } from "express";
import { pool } from "../../dbNeon";
import { postService } from "./user.service";

 const userPost=async(req:Request,res:Response)=>{
    const {name,email,password,age} =req.body;

          
       try{
           const result=await postService(req.body)

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