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
		$.__views.__alloyId201 = Ti.UI.createView(
		{ layout: "vertical", id: "__alloyId201" });

		$.__views.win.add($.__views.__alloyId201);
		$.__views.__alloyId202 = Ti.UI.createImageView(
		{ width: "40%", borderRadius: 10, backgroundColor: "#ff0000", top: "30dp", image: "/images/asp_logo.png", id: "__alloyId202" });

		$.__views.__alloyId201.add($.__views.__alloyId202);
		$.__views.__alloyId203 = Ti.UI.createLabel(
		{ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#606060", text: 'You need to verify your account in order to view claim details. If you didn\'t received verification email, please click \'Resend Verification\' button below.', left: 20, right: 20, bottom: 20, top: 20, id: "__alloyId203" });

		$.__views.__alloyId201.add($.__views.__alloyId203);
		$.__views.__alloyId204 = Ti.UI.createButton(
		{ borderRadius: 5, backgroundColor: "#CE1D1C", title: "Resend Verification", width: "70%", top: 10, height: 40, color: "#ffffff", id: "__alloyId204" });

		$.__views.__alloyId201.add($.__views.__alloyId204);
		resendVerificationEmail ? $.addListener($.__views.__alloyId204, 'touchend', resendVerificationEmail) : __defers['$.__views.__alloyId204!touchend!resendVerificationEmail'] = true;$.__views.__alloyId205 = Ti.UI.createButton(
		{ borderRadius: 5, backgroundColor: "#7B7B7B", title: "Refresh", width: "70%", top: 10, height: 40, color: "#ffffff", id: "__alloyId205" });

		$.__views.__alloyId201.add($.__views.__alloyId205);
		checkStatus ? $.addListener($.__views.__alloyId205, 'touchend', checkStatus) : __defers['$.__views.__alloyId205!touchend!checkStatus'] = true;$.__views.__alloyId206 = Ti.UI.createButton(
		{ borderRadius: 5, backgroundColor: "#7B7B7B", title: "Back", width: "70%", top: 10, height: 40, color: "#ffffff", id: "__alloyId206" });

		$.__views.__alloyId201.add($.__views.__alloyId206);
		closeWindow ? $.addListener($.__views.__alloyId206, 'touchend', closeWindow) : __defers['$.__views.__alloyId206!touchend!closeWindow'] = true;exports.destroy = function () {};




		_.extend($, $.__views);


		var args = arguments[0] || {};
		var loading = Alloy.createController("loading");

		function init() {
				$.win.add(loading.getView());
		}

		init();

		function checkStatus() {
				loading.start();
				var plux_email = Ti.App.Properties.getString('plux_email') || "";
				console.log(plux_email + " plux_email");
				API.callByPost({ url: "getASPUserDetails", domain: "FREEJINI_DOMAIN", new: true, params: { email: plux_email } }, function (responseText) {
						var result = JSON.parse(responseText);
						console.log(result);
						if (result.status == "success") {
								Ti.App.Properties.setString('fullname', result.data.fullname);
								Ti.App.Properties.setString('plux_user_status', result.data.status);
								Ti.App.Properties.setString('last_login', currentDateTime());
								Ti.App.Properties.setString('u_id', result.data.u_id);
								Ti.App.Properties.setString('ic_no', result.data.ic_no);
								Ti.App.Properties.setString('plux_email', result.data.email);
								Ti.App.Properties.setString('isver', result.data.isver);
								if (typeof result.data.user_service != "undefined") {
										console.log(result.data.user_service.memno + " result.data.user_service.memno");
										Ti.App.Properties.setString('memno', result.data.user_service[0].memno);
										Ti.App.Properties.setString('empno', result.data.user_service[0].empno);
										Ti.App.Properties.setString('corpcode', result.data.user_service[0].corpcode);
										Ti.App.Properties.setString('cardno', result.data.user_service[0].cardno);
								}
								if (typeof result.dependent != "undefined") {
										Ti.App.Properties.setString('dependent', JSON.stringify(result.dependent));
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





		__defers['$.__views.__alloyId204!touchend!resendVerificationEmail'] && $.addListener($.__views.__alloyId204, 'touchend', resendVerificationEmail);__defers['$.__views.__alloyId205!touchend!checkStatus'] && $.addListener($.__views.__alloyId205, 'touchend', checkStatus);__defers['$.__views.__alloyId206!touchend!closeWindow'] && $.addListener($.__views.__alloyId206, 'touchend', closeWindow);



		_.extend($, exports);
}

module.exports = Controller;