
export interface user{
      name:string;
      email:string;
      password:string;
      age:number;
      role?:string;
 }

export interface IAuth{
         email:string;
         password:string;
}

export const UserRole={
        admin:"admin",
        moderator:"moderator",
        
} as const

export type Role= 'admin' | 'moderator' | 'user'