//Library Imports
const jwt = require("jsonwebtoken");
const { pool } = require("../config/db");
const { redisGetFriends, redisGetExtendedFriends } = require("./redis_utils");

function verify_token(request, response, next) {
  if (request.headers.access_token) {
    jwt.verify(
      request.headers.access_token,
      process.env.SIGN_SECRET,
      function (error, decoded) {
        if (error) {
          return response.status(401).json({
            success: false,
            error: error,
            results: null,
          });
        }
        request.auth = {};
        request.auth.username = decoded.username;
        next();
      }
    );
  } else {
    response.status(401).json({
      success: false,
      error: "Access Code Not included in the header of the request",
      results: null,
    });
  }
}

function verify_access(request, response, next) {
  let username = request.auth.username;
  let post_id = request.body.post_id;
  //@todo get the details of the post posted_by, post_visibility
  //and see whether this username has access to do
  //something to this post
  pool.query(
    `SELECT * from posts WHERE post_id=?`,
    [post_id],
    async function (error, results) {
      if (error) {
        return response.status(400).json({
          success: false,
          error: error,
          results: null,
        });
      }
      let rows = Object.values(JSON.parse(JSON.stringify(results)))[0];
      let post_created_by = rows.username;
      let post_visibility = parseInt(rows.visibility);
      if (post_visibility == 0) {
        next();
      } else if (post_visibility == 1) {
        let user_friends;
        try {
          user_friends = new Set(await redisGetFriends(username));
        } catch (error) {
          return response.status(400).json({
            success: false,
            error: error,
            results: null,
          });
        }
        if (user_friends.has(post_created_by)) {
          next();
        } else {
          return response.status(400).json({
            success: false,
            error: error,
            results: null,
          });
        }
      } else {
        let user_extended_friends;
        try {
          user_extended_friends = new Set(
            await redisGetExtendedFriends(username)
          );
        } catch (error) {
          return response.status(400).json({
            success: false,
            error: error,
            results: results,
          });
        }
        if (user_extended_friends.has(post_created_by)) {
          next();
        } else {
          return response.status(400).json({
            success: false,
            error: error,
            results: null,
          });
        }
      }
    }
  );
}

function verify_group_access(request, response, next) {
  let username = request.auth.username;
  let group_id = request.body.group_id;
  pool.query(
    `SELECT * FROM user_group_map WHERE username=? AND group_id=?`,
    [username, group_id],
    async function (error, results) {
      if (error) {
        return response.status(400).json({
          success: false,
          error: error,
          results: null,
        });
      } else if (results.length == 0) {
        return response.status(400).json({
          success: false,
          error: error,
          results: null,
        });
      } else {
        next();
      }
    }
  );
}

function is_group_admin(request, response, next) {
  let username = request.auth.username;
  let group_id = request.body.group_id;
  pool.query(
    `SELECT * FROM user_groups WHERE group_id=? AND group_admin=?`,
    [group_id, username],
    async function (error, results) {
      if (error) {
        return response.status(400).json({
          success: false,
          error: error,
          results: null,
        });
      } else if (results.length == 0) {
        return response.status(400).json({
          success: false,
          error: error,
          results: null,
        });
      } else {
        next();
      }
    }
  );
}
module.exports = {
  verify_token,
  verify_access,
  verify_group_access,
  is_group_admin,
};
