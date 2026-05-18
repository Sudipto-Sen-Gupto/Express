import type { Request, Response } from "express";
import { pool } from "../../dbNeon";
import { deleteService, getService, postService, singleData, updateService } from "./user.service";

 const userPost=async(req:Request,res:Response)=>{
    // const {name,email,password,age} =req.body;

          
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

const userGet=async(req:Request,res:Response)=>{
                     const result=await getService()

                     try{
                            res.status(200).json({
                               message:"Data retrieve successfully",
                               success:true,
                               data:result.rows
                            })
                     }
                     catch(error:any){
                                  res.status(500).json({
                                        message:error.message
                                  })
                     }
        }

const userSingleDataGet=async(req:Request,res:Response)=>{
                        

                          try{
                                const {id}=req.params;
                                    // if(result.rows.length===0) 
                                    const result=await singleData(id as string)      
                     if(result.rowCount===0){
                               res.status(404).json({
                                    message:"Not found",
                                    success:false,
                                    data:{}
                               })
                            }

                                 res.status(200).json({
                                        message:"Get single data",
                                        success:true,
                                        data:result.rows[0]
                                 })
                          }

                          catch(error:any){
                                    res.status(500).json({
                                       message:error.message
                                    })
                          }
        }
  
 const userUpdateService=async(req:Request,res:Response)=>{
                const {id}=req.params;
                const body=req.body;

                //COALESCE is used for prevent null value which section we don't update
                 const result=await updateService(body,id as string)

                 

                  // console.log(id);
                  // console.log(result);

               try{


                 if(result.rows.length===0){
                          res.status(404).json({
                             message:"Data does not exist, failed to update",
                             success:false,
                             data:{}
                          })
                  }

                     res.status(200).json({
                      message:"Data updated successfully",
                      success:true,
                      data:result.rows[0]
                     })
               }
               catch(error:any){
                      res.status(500).json({
                        message:error.message
                      })
               }
        }       

const userDeleteService=async(req:Request,res:Response)=>{
                    const {id}=req.params;
                     const result=await deleteService(id as string)
                    
                        

                      try{

                              if(result.rowCount===0){
                               res.status(404).json({
                                     message:"Data does not exist,failed to delete",
                                     success:false,
                                     data:{}
                               })
                        }



                            res.status(200).json({
                               message:'Delete successfully',
                               success:true,
                               data:result.rows[0]
                            })  
                      }
                      catch(error:any){
                                 res.status(404).json({
                                     error:error.message
                                 })
                      }
        }

 export const userController={
     userPost, userGet , userSingleDataGet ,userUpdateService ,userDeleteService
  }