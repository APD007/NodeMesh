//Import User Model
const User = require("../models/user");

//Controller Actions
//signup
module.exports.signUp = async function (request, response) {
  let form_data = {
    username: request.body.username,
    email: request.body.email,
    password: request.body.password,
  };
  User.signUp(form_data)
    .then(function (results) {
      return response.status(200).json({
        success: true,
        error: null,
        results,
      });
    })
    .catch(function (error) {
      if (error == "Username Already Taken") {
        return response.status(400).json({
          success: false,
          error: error,
          results: null,
        });
      }
      return response.status(400).json({
        success: false,
        error: error,
        results: null,
      });
    });
};

//login
module.exports.login = async function (request, response) {
  User.login(request.body)
    .then(function (results) {
      return response.status(200).json({
        success: true,
        error: null,
        results,
      });
    })
    .catch(function (error) {
      if (error == "Password Incorrect") {
        return response.status(401).json({
          success: false,
          error: "Password Incorrect",
          results: null,
        });
      } else if (error == "Invalid Username or Password") {
        return response.status(401).json({
          success: false,
          error: "Invalid Username or Password",
          results: null,
        });
      }
      return response.status(400).json({
        success: false,
        error: error,
        results: null,
      });
    });
};

//Get all Users
module.exports.getAllUsers = async function (request, response) {
  User.getAllUsers()
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
//Get One User (Authenticated Request)
module.exports.getUser = async function (request, response) {
  const username = request.params.username;
  if (!username) {
    return response.status(404).json({
      success: false,
      error: "Not Found",
      results: null,
    });
  }
  User.getUser(username)
    .then(function (results) {
      return response.status(200).json({
        success: true,
        error: null,
        results,
      });
    })
    .catch(function (error) {
      if (error == "User Not Found") {
        return response.status(404).json({
          success: false,
          error: error,
          results: null,
        });
      }
      return response.status(400).json({
        success: false,
        error: error,
        results: null,
      });
    });
};
