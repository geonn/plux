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
  this.__controllerPath = 'asp/myClaim';
  this.args = arguments[0] || {};

  if (arguments[0]) {
    var __parentSymbol = __processArg(arguments[0], '__parentSymbol');
    var $model = __processArg(arguments[0], '$model');
    var __itemTemplate = __processArg(arguments[0], '__itemTemplate');
  }
  var $ = this;
  var exports = {};
  var __defers = {};

  $.__views.win = Ti.UI.createWindow({ backgroundColor: "#ffffff", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, title: "My Claim Details", id: "win", backButtonTitle: "", navTintColor: "#CE1D1C" });
  $.__views.win && $.addTopLevelView($.__views.win);
  $.__views.__alloyId283 = Ti.UI.createView({ id: "__alloyId283" });
  $.__views.win.rightNavButton = $.__views.__alloyId283;$.__views.__alloyId284 = Ti.UI.createView({ layout: "vertical", backgroundColor: "#F6F6F6", height: "100%", id: "__alloyId284" });
  $.__views.win.add($.__views.__alloyId284);
  if (true) {
    $.__views.__alloyId285 = Ti.UI.createView({ layout: "horizontal", height: 50, width: Ti.UI.FILL, backgroundColor: "#DEDEDE", id: "__alloyId285" });
    $.__views.__alloyId284.add($.__views.__alloyId285);
    $.__views.__alloyId286 = Ti.UI.createView({ left: 0, width: "10%", id: "__alloyId286" });
    $.__views.__alloyId285.add($.__views.__alloyId286);
    $.__views.btnBack = Ti.UI.createImageView({ left: 10, id: "btnBack", width: 25, height: 25, image: "/images/btn-back.png" });
    $.__views.__alloyId286.add($.__views.btnBack);
    $.__views.pageTitle = Ti.UI.createView({ id: "pageTitle", width: "90%" });
    $.__views.__alloyId285.add($.__views.pageTitle);
    $.__views.__alloyId287 = Ti.UI.createLabel({ width: Titanium.UI.SIZE, height: Ti.UI.SIZE, color: "#606060", font: { fontSize: "16dp" }, text: 'My Claim Details', textAlign: "center", id: "__alloyId287" });
    $.__views.pageTitle.add($.__views.__alloyId287);
  }
  $.__views.__alloyId288 = Ti.UI.createView({ height: Ti.UI.FILL, width: Ti.UI.FILL, id: "__alloyId288" });
  $.__views.__alloyId284.add($.__views.__alloyId288);
  $.__views.claimContainer = Ti.UI.createView({ id: "claimContainer", width: Ti.UI.FILL, height: Ti.UI.FILL, visible: false });
  $.__views.__alloyId288.add($.__views.claimContainer);
  $.__views.main = Ti.UI.createScrollView({ backgroundColor: "#E9E9E9", id: "main", layout: "vertical", scrollType: "vertical" });
  $.__views.claimContainer.add($.__views.main);
  $.__views.date = Ti.UI.createLabel({ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#CE1D1C", font: { fontSize: "16dp" }, top: "10dp", id: "date" });
  $.__views.main.add($.__views.date);
  $.__views.personal_claim = Ti.UI.createView({ layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.SIZE, id: "personal_claim" });
  $.__views.main.add($.__views.personal_claim);
  $.__views.insurance_info = Ti.UI.createView({ layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.SIZE, id: "insurance_info" });
  $.__views.main.add($.__views.insurance_info);
  exports.destroy = function () {};

  _.extend($, $.__views);

  var args = arguments[0] || {};
  var loading = Alloy.createController("loading");

  common.construct($);
  $.win.add(loading.getView());
  loading.start();

  loadPage();

  function loadPage() {
    var isver = Ti.App.Properties.getString('isver');
    var corpcode = Ti.App.Properties.getString('corpcode');
    var memno = Ti.App.Properties.getString('memno');
    var empno = Ti.App.Properties.getString('empno');
    console.log(isver + " " + corpcode + " " + memno + " " + empno);
    if (isver == "true" || isver > 0) {
      $.claimContainer.show();
      API.claimInfo({ memno: memno, corpcode: corpcode });

      API.ifins({ empno: empno, corpcode: corpcode });
    } else {
      loading.finish();
    }
  }

  Ti.App.addEventListener("data_loaded", init);
  Ti.App.addEventListener('ifins_loaded', loadIfins);

  function loadIfins() {
    var ifins = JSON.parse(Ti.App.Properties.getString('ifins'));
    ifins = ifins[0];
    console.log(ifins);
    var container = $.UI.create("View", { classes: ['wfill', 'hsize', 'vert', 'box', 'rounded'], left: 10, top: 0, right: 10 });
    var label_EmpIns = $.UI.create("Label", { classes: ['wfill', 'hsize', 'padding'], text: "Employee Number: " + ifins.EmpIns });
    var label_SpouseIns = $.UI.create("Label", { classes: ['wfill', 'hsize', 'padding'], top: 0, text: "Spouse Issured: " + ifins.SpouseIns });
    var label_ChildIns = $.UI.create("Label", { classes: ['wfill', 'hsize', 'padding'], top: 0, text: "Child Inssured: " + ifins.ChildIns });
    var label_InsPlan = $.UI.create("Label", { classes: ['wfill', 'hsize', 'padding', 'bold'], top: 0, text: "Insurance Plan: " + ifins.InsPlan });
    var label_Room = $.UI.create("Label", { classes: ['wfill', 'hsize', 'padding'], top: 0, text: "Room: " + ifins.Room });
    var label_AddIns = $.UI.create("Label", { classes: ['wfill', 'hsize', 'padding'], top: 0, text: "Additional Information: " + ifins.AddIns });
    var icon_pdf = $.UI.create("ImageView", { classes: ['hsize'], width: 40, image: "/images/pdf_logo.png" });
    container.add(label_EmpIns);
    container.add(label_SpouseIns);
    container.add(label_ChildIns);
    container.add(label_Room);
    container.add(label_AddIns);
    container.add(label_InsPlan);
    container.add(icon_pdf);
    icon_pdf.addEventListener("click", openPdf);
    $.insurance_info.add(container);
  }

  function openPdf() {
    var ifins = JSON.parse(Ti.App.Properties.getString('ifins'));
    ifins = ifins[0];
    console.log(encodeURI(ifins.InsPlanUrl));
    if (false) {
      var win = Alloy.createController("webview", { url: encodeURI(ifins.InsPlanUrl) }).getView();
      win.open();
    } else {
      var url = ifins.InsPlanUrl;
      var PDF = require('pdf');
      PDF.createPdf(url, true, "", "", "", function (err, file, base, url) {
        PDF.android_launch(file);
      });
    }
  }

  function init() {

    var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    var e = JSON.parse(Ti.App.Properties.getString('balchk'));

    if (e == "") {
      alert("No records found");
      return false;
    }
    var updated_date = currentDateTime();
    $.date.text = timeFormat(updated_date);

    var groups = {};
    var balance_groups = {};
    var balance_user_groups = {};
    for (var i = 0; i < e.length; i++) {
      var val = e[i];


      groups[val.name] = groups[val.name] || [];
      groups[val.name].push(val);
    }

    GenerateClaimBalanceTable(balance_groups);
    Object.keys(groups).map(function (group) {
      var personal_claim_view = Alloy.createController("asp/_personal_claim_view", { data: groups[group], name: group }).getView();
      $.personal_claim.add(personal_claim_view);
    });
    Ti.App.removeEventListener("data_loaded", init);
    loading.finish();
  }

  function GenerateClaimBalanceTable(balance_groups) {
    var claim_balance_name = { "entidvbal": "Claim Balance", "entshabal": "Claim Shared Balance", "vstidvbal": "Visitation Balance", "vstshabal": "Visitation Shared Balance" };
    Object.keys(balance_groups).map(function (group) {
      var view_title = $.UI.create("View", {
        backgroundColor: "#CE1D1C",
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL
      });

      var label_title = $.UI.create("Label", {
        classes: ['title'],
        color: "#ffffff",
        height: Titanium.UI.SIZE,
        text: claim_balance_name[group]
      });

      view_title.add(label_title);
      $.view_balance.add(view_title);
      var tmp_group = {};
      for (var a = 0; balance_groups[group].length > a; a++) {
        tmp_group[balance_groups[group][a]['name']] = tmp_group[balance_groups[group][a]['name']] || [];
        tmp_group[balance_groups[group][a]['name']].push(balance_groups[group][a]);
      }
      Object.keys(tmp_group).map(function (b) {

        var view_line = $.UI.create("View", {
          classes: ['line']
        });

        var view_header = $.UI.create("View", {
          width: Ti.UI.FILL,
          height: Ti.UI.SIZE,
          left: 10,
          right: 10,
          layout: "horizontal"
        });

        var label_name = $.UI.create("Label", {
          height: Ti.UI.SIZE,
          wordWrap: false,
          ellipsize: true,
          font: {
            fontSize: "16dp"
          },
          width: "70%",
          text: b
        });

        var label_balance_limit = $.UI.create("Label", {
          height: Ti.UI.SIZE,
          wordWrap: false,
          ellipsize: true,
          font: {
            fontSize: "12dp"
          },
          width: "30%",
          text: "balance / limit"
        });
        view_header.add(label_name);
        view_header.add(label_balance_limit);
        $.view_balance.add(view_line);
        $.view_balance.add(view_header);
        for (var c = 0; tmp_group[b].length > c; c++) {
          var view_category = $.UI.create("View", {
            width: Ti.UI.FILL,
            height: Ti.UI.SIZE,
            layout: "horizontal"
          });

          var label_category = $.UI.create("Label", {
            classes: ['subtitle'],
            text: tmp_group[b][c]['benefittype']
          });

          var label_amount = $.UI.create("Label", {
            classes: ['subvalue'],
            text: "RM " + tmp_group[b][c][group]
          });
          view_category.add(label_category);
          view_category.add(label_amount);

          $.view_balance.add(view_category);
        }
      });
    });
  }

  if ('android' == "android") {
    $.btnBack.addEventListener('click', function () {
      nav.closeWindow($.win);
    });
  }

  $.win.addEventListener("close", function () {
    Ti.App.removeEventListener('ifinsPage', loadIfins);
    Ti.App.removeEventListener('loadPage', loadPage);
    Ti.App.removeEventListener("data_loaded", init);
    $.destroy();
  });

  _.extend($, exports);
}

module.exports = Controller;