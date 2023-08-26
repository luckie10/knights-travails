const chessBoard = new Map();

const ChessSquare = ([x, y]) => {
  const name = () => `${x}, ${y}`;

  const createKnightMoves = () => {
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

    return moves.map(checkMovement).filter(Boolean);
  };

  const checkMovement = ([moveX, moveY]) => {
    const [newX, newY] = [x + moveX, y + moveY];
    if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8)
      return ChessSquare([newX, newY]);
  };

  if (chessBoard.has(name())) return chessBoard.get(name());
  else {
    const square = { name, createKnightMoves };
    chessBoard.set(name(), square);
    return square;
  }
};

const bfs = (start, end) => {
  if (!start || !end) return;

  const startNode = ChessSquare(start);
  const endNode = ChessSquare(end);
  const queue = [startNode];

  const discovered = new Set();
  discovered.add(startNode.name());

  const edges = new Map();
  edges.set(startNode.name(), 0);

  const predecessors = new Map();
  predecessors.set(startNode.name(), null);

  const buildPath = (end, predecessors) => {
    const path = [];

    path.push([end]);

    let currPredecessor = predecessors.get(end);
    while (currPredecessor) {
      path.push([currPredecessor]);
      currPredecessor = predecessors.get(currPredecessor);
    }

    return path.reverse();
  };

  while (queue.length) {
    const first = queue.shift();

    if (first === endNode)
      return {
        distance: edges.get(endNode.name()),
        path: buildPath(endNode.name(), predecessors),
      };

    const moves = first.createKnightMoves();
    moves.forEach((move) => {
      if (!discovered.has(move.name())) {
        queue.push(move);
        discovered.add(move.name());
        edges.set(move.name(), edges.get(first.name()) + 1);
        predecessors.set(move.name(), first.name());
      }
    });
  }

  return false;
};

const knightMoves = (start, end) => {
  const { distance, path } = bfs(start, end);

  console.log(`You made it in ${distance}!
Here is your full path:`);
  path.forEach((node) => console.log(node));
};

export default knightMoves;
