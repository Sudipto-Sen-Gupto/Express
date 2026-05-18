import type { Request, Response } from "express"
import { profileService } from "./profile.service"


 const profilePost=async(req:Request,res:Response)=>{


    try{
           const result=await profileService.profilePostService(req.body)

           res.status(200).json({
                success:true,
                message:"Profile post successfully",
                data:result.rows[0]
           })
    }
    
    catch(error:any){
           res.status(500).json({
                success:false,
                message:error.message,
                data:{}
           })
    }
 }



 export const profileController= {
    profilePost
 }