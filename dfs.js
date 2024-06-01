const dfsButton = document.getElementById("dfsButton");

let visitedNodesDFS = new Array(qntnNodes).fill(false);

async function dfsStep(matrix, context, current = 0) {
  if (checker(visitedNodesDFS)) {
    alert("DFS opened all nodes");
    drawAllNodes(contextNapr, "#931f1f", "white");
    return;
  }
  visitedNodesDFS[current] = true;
  drawNode(current, contextNapr, "#931f1f", "white");

  for (let i = 0; i < qntnNodes; i++) {
    if (matrix[current][i] === 1 && !visitedNodesDFS[i]) {
      const startX = nodePositions[current].x;
      const startY = nodePositions[current].y;
      const endX = nodePositions[i].x;
      const endY = nodePositions[i].y;
      drawLine(startX, startY, endX, endY, context, "#931f1f", 4);

      const angle = Math.atan2(startY - endY, startX - endX);
      const indentX = radius * Math.cos(angle);
      const indentY = radius * Math.sin(angle);
      context.beginPath();
      drawArrow(endX + indentX, endY + indentY, context, angle, 6);
      context.stroke();

      drawNode(i, contextNapr, "#f10505", "white");
      console.log(current + 1 + " -> " + (i + 1));

      await new Promise((resolve) => setTimeout(resolve, 3000));

      await dfsStep(matrix, context, i);
    }
  }
}

dfsButton.addEventListener("click", () => {
  dfsStep(matrixNotSymmetrical, contextNapr);
});
