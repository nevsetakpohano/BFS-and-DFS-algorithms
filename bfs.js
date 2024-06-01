const bfsButton = document.getElementById("bfsButton");

let visitedNodes = new Array(qntnNodes).fill(false);
let bfsStatus = false;
let queue = [];
const startNode = 0;
queue.push(startNode);
let checker = (array) => array.every(Boolean);

function bfsSearch(matrix, context) {
  bfsStatus = true;
  let current = queue.shift();
  if (checker(visitedNodes)) {
    alert("BFS opened all nodes");
    bfsStatus = false;
    //чтобы красивей было
    drawAllNodes(contextNapr, "#0C8346");
    return;
  }
  for (let i = 0; i < 10; i++) {
    if (matrix[current][i] === 1 && current != i) {
      const startX = nodePositions[current].x;
      const startY = nodePositions[current].y;
      const endX = nodePositions[i].x;
      const endY = nodePositions[i].y;
      drawLine(startX, startY, endX, endY, context, "#0C8346", 4);

      const angle = Math.atan2(startY - endY, startX - endX);
      const indentX = radius * Math.cos(angle);
      const indentY = radius * Math.sin(angle);
      context.beginPath();
      drawArrow(endX + indentX, endY + indentY, context, angle, 6);
      context.stroke();

      queue.push(i);
      if (!visitedNodes[i]) {
        drawNode(i, context, "#05F140");
      }
      console.log("search : " + (current + 1) + " -> " + (i + 1));
    }
  }
  visitedNodes[current] = true;
  drawNode(current, context, "#0C8346");
}

/////////////////////////////////////////////
let visitedNodesTree = new Array(qntnNodes).fill(false);
let queueTree = [];
queueTree.push(startNode);

function bfsTree(matrix, context) {
  let currentTree = queueTree.shift();
  if (checker(visitedNodesTree)) {
    return;
  }
  for (let i = 0; i < 10; i++) {
    if (
      matrix[currentTree][i] === 1 &&
      !visitedNodesTree[currentTree] &&
      !visitedNodesTree[i] &&
      currentTree != i &&
      !queueTree.includes(i)
    ) {
      const startX = nodePositions[currentTree].x;
      const startY = nodePositions[currentTree].y;
      const endX = nodePositions[i].x;
      const endY = nodePositions[i].y;
      drawLine(startX, startY, endX, endY, context, "#0C8346", 4);

      const angle = Math.atan2(startY - endY, startX - endX);
      const indentX = radius * Math.cos(angle);
      const indentY = radius * Math.sin(angle);
      context.beginPath();
      drawArrow(endX + indentX, endY + indentY, context, angle, 6);
      context.stroke();

      queueTree.push(i);
      drawNode(i, context, "#05F140");
      console.log("tree : " + (currentTree + 1) + " -> " + (i + 1));
    }
  }
  visitedNodesTree[currentTree] = true;
  drawNode(currentTree, context, "#0C8346");
}

bfsButton.addEventListener("click", () => {
  bfsSearch(matrixNotSymmetrical, contextNapr);
  bfsTree(matrixNotSymmetrical, contextTree);
});
