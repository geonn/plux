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
	{ backgroundColor: "#ffffff", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, title: "Clinic List", id: "clinicList", backButtonTitle: "", navTintColor: "#CE1D1C" });

	$.__views.clinicList && $.addTopLevelView($.__views.clinicList);
	$.__views.__alloyId366 = Ti.UI.createView(
	{ layout: "horizontal", right: 5, id: "__alloyId366" });

	$.__views.btnMap = Ti.UI.createImageView(
	{ right: 10, id: "btnMap", width: 25, height: 25, image: "/images/map.png" });

	$.__views.__alloyId366.add($.__views.btnMap);
	$.__views.btnSearch = Ti.UI.createImageView(
	{ id: "btnSearch", width: 25, height: 25, image: "/images/search.png" });

	$.__views.__alloyId366.add($.__views.btnSearch);
	$.__views.clinicList.rightNavButton = $.__views.__alloyId366;$.__views.loadingBar = Ti.UI.createView(
	{ layout: "vertical", id: "loadingBar", height: 120, width: 120, borderRadius: 15, backgroundColor: "#2E2E2E" });

	$.__views.clinicList.add($.__views.loadingBar);
	$.__views.activityIndicator = Ti.UI.createActivityIndicator(
	{ top: 10, left: 30, width: 60, id: "activityIndicator" });

	$.__views.loadingBar.add($.__views.activityIndicator);
	$.__views.__alloyId367 = Ti.UI.createLabel(
	{ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#ffffff", top: 5, bottom: 10, text: "Loading", id: "__alloyId367" });

	$.__views.loadingBar.add($.__views.__alloyId367);
	$.__views.panelListTbl = Ti.UI.createView(
	{ id: "panelListTbl", layout: "vertical" });

	$.__views.clinicList.add($.__views.panelListTbl);
	if (true) {
		$.__views.__alloyId368 = Ti.UI.createView(
		{ layout: "horizontal", height: 50, width: Ti.UI.FILL, backgroundColor: "#DEDEDE", id: "__alloyId368" });

		$.__views.panelListTbl.add($.__views.__alloyId368);
		$.__views.__alloyId369 = Ti.UI.createView(
		{ left: 0, width: "20%", id: "__alloyId369" });

		$.__views.__alloyId368.add($.__views.__alloyId369);
		$.__views.btnBack = Ti.UI.createImageView(
		{ left: 10, id: "btnBack", height: 25, image: "/images/btn-back.png" });

		$.__views.__alloyId369.add($.__views.btnBack);
		$.__views.__alloyId370 = Ti.UI.createView(
		{ width: "60%", id: "__alloyId370" });

		$.__views.__alloyId368.add($.__views.__alloyId370);
		$.__views.pageTitle = Ti.UI.createLabel(
		{ width: Titanium.UI.SIZE, height: Ti.UI.SIZE, color: "#606060", font: { fontSize: "16dp" }, text: 'Clinic List', id: "pageTitle", textAlign: "center" });

		$.__views.__alloyId370.add($.__views.pageTitle);
		$.__views.__alloyId371 = Ti.UI.createView(
		{ right: 0, width: "20%", id: "__alloyId371" });

		$.__views.__alloyId368.add($.__views.__alloyId371);
		$.__views.__alloyId372 = Ti.UI.createView(
		{ layout: "horizontal", right: 5, top: 10, id: "__alloyId372" });

		$.__views.__alloyId371.add($.__views.__alloyId372);
		$.__views.btnMap = Ti.UI.createImageView(
		{ right: 10, id: "btnMap", width: 25, height: 25, image: "/images/map.png" });

		$.__views.__alloyId372.add($.__views.btnMap);
		$.__views.btnSearch = Ti.UI.createImageView(
		{ id: "btnSearch", width: 25, height: 25, image: "/images/search.png" });

		$.__views.__alloyId372.add($.__views.btnSearch);
	}
	$.__views.searchItem = Ti.UI.createSearchBar(
	{ barColor: "#FFFFFF", tintColor: "#CE1D1C", id: "searchItem", showCancel: true, text: "", height: 0, visible: false, hintText: "Search Clinic" });

	$.__views.panelListTbl.add($.__views.searchItem);
	$.__views.__alloyId373 = Ti.UI.createView(
	{ height: 50, layout: "horizontal", width: Ti.UI.FILL, id: "__alloyId373" });

	$.__views.panelListTbl.add($.__views.__alloyId373);
	$.__views.__alloyId374 = Ti.UI.createView(
	{ width: "50%", height: Ti.UI.SIZE, id: "__alloyId374" });

	$.__views.__alloyId373.add($.__views.__alloyId374);
	showTypeSelection ? $.addListener($.__views.__alloyId374, 'click', showTypeSelection) : __defers['$.__views.__alloyId374!click!showTypeSelection'] = true;$.__views.clinicTypeSelection = Ti.UI.createLabel(
	{ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#626262", font: { fontSize: "14dp", fontWeight: "bold" }, text: 'Clinic Type', id: "clinicTypeSelection" });

	$.__views.__alloyId374.add($.__views.clinicTypeSelection);
	$.__views.__alloyId375 = Ti.UI.createImageView(
	{ right: 10, width: 15, height: 15, image: "/images/btn-down.png", id: "__alloyId375" });

	$.__views.__alloyId374.add($.__views.__alloyId375);
	$.__views.__alloyId376 = Ti.UI.createView(
	{ width: 1, height: 50, backgroundColor: "#9E9E9E", id: "__alloyId376" });

	$.__views.__alloyId373.add($.__views.__alloyId376);
	$.__views.__alloyId377 = Ti.UI.createView(
	{ width: "49%", height: Ti.UI.SIZE, id: "__alloyId377" });

	$.__views.__alloyId373.add($.__views.__alloyId377);
	showLocationSelection ? $.addListener($.__views.__alloyId377, 'click', showLocationSelection) : __defers['$.__views.__alloyId377!click!showLocationSelection'] = true;$.__views.clinicLocationSelection = Ti.UI.createLabel(
	{ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#626262", font: { fontSize: "14dp", fontWeight: "bold" }, text: 'Clinic Location', id: "clinicLocationSelection" });

	$.__views.__alloyId377.add($.__views.clinicLocationSelection);
	$.__views.__alloyId378 = Ti.UI.createImageView(
	{ right: 10, width: 15, height: 15, image: "/images/btn-down.png", id: "__alloyId378" });

	$.__views.__alloyId377.add($.__views.__alloyId378);
	$.__views.__alloyId379 = Ti.UI.createView(
	{ width: Ti.UI.FILL, height: 1, backgroundColor: "#9E9E9E", id: "__alloyId379" });

	$.__views.panelListTbl.add($.__views.__alloyId379);
	$.__views.clinicListTv = Ti.UI.createTableView(
	{ id: "clinicListTv", layout: "vertical", top: 0, height: Ti.UI.FILL, contentWidth: Ti.UI.FILL, contentHeight: Ti.UI.SIZE, width: Ti.UI.FILL });

	$.__views.panelListTbl.add($.__views.clinicListTv);
	exports.destroy = function () {};




	_.extend($, $.__views);








	__defers['$.__views.__alloyId374!click!showTypeSelection'] && $.addListener($.__views.__alloyId374, 'click', showTypeSelection);__defers['$.__views.__alloyId377!click!showLocationSelection'] && $.addListener($.__views.__alloyId377, 'click', showLocationSelection);



	_.extend($, exports);
}

module.exports = Controller;