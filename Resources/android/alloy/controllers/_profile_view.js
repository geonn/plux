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
  this.__controllerPath = '_profile_view';
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
  $.__views["__alloyId22"] = Ti.UI.createView(
  { borderWidth: 0, width: Ti.UI.FILL, height: Ti.UI.SIZE, id: "__alloyId22" });

  $.__views["addbox"].add($.__views["__alloyId22"]);
  $.__views["addbox_title"] = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial" }, top: 10, left: 10, right: 10, bottom: 10, text: 'Medication Records', id: "addbox_title", verticalAlign: "center" });

  $.__views["__alloyId22"].add($.__views["addbox_title"]);
  $.__views["__alloyId23"] = Ti.UI.createImageView(
  { height: 40, image: "/images/cross.png", right: 0, id: "__alloyId23" });

  $.__views["__alloyId22"].add($.__views["__alloyId23"]);
  closeBox ? $.addListener($.__views["__alloyId23"], 'click', closeBox) : __defers['$.__views["__alloyId23"]!click!closeBox'] = true;$.__views["box_value"] = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000000", backgroundColor: "#ffffff", top: 10, left: 10, right: 10, bottom: 10, id: "box_value", hintText: "New record" });

  $.__views["addbox"].add($.__views["box_value"]);
  $.__views["__alloyId24"] = Ti.UI.createButton(
  { borderRadius: 5, backgroundColor: "#CC2228", height: 40, color: "#ffffff", width: Ti.UI.FILL, title: 'Add', bottom: 10, id: "__alloyId24" });

  $.__views["addbox"].add($.__views["__alloyId24"]);
  addRecord ? $.addListener($.__views["__alloyId24"], 'click', addRecord) : __defers['$.__views["__alloyId24"]!click!addRecord'] = true;$.__views["__alloyId25"] = Ti.UI.createView(
  { borderWidth: 0, backgroundColor: "#fff", top: 0, height: Ti.UI.SIZE, layout: "vertical", id: "__alloyId25" });

  $.__views["win"].add($.__views["__alloyId25"]);
  $.__views["__alloyId26"] = Ti.UI.createView(
  { borderWidth: 0, height: Titanium.UI.SIZE, width: Titanium.UI.FILL, backgroundColor: "#CE1D1C", id: "__alloyId26" });

  $.__views["__alloyId25"].add($.__views["__alloyId26"]);
  $.__views["__alloyId27"] = Ti.UI.createLabel(
  { width: Titanium.UI.FILL, height: Titanium.UI.SIZE, color: "#ffffff", font: { fontFamily: "Roboto-Regular, arial" }, top: 10, left: 10, right: 10, bottom: 10, textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER, text: 'Personal Information', id: "__alloyId27" });

  $.__views["__alloyId26"].add($.__views["__alloyId27"]);
  $.__views["profile_data"] = Ti.UI.createView(
  { borderWidth: 0, id: "profile_data", layout: "vertical", top: 10, bottom: 10, height: Ti.UI.SIZE });

  $.__views["__alloyId25"].add($.__views["profile_data"]);
  $.__views["__alloyId28"] = Ti.UI.createView(
  { borderWidth: 0, height: Titanium.UI.SIZE, width: Titanium.UI.FILL, backgroundColor: "#CE1D1C", id: "__alloyId28" });

  $.__views["__alloyId25"].add($.__views["__alloyId28"]);
  $.__views["__alloyId29"] = Ti.UI.createLabel(
  { width: Titanium.UI.FILL, height: Titanium.UI.SIZE, color: "#ffffff", font: { fontFamily: "Roboto-Regular, arial" }, top: 10, left: 10, right: 10, bottom: 10, textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER, text: 'My Health Records', id: "__alloyId29" });

  $.__views["__alloyId28"].add($.__views["__alloyId29"]);
  $.__views["__alloyId30"] = Ti.UI.createImageView(
  { width: Ti.UI.SIZE, image: "/images/white-add.png", height: 40, right: 0, id: "__alloyId30" });

  $.__views["__alloyId28"].add($.__views["__alloyId30"]);
  openBox ? $.addListener($.__views["__alloyId30"], 'click', openBox) : __defers['$.__views["__alloyId30"]!click!openBox'] = true;$.__views["my_health"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.FILL, id: "my_health", top: 10, bottom: 10 });

  $.__views["__alloyId25"].add($.__views["my_health"]);
  $.__views["__alloyId31"] = Ti.UI.createView(
  { borderWidth: 0, width: Ti.UI.FILL, height: Ti.UI.SIZE, id: "__alloyId31" });

  $.__views["my_health"].add($.__views["__alloyId31"]);
  $.__views["__alloyId32"] = Ti.UI.createView(
  { borderWidth: 0, top: 10, left: 10, right: 10, bottom: 10, layout: "horizontal", width: Ti.UI.FILL, height: Ti.UI.SIZE, horizontalWrap: false, id: "__alloyId32" });

  $.__views["__alloyId31"].add($.__views["__alloyId32"]);
  $.__views["firstTab"] = Ti.UI.createView(
  { borderWidth: 0, id: "firstTab", tab: 1, height: 40, width: "50%" });

  $.__views["__alloyId32"].add($.__views["firstTab"]);
  switchListing ? $.addListener($.__views["firstTab"], 'click', switchListing) : __defers['$.__views["firstTab"]!click!switchListing'] = true;$.__views["__alloyId33"] = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#CE1D1C", font: { fontFamily: "Roboto-Regular, arial", fontSize: 16 }, text: 'Medication Records', v: "label", id: "__alloyId33" });

  $.__views["firstTab"].add($.__views["__alloyId33"]);
  switchListing ? $.addListener($.__views["__alloyId33"], 'click', switchListing) : __defers['$.__views["__alloyId33"]!click!switchListing'] = true;$.__views["__alloyId34"] = Ti.UI.createImageView(
  { width: Ti.UI.SIZE, v: "label", height: 40, image: "/images/icons/dotted.png", id: "__alloyId34" });

  $.__views["__alloyId32"].add($.__views["__alloyId34"]);
  $.__views["secondTab"] = Ti.UI.createView(
  { borderWidth: 0, tab: 2, id: "secondTab", height: 40, width: "50%" });

  $.__views["__alloyId32"].add($.__views["secondTab"]);
  switchListing ? $.addListener($.__views["secondTab"], 'click', switchListing) : __defers['$.__views["secondTab"]!click!switchListing'] = true;$.__views["__alloyId35"] = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial", fontSize: 16 }, text: 'Allergic History', v: "label", id: "__alloyId35" });

  $.__views["secondTab"].add($.__views["__alloyId35"]);
  switchListing ? $.addListener($.__views["__alloyId35"], 'click', switchListing) : __defers['$.__views["__alloyId35"]!click!switchListing'] = true;$.__views["tblview"] = Ti.UI.createTableView(
  { contentHeight: Ti.UI.SIZE, contentWidth: Ti.UI.FILL, backgroundColor: "#ffffff", width: Ti.UI.FILL, height: Ti.UI.FILL, id: "tblview", separatorColor: "#ebebeb" });

  $.__views["my_health"].add($.__views["tblview"]);
  exports.destroy = function () {};

  // make all IDed elements in $.__views available right on the $ in a
  // controller's internal code. Externally the IDed elements will
  // be accessed with getView().
  _.extend($, $.__views);

  // Controller code directly from the developer's controller file
  var args = arguments[0] || {};
  var profile = args.profile_data;
  var model = Alloy.createCollection("personal_info");
  var loading = Alloy.createController("loading");
  var personal_health_type = "Medication Records";

  addField("Corporate Name : ", profile.corpname, $.profile_data);
  addField("Name : ", profile.name, $.profile_data);
  addField("Member No : ", profile.memno, $.profile_data);
  addField("IC : ", profile.icno, $.profile_data);
  addField("Relation : ", profile.relation, $.profile_data);

  //addField("Allergies : ", profile.allergy, $.my_health_records);
  /**
  if(typeof profile.personal_health != "undefined"){
  	addField("Birthday", personal_health['birthDate'], $.my_health);
  	addField("BloodType", personal_health['bloodType'], $.my_health);
  	addField("Gender", personal_health['gender'], $.my_health);
  }
  **/
  function addField(title_text, value_text, view) {
    if (typeof value_text === 'undefined' || value_text == "") {
      return;
    }
    var parent = $.UI.create("View", {
      layout: "horizontal",
      width: Ti.UI.FILL,
      height: Ti.UI.SIZE });


    var title = $.UI.create("Label", {
      width: "100sp",
      top: 0,
      bottom: "10sp",
      height: Ti.UI.SIZE,
      font: {
        fontSize: "14sp" },

      text: title_text,
      color: "#000000",
      textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT });


    var value = $.UI.create("Label", {
      width: "auto",
      top: 0,
      bottom: "10sp",
      left: "10sp",
      font: {
        fontSize: "14sp" },

      text: value_text,
      color: "#000000",
      height: Ti.UI.SIZE });


    Alloy.Globals.common.parent.add(title);
    Alloy.Globals.common.parent.add(value);
    view.add(Alloy.Globals.common.parent);
  }


  function init() {
    $.win.add(loading.getView());
    $.addbox.hide();
    refresh(render_personal_health);
  }

  init();

  function render_personal_health() {
    var listing = model.getData(personal_health_type);
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
    var u_id = Ti.App.Properties.getString('u_id');

    var checker = Alloy.createCollection('updateChecker');
    var isUpdate = checker.getCheckerById("15", u_id);
    var last_updated = "";

    if (isUpdate != "") {
      last_updated = isUpdate.updated;
    }
    loading.start();

    Alloy.Globals.API.callByPost({ url: "getPersonalInfoRecords", params: { last_updated: last_updated, u_id: u_id } }, function (responseText) {

      var res = JSON.parse(responseText);
      var arr = res.data || null;
      model.saveArray(arr);
      checker.updateModule(15, "getPersonalInfoRecords", res.last_updated, u_id);

      callback();
      loading.finish();
    });
  }

  function addRecord() {
    $.box_value.value;
    var u_id = Ti.App.Properties.getString('u_id');
    if ($.box_value.value == "") {
      closeBox();
      return;
    }
    loading.start();
    params = {
      u_id: u_id,
      type: personal_health_type,
      val: $.box_value.value };

    Alloy.Globals.API.callByPost({ url: "addUpdateRecords", params: params }, function (responseText) {
      var res = JSON.parse(responseText);
      model.saveArray(res.data);
      refresh(render_personal_health);
      closeBox();
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
    var tab = Alloy.Globals.common.parent({ name: "tab" }, e.source);
    var text = $.firstTab.children[0];
    var secondtext = $.secondTab.children[0];

    if (tab == 1) {
      personal_health_type = "Medication Records";
      text.color = "#CE1D1C";
      $.secondTab.backgroundColor = "transAlloy.Globals.common.parent";
      secondtext.color = "#606060";
    } else if (tab == 2) {
      personal_health_type = "Allergic History";
      secondtext.color = "#CE1D1C";
      $.firstTab.backgroundColor = "transAlloy.Globals.common.parent";
      text.color = "#606060";
    }
    render_personal_health();
    $.addbox_title.text = personal_health_type;
  }

  // Generated code that must be executed after all UI and
  // controller code. One example deferred event handlers whose
  // functions are not defined until after the controller code
  // is executed.
  __defers['$.__views["__alloyId23"]!click!closeBox'] && $.addListener($.__views["__alloyId23"], 'click', closeBox);__defers['$.__views["__alloyId24"]!click!addRecord'] && $.addListener($.__views["__alloyId24"], 'click', addRecord);__defers['$.__views["__alloyId30"]!click!openBox'] && $.addListener($.__views["__alloyId30"], 'click', openBox);__defers['$.__views["firstTab"]!click!switchListing'] && $.addListener($.__views["firstTab"], 'click', switchListing);__defers['$.__views["__alloyId33"]!click!switchListing'] && $.addListener($.__views["__alloyId33"], 'click', switchListing);__defers['$.__views["secondTab"]!click!switchListing'] && $.addListener($.__views["secondTab"], 'click', switchListing);__defers['$.__views["__alloyId35"]!click!switchListing'] && $.addListener($.__views["__alloyId35"], 'click', switchListing);

  // Extend the $ instance with all functions and properties
  // defined on the exports object.
  _.extend($, exports);
}

module.exports = Controller;
//# sourceMappingURL=file://C:\Users\Danial Haikal\Documents\Appcelerator_Studio_Workspace\plux/build/map/Resources\android\alloy\controllers\_profile_view.js.map