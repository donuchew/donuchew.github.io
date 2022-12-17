let parameters = {
  size: 20,
  radius: 1,
  proximity: 70,
  growth: 95,
  ease: 0.075,
  stats: false };


class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }}


class Circle {
  constructor(radius, x, y) {
    this._radius = radius;
    this.radius = radius;
    this.growthValue = 0;
    this.position = new Point(x, y);
  }

  /**
   * @param {CanvasRenderingContext2D} context
   * @param {number} ease
   */
  draw(context, ease) {
    this.radius += (this._radius + this.growthValue - this.radius) * ease;
    context.moveTo(this.position.x, this.position.y);
    context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
  }

  addRadius(value) {
    this.growthValue = value;
  }

  get x() {
    return this.position.x;
  }

  set x(value) {
    this.position.x = value;
  }

  get y() {
    return this.position.y;
  }

  set y(value) {
    this.position.y = value;
  }}


class Stamp {
  constructor(id) {
    const el = document.getElementById(id);
    const parent = el.parentElement;
    parent.removeChild(el);
    const chars = el.innerText.split("");
    chars.push(" ");
    for (let i = 0; i < chars.length; i++) {
      const span = document.createElement("span");
      span.innerText = chars[i];
      span.className = `char${i + 1}`;
      parent.appendChild(span);
    }
  }}


function init() {
  new Stamp("circle-content");
  const stats = new Stats();
  //stats.showPanel(0);

  //buildGUI();
  let imageLoaded = false;
  const canvas = document.getElementById("c");
  const image = new Image();
  let circles = [];
  const context = canvas.getContext("2d");
  window.addEventListener("resize", resizeHandler);
  window.addEventListener("mousemove", mouseMoveHandler);
  window.addEventListener("touchmove", touchMoveHandler);
  resizeHandler();
  loadImage();
  build();

  function build() {
    circles = [];
    const { size, radius } = parameters;
    const columns = Math.ceil(window.innerWidth / size) + 1;
    const rows = Math.ceil(window.innerHeight / size) + 1;
    const amount = Math.ceil(columns * rows);
    for (let i = 0; i < amount; i++) {
      const column = i % columns;
      const row = ~~(i / columns);
      circles.push(new Circle(radius, size * column, size * row));
    }
  }

  function mouseMoveHandler(event) {
    proximityHandler(event);
  }

  function touchMoveHandler(event) {
    proximityHandler(event.touches[0]);
  }

  function proximityHandler(event) {
    const { proximity, growth } = parameters;
    for (let c of circles) {
      let distance = Math.sqrt(Math.pow(c.x - event.clientX, 2) + Math.pow(c.y - event.clientY, 2));
      let d = map(distance, c._radius, c._radius + proximity, growth, 0);
      if (d < 0) d = 0;
      c.addRadius(d);
    }
  }

  function animate() {
    stats.begin();
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    context.save();
    context.beginPath();
    context.fillStyle = "#000000";
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (let circle of circles) {
      circle.draw(context, parameters.ease);
    }
    if (imageLoaded) {
      drawImage();
    } else {
      context.fill();
    }
    context.restore();
    stats.end();
    requestAnimationFrame(animate);
  }

  function buildGUI() {
    const gui = new dat.GUI({ closed: true });
    gui.closed = true;
    const sizeController = gui.add(parameters, "size", 5, 80);
    const radiusController = gui.add(parameters, "radius", 0.5, 20);
    gui.add(parameters, "proximity", 0, 300);
    gui.add(parameters, "growth", 1, 150);
    gui.add(parameters, "ease", 0.02, 0.15);
    const statsController = gui.add(parameters, "stats");

    sizeController.onFinishChange(() => {
      build();
    });

    radiusController.onFinishChange(() => {
      build();
    });

    statsController.onChange(value => {
      if (value) {
        document.body.appendChild(stats.dom);
      } else {
        stats.dom.parentNode.removeChild(stats.dom);
      }
    });
  }

  function drawImage() {
    context.clip();
    const { naturalHeight, naturalWidth } = image;
    const ratio = findPreferredRatio(naturalWidth, naturalHeight, window.innerWidth, window.innerHeight);
    const w = naturalWidth * ratio;
    const h = naturalHeight * ratio;
    const x = window.innerWidth / 2 - w / 2;
    const y = window.innerHeight / 2 - h / 2;
    context.drawImage(image, 0, 0, naturalWidth, naturalHeight, x, y, w, h);
  }

  function resizeHandler() {
    resizeCanvas(canvas);
    build();
  }

  function loadImage() {
    image.onload = function () {
      imageLoaded = true;
    };
    image.src = "https://donuchew.github.io/img/34FE5DB8-3600-47BC-BFAE-B8AF22F5BFCC.jpeg";
  }

  animate();
}

init();

function normalize(value, min, max) {
  return (value - min) / (max - min);
}

function interpolate(value, min, max) {
  return min + (max - min) * value;
}

function map(value, min1, max1, min2, max2) {
  return interpolate(normalize(value, min1, max1), min2, max2);
}

function findPreferredRatio(width, height, maxWidth, maxHeight) {
  let dw = maxWidth / width;
  let dh = maxHeight / height;
  return dw > dh ? dw : dh;
}

function resizeCanvas(canvas) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
