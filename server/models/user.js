'use strict';

const bcrypt = require('../helper/bcrypt')

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class User extends Model { }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    hooks: {
      beforeCreate: (user, option) => {
        let data = user.password
        let newPassword = bcrypt.generatePassword(data)
        user.password = newPassword
      }
    }
  });
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};