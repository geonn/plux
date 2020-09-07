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

  // Generated code that must be executed before all UI and/or
  // controller code. One example is all model and collection
  // declarations from markup.


  // Generated UI code
  $.__views["win"] = Ti.UI.createWindow(
  { barColor: "transparent", backgroundColor: "#535a74", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, title: "My Claim Details", id: "win", backButtonTitle: "", navTintColor: "#CE1D1C" });

  $.__views["win"] && $.addTopLevelView($.__views["win"]);
  $.__views["__alloyId357"] = Ti.UI.createView(
  { borderWidth: 0, id: "__alloyId357" });

  $.__views["win"].rightNavButton = $.__views["__alloyId357"];$.__views["__alloyId358"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.FILL, id: "__alloyId358" });

  $.__views["win"].add($.__views["__alloyId358"]);
  if (true) {
    $.__views["__alloyId359"] = Ti.UI.createView(
    { borderWidth: 0, layout: "horizontal", width: Ti.UI.FILL, height: 50, backgroundColor: "#DEDEDE", id: "__alloyId359" });

    $.__views["__alloyId358"].add($.__views["__alloyId359"]);
    $.__views["__alloyId360"] = Ti.UI.createView(
    { borderWidth: 0, height: Ti.UI.FILL, left: 0, width: "10%", id: "__alloyId360" });

    $.__views["__alloyId359"].add($.__views["__alloyId360"]);
    $.__views["btnBack"] = Ti.UI.createImageView(
    { left: 10, id: "btnBack", width: 25, height: 25, image: "/images/btn-back.png" });

    $.__views["__alloyId360"].add($.__views["btnBack"]);
    $.__views["pageTitle"] = Ti.UI.createView(
    { borderWidth: 0, height: Ti.UI.FILL, id: "pageTitle", width: "90%" });

    $.__views["__alloyId359"].add($.__views["pageTitle"]);
    $.__views["__alloyId361"] = Ti.UI.createLabel(
    { width: Titanium.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial", fontSize: "16dp" }, text: 'My Claim Details', textAlign: "center", id: "__alloyId361" });

    $.__views["pageTitle"].add($.__views["__alloyId361"]);
  }
  $.__views["claimContainer"] = Ti.UI.createView(
  { borderWidth: 0, width: Ti.UI.FILL, height: Ti.UI.FILL, id: "claimContainer", visible: false });

  $.__views["__alloyId358"].add($.__views["claimContainer"]);
  $.__views["main"] = Ti.UI.createScrollView(
  { layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.FILL, contentHeight: Ti.UI.SIZE, contentWidth: Ti.UI.FILL, id: "main", scrollType: "vertical" });

  $.__views["claimContainer"].add($.__views["main"]);
  $.__views["date"] = Ti.UI.createLabel(
  { width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#eeeeee", font: { fontFamily: "Roboto-Regular, arial" }, id: "date", top: 10 });

  $.__views["main"].add($.__views["date"]);
  $.__views["personal_claim"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.SIZE, id: "personal_claim" });

  $.__views["main"].add($.__views["personal_claim"]);
  $.__views["insurance_info"] = Ti.UI.createView(
  { borderWidth: 0, top: 10, left: 10, right: 10, bottom: 10, width: Ti.UI.FILL, height: Ti.UI.SIZE, borderRadius: "5", id: "insurance_info", backgroundColor: "#ba65ca" });

  $.__views["main"].add($.__views["insurance_info"]);
  $.__views["__alloyId362"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.SIZE, backgroundColor: "#ffffff", top: 5, id: "__alloyId362" });

  $.__views["insurance_info"].add($.__views["__alloyId362"]);
  $.__views["__alloyId363"] = Ti.UI.createView(
  { borderWidth: 0, width: Ti.UI.FILL, height: Ti.UI.SIZE, id: "__alloyId363" });

  $.__views["__alloyId362"].add($.__views["__alloyId363"]);
  $.__views["__alloyId364"] = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Bold", fontSize: 16 }, text: 'INSURANCE INFO', left: 10, id: "__alloyId364" });

  $.__views["__alloyId363"].add($.__views["__alloyId364"]);
  $.__views["InsPlanUrl"] = Ti.UI.createView(
  { borderWidth: 2, borderColor: "#e8534c", backgroundColor: "#FFFFFF", zIndex: 10, top: 10, width: 60, height: 60, borderRadius: 30, right: 10, id: "InsPlanUrl" });

  $.__views["__alloyId363"].add($.__views["InsPlanUrl"]);
  openPdf ? $.addListener($.__views["InsPlanUrl"], 'click', openPdf) : __defers['$.__views["InsPlanUrl"]!click!openPdf'] = true;$.__views["__alloyId365"] = Ti.UI.createImageView(
  { touchEnabled: false, width: 60, height: 60, image: "/images/pdficon.png", id: "__alloyId365" });

  $.__views["InsPlanUrl"].add($.__views["__alloyId365"]);
  $.__views["__alloyId366"] = Ti.UI.createView(
  { borderWidth: 0, width: Ti.UI.FILL, height: Ti.UI.SIZE, id: "__alloyId366" });

  $.__views["__alloyId362"].add($.__views["__alloyId366"]);
  $.__views["__alloyId367"] = Ti.UI.createView(
  { borderWidth: 0, width: 30, height: 30, zIndex: 2, left: -20, borderRadius: 15, backgroundColor: "#535a74", id: "__alloyId367" });

  $.__views["__alloyId366"].add($.__views["__alloyId367"]);
  $.__views["__alloyId368"] = Ti.UI.createView(
  { borderWidth: 0, width: Titanium.UI.FILL, height: 1, backgroundColor: "#eee", id: "__alloyId368" });

  $.__views["__alloyId366"].add($.__views["__alloyId368"]);
  $.__views["__alloyId369"] = Ti.UI.createView(
  { borderWidth: 0, width: 30, height: 30, zIndex: 2, right: -20, borderRadius: 15, backgroundColor: "#535a74", id: "__alloyId369" });

  $.__views["__alloyId366"].add($.__views["__alloyId369"]);
  $.__views["__alloyId370"] = Ti.UI.createView(
  { borderWidth: 0, top: 10, left: 10, right: 10, bottom: 10, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.SIZE, id: "__alloyId370" });

  $.__views["__alloyId362"].add($.__views["__alloyId370"]);
  $.__views["__alloyId371"] = Ti.UI.createView(
  { borderWidth: 0, layout: "horizontal", width: Ti.UI.FILL, height: 40, id: "__alloyId371" });

  $.__views["__alloyId370"].add($.__views["__alloyId371"]);
  $.__views["__alloyId372"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: "45%", height: Ti.UI.FILL, top: 5, id: "__alloyId372" });

  $.__views["__alloyId371"].add($.__views["__alloyId372"]);
  $.__views["__alloyId373"] = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial", fontSize: 12 }, text: 'EMPLOYEE INSURED', left: 0, id: "__alloyId373" });

  $.__views["__alloyId372"].add($.__views["__alloyId373"]);
  $.__views["EmpIns"] = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Bold", fontSize: 12 }, left: 0, id: "EmpIns", minimumFontSize: 10 });

  $.__views["__alloyId372"].add($.__views["EmpIns"]);
  $.__views["__alloyId374"] = Ti.UI.createView(
  { borderWidth: 0, top: 10, left: 10, right: 10, bottom: 10, height: Ti.UI.FILL, width: 1, backgroundColor: "#eeeeee", id: "__alloyId374" });

  $.__views["__alloyId371"].add($.__views["__alloyId374"]);
  $.__views["__alloyId375"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: "45%", height: Ti.UI.FILL, top: 5, id: "__alloyId375" });

  $.__views["__alloyId371"].add($.__views["__alloyId375"]);
  $.__views["__alloyId376"] = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial", fontSize: 12 }, text: 'SPOUSE INSURED', left: 0, id: "__alloyId376" });

  $.__views["__alloyId375"].add($.__views["__alloyId376"]);
  $.__views["SpouseIns"] = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Bold", fontSize: 12 }, left: 0, id: "SpouseIns", minimumFontSize: 10 });

  $.__views["__alloyId375"].add($.__views["SpouseIns"]);
  $.__views["__alloyId377"] = Ti.UI.createView(
  { borderWidth: 0, width: Titanium.UI.FILL, height: 1, backgroundColor: "#eee", id: "__alloyId377" });

  $.__views["__alloyId370"].add($.__views["__alloyId377"]);
  $.__views["__alloyId378"] = Ti.UI.createView(
  { borderWidth: 0, layout: "horizontal", width: Ti.UI.FILL, height: 40, id: "__alloyId378" });

  $.__views["__alloyId370"].add($.__views["__alloyId378"]);
  $.__views["__alloyId379"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: "45%", height: Ti.UI.FILL, top: 5, id: "__alloyId379" });

  $.__views["__alloyId378"].add($.__views["__alloyId379"]);
  $.__views["__alloyId380"] = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial", fontSize: 12 }, text: 'CHILD INSURED', left: 0, id: "__alloyId380" });

  $.__views["__alloyId379"].add($.__views["__alloyId380"]);
  $.__views["ChildIns"] = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Bold", fontSize: 12 }, left: 0, id: "ChildIns", minimumFontSize: 10 });

  $.__views["__alloyId379"].add($.__views["ChildIns"]);
  $.__views["__alloyId381"] = Ti.UI.createView(
  { borderWidth: 0, top: 10, left: 10, right: 10, bottom: 10, height: Ti.UI.FILL, width: 1, backgroundColor: "#eeeeee", id: "__alloyId381" });

  $.__views["__alloyId378"].add($.__views["__alloyId381"]);
  $.__views["__alloyId382"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: "45%", height: Ti.UI.FILL, top: 5, id: "__alloyId382" });

  $.__views["__alloyId378"].add($.__views["__alloyId382"]);
  $.__views["__alloyId383"] = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial", fontSize: 12 }, text: 'INSURANCE PLAN', left: 0, id: "__alloyId383" });

  $.__views["__alloyId382"].add($.__views["__alloyId383"]);
  $.__views["InsPlan"] = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Bold", fontSize: 12 }, left: 0, id: "InsPlan", minimumFontSize: 10 });

  $.__views["__alloyId382"].add($.__views["InsPlan"]);
  $.__views["__alloyId384"] = Ti.UI.createView(
  { borderWidth: 0, width: Titanium.UI.FILL, height: 1, backgroundColor: "#eee", id: "__alloyId384" });

  $.__views["__alloyId370"].add($.__views["__alloyId384"]);
  $.__views["__alloyId385"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: Ti.UI.SIZE, height: 40, top: 5, id: "__alloyId385" });

  $.__views["__alloyId370"].add($.__views["__alloyId385"]);
  $.__views["__alloyId386"] = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial", fontSize: 12 }, text: 'ADDITIONAL INFORMATION', id: "__alloyId386" });

  $.__views["__alloyId385"].add($.__views["__alloyId386"]);
  $.__views["AddIns"] = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Bold", fontSize: 12 }, id: "AddIns", minimumFontSize: 10 });

  $.__views["__alloyId385"].add($.__views["AddIns"]);
  exports.destroy = function () {};

  // make all IDed elements in $.__views available right on the $ in a
  // controller's internal code. Externally the IDed elements will
  // be accessed with getView().
  _.extend($, $.__views);

  // Controller code directly from the developer's controller file
  var args = arguments[0] || {};
  var loading = Alloy.createController("loading");
  $.win.add(loading.getView());
  loading.start();

  loadPage();

  function timeFormat(datetime) {
    var timeStamp = datetime.split(" ");
    var newFormat;
    var ampm = "am";
    var date = timeStamp[0].split("-");
    if (timeStamp.length == 1) {
      newFormat = date[2] + "/" + date[1] + "/" + date[0];
    } else {
      var time = timeStamp[1].split(":");
      if (time[0] >= 12) {
        ampm = "pm";
        time[0] = time[0] - 12;
      }

      newFormat = date[2] + "/" + date[1] + "/" + date[0] + " " + time[0] + ":" + time[1] + " " + ampm;
    }

    return newFormat;
  }

  function loadPage() {
    $.insurance_info.hide();
    console.log("loadPage " + isver);
    var isver = Ti.App.Properties.getString('isver');
    var corpcode = Ti.App.Properties.getString('corpcode');
    var memno = Ti.App.Properties.getString('memno'); //"AGIL00005";//
    var empno = Ti.App.Properties.getString('empno');
    if (isver == "true" || isver > 0) {
      $.claimContainer.show();
      //Alloy.Globals.API.claimInfo({memno : memno, corpcode : corpcode});
      callbyget({ url: "balchk.aspx", params: "MEMNO=" + memno + "&CORPCODE=" + corpcode, callback: init });
      var params = "EMPNO=" + empno + "&CORPCODE=" + corpcode; //"EMPNO=05152314&CORPCODE=IFMY";
      callbyget({ url: "ifins.aspx", params: params, callback: loadIfins }); //"EMPNO="+empno+"&CORPCODE="+corpcode
      //Alloy.Globals.API.ifins({empno : empno, corpcode : corpcode});

    } else {
      loading.finish();
    }
  }

  function callbyget(e) {
    Alloy.Globals.API.callByGet({ url: e.url, params: e.params }, {
      onload: function (responseText) {
        var res = JSON.parse(responseText);
        if (res.length == null || res.length <= 0) {
          if (e.url == "balchk.aspx") {
            var row = $.UI.create("View", { classes: ['wfill', 'hsize', 'padding', 'rounded'], bottom: 0, backgroundColor: "#fff" });
            var view_container = $.UI.create("View", { classes: ['wfill', 'hsize', 'padding'], touchEnabled: false });
            var label = $.UI.create("Label", { classes: ['wfill', 'hsize', 'h5'], textAlign: "center", text: "No Entitlement found" });
            row.add(view_container);
            view_container.add(label);
            $.personal_claim.add(row);
          }
        } else if (typeof res[0] !== "undefined" && typeof res[0].message !== "undefined") {
          //console.log('got error message');
          Alloy.Globals.common.createAlert(res[0].message);
        } else {
          e.callback(res || []);
        }
      }, onfinish: function () {
        if (e.url == "balchk.aspx") {
          loading.finish();
        }
      }, onerror: function () {
        $.win.close();
      } });

  }

  Ti.App.addEventListener("data_loaded", init);

  function loadIfins(ifins) {
    ifins = ifins[0];
    $.EmpIns.text = ifins.EmpIns;
    $.SpouseIns.text = ifins.SpouseIns;
    $.ChildIns.text = ifins.ChildIns;
    $.InsPlan.text = ifins.InsPlan;
    $.AddIns.text = ifins.AddIns;
    $.InsPlanUrl.InsPlanUrl = ifins.InsPlanUrl;
    $.insurance_info.show();
  }

  function openPdf(e) {
    console.log(encodeURI(e.source.InsPlanUrl) + " encodeURI(e.source.InsPlanUrl)");
    if (false) {
      var win = Alloy.createController("webview", { url: encodeURI(e.source.InsPlanUrl) }).getView();
      win.open();
    } else {
      var url = e.source.InsPlanUrl;
      var PDF = require('pdf');
      PDF.createPdf(url, true, "", "", "", function (err, file, base, url) {
        PDF.android_launch(file);
      });
    }

  }

  function init(e) {

    var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    if (e == "") {
      alert("No records found");
      return false;
    }
    $.date.text = timeFormat(Alloy.Globals.common.now());

    var groups = {};
    var balance_groups = {};
    var balance_user_groups = {};
    for (var i = 0; i < e.length; i++) {
      var val = e[i];
      groups[val.name] = groups[val.name] || [];
      groups[val.name].push(val);
    }

    Object.keys(groups).map(function (group) {
      var personal_claim_view = Alloy.createController("asp/_personal_claim_view", { data: groups[group], name: group, category: groups[group]['category'] }).getView();
      $.personal_claim.add(personal_claim_view);
    });
    loading.finish();
  }


  if ("android" == "android") {
    $.btnBack.addEventListener('click', function () {
      Alloy.Globals.nav.closeWindow($.win);
    });
  }

  $.win.addEventListener("close", function () {
    $.destroy();
  });

  // Generated code that must be executed after all UI and
  // controller code. One example deferred event handlers whose
  // functions are not defined until after the controller code
  // is executed.
  __defers['$.__views["InsPlanUrl"]!click!openPdf'] && $.addListener($.__views["InsPlanUrl"], 'click', openPdf);

  // Extend the $ instance with all functions and properties
  // defined on the exports object.
  _.extend($, exports);
}

module.exports = Controller;
//# sourceMappingURL=file://c:\Users\DanialHaikal\Documents\Appcelerator_Studio_Workspace\plux/build/map/Resources\android\alloy\controllers\asp\myClaim.js.map