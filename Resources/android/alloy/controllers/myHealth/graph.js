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
  this.__controllerPath = 'myHealth/graph';
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
  { backgroundColor: "#535a74", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, width: Ti.UI.FILL, height: Ti.UI.FILL, title: "MY HEALTH RECORD", id: "win", backButtonTitle: "", navTintColor: "#CE1D1C" });

  $.__views.win && $.addTopLevelView($.__views.win);
  $.__views.main = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.FILL, id: "main", backgroundColor: "#ffffff" });

  $.__views.win.add($.__views.main);
  if (true) {
    $.__views.__alloyId752 = Ti.UI.createView(
    { borderWidth: 0, layout: "horizontal", width: Ti.UI.FILL, height: 50, backgroundColor: "#DEDEDE", id: "__alloyId752" });

    $.__views.main.add($.__views.__alloyId752);
    $.__views.__alloyId753 = Ti.UI.createView(
    { borderWidth: 0, left: 0, width: "10%", id: "__alloyId753" });

    $.__views.__alloyId752.add($.__views.__alloyId753);
    $.__views.btnBack = Ti.UI.createImageView(
    { left: 10, id: "btnBack", width: 25, height: 25, image: "/images/btn-back.png" });

    $.__views.__alloyId753.add($.__views.btnBack);
    $.__views.pageTitle = Ti.UI.createView(
    { borderWidth: 0, id: "pageTitle", width: "80%" });

    $.__views.__alloyId752.add($.__views.pageTitle);
    $.__views.__alloyId754 = Ti.UI.createLabel(
    { width: Titanium.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontSize: "16dp" }, text: 'Health Info', textAlign: "center", id: "__alloyId754" });

    $.__views.pageTitle.add($.__views.__alloyId754);
  }
  $.__views.container = Ti.UI.createScrollView(
  { layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.FILL, contentHeight: Ti.UI.SIZE, contentWidth: Ti.UI.FILL, id: "container", backgroundColor: "#" });

  $.__views.main.add($.__views.container);
  $.__views.day_month = Ti.UI.createView(
  { borderWidth: 0, layout: "horizontal", width: Ti.UI.SIZE, height: Ti.UI.SIZE, borderColor: "#dfe0e4", backgroundColor: "#FFFFFF", borderRadius: "5", top: 10, id: "day_month" });

  $.__views.container.add($.__views.day_month);
  $.__views.__alloyId755 = Ti.UI.createView(
  { borderWidth: 0, width: Ti.UI.SIZE, height: Ti.UI.SIZE, backgroundColor: "#ddd", perior_type: "day", id: "__alloyId755" });

  $.__views.day_month.add($.__views.__alloyId755);
  changeDateSorting ? $.addListener($.__views.__alloyId755, 'click', changeDateSorting) : __defers['$.__views.__alloyId755!click!changeDateSorting'] = true;$.__views.__alloyId756 = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", top: 10, left: 20, right: 20, bottom: 10, font: { fontSize: 14 }, text: 'Day', touchEnabled: false, id: "__alloyId756" });

  $.__views.__alloyId755.add($.__views.__alloyId756);
  $.__views.__alloyId757 = Ti.UI.createView(
  { borderWidth: 0, width: Ti.UI.SIZE, height: Ti.UI.SIZE, perior_type: "month", id: "__alloyId757" });

  $.__views.day_month.add($.__views.__alloyId757);
  changeDateSorting ? $.addListener($.__views.__alloyId757, 'click', changeDateSorting) : __defers['$.__views.__alloyId757!click!changeDateSorting'] = true;$.__views.__alloyId758 = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", top: 10, left: 20, right: 20, bottom: 10, font: { fontSize: 14 }, text: 'Month', touchEnabled: false, id: "__alloyId758" });

  $.__views.__alloyId757.add($.__views.__alloyId758);
  $.__views.__alloyId759 = Ti.UI.createView(
  { borderWidth: 0, width: Ti.UI.FILL, height: Ti.UI.SIZE, top: 10, id: "__alloyId759" });

  $.__views.container.add($.__views.__alloyId759);
  $.__views.__alloyId760 = Ti.UI.createImageView(
  { image: "/images/btn-back.png", left: 10, width: 20, action: "minus", id: "__alloyId760" });

  $.__views.__alloyId759.add($.__views.__alloyId760);
  adjust_date_indicator ? $.addListener($.__views.__alloyId760, 'click', adjust_date_indicator) : __defers['$.__views.__alloyId760!click!adjust_date_indicator'] = true;$.__views.date_indicator = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#111111", font: { fontSize: 18 }, textAlign: "center", left: 40, right: 40, id: "date_indicator" });

  $.__views.__alloyId759.add($.__views.date_indicator);
  $.__views.__alloyId761 = Ti.UI.createImageView(
  { image: "/images/btn-forward.png", right: 10, width: 20, action: "plus", id: "__alloyId761" });

  $.__views.__alloyId759.add($.__views.__alloyId761);
  adjust_date_indicator ? $.addListener($.__views.__alloyId761, 'click', adjust_date_indicator) : __defers['$.__views.__alloyId761!click!adjust_date_indicator'] = true;$.__views.webview = Ti.UI.createWebView(
  { width: Ti.UI.FILL, url: "/html/graph.html", id: "webview", height: 230 });

  $.__views.container.add($.__views.webview);
  $.__views.tbl = Ti.UI.createTableView(
  { id: "tbl" });

  $.__views.container.add($.__views.tbl);
  exports.destroy = function () {};




  _.extend($, $.__views);


  var args = arguments[0] || {};
  var perior_type = "day";
  var moment = require('alloy/moment');
  var model = Alloy.createCollection("health");
  var select_month = moment(new Date()).format("YYYY-MM");
  var select_year = moment(new Date()).format("YYYY");
  var field_graph = [];
  init();

  function init() {
    $.win.title = args.title;
    $.date_indicator.text = moment(select_month).format("MMM YYYY");
    for (var i = 0; i < args.fields.length; i++) {
      if (args.fields[i].graph_display) {
        field_graph.push(args.fields[i]);
      }
    };
    console.log("check here");
    console.log(field_graph);
    refresh({});
  }

  function adjust_date_indicator(e) {
    console.log(e.source.action);
    if (perior_type == "day") {
      select_month = e.source.action == "minus" ? moment(select_month).add(-1, 'M').format("YYYY-MM") : moment(select_month).add(1, 'M').format("YYYY-MM");
    } else {
      select_year = e.source.action == "minus" ? moment(select_year).add(-1, 'Y').format("YYYY") : moment(select_year).add(1, 'Y').format("YYYY");
    }
    $.date_indicator.text = perior_type == "day" ? moment(select_month).format("MMM YYYY") : moment(select_year).format("YYYY");
    refresh({});
  }

  function changeDateSorting(e) {
    var childs = $.day_month.getChildren();
    for (var i = 0; i < childs.length; i++) {
      childs[i].backgroundColor = "#fff";
    };
    e.source.backgroundColor = "#ddd";
    perior_type = e.source.perior_type;
    $.date_indicator.text = perior_type == "day" ? moment(select_month).format("MMM YYYY") : moment(select_year).format("YYYY");
    refresh({});
  }

  function refresh(e) {
    if (typeof e.height != "undefined") {
      console.log(e.height + " inner height");
      $.webview.height = e.height;
    }
    if (perior_type == "day") {
      var data = model.getDataGroupByDay({ date: select_month, type: args.type, select_month: select_month });
    } else {
      var data = model.getDataGroupByMonth({ date: select_year, type: args.type, select_year: select_year });
    }
    var data_arranged = [];
    var temp_graph_arr = [];
    temp_graph_arr.push({ type: "string", name: perior_type });
    for (var l = 0; l < field_graph.length; l++) {
      temp_graph_arr.push({ type: field_graph[l].type, name: field_graph[l].name });
    }
    for (var j = 0; j < data.length; j++) {
      var temp_arr = [];

      temp_arr.push(data[j].day);

      for (var k = 0; k < field_graph.length; k++) {
        temp_arr.push(parseInt(data[j]['field' + (k + 1)]));
      };
      data_arranged.push(temp_arr);
    }
    console.log('data for render graph');
    console.log(data_arranged);
    console.log(temp_graph_arr);
    render_tableview(data);
    Ti.App.fireEvent("graph:load_data", { data: data_arranged, fields: temp_graph_arr, hAxis: perior_type, vAxis: args.measurement });
  }

  function render_tableview(data) {
    var arr = [];
    for (var i = 0; i < data.length; i++) {
      var transformData = transformFunction(data[i]);
      var row = $.UI.create("TableViewRow");
      var view_container = $.UI.create("View", { classes: ['wfill', 'hsize', 'padding', 'vert'] });
      var label_title = $.UI.create("Label", { classes: ['wfill', 'hsize', 'h5'], text: transformData.main_title });
      var label_subtitle = $.UI.create("Label", { classes: ['wfill', 'hsize', 'h6'], text: transformData.sub_title });
      view_container.add(label_title);
      view_container.add(label_subtitle);
      row.add(view_container);
      arr.push(row);
    };
    console.log("what data inside");
    console.log(arr);
    $.tbl.setData(arr);
  }

  function transformFunction(transform) {

    var main_title = "";
    console.log(transform);
    for (var k = 0; k < field_graph.length; k++) {
      main_title += k == 0 ? transform['field' + (k + 1)] : "/" + transform['field' + (k + 1)];
    }
    main_title += " " + args.measurement;
    console.log(main_title);
    transform.main_title = main_title;
    transform.sub_title = moment(transform.date).format("DD-MM-YYYY hh:mm A");
    return transform;
  }

  Ti.App.addEventListener("webview:graph_loaded", refresh);

  $.win.addEventListener("close", function (e) {
    Ti.App.removeEventListener("webview:graph_loaded", refresh);
  });

  if ('android' == "android") {
    $.btnBack.addEventListener('click', function () {
      nav.closeWindow($.win);
    });
  }





  __defers['$.__views.__alloyId755!click!changeDateSorting'] && $.addListener($.__views.__alloyId755, 'click', changeDateSorting);__defers['$.__views.__alloyId757!click!changeDateSorting'] && $.addListener($.__views.__alloyId757, 'click', changeDateSorting);__defers['$.__views.__alloyId760!click!adjust_date_indicator'] && $.addListener($.__views.__alloyId760, 'click', adjust_date_indicator);__defers['$.__views.__alloyId761!click!adjust_date_indicator'] && $.addListener($.__views.__alloyId761, 'click', adjust_date_indicator);



  _.extend($, exports);
}

module.exports = Controller;