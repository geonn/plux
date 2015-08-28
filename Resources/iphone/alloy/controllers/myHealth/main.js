function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function resetGraph() {
        $.bmiView.setHeight("0");
        $.bloodPressureView.setHeight("0");
        $.heartRateView.setHeight("0");
        $.bodyTemperatureView.setHeight("0");
        $.cholestrolView.setHeight("0");
        $.bmiView.setTop("0");
        $.bloodPressureView.setTop("0");
        $.heartRateView.setTop("0");
        $.bodyTemperatureView.setTop("0");
        $.cholestrolView.setTop("0");
    }
    function filterList(e) {
        if ("measurement" == e.category) {
            resetGraph();
            $.bmiView.setHeight(Ti.UI.SIZE);
            $.cholestrolView.setHeight(Ti.UI.SIZE);
            $.bmiView.setTop(10);
            $.cholestrolView.setTop(10);
            $.bmiView.show();
            $.cholestrolView.show();
        } else if ("vitals" == e.category) {
            resetGraph();
            $.heartRateView.setHeight(Ti.UI.SIZE);
            $.bodyTemperatureView.setHeight(Ti.UI.SIZE);
            $.bloodPressureView.setHeight(Ti.UI.SIZE);
            $.cholestrolView.setHeight(Ti.UI.SIZE);
            $.heartRateView.setTop(10);
            $.bodyTemperatureView.setTop(10);
            $.bloodPressureView.setTop(10);
            $.cholestrolView.setTop(10);
            $.heartRateView.show();
            $.bodyTemperatureView.show();
            $.bloodPressureView.show();
            $.cholestrolView.show();
        } else {
            for (var a = 0; a < $.graphScrollView.children.length; a++) {
                var activityIndicator = createIndicator();
                $.graphScrollView.children[a].children[0].add(activityIndicator);
                activityIndicator.show();
            }
            if ("android" != Ti.Platform.osname) {
                $.stepsView.setHeight(Ti.UI.SIZE);
                $.stepsView.setTop(10);
                $.stepsView.show();
            }
            $.bmiView.setHeight(Ti.UI.SIZE);
            $.heartRateView.setHeight(Ti.UI.SIZE);
            $.bodyTemperatureView.setHeight(Ti.UI.SIZE);
            $.bloodPressureView.setHeight(Ti.UI.SIZE);
            $.cholestrolView.setHeight(Ti.UI.SIZE);
            $.bmiView.setTop(10);
            $.heartRateView.setTop(10);
            $.bodyTemperatureView.setTop(10);
            $.bloodPressureView.setTop(10);
            $.cholestrolView.setTop(10);
            $.bmiView.show();
            $.bloodPressureView.show();
            $.heartRateView.show();
            $.bodyTemperatureView.show();
            $.cholestrolView.show();
        }
    }
    function loadLatest(e) {
        var graph_view = children({
            name: "gType",
            value: e.gType
        }, $.graphScrollView);
        graph_view.children[2].children[1].text = e.text;
    }
    function graphLoaded(e) {
        console.log(e.id);
        var graph_view = children({
            name: "gType",
            value: e.id
        }, $.graphScrollView);
        graph_view.children[0].children[0].hide();
    }
    function populateDataById(e) {
        hd.loadInfo(e.id, "", "1");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "myHealth/main";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    $.__views.myhealth = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        title: "MY HEALTH RECORD",
        id: "myhealth",
        backButtonTitle: "",
        navTintColor: "#CE1D1C"
    });
    $.__views.myhealth && $.addTopLevelView($.__views.myhealth);
<<<<<<< HEAD
    $.__views.__alloyId311 = Ti.UI.createView({
        id: "__alloyId311"
=======
    $.__views.__alloyId308 = Ti.UI.createView({
        id: "__alloyId308"
>>>>>>> origin/master
    });
    $.__views.moreHealth = Ti.UI.createImageView({
        right: "0",
        id: "moreHealth",
        width: "30",
        image: "/images/health_love.png"
    });
<<<<<<< HEAD
    $.__views.__alloyId311.add($.__views.moreHealth);
    $.__views.myhealth.rightNavButton = $.__views.__alloyId311;
    $.__views.__alloyId312 = Ti.UI.createView({
        id: "__alloyId312"
    });
    $.__views.myhealth.add($.__views.__alloyId312);
=======
    $.__views.__alloyId308.add($.__views.moreHealth);
    $.__views.myhealth.rightNavButton = $.__views.__alloyId308;
    $.__views.__alloyId309 = Ti.UI.createView({
        id: "__alloyId309"
    });
    $.__views.myhealth.add($.__views.__alloyId309);
>>>>>>> origin/master
    $.__views.loadingBar = Ti.UI.createView({
        layout: "vertical",
        id: "loadingBar",
        height: "120",
        width: "120",
        borderRadius: "15",
        backgroundColor: "#2E2E2E"
    });
<<<<<<< HEAD
    $.__views.__alloyId312.add($.__views.loadingBar);
=======
    $.__views.__alloyId309.add($.__views.loadingBar);
>>>>>>> origin/master
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        top: 30,
        left: 30,
        width: 60,
        id: "activityIndicator"
    });
    $.__views.loadingBar.add($.__views.activityIndicator);
