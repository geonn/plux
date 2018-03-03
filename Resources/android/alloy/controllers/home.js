var Alloy = require('/alloy'),
Backbone = Alloy.Backbone,
_ = Alloy._;




function __processArg(obj, key) {
  var arg = null;
  if (obj) {
    arg = obj[key] || null;
    delete obj[key];
  }
  return arg;
}

function Controller() {

  require('/alloy/controllers/' + 'BaseController').apply(this, Array.prototype.slice.call(arguments));
  this.__controllerPath = 'home';
  this.args = arguments[0] || {};

  if (arguments[0]) {
    var __parentSymbol = __processArg(arguments[0], '__parentSymbol');
    var $model = __processArg(arguments[0], '$model');
    var __itemTemplate = __processArg(arguments[0], '__itemTemplate');
  }
  var $ = this;
  var exports = {};
  var __defers = {};







  if (true) {
    $.__views.win = Ti.UI.createWindow(
    { backgroundColor: "#ffffff", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, id: "win", title: "", navBarHidden: true });

    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.socket = Ti.UI.createWebView(
    { width: Ti.UI.FILL, zIndex: 100, url: "/html/socket.html", id: "socket", height: 0 });

    $.__views.win.add($.__views.socket);
    $.__views.main = Ti.UI.createView(
    { id: "main" });

    $.__views.win.add($.__views.main);
    $.__views.daily_background = Ti.UI.createView(
    { id: "daily_background", width: Ti.UI.FILL, height: Ti.UI.FILL });

    $.__views.main.add($.__views.daily_background);
    $.__views.__alloyId440 = Ti.UI.createView(
    { width: Ti.UI.FILL, height: Ti.UI.FILL, id: "__alloyId440" });

    $.__views.main.add($.__views.__alloyId440);
    $.__views.logo = Ti.UI.createImageView(
    { id: "logo", borderRadius: 10, width: 100, height: 100, top: 10, left: 10, image: "/images/logo_plux.png", zIndex: 5 });

    $.__views.__alloyId440.add($.__views.logo);
    $.__views.myinfo_view = Ti.UI.createView(
    { zIndex: 4, id: "myinfo_view", left: 110, width: Ti.UI.FILL, height: Ti.UI.SIZE, top: 20, backgroundColor: "#B3000000" });

    $.__views.__alloyId440.add($.__views.myinfo_view);
    $.__views.myInfo = Ti.UI.createView(
    { width: Ti.UI.FILL, top: 10, bottom: 10, height: 60, id: "myInfo" });

    $.__views.myinfo_view.add($.__views.myInfo);
    $.__views.loadingBar = Ti.UI.createView(
    { layout: "vertical", id: "loadingBar", height: 0, width: 120, borderRadius: 15, top: 0, opacity: 0, backgroundColor: "#2E2E2E" });

    $.__views.__alloyId440.add($.__views.loadingBar);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator(
    { top: 10, left: 30, width: 60, id: "activityIndicator" });

    $.__views.loadingBar.add($.__views.activityIndicator);
    $.__views.__alloyId441 = Ti.UI.createLabel(
    { width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#ffffff", top: 5, bottom: 10, text: "Loading", id: "__alloyId441" });

    $.__views.loadingBar.add($.__views.__alloyId441);
    $.__views.scrollboard1 = Ti.UI.createScrollView(
    { layout: "horizontal", id: "scrollboard1", width: 293, contentWidth: 293, height: Ti.UI.FILL, zIndex: 3 });

    $.__views.__alloyId440.add($.__views.scrollboard1);
    $.__views.scrollboard = Ti.UI.createView(
    { layout: "horizontal", id: "scrollboard", height: Ti.UI.SIZE, zIndex: 3 });

    $.__views.scrollboard1.add($.__views.scrollboard);
  }
  exports.destroy = function () {};




  _.extend($, $.__views);


  var args = arguments[0] || {};
  var expandmode = false;
  var loading = Alloy.createController('loading');

  var menu_info;
  var new_menu = [];

  common.construct($);

  var loadingView = Alloy.createController("loader");
  loadingView.getView().open();
  loadingView.start();

  function loadHomePageItem() {
    menu_info = [{ mod: "feedback", image: "/images/btn/btn_feedback.png" },

    { mod: "myHealth", image: "/images/btn/btn_my_health.png" }, { mod: "profile", image: "/images/btn/btn_profile.png" }, { mod: "clinicLocator", image: "/images/btn/btn_clinic_location.png" }, { mod: "myMedicalRecord", image: "/images/btn/btn_my_medical_record.png" }];
    console.log(Ti.App.Properties.getString('memno') + " Ti.App.Properties.getString('memno')");
    var memno = Ti.App.Properties.getString('memno') || "";
    if (memno != "") {
      menu_info.push({ mod: "benefit", image: "/images/btn/btn_flexi_benefit.png" });
      menu_info.push({ mod: "askDoctor/find_doctor", image: "/images/btn/btn_doctor.png" });
      menu_info.push({ mod: "eCard_list", image: "/images/btn/btn_asp_e_card_pass.png" });
      menu_info.push({ mod: "inpatient_record", image: "/images/btn/inpatient.png" });
      menu_info.push({ mod: "claimSubmission", image: "/images/btn/btn_claim_submission.png" });
      menu_info.push({ mod: "myClaim", image: "/images/btn/btn_my_claim_detail.png" });
      menu_info.push({ mod: "conversation", image: "/images/btn/btn_ask_me.png" });
    }
    menu_info.push({ mod: "notification", image: "/images/btn/btn_notification.png" });
  }

  function loadingViewFinish() {

    if (false) {
      $.navMenu.open();
    } else {
      $.win.open();
    }
    console.log("loadingViewFinish");
    loadingView.finish(function () {});
    init();
  }

  if ('android' != "android") {
    Alloy.Globals.navMenu = $.navMenu;
  }

  console.log("Empno" + Ti.App.Properties.getString("empno") + " corpcode:" + Ti.App.Properties.getString("corpcode"));
  function checkserviceByCorpcode() {
    var corpcode = Ti.App.Properties.getString('corpcode');
    loadHomePageItem();
    new_menu = menu_info;
    console.log(menu_info.length);
    console.log(new_menu.length + " new_menu checkserviceByCorpcode");
    if (corpcode != "null") {
      console.log(corpcode + " corpcode");
      API.callByPost({ url: "getCorpPermission", params: { corpcode: corpcode } }, function (responseText) {
        var res = JSON.parse(responseText);
        console.log('why no response?');
        console.log(res);
        if (res.status == "success") {
          var takeout = res.data;
          for (var i = 0; i < takeout.length; i++) {
            var index = findIndexInData(new_menu, "mod", takeout[i]);

            if (index >= 0) {
              new_menu.splice(index, 1);
            }
          };
        }
        render_menu();
      });
    } else {

      render_menu();
    }
  }

  function findIndexInData(data, property, value) {
    var result = -1;
    data.some(function (item, i) {
      if (item[property] === value) {
        result = i;
        return true;
      }
    });
    return result;
  }

  var label_notification = $.UI.create("Label", { id: "notificationText", text: 0, color: "#ffffff" });
  var label_helpline = $.UI.create("Label", { text: 0, text: 0, color: "#ffffff" });
  function render_menu() {
    var button_width = 139;
    console.log(new_menu.length + " new_menu number");
    removeAllChildren($.scrollboard);
    for (var i = 0; i < new_menu.length; i++) {
      var topR = 10;
      if (i == new_menu.length - 1 || i == new_menu.length - 2) {
        topR = 239;
      }
      var imageView_menu = $.UI.create("ImageView", {
        mod: new_menu[i].mod,
        width: button_width,
        left: 5,
        image: new_menu[i].image });

      var view = $.UI.create("View", { classes: ['wsize', 'hsize'], top: topR });
      if (new_menu[i].mod == "conversation") {
        var model = Alloy.createCollection("chat");
        var total = model.getCountUnread();
        console.log(total + " total unread");
        var view_notification = $.UI.create("View", { top: 10, right: 5, borderRadius: 15, backgroundColor: "#CE1D1C", width: 30, height: 30 });
        label_helpline.text = total;
        view_notification.add(label_helpline);
        view.add(imageView_menu);
        view.add(view_notification);
        var image_helpline = $.UI.create("ImageView", { image: "/images/icons/helpline.png", bottom: 0, right: 0, height: 40, width: 118, bubbleParent: false });
        image_helpline.addEventListener('click', function (e) {
          console.log('call now');
          var dialog = Ti.UI.createAlertDialog({
            cancel: 2,
            buttonNames: ['Call', 'Save Contact', 'Cancel'],
            message: 'Welcome to helpline service.',
            title: 'Helpline' });

          dialog.addEventListener('click', function (e) {
            if (e.index == 0) {
              Titanium.Platform.openURL('tel:6046091611');
            } else if (e.index == 1) {
              var person = Ti.Contacts.createPerson({
                firstName: 'ASP',
                lastName: 'HELPDESK',
                phone: {
                  work: ['6046091611'] } });


              alert("ASP HELDESK CONTACT SAVED");
            }
          });
          dialog.show();
        });
        view.add(image_helpline);
        if (total > 0) {
          popup({ message: 'You got replied from helpdesk. Do you want to read now?', title: "Helpdesk replied",
            callback: function () {
              nav.navigationWindow("conversation", 1);
            } });

        }
      } else if (new_menu[i].mod == "notification") {
        var memno = Ti.App.Properties.getString('memno') || Ti.App.Properties.getString('ic_no');
        var notificationModel = Alloy.createCollection('notificationV2');
        var total = notificationModel.getCountUnread();
        console.log(total + " total unread" + memno);
        var view_notification = $.UI.create("View", { top: 10, right: 5, borderRadius: 15, backgroundColor: "#CE1D1C", width: 30, height: 30 });
        label_notification.text = total;
        view_notification.add(label_notification);
        view.add(imageView_menu);
        view.add(view_notification);
      } else {
        view.add(imageView_menu);
      }
      imageView_menu.addEventListener("click", navWindow);
      $.scrollboard.insertAt({ view: view, position: 0 });
    }
  }


  function init() {
    console.log("init start");
    $.win.add(loading.getView());
    loading.start();
    loadHomePageItem();

    checkserviceByCorpcode();
    var AppVersionControl = require('AppVersionControl');
    AppVersionControl.checkAndUpdate();



    refreshHeaderInfo();


    var initBackground = [{ img_path: "/images/background1.jpg", time: 0 }, { img_path: "/images/background2.jpg", time: 10 }, { img_path: "/images/background3.jpg", time: 18 }];
    var initBackgroundData = Ti.App.Properties.getString('initBackgroundData');
    initBackgroundData = 0;
    if (initBackgroundData != "1") {
      Ti.App.Properties.setString('initBackgroundData', "1");
      var homebgModel = Alloy.createCollection('home_background');
      homebgModel.resetCategory();
      for (var i = 0; i < initBackground.length; i++) {

        var model = Alloy.createModel('home_background', { img_path: initBackground[i].img_path, time: initBackground[i].time });
        model.save();
      };
    }
    setBackground();
    syncFromServer();
    var PUSH = require('push');
    PUSH.registerPush();
  }

  function syncFromServer() {
    loading.start();
    console.log("syncFromServer");
    var u_id = Ti.App.Properties.getString('u_id') || "";
    if (u_id == 0) {
      return;
    }
    var checker = Alloy.createCollection('updateChecker');
    var isUpdate = checker.getCheckerById(2, u_id);
    var last_updated = "";

    if (isUpdate != "") {
      last_updated = isUpdate.updated;
    }
    var param = {
      "u_id": u_id,
      "last_updated": last_updated };


    API.callByPost({ url: "getNotificationV2", domain: "FREEJINI_DOMAIN", new: true, params: param }, function (responseText) {
      var res = JSON.parse(responseText);
      if (res.status == "success") {
        var arr = res.data;
        var notificationModel = Alloy.createCollection('notificationV2');
        notificationModel.saveArray(arr);
        checker.updateModule(2, "notificationList", res.last_updated, u_id);
        updateNotification({ target: "notification", model: "notificationV2" });
        loading.finish();
      }
    });

    var isUpdate = checker.getCheckerById(7, u_id);
    var last_updated = "";

    if (isUpdate != "") {
      last_updated = isUpdate.updated;
    }

    API.callByPost({ url: "getHelplineMessageV3", params: { u_id: u_id, last_updated: last_updated } }, function (responseText) {
      var res = JSON.parse(responseText);
      if (res.status == "success") {
        var arr = res.data;
        var model = Alloy.createCollection("chat");
        model.saveArray(arr);
        checker.updateModule(7, "helpline", res.last_updated, u_id);
        updateNotification({ target: "helpline", model: "chat" });
        loading.finish();
      }
    });
  }

  function checkMyHealthData() {
    var u_id = Ti.App.Properties.getString('u_id') || "";
    var checker = Alloy.createCollection('updateChecker');
    var isUpdate = checker.getCheckerById("14", u_id);
    var last_updated = "";

    if (isUpdate != "") {
      last_updated = isUpdate.updated;
    }

    API.callByPost({ url: "getHealthDataByUser", params: { u_id: u_id, last_updated: last_updated } }, function (responseText) {

      var model2 = Alloy.createCollection("health");
      var res2 = JSON.parse(responseText);

      var arr2 = res2.data || null;
      model2.saveArray(arr2);

      checker.updateModule(14, "getHealthDataByUser", res2.last_updated, u_id);
    });
  }

  function updateNotification(e) {
    console.log("updateNotification");
    console.log(e);
    var model = Alloy.createCollection(e.model);
    var unread_no = model.getCountUnread();
    if (e.target == "helpline") {
      label_helpline.text = unread_no;
    } else {
      label_notification.text = unread_no;
      if (false) {
        Titanium.UI.iPhone.setAppBadge(unread_no);
      }
    }
  }

  function refreshHeaderInfo() {
    var memno = Ti.App.Properties.getString('memno') || "";

    removeAllChildren($.myInfo);
    var u_id = Ti.App.Properties.getString('u_id');

    $.logo.image = memno == "" ? "/images/logo_plux.png" : "/images/asp_logo.png";
    var logoutBtn = Ti.UI.createButton({
      backgroundImage: "/images/btn-logout.png",
      width: 40,
      height: 40,
      left: 5,
      right: 5,
      zIndex: 20 });

    logoutBtn.addEventListener('click', function () {
      var dialog = Ti.UI.createAlertDialog({
        cancel: 0,
        buttonNames: ['Cancel', 'Confirm'],
        message: 'Would you like to logout?',
        title: 'Logout' });

      dialog.addEventListener('click', function (e) {
        if (e.index === 1) {
          logoutUser();
        }
      });
      dialog.show();
    });

    var title_view = $.UI.create("View", {
      classes: ['wfill', 'hsize'],
      left: 50 });

    var fullname = Ti.App.Properties.getString('fullname') || "";
    var welcomeText = "Welcome " + fullname || "";
    var welcomeTitle = $.UI.create('Label', {
      text: welcomeText,
      classes: ['welcome_text'] });


    title_view.add(welcomeTitle);
    $.myInfo.add(logoutBtn);
    $.myInfo.add(title_view);
  }

  function redirect(e) {
    console.log(e.target);
    nav.navigationWindow(e.target, "", "", e.app_param);
  }

  function navWindow(e) {
    var target = e.source.mod;
    console.log(target + " target");
    if (e.source.mod == "eCard" || e.source.mod == "benefit" || e.source.mod == "eCard_list" || e.source.mod == "myClaim" || e.source.mod == "claimSubmission" || e.source.mod == "notification") {
      if (e.source.mod == "notification") {
        nav.navigationWindow("asp/" + target);
      } else {
        nav.navigationWindow("asp/" + target, 1);
      }
    } else if (e.source.mod == "myHealth") {
      nav.navigationWindow(target + "/index");
    } else if (e.source.mod == "clinicLocator") {
      var memno = Ti.App.Properties.getString('memno') || "";


      requestLocationPermissions(Ti.Geolocation.AUTHORIZATION_WHEN_IN_USE, function (e) {
        if (e.success) {
          contacts({ callback: function () {
              console.log('why not calling');
              if (memno == "") {
                nav.navigationWindow("clinic/listing");
              } else {
                nav.navigationWindow("clinic/listing", 1);
              }
            } });

        } else {
          var dialog = Ti.UI.createAlertDialog({
            message: 'You do not have location permissions enabled shake locate needs these to work.',
            ok: 'Got it',
            title: 'Important' });


          dialog.addEventListener('click', function (e) {

            if (false) {

              Ti.Platform.openURL('app-settings:');
            }

            if (true) {

              var intent = Ti.Android.createIntent({
                action: 'android.settings.APPLICATION_SETTINGS' });

              intent.addFlags(Ti.Android.FLAG_ACTIVITY_NEW_TASK);
              Ti.Android.currentActivity.startActivity(intent);
            }
          });

          dialog.show();
        }
      });
































    } else if (e.source.mod == "conversation") {
      nav.navigationWindow(target, 1);
    } else if (e.source.mod == "profile") {
      var empno = Ti.App.Properties.getString('empno');
      if (typeof empno != "undefined" && empno != "") {
        nav.navigationWindow("asp/profile", 1);
      } else {
        nav.navigationWindow("plux_profile");
      }
    } else {
      console.log(target + " target");
      nav.navigationWindow(target);
    }
  }

  function logoutUser() {
    Ti.App.Properties.removeProperty('fullname');
    Ti.App.Properties.removeProperty('plux_user_status');
    Ti.App.Properties.removeProperty('last_login');
    Ti.App.Properties.removeProperty('u_id');
    Ti.App.Properties.removeProperty('ic_no');
    Ti.App.Properties.removeProperty('plux_email');
    Ti.App.Properties.removeProperty('memno');
    Ti.App.Properties.removeProperty('empno');
    Ti.App.Properties.removeProperty('corpcode');
    Ti.App.Properties.removeProperty('cardno');
    Ti.App.Properties.removeProperty("dependent");

    var win = Alloy.createController("login").getView();
    win.open();

    if (false) {
      $.navMenu.close();
      Alloy.Globals.navMenu = null;
    } else {
      console.log("window sudah close");
      $.win.close();
    }
  }

  function setBackground() {
    var home_background = Alloy.createCollection('home_background');
    var today = new Date();
    var hours = today.getHours();
    var bg = home_background.getCategoryByTime(hours);

    $.daily_background.setBackgroundImage(bg.img_path);
  }

  if ('android' == "android") {
    $.win.addEventListener('android:back', function (e) {
      var dialog = Ti.UI.createAlertDialog({
        cancel: 0,
        buttonNames: ['Cancel', 'Confirm'],
        message: 'Would you like to logout?',
        title: 'Logout ASP' });

      dialog.addEventListener('click', function (e) {
        if (e.index == 1) {
          logoutUser();
        }
      });
      dialog.show();
    });

    Ti.Android.currentActivity.onResume = syncFromServer;

  }

  function contacts(ex) {


    var hasContactsPermissions = Ti.Contacts.hasContactsPermissions();

    if (hasContactsPermissions) {



      if (false) {}

      ex.callback();
    }


    if (false) {


      var map = {};
      map[Ti.Contacts.AUTHORIZATION_AUTHORIZED] = 'AUTHORIZATION_AUTHORIZED';
      map[Ti.Contacts.AUTHORIZATION_DENIED] = 'AUTHORIZATION_DENIED';
      map[Ti.Contacts.AUTHORIZATION_RESTRICTED] = 'AUTHORIZATION_RESTRICTED';
      map[Ti.Contacts.AUTHORIZATION_UNKNOWN] = 'AUTHORIZATION_UNKNOWN';


      var contactsAuthorization = Ti.Contacts.contactsAuthorization;
      console.log('Ti.Contacts.contactsAuthorization', 'Ti.Contacts.' + map[contactsAuthorization]);

      if (contactsAuthorization === Ti.Contacts.AUTHORIZATION_RESTRICTED) {
        return alert('Because permission are restricted by some policy which you as user cannot change, we don\'t request as that might also cause issues.');
      } else if (contactsAuthorization === Ti.Calendar.AUTHORIZATION_DENIED) {
        return dialogs.confirm({
          title: 'You denied permission before',
          message: 'We don\'t request again as that won\'t show the dialog anyway. Instead, press Yes to open the Settings App to grant permission there.',
          callback: editPermissions });

      }
    }


    Ti.Contacts.requestContactsPermissions(function (e) {
      console.log('Ti.Contacts.requestContactsPermissions', e);

      if (e.success) {


        ex.callback();
      } else if (true) {
        alert('You don\'t have the required uses-permissions in tiapp.xml or you denied permission for now, forever or the dialog did not show at all because you denied forever before.');
      } else {


        alert('You denied permission.');
      }
    });
  }

  function requestLocationPermissions(authorizationType, callback) {



    if (false && !Ti.Geolocation.locationServicesEnabled) {
      return callback({
        success: false,
        error: 'Location Services Disabled' });

    }


    if (Ti.Geolocation.hasLocationPermissions(authorizationType)) {
      return callback({
        success: true });

    }


    if (false) {

      if (Ti.Geolocation.locationServicesAuthorization === Ti.Geolocation.AUTHORIZATION_RESTRICTED) {
        return callback({
          success: false,
          error: 'Your device policy does not allow Geolocation' });

      } else if (Ti.Geolocation.locationServicesAuthorization === Ti.Geolocation.AUTHORIZATION_DENIED) {

        dialogs.confirm({
          title: 'You denied permission before',
          message: 'Tap Yes to open the Settings app to restore permissions, then try again.',
          callback: function () {
            Ti.Platform.openURL(Ti.App.iOS.applicationOpenSettingsURL);
          } });



        return callback({
          success: false });

      }
    }


    Ti.Geolocation.requestLocationPermissions(authorizationType, function (e) {

      if (!e.success) {
        return callback({
          success: false,
          error: e.error || 'Failed to request Location Permissions' });

      }

      callback({
        success: true });

    });
  }

  $.win.addEventListener("close", function () {
    Ti.App.removeEventListener('resumed', syncFromServer);
    Ti.App.removeEventListener('syncFromServer', syncFromServer);
    Ti.App.removeEventListener('updateNotification', updateNotification);
    Ti.App.removeEventListener('render_menu', render_menu);
    Ti.App.removeEventListener('redirect', redirect);
    Ti.App.removeEventListener('updateHeader', refreshHeaderInfo);
    Ti.App.removeEventListener('updateMenu', checkserviceByCorpcode);
    Ti.App.removeEventListener('app:loadingViewFinish', loadingViewFinish);
    $.destroy();
  });
  Ti.App.addEventListener('render_menu', render_menu);
  Ti.App.addEventListener("redirect", redirect);
  Ti.App.addEventListener('resumed', syncFromServer);
  Ti.App.addEventListener('syncFromServer', syncFromServer);
  Ti.App.addEventListener('app:loadingViewFinish', loadingViewFinish);
  Ti.App.addEventListener('updateNotification', updateNotification);
  Ti.App.addEventListener('updateMenu', checkserviceByCorpcode);
  Ti.App.addEventListener('updateHeader', refreshHeaderInfo);









  _.extend($, exports);
}

module.exports = Controller;