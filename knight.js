const chessBoard = new Map();

const ChessSquare = ([x, y]) => {
  const knightMoves = [];

  const name = () => `${x}, ${y}`;

  const getKnightMoves = () => knightMoves;

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

    moves.map((move) => {
      const validMove = getValidKnightMove(move);
      if (validMove) knightMoves.push(validMove);
    });
  };

  const getValidKnightMove = ([moveX, moveY]) => {
    const [newX, newY] = [x + moveX, y + moveY];
    if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8)
      return ChessSquare([newX, newY]);
  };

  if (chessBoard.has(name())) return chessBoard.get(name());
  else {
    const square = { name, getKnightMoves, createKnightMoves };
    chessBoard.set(name(), square);
    return square;
  }
};

const square = ChessSquare([0, 0]);
square.createKnightMoves();
console.log(square.getKnightMoves());
