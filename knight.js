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
