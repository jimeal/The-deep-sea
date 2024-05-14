import { Point } from './point.js';

class Wave {
  constructor() {
    this.points = [];
    this.numberOfPoints = 6;
  }
  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    this.centerX = stageWidth / 2;
    this.centerY = stageHeight / 2;

    this.pointGap = this.stageWidth / (this.numberOfPoints - 1);

    this.init();
  }
  init() {
    //this.point = new Point(this.centerX, this.centerY);
    for (let i = 0; i < this.numberOfPoints; i++) {
      this.points[i] = new Point(i, this.pointGap * i, this.centerY);
    }
  }

  draw(ctx) {
      ctx.beginPath();

      let prevX = this.points[0].x;
      let prevY = this.points[0].y;

      ctx.moveTo(prevX, prevY);

      for(let i = 0; i < this.numberOfPoints; i++) {

        const cx = (prevX + this.points[i].x) / 2;
        const cy = (prevY + this.points[i].y) / 2;

        ctx.quadraticCurveTo(prevX, prevY, cx, cy);

        prevX = this.points[i].x;
        prevY = this.points[i].y;

        // ctx.lineTo(this.points[i].x, this.points[i].y);

        if (i != 0 && i != this.numberOfPoints - 1) {
          this.points[i].update();
        }
      }

      ctx.lineTo(prevX, prevY);
      ctx.lineTo(this.stageWidth, this.stageHeight);
      ctx.lineTo(0, this.stageHeight);
      ctx.lineTo(this.points[0].x, this.points[0].y);
      // ctx.arc(this.points[i].x, this.points[i].y, 30, 0, 2 * Math.PI);

      ctx.lineWidth = 10;
      ctx.strokeStyle = '#fff';
      ctx.lineCap = 'round';
      ctx.lineJoin = 'miter';
      ctx.stroke();

      const grad = ctx.createLinearGradient(0, this.stageHeight, 0,prevY);
      grad.addColorStop(1, "#0096a1");
      grad.addColorStop(0, "#008ec4");

      ctx.fillStyle = grad;
      ctx.fill();

      ctx.closePath();

  }
}

export { Wave }