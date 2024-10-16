function Spot(i, j) {
  const canvas = document.getElementById("maze");
  const ctx = canvas.getContext("2d");
  this.i = i;
  this.j = j;
  this.f = 0;
  this.g = 0;
  this.h = 0;
  this.neighbors = [];
  this.previous = undefined;
  this.wall = false;

  if (Math.floor(Math.random() * 5) == 1) {
    this.wall = true;
  }

  this.show = function () {
    var x = this.i * w;
    var y = this.j * w;
    ctx.rect(x, y, w, h);
    ctx.stroke();
  };

  this.OSHighlight = function () {
    var x = this.i * w;
    var y = this.j * w;
    ctx.fillStyle = "green";
    ctx.fillRect(x, y, w, w);
  };

  this.CSHighlight = function () {
    var x = this.i * w;
    var y = this.j * w;
    ctx.fillStyle = "blue";
    ctx.fillRect(x, y, w, w);
  };

  this.pathHighlight = function () {
    var x = this.i * w;
    var y = this.j * w;
    ctx.fillStyle = "red";
    ctx.fillRect(x, y, w, w);
  };

  this.wallHighlight = function () {
    var x = this.i * w;
    var y = this.j * w;
    if (this.wall) {
      ctx.fillStyle = "black";
      ctx.fillRect(x, y, w, w);
    }
  };

  this.highlightEnd = function () {
    var x = this.i * w;
    var y = this.j * w;
      ctx.fillStyle = "pink";
      ctx.fillRect(x, y, w, w);
  };

  this.addNeighbors = function (grid) {
    var i = this.i;
    var j = this.j;
    if (i < cols - 1) {
      this.neighbors.push(grid[i + 1][j]);
    }
    if (i > 0) {
      this.neighbors.push(grid[i - 1][j]);
    }
    if (j < rows - 1) {
      this.neighbors.push(grid[i][j + 1]);
    }
    if (j > 0) {
      this.neighbors.push(grid[i][j - 1]);
    }
  };
}
