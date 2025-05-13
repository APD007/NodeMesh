//Local Imports
const { pool } = require("../config/db");
const { uid } = require("../utils/uid");
module.exports.createGroup = function ({
  username: username,
  group_name: group_name,
}) {
  return new Promise(async function (resolve, reject) {
    let group_id = uid();
    pool.getConnection(function (error, connection) {
      if (error) {
        return reject(error);
      }
      connection.beginTransaction(function (error) {
        if (error) {
          return reject(error);
        }
        connection.query(
          `INSERT INTO groups (group_id,group_name,group_admin) VALUES (?,?,?)`,
          [group_id, group_name, username],
          async function (error, results) {
            if (error) {
              connection.rollback(function () {
                connection.release();
              });
              return reject(error);
            }

            let new_promise = new Promise(function (resolve, reject) {
              connection.query(
                `INSERT INTO user_group_map (username, group_id, user_permissions) VALUES(?,?,?)`,
                [username, group_id, "1"],
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

module.exports.sendRequestToJoinGroup = function ({
  username: username,
  group_id: group_id,
}) {
  return new Promise(async function (resolve, reject) {
    let request_id = uid();
    pool.query(
      `INSERT INTO group_join_request (request_id, from_user, to_group_id) VALUES (?,?,?)`,
      [request_id, username, group_id],
      function (error) {
        if (error) {
          return reject(error);
        }
        return resolve();
      }
    );
  });
};
module.exports.deleteGroupJoinRequest = function ({
  group_join_request_id: group_join_request_id,
}) {
  return new Promise(async function (resolve, reject) {
    pool.query(
      `DELETE FROM group_join_requests WHERE request_id=?`,
      [group_join_request_id],
      async function (error) {
        if (error) {
          return reject(error);
        }
        return resolve();
      }
    );
  });
};
//@todo
//Accept Group Join Request
module.exports.addMember = function ({
  group_join_request_id: group_join_request_id,
}) {
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
          `SELECT * FROM group_join_requests WHERE request_id=?`,
          [group_join_request_id],
          async function (error, results) {
            if (error) {
              connection.rollback(function () {
                connection.release();
              });
              return reject(error);
            }

            let rows = Object.values(JSON.parse(JSON.stringify(results)))[0];
            let username = rows.from_user;
            let group_id = rows.to_group_id;

            let new_promise = new Promise(function (resolve, reject) {
              connection.query(
                `INSERT INTO user_group_map (username, group_id, user_permissions) VALUES(?,?,?)`,
                [username, group_id, "1"],
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

module.exports.removeMember = function ({
  group_id: group_id,
  username: username,
}) {
  return new Promise(async function (resolve, reject) {
    pool.query(
      `DELETE FROM user_group_map WHERE username=? AND group_id=?`,
      [username, group_id],
      function (error) {
        if (error) {
          return reject(error);
        }
        return resolve();
      }
    );
  });
};
//@todo
//Only group members can submit posts
module.exports.createGroupPost = function ({
  username: username,
  group_id: group_id,
  content: content,
  visibility: visibility,
}) {
  return new Promise(async function (resolve, reject) {
    let group_post_id = uid();
    pool.query(
      `INSERT INTO group_posts (group_post_id, group_id, username, content, visibility) VALUES (?,?,?,?,?)`,
      [group_post_id, group_id, username, content, visibility],
      function (error) {
        if (error) {
          return reject(error);
        }
        return resolve();
      }
    );
  });
};
//@todo
//Get the group posts according to the visiblity
module.exports.getGroupPosts = function ({
  username: username,
  group_id: group_id,
}) {
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
          `SELECT * FROM user_group_map WHERE username=? AND group_id=?`,
          [username, group_id],
          async function (error, results) {
            if (error) {
              connection.rollback(function () {
                connection.release();
              });
              return reject(error);
            }
            let new_promise;
            if (results.length == 0) {
              //@todo
              //display only public posts
              new_promise = new Promise(function (resolve, reject) {
                connection.query(
                  `SELECT * FROM group_posts WHERE group_id=? AND visibility=?`,
                  [group_id, "0"],
                  function (error, results) {
                    if (error) {
                      return reject(error);
                    }
                    return resolve(results);
                  }
                );
              });
            } else {
              //@todo
              //display all the posts
              new_promise = new Promise(function (resolve, reject) {
                connection.query(
                  `SELECT * FROM group_posts WHERE group_id=?`,
                  [group_id],
                  function (error, results) {
                    if (error) {
                      return reject(error);
                    }
                    return resolve(results);
                  }
                );
              });
            }
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
