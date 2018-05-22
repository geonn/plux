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
	this.__controllerPath = 'Copy of editMedical';
	this.args = arguments[0] || {};

	if (arguments[0]) {
		var __parentSymbol = __processArg(arguments[0], '__parentSymbol');
		var $model = __processArg(arguments[0], '$model');
		var __itemTemplate = __processArg(arguments[0], '__itemTemplate');
	}
	var $ = this;
	var exports = {};
	var __defers = {};







	$.__views.editRecWin = Ti.UI.createWindow(
	{ backgroundColor: "#535a74", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, id: "editRecWin", title: "My Medical Record", backButtonTitle: "", navTintColor: "#CE1D1C" });

	$.__views.editRecWin && $.addTopLevelView($.__views.editRecWin);
	$.__views.__alloyId1 = Ti.UI.createView(
	{ borderWidth: 0, layout: "vertical", bottom: 90, id: "__alloyId1" });

	$.__views.editRecWin.add($.__views.__alloyId1);
	if (true) {
		$.__views.__alloyId2 = Ti.UI.createView(
		{ borderWidth: 0, layout: "horizontal", height: 50, width: Ti.UI.FILL, backgroundColor: "#DEDEDE", id: "__alloyId2" });

		$.__views.__alloyId1.add($.__views.__alloyId2);
		$.__views.__alloyId3 = Ti.UI.createView(
		{ borderWidth: 0, left: 0, width: "20%", id: "__alloyId3" });

		$.__views.__alloyId2.add($.__views.__alloyId3);
		$.__views.btnBack = Ti.UI.createImageView(
		{ left: 10, id: "btnBack", width: 25, height: 25, image: "/images/btn-back.png" });

		$.__views.__alloyId3.add($.__views.btnBack);
		$.__views.__alloyId4 = Ti.UI.createView(
		{ borderWidth: 0, width: "60%", id: "__alloyId4" });

		$.__views.__alloyId2.add($.__views.__alloyId4);
		$.__views.pageTitle = Ti.UI.createLabel(
		{ width: Titanium.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontSize: "16dp" }, text: 'My Medical Record', id: "pageTitle", textAlign: "center" });

		$.__views.__alloyId4.add($.__views.pageTitle);
		$.__views.__alloyId5 = Ti.UI.createView(
		{ borderWidth: 0, left: 0, width: "20%", id: "__alloyId5" });

		$.__views.__alloyId2.add($.__views.__alloyId5);
		$.__views.saveRecord = Ti.UI.createButton(
		{ borderRadius: 5, backgroundColor: "#CC2228", height: 40, color: "#000", width: Ti.UI.FILL, font: { fontSize: "10dp" }, id: "saveRecord", title: "Done" });

		$.__views.__alloyId5.add($.__views.saveRecord);
	}
	$.__views.titleRecord = Ti.UI.createTextField(
	{ borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: "95%", height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000000", backgroundColor: "#ffffff", top: 0, id: "titleRecord", borderColor: "#ffffff", hintText: "Medical Problem" });

	$.__views.__alloyId1.add($.__views.titleRecord);
	$.__views.__alloyId6 = Ti.UI.createView(
	{ borderWidth: 0, height: 1, width: "100%", backgroundColor: "#CE1D1C", id: "__alloyId6" });

	$.__views.__alloyId1.add($.__views.__alloyId6);
	$.__views.aView = Ti.UI.createScrollView(
	{ id: "aView", height: Ti.UI.FILL, contentHeight: Ti.UI.SIZE, layout: "vertical" });

	$.__views.__alloyId1.add($.__views.aView);
	$.__views.__alloyId7 = Ti.UI.createLabel(
	{ width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#A52430", font: { fontSize: 14, fontWeight: "bold" }, text: 'Clinic/Hospital/Specialist', left: 10, top: 10, textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT, id: "__alloyId7" });

	$.__views.aView.add($.__views.__alloyId7);
	$.__views.clinicRecord = Ti.UI.createTextField(
	{ borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000000", backgroundColor: "#f6f6f6", top: 0, left: 10, right: 10, id: "clinicRecord", borderColor: "#f6f6f6", hintText: "Please fill in Clinic/Hospital/Specialist" });

	$.__views.aView.add($.__views.clinicRecord);
	$.__views.__alloyId8 = Ti.UI.createLabel(
	{ width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#A52430", font: { fontSize: 14, fontWeight: "bold" }, text: 'Treatment', left: 10, top: 10, textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT, id: "__alloyId8" });

	$.__views.aView.add($.__views.__alloyId8);
	$.__views.treatmentTextArea = Ti.UI.createTextArea(
	{ id: "treatmentTextArea", backgroundColor: "#f6f6f6", color: "#888", textAlign: "left", hintText: "Treatment", value: "", width: Ti.UI.FILL, left: 10, right: 10, height: 200, suppressReturn: false });

	$.__views.aView.add($.__views.treatmentTextArea);
	$.__views.__alloyId9 = Ti.UI.createLabel(
	{ width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#A52430", font: { fontSize: 14, fontWeight: "bold" }, text: 'Procedures', left: 10, top: 10, textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT, id: "__alloyId9" });

	$.__views.aView.add($.__views.__alloyId9);
	$.__views.proceduceTextArea = Ti.UI.createTextArea(
	{ id: "proceduceTextArea", backgroundColor: "#f6f6f6", color: "#888", textAlign: "left", hintText: "Procedures", value: "", width: Ti.UI.FILL, left: 10, right: 10, height: 200, suppressReturn: false });

	$.__views.aView.add($.__views.proceduceTextArea);
	$.__views.__alloyId10 = Ti.UI.createView(
	{ borderWidth: 0, bottom: 40, height: Ti.UI.SIZE, layout: "horizontal", width: "100%", id: "__alloyId10" });

	$.__views.editRecWin.add($.__views.__alloyId10);
	$.__views.attachment = Ti.UI.createScrollView(
	{ id: "attachment", scrollType: "horizontal", layout: "horizontal", height: Ti.UI.SIZE, width: "80%" });

	$.__views.__alloyId10.add($.__views.attachment);
	$.__views.__alloyId11 = Ti.UI.createView(
	{ borderWidth: 0, width: "auto", height: Ti.UI.SIZE, id: "__alloyId11" });

	$.__views.__alloyId10.add($.__views.__alloyId11);
	showCategory ? $.addListener($.__views.__alloyId11, 'click', showCategory) : __defers['$.__views.__alloyId11!click!showCategory'] = true;$.__views.__alloyId12 = Ti.UI.createView(
	{ borderWidth: 0, backgroundColor: "#CE1D1C", height: 50, width: Ti.UI.FILL, right: 0, id: "__alloyId12" });

	$.__views.__alloyId11.add($.__views.__alloyId12);
	$.__views.addLbl = Ti.UI.createLabel(
	{ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#ffffff", id: "addLbl", text: "+" });

	$.__views.__alloyId12.add($.__views.addLbl);
	$.__views.__alloyId13 = Ti.UI.createView(
	{ borderWidth: 0, height: 40, layout: "horizontal", bottom: 0, width: "100%", backgroundColor: "#EEEEEE", id: "__alloyId13" });

	$.__views.editRecWin.add($.__views.__alloyId13);
	$.__views.__alloyId14 = Ti.UI.createButton(
	{ borderRadius: 5, backgroundColor: "#CC2228", height: 30, color: "#ffffff", width: 30, backgroundImage: "/images/btn-remove.png", textAlign: "left", left: 15, id: "__alloyId14" });

	$.__views.__alloyId13.add($.__views.__alloyId14);
	deleteRecord ? $.addListener($.__views.__alloyId14, 'click', deleteRecord) : __defers['$.__views.__alloyId14!click!deleteRecord'] = true;$.__views.__alloyId15 = Ti.UI.createView(
	{ borderWidth: 0, width: "auto", height: Ti.UI.FILL, id: "__alloyId15" });

	$.__views.__alloyId13.add($.__views.__alloyId15);
	$.__views.lastUpdated = Ti.UI.createLabel(
	{ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#111111", id: "lastUpdated", textAlign: "right", right: 10 });

	$.__views.__alloyId15.add($.__views.lastUpdated);
	exports.destroy = function () {};




	_.extend($, $.__views);








	__defers['$.__views.__alloyId11!click!showCategory'] && $.addListener($.__views.__alloyId11, 'click', showCategory);__defers['$.__views.__alloyId14!click!deleteRecord'] && $.addListener($.__views.__alloyId14, 'click', deleteRecord);



	_.extend($, exports);
}

module.exports = Controller;