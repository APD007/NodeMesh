//Library Imports
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Local Imports
const { pool } = require("../config/db");
const { validate } = require("../utils/validate");
const { validate_username } = require("../utils/validate_username");

//SignUp
module.exports.signUp = function ({
  username: username,
  email: email,
  password: password,
}) {
  return new Promise(async function (resolve, reject) {
    let isValidUsername;
    try {
      isValidUsername = await validate_username(username);
    } catch (error) {
      return reject(error);
    }
    if (!isValidUsername) {
      return reject("Username Already Taken");
    }
    bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS), function (error, salt) {
      if (error) {
        return reject(error);
      }
      bcrypt.hash(password, salt, function (error, hash) {
        if (error) {
          return reject(error);
        }
        pool.query(
          `INSERT INTO users (username, email,password) VALUES(?,?,?)`,
          [username, email, hash],
          function (error, _) {
            if (error) {
              return reject(error);
            }
            return resolve("Account Created");
          }
        );
      });
    });
  });
};

//Login
module.exports.login = function ({ username, password }) {
  return new Promise(async function (resolve, reject) {
    let ans;
    try {
      ans = await validate(username, password);
    } catch (error) {
      return reject(error);
    }
    if (ans) {
      jwt.sign(
        { username },
        process.env.SIGN_SECRET,
        { expiresIn: "24h" },
        function (error, token) {
          if (error) {
            return reject(error);
          }
          return resolve({
            username: username,
            access_token: token,
          });
        }
      );
    } else {
      return reject("Password Incorrect");
    }
  });
};

//Get all Users
module.exports.getAllUsers = function () {
  return new Promise(function (resolve, reject) {
    pool.query(`SELECT username FROM users`, [], function (error, results) {
      if (error) {
        return reject("Users not found");
      } else if (results.length == 0) {
        return resolve("No Users");
      }
      return resolve(results);
    });
  });
};
//Get User
module.exports.getUser = function (username) {
  return new Promise(function (resolve, reject) {
    pool.query(
      `SELECT username,email,create_time FROM users WHERE username=?`,
      [username],
      function (error, results) {
        if (error || results.length == 0) {
          return reject("User Not Found");
        }
        return resolve(results[0]);
      }
    );
  });
};
