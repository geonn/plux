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
	this.__controllerPath = 'clinic/clinicMap';
	this.args = arguments[0] || {};

	if (arguments[0]) {
		var __parentSymbol = __processArg(arguments[0], '__parentSymbol');
		var $model = __processArg(arguments[0], '$model');
		var __itemTemplate = __processArg(arguments[0], '__itemTemplate');
	}
	var $ = this;
	var exports = {};
	var __defers = {};







	$.__views.panelMapWin = Ti.UI.createWindow(
	{ backgroundColor: "#535a74", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, title: "Panel Map", id: "panelMapWin", backButtonTitle: "", navTintColor: "#CE1D1C" });

	$.__views.panelMapWin && $.addTopLevelView($.__views.panelMapWin);
	$.__views.__alloyId546 = Ti.UI.createView(
	{ borderWidth: 0, height: Ti.UI.FILL, width: Ti.UI.FILL, layout: "vertical", id: "__alloyId546" });

	$.__views.panelMapWin.add($.__views.__alloyId546);
	if (true) {
		$.__views.__alloyId547 = Ti.UI.createView(
		{ borderWidth: 0, layout: "horizontal", height: 50, width: "100%", backgroundColor: "#DEDEDE", id: "__alloyId547" });

		$.__views.__alloyId546.add($.__views.__alloyId547);
		$.__views.__alloyId548 = Ti.UI.createView(
		{ borderWidth: 0, left: 0, width: "10%", id: "__alloyId548" });

		$.__views.__alloyId547.add($.__views.__alloyId548);
		$.__views.btnBack = Ti.UI.createImageView(
		{ left: 10, id: "btnBack", width: 25, height: 25, image: "/images/btn-back.png" });

		$.__views.__alloyId548.add($.__views.btnBack);
		$.__views.pageTitle = Ti.UI.createView(
		{ borderWidth: 0, id: "pageTitle", width: Ti.UI.FILL });

		$.__views.__alloyId547.add($.__views.pageTitle);
		$.__views.__alloyId549 = Ti.UI.createLabel(
		{ width: Titanium.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontSize: "16dp" }, text: 'Clinic Map', textAlign: "center", id: "__alloyId549" });

		$.__views.pageTitle.add($.__views.__alloyId549);
	}
	$.__views.panelMap = Ti.UI.createScrollView(
	{ id: "panelMap", scrollType: "vertical", height: Ti.UI.SIZE, width: Ti.UI.FILL });

	$.__views.__alloyId546.add($.__views.panelMap);
	exports.destroy = function () {};




	_.extend($, $.__views);


	var args = arguments[0] || {};

	var maps = args.map_url;

	$.panelMap.add(Ti.UI.createWebView({
		url: maps,
		width: Ti.UI.FILL,
		height: Ti.UI.FILL }));



	if ('android' == "android") {
		$.btnBack.addEventListener('click', function () {
			nav.closeWindow($.panelMapWin);
		});
	}









	_.extend($, exports);
}

module.exports = Controller;