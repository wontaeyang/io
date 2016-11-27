var Two = require('./two.js')
var body = document.body;

addBackdrop(30);

var two = new Two({
  fullscreen: true,
  autostart: true
}).appendTo(body);

var base = two.renderer.domElement

// Resize canvas
two.bind('resize', function() {
  two.width = window.innerWidth;
  two.height = window.innerHeight;
  two.update();
})

base.addEventListener('click', function() {
  Node.instances.forEach(function(node) {
    var posX = node.body.translation.x
    var posY = node.body.translation.y
  })
}, false)

function Node() {
  Node.instances = [];
  Node.selected = [];

  this.posX = 60;
  this.posY = 60;
  this.width = 30;
  this.height = 30;
  this.selected = false;
  this.body = two.makeRectangle(this.posX, this.posY, this.width, this.height);
  this.body.fill = 'rgb(0, 200, 255)';
  this.body.opacity = 0.75;
  this.body.noStroke();

  // Initial setup of node
  this.init = function() {
    // Track instances
    Node.instances.push(this);
    two.update(); // draw the node

    // Add click event
    this.body._renderer.elem.addEventListener('click', function() {
      this.select();
      two.update();
    }.bind(this), false)

    this.body._renderer.elem.addEventListener('mousemove', function(e) {
      if (this.drag) {
        this.body.translation.set(e.clientX, e.clientY);
      }
      two.update();
    }.bind(this), false)
  }

  this.update = function() {
    this.body.width = this.width;
    this.body.height = this.height;
    this.body.translation.set(this.posX, this.posY);
    two.update();
  }

  this.select = function() {
    this.body.stroke = 'orangered';
    this.body.linewidth = 3;
    this.selected = true;
  }

  this.deselect = function () {
    this.body.noStroke();
    this.selected = false;
  }

  this.init();
}

function draw() {
  var node = new Node;
  debugger;
}

draw();


// Background
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
