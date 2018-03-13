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
	this.__controllerPath = 'loading';
	this.args = arguments[0] || {};

	if (arguments[0]) {
		var __parentSymbol = __processArg(arguments[0], '__parentSymbol');
		var $model = __processArg(arguments[0], '$model');
		var __itemTemplate = __processArg(arguments[0], '__itemTemplate');
	}
	var $ = this;
	var exports = {};
	var __defers = {};







	$.__views.loadingBar = Ti.UI.createView(
	{ layout: "vertical", zIndex: 200, id: "loadingBar", height: 120, width: 120, borderRadius: 15, backgroundColor: "#2E2E2E" });

	$.__views.loadingBar && $.addTopLevelView($.__views.loadingBar);
	if (true) {
		$.__views.activityIndicator = Ti.UI.createActivityIndicator(
		{ top: 0, left: 30, width: 60, id: "activityIndicator", style: Ti.UI.ActivityIndicatorStyle.BIG });

		$.__views.loadingBar.add($.__views.activityIndicator);
	}
	$.__views.__alloyId502 = Ti.UI.createLabel(
	{ width: Ti.UI.FILL, height: Titanium.UI.SIZE, color: "#ffffff", textAlign: "center", top: 5, text: "Loading", id: "__alloyId502" });

	$.__views.loadingBar.add($.__views.__alloyId502);
	exports.destroy = function () {};




	_.extend($, $.__views);


	var args = arguments[0] || {};
	$.loadingBar.hide();
	$.activityIndicator.hide();



	$.start = function () {
		$.loadingBar.show();
		$.activityIndicator.show();
	};




	$.finish = function (_callback) {
		console.log("hide loading");
		$.loadingBar.hide();
		$.activityIndicator.hide();
		_callback && _callback();
	};









	_.extend($, exports);
}

module.exports = Controller;