require('./components/background.js')(); // Setup background
var Module = require('./components/module.js');
var Two = require('./two.js')

// Setup Two
var two = new Two({
  fullscreen: true,
  autostart: true
}).appendTo(document.body);

// Layers
var background = two.makeGroup();
var middleground = two.makeGroup();
var foreground = two.makeGroup();

// Backdrop
var backdrop = two.makeRectangle(window.innerWidth /2, window.innerHeight / 2, window.innerWidth, window.innerHeight);
backdrop.fill = 'red';
backdrop.opacity = 0;
two.update(); //need to generate dom model
backdrop._renderer.elem.addEventListener('click', function(){
  Module.instances.forEach(function(m) {
    m.deselect();
  })
}, false)
background.add(backdrop);


// Resize canvas
two.bind('resize', function() {
  two.width = window.innerWidth;
  two.height = window.innerHeight;
  two.update();
})


function draw() {
  var module = new Module(two);
  var module_02 = new Module(two, {posX: 90, posY: 90, width: 30, height: 30, fill: 'blue', opacity: 0.75})
  foreground.add(module_02);
  foreground.add(module);
  debugger;
}

draw();








