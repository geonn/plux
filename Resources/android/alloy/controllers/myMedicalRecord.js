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
  this.__controllerPath = 'myMedicalRecord';
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
  { backgroundColor: "#535a74", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, width: Ti.UI.FILL, height: Ti.UI.FILL, title: "My Medical Record", id: "win", backButtonTitle: "", navTintColor: "#CE1D1C" });

  $.__views.win && $.addTopLevelView($.__views.win);
  $.__views.__alloyId959 = Ti.UI.createView(
  { borderWidth: 0, id: "__alloyId959" });

  $.__views.__alloyId960 = Ti.UI.createImageView(
  { left: 10, width: 25, height: 20, image: "/images/add.png", id: "__alloyId960" });

  $.__views.__alloyId959.add($.__views.__alloyId960);
  newRecord ? $.addListener($.__views.__alloyId960, 'click', newRecord) : __defers['$.__views.__alloyId960!click!newRecord'] = true;$.__views.win.rightNavButton = $.__views.__alloyId959;$.__views.__alloyId961 = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.FILL, id: "__alloyId961" });

  $.__views.win.add($.__views.__alloyId961);
  if (true) {
    $.__views.__alloyId962 = Ti.UI.createView(
    { borderWidth: 0, layout: "horizontal", height: 50, width: Ti.UI.FILL, backgroundColor: "#DEDEDE", id: "__alloyId962" });

    $.__views.__alloyId961.add($.__views.__alloyId962);
    $.__views.__alloyId963 = Ti.UI.createView(
    { borderWidth: 0, left: 0, width: "20%", id: "__alloyId963" });

    $.__views.__alloyId962.add($.__views.__alloyId963);
    $.__views.btnBack = Ti.UI.createImageView(
    { left: 10, id: "btnBack", width: 25, height: 25, image: "/images/btn-back.png" });

    $.__views.__alloyId963.add($.__views.btnBack);
    $.__views.__alloyId964 = Ti.UI.createView(
    { borderWidth: 0, width: "60%", id: "__alloyId964" });

    $.__views.__alloyId962.add($.__views.__alloyId964);
    $.__views.pageTitle = Ti.UI.createLabel(
    { width: Titanium.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontSize: "16dp" }, text: 'My Medical Record', id: "pageTitle", textAlign: "center" });

    $.__views.__alloyId964.add($.__views.pageTitle);
    $.__views.__alloyId965 = Ti.UI.createView(
    { borderWidth: 0, left: 0, width: "20%", id: "__alloyId965" });

    $.__views.__alloyId962.add($.__views.__alloyId965);
    $.__views.newRecord = Ti.UI.createImageView(
    { left: 10, id: "newRecord", width: 25, height: 20, image: "/images/add.png" });

    $.__views.__alloyId965.add($.__views.newRecord);
    newRecord ? $.addListener($.__views.newRecord, 'click', newRecord) : __defers['$.__views.newRecord!click!newRecord'] = true;}
  $.__views.listing = Ti.UI.createScrollView(
  { layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.FILL, contentHeight: Ti.UI.SIZE, contentWidth: Ti.UI.FILL, id: "listing" });

  $.__views.__alloyId961.add($.__views.listing);
  $.__views.mask = Ti.UI.createView(
  { borderWidth: 0, width: Ti.UI.FILL, height: Ti.UI.FILL, id: "mask", backgroundColor: "#90000000", zIndex: 2 });

  $.__views.win.add($.__views.mask);
  closeBox ? $.addListener($.__views.mask, 'click', closeBox) : __defers['$.__views.mask!click!closeBox'] = true;exports.destroy = function () {};




  _.extend($, $.__views);


  var args = arguments[0] || {};
  var medicalAttachmentModel = Alloy.createCollection('medicalAttachment');
  var loading = Alloy.createController("loading");
  var u_id = Ti.App.Properties.getString('u_id');

  function newRecord() {
    nav.navigateWithArgs("addMedicalRecord");










  }

  function render_listing(data) {
    $.listing.removeAllChildren();
    for (var i = 0; i < data.length; i++) {
      var left_indicator_bg_color = "#55a939";
      var row = $.UI.create("View", { classes: ['wfill', 'padding', 'hsize', 'rounded'], bottom: 0, backgroundColor: left_indicator_bg_color, record: data[i] });
      var view_container = $.UI.create("View", { classes: ['wfill', 'hsize', 'vert'], touchEnabled: false, backgroundColor: "#fff", left: 5 });
      var view_container_bottom = $.UI.create("View", { classes: ['wfill', 'hsize'], touchEnabled: false });
      var view_left_content = $.UI.create("View", { classes: ['hsize', 'vert'], touchEnabled: false, width: "60%", left: 10, bottom: 10 });
      var label_title = $.UI.create("Label", { classes: ['wfill', 'hsize', 'h6'], left: 10, top: 10, touchEnabled: false, text: "TITLE" });
      var label_title_value = $.UI.create("Label", { classes: ['wfill', 'hsize', 'h6', 'bold'], left: 10, touchEnabled: false, minimumFontSize: 10, text: data[i].title });
      view_container.add(label_title);
      view_container.add(label_title_value);

      var label_category = $.UI.create("Label", { classes: ['wfill', 'hsize', 'h6'], touchEnabled: false, top: 5, text: "CATEGORY" });
      var label_category_value = $.UI.create("Label", { classes: ['wfill', 'hsize', 'h6', 'bold'], touchEnabled: false, minimumFontSize: 10, text: data[i].category });
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

      var delete_button = $.UI.create("Label", { classes: ['h5'], text: "X", top: 5, right: 5, width: 20, height: 20, bubbleParent: false });
      row.add(delete_button);

      delete_button.addEventListener("click", deleteRecord);
      row.addEventListener("click", openAttachment);
      $.listing.add(row);
    };
  }

  function openAttachment(e) {
    console.log(e.source.record);
    var file_format = e.source.record.attachment.substr(-3);
    if (file_format == "pdf") {
      openURLPDF(e.source.record);
    } else {
      $.mask.show();
      var html = "<html><head><meta name='viewport' content='initial-scale=1.0, width=device-width, minimum-scale=1.0, maximum-scale=2.0, user-scalable=yes' /></head><body><img width='100%' height='auto' src='" + e.source.record.attachment + "'/></body></html>";
      if (false) {
        var webview = $.UI.create("WebView", { backgroundColor: "#000", zIndex: 12, classes: ['wfill', 'hsize'], url: e.source.record.attachment });
      } else {
        var webview = $.UI.create("WebView", { backgroundColor: "#000", zIndex: 12, classes: ['wfill', 'hsize'], html: html });
      }
      $.win.add(webview);
    }
  }

  function openURLPDF(e) {
    loading.start();
    var filename = e.attachment.split("/");
    filename = filename[filename.length - 1];
    console.log(filename);
    var appFile;

    if (true) {
      appFile = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, filename);
    } else {
      appFile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, filename);
    }
    var appfilepath = appFile.nativePath;


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
        Ti.API.info('error trying to launch activity, e = ' + e);
        alert('No PDF apps installed!');
      }
    } else {
      docViewer = Ti.UI.iOS.createDocumentViewer({ url: appfilepath });
      docViewer.show();
    }
    loading.finish();
  }

  function deleteRecord(e) {

    console.log(e.source.parent.record);

    API.callByPost({ url: "changeMedicalRecord", new: true, domain: "FREEJINI_DOMAIN", params: { id: e.source.parent.record.id, status: 2 } }, function (responseText) {
      var res = JSON.parse(responseText);
      console.log(res);
      refresh();
    });
  }

  function closeBox() {
    $.mask.hide();
    $.win.remove($.win.children[$.win.children.length - 1]);
  }

  function refresh() {
    loading.start();

    API.callByPost({ url: "getMedicalAttachmentList", new: true, domain: "FREEJINI_DOMAIN", params: { u_id: u_id } }, function (responseText) {
      var res = JSON.parse(responseText);
      var arr = res.data || [];
      console.log(arr);
      render_listing(arr);
      loading.finish();













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
    console.log("window close");
  });





  __defers['$.__views.__alloyId960!click!newRecord'] && $.addListener($.__views.__alloyId960, 'click', newRecord);if (true) {
    __defers['$.__views.newRecord!click!newRecord'] && $.addListener($.__views.newRecord, 'click', newRecord);}
  __defers['$.__views.mask!click!closeBox'] && $.addListener($.__views.mask, 'click', closeBox);



  _.extend($, exports);
}

module.exports = Controller;