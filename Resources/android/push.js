var Cloud = require('ti.cloud');
var app_status;
var redirect = true;
if (true) {
	var CloudPush = require('ti.cloudpush');

	CloudPush.addEventListener('callback', function (evt) {
		var payload = JSON.parse(evt.payload);
		console.log('call back notification');
		Ti.App.Payload = payload;

		receivePush(payload);
	});
}

function receivePush(e) {
	var target;
	var extra;
	var data = false ? e.data : e;
	if (false) {
		Titanium.UI.iPhone.setAppBadge("0");
		target = e.data.target;
		extra = e.data.extra;
	} else {
		target = e.target;
		extra = e.extra;
	}
	eval("var current_id = Ti.App.Properties.getString('" + target + "') || 0");
	console.log(current_id + " " + extra);
	if (current_id == extra) {
		eval("Ti.App.fireEvent('" + target + ":refresh')");
	}

	console.log(redirect + " true or false" + target);
	if (redirect) {
		Ti.App.fireEvent("redirect", data);
	} else {
		Ti.App.fireEvent("syncFromServer");
		var player = Ti.Media.createSound({ url: "/sound/doorbell.wav" });
		player.play();
	}
}

function receivePush_bak(e) {
	var target;
	var url;
	if (false) {
		Titanium.UI.iPhone.setAppBadge("0");
		var param = {
			"id": e.data.id || "",
			"member_no": e.data.mem_no || "",
			"subject": e.data.title || "",
			"message": e.data.message || "",
			"url": e.data.extra || "",
			"isRead": "0",
			"expired": "",
			"created": e.data.created,
			"updated": e.data.updated,
			"from": "push"
		};
		target = e.data.target;
		url = e.data.extra;
		detail = e.data.detail;
	} else {
		var param = {
			"id": e.id || "",
			"member_no": e.mem_no || "",
			"subject": e.android.title || "",
			"message": e.message || "",
			"url": e.extra || "",
			"isRead": "0",
			"expired": "",
			"status": e.status,
			"created": e.created,
			"updated": e.updated
		};
		target = e.target;
		url = e.extra;
		detail = e.detail;
	}
	console.log(target + " and redirect " + redirect);
	if (target == "conversation") {
		if (redirect) {
			nav.navigateWithArgs("conversation");
		} else {
			Ti.App.fireEvent('conversation:refresh');
		}
	} else if (target == "appointment") {
		var theWindow = Ti.App.Properties.getString('currentAppointmentWindow') || "";

		if (theWindow == "") {
			var dialog = Ti.UI.createAlertDialog({
				cancel: 1,
				buttonNames: ['Cancel', 'OK'],
				message: '[Appointment] New message available. Do you want to read now?',
				title: 'Confirmation'
			});
			dialog.addEventListener('click', function (ex) {
				if (ex.index === 0) {}
				if (ex.index === 1) {
					nav.navigateWithArgs("appointment");
				}
			});
			dialog.show();
		} else {

			Ti.App.fireEvent("appointment:refresh");
		}
	} else {
		var notificationModel = Alloy.createCollection('notification');
		notificationModel.addData(param);
		var dialog = Ti.UI.createAlertDialog({
			cancel: 0,
			buttonNames: ['Cancel', 'OK'],
			message: 'New message available. Do you want to read now?',
			title: 'Confirmation'
		});
		dialog.addEventListener('click', function (ex) {
			if (ex.index === 0) {}

			if (ex.index === 1) {
				if (target == "claimDetail" || target == "survey") {
					nav.navigateWithArgs("asp/notification");
				}

				if (target == "webview") {
					if (url == "") {

						var htmlText = "<style>body{font-family:arial;font-size:14px;color:#606060;} a {text-decoration:none;color:#CE1D1C}</style>" + decodeURIComponent(detail);
						htmlText = htmlText.replace(/(?:\r\n|\r|\n)/g, '<br />');
						nav.navigateWithArgs(target, {
							html: htmlText
						});
					} else {
						nav.navigateWithArgs(target, {
							url: url
						});
					}
				}
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
		login: 'geomilano',
		password: 'geonn2015'
	}, function (e) {
		if (e.success) {
			Cloud.PushNotifications.unsubscribe({
				channel: 'survey',
				device_token: deviceToken
			}, function (ey) {

				console.log(ey);
				if (ey.success) {

					Cloud.PushNotifications.subscribe({
						channel: 'survey',
						type: 'android' == 'android' ? 'android' : 'ios',
						device_token: deviceToken
					}, function (ex) {
						if (ex.success) {
							Ti.App.Properties.setString('deviceToken', deviceToken);
							API.updateNotificationToken();
						} else {

							registerPush();
						}
					});
				} else {

					Cloud.PushNotifications.subscribe({
						channel: 'survey',
						type: 'android' == 'android' ? 'android' : 'ios',
						device_token: deviceToken
					}, function (ex) {
						if (ex.success) {
							console.log(deviceToken + " deviceToken second");

							Ti.App.Properties.setString('deviceToken', deviceToken);
							API.updateNotificationToken();
							console.log("geo7");
						} else {
							console.log("geo8");
							registerPush();
						}
					});
				}
			});
		} else {
			console.log('GEO NOT Error:\n' + (e.error && e.message || JSON.stringify(e)));
			Cloud.PushNotifications.subscribe({
				channel: 'survey',
				type: 'android' == 'android' ? 'android' : 'ios',
				device_token: deviceToken
			}, function (ex) {
				console.log(ex);
				if (ex.success) {
					Ti.App.Properties.setString('deviceToken', deviceToken);
					API.updateNotificationToken();
				} else {
					registerPush();
				}
			});
		}
	});
	redirect = false;
}

function deviceTokenError(e) {
	alert('Failed to register for push notifications! ' + e.error);
	redirect = false;
}

function registerPush() {
	if ('android' == "iPhone OS" && parseInt(Ti.Platform.version.split(".")[0]) >= 8) {
		Ti.App.iOS.addEventListener('usernotificationsettings', function registerForPush() {
			Ti.App.iOS.removeEventListener('usernotificationsettings', registerForPush);

			Ti.Network.registerForPushNotifications({
				success: deviceTokenSuccess,
				error: deviceTokenError,
				callback: receivePush
			});
		});

		Ti.App.iOS.registerUserNotificationSettings({
			types: [Ti.App.iOS.USER_NOTIFICATION_TYPE_ALERT, Ti.App.iOS.USER_NOTIFICATION_TYPE_SOUND, Ti.App.iOS.USER_NOTIFICATION_TYPE_BADGE]
		});
	} else if ('android' == "android") {
		CloudPush.retrieveDeviceToken({
			success: deviceTokenSuccess,
			error: deviceTokenError
		});
	} else {
		Titanium.Network.registerForPushNotifications({
			types: [Titanium.Network.NOTIFICATION_TYPE_BADGE, Titanium.Network.NOTIFICATION_TYPE_ALERT, Titanium.Network.NOTIFICATION_TYPE_SOUND],
			success: deviceTokenSuccess,
			error: deviceTokenError,
			callback: receivePush
		});
	}
}

function getNotificationNumber(payload) {}

exports.setInApp = function () {
	console.log('In App');
	redirect = false;
};

exports.registerPush = function () {
	registerPush();
};