const chessBoard = new Map();

const ChessSquare = ([x, y]) => {
  const name = () => `${x}, ${y}`;

  if (chessBoard.has(name())) return chessBoard.get(name());
  else {
    const square = { name, getKnightMoves };
    chessBoard.set(name(), square);
    return square;
  }
};
