var Cloud = require('ti.cloud');
var app_status;
var CloudPush;
Ti.App.Properties.setString('room_id', "");
if(OS_ANDROID){
	CloudPush = require('ti.cloudpush');
	// notification callback function (important)
	CloudPush.addEventListener('callback', function (evt) {
		var payload = JSON.parse(evt.payload);
		console.log('call back notification');
		Ti.App.Payload = payload;
		// if trayClickLaunchedApp or trayClickFocusedApp set redirect as true
		receivePush(payload);

	});
	CloudPush.addEventListener('trayClickLaunchedApp', function (evt) {
		push_redirect = true;
        app_status = "not_running";
        var payload = JSON.parse(evt.payload);
        Ti.App.Payload = payload;
        console.log('Tray Click Launched App (app was not running)');
        receivePush(payload);

        console.log('Tray Click Launched App (app was not running)');
    });
    CloudPush.addEventListener('trayClickFocusedApp', function (evt) {
    	 push_redirect = false;
        app_status = "running";
        var payload = JSON.parse(evt.payload);
        console.log('Tray Click Focused App (app was already running)');
    });
}

function receivePush(e){
	var target;
	var extra;
	var data = (OS_IOS)?e.data:e;
	if(OS_IOS){
	    console.log(e.data);
		target = e.data.target;
		extra = e.data.extra;
	}else{
		target = e.target;
		extra = e.extra;
	}
	/*eval("var current_id = Ti.App.Properties.getString('"+target+"') || 0");
	console.log(current_id+" "+extra);
	if(current_id == extra){
		eval("Ti.App.fireEvent('"+target+":refresh')");
	}*/
	eval("Ti.App.fireEvent('"+target+":refresh')");
	console.log(push_redirect+" true or false"+target);

	var room_id = Ti.App.Properties.getString('room_id');
	console.log(data.room_id+" < room >"+room_id);
	if(target_page != target && push_redirect){
		console.log( data.room_id+" notification room_id and local room_id "+room_id);
		Ti.App.fireEvent("redirect", data);
	}else if((target == "conversation" || target == "askDoctor/conversation") && data.room_id != room_id && redirect){
	    Ti.App.fireEvent("redirect", data);
	}else{
		Ti.App.fireEvent("syncFromServer");
	}
}

