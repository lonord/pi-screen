// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const { arch } = require('os')
const ipc = require('electron-better-ipc');
const { createService } = require('./service')
const createEventEmitter = require('./event')
const startServer = require('./server')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
	// Create the browser window.
	mainWindow = new BrowserWindow({ width: 800, height: 480, title: 'Pi Screen' })

	// and load the index.html of the app.
	if (process.env.NODE_ENV === 'development') {
		mainWindow.loadURL('http://127.0.0.1:8079/index.html')
	} else {
		mainWindow.loadFile('dist_renderer/index.html')
	}

	// Open the DevTools.
	// mainWindow.webContents.openDevTools()

	// Emitted when the window is closed.
	mainWindow.on('closed', function () {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = null
	})

	const ipcEmitter = createEventEmitter()
	const server = startServer(dataService)
	ipc.answerRenderer('addReminder', async (reminder) => {
		await dataService.addReminder(reminder)
		ipcEmitter.emitReminderUpdate()
		return 'OK'
	});
	ipc.answerRenderer('updateReminder', async (id, props) => {
		await dataService.updateReminder(id, props)
		ipcEmitter.emitReminderUpdate()
		return 'OK'
	});
	ipc.answerRenderer('removeReminder', async (id) => {
		await dataService.removeReminder(id)
		ipcEmitter.emitReminderUpdate()
		return 'OK'
	});
	ipc.answerRenderer('findReminders', async ([skip, count, complete]) => {
		const list = await dataService.findReminders(skip, count, complete)
		return list
	});
	ipc.answerRenderer('getOnlineUserCount', async () => {
		return server.getOnlineUserCount()
	});
	ipc.answerRenderer('getWebServerUrls', async () => {
		return server.getServerUrls()
	});
	ipcEmitter.onReminderUpdate(() => {
		mainWindow && mainWindow.webContents.send('onReminderUpdate')
	})
	ipcEmitter.onOnlineUserChange((count) => {
		mainWindow && mainWindow.webContents.send('onOnlineUserChange', count)
	})
}

app.on('window-all-closed', function () {
	app.quit();
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
if (arch().indexOf('arm') !== -1) {
	app.disableHardwareAcceleration()
}

const dataService = createService()
