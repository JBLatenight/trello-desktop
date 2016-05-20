var app = require('app'),
    allowAppExit = false;

function makeWindowHideOnClose(window) {
    app.on('before-quit', () => {
        window.allowClose = true;
    });
    window.on('close', (e) => {
        if (window.allowClose || allowAppExit) return;
        e.preventDefault();
        window.hide();
        window.emit('close-canceled');
    });
    window.forceClose = () => {
        window.allowClose = true;
        window.close();
    };
}

function setAllWindowsAllowedToClose(allowAppExitNew) {
    allowAppExit = allowAppExitNew;
}

module.exports = {
    makeWindowHideOnClose: makeWindowHideOnClose,
    setAllWindowsAllowedToClose: setAllWindowsAllowedToClose
};
