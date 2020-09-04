var Cloud = require("ti.cloud");
var channelId = 'sound';
var deviceToken = null;

exports.subscribeToChannel = function (cid) {
  console.log("subscribeToChannel " + cid + " " + deviceToken);
  //alert("subscribeToChannel "+channel+" "+deviceToken);
  if (true) {
    Ti.Android.NotificationManager.createNotificationChannel({
      id: cid,
      name: channelId + " Channel",
      sound: Ti.Filesystem.resRawDirectory + 'doorbell.wav',
      importance: Ti.Android.IMPORTANCE_HIGH });

  }
  Cloud.PushNotifications.subscribe({
    device_token: deviceToken,
    channel: cid,
    type: 'gcm' },
  function (e) {
    //alert("subscribeTo "+channel+" with deviceToken"+deviceToken);

  });
};

var loginUser = function (ex) {
  // Log in to Arrow
  var u_id = Ti.App.Properties.getString('u_id') || "";
  Cloud.Users.login({
    login: u_id,
    password: '123456' },

  function (e) {
    if (e.success) {
      console.log('Login successful');
      ex.callback();
    } else {
      console.log(e.code + " error code ");
      if (true) {
        Cloud.Users.create({
          first_name: u_id,
          username: u_id,
          password: '123456',
          password_confirmation: '123456' },
        function (e) {
          if (e.success) {
            loginUser();
          } else {
            console.log('Error:\n' + (
            e.error && e.message || JSON.stringify(e)));
          }
        });
        console.log('Error:\n' + (e.error && e.message || JSON.stringify(e)));
      }
    }
  });
};
exports.loginUser = loginUser;

exports.logoutUser = function (callback) {
  Cloud.Users.logout(function (e) {
    if (e.success) {
      console.log('Success: Logged out');
    } else {
      console.log('Error:\n' + (
      e.error && e.message || JSON.stringify(e)));
    }
  });
};

exports.pushNotification = function (callback) {

  if (true) {
    var CloudPush = require('ti.cloudpush');
    CloudPush.retrieveDeviceToken({
      success: deviceTokenSuccess,
      error: deviceTokenError });


    // Process incoming push notifications
    CloudPush.addEventListener('callback', function (e) {

      var payload = JSON.parse(e.payload);
      if (payload) {

        callback({
          error: false,
          data: payload });


      }

    });

    CloudPush.addEventListener('trayClickLaunchedApp', function (e) {
      Alloy.Globals.push_redirect = true;
      var payload = JSON.parse(e.payload);
      if (payload) {

        callback({
          error: false,
          data: payload });


      }

    });

    CloudPush.addEventListener('trayClickFocusedApp', function (e) {
      Alloy.Globals.push_redirect = true;
      /*
                                          var payload = JSON.parse(e.payload);
                                          if (payload) {
                                                callback({
                                                  error : false,
                                                  data : payload
                                              });
                                            }*/



    });



  }

  if (false) {

    if ("android" === "iPhone OS" && parseInt(Ti.Platform.version.split(".")[0]) >= 8) {

      // Wait for user settings to be registered before registering for push notifications
      Ti.App.iOS.addEventListener('usernotificationsettings', function registerForPush() {

        // Remove event listener once registered for push notifications
        Ti.App.iOS.removeEventListener('usernotificationsettings', registerForPush);

        Ti.Network.registerForPushNotifications({
          success: deviceTokenSuccess,
          error: deviceTokenError,
          callback: receiveIOSPush });

      });

      // Register notification types to use
      Ti.App.iOS.registerUserNotificationSettings({
        types: [Ti.App.iOS.USER_NOTIFICATION_TYPE_ALERT, Ti.App.iOS.USER_NOTIFICATION_TYPE_SOUND, Ti.App.iOS.USER_NOTIFICATION_TYPE_BADGE] });

    }

    // For iOS 7 and earlier
    else {

        Ti.Network.registerForPushNotifications({
          // Specifies which notifications to receive
          types: [Ti.Network.NOTIFICATION_TYPE_BADGE, Ti.Network.NOTIFICATION_TYPE_ALERT, Ti.Network.NOTIFICATION_TYPE_SOUND],
          success: deviceTokenSuccess,
          error: deviceTokenError,
          callback: receiveIOSPush });

      }

    function receiveIOSPush(e) {

      callback({
        error: false,
        data: e.data });


    }

  }

  // Save the device token for subsequent API calls
  function deviceTokenSuccess(e) {

    deviceToken = e.deviceToken;

    Titanium.App.Properties.setString('deviceToken', deviceToken);
    Alloy.Globals.API.updateNotificationToken();
    Cloud.PushNotifications.subscribe({
      device_token: Titanium.App.Properties.getString('deviceToken'),
      channel: channelId,
      type: 'gcm' },
    function (e) {


    });

    // Reset the badge if neededpushNotification
    Cloud.PushNotifications.resetBadge({
      device_token: Titanium.App.Properties.getString('deviceToken') },
    function (e) {


    });

  }

  function deviceTokenError(e) {

    callback({
      error: true,
      message: e.error });


  }

};