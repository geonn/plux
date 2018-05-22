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
	this.__controllerPath = 'asp/benefit';
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
	{ backgroundColor: "#535a74", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, title: "Flexi-Benefit", backButtonTitle: "", navTintColor: "#CE1D1C", id: "win" });

	$.__views.win && $.addTopLevelView($.__views.win);
	$.__views.__alloyId224 = Ti.UI.createView(
	{ borderWidth: 0, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.FILL, backgroundColor: "#f5f5f5", id: "__alloyId224" });

	$.__views.win.add($.__views.__alloyId224);
	$.__views.surveyView = Ti.UI.createWebView(
	{ width: Ti.UI.FILL, height: Ti.UI.FILL, backgroundColor: "#f5f5f5", id: "surveyView", url: "http://flexi.freejini.com.my/" });

	$.__views.__alloyId224.add($.__views.surveyView);
	$.__views.defaultMsgView = Ti.UI.createView(
	{ borderWidth: 0, layout: "vertical", height: "auto", id: "defaultMsgView", top: 5 });

	$.__views.win.add($.__views.defaultMsgView);
	$.__views.__alloyId225 = Ti.UI.createLabel(
	{ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#111111", text: 'Page not found.', id: "__alloyId225" });

	$.__views.defaultMsgView.add($.__views.__alloyId225);
	exports.destroy = function () {};




	_.extend($, $.__views);


	var args = arguments[0] || {};
	var ic_no = Ti.App.Properties.getString('ic_no');
	var memno = Ti.App.Properties.getString('memno');
	var url = args.url || "http://flexi.freejini.com.my/main/appLogin?user=flexi&value=29175304721014532l49f7207c8943981&ic_no=" + memno;
	var HTMLcontent = '<html><meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" /><meta name="viewport" content="width=device-width, initial-scale=1.0">' + args.html + "</html>" || "";
	if (url != "") {
		$.surveyView.url = url;
		$.defaultMsgView.height = 0;
	} else {
		if (HTMLcontent != "") {
			HTMLcontent = HTMLcontent.replace(/\[\[/g, "<");
			HTMLcontent = HTMLcontent.replace(/\]\]/g, ">");
			$.surveyView.setHtml(HTMLcontent);
			$.defaultMsgView.height = 0;
		} else {
			$.surveyView.height = 0;
		}
	}

	function closeWindow() {
		$.win.close();
	}









	_.extend($, exports);
}

module.exports = Controller;