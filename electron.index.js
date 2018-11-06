const {app , BrowserWindow } = require('electron')

app.on('ready', ()=>{
    let mainWindows = new BrowserWindow()
    mainWindows.loadURL(`file://${ __dirname }/index.html`)
})