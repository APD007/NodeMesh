//Local Imports
const { pool } = require("../config/db");

module.exports.like = function ({ username: username, post_id: post_id }) {
  return new Promise(async function (resolve, reject) {
    pool.query(
      `INSERT INTO likes (username, post_id) VALUES (?,?)`,
      [username, post_id],
      function (error) {
        if (error) {
          return reject(error);
        }
        return resolve();
      }
    );
  });
};

module.exports.unlike = function ({ username: username, post_id: post_id }) {
  return new Promise(async function (resolve, reject) {
    pool.query(
      `DELETE FROM likes WHERE post_id=? AND username=?`,
      [post_id, username],
      function (error, results) {
        if (error) {
          return reject(error);
        } else {
          return resolve();
        }
      }
    );
  });
};

module.exports.getLikes = function ({ post_id: post_id }) {
  return new Promise(async function (resolve, reject) {
    pool.query(
      `SELECT * FROM likes WHERE post_id=?`,
      [post_id],
      function (error, results) {
        if (error) {
          return reject(error);
        } else {
          return resolve(results);
        }
      }
    );
  });
};
