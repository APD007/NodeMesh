const { pool } = require("../config/db");

//Get all Vertices
function getAllVertices() {
  return new Promise(function (resolve, reject) {
    pool.query(`SELECT username FROM users`, [], function (error, results) {
      if (error) {
        return reject(error);
      } else if (results.length == 0) {
        return reject(0);
      }
      return resolve(JSON.stringify(results));
    });
  });
}

//Get all Edges
function getAllEdges() {
  return new Promise(async function (resolve, reject) {
    pool.query(
      `SELECT friend_one , friend_two FROM friends`,
      [],
      function (error, results) {
        if (error) {
          return reject(error);
        } else if (results.length == 0) {
          return reject(0);
        }
        return resolve(JSON.stringify(results));
      }
    );
  });
}

module.exports = { getAllVertices, getAllEdges };
