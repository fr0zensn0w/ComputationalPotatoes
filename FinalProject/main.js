const electron = require('electron')
const {app, BrowserWindow, shell} = electron
const remote = electron.remote
const path = require('path')


// when the app is ready, open this page
app.on('ready', () => {
    let win1 = new BrowserWindow({width:900, height:700, transparent:false, frame:true, show:false, icon:path.join(__dirname, 'icons/png/256x256.png')})
    win1.loadURL(`file://${__dirname}/index.html`)
    // removes the white page that is shown before the window is loaded up
    win1.once('ready-to-show', () => {
      win1.show()
    })

})
