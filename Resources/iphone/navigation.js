exports.navigationWindow = function(target, checkAuth, callback, param) {
    if (1 == checkAuth) {
        var auth = require("login");
        if (auth.checkLogin()) if ("m_eCard" == target) {
            var win = Alloy.createController(target).getView();
            win.orientationModes = [ Titanium.UI.PORTRAIT, Titanium.UI.LANDSCAPE_LEFT, Titanium.UI.LANDSCAPE_RIGHT ];
            Alloy.Globals.navMenu.openWindow(win, {
                animated: true
            });
        } else {
            var win = Alloy.createController(target).getView();
            Alloy.Globals.navMenu.openWindow(win, {
                animated: true
            });
        } else {
            var win = Alloy.createController("login", {
                target: target
            }).getView();
            Alloy.Globals.navMenu.openWindow(win, {
                animated: true
            });
        }
        return;
    }
    if ("m_eCard" == target) {
        console.log(target + " my card no auth");
        var win = Alloy.createController(target).getView();
        win.orientationModes = [ Titanium.UI.PORTRAIT, Titanium.UI.LANDSCAPE_LEFT, Titanium.UI.LANDSCAPE_RIGHT ];
        Alloy.Globals.navMenu.openWindow(win, {
            animated: true
        });
    } else if (void 0 !== typeof param && null !== param) {
        console.log(target + " my card no auth with param");
        var win = Alloy.createController(target, param).getView();
        Alloy.Globals.navMenu.openWindow(win, {
            animated: true
        });
    } else {
        console.log(target + "no auth");
        var win = Alloy.createController(target).getView();
        Alloy.Globals.navMenu.openWindow(win, {
            animated: true
        });
    }
};

exports.navigateWithArgs = function(target, args) {
    var win = Alloy.createController(target, args).getView();
    Alloy.Globals.navMenu.openWindow(win, {
        animated: true
    });
};

exports.closeWindow = function(win) {
    Alloy.Globals.navMenu.closeWindow(win);
};