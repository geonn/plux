exports.navigationWindow = function(target, checkAuth, callback, param) {
    if (checkAuth) {
        var auth = require("login");
        if (auth.checkLogin()) {
            var win = Alloy.createController(target).getView();
            Alloy.Globals.navMenu.openWindow(win, {
                animated: true
            });
        } else {
            var nav = require("navigation");
            console.log("login page");
            nav.navigationWindow("login", 0, target);
        }
        return;
    }
    if ("login" == target) {
        var win = Alloy.createController(target, {
            target: callback
        }).getView();
        Alloy.Globals.navMenu.openWindow(win, {
            animated: true
        });
    } else if (void 0 !== typeof param) {
        console.log(typeof param);
        var win = Alloy.createController(target, param).getView();
        Alloy.Globals.navMenu.openWindow(win, {
            animated: true
        });
    } else {
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