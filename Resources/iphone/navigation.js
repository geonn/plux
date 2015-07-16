function navigationWindow(target, checkAuth, callback, param) {
    if (1 == checkAuth) {
        var auth = require("auth_login");
        if (auth.checkLogin()) if ("m_eCard" == target) {
            var win = Alloy.createController(target).getView();
            win.orientationModes = [ Titanium.UI.PORTRAIT, Titanium.UI.LANDSCAPE_LEFT, Titanium.UI.LANDSCAPE_RIGHT ];
            "android" == Ti.Platform.osname ? win.open() : Alloy.Globals.navMenu.openWindow(win, {
                animated: true
            });
        } else {
            var win = Alloy.createController(target).getView();
            "android" == Ti.Platform.osname ? win.open() : Alloy.Globals.navMenu.openWindow(win, {
                animated: true
            });
        } else {
            var win = Alloy.createController("asp/login", {
                target: target
            }).getView();
            "android" == Ti.Platform.osname ? win.open() : Alloy.Globals.navMenu.openWindow(win, {
                animated: true
            });
        }
        return;
    }
    if ("m_eCard" == target) {
        console.log(target + " my card no auth");
        var win = Alloy.createController(target).getView();
        win.orientationModes = [ Titanium.UI.PORTRAIT, Titanium.UI.LANDSCAPE_LEFT, Titanium.UI.LANDSCAPE_RIGHT ];
        "android" == Ti.Platform.osname ? win.open() : Alloy.Globals.navMenu.openWindow(win, {
            animated: true
        });
    } else if (void 0 !== typeof param && null !== param) {
        console.log(target + " my card no auth with param");
        var win = Alloy.createController(target, param).getView();
        "android" == Ti.Platform.osname ? win.open() : Alloy.Globals.navMenu.openWindow(win, {
            animated: true
        });
    } else {
        var win = Alloy.createController(target).getView();
        "android" == Ti.Platform.osname ? win.open() : Alloy.Globals.navMenu.openWindow(win, {
            animated: true
        });
    }
}

function navigationWebview(webview, title) {
    var win = Titanium.UI.createWindow({
        title: title
    });
    win.add(webview);
    "android" == Ti.Platform.osname ? win.open() : Alloy.Globals.navMenu.openWindow(win, {
        animated: true
    });
}

function navigateWithArgs(target, args) {
    var win = Alloy.createController(target, args).getView();
    console.log("a");
    if ("android" == Ti.Platform.osname) {
        if ("login" == target) {
            console.log("fb login");
            win.fbProxy = FACEBOOK.createActivityWorker({
                lifecycleContainer: win
            });
        }
        win.open();
    } else Alloy.Globals.navMenu.openWindow(win, {
        animated: true
    });
}

exports.navigationWindow = _.debounce(navigationWindow, 1e3, true);

exports.navigationWebview = _.debounce(navigationWebview, 1e3, true);

exports.navigateWithArgs = _.debounce(navigateWithArgs, 1e3, true);

exports.closeWindow = function(win) {
    "android" == Ti.Platform.osname ? win.close() : Alloy.Globals.navMenu.closeWindow(win);
};