const { app, BrowserWindow, shell } = require('electron')
const path = require('path')

let win = null

function createWindow() {
    win = new BrowserWindow({
        width: 1280,
        height: 800,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            sandbox: true
        },
        autoHideMenuBar: true,
        icon: path.join(__dirname, 'icons/logo.png')
    })

    win.webContents.setWindowOpenHandler(({ url }) => {
        openExternalUrl(url)
        return { action: 'deny' }
    })

    win.webContents.on('will-navigate', (event, url) => {
        if (url.startsWith('file://')) return

        event.preventDefault()
        openExternalUrl(url)
    })

    win.loadFile(path.join(__dirname, "war", "classic.html")).catch(error => {
        console.error("Unable to load GeoGebra Classic: ", error)
    })

    win.on('close', (e) => {
        e.preventDefault()
        win.destroy()
    })

    win.on('closed', () => {
        win = null
    })
}

function openExternalUrl(url) {
    try {
        const parsed = new URL(url)

        if (parsed.protocol === 'https:' || parsed.protocol === 'http:') {
            void shell.openExternal(parsed.href).catch(console.error)
        }
    } catch (error) {
        console.error('Invalid external URL:', error)
    }
}


app.whenReady()
    .then(createWindow)
    .catch(console.error)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})