// Process incoming push notifications
function receivePush_bak(e) {
	var target;
	var url;
	if(OS_IOS){
		var param = {
			"id": e.data.id || "",
			"member_no": e.data.mem_no || "",
			"subject": e.data.title || "",
			"message" : e.data.message || "",
			"url" : e.data.extra || "",
			"isRead" : "0",
			"expired" : "",
			"created" : e.data.created,
			"updated" : e.data.updated,
			"from" : "push"
		};
		target = e.data.target;
		url = e.data.extra;
		detail = e.data.detail;
	}else{
		var param = {
			"id": e.id || "",
			"member_no": e.mem_no || "",
			"subject": e.android.title || "",
			"message" : e.message || "",
			"url" : e.extra || "",
			"isRead" : "0",
			"expired" : "",
			"status" : e.status,
			"created" : e.created,
			"updated" : e.updated,
		};
		target = e.target;
		url = e.extra;
		detail = e.detail;
	}
	console.log(target+" and redirect "+redirect);
	if(target == "conversation"){
		if(redirect){
			nav.navigateWithArgs("conversation");
		}else{
			Ti.App.fireEvent('conversation:refresh');
		}
	}else if(target =="appointment"){
		var theWindow = Ti.App.Properties.getString('currentAppointmentWindow') || "";

		if(theWindow == ""){
			var dialog = Ti.UI.createAlertDialog({
				cancel: 1,
				buttonNames: ['Cancel','OK'],
				message: '[Appointment] New message available. Do you want to read now?',
				title: 'Confirmation'
			});
			dialog.addEventListener('click', function(ex){
				if (ex.index === 0){
					//Do nothing
				}
				if (ex.index === 1){
					nav.navigateWithArgs("appointment");
				}
			});
			dialog.show();
		}else {

			Ti.App.fireEvent("appointment:refresh");

		}
	}else{
		var notificationModel = Alloy.createCollection('notification');
	    notificationModel.addData(param);
		var dialog = Ti.UI.createAlertDialog({
			cancel: 0,
			buttonNames: ['Cancel','OK'],
			message: 'New message available. Do you want to read now?',
			title: 'Confirmation'
		});
		dialog.addEventListener('click', function(ex){
			if (ex.index === 0){
				//Do nothing
			}

			if (ex.index === 1){
				if(target == "claimDetail" || target == "survey"){
					nav.navigateWithArgs("asp/notification");
				}

				if(target == "webview"){
					if(url ==""){

						var htmlText ="<style>body{font-family:arial;font-size:14px;color:#606060;} a {text-decoration:none;color:#CE1D1C}</style>"+decodeURIComponent(detail);
						htmlText = htmlText.replace(/(?:\r\n|\r|\n)/g, '<br />');
						nav.navigateWithArgs(target, {
							html: htmlText
						});
					}else{
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
    console.log("deviceToken:"+ deviceToken);
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
					    type:Ti.Platform.name == 'android' ? 'android' : 'ios',
					    device_token: deviceToken
					}, function (ex) {
					    if (ex.success  ) {

					    	/** User device token**/
			         		Ti.App.Properties.setString('deviceToken', deviceToken);
							API.updateNotificationToken();

					    } else {

					    	registerPush();
					    }
					});
			    } else {

			         Cloud.PushNotifications.subscribe({
					    channel: 'survey',
					    type:Ti.Platform.name == 'android' ? 'android' : 'ios',
					    device_token: deviceToken
					}, function (ex) {
					    if (ex.success  ) {
					     	console.log(deviceToken+" deviceToken second");
					    	/** User device token**/
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
	    	  console.log('GEO NOT Error:\n' +
			            ((e.error && e.message) || JSON.stringify(e)));
			Cloud.PushNotifications.subscribe({
					    channel: 'survey',
					    type:Ti.Platform.name == 'android' ? 'android' : 'ios',
					    device_token: deviceToken
					}, function (ex) {
						console.log(ex);
					    if (ex.success  ) {

					    	/** User device token**/
			         		Ti.App.Properties.setString('deviceToken', deviceToken);
							API.updateNotificationToken();

					    } else {
					    	registerPush();
					    }
					});

	    }
	});
	console.log("redirect false token signup");

}


function deviceTokenError(e) {
    console.log('Failed to register for push notifications! ' + e.error);
}

function registerPush(){
	if (Ti.Platform.name == "iPhone OS" && parseInt(Ti.Platform.version.split(".")[0]) >= 8) {

	 // Wait for user settings to be registered before registering for push notifications
	    Ti.App.iOS.addEventListener('usernotificationsettings', function registerForPush() {

	 // Remove event listener once registered for push notifications
	        Ti.App.iOS.removeEventListener('usernotificationsettings', registerForPush);

	        Ti.Network.registerForPushNotifications({
	            success: deviceTokenSuccess,
	            error: deviceTokenError,
	            callback: receivePush
	        });
	    });

	 // Register notification types to use
	    Ti.App.iOS.registerUserNotificationSettings({
		    types: [
	            Ti.App.iOS.USER_NOTIFICATION_TYPE_ALERT,
	            Ti.App.iOS.USER_NOTIFICATION_TYPE_SOUND,
	            Ti.App.iOS.USER_NOTIFICATION_TYPE_BADGE
	        ]
	    });
	}else if(Ti.Platform.osname == "android"){
		CloudPush.retrieveDeviceToken({
		    success: deviceTokenSuccess,
		    error: deviceTokenError
		});
	}else{
		Titanium.Network.registerForPushNotifications({
		    types: [
		        Titanium.Network.NOTIFICATION_TYPE_BADGE,
		        Titanium.Network.NOTIFICATION_TYPE_ALERT,
		        Titanium.Network.NOTIFICATION_TYPE_SOUND
		    ],
			success:deviceTokenSuccess,
			error:deviceTokenError,
			callback:receivePush
		});
	}

}

function getNotificationNumber(payload){

}

exports.setInApp = function(){
//	console.log('In App redirect false');
//	setTimeout(function(){
//          redirect = false;
//          console.log("redirect as false");
//    }, 1000);
};

exports.registerPush = function(){
	registerPush();
};
