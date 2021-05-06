const canvas = document.getElementById("canvas");
const pen = canvas.getContext("2d");
pen.fillStyle = "green";
// pen.fillStyle = "green";
// pen.fillRect(50, 50, 200, 100); // (coordinate x,coordinate y, width, height)
// pen.fillStyle = "red";
// pen.font = "30px sans-serif";
const W = 800;
const H = 600;

// size of one cell
const cs = 30;

//create food object
let food = null;

//Score
let score = 0;

//creating a snake object
const snake = {
  init_len: 5,
  direction: "right",
  cells: [],
  createSnake: function () {
    for (let i = 0; i < this.init_len; i++) {
      this.cells.push({
        x: i,
        y: 0,
      });
    }
  },
  drawSnake: function () {
    for (let cell of this.cells) {
      pen.fillRect(cell.x * cs, cell.y * cs, cs - 1, cs - 1);
    }
  },
  updateSnake: function () {
    let headX = this.cells[this.cells.length - 1].x;
    let headY = this.cells[this.cells.length - 1].y;

    //checking for food collision
    if (food.x == headX && food.y == headY) {
      food = randomFood();
      score++;
    } else {
      this.cells.shift();
    }

    let nextX, nextY;

    if (this.direction == 'up') {
      nextX = headX;
      nextY = headY - 1;
      if (nextY * cs < 0) {
        pen.fillText("Game Over", 20, 100);
        clearInterval(id);
      }
    } else if (this.direction == 'down') {
      nextX = headX;
      nextY = headY + 1;
      if (nextY * cs > H) {
        pen.fillText("Game Over", 20, 100);
        clearInterval(id);
      }
    } else if (this.direction == 'left') {
      nextX = headX - 1;
      nextY = headY;
      if (nextX * cs < 0) {
        pen.fillText("Game Over", 20, 100);
        clearInterval(id);
      }
    } else {
      nextX = headX + 1;
      nextY = headY;
      if (nextX * cs > W) {
        pen.fillText("Game Over", 20,100);
        clearInterval(id);
      }
    }
    // creating x and y for the next cell
    
    // this.cells.shift(); // remove one cell from cells array

    // adding a new cell inside cells array
    this.cells.push({
      x: nextX,
      y: nextY,
    });
  },
};

// intial -- used to intialize game

function init() {
  snake.createSnake();
  snake.drawSnake();
  function keypressed(e) {
    // console.log("key pressed");
    // console.log(e.key);
    if (e.key == 'ArrowUp') {
      snake.direction = 'up';
    } else if (e.key == 'ArrowDown') {
      snake.direction = 'down';
    } else if (e.key == 'ArrowLeft') {
      snake.direction = 'left';
    } else {
      snake.direction = 'right';
    }
  }
  document.addEventListener('keydown', keypressed);
  food = randomFood();
}

// draw --- used to draw onject on canvas

function draw() {
  pen.clearRect(0, 0, W, H);
  pen.fillStyle="lightgreen";
  pen.font="40px sans-serif";
  pen.fillText(`Score:${score}`, 20, 50);
  pen.fillStyle = "blue";
  pen.fillRect(food.x * cs, food.y * cs, cs, cs);
  pen.fillStyle = "green";
  snake.drawSnake();
}

// update --- keeps on updating game
function update() {
  snake.updateSnake();
}
// create random food
function randomFood() {
  let foodX = Math.round((Math.random() * (W - cs)) / cs);
  let foodY = Math.round((Math.random() * (H - cs)) / cs);
  const food = {
    x: foodX,
    y: foodY,
  };
  return food;
}

//gameLoop
function gameLoop() {
  draw();
  update();
}

init();
const id = setInterval(gameLoop, 100);
