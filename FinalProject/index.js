
const remote = require('electron').remote
const main = remote.require('./main.js')
const {shell} = require('electron')
const fs = require('fs')


function openFileCabinet() {
    // alert("open the gallery")
    // TODO: put code in here to open the gallery, AKA open up to where the images are stored
    fullPath = "/Users/liquidsn0w/Desktop/"
    fullPath = __dirname + "/video/source"
    // shell.beep() //makes a beeping sound
    shell.showItemInFolder(fullPath)
}