<<<<<<< HEAD
    $.__views.__alloyId313 = Ti.UI.createLabel({
=======
    $.__views.__alloyId310 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        top: "5",
        text: "Loading",
        color: "#ffffff",
<<<<<<< HEAD
        id: "__alloyId313"
    });
    $.__views.loadingBar.add($.__views.__alloyId313);
=======
        id: "__alloyId310"
    });
    $.__views.loadingBar.add($.__views.__alloyId310);
>>>>>>> origin/master
    $.__views.main = Ti.UI.createView({
        id: "main",
        layout: "vertical",
        backgroundColor: "#ffffff"
    });
<<<<<<< HEAD
    $.__views.__alloyId312.add($.__views.main);
=======
    $.__views.__alloyId309.add($.__views.main);
>>>>>>> origin/master
    $.__views.graphScrollView = Ti.UI.createScrollView({
        id: "graphScrollView",
        layout: "vertical",
        height: "auto",
        width: "100%",
        backgroundColor: "#EBEBEB",
        contentWidth: Ti.UI.FILL
    });
    $.__views.main.add($.__views.graphScrollView);
    $.__views.stepsView = Ti.UI.createView({
        id: "stepsView",
        gType: "10",
        height: Ti.UI.SIZE,
        layout: "vertical",
        left: "10",
        right: "10",
        top: "10",
        borderColor: "#dfe0e4",
        width: Ti.UI.FILL,
        backgroundColor: "#FFFFFF",
        visible: "false"
    });
    $.__views.graphScrollView.add($.__views.stepsView);
    $.__views.stepsWebView = Ti.UI.createWebView({
        touchEnabled: false,
        id: "stepsWebView",
        height: "230",
        width: "100%",
        url: "/html/steps.html",
        disableBounce: "true"
    });
    $.__views.stepsView.add($.__views.stepsWebView);
<<<<<<< HEAD
    $.__views.__alloyId314 = Ti.UI.createView({
=======
    $.__views.__alloyId311 = Ti.UI.createView({
>>>>>>> origin/master
        height: "1",
        left: "10",
        right: "10",
        bottom: "0",
        backgroundColor: "#dfe0e4",
        width: Ti.UI.FILL,
<<<<<<< HEAD
        id: "__alloyId314"
    });
    $.__views.stepsView.add($.__views.__alloyId314);
    $.__views.__alloyId315 = Ti.UI.createView({
=======
        id: "__alloyId311"
    });
    $.__views.stepsView.add($.__views.__alloyId311);
    $.__views.__alloyId312 = Ti.UI.createView({
>>>>>>> origin/master
        height: Ti.UI.SIZE,
        left: "10",
        right: "10",
        top: "10",
        bottom: "10",
<<<<<<< HEAD
        id: "__alloyId315"
    });
    $.__views.stepsView.add($.__views.__alloyId315);
    $.__views.__alloyId316 = Ti.UI.createLabel({
=======
        id: "__alloyId312"
    });
    $.__views.stepsView.add($.__views.__alloyId312);
    $.__views.__alloyId313 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        text: "Latest",
        color: "#9197a3",
        font: "fontSize: 12",
        left: "0",
<<<<<<< HEAD
        id: "__alloyId316"
    });
    $.__views.__alloyId315.add($.__views.__alloyId316);
=======
        id: "__alloyId313"
    });
    $.__views.__alloyId312.add($.__views.__alloyId313);
>>>>>>> origin/master
    $.__views.stepsDetailLabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#9197a3",
        font: "fontSize: 12",
        right: "0",
        id: "stepsDetailLabel"
    });
