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
	this.__controllerPath = 'profile';
	this.args = arguments[0] || {};

	if (arguments[0]) {
		var __parentSymbol = __processArg(arguments[0], '__parentSymbol');
		var $model = __processArg(arguments[0], '$model');
		var __itemTemplate = __processArg(arguments[0], '__itemTemplate');
	}
	var $ = this;
	var exports = {};
	var __defers = {};







	$.__views.myProfile = Ti.UI.createWindow(
	{ backgroundColor: "#535a74", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, navTintColor: "#CE1D1C", title: "My Profile", id: "myProfile", layout: "vertical" });

	$.__views.myProfile && $.addTopLevelView($.__views.myProfile);
	$.__views.__alloyId1028 = Ti.UI.createView(
	{ borderWidth: 0, layout: "vertical", height: "100%", id: "__alloyId1028" });

	$.__views.myProfile.add($.__views.__alloyId1028);
	if (true) {
		$.__views.__alloyId1029 = Ti.UI.createView(
		{ borderWidth: 0, layout: "horizontal", height: 50, width: Ti.UI.FILL, backgroundColor: "#DEDEDE", id: "__alloyId1029" });

		$.__views.__alloyId1028.add($.__views.__alloyId1029);
		$.__views.__alloyId1030 = Ti.UI.createView(
		{ borderWidth: 0, left: 0, width: "10%", id: "__alloyId1030" });

		$.__views.__alloyId1029.add($.__views.__alloyId1030);
		$.__views.btnBack = Ti.UI.createImageView(
		{ left: 10, id: "btnBack", width: 25, height: 25, image: "/images/btn-back.png" });

		$.__views.__alloyId1030.add($.__views.btnBack);
		$.__views.pageTitle = Ti.UI.createView(
		{ borderWidth: 0, id: "pageTitle", width: "90%" });

		$.__views.__alloyId1029.add($.__views.pageTitle);
		$.__views.__alloyId1031 = Ti.UI.createLabel(
		{ width: Titanium.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontSize: "16dp" }, text: 'My Profile', textAlign: "center", id: "__alloyId1031" });

		$.__views.pageTitle.add($.__views.__alloyId1031);
	}
	$.__views.description = Ti.UI.createLabel(
	{ width: Titanium.UI.FILL, height: "40dp", color: "#6E6E6E", top: "10dp", textAlign: "center", font: { fontSize: "14dp" }, id: "description", text: "Please choose profile of the below services" });

	$.__views.__alloyId1028.add($.__views.description);
	$.__views.scrollboard = Ti.UI.createScrollView(
	{ id: "scrollboard", width: Titanium.UI.FILL, height: Ti.UI.FILL, zIndex: 3 });

	$.__views.__alloyId1028.add($.__views.scrollboard);
	$.__views.__alloyId1032 = Ti.UI.createView(
	{ borderWidth: 0, layout: "horizontal", width: 293, top: 20, id: "__alloyId1032" });

	$.__views.scrollboard.add($.__views.__alloyId1032);
	$.__views.plux_logo = Ti.UI.createImageView(
	{ top: "30dp", borderRadius: 10, width: 120, left: 15, height: 120, id: "plux_logo", mod: "plux", backgroundColor: "#ff0000", bottom: "30dp", image: "/images/logo_plux.png" });

	$.__views.__alloyId1032.add($.__views.plux_logo);
	navProfile ? $.addListener($.__views.plux_logo, 'click', navProfile) : __defers['$.__views.plux_logo!click!navProfile'] = true;$.__views.asp_logo = Ti.UI.createImageView(
	{ top: "30dp", borderRadius: 10, width: 120, left: 15, height: 120, id: "asp_logo", mod: "asp", backgroundColor: "#ff0000", bottom: "30dp", image: "/images/asp_logo.png" });

	$.__views.__alloyId1032.add($.__views.asp_logo);
	navProfile ? $.addListener($.__views.asp_logo, 'click', navProfile) : __defers['$.__views.asp_logo!click!navProfile'] = true;exports.destroy = function () {};




	_.extend($, $.__views);


	var args = arguments[0] || {};

	function navProfile(e) {
		var target = e.source.mod;

		if (target == "asp") {
			nav.navigationWindow(target + "/profile", 1);
		} else {
			nav.navigateWithArgs("plux_profile", {});
		}
	}

	if ('android' == "android") {
		$.btnBack.addEventListener('click', function () {
			nav.closeWindow($.myProfile);
		});
	}





	__defers['$.__views.plux_logo!click!navProfile'] && $.addListener($.__views.plux_logo, 'click', navProfile);__defers['$.__views.asp_logo!click!navProfile'] && $.addListener($.__views.asp_logo, 'click', navProfile);



	_.extend($, exports);
}

module.exports = Controller;