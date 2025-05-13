//Local Imports
const { pool } = require("../config/db");
const { uid } = require("../utils/uid");

module.exports.createComment = function ({
  username: username,
  post_id: post_id,
  content: content,
}) {
  return new Promise(async function (resolve, reject) {
    let comment_id = uid();
    pool.query(
      `INSERT into comments (comment_id , post_id, username, content) VALUES (?,?,?,?)`,
      [comment_id, post_id, username, content],
      function (error) {
        if (error) {
          return reject(error);
        }
        return resolve();
      }
    );
  });
};

module.exports.deleteComment = function ({
  username: username,
  comment_id: comment_id,
}) {
  return new Promise(async function (resolve, reject) {
    pool.query(
      `DELETE FROM comments WHERE comment_id=? AND username=?`,
      [comment_id, username],
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

module.exports.getCommentsForPost = function ({ post_id: post_id }) {
  return new Promise(async function (resolve, reject) {
    pool.query(
      `SELECT * FROM comments WHERE post_id=?`,
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
