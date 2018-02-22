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







  $.__views.win = Ti.UI.createWindow(
  { backgroundColor: "#ffffff", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, width: Ti.UI.FILL, height: Ti.UI.FILL, title: "MY HEALTH RECORD", id: "win", backButtonTitle: "", navTintColor: "#CE1D1C" });

  $.__views.win && $.addTopLevelView($.__views.win);
  $.__views.main = Ti.UI.createView(
  { layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.FILL, id: "main", backgroundColor: "#ffffff" });

  $.__views.win.add($.__views.main);
  if (true) {
    $.__views.__alloyId514 = Ti.UI.createView(
    { layout: "horizontal", width: Ti.UI.FILL, height: 50, backgroundColor: "#DEDEDE", id: "__alloyId514" });

    $.__views.main.add($.__views.__alloyId514);
    $.__views.__alloyId515 = Ti.UI.createView(
    { left: 0, width: "10%", id: "__alloyId515" });

    $.__views.__alloyId514.add($.__views.__alloyId515);
    $.__views.btnBack = Ti.UI.createImageView(
    { left: 10, id: "btnBack", width: 25, height: 25, image: "/images/btn-back.png" });

    $.__views.__alloyId515.add($.__views.btnBack);
    $.__views.pageTitle = Ti.UI.createView(
    { id: "pageTitle", width: "80%" });

    $.__views.__alloyId514.add($.__views.pageTitle);
    $.__views.__alloyId516 = Ti.UI.createLabel(
    { width: Titanium.UI.SIZE, height: Ti.UI.SIZE, color: "#606060", font: { fontSize: "16dp" }, text: 'Health Info', textAlign: "center", id: "__alloyId516" });

    $.__views.pageTitle.add($.__views.__alloyId516);
  }
  $.__views.container = Ti.UI.createScrollView(
  { layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.FILL, contentHeight: Ti.UI.SIZE, contentWidth: Ti.UI.FILL, id: "container", backgroundColor: "#" });

  $.__views.main.add($.__views.container);
  $.__views.__alloyId517 = Ti.UI.createView(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, borderColor: "#dfe0e4", backgroundColor: "#FFFFFF", borderRadius: "5", top: 10, id: "__alloyId517" });

  $.__views.container.add($.__views.__alloyId517);
  showDatePicker ? $.addListener($.__views.__alloyId517, 'click', showDatePicker) : __defers['$.__views.__alloyId517!click!showDatePicker'] = true;$.__views.date_text = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#606060", top: 10, left: 20, right: 20, bottom: 10, font: { fontSize: 14 }, text: 'SUN, JAN 28, 2018, 12:43 PM', id: "date_text" });

  $.__views.__alloyId517.add($.__views.date_text);
  $.__views.__alloyId518 = Ti.UI.createButton(
  { top: 10, left: 10, right: 10, bottom: 10, borderColor: "#CE1D1C", borderWidth: 1, backgroundColor: "#ffffff", color: "#CE1D1C", textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER, width: Ti.UI.FILL, height: Ti.UI.SIZE, font: { fontSize: 14 }, borderRadius: "5", title: 'Record', id: "__alloyId518" });

  $.__views.container.add($.__views.__alloyId518);
  SaveRecord ? $.addListener($.__views.__alloyId518, 'click', SaveRecord) : __defers['$.__views.__alloyId518!click!SaveRecord'] = true;exports.destroy = function () {};




  _.extend($, $.__views);


  var args = arguments[0] || {};
  var fields = args.fields;
  var moment = require('alloy/moment');
  console.log(fields);
  init();

  function init() {
    var model = Alloy.createCollection("health");
    render_field_type();
    $.date_text.value = moment(new Date()).format("YYYY-MM-DD HH:MM:SS");
    $.date_text.text = moment(new Date()).format("ddd, MMM DD, YYYY, hh:mm A");

  }
  function render_field_type() {
    fields = fields.reverse();
    console.log(fields.length + " fields.length");
    for (var i = 0; i < fields.length; i++) {
      console.log(i + " i value");
      console.log(fields[i]);
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
          console.log("1");
          var view_right = $.UI.create("View", { classes: ['wsize', 'hsize'], right: 0, value: default_value, record: fields[i] });
          if (fields[i].type == "number") {
            var min = typeof fields[i].min_range != "undefined" ? fields[i].min_range : 0;
            var max = typeof fields[i].max_range != "undefined" ? fields[i].max_range : 0;
            var options = _.range(min, max);
          } else if (fields[i].type == "string") {
            var options = fields[i].options;
          }
          console.log("1");
          var picker = $.UI.create("Picker", { bubbleParent: false });
          for (var j = 0; j < options.length; j++) {
            var picker_row = $.UI.create("PickerRow", { title: options[j] });
            picker.add(picker_row);

            if (default_value == options[j]) {
              picker.setSelectedRow(0, j, false);
            }
          };
          console.log("after this add");
          picker.addEventListener("change", function (e) {
            console.log(e.source.parent);
            console.log(e.source.parent.value);
            console.log(e.row.title);
            e.source.parent.value = e.row.title;
            console.log(e.source.parent.value);
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
      console.log("2");
      view_container.add(view_left);
      view_container.add(view_hr);
      console.log("2");
      $.container.insertAt({ view: view_container, position: 1 });
      console.log("2");
    };
  }

  function openPicker(e) {
    var field = e.source.record;
    console.log(field.type);
    console.log(e.source.children[0].text);
    if (field.type == "number") {
      var min = typeof field.min_range != "undefined" ? field.min_range : 0;
      var max = typeof field.max_range != "undefined" ? field.max_range : 0;
      var options = _.range(min, max);
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

    });
    button_save.addEventListener("click", function () {
      e.source.children[0].text = picker.getSelectedRow(0).value;
      e.source.value = picker.getSelectedRow(0).value;
      e.source.record.default_value = picker.getSelectedRow(0).value;
      console.log(e.source.children[0].text);
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
          if (e.cancel) {} else {
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
      button_save.addEventListener("click", function () {
        $.win.remove(view_mask);
      });
    }
  }

  function updateLabelDate(e) {
    var value = false ? e.source.value : e.value;
    console.log(value + " value");
    $.date_text.value = moment(value).format("YYYY-MM-DD HH:MM");
    $.date_text.text = moment(value).format("ddd, MMM DD, YYYY, hh:mm A");
  }

  function SaveRecord() {
    var u_id = Ti.App.Properties.getString('u_id') || 0;

    var params = {
      u_id: u_id,
      date: $.date_text.value,
      type: args.type,
      created: moment(new Date()).format("YYYY-MM-DD HH:MM:SS") };

    var all_field = $.container.getChildren();
    all_field.shift();
    all_field.pop();
    for (var i = 0; i < all_field.length; i++) {
      if (all_field.length - 1 > i) {
        console.log(all_field[i].children[0].children[1]);
        console.log(all_field[i].children[0].children[1].value);
        var fieldname = "field" + (i + 1);
        params[fieldname] = all_field[i].children[0].children[1].value;
        console.log(params[fieldname]);
      } else {
        params["remark"] = all_field[i].children[0].children[1].value;
        console.log(params["remark"]);
      }
    };
    console.log(params);
    var model = Alloy.createCollection("health");
    model.saveArray([params]);
    $.win.close();
    API.callByPost({ url: "syncHealthData", params: params }, function (responseText) {
      var res = JSON.parse(responseText);
      console.log(res.data);
    });
  }

  $.win.addEventListener("close", function (e) {
    Ti.API.fireEvent("myHealth:render_menu");
  });

  if ('android' == "android") {
    $.btnBack.addEventListener('click', function () {
      nav.closeWindow($.win);
    });
  }





  __defers['$.__views.__alloyId517!click!showDatePicker'] && $.addListener($.__views.__alloyId517, 'click', showDatePicker);__defers['$.__views.__alloyId518!click!SaveRecord'] && $.addListener($.__views.__alloyId518, 'click', SaveRecord);



  _.extend($, exports);
}

module.exports = Controller;