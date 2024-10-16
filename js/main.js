const canvas = document.getElementById("maze");
const ctx = canvas.getContext("2d");
canvas.width = 1080;
canvas.height = 480;

var cols = 36;
var rows = 16;
var grid = new Array(cols);
var gridAvailable = new Array(cols);

var openSet = [];
var closedSet = [];
var start;
var end;
var w, h;
var path = [];
var noSolution = true;
var frame;

//Mang ngau nhien !!!
function setup() {
  console.log("A*");
  w = canvas.width / cols;
  h = canvas.height / rows;

  for (let i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new Spot(i, j);
    }
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].addNeighbors(grid);
    }
  }

  start = grid[0][0];
  end = grid[cols - 1][rows - 1];
  start.wall = false;
  end.wall = false;
  openSet.push(start);
}

function draw() {
  canvas.width = 1080;
  canvas.height = 480;
  ctx.clearRect(0, 0, 1080, 480);
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (openSet.length > 0) {
    var winner = 0;
    for (var i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[winner].f) {
        winner = i;
      }
    }
    var current = openSet[winner];

    if (current === end) {
      clearInterval(frame);
    }

    removeFromArray(openSet, current);
    closedSet.push(current);

    var neighbors = current.neighbors;
    for (var i = 0; i < neighbors.length; i++) {
      var neighbor = neighbors[i];

      if (!closedSet.includes(neighbor) && !neighbor.wall) {
        var tempG = current.g + 1;

        if (openSet.includes(neighbor)) {
          if (tempG < neighbor.g) {
            neighbor.g = tempG;
          }
        } else {
          neighbor.g = tempG;
          openSet.push(neighbor);
        }

        neighbor.h = hueristic(neighbor, end);
        neighbor.f = neighbor.g + neighbor.h;
        neighbor.previous = current;
      }
    }
  } else {
    document.getElementById("demo").innerHTML = "Không thấy đường!!!";
    noSolution = false;
    clearInterval(frame);
  }

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].show();
    }
  }

  end.highlightEnd();

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].wallHighlight();
    }
  }

  for (var i = 0; i < closedSet.length; i++) {
    closedSet[i].CSHighlight();
  }

  for (var i = 0; i < openSet.length; i++) {
    openSet[i].OSHighlight();
  }

  if (noSolution) {
    path = [];
    var temp = current;
    path.push(temp);
    while (temp.previous) {
      if (temp.previous) {
        path.push(temp.previous);
        temp = temp.previous;
      }
    }
  }
  for (var i = 0; i < path.length; i++) {
    path[i].pathHighlight();
  }
  document.getElementById("path").innerHTML = path.length;
}

//Mang co san !!!
function setupAvailable() {
  console.log("A*");
  w = canvas.width / cols;
  h = canvas.height / rows;

  for (let i = 0; i < cols; i++) {
    gridAvailable[i] = new Array(rows);
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      gridAvailable[i][j] = new SpotAvailable(i, j);
    }
  }

  if (document.getElementById("map1").selected) {
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        if (map1[i][j] == 1) {
          gridAvailable[i][j].wall = 1;
        }
      }
    }
  } else if (document.getElementById("map2").selected) {
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        if (map2[i][j] == 1) {
          gridAvailable[i][j].wall = 1;
        }
      }
    }
  } else if (document.getElementById("map3").selected) {
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        if (map3[i][j] == 1) {
          gridAvailable[i][j].wall = 1;
        }
      }
    }
  } else if (document.getElementById("map4").selected) {
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        if (map4[i][j] == 1) {
          gridAvailable[i][j].wall = 1;
        }
      }
    }
  } else if (document.getElementById("map5").selected) {
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        if (map5[i][j] == 1) {
          gridAvailable[i][j].wall = 1;
        }
      }
    }
  } else if (document.getElementById("map6").selected) {
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        if (map6[i][j] == 1) {
          gridAvailable[i][j].wall = 1;
        }
      }
    }
  } else if (document.getElementById("map7").selected) {
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        if (map7[i][j] == 1) {
          gridAvailable[i][j].wall = 1;
        }
      }
    }
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      gridAvailable[i][j].addNeighbors(gridAvailable);
    }
  }

  start = gridAvailable[0][0];
  end = gridAvailable[cols - 1][rows - 1];
  openSet.push(start);
}

