
class Point {
  constructor(idx, x, y) {
    this.x = x;
    this.y = y;
    this.fieldY = y;
    this.speed = 0.015;
    this.cur = idx;
    this.max = Math.random() * 100 + 50;
  }
  update() {
    this.cur += this.speed;
    this.y = this.fieldY + Math.sin(this.cur) * this.max;
  }
}

export { Point }
