const Graph = require("../models/graph");

//Get Friends
module.exports.getFriends = async function (request, response) {
  let username = request.auth.username;
  Graph.getFriends({ username })
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
//Get Extended Friends
module.exports.getExtendedFriends = async function (request, response) {
  let username = request.auth.username;
  Graph.getExtendedFriends({ username })
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
//Get Recommendations
module.exports.getRecommendations = async function (request, response) {
  let username = request.auth.username;
  Graph.getRecommendations({ username })
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
