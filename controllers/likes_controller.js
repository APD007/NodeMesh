const Like = require("../models/like");

module.exports.like = function (request, response) {
  let username = request.auth.username;
  let post_id = request.body.post_id;
  Like.like({ username: username, post_id: post_id })
    .then(function (results) {
      return response.status(200).json({
        success: true,
        error: null,
        results: results,
      });
    })
    .catch(function (error) {
      return response.status(400).json({
        success: false,
        error: error,
        results: null,
      });
    });
};

module.exports.unlike = function (request, response) {
  let username = request.auth.username;
  let post_id = request.body.post_id;
  Like.unlike({ username: username, post_id: post_id })
    .then(function (results) {
      return response.status(200).json({
        success: true,
        error: null,
        results: results,
      });
    })
    .catch(function (error) {
      return response.status(400).json({
        success: false,
        error: error,
        results: null,
      });
    });
};

module.exports.getLikes = function (request, response) {
  let post_id = request.body.post_id;
  Like.getLikes({ post_id: post_id })
    .then(function (results) {
      return response.status(200).json({
        success: true,
        error: null,
        results: results,
      });
    })
    .catch(function (error) {
      return response.status(400).json({
        success: false,
        error: error,
        results: null,
      });
    });
};
