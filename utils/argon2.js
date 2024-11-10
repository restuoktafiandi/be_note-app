const argon2 = require("argon2")

const config = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  hashLength: 32
}

exports.hashPassword = async (password) => {
  try {
    return await argon2.hash(password, config)
  } catch (err) {
    console.error("Hashing failed:", err)
    throw err
  }
}

exports.verifyPassword = async (password, hash) => {
  try {
    return await argon2.verify(hash, password, config)
  } catch (err) {
    console.error("Verification failed:", err)
    throw err
  }
}
