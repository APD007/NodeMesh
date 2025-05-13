const Group = require("../models/group");
//Controller Actions
module.exports.createGroup = async function (request, response) {
  let username = request.body.username;
  let group_name = request.body.group_name;
  Group.createGroup({ username: username, group_name: group_name })
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

module.exports.sendRequestToJoinGroup = async function (request, response) {
  let username = request.auth.username;
  let group_id = request.body.group_id;
  Group.sendRequestToJoinGroup({
    username: username,
    group_id: group_id,
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

module.exports.deleteGroupJoinRequest = async function (request, response) {
  let group_join_request_id = request.body.group_join_request_id;
  Group.deleteGroupJoinRequest({
    group_join_request_id: group_join_request_id,
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

module.exports.addMember = async function (request, response) {
  let group_join_request_id = group_join_request_id;
  Group.addMember({ group_join_request_id: group_join_request_id })
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

module.exports.removeMember = async function (request, response) {
  let group_id = request.body.group_id;
  let username = request.body.username;
  Group.removeMember({ group_id: group_id, username: username })
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

module.exports.createGroupPost = async function (request, response) {
  let username = request.auth.username;
  let group_id = request.body.request_id;
  let content = request.body.content;
  let visibility = request.body.visibility;
  Group.createGroupPost({
    username: username,
    group_id: group_id,
    content: content,
    visibility: visibility,
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
