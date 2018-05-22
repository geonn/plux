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
  this.__controllerPath = 'asp/_personal_claim_view';
  this.args = arguments[0] || {};

  if (arguments[0]) {
    var __parentSymbol = __processArg(arguments[0], '__parentSymbol');
    var $model = __processArg(arguments[0], '$model');
    var __itemTemplate = __processArg(arguments[0], '__itemTemplate');
  }
  var $ = this;
  var exports = {};
  var __defers = {};







  $.__views.personalClaimVw = Ti.UI.createView(
  { borderWidth: 0, top: 10, left: 10, right: 10, bottom: 10, width: Ti.UI.FILL, height: Ti.UI.SIZE, borderRadius: "5", id: "personalClaimVw", backgroundColor: "#55a939" });

  $.__views.personalClaimVw && $.addTopLevelView($.__views.personalClaimVw);
  $.__views.main = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.SIZE, id: "main", backgroundColor: "#ffffff", top: 5 });

  $.__views.personalClaimVw.add($.__views.main);
  $.__views.__alloyId218 = Ti.UI.createView(
  { borderWidth: 0, width: Ti.UI.FILL, height: Ti.UI.SIZE, id: "__alloyId218" });

  $.__views.main.add($.__views.__alloyId218);
  $.__views.__alloyId219 = Ti.UI.createView(
  { borderWidth: 0, width: Ti.UI.SIZE, left: 10, right: 30, height: 40, top: 5, id: "__alloyId219" });

  $.__views.__alloyId218.add($.__views.__alloyId219);
  $.__views.name = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#0c0e15", font: { fontSize: 14, fontWeight: "bold" }, id: "name" });

  $.__views.__alloyId219.add($.__views.name);
  $.__views.more = Ti.UI.createImageView(
  { id: "more", image: "/images/btn-forward.png", right: 8, top: 15, zIndex: 10, width: 20, height: 20 });

  $.__views.__alloyId218.add($.__views.more);
  $.__views.extra_info = Ti.UI.createView(
  { borderWidth: 0, width: Ti.UI.FILL, height: Ti.UI.SIZE, id: "extra_info" });

  $.__views.main.add($.__views.extra_info);
  $.__views.__alloyId220 = Ti.UI.createView(
  { borderWidth: 0, width: Ti.UI.FILL, height: Ti.UI.SIZE, id: "__alloyId220" });

  $.__views.main.add($.__views.__alloyId220);
  $.__views.__alloyId221 = Ti.UI.createView(
  { borderWidth: 0, width: 30, height: 30, zIndex: 2, left: -20, borderRadius: 15, backgroundColor: "#535a74", id: "__alloyId221" });

  $.__views.__alloyId220.add($.__views.__alloyId221);
  $.__views.__alloyId222 = Ti.UI.createView(
  { borderWidth: 0, width: Titanium.UI.FILL, height: 1, backgroundColor: "#eee", id: "__alloyId222" });

  $.__views.__alloyId220.add($.__views.__alloyId222);
  $.__views.__alloyId223 = Ti.UI.createView(
  { borderWidth: 0, width: 30, height: 30, zIndex: 2, right: -20, borderRadius: 15, backgroundColor: "#535a74", id: "__alloyId223" });

  $.__views.__alloyId220.add($.__views.__alloyId223);
  exports.destroy = function () {};




  _.extend($, $.__views);


  var args = arguments[0] || {};
  var corpcode = Ti.App.Properties.getString('corpcode');
  $.name.text = args.name;

  function init() {
    render_extra_info();
    render_balance_list();
  }

  init();

  function render_extra_info() {}

  function changeTitleByCorpAndBenefit(textTotBal, benefittype) {
    if (corpcode == "SANTECH" && benefittype == "MATERNITY") {
      textTotBal = "T&C Apply";
    } else if (corpcode == "SANTECH" && benefittype == "EXECUTIVE HEALTH SCREENING") {
      textTotBal = "As Charge";
    }
    return textTotBal;
  }

  function setup_row(e) {
    var balance = Math.ceil((e.limit - e.balance) / e.limit * 100);
    var textTotBal = e.balance == "9999" ? "UNLIMITED" : e.ent_type + e.balance;
    textTotBal = changeTitleByCorpAndBenefit(textTotBal, e.benefittype);
    var subvalue = e.limit == "9999" ? "UNLIMITED" : e.ent_type + e.limit;
    subvalue = changeTitleByCorpAndBenefit(subvalue, e.benefittype);
    return render_row({ balance: balance, textTotBal: textTotBal, title: e.entTitle.toUpperCase(), subtitle: e.subtitle, subvalue: subvalue, benefittype: e.benefittype, category: e.category, maxperclaim: e.maxperclaim });
  }

  function render_balance_list() {
    for (var i = 0; i < args.data.length; i++) {
      var view_container = $.UI.create("View", { classes: ['padding', 'wfill', 'hsize', 'vert'], bottom: 0 });
      if (args.data[i].entidvbal < 99999) {
        view_container.add(setup_row({ limit: args.data[i].entidv, balance: args.data[i].entidvbal, benefittype: args.data[i].benefittype, entTitle: args.data[i].entTitle, category: "", subtitle: "LIMIT", ent_type: "RM ", maxperclaim: args.data[i].maxperclaim }));
      }
      if (args.data[i].entshabal < 99999) {
        view_container.add(setup_row({ limit: args.data[i].entsha, balance: args.data[i].entshabal, benefittype: args.data[i].benefittype, entTitle: args.data[i].entTitle, category: " | SHARED", subtitle: "SHARED LIMIT", ent_type: "RM ", maxperclaim: args.data[i].maxperclaim }));
      }
      if (args.data[i].vstidvbal < 99999) {
        view_container.add(setup_row({ limit: args.data[i].vstidv, balance: args.data[i].vstidvbal, benefittype: args.data[i].benefittype, entTitle: args.data[i].entTitle, category: " | VISIT", subtitle: "LIMIT", ent_type: "VISIT: ", maxperclaim: args.data[i].maxperclaim }));
      }
      if (args.data[i].vstidvbal < 99999) {
        view_container.add(setup_row({ limit: args.data[i].vstsha, balance: args.data[i].vstshabal, benefittype: args.data[i].benefittype, entTitle: args.data[i].entTitle, category: " | VISIT | SHARED", subtitle: "SHARED LIMIT", ent_type: "VISIT: ", maxperclaim: args.data[i].maxperclaim }));
      }
      $.main.add(view_container);
    }
  }

  function render_row(e) {
    var row = $.UI.create("View", { classes: ['wfill', 'hsize', 'vert'] });
    var view_label_type = $.UI.create("View", { classes: ['wsize', 'hsize', 'rounded'], borderRadius: 8, bottom: -8, left: 20, backgroundColor: "#22262f" });
    var label_type = $.UI.create("Label", { classes: ['wsize', 'hsize', 'h7', 'small_padding'], bottom: 10, color: "#ffffff", text: e.benefittype + e.category });
    view_label_type.add(label_type);
    row.add(view_label_type);
    row.add(generate_progressBar(e.balance + "%"));
    var view1 = $.UI.create("View", { classes: ['wfill', 'hsize'] });
    var view_progress_balance = $.UI.create("View", { classes: ['wsize', 'hsize', 'rounded'], borderRadius: 8, top: -8, right: 20, backgroundColor: "#22262f" });
    var label_progress_balance = $.UI.create("Label", { classes: ['wsize', 'hsize', 'h7', 'small_padding'], top: 10, color: "#ffffff", text: e.balance + "% used" });
    view_progress_balance.add(label_progress_balance);
    view1.add(view_progress_balance);
    var view_sub_info = $.UI.create("View", { classes: ['wfill', 'horz', 'hsize'], right: 40 });
    view1.add(view_sub_info);
    row.add(view1);

    view_sub_info.add(generate_description(e.title, e.textTotBal));
    view_sub_info.add($.UI.create("View", { width: 1, height: 30, backgroundColor: "#eeeeee", left: 10, right: 10 }));
    view_sub_info.add(generate_description(e.subtitle, e.subvalue));
    if (e.maxperclaim < 99999) {
      view_sub_info.add(generate_description("MAXIMUM AMOUNT PER CLAIM", e.maxperclaim == "9999" ? "UNLIMITED" : e.maxperclaim, "100%"));
    }

    return row;
  }

  function generate_progressBar(filled) {
    var view_progressBar = $.UI.create("View", {
      classes: ['progressBar'] });


    var view_progressBarFill = $.UI.create("View", {
      classes: ['progressBarFill'],
      width: filled });


    view_progressBar.add(view_progressBarFill);
    return view_progressBar;
  }

  function generate_description(title, value, width) {
    var view = $.UI.create("View", { classes: ['vert', 'wsize'], width: width || "40%", bottom: 0, top: 5, height: 40 });

    var label_category_title = $.UI.create("Label", { classes: ['wsize', 'hsize', 'h6'], left: 0, text: title });
    var label_category = $.UI.create("Label", { classes: ['wsize', 'hsize', 'h6', 'bold'], left: 0, minimumFontSize: 10, text: value });
    view.add(label_category_title);
    view.add(label_category);
    return view;
  }

  $.personalClaimVw.addEventListener("click", function () {
    var nav = require('navigation');
    nav.navigateWithArgs("asp/claimHistory", { name: args.name });
  });









  _.extend($, exports);
}

module.exports = Controller;