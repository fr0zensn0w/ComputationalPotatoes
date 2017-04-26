(function() {
    // Creates a new canvas element and appends it as a child
    // to the parent element, and returns the reference to
    // the newly created canvas element

    const fs = require('fs');
    fs.readdir('./', (err, files) => {
      files.forEach(file => {
        // console.log(file);
      });
    })
    // var canvasBuffer = require('electron-canvas-to-buffer')


    var img = document.createElement("img");

    function createCanvas(parent, width, height) {
        var canvas = {};
        canvas.node = document.createElement('canvas');
        canvas.context = canvas.node.getContext('2d');
        // var c = canvas.getContext('2d');
        canvas.node.width = width || 100;
        canvas.node.height = height || 100;
        // c.drawImage(img, 0, 0);
        parent.appendChild(canvas.node);
        // console.log("canvas", canvas)

        img.src = "frame0265.png";
          img.onload = function (a) {
              console.log("image loaded")
              var h = a.target.height,
                  w = a.target.width;
              var c = canvas.node.getContext('2d');
              canvas.node.width = w;
              canvas.node.height = h;
              c.drawImage(img, 0, 0);
          };
        return canvas;
    }

    function init(container, width, height, fillColor) {
        var canvas = createCanvas(container, width, height);

        var ctx = canvas.context;
        // define a custom fillCircle method
        ctx.fillCircle = function(x, y, radius, fillColor) {
            this.fillStyle = fillColor;
            this.beginPath();
            this.moveTo(x, y);
            this.arc(x, y, radius, 0, Math.PI * 2, false);
            this.fill();
        };
        ctx.clearTo = function(fillColor) {
            ctx.fillStyle = fillColor;
            ctx.fillRect(0, 0, width, height);
        };
        ctx.clearTo(fillColor || "#ddd");

        // bind mouse events
        canvas.node.onmousemove = function(e) {
            if (!canvas.isDrawing) {
               return;
            }
            var x = e.pageX - this.offsetLeft;
            var y = e.pageY - this.offsetTop;
            var radius = 20; // or whatever
            var fillColor = '#00ff00';
            ctx.fillCircle(x, y, radius, fillColor);
        };
        canvas.node.onmousedown = function(e) {
            canvas.isDrawing = true;
        };
        canvas.node.onmouseup = function(e) {
            canvas.isDrawing = false;
        };

        // var myImage = canvas.node.toDataURL("image/png")
        // console.log(myImage)
        var canvasBuffer = require('electron-canvas-to-buffer')
        var buffer = canvasBuffer(canvas.node, 'image/png')
        fs.writeFile('image.png', buffer, function (err) {
          console.log("image written")
        })

        // console.log(document.getElementById('idownload').href)
        // document.getElementById('idownload').setAttribute('href', myImage)
        // console.log(document.getElementById('idownload').href)
        // var canvasBuffer = require('electron-canvas-to-buffer')
        // var buffer = canvasBuffer(canvas.node, 'image/png')
        // fs.writeFile('image.png', buffer, function(err) {
        //     console.log("canvas written")
        // })
    }

    var container = document.getElementById('canvas');
    init(container, 200, 200, '#ddd');

})();

function saveImage() {
    var canvasBuffer = require('electron-canvas-to-buffer')
    var fs = require('fs')

    // your canvas drawing
    // var canvas = document.createElement('canvas')
    // var context = canvas.getContext('2d')
    // context.fillRect(0, 0, 50, 50)
    // context.fillStyle = 'red'
    // context.fillRect(50, 10, 30, 20)

    // as a buffer
    var buffer = canvasBuffer(canvas.node, 'image/png')
    console.log(buffer)

    // write canvas to file
    fs.writeFile('image.png', buffer, function (err) {
      console.log("image written")
    })
}