<<<<<<< HEAD
    $.__views.__alloyId315.add($.__views.stepsDetailLabel);
=======
    $.__views.__alloyId312.add($.__views.stepsDetailLabel);
>>>>>>> origin/master
    $.__views.bmiView = Ti.UI.createView({
        id: "bmiView",
        gType: "1",
        height: Ti.UI.SIZE,
        layout: "vertical",
        left: "10",
        right: "10",
        top: "10",
        borderColor: "#dfe0e4",
        width: Ti.UI.FILL,
        backgroundColor: "#FFFFFF",
        visible: "false"
    });
    $.__views.graphScrollView.add($.__views.bmiView);
    $.__views.bmiWebView = Ti.UI.createWebView({
        touchEnabled: false,
        id: "bmiWebView",
        height: "230",
        width: Ti.UI.FILL,
        url: "/html/bmi.html",
        disableBounce: "true"
    });
    $.__views.bmiView.add($.__views.bmiWebView);
<<<<<<< HEAD
    $.__views.__alloyId317 = Ti.UI.createView({
=======
    $.__views.__alloyId314 = Ti.UI.createView({
>>>>>>> origin/master
        height: "1",
        left: "10",
        right: "10",
        bottom: "0",
        backgroundColor: "#dfe0e4",
        width: Ti.UI.FILL,
<<<<<<< HEAD
        id: "__alloyId317"
    });
    $.__views.bmiView.add($.__views.__alloyId317);
    $.__views.__alloyId318 = Ti.UI.createView({
=======
        id: "__alloyId314"
    });
    $.__views.bmiView.add($.__views.__alloyId314);
    $.__views.__alloyId315 = Ti.UI.createView({
>>>>>>> origin/master
        height: Ti.UI.SIZE,
        left: "10",
        right: "10",
        top: "10",
        bottom: "10",
<<<<<<< HEAD
        id: "__alloyId318"
    });
    $.__views.bmiView.add($.__views.__alloyId318);
    $.__views.__alloyId319 = Ti.UI.createLabel({
=======
        id: "__alloyId315"
    });
    $.__views.bmiView.add($.__views.__alloyId315);
    $.__views.__alloyId316 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        text: "Latest",
        color: "#9197a3",
        font: "fontSize: 12",
        left: "0",
<<<<<<< HEAD
        id: "__alloyId319"
    });
    $.__views.__alloyId318.add($.__views.__alloyId319);
=======
        id: "__alloyId316"
    });
    $.__views.__alloyId315.add($.__views.__alloyId316);
>>>>>>> origin/master
    $.__views.bmiDetailLabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#9197a3",
        font: "fontSize: 12",
        right: "0",
        id: "bmiDetailLabel"
    });
<<<<<<< HEAD
    $.__views.__alloyId318.add($.__views.bmiDetailLabel);
=======
    $.__views.__alloyId315.add($.__views.bmiDetailLabel);
>>>>>>> origin/master
    $.__views.bloodPressureView = Ti.UI.createView({
        id: "bloodPressureView",
        gType: "2",
        height: Ti.UI.SIZE,
        layout: "vertical",
        left: "10",
        right: "10",
        top: "10",
        borderColor: "#dfe0e4",
        width: Ti.UI.FILL,
        backgroundColor: "#FFFFFF",
        visible: "false"
    });
    $.__views.graphScrollView.add($.__views.bloodPressureView);
    $.__views.bloodPressureWebView = Ti.UI.createWebView({
        touchEnabled: false,
        id: "bloodPressureWebView",
        height: "230",
        width: Ti.UI.FILL,
        url: "/html/bloodPressure.html",
        disableBounce: "true"
    });
    $.__views.bloodPressureView.add($.__views.bloodPressureWebView);
