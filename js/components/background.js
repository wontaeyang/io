var Two = require('../two.js')

module.exports = function () {
  // Setup Background
  addBackdrop(30);

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

    document.body.style.backgroundImage = 'url(' + two.renderer.domElement.toDataURL() + ')'
    document.body.style.backgroundRepeat = 'repeat'
    document.body.style.backgroundSize = dimensions + 'px ' + dimensions + 'px'
  }
}
