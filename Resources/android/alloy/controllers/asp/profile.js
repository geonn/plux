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
		this.__controllerPath = 'asp/profile';
		this.args = arguments[0] || {};

		if (arguments[0]) {
				var __parentSymbol = __processArg(arguments[0], '__parentSymbol');
				var $model = __processArg(arguments[0], '$model');
				var __itemTemplate = __processArg(arguments[0], '__itemTemplate');
		}
		var $ = this;
		var exports = {};
		var __defers = {};







		$.__views.asp_profile = Ti.UI.createWindow(
		{ backgroundColor: "#ffffff", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, title: "ASP Profile", backButtonTitle: "", id: "asp_profile", navTintColor: "#CE1D1C" });

		$.__views.asp_profile && $.addTopLevelView($.__views.asp_profile);
		$.__views.loadingBar = Ti.UI.createView(
		{ layout: "vertical", id: "loadingBar", height: 0, width: 120, borderRadius: 15, backgroundColor: "#2E2E2E" });

		$.__views.asp_profile.add($.__views.loadingBar);
		$.__views.activityIndicator = Ti.UI.createActivityIndicator(
		{ top: 10, left: 30, width: 60, id: "activityIndicator" });

		$.__views.loadingBar.add($.__views.activityIndicator);
		$.__views.__alloyId305 = Ti.UI.createLabel(
		{ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#ffffff", top: 5, bottom: 10, text: "Loading", id: "__alloyId305" });

		$.__views.loadingBar.add($.__views.__alloyId305);
		$.__views.__alloyId307 = Ti.UI.createView(
		{ id: "__alloyId307" });

		$.__views.moreBtn = Ti.UI.createImageView(
		{ right: 0, id: "moreBtn", width: 30, image: "/images/list.png" });

		$.__views.__alloyId307.add($.__views.moreBtn);
		$.__views.asp_profile.rightNavButton = $.__views.__alloyId307;$.__views.__alloyId308 = Ti.UI.createView(
		{ layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.FILL, id: "__alloyId308" });

		$.__views.asp_profile.add($.__views.__alloyId308);
		if (true) {
				$.__views.__alloyId309 = Ti.UI.createView(
				{ layout: "horizontal", height: 50, width: Ti.UI.FILL, backgroundColor: "#DEDEDE", id: "__alloyId309" });

				$.__views.__alloyId308.add($.__views.__alloyId309);
				$.__views.__alloyId310 = Ti.UI.createView(
				{ left: 0, width: "10%", id: "__alloyId310" });

				$.__views.__alloyId309.add($.__views.__alloyId310);
				$.__views.btnBack = Ti.UI.createImageView(
				{ left: 10, id: "btnBack", width: 25, height: 25, image: "/images/btn-back.png" });

				$.__views.__alloyId310.add($.__views.btnBack);
				$.__views.pageTitle = Ti.UI.createView(
				{ id: "pageTitle", width: "80%" });

				$.__views.__alloyId309.add($.__views.pageTitle);
				$.__views.__alloyId311 = Ti.UI.createLabel(
				{ width: Titanium.UI.SIZE, height: Ti.UI.SIZE, color: "#606060", font: { fontSize: "16dp" }, text: 'ASP Profile', textAlign: "center", id: "__alloyId311" });

				$.__views.pageTitle.add($.__views.__alloyId311);
				$.__views.__alloyId312 = Ti.UI.createView(
				{ width: "auto", id: "__alloyId312" });

				$.__views.__alloyId309.add($.__views.__alloyId312);
				$.__views.moreBtn = Ti.UI.createImageView(
				{ id: "moreBtn", width: 30, image: "/images/list.png" });

				$.__views.__alloyId312.add($.__views.moreBtn);
		}
		$.__views.__alloyId313 = Ti.UI.createView(
		{ width: Ti.UI.FILL, height: Ti.UI.FILL, id: "__alloyId313" });

		$.__views.__alloyId308.add($.__views.__alloyId313);
		$.__views.profileContainer = Ti.UI.createView(
		{ layout: "vertical", id: "profileContainer", visible: false });

		$.__views.__alloyId313.add($.__views.profileContainer);
		var __alloyId314 = [];
		$.__views.main = Ti.UI.createScrollableView(
		{ views: __alloyId314, id: "main", height: "80%", backgroundColor: "#ffffff" });

		$.__views.profileContainer.add($.__views.main);
		exports.destroy = function () {};




		_.extend($, $.__views);


		var args = arguments[0] || {};
		common.construct($);
		loadPage();
		function loadPage() {
				var isver = Ti.App.Properties.getString('isver');
				var corpcode = Ti.App.Properties.getString('corpcode');
				var memno = Ti.App.Properties.getString('memno');
				var empno = Ti.App.Properties.getString('empno');
				if (isver == "true" || isver > 0) {
						$.profileContainer.show();
				}
				Ti.App.removeEventListener('loadPage', loadPage);
		}
		var data = JSON.parse(Ti.App.Properties.getString('dependent'));
		for (var i = 0; i < data.length; i++) {
				console.log(i);
				var profile_view = Alloy.createController("_profile_view", { profile_data: data[i] }).getView();
				$.main.addView(profile_view);
		};

		function changePassword() {
				var nav = require('navigation');
				nav.navigationWindow("asp/changePassword", 0);
		}

		if ('android' == "android") {
				$.btnBack.addEventListener('click', function () {
						console.log('close!!');
						nav.closeWindow($.asp_profile);
				});
		}

		$.moreBtn.addEventListener('click', function (e) {
				var dialog = Ti.UI.createOptionDialog({
						cancel: 1,
						options: ['Change Password', 'Cancel'],
						title: 'More' });


				dialog.show();

				dialog.addEventListener("click", function (e) {
						if (e.index == 0) {
								changePassword();

						}
				});
		});

		$.asp_profile.addEventListener("close", function () {
				Ti.App.removeEventListener('loadPage', loadPage);
				$.destroy();
				console.log("window close");
		});









		_.extend($, exports);
}

module.exports = Controller;