const express = require("express")
const helmet = require("helmet")
const authRouter = require("./routes/authRouter.js")
const dotenv = require("dotenv")
dotenv.config()

const app = express()

app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(authRouter)

const PORT = process.env.PORT 
app.listen(PORT, () => {
  console.info(`Server run on http://localhost:${PORT}`)
})
