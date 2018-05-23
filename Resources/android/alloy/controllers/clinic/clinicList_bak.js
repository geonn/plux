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
	this.__controllerPath = 'clinic/clinicList_bak';
	this.args = arguments[0] || {};

	if (arguments[0]) {
		var __parentSymbol = __processArg(arguments[0], '__parentSymbol');
		var $model = __processArg(arguments[0], '$model');
		var __itemTemplate = __processArg(arguments[0], '__itemTemplate');
	}
	var $ = this;
	var exports = {};
	var __defers = {};







	$.__views.clinicList = Ti.UI.createWindow(
	{ backgroundColor: "#535a74", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, title: "Clinic List", id: "clinicList", backButtonTitle: "", navTintColor: "#CE1D1C" });

	$.__views.clinicList && $.addTopLevelView($.__views.clinicList);
	$.__views.__alloyId526 = Ti.UI.createView(
	{ borderWidth: 0, layout: "horizontal", right: 5, id: "__alloyId526" });

	$.__views.btnMap = Ti.UI.createImageView(
	{ right: 10, id: "btnMap", width: 25, height: 25, image: "/images/map.png" });

	$.__views.__alloyId526.add($.__views.btnMap);
	$.__views.btnSearch = Ti.UI.createImageView(
	{ id: "btnSearch", width: 25, height: 25, image: "/images/search.png" });

	$.__views.__alloyId526.add($.__views.btnSearch);
	$.__views.clinicList.rightNavButton = $.__views.__alloyId526;$.__views.loadingBar = Ti.UI.createView(
	{ borderWidth: 0, layout: "vertical", id: "loadingBar", height: 120, width: 120, borderRadius: 15, backgroundColor: "#2E2E2E" });

	$.__views.clinicList.add($.__views.loadingBar);
	$.__views.activityIndicator = Ti.UI.createActivityIndicator(
	{ top: 10, left: 30, width: 60, id: "activityIndicator" });

	$.__views.loadingBar.add($.__views.activityIndicator);
	$.__views.__alloyId527 = Ti.UI.createLabel(
	{ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#ffffff", top: 5, bottom: 10, text: "Loading", id: "__alloyId527" });

	$.__views.loadingBar.add($.__views.__alloyId527);
	$.__views.panelListTbl = Ti.UI.createView(
	{ borderWidth: 0, id: "panelListTbl", layout: "vertical" });

	$.__views.clinicList.add($.__views.panelListTbl);
	if (true) {
		$.__views.__alloyId528 = Ti.UI.createView(
		{ borderWidth: 0, layout: "horizontal", height: 50, width: Ti.UI.FILL, backgroundColor: "#DEDEDE", id: "__alloyId528" });

		$.__views.panelListTbl.add($.__views.__alloyId528);
		$.__views.__alloyId529 = Ti.UI.createView(
		{ borderWidth: 0, left: 0, width: "20%", id: "__alloyId529" });

		$.__views.__alloyId528.add($.__views.__alloyId529);
		$.__views.btnBack = Ti.UI.createImageView(
		{ left: 10, id: "btnBack", height: 25, image: "/images/btn-back.png" });

		$.__views.__alloyId529.add($.__views.btnBack);
		$.__views.__alloyId530 = Ti.UI.createView(
		{ borderWidth: 0, width: "60%", id: "__alloyId530" });

		$.__views.__alloyId528.add($.__views.__alloyId530);
		$.__views.pageTitle = Ti.UI.createLabel(
		{ width: Titanium.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontSize: "16dp" }, text: 'Clinic List', id: "pageTitle", textAlign: "center" });

		$.__views.__alloyId530.add($.__views.pageTitle);
		$.__views.__alloyId531 = Ti.UI.createView(
		{ borderWidth: 0, right: 0, width: "20%", id: "__alloyId531" });

		$.__views.__alloyId528.add($.__views.__alloyId531);
		$.__views.__alloyId532 = Ti.UI.createView(
		{ borderWidth: 0, layout: "horizontal", right: 5, top: 10, id: "__alloyId532" });

		$.__views.__alloyId531.add($.__views.__alloyId532);
		$.__views.btnMap = Ti.UI.createImageView(
		{ right: 10, id: "btnMap", width: 25, height: 25, image: "/images/map.png" });

		$.__views.__alloyId532.add($.__views.btnMap);
		$.__views.btnSearch = Ti.UI.createImageView(
		{ id: "btnSearch", width: 25, height: 25, image: "/images/search.png" });

		$.__views.__alloyId532.add($.__views.btnSearch);
	}
	$.__views.searchItem = Ti.UI.createSearchBar(
	{ barColor: "#FFFFFF", tintColor: "#CE1D1C", id: "searchItem", showCancel: true, text: "", height: 0, visible: false, hintText: "Search Clinic" });

	$.__views.panelListTbl.add($.__views.searchItem);
	$.__views.__alloyId533 = Ti.UI.createView(
	{ borderWidth: 0, height: 50, layout: "horizontal", width: Ti.UI.FILL, id: "__alloyId533" });

	$.__views.panelListTbl.add($.__views.__alloyId533);
	$.__views.__alloyId534 = Ti.UI.createView(
	{ borderWidth: 0, width: "50%", height: Ti.UI.SIZE, id: "__alloyId534" });

	$.__views.__alloyId533.add($.__views.__alloyId534);
	showTypeSelection ? $.addListener($.__views.__alloyId534, 'click', showTypeSelection) : __defers['$.__views.__alloyId534!click!showTypeSelection'] = true;$.__views.clinicTypeSelection = Ti.UI.createLabel(
	{ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#626262", font: { fontSize: "14dp", fontWeight: "bold" }, text: 'Clinic Type', id: "clinicTypeSelection" });

	$.__views.__alloyId534.add($.__views.clinicTypeSelection);
	$.__views.__alloyId535 = Ti.UI.createImageView(
	{ right: 10, width: 15, height: 15, image: "/images/btn-down.png", id: "__alloyId535" });

	$.__views.__alloyId534.add($.__views.__alloyId535);
	$.__views.__alloyId536 = Ti.UI.createView(
	{ borderWidth: 0, width: 1, height: 50, backgroundColor: "#9E9E9E", id: "__alloyId536" });

	$.__views.__alloyId533.add($.__views.__alloyId536);
	$.__views.__alloyId537 = Ti.UI.createView(
	{ borderWidth: 0, width: "49%", height: Ti.UI.SIZE, id: "__alloyId537" });

	$.__views.__alloyId533.add($.__views.__alloyId537);
	showLocationSelection ? $.addListener($.__views.__alloyId537, 'click', showLocationSelection) : __defers['$.__views.__alloyId537!click!showLocationSelection'] = true;$.__views.clinicLocationSelection = Ti.UI.createLabel(
	{ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#626262", font: { fontSize: "14dp", fontWeight: "bold" }, text: 'Clinic Location', id: "clinicLocationSelection" });

	$.__views.__alloyId537.add($.__views.clinicLocationSelection);
	$.__views.__alloyId538 = Ti.UI.createImageView(
	{ right: 10, width: 15, height: 15, image: "/images/btn-down.png", id: "__alloyId538" });

	$.__views.__alloyId537.add($.__views.__alloyId538);
	$.__views.__alloyId539 = Ti.UI.createView(
	{ borderWidth: 0, width: Ti.UI.FILL, height: 1, backgroundColor: "#9E9E9E", id: "__alloyId539" });

	$.__views.panelListTbl.add($.__views.__alloyId539);
	$.__views.clinicListTv = Ti.UI.createTableView(
	{ id: "clinicListTv", layout: "vertical", top: 0, height: Ti.UI.FILL, contentWidth: Ti.UI.FILL, contentHeight: Ti.UI.SIZE, width: Ti.UI.FILL });

	$.__views.panelListTbl.add($.__views.clinicListTv);
	exports.destroy = function () {};




	_.extend($, $.__views);








	__defers['$.__views.__alloyId534!click!showTypeSelection'] && $.addListener($.__views.__alloyId534, 'click', showTypeSelection);__defers['$.__views.__alloyId537!click!showLocationSelection'] && $.addListener($.__views.__alloyId537, 'click', showLocationSelection);



	_.extend($, exports);
}

module.exports = Controller;