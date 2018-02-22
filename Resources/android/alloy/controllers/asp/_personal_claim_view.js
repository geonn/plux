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
  { top: 10, left: 10, right: 10, bottom: 10, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.SIZE, id: "personalClaimVw" });

  $.__views.personalClaimVw && $.addTopLevelView($.__views.personalClaimVw);
  $.__views.main = Ti.UI.createView(
  { layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.SIZE, borderColor: "#dfe0e4", backgroundColor: "#FFFFFF", borderRadius: "5", id: "main" });

  $.__views.personalClaimVw.add($.__views.main);
  $.__views.__alloyId207 = Ti.UI.createView(
  { layout: "horizontal", width: Ti.UI.FILL, height: Ti.UI.SIZE, id: "__alloyId207" });

  $.__views.main.add($.__views.__alloyId207);
  $.__views.name = Ti.UI.createLabel(
  { width: "85%", height: Ti.UI.SIZE, color: "#CE1D1C", font: { fontSize: 18 }, id: "name", left: 10, top: 5, zIndex: 10 });

  $.__views.__alloyId207.add($.__views.name);
  $.__views.more = Ti.UI.createImageView(
  { id: "more", image: "/images/btn-forward.png", right: 8, top: 8, zIndex: 10, width: "20dp", height: "20dp" });

  $.__views.__alloyId207.add($.__views.more);
  $.__views.__alloyId208 = Ti.UI.createView(
  { height: 15, width: Ti.UI.FILL, id: "__alloyId208" });

  $.__views.main.add($.__views.__alloyId208);
  exports.destroy = function () {};




  _.extend($, $.__views);


  var args = arguments[0] || {};
  $.name.text = args.name;

  for (var i = 0; i < args.data.length; i++) {
    var view_container = $.UI.create("View", {
      classes: ['padding', 'wfill', 'hsize', 'vert'],
      top: 5 });


    var typeHeaderView = $.UI.create("View", {
      classes: ['wfill', 'hsize', 'horz'] });


    var label_type = $.UI.create("Label", {
      classes: ['font_medium'],
      left: 0,
      width: "65%",
      text: args.data[i].benefittype + " Balance " });


    if (args.data[i].entidvbal < 99999) {
      var totBal = args.data[i].entidvbal;
    }

    if (args.data[i].entshabal < 99999) {
      var totBal = args.data[i].entshabal;
    }

    var textTotBal = "RM " + totBal;
    if (totBal == "9999") {
      textTotBal = "Unlimited";
    }
    var corpcode = Ti.App.Properties.getString('corpcode');
    console.log(args.data[i].benefittype + " " + i);
    if (corpcode == "SANTECH" && args.data[i].benefittype == "MATERNITY") {
      textTotBal = "T&C Apply";
    } else if (corpcode == "SANTECH" && args.data[i].benefittype == "EXECUTIVE HEALTH SCREENING") {
      textTotBal = "As Charge";
    }
    var totalLimitLbl = $.UI.create("Label", {
      classes: ['h5', 'themeColor'],
      right: 0,
      width: "35%",
      textAlign: "right",
      text: textTotBal });


    typeHeaderView.add(label_type);
    typeHeaderView.add(totalLimitLbl);

    view_container.add(typeHeaderView);
    if (args.data[i].entidvbal < 99999) {
      var balance = Math.ceil((args.data[i].entidv - args.data[i].entidvbal) / args.data[i].entidv * 100);

      view_container.add(generate_progressBar(balance + "%"));
      if (corpcode == "SANTECH" && args.data[i].benefittype == "MATERNITY") {
        view_container.add(generate_description("Limit: ", args.data[i].entidvbal, "T&C Apply"));
      } else if (corpcode == "SANTECH" && args.data[i].benefittype == "EXECUTIVE HEALTH SCREENING") {
        view_container.add(generate_description("Limit: ", args.data[i].entidvbal, "As Charge"));
      } else if (args.data[i].entidv == "9999") {
        view_container.add(generate_description("Limit: ", args.data[i].entidvbal, "Unlimited"));
      } else {
        view_container.add(generate_description("Limit: RM ", args.data[i].entidvbal, args.data[i].entidv));
      }
    }

    if (args.data[i].entshabal < 99999) {
      var share_balance = Math.ceil((args.data[i].entsha - args.data[i].entshabal) / args.data[i].entsha * 100);
      view_container.add(generate_progressBar(share_balance + "%"));

      if (args.data[i].entsha == "9999") {
        view_container.add(generate_description("Shared Limit: ", args.data[i].entshabal, "Unlimited"));
      } else {
        view_container.add(generate_description("Shared Limit: RM ", args.data[i].entshabal, args.data[i].entsha));
      }

    }

    if (args.data[i].benefittype != "SPECIALIST") {
      if (args.data[i].relation == "PRINCIPLE") {
        if (args.data[i].vstidvbal != "99999") {
          if (args.data[i].vstidvbal == "9999") {
            view_container.add(generate_description("No. Visit " + args.data[i].vstTitle + ": ", args.data[i].vstshabal, "Unlimited"));
          } else {
            view_container.add(generate_description("No. Visit " + args.data[i].vstTitle + ": ", args.data[i].vstidvbal, args.data[i].vstidvbal));
          }
        }
      } else {
        if (args.data[i].vstidvbal != "99999" && args.data[i].vstshabal != "99999") {
          if (args.data[i].vstidvbal == "9999") {
            view_container.add(generate_description("No. Visit " + args.data[i].vstTitle + ": ", args.data[i].vstshabal, "Unlimited"));
          } else {
            view_container.add(generate_description("No. Visit " + args.data[i].vstTitle + ": ", args.data[i].vstshabal, args.data[i].vstshabal));
          }
        }

        if (args.data[i].vstshabal != "99999") {
          if (args.data[i].vstshabal == "9999") {
            view_container.add(generate_description("No. Visit " + args.data[i].vstTitle + " (shared): ", args.data[i].vstshabal, "Unlimited"));
          } else {
            view_container.add(generate_description("No. Visit " + args.data[i].vstTitle + " (shared): ", args.data[i].vstshabal, args.data[i].vstshabal));
          }
        }
      }
    }

    if (args.data[i].maxperclaim != "99999") {
      view_container.add(generate_description("Limit Per Claim: RM ", args.data[i].maxperclaim, args.data[i].maxperclaim));
    }
    $.main.add(view_container);
  };

  function generate_progressBar(filled) {
    var view_progressBar = $.UI.create("View", {
      classes: ['progressBar'] });


    var view_progressBarFill = $.UI.create("View", {
      classes: ['progressBarFill'],
      width: filled });


    view_progressBar.add(view_progressBarFill);
    return view_progressBar;
  }

  function generate_description(desc, balance, limit) {
    var view_desc = $.UI.create("View", {
      classes: ['wfill', 'hsize', 'horz'] });


    var label_balance = $.UI.create("Label", {
      text: desc + limit });


    view_desc.add(label_balance);

    return view_desc;
  }

  $.personalClaimVw.addEventListener("click", function () {
    var nav = require('navigation');
    nav.navigateWithArgs("asp/claimHistory", { name: args.name });
  });









  _.extend($, exports);
}

module.exports = Controller;