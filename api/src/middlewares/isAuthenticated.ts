import { NextFunction, Request, Response } from "express";
import { ParsedToken } from "../../typings/token";
import jwt from "jsonwebtoken"

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {

  try {
    const accessToken = (req.headers.authorization || '').replace(
      /^Bearer\s/,
      ''
    )
    // console.log(accessToken);
    

    if (!accessToken) {
      return res.status(401).json({ msg: "Unauthorized" })
    }

    if (verifyAccessToken(accessToken) === false) {
      return res.status(401).json({ msg: "Unauthorized" })
    } else {
      const payload = verifyAccessToken(accessToken) as ParsedToken
      req.user = payload
    }
    

    next()
  } catch (error) {
    next()
  }

}

export function verifyAccessToken(token: string) {
  try {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET as string)
  } catch (error) {
    return false
  }
}