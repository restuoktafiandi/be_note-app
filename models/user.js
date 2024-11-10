'use strict'
const {
  Model
} = require('sequelize')
const { hashPassword } = require("./../utils/argon2.js")

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      },
      unique: true
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          user.password = await hashPassword(user.password)
        }
      },
      
      beforeUpdate: async (user) => {
        if (user.changed("password")) {
          user.password = await hashPassword(user.password)
        }
      },

    }
  })
  return User
}
