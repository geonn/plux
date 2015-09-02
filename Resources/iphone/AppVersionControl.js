function updateAppVersion(appVersion) {
    Ti.App.Properties.setString("appVersion", appVersion);
}

function callback_download(e) {
    var dialog = Ti.UI.createAlertDialog({
        cancel: 1,
        buttonNames: [ "Download", "Cancel" ],
        title: "Latest version download",
        message: "Latest version found : " + e.currentVersion
    });
    dialog.show();
    dialog.addEventListener("click", function(ex) {
        if (0 == ex.index) try {
            console.log(e.data);
            Ti.Platform.openURL(e.data);
        } catch (e) {
            Ti.API.info("e ==> " + JSON.stringify(e));
        }
    });
    updateAppVersion(e.currentVersion);
}

exports.checkAndUpdate = function() {
    API.checkAppVersion(callback_download);
};