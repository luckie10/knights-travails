const Graph = () => {
  const list = new Map();

  const createNode = (data) => {
    list.set(data, []);
  };

  const createEdge = (from, to) => {
    list.get(from).push(to);
    list.get(to).push(from);
  };

  return {
    list,
    createNode,
    createEdge,
  };
};

export { Graph as default };
