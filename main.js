const { app, BrowserWindow } = require('electron')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1200,
        minWidth: 950,
        height: 800,
        minHeight: 800,
        titleBarStyle: 'hidden',
        titleBarOverlay: {
            color: '#ef0025',
            symbolColor: '#ffffff',
            height: 30
        },
        icon: './img/logo-open-fm-200x200.png'
    })

    win.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()
})