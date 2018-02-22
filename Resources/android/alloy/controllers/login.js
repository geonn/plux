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
  this.__controllerPath = 'login';
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
  { backgroundColor: "#ffffff", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, navTintColor: "#CE1D1C", title: "Login", id: "win" });

  $.__views.win && $.addTopLevelView($.__views.win);
  $.__views.__alloyId504 = Ti.UI.createView(
  { left: 0, id: "__alloyId504" });

  $.__views.win.leftNavButton = $.__views.__alloyId504;$.__views.forgetPasswordBox = Ti.UI.createView(
  { layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.SIZE, borderColor: "#dfe0e4", backgroundColor: "#FFFFFF", id: "forgetPasswordBox", zIndex: 10, left: 10, right: 10 });

  $.__views.win.add($.__views.forgetPasswordBox);
  $.__views.__alloyId505 = Ti.UI.createView(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, id: "__alloyId505" });

  $.__views.forgetPasswordBox.add($.__views.__alloyId505);
  $.__views.addbox_title = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#606060", top: 10, left: 10, right: 10, bottom: 10, text: 'Forgot Password', id: "addbox_title", verticalAlign: "center" });

  $.__views.__alloyId505.add($.__views.addbox_title);
  $.__views.__alloyId506 = Ti.UI.createImageView(
  { height: 40, image: "/images/cross.png", right: 0, id: "__alloyId506" });

  $.__views.__alloyId505.add($.__views.__alloyId506);
  closeBox ? $.addListener($.__views.__alloyId506, 'click', closeBox) : __defers['$.__views.__alloyId506!click!closeBox'] = true;$.__views.box_value = Ti.UI.createTextField(
  { verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER, height: "45dp", font: { fontSize: "14dp" }, color: "#222222", borderWidth: "1px", borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED, width: Ti.UI.FILL, backgroundColor: "#ffffff", top: 10, left: 10, right: 10, bottom: 10, id: "box_value", hintText: "Email" });

  $.__views.forgetPasswordBox.add($.__views.box_value);
  $.__views.__alloyId507 = Ti.UI.createButton(
  { height: 40, borderColor: "#C6C8CA", textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER, backgroundColor: "#ED1C24", borderRadius: 6, color: "#ffffff", width: Titanium.UI.FILL, left: 10, right: 10, top: 10, font: { fontFamily: "Lato-Regular" }, title: 'Send', bottom: 10, id: "__alloyId507" });

  $.__views.forgetPasswordBox.add($.__views.__alloyId507);
  doForgotPassword ? $.addListener($.__views.__alloyId507, 'click', doForgotPassword) : __defers['$.__views.__alloyId507!click!doForgotPassword'] = true;$.__views.__alloyId508 = Ti.UI.createView(
  { layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.FILL, id: "__alloyId508" });

  $.__views.win.add($.__views.__alloyId508);
  if (true) {
    $.__views.__alloyId509 = Ti.UI.createView(
    { layout: "horizontal", height: 50, width: Ti.UI.FILL, backgroundColor: "#DEDEDE", id: "__alloyId509" });

    $.__views.__alloyId508.add($.__views.__alloyId509);
    $.__views.pageTitle = Ti.UI.createView(
    { id: "pageTitle", width: "90%" });

    $.__views.__alloyId509.add($.__views.pageTitle);
    $.__views.__alloyId510 = Ti.UI.createLabel(
    { width: Titanium.UI.SIZE, height: Ti.UI.SIZE, color: "#606060", font: { fontSize: "16dp" }, text: 'Login', textAlign: "center", id: "__alloyId510" });

    $.__views.pageTitle.add($.__views.__alloyId510);
  }
  $.__views.main = Ti.UI.createScrollView(
  { id: "main", layout: "vertical", height: "100%", contentHeight: Ti.UI.SIZE });

  $.__views.__alloyId508.add($.__views.main);
  $.__views.__alloyId511 = Ti.UI.createImageView(
  { width: 120, borderRadius: 10, height: 120, backgroundColor: "#ff0000", bottom: "20dp", top: "20dp", image: "/images/logo_plux.png", id: "__alloyId511" });

  $.__views.main.add($.__views.__alloyId511);
  $.__views.email = Ti.UI.createTextField(
  { verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER, height: "50dp", font: { fontSize: "14dp" }, color: "#000000", borderWidth: "1px", borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED, width: "90%", backgroundColor: "#fff", borderColor: "#cccccc", paddingLeft: "20dp", paddingRight: "20dp", bottom: "5dp", keyboardType: Titanium.UI.KEYBOARD_DEFAULT, returnKeyType: Titanium.UI.RETURNKEY_NEXT, id: "email", hintText: "Enter Email", value: "" });

  $.__views.main.add($.__views.email);
  $.__views.password = Ti.UI.createTextField(
  { verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER, height: "50dp", font: { fontSize: "14dp" }, color: "#000000", borderWidth: "1px", borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED, width: "90%", backgroundColor: "#fff", passwordMask: true, borderColor: "#cccccc", paddingLeft: "20dp", paddingRight: "20dp", keyboardType: Titanium.UI.KEYBOARD_DEFAULT, returnKeyType: Titanium.UI.RETURNKEY_DONE, id: "password", hintText: "Enter Password", value: "" });

  $.__views.main.add($.__views.password);
  $.__views.loginAccountButton = Ti.UI.createButton(
  { id: "loginAccountButton", borderRadius: 5, backgroundColor: "#CC2228", title: "Login", width: "70%", top: 20, height: 40, color: "#ffffff" });

  $.__views.main.add($.__views.loginAccountButton);
  doLogin ? $.addListener($.__views.loginAccountButton, 'touchend', doLogin) : __defers['$.__views.loginAccountButton!touchend!doLogin'] = true;$.__views.registerAccountButton = Ti.UI.createButton(
  { id: "registerAccountButton", borderRadius: 5, backgroundColor: "#7B7B7B", title: "Register for PLUX", width: "70%", top: 5, height: 40, color: "#ffffff" });

  $.__views.main.add($.__views.registerAccountButton);
  doSignup ? $.addListener($.__views.registerAccountButton, 'touchend', doSignup) : __defers['$.__views.registerAccountButton!touchend!doSignup'] = true;$.__views.registerAccountButton = Ti.UI.createButton(
  { id: "registerAccountButton", borderRadius: 5, backgroundColor: "#7B7B7B", title: "Register for ASP", width: "70%", top: 5, height: 40, color: "#ffffff" });

  $.__views.main.add($.__views.registerAccountButton);
  doASPSignup ? $.addListener($.__views.registerAccountButton, 'touchend', doASPSignup) : __defers['$.__views.registerAccountButton!touchend!doASPSignup'] = true;$.__views.__alloyId512 = Ti.UI.createButton(
  { borderRadius: 5, backgroundColor: "#7B7B7B", title: "Forget Password", width: "70%", top: 5, height: 40, color: "#ffffff", id: "__alloyId512" });

  $.__views.main.add($.__views.__alloyId512);
  showForgetPassword ? $.addListener($.__views.__alloyId512, 'touchend', showForgetPassword) : __defers['$.__views.__alloyId512!touchend!showForgetPassword'] = true;exports.destroy = function () {};




  _.extend($, $.__views);


  var args = arguments[0] || {};
  var singleton = true;
  common.construct($);
  var preset_email = Ti.App.Properties.getString('plux_email') || "";
  var loading = Alloy.createController('loading');
  $.win.add(loading.getView());
  console.log("login open");
  closeBox();
  $.email.value = preset_email;


  var isKeyboardFocus = 0;

  function doLogin() {
    loading.start();
    var email = $.email.value;
    var password = $.password.value;

    if (email == "" || password == "") {
      common.createAlert('Authentication warning', 'Please fill in email and password');
      loading.finish();
      return;
    }
    if (singleton) {
      singleton = false;
      var params = {
        email: email,
        password: password };

      API.do_pluxLogin(params, function (success) {
        console.log(success + " success");
        if (success) {
          var win = Alloy.createController("home").getView();

          $.win.close();
        }
        singleton = true;
        loading.finish();
      });
    }
  }

  function doSignup() {
    var win = Alloy.createController("signup").getView();
    win.open();

  }

  function doASPSignup() {
    var win = Alloy.createController("asp/signup").getView();
    win.open();


  }

  function showForgetPassword() {
    $.forgetPasswordBox.show();
  }

  function doForgotPassword() {
    if ($.box_value.value == "") {
      closeBox();
      $.box_value.value = "";
      return;
    }
    loading.start();
    params = {
      email: $.box_value.value };

    API.callByPost({ url: "doforgotPassword", params: params }, function (responseText) {
      console.log(responseText);
      var res = JSON.parse(responseText);
      alert(res.data);
      closeBox();
      $.box_value.value = "";
      loading.finish();
    });
  }

  function closeBox() {
    $.forgetPasswordBox.hide();
  }

  function openBox() {
    $.forgetPasswordBox.show();
  }

  $.password.addEventListener("return", function () {
    doLogin();
  });

  var loginAfterRegister = function (e) {
    var email = e.params.email;
    var password = e.params.password;

    var params = {
      email: email,
      password: password };

    API.do_pluxLogin(params, function () {

      console.log("loginAfterRegister");
      common.createAlert("Success", "Plux account registration successful!");
      var win = Alloy.createController("home").getView();
      win.open();
      Ti.App.removeEventListener('loginAfterRegister', loginAfterRegister);
      $.win.close();
    });
  };
  Ti.App.addEventListener('loginAfterRegister', loginAfterRegister);

  if ('android' == "android") {
    $.win.addEventListener('android:back', function (e) {
      var dialog = Ti.UI.createAlertDialog({
        cancel: 1,
        buttonNames: ['Cancel', 'Confirm'],
        message: 'Would you like to exit Plux?',
        title: 'Exit app' });

      dialog.addEventListener('click', function (e) {

        if (e.index === e.source.cancel) {

        }
        if (e.index === 1) {
          var activity = Titanium.Android.currentActivity;
          activity.finish();
        }
      });
      dialog.show();
    });
  }

  $.win.addEventListener("close", function () {
    console.log("window login close");
    Ti.App.removeEventListener('loginAfterRegister', loginAfterRegister);
    $.destroy();
  });





  __defers['$.__views.__alloyId506!click!closeBox'] && $.addListener($.__views.__alloyId506, 'click', closeBox);__defers['$.__views.__alloyId507!click!doForgotPassword'] && $.addListener($.__views.__alloyId507, 'click', doForgotPassword);__defers['$.__views.loginAccountButton!touchend!doLogin'] && $.addListener($.__views.loginAccountButton, 'touchend', doLogin);__defers['$.__views.registerAccountButton!touchend!doSignup'] && $.addListener($.__views.registerAccountButton, 'touchend', doSignup);__defers['$.__views.registerAccountButton!touchend!doASPSignup'] && $.addListener($.__views.registerAccountButton, 'touchend', doASPSignup);__defers['$.__views.__alloyId512!touchend!showForgetPassword'] && $.addListener($.__views.__alloyId512, 'touchend', showForgetPassword);



  _.extend($, exports);
}

module.exports = Controller;