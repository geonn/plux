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
		this.__controllerPath = 'asp/_email_verify';
		this.args = arguments[0] || {};

		if (arguments[0]) {
				var __parentSymbol = __processArg(arguments[0], '__parentSymbol');
				var $model = __processArg(arguments[0], '$model');
				var __itemTemplate = __processArg(arguments[0], '__itemTemplate');
		}
		var $ = this;
		var exports = {};
		var __defers = {};







		$.__views.win = Ti.UI.createWindow(
		{ backgroundColor: "#fff", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, id: "win", title: "Verify Your Email", backButtonTitle: "", navTintColor: "#CE1D1C" });

		$.__views.win && $.addTopLevelView($.__views.win);
		$.__views.__alloyId212 = Ti.UI.createView(
		{ borderWidth: 0, layout: "vertical", id: "__alloyId212" });

		$.__views.win.add($.__views.__alloyId212);
		$.__views.__alloyId213 = Ti.UI.createImageView(
		{ width: "40%", borderRadius: 10, backgroundColor: "#ff0000", top: "30dp", image: "/images/asp_logo.png", id: "__alloyId213" });

		$.__views.__alloyId212.add($.__views.__alloyId213);
		$.__views.__alloyId214 = Ti.UI.createLabel(
		{ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#111111", text: 'You need to verify your account in order to view claim details. If you didn\'t received verification email, please click \'Resend Verification\' button below.', left: 20, right: 20, bottom: 20, top: 20, id: "__alloyId214" });

		$.__views.__alloyId212.add($.__views.__alloyId214);
		$.__views.__alloyId215 = Ti.UI.createButton(
		{ borderRadius: 5, backgroundColor: "#CE1D1C", height: 40, color: "#ffffff", width: "70%", title: "Resend Verification", top: 10, id: "__alloyId215" });

		$.__views.__alloyId212.add($.__views.__alloyId215);
		resendVerificationEmail ? $.addListener($.__views.__alloyId215, 'touchend', resendVerificationEmail) : __defers['$.__views.__alloyId215!touchend!resendVerificationEmail'] = true;$.__views.__alloyId216 = Ti.UI.createButton(
		{ borderRadius: 5, backgroundColor: "#7B7B7B", height: 40, color: "#ffffff", width: "70%", title: "Refresh", top: 10, id: "__alloyId216" });

		$.__views.__alloyId212.add($.__views.__alloyId216);
		checkStatus ? $.addListener($.__views.__alloyId216, 'touchend', checkStatus) : __defers['$.__views.__alloyId216!touchend!checkStatus'] = true;$.__views.__alloyId217 = Ti.UI.createButton(
		{ borderRadius: 5, backgroundColor: "#7B7B7B", height: 40, color: "#ffffff", width: "70%", title: "Back", top: 10, id: "__alloyId217" });

		$.__views.__alloyId212.add($.__views.__alloyId217);
		closeWindow ? $.addListener($.__views.__alloyId217, 'touchend', closeWindow) : __defers['$.__views.__alloyId217!touchend!closeWindow'] = true;exports.destroy = function () {};




		_.extend($, $.__views);


		var args = arguments[0] || {};
		var loading = Alloy.createController("loading");

		function init() {
				$.win.add(loading.getView());
		}

		init();

		function checkStatus() {
				loading.start();
				var email = Ti.App.Properties.getString('email') || "";
				console.log(email + " email");
				API.callByPost({ url: "getASPUserDetails", domain: "FREEJINI_DOMAIN", new: true, params: { email: email } }, function (responseText) {
						var result = JSON.parse(responseText);
						console.log(result);
						if (result.status == "success") {
								_.each(result.data, function (value, key) {
										Ti.App.Properties.setString(key, value);
								});
								if (typeof result.data.user_service != "undefined") {
										console.log('yes?');
										_.each(result.data.user_service[0], function (value, key) {
												Ti.App.Properties.setString(key, value);
										});
								}
								console.log(typeof result.dependent + ' typeof result.dependent');
								if (typeof result.dependent != "undefined") {
										Ti.App.Properties.setString("dependent", JSON.stringify(result.dependent[0]));
								}
								$.win.close();
								if (result.data.isver > 0) {
										args.callback();
								}
								loading.finish();
						} else {
								loading.finish();
								alert(result.data);
						}
				});
		}

		function closeWindow() {
				$.win.close();
		}





		__defers['$.__views.__alloyId215!touchend!resendVerificationEmail'] && $.addListener($.__views.__alloyId215, 'touchend', resendVerificationEmail);__defers['$.__views.__alloyId216!touchend!checkStatus'] && $.addListener($.__views.__alloyId216, 'touchend', checkStatus);__defers['$.__views.__alloyId217!touchend!closeWindow'] && $.addListener($.__views.__alloyId217, 'touchend', closeWindow);



		_.extend($, exports);
}

module.exports = Controller;