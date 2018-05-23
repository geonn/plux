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
  { backgroundColor: "#535a74", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, navTintColor: "#CE1D1C", title: "Login", id: "win" });

  $.__views.win && $.addTopLevelView($.__views.win);
  $.__views.__alloyId725 = Ti.UI.createView(
  { borderWidth: 0, left: 0, id: "__alloyId725" });

  $.__views.win.leftNavButton = $.__views.__alloyId725;$.__views.forgetPasswordBox = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.SIZE, borderColor: "#dfe0e4", backgroundColor: "#eee", id: "forgetPasswordBox", zIndex: 10, left: 10, right: 10 });

  $.__views.win.add($.__views.forgetPasswordBox);
  $.__views.__alloyId726 = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#111111", top: 10, left: 10, right: 10, bottom: 10, font: { fontSize: 14 }, text: 'Forgot Password', id: "__alloyId726" });

  $.__views.forgetPasswordBox.add($.__views.__alloyId726);
  $.__views.__alloyId727 = Ti.UI.createView(
  { borderWidth: 0, width: Titanium.UI.FILL, height: 1, backgroundColor: "#000", bottom: 10, left: 5, right: 5, id: "__alloyId727" });

  $.__views.forgetPasswordBox.add($.__views.__alloyId727);
  $.__views.box_value = Ti.UI.createView(
  { borderWidth: 0, top: 0, left: 10, right: 10, bottom: 10, width: Ti.UI.FILL, height: Ti.UI.SIZE, borderRadius: "5", backgroundColor: "#fba81c", id: "box_value", value: "" });

  $.__views.forgetPasswordBox.add($.__views.box_value);
  $.__views.__alloyId728 = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000000", backgroundColor: "#ffffff", hintText: "Email", required: 1, left: 5, value: "", id: "__alloyId728" });

  $.__views.box_value.add($.__views.__alloyId728);
  textFieldOnBlur ? $.addListener($.__views.__alloyId728, 'blur', textFieldOnBlur) : __defers['$.__views.__alloyId728!blur!textFieldOnBlur'] = true;$.__views.__alloyId729 = Ti.UI.createButton(
  { borderRadius: 5, backgroundColor: "#CC2228", height: 40, color: "#ffffff", width: Ti.UI.FILL, title: 'Send', left: 10, right: 10, bottom: 10, id: "__alloyId729" });

  $.__views.forgetPasswordBox.add($.__views.__alloyId729);
  doForgotPassword ? $.addListener($.__views.__alloyId729, 'click', doForgotPassword) : __defers['$.__views.__alloyId729!click!doForgotPassword'] = true;$.__views.mask = Ti.UI.createView(
  { borderWidth: 0, width: Ti.UI.FILL, height: Ti.UI.FILL, id: "mask", backgroundColor: "#90000000", zIndex: 2 });

  $.__views.win.add($.__views.mask);
  closeBox ? $.addListener($.__views.mask, 'click', closeBox) : __defers['$.__views.mask!click!closeBox'] = true;$.__views.signup_pop = Ti.UI.createView(
  { borderWidth: 0, width: Ti.UI.FILL, height: Ti.UI.SIZE, borderColor: "#dfe0e4", backgroundColor: "#fff", id: "signup_pop", left: 10, right: 10, zIndex: 50 });

  $.__views.win.add($.__views.signup_pop);
  $.__views.__alloyId730 = Ti.UI.createView(
  { borderWidth: 0, top: 10, left: 10, right: 10, bottom: 10, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.SIZE, id: "__alloyId730" });

  $.__views.signup_pop.add($.__views.__alloyId730);
  $.__views.__alloyId731 = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#111111", font: { fontSize: 14 }, text: 'Corporate User', id: "__alloyId731" });

  $.__views.__alloyId730.add($.__views.__alloyId731);
  $.__views.__alloyId732 = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#111111", font: { fontSize: 12 }, text: 'The user that under a corporate can check his own entitlement, submit claim and etc.', id: "__alloyId732" });

  $.__views.__alloyId730.add($.__views.__alloyId732);
  doASPSignup ? $.addListener($.__views.__alloyId732, 'click', doASPSignup) : __defers['$.__views.__alloyId732!click!doASPSignup'] = true;$.__views.__alloyId733 = Ti.UI.createView(
  { borderWidth: 0, width: Titanium.UI.FILL, height: 1, backgroundColor: "#ccc", top: 10, left: 5, right: 5, bottom: 10, id: "__alloyId733" });

  $.__views.__alloyId730.add($.__views.__alloyId733);
  $.__views.__alloyId734 = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#111111", font: { fontSize: 14 }, text: 'Public User', id: "__alloyId734" });

  $.__views.__alloyId730.add($.__views.__alloyId734);
  $.__views.__alloyId735 = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#111111", font: { fontSize: 12 }, text: 'Normal user for keep track their own medical records.', id: "__alloyId735" });

  $.__views.__alloyId730.add($.__views.__alloyId735);
  doSignup ? $.addListener($.__views.__alloyId735, 'click', doSignup) : __defers['$.__views.__alloyId735!click!doSignup'] = true;$.__views.__alloyId736 = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.FILL, id: "__alloyId736" });

  $.__views.win.add($.__views.__alloyId736);
  $.__views.main = Ti.UI.createScrollView(
  { id: "main", layout: "vertical", height: "100%", contentHeight: Ti.UI.SIZE });

  $.__views.__alloyId736.add($.__views.main);
  $.__views.__alloyId737 = Ti.UI.createImageView(
  { width: 120, borderRadius: 10, height: 120, backgroundColor: "#ff0000", bottom: "20dp", top: "20dp", image: "/images/asp_logo.png", id: "__alloyId737" });

  $.__views.main.add($.__views.__alloyId737);
  $.__views.forms = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.SIZE, id: "forms" });

  $.__views.main.add($.__views.forms);
  $.__views.email = Ti.UI.createView(
  { borderWidth: 0, top: 0, left: 10, right: 10, bottom: 10, width: Ti.UI.FILL, height: Ti.UI.SIZE, borderRadius: "5", backgroundColor: "#fba81c", id: "email", value: "" });

  $.__views.forms.add($.__views.email);
  $.__views.__alloyId738 = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000000", backgroundColor: "#ffffff", hintText: "Email", required: 1, left: 5, value: "", id: "__alloyId738" });

  $.__views.email.add($.__views.__alloyId738);
  textFieldOnBlur ? $.addListener($.__views.__alloyId738, 'blur', textFieldOnBlur) : __defers['$.__views.__alloyId738!blur!textFieldOnBlur'] = true;$.__views.password = Ti.UI.createView(
  { borderWidth: 0, top: 0, left: 10, right: 10, bottom: 10, width: Ti.UI.FILL, height: Ti.UI.SIZE, borderRadius: "5", backgroundColor: "#fba81c", id: "password", value: "" });

  $.__views.forms.add($.__views.password);
  $.__views.__alloyId739 = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000000", backgroundColor: "#ffffff", hintText: "Password", required: 1, passwordMask: true, left: 5, value: "", id: "__alloyId739" });

  $.__views.password.add($.__views.__alloyId739);
  textFieldOnBlur ? $.addListener($.__views.__alloyId739, 'blur', textFieldOnBlur) : __defers['$.__views.__alloyId739!blur!textFieldOnBlur'] = true;$.__views.loginAccountButton = Ti.UI.createButton(
  { borderRadius: 5, backgroundColor: "#CC2228", height: 40, color: "#ffffff", width: "70%", id: "loginAccountButton", title: "Login", top: 20 });

  $.__views.main.add($.__views.loginAccountButton);
  doLogin ? $.addListener($.__views.loginAccountButton, 'touchend', doLogin) : __defers['$.__views.loginAccountButton!touchend!doLogin'] = true;$.__views.registerAccountButton = Ti.UI.createButton(
  { borderRadius: 5, backgroundColor: "#7B7B7B", height: 40, color: "#ffffff", width: "70%", id: "registerAccountButton", title: "Register", top: 5 });

  $.__views.main.add($.__views.registerAccountButton);
  popSignUp ? $.addListener($.__views.registerAccountButton, 'touchend', popSignUp) : __defers['$.__views.registerAccountButton!touchend!popSignUp'] = true;$.__views.__alloyId740 = Ti.UI.createButton(
  { borderRadius: 5, backgroundColor: "#7B7B7B", height: 40, color: "#ffffff", width: "70%", title: "Forget Password", top: 5, id: "__alloyId740" });

  $.__views.main.add($.__views.__alloyId740);
  showForgetPassword ? $.addListener($.__views.__alloyId740, 'touchend', showForgetPassword) : __defers['$.__views.__alloyId740!touchend!showForgetPassword'] = true;exports.destroy = function () {};




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
  $.mask.hide();
  $.signup_pop.hide();


  var isKeyboardFocus = 0;

  function doLogin() {
    var forms_arr = $.forms.getChildren();
    var params = {};
    var error_message = "";
    for (var i = 0; i < forms_arr.length; i++) {
      console.log(forms_arr[i].id + " " + forms_arr[i].children[0].value);
      if (forms_arr[i].required && forms_arr[i].children[0].value == "") {
        console.log(_.isUndefined(forms_arr[i].children[0].value) + " _.isEmpty(forms_arr[i].value)");
        error_message += forms_arr[i].children[0].hintText + " cannot be empty\n";
      }
      params[forms_arr[i].id] = forms_arr[i].children[0].value;
    };
    if (error_message != "") {
      alert(error_message);
      return;
    }
    _.extend(params, {
      version: Ti.Platform.version,
      os: 'android',
      model: Ti.Platform.model,
      macaddress: Ti.Platform.macaddress });

    console.log(params);
    loading.start();
    api_login(params);
  }

  function openAndroidHome() {
    console.log('openAndroidHome');
    var win = Alloy.createController("home").getView();
    win.open();
    $.win.close();
  }

  function api_login(params) {
    API.callByPost({ url: "pluxLoginUrl", params: params }, function (responseText) {
      console.log(responseText);
      var result = JSON.parse(responseText);
      console.log(result);
      if (result.status == "success") {
        _.each(result.data, function (value, key) {
          Ti.App.Properties.setString(key, value);
        });
        if (typeof result.data.user_service != "undefined") {
          console.log('yes?');
          _.each(result.data.user_service[0], function (value, key) {
            Ti.App.Properties.setString(key, value);
          });
        }
        console.log(typeof result.dependent + ' typeof result.dependent');
        if (typeof result.dependent != "undefined") {
          Ti.App.Properties.setString("dependent", JSON.stringify(result.dependent[0]));
        }
        if (false) {
          var navMenu = Titanium.UI.iOS.createNavigationWindow();
          var win = Alloy.createController("home").getView();
          navMenu.window = win;
          Alloy.Globals.navMenu = navMenu;
          console.log(Alloy.Globals.navMenu);
          Alloy.Globals.navMenu.open();
        } else {
          openAndroidHome();
        }
        $.win.close();
      } else {
        alert(result.data);
      }
      loading.finish();
    });
  }

  function doLogin_old() {
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

  function popSignUp() {
    $.signup_pop.show();
    $.mask.show();
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
    $.mask.show();
    $.forgetPasswordBox.show();
  }

  function doForgotPassword() {
    if ($.box_value.children[0].value == "") {
      closeBox();
      return;
    }
    loading.start();
    params = {
      email: $.box_value.children[0].value };

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
    $.signup_pop.hide();
    $.mask.hide();
  }

  function openBox() {
    $.forgetPasswordBox.show();
  }

  $.password.addEventListener("return", function () {
    doLogin();
  });

  var loginAfterRegister = function (e) {
    Ti.App.removeEventListener('loginAfterRegister', loginAfterRegister);
    var email = e.params.email;
    var password = e.params.password;

    var params = {
      email: email,
      password: password };

    _.extend(params, {
      version: Ti.Platform.version,
      os: 'android',
      model: Ti.Platform.model,
      macaddress: Ti.Platform.macaddress });

    api_login(params);
  };









  function textFieldOnBlur(e) {
    console.log(e.source.value + " " + e.source.required);
    if (e.source.required && e.source.value == "") {

      e.source.parent.backgroundColor = "#e8534c";
    } else {
      e.source.parent.backgroundColor = "#55a939";
    }




  }

  Ti.App.addEventListener('loginAfterRegister', loginAfterRegister);

  if ('android' == "android") {
    $.win.addEventListener('android:back', function (e) {
      var dialog = Ti.UI.createAlertDialog({
        cancel: 1,
        buttonNames: ['Cancel', 'Confirm'],
        message: 'Would you like to exit APP?',
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





  __defers['$.__views.__alloyId728!blur!textFieldOnBlur'] && $.addListener($.__views.__alloyId728, 'blur', textFieldOnBlur);__defers['$.__views.__alloyId729!click!doForgotPassword'] && $.addListener($.__views.__alloyId729, 'click', doForgotPassword);__defers['$.__views.mask!click!closeBox'] && $.addListener($.__views.mask, 'click', closeBox);__defers['$.__views.__alloyId732!click!doASPSignup'] && $.addListener($.__views.__alloyId732, 'click', doASPSignup);__defers['$.__views.__alloyId735!click!doSignup'] && $.addListener($.__views.__alloyId735, 'click', doSignup);__defers['$.__views.__alloyId738!blur!textFieldOnBlur'] && $.addListener($.__views.__alloyId738, 'blur', textFieldOnBlur);__defers['$.__views.__alloyId739!blur!textFieldOnBlur'] && $.addListener($.__views.__alloyId739, 'blur', textFieldOnBlur);__defers['$.__views.loginAccountButton!touchend!doLogin'] && $.addListener($.__views.loginAccountButton, 'touchend', doLogin);__defers['$.__views.registerAccountButton!touchend!popSignUp'] && $.addListener($.__views.registerAccountButton, 'touchend', popSignUp);__defers['$.__views.__alloyId740!touchend!showForgetPassword'] && $.addListener($.__views.__alloyId740, 'touchend', showForgetPassword);



  _.extend($, exports);
}

module.exports = Controller;