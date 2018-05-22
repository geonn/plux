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
	this.__controllerPath = 'hra';
	this.args = arguments[0] || {};

	if (arguments[0]) {
		var __parentSymbol = __processArg(arguments[0], '__parentSymbol');
		var $model = __processArg(arguments[0], '$model');
		var __itemTemplate = __processArg(arguments[0], '__itemTemplate');
	}
	var $ = this;
	var exports = {};
	var __defers = {};







	$.__views.hra = Ti.UI.createWindow(
	{ backgroundColor: "#535a74", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, title: "Health Risk Assessment", id: "hra", backButtonTitle: "", navTintColor: "#CE1D1C" });

	$.__views.hra && $.addTopLevelView($.__views.hra);
	$.__views.__alloyId628 = Ti.UI.createView(
	{ borderWidth: 0, layout: "vertical", id: "__alloyId628" });

	$.__views.hra.add($.__views.__alloyId628);
	if (true) {
		$.__views.__alloyId629 = Ti.UI.createView(
		{ borderWidth: 0, layout: "horizontal", height: 50, width: Ti.UI.FILL, backgroundColor: "#DEDEDE", id: "__alloyId629" });

		$.__views.__alloyId628.add($.__views.__alloyId629);
		$.__views.__alloyId630 = Ti.UI.createView(
		{ borderWidth: 0, left: 0, width: "20%", id: "__alloyId630" });

		$.__views.__alloyId629.add($.__views.__alloyId630);
		$.__views.btnBack = Ti.UI.createImageView(
		{ left: 10, id: "btnBack", width: 25, height: 25, image: "/images/btn-back.png" });

		$.__views.__alloyId630.add($.__views.btnBack);
		$.__views.__alloyId631 = Ti.UI.createView(
		{ borderWidth: 0, width: "60%", id: "__alloyId631" });

		$.__views.__alloyId629.add($.__views.__alloyId631);
		$.__views.pageTitle = Ti.UI.createLabel(
		{ width: Titanium.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontSize: "16dp" }, text: 'Health Risk Assessment', id: "pageTitle", textAlign: "center" });

		$.__views.__alloyId631.add($.__views.pageTitle);
	}
	var __alloyId632 = [];$.__views.__alloyId633 = Ti.UI.createTableViewRow(
	{ color: "#606060", top: 5, bottom: 5, mod: "bmi", height: 40, id: "__alloyId633" });

	__alloyId632.push($.__views.__alloyId633);$.__views.__alloyId634 = Ti.UI.createLabel(
	{ width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", text: 'BMI Calculator', textAlign: "left", left: 15, id: "__alloyId634" });

	$.__views.__alloyId633.add($.__views.__alloyId634);
	$.__views.__alloyId635 = Ti.UI.createTableViewRow(
	{ color: "#606060", top: 5, bottom: 5, mod: "whratio", height: 40, id: "__alloyId635" });

	__alloyId632.push($.__views.__alloyId635);$.__views.__alloyId636 = Ti.UI.createLabel(
	{ width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", text: 'Waist-To-Hips Ratio Calculator', textAlign: "left", left: 15, id: "__alloyId636" });

	$.__views.__alloyId635.add($.__views.__alloyId636);
	$.__views.__alloyId637 = Ti.UI.createTableViewRow(
	{ color: "#606060", top: 5, bottom: 5, mod: "nutritional_profile", height: 40, id: "__alloyId637" });

	__alloyId632.push($.__views.__alloyId637);$.__views.__alloyId638 = Ti.UI.createLabel(
	{ width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", text: 'Nutritional Profile', textAlign: "left", left: 15, id: "__alloyId638" });

	$.__views.__alloyId637.add($.__views.__alloyId638);
	$.__views.__alloyId639 = Ti.UI.createTableViewRow(
	{ color: "#606060", top: 5, bottom: 5, mod: "smokecost", height: 40, id: "__alloyId639" });

	__alloyId632.push($.__views.__alloyId639);$.__views.__alloyId640 = Ti.UI.createLabel(
	{ width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", text: 'Smoking Cost Calculator', textAlign: "left", left: 15, id: "__alloyId640" });

	$.__views.__alloyId639.add($.__views.__alloyId640);
	$.__views.__alloyId641 = Ti.UI.createTableViewRow(
	{ color: "#606060", top: 5, bottom: 5, mod: "diabetes", height: 40, id: "__alloyId641" });

	__alloyId632.push($.__views.__alloyId641);$.__views.__alloyId642 = Ti.UI.createLabel(
	{ width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", text: 'Diabetes Risk Calculator', textAlign: "left", left: 15, id: "__alloyId642" });

	$.__views.__alloyId641.add($.__views.__alloyId642);
	$.__views.menu = Ti.UI.createTableView(
	{ data: __alloyId632, id: "menu" });

	$.__views.__alloyId628.add($.__views.menu);
	exports.destroy = function () {};




	_.extend($, $.__views);


	var args = arguments[0] || {};








	$.menu.addEventListener('click', function (e) {
		var elbl = JSON.stringify(e.rowData);
		var res = JSON.parse(elbl);
		nav.navigateWithArgs("hra_detail", { mod: res.mod });
	});

	if ('android' == "android") {
		$.btnBack.addEventListener('click', function () {
			nav.closeWindow($.hra);
		});
	}









	_.extend($, exports);
}

module.exports = Controller;