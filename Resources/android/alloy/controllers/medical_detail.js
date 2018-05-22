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
	this.__controllerPath = 'medical_detail';
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
	{ backgroundColor: "#535a74", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, width: Ti.UI.FILL, height: Ti.UI.FILL, title: "Medical Detail", id: "win", backButtonTitle: "", navTintColor: "#CE1D1C" });

	$.__views.win && $.addTopLevelView($.__views.win);
	$.__views.__alloyId741 = Ti.UI.createView(
	{ borderWidth: 0, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.FILL, id: "__alloyId741" });

	$.__views.win.add($.__views.__alloyId741);
	if (true) {
		$.__views.__alloyId742 = Ti.UI.createView(
		{ borderWidth: 0, layout: "horizontal", height: 50, width: Ti.UI.FILL, backgroundColor: "#DEDEDE", id: "__alloyId742" });

		$.__views.__alloyId741.add($.__views.__alloyId742);
		$.__views.__alloyId743 = Ti.UI.createView(
		{ borderWidth: 0, left: 0, width: "20%", id: "__alloyId743" });

		$.__views.__alloyId742.add($.__views.__alloyId743);
		$.__views.btnBack = Ti.UI.createImageView(
		{ left: 10, id: "btnBack", width: 25, height: 25, image: "/images/btn-back.png" });

		$.__views.__alloyId743.add($.__views.btnBack);
		$.__views.__alloyId744 = Ti.UI.createView(
		{ borderWidth: 0, width: "60%", id: "__alloyId744" });

		$.__views.__alloyId742.add($.__views.__alloyId744);
		$.__views.pageTitle = Ti.UI.createLabel(
		{ width: Titanium.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontSize: "16dp" }, text: 'Medical Detail', id: "pageTitle", textAlign: "center" });

		$.__views.__alloyId744.add($.__views.pageTitle);
	}
	$.__views.listing = Ti.UI.createScrollView(
	{ layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.FILL, contentHeight: Ti.UI.SIZE, contentWidth: Ti.UI.FILL, id: "listing" });

	$.__views.__alloyId741.add($.__views.listing);
	exports.destroy = function () {};




	_.extend($, $.__views);


	var args = arguments[0] || {};
	var loading = Alloy.createController("loading");
	var u_id = Ti.App.Properties.getString('u_id');

	function init() {
		$.win.add(loading.getView());
	}

	init();

	if (true) {
		$.btnBack.addEventListener('click', function () {
			$.win.close();
		});
	}

	$.win.addEventListener("close", function () {
		$.destroy();
		console.log("window close");
	});









	_.extend($, exports);
}

module.exports = Controller;