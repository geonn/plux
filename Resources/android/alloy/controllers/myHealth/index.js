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
  this.__controllerPath = 'myHealth/index';
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
    $.__views.__alloyId667 = Ti.UI.createView(
    { layout: "horizontal", width: Ti.UI.FILL, height: 50, backgroundColor: "#DEDEDE", id: "__alloyId667" });

    $.__views.main.add($.__views.__alloyId667);
    $.__views.__alloyId668 = Ti.UI.createView(
    { left: 0, width: "10%", id: "__alloyId668" });

    $.__views.__alloyId667.add($.__views.__alloyId668);
    $.__views.btnBack = Ti.UI.createImageView(
    { left: 10, id: "btnBack", width: 25, height: 25, image: "/images/btn-back.png" });

    $.__views.__alloyId668.add($.__views.btnBack);
    $.__views.pageTitle = Ti.UI.createView(
    { id: "pageTitle", width: "80%" });

    $.__views.__alloyId667.add($.__views.pageTitle);
    $.__views.__alloyId669 = Ti.UI.createLabel(
    { width: Titanium.UI.SIZE, height: Ti.UI.SIZE, color: "#606060", font: { fontSize: "16dp" }, text: 'Health Info', textAlign: "center", id: "__alloyId669" });

    $.__views.pageTitle.add($.__views.__alloyId669);
  }
  $.__views.menu = Ti.UI.createScrollView(
  { width: Ti.UI.FILL, height: Ti.UI.FILL, contentHeight: Ti.UI.SIZE, contentWidth: Ti.UI.FILL, id: "menu", backgroundColor: "#EBEBEB" });

  $.__views.main.add($.__views.menu);
  exports.destroy = function () {};




  _.extend($, $.__views);


  var args = arguments[0] || {};
  var menus = [{ title: "BLOOD PRESSURE", type: "2", icon: "/images/icons/like.png", measurement: "mmHg", color: "#CE1D1C", fields: [{ name: "Systolic", type: "number", tool: "picker", max_range: 200, min_range: 10, default_value: 120, graph_display: true }, { name: "Diastolic", type: "number", tool: "picker", max_range: 200, min_range: 10, default_value: 80, graph_display: true }, { name: "Pulse Rate", type: "number", tool: "textfield", graph_display: false }, { name: "Medication", type: "string", tool: "picker", options: ["None", "Taken", "Not Taken"], default_value: "None", graph_display: false }, { name: "Remark", type: "string", tool: "remark", graph_display: false }] }, { title: "HEART RATE", type: "3", icon: "/images/icons/like.png", measurement: "Pulse", color: "#CE1D1C", fields: [{ name: "Pulse Rate", type: "number", tool: "picker", max_range: 200, min_range: 10, default_value: 70, graph_display: true }, { name: "Medication", type: "string", tool: "picker", options: ["None", "Taken", "Not Taken"], default_value: "None", graph_display: false }, { name: "Remark", type: "string", tool: "remark", graph_display: false }] }, { title: "BLOOD GLUCOSE", type: "8", icon: "/images/icons/blood-drop.png", measurement: "mg/dL", color: "#CE1D1C", fields: [{ name: "Blood Glucose", type: "number", tool: "picker", max_range: 400, min_range: 40, default_value: 80, graph_display: true }, { name: "Current Status", type: "string", tool: "picker", options: ["None", "Fasting", "After Meals", "Before Meals"], default_value: "None", graph_display: false }, { name: "Medication", type: "string", tool: "picker", options: ["None", "Taken", "Not Taken"], default_value: "None", graph_display: false }, { name: "Insulin", type: "number", tool: "textfield", graph_display: false }, { name: "Remark", type: "string", tool: "remark", graph_display: false }] }, { title: "CHOLESTROL", type: "7", icon: "/images/icons/blood-drop.png", measurement: "mg/dL", color: "#CE1D1C", fields: [{ name: "HDL", type: "number", tool: "picker", max_range: 200, min_range: 0, default_value: 70, graph_display: true }, { name: "LDL", type: "number", tool: "picker", max_range: 300, min_range: 0, default_value: 130, graph_display: true }, { name: "Medication", type: "string", tool: "picker", options: ["None", "Taken", "Not Taken"], default_value: "None", graph_display: false }, { name: "Remark", type: "string", tool: "remark", graph_display: false }] }, { title: "WEIGHT", type: "6", icon: "/images/icons/weight.png", measurement: "KG/Body Fat %", color: "#933ec5", fields: [{ name: "Weight", type: "number", tool: "picker", max_range: 300, min_range: 0, default_value: 70, graph_display: true }, { name: "Body Fat %", type: "number", tool: "picker", max_range: 100, min_range: 0, default_value: 15, graph_display: true }, { name: "Remark", type: "string", tool: "remark", graph_display: false }] }];
  init();

  function init() {
    render_menu();

  }

  function render_menu() {
    var model = Alloy.createCollection("health");
    var latest = model.getLatestByType();
    console.log('latest data');
    console.log(latest);
    var pw = Ti.Platform.displayCaps.platformWidth;
    var ldf = Ti.Platform.displayCaps.logicalDensityFactor;
    var pwidth = false ? pw : parseInt(pw / (ldf || 1), 10);

    var cell_width = Math.floor((pwidth - 15) / 2);
    var odd_counter = 0;
    for (var i = 0; i < menus.length; i++) {
      var found = _.where(latest, { type: menus[i].type });
      var top = Math.floor(i / 2) * 180 + 5;
      var left = odd_counter % 2 ? cell_width + 10 : 5;
      var view_container = $.UI.create("View", { classes: ['vert', 'rounded'], width: cell_width, height: 175, top: top, left: left, backgroundColor: "#ffffff", record: menus[i] });
      var label_title = $.UI.create("Label", { classes: ['wsize', 'hsize', 'h5'], textAlign: "center", top: 10, text: menus[i].title, touchEnabled: false });
      var image_icon = $.UI.create("ImageView", { width: 50, height: 50, top: 10, bottom: 10, image: menus[i].icon, touchEnabled: false });
      var main_title = "";
      if (found.length > 0) {
        for (var j = 0; j < menus[i].fields.length; j++) {
          console.log(found[0]);
          if (menus[i].fields[j].graph_display) {
            main_title += j == 0 ? found[0]['field' + (j + 1)] || 0 : "/" + found[0]['field' + (j + 1)] || 0;
          }
        };
      }
      main_title = main_title == "" ? 0 : main_title;
      console.log(typeof $.menu.children[i] + " typoef $.menu.children[i]");
      if (typeof $.menu.children[i] != "undefined") {
        $.menu.children[i].children[2].text = main_title + " \n" + menus[i].measurement;
      } else {
        var label_latest = $.UI.create("Label", { classes: ['wfill', 'hsize', 'h6'], textAlign: "center", color: menus[i].color, text: main_title + " \n" + menus[i].measurement, touchEnabled: false });
        var button_record = $.UI.create("Button", { classes: ['small_button', 'rounded', 'padding'], borderColor: menus[i].color, color: menus[i].color, width: Ti.UI.FILL, title: "Record", record: menus[i] });
        view_container.add(label_title);
        view_container.add(image_icon);
        view_container.add(label_latest);
        view_container.add(button_record);
        $.menu.add(view_container);
        view_container.addEventListener('click', navToGraph);
        button_record.addEventListener('click', navToAdd);
      }
      odd_counter++;
    };
  }

  function navToGraph(e) {
    console.log(e.source.record);
    nav.navigateWithArgs("myHealth/graph", e.source.record);
  }

  function navToAdd(e) {
    nav.navigateWithArgs("myHealth/add", e.source.record);
  }

  function refresh() {
    var u_id = Ti.App.Properties.getString('u_id') || 0;
    var checker = Alloy.createCollection('updateChecker');
    var isUpdate = checker.getCheckerById("14", u_id);
    var last_updated = "";

    if (isUpdate != "") {
      last_updated = isUpdate.updated;
    }

    API.callByPost({ url: "getHealthDataByUser", params: { u_id: u_id, last_updated: last_updated } }, function (responseText) {
      var model2 = Alloy.createCollection("health");
      var res2 = JSON.parse(responseText);
      var arr2 = res2.data || null;
      model2.saveArray(arr2);
      checker.updateModule(14, "getHealthDataByUser", res2.last_updated, u_id);
      render_graph();
    });
  }

  Ti.App.addEventListener("myHealth:render_menu", render_menu);

  $.win.addEventListener("close", function (e) {
    Ti.App.removeEventListener("myHealth:render_menu", render_menu);
  });

  if ('android' == "android") {
    $.btnBack.addEventListener('click', function () {
      nav.closeWindow($.win);
    });
  }









  _.extend($, exports);
}

module.exports = Controller;