import express from "express"
import cors from "cors"
import { Router } from "./routes/routes"

const app = express()

app.use(express.json())
app.use(cors())

app.use('/', Router)

app.listen(3333,() => {
  console.log("Running")
})