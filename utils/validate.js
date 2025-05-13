const { pool } = require("../config/db");
const bcrypt = require("bcryptjs");

function validate(username, password) {
  return new Promise(function (resolve, reject) {
    pool.query(
      `SELECT password FROM users WHERE username=?`,
      [username],
      function (error, results) {
        if (error) {
          return reject(error);
        }
        if (results.length == 0) {
          return reject("Invalid Username or Password");
        }
        bcrypt.compare(password, results[0].password, function (error, result) {
          if (error) {
            return reject(error);
          }
          if (!result) {
            return resolve(false);
          } else {
            return resolve(true);
          }
        });
      }
    );
  });
}

module.exports = { validate };
