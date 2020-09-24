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
  this.__controllerPath = 'index0';
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
  $.__views["index"] = Alloy.createController('slideshow', { id: "index", __parentSymbol: __parentSymbol }).getViewEx({ recurse: true });
  $.__views["index"] && $.addTopLevelView($.__views["index"]);
  exports.destroy = function () {};

  // make all IDed elements in $.__views available right on the $ in a
  // controller's internal code. Externally the IDed elements will
  // be accessed with getView().
  _.extend($, $.__views);

  // Controller code directly from the developer's controller file
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
            var navMenu = Titanium.UI.iOS.createNavigationWindow();
            var win = Alloy.createController("home").getView();
            navMenu.window = win;
            Alloy.Globals.navMenu = navMenu;
            Alloy.Globals.navMenu.open();
          } else {
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

  Alloy.Globals.API.callByPost({ url: "dateNow" }, function (responseText) {
    var res = JSON.parse(responseText);

    if (res.status != "error") {
      Alloy.Globals.common.sync_time(res.data);
    }

  });

  // Generated code that must be executed after all UI and
  // controller code. One example deferred event handlers whose
  // functions are not defined until after the controller code
  // is executed.


  // Extend the $ instance with all functions and properties
  // defined on the exports object.
  _.extend($, exports);
}

module.exports = Controller;
//# sourceMappingURL=file://c:\Users\DanialHaikal\Documents\Appcelerator_Studio_Workspace\plux/build/map/Resources\android\alloy\controllers\index0.js.map