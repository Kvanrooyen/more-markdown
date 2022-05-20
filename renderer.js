const { ipcRenderer } = require("electron");
const ipc = ipcRenderer;

// Minimise app
minBtn.addEventListener("click", () => {
  ipc.send("minimiseApp");
});

//Maximize Restore App
maxBtn.addEventListener("click", () => {
  ipc.send("maximizeRestoreApp");
});

//Close app
closeBtn.addEventListener("click", () => {
  ipc.send("closeApp");
});