<<<<<<< HEAD
    $.__views.__alloyId320 = Ti.UI.createView({
=======
    $.__views.__alloyId317 = Ti.UI.createView({
>>>>>>> origin/master
        height: "1",
        left: "10",
        right: "10",
        bottom: "0",
        backgroundColor: "#dfe0e4",
        width: Ti.UI.FILL,
<<<<<<< HEAD
        id: "__alloyId320"
    });
    $.__views.bloodPressureView.add($.__views.__alloyId320);
    $.__views.__alloyId321 = Ti.UI.createView({
=======
        id: "__alloyId317"
    });
    $.__views.bloodPressureView.add($.__views.__alloyId317);
    $.__views.__alloyId318 = Ti.UI.createView({
>>>>>>> origin/master
        height: Ti.UI.SIZE,
        left: "10",
        right: "10",
        top: "10",
        bottom: "10",
<<<<<<< HEAD
        id: "__alloyId321"
    });
    $.__views.bloodPressureView.add($.__views.__alloyId321);
    $.__views.__alloyId322 = Ti.UI.createLabel({
=======
        id: "__alloyId318"
    });
    $.__views.bloodPressureView.add($.__views.__alloyId318);
    $.__views.__alloyId319 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        text: "Latest",
        color: "#9197a3",
        font: "fontSize: 12",
        left: "0",
<<<<<<< HEAD
        id: "__alloyId322"
    });
    $.__views.__alloyId321.add($.__views.__alloyId322);
=======
        id: "__alloyId319"
    });
    $.__views.__alloyId318.add($.__views.__alloyId319);
>>>>>>> origin/master
    $.__views.bloodPressureDetailLabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#9197a3",
        font: "fontSize: 12",
        right: "0",
        id: "bloodPressureDetailLabel"
    });
<<<<<<< HEAD
    $.__views.__alloyId321.add($.__views.bloodPressureDetailLabel);
=======
    $.__views.__alloyId318.add($.__views.bloodPressureDetailLabel);
>>>>>>> origin/master
    $.__views.heartRateView = Ti.UI.createView({
        id: "heartRateView",
        gType: "3",
        height: Ti.UI.SIZE,
        layout: "vertical",
        left: "10",
        right: "10",
        top: "10",
        borderColor: "#dfe0e4",
        width: Ti.UI.FILL,
        backgroundColor: "#FFFFFF",
        visible: "false"
    });
    $.__views.graphScrollView.add($.__views.heartRateView);
    $.__views.heartRateWebView = Ti.UI.createWebView({
        touchEnabled: false,
        id: "heartRateWebView",
        height: "230",
        width: Ti.UI.FILL,
        url: "/html/heartRate.html",
        disableBounce: "true"
    });
    $.__views.heartRateView.add($.__views.heartRateWebView);
<<<<<<< HEAD
    $.__views.__alloyId323 = Ti.UI.createView({
=======
    $.__views.__alloyId320 = Ti.UI.createView({
>>>>>>> origin/master
        height: "1",
        left: "10",
        right: "10",
        bottom: "0",
        backgroundColor: "#dfe0e4",
        width: Ti.UI.FILL,
<<<<<<< HEAD
        id: "__alloyId323"
    });
    $.__views.heartRateView.add($.__views.__alloyId323);
    $.__views.__alloyId324 = Ti.UI.createView({
=======
        id: "__alloyId320"
    });
    $.__views.heartRateView.add($.__views.__alloyId320);
    $.__views.__alloyId321 = Ti.UI.createView({
>>>>>>> origin/master
        height: Ti.UI.SIZE,
        left: "10",
        right: "10",
        top: "10",
        bottom: "10",
<<<<<<< HEAD
        id: "__alloyId324"
    });
    $.__views.heartRateView.add($.__views.__alloyId324);
    $.__views.__alloyId325 = Ti.UI.createLabel({
=======
        id: "__alloyId321"
    });
    $.__views.heartRateView.add($.__views.__alloyId321);
    $.__views.__alloyId322 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        text: "Latest",
        color: "#9197a3",
        font: "fontSize: 12",
        left: "0",
<<<<<<< HEAD
        id: "__alloyId325"
    });
    $.__views.__alloyId324.add($.__views.__alloyId325);
=======
        id: "__alloyId322"
    });
    $.__views.__alloyId321.add($.__views.__alloyId322);
>>>>>>> origin/master
    $.__views.heartRateDetailLabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#9197a3",
        font: "fontSize: 12",
        right: "0",
        id: "heartRateDetailLabel"
    });
<<<<<<< HEAD
    $.__views.__alloyId324.add($.__views.heartRateDetailLabel);
=======
    $.__views.__alloyId321.add($.__views.heartRateDetailLabel);
