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
  this.__controllerPath = 'index';
  this.args = arguments[0] || {};

  if (arguments[0]) {
    var __parentSymbol = __processArg(arguments[0], '__parentSymbol');
    var $model = __processArg(arguments[0], '$model');
    var __itemTemplate = __processArg(arguments[0], '__itemTemplate');
  }
  var $ = this;
  var exports = {};
  var __defers = {};







  $.__views.index = Alloy.createController('slideshow', { id: "index" });
  $.__views.index && $.addTopLevelView($.__views.index);
  exports.destroy = function () {};




  _.extend($, $.__views);


  var args = {};
  var u_id = Ti.App.Properties.getString('u_id') || "";

  function init() {
    var isShowIntro = Ti.App.Properties.getString('isShowIntro') || "";
    var isSignup2 = Ti.App.Properties.getString('signup2');
    if (isShowIntro != "") {
      if (u_id == "") {
        if (isSignup2 == "yes") {
          var win = Alloy.createController("login").getView();
          win.open();
          var win2 = Alloy.createController("asp/signup2").getView();
          win2.open();
        } else {
          var win = Alloy.createController("login").getView();
          win.open();
        }
      } else {
        if (isSignup2 == "yes") {

          var win = Alloy.createController("login").getView();
          win.open();
          var win2 = Alloy.createController("asp/signup2").getView();
          win2.open();
        } else {

          if (false) {
            console.log("index home chekcin");
            var navMenu = Titanium.UI.iOS.createNavigationWindow();
            var win = Alloy.createController("home").getView();
            navMenu.window = win;
            Alloy.Globals.navMenu = navMenu;
            console.log("stoped?");
            console.log(Alloy.Globals.navMenu);
            Alloy.Globals.navMenu.open();
          } else {
            console.log('start home');
            var win = Alloy.createController("home").getView();
            win.open();
          }
        }
      }
    } else {
      $.index.win.open();
    }
  }

  init();

  API.callByPost({ url: "dateNow" }, function (responseText) {
    var res = JSON.parse(responseText);

    if (res.status != "error") {
      common.sync_time(res.data);
    }
  });









  _.extend($, exports);
}

module.exports = Controller;