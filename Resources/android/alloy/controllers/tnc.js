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
	this.__controllerPath = 'tnc';
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
	{ backgroundColor: "#ffffff", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, navTintColor: "#CE1D1C", title: "Term of Service", id: "win", layout: "vertical" });

	$.__views.win && $.addTopLevelView($.__views.win);
	$.__views.__alloyId842 = Ti.UI.createView(
	{ layout: "vertical", id: "__alloyId842" });

	$.__views.win.add($.__views.__alloyId842);
	$.__views.__alloyId843 = Ti.UI.createView(
	{ layout: "horizontal", height: 50, width: "100%", backgroundColor: "#DEDEDE", id: "__alloyId843" });

	$.__views.__alloyId842.add($.__views.__alloyId843);
	$.__views.__alloyId844 = Ti.UI.createView(
	{ left: 0, width: "10%", id: "__alloyId844" });

	$.__views.__alloyId843.add($.__views.__alloyId844);
	$.__views.btnBack = Ti.UI.createImageView(
	{ left: 10, id: "btnBack", width: 25, height: 25, image: "/images/btn-back.png" });

	$.__views.__alloyId844.add($.__views.btnBack);
	$.__views.pageTitle = Ti.UI.createView(
	{ id: "pageTitle", width: Ti.UI.FILL });

	$.__views.__alloyId843.add($.__views.pageTitle);
	$.__views.__alloyId845 = Ti.UI.createLabel(
	{ width: Titanium.UI.SIZE, height: Ti.UI.SIZE, color: "#606060", font: { fontSize: "16dp" }, text: 'ASP Healthcare Terms of Service', textAlign: "center", id: "__alloyId845" });

	$.__views.pageTitle.add($.__views.__alloyId845);
	$.__views.main = Ti.UI.createScrollView(
	{ id: "main", layout: "vertical", height: "100%", contentHeight: Ti.UI.SIZE });

	$.__views.__alloyId842.add($.__views.main);
	$.__views.__alloyId846 = Ti.UI.createLabel(
	{ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#404040", font: { fontSize: "16", fontWeight: "bold" }, left: "10", right: "10", text: '1.    Welcome to ASP HEALTHCARE!', bottom: 5, id: "__alloyId846" });

	$.__views.main.add($.__views.__alloyId846);
	$.__views.__alloyId847 = Ti.UI.createLabel(
	{ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#6E6E6E", font: { fontSize: "14" }, left: "10", textAlign: "left", right: "10", text: 'Thanks for your interest in our ASP Healthcare (the “Services”)!', bottom: 3, id: "__alloyId847" });

	$.__views.main.add($.__views.__alloyId847);
	$.__views.__alloyId848 = Ti.UI.createLabel(
	{ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#6E6E6E", font: { fontSize: "14" }, left: "10", textAlign: "left", right: "10", text: 'By using our Services, you agree to these terms (the “ Terms”).', bottom: 3, id: "__alloyId848" });

	$.__views.main.add($.__views.__alloyId848);
	$.__views.__alloyId849 = Ti.UI.createLabel(
	{ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#6E6E6E", font: { fontSize: "14" }, left: "10", textAlign: "left", right: "10", text: 'As used in the Agreement, “you” means the individual or entity using the Services (and/or any individual, entity or successor entity, agency or network acting on your behalf), “we,” “us” or “ASP” means ASP Healthcare, and the “parties” means you and ASP.', bottom: 5, id: "__alloyId849" });

	$.__views.main.add($.__views.__alloyId849);
	$.__views.__alloyId850 = Ti.UI.createLabel(
	{ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#404040", font: { fontSize: "16", fontWeight: "bold" }, left: "10", right: "10", text: '2. Access to the Services; ASP Accounts', bottom: 5, id: "__alloyId850" });

	$.__views.main.add($.__views.__alloyId850);
	$.__views.__alloyId851 = Ti.UI.createLabel(
	{ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#6E6E6E", font: { fontSize: "14" }, left: "10", textAlign: "left", right: "10", text: 'Your use of the Services is subject to your creation and our approval of a ASP account (an “Account”). We have the right to refuse or limit your access to the Services. By enrolling in ASP, you permit us to serve, as applicable, (i) advertisements and other content (“Ads”), (ii) notifications, and (iii) related promotions and other links to your mobile applications, media players, mobile content, and/or other properties approved by ASP (each individually a “Property”). In addition, you grant ASP the right to access, index and cache the Properties, or any portion thereof, including by automated means.', bottom: 3, id: "__alloyId851" });

	$.__views.main.add($.__views.__alloyId851);
	$.__views.__alloyId852 = Ti.UI.createLabel(
	{ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#404040", font: { fontSize: "16", fontWeight: "bold" }, left: "10", right: "10", text: '3. Changes to our Services; Changes to the Agreement', bottom: 5, id: "__alloyId852" });

	$.__views.main.add($.__views.__alloyId852);
	$.__views.__alloyId853 = Ti.UI.createLabel(
	{ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#6E6E6E", font: { fontSize: "14" }, left: "10", textAlign: "left", right: "10", text: 'We are constantly changing and improving our Services. We may modify the Agreement at any time. We’ll post any modifications to the ASP Terms on this page.', bottom: 3, id: "__alloyId853" });

	$.__views.main.add($.__views.__alloyId853);
	$.__views.__alloyId854 = Ti.UI.createLabel(
	{ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#404040", font: { fontSize: "16", fontWeight: "bold" }, left: "10", right: "10", text: '4. Privacy', bottom: 5, id: "__alloyId854" });

	$.__views.main.add($.__views.__alloyId854);
	$.__views.__alloyId855 = Ti.UI.createLabel(
	{ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#6E6E6E", font: { fontSize: "14" }, left: "10", textAlign: "left", right: "10", text: 'Our privacy policy how we treat your personal data and protect your privacy when you use our Services. By using our Services, you agree that ASP can use such medical data in accordance with our privacy policy. We will ensure that at all times you use the Services, the Properties have a clearly labeled and easily accessible privacy policy that provides end users with clear and comprehensive information about cookies, device-specific information, location information and other information stored on, accessed on, or collected from end users’ devices in connection with the Services, including, as applicable, information about end users’ options for cookie management.  We will use commercially reasonable efforts to ensure that an end user gives consent to the storing and accessing of cookies, device-specific information, location information or other information on the end user\'s device in connection with the Services where such consent is required by law.', bottom: 3, id: "__alloyId855" });

	$.__views.main.add($.__views.__alloyId855);
	$.__views.__alloyId856 = Ti.UI.createLabel(
	{ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#6E6E6E", font: { fontSize: "14" }, left: "10", textAlign: "left", right: "10", text: 'By downloading or using the app, these terms will automatically apply to you – you should make sure therefore that you read them carefully before using the app. We are offering you this app to use for your own personal use without cost, but you should be aware that you cannot send it on to anyone else, and you’re not allowed to copy, or modify the app, any part of the app, or our trademarks in any way. You’re not allowed to attempt to extract the source code of the app, and you also shouldn’t try to translate the app into other languages, or make derivative versions. The app itself, and all the trade marks, copyright, database rights and other intellectual property rights related to it, still belong to ASP Healthcare.', bottom: 3, id: "__alloyId856" });

	$.__views.main.add($.__views.__alloyId856);
	$.__views.__alloyId857 = Ti.UI.createLabel(
	{ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#6E6E6E", font: { fontSize: "14" }, left: "10", textAlign: "left", right: "10", text: 'ASP is committed to ensuring that the app is as useful and efficient as possible. For that reason, we reserve the right to make changes to the app or to charge for its services, at any time and for any reason. We will never charge you for the app or its services without making it very clear to you exactly what you’re paying for.', bottom: 3, id: "__alloyId857" });

	$.__views.main.add($.__views.__alloyId857);
	$.__views.__alloyId858 = Ti.UI.createLabel(
	{ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#6E6E6E", font: { fontSize: "14" }, left: "10", textAlign: "left", right: "10", text: 'The ASP app stores and processes personal data that you have provided to us so that you can monitor your medical records. It’s your responsibility to keep your phone and access to the app secure. The company shall not be liable for any leak of medical information stored in this app and/or provided by you in this app. We therefore recommend that you do not jailbreak or root your phone, which is the process of removing software restrictions and limitations imposed by the official operating system of your device. It could make your phone vulnerable to malware/viruses/malicious programs, compromise your phone’s security features and it could mean that the ASP app won’t work properly or at all.', bottom: 3, id: "__alloyId858" });

	$.__views.main.add($.__views.__alloyId858);
	$.__views.__alloyId859 = Ti.UI.createLabel(
	{ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#6E6E6E", font: { fontSize: "14" }, left: "10", textAlign: "left", right: "10", text: 'The connection can be Wi-Fi, or provided by your mobile network provider, but ASP cannot take responsibility for the app not working at full functionality if you don’t have access to Wi-Fi, and you don’t have any of your data allowance left.', bottom: 3, id: "__alloyId859" });

	$.__views.main.add($.__views.__alloyId859);
	$.__views.__alloyId860 = Ti.UI.createLabel(
	{ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#6E6E6E", font: { fontSize: "14" }, left: "10", textAlign: "left", right: "10", text: 'If you’re using the app outside of an area with Wi-Fi, you should remember that your terms of agreement with your mobile network provider will still apply. As a result, you may be charged by your mobile provider for the cost of data for the duration of the connection while accessing the app, or other third party charges. In using the app, you’re accepting responsibility for any such charges, including roaming data charges if you use the app outside of your home territory (i.e. region or country) without turning off data roaming. If you are not the bill payer for the device on which you’re using the app, please be aware that we assume that you have received permission from the bill payer for using the app.', bottom: 3, id: "__alloyId860" });

	$.__views.main.add($.__views.__alloyId860);
	$.__views.__alloyId861 = Ti.UI.createLabel(
	{ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#6E6E6E", font: { fontSize: "14" }, left: "10", textAlign: "left", right: "10", text: 'At some point we may wish to update the app. The app is currently available on Android and iOS – the requirements for both systems (and for any additional systems we decide to extend the availability of the app to) may change, and you’ll need to download the updates if you want to keep using the app. ASP does not promise that it will always update the app so that it is relevant to you and/or works with the iOS/Android version that you have installed on your device. However, you promise to always accept updates to the application when offered to you, We may also wish to stop providing the app, and may terminate use of it at any time without giving notice of termination to you. Unless we tell you otherwise, upon any termination, (a) the rights and licenses granted to you in these terms will end; (b) you must stop using the app, and (if needed) delete it from your device.', bottom: 3, id: "__alloyId861" });

	$.__views.main.add($.__views.__alloyId861);
	$.__views.__alloyId862 = Ti.UI.createView(
	{ width: Titanium.UI.FILL, height: 1, backgroundColor: "#F6F6F6", id: "__alloyId862" });

	$.__views.main.add($.__views.__alloyId862);
	exports.destroy = function () {};




	_.extend($, $.__views);


	var args = arguments[0] || {};

	$.btnBack.addEventListener('click', function () {
		$.win.close();
	});









	_.extend($, exports);
}

module.exports = Controller;