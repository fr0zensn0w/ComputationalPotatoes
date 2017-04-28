const remote = require('electron').remote
const main = remote.require('./main.js')
const {shell} = require('electron')
const fs = require('fs')

var util = require("util");
var spawn = require("child_process").spawn;


// function that opens the native file explorer (Finder or Windows Explorer)
// needed so that the person using this can "import thier video"
function openFileCabinet() {
    // alert("open the gallery")
    // TODO: put code in here to open the gallery, AKA open up to where the images are stored
    fullPath = "/Users/liquidsn0w/Desktop/"
    fullPath = __dirname + "/images"
    // shell.beep() //makes a beeping sound
    shell.showItemInFolder(fullPath)
}


// function to call the python script that cuts the video into images and saves
// them to images/source
function processVideoToImages() {
    var process = spawn('python',["video_to_frames.py"]);
    util.log('reading in python file to convert video to images')
    process.stdout.on('data',function(chunk){
        var textChunk = chunk.toString('utf8');// buffer to string
        console.log(textChunk)
        util.log(textChunk);
        if (textChunk.includes("IMAGE EXTRACTION COMPLETE")) {
            alert("Video to Image Conversion Complete")
            location.reload()
        }
        // alert("Video to image conversion complete")
    });
}

// TODO add a python script and call it here that processes the images and combines
// them using the mask (pull parts from the first image and second/3rd/4th etc image)
function coreProcessing() {
    console.log("coreProcessing started")
    var process = spawn('python',["processing.py"]);
    util.log('reading in python file')
    process.stdout.on('data',function(chunk){
        var textChunk = chunk.toString('utf8');// buffer to string
        console.log(textChunk)
        util.log(textChunk);
        alert("Video to image conversion complete")
    });
}

// TODO create a function that calls node module to create a GIF from the output images
function createGIF() {
    gifshot.createGIF({
    gifWidth: 320,
    gifHeight: 240,
    images: [
        'http://i.imgur.com/2OO33vX.jpg',
        'http://i.imgur.com/qOwVaSN.png',
        'http://i.imgur.com/Vo5mFZJ.gif'
    ],
    interval: 0.15,
    numFrames: 20,
    text: 'computationalPotatoes'
    }, function (obj) {
      if (!obj.error) {
          var image = obj.image, animatedImage = document.createElement('img');
          animatedImage.src = image;
          document.body.appendChild(animatedImage);

          download = document.createElement("button")
          // download.href = image;
          // download.className = "button"
          download.name = "Download GIF"
          // download.data="computationalPotatoGIF.gif"
          download.target="_blank"
          download.setAttribute('class', "button")
          download.setAttribute('data', image)
          download.setAttribute('download', "computationalPotatoGIF.gif")
          // console.log(download.href)
          document.body.appendChild(download)

      }
    });
}
