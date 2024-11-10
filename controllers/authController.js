const { User } = require("./../models")
const { v4: uuidv4 } = require("uuid")

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body
    const id = uuidv4()
    await User.create({
      id,
      username,
      email,
      password
    })

    res.status(201).json({
      message: "User successfully created",
      data: {
        user: {
          id,
          username,
          email,
          password
        }
      }
    })

  } catch (error) {
    console.log(error)
    if (error.name === "SequelizeUniqueConstraintError") {
      res.status(400).json({ 
        message: "Email already exists",
        error: {
          code: error.code,
          message: error.message,
          details: error.details
        }
      })
    } else {
      res.status(500).json({
        message: "Failed to create new user",
        error: {
          code: error.code,
          message: error.message,
          details: error.details
        }
      })
    }
  }
}
