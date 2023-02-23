import express from "express"

import bcrypt from "bcrypt"
import { z } from "zod"
import { PrismaClient } from "@prisma/client"

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
      const validationPassword = await bcrypt.compare(password, existingUser.password)

      if (!validationPassword) {
        res.status(403).json({ msg: 'User not found' });
      } else {
        res.status(200).json({
          id: existingUser.id,
          email: existingUser.email,
          unique: existingUser.unique,
          msg: "Logged :)"
        })
      }
    }

  } catch (error) {
    res.json({ msg: "User not found" })
  }

})

Router.get('/user/:unique', async (req, res) => {

  const { unique } = req.params
  console.log(unique);
  

  const infoUser = await prisma.user.findUnique({
    where: {
      unique,
    }
  })

  res.status(200).json([infoUser])
})
