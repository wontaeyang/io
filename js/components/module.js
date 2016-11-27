// Define module
function Module(two, properties) {
  this.two = two;
  this.properties = (typeof properties !== 'undefined') ?  properties : {
    posX: 60,
    posY: 60,
    width: 30,
    height: 30,
    fill: 'rgb(0, 200, 255)',
    opacity: 0.75
  };
  this.selected = false;
  this.body = null;

  // Initial setup of module
  this.init = function() {
    Module.instances.push(this); // Track instances
    this.createBody(); // Create body
    this.two.update(); // Draw the module

    // Add click event
    this.body._renderer.elem.addEventListener('click', this.select.bind(this), false)
  }

  this.createBody = function() {
    this.body = this.two.makeRectangle(
      this.properties.posX,
      this.properties.posY,
      this.properties.width,
      this.properties.height
    );
    this.body.fill = this.properties.fill;
    this.body.opacity = this.properties.opacity;
    this.body.noStroke();
  }

  this.update = function() {
    this.body.width = this.width;
    this.body.height = this.height;
    this.body.translation.set(this.posX, this.posY);
    this.two.update();
  }

  this.select = function() {
    this.body.stroke = 'orangered';
    this.body.linewidth = 3;
    this.selected = true;
    this.two.update();
  }

  this.deselect = function () {
    this.body.noStroke();
    this.selected = false;
    this.two.update();
  }

  this.init();
}

// Track instances of module
Module.instances = [];

// Export module
module.exports = Module;
