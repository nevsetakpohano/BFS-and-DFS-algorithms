const bfsButton = document.getElementById("bfsButton");

let matrixTreeBFS = Array.from({ length: qntnNodes }, () =>
  Array(qntnNodes).fill(0)
);

let visitedNodes = new Array(qntnNodes).fill(false);
let queue = [];
const startNode = 0;
queue.push(startNode);
let checker = (array) => array.every(Boolean);

function bfsStep(matrix, context) {
  let current = queue.shift();
  if (checker(visitedNodes)) {
    alert("BFS opened all nodes");
    drawAllNodes(context, "#1f7d4c", "white");
    console.log(matrixTreeBFS);
    return;
  }
  for (let i = 0; i < 10; i++) {
    if (
      matrix[current][i] === 1 &&
      !visitedNodes[current] &&
      !visitedNodes[i] &&
      current != i &&
      !queue.includes(i)
    ) {
      const startX = nodePositions[current].x;
      const startY = nodePositions[current].y;
      const endX = nodePositions[i].x;
      const endY = nodePositions[i].y;
      drawLine(startX, startY, endX, endY, context, "#1f7d4c", 4);

      const angle = Math.atan2(startY - endY, startX - endX);
      const indentX = radius * Math.cos(angle);
      const indentY = radius * Math.sin(angle);
      context.beginPath();
      drawArrow(endX + indentX, endY + indentY, context, angle, 6);
      context.stroke();
      matrixTreeBFS[current][i] = 1;
      queue.push(i);
      drawNode(i, context, "#05F140", "black");
      console.log(current + 1 + " -> " + (i + 1));
    }
  }
  visitedNodes[current] = true;
  drawNode(current, context, "#1f7d4c", "white");
}

bfsButton.addEventListener("click", () => {
  bfsStep(matrixNotSymmetrical, contextNapr);
});
