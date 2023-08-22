import Graph from "./graph.js";

const moves = [
  [2, 1],
  [2, -1],
  [-2, 1],
  [-2, -1],
  [1, 2],
  [1, -2],
  [-1, 2],
  [-1, -2],
];

const knight = Graph();
const knightPositions = knight.list;

for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 8; j++) {
    knight.createNode(JSON.stringify([i, j]));
  }
}

knightPositions.forEach((edges, node) => {
  const [x, y] = JSON.parse(node);

  moves.forEach(([xMove, yMove]) => {
    const moveTo = JSON.stringify([x + xMove, y + yMove]);
    if (knightPositions.get(moveTo)) edges.push(moveTo);
  });
});

const bfs = (from, to) => {
  if (!from) return;

  let result = null;
  const visited = new Set();
  let queue = [[from]];

  while (queue.length && !result) {
    const prev = queue.shift();
    const firstKey = prev.pop();
    const first = knightPositions.get(firstKey);

    first.forEach((edge) => {
      if (edge === to) {
        result = [...prev, firstKey, edge];
        console.log("Found it:", [...prev, firstKey, edge]);
      }
      if (!visited.has(edge)) {
        visited.add(edge);
        queue.push([...prev, firstKey, edge]);
      }
    });
  }

  return result;
};

const knightMoves = (from, to) => {
  from = JSON.stringify(from);
  to = JSON.stringify(to);

  const result = bfs(from, to);
  return `You made it in ${result.length - 1} moves! Here's your path:
${result}`;
};

console.log(knightMoves([3, 3], [4, 3]));
