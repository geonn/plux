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







  $.__views.win = Ti.UI.createWindow(
  { backgroundColor: "#535a74", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, title: "Add Medical Record", id: "win", backButtonTitle: "", navTintColor: "#CE1D1C" });

  $.__views.win && $.addTopLevelView($.__views.win);
  $.__views.__alloyId93 = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.FILL, id: "__alloyId93" });

  $.__views.win.add($.__views.__alloyId93);
  if (true) {
    $.__views.__alloyId94 = Ti.UI.createView(
    { borderWidth: 0, layout: "horizontal", height: 50, width: Ti.UI.FILL, backgroundColor: "#DEDEDE", id: "__alloyId94" });

    $.__views.__alloyId93.add($.__views.__alloyId94);
    $.__views.__alloyId95 = Ti.UI.createView(
    { borderWidth: 0, left: 0, width: "10%", id: "__alloyId95" });

    $.__views.__alloyId94.add($.__views.__alloyId95);
    $.__views.btnBack = Ti.UI.createImageView(
    { left: 10, id: "btnBack", width: 25, height: 25, image: "/images/btn-back.png" });

    $.__views.__alloyId95.add($.__views.btnBack);
    $.__views.__alloyId96 = Ti.UI.createView(
    { borderWidth: 0, width: "90%", id: "__alloyId96" });

    $.__views.__alloyId94.add($.__views.__alloyId96);
    $.__views.pageTitle = Ti.UI.createLabel(
    { width: Titanium.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontSize: "16dp" }, text: 'Add Medical Record', id: "pageTitle", textAlign: "center" });

    $.__views.__alloyId96.add($.__views.pageTitle);
  }
  $.__views.__alloyId97 = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#ffffff", top: 0, left: 10, right: 10, bottom: 10, font: { fontSize: 10 }, text: '* COMPULSORY', id: "__alloyId97" });

  $.__views.__alloyId93.add($.__views.__alloyId97);
  $.__views.forms = Ti.UI.createScrollView(
  { layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.FILL, contentHeight: Ti.UI.SIZE, contentWidth: Ti.UI.FILL, id: "forms" });

  $.__views.__alloyId93.add($.__views.forms);
  $.__views.__alloyId98 = Ti.UI.createView(
  { borderWidth: 0, top: 10, left: 10, right: 10, bottom: 10, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.SIZE, borderRadius: "5", backgroundColor: "#ffffff", format: "photo", hintText: "Recepit", attached: 0, required: 1, id: "__alloyId98" });

  $.__views.forms.add($.__views.__alloyId98);
  $.__views.__alloyId99 = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#000000", font: { fontSize: 14 }, text: 'ATTACHMENT *', touchEnabled: false, top: 10, left: 10, id: "__alloyId99" });

  $.__views.__alloyId98.add($.__views.__alloyId99);
  $.__views.__alloyId100 = Ti.UI.createView(
  { borderWidth: 0, width: Titanium.UI.FILL, height: 1, backgroundColor: "#ccc", top: 10, left: 10, right: 10, id: "__alloyId100" });

  $.__views.__alloyId98.add($.__views.__alloyId100);
  $.__views.camera = Alloy.createWidget('com.geonn.camera', 'widget', { id: "camera", __parentSymbol: $.__views.__alloyId98 });
  $.__views.camera.setParent($.__views.__alloyId98);
  $.__views.category = Ti.UI.createView(
  { borderWidth: 0, borderRadius: "5", width: Ti.UI.FILL, height: 40, left: 10, right: 10, bottom: 10, hintTextColor: "#E89114", backgroundColor: "#fba81c", touchEnabled: false, id: "category", option_key: "name", option_name: "name", opacity: 0.5, url: "claimunder.aspx" });

  $.__views.forms.add($.__views.category);
  popout ? $.addListener($.__views.category, 'click', popout) : __defers['$.__views.category!click!popout'] = true;loadComboBox ? $.addListener($.__views.category, 'postlayout', loadComboBox) : __defers['$.__views.category!postlayout!loadComboBox'] = true;$.__views.__alloyId101 = Ti.UI.createView(
  { borderWidth: 0, padding: { left: 10, right: 10, bottom: 10, top: 10 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", backgroundColor: "#ffffff", touchEnabled: false, required: 1, hintText: "Category", value: "", left: 5, id: "__alloyId101" });

  $.__views.category.add($.__views.__alloyId101);
  $.__views.__alloyId102 = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#000000", font: { fontSize: 14 }, text: 'Category *', touchEnabled: false, left: 10, id: "__alloyId102" });

  $.__views.__alloyId101.add($.__views.__alloyId102);
  $.__views.title = Ti.UI.createView(
  { borderWidth: 0, top: 0, left: 10, right: 10, bottom: 10, width: Ti.UI.FILL, height: Ti.UI.SIZE, borderRadius: "5", backgroundColor: "#fba81c", id: "title", value: "" });

  $.__views.forms.add($.__views.title);
  $.__views.__alloyId103 = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000000", backgroundColor: "#ffffff", maxLength: 30, hintText: "Title *", required: 1, left: 5, value: "", id: "__alloyId103" });

  $.__views.title.add($.__views.__alloyId103);
  textFieldOnBlur ? $.addListener($.__views.__alloyId103, 'change', textFieldOnBlur) : __defers['$.__views.__alloyId103!change!textFieldOnBlur'] = true;$.__views.__alloyId104 = Ti.UI.createButton(
  { borderRadius: 5, backgroundColor: "#CC2228", height: 40, color: "#ffffff", width: "70%", bottom: 10, title: "SUBMIT", id: "__alloyId104" });

  $.__views.forms.add($.__views.__alloyId104);
  doSubmit ? $.addListener($.__views.__alloyId104, 'click', doSubmit) : __defers['$.__views.__alloyId104!click!doSubmit'] = true;exports.destroy = function () {};




  _.extend($, $.__views);


  var args = arguments[0] || {};
  var corpcode = Ti.App.Properties.getString('corpcode');
  var empno = Ti.App.Properties.getString('empno');
  var memno = Ti.App.Properties.getString('memno');
  var name = Ti.App.Properties.getString('fullname');
  var dependent = JSON.parse(Ti.App.Properties.getString('dependent'));
  console.log("check here dependent");
  console.log(dependent);
  console.log(dependent.name);
  var loading = Alloy.createController('loading');
  var error_message = "";

  function init() {

    $.win.add(loading.getView());
    $.camera.init({ callback: camera_callback });
  }
  init();

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
      } else {
        console.log(forms_arr[i].children[0].value + " " + forms_arr[i].children[0].required);
        if (forms_arr[i].children[0].required && forms_arr[i].children[0].value == "") {
          console.log(_.isUndefined(forms_arr[i].children[0].value) + " _.isEmpty(forms_arr[i].children[0].value)");
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
    console.log(params);
    loading.start();
    API.callByPost({ url: "uploadMedicalRecords", new: true, domain: "FREEJINI_DOMAIN", params: params }, function (responseText) {
      console.log(responseText);
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
    console.log(e.source.data);
    console.log(e.source.data.length);
    console.log(e.source.option_name);
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
      console.log(ex.index + " " + ex.cancel);
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

















  }




  function camera_callback(event) {
    console.log(640 / event.media.width + " " + 640 / event.media.height);
    var new_height = event.media.height <= event.media.width ? event.media.height * (640 / event.media.width) : 640;
    var new_width = event.media.width <= event.media.height ? event.media.width * (640 / event.media.height) : 640;
    var blob = event.media;
    console.log(" " + event.media.width + " " + event.media.height);
    console.log(new_width + " " + new_height);
    blob = blob.imageAsResized(new_width, new_height);
    $.image_preview.image = blob;
    $.image_preview.parent.filedata = blob;
    $.image_preview.parent.attached = 1;
  }

  if ('android' == "android") {
    $.btnBack.addEventListener('click', function () {
      nav.closeWindow($.win);
    });
  }





  __defers['$.__views.category!click!popout'] && $.addListener($.__views.category, 'click', popout);__defers['$.__views.category!postlayout!loadComboBox'] && $.addListener($.__views.category, 'postlayout', loadComboBox);__defers['$.__views.__alloyId103!change!textFieldOnBlur'] && $.addListener($.__views.__alloyId103, 'change', textFieldOnBlur);__defers['$.__views.__alloyId104!click!doSubmit'] && $.addListener($.__views.__alloyId104, 'click', doSubmit);



  _.extend($, exports);
}

module.exports = Controller;