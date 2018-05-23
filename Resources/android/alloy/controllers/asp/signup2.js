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







  $.__views.win = Ti.UI.createWindow(
  { backgroundColor: "#535a74", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, navTintColor: "#CE1D1C", title: "Profile Setup", id: "win" });

  $.__views.win && $.addTopLevelView($.__views.win);
  $.__views.__alloyId476 = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.FILL, id: "__alloyId476" });

  $.__views.win.add($.__views.__alloyId476);
  $.__views.__alloyId477 = Ti.UI.createView(
  { borderWidth: 0, top: 0, height: 50, backgroundColor: "#DEDEDE", id: "__alloyId477" });

  $.__views.__alloyId476.add($.__views.__alloyId477);
  $.__views.btnBack = Ti.UI.createView(
  { borderWidth: 0, left: 0, zIndex: 9, id: "btnBack", width: "20%" });

  $.__views.__alloyId477.add($.__views.btnBack);
  $.__views.__alloyId478 = Ti.UI.createImageView(
  { left: 10, width: 25, height: 25, image: "/images/btn-back.png", id: "__alloyId478" });

  $.__views.btnBack.add($.__views.__alloyId478);
  $.__views.__alloyId479 = Ti.UI.createView(
  { borderWidth: 0, id: "__alloyId479" });

  $.__views.__alloyId477.add($.__views.__alloyId479);
  $.__views.titleLbl = Ti.UI.createLabel(
  { width: Titanium.UI.SIZE, height: Ti.UI.SIZE, color: "#A52430", text: 'Profile Setup', id: "titleLbl", textAlign: "center" });

  $.__views.__alloyId479.add($.__views.titleLbl);
  $.__views.__alloyId480 = Ti.UI.createImageView(
  { width: 120, borderRadius: 10, height: 120, backgroundColor: "#ff0000", bottom: "20dp", top: "20dp", image: "/images/asp_logo.png", id: "__alloyId480" });

  $.__views.__alloyId476.add($.__views.__alloyId480);
  $.__views.forms = Ti.UI.createScrollView(
  { layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.FILL, contentHeight: Ti.UI.SIZE, contentWidth: Ti.UI.FILL, id: "forms" });

  $.__views.__alloyId476.add($.__views.forms);
  $.__views.email = Ti.UI.createView(
  { borderWidth: 0, top: 0, left: 10, right: 10, bottom: 10, width: Ti.UI.FILL, height: Ti.UI.SIZE, borderRadius: "5", backgroundColor: "#fba81c", id: "email", value: "" });

  $.__views.forms.add($.__views.email);
  $.__views.__alloyId481 = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000000", backgroundColor: "#ffffff", maxLength: 30, hintText: "Email *", required: 1, left: 5, value: "", id: "__alloyId481" });

  $.__views.email.add($.__views.__alloyId481);
  textFieldOnBlur ? $.addListener($.__views.__alloyId481, 'change', textFieldOnBlur) : __defers['$.__views.__alloyId481!change!textFieldOnBlur'] = true;$.__views.mobileno = Ti.UI.createView(
  { borderWidth: 0, top: 0, left: 10, right: 10, bottom: 10, width: Ti.UI.FILL, height: Ti.UI.SIZE, borderRadius: "5", backgroundColor: "#fba81c", id: "mobileno", value: "" });

  $.__views.forms.add($.__views.mobileno);
  $.__views.__alloyId482 = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000000", backgroundColor: "#ffffff", maxLength: 30, hintText: "Mobile Number *", required: 1, left: 5, value: "", id: "__alloyId482" });

  $.__views.mobileno.add($.__views.__alloyId482);
  textFieldOnBlur ? $.addListener($.__views.__alloyId482, 'change', textFieldOnBlur) : __defers['$.__views.__alloyId482!change!textFieldOnBlur'] = true;$.__views.password = Ti.UI.createView(
  { borderWidth: 0, top: 0, left: 10, right: 10, bottom: 10, width: Ti.UI.FILL, height: Ti.UI.SIZE, borderRadius: "5", backgroundColor: "#fba81c", id: "password", value: "" });

  $.__views.forms.add($.__views.password);
  $.__views.__alloyId483 = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000000", backgroundColor: "#ffffff", maxLength: 30, passwordMask: true, hintText: "Password *", required: 1, left: 5, value: "", id: "__alloyId483" });

  $.__views.password.add($.__views.__alloyId483);
  textFieldOnBlur ? $.addListener($.__views.__alloyId483, 'change', textFieldOnBlur) : __defers['$.__views.__alloyId483!change!textFieldOnBlur'] = true;$.__views.password2 = Ti.UI.createView(
  { borderWidth: 0, top: 0, left: 10, right: 10, bottom: 10, width: Ti.UI.FILL, height: Ti.UI.SIZE, borderRadius: "5", backgroundColor: "#fba81c", skip: 1, id: "password2", value: "" });

  $.__views.forms.add($.__views.password2);
  $.__views.__alloyId484 = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000000", backgroundColor: "#ffffff", maxLength: 30, passwordMask: true, hintText: "Confirm Password *", required: 1, left: 5, value: "", id: "__alloyId484" });

  $.__views.password2.add($.__views.__alloyId484);
  textFieldOnBlur ? $.addListener($.__views.__alloyId484, 'change', textFieldOnBlur) : __defers['$.__views.__alloyId484!change!textFieldOnBlur'] = true;$.__views.view_agreement = Ti.UI.createView(
  { borderWidth: 0, width: Ti.UI.FILL, height: Ti.UI.SIZE, id: "view_agreement", skip: 1, value: 0 });

  $.__views.forms.add($.__views.view_agreement);
  $.__views.asp_sign_btn = Ti.UI.createButton(
  { borderRadius: 5, backgroundColor: "#CC2228", height: 40, color: "#ffffff", width: "70%", id: "asp_sign_btn", title: "Sign Up", top: 20, bottom: 20 });

  $.__views.forms.add($.__views.asp_sign_btn);
  doSubmit ? $.addListener($.__views.asp_sign_btn, 'click', doSubmit) : __defers['$.__views.asp_sign_btn!click!doSubmit'] = true;exports.destroy = function () {};




  _.extend($, $.__views);


  var args = arguments[0] || {};
  var nav = Alloy.Globals.navMenu;
  var loading = Alloy.createController("loading");
  $.win.add(loading.getView());

  var error_message = "";

  var view_agreement_box = common.CheckboxwithText("I have read and agree to the ", "Privacy Policy", { name: "agreets" }, "privacy");

  var memno = Ti.App.Properties.getString('memno');
  var empno = Ti.App.Properties.getString('empno');
  var name = Ti.App.Properties.getString('name');


  $.view_agreement.add(view_agreement_box);

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
      common.createAlert("Error", "Password does not match the confirm password.");
      loading.finish();
      return false;
    }


    var view_agreement = view_agreement_box.children[0].children[0].checked;
    if (view_agreement != "1") {
      common.createAlert("Error", "You must agree to the Privacy Policy to register as ASP member.");
      loading.finish();
      return false;
    }
    var params = {
      email: email,
      password: password,
      name: name,
      memno: memno,
      empno: empno,
      mobileno: mobileno,

      agreets: view_agreement };


    API.do_asp_signup(params, {
      onload: function () {
        nav.navigationWindow("home");
        nav.closeWindow(mainView.aspSignUpWin);
        Ti.App.fireEvent('updateHeader');
      },
      finish: function () {
        loading.finish();
      } });

  }

  function ValidateEmail(mail) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (mail.match(mailformat)) {
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
    console.log(obj.value + " check value" + obj.required);
    if (obj.required && obj.value == "") {
      error_message += obj.hintText + " cannot be empty\n";
      obj.parent.backgroundColor = "#e8534c";
    } else {
      obj.parent.backgroundColor = "#55a939";
    }
  }

  function openAndroidHome() {
    console.log('openAndroidHome');
    var win = Alloy.createController("home").getView();
    win.open();
    $.win.close();
  }

  function doSubmit() {
    var forms_arr = $.forms.getChildren();
    var params = {};
    var error_message = "";
    for (var i = 0; i < forms_arr.length - 1; i++) {

      console.log(forms_arr[i].id + " " + forms_arr[i].children[0].value);
      if (forms_arr[i].format == "photo" && forms_arr[i].children[2].attached) {
        _.extend(params, { Filedata: forms_arr[i].children[2].filedata });
      } else if (forms_arr[i].format == "photo" && !forms_arr[i].children[2].attached) {
        error_message += "Please upload your referral letter\n";
      } else if (forms_arr[i].skip != "1") {
        console.log(forms_arr[i].skip + " check skip");
        console.log(forms_arr[i].children[0].value + " " + forms_arr[i].children[0].required);
        if (forms_arr[i].children[0].required && forms_arr[i].children[0].value == "") {
          console.log(_.isUndefined(forms_arr[i].children[0].value) + " _.isEmpty(forms_arr[i].children[0].value)");
          error_message += forms_arr[i].children[0].hintText + " cannot be empty\n";
        } else {
          console.log(forms_arr[i].children[0].value);
          console.log(forms_arr[i].children[0].id);
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
    var view_agreement = view_agreement_box.children[0].children[0].checked;
    if (view_agreement != "1") {
      common.createAlert("Error", "You must agree to the Privacy Policy to register as ASP member.");
      loading.finish();
      return false;
    }
    params['agreets'] = view_agreement;
    params['name'] = name;
    params['memno'] = memno;
    params['empno'] = empno;

    console.log(params);
    loading.start();

    API.do_asp_signup(params, {
      onload: function () {
        if (false) {
          var navMenu = Titanium.UI.iOS.createNavigationWindow();
          var win = Alloy.createController("home").getView();
          navMenu.window = win;
          Alloy.Globals.navMenu = navMenu;
          console.log(Alloy.Globals.navMenu);
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
    API.callByPost({ url: "pluxSignUp", new: true, domain: "FREEJINI_DOMAIN", params: params }, function (responseText) {
      console.log(responseText);
      var result = JSON.parse(responseText);
      if (result.status == "error") {
        common.createAlert("Error", result.data);
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





  __defers['$.__views.__alloyId481!change!textFieldOnBlur'] && $.addListener($.__views.__alloyId481, 'change', textFieldOnBlur);__defers['$.__views.__alloyId482!change!textFieldOnBlur'] && $.addListener($.__views.__alloyId482, 'change', textFieldOnBlur);__defers['$.__views.__alloyId483!change!textFieldOnBlur'] && $.addListener($.__views.__alloyId483, 'change', textFieldOnBlur);__defers['$.__views.__alloyId484!change!textFieldOnBlur'] && $.addListener($.__views.__alloyId484, 'change', textFieldOnBlur);__defers['$.__views.asp_sign_btn!click!doSubmit'] && $.addListener($.__views.asp_sign_btn, 'click', doSubmit);



  _.extend($, exports);
}

module.exports = Controller;