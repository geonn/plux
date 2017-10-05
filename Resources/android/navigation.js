function navigationWindow(target, checkAuth, callback, param) {
    if (1 == checkAuth) {
        var auth = require("auth_login");
        if (auth.checkLogin()) if ("m_eCard" == target) {
            var win = Alloy.createController(target).getView();
            win.orientationModes = [ Titanium.UI.PORTRAIT, Titanium.UI.LANDSCAPE_LEFT, Titanium.UI.LANDSCAPE_RIGHT ];
            win.open();
        } else {
            var win = Alloy.createController(target).getView();
            win.open();
        } else {
            var win = Alloy.createController("asp/login", {
                target: target
            }).getView();
            win.open();
        }
        return;
    }
    if ("m_eCard" == target) {
        var win = Alloy.createController(target).getView();
        win.orientationModes = [ Titanium.UI.PORTRAIT, Titanium.UI.LANDSCAPE_LEFT, Titanium.UI.LANDSCAPE_RIGHT ];
        win.open();
    } else if (void 0 !== typeof param && null !== param) {
        var win = Alloy.createController(target, param).getView();
        win.open();
    } else {
        var win = Alloy.createController(target).getView();
        win.open();
    }
}

function navigationWebview(webview, title) {
    var win = Titanium.UI.createWindow({
        title: title
    });
    win.add(webview);
    win.open();
}

function navigateWithArgs(target, args) {
    var win = Alloy.createController(target, args).getView();
    win.open();
}

function closeWindow(win) {
    win.close();
}

exports.navigationWindow = _.debounce(navigationWindow, 1e3, true);

exports.navigationWebview = _.debounce(navigationWebview, 1e3, true);

exports.navigateWithArgs = _.debounce(navigateWithArgs, 1e3, true);

exports.closeWindow = _.debounce(closeWindow, 1e3, true);