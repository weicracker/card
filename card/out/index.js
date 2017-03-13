const {
    app,
    BrowserWindow,
    ipcMain
} = require("electron");
const path = require('path');
app.on('ready', function () {
    let autoCard = new BrowserWindow({
        width: 330,
        height: 200,
        show: false,
        resizable: false
    });
    // console.log(app.getAppPath())
    let autoCardPath = path.join(app.getAppPath(),'dist/index.html');
    autoCard.loadURL(autoCardPath);
    autoCard.setMenu(null);
    autoCard.show();
    //外层开发者工具打开
    // autoCard.webContents.openDevTools();
    autoCard.on('closed', () => {
        autoCard = null
        process.exit(0);
        app.quit();
    });
})