const { app, BrowserWindow } = require('electron')
const path = require('path')

let win

function createWindow() {
  win = new BrowserWindow({

    width: 1280,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    },
    autoHideMenuBar: true,
    icon: path.join(__dirname, 'icons/logo.png')
  })

  win.loadFile('classic.html')

  win.on('close', (event) => {
	  if (!win.isDestroyed()) {
		try {
		  win.destroy()
		} catch (e) {
		  console.error('Error destroy window :', e)
		}
	  }
  })
  win.on('closed', () => {
    win = null
  })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (win === null) createWindow()
})
