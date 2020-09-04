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
  this.__controllerPath = 'myHealth/add';
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
  { barColor: "transparent", backgroundColor: "#535a74", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, width: Ti.UI.FILL, height: Ti.UI.FILL, title: "MY HEALTH RECORD", id: "win", backButtonTitle: "", navTintColor: "#CE1D1C" });

  $.__views["win"] && $.addTopLevelView($.__views["win"]);
  $.__views["main"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.FILL, id: "main", backgroundColor: "#ffffff" });

  $.__views["win"].add($.__views["main"]);
  if (true) {
    $.__views["__alloyId675"] = Ti.UI.createView(
    { borderWidth: 0, layout: "horizontal", width: Ti.UI.FILL, height: 50, backgroundColor: "#DEDEDE", id: "__alloyId675" });

    $.__views["main"].add($.__views["__alloyId675"]);
    $.__views["__alloyId676"] = Ti.UI.createView(
    { borderWidth: 0, left: 0, width: "10%", id: "__alloyId676" });

    $.__views["__alloyId675"].add($.__views["__alloyId676"]);
    $.__views["btnBack"] = Ti.UI.createImageView(
    { left: 10, id: "btnBack", width: 25, height: 25, image: "/images/btn-back.png" });

    $.__views["__alloyId676"].add($.__views["btnBack"]);
    $.__views["pageTitle"] = Ti.UI.createView(
    { borderWidth: 0, id: "pageTitle", width: "80%" });

    $.__views["__alloyId675"].add($.__views["pageTitle"]);
    $.__views["__alloyId677"] = Ti.UI.createLabel(
    { width: Titanium.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial", fontSize: "16dp" }, text: 'Health Info', textAlign: "center", id: "__alloyId677" });

    $.__views["pageTitle"].add($.__views["__alloyId677"]);
  }
  $.__views["__alloyId678"] = Ti.UI.createScrollView(
  { layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.FILL, contentHeight: Ti.UI.SIZE, contentWidth: Ti.UI.FILL, id: "__alloyId678", backgroundColor: "#" });

  $.__views["main"].add($.__views["__alloyId678"]);
  $.__views["__alloyId679"] = Ti.UI.createView(
  { borderWidth: 0, width: Ti.UI.SIZE, height: Ti.UI.SIZE, borderColor: "#dfe0e4", backgroundColor: "#FFFFFF", borderRadius: "5", top: 10, id: "__alloyId679" });

  $.__views["__alloyId678"].add($.__views["__alloyId679"]);
  showDatePicker ? $.addListener($.__views["__alloyId679"], 'click', showDatePicker) : __defers['$.__views["__alloyId679"]!click!showDatePicker'] = true;$.__views["date_text"] = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial", fontSize: 16 }, top: 10, left: 20, right: 20, bottom: 10, text: 'SUN, JAN 28, 2018, 12:43 PM', id: "date_text" });

  $.__views["__alloyId679"].add($.__views["date_text"]);
  $.__views["container"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.SIZE, id: "container" });

  $.__views["__alloyId678"].add($.__views["container"]);
  $.__views["__alloyId680"] = Ti.UI.createButton(
  { borderRadius: "5", backgroundColor: "#A52430", height: Ti.UI.SIZE, color: "#ffffff", width: Ti.UI.FILL, top: 10, left: 10, right: 10, bottom: 10, borderColor: "#A52430", borderWidth: 1, textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER, font: { fontSize: 12 }, title: 'Record', id: "__alloyId680" });

  $.__views["__alloyId678"].add($.__views["__alloyId680"]);
  SaveRecord ? $.addListener($.__views["__alloyId680"], 'click', SaveRecord) : __defers['$.__views["__alloyId680"]!click!SaveRecord'] = true;exports.destroy = function () {};

  // make all IDed elements in $.__views available right on the $ in a
  // controller's internal code. Externally the IDed elements will
  // be accessed with getView().
  _.extend($, $.__views);

  // Controller code directly from the developer's controller file
  var args = arguments[0] || {};

  //var fields = args.fields;
  var moment = require('alloy/moment');
  init();

  function init() {
    var model = Alloy.createCollection("health");
    render_field_type();
    $.date_text.value = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    $.date_text.text = moment(new Date()).format("ddd, MMM DD, YYYY, hh:mm A");
    //refresh();
  }

  function render_field_type() {
    var fields = args.fields; //.reverse();
    for (var i = 0; i < fields.length; i++) {
      var view_container = $.UI.create("View", { classes: ['padding', 'wsize', 'hsize', 'vert'], top: 0, bottom: 0 });
      var view_left = $.UI.create("View", { classes: ['wfill', 'small_padding'], height: 40, top: 10, bottom: 10 });
      var label_title = $.UI.create("Label", { classes: ['wsize', 'hsize', 'h4'], left: 0, text: fields[i].name });
      var view_hr = $.UI.create("View", { classes: ['hr'] });
      var default_value = typeof fields[i].default_value != "undefined" ? fields[i].default_value : "";
      view_left.add(label_title);
      if (fields[i].tool == "picker") {

        if (false) {
          var view_right = $.UI.create("View", { classes: ['wsize', 'hsize'], right: 0, value: default_value, record: fields[i] });
          view_left.add(view_right);
          var label_value = $.UI.create("Label", { classes: ['wsize', 'hsize', 'h4'], text: default_value, right: 30, touchEnabled: false });
          var img_down = $.UI.create("ImageView", { touchEnabled: false, right: 0, width: 10, height: 10, image: "/images/icons/sort-down.png", touchEnabled: false });

          view_right.add(label_value);
          view_right.add(img_down);
          view_right.addEventListener("click", openPicker);
        } else {
          var view_right = $.UI.create("View", { classes: ['wsize', 'hsize'], right: 0, value: default_value, record: fields[i] });
          if (fields[i].type == "number") {
            var min = typeof fields[i].min_range != "undefined" ? fields[i].min_range : 0;
            var max = typeof fields[i].max_range != "undefined" ? fields[i].max_range : 0;
            var options = Alloy.Globals._.range(min, max);
          } else if (fields[i].type == "string") {
            var options = fields[i].options;
          }
          var picker = $.UI.create("Picker", { bubbleParent: false });
          for (var j = 0; j < options.length; j++) {
            var picker_row = $.UI.create("PickerRow", { title: options[j] });
            picker.add(picker_row);

            if (default_value == options[j]) {
              picker.setSelectedRow(0, j, false);
            }
          };
          picker.addEventListener("change", function (e) {
            e.source.parent.value = e.row.title;
          });
          view_right.add(picker);
          view_left.add(view_right);
        }
      } else if (fields[i].tool == "textfield") {
        var textfield_value = $.UI.create("TextField", { classes: ['hsize'], value: default_value, right: 0, width: 60 });
        view_left.add(textfield_value);
      } else if (fields[i].tool == "remark") {
        var textfield_value = $.UI.create("TextField", { classes: ['hsize', 'wfill'], value: default_value, left: 80 });
        view_left.add(textfield_value);
      }
      view_container.add(view_left);
      view_container.add(view_hr);
      $.container.add(view_container);
    };
  }

  function openPicker(e) {
    var field = e.source.record;
    if (field.type == "number") {
      var min = typeof field.min_range != "undefined" ? field.min_range : 0;
      var max = typeof field.max_range != "undefined" ? field.max_range : 0;
      var options = Alloy.Globals._.range(min, max);
    } else if (field.type == "string") {
      var options = field.options;
    }
    var view_mask = $.UI.create("View", { classes: ['wfill', 'hfill'], backgroundColor: "#ffffff" });
    var picker = $.UI.create("Picker", { bubbleParent: false });
    var button_save = $.UI.create("Button", { classes: ['small_button', 'rounded'], left: 20, right: 20, top: 20, width: Ti.UI.FILL, title: "Select" });

    for (var i = 0; i < options.length; i++) {
      var label = $.UI.create("Label", { classes: ['h4'], textAlign: "center", text: options[i] });
      var picker_row = $.UI.create("PickerRow", { value: options[i] });
      picker_row.add(label);
      picker.add(picker_row);

      if (e.source.children[0].text != "" && e.source.children[0].text == options[i]) {
        picker.setSelectedRow(0, i, false);
      }
    };

    view_mask.add(picker);
    view_mask.add(button_save);
    $.win.add(view_mask);
    picker.addEventListener("change", function (ex) {
      //alert(picker.getSelectedRow(0).title);
    });
    button_save.addEventListener("click", function () {
      e.source.children[0].text = picker.getSelectedRow(0).value;
      e.source.value = picker.getSelectedRow(0).value;
      e.source.record.default_value = picker.getSelectedRow(0).value;
      $.win.remove(view_mask);
    });
  }

  function showDatePicker(e) {

    if (true) {
      var datePicker = Ti.UI.createPicker({
        type: Ti.UI.PICKER_TYPE_DATE,
        id: "datePicker",
        visible: false });

      datePicker.showDatePickerDialog({
        value: new Date(),
        callback: function (e) {
          if (e.cancel) {
          } else {
            updateLabelDate(e);
          }
        } });

    } else {

      var view_mask = $.UI.create("View", { classes: ['wfill', 'hfill'], backgroundColor: "#ffffff" });
      var picker_date = $.UI.create("Picker", { type: Ti.UI.PICKER_TYPE_DATE_AND_TIME, bubbleParent: false });
      var button_save = $.UI.create("Button", { classes: ['small_button', 'rounded'], left: 20, right: 20, top: 20, width: Ti.UI.FILL, title: "Select" });
      view_mask.add(picker_date);
      view_mask.add(button_save);
      $.win.add(view_mask);
      picker_date.addEventListener("change", updateLabelDate);
      button_save.addEventListener("click", function () {$.win.remove(view_mask);});
    }
  }

  function updateLabelDate(e) {
    var value = false ? e.source.value : e.value;
    $.date_text.value = moment(value).format("YYYY-MM-DD hh:mm");
    $.date_text.text = moment(value).format("ddd, MMM DD, YYYY, hh:mm A");
  }

  function SaveRecord() {
    var u_id = Ti.App.Properties.getString('u_id') || 0;

    var params = {
      u_id: u_id,
      date: $.date_text.value,
      type: args.type,
      created: moment(new Date()).format("YYYY-MM-DD HH:mm:ss") };

    var all_field = $.container.getChildren();
    //all_field.shift();
    //all_field.pop();
    for (var i = 0; i < all_field.length; i++) {
      if (all_field.length - 1 > i) {
        var fieldname = "field" + (i + 1);
        params[fieldname] = all_field[i].children[0].children[1].value;
      } else {
        params["remark"] = all_field[i].children[0].children[1].value;
      }
    };
    var model = Alloy.createCollection("health");
    model.saveArray([params]);
    $.win.close();
    Alloy.Globals.API.callByPost({ url: "syncHealthData", params: params }, function (responseText) {
      var res = JSON.parse(responseText);
    });
  }

  $.win.addEventListener("close", function (e) {
    Ti.App.fireEvent("myHealth:render_menu");
  });

  if ("android" == "android") {
    $.btnBack.addEventListener('click', function () {
      Alloy.Globals.nav.closeWindow($.win);
    });
  }

  // Generated code that must be executed after all UI and
  // controller code. One example deferred event handlers whose
  // functions are not defined until after the controller code
  // is executed.
  __defers['$.__views["__alloyId679"]!click!showDatePicker'] && $.addListener($.__views["__alloyId679"], 'click', showDatePicker);__defers['$.__views["__alloyId680"]!click!SaveRecord'] && $.addListener($.__views["__alloyId680"], 'click', SaveRecord);

  // Extend the $ instance with all functions and properties
  // defined on the exports object.
  _.extend($, exports);
}

module.exports = Controller;
//# sourceMappingURL=file:///Users/yikonnlau/Documents/Appcelerator_Studio_Workspace/plux/build/map/Resources/android/alloy/controllers/myHealth/add.js.map