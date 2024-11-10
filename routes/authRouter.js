const express = require("express")
const router = express.Router()
const { register } = require("./../controllers/authController.js")
 
router.post("/auth/register", register)

module.exports = router
