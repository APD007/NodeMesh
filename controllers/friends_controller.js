//Import Friend Model
const Friend = require("../models/friend");

//Controller Actions
//sendRequest
module.exports.sendRequest = async function (request, response) {
  let form_data = {
    from_user: request.auth.username,
    to_user: request.body.to_user,
  };
  if (form_data.from_user == form_data.to_user) {
    return response.status(400).json({
      success: false,
      error: "You can't send a friend Request to Yourself",
      results: null,
    });
  }
  Friend.sendRequest(form_data)
    .then(function (results) {
      return response.status(200).json({
        success: true,
        error: null,
        results,
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
//AcceptRequest
module.exports.acceptRequest = async function (request, response) {
  let form_data = {
    request_id: request.body.request_id,
  };
  Friend.acceptRequest(form_data)
    .then(function (results) {
      return response.status(200).json({
        success: true,
        error: null,
        results,
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
//RejectRequest
module.exports.rejectRequest = async function (request, response) {
  let form_data = {
    request_id: request.body.request_id,
  };
  Friend.rejectRequest(form_data)
    .then(function (results) {
      return response.status(200).json({
        success: true,
        error: null,
        results,
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
//getAllFriends
module.exports.getAllFriends = async function (request, response) {
  let form_data = {
    username: request.auth.username,
  };
  Friend.getAllFriends(form_data)
    .then(function (results) {
      return response.status(200).json({
        success: true,
        error: null,
        results,
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
//getMutualFriends
module.exports.getMutualFriends = async function (request, response) {
  let form_data = {
    username: request.auth.username,
    with_username: request.body.with_username,
  };
  Friend.getMutualFriends(form_data)
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
