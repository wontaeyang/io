var Two = require('./two.js')
var body = document.body;

addBackdrop(30);

var two = new Two({
  fullscreen: true,
  autostart: true
}).appendTo(body);

function Node() {
  this.posX = 30;
  this.posY = 30;
  this.width = 30;
  this.height = 30;
  this.selected = false;
  this.body = two.makeRectangle(this.posX, this.posY, this.width, this.height);

  // Initial setup of node
  this.init = function() {
    this.body.fill = 'rgb(0, 200, 255)';
    this.body.opacity = 0.75;
    this.body.noStroke();
    two.update(); // draw the node

    // Add click event
    this.body._renderer.elem.addEventListener('click', function(){
      if (this.selected) {
        this.deselect();
        this.selected = false;
      } else {
        this.select();
        this.selected = true;
      }

      two.update();
    }.bind(this), false)
  }
  this.select = function() {
    this.body.stroke = 'orangered';
    this.body.linewidth = 3;

  }
  this.deselect = function () {
    this.body.noStroke();
  }
  this.init();
}

function draw() {
  var node = new Node;
}

draw();



function addBackdrop(d) {
  var dimensions = d || 50;
  var two = new Two({
    type: Two.Types.canvas,
    width: dimensions,
    height: dimensions
  });

  var r = dimensions / 10;
  var center = dimensions / 2;

  var a = two.makeLine(center - r, center, center + r, center);
  var b = two.makeLine(center, center - r, center, center + r);

  a.stroke = b.stroke = '#aaa';
  a.linewidth = b.linewidth = 0.25;

  two.update();

  body.style.backgroundImage = 'url(' + two.renderer.domElement.toDataURL() + ')'
  body.style.backgroundRepeat = 'repeat'
  body.style.backgroundSize = dimensions + 'px ' + dimensions + 'px'
}
