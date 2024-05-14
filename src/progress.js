class Progress {
  constructor() {

  }
  scrollProgress() {
    this.depthWrap = document.querySelector(".depth-wrap");
    this.submarine = document.querySelector(".submarine");
    this.depthNum = document.querySelector(".depth-num");

    this.scrollNum = window.scrollY;
    this.documentHeight = document.body.scrollHeight - window.innerHeight;

    this.per = ((this.scrollNum / this.documentHeight) * 100).toFixed(0);
    this.contentHeight = this.documentHeight / 100;

    document.querySelector(".ocean-inner").style.gridTemplateRows = `repeat(${this.contentHeight}, minmax(50px, auto))`;

    this.scrollNumIng = (this.scrollNum / 100).toFixed(0);
    this.contentHeightIng = this.contentHeight.toFixed(0);
    this.perMore = this.per + 10;

    if(this.scrollNumIng == this.contentHeightIng) {
      if (this.per === "100") {
        this.per = "112";
        console.log(this.per);
        this.submarine.style.opacity = 0;
        this.submarine.style.visibility = "hidden";
      }
    }else {
      this.submarine.style.opacity = 1;
      this.submarine.style.visibility = "visible";
    }

    this.depthNum.innerHTML = this.scrollNum.toFixed(0);
    //this.progressBar.style.width = this.per + "%";
    this.submarine.style.transform = `translate(${this.per}%, 70vh)`;

    if(this.scrollNum > 260) {
      this.depthWrap.style.overflow = "visible";
      this.depthWrap.style.visibility = "visible";
      this.depthWrap.style.opacity = 1;
    }else {
      this.depthWrap.style.overflow = "hidden";
      this.depthWrap.style.visibility = "hidden";
      this.depthWrap.style.opacity = 0;
    }
  }
}

export { Progress };