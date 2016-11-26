var Two = require('./two.js')

var body = document.body;
var two = new Two({
  fullscreen: true,
  autostart: true
}).appendTo(body);

function Node() {
  this.posX = 30;
  this.posY = 30;
  this.width = 30;
  this.height = 30;
  this.body = two.makeRectangle(this.posX, this.posY, this.width, this.height);
  this.init = function() {
    this.body.fill = 'rgb(0, 200, 255)';
    this.body.opacity = 0.75;
    this.body.noStroke();
    two.update(); // draw the node

    // Add click event
    this.body._renderer.elem.addEventListener('click', function(){
      this.body.fill = 'red';
      two.update();
    }.bind(this), false)
  }
  this.init();
}

function draw() {
  var node = new Node;
}

draw();
