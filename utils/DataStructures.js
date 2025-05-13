class PQNode {
  constructor(user, distance) {
    (this.user = user), (this.distance = distance);
  }
}

class PriorityQueue {
  constructor() {
    this.items = [];
  }

  isEmpty() {
    return this.items.length == 0;
  }
  enqueue(user, distance) {
    let pqNode = new PQNode(user, distance);
    let contain = false;

    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].distance > pqNode.distance) {
        this.items.splice(i, 0, pqNode);
        contain = true;
        break;
      }
    }

    if (!contain) {
      this.items.push(pqNode);
    }
  }

  dequeue() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items.shift();
  }

  front() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items[0];
  }

  rear() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items[this.items.length - 1];
  }
}

class Graph {
  constructor(graph_string) {
    if (graph_string === undefined) {
      this.graph = new Map();
    } else {
      this.load_graph(graph_string);
    }
  }
  addVertex(user) {
    this.graph.set(user, new Set());
  }
  addEdge(user1, user2) {
    this.graph.get(user1).add(user2);
    this.graph.get(user2).add(user1);
  }
  printGraph() {
    for (let user of this.graph) {
      console.log(user);
    }
  }
  stringify() {
    let graph_string = {};
    for (let user of this.graph) {
      graph_string[user[0]] = [];
      for (let key of user[1]) {
        graph_string[user[0]].push(key);
      }
    }
    return JSON.stringify(graph_string);
  }
  load_graph(graph_string) {
    graph_string = JSON.parse(graph_string);
    let users = Object.keys(graph_string);
    let temp_graph = new Map();
    users.forEach(function (user) {
      temp_graph.set(user, new Set());
      for (let friend of graph_string[user]) {
        temp_graph.get(user).add(friend);
      }
    });
    this.graph = temp_graph;
  }
  getGraph() {
    return this.graph;
  }
  dijkstra(start_user) {
    let distance = new Map();
    let parent = new Map();
    for (let user of this.graph.keys()) {
      distance.set(user, Infinity);
      parent.set(user, null);
    }
    distance.set(start_user, 0);
    let pq = new PriorityQueue();
    pq.enqueue(start_user, 0);
    while (!pq.isEmpty()) {
      let current = pq.dequeue();
      let neighbours = this.graph.get(current.user).values();
      for (let n of neighbours) {
        if (distance.get(current.user) + 1 < distance.get(n)) {
          distance.set(n, 1 + distance.get(current.user));
          parent.set(n, current.user);
          pq.enqueue(n, distance.get(n));
        }
      }
    }
    return Object.fromEntries(distance);
  }

  getJaccardCoefficient(node1, node2) {
    if (node1 === node2) {
      return 0;
    }
    let set1 = new Set();
    let set2 = new Set();
    set1 = this.graph.get(node1);
    set2 = this.graph.get(node2);
    console.log(set1, set2);
    let intersect = new Set(
      [...set1].filter(function (elem) {
        return set2.has(elem);
      })
    );
    let union = new Set([...set1, ...set2]);
    console.log(node1, node2, intersect, union);
    return parseFloat((intersect.size / union.size).toFixed(2));
  }
  recommendFriends(user1) {
    let ans = [];
    for (let user2 of this.graph.keys()) {
      ans.push({
        friend: user2,
        probability: this.getJaccardCoefficient(user1, user2),
      });
    }
    ans.sort(function (elem1, elem2) {
      if (elem1.probability > elem2.probability) {
        return -1;
      } else {
        return 1;
      }
    });
    return ans;
  }
}

module.exports = Graph;
//=========TESTING CODE ====================//
g = new Graph();
g.addVertex("name1");
g.addVertex("name2");
g.addVertex("name3");
g.addVertex("name4");
g.addVertex("name5");
g.addVertex("name6");
g.addVertex("name7");
g.addVertex("name8");
g.addVertex("name9");
g.addVertex("name10");

g.addEdge("name1", "name2");
g.addEdge("name1", "name3");
g.addEdge("name1", "name4");
g.addEdge("name2", "name5");
g.addEdge("name3", "name4");
g.addEdge("name3", "name6");
g.addEdge("name6", "name7");
g.addEdge("name7", "name8");
g.addEdge("name7", "name9");
g.addEdge("name9", "name10");

console.log("Graph 1");
g.printGraph();

// let { distance, parent } = g.dijkstra("name1");

// console.log(distance);

graph_string = JSON.parse(JSON.stringify(g.stringify()));

G = new Graph(graph_string);
console.log("Graph 2");
G.printGraph();
// let distance = G.dijkstra("name1");
// console.log(distance);

console.log(G.recommendFriends("name1"));
