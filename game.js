function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function delay(milliseconds) {
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}

function makeGrid(width, height) {
    var grid = Array(WIDTH).fill(0).map(() => Array(HEIGHT));
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            grid[i][j] = getRandomInt(2);
        }
    }
    return grid;
}

function drawGrid(grid) {
    const myCanvas = document.getElementById("game");
    const context = myCanvas.getContext("2d");
    context.fillStyle = "black";
    context.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    var width = grid.length;
    var height = grid[0].length;
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            let x = i * RESOLUTION;
            let y = j * RESOLUTION;
            if (grid[i][j] == 1) {
                context.fillStyle = "white";
                context.fillRect(x + 1 - RESOLUTION, y + 1 - RESOLUTION, RESOLUTION - 1, RESOLUTION - 1);
            }
        }
    }
}

function countNeighbors(grid, row, column) {
    var result = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            result += grid[row + i][column + j];
        }
    }
    result -= grid[row][column];
    return result;
}

function checkCell(grid, row, column) {
    var neighbors = countNeighbors(grid, row, column);
    if (grid[row][column] == 1) {
        if (neighbors == 2 || neighbors == 3) {
            return 1;
        }
        else {
            return 0;
        }
    }
    else {
        if (neighbors == 3) {
            return 1;
        }
        else {
            return 0;
        }
    }
}

function updateGrid(grid) {
    var width = grid.length;
    var height = grid[0].length;
    var newGrid = Array(WIDTH).fill(0).map(() => Array(HEIGHT));
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            if (i == 0 || j == 0 || i == width - 1 || j == height - 1) {
                newGrid[i][j] = 0;
            }
            else {
                newGrid[i][j] = checkCell(grid, i, j);
            }
        }
    }
    return newGrid;
}

function aliveCells(grid) {
    return grid.flat().reduce((sum, currentValue) => sum + currentValue);
}

function deadCells(grid, aliveCells) {
    return (grid.length * grid[0].length) - aliveCells;
}

async function game() {
    var grid = makeGrid(WIDTH, HEIGHT);
    while (true) {
        grid = updateGrid(grid);
        drawGrid(grid);
        var numOfAliveCells = aliveCells(grid);
        document.getElementById('aliveCells').innerHTML = "AliveCells: " + numOfAliveCells;
        document.getElementById('deadCells').innerHTML = "DeadCells: " + deadCells(grid, numOfAliveCells);
        await delay(100);
    }
}


const SCREEN_WIDTH = 1200 + 1;
const SCREEN_HEIGHT = 800 + 1;
const RESOLUTION = 20;
const WIDTH = Math.ceil(SCREEN_WIDTH / RESOLUTION) + 1;
const HEIGHT = Math.ceil(SCREEN_HEIGHT / RESOLUTION) + 1;
game();
