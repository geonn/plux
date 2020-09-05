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
  this.__controllerPath = 'addMedicalRecord';
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
  { barColor: "transparent", backgroundColor: "#535a74", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, title: "Add Medical Record", id: "win", backButtonTitle: "", navTintColor: "#CE1D1C" });

  $.__views["win"] && $.addTopLevelView($.__views["win"]);
  $.__views["__alloyId36"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.FILL, id: "__alloyId36" });

  $.__views["win"].add($.__views["__alloyId36"]);
  if (true) {
    $.__views["__alloyId37"] = Ti.UI.createView(
    { borderWidth: 0, layout: "horizontal", height: 50, width: Ti.UI.FILL, backgroundColor: "#DEDEDE", id: "__alloyId37" });

    $.__views["__alloyId36"].add($.__views["__alloyId37"]);
    $.__views["__alloyId38"] = Ti.UI.createView(
    { borderWidth: 0, left: 0, width: "10%", id: "__alloyId38" });

    $.__views["__alloyId37"].add($.__views["__alloyId38"]);
    $.__views["btnBack"] = Ti.UI.createImageView(
    { left: 10, id: "btnBack", width: 25, height: 25, image: "/images/btn-back.png" });

    $.__views["__alloyId38"].add($.__views["btnBack"]);
    $.__views["__alloyId39"] = Ti.UI.createView(
    { borderWidth: 0, width: "90%", id: "__alloyId39" });

    $.__views["__alloyId37"].add($.__views["__alloyId39"]);
    $.__views["pageTitle"] = Ti.UI.createLabel(
    { width: Titanium.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial", fontSize: "16dp" }, text: 'Add Medical Record', id: "pageTitle", textAlign: "center" });

    $.__views["__alloyId39"].add($.__views["pageTitle"]);
  }
  $.__views["__alloyId40"] = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#ffffff", font: { fontFamily: "Roboto-Regular, arial", fontSize: 11 }, top: 0, left: 10, right: 10, bottom: 10, text: '* COMPULSORY', id: "__alloyId40" });

  $.__views["__alloyId36"].add($.__views["__alloyId40"]);
  $.__views["forms"] = Ti.UI.createScrollView(
  { layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.FILL, contentHeight: Ti.UI.SIZE, contentWidth: Ti.UI.FILL, id: "forms" });

  $.__views["__alloyId36"].add($.__views["forms"]);
  $.__views["__alloyId41"] = Ti.UI.createView(
  { borderWidth: 0, top: 10, left: 10, right: 10, bottom: 10, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.SIZE, borderRadius: "5", backgroundColor: "#ffffff", format: "photo", hintText: "Recepit", attached: 0, required: 1, id: "__alloyId41" });

  $.__views["forms"].add($.__views["__alloyId41"]);
  $.__views["__alloyId42"] = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#000000", font: { fontFamily: "Roboto-Regular, arial", fontSize: 16 }, text: 'ATTACHMENT *', touchEnabled: false, top: 10, left: 10, id: "__alloyId42" });

  $.__views["__alloyId41"].add($.__views["__alloyId42"]);
  $.__views["__alloyId43"] = Ti.UI.createView(
  { borderWidth: 0, width: Titanium.UI.FILL, height: 1, backgroundColor: "#ccc", top: 10, left: 10, right: 10, id: "__alloyId43" });

  $.__views["__alloyId41"].add($.__views["__alloyId43"]);
  $.__views["camera"] = Alloy.createWidget('com.geonn.camera', 'widget', { id: "camera", __parentSymbol: $.__views["__alloyId41"] });
  $.__views["camera"].setParent($.__views["__alloyId41"]);
  $.__views["category"] = Ti.UI.createView(
  { borderWidth: 0, borderRadius: "5", width: Ti.UI.FILL, height: 40, left: 10, right: 10, bottom: 10, hintTextColor: "#E89114", backgroundColor: "#fba81c", touchEnabled: false, id: "category", option_key: "name", option_name: "name", opacity: 0.5, url: "claimunder.aspx" });

  $.__views["forms"].add($.__views["category"]);
  popout ? $.addListener($.__views["category"], 'click', popout) : __defers['$.__views["category"]!click!popout'] = true;loadComboBox ? $.addListener($.__views["category"], 'postlayout', loadComboBox) : __defers['$.__views["category"]!postlayout!loadComboBox'] = true;$.__views["__alloyId44"] = Ti.UI.createView(
  { borderWidth: 0, padding: { left: 10, right: 10, bottom: 10, top: 10 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", backgroundColor: "#ffffff", touchEnabled: false, required: 1, hintText: "Category", value: "", left: 5, id: "__alloyId44" });

  $.__views["category"].add($.__views["__alloyId44"]);
  $.__views["__alloyId45"] = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#000000", font: { fontFamily: "Roboto-Regular, arial", fontSize: 16 }, text: 'Category *', touchEnabled: false, left: 10, id: "__alloyId45" });

  $.__views["__alloyId44"].add($.__views["__alloyId45"]);
  $.__views["title"] = Ti.UI.createView(
  { borderWidth: 0, top: 0, left: 10, right: 10, bottom: 10, width: Ti.UI.FILL, height: Ti.UI.SIZE, borderRadius: "5", backgroundColor: "#fba81c", id: "title", value: "" });

  $.__views["forms"].add($.__views["title"]);
  $.__views["__alloyId46"] = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000000", backgroundColor: "#ffffff", maxLength: 30, hintText: "Title *", required: 1, left: 5, value: "", id: "__alloyId46" });

  $.__views["title"].add($.__views["__alloyId46"]);
  textFieldOnBlur ? $.addListener($.__views["__alloyId46"], 'change', textFieldOnBlur) : __defers['$.__views["__alloyId46"]!change!textFieldOnBlur'] = true;$.__views["__alloyId47"] = Ti.UI.createButton(
  { borderRadius: 5, backgroundColor: "#CC2228", height: 40, color: "#ffffff", width: "70%", bottom: 10, title: "SUBMIT", id: "__alloyId47" });

  $.__views["forms"].add($.__views["__alloyId47"]);
  doSubmit ? $.addListener($.__views["__alloyId47"], 'click', doSubmit) : __defers['$.__views["__alloyId47"]!click!doSubmit'] = true;exports.destroy = function () {};

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
  var dependent = JSON.parse(Ti.App.Properties.getString('dependent'));
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
        _.extend(params, { Filedata: forms_arr[i].children[2].filedata });
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
    Alloy.Globals.API.callByPost({ url: "uploadMedicalRecords", new: true, domain: "FREEJINI_DOMAIN", params: params }, function (responseText) {

      var result = JSON.parse(responseText);

      var dialog = Ti.UI.createAlertDialog({
        cancel: 1,
        buttonNames: ['Ok'],
        status: result.status,
        message: result.status == "success" ? "Your medical record has been successfully submitted" : result.data.join("\n"),
        title: result.status == "success" ? "Success" : "Error" });

      dialog.addEventListener('click', function (e) {
        if (e.source.status == "success") {
          Ti.App.fireEvent("myMedicalRecord:refresh");
          $.win.close();
        }
      });
      dialog.show();
      loading.finish();
    });
  }

  function popout(e) {
    if (e.source.data.length == null || e.source.data.length <= 0) {
      alert("Sorry, the " + e.source.children[0].hintText + " listing is empty. Please contact our helpdesk for help.");
      return;
    }
    var options_arr = _.pluck(e.source.data, e.source.option_name);
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
    e.source.data = [{ name: "Blood Test" }, { name: "X Ray" }, { name: "ECG/Etress Test" }, { name: "Urine Test" }, { name: "Medication Records" }, { name: "Allergic" }, { name: "ETC" }];
    e.source.opacity = 1;
    e.source.touchEnabled = true;
    /*var indicator = $.UI.create("ActivityIndicator", {classes:['wsize','hsize'], style: Ti.UI.ActivityIndicatorStyle.DARK,});
                                                                indicator.show();
                                                                e.source.add(indicator);
                                                                var params = "CORPCODE="+corpcode+"&memno="+memno+"&empno="+empno;
                                                                Alloy.Globals.API.callByGet({url: e.source.url, params: params }, {
                                                                    onload: function(responseText){
                                                                        var result = JSON.parse(responseText);
                                                                        e.source.data = result;
                                                                    }, onfinish: function(){
                                                                        e.source.opacity = 1;
                                                                        e.source.touchEnabled = true;
                                                                        indicator.hide();
                                                                    }, onerror: function(){
                                                                        
                                                                    }
                                                                });*/
  }

  /*
       Upload file
       * */
  function camera_callback(event) {
    var new_height = event.media.height <= event.media.width ? event.media.height * (1024 / event.media.width) : 1024;
    var new_width = event.media.width <= event.media.height ? event.media.width * (1024 / event.media.height) : 1024;
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
  __defers['$.__views["category"]!click!popout'] && $.addListener($.__views["category"], 'click', popout);__defers['$.__views["category"]!postlayout!loadComboBox'] && $.addListener($.__views["category"], 'postlayout', loadComboBox);__defers['$.__views["__alloyId46"]!change!textFieldOnBlur'] && $.addListener($.__views["__alloyId46"], 'change', textFieldOnBlur);__defers['$.__views["__alloyId47"]!click!doSubmit'] && $.addListener($.__views["__alloyId47"], 'click', doSubmit);

  // Extend the $ instance with all functions and properties
  // defined on the exports object.
  _.extend($, exports);
}

module.exports = Controller;
//# sourceMappingURL=file://c:\Users\Danial Haikal\Documents\Appcelerator_Studio_Workspace\plux/build/map/Resources\android\alloy\controllers\addMedicalRecord.js.map