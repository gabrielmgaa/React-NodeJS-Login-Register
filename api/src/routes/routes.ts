import express from "express"
import { PrismaClient } from "@prisma/client"
import { z } from "zod"

import bcrypt from "bcrypt"

import { validationPassword } from "../helpers/verifications"
import { CreateToken, ValidationToken } from "../helpers/jwt"

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

    const hashPassword = bcrypt.hashSync(password, 12)

    const emailUser = await prisma.user.findUnique({
      where: {
        email,
      }
    })

    const uniqueUser = await prisma.user.findUnique({
      where: {
        unique,
      }
    })

    if (emailUser || uniqueUser) {
      res.status(400).json({ msg: 'User already exists' })
    }

    const createUser = await prisma.user.create({
      data: {
        unique,
        name,
        email,
        password: hashPassword
      }
    })

    res.status(201).json(createUser)
  } catch (error) {
    next(error)
  }
})

Router.post('/auth/user/', async (req, res, next) => {

  try {
    const { email, password } = req.body

    const existingUser = await prisma.user.findFirst({
      where: {
        email,
      }
    })

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
        const token = CreateToken(existingUser.id)
        res.header('auth-token', token)
        res.status(200).json({
          unique: existingUser.unique,
        })
      }
    }

  } catch (error) {
    res.json({ msg: "User not found" })
  }

})

Router.get('/user/:unique', async (req, res) => {

  const { unique } = req.params

  const infoUser = await prisma.user.findUnique({
    where: {
      unique,
    }
  })

  res.status(200).json([infoUser])
})
