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
  this.__controllerPath = 'asp/signup';
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
  { backgroundColor: "#535a74", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, width: Ti.UI.FILL, height: Ti.UI.FILL, navTintColor: "#CE1D1C", title: "ASP Signup", id: "win" });

  $.__views["win"] && $.addTopLevelView($.__views["win"]);
  $.__views["__alloyId396"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.FILL, id: "__alloyId396" });

  $.__views["win"].add($.__views["__alloyId396"]);
  $.__views["__alloyId397"] = Ti.UI.createView(
  { borderWidth: 0, top: 0, height: 50, backgroundColor: "#DEDEDE", id: "__alloyId397" });

  $.__views["__alloyId396"].add($.__views["__alloyId397"]);
  $.__views["btnBack"] = Ti.UI.createView(
  { borderWidth: 0, left: 0, zIndex: 9, id: "btnBack", width: "20%" });

  $.__views["__alloyId397"].add($.__views["btnBack"]);
  $.__views["__alloyId398"] = Ti.UI.createImageView(
  { left: 10, width: 25, height: 25, image: "/images/btn-back.png", id: "__alloyId398" });

  $.__views["btnBack"].add($.__views["__alloyId398"]);
  $.__views["__alloyId399"] = Ti.UI.createView(
  { borderWidth: 0, id: "__alloyId399" });

  $.__views["__alloyId397"].add($.__views["__alloyId399"]);
  $.__views["titleLbl"] = Ti.UI.createLabel(
  { width: Titanium.UI.SIZE, height: Ti.UI.SIZE, color: "#A52430", font: { fontFamily: "Roboto-Regular, arial" }, text: 'ASP Sign Up', id: "titleLbl", textAlign: "center" });

  $.__views["__alloyId399"].add($.__views["titleLbl"]);
  $.__views["main"] = Ti.UI.createScrollView(
  { layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.FILL, contentHeight: Ti.UI.SIZE, contentWidth: Ti.UI.FILL, id: "main" });

  $.__views["__alloyId396"].add($.__views["main"]);
  $.__views["__alloyId400"] = Ti.UI.createImageView(
  { width: 120, borderRadius: 10, height: 120, backgroundColor: "#ff0000", bottom: "20dp", top: "20dp", image: "/images/asp_logo.png", id: "__alloyId400" });

  $.__views["main"].add($.__views["__alloyId400"]);
  $.__views["forms"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.SIZE, id: "forms" });

  $.__views["main"].add($.__views["forms"]);
  $.__views["memno"] = Ti.UI.createView(
  { borderWidth: 0, top: 0, left: 10, right: 10, bottom: 10, width: Ti.UI.FILL, height: Ti.UI.SIZE, borderRadius: "5", required: 1, backgroundColor: "#fba81c", id: "memno", value: "" });

  $.__views["forms"].add($.__views["memno"]);
  $.__views["__alloyId401"] = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000000", backgroundColor: "#ffffff", maxLength: 20, hintText: "Member Number or IC Number", left: 5, value: "", id: "__alloyId401" });

  $.__views["memno"].add($.__views["__alloyId401"]);
  textFieldOnFocus ? $.addListener($.__views["__alloyId401"], 'focus', textFieldOnFocus) : __defers['$.__views["__alloyId401"]!focus!textFieldOnFocus'] = true;textFieldOnBlur ? $.addListener($.__views["__alloyId401"], 'blur', textFieldOnBlur) : __defers['$.__views["__alloyId401"]!blur!textFieldOnBlur'] = true;$.__views["empno"] = Ti.UI.createView(
  { borderWidth: 0, top: 0, left: 10, right: 10, bottom: 10, width: Ti.UI.FILL, height: Ti.UI.SIZE, borderRadius: "5", required: 1, backgroundColor: "#fba81c", id: "empno", value: "" });

  $.__views["forms"].add($.__views["empno"]);
  $.__views["__alloyId402"] = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000000", backgroundColor: "#ffffff", maxLength: 15, hintText: "Employee Number", left: 5, value: "", id: "__alloyId402" });

  $.__views["empno"].add($.__views["__alloyId402"]);
  textFieldOnFocus ? $.addListener($.__views["__alloyId402"], 'focus', textFieldOnFocus) : __defers['$.__views["__alloyId402"]!focus!textFieldOnFocus'] = true;textFieldOnBlur ? $.addListener($.__views["__alloyId402"], 'blur', textFieldOnBlur) : __defers['$.__views["__alloyId402"]!blur!textFieldOnBlur'] = true;$.__views["asp_sign_btn"] = Ti.UI.createButton(
  { borderRadius: 5, backgroundColor: "#CC2228", height: 40, color: "#ffffff", width: "70%", id: "asp_sign_btn", title: "Sign Up", top: 20, bottom: 20 });

  $.__views["main"].add($.__views["asp_sign_btn"]);
  doAspSignup ? $.addListener($.__views["asp_sign_btn"], 'click', doAspSignup) : __defers['$.__views["asp_sign_btn"]!click!doAspSignup'] = true;exports.destroy = function () {};

  // make all IDed elements in $.__views available right on the $ in a
  // controller's internal code. Externally the IDed elements will
  // be accessed with getView().
  _.extend($, $.__views);

  // Controller code directly from the developer's controller file
  var args = arguments[0] || {};
  var nav = Alloy.Globals.navMenu;
  var loading = Alloy.createController('loading');
  $.win.add(loading.getView());

  /** To check if keyboard onfocus or onblur**/
  var isKeyboardFocus = 0;

  function doAspSignup() {
    loading.start();
    var memno = $.memno.children[0].value;
    var empno = $.empno.children[0].value;
    //var view_sms = view_sms_box.children[0].children[0].checked;

    var params = {
      memno: memno,
      empno: empno };


    Alloy.Globals.API.do_asp_presignup(params, {
      finish: function () {
        loading.finish();
      },
      callback: function () {
        $.win.close();
        //Alloy.Globals.nav.closeWindow($.win);
        var win = Alloy.createController("asp/signup2").getView();
        win.open();
      } });

  }

  function textFieldOnFocus(e) {
    e.source.parent.backgroundColor = "#ffffff";
    if (e.source.value == e.source.hintText) {
      e.source.value = "";
      //e.source.color = "#06141c";
    }
  }

  function textFieldOnBlur(e) {
    if (e.source.required && e.source.value == "") {
      //error_message += forms_arr[i].hintText+" cannot be empty\n";
      e.source.parent.backgroundColor = "#e8534c";
    } else {
      e.source.parent.backgroundColor = "#55a939";
    }
    if (e.source.value == "") {
      e.source.value = e.source.hintText;
      //e.source.color = "#06141c";
    }
  }

  /*$.doSignup.addEventListener("click", function(){
      	Alloy.Globals.nav.navigationWindow("asp/signup", 0);
      });*/

  $.btnBack.addEventListener('click', function () {
    $.win.close();
  });

  // Generated code that must be executed after all UI and
  // controller code. One example deferred event handlers whose
  // functions are not defined until after the controller code
  // is executed.
  __defers['$.__views["__alloyId401"]!focus!textFieldOnFocus'] && $.addListener($.__views["__alloyId401"], 'focus', textFieldOnFocus);__defers['$.__views["__alloyId401"]!blur!textFieldOnBlur'] && $.addListener($.__views["__alloyId401"], 'blur', textFieldOnBlur);__defers['$.__views["__alloyId402"]!focus!textFieldOnFocus'] && $.addListener($.__views["__alloyId402"], 'focus', textFieldOnFocus);__defers['$.__views["__alloyId402"]!blur!textFieldOnBlur'] && $.addListener($.__views["__alloyId402"], 'blur', textFieldOnBlur);__defers['$.__views["asp_sign_btn"]!click!doAspSignup'] && $.addListener($.__views["asp_sign_btn"], 'click', doAspSignup);

  // Extend the $ instance with all functions and properties
  // defined on the exports object.
  _.extend($, exports);
}

module.exports = Controller;
//# sourceMappingURL=file:///Users/yikonnlau/Documents/Appcelerator_Studio_Workspace/plux/build/map/Resources/android/alloy/controllers/asp/signup.js.map