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
  this.__controllerPath = 'parts/search_list';
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
  { barColor: "transparent", backgroundColor: "#535a74", orientationModes: [Ti.UI.PORTRAIT], fullscreen: true, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, navTintColor: "#CE1D1C", id: "win", title: "Search", navBarHidden: false });

  $.__views["win"] && $.addTopLevelView($.__views["win"]);
  exports.destroy = function () {};

  // make all IDed elements in $.__views available right on the $ in a
  // controller's internal code. Externally the IDed elements will
  // be accessed with getView().
  _.extend($, $.__views);

  // Controller code directly from the developer's controller file
  var args = arguments[0] || {};

  var items = [];
  for (var i = 0; i < args.listing.length; i++) {
    if (false) {
      var row = $.UI.create("TableViewRow", { search: args.listing[i].value });
      var view = $.UI.create("View", { classes: ['wfill', 'hsize', 'padding'] });
      var label_content = $.UI.create("Label", { classes: ['wfill', 'hsize', 'h7'], text: args.listing[i].value });
      view.add(label_content);
      row.add(view);
      items.push(row);
    } else {
      items.push({ title: args.listing[i].value, color: "#000000" });
    }
  };
  var tableview = Titanium.UI.createTableView({
    data: items,
    layout: "vertiacl",
    search: Titanium.UI.createSearchBar({
      hintText: args.title + " Search" }),

    filterAttribute: "search",
    backgroundColor: "#ffffff",
    searchAsChild: true,
    zIndex: 100 });


  tableview.addEventListener("click", function (e) {
    args.callback(args.listing[e.index]);
    console.log("please check here");
    console.log(args.click_dun_exit);
    if (!args.click_dun_exit) {
      $.win.close();
    }
    if (typeof args.w != "undefined") {
      args.w.close();
    }
    return;
  });
  $.win.add(tableview);

  // Generated code that must be executed after all UI and
  // controller code. One example deferred event handlers whose
  // functions are not defined until after the controller code
  // is executed.


  // Extend the $ instance with all functions and properties
  // defined on the exports object.
  _.extend($, exports);
}

module.exports = Controller;
//# sourceMappingURL=file://c:\Users\Danial Haikal\Documents\Appcelerator_Studio_Workspace\plux/build/map/Resources\android\alloy\controllers\parts\search_list.js.map