const express = require("express")
const dotenv = require("dotenv")
dotenv.config()

const app = express()

app.get("/", (_, res) => {
  res.status(200).json({
    message: "Hello, World!"
  })
})

const PORT = process.env.PORT 
app.listen(PORT, () => {
  console.info(`Server run on http://localhost:${PORT}`)
})
