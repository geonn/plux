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
  this.__controllerPath = '_plux_profile_view';
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
  $.__views["win"] = Ti.UI.createView(
  { borderWidth: 0, id: "win" });

  $.__views["win"] && $.addTopLevelView($.__views["win"]);
  $.__views["addbox"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.SIZE, borderColor: "#dfe0e4", backgroundColor: "#FFFFFF", id: "addbox", zIndex: 10, left: 10, right: 10 });

  $.__views["win"].add($.__views["addbox"]);
  $.__views["__alloyId5"] = Ti.UI.createView(
  { borderWidth: 0, width: Ti.UI.FILL, height: Ti.UI.SIZE, id: "__alloyId5" });

  $.__views["addbox"].add($.__views["__alloyId5"]);
  $.__views["addbox_title"] = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial" }, top: 10, left: 10, right: 10, bottom: 10, text: 'Medication Records', id: "addbox_title", verticalAlign: "center" });

  $.__views["__alloyId5"].add($.__views["addbox_title"]);
  $.__views["__alloyId6"] = Ti.UI.createImageView(
  { height: 40, image: "/images/cross.png", right: 0, id: "__alloyId6" });

  $.__views["__alloyId5"].add($.__views["__alloyId6"]);
  closeBox ? $.addListener($.__views["__alloyId6"], 'click', closeBox) : __defers['$.__views["__alloyId6"]!click!closeBox'] = true;$.__views["box_value"] = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000000", backgroundColor: "#ffffff", top: 10, left: 10, right: 10, bottom: 10, id: "box_value", hintText: "New record" });

  $.__views["addbox"].add($.__views["box_value"]);
  $.__views["__alloyId7"] = Ti.UI.createButton(
  { borderRadius: 5, backgroundColor: "#CC2228", height: 40, color: "#ffffff", width: Ti.UI.FILL, title: 'Add', bottom: 10, id: "__alloyId7" });

  $.__views["addbox"].add($.__views["__alloyId7"]);
  addRecord ? $.addListener($.__views["__alloyId7"], 'click', addRecord) : __defers['$.__views["__alloyId7"]!click!addRecord'] = true;$.__views["__alloyId8"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", height: Ti.UI.FILL, backgroundColor: "#fff", id: "__alloyId8" });

  $.__views["win"].add($.__views["__alloyId8"]);
  $.__views["__alloyId9"] = Ti.UI.createView(
  { borderWidth: 0, height: Titanium.UI.SIZE, width: Titanium.UI.FILL, backgroundColor: "#CE1D1C", id: "__alloyId9" });

  $.__views["__alloyId8"].add($.__views["__alloyId9"]);
  $.__views["__alloyId10"] = Ti.UI.createLabel(
  { width: Titanium.UI.FILL, height: Titanium.UI.SIZE, color: "#ffffff", font: { fontFamily: "Roboto-Regular, arial" }, top: 10, left: 10, right: 10, bottom: 10, textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER, text: 'Personal Information', id: "__alloyId10" });

  $.__views["__alloyId9"].add($.__views["__alloyId10"]);
  $.__views["profile_data"] = Ti.UI.createView(
  { borderWidth: 0, id: "profile_data", layout: "vertical", top: 10, bottom: 10, height: Ti.UI.SIZE });

  $.__views["__alloyId8"].add($.__views["profile_data"]);
  $.__views["__alloyId11"] = Ti.UI.createView(
  { borderWidth: 0, layout: "horizontal", width: Ti.UI.FILL, height: Ti.UI.SIZE, id: "__alloyId11" });

  $.__views["__alloyId8"].add($.__views["__alloyId11"]);
  $.__views["fullname"] = Ti.UI.createLabel(
  { width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#000000", font: { fontFamily: "Roboto-Regular, arial", fontSize: 16 }, top: 10, left: 10, right: 10, bottom: 10, id: "fullname" });

  $.__views["__alloyId11"].add($.__views["fullname"]);
  $.__views["__alloyId12"] = Ti.UI.createView(
  { borderWidth: 0, width: Ti.UI.FILL, height: Ti.UI.SIZE, id: "__alloyId12" });

  $.__views["__alloyId8"].add($.__views["__alloyId12"]);
  $.__views["email"] = Ti.UI.createLabel(
  { width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#000000", font: { fontFamily: "Roboto-Regular, arial", fontSize: 16 }, top: 10, left: 10, right: 10, bottom: 10, id: "email" });

  $.__views["__alloyId12"].add($.__views["email"]);
  $.__views["__alloyId13"] = Ti.UI.createView(
  { borderWidth: 0, width: Ti.UI.FILL, height: Ti.UI.SIZE, id: "__alloyId13" });

  $.__views["__alloyId8"].add($.__views["__alloyId13"]);
  $.__views["last_login"] = Ti.UI.createLabel(
  { width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#000000", font: { fontFamily: "Roboto-Regular, arial", fontSize: 16 }, top: 10, left: 10, right: 10, bottom: 10, id: "last_login" });

  $.__views["__alloyId13"].add($.__views["last_login"]);
  $.__views["__alloyId14"] = Ti.UI.createView(
  { borderWidth: 0, height: Titanium.UI.SIZE, width: Titanium.UI.FILL, backgroundColor: "#CE1D1C", id: "__alloyId14" });

  $.__views["__alloyId8"].add($.__views["__alloyId14"]);
  $.__views["__alloyId15"] = Ti.UI.createLabel(
  { width: Titanium.UI.FILL, height: Titanium.UI.SIZE, color: "#ffffff", font: { fontFamily: "Roboto-Regular, arial" }, top: 10, left: 10, right: 10, bottom: 10, textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER, text: 'My Health Records', id: "__alloyId15" });

  $.__views["__alloyId14"].add($.__views["__alloyId15"]);
  $.__views["__alloyId16"] = Ti.UI.createImageView(
  { width: Ti.UI.SIZE, image: "/images/white-add.png", height: 40, right: 0, id: "__alloyId16" });

  $.__views["__alloyId14"].add($.__views["__alloyId16"]);
  openBox ? $.addListener($.__views["__alloyId16"], 'click', openBox) : __defers['$.__views["__alloyId16"]!click!openBox'] = true;$.__views["my_health"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.FILL, id: "my_health", top: 10, bottom: 10 });

  $.__views["__alloyId8"].add($.__views["my_health"]);
  $.__views["__alloyId17"] = Ti.UI.createView(
  { borderWidth: 0, width: Ti.UI.FILL, height: Ti.UI.SIZE, id: "__alloyId17" });

  $.__views["my_health"].add($.__views["__alloyId17"]);
  $.__views["__alloyId18"] = Ti.UI.createView(
  { borderWidth: 0, top: 10, left: 10, right: 10, bottom: 10, layout: "horizontal", width: Ti.UI.FILL, height: Ti.UI.SIZE, horizontalWrap: false, id: "__alloyId18" });

  $.__views["__alloyId17"].add($.__views["__alloyId18"]);
  $.__views["firstTab"] = Ti.UI.createView(
  { borderWidth: 0, id: "firstTab", tab: 1, height: 40, width: "50%" });

  $.__views["__alloyId18"].add($.__views["firstTab"]);
  switchListing ? $.addListener($.__views["firstTab"], 'click', switchListing) : __defers['$.__views["firstTab"]!click!switchListing'] = true;$.__views["__alloyId19"] = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#CE1D1C", font: { fontFamily: "Roboto-Regular, arial", fontSize: 16 }, text: 'Medication Records', touchEnabled: false, v: "label", id: "__alloyId19" });

  $.__views["firstTab"].add($.__views["__alloyId19"]);
  switchListing ? $.addListener($.__views["__alloyId19"], 'click', switchListing) : __defers['$.__views["__alloyId19"]!click!switchListing'] = true;$.__views["__alloyId20"] = Ti.UI.createImageView(
  { width: Ti.UI.SIZE, v: "label", height: 40, image: "/images/icons/dotted.png", id: "__alloyId20" });

  $.__views["__alloyId18"].add($.__views["__alloyId20"]);
  $.__views["secondTab"] = Ti.UI.createView(
  { borderWidth: 0, tab: 2, id: "secondTab", height: 40, width: "50%" });

  $.__views["__alloyId18"].add($.__views["secondTab"]);
  switchListing ? $.addListener($.__views["secondTab"], 'click', switchListing) : __defers['$.__views["secondTab"]!click!switchListing'] = true;$.__views["__alloyId21"] = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial", fontSize: 16 }, text: 'Allergic History', touchEnabled: false, v: "label", id: "__alloyId21" });

  $.__views["secondTab"].add($.__views["__alloyId21"]);
  switchListing ? $.addListener($.__views["__alloyId21"], 'click', switchListing) : __defers['$.__views["__alloyId21"]!click!switchListing'] = true;$.__views["tblview"] = Ti.UI.createTableView(
  { contentHeight: Ti.UI.SIZE, contentWidth: Ti.UI.FILL, backgroundColor: "#ffffff", width: Ti.UI.FILL, height: Ti.UI.FILL, id: "tblview", separatorColor: "#ebebeb" });

  $.__views["my_health"].add($.__views["tblview"]);
  exports.destroy = function () {};

  // make all IDed elements in $.__views available right on the $ in a
  // controller's internal code. Externally the IDed elements will
  // be accessed with getView().
  _.extend($, $.__views);

  // Controller code directly from the developer's controller file
  var args = arguments[0] || {};
  var loading = Alloy.createController("loading");
  var personal_health_type = "Medication Records"; //Allergic History and Medication Records
  $.fullname.text = "Full Name : " + Ti.App.Properties.getString('fullname') || "";
  $.email.text = "Email : " + Ti.App.Properties.getString('plux_email') || "";
  $.last_login = "Last Login : " + Ti.App.Properties.getString('last_login') || "";

  function init() {
    $.win.add(loading.getView());
    $.addbox.hide();
    refresh(render_personal_health);
  }

  init();

  function render_personal_health(arr) {
    var listing = typeof arr != "undefined" ? arr : args.records; //model.getData(personal_health_type);
    var arr = [];
    if (listing.length <= 0) {
      listing.push({ val: "No records found" });
    }
    for (var i = 0; i < listing.length; i++) {
      var row = $.UI.create("TableViewRow", {
        title: listing[i].val,
        classes: ['wfill', 'hsize'],
        id: listing[i].id });

      arr.push(row);
    };

    $.tblview.setData(arr);
  }

  function refresh(callback) {

    var u_id = Ti.App.Properties.getString('u_id') || 0;
    Alloy.Globals.API.callByPost({ url: "getPersonalInfoRecords", params: { u_id: u_id } }, function (responseText) {
      var res = JSON.parse(responseText);
      var arr = res.data || null;
      callback(arr);
      loading.finish();
    });
  }

  function addRecord() {

    var u_id = Ti.App.Properties.getString('u_id');
    if ($.box_value.value == "") {
      closeBox();
      $.box_value.value = "";
      return;
    }
    loading.start();
    params = {
      u_id: u_id,
      type: personal_health_type,
      val: $.box_value.value };

    Alloy.Globals.API.callByPost({ url: "addUpdateRecords", params: params }, function (responseText) {
      var res = JSON.parse(responseText);
      refresh(render_personal_health);
      closeBox();
      $.box_value.value = "";
      loading.finish();
    });
  }

  function closeBox() {
    $.addbox.hide();
  }

  function openBox() {
    $.addbox.show();
  }

  function switchListing(e) {
    var tab = e.source.tab;
    var text = $.firstTab.children[0];
    var secondtext = $.secondTab.children[0];

    if (tab == 1) {
      personal_health_type = "Medication Records";
      text.color = "#CE1D1C";
      $.secondTab.backgroundColor = "transparent";
      secondtext.color = "#606060";
    } else if (tab == 2) {
      personal_health_type = "Allergic History";
      secondtext.color = "#CE1D1C";
      $.firstTab.backgroundColor = "transparent";
      text.color = "#606060";
    }
    render_personal_health();
    $.addbox_title.text = personal_health_type;
  }

  $.tblview.addEventListener("longpress", function (e) {
    var id = e.rowData.id;
    var dialog = Ti.UI.createAlertDialog({
      cancel: 1,
      buttonNames: ['Confirm', 'Cancel'],
      message: 'Would you like to delete the record?',
      title: 'Delete' });

    dialog.addEventListener('click', function (ex) {
      if (ex.index === ex.source.cancel) {
      } else if (ex.index == 0) {
        var params = {
          id: id,
          status: 2 };

        loading.start();
        Alloy.Globals.API.callByPost({ url: "changeRecordStatus", params: params }, function (responseText) {
          var res = JSON.parse(responseText);
          refresh(render_personal_health);
          closeBox();
          loading.finish();
        });
      }
    });
    dialog.show();
  });

  // Generated code that must be executed after all UI and
  // controller code. One example deferred event handlers whose
  // functions are not defined until after the controller code
  // is executed.
  __defers['$.__views["__alloyId6"]!click!closeBox'] && $.addListener($.__views["__alloyId6"], 'click', closeBox);__defers['$.__views["__alloyId7"]!click!addRecord'] && $.addListener($.__views["__alloyId7"], 'click', addRecord);__defers['$.__views["__alloyId16"]!click!openBox'] && $.addListener($.__views["__alloyId16"], 'click', openBox);__defers['$.__views["firstTab"]!click!switchListing'] && $.addListener($.__views["firstTab"], 'click', switchListing);__defers['$.__views["__alloyId19"]!click!switchListing'] && $.addListener($.__views["__alloyId19"], 'click', switchListing);__defers['$.__views["secondTab"]!click!switchListing'] && $.addListener($.__views["secondTab"], 'click', switchListing);__defers['$.__views["__alloyId21"]!click!switchListing'] && $.addListener($.__views["__alloyId21"], 'click', switchListing);

  // Extend the $ instance with all functions and properties
  // defined on the exports object.
  _.extend($, exports);
}

module.exports = Controller;
//# sourceMappingURL=file://c:\Users\Danial Haikal\Documents\Appcelerator_Studio_Workspace\plux/build/map/Resources\android\alloy\controllers\_plux_profile_view.js.map