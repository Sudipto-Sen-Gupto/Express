import { pool } from "../../dbNeon"
import { UserRole, type IAuth } from "../userType"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
     const userLoginService=async(payload:IAuth)=>{
               
          const {email,password}=payload;

           const userAuth= await pool.query(`
                     SELECT * FROM userDB WHERE email=$1  
               `,[email])
                
               //check user existing
               //check password matching
               //generate token by jwt.sign

               const user=userAuth.rows[0]
               console.log(user);
               
               if(user.length===0){
                     throw new Error("User not found")
               }

               const matchPassword=await bcrypt.compare(password,user.password)

               if(!matchPassword){
                     throw new Error("Invalid credential.Password not matched")
               }
                    
                    // syntax jwt.sign(payload,secretKey,expiredTimeOfToken)
                   // secretkey generate from chatgpt and obviously keep it in .env  for security
                  const jsonPayload={
                           id:user.id,
                           email:user.email,
                           name:user.name,
                           age:user.age,
                           role:user.role
                  }  
                        
                 const accessToken=await jwt.sign(jsonPayload,process.env.SECTRET_KEY as string,{expiresIn:"10d"})

                       
                 return accessToken
     }

     
     export const authService={
               userLoginService
      }