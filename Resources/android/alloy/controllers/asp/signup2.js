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
  this.__controllerPath = 'asp/signup2';
  this.args = arguments[0] || {};

  if (arguments[0]) {
    var __parentSymbol = __processArg(arguments[0], '__parentSymbol');
    var $model = __processArg(arguments[0], '$model');
    var __itemTemplate = __processArg(arguments[0], '__itemTemplate');
  }
  var $ = this;
  var exports = {};
  var __defers = {};

  // Generated code that must be executed before all UI and/or
  // controller code. One example is all model and collection
  // declarations from markup.


  // Generated UI code
  $.__views["win"] = Ti.UI.createWindow(
  { backgroundColor: "#535a74", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, navTintColor: "#CE1D1C", title: "Profile Setup", id: "win" });

  $.__views["win"] && $.addTopLevelView($.__views["win"]);
  $.__views["__alloyId403"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.FILL, id: "__alloyId403" });

  $.__views["win"].add($.__views["__alloyId403"]);
  $.__views["__alloyId404"] = Ti.UI.createView(
  { borderWidth: 0, top: 0, height: 50, backgroundColor: "#DEDEDE", id: "__alloyId404" });

  $.__views["__alloyId403"].add($.__views["__alloyId404"]);
  $.__views["btnBack"] = Ti.UI.createView(
  { borderWidth: 0, left: 0, zIndex: 9, id: "btnBack", width: "20%" });

  $.__views["__alloyId404"].add($.__views["btnBack"]);
  $.__views["__alloyId405"] = Ti.UI.createImageView(
  { left: 10, width: 25, height: 25, image: "/images/btn-back.png", id: "__alloyId405" });

  $.__views["btnBack"].add($.__views["__alloyId405"]);
  $.__views["__alloyId406"] = Ti.UI.createView(
  { borderWidth: 0, id: "__alloyId406" });

  $.__views["__alloyId404"].add($.__views["__alloyId406"]);
  $.__views["titleLbl"] = Ti.UI.createLabel(
  { width: Titanium.UI.SIZE, height: Ti.UI.SIZE, color: "#A52430", font: { fontFamily: "Roboto-Regular, arial" }, text: 'Profile Setup', id: "titleLbl", textAlign: "center" });

  $.__views["__alloyId406"].add($.__views["titleLbl"]);
  $.__views["__alloyId407"] = Ti.UI.createImageView(
  { width: 120, borderRadius: 10, height: 120, backgroundColor: "#ff0000", bottom: "20dp", top: "20dp", image: "/images/asp_logo.png", id: "__alloyId407" });

  $.__views["__alloyId403"].add($.__views["__alloyId407"]);
  $.__views["forms"] = Ti.UI.createScrollView(
  { layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.FILL, contentHeight: Ti.UI.SIZE, contentWidth: Ti.UI.FILL, id: "forms" });

  $.__views["__alloyId403"].add($.__views["forms"]);
  $.__views["email"] = Ti.UI.createView(
  { borderWidth: 0, top: 0, left: 10, right: 10, bottom: 10, width: Ti.UI.FILL, height: Ti.UI.SIZE, borderRadius: "5", backgroundColor: "#fba81c", id: "email", value: "" });

  $.__views["forms"].add($.__views["email"]);
  $.__views["__alloyId408"] = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000000", backgroundColor: "#ffffff", maxLength: 80, hintText: "Email *", required: 1, left: 5, value: "", id: "__alloyId408" });

  $.__views["email"].add($.__views["__alloyId408"]);
  textFieldOnBlur ? $.addListener($.__views["__alloyId408"], 'change', textFieldOnBlur) : __defers['$.__views["__alloyId408"]!change!textFieldOnBlur'] = true;$.__views["mobileno"] = Ti.UI.createView(
  { borderWidth: 0, top: 0, left: 10, right: 10, bottom: 10, width: Ti.UI.FILL, height: Ti.UI.SIZE, borderRadius: "5", backgroundColor: "#fba81c", id: "mobileno", value: "" });

  $.__views["forms"].add($.__views["mobileno"]);
  $.__views["__alloyId409"] = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000000", backgroundColor: "#ffffff", maxLength: 30, hintText: "Mobile Number *", required: 1, left: 5, value: "", id: "__alloyId409" });

  $.__views["mobileno"].add($.__views["__alloyId409"]);
  textFieldOnBlur ? $.addListener($.__views["__alloyId409"], 'change', textFieldOnBlur) : __defers['$.__views["__alloyId409"]!change!textFieldOnBlur'] = true;$.__views["password"] = Ti.UI.createView(
  { borderWidth: 0, top: 0, left: 10, right: 10, bottom: 10, width: Ti.UI.FILL, height: Ti.UI.SIZE, borderRadius: "5", backgroundColor: "#fba81c", id: "password", value: "" });

  $.__views["forms"].add($.__views["password"]);
  $.__views["__alloyId410"] = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000000", backgroundColor: "#ffffff", maxLength: 30, passwordMask: true, hintText: "Password *", required: 1, left: 5, value: "", id: "__alloyId410" });

  $.__views["password"].add($.__views["__alloyId410"]);
  textFieldOnBlur ? $.addListener($.__views["__alloyId410"], 'change', textFieldOnBlur) : __defers['$.__views["__alloyId410"]!change!textFieldOnBlur'] = true;$.__views["password2"] = Ti.UI.createView(
  { borderWidth: 0, top: 0, left: 10, right: 10, bottom: 10, width: Ti.UI.FILL, height: Ti.UI.SIZE, borderRadius: "5", backgroundColor: "#fba81c", skip: 1, id: "password2", value: "" });

  $.__views["forms"].add($.__views["password2"]);
  $.__views["__alloyId411"] = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000000", backgroundColor: "#ffffff", maxLength: 30, passwordMask: true, hintText: "Confirm Password *", required: 1, left: 5, value: "", id: "__alloyId411" });

  $.__views["password2"].add($.__views["__alloyId411"]);
  textFieldOnBlur ? $.addListener($.__views["__alloyId411"], 'change', textFieldOnBlur) : __defers['$.__views["__alloyId411"]!change!textFieldOnBlur'] = true;$.__views["asp_sign_btn"] = Ti.UI.createButton(
  { borderRadius: 5, backgroundColor: "#CC2228", height: 40, color: "#ffffff", width: "70%", id: "asp_sign_btn", title: "Sign Up", top: 20, bottom: 20 });

  $.__views["forms"].add($.__views["asp_sign_btn"]);
  doSubmit ? $.addListener($.__views["asp_sign_btn"], 'click', doSubmit) : __defers['$.__views["asp_sign_btn"]!click!doSubmit'] = true;exports.destroy = function () {};

  // make all IDed elements in $.__views available right on the $ in a
  // controller's internal code. Externally the IDed elements will
  // be accessed with getView().
  _.extend($, $.__views);

  // Controller code directly from the developer's controller file
  var args = arguments[0] || {};
  var nav = Alloy.Globals.navMenu;
  var loading = Alloy.createController("loading");
  $.win.add(loading.getView());


  var error_message = "";
  //var view_sms_box = Alloy.Globals.common.CheckboxwithText("Agree to receive SMS Service", {name: "smsme"});
  //var view_agreement_box = Alloy.Globals.common.CheckboxwithText("I have read and agree to the ","Privacy Policy", {name: "agreets"},"privacy");

  var memno = Ti.App.Properties.getString('memno');
  var empno = Ti.App.Properties.getString('empno');
  var name = Ti.App.Properties.getString('name');

  //$.view_agreement.add(view_sms_box);
  //$.view_agreement.add(view_agreement_box);
  /** To check if keyboard onfocus or onblur**/
  var isKeyboardFocus = 0;

  function doAspSignup() {
    loading.start();
    var email = $.email.value;
    var password = $.password.value;
    var repassword = $.repassword.value;
    var name = $.email.value;
    var memno = $.memno.value;
    var empno = $.empno.value;
    var mobileno = $.mobileno.value;
    var valid_email = ValidateEmail(email);
    if (!valid_email) {
      loading.finish();
      return false;
    }
    if (password != repassword) {
      Alloy.Globals.common.createAlert("Error", "Password does not match the confirm password.");
      loading.finish();
      return false;
    }

    //var view_sms = view_sms_box.children[0].children[0].checked;
    /*var view_agreement = view_agreement_box.children[0].children[0].checked;
    if(view_agreement != "1"){
    	Alloy.Globals.common.createAlert("Error", "You must agree to the Privacy Policy to register as ASP member.");
    	loading.finish();
    	return false;
    }*/
    var params = {
      email: email,
      password: password,
      name: name,
      memno: memno,
      empno: empno,
      mobileno: mobileno,
      //smsme: view_sms,
      agreets: "1" };



    Alloy.Globals.API.do_asp_signup(params, {
      onload: function () {
        Alloy.Globals.nav.navigationWindow("home");
        Alloy.Globals.nav.closeWindow(mainView.aspSignUpWin);
        Ti.App.fireEvent('updateHeader');
      },
      finish: function () {
        loading.finish();
      } });

  }

  function ValidateEmail(mail)
  {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (mail.match(mailformat))
    {
      return true;
    } else {
      alert("You have entered an invalid email address!");
      return false;
    }
  }

  function textFieldOnBlur(e) {
    checkRequired(e.source);
  }

  function checkRequired(obj) {
    if (obj.required && obj.value == "") {
      error_message += obj.hintText + " cannot be empty\n";
      obj.parent.backgroundColor = "#e8534c";
    } else {
      obj.parent.backgroundColor = "#55a939";
    }
  }

  function openAndroidHome() {
    var win = Alloy.createController("home").getView();
    win.open();
    $.win.close();
  }

  function doSubmit() {
    var forms_arr = $.forms.getChildren();
    var params = {};
    var error_message = "";
    for (var i = 0; i < forms_arr.length - 1; i++) {

      if (forms_arr[i].format == "photo" && forms_arr[i].children[2].attached) {
        Alloy.Globals._.extend(params, { Filedata: forms_arr[i].children[2].filedata });
      } else if (forms_arr[i].format == "photo" && !forms_arr[i].children[2].attached) {
        error_message += "Please upload your referral letter\n";
      } else if (forms_arr[i].skip != "1") {
        if (forms_arr[i].children[0].required && forms_arr[i].children[0].value == "") {
          error_message += forms_arr[i].children[0].hintText + " cannot be empty\n";
        } else {
          params[forms_arr[i].id] = forms_arr[i].children[0].value.trim();
        }
      }
      if (forms_arr[i].id == "password2") {
        if (forms_arr[i].children[0].value != forms_arr[i - 1].children[0].value) {
          error_message += "Your password are not match\n";
        }
      }
    };
    if (error_message != "") {
      alert(error_message);
      return;
    }
    /*
        var view_agreement = view_agreement_box.children[0].children[0].checked;
        if(view_agreement != "1"){
            Alloy.Globals.common.createAlert("Error", "You must agree to the Privacy Policy to register as ASP member.");
            loading.finish();
            return false;
        }*/
    params['agreets'] = "1";
    params['name'] = name;
    params['memno'] = memno;
    params['empno'] = empno;

    loading.start();

    Alloy.Globals.API.do_asp_signup(params, {
      onload: function () {
        if (false) {
          var navMenu = Titanium.UI.iOS.createNavigationWindow();
          var win = Alloy.createController("home").getView();
          navMenu.window = win;
          Alloy.Globals.navMenu = navMenu;
          Alloy.Globals.navMenu.open();
          $.win.close();
        } else {
          openAndroidHome();
        }

      },
      finish: function () {
        loading.finish();
      } });


    return;
    Alloy.Globals.API.callByPost({ url: "pluxSignUp", new: true, domain: "FREEJINI_DOMAIN", params: params }, function (responseText) {
      var result = JSON.parse(responseText);
      if (result.status == "error") {
        Alloy.Globals.common.createAlert("Error", result.data);
      } else {
        $.win.close();
        Ti.App.fireEvent('loginAfterRegister', { params: params });
        loading.finish();
      }
    });
  }

  $.btnBack.addEventListener('click', function () {
    $.win.close();
  });

  // Generated code that must be executed after all UI and
  // controller code. One example deferred event handlers whose
  // functions are not defined until after the controller code
  // is executed.
  __defers['$.__views["__alloyId408"]!change!textFieldOnBlur'] && $.addListener($.__views["__alloyId408"], 'change', textFieldOnBlur);__defers['$.__views["__alloyId409"]!change!textFieldOnBlur'] && $.addListener($.__views["__alloyId409"], 'change', textFieldOnBlur);__defers['$.__views["__alloyId410"]!change!textFieldOnBlur'] && $.addListener($.__views["__alloyId410"], 'change', textFieldOnBlur);__defers['$.__views["__alloyId411"]!change!textFieldOnBlur'] && $.addListener($.__views["__alloyId411"], 'change', textFieldOnBlur);__defers['$.__views["asp_sign_btn"]!click!doSubmit'] && $.addListener($.__views["asp_sign_btn"], 'click', doSubmit);

  // Extend the $ instance with all functions and properties
  // defined on the exports object.
  _.extend($, exports);
}

module.exports = Controller;
//# sourceMappingURL=file:///Users/yikonnlau/Documents/Appcelerator_Studio_Workspace/plux/build/map/Resources/android/alloy/controllers/asp/signup2.js.map