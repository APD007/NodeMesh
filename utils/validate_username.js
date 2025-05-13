const { pool } = require("../config/db");

function validate_username(username) {
  return new Promise(function (resolve, reject) {
    pool.query(
      `SELECT username FROM users WHERE username=?`,
      [username],
      function (error, results) {
        if (error) {
          return reject(error);
        }
        if (results.length > 0) {
          return resolve(false);
        }
        return resolve(true);
      }
    );
  });
}

module.exports = { validate_username };
