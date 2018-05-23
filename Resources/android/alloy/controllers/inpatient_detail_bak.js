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
	this.__controllerPath = 'inpatient_detail_bak';
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
	{ backgroundColor: "#535a74", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, title: "Inpatient Detail", id: "win", backButtonTitle: "", navTintColor: "#CE1D1C" });

	$.__views.win && $.addTopLevelView($.__views.win);
	$.__views.__alloyId684 = Ti.UI.createView(
	{ borderWidth: 0, height: Ti.UI.FILL, width: Ti.UI.FILL, layout: "vertical", id: "__alloyId684" });

	$.__views.win.add($.__views.__alloyId684);
	if (true) {
		$.__views.__alloyId685 = Ti.UI.createView(
		{ borderWidth: 0, layout: "horizontal", height: 50, width: "100%", backgroundColor: "#DEDEDE", id: "__alloyId685" });

		$.__views.__alloyId684.add($.__views.__alloyId685);
		$.__views.__alloyId686 = Ti.UI.createView(
		{ borderWidth: 0, left: 0, width: "10%", id: "__alloyId686" });

		$.__views.__alloyId685.add($.__views.__alloyId686);
		$.__views.btnBack = Ti.UI.createImageView(
		{ left: 10, id: "btnBack", width: 25, height: 25, image: "/images/btn-back.png" });

		$.__views.__alloyId686.add($.__views.btnBack);
		closeWindow ? $.addListener($.__views.btnBack, 'click', closeWindow) : __defers['$.__views.btnBack!click!closeWindow'] = true;$.__views.pageTitle = Ti.UI.createView(
		{ borderWidth: 0, id: "pageTitle", width: Ti.UI.FILL });

		$.__views.__alloyId685.add($.__views.pageTitle);
		$.__views.__alloyId687 = Ti.UI.createLabel(
		{ width: Titanium.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontSize: "16dp" }, text: 'Inpatient Detail', textAlign: "center", id: "__alloyId687" });

		$.__views.pageTitle.add($.__views.__alloyId687);
	}
	$.__views.main = Ti.UI.createScrollView(
	{ layout: "vertical", id: "main" });

	$.__views.__alloyId684.add($.__views.main);
	$.__views.__alloyId688 = Ti.UI.createView(
	{ borderWidth: 0, layout: "horizontal", width: Ti.UI.FILL, height: Ti.UI.SIZE, bottom: 10, left: 10, right: 10, top: 10, id: "__alloyId688" });

	$.__views.main.add($.__views.__alloyId688);
	$.__views.__alloyId689 = Ti.UI.createLabel(
	{ width: "32%", height: Ti.UI.SIZE, color: "#A52430", font: { fontSize: 14 }, text: "Invoice No.", id: "__alloyId689" });

	$.__views.__alloyId688.add($.__views.__alloyId689);
	$.__views.__alloyId690 = Ti.UI.createView(
	{ borderWidth: 0, layout: "vertical", height: Ti.UI.SIZE, width: "68%", id: "__alloyId690" });

	$.__views.__alloyId688.add($.__views.__alloyId690);
	$.__views.invno = Ti.UI.createLabel(
	{ width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#111111", top: 10, left: 5, right: 5, bottom: 10, font: { fontSize: 12 }, id: "invno" });

	$.__views.__alloyId690.add($.__views.invno);
	$.__views.__alloyId691 = Ti.UI.createView(
	{ borderWidth: 0, layout: "horizontal", width: Ti.UI.FILL, height: Ti.UI.SIZE, bottom: 10, left: 10, right: 10, id: "__alloyId691" });

	$.__views.main.add($.__views.__alloyId691);
	$.__views.__alloyId692 = Ti.UI.createLabel(
	{ width: "32%", height: Ti.UI.SIZE, color: "#A52430", font: { fontSize: 14 }, text: "NRIC/Passport No.", id: "__alloyId692" });

	$.__views.__alloyId691.add($.__views.__alloyId692);
	$.__views.__alloyId693 = Ti.UI.createView(
	{ borderWidth: 0, layout: "vertical", height: Ti.UI.SIZE, width: "68%", id: "__alloyId693" });

	$.__views.__alloyId691.add($.__views.__alloyId693);
	$.__views.nric = Ti.UI.createLabel(
	{ width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#111111", top: 10, left: 5, right: 5, bottom: 10, font: { fontSize: 12 }, id: "nric" });

	$.__views.__alloyId693.add($.__views.nric);
	$.__views.__alloyId694 = Ti.UI.createView(
	{ borderWidth: 0, layout: "horizontal", width: Ti.UI.FILL, height: Ti.UI.SIZE, bottom: 10, left: 10, right: 10, id: "__alloyId694" });

	$.__views.main.add($.__views.__alloyId694);
	$.__views.__alloyId695 = Ti.UI.createLabel(
	{ width: "32%", height: Ti.UI.SIZE, color: "#A52430", font: { fontSize: 14 }, text: "Patient Name:", id: "__alloyId695" });

	$.__views.__alloyId694.add($.__views.__alloyId695);
	$.__views.__alloyId696 = Ti.UI.createView(
	{ borderWidth: 0, layout: "vertical", height: Ti.UI.SIZE, width: "68%", id: "__alloyId696" });

	$.__views.__alloyId694.add($.__views.__alloyId696);
	$.__views.name = Ti.UI.createLabel(
	{ width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#111111", top: 10, left: 5, right: 5, bottom: 10, font: { fontSize: 12 }, id: "name" });

	$.__views.__alloyId696.add($.__views.name);
	$.__views.__alloyId697 = Ti.UI.createView(
	{ borderWidth: 0, layout: "horizontal", width: Ti.UI.FILL, height: Ti.UI.SIZE, bottom: 10, left: 10, right: 10, id: "__alloyId697" });

	$.__views.main.add($.__views.__alloyId697);
	$.__views.__alloyId698 = Ti.UI.createLabel(
	{ width: "32%", height: Ti.UI.SIZE, color: "#A52430", font: { fontSize: 14 }, text: "Relation:", id: "__alloyId698" });

	$.__views.__alloyId697.add($.__views.__alloyId698);
	$.__views.__alloyId699 = Ti.UI.createView(
	{ borderWidth: 0, layout: "vertical", height: Ti.UI.SIZE, width: "68%", id: "__alloyId699" });

	$.__views.__alloyId697.add($.__views.__alloyId699);
	$.__views.relation = Ti.UI.createLabel(
	{ width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#111111", top: 10, left: 5, right: 5, bottom: 10, font: { fontSize: 12 }, id: "relation" });

	$.__views.__alloyId699.add($.__views.relation);
	$.__views.__alloyId700 = Ti.UI.createView(
	{ borderWidth: 0, layout: "horizontal", width: Ti.UI.FILL, height: Ti.UI.SIZE, bottom: 10, left: 10, right: 10, id: "__alloyId700" });

	$.__views.main.add($.__views.__alloyId700);
	$.__views.__alloyId701 = Ti.UI.createLabel(
	{ width: "32%", height: Ti.UI.SIZE, color: "#A52430", font: { fontSize: 14 }, text: "Clinic Name:", id: "__alloyId701" });

	$.__views.__alloyId700.add($.__views.__alloyId701);
	$.__views.__alloyId702 = Ti.UI.createView(
	{ borderWidth: 0, layout: "vertical", height: Ti.UI.SIZE, width: "68%", id: "__alloyId702" });

	$.__views.__alloyId700.add($.__views.__alloyId702);
	$.__views.hospitalname = Ti.UI.createLabel(
	{ width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#111111", top: 10, left: 5, right: 5, bottom: 10, font: { fontSize: 12 }, id: "hospitalname" });

	$.__views.__alloyId702.add($.__views.hospitalname);
	$.__views.__alloyId703 = Ti.UI.createView(
	{ borderWidth: 0, layout: "horizontal", width: Ti.UI.FILL, height: Ti.UI.SIZE, bottom: 10, left: 10, right: 10, id: "__alloyId703" });

	$.__views.main.add($.__views.__alloyId703);
	$.__views.__alloyId704 = Ti.UI.createLabel(
	{ width: "32%", height: Ti.UI.SIZE, color: "#A52430", font: { fontSize: 14 }, text: "Admission Date:", id: "__alloyId704" });

	$.__views.__alloyId703.add($.__views.__alloyId704);
	$.__views.__alloyId705 = Ti.UI.createView(
	{ borderWidth: 0, layout: "vertical", height: Ti.UI.SIZE, width: "68%", id: "__alloyId705" });

	$.__views.__alloyId703.add($.__views.__alloyId705);
	$.__views.admdt = Ti.UI.createLabel(
	{ width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#111111", top: 10, left: 5, right: 5, bottom: 10, font: { fontSize: 12 }, id: "admdt" });

	$.__views.__alloyId705.add($.__views.admdt);
	$.__views.__alloyId706 = Ti.UI.createView(
	{ borderWidth: 0, layout: "horizontal", width: Ti.UI.FILL, height: Ti.UI.SIZE, bottom: 10, left: 10, right: 10, id: "__alloyId706" });

	$.__views.main.add($.__views.__alloyId706);
	$.__views.__alloyId707 = Ti.UI.createLabel(
	{ width: "32%", height: Ti.UI.SIZE, color: "#A52430", font: { fontSize: 14 }, text: "Discharged Date:", id: "__alloyId707" });

	$.__views.__alloyId706.add($.__views.__alloyId707);
	$.__views.__alloyId708 = Ti.UI.createView(
	{ borderWidth: 0, layout: "vertical", height: Ti.UI.SIZE, width: "68%", id: "__alloyId708" });

	$.__views.__alloyId706.add($.__views.__alloyId708);
	$.__views.disdt = Ti.UI.createLabel(
	{ width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#111111", top: 10, left: 5, right: 5, bottom: 10, font: { fontSize: 12 }, id: "disdt" });

	$.__views.__alloyId708.add($.__views.disdt);
	$.__views.__alloyId709 = Ti.UI.createView(
	{ borderWidth: 0, layout: "horizontal", width: Ti.UI.FILL, height: Ti.UI.SIZE, bottom: 10, left: 10, right: 10, id: "__alloyId709" });

	$.__views.main.add($.__views.__alloyId709);
	$.__views.__alloyId710 = Ti.UI.createLabel(
	{ width: "32%", height: Ti.UI.SIZE, color: "#A52430", font: { fontSize: 14 }, text: "Diagnosis:", id: "__alloyId710" });

	$.__views.__alloyId709.add($.__views.__alloyId710);
	$.__views.__alloyId711 = Ti.UI.createView(
	{ borderWidth: 0, layout: "vertical", height: Ti.UI.SIZE, width: "68%", id: "__alloyId711" });

	$.__views.__alloyId709.add($.__views.__alloyId711);
	$.__views.diagnosis = Ti.UI.createLabel(
	{ width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#111111", top: 10, left: 5, right: 5, bottom: 10, font: { fontSize: 12 }, id: "diagnosis" });

	$.__views.__alloyId711.add($.__views.diagnosis);
	$.__views.__alloyId712 = Ti.UI.createView(
	{ borderWidth: 0, layout: "horizontal", width: Ti.UI.FILL, height: Ti.UI.SIZE, bottom: 10, left: 10, right: 10, id: "__alloyId712" });

	$.__views.main.add($.__views.__alloyId712);
	$.__views.__alloyId713 = Ti.UI.createLabel(
	{ width: "32%", height: Ti.UI.SIZE, color: "#A52430", font: { fontSize: 14 }, text: "Total Amount(RM):", id: "__alloyId713" });

	$.__views.__alloyId712.add($.__views.__alloyId713);
	$.__views.__alloyId714 = Ti.UI.createView(
	{ borderWidth: 0, layout: "vertical", height: Ti.UI.SIZE, width: "68%", id: "__alloyId714" });

	$.__views.__alloyId712.add($.__views.__alloyId714);
	$.__views.amount = Ti.UI.createLabel(
	{ width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#111111", top: 10, left: 5, right: 5, bottom: 10, font: { fontSize: 12 }, id: "amount" });

	$.__views.__alloyId714.add($.__views.amount);
	$.__views.pdfurl = Ti.UI.createView(
	{ borderWidth: 3, layout: "horizontal", width: Ti.UI.SIZE, height: Ti.UI.SIZE, bottom: 10, id: "pdfurl", backgroundColor: "#E51B2D", right: 25 });

	$.__views.main.add($.__views.pdfurl);
	$.__views.__alloyId715 = Ti.UI.createImageView(
	{ width: 60, height: 60, image: "/images/pdficon.png", id: "__alloyId715" });

	$.__views.pdfurl.add($.__views.__alloyId715);
	$.__views.__alloyId716 = Ti.UI.createLabel(
	{ width: 130, height: Ti.UI.SIZE, color: "#fff", font: { fontSize: 12 }, text: "Download Payment Notice", right: 10, id: "__alloyId716" });

	$.__views.pdfurl.add($.__views.__alloyId716);
	exports.destroy = function () {};




	_.extend($, $.__views);








	if (true) {
		__defers['$.__views.btnBack!click!closeWindow'] && $.addListener($.__views.btnBack, 'click', closeWindow);}




	_.extend($, exports);
}

module.exports = Controller;