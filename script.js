const canvasNeNapr = document.getElementById("neNapr");
const canvasNapr = document.getElementById("napr");

const contextNeNapr = canvasNeNapr.getContext("2d");
const contextNapr = canvasNapr.getContext("2d");
////3301
const qntnNodes = 10;
const coef = 1 - 0 * 0.01 - 1 * 0.005 - 0.15;
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

function drawNodes(context) {
  nodePositions.forEach((position, index) => {
    context.fillStyle = "#DAB785";
    context.beginPath();
    context.arc(position.x, position.y, radius, 0, Math.PI * 2, true);
    context.fill();
    context.stroke();
    context.font = "14px Times New Roman";
    context.fillStyle = "black";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(`${index + 1}`, position.x, position.y);
  });
}

const drawArrow = (x, y, context, angle) => {
  const arrowSize = 4;
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

function drawEdges(matrix, context) {
  context.strokeStyle = "rgba(0, 0, 0, 1)";
  context.lineWidth = 2;
  const offset = 20;

  for (let i = 0; i < qntnNodes; i++) {
    for (let j = 0; j < qntnNodes; j++) {
      if (matrix[i][j] === 1) {
        const startX = nodePositions[i].x;
        const startY = nodePositions[i].y;
        const endX = nodePositions[j].x;
        const endY = nodePositions[j].y;

        context.beginPath();
        context.moveTo(startX, startY);

        let midX, midY;

        if (matrix[j][i] === 1 && i !== j && context === contextNapr) {
          midX = (startX + endX) / 2 + (startY - endY) / offset;
          midY = (startY + endY) / 2 + (endX - startX) / offset;
          context.lineTo(midX, midY);
        }
        context.lineTo(endX, endY);
        context.stroke();

        if (context === contextNapr) {
          if (matrix[j][i] === 1 && i !== j) {
            const midAngle = Math.atan2(midY - endY, midX - endX);
            const indentMidX = radius * Math.cos(midAngle);
            const indentMidY = radius * Math.sin(midAngle);
            drawArrow(endX + indentMidX, endY + indentMidY, context, midAngle);
          } else {
            const angle = Math.atan2(startY - endY, startX - endX);
            const indentX = radius * Math.cos(angle);
            const indentY = radius * Math.sin(angle);
            drawArrow(endX + indentX, endY + indentY, context, angle);
          }
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
                -Math.PI / 4
              );
            }

            context.stroke();
          } else if (i > 4) {
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
                Math.PI / 4
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

drawNodes(contextNeNapr);
drawNodes(contextNapr);

/////////////////////////////////////////////////////////////////////////////
