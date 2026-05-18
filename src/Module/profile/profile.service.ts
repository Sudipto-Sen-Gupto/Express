import { pool } from "../../dbNeon"

 

  
   const profilePostService=async(payload:any)=>{
                const {user_id,bio,address,phone_number,gender}=payload
              console.log(payload);
    const user=  await pool.query(`
         SELECT * FROM userDB WHERE id=$1
        `,[user_id])
        console.log(user);

        const result=await pool.query(`
            INSERT INTO profile(user_id,bio,address,phone_number,gender)
            VALUES ($1,$2,$3,$4,$5) RETURNING *
          `,[user_id,bio,address,phone_number,gender])

          return result ;
   }


  export const profileService={
       profilePostService
   }