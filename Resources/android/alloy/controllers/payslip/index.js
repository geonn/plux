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
  this.__controllerPath = 'payslip/index';
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
  { barColor: "transparent", backgroundColor: "#535a74", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, width: Ti.UI.FILL, height: Ti.UI.FILL, title: "Payslip", id: "win", backButtonTitle: "", navTintColor: "#CE1D1C" });

  $.__views["win"] && $.addTopLevelView($.__views["win"]);
  $.__views["__alloyId708"] = Ti.UI.createView(
  { borderWidth: 0, id: "__alloyId708" });

  $.__views["__alloyId709"] = Ti.UI.createImageView(
  { left: 10, width: 25, height: 20, image: "/images/add.png", id: "__alloyId709" });

  $.__views["__alloyId708"].add($.__views["__alloyId709"]);
  newRecord ? $.addListener($.__views["__alloyId709"], 'click', newRecord) : __defers['$.__views["__alloyId709"]!click!newRecord'] = true;$.__views["win"].rightNavButton = $.__views["__alloyId708"];$.__views["__alloyId710"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.FILL, id: "__alloyId710" });

  $.__views["win"].add($.__views["__alloyId710"]);
  if (true) {
    $.__views["__alloyId711"] = Ti.UI.createView(
    { borderWidth: 0, layout: "horizontal", height: 50, width: Ti.UI.FILL, backgroundColor: "#DEDEDE", id: "__alloyId711" });

    $.__views["__alloyId710"].add($.__views["__alloyId711"]);
    $.__views["__alloyId712"] = Ti.UI.createView(
    { borderWidth: 0, left: 0, width: "20%", id: "__alloyId712" });

    $.__views["__alloyId711"].add($.__views["__alloyId712"]);
    $.__views["btnBack"] = Ti.UI.createImageView(
    { left: 10, id: "btnBack", width: 25, height: 25, image: "/images/btn-back.png" });

    $.__views["__alloyId712"].add($.__views["btnBack"]);
    $.__views["__alloyId713"] = Ti.UI.createView(
    { borderWidth: 0, width: "60%", id: "__alloyId713" });

    $.__views["__alloyId711"].add($.__views["__alloyId713"]);
    $.__views["pageTitle"] = Ti.UI.createLabel(
    { width: Titanium.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial", fontSize: "16dp" }, text: 'Payslip', id: "pageTitle", textAlign: "center" });

    $.__views["__alloyId713"].add($.__views["pageTitle"]);
    $.__views["__alloyId714"] = Ti.UI.createView(
    { borderWidth: 0, left: 0, width: "20%", id: "__alloyId714" });

    $.__views["__alloyId711"].add($.__views["__alloyId714"]);
    $.__views["newRecord"] = Ti.UI.createImageView(
    { left: 10, id: "newRecord", width: 25, height: 20, image: "/images/add.png" });

    $.__views["__alloyId714"].add($.__views["newRecord"]);
    newRecord ? $.addListener($.__views["newRecord"], 'click', newRecord) : __defers['$.__views["newRecord"]!click!newRecord'] = true;}
  $.__views["listing"] = Ti.UI.createScrollView(
  { layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.FILL, contentHeight: Ti.UI.SIZE, contentWidth: Ti.UI.FILL, id: "listing" });

  $.__views["__alloyId710"].add($.__views["listing"]);
  $.__views["mask"] = Ti.UI.createView(
  { borderWidth: 0, width: Ti.UI.FILL, height: Ti.UI.FILL, id: "mask", backgroundColor: "#90000000", zIndex: 2 });

  $.__views["win"].add($.__views["mask"]);
  closeBox ? $.addListener($.__views["mask"], 'click', closeBox) : __defers['$.__views["mask"]!click!closeBox'] = true;exports.destroy = function () {};

  // make all IDed elements in $.__views available right on the $ in a
  // controller's internal code. Externally the IDed elements will
  // be accessed with getView().
  _.extend($, $.__views);

  // Controller code directly from the developer's controller file
  var args = arguments[0] || {};
  var loading = Alloy.createController("loading");
  var u_id = Ti.App.Properties.getString('u_id');

  function newRecord() {
    Alloy.Globals.nav.navigateWithArgs("addMedicalRecord");
    /*
                                                                                                                    loading.start();
                                                                                                                    Alloy.Globals.API.callByPost({url: "addUpdateMedicalRecord", params:{title: "untitled - "+ Alloy.Globals.common.now(), u_id: u_id}}, function(responseText){
                                                                                                                    var model = Alloy.createCollection("medicalRecordsV2");
                                                                                                                    var res = JSON.parse(responseText);
                                                                                                                    var arr = res.data || null;
                                                                                                                    model.saveArray(arr);
                                                                                                                    loading.finish();
                                                                                                                    Alloy.Globals.nav.navigateWithArgs("editMedical", {id: arr[0].id}); 
                                                                                                                    });*/
  }

  function render_listing(data) {
    $.listing.removeAllChildren();
    for (var i = 0; i < data.length; i++) {
      var left_indicator_bg_color = "#55a939";
      data[i]['url'] = data[i]['img_path'][0];
      console.log(data[i]);
      var row = $.UI.create("View", { classes: ['wfill', 'padding', 'hsize', 'rounded'], bottom: 0, backgroundColor: left_indicator_bg_color, record: data[i] });
      var view_container = $.UI.create("View", { classes: ['wfill', 'hsize', 'vert'], touchEnabled: false, backgroundColor: "#fff", left: 5 });
      var view_container_bottom = $.UI.create("View", { classes: ['wfill', 'hsize'], touchEnabled: false });
      var view_left_content = $.UI.create("View", { classes: ['hsize', 'vert'], touchEnabled: false, width: "60%", left: 10, bottom: 10 });
      var label_title = $.UI.create("Label", { classes: ['wfill', 'hsize', 'h6'], left: 10, top: 10, touchEnabled: false, text: "TITLE" });
      var label_title_value = $.UI.create("Label", { classes: ['wfill', 'hsize', 'h6', 'bold'], left: 10, touchEnabled: false, minimumFontSize: 10, text: data[i].month + "/" + data[i].year });
      view_container.add(label_title);
      view_container.add(label_title_value);

      var label_category = $.UI.create("Label", { classes: ['wfill', 'hsize', 'h6'], touchEnabled: false, top: 5, text: "TYPE" });
      var label_category_value = $.UI.create("Label", { classes: ['wfill', 'hsize', 'h6', 'bold'], touchEnabled: false, minimumFontSize: 10, text: "WAGES" });
      view_left_content.add(label_category);
      view_left_content.add(label_category_value);

      var view_right_container = $.UI.create("View", { classes: ['hsize', 'vert'], touchEnabled: false, width: "40%", right: 10, bottom: 10 });
      var label_updated = $.UI.create("Label", { classes: ['wfill', 'hsize', 'h6'], touchEnabled: false, top: 5, text: "DATE" });
      var label_updated_value = $.UI.create("Label", { classes: ['wfill', 'hsize', 'h6', 'bold'], touchEnabled: false, minimumFontSize: 10, text: data[i].updated });
      view_right_container.add(label_updated);
      view_right_container.add(label_updated_value);

      view_container_bottom.add(view_right_container);
      view_container_bottom.add(view_left_content);
      view_container.add(view_container_bottom);
      row.add(view_container);

      //var delete_button = $.UI.create("Label", {classes:['h5'], text: "X", top: 5, right: 5, width: 20, height: 20, bubbleParent: false});
      //row.add(delete_button);

      //delete_button.addEventListener("click", deleteRecord);
      row.addEventListener("click", recordClicked);
      $.listing.add(row);
    };
  }

  function recordClicked(e) {
    if (typeof e.source.record.validation_code != "undefined" && e.source.record.validation_code != "" && e.source.record.category == "Lab report") {
      keyInPin(e.source.record.validation_code, e);
    } else {
      openAttachment(e);
    }
  }

  function keyInPin(ic, ex) {
    var view = $.UI.create("View", { classes: ['wfill', 'hsize', 'vert'], left: 10, right: 10, zIndex: 9, backgroundColor: "#ccc" });
    var text = $.UI.create("Label", { classes: ['wfill', 'hsize', 'h6', 'padding'], text: "Please key in your NRIC/Passport No. to open this file." });
    var textfield = $.UI.create("TextField", { classes: ['wfill', 'padding'], top: 0, height: 42 });
    var ok_button = $.UI.create("Button", { classes: ['wfill', "padding"], borderRadius: 0, top: 0, bottom: 10, height: 50, title: "Ok" });
    var mask = $.UI.create("View", {
      zIndex: 8,
      classes: ['wfill', 'hfill'],
      backgroundColor: "#80000000" });

    mask.addEventListener("click", function () {
      $.win.remove(mask);
      $.win.remove(view);
    });
    ok_button.addEventListener("click", function (e) {
      if (textfield.value == ic) {
        openAttachment(ex);
      } else {
        alert("NRIC/Passport No. does not match");
      }
      $.win.remove(mask);
      $.win.remove(view);
    });
    view.add(text);
    view.add(textfield);
    view.add(ok_button);
    $.win.add(mask);
    $.win.add(view);
  }

  function openAttachment(e) {
    console.log(e.source.record);
    var file_format = e.source.record.url.substr(-3);
    if (file_format == "pdf" || file_format == "PDF") {
      openURLPDF(e.source.record);
    } else {
      var html = "<img width='100%' height='auto' src='" + e.source.record.url + "'/>";
      if (false) {
        Alloy.Globals.nav.navigationWindow("webview", "", "", { url: e.source.record.url, title: e.source.record.category });
        //var webview = $.UI.create("WebView", {backgroundColor: "#000",  zIndex: 12, classes:['wfill','hsize'], url: e.source.record.url});
      } else {
        Alloy.Globals.nav.navigationWindow("webview", "", "", { content: html, title: e.source.record.category });
        //var webview = $.UI.create("WebView", {backgroundColor: "#000",  zIndex: 12, classes:['wfill','hsize'], html: html});
      }
      //$.win.add(webview);   
    }
  }

  function openURLPDF(e) {
    loading.start();
    var filename = e.url.split("/");
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
      xhr.open("GET", e.url);
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
    loading.finish();
  }

  var message_popup = false;
  function popup(e) {
    var dialog = Ti.UI.createAlertDialog({
      cancel: 1,
      buttonNames: ['Cancel', 'OK'],
      message: e.message,
      title: e.title });

    dialog.addEventListener('click', function (ex) {
      if (ex.index === 1) {
        e.callback();
      }
      message_popup = false;
    });
    if (!message_popup) {
      dialog.show();
      message_popup = true;
    }
  }

  function deleteRecord(e) {

    popup({ title: "Delete", message: "Are you sure to delete this record?", callback: function () {
        Alloy.Globals.API.callByPost({ url: "changeMedicalRecord", new: true, domain: "FREEJINI_DOMAIN", params: { id: e.source.parent.record.id, status: 2 } }, function (responseText) {
          var res = JSON.parse(responseText);
          refresh();
        });
      } });
  }

  function closeBox() {
    $.mask.hide();
    $.win.remove($.win.children[$.win.children.length - 1]);
  }

  function refresh() {
    loading.start();

    Alloy.Globals.API.callByPost({ url: "getPayslipList", new: true, domain: "FREEJINI_DOMAIN", params: { u_id: u_id } }, function (responseText) {
      var res = JSON.parse(responseText);
      var arr = res.data || [];
      console.log(responseText);
      render_listing(arr);
      loading.finish();
      /*var model = Alloy.createCollection("medicalRecordsV2");
                                          
                                          model.saveArray(arr);
                                          
                                          Alloy.Globals.API.callByPost({url: "getMedicalAttachment", params:{u_id: u_id}}, function(responseText){
                                          	var model2 = Alloy.createCollection("medicalAttachmentV2");
                                          	var res2 = JSON.parse(responseText);
                                          	var arr2 = res2.data || null;
                                          	model2.saveArray(arr2);
                                          	
                                          	
                                          	loading.finish();
                                          });*/
    });
  }

  function init() {
    $.win.add(loading.getView());
    refresh();

    $.mask.hide();
  }

  init();

  if (true) {
    $.btnBack.addEventListener('click', function () {
      $.win.close();
    });
  }

  Ti.App.addEventListener('myMedicalRecord:refresh', refresh);

  $.win.addEventListener("close", function () {
    Ti.App.removeEventListener('myMedicalRecord:refresh', refresh);
    $.destroy();
  });

  // Generated code that must be executed after all UI and
  // controller code. One example deferred event handlers whose
  // functions are not defined until after the controller code
  // is executed.
  __defers['$.__views["__alloyId709"]!click!newRecord'] && $.addListener($.__views["__alloyId709"], 'click', newRecord);if (true) {
    __defers['$.__views["newRecord"]!click!newRecord'] && $.addListener($.__views["newRecord"], 'click', newRecord);}
  __defers['$.__views["mask"]!click!closeBox'] && $.addListener($.__views["mask"], 'click', closeBox);

  // Extend the $ instance with all functions and properties
  // defined on the exports object.
  _.extend($, exports);
}

module.exports = Controller;
//# sourceMappingURL=file://c:\Users\DanialHaikal\Documents\Appcelerator_Studio_Workspace\plux/build/map/Resources\android\alloy\controllers\payslip\index.js.map