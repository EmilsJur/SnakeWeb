const board = document.getElementById("game-board");
const gateway = document.querySelector(".gateway");
const snakeSegments = [];
const gridSize = 20;
let foodX, foodY;
let direction = "right";
let score = 0;
let gameInterval;

function createSegment(x, y) {
  const segment = document.createElement("div");
  segment.className = "snake-segment";
  segment.style.left = x + "px";
  segment.style.top = y + "px";
  board.appendChild(segment);
  return segment;
}

function createFood() {
    foodX = Math.floor(Math.random() * (board.clientWidth / gridSize)) * gridSize;
    foodY = Math.floor(Math.random() * (board.clientHeight / gridSize)) * gridSize;
  
    const food = document.createElement("div");
    food.className = "food";
    food.style.left = foodX + "px";
    food.style.top = foodY + "px";
    board.appendChild(food);
  }
  
  function checkCollision() {
    const head = snakeSegments[0];
    for (let i = 1; i < snakeSegments.length; i++) {
      const segment = snakeSegments[i];
      if (parseInt(head.style.left) === parseInt(segment.style.left) && parseInt(head.style.top) === parseInt(segment.style.top)) {
        clearInterval(gameInterval);
        alert("Spele beidzas! Tavs punktu skaits ir: " + score);
        window.location.reload();
      }
    }
  }
  
  function moveSnake() {
    const head = snakeSegments[0];
    let newX = parseInt(head.style.left);
    let newY = parseInt(head.style.top);
  
    switch (direction) {
      case "up":
        newY -= gridSize;
        break;
      case "down":
        newY += gridSize;
        break;
      case "left":
        newX -= gridSize;
        break;
      case "right":
        newX += gridSize;
        break;
    }
  
    if (newX === foodX && newY === foodY) {
      const tail = createSegment(newX, newY);
      snakeSegments.unshift(tail);
      board.removeChild(board.querySelector(".food"));
      createFood();
      score++;
    } else {
      const tail = snakeSegments.pop();
      tail.style.left = newX + "px";
      tail.style.top = newY + "px";
      snakeSegments.unshift(tail);
    }
  
    checkCollision(); 
  
    if (newX < 0 || newX >= board.clientWidth || newY < 0 || newY >= board.clientHeight) {
      clearInterval(gameInterval);
      alert("Spele beidzas! Tavs punktu skaits ir: " + score);
      window.location.reload();
    }
  }
  

function changeDirection(event) {
  switch (event.key) {
    case "ArrowUp":
      if (direction !== "down") direction = "up";
      break;
    case "ArrowDown":
      if (direction !== "up") direction = "down";
      break;
    case "ArrowLeft":
      if (direction !== "right") direction = "left";
      break;
    case "ArrowRight":
      if (direction !== "left") direction = "right";
      break;
  }
}

function startGame() {
  createFood();
  for (let i = 3; i >= 0; i--) {
    snakeSegments.push(createSegment(i * gridSize, 0));
  }
  gameInterval = setInterval(moveSnake, 150);
  document.addEventListener("keydown", changeDirection);
}

startGame();
