const { app, BrowserWindow, ipcMain } = require("electron");
const ipc = ipcMain;
require("electron-reloader")(module);

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 700,
    frame: false,
    backgroundColor: "#fff",
    webPreferences: {
      nodeIntegration: true,
      devTools: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile("index.html");

  //Minimise the app
  ipc.on("minimiseApp", () => {
    console.log("Clicked Minimise button!");
    mainWindow.minimize();
  });

  // Maximize Restore App
  ipc.on("maximizeRestoreApp", () => {
    if (mainWindow.isMaximized()) {
      console.log("Clicked on Restore");
      mainWindow.restore();
    } else {
      console.log("Clicked on Maximize");
      mainWindow.maximize();
    }
  });

  //Check if maximized
  mainWindow.on("maximize", () => {
    mainWindow.webContents.send("isMaximized");
  });

  // Check if is restored
  mainWindow.on("unmaximize", () => {
    mainWindow.webContents.send("isRestored");
  });

  //Close the app
  ipc.on("closeApp", () => {
    console.log("Clicked Close button!");
    mainWindow.close();
  });
};

app.whenReady().then(createWindow);
