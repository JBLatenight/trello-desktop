var app = require('app'),
    Menu = require('menu'),
    BrowserWindow = require('browser-window'),
    defaultMenu = require('electron-default-menu'),
    WindowTools = require('./utils/window_tools');

// Mandate single instance (Windows). Activate existing window if found.
if (app.makeSingleInstance(() => { onActivate(); })) {
    app.quit();
    return;
}

// Quit on all windows close (non-Mac)
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

// Startup
var mainWindow;
app.on('ready', function () {
    // Create window
    var lastWindowState = require('electron-window-state')({
        defaultWidth: 800,
        defaultHeight: 600
    });
    mainWindow = new BrowserWindow({
        title: 'Trello',
        x: lastWindowState.x,
        y: lastWindowState.y,
        width: lastWindowState.width,
        height: lastWindowState.height,
        resizable: true,
        webPreferences: {
            zoomFactor: 0.75,
            nodeIntegration: false
        }
    });

    // Listen for updates
    lastWindowState.manage(mainWindow);

    // Set menu
    var menu = defaultMenu();
    Menu.setApplicationMenu(Menu.buildFromTemplate(menu));

    // Hide window rather than actually closing on close
    WindowTools.makeWindowHideOnClose(mainWindow);

    // Launch Trello website
    mainWindow.loadUrl('https://trello.com');
});

// Show window on activate
function onActivate() {
    mainWindow.show();
}
app.on('activate', onActivate);