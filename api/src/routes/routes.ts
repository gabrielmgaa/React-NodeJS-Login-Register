import express from "express"
import jwt, { JwtPayload } from "jsonwebtoken"

import { PrismaClient } from "@prisma/client"
import { z } from "zod"
import { v4 } from "uuid"

import { validationPassword } from "../utils/verifications"
import { generateTokens } from "../utils/jwt"
import { hashToken } from "../utils/hashToken"
import {
  createUserInDatabase,
  findUserByEmail,
  findUserById,
  findUserByUnique
} from "../services/users-service"
import {
  addRefreshTokenToWhitelist,
  deleteRefreshToken,
  findRefreshTokenById
} from "../services/auth-service"
import { isAuthenticated } from "../middlewares/isAuthenticated"

export const Router = express.Router()
const prisma = new PrismaClient()

Router.post('/create/', async (req, res, next) => {
  try {

    const createUserBody = z.object({
      name: z.string().min(4),
      email: z.string().min(10),
      password: z.string().min(6),
      unique: z.string().min(4)
    })

    const { name, email, password, unique } = createUserBody.parse(req.body)

    const emailUser = await findUserByEmail(email)
    const uniqueUser = await findUserByUnique(unique)

    if (emailUser || uniqueUser) {
      res.status(400).json({ msg: 'User already exists' })
    }

    const createUser = await createUserInDatabase({
      name,
      email,
      unique,
      password
    })
    const jti = v4()
    const { refreshToken, accessToken } = generateTokens(createUser, jti)
    // console.log(a);

    await addRefreshTokenToWhitelist({ jti, refreshToken, userId: createUser.id });

    res.status(201).json({
      accessToken,
      refreshToken
    })
  } catch (error) {
    next(error)
  }
})

Router.post('/auth/user/', async (req, res, next) => {

  try {
    const { email, password } = req.body

    const existingUser = await findUserByEmail(email)
    console.log(existingUser);
    

    if (!existingUser) {
      res.status(403).json({ msg: 'User not found' })
    } else {

      const validation = await validationPassword({
        bcryptPassword: password,
        password: existingUser.password
      })
      

      if (!validation) {
        res.status(403).json({ msg: 'Your Informations are wrong' });
      } else {

        const jti = v4();
        const { accessToken, refreshToken } = generateTokens(existingUser, jti);
        await addRefreshTokenToWhitelist({ jti, refreshToken, userId: existingUser.id });

        res.set("authorization", accessToken)
        res.status(200).json({
          accessToken,
          refreshToken,
          existingUser
        })
      }
    }

  } catch (error) {
    res.json({ msg: "User not found" })
  }

})

Router.post('/refreshToken', async (req, res) => {

  try {
    const { refreshToken } = req.body

    if (!refreshToken) return res.status(400).json({ msg: "Missing refresh token" })

    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET as string) as JwtPayload
    const savedRefreshToken = await findRefreshTokenById(payload.jti as string)
    if (!savedRefreshToken || savedRefreshToken.revoked === true) return res.status(401).json({ msg: "Unauthorized" })

    const hashedToken = hashToken(refreshToken)
    if (hashedToken !== savedRefreshToken.hashedToken) return res.status(401).json({ msg: "Unauthorized" })

    const user = await findUserById(payload.userId)
    if (!user) return res.status(401).json({ msg: "Unauthorized" })

    await deleteRefreshToken(savedRefreshToken.id)
    const jti = v4()
    const { refreshToken: newRefreshToken, accessToken } = generateTokens(user, jti)
    await addRefreshTokenToWhitelist({ jti, refreshToken: newRefreshToken, userId: user.id })

    res.json({
      accessToken,
      refreshToken: newRefreshToken
    })

  } catch (error) {
    res.status(500).json({ msg: error })
  }

})

Router.get('/profile/', isAuthenticated, async (req, res) => {

  const { userId } = req.user
  console.log(userId);


  const infoUser = await findUserById(userId)

  res.status(200).json(infoUser)
})

// just for demo purposes
Router.get('/users', async (req, res) => {

  const users = await prisma.user.findMany()

  res.status(200).json(users)
})
