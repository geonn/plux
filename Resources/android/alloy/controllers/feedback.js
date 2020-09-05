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
  this.__controllerPath = 'feedback';
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
  { barColor: "transparent", backgroundColor: "#535a74", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, title: "Feedback", id: "win", backButtonTitle: "", navTintColor: "#CE1D1C" });

  $.__views["win"] && $.addTopLevelView($.__views["win"]);
  $.__views["loadingBar"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", id: "loadingBar", height: 120, width: 120, borderRadius: 15, backgroundColor: "#2E2E2E" });

  $.__views["win"].add($.__views["loadingBar"]);
  $.__views["activityIndicator"] = Ti.UI.createActivityIndicator(
  { top: 10, left: 30, width: 60, id: "activityIndicator" });

  $.__views["loadingBar"].add($.__views["activityIndicator"]);
  $.__views["loading"] = Ti.UI.createLabel(
  { width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#ffffff", font: { fontFamily: "Roboto-Regular, arial" }, id: "loading", top: 5, bottom: 10, text: "Loading" });

  $.__views["loadingBar"].add($.__views["loading"]);
  $.__views["main"] = Ti.UI.createView(
  { borderWidth: 0, id: "main", layout: "vertical" });

  $.__views["win"].add($.__views["main"]);
  if (true) {
    $.__views["__alloyId548"] = Ti.UI.createView(
    { borderWidth: 0, layout: "horizontal", height: 50, width: Ti.UI.FILL, backgroundColor: "#DEDEDE", id: "__alloyId548" });

    $.__views["main"].add($.__views["__alloyId548"]);
    $.__views["__alloyId549"] = Ti.UI.createView(
    { borderWidth: 0, left: 0, width: "10%", id: "__alloyId549" });

    $.__views["__alloyId548"].add($.__views["__alloyId549"]);
    $.__views["btnBack"] = Ti.UI.createImageView(
    { left: 10, id: "btnBack", width: 25, height: 25, image: "/images/btn-back.png" });

    $.__views["__alloyId549"].add($.__views["btnBack"]);
    $.__views["__alloyId550"] = Ti.UI.createView(
    { borderWidth: 0, width: "90%", id: "__alloyId550" });

    $.__views["__alloyId548"].add($.__views["__alloyId550"]);
    $.__views["pageTitle"] = Ti.UI.createLabel(
    { width: Titanium.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial", fontSize: "16dp" }, text: 'Feedback', id: "pageTitle", textAlign: "center" });

    $.__views["__alloyId550"].add($.__views["pageTitle"]);
  }
  $.__views["__alloyId551"] = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Titanium.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial", fontSize: 16 }, top: 10, left: 10, right: 10, bottom: 10, text: "Please complete this form and submit to us.", id: "__alloyId551" });

  $.__views["main"].add($.__views["__alloyId551"]);
  $.__views["table"] = Ti.UI.createScrollView(
  { layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.FILL, id: "table", top: 10, bottom: 10, contentWidth: Ti.UI.FILL, contentHeight: Ti.UI.SIZE, backgroundColor: "#ffffff" });

  $.__views["main"].add($.__views["table"]);
  $.__views["tvrName"] = Ti.UI.createView(
  { borderWidth: 0, id: "tvrName", height: Ti.UI.SIZE, layout: "vertical", selectedBackgroundColor: "#ffffff" });

  $.__views["table"].add($.__views["tvrName"]);
  $.__views["__alloyId552"] = Ti.UI.createView(
  { borderWidth: 0, layout: "horizontal", width: Ti.UI.FILL, height: 45, textAlign: "right", id: "__alloyId552" });

  $.__views["tvrName"].add($.__views["__alloyId552"]);
  $.__views["__alloyId553"] = Ti.UI.createLabel(
  { width: "35%", height: Titanium.UI.SIZE, color: "#A52430", font: { fontFamily: "Roboto-Regular, arial", fontSize: 16 }, left: 10, text: "Name", top: 12, id: "__alloyId553" });

  $.__views["__alloyId552"].add($.__views["__alloyId553"]);
  $.__views["name"] = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 12 }, color: "#000000", hintTextColor: "#000000", backgroundColor: "#ffffff", borderColor: "#ffffff", id: "name", bottom: 5, right: 5, textAlign: "right", hintText: "Your name" });

  $.__views["__alloyId552"].add($.__views["name"]);
  $.__views["__alloyId554"] = Ti.UI.createView(
  { borderWidth: 0, backgroundColor: "#ececec", width: Ti.UI.FILL, height: 1, id: "__alloyId554" });

  $.__views["table"].add($.__views["__alloyId554"]);
  $.__views["tvrEmail"] = Ti.UI.createView(
  { borderWidth: 0, id: "tvrEmail", height: Ti.UI.SIZE, layout: "vertical", selectedBackgroundColor: "#ffffff" });

  $.__views["table"].add($.__views["tvrEmail"]);
  $.__views["__alloyId555"] = Ti.UI.createView(
  { borderWidth: 0, layout: "horizontal", width: Ti.UI.FILL, height: 45, textAlign: "right", id: "__alloyId555" });

  $.__views["tvrEmail"].add($.__views["__alloyId555"]);
  $.__views["__alloyId556"] = Ti.UI.createLabel(
  { width: "35%", height: Titanium.UI.SIZE, color: "#A52430", font: { fontFamily: "Roboto-Regular, arial", fontSize: 16 }, left: 10, text: "Email", top: 12, id: "__alloyId556" });

  $.__views["__alloyId555"].add($.__views["__alloyId556"]);
  $.__views["email"] = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 12 }, color: "#000000", hintTextColor: "#000000", backgroundColor: "#ffffff", borderColor: "#ffffff", id: "email", bottom: 5, right: 5, textAlign: "right", hintText: "Your email" });

  $.__views["__alloyId555"].add($.__views["email"]);
  $.__views["__alloyId557"] = Ti.UI.createView(
  { borderWidth: 0, backgroundColor: "#ececec", width: Ti.UI.FILL, height: 1, id: "__alloyId557" });

  $.__views["table"].add($.__views["__alloyId557"]);
  $.__views["tvrMobile"] = Ti.UI.createView(
  { borderWidth: 0, id: "tvrMobile", height: Ti.UI.SIZE, layout: "vertical", selectedBackgroundColor: "#ffffff" });

  $.__views["table"].add($.__views["tvrMobile"]);
  $.__views["__alloyId558"] = Ti.UI.createView(
  { borderWidth: 0, layout: "horizontal", width: Ti.UI.FILL, height: 45, textAlign: "right", id: "__alloyId558" });

  $.__views["tvrMobile"].add($.__views["__alloyId558"]);
  $.__views["__alloyId559"] = Ti.UI.createLabel(
  { width: "35%", height: Titanium.UI.SIZE, color: "#A52430", font: { fontFamily: "Roboto-Regular, arial", fontSize: 16 }, left: 10, text: "Mobile No.", top: 12, id: "__alloyId559" });

  $.__views["__alloyId558"].add($.__views["__alloyId559"]);
  $.__views["mobile"] = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 12 }, color: "#000000", hintTextColor: "#000000", backgroundColor: "#ffffff", borderColor: "#ffffff", id: "mobile", bottom: 5, right: 5, textAlign: "right", hintText: "Your mobile number" });

  $.__views["__alloyId558"].add($.__views["mobile"]);
  $.__views["__alloyId560"] = Ti.UI.createView(
  { borderWidth: 0, backgroundColor: "#ececec", width: Ti.UI.FILL, height: 1, id: "__alloyId560" });

  $.__views["table"].add($.__views["__alloyId560"]);
  $.__views["tvrComment"] = Ti.UI.createView(
  { borderWidth: 0, id: "tvrComment", height: Ti.UI.SIZE, layout: "vertical", selectedBackgroundColor: "#ffffff" });

  $.__views["table"].add($.__views["tvrComment"]);
  $.__views["__alloyId561"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: Ti.UI.FILL, height: 250, textAlign: "right", id: "__alloyId561" });

  $.__views["tvrComment"].add($.__views["__alloyId561"]);
  $.__views["__alloyId562"] = Ti.UI.createLabel(
  { width: "100%", height: Titanium.UI.SIZE, color: "#A52430", font: { fontFamily: "Roboto-Regular, arial", fontSize: 16 }, left: 10, text: "Comment", top: 12, id: "__alloyId562" });

  $.__views["__alloyId561"].add($.__views["__alloyId562"]);
  $.__views["comment"] = Ti.UI.createTextArea(
  { color: "#888", font: { fontSize: 14 }, id: "comment", backgroundColor: "#F2F2F2", textAlign: "left", hintText: "Feedback", value: "", width: Ti.UI.FILL, left: 10, right: 10, height: 800, suppressReturn: false });

  $.__views["__alloyId561"].add($.__views["comment"]);
  $.__views["__alloyId563"] = Ti.UI.createView(
  { borderWidth: 0, width: Ti.UI.FILL, height: Ti.UI.SIZE, top: 10, id: "__alloyId563" });

  $.__views["table"].add($.__views["__alloyId563"]);
  $.__views["saveBtn"] = Ti.UI.createButton(
  { borderRadius: 5, backgroundColor: "#7B7B7B", height: 40, color: "#ffffff", width: "70%", id: "saveBtn", title: "Submit Feedback" });

  $.__views["__alloyId563"].add($.__views["saveBtn"]);
  submitFeedback ? $.addListener($.__views["saveBtn"], 'click', submitFeedback) : __defers['$.__views["saveBtn"]!click!submitFeedback'] = true;exports.destroy = function () {};

  // make all IDed elements in $.__views available right on the $ in a
  // controller's internal code. Externally the IDed elements will
  // be accessed with getView().
  _.extend($, $.__views);

  // Controller code directly from the developer's controller file
  // Arguments passed into this controller can be accessed off of the `$.args` object directly or:
  var args = $.args;
  var u_id;
  Alloy.Globals.common.construct($);

  init();

  function init() {
    u_id = Ti.App.Properties.getString('u_id') || "";
    $.email.value = Ti.App.Properties.getString('plux_email') || "";

    if (u_id != "") {
      $.name.value = Ti.App.Properties.getString('fullname') || "";
    }
  }

  function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
  }

  function IsNumeric(input) {
    return input - 0 == input && ('' + input).trim().length > 0;
  }

  function hideKeyboard() {
    $.mobile.blur();
    $.name.blur();
    $.email.blur();
    $.comment.blur();
  }


  function submitFeedback() {

    var name = $.name.value;
    var email = $.email.value;
    var mobile = $.mobile.value;
    var comment = $.comment.value;

    if (name == "") {
      Alloy.Globals.common.createAlert("Error", "Please fill in your name");
      return false;
    }

    if (email == "") {
      Alloy.Globals.common.createAlert("Error", "Please fill in your email");
      return false;
    } else if (validateEmail(email) != "1") {
      Alloy.Globals.common.createAlert("Error", "Please fill in an valid email");
      return false;
    }

    if (mobile == "") {
      Alloy.Globals.common.createAlert("Error", "Please fill in your mobile number");
      return false;
    } else if (IsNumeric(mobile) == 0) {
      Alloy.Globals.common.createAlert("Error", "Please fill in valid mobile number");
      return false;
    }

    if (comment == "") {
      Alloy.Globals.common.createAlert("Error", "Please fill in your feedback/comment");
      return false;
    }


    var params = "name=" + name + "&email=" + email + "&mobile=" + mobile + "&comment=" + comment + "&u_id=" + u_id;

    Alloy.Globals.common.showLoading();
    Alloy.Globals.API.callByPost({ url: "addFeedbackUrl", params: params }, function (responseText) {
      var res = JSON.parse(responseText);
      if (res.status == "success") {
        Alloy.Globals.common.hideLoading();
        Alloy.Globals.common.createAlert("Success", "Thanks for your feedback! ");
        $.win.close();
      } else {
        Alloy.Globals.common.hideLoading();
      }
    });

  }

  if ("android" == "android") {
    $.btnBack.addEventListener('click', function () {
      Alloy.Globals.nav.closeWindow($.win);
    });
  }

  // Generated code that must be executed after all UI and
  // controller code. One example deferred event handlers whose
  // functions are not defined until after the controller code
  // is executed.
  __defers['$.__views["saveBtn"]!click!submitFeedback'] && $.addListener($.__views["saveBtn"], 'click', submitFeedback);

  // Extend the $ instance with all functions and properties
  // defined on the exports object.
  _.extend($, exports);
}

module.exports = Controller;
//# sourceMappingURL=file://c:\Users\Danial Haikal\Documents\Appcelerator_Studio_Workspace\plux/build/map/Resources\android\alloy\controllers\feedback.js.map