function drawAvailable() {
  canvas.width = 1080;
  canvas.height = 480;
  ctx.clearRect(0, 0, 1080, 480);
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (openSet.length > 0) {
    var winner = 0;
    for (var i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[winner].f) {
        winner = i;
      }
    }
    var current = openSet[winner];

    if (current === end) {
      clearInterval(frame);
      document.getElementById("show").innerHTML = "Hoàn thành!!!";
    }

    removeFromArray(openSet, current);
    closedSet.push(current);

    var neighbors = current.neighbors;
    for (var i = 0; i < neighbors.length; i++) {
      var neighbor = neighbors[i];

      if (!closedSet.includes(neighbor) && !neighbor.wall) {
        var tempG = current.g + 1;

        if (openSet.includes(neighbor)) {
          if (tempG < neighbor.g) {
            neighbor.g = tempG;
          }
        } else {
          neighbor.g = tempG;
          openSet.push(neighbor);
        }

        neighbor.h = hueristic(neighbor, end);
        neighbor.f = neighbor.g + neighbor.h;
        neighbor.previous = current;
      }
    }
  } else {
    document.getElementById("show").innerHTML = "Không có đường!!!";
    noSolution = false;
    clearInterval(frame);
  }

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      gridAvailable[i][j].show();
    }
  }

  end.highlightEnd();

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      if (gridAvailable[i][j].wall == 1) gridAvailable[i][j].wallHighlight();
    }
  }

  for (var i = 0; i < closedSet.length; i++) {
    closedSet[i].CSHighlight();
  }

  for (var i = 0; i < openSet.length; i++) {
    openSet[i].OSHighlight();
  }

  if (noSolution) {
    path = [];
    var temp = current;
    path.push(temp);
    while (temp.previous) {
      if (temp.previous) {
        path.push(temp.previous);
        temp = temp.previous;
      }
    }
  }
  for (var i = 0; i < path.length; i++) {
    path[i].pathHighlight();
  }
  document.getElementById("path").innerHTML = path.length;
}

function startMaze() {
  var checkbox = document.getElementsByName("checkMode");
  for (var i = 0; i < checkbox.length; i++) {
    if (checkbox.item(i).checked && i == 1) {
      if (document.getElementById("random").selected) {
        reStartMaze();
        setup();
        frame = setInterval(draw, 1000 / 60);
      } else if (document.getElementById("map1").selected) {
        reStartMaze();
        setupAvailable();
        frame = setInterval(drawAvailable, 1000 / 60);
      } else if (document.getElementById("map2").selected) {
        reStartMaze();
        setupAvailable();
        frame = setInterval(drawAvailable, 1000 / 60);
      } else if (document.getElementById("map3").selected) {
        reStartMaze();
        setupAvailable();
        frame = setInterval(drawAvailable, 1000 / 60);
      } else if (document.getElementById("map4").selected) {
        reStartMaze();
        setupAvailable();
        frame = setInterval(drawAvailable, 1000 / 60);
      } else if (document.getElementById("map5").selected) {
        reStartMaze();
        setupAvailable();
        frame = setInterval(drawAvailable, 1000 / 60);
      } else if (document.getElementById("map6").selected) {
        reStartMaze();
        setupAvailable();
        frame = setInterval(drawAvailable, 1000 / 60);
      } else if (document.getElementById("map7").selected) {
        reStartMaze();
        setupAvailable();
        frame = setInterval(drawAvailable, 1000 / 60);
      }
    }
  }
}

function reStartMaze() {
  openSet = [];
  closedSet = [];
  path = [];
  clearInterval(frame);
  ctx.clearRect(0, 0, 1080, 480);
}
 