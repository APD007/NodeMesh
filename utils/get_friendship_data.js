const { pool } = require("../config/db");

function get_friendship_data(request_id) {
  return new Promise(function (resolve, reject) {
    pool.query(
      `SELECT from_user , to_user FROM friend_requests WHERE request_id=?`,
      [request_id],
      function (error, results) {
        if (error) {
          return reject(error);
        }
        return resolve(results);
      }
    );
  });
}

module.exports = { get_friendship_data };
