const canvasNeNapr = document.getElementById("neNapr");
const canvasNapr = document.getElementById("napr");
const contextNeNapr = canvasNeNapr.getContext("2d");
const contextNapr = canvasNapr.getContext("2d");

const qntnNodes = 10;
const coef = 1.0 - 0 * 0.01 - 1 * 0.005 - 0.15;
const radius = 15;
const nodePositions = [
  { x: 120, y: 250 }, //1
  { x: 200, y: 150 }, //2
  { x: 300, y: 110 }, //3
  { x: 400, y: 150 }, //4
  { x: 480, y: 250 }, //5
  { x: 480, y: 350 }, //6
  { x: 400, y: 450 }, //7
  { x: 300, y: 490 }, //8
  { x: 200, y: 450 }, //9
  { x: 120, y: 350 }, //10
];

function generateAdjacencyMatrixSymmetrical() {
  const seed = 3301;
  let matrix = [];
  Math.seedrandom(seed);
  for (let i = 0; i < qntnNodes; i++) {
    matrix[i] = [];
    for (let j = 0; j < qntnNodes; j++) {
      matrix[i][j] = Math.random() * 2 * coef;
      matrix[i][j] = matrix[i][j] < 1 ? 0 : 1;
    }
  }
  for (let i = 0; i < qntnNodes; i++) {
    for (let j = 0; j < qntnNodes; j++) {
      if (matrix[i][j] === 1 && matrix[i][j] !== matrix[j][i]) {
        matrix[j][i] = 1;
      }
    }
  }
  return matrix;
}

function generateAdjacencyMatrixNotSymmetrical() {
  const seed = 3301;
  let matrix = [];
  Math.seedrandom(seed);
  for (let i = 0; i < qntnNodes; i++) {
    matrix[i] = [];
    for (let j = 0; j < qntnNodes; j++) {
      matrix[i][j] = Math.random() * 2 * coef;
      matrix[i][j] = matrix[i][j] < 1 ? 0 : 1;
    }
  }
  return matrix;
}

function drawAllNodes(context, colour, txtColour) {
  nodePositions.forEach((position, index) => {
    context.fillStyle = colour;
    context.beginPath();
    context.arc(position.x, position.y, radius, 0, Math.PI * 2, true);
    context.fill();
    context.stroke();
    context.font = "14px Times New Roman";
    context.fillStyle = txtColour;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(`${index + 1}`, position.x, position.y);
  });
}

function drawNode(index, context, bgColour, txtColour) {
  context.fillStyle = bgColour;
  context.strokeStyle = "black";
  context.lineWidth = 2;

  context.beginPath();
  context.arc(
    nodePositions[index].x,
    nodePositions[index].y,
    radius,
    0,
    Math.PI * 2,
    true
  );
  context.fill();
  context.stroke();
  context.font = "14px Times New Roman";
  context.fillStyle = txtColour;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(
    `${index + 1}`,
    nodePositions[index].x,
    nodePositions[index].y
  );
}

const drawArrow = (x, y, context, angle, size) => {
  const arrowSize = size;

  context.save();
  context.translate(x, y);
  context.rotate(angle);
  context.moveTo(0, 0);
  context.lineTo(arrowSize, -arrowSize);
  context.lineTo(0, 0);
  context.lineTo(arrowSize, arrowSize);
  context.closePath();
  context.restore();
};

function drawLine(startX, startY, endX, endY, context, colour, lineWidth) {
  context.strokeStyle = colour;
  context.lineWidth = lineWidth;
  context.beginPath();
  context.moveTo(startX, startY);
  context.lineTo(endX, endY);
  context.stroke();
}

function drawEdges(matrix, context) {
  for (let i = 0; i < qntnNodes; i++) {
    for (let j = 0; j < qntnNodes; j++) {
      if (matrix[i][j] === 1) {
        const startX = nodePositions[j].x;
        const startY = nodePositions[j].y;
        const endX = nodePositions[i].x;
        const endY = nodePositions[i].y;

        drawLine(startX, startY, endX, endY, context, "black", 2);

        if (context === contextNapr) {
          const angle = Math.atan2(endY - startY, endX - startX);
          const indentX = radius * Math.cos(angle);
          const indentY = radius * Math.sin(angle);
          drawArrow(startX + indentX, startY + indentY, context, angle, 4);
        }
        if (i === j) {
          context.beginPath();
          if (i < 5) {
            context.arc(
              endX,
              endY - radius * 2,
              radius,
              -Math.PI / 2,
              (3 * Math.PI) / 2,
              true
            );
            if (context === contextNapr) {
              drawArrow(
                nodePositions[i].x + 5,
                nodePositions[i].y - 15,
                context,
                -Math.PI / 4,
                4
              );
            }
            context.stroke();
          } else {
            context.arc(
              endX,
              endY + radius * 2,
              radius,
              Math.PI / 2,
              (-3 * Math.PI) / 2,
              true
            );
            if (context === contextNapr) {
              drawArrow(
                nodePositions[i].x + 5,
                nodePositions[i].y + 15,
                context,
                Math.PI / 4,
                4
              );
            }
            context.stroke();
          }
        }
        context.stroke();
      }
    }
  }
}
const matrixSymmetrical = generateAdjacencyMatrixSymmetrical();
console.log(matrixSymmetrical);
const matrixNotSymmetrical = generateAdjacencyMatrixNotSymmetrical();
console.log(matrixNotSymmetrical);

drawEdges(matrixNotSymmetrical, contextNapr);
drawEdges(matrixSymmetrical, contextNeNapr);

drawAllNodes(contextNeNapr, "#DAB785", "black");
drawAllNodes(contextNapr, "#DAB785", "black");
