import './app.css';
import { Wave } from './wave.js';
import { Progress } from './progress.js';
import * as setProperty from './data/setPro.js';

class App {
  constructor() {
    this.canvas = document.querySelector('#canvas');
    this.ctx = this.canvas.getContext('2d');

    this.progress = new Progress;
    this.wave = new Wave();
    this.resize();

    window.addEventListener('resize', this.resize.bind(this), this.progress.scrollProgress, false);
    window.addEventListener('scroll', this.progress.scrollProgress)


    requestAnimationFrame(this.animate.bind(this));
  }
  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * 2;
    this.canvas.height = this.stageHeight * 1.3;

    this.ctx.scale(2, 2);

    this.wave.resize(this.stageWidth, this.stageHeight);
  }
  animate(t) {
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    this.wave.draw(this.ctx);
    //this.progress.scrollProgress();
    requestAnimationFrame(this.animate.bind(this));
  }
}

window.onload = () => {
  new App();

  const itemOcean = document.querySelectorAll(".item-ocean");
  let max = 360;
  let min = 0;

  const rowData = setProperty.row;
  const rowWidthData = setProperty.rowWidth;
  const colData = setProperty.col;
  const colWidthData = setProperty.colWidth;


  itemOcean.forEach((el, idx) => {
    let stRandom = Math.random() * max;
    let stRandomToFixed = stRandom.toFixed(0);

    //console.log(rowData[idx])

    //el.style.width = stRandomToFixed + "px";
    // console.log(el)
    el.style.setProperty('--row', rowData[idx])
    el.style.setProperty('--row-width', rowWidthData[idx])
    el.style.setProperty('--col', colData[idx])
    el.style.setProperty('--col-width', colWidthData[idx])
  })
}