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
	this.__controllerPath = 'asp/changePassword';
	this.args = arguments[0] || {};

	if (arguments[0]) {
		var __parentSymbol = __processArg(arguments[0], '__parentSymbol');
		var $model = __processArg(arguments[0], '$model');
		var __itemTemplate = __processArg(arguments[0], '__itemTemplate');
	}
	var $ = this;
	var exports = {};
	var __defers = {};







	$.__views.changePasswordWin = Ti.UI.createWindow(
	{ backgroundColor: "#535a74", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, navTintColor: "#CE1D1C", id: "changePasswordWin", title: "Change Password", layout: "vertical" });

	$.__views.changePasswordWin && $.addTopLevelView($.__views.changePasswordWin);
	$.__views.loadingBar = Ti.UI.createView(
	{ borderWidth: 0, layout: "vertical", id: "loadingBar", height: 0, width: 120, borderRadius: 15, backgroundColor: "#2E2E2E" });

	$.__views.changePasswordWin.add($.__views.loadingBar);
	$.__views.activityIndicator = Ti.UI.createActivityIndicator(
	{ top: 10, left: 30, width: 60, id: "activityIndicator" });

	$.__views.loadingBar.add($.__views.activityIndicator);
	$.__views.__alloyId226 = Ti.UI.createLabel(
	{ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#ffffff", top: 5, bottom: 10, text: "Loading", id: "__alloyId226" });

	$.__views.loadingBar.add($.__views.__alloyId226);
	$.__views.__alloyId227 = Ti.UI.createView(
	{ borderWidth: 0, layout: "vertical", height: "100%", id: "__alloyId227" });

	$.__views.changePasswordWin.add($.__views.__alloyId227);
	if (true) {
		$.__views.__alloyId228 = Ti.UI.createView(
		{ borderWidth: 0, layout: "horizontal", height: 50, width: "100%", backgroundColor: "#DEDEDE", id: "__alloyId228" });

		$.__views.__alloyId227.add($.__views.__alloyId228);
		$.__views.__alloyId229 = Ti.UI.createView(
		{ borderWidth: 0, left: 0, width: "20%", id: "__alloyId229" });

		$.__views.__alloyId228.add($.__views.__alloyId229);
		$.__views.btnBack = Ti.UI.createImageView(
		{ left: 10, id: "btnBack", width: 25, height: 25, image: "/images/btn-back.png" });

		$.__views.__alloyId229.add($.__views.btnBack);
		$.__views.pageTitle = Ti.UI.createView(
		{ borderWidth: 0, id: "pageTitle", width: "60%" });

		$.__views.__alloyId228.add($.__views.pageTitle);
		$.__views.__alloyId230 = Ti.UI.createLabel(
		{ width: Titanium.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontSize: "16dp" }, text: 'Change Password', textAlign: "center", id: "__alloyId230" });

		$.__views.pageTitle.add($.__views.__alloyId230);
	}
	$.__views.main = Ti.UI.createScrollView(
	{ id: "main", layout: "vertical", height: "100%", contentHeight: Ti.UI.SIZE });

	$.__views.__alloyId227.add($.__views.main);
	$.__views.__alloyId231 = Ti.UI.createImageView(
	{ width: 120, borderRadius: 10, height: 120, backgroundColor: "#ff0000", bottom: "30dp", top: "30dp", image: "/images/asp_logo.png", id: "__alloyId231" });

	$.__views.main.add($.__views.__alloyId231);
	$.__views.description = Ti.UI.createLabel(
	{ width: Titanium.UI.FILL, height: "40dp", color: "#6E6E6E", bottom: "10dp", textAlign: "center", font: { fontSize: "12dp" }, id: "description" });

	$.__views.main.add($.__views.description);
	$.__views.password = Ti.UI.createTextField(
	{ borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: "90%", height: "50dp", font: { fontSize: "14dp" }, color: "#000000", hintTextColor: "#000000", backgroundColor: "#fff", passwordMask: true, borderColor: "#cccccc", paddingLeft: "20dp", paddingRight: "20dp", keyboardType: Titanium.UI.KEYBOARD_DEFAULT, returnKeyType: Titanium.UI.RETURNKEY_DONE, id: "password", hintText: "Enter Password", value: "" });

	$.__views.main.add($.__views.password);
	$.__views.password2 = Ti.UI.createTextField(
	{ borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: "90%", height: "50dp", font: { fontSize: "14dp" }, color: "#000000", hintTextColor: "#000000", backgroundColor: "#fff", passwordMask: true, borderColor: "#cccccc", paddingLeft: "20dp", paddingRight: "20dp", keyboardType: Titanium.UI.KEYBOARD_DEFAULT, returnKeyType: Titanium.UI.RETURNKEY_DONE, id: "password2", hintText: "Enter Confirm Password", top: 10, value: "" });

	$.__views.main.add($.__views.password2);
	$.__views.__alloyId232 = Ti.UI.createButton(
	{ borderRadius: 5, backgroundColor: "#7B7B7B", height: 40, color: "#ffffff", width: "70%", title: "Change Password", top: 10, id: "__alloyId232" });

	$.__views.main.add($.__views.__alloyId232);
	submitPassword ? $.addListener($.__views.__alloyId232, 'touchend', submitPassword) : __defers['$.__views.__alloyId232!touchend!submitPassword'] = true;exports.destroy = function () {};




	_.extend($, $.__views);


	var args = arguments[0] || {};
	var loginId = Ti.App.Properties.getString('plux_email');
	$.description.text = "You are about to change password for " + loginId;
	function submitPassword() {
		common.showLoading();
		var password = $.password.value;
		var confirm = $.password2.value;

		if (password.trim() == "") {
			common.hideLoading();
			common.createAlert("Error", "Please fill in your password");
			return false;
		}

		if (confirm.trim() != password.trim()) {
			common.hideLoading();
			common.createAlert("Error", "Your password are not match");
			return false;
		}

		var params = {
			username: loginId,
			password: password };

		API.doChangePassword(params, $);
	}

	if ('android' == "android") {
		$.btnBack.addEventListener('click', function () {
			nav.closeWindow($.changePasswordWin);
		});
	}





	__defers['$.__views.__alloyId232!touchend!submitPassword'] && $.addListener($.__views.__alloyId232, 'touchend', submitPassword);



	_.extend($, exports);
}

module.exports = Controller;