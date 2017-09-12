function receivePush(e) {
    var target;
    var url;
    var param;
    var param = {
        id: e.id || "",
        member_no: e.mem_no || "",
        subject: e.android.title || "",
        message: e.message || "",
        url: e.extra || "",
        isRead: "0",
        expired: "",
        status: e.status,
        created: e.created,
        updated: e.updated
    };
    target = e.target;
    url = e.extra;
    detail = e.detail;
    console.log(target + " and redirect " + redirect);
    if ("conversation" == target) redirect ? nav.navigateWithArgs("conversation") : Ti.App.fireEvent("conversation:refresh"); else if ("appointment" == target) {
        var theWindow = Ti.App.Properties.getString("currentAppointmentWindow") || "";
        if ("" == theWindow) {
            var dialog = Ti.UI.createAlertDialog({
                cancel: 1,
                buttonNames: [ "Cancel", "OK" ],
                message: "[Appointment] New message available. Do you want to read now?",
                title: "Confirmation"
            });
            dialog.addEventListener("click", function(ex) {
                0 === ex.index;
                1 === ex.index && nav.navigateWithArgs("appointment");
            });
            dialog.show();
        } else Ti.App.fireEvent("appointment:refresh");
    } else {
        var notificationModel = Alloy.createCollection("notification");
        notificationModel.addData(param);
        var dialog = Ti.UI.createAlertDialog({
            cancel: 0,
            buttonNames: [ "Cancel", "OK" ],
            message: "New message available. Do you want to read now?",
            title: "Confirmation"
        });
        dialog.addEventListener("click", function(ex) {
            0 === ex.index;
            if (1 === ex.index) {
                ("claimDetail" == target || "survey" == target) && nav.navigateWithArgs("asp/notification");
                if ("webview" == target) if ("" == url) {
                    var htmlText = "<style>body{font-family:arial;font-size:14px;color:#606060;} a {text-decoration:none;color:#CE1D1C}</style>" + decodeURIComponent(detail);
                    htmlText = htmlText.replace(/(?:\r\n|\r|\n)/g, "<br />");
                    nav.navigateWithArgs(target, {
                        html: htmlText
                    });
                } else nav.navigateWithArgs(target, {
                    url: url
                });
            }
        });
        dialog.show();
        Ti.App.fireEvent("updateNotification");
    }
    return false;
}

function deviceTokenSuccess(ev) {
    deviceToken = ev.deviceToken;
    console.log("deviceToken:" + deviceToken);
    Cloud.Users.login({
        login: "geomilano",
        password: "geonn2015"
    }, function(e) {
        if (e.success) Cloud.PushNotifications.unsubscribe({
            channel: "survey",
            device_token: deviceToken
        }, function(ey) {
            console.log(ey);
            ey.success ? Cloud.PushNotifications.subscribe({
                channel: "survey",
                type: "android",
                device_token: deviceToken
            }, function(ex) {
                if (ex.success) {
                    Ti.App.Properties.setString("deviceToken", deviceToken);
                    API.updateNotificationToken();
                } else registerPush();
            }) : Cloud.PushNotifications.subscribe({
                channel: "survey",
                type: "android",
                device_token: deviceToken
            }, function(ex) {
                if (ex.success) {
                    console.log(deviceToken + " deviceToken second");
                    Ti.App.Properties.setString("deviceToken", deviceToken);
                    API.updateNotificationToken();
                    console.log("geo7");
                } else {
                    console.log("geo8");
                    registerPush();
                }
            });
        }); else {
            console.log("GEO NOT Error:\n" + (e.error && e.message || JSON.stringify(e)));
            Cloud.PushNotifications.subscribe({
                channel: "survey",
                type: "android",
                device_token: deviceToken
            }, function(ex) {
                console.log(ex);
                if (ex.success) {
                    Ti.App.Properties.setString("deviceToken", deviceToken);
                    API.updateNotificationToken();
                } else registerPush();
            });
        }
    });
}

function deviceTokenError(e) {
    alert("Failed to register for push notifications! " + e.error);
}

function registerPush() {
    CloudPush.retrieveDeviceToken({
        success: deviceTokenSuccess,
        error: deviceTokenError
    });
}

function getNotificationNumber(payload) {}

var Cloud = require("ti.cloud");

var app_status;

var redirect = true;

var CloudPush = require("ti.cloudpush");

CloudPush.addEventListener("callback", function(evt) {
    var payload = JSON.parse(evt.payload);
    console.log("call back notification");
    Ti.App.Payload = payload;
    receivePush(payload);
});

Ti.App.addEventListener("pause", function(e) {
    var theWindow = Ti.App.Properties.getString("currentAppointmentWindow") || "";
    redirect = "1" != theWindow;
    console.log("sleep : " + theWindow);
});

Ti.App.addEventListener("resumed", function(e) {
    var theWindow = Ti.App.Properties.getString("currentAppointmentWindow") || "";
    redirect = "1" != theWindow;
});

exports.setInApp = function() {
    console.log("In App");
    redirect = false;
};

exports.registerPush = function() {
    registerPush();
};