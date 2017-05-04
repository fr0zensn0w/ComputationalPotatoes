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
        // util.log(textChunk);
        if (textChunk.includes("IMAGE EXTRACTION COMPLETE")) {
            alert("Video to Image Conversion Complete")
            location.reload()
        }
    });
}

// core processing that blends the images together using the mask and pyramids
function coreProcessing() {
    var process = spawn('python',["coreProcessing.py"]);
    util.log('reading in python file to convert video to images')
    process.stdout.on('data',function(chunk){
        var textChunk = chunk.toString('utf8');// buffer to string
        // console.log(textChunk)
        util.log(textChunk);
        if (textChunk.includes("FRAME MODIFICATION COMPLETE")) {
            // alert("Frame modification complete")
            createGIF0()
        }
        // alert("Video to image conversion complete")
    });
}

var imagesArray = []
var count
function createGIF0() {
    console.log("creating GIF")
    const imageSource = './images/out';
    const fs = require('fs');
    count = 0
    fs.readdir(imageSource, (err, files) => {
      files.forEach(file => {
        // console.log(file);
        if (file.includes('videoframe')) {
            imagesArray.push( "images/out/" + file)
        }
        count += 1
        if (count == files.length) {
            createGIF()
        }

      });
    })

    console.log(imagesArray)

}


// function that makes the GIF from the series of images that have been processed
function createGIF() {
    gifshot.createGIF({
    gifWidth: 427,
    gifHeight: 240,
    images: imagesArray,
    interval: .03,
    numFrames: count*5,
    text: 'computationalPotatoes'
    }, function (obj) {
      if (!obj.error) {
          var image = obj.image, animatedImage = document.createElement('img');
          animatedImage.src = image;
          end = document.getElementById('endBody');
          end.appendChild(animatedImage);

          // download = document.createElement("button")
          // // download.href = image;
          // // download.className = "button"
          // download.name = "Download GIF"
          // // download.data="computationalPotatoGIF.gif"
          // download.target="_blank"
          // download.setAttribute('class', "button")
          // download.setAttribute('data', image)
          // download.setAttribute('download', "computationalPotatoGIF.gif")
          // // console.log(download.href)
          // document.body.appendChild(download)

      }
    });
}
