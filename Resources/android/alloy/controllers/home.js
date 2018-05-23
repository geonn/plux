var Alloy = require('/alloy'),
Backbone = Alloy.Backbone,
_ = Alloy._;




function __processArg(obj, key) {
  var arg = null;
  if (obj) {
    arg = obj[key] || null;
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







  $.__views.win = Ti.UI.createWindow(
  { backgroundColor: "#535a74", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, id: "win", title: "", navBarHidden: true, exitOnClose: true });

  $.__views.win && $.addTopLevelView($.__views.win);
  $.__views.socket = Ti.UI.createWebView(
  { width: Ti.UI.FILL, zIndex: 100, url: "/html/socket.html", id: "socket", height: 0 });

  $.__views.win.add($.__views.socket);
  $.__views.__alloyId616 = Ti.UI.createView(
  { borderWidth: 0, width: Ti.UI.FILL, height: Ti.UI.FILL, id: "__alloyId616" });

  $.__views.win.add($.__views.__alloyId616);
  $.__views.shadow_header = Ti.UI.createView(
  { borderWidth: 0, width: Ti.UI.FILL, height: Ti.UI.SIZE, backgroundColor: "#e8534c", zIndex: 100, top: 0, id: "shadow_header" });

  $.__views.__alloyId616.add($.__views.shadow_header);
  $.__views.shadow_logo = Ti.UI.createImageView(
  { id: "shadow_logo", width: 60, top: 10, bottom: 10, borderRadius: 10, borderColor: "#fff", height: 60, right: 20, defaultImage: "/images/logo_plux.png", image: "/appicon-60@3x.png" });

  $.__views.shadow_header.add($.__views.shadow_logo);
  $.__views.shadow_myInfo = Ti.UI.createView(
  { borderWidth: 0, height: Ti.UI.SIZE, width: "60%", left: 10, id: "shadow_myInfo" });

  $.__views.shadow_header.add($.__views.shadow_myInfo);
  $.__views.scrollview = Ti.UI.createScrollView(
  { layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.FILL, contentHeight: Ti.UI.SIZE, contentWidth: Ti.UI.FILL, id: "scrollview" });

  $.__views.__alloyId616.add($.__views.scrollview);
  $.__views.header = Ti.UI.createView(
  { borderWidth: 0, width: Ti.UI.FILL, height: Ti.UI.SIZE, id: "header" });

  $.__views.scrollview.add($.__views.header);
  $.__views.bg = Ti.UI.createImageView(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, id: "bg", image: "/images/slideshow/night_1.png" });

  $.__views.header.add($.__views.bg);
  $.__views.__alloyId617 = Ti.UI.createView(
  { borderWidth: 0, layout: "horizontal", width: Ti.UI.SIZE, height: Ti.UI.SIZE, top: 60, id: "__alloyId617" });

  $.__views.header.add($.__views.__alloyId617);
  $.__views.day = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#ffffff", font: { fontSize: 36 }, text: '12', id: "day", right: 10 });

  $.__views.__alloyId617.add($.__views.day);
  $.__views.__alloyId618 = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: Ti.UI.SIZE, height: Ti.UI.SIZE, id: "__alloyId618" });

  $.__views.__alloyId617.add($.__views.__alloyId618);
  $.__views.days = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#ffffff", font: { fontSize: 18 }, text: 'Tuesday', id: "days", left: 0 });

  $.__views.__alloyId618.add($.__views.days);
  $.__views.month_year = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#ffffff", font: { fontSize: 10 }, text: 'December, 2018', id: "month_year", left: 0 });

  $.__views.__alloyId618.add($.__views.month_year);
  $.__views.__alloyId619 = Ti.UI.createView(
  { borderWidth: 0, width: Ti.UI.FILL, height: Ti.UI.SIZE, bottom: 10, id: "__alloyId619" });

  $.__views.header.add($.__views.__alloyId619);
  $.__views.logo = Ti.UI.createImageView(
  { id: "logo", mod: "notification", width: 60, borderRadius: 10, borderColor: "#fff", height: 60, right: 20, defaultImage: "/images/logo_plux.png", image: "/appicon-60@3x.png" });

  $.__views.__alloyId619.add($.__views.logo);
  navWindow ? $.addListener($.__views.logo, 'click', navWindow) : __defers['$.__views.logo!click!navWindow'] = true;$.__views.__alloyId620 = Ti.UI.createView(
  { borderWidth: 0, width: Ti.UI.SIZE, height: Ti.UI.SIZE, borderColor: "#ffffff", backgroundColor: "#e8534c", borderRadius: "5", right: 10, bottom: 0, id: "__alloyId620" });

  $.__views.__alloyId619.add($.__views.__alloyId620);
  $.__views.label_notification = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#ffffff", top: 4, left: 4, right: 4, bottom: 4, font: { fontSize: 12 }, text: '0', id: "label_notification" });

  $.__views.__alloyId620.add($.__views.label_notification);
  $.__views.myInfo = Ti.UI.createView(
  { borderWidth: 0, width: "60%", height: Ti.UI.SIZE, left: 10, id: "myInfo" });

  $.__views.__alloyId619.add($.__views.myInfo);
  logoutUser ? $.addListener($.__views.myInfo, 'click', logoutUser) : __defers['$.__views.myInfo!click!logoutUser'] = true;var __alloyId622 = [];
  $.__views.__alloyId623 = Ti.UI.createImageView(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, image: "https://previews.123rf.com/images/kurhan/kurhan1511/kurhan151100176/47331368-group-of-medical-doctors-health-care-concept-background-.jpg", id: "__alloyId623" });

  __alloyId622.push($.__views.__alloyId623);
  $.__views.__alloyId624 = Ti.UI.createImageView(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, image: "https://previews.123rf.com/images/kurhan/kurhan1511/kurhan151100176/47331368-group-of-medical-doctors-health-care-concept-background-.jpg", id: "__alloyId624" });

  __alloyId622.push($.__views.__alloyId624);
  $.__views.__alloyId625 = Ti.UI.createImageView(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, image: "https://previews.123rf.com/images/kurhan/kurhan1511/kurhan151100176/47331368-group-of-medical-doctors-health-care-concept-background-.jpg", id: "__alloyId625" });

  __alloyId622.push($.__views.__alloyId625);
  $.__views.__alloyId621 = Ti.UI.createScrollableView(
  { top: 10, left: 10, right: 10, bottom: 10, width: Ti.UI.FILL, views: __alloyId622, height: 100, backgroundColor: "#f0f1f5", bubbleParent: false, id: "__alloyId621" });

  $.__views.scrollview.add($.__views.__alloyId621);
  $.__views.menu = Ti.UI.createView(
  { borderWidth: 0, layout: "horizontal", width: Ti.UI.FILL, height: Ti.UI.SIZE, id: "menu" });

  $.__views.scrollview.add($.__views.menu);
  exports.destroy = function () {};




  _.extend($, $.__views);


  var args = arguments[0] || {};
  var expandmode = false;
  var loading = Alloy.createController('loading');
  var new_menu = [{ mod: "conversation", is_asp: 1, title: "ASK ME", onClick: navWindow, subtitle: "24 hour helpdesk support", image_path: "/images/menu_image/female-call-center-service-operator-at-work-.jpg" }, { mod: "myClaim", is_asp: 1, title: "MY CLAIM RECORDS", onClick: navWindow, subtitle: "Entitlement balance and claim history", image_path: "/images/menu_image/claims-ring-binder-on-office-desktop-with-office-supplies-.jpg" }, { mod: "claimSubmission", is_asp: 1, title: "CLAIM SUBMISSION", onClick: navWindow, subtitle: "Submit your claim via APP", image_path: "/images/menu_image/summons-paper-on-the-table-in-doctor-s-office.jpg" }, { mod: "inpatient_record", is_asp: 1, title: "IN-PATIENT", onClick: navWindow, subtitle: "Admission records", image_path: "/images/menu_image/young-female-nurse-starting-iv-on-male-inpatient.jpg" }, { mod: "asp/requestOutpatientGL", is_asp: 1, title: "REQUEST GL", onClick: navWindow, subtitle: "Request outpatient GL", image_path: "/images/menu_image/requestOutpatientGL.jpg" }, { mod: "eCard_list", is_asp: 1, title: "E-CARD", onClick: navWindow, subtitle: "Principle and family electronic card", image_path: "/images/menu_image/happy-family-at-home.jpg" }, { mod: "askDoctor/find_doctor", is_asp: 1, title: "ASK DOCTOR", onClick: navWindow, subtitle: "online doctor consultation", image_path: "/images/menu_image/confident-female-doctor.jpg" }, { mod: "benefit", is_asp: 1, title: "FLEXI BENEFIT", onClick: navWindow, subtitle: "make your benefit more flexible", image_path: "/images/menu_image/woman-dentist-working-at-her-patients-teeth-.jpg" }, { mod: "myMedicalRecord", is_asp: 0, title: "MY MEDICAL RECORD", onClick: navWindow, subtitle: "To record all your blood test or medical report", image_path: "/images/menu_image/red-blood-in-test-tube-on-white-blank-with-results-in-colums-the-results-are-written-in-english-.jpg" }, { mod: "clinicLocator", is_asp: 0, title: "CLINIC LOCATOR", onClick: navWindow, subtitle: "clinic or hospital location", image_path: "/images/menu_image/modern-interior-design-lobby-at-dental-clinic-.jpg" }, { mod: "myHealth", is_asp: 0, title: "My HEALTH", onClick: navWindow, subtitle: "Personal health record", image_path: "/images/menu_image/man-running-in-a-gym-on-a-treadmill-concept-for-exercising-fitness-and-healthy-lifestyle.jpg" }];
  $.shadow_header.hide();

  function checkserviceByCorpcode() {
    var corpcode = Ti.App.Properties.getString('corpcode');

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
        console.log(new_menu.length + " new_menu after checkserviceByCorpcode");
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
    var pwidth = false ? Ti.Platform.displayCaps.platformWidth : parseInt(Ti.Platform.displayCaps.platformWidth / (Ti.Platform.displayCaps.logicalDensityFactor || 1), 10);
    for (var i = 0; i < new_menu.length; i++) {
      var cell_width = Math.floor(pwidth / 2);
      console.log(cell_width);
      console.log(Math.ceil(cell_width * 0.333));
      var view = $.UI.create("View", { width: cell_width, height: Math.ceil(cell_width * 0.666), records: new_menu[i] });
      var img = $.UI.create("ImageView", { classes: ['hsize', 'wfill'], touchEnabled: false, image: new_menu[i].image_path });
      var view_2 = $.UI.create("View", { zIndex: 10, touchEnabled: false, classes: ['wsize', 'hsize', 'vert'] });
      var label_title = $.UI.create("Label", { classes: ['wsize', 'hsize', 'h5', 'bold'], touchEnabled: false, color: "#fff", textAlign: "center", text: new_menu[i].title });
      var label2_subtitle = $.UI.create("Label", { classes: ['wsize', 'hsize', 'h7', 'bold'], touchEnabled: false, color: "#ffffff", textAlign: "center", text: new_menu[i].subtitle });
      view.add(img);
      view_2.add(label_title);
      view_2.add(label2_subtitle);
      view.add(view_2);
      var img_height = 0;
      img.addEventListener("postlayout", function (e) {
        img_height = e.source.parent.rect.height;
        console.log(img_height + " img_height");
        setTimeout(function (ex) {
          e.source.parent.add($.UI.create("View", { classes: ['wfill', 'hfill'], touchEnabled: false, height: img_height, zIndex: 10, zIndex: 9, backgroundColor: "#60000000" }));
        }, 200);
      });
      view.addEventListener("click", new_menu[i].onClick);
      $.menu.add(view);
    };
    loading.finish();
  }


  function init() {
    console.log("init start");
    $.win.add(loading.getView());
    loading.start();
    checkserviceByCorpcode();
    var AppVersionControl = require('AppVersionControl');
    AppVersionControl.checkAndUpdate();

    refreshHeaderInfo();

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



















  }

  function updateNotification(e) {
    console.log("updateNotification");
    console.log(e);
    var model = Alloy.createCollection(e.model);
    var unread_no = model.getCountUnread();
    if (e.target == "helpline") {
      label_helpline.text = unread_no;
    } else {
      $.label_notification.text = unread_no;
      if (false) {
        Ti.UI.setAppBadge(unread_no);
      }
    }
  }

  function refreshHeaderInfo() {
    var memno = Ti.App.Properties.getString('memno') || "";
    $.shadow_myInfo.removeAllChildren();
    $.myInfo.removeAllChildren();
    var u_id = Ti.App.Properties.getString('u_id');

    $.logo.image = memno == "" ? "/images/logo_plux.png" : "/images/asp_logo.png";
    $.shadow_logo.image = memno == "" ? "/images/logo_plux.png" : "/images/asp_logo.png";
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

    var moment = require('alloy/moment');
    $.day.text = moment(new Date()).format("DD");
    $.days.text = moment(new Date()).format("dddd");
    $.month_year.text = moment(new Date()).format("MMMM, YYYY");
    var hour_left = parseInt(moment().endOf('day').fromNow(true));
    var background_image = hour_left > 6 ? "/images/slideshow/morning_2.png" : "/images/slideshow/night_1.png";
    $.bg.image = background_image;
    if (hour_left > 6) {
      $.win.backgroundColor = "#ffffff";
    }

    var fullname = Ti.App.Properties.getString('fullname') || "";
    var welcomeText = "Welcome " + fullname || "";


    $.shadow_myInfo.add($.UI.create("Label", { text: welcomeText, classes: ['welcome_text'] }));
    $.myInfo.add($.UI.create("Label", { text: welcomeText, classes: ['welcome_text'] }));
  }

  function redirect(e) {
    console.log(e.target);
    nav.navigationWindow(e.target, "", "", e.app_param);
  }

  function navWindow(e) {
    var source = typeof e.source.records != "undefined" ? e.source.records : e.source;
    if (source.mod == "eCard" || source.mod == "benefit" || source.mod == "eCard_list" || source.mod == "myClaim" || source.mod == "claimSubmission" || source.mod == "notification") {
      if (source.mod == "notification") {
        nav.navigationWindow("asp/" + source.mod);
      } else {
        nav.navigationWindow("asp/" + source.mod, 1);
      }
    } else if (source.mod == "myHealth") {
      nav.navigationWindow(source.mod + "/index");
    } else if (source.mod == "clinicLocator") {
      var memno = Ti.App.Properties.getString('memno') || "";


      requestLocationPermissions(Ti.Geolocation.AUTHORIZATION_ALWAYS, function (e) {
        if (e.success) {
          contacts({ callback: function () {
              console.log('why not calling');
              if (memno == "") {
                nav.navigationWindow("clinic/index");
              } else {
                nav.navigationWindow("clinic/index", 1);
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
































    } else if (source.mod == "conversation") {
      nav.navigationWindow(source.mod, 1);
    } else if (source.mod == "profile") {
      var empno = Ti.App.Properties.getString('empno');
      if (typeof empno != "undefined" && empno != "") {
        nav.navigationWindow("asp/profile", 1);
      } else {
        nav.navigationWindow("plux_profile");
      }
    } else {
      console.log(source.target + " target");
      nav.navigationWindow(source.mod);
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
      Alloy.Globals.navMenu.close();
      Alloy.Globals.navMenu = null;
    } else {
      console.log("window sudah close");
      $.win.close();
    }
  }

  if ('android' == "android") {















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
  var header_height = 0;

  $.scrollview.addEventListener("scroll", function (e) {

    if (e.x > 0) {
      return;
    }
    var y = false ? e.y : Math.ceil(pixelToDp(e.y));
    if (y < $.header.rect.height - 80) {

      $.shadow_header.hide();
    } else {
      $.shadow_header.show();
    }
  });

  init();

  $.win.addEventListener("close", function () {
    Ti.App.removeEventListener('resumed', syncFromServer);
    Ti.App.removeEventListener('syncFromServer', syncFromServer);
    Ti.App.removeEventListener('updateNotification', updateNotification);

    Ti.App.removeEventListener('redirect', redirect);
    Ti.App.removeEventListener('updateHeader', refreshHeaderInfo);
    Ti.App.removeEventListener('updateMenu', checkserviceByCorpcode);
    $.destroy();
  });
  console.log("last");

  Ti.App.addEventListener("redirect", redirect);
  Ti.App.addEventListener('resumed', syncFromServer);
  Ti.App.addEventListener('syncFromServer', syncFromServer);
  Ti.App.addEventListener('updateNotification', updateNotification);
  Ti.App.addEventListener('updateMenu', checkserviceByCorpcode);
  Ti.App.addEventListener('updateHeader', refreshHeaderInfo);





  __defers['$.__views.logo!click!navWindow'] && $.addListener($.__views.logo, 'click', navWindow);__defers['$.__views.myInfo!click!logoutUser'] && $.addListener($.__views.myInfo, 'click', logoutUser);



  _.extend($, exports);
}

module.exports = Controller;