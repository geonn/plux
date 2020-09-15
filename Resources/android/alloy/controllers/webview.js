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
  this.__controllerPath = 'webview';
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
  { barColor: "transparent", backgroundColor: "#535a74", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, title: "", backButtonTitle: "", navTintColor: "#CE1D1C", id: "win" });

  $.__views["win"] && $.addTopLevelView($.__views["win"]);
  $.__views["main"] = Ti.UI.createView(
  { borderWidth: 0, width: Ti.UI.FILL, height: Ti.UI.FILL, id: "main" });

  $.__views["win"].add($.__views["main"]);
  $.__views["defaultMsgView"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", height: "auto", id: "defaultMsgView", top: 5 });

  $.__views["main"].add($.__views["defaultMsgView"]);
  $.__views["__alloyId903"] = Ti.UI.createLabel(
  { width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial" }, text: 'Page not found.', id: "__alloyId903" });

  $.__views["defaultMsgView"].add($.__views["__alloyId903"]);
  exports.destroy = function () {};

  // make all IDed elements in $.__views available right on the $ in a
  // controller's internal code. Externally the IDed elements will
  // be accessed with getView().
  _.extend($, $.__views);

  // Controller code directly from the developer's controller file
  var args = arguments[0] || {};
  var url = args.url || "";
  var content = args.content != "" ? args.content : args.subject;
  $.win.title = args.title != "" ? args.title : $.win.title;
  var HTMLcontent = '<html><meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" /><meta name="viewport" content="width=device-width, initial-scale=1.0"><body>' + content + "</body></html>" || "";
  console.log("url " + url);
  console.log(args);
  var webview = $.UI.create("WebView", { willHandleTouches: false, allowedURLSchemes: ["asp"], backgroundColor: "#f5f5f5", classes: ['wfill', 'hfill'] });
  $.main.add(webview);
  function share(e) {
    console.log(e.link + " should be correct " + e.title);
    require('com.alcoapps.socialshare').share({
      status: "https://" + e.link,
      androidDialogTitle: e.title
      //image 					: fileToShare.nativePath,
    });
  }
  if (url != "") {
    webview.url = url;
    $.defaultMsgView.height = 0;
  } else {
    console.log(HTMLcontent);
    if (HTMLcontent != "") {
      HTMLcontent = HTMLcontent.replace(/\[\[/g, "<");
      HTMLcontent = HTMLcontent.replace(/\]\]/g, ">");
      HTMLcontent = HTMLcontent.replace(/\\'/g, "'");
      webview.setHtml(nl2br(HTMLcontent));
      console.log('yes');
      $.defaultMsgView.height = 0;
    } else {
      webview.height = 0;
    }
  }

  function closeWindow() {
    $.win.close();
  }

  function nl2br(str, is_xhtml) {
    var breakTag = is_xhtml || typeof is_xhtml === 'undefined' ? '<br />' : '<br>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
  }

  function scheme_action() {
    console.log("scheme_action");
    if (!_.isUndefined(Ti.App.getArguments().url)) {
      Ti.API.info("RESUME URLSCHEME: " + Ti.App.getArguments().url);
      var url = Ti.App.getArguments().url;
      var ods = url.substring("scheme://".length, url.length);
      console.log(ods);
      share(ods);
    }
  }

  webview.addEventListener('handleurl', function (e) {
    var handler = e.handler;
    console.log("wtf " + e.url);
    var url = e.url;
    var ods = url.substring("asp://".length, url.length);
    //console.log(decodeURIComponent(ods.replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"'));
    //var params = JSON.parse('{"'+'"}')；
    var params = {};
    ods.replace(/([^=&]+)=([^&]*)/g, function (m, key, value) {
      params[decodeURIComponent(key)] = decodeURIComponent(value);
    });
    share(params);
    //Ti.Platform.openURL(e.url);
    //handler.invoke(Ti.UI.iOS.ACTION_POLICY_CANCEL); 
  });

  if (true) {
    webview.addEventListener("beforeload", function (e) {
      console.log('loadbeofre');
      if (e.url.startsWith("asp")) {
        webview.stopLoading();
        setTimeout(function () {
          var share_url = e.url;
          var ods = share_url.substring("asp://".length, share_url.length);
          //console.log(decodeURIComponent(ods.replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"'));
          //var params = JSON.parse('{"'+'"}')；
          var params = {};
          ods.replace(/([^=&]+)=([^&]*)/g, function (m, key, value) {
            params[decodeURIComponent(key)] = decodeURIComponent(value);
          });
          share(params);
          webview.url = url;
        }, 1000);
        /*
                            */
      }
    });
  }

  // Generated code that must be executed after all UI and
  // controller code. One example deferred event handlers whose
  // functions are not defined until after the controller code
  // is executed.


  // Extend the $ instance with all functions and properties
  // defined on the exports object.
  _.extend($, exports);
}

module.exports = Controller;
//# sourceMappingURL=file://c:\Users\DanialHaikal\Documents\Appcelerator_Studio_Workspace\plux/build/map/Resources\android\alloy\controllers\webview.js.map