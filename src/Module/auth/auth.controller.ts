import type { Request, Response } from "express"
import { authService } from "./auth.service"


  const userLogin=async(req:Request,res:Response)=>{
       
         

           try{
                      const result = await authService.userLoginService(req.body)
                      
                       const {refreshToken}=result;

                       console.log(refreshToken);

                       res.cookie('refreshToken',refreshToken,{
                             secure:false,
                             httpOnly:true,
                             sameSite:'lax'
                       })

                      res.status(200).json({
                          success:true,
                          message:"Create Access token",
                          data:{result}
                      })
           }

           catch(error:any){
                res.status(500).json({
                        success:false,
                        message:"Internal Server Error"
                })

           }
  } 

     const refreshToken=(req:Request,res:Response)=>{
                     console.log(req.cookies);
     }

  export const authentication={
          userLogin ,refreshToken
  }