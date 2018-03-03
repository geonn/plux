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
		this.__controllerPath = 'myHealth/healthDataSummary';
		this.args = arguments[0] || {};

		if (arguments[0]) {
				var __parentSymbol = __processArg(arguments[0], '__parentSymbol');
				var $model = __processArg(arguments[0], '$model');
				var __itemTemplate = __processArg(arguments[0], '__itemTemplate');
		}
		var $ = this;
		var exports = {};
		var __defers = {};







		$.__views.dashboard = Ti.UI.createWindow(
		{ backgroundColor: "#ffffff", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, title: "Dashboard", id: "dashboard", backButtonTitle: "", navTintColor: "#CE1D1C" });

		$.__views.dashboard && $.addTopLevelView($.__views.dashboard);
		$.__views.__alloyId661 = Ti.UI.createView(
		{ id: "__alloyId661" });

		$.__views.dashboard.add($.__views.__alloyId661);
		$.__views.main = Ti.UI.createView(
		{ id: "main", height: Ti.UI.SIZE, layout: "vertical", backgroundColor: "#ffffff", top: 0 });

		$.__views.__alloyId661.add($.__views.main);
		if (true) {
				$.__views.__alloyId662 = Ti.UI.createView(
				{ layout: "horizontal", height: 50, width: "100%", backgroundColor: "#DEDEDE", id: "__alloyId662" });

				$.__views.main.add($.__views.__alloyId662);
				$.__views.__alloyId663 = Ti.UI.createView(
				{ left: 0, width: "10%", id: "__alloyId663" });

				$.__views.__alloyId662.add($.__views.__alloyId663);
				$.__views.btnBack = Ti.UI.createImageView(
				{ left: 10, id: "btnBack", width: 25, height: 25, image: "/images/btn-back.png" });

				$.__views.__alloyId663.add($.__views.btnBack);
				$.__views.pageTitle = Ti.UI.createView(
				{ id: "pageTitle", width: "80%" });

				$.__views.__alloyId662.add($.__views.pageTitle);
				$.__views.__alloyId664 = Ti.UI.createLabel(
				{ width: Titanium.UI.SIZE, height: Ti.UI.SIZE, color: "#606060", font: { fontSize: "16dp" }, text: 'All Recorded Data', textAlign: "center", id: "__alloyId664" });

				$.__views.pageTitle.add($.__views.__alloyId664);
		}
		var __alloyId665 = [];var __alloyId668 = { font: { fontSize: "12dp" }, title: "Month" };
		__alloyId665.push(__alloyId668);var __alloyId669 = { font: { fontSize: "12dp" }, title: "Year" };
		__alloyId665.push(__alloyId669);$.__views.buttonbarData = (require("TabbedBar").createTabbedBar || Ti.UI.iOS.createTabbedBar)(
		{ labels: __alloyId665, id: "buttonbarData", backgroundColor: "#CE1D1C", index: 0, color: "#ffffff", borderColor: "#CE1D1C", height: 35, width: Ti.UI.FILL });

		$.__views.main.add($.__views.buttonbarData);
		$.__views.bmiView = Ti.UI.createView(
		{ id: "bmiView", height: Ti.UI.SIZE, width: "100%", backgroundColor: "#EBEBEB" });

		$.__views.main.add($.__views.bmiView);
		var __alloyId670 = [];$.__views.addHealthData = Ti.UI.createTableViewRow(
		{ color: "#606060", top: 10, bottom: 10, left: 10, right: 10, backgroundSelectedColor: "#FFE1E1", id: "addHealthData", title: "Add Data Point", hasChild: true });

		__alloyId670.push($.__views.addHealthData);addData ? $.addListener($.__views.addHealthData, 'click', addData) : __defers['$.__views.addHealthData!click!addData'] = true;$.__views.__alloyId671 = Ti.UI.createTableViewRow(
		{ color: "#606060", top: 10, bottom: 10, left: 10, right: 10, backgroundSelectedColor: "#FFE1E1", title: "Show All Data", hasChild: true, id: "__alloyId671" });

		__alloyId670.push($.__views.__alloyId671);editData ? $.addListener($.__views.__alloyId671, 'click', editData) : __defers['$.__views.__alloyId671!click!editData'] = true;$.__views.healthTableData = Ti.UI.createTableView(
		{ data: __alloyId670, id: "healthTableData", height: Ti.UI.SIZE, width: "100%", scrollable: false });

		$.__views.main.add($.__views.healthTableData);
		exports.destroy = function () {};




		_.extend($, $.__views);


		var args = arguments[0] || {};
		var gType = args.gType || 1;
		var hd = require('healthData');
		common.construct($);


		if (gType == "1") {
				var url = "/html/bmi.html";
		}
		if (gType == "2") {
				var url = "/html/bloodPressure.html";
		}
		if (gType == "3") {
				var url = "/html/heartRate.html";
		}
		if (gType == "4") {
				var url = "/html/bodyTemperature.html";
		}
		if (gType == "5") {
				var url = "/html/height.html";
		}
		if (gType == "6") {
				var url = "/html/weight.html";
		}
		if (gType == "7") {
				var url = "/html/cholestrol.html";
		}
		if (gType == "8") {
				var url = "/html/glucose.html";
		}
		if (gType == "10") {
				var url = "/html/steps.html";
		}

		var webview = $.UI.create("WebView", {
				id: "graphWebView",
				width: "100%",
				bottom: 10,
				url: url,
				height: Ti.UI.SIZE,
				backgroundColor: "#EBEBEB" });


		var line = $.UI.create("View", {
				height: 1,
				bottom: 0,
				backgroundColor: "#FC7474",
				width: "100%" });

		$.bmiView.add(webview);
		$.bmiView.add(line);

		function loadBarData(e) {
				if (e.index == "0") {
						loadGraph("month");
				} else {
						loadGraph("year");
				}
		}

		$.buttonbarData.addEventListener('click', loadBarData);







		function loadGraph(dataPeriod) {
				hd.loadGraphByType(gType, dataPeriod);
		}

		function addData() {
				hd.navigateGraph(gType);
		}

		function editData() {
				nav.navigateWithArgs("myHealth/healthEditData", { gType: gType });
		}

		if ('android' == "android") {
				$.btnBack.addEventListener('click', function () {
						nav.closeWindow($.dashboard);
				});
		}

		webview.addEventListener("load", function (e) {
				loadGraph("month");
		});





		__defers['$.__views.addHealthData!click!addData'] && $.addListener($.__views.addHealthData, 'click', addData);__defers['$.__views.__alloyId671!click!editData'] && $.addListener($.__views.__alloyId671, 'click', editData);



		_.extend($, exports);
}

module.exports = Controller;