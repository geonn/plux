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
		this.__controllerPath = 'asp/signup';
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
		{ backgroundColor: "#535a74", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, width: Ti.UI.FILL, height: Ti.UI.FILL, navTintColor: "#CE1D1C", title: "ASP Signup", id: "win" });

		$.__views.win && $.addTopLevelView($.__views.win);
		$.__views.__alloyId469 = Ti.UI.createView(
		{ borderWidth: 0, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.FILL, id: "__alloyId469" });

		$.__views.win.add($.__views.__alloyId469);
		$.__views.__alloyId470 = Ti.UI.createView(
		{ borderWidth: 0, top: 0, height: 50, backgroundColor: "#DEDEDE", id: "__alloyId470" });

		$.__views.__alloyId469.add($.__views.__alloyId470);
		$.__views.btnBack = Ti.UI.createView(
		{ borderWidth: 0, left: 0, zIndex: 9, id: "btnBack", width: "20%" });

		$.__views.__alloyId470.add($.__views.btnBack);
		$.__views.__alloyId471 = Ti.UI.createImageView(
		{ left: 10, width: 25, height: 25, image: "/images/btn-back.png", id: "__alloyId471" });

		$.__views.btnBack.add($.__views.__alloyId471);
		$.__views.__alloyId472 = Ti.UI.createView(
		{ borderWidth: 0, id: "__alloyId472" });

		$.__views.__alloyId470.add($.__views.__alloyId472);
		$.__views.titleLbl = Ti.UI.createLabel(
		{ width: Titanium.UI.SIZE, height: Ti.UI.SIZE, color: "#A52430", text: 'ASP Sign Up', id: "titleLbl", textAlign: "center" });

		$.__views.__alloyId472.add($.__views.titleLbl);
		$.__views.main = Ti.UI.createScrollView(
		{ layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.FILL, contentHeight: Ti.UI.SIZE, contentWidth: Ti.UI.FILL, id: "main" });

		$.__views.__alloyId469.add($.__views.main);
		$.__views.__alloyId473 = Ti.UI.createImageView(
		{ width: 120, borderRadius: 10, height: 120, backgroundColor: "#ff0000", bottom: "20dp", top: "20dp", image: "/images/asp_logo.png", id: "__alloyId473" });

		$.__views.main.add($.__views.__alloyId473);
		$.__views.forms = Ti.UI.createView(
		{ borderWidth: 0, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.SIZE, id: "forms" });

		$.__views.main.add($.__views.forms);
		$.__views.memno = Ti.UI.createView(
		{ borderWidth: 0, top: 0, left: 10, right: 10, bottom: 10, width: Ti.UI.FILL, height: Ti.UI.SIZE, borderRadius: "5", required: 1, backgroundColor: "#fba81c", id: "memno", value: "" });

		$.__views.forms.add($.__views.memno);
		$.__views.__alloyId474 = Ti.UI.createTextField(
		{ borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000000", backgroundColor: "#ffffff", hintText: "Member Number or IC Number", left: 5, value: "", id: "__alloyId474" });

		$.__views.memno.add($.__views.__alloyId474);
		textFieldOnFocus ? $.addListener($.__views.__alloyId474, 'focus', textFieldOnFocus) : __defers['$.__views.__alloyId474!focus!textFieldOnFocus'] = true;textFieldOnBlur ? $.addListener($.__views.__alloyId474, 'blur', textFieldOnBlur) : __defers['$.__views.__alloyId474!blur!textFieldOnBlur'] = true;$.__views.empno = Ti.UI.createView(
		{ borderWidth: 0, top: 0, left: 10, right: 10, bottom: 10, width: Ti.UI.FILL, height: Ti.UI.SIZE, borderRadius: "5", required: 1, backgroundColor: "#fba81c", id: "empno", value: "" });

		$.__views.forms.add($.__views.empno);
		$.__views.__alloyId475 = Ti.UI.createTextField(
		{ borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000000", backgroundColor: "#ffffff", hintText: "Employee Number", left: 5, value: "", id: "__alloyId475" });

		$.__views.empno.add($.__views.__alloyId475);
		textFieldOnFocus ? $.addListener($.__views.__alloyId475, 'focus', textFieldOnFocus) : __defers['$.__views.__alloyId475!focus!textFieldOnFocus'] = true;textFieldOnBlur ? $.addListener($.__views.__alloyId475, 'blur', textFieldOnBlur) : __defers['$.__views.__alloyId475!blur!textFieldOnBlur'] = true;$.__views.asp_sign_btn = Ti.UI.createButton(
		{ borderRadius: 5, backgroundColor: "#CC2228", height: 40, color: "#ffffff", width: "70%", id: "asp_sign_btn", title: "Sign Up", top: 20, bottom: 20 });

		$.__views.main.add($.__views.asp_sign_btn);
		doAspSignup ? $.addListener($.__views.asp_sign_btn, 'click', doAspSignup) : __defers['$.__views.asp_sign_btn!click!doAspSignup'] = true;exports.destroy = function () {};




		_.extend($, $.__views);


		var args = arguments[0] || {};
		var nav = Alloy.Globals.navMenu;
		var loading = Alloy.createController('loading');
		$.win.add(loading.getView());


		var isKeyboardFocus = 0;

		function doAspSignup() {
				loading.start();
				var memno = $.memno.children[0].value;
				var empno = $.empno.children[0].value;


				var params = {
						memno: memno,
						empno: empno };


				API.do_asp_presignup(params, {
						finish: function () {
								loading.finish();
						},
						callback: function () {
								console.log(nav);
								$.win.close();

								var win = Alloy.createController("asp/signup2").getView();
								win.open();
						} });

		}

		function textFieldOnFocus(e) {
				e.source.parent.backgroundColor = "#ffffff";
				if (e.source.value == e.source.hintText) {
						e.source.value = "";

				}
		}

		function textFieldOnBlur(e) {
				console.log(e.source.value + " " + e.source.required);
				if (e.source.required && e.source.value == "") {

						e.source.parent.backgroundColor = "#e8534c";
				} else {
						e.source.parent.backgroundColor = "#55a939";
				}
				if (e.source.value == "") {
						e.source.value = e.source.hintText;

				}
		}





		$.btnBack.addEventListener('click', function () {
				$.win.close();
		});





		__defers['$.__views.__alloyId474!focus!textFieldOnFocus'] && $.addListener($.__views.__alloyId474, 'focus', textFieldOnFocus);__defers['$.__views.__alloyId474!blur!textFieldOnBlur'] && $.addListener($.__views.__alloyId474, 'blur', textFieldOnBlur);__defers['$.__views.__alloyId475!focus!textFieldOnFocus'] && $.addListener($.__views.__alloyId475, 'focus', textFieldOnFocus);__defers['$.__views.__alloyId475!blur!textFieldOnBlur'] && $.addListener($.__views.__alloyId475, 'blur', textFieldOnBlur);__defers['$.__views.asp_sign_btn!click!doAspSignup'] && $.addListener($.__views.asp_sign_btn, 'click', doAspSignup);



		_.extend($, exports);
}

module.exports = Controller;