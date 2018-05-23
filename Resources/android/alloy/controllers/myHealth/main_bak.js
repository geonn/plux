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
	this.__controllerPath = 'myHealth/main_bak';
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
	{ backgroundColor: "#535a74", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, title: "MY HEALTH RECORD", id: "myhealth", backButtonTitle: "", navTintColor: "#CE1D1C" });

	$.__views.myhealth && $.addTopLevelView($.__views.myhealth);
	$.__views.__alloyId911 = Ti.UI.createView(
	{ borderWidth: 0, id: "__alloyId911" });

	$.__views.moreHealth = Ti.UI.createImageView(
	{ right: 0, id: "moreHealth", width: 30, image: "/images/health_love.png" });

	$.__views.__alloyId911.add($.__views.moreHealth);
	$.__views.myhealth.rightNavButton = $.__views.__alloyId911;$.__views.__alloyId912 = Ti.UI.createView(
	{ borderWidth: 0, id: "__alloyId912" });

	$.__views.myhealth.add($.__views.__alloyId912);
	$.__views.loadingBar = Ti.UI.createView(
	{ borderWidth: 0, layout: "vertical", id: "loadingBar", height: 120, width: 120, borderRadius: 15, backgroundColor: "#2E2E2E" });

	$.__views.__alloyId912.add($.__views.loadingBar);
	$.__views.activityIndicator = Ti.UI.createActivityIndicator(
	{ top: 10, left: 30, width: 60, id: "activityIndicator" });

	$.__views.loadingBar.add($.__views.activityIndicator);
	$.__views.__alloyId913 = Ti.UI.createLabel(
	{ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#ffffff", top: 5, bottom: 10, text: "Loading", id: "__alloyId913" });

	$.__views.loadingBar.add($.__views.__alloyId913);
	$.__views.main = Ti.UI.createView(
	{ borderWidth: 0, id: "main", layout: "vertical", backgroundColor: "#ffffff" });

	$.__views.__alloyId912.add($.__views.main);
	if (true) {
		$.__views.__alloyId914 = Ti.UI.createView(
		{ borderWidth: 0, layout: "horizontal", height: 50, width: "100%", backgroundColor: "#DEDEDE", id: "__alloyId914" });

		$.__views.main.add($.__views.__alloyId914);
		$.__views.__alloyId915 = Ti.UI.createView(
		{ borderWidth: 0, left: 0, width: "10%", id: "__alloyId915" });

		$.__views.__alloyId914.add($.__views.__alloyId915);
		$.__views.btnBack = Ti.UI.createImageView(
		{ left: 10, id: "btnBack", width: 25, height: 25, image: "/images/btn-back.png" });

		$.__views.__alloyId915.add($.__views.btnBack);
		$.__views.pageTitle = Ti.UI.createView(
		{ borderWidth: 0, id: "pageTitle", width: "80%" });

		$.__views.__alloyId914.add($.__views.pageTitle);
		$.__views.__alloyId916 = Ti.UI.createLabel(
		{ width: Titanium.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontSize: "16dp" }, text: 'Health Info', textAlign: "center", id: "__alloyId916" });

		$.__views.pageTitle.add($.__views.__alloyId916);
		$.__views.__alloyId917 = Ti.UI.createView(
		{ borderWidth: 0, width: "10%", id: "__alloyId917" });

		$.__views.__alloyId914.add($.__views.__alloyId917);
		$.__views.moreHealth = Ti.UI.createImageView(
		{ id: "moreHealth", width: 30, image: "/images/health_love.png" });

		$.__views.__alloyId917.add($.__views.moreHealth);
	}
	$.__views.graphScrollView = Ti.UI.createScrollView(
	{ id: "graphScrollView", layout: "vertical", height: "auto", width: "100%", backgroundColor: "#EBEBEB", contentWidth: Ti.UI.FILL });

	$.__views.main.add($.__views.graphScrollView);
	$.__views.bmiView = Ti.UI.createView(
	{ borderWidth: 0, id: "bmiView", gType: 1, height: Ti.UI.SIZE, layout: "vertical", left: 10, right: 10, top: 10, borderColor: "#dfe0e4", width: Ti.UI.FILL, backgroundColor: "#FFFFFF", visible: false });

	$.__views.graphScrollView.add($.__views.bmiView);
	$.__views.bmiWebView = Ti.UI.createWebView(
	{ touchEnabled: false, id: "bmiWebView", height: 230, width: Ti.UI.FILL, url: "/html/bmi.html", disableBounce: true });

	$.__views.bmiView.add($.__views.bmiWebView);
	$.__views.__alloyId918 = Ti.UI.createView(
	{ borderWidth: 0, height: 1, left: 10, right: 10, bottom: 0, backgroundColor: "#dfe0e4", width: Ti.UI.FILL, id: "__alloyId918" });

	$.__views.bmiView.add($.__views.__alloyId918);
	$.__views.__alloyId919 = Ti.UI.createView(
	{ borderWidth: 0, height: Ti.UI.SIZE, left: 10, right: 10, top: 10, bottom: 10, id: "__alloyId919" });

	$.__views.bmiView.add($.__views.__alloyId919);
	$.__views.__alloyId920 = Ti.UI.createLabel(
	{ width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#9197a3", text: 'Latest', font: "fontSize: 12", left: 0, id: "__alloyId920" });

	$.__views.__alloyId919.add($.__views.__alloyId920);
	$.__views.bmiDetailLabel = Ti.UI.createLabel(
	{ width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#9197a3", font: "fontSize: 12", right: 0, id: "bmiDetailLabel" });

	$.__views.__alloyId919.add($.__views.bmiDetailLabel);
	$.__views.bloodPressureView = Ti.UI.createView(
	{ borderWidth: 0, id: "bloodPressureView", gType: 2, height: Ti.UI.SIZE, layout: "vertical", left: 10, right: 10, top: 10, borderColor: "#dfe0e4", width: Ti.UI.FILL, backgroundColor: "#FFFFFF", visible: false });

	$.__views.graphScrollView.add($.__views.bloodPressureView);
	$.__views.bloodPressureWebView = Ti.UI.createWebView(
	{ touchEnabled: false, id: "bloodPressureWebView", height: 230, width: Ti.UI.FILL, url: "/html/bloodPressure.html", disableBounce: true });

	$.__views.bloodPressureView.add($.__views.bloodPressureWebView);
	$.__views.__alloyId921 = Ti.UI.createView(
	{ borderWidth: 0, height: 1, left: 10, right: 10, bottom: 0, backgroundColor: "#dfe0e4", width: Ti.UI.FILL, id: "__alloyId921" });

	$.__views.bloodPressureView.add($.__views.__alloyId921);
	$.__views.__alloyId922 = Ti.UI.createView(
	{ borderWidth: 0, height: Ti.UI.SIZE, left: 10, right: 10, top: 10, bottom: 10, id: "__alloyId922" });

	$.__views.bloodPressureView.add($.__views.__alloyId922);
	$.__views.__alloyId923 = Ti.UI.createLabel(
	{ width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#9197a3", text: 'Latest', font: "fontSize: 12", left: 0, id: "__alloyId923" });

	$.__views.__alloyId922.add($.__views.__alloyId923);
	$.__views.bloodPressureDetailLabel = Ti.UI.createLabel(
	{ width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#9197a3", font: "fontSize: 12", right: 0, id: "bloodPressureDetailLabel" });

	$.__views.__alloyId922.add($.__views.bloodPressureDetailLabel);
	$.__views.heartRateView = Ti.UI.createView(
	{ borderWidth: 0, id: "heartRateView", gType: 3, height: Ti.UI.SIZE, layout: "vertical", left: 10, right: 10, top: 10, borderColor: "#dfe0e4", width: Ti.UI.FILL, backgroundColor: "#FFFFFF", visible: false });

	$.__views.graphScrollView.add($.__views.heartRateView);
	$.__views.heartRateWebView = Ti.UI.createWebView(
	{ touchEnabled: false, id: "heartRateWebView", height: 230, width: Ti.UI.FILL, url: "/html/heartRate.html", disableBounce: true });

	$.__views.heartRateView.add($.__views.heartRateWebView);
	$.__views.__alloyId924 = Ti.UI.createView(
	{ borderWidth: 0, height: 1, left: 10, right: 10, bottom: 0, backgroundColor: "#dfe0e4", width: Ti.UI.FILL, id: "__alloyId924" });

	$.__views.heartRateView.add($.__views.__alloyId924);
	$.__views.__alloyId925 = Ti.UI.createView(
	{ borderWidth: 0, height: Ti.UI.SIZE, left: 10, right: 10, top: 10, bottom: 10, id: "__alloyId925" });

	$.__views.heartRateView.add($.__views.__alloyId925);
	$.__views.__alloyId926 = Ti.UI.createLabel(
	{ width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#9197a3", text: 'Latest', font: "fontSize: 12", left: 0, id: "__alloyId926" });

	$.__views.__alloyId925.add($.__views.__alloyId926);
	$.__views.heartRateDetailLabel = Ti.UI.createLabel(
	{ width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#9197a3", font: "fontSize: 12", right: 0, id: "heartRateDetailLabel" });

	$.__views.__alloyId925.add($.__views.heartRateDetailLabel);
	$.__views.glucoseView = Ti.UI.createView(
	{ borderWidth: 0, id: "glucoseView", gType: 8, height: Ti.UI.SIZE, layout: "vertical", left: 10, right: 10, top: 10, borderColor: "#dfe0e4", width: Ti.UI.FILL, backgroundColor: "#FFFFFF", visible: false });

	$.__views.graphScrollView.add($.__views.glucoseView);
	$.__views.glucoseWebView = Ti.UI.createWebView(
	{ touchEnabled: false, id: "glucoseWebView", height: 230, width: Ti.UI.FILL, url: "/html/glucose.html", disableBounce: true });

	$.__views.glucoseView.add($.__views.glucoseWebView);
	$.__views.__alloyId927 = Ti.UI.createView(
	{ borderWidth: 0, height: 1, left: 10, right: 10, bottom: 0, backgroundColor: "#dfe0e4", width: Ti.UI.FILL, id: "__alloyId927" });

	$.__views.glucoseView.add($.__views.__alloyId927);
	$.__views.__alloyId928 = Ti.UI.createView(
	{ borderWidth: 0, height: Ti.UI.SIZE, left: 10, right: 10, top: 10, bottom: 10, id: "__alloyId928" });

	$.__views.glucoseView.add($.__views.__alloyId928);
	$.__views.__alloyId929 = Ti.UI.createLabel(
	{ width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#9197a3", text: 'Latest', font: "fontSize: 12", left: 0, id: "__alloyId929" });

	$.__views.__alloyId928.add($.__views.__alloyId929);
	$.__views.glucoseDetailLabel = Ti.UI.createLabel(
	{ width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#9197a3", font: "fontSize: 12", right: 0, id: "glucoseDetailLabel" });

	$.__views.__alloyId928.add($.__views.glucoseDetailLabel);
	$.__views.cholestrolView = Ti.UI.createView(
	{ borderWidth: 0, id: "cholestrolView", gType: 7, height: Ti.UI.SIZE, layout: "vertical", left: 10, right: 10, top: 10, borderColor: "#dfe0e4", width: Ti.UI.FILL, backgroundColor: "#FFFFFF", visible: false });

	$.__views.graphScrollView.add($.__views.cholestrolView);
	$.__views.cholestrolWebView = Ti.UI.createWebView(
	{ touchEnabled: false, id: "cholestrolWebView", height: 230, width: Ti.UI.FILL, url: "/html/cholestrol.html", disableBounce: true });

	$.__views.cholestrolView.add($.__views.cholestrolWebView);
	$.__views.__alloyId930 = Ti.UI.createView(
	{ borderWidth: 0, height: 1, left: 10, right: 10, bottom: 0, backgroundColor: "#dfe0e4", width: Ti.UI.FILL, id: "__alloyId930" });

	$.__views.cholestrolView.add($.__views.__alloyId930);
	$.__views.__alloyId931 = Ti.UI.createView(
	{ borderWidth: 0, height: Ti.UI.SIZE, left: 10, right: 10, top: 10, bottom: 10, id: "__alloyId931" });

	$.__views.cholestrolView.add($.__views.__alloyId931);
	$.__views.__alloyId932 = Ti.UI.createLabel(
	{ width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#9197a3", text: 'Latest', font: "fontSize: 12", left: 0, id: "__alloyId932" });

	$.__views.__alloyId931.add($.__views.__alloyId932);
	$.__views.cholestrolDetailLabel = Ti.UI.createLabel(
	{ width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#9197a3", font: "fontSize: 12", right: 0, id: "cholestrolDetailLabel" });

	$.__views.__alloyId931.add($.__views.cholestrolDetailLabel);
	$.__views.bodyTemperatureView = Ti.UI.createView(
	{ borderWidth: 0, id: "bodyTemperatureView", gType: 4, height: Ti.UI.SIZE, layout: "vertical", left: 10, right: 10, top: 10, borderColor: "#dfe0e4", width: Ti.UI.FILL, backgroundColor: "#FFFFFF", visible: false });

	$.__views.graphScrollView.add($.__views.bodyTemperatureView);
	$.__views.bodyTemperatureWebView = Ti.UI.createWebView(
	{ touchEnabled: false, id: "bodyTemperatureWebView", height: 230, width: Ti.UI.FILL, url: "/html/bodyTemperature.html", disableBounce: true });

	$.__views.bodyTemperatureView.add($.__views.bodyTemperatureWebView);
	$.__views.__alloyId933 = Ti.UI.createView(
	{ borderWidth: 0, height: 1, left: 10, right: 10, bottom: 0, backgroundColor: "#dfe0e4", width: Ti.UI.FILL, id: "__alloyId933" });

	$.__views.bodyTemperatureView.add($.__views.__alloyId933);
	$.__views.__alloyId934 = Ti.UI.createView(
	{ borderWidth: 0, height: Ti.UI.SIZE, left: 10, right: 10, top: 10, bottom: 10, id: "__alloyId934" });

	$.__views.bodyTemperatureView.add($.__views.__alloyId934);
	$.__views.__alloyId935 = Ti.UI.createLabel(
	{ width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#9197a3", text: 'Latest', font: "fontSize: 12", left: 0, id: "__alloyId935" });

	$.__views.__alloyId934.add($.__views.__alloyId935);
	$.__views.bodyTempDetailLabel = Ti.UI.createLabel(
	{ width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#9197a3", font: "fontSize: 12", right: 0, id: "bodyTempDetailLabel" });

	$.__views.__alloyId934.add($.__views.bodyTempDetailLabel);
	exports.destroy = function () {};




	_.extend($, $.__views);












	_.extend($, exports);
}

module.exports = Controller;