const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d", {
  willReadFrequently: true,
});

function initCanvasSize() {
  // 可乘以devicePixelRatio保证清晰度
  canvas.width = window.innerWidth * devicePixelRatio;
  canvas.height = window.innerHeight * devicePixelRatio;
}

initCanvasSize();

function getRandom(min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

class Particle {
  constructor() {
    this.size = getRandom(2 * devicePixelRatio, 7 * devicePixelRatio);
    const outterR = Math.min(canvas.width, canvas.height) / 2;
    const rad = (getRandom(0, 360) * Math.PI) / 100;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    this.x = cx + outterR * Math.cos(rad);
    this.y = cy + outterR * Math.sin(rad);
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fillStyle = "#f40";
    ctx.fill();
  }

  moveTo(targetX, targetY) {
    const duration = 500;
    const startX = this.x;
    const startY = this.y;

    const xSpeed = (targetX - startX) / duration;
    const ySpeed = (targetY - startY) / duration;
    const startTime = Date.now();

    const _move = () => {
      const t = Date.now() - startTime;
      const moveToX = startX + xSpeed * t;
      const moveToY = startY + ySpeed * t;

      this.x = moveToX;
      this.y = moveToY;

      if (t >= duration) {
        this.x = targetX;
        this.y = targetY;
        return;
      }

      requestAnimationFrame(_move);
    };

    _move();
  }
}

const particles = [];
const p = new Particle();
let text = null;

function clearParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function getText() {
  return new Date().toTimeString().substring(0, 8);
} 

function getDrawablePoints(){}

function updateParticles() {
  // 1. 画文字
  const curText = getText();
  if (curText === text) {
    return;
  }
  clearParticles()
  text = curText;
  const { width, height } = canvas;
  ctx.fillStyle = "#000";
  ctx.textBaseline = "middle";
  ctx.font = `${140 * devicePixelRatio}px 'DS-Digital',sans-serif`;
  ctx.textAlign = "center";
  ctx.fillText(text, width / 2, height / 2);

  // 2. 获取文字像素信息
  const { data } = ctx.getImageData(0,0, width, height)
  console.log(data)
}

function redraw() {
  // 清空画布
//   clearParticles();
  // 更新粒子数量以及每个粒子的位置
  updateParticles();
  for (const particle of particles) {
    particle.draw();
  }
  // 注册动画事件重新绘制
  requestAnimationFrame(redraw);
}

redraw();
