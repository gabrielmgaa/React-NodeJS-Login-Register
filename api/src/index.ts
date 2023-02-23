import express from "express"
import cors from "cors"

import { Router } from "./routes/routes"

const PORT = 3333
const app = express()

app.use(express.json())
app.use(cors())

app.use('/',Router)


app.listen(PORT, () => {
  console.log(`listening on ${PORT}`)
})