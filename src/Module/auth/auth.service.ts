import { pool } from "../../dbNeon"
import { UserRole, type IAuth } from "../userType"
import bcrypt from "bcrypt"
import jwt, { type JwtPayload } from "jsonwebtoken"
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

                  const refreshToken=await jwt.sign(
                    jsonPayload,process.env.SECRET_Refresh_Key as string,{expiresIn:'20d'}    
                  ) 
                 
                 return {accessToken,refreshToken}
     }

     
            const generateRefreshToken=async(token:string)=>{
                     
                                             
                     
                                   if(!token){
                                         throw new Error("Unauthorized")
                                   }
                                 
                                   const decodedToken=await jwt.verify(token as string ,process.env.SECRET_Refresh_Key as string) as JwtPayload;
                                   console.log(decodedToken);  //decoded token from encoded token
                     
                                   const validUser=await pool.query(`
                                       SELECT * FROM userDB WHERE email=$1  
                                     `,[decodedToken.email]) //decodedToken send as payload then we get email
                                    
                                     
                     
                                     const user=validUser.rows[0]
                     
                                     if(user.length===0){
                                          throw new Error("Not found")
                                     }
                             
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
               userLoginService ,generateRefreshToken
      }