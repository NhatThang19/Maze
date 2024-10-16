function removeFromArray(arr, elm) {
  for (var i = arr.length - 1; i >= 0; i--) {
    if (arr[i] == elm) {
      arr.splice(i, 1);
    }
  }
}

function hueristic(a, b) {
  var d = dist(a.i, a.j, b.i, b.j);
  return d;
}

function dist(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function pause() {
  clearInterval(frame);
}

function play() {
  if (document.getElementById("random").selected) {
    frame = setInterval(draw, 1000/60);
  } else {
    frame = setInterval(drawAvailable, 1000/60);
  }
}
