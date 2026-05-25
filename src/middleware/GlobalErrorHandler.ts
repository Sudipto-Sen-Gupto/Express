import type { NextFunction, Request, Response } from "express";

   


   const Error =(err:any, req:Request, res:Response, next:NextFunction) => {
  console.error(err.stack); // Log the error

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
}

export default Error;