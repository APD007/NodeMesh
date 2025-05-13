const Graph = require("../utils/DataStructures");
const { getAllVertices, getAllEdges } = require("../utils/graph_utils");
const {
  redisSetGraph,
  redisGetGraph,
  redisSetShortestPaths,
  redisGetShortestPaths,
  redisSetFriends,
  redisSetExtendedFriends,
  redisSetFriendRecommendations,
} = require("../utils/redis_utils");

module.exports.buildGraph = function () {
  return new Promise(async function (resolve, reject) {
    let graph;
    try {
      graph = await redisGetGraph();
    } catch (error) {
      return reject(error);
    }
    if (graph === null || graph === undefined) {
      graph = new Graph();
      let vertices, edges;
      try {
        vertices = JSON.parse(await getAllVertices());
      } catch (error) {
        return reject(error);
      }
      try {
        edges = JSON.parse(await getAllEdges());
      } catch (error) {
        return reject(error);
      }
      for (let vertex of vertices) {
        graph.addVertex(vertex.username);
      }
      for (let edge of edges) {
        graph.addEdge(edge.friend_one, edge.friend_two);
      }
      let new_promise;
      try {
        new_promise = await redisSetGraph(graph.stringify());
      } catch (error) {
        return reject(error);
      }
      return resolve();
    } else {
      return resolve();
    }
  });
};

module.exports.shortestPaths = function ({ username: username }) {
  return new Promise(async function (resolve, reject) {
    let graph;
    try {
      graph = await redisGetGraph();
    } catch (error) {
      return reject(error);
    }
    if (graph === null || graph === undefined) {
      return reject();
    }
    graph = new Graph(graph);
    let results = graph.dijkstra(username);
    let new_promise;
    try {
      new_promise = await redisSetShortestPaths(username, results);
    } catch (error) {
      return reject(error);
    }
    return resolve();
  });
};

module.exports.loadFriends = function ({ username: username }) {
  return new Promise(async function (resolve, reject) {
    let shortest_paths;
    try {
      shortest_paths = await redisGetShortestPaths(username);
    } catch (error) {
      return reject(error);
    }
    if (shortest_paths === null || shortest_paths === undefined) {
      return reject();
    }
    let distances = new Map(Object.entries(shortest_paths));
    let friends = [];
    let extended_friends = [];
    for (let [user, distance] of distances.entries()) {
      if (distance === 1) {
        friends.push(user);
      } else if (distance >= 2 && distance < 5) {
        extended_friends.push(user);
      }
    }
    let new_promise;
    try {
      new_promise = await redisSetFriends(username, friends);
    } catch (error) {
      return reject(error);
    }
    let new_promise_2;
    try {
      new_promise_2 = await redisSetExtendedFriends(username, extended_friends);
    } catch (error) {
      return reject(error);
    }
    return resolve();
  });
};
//Jaccard Coefficient (N(intersection) / N(union))
//load the graph
//loop through the
module.exports.loadRecommendations = function ({ username: username }) {
  return new Promise(async function (resolve, reject) {
    let graph;
    try {
      graph = await redisGetGraph();
    } catch (error) {
      return reject(error);
    }
    if (graph === null || graph === undefined) {
      return reject();
    }
    graph = new Graph(graph);
    let friend_recommendations = graph.recommendFriends(username);
    let new_promise;
    try {
      new_promise = await redisSetFriendRecommendations(
        username,
        friend_recommendations
      );
    } catch (error) {
      return reject(error);
    }
    return resolve();
  });
};
