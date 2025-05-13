const {
  redisGetFriends,
  redisGetExtendedFriends,
  redisGetFriendRecommendations,
} = require("../utils/redis_utils");

module.exports.getFriends = function ({ username: username }) {
  return new Promise(async function (resolve, reject) {
    let friends;
    try {
      friends = await redisGetFriends(username);
    } catch (error) {
      return reject(error);
    }
    if (friends === null || friends === undefined) {
      return reject();
    } else {
      return resolve({ friends });
    }
  });
};

module.exports.getExtendedFriends = function ({ username: username }) {
  return new Promise(async function (resolve, reject) {
    let extended_friends;
    try {
      extended_friends = await redisGetExtendedFriends(username);
    } catch (error) {
      return reject(error);
    }
    if (extended_friends === null || extended_friends === undefined) {
      return reject();
    } else {
      return resolve({ extended_friends });
    }
  });
};

module.exports.getRecommendations = function ({ username: username }) {
  return new Promise(async function (resolve, reject) {
    let friend_recommendations;
    try {
      friend_recommendations = await redisGetFriendRecommendations(username);
    } catch (error) {
      return reject(error);
    }
    if (
      friend_recommendations === null ||
      friend_recommendations === undefined
    ) {
      return reject();
    } else {
      return resolve({ friend_recommendations: friend_recommendations });
    }
  });
};
