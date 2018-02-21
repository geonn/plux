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
	this.__controllerPath = 'hra_detail';
	this.args = arguments[0] || {};

	if (arguments[0]) {
		var __parentSymbol = __processArg(arguments[0], '__parentSymbol');
		var $model = __processArg(arguments[0], '$model');
		var __itemTemplate = __processArg(arguments[0], '__itemTemplate');
	}
	var $ = this;
	var exports = {};
	var __defers = {};

	$.__views.hraDetailsWin = Ti.UI.createWindow({ backgroundColor: "#ffffff", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, title: "", backButtonTitle: "", id: "hraDetailsWin", navTintColor: "#CE1D1C" });
	$.__views.hraDetailsWin && $.addTopLevelView($.__views.hraDetailsWin);
	$.__views.__alloyId460 = Ti.UI.createView({ height: Ti.UI.FILL, width: Ti.UI.FILL, layout: "vertical", id: "__alloyId460" });
	$.__views.hraDetailsWin.add($.__views.__alloyId460);
	if (true) {
		$.__views.__alloyId461 = Ti.UI.createView({ layout: "horizontal", height: 50, width: "100%", backgroundColor: "#DEDEDE", id: "__alloyId461" });
		$.__views.__alloyId460.add($.__views.__alloyId461);
		$.__views.__alloyId462 = Ti.UI.createView({ left: 0, width: "10%", id: "__alloyId462" });
		$.__views.__alloyId461.add($.__views.__alloyId462);
		$.__views.btnBack = Ti.UI.createImageView({ left: 10, id: "btnBack", width: 25, height: 25, image: "/images/btn-back.png" });
		$.__views.__alloyId462.add($.__views.btnBack);
		$.__views.pageTitle = Ti.UI.createView({ id: "pageTitle", width: Ti.UI.FILL });
		$.__views.__alloyId461.add($.__views.pageTitle);
		$.__views.hraTitle = Ti.UI.createLabel({ width: Titanium.UI.SIZE, height: Ti.UI.SIZE, color: "#606060", font: { fontSize: "16dp" }, id: "hraTitle", textAlign: "center" });
		$.__views.pageTitle.add($.__views.hraTitle);
	}
	$.__views.__alloyId463 = Ti.UI.createScrollView({ height: Ti.UI.FILL, width: Ti.UI.FILL, contentHeight: Ti.UI.SIZE, contentWidth: Ti.UI.FILL, layout: "vertical", id: "__alloyId463" });
	$.__views.__alloyId460.add($.__views.__alloyId463);
	$.__views.input_box = Ti.UI.createView({ id: "input_box", height: Ti.UI.SIZE });
	$.__views.__alloyId463.add($.__views.input_box);
	$.__views.description = Ti.UI.createView({ id: "description", height: Ti.UI.SIZE });
	$.__views.__alloyId463.add($.__views.description);
	$.__views.picker = Ti.UI.createView({ bottom: 0, height: Ti.UI.SIZE, width: Ti.UI.FILL, id: "picker" });
	$.__views.hraDetailsWin.add($.__views.picker);
	exports.destroy = function () {};

	_.extend($, $.__views);

	var args = arguments[0] || {};
	var mod = args.mod;

	var module = require("hra/" + mod);
	module.construct($);

	if (false) {
		$.hraDetailsWin.title = module.title;
	} else {
		$.hraTitle.text = module.title;
	}

	$.description.add(module.description());
	$.input_box.add(module.input_box());

	if ('android' == "android") {
		$.btnBack.addEventListener('click', function () {
			nav.closeWindow($.hraDetailsWin);
		});
	}

	_.extend($, exports);
}

module.exports = Controller;