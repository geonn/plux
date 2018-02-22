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
	this.__controllerPath = 'askDoctor/index';
	this.args = arguments[0] || {};

	if (arguments[0]) {
		var __parentSymbol = __processArg(arguments[0], '__parentSymbol');
		var $model = __processArg(arguments[0], '$model');
		var __itemTemplate = __processArg(arguments[0], '__itemTemplate');
	}
	var $ = this;
	var exports = {};
	var __defers = {};







	var __alloyId199 = [];$.__views.__alloyId200 = Alloy.createController('askDoctor/find_doctor', { id: "__alloyId200" });
	$.__views.tab1 = Ti.UI.createTab(
	{ window: $.__views.__alloyId200.getViewEx({ recurse: true }), id: "tab1", title: "Find Doctor" });

	__alloyId199.push($.__views.tab1);$.__views.index = Ti.UI.createTabGroup(
	{ tabs: __alloyId199, backgroundColor: "white", id: "index" });

	$.__views.index && $.addTopLevelView($.__views.index);
	exports.destroy = function () {};




	_.extend($, $.__views);


	var args = arguments[0] || {};

	function init() {}

	init();









	_.extend($, exports);
}

module.exports = Controller;