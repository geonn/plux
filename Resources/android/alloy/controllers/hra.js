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
	this.__controllerPath = 'hra';
	this.args = arguments[0] || {};

	if (arguments[0]) {
		var __parentSymbol = __processArg(arguments[0], '__parentSymbol');
		var $model = __processArg(arguments[0], '$model');
		var __itemTemplate = __processArg(arguments[0], '__itemTemplate');
	}
	var $ = this;
	var exports = {};
	var __defers = {};

	$.__views.hra = Ti.UI.createWindow({ backgroundColor: "#ffffff", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, title: "Health Risk Assessment", id: "hra", backButtonTitle: "", navTintColor: "#CE1D1C" });
	$.__views.hra && $.addTopLevelView($.__views.hra);
	$.__views.__alloyId445 = Ti.UI.createView({ layout: "vertical", id: "__alloyId445" });
	$.__views.hra.add($.__views.__alloyId445);
	if (true) {
		$.__views.__alloyId446 = Ti.UI.createView({ layout: "horizontal", height: 50, width: Ti.UI.FILL, backgroundColor: "#DEDEDE", id: "__alloyId446" });
		$.__views.__alloyId445.add($.__views.__alloyId446);
		$.__views.__alloyId447 = Ti.UI.createView({ left: 0, width: "20%", id: "__alloyId447" });
		$.__views.__alloyId446.add($.__views.__alloyId447);
		$.__views.btnBack = Ti.UI.createImageView({ left: 10, id: "btnBack", width: 25, height: 25, image: "/images/btn-back.png" });
		$.__views.__alloyId447.add($.__views.btnBack);
		$.__views.__alloyId448 = Ti.UI.createView({ width: "60%", id: "__alloyId448" });
		$.__views.__alloyId446.add($.__views.__alloyId448);
		$.__views.pageTitle = Ti.UI.createLabel({ width: Titanium.UI.SIZE, height: Ti.UI.SIZE, color: "#606060", font: { fontSize: "16dp" }, text: 'Health Risk Assessment', id: "pageTitle", textAlign: "center" });
		$.__views.__alloyId448.add($.__views.pageTitle);
	}
	var __alloyId449 = [];$.__views.__alloyId450 = Ti.UI.createTableViewRow({ color: "#606060", top: 5, bottom: 5, mod: "bmi", height: 40, id: "__alloyId450" });
	__alloyId449.push($.__views.__alloyId450);$.__views.__alloyId451 = Ti.UI.createLabel({ width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#606060", text: 'BMI Calculator', textAlign: "left", left: 15, id: "__alloyId451" });
	$.__views.__alloyId450.add($.__views.__alloyId451);
	$.__views.__alloyId452 = Ti.UI.createTableViewRow({ color: "#606060", top: 5, bottom: 5, mod: "whratio", height: 40, id: "__alloyId452" });
	__alloyId449.push($.__views.__alloyId452);$.__views.__alloyId453 = Ti.UI.createLabel({ width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#606060", text: 'Waist-To-Hips Ratio Calculator', textAlign: "left", left: 15, id: "__alloyId453" });
	$.__views.__alloyId452.add($.__views.__alloyId453);
	$.__views.__alloyId454 = Ti.UI.createTableViewRow({ color: "#606060", top: 5, bottom: 5, mod: "nutritional_profile", height: 40, id: "__alloyId454" });
	__alloyId449.push($.__views.__alloyId454);$.__views.__alloyId455 = Ti.UI.createLabel({ width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#606060", text: 'Nutritional Profile', textAlign: "left", left: 15, id: "__alloyId455" });
	$.__views.__alloyId454.add($.__views.__alloyId455);
	$.__views.__alloyId456 = Ti.UI.createTableViewRow({ color: "#606060", top: 5, bottom: 5, mod: "smokecost", height: 40, id: "__alloyId456" });
	__alloyId449.push($.__views.__alloyId456);$.__views.__alloyId457 = Ti.UI.createLabel({ width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#606060", text: 'Smoking Cost Calculator', textAlign: "left", left: 15, id: "__alloyId457" });
	$.__views.__alloyId456.add($.__views.__alloyId457);
	$.__views.__alloyId458 = Ti.UI.createTableViewRow({ color: "#606060", top: 5, bottom: 5, mod: "diabetes", height: 40, id: "__alloyId458" });
	__alloyId449.push($.__views.__alloyId458);$.__views.__alloyId459 = Ti.UI.createLabel({ width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#606060", text: 'Diabetes Risk Calculator', textAlign: "left", left: 15, id: "__alloyId459" });
	$.__views.__alloyId458.add($.__views.__alloyId459);
	$.__views.menu = Ti.UI.createTableView({ data: __alloyId449, id: "menu" });
	$.__views.__alloyId445.add($.__views.menu);
	exports.destroy = function () {};

	_.extend($, $.__views);

	var args = arguments[0] || {};

	$.menu.addEventListener('click', function (e) {
		var elbl = JSON.stringify(e.rowData);
		var res = JSON.parse(elbl);
		nav.navigateWithArgs("hra_detail", { mod: res.mod });
	});

	if ('android' == "android") {
		$.btnBack.addEventListener('click', function () {
			nav.closeWindow($.hra);
		});
	}

	_.extend($, exports);
}

module.exports = Controller;