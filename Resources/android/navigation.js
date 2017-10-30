function navigationWindow(target, checkAuth, callback, param) {
    console.log(target + " nav to ");
    if (1 == checkAuth) {
        var memno = Ti.App.Properties.getString("memno") || "";
        if ("" == memno) {
            var win = Alloy.createController("asp/login", {
                target: target
            }).getView();
            win.open();
        } else if ("m_eCard" == target) {
            var win = Alloy.createController(target).getView();
            win.orientationModes = [ Titanium.UI.PORTRAIT, Titanium.UI.LANDSCAPE_LEFT, Titanium.UI.LANDSCAPE_RIGHT ];
            win.open();
        } else {
            console.log("auth checked going to " + target);
            var win = Alloy.createController(target).getView();
            win.open();
        }
        return;
    }
    if ("m_eCard" == target) {
        var win = Alloy.createController(target).getView();
        win.orientationModes = [ Titanium.UI.PORTRAIT, Titanium.UI.LANDSCAPE_LEFT, Titanium.UI.LANDSCAPE_RIGHT ];
        win.open();
    } else if (void 0 !== typeof param && null !== param) {
        console.log("here pls");
        var win = Alloy.createController(target, param).getView();
        win.open();
    } else {
        console.log("no!!");
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