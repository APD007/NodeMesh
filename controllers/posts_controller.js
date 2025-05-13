const Post = require("../models/post");

module.exports.createPost = function (request, response) {
  let form_data = {
    username: request.auth.username,
    content: request.body.content,
    visibility: request.body.visibility,
    img_src: request.file.path,
  };
  Post.createPost(form_data)
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

module.exports.getAllPublicPosts = function (request, response) {
  Post.getAllPublicPosts()
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

module.exports.getAllFriendsPosts = function (request, response) {
  let username = request.auth.username;
  Post.getAllFriendsPosts({ username: username })
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
module.exports.getAllExtendedFriendsPosts = function (request, response) {
  let username = request.auth.username;
  Post.getAllExtendedFriendsPosts({ username: username })
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

module.exports.getSinglePublicPost = function (request, response) {
  let post_id = request.body.post_id;
  Post.getSinglePublicPost({ post_id: post_id })
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

module.exports.getSingleFriendsPost = function (request, response) {
  let username = request.auth.username;
  let post_id = request.body.post_id;
  Post.getSingleFriendsPost({ username: username, post_id: post_id })
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

module.exports.getSingleExtendedFriendsPost = function (request, response) {
  let username = request.auth.username;
  let post_id = request.body.post_id;
  Post.getSingleExtendedFriendsPost({
    username: username,
    post_id: post_id,
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
