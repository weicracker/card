const {
    app,
    BrowserWindow,
    ipcMain,
    Tray,
    Menu,
    globalShortcut
} = require("electron");
var event = require("./event");
const path = require('path');
app.on('ready', function () {
    // 增加系统托盘图标
    /*    const tray = new Tray(path.join(app.getAppPath(), 'out/auto_card.png'));
       tray.setToolTip('智能打卡');
       const contextMenu = Menu.buildFromTemplate([{
               label: '显示窗口',
               type: "normal",
               click() {
                   //打开设置
                   autoCard.show();
               }
           }, {
               label: '隐藏窗口',
               type: "normal",
               click() {
                   //隐藏窗口
                   autoCard.hide();
               }
           },
           {
               label: '退出本程序',
               type: "normal",
               click() {
                   //退出本程序
                   autoCard = null
                   process.exit(0);
                   app.quit();
               }
           }
       ]);
       tray.addListener('click', (event) => {
           autoCard.show();
       })
       tray.setContextMenu(contextMenu); */
    // 启动窗口
    let autoCard = new BrowserWindow({
        width: 360,
        height: 500,
        show: false,
        resizable: false
    });
    // console.log(app.getAppPath())
    let autoCardPath = path.join(app.getAppPath(), 'dist/index.html');
    autoCard.loadURL(autoCardPath);
    // 菜单是否显示
    autoCard.setMenu(null);
    autoCard.show();
    //外层开发者工具打开
    // autoCard.webContents.openDevTools();
    // 注册全局快捷键 ctrl或Command + END 为隐藏打卡窗口
    globalShortcut.register("CommandOrControl+End", () => {
        console.log('CommandOrControl+End is pressed');
        autoCard.hide();
    })
    // 注册全局快捷键 ctrl或Command + Home 为显示打卡窗口
    globalShortcut.register("CommandOrControl+Home", () => {
        console.log('CommandOrControl+Home is pressed');
        autoCard.show();
    })
    autoCard.on('closed', () => {
        globalShortcut.unregisterAll()
        autoCard = null
        process.exit(0);
        app.quit();
    });
})