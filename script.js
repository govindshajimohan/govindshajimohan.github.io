const canvas = document.getElementById('snakeCanvas');
const ctx = canvas.getContext('2d');

const boxSize = 20;
const canvasSize = 400;
let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let direction = 'right';

function draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvasSize, canvasSize);

  // Draw snake
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? 'green' : 'white';
    ctx.fillRect(snake[i].x * boxSize, snake[i].y * boxSize, boxSize, boxSize);
  }

  // Draw food
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x * boxSize, food.y * boxSize, boxSize, boxSize);

  // Move the snake
  let newHead = { x: snake[0].x, y: snake[0].y };

  if (direction === 'right') newHead.x++;
  if (direction === 'left') newHead.x--;
  if (direction === 'up') newHead.y--;
  if (direction === 'down') newHead.y++;

  snake.unshift(newHead);

  // Check for collision with food
  if (newHead.x === food.x && newHead.y === food.y) {
    // Generate new food
    food = {
      x: Math.floor(Math.random() * (canvasSize / boxSize)),
      y: Math.floor(Math.random() * (canvasSize / boxSize))
    };
  } else {
    // Remove the tail
    snake.pop();
  }

  // Check for collision with walls or itself
  if (
    newHead.x < 0 ||
    newHead.x >= canvasSize / boxSize ||
    newHead.y < 0 ||
    newHead.y >= canvasSize / boxSize ||
    collision(newHead, snake.slice(1))
  ) {
    clearInterval(gameInterval);
    alert('Game Over! Reload the page to play again.');
  }
}

function collision(head, array) {
  return array.some(segment => segment.x === head.x && segment.y === head.y);
}

function changeDirection(e) {
  const key = e.key;
  if (key === 'ArrowUp' && direction !== 'down') direction = 'up';
  if (key === 'ArrowDown' && direction !== 'up') direction = 'down';
  if (key === 'ArrowLeft' && direction !== 'right') direction = 'left';
  if (key === 'ArrowRight' && direction !== 'left') direction = 'right';
}

document.addEventListener('keydown', changeDirection);

const gameInterval = setInterval(draw, 150);
