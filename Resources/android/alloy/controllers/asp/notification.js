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
  this.__controllerPath = 'asp/notification';
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
  { backgroundColor: "#535a74", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, title: "My Notification", id: "win", backButtonTitle: "", navTintColor: "#CE1D1C" });

  $.__views.win && $.addTopLevelView($.__views.win);
  $.__views.__alloyId437 = Ti.UI.createView(
  { borderWidth: 0, id: "__alloyId437" });

  $.__views.win.add($.__views.__alloyId437);
  $.__views.aView = Ti.UI.createView(
  { borderWidth: 0, id: "aView", height: Ti.UI.SIZE, top: 0, layout: "vertical" });

  $.__views.__alloyId437.add($.__views.aView);
  if (true) {
    $.__views.__alloyId438 = Ti.UI.createView(
    { borderWidth: 0, layout: "horizontal", height: 50, width: Ti.UI.FILL, backgroundColor: "#DEDEDE", id: "__alloyId438" });

    $.__views.aView.add($.__views.__alloyId438);
    $.__views.__alloyId439 = Ti.UI.createView(
    { borderWidth: 0, left: 0, width: "20%", id: "__alloyId439" });

    $.__views.__alloyId438.add($.__views.__alloyId439);
    $.__views.btnBack = Ti.UI.createImageView(
    { left: 10, id: "btnBack", width: 25, height: 25, image: "/images/btn-back.png" });

    $.__views.__alloyId439.add($.__views.btnBack);
    $.__views.__alloyId440 = Ti.UI.createView(
    { borderWidth: 0, width: "60%", id: "__alloyId440" });

    $.__views.__alloyId438.add($.__views.__alloyId440);
    $.__views.pageTitle = Ti.UI.createLabel(
    { width: Titanium.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontSize: "16dp" }, text: 'My Notification', id: "pageTitle", textAlign: "center" });

    $.__views.__alloyId440.add($.__views.pageTitle);
  }
  $.__views.recordTable = Ti.UI.createTableView(
  { width: "100%", height: Ti.UI.FILL, id: "recordTable", top: 0, separatorColor: "#375540" });

  $.__views.aView.add($.__views.recordTable);
  $.__views.bigView = Ti.UI.createScrollView(
  { id: "bigView", zIndex: 99, height: Ti.UI.SIZE, layout: "vertical", backgroundColor: "#ffffff", opacity: 0.8, bottom: 0, width: "80%", visible: false });

  $.__views.__alloyId437.add($.__views.bigView);
  exports.destroy = function () {};




  _.extend($, $.__views);


  var args = arguments[0] || {};
  var id = args.id || "";
  var notificationModel = Alloy.createCollection('notificationV2');
  var PDF = require('pdf');
  var notificationList;
  var u_id = Ti.App.Properties.getString('u_id');

  var loading = Alloy.createController('loading');
  init();

  function init() {
    $.win.add(loading.getView());
    loading.start();

    displayList();

  }

  function syncFromServer() {
    var checker = Alloy.createCollection('updateChecker');
    var isUpdate = checker.getCheckerById("2");
    var last_updated = "";

    if (isUpdate != "") {
      last_updated = isUpdate.updated;
    }
    var param = {
      "member_no": memno,
      "last_updated": last_updated };


    API.callByPost({ url: "getNotificationUrl", params: param }, function (responseText) {
      var res = JSON.parse(responseText);
      if (res.status == "success") {
        var record = res.data;
        if (record.length > 0) {
          record.forEach(function (entry) {
            var param = {
              "id": entry.id || "",
              "member_no": entry.member_no || "",
              "subject": entry.subject || "",
              "message": entry.message || "",
              "status": entry.status || 1,
              "url": entry.url || "",
              "isRead": "0",
              "status": entry.status || "",
              "expired": entry.expired || "",
              "detail": entry.detail || "",
              "created": entry.created,
              "updated": entry.updated };

            notificationModel.addData(param);
          });
          checker.updateModule("2", "notificationList", res.last_updated);
          displayList();
        }
      }
    });
  }

  function displayList() {
    notificationList = notificationModel.getList({ u_id: u_id });
    var data = [];
    $.recordTable.setData(data);
    var counter = 0;
    if (notificationList.length < 1) {
      loading.finish();
    } else {
      notificationList.forEach(function (entry) {
        console.log(entry.is_read + " entry.is_read");
        var unread_bg = entry.is_read == 1 ? "#ffffff" : "#cccccc";
        console.log(unread_bg);
        var row = $.UI.create("TableViewRow", { classes: ['hsize', 'wfill'], record: entry, backgroundSelectedColor: "#FFE1E1", backgroundColor: unread_bg });
        var contentView = $.UI.create('View', { classes: ['vert', 'hsize', 'wfill', 'padding'], touchEnabled: false });
        var label_subject = $.UI.create("Label", { classes: ['themeColor', 'wfill', 'h5', 'bold', 'hsize'], maxLines: 3, touchEnabled: false, text: entry.subject || "" });
        var label_message = $.UI.create("Label", { classes: ['h6', 'wfill', 'hsize'], maxLines: 3, touchEnabled: false, text: entry.content || "" });
        var updated = entry.updated;
        updated = updated.replace("  ", " ");
        var label_updated_time = $.UI.create("Label", { classes: ['themeColor', 'wfill', 'h6', 'hsize'], touchEnabled: false, text: "Last Updated : " + monthFormat(updated) });
        contentView.add(label_subject);
        contentView.add(label_message);
        contentView.add(label_updated_time);


        row.add(contentView);
        row.addEventListener("click", function (e) {
          var source = e.source.record;
          e.source.backgroundColor = "#ffffff";
          console.log(source);
          notificationModel.setRead(e.source.record.id);
          nav.navigationWindow(source.target, "", "", source);
        });











        data.push(row);
      });

      $.recordTable.setData(data);
    }
    loading.finish();
  }

  function loadHTML(html) {

    var htmlText = "<style>body{font-family:arial;font-size:14px;color:#606060;} a {text-decoration:none;color:#CE1D1C}</style><body>" + decodeURIComponent(html) + "</body>";
    htmlText = htmlText.replace(/(?:\r\n|\r|\n)/g, '<br />');

    nav.navigateWithArgs("webview", {
      html: htmlText });

  }

  function viewDetails(msg) {

    downloadBrochure(msg);

  }

  if ('android' == "android") {
    $.btnBack.addEventListener('click', function () {
      nav.closeWindow($.win);
    });
  }

  Ti.App.addEventListener('displayRecords', displayList);

  $.win.addEventListener("close", function () {
    $.destroy();
    Ti.App.fireEvent("updateNotification", { target: "notification", model: "notificationV2" });
    Ti.App.removeEventListener('displayRecords', displayList);
  });

  var isDownloading = "0";
  var isDownloadLbl = "0";


  function downloadBrochure(content) {

    var indView = Ti.UI.createView({
      height: 100,
      layout: "vertical",
      backgroundColor: "#ffffff",
      bottom: 5,
      width: Ti.UI.SIZE });

    if (isDownloading == "1") {
      var label = Ti.UI.createLabel({
        color: '#CE1D1C',
        font: { fontSize: 10, fontWeight: "bold" },
        text: 'Please wait until current downloading is done.',
        bottom: 10,
        width: "100%",
        height: 10,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER });


      if (isDownloadLbl == "0") {
        $.bigView.add(label);

        setTimeout(function () {
          isDownloadLbl = "0";
          $.bigView.remove(label);
        }, 3000);
      }
      isDownloadLbl = "1";
      return false;
    }
    isDownloading = "1";
    var ind = Titanium.UI.createProgressBar({
      width: "90%",
      height: 50,
      min: 0,
      max: 1,
      value: 0,
      top: 5,
      message: 'Downloading ' + content.title + '...',
      font: { fontSize: 12 },
      color: '#CE1D1C' });


    var label = Ti.UI.createLabel({
      color: '#CE1D1C',
      font: { fontSize: 14, fontWeight: "bold" },
      text: '0%',
      top: 0,
      width: "100%",
      height: 30,
      textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER });


    if (content.isDownloaded == "1") {
      indView.remove(ind);
      indView.remove(label);
      $.bigView.setVisible(false);
    } else {
      ind.show();
      indView.add(ind);
      indView.add(label);
      $.bigView.add(indView);
      $.bigView.setVisible(true);
    }

    PDF.createPdf(content.url, true, ind, label, indView, function (err, file, base, url) {
      if (err) {
        alert(err);
      } else {
        isDownloading = "0";

        indView.hide();
        $.bigView.remove(indView);

        if ('android' == "android") {
          console.log("file return : " + file.getNativePath());
          PDF.android_launch(file);
        } else {

          var myModal = Ti.UI.createWindow({
            title: 'Read PDF',
            backgroundColor: 'transparent',
            fullscreen: true });

          var leftBtn = Ti.UI.createButton({
            title: "Close",
            color: "#CE1D1C",
            left: 15 });

          var wrapperView = Ti.UI.createView({
            layout: "vertical",
            height: Ti.UI.SIZE });


          var topView = Ti.UI.createView({
            backgroundColor: '#EEEEEE',
            top: 0,
            height: 40 });

          var containerView = Ti.UI.createView({
            height: Ti.UI.SIZE,
            width: Ti.UI.FILL,
            backgroundColor: 'transparent' });

          var webview = Ti.UI.createWebView({
            data: file.read(),
            height: Ti.UI.FILL,
            width: Ti.UI.FILL,
            backgroundColor: "#ffffff",
            bottom: 10 });

          if (content.url != "") {
            var rightBtn = Ti.UI.createButton({
              title: "Delete",
              color: "#CE1D1C",
              right: 15 });


            rightBtn.addEventListener('click', function (rx) {
              var dialog = Ti.UI.createAlertDialog({
                cancel: 0,
                buttonNames: ['Cancel', 'Confirm'],
                message: 'Are you sure want to delete?',
                title: 'Message' });

              dialog.addEventListener('click', function (e) {
                if (e.index === e.source.cancel) {

                }
                if (e.index === 1) {
                  var param = {
                    "status": 2,
                    "id": content.source };

                  console.log(param);
                  API.callByPost({ url: "deleteNotification", params: param }, function (responseText) {
                    var res = JSON.parse(responseText);
                    if (res.status == "success") {
                      notificationModel.update_status(param);
                      displayList();
                      myModal.close({ animated: true });
                    }
                  });
                }
              });
              dialog.show();
            });
            topView.add(rightBtn);
          }
          containerView.add(webview);
          topView.add(leftBtn);
          wrapperView.add(topView);
          wrapperView.add(containerView);
          myModal.add(wrapperView);
          myModal.open({
            modal: true });

          leftBtn.addEventListener('click', function (ex) {
            myModal.close({ animated: true });
          });
        }
      }
    });

  }

  $.win.addEventListener("close", function () {
    Ti.App.removeEventListener('displayRecords', displayList);
    $.destroy();
    console.log("window close");
  });









  _.extend($, exports);
}

module.exports = Controller;