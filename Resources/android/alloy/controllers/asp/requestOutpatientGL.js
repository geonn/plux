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
  this.__controllerPath = 'asp/requestOutpatientGL';
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
  { barColor: "transparent", backgroundColor: "#535a74", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, title: "OutPatient GL", id: "win", backButtonTitle: "", navTintColor: "#CE1D1C" });

  $.__views["win"] && $.addTopLevelView($.__views["win"]);
  $.__views["__alloyId413"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.FILL, id: "__alloyId413" });

  $.__views["win"].add($.__views["__alloyId413"]);
  if (true) {
    $.__views["__alloyId414"] = Ti.UI.createView(
    { borderWidth: 0, layout: "horizontal", height: 50, width: Ti.UI.FILL, backgroundColor: "#DEDEDE", id: "__alloyId414" });

    $.__views["__alloyId413"].add($.__views["__alloyId414"]);
    $.__views["__alloyId415"] = Ti.UI.createView(
    { borderWidth: 0, left: 0, width: "10%", id: "__alloyId415" });

    $.__views["__alloyId414"].add($.__views["__alloyId415"]);
    $.__views["btnBack"] = Ti.UI.createImageView(
    { left: 10, id: "btnBack", width: 25, height: 25, image: "/images/btn-back.png" });

    $.__views["__alloyId415"].add($.__views["btnBack"]);
    $.__views["__alloyId416"] = Ti.UI.createView(
    { borderWidth: 0, width: "90%", id: "__alloyId416" });

    $.__views["__alloyId414"].add($.__views["__alloyId416"]);
    $.__views["pageTitle"] = Ti.UI.createLabel(
    { width: Titanium.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial", fontSize: "16dp" }, text: 'OutPatient GL', id: "pageTitle", textAlign: "center" });

    $.__views["__alloyId416"].add($.__views["pageTitle"]);
  }
  $.__views["__alloyId417"] = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#ffffff", font: { fontFamily: "Roboto-Regular, arial", fontSize: 16 }, top: 10, left: 10, right: 10, bottom: 10, text: 'Please fill in below info to request Outpatient GL from ASP', id: "__alloyId417" });

  $.__views["__alloyId413"].add($.__views["__alloyId417"]);
  $.__views["__alloyId418"] = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#ffffff", font: { fontFamily: "Roboto-Regular, arial", fontSize: 11 }, top: 0, left: 10, right: 10, bottom: 10, text: '* COMPULSORY', id: "__alloyId418" });

  $.__views["__alloyId413"].add($.__views["__alloyId418"]);
  $.__views["forms"] = Ti.UI.createScrollView(
  { layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.FILL, contentHeight: Ti.UI.SIZE, contentWidth: Ti.UI.FILL, id: "forms" });

  $.__views["__alloyId413"].add($.__views["forms"]);
  $.__views["__alloyId419"] = Ti.UI.createView(
  { borderWidth: 0, top: 10, left: 10, right: 10, bottom: 10, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.SIZE, borderRadius: "5", backgroundColor: "#ffffff", format: "photo", hintText: "Recepit", attached: 0, required: 1, id: "__alloyId419" });

  $.__views["forms"].add($.__views["__alloyId419"]);
  $.__views["__alloyId420"] = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#000000", font: { fontFamily: "Roboto-Regular, arial", fontSize: 16 }, text: 'REFERRAL LETTER *', touchEnabled: false, top: 10, left: 10, id: "__alloyId420" });

  $.__views["__alloyId419"].add($.__views["__alloyId420"]);
  $.__views["__alloyId421"] = Ti.UI.createView(
  { borderWidth: 0, width: Titanium.UI.FILL, height: 1, backgroundColor: "#ccc", top: 10, left: 10, right: 10, id: "__alloyId421" });

  $.__views["__alloyId419"].add($.__views["__alloyId421"]);
  $.__views["camera"] = Alloy.createWidget('com.geonn.camera', 'widget', { id: "camera", __parentSymbol: $.__views["__alloyId419"] });
  $.__views["camera"].setParent($.__views["__alloyId419"]);
  $.__views["patient_name"] = Ti.UI.createView(
  { borderWidth: 0, borderRadius: "5", width: Ti.UI.FILL, height: 40, left: 10, right: 10, bottom: 10, hintTextColor: "#E89114", backgroundColor: "#fba81c", touchEnabled: false, id: "patient_name", option_key: "name", option_name: "name", opacity: 0.5, url: "claimunder.aspx" });

  $.__views["forms"].add($.__views["patient_name"]);
  popout ? $.addListener($.__views["patient_name"], 'click', popout) : __defers['$.__views["patient_name"]!click!popout'] = true;loadComboBox ? $.addListener($.__views["patient_name"], 'postlayout', loadComboBox) : __defers['$.__views["patient_name"]!postlayout!loadComboBox'] = true;$.__views["__alloyId422"] = Ti.UI.createView(
  { borderWidth: 0, padding: { left: 10, right: 10, bottom: 10, top: 10 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", backgroundColor: "#ffffff", touchEnabled: false, required: 1, hintText: "Patient Name", value: "", left: 5, id: "__alloyId422" });

  $.__views["patient_name"].add($.__views["__alloyId422"]);
  $.__views["__alloyId423"] = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#000000", font: { fontFamily: "Roboto-Regular, arial", fontSize: 16 }, text: 'Patient Name *', touchEnabled: false, left: 10, id: "__alloyId423" });

  $.__views["__alloyId422"].add($.__views["__alloyId423"]);
  $.__views["employee_name"] = Ti.UI.createView(
  { borderWidth: 0, borderRadius: "5", width: Ti.UI.FILL, height: 40, left: 10, right: 10, bottom: 10, hintTextColor: "#E89114", backgroundColor: "#fba81c", touchEnabled: false, id: "employee_name", option_key: "name", option_name: "name", opacity: 0.5, url: "claimunder.aspx" });

  $.__views["forms"].add($.__views["employee_name"]);
  popout ? $.addListener($.__views["employee_name"], 'click', popout) : __defers['$.__views["employee_name"]!click!popout'] = true;loadComboBox ? $.addListener($.__views["employee_name"], 'postlayout', loadComboBox) : __defers['$.__views["employee_name"]!postlayout!loadComboBox'] = true;$.__views["__alloyId424"] = Ti.UI.createView(
  { borderWidth: 0, padding: { left: 10, right: 10, bottom: 10, top: 10 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", backgroundColor: "#ffffff", touchEnabled: false, required: 1, hintText: "Employee Name", value: "", left: 5, id: "__alloyId424" });

  $.__views["employee_name"].add($.__views["__alloyId424"]);
  $.__views["__alloyId425"] = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#000000", font: { fontFamily: "Roboto-Regular, arial", fontSize: 16 }, text: 'Employee Name *', touchEnabled: false, left: 10, id: "__alloyId425" });

  $.__views["__alloyId424"].add($.__views["__alloyId425"]);
  $.__views["employee_ic"] = Ti.UI.createView(
  { borderWidth: 0, top: 0, left: 10, right: 10, bottom: 10, width: Ti.UI.FILL, height: Ti.UI.SIZE, borderRadius: "5", backgroundColor: "#fba81c", id: "employee_ic", value: "" });

  $.__views["forms"].add($.__views["employee_ic"]);
  $.__views["__alloyId426"] = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000000", backgroundColor: "#ffffff", maxLength: 30, hintText: "Employee IC number *", required: 1, left: 5, value: "", id: "__alloyId426" });

  $.__views["employee_ic"].add($.__views["__alloyId426"]);
  textFieldOnBlur ? $.addListener($.__views["__alloyId426"], 'change', textFieldOnBlur) : __defers['$.__views["__alloyId426"]!change!textFieldOnBlur'] = true;$.__views["hospital_name"] = Ti.UI.createView(
  { borderWidth: 0, top: 0, left: 10, right: 10, bottom: 10, width: Ti.UI.FILL, height: Ti.UI.SIZE, borderRadius: "5", backgroundColor: "#fba81c", id: "hospital_name", value: "" });

  $.__views["forms"].add($.__views["hospital_name"]);
  $.__views["__alloyId427"] = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000000", backgroundColor: "#ffffff", maxLength: 50, hintText: "Name of Hospital *", required: 1, left: 5, value: "", id: "__alloyId427" });

  $.__views["hospital_name"].add($.__views["__alloyId427"]);
  textFieldOnBlur ? $.addListener($.__views["__alloyId427"], 'change', textFieldOnBlur) : __defers['$.__views["__alloyId427"]!change!textFieldOnBlur'] = true;$.__views["visit_date"] = Ti.UI.createView(
  { borderWidth: 0, borderRadius: "5", width: Ti.UI.FILL, height: 40, left: 10, right: 10, bottom: 10, hintTextColor: "#E89114", backgroundColor: "#fba81c", id: "visit_date" });

  $.__views["forms"].add($.__views["visit_date"]);
  datePicker ? $.addListener($.__views["visit_date"], 'click', datePicker) : __defers['$.__views["visit_date"]!click!datePicker'] = true;$.__views["__alloyId428"] = Ti.UI.createView(
  { borderWidth: 0, padding: { left: 10, right: 10, bottom: 10, top: 10 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", backgroundColor: "#ffffff", touchEnabled: false, required: 1, hintText: "Date Visit", value: "", left: 5, id: "__alloyId428" });

  $.__views["visit_date"].add($.__views["__alloyId428"]);
  $.__views["__alloyId429"] = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#000000", font: { fontFamily: "Roboto-Regular, arial", fontSize: 16 }, text: 'Date of Visit *', touchEnabled: false, left: 10, id: "__alloyId429" });

  $.__views["__alloyId428"].add($.__views["__alloyId429"]);
  $.__views["diagnosis"] = Ti.UI.createView(
  { borderWidth: 0, top: 0, left: 10, right: 10, bottom: 10, width: Ti.UI.FILL, height: Ti.UI.SIZE, borderRadius: "5", backgroundColor: "#fba81c", id: "diagnosis", value: "" });

  $.__views["forms"].add($.__views["diagnosis"]);
  $.__views["__alloyId430"] = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000000", backgroundColor: "#ffffff", maxLength: 50, hintText: "Diagnosis", required: 0, left: 5, value: "", id: "__alloyId430" });

  $.__views["diagnosis"].add($.__views["__alloyId430"]);
  textFieldOnBlur ? $.addListener($.__views["__alloyId430"], 'change', textFieldOnBlur) : __defers['$.__views["__alloyId430"]!change!textFieldOnBlur'] = true;$.__views["dr_name"] = Ti.UI.createView(
  { borderWidth: 0, top: 0, left: 10, right: 10, bottom: 10, width: Ti.UI.FILL, height: Ti.UI.SIZE, borderRadius: "5", backgroundColor: "#fba81c", id: "dr_name", value: "" });

  $.__views["forms"].add($.__views["dr_name"]);
  $.__views["__alloyId431"] = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000000", backgroundColor: "#ffffff", maxLength: 50, hintText: "Dr Name", required: 0, left: 5, value: "", id: "__alloyId431" });

  $.__views["dr_name"].add($.__views["__alloyId431"]);
  textFieldOnBlur ? $.addListener($.__views["__alloyId431"], 'change', textFieldOnBlur) : __defers['$.__views["__alloyId431"]!change!textFieldOnBlur'] = true;$.__views["__alloyId432"] = Ti.UI.createButton(
  { borderRadius: 5, backgroundColor: "#CC2228", height: 40, color: "#ffffff", width: "70%", bottom: 10, title: "SUBMIT", id: "__alloyId432" });

  $.__views["forms"].add($.__views["__alloyId432"]);
  doSubmit ? $.addListener($.__views["__alloyId432"], 'click', doSubmit) : __defers['$.__views["__alloyId432"]!click!doSubmit'] = true;exports.destroy = function () {};

  // make all IDed elements in $.__views available right on the $ in a
  // controller's internal code. Externally the IDed elements will
  // be accessed with getView().
  _.extend($, $.__views);

  // Controller code directly from the developer's controller file
  var args = arguments[0] || {};
  var corpcode = Ti.App.Properties.getString('corpcode');
  var empno = Ti.App.Properties.getString('empno');
  var memno = Ti.App.Properties.getString('memno');
  var name = Ti.App.Properties.getString('fullname');
  var loading = Alloy.createController('loading');
  var error_message = "";


  function init() {
    //loading.start();
    $.win.add(loading.getView());
    $.camera.init({ callback: camera_callback });
  }
  init();

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

  function doSubmit() {
    var forms_arr = $.forms.getChildren();
    var params = {};
    var error_message = "";
    for (var i = 0; i < forms_arr.length - 1; i++) {
      if (forms_arr[i].format == "photo" && forms_arr[i].children[2].attached) {
        Alloy.Globals._.extend(params, { Filedata: forms_arr[i].children[2].filedata });
      } else if (forms_arr[i].format == "photo" && !forms_arr[i].children[2].attached) {
        error_message += "Please upload your referral letter\n";
      } else {
        if (forms_arr[i].children[0].required && forms_arr[i].children[0].value == "") {
          error_message += forms_arr[i].children[0].hintText + " cannot be empty\n";
        } else {
          params[forms_arr[i].id] = forms_arr[i].children[0].value;
        }
      }
    };
    if (error_message != "") {
      alert(error_message);
      return;
    }
    params["u_id"] = Ti.App.Properties.getString('u_id');
    loading.start();
    Alloy.Globals.API.callByPost({ url: "submitOutpatientForm", new: true, domain: "FREEJINI_DOMAIN", params: params }, function (responseText) {
      var result = JSON.parse(responseText);

      var dialog = Ti.UI.createAlertDialog({
        cancel: 1,
        buttonNames: ['Ok'],
        status: result.status,
        message: result.status == "success" ? "Your referral has been successfully submitted" : result.data.join("\n"),
        title: result.status == "success" ? "Success" : "Error" });

      dialog.addEventListener('click', function (e) {
        if (e.source.status == "success") {
          $.win.close();
        }
      });
      dialog.show();
      loading.finish();
    });
  }

  function datePicker(e) {
    var val_date = typeof e.source.children[0].date != "undefined" ? e.source.children[0].date : new Date();
    var view_container = $.UI.create("View", { classes: ['wfill', 'hfill'], zIndex: 50 });
    var mask = $.UI.create("View", {
      classes: ['wfill', 'hfill'],
      backgroundColor: "#80000000" });

    var view_box = $.UI.create("View", { classes: ['wfill', 'hsize', 'vert'],
      backgroundGradient: {
        type: 'linear',
        colors: [{ color: '#ffffff', offset: 0.0 }, { color: '#67b6e1', offset: 0.4 }, { color: '#67b6e1', offset: 0.6 }, { color: '#ffffff', offset: 1.0 }] },
      zIndex: 50 });
    var picker = $.UI.create("Picker", {
      type: Ti.UI.PICKER_TYPE_DATE,
      value: val_date,
      backgroundColor: "Transparent",
      dateTimeColor: "#ffffff",
      top: 10 });

    var ok_button = $.UI.create("Button", { classes: ['wfill'], borderRadius: 0, height: 50, title: "Select a Date" });
    view_box.add(picker);
    view_box.add(ok_button);
    view_container.add(view_box);
    view_container.add(mask);
    $.win.add(view_container);

    mask.addEventListener("click", function () {
      $.win.remove(view_container);
    });

    ok_button.addEventListener("click", function (ex) {
      var dd = picker.value.getDate();
      var mm = picker.value.getMonth() + 1;
      var yyyy = picker.value.getFullYear();
      e.source.children[0].value = dd + '/' + mm + '/' + yyyy;
      e.source.children[0].date = picker.value;
      e.source.children[0].children[0].text = mm + '/' + dd + '/' + yyyy;
      e.source.children[0].children[0].color = "#000000";
      e.source.backgroundColor = "#55a939";
      $.win.remove(view_container);
    });
  }

  function popout(e) {
    if (e.source.data.length == null || e.source.data.length <= 0) {
      alert("Sorry, the " + e.source.children[0].hintText + " listing is empty. Please contact our helpdesk for help.");
      return;
    }
    var options_arr = Alloy.Globals._.pluck(e.source.data, e.source.option_name);
    options_arr.push("Cancel");;
    var dialog = Ti.UI.createOptionDialog({
      cancel: options_arr.length > 0 ? options_arr.length - 1 : 0,
      options: options_arr,
      selectedIndex: e.source.value || 0,
      title: e.source.children[0].text });


    dialog.show();
    dialog.addEventListener("click", function (ex) {
      if (false ? ex.cancel != ex.index : !ex.cancel) {
        e.source.children[0].children[0].text = options_arr[ex.index];
        e.source.children[0].value = e.source.data[ex.index][e.source.option_key];
        e.source.children[0].children[0].color = "#000000";
        e.source.backgroundColor = "#55a939";
      }
    });
  }

  function loadComboBox(e) {
    var indicator = $.UI.create("ActivityIndicator", { classes: ['wsize', 'hsize'], style: Ti.UI.ActivityIndicatorStyle.DARK });
    indicator.show();
    e.source.add(indicator);
    var params = "CORPCODE=" + corpcode + "&memno=" + memno + "&empno=" + empno;
    Alloy.Globals.API.callByGet({ url: e.source.url, params: params }, {
      onload: function (responseText) {
        var result = JSON.parse(responseText);
        e.source.data = result;
      }, onfinish: function () {
        e.source.opacity = 1;
        e.source.touchEnabled = true;
        indicator.hide();
      }, onerror: function () {

      } });

  }

  /*
       Upload file
       * */
  function camera_callback(event) {
    var new_height = event.media.height <= event.media.width ? event.media.height * (event.media.width / 1024) : 1024;
    var new_width = event.media.height <= event.media.width ? 1024 : event.media.width * (event.media.height / 1024);
    var blob = event.media;
    blob = blob.imageAsResized(new_width, new_height);
    $.image_preview.image = blob;
    $.image_preview.parent.filedata = blob;
    $.image_preview.parent.attached = 1;
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
  __defers['$.__views["patient_name"]!click!popout'] && $.addListener($.__views["patient_name"], 'click', popout);__defers['$.__views["patient_name"]!postlayout!loadComboBox'] && $.addListener($.__views["patient_name"], 'postlayout', loadComboBox);__defers['$.__views["employee_name"]!click!popout'] && $.addListener($.__views["employee_name"], 'click', popout);__defers['$.__views["employee_name"]!postlayout!loadComboBox'] && $.addListener($.__views["employee_name"], 'postlayout', loadComboBox);__defers['$.__views["__alloyId426"]!change!textFieldOnBlur'] && $.addListener($.__views["__alloyId426"], 'change', textFieldOnBlur);__defers['$.__views["__alloyId427"]!change!textFieldOnBlur'] && $.addListener($.__views["__alloyId427"], 'change', textFieldOnBlur);__defers['$.__views["visit_date"]!click!datePicker'] && $.addListener($.__views["visit_date"], 'click', datePicker);__defers['$.__views["__alloyId430"]!change!textFieldOnBlur'] && $.addListener($.__views["__alloyId430"], 'change', textFieldOnBlur);__defers['$.__views["__alloyId431"]!change!textFieldOnBlur'] && $.addListener($.__views["__alloyId431"], 'change', textFieldOnBlur);__defers['$.__views["__alloyId432"]!click!doSubmit'] && $.addListener($.__views["__alloyId432"], 'click', doSubmit);

  // Extend the $ instance with all functions and properties
  // defined on the exports object.
  _.extend($, exports);
}

module.exports = Controller;
//# sourceMappingURL=file://c:\Users\DanialHaikal\Documents\Appcelerator_Studio_Workspace\plux/build/map/Resources\android\alloy\controllers\asp\requestOutpatientGL.js.map