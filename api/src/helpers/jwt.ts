import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

export function CreateToken(id: string) {

  const create = jwt.sign({ id }, process.env.TOKEN_ACESS as string)

  return create
}

export function ValidationToken(req: Request, res: Response, next: NextFunction) {

  const token = req.header('auth-token')

  if (!token) return res.status(401).json({ msg: "Acess Denied" })

  try {
    jwt.verify(token, process.env.TOKEN_ACESS as string)
    next()
  } catch (error) {
    res.status(401).json({ msg: "Acess Denied" })
  }
}