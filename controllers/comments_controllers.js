const Comment = require("../models/comment");

module.exports.createComment = function (request, response) {
  let username = request.auth.username;
  let post_id = request.body.post_id;
  let content = request.body.content;
  Comment.createComment({
    username: username,
    post_id: post_id,
    content: content,
  })
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

module.exports.deleteComment = function (request, response) {
  let username = request.auth.username;
  let comment_id = request.body.comment_id;
  Comment.deleteComment({ username: username, comment_id: comment_id })
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

module.exports.getCommentsForPost = function (request, response) {
  let post_id = request.body.post_id;
  Comment.getCommentsForPost({ post_id: post_id })
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
