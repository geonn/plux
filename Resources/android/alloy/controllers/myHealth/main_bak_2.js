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
	this.__controllerPath = 'myHealth/main_bak_2';
	this.args = arguments[0] || {};

	if (arguments[0]) {
		var __parentSymbol = __processArg(arguments[0], '__parentSymbol');
		var $model = __processArg(arguments[0], '$model');
		var __itemTemplate = __processArg(arguments[0], '__itemTemplate');
	}
	var $ = this;
	var exports = {};
	var __defers = {};







	$.__views.myhealth = Ti.UI.createWindow(
	{ backgroundColor: "#ffffff", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, width: Ti.UI.FILL, height: Ti.UI.FILL, title: "MY HEALTH RECORD", id: "myhealth", backButtonTitle: "", navTintColor: "#CE1D1C" });

	$.__views.myhealth && $.addTopLevelView($.__views.myhealth);
	$.__views.__alloyId716 = Ti.UI.createView(
	{ id: "__alloyId716" });

	$.__views.moreHealth = Ti.UI.createImageView(
	{ right: 0, id: "moreHealth", width: 30, image: "/images/health_love.png" });

	$.__views.__alloyId716.add($.__views.moreHealth);
	$.__views.myhealth.rightNavButton = $.__views.__alloyId716;$.__views.main = Ti.UI.createView(
	{ layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.FILL, id: "main", backgroundColor: "#ffffff" });

	$.__views.myhealth.add($.__views.main);
	if (true) {
		$.__views.__alloyId717 = Ti.UI.createView(
		{ layout: "horizontal", width: Ti.UI.FILL, height: 50, backgroundColor: "#DEDEDE", id: "__alloyId717" });

		$.__views.main.add($.__views.__alloyId717);
		$.__views.__alloyId718 = Ti.UI.createView(
		{ left: 0, width: "10%", id: "__alloyId718" });

		$.__views.__alloyId717.add($.__views.__alloyId718);
		$.__views.btnBack = Ti.UI.createImageView(
		{ left: 10, id: "btnBack", width: 25, height: 25, image: "/images/btn-back.png" });

		$.__views.__alloyId718.add($.__views.btnBack);
		$.__views.pageTitle = Ti.UI.createView(
		{ id: "pageTitle", width: "80%" });

		$.__views.__alloyId717.add($.__views.pageTitle);
		$.__views.__alloyId719 = Ti.UI.createLabel(
		{ width: Titanium.UI.SIZE, height: Ti.UI.SIZE, color: "#606060", font: { fontSize: "16dp" }, text: 'Health Info', textAlign: "center", id: "__alloyId719" });

		$.__views.pageTitle.add($.__views.__alloyId719);
		$.__views.__alloyId720 = Ti.UI.createView(
		{ width: "10%", id: "__alloyId720" });

		$.__views.__alloyId717.add($.__views.__alloyId720);
		$.__views.moreHealth = Ti.UI.createImageView(
		{ id: "moreHealth", width: 30, image: "/images/health_love.png" });

		$.__views.__alloyId720.add($.__views.moreHealth);
	}
	$.__views.graphScrollView = Ti.UI.createScrollView(
	{ id: "graphScrollView", layout: "vertical", height: "auto", width: "100%", backgroundColor: "#EBEBEB", contentWidth: Ti.UI.FILL });

	$.__views.main.add($.__views.graphScrollView);
	$.__views.bmiView = Ti.UI.createView(
	{ id: "bmiView", gType: 1, height: Ti.UI.SIZE, layout: "vertical", left: 10, right: 10, top: 10, borderColor: "#dfe0e4", width: Ti.UI.FILL, backgroundColor: "#FFFFFF", visible: false });

	$.__views.graphScrollView.add($.__views.bmiView);
	navTo ? $.addListener($.__views.bmiView, 'click', navTo) : __defers['$.__views.bmiView!click!navTo'] = true;$.__views.bmiWebView = Ti.UI.createWebView(
	{ touchEnabled: false, gType: 1, id: "bmiWebView", height: 230, width: Ti.UI.FILL, url: "/html/bmi.html", disableBounce: true });

	$.__views.bmiView.add($.__views.bmiWebView);
	getDataByType ? $.addListener($.__views.bmiWebView, 'load', getDataByType) : __defers['$.__views.bmiWebView!load!getDataByType'] = true;$.__views.__alloyId721 = Ti.UI.createView(
	{ touchEnabled: false, height: 1, left: 10, right: 10, bottom: 0, backgroundColor: "#dfe0e4", width: Ti.UI.FILL, id: "__alloyId721" });

	$.__views.bmiView.add($.__views.__alloyId721);
	$.__views.__alloyId722 = Ti.UI.createView(
	{ touchEnabled: false, height: Ti.UI.SIZE, left: 10, right: 10, top: 10, bottom: 10, id: "__alloyId722" });

	$.__views.bmiView.add($.__views.__alloyId722);
	$.__views.__alloyId723 = Ti.UI.createLabel(
	{ width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#9197a3", text: 'Latest', touchEnabled: false, font: "fontSize: 12", left: 0, id: "__alloyId723" });

	$.__views.__alloyId722.add($.__views.__alloyId723);
	$.__views.bmiDetailLabel = Ti.UI.createLabel(
	{ width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#9197a3", touchEnabled: false, font: "fontSize: 12", right: 0, id: "bmiDetailLabel" });

	$.__views.__alloyId722.add($.__views.bmiDetailLabel);
	exports.destroy = function () {};




	_.extend($, $.__views);








	__defers['$.__views.bmiView!click!navTo'] && $.addListener($.__views.bmiView, 'click', navTo);__defers['$.__views.bmiWebView!load!getDataByType'] && $.addListener($.__views.bmiWebView, 'load', getDataByType);



	_.extend($, exports);
}

module.exports = Controller;