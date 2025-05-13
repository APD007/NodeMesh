//Library Imports
const jwt = require("jsonwebtoken");
//Local Imports
const { pool } = require("../config/db");
const { uid } = require("../utils/uid");
const { get_friendship_data } = require("../utils/get_friendship_data");
//SendRequest
module.exports.sendRequest = function ({
  from_user: from_user,
  to_user: to_user,
}) {
  return new Promise(async function (resolve, reject) {
    let request_id = uid();
    pool.query(
      `INSERT INTO friend_requests (from_user , to_user , friendship_status, request_id) VALUES(?,?,?,?)`,
      [from_user, to_user, "0", request_id],
      function (error) {
        if (error) {
          return reject(error);
        }
        return resolve("FriendRequest Sent");
      }
    );
  });
};
//AcceptRequest
module.exports.acceptRequest = function ({ request_id: request_id }) {
  return new Promise(async function (resolve, reject) {
    pool.getConnection(function (error, connection) {
      if (error) {
        return reject(error);
      }
      connection.beginTransaction(function (error) {
        if (error) {
          return reject(error);
        }
        connection.query(
          `UPDATE friend_requests SET friendship_status = ? WHERE request_id = ?`,
          ["1", request_id],
          async function (error, results) {
            if (error) {
              connection.rollback(function () {
                connection.release();
              });
              return reject(error);
            }
            let friendship_data = await get_friendship_data(request_id);
            friendship_data = JSON.parse(JSON.stringify(friendship_data))[0];
            let from_user = friendship_data.from_user;
            let to_user = friendship_data.to_user;
            let new_promise = new Promise(function (resolve, reject) {
              connection.query(
                `INSERT INTO friends (friend_one , friend_two) VALUES (?,?)`,
                [from_user, to_user],
                function (error, results) {
                  if (error) {
                    return reject(error);
                  }
                  return resolve();
                }
              );
            });
            try {
              await new_promise;
            } catch (new_error) {
              connection.rollback(function () {
                connection.release();
                return reject(new_error);
              });
            }
            connection.commit(function (error, results) {
              connection.release();
              if (error) {
                return reject(error);
              }
              resolve(results);
            });
          }
        );
      });
    });
  });
};
//RejectRequest
module.exports.rejectRequest = function ({ request_id: request_id }) {
  return new Promise(async function (resolve, reject) {
    pool.query(
      `UPDATE friend_requests SET friendship_status = ? WHERE request_id = ?`,
      ["2", request_id],
      function (error) {
        if (error) {
          return reject(error);
        }
        return resolve("FriendShip Rejected");
      }
    );
  });
};
//getAllFriends
module.exports.getAllFriends = function ({ username: username }) {
  return new Promise(async function (resolve, reject) {
    pool.query(
      `SELECT users.username, users.email, users.create_time FROM users, friends WHERE CASE WHEN friends.friend_one = ? THEN friends.friend_two = users.username WHEN friends.friend_two= ? THEN friends.friend_one= users.username END`,
      [username, username],
      function (error, results) {
        if (error) {
          return reject(error);
        }
        return resolve(results);
      }
    );
  });
};
//getMutualFriends
module.exports.getMutualFriends = function ({
  username: username,
  with_username: with_username,
}) {
  return new Promise(async function (resolve, reject) {
    pool.query(
      `SELECT users.username FROM users, friends WHERE CASE WHEN friends.friend_one = ? THEN friends.friend_two = users.username WHEN friends.friend_two = ? THEN friends.friend_one= users.username END AND users.username IN (SELECT users.username FROM users, friends WHERE CASE WHEN friends.friend_one = ? THEN friends.friend_two = users.username WHEN friends.friend_two= ? THEN friends.friend_one= users.username END)`,
      [username, username, with_username, with_username],
      function (error, results) {
        if (error) {
          return reject(error);
        }
        return resolve(results);
      }
    );
  });
};
