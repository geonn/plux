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
  this.__controllerPath = 'more';
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
  { barColor: "transparent", backgroundColor: "#535a74", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, navTintColor: "#CE1D1C", title: "More", id: "win" });

  $.__views["win"] && $.addTopLevelView($.__views["win"]);
  $.__views["__alloyId664"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.FILL, id: "__alloyId664" });

  $.__views["win"].add($.__views["__alloyId664"]);
  if (true) {
    $.__views["__alloyId665"] = Ti.UI.createView(
    { borderWidth: 0, layout: "horizontal", height: 50, width: Ti.UI.FILL, backgroundColor: "#DEDEDE", id: "__alloyId665" });

    $.__views["__alloyId664"].add($.__views["__alloyId665"]);
    $.__views["__alloyId666"] = Ti.UI.createView(
    { borderWidth: 0, left: 0, width: "10%", id: "__alloyId666" });

    $.__views["__alloyId665"].add($.__views["__alloyId666"]);
    $.__views["btnBack"] = Ti.UI.createImageView(
    { left: 10, id: "btnBack", width: 25, height: 25, image: "/images/btn-back.png" });

    $.__views["__alloyId666"].add($.__views["btnBack"]);
    $.__views["pageTitle"] = Ti.UI.createView(
    { borderWidth: 0, id: "pageTitle", width: "90%" });

    $.__views["__alloyId665"].add($.__views["pageTitle"]);
    $.__views["__alloyId667"] = Ti.UI.createLabel(
    { width: Titanium.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial", fontSize: "16dp" }, text: 'More', textAlign: "center", id: "__alloyId667" });

    $.__views["pageTitle"].add($.__views["__alloyId667"]);
  }
  var __alloyId670 = [];$.__views["__alloyId671"] = { properties: { color: "#000", backgroundColor: "#fff", title: "Edit Profile", mod: "profile", id: "__alloyId671" } };__alloyId670.push($.__views["__alloyId671"]);$.__views["__alloyId672"] = { properties: { color: "#000", backgroundColor: "#fff", title: "Change Password", mod: "asp/changePassword", id: "__alloyId672" } };__alloyId670.push($.__views["__alloyId672"]);$.__views["__alloyId673"] = { properties: { color: "#000", backgroundColor: "#fff", title: "Logout", mod: "logout", id: "__alloyId673" } };__alloyId670.push($.__views["__alloyId673"]);$.__views["section"] = Ti.UI.createListSection(
  { id: "section", backgroundColor: "#fff" });

  $.__views["section"].items = __alloyId670;var __alloyId674 = [];__alloyId674.push($.__views["section"]);$.__views["__alloyId668"] = Ti.UI.createListView(
  { sections: __alloyId674, backgroundColor: "#fff", id: "__alloyId668" });

  $.__views["__alloyId664"].add($.__views["__alloyId668"]);
  navTo ? $.addListener($.__views["__alloyId668"], 'itemclick', navTo) : __defers['$.__views["__alloyId668"]!itemclick!navTo'] = true;exports.destroy = function () {};

  // make all IDed elements in $.__views available right on the $ in a
  // controller's internal code. Externally the IDed elements will
  // be accessed with getView().
  _.extend($, $.__views);

  // Controller code directly from the developer's controller file
  var args = arguments[0] || {};
  var corpcode = Ti.App.Properties.getString('corpcode');

  if (corpcode == "IFLP" || corpcode == "IFMY") {
    $.section.insertItemsAt(2, [{ properties: { title: "Exclusion List", mod: "asp/exlusionList" } }]);
  }

  function navTo(e) {
    var target = e.section.items[e.itemIndex].properties.mod;
    var empno = Ti.App.Properties.getString('empno');
    if (target == "asp/changePassword") {
      if (typeof empno != "undefined" && empno != "") {
        Alloy.Globals.nav.navigationWindow("asp/changePassword", 1);
      } else {
        Alloy.Globals.nav.navigationWindow("plux_profile");
      }
    } else if (target == "asp/exlusionList") {
      //Alloy.Globals.nav.navigationWindow("asp/exlusionList", 1);
      openURLPDF({ attachment: "http://plux.freejini.com.my/public/document/Exclusion_List.pdf" });
    } else if (target == "profile") {
      if (typeof empno != "undefined" && empno != "") {
        Alloy.Globals.nav.navigationWindow("asp/editProfile", 1);
      } else {
        Alloy.Globals.nav.navigationWindow("plux_profile");
      }
    } else if (target == "logout") {
      var dialog = Ti.UI.createAlertDialog({
        cancel: 0,
        buttonNames: ['Cancel', 'Confirm'],
        message: 'Would you like to logout?',
        title: 'Logout' });

      dialog.addEventListener('click', function (e) {
        if (e.index === 1) {
          Ti.App.fireEvent('logout');
        }
      });
      dialog.show();
    }
  }

  if ("android" == "android") {
    $.btnBack.addEventListener('click', function () {
      Alloy.Globals.nav.closeWindow($.win);
    });
  }

  function openURLPDF(e) {
    var filename = e.attachment.split("/");
    filename = filename[filename.length - 1];
    var appFile;

    if (true) {
      appFile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, filename);
    } else {
      appFile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, filename);
    }
    var appfilepath = appFile.nativePath;

    //Check if file has been downloaded yet
    if (appFile.exists() === false) {
      var xhr = Ti.Network.createHTTPClient();
      xhr.onload = function () {
        appFile.write(this.responseData);
        viewPDF(appfilepath);
      };
      xhr.onerror = function () {
        alert("Cannot retrieve PDF form web site");
      };
      xhr.timeout = 10000;
      xhr.open("GET", e.attachment);
      xhr.send();

    } else {
      viewPDF(appfilepath);
    }
  }

  function viewPDF(appfilepath) {
    if (true) {
      try {
        Ti.Android.currentActivity.startActivity(Ti.Android.createIntent({
          action: Ti.Android.ACTION_VIEW,
          type: 'application/pdf',
          data: appfilepath }));

      } catch (e) {
        alert('No PDF apps installed!');
      }
    } else {
      docViewer = Ti.UI.iOS.createDocumentViewer({ url: appfilepath });
      docViewer.show();
    }
  }

  // Generated code that must be executed after all UI and
  // controller code. One example deferred event handlers whose
  // functions are not defined until after the controller code
  // is executed.
  __defers['$.__views["__alloyId668"]!itemclick!navTo'] && $.addListener($.__views["__alloyId668"], 'itemclick', navTo);

  // Extend the $ instance with all functions and properties
  // defined on the exports object.
  _.extend($, exports);
}

module.exports = Controller;
//# sourceMappingURL=file:///Users/yikonnlau/Documents/Appcelerator_Studio_Workspace/plux/build/map/Resources/android/alloy/controllers/more.js.map