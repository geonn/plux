exports.navigationWindow = function(target, checkAuth, callback, param) {
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
        console.log(target + " my card no auth");
        var win = Alloy.createController(target).getView();
        win.orientationModes = [ Titanium.UI.PORTRAIT, Titanium.UI.LANDSCAPE_LEFT, Titanium.UI.LANDSCAPE_RIGHT ];
        win.open();
    } else if (void 0 !== typeof param && null !== param) {
        console.log(target + " my card no auth with param");
        var win = Alloy.createController(target, param).getView();
        win.open();
    } else {
        var win = Alloy.createController(target).getView();
        win.open();
    }
};

exports.navigationWebview = function(webview, title) {
    var win = Titanium.UI.createWindow({
        title: title
    });
    win.add(webview);
    win.open();
};

exports.navigateWithArgs = function(target, args) {
    var win = Alloy.createController(target, args).getView();
    win.open();
};

exports.closeWindow = function(win) {
    win.close();
};