>>>>>>> origin/master
    $.__views.bodyTemperatureView = Ti.UI.createView({
        id: "bodyTemperatureView",
        gType: "4",
        height: Ti.UI.SIZE,
        layout: "vertical",
        left: "10",
        right: "10",
        top: "10",
        borderColor: "#dfe0e4",
        width: Ti.UI.FILL,
        backgroundColor: "#FFFFFF",
        visible: "false"
    });
    $.__views.graphScrollView.add($.__views.bodyTemperatureView);
    $.__views.bodyTemperatureWebView = Ti.UI.createWebView({
        touchEnabled: false,
        id: "bodyTemperatureWebView",
        height: "230",
        width: Ti.UI.FILL,
        url: "/html/bodyTemperature.html",
        disableBounce: "true"
    });
    $.__views.bodyTemperatureView.add($.__views.bodyTemperatureWebView);
<<<<<<< HEAD
    $.__views.__alloyId326 = Ti.UI.createView({
=======
    $.__views.__alloyId323 = Ti.UI.createView({
>>>>>>> origin/master
        height: "1",
        left: "10",
        right: "10",
        bottom: "0",
        backgroundColor: "#dfe0e4",
        width: Ti.UI.FILL,
<<<<<<< HEAD
        id: "__alloyId326"
    });
    $.__views.bodyTemperatureView.add($.__views.__alloyId326);
    $.__views.__alloyId327 = Ti.UI.createView({
=======
        id: "__alloyId323"
    });
    $.__views.bodyTemperatureView.add($.__views.__alloyId323);
    $.__views.__alloyId324 = Ti.UI.createView({
>>>>>>> origin/master
        height: Ti.UI.SIZE,
        left: "10",
        right: "10",
        top: "10",
        bottom: "10",
<<<<<<< HEAD
        id: "__alloyId327"
    });
    $.__views.bodyTemperatureView.add($.__views.__alloyId327);
    $.__views.__alloyId328 = Ti.UI.createLabel({
=======
        id: "__alloyId324"
    });
    $.__views.bodyTemperatureView.add($.__views.__alloyId324);
    $.__views.__alloyId325 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        text: "Latest",
        color: "#9197a3",
        font: "fontSize: 12",
        left: "0",
<<<<<<< HEAD
        id: "__alloyId328"
    });
    $.__views.__alloyId327.add($.__views.__alloyId328);
=======
        id: "__alloyId325"
    });
    $.__views.__alloyId324.add($.__views.__alloyId325);
>>>>>>> origin/master
    $.__views.bodyTempDetailLabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#9197a3",
        font: "fontSize: 12",
        right: "0",
        id: "bodyTempDetailLabel"
    });
<<<<<<< HEAD
    $.__views.__alloyId327.add($.__views.bodyTempDetailLabel);
=======
    $.__views.__alloyId324.add($.__views.bodyTempDetailLabel);
>>>>>>> origin/master
    $.__views.cholestrolView = Ti.UI.createView({
        id: "cholestrolView",
        gType: "7",
        height: Ti.UI.SIZE,
        layout: "vertical",
        left: "10",
        right: "10",
        top: "10",
        borderColor: "#dfe0e4",
        width: Ti.UI.FILL,
        backgroundColor: "#FFFFFF",
        visible: "false"
    });
    $.__views.graphScrollView.add($.__views.cholestrolView);
    $.__views.cholestrolWebView = Ti.UI.createWebView({
        touchEnabled: false,
        id: "cholestrolWebView",
        height: "230",
        width: Ti.UI.FILL,
        url: "/html/cholestrol.html",
        disableBounce: "true"
    });
    $.__views.cholestrolView.add($.__views.cholestrolWebView);
<<<<<<< HEAD
    $.__views.__alloyId329 = Ti.UI.createView({
=======
    $.__views.__alloyId326 = Ti.UI.createView({
>>>>>>> origin/master
        height: "1",
        left: "10",
        right: "10",
        bottom: "0",
        backgroundColor: "#dfe0e4",
        width: Ti.UI.FILL,
<<<<<<< HEAD
        id: "__alloyId329"
    });
    $.__views.cholestrolView.add($.__views.__alloyId329);
    $.__views.__alloyId330 = Ti.UI.createView({
=======
        id: "__alloyId326"
    });
    $.__views.cholestrolView.add($.__views.__alloyId326);
    $.__views.__alloyId327 = Ti.UI.createView({
>>>>>>> origin/master
        height: Ti.UI.SIZE,
        left: "10",
        right: "10",
        top: "10",
        bottom: "10",
<<<<<<< HEAD
        id: "__alloyId330"
    });
    $.__views.cholestrolView.add($.__views.__alloyId330);
    $.__views.__alloyId331 = Ti.UI.createLabel({
=======
        id: "__alloyId327"
    });
    $.__views.cholestrolView.add($.__views.__alloyId327);
    $.__views.__alloyId328 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        text: "Latest",
        color: "#9197a3",
        font: "fontSize: 12",
        left: "0",
<<<<<<< HEAD
        id: "__alloyId331"
    });
    $.__views.__alloyId330.add($.__views.__alloyId331);
=======
        id: "__alloyId328"
    });
    $.__views.__alloyId327.add($.__views.__alloyId328);
>>>>>>> origin/master
    $.__views.cholestrolDetailLabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#9197a3",
        font: "fontSize: 12",
        right: "0",
        id: "cholestrolDetailLabel"
    });
<<<<<<< HEAD
    $.__views.__alloyId330.add($.__views.cholestrolDetailLabel);
=======
    $.__views.__alloyId327.add($.__views.cholestrolDetailLabel);
>>>>>>> origin/master
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    args.category || "";
    var nav = require("navigation");
    var hd = require("healthData");
    common.construct($);
    hd.construct($);
    "android" != Ti.Platform.osname && hd.stepsMotion();
    Ti.App.addEventListener("filterList", filterList);
    Ti.App.addEventListener("loadLatest", loadLatest);
    Ti.App.addEventListener("graphLoaded", graphLoaded);
    Ti.App.addEventListener("populateDataById", populateDataById);
    filterList({
        category: "all"
    });
    if ("android" != Ti.Platform.osname) {
        $.stepsView.addEventListener("click", function() {
            nav.navigateWithArgs("myHealth/healthDataSummary", {
                gType: 10
            });
        });
        $.stepsWebView.addEventListener("load", function(e) {
            var actualHeight = e.source.evalJS("document.height;");
            e.source.height = parseInt(actualHeight);
        });
    }
    $.bmiView.addEventListener("click", function() {
        nav.navigateWithArgs("myHealth/healthDataSummary", {
            gType: 1
        });
    });
    $.bloodPressureView.addEventListener("click", function() {
        nav.navigateWithArgs("myHealth/healthDataSummary", {
            gType: 2
        });
    });
    $.heartRateView.addEventListener("click", function() {
        nav.navigateWithArgs("myHealth/healthDataSummary", {
            gType: 3
        });
    });
    $.bodyTemperatureView.addEventListener("click", function() {
        nav.navigateWithArgs("myHealth/healthDataSummary", {
            gType: 4
        });
    });
    $.bmiWebView.addEventListener("load", function(e) {
        e.source.evalJS("document.height;");
    });
    $.bloodPressureWebView.addEventListener("load", function(e) {
        e.source.evalJS("document.height;");
    });
    $.heartRateWebView.addEventListener("load", function(e) {
        e.source.evalJS("document.height;");
    });
    $.bodyTemperatureWebView.addEventListener("load", function(e) {
        e.source.evalJS("document.height;");
    });
    $.cholestrolWebView.addEventListener("load", function(e) {
        e.source.evalJS("document.height;");
    });
    $.cholestrolView.addEventListener("click", function() {
        nav.navigateWithArgs("myHealth/healthDataSummary", {
            gType: 7
        });
    });
    $.moreHealth.addEventListener("click", function() {
        if ("android" == Ti.Platform.osname) {
            var dialog = Ti.UI.createOptionDialog({
                cancel: 3,
                options: [ "Me", "Body Measurement", "Vitals", "Cancel" ],
                title: "More"
            });
            dialog.show();
            dialog.addEventListener("click", function(e) {
                0 == e.index ? nav.navigationWindow("myHealth/profile") : 1 == e.index ? Ti.App.fireEvent("filterList", {
                    category: "measurement"
                }) : 2 == e.index && Ti.App.fireEvent("filterList", {
                    category: "vitals"
                });
            });
        } else {
            var page = Alloy.createController("myHealth/_menu").getView();
            page.open();
            page.animate({
                curve: Ti.UI.ANIMATION_CURVE_EASE_IN,
                opacity: 1,
                duration: 200
            });
        }
    });
    $.myhealth.addEventListener("close", function() {
        Ti.App.removeEventListener("filterList", filterList);
        Ti.App.removeEventListener("populateDataById", populateDataById);
        Ti.App.removeEventListener("loadLatest", loadLatest);
        Ti.App.removeEventListener("graphLoaded", graphLoaded);
    });
    "android" == Ti.Platform.osname && $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.myhealth);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;