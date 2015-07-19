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
    $.__views.__alloyId234 = Ti.UI.createView({
        id: "__alloyId234"
=======
    $.__views.__alloyId227 = Ti.UI.createView({
        id: "__alloyId227"
>>>>>>> origin/master
    });
    $.__views.moreHealth = Ti.UI.createImageView({
        right: "0",
        id: "moreHealth",
        width: "30",
        image: "/images/health_love.png"
    });
<<<<<<< HEAD
    $.__views.__alloyId234.add($.__views.moreHealth);
    $.__views.myhealth.rightNavButton = $.__views.__alloyId234;
    $.__views.__alloyId235 = Ti.UI.createView({
        id: "__alloyId235"
    });
    $.__views.myhealth.add($.__views.__alloyId235);
=======
    $.__views.__alloyId227.add($.__views.moreHealth);
    $.__views.myhealth.rightNavButton = $.__views.__alloyId227;
    $.__views.__alloyId228 = Ti.UI.createView({
        id: "__alloyId228"
    });
    $.__views.myhealth.add($.__views.__alloyId228);
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
    $.__views.__alloyId235.add($.__views.loadingBar);
=======
    $.__views.__alloyId228.add($.__views.loadingBar);
>>>>>>> origin/master
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        top: 30,
        left: 30,
        width: 60,
        id: "activityIndicator"
    });
    $.__views.loadingBar.add($.__views.activityIndicator);
<<<<<<< HEAD
    $.__views.__alloyId236 = Ti.UI.createLabel({
=======
    $.__views.__alloyId229 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        top: "5",
        text: "Loading",
        color: "#ffffff",
<<<<<<< HEAD
        id: "__alloyId236"
    });
    $.__views.loadingBar.add($.__views.__alloyId236);
=======
        id: "__alloyId229"
    });
    $.__views.loadingBar.add($.__views.__alloyId229);
>>>>>>> origin/master
    $.__views.main = Ti.UI.createView({
        id: "main",
        layout: "vertical",
        backgroundColor: "#ffffff"
    });
<<<<<<< HEAD
    $.__views.__alloyId235.add($.__views.main);
=======
    $.__views.__alloyId228.add($.__views.main);
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
        borderRadius: "5",
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
        height: "200",
        width: "100%",
        url: "/html/steps.html",
        disableBounce: "true"
    });
    $.__views.stepsView.add($.__views.stepsWebView);
<<<<<<< HEAD
    $.__views.__alloyId237 = Ti.UI.createView({
=======
    $.__views.__alloyId230 = Ti.UI.createView({
>>>>>>> origin/master
        height: "1",
        left: "10",
        right: "10",
        bottom: "0",
        backgroundColor: "#dfe0e4",
        width: Ti.UI.FILL,
<<<<<<< HEAD
        id: "__alloyId237"
    });
    $.__views.stepsView.add($.__views.__alloyId237);
    $.__views.__alloyId238 = Ti.UI.createView({
=======
        id: "__alloyId230"
    });
    $.__views.stepsView.add($.__views.__alloyId230);
    $.__views.__alloyId231 = Ti.UI.createView({
>>>>>>> origin/master
        height: Ti.UI.SIZE,
        left: "10",
        right: "10",
        top: "10",
        bottom: "10",
<<<<<<< HEAD
        id: "__alloyId238"
    });
    $.__views.stepsView.add($.__views.__alloyId238);
    $.__views.__alloyId239 = Ti.UI.createLabel({
=======
        id: "__alloyId231"
    });
    $.__views.stepsView.add($.__views.__alloyId231);
    $.__views.__alloyId232 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        text: "Latest",
        color: "#9197a3",
        font: "fontSize: 12",
        left: "0",
<<<<<<< HEAD
        id: "__alloyId239"
    });
    $.__views.__alloyId238.add($.__views.__alloyId239);
=======
        id: "__alloyId232"
    });
    $.__views.__alloyId231.add($.__views.__alloyId232);
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
    $.__views.__alloyId238.add($.__views.stepsDetailLabel);
=======
    $.__views.__alloyId231.add($.__views.stepsDetailLabel);
>>>>>>> origin/master
    $.__views.bmiView = Ti.UI.createView({
        id: "bmiView",
        gType: "1",
        height: Ti.UI.SIZE,
        layout: "vertical",
        borderRadius: "5",
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
        height: "200",
        width: "100%",
        url: "/html/bmi.html",
        disableBounce: "true"
    });
    $.__views.bmiView.add($.__views.bmiWebView);
<<<<<<< HEAD
    $.__views.__alloyId240 = Ti.UI.createView({
=======
    $.__views.__alloyId233 = Ti.UI.createView({
>>>>>>> origin/master
        height: "1",
        left: "10",
        right: "10",
        bottom: "0",
        backgroundColor: "#dfe0e4",
        width: Ti.UI.FILL,
<<<<<<< HEAD
        id: "__alloyId240"
    });
    $.__views.bmiView.add($.__views.__alloyId240);
    $.__views.__alloyId241 = Ti.UI.createView({
=======
        id: "__alloyId233"
    });
    $.__views.bmiView.add($.__views.__alloyId233);
    $.__views.__alloyId234 = Ti.UI.createView({
>>>>>>> origin/master
        height: Ti.UI.SIZE,
        left: "10",
        right: "10",
        top: "10",
        bottom: "10",
<<<<<<< HEAD
        id: "__alloyId241"
    });
    $.__views.bmiView.add($.__views.__alloyId241);
    $.__views.__alloyId242 = Ti.UI.createLabel({
=======
        id: "__alloyId234"
    });
    $.__views.bmiView.add($.__views.__alloyId234);
    $.__views.__alloyId235 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        text: "Latest",
        color: "#9197a3",
        font: "fontSize: 12",
        left: "0",
<<<<<<< HEAD
        id: "__alloyId242"
    });
    $.__views.__alloyId241.add($.__views.__alloyId242);
=======
        id: "__alloyId235"
    });
    $.__views.__alloyId234.add($.__views.__alloyId235);
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
    $.__views.__alloyId241.add($.__views.bmiDetailLabel);
=======
    $.__views.__alloyId234.add($.__views.bmiDetailLabel);
>>>>>>> origin/master
    $.__views.bloodPressureView = Ti.UI.createView({
        id: "bloodPressureView",
        gType: "2",
        height: Ti.UI.SIZE,
        layout: "vertical",
        borderRadius: "5",
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
        height: "200",
        width: "100%",
        url: "/html/bloodPressure.html",
        disableBounce: "true"
    });
    $.__views.bloodPressureView.add($.__views.bloodPressureWebView);
<<<<<<< HEAD
    $.__views.__alloyId243 = Ti.UI.createView({
=======
    $.__views.__alloyId236 = Ti.UI.createView({
>>>>>>> origin/master
        height: "1",
        left: "10",
        right: "10",
        bottom: "0",
        backgroundColor: "#dfe0e4",
        width: Ti.UI.FILL,
<<<<<<< HEAD
        id: "__alloyId243"
    });
    $.__views.bloodPressureView.add($.__views.__alloyId243);
    $.__views.__alloyId244 = Ti.UI.createView({
=======
        id: "__alloyId236"
    });
    $.__views.bloodPressureView.add($.__views.__alloyId236);
    $.__views.__alloyId237 = Ti.UI.createView({
>>>>>>> origin/master
        height: Ti.UI.SIZE,
        left: "10",
        right: "10",
        top: "10",
        bottom: "10",
<<<<<<< HEAD
        id: "__alloyId244"
    });
    $.__views.bloodPressureView.add($.__views.__alloyId244);
    $.__views.__alloyId245 = Ti.UI.createLabel({
=======
        id: "__alloyId237"
    });
    $.__views.bloodPressureView.add($.__views.__alloyId237);
    $.__views.__alloyId238 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        text: "Latest",
        color: "#9197a3",
        font: "fontSize: 12",
        left: "0",
<<<<<<< HEAD
        id: "__alloyId245"
    });
    $.__views.__alloyId244.add($.__views.__alloyId245);
=======
        id: "__alloyId238"
    });
    $.__views.__alloyId237.add($.__views.__alloyId238);
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
    $.__views.__alloyId244.add($.__views.bloodPressureDetailLabel);
=======
    $.__views.__alloyId237.add($.__views.bloodPressureDetailLabel);
>>>>>>> origin/master
    $.__views.heartRateView = Ti.UI.createView({
        id: "heartRateView",
        gType: "3",
        height: Ti.UI.SIZE,
        layout: "vertical",
        borderRadius: "5",
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
        height: "200",
        width: "100%",
        url: "/html/heartRate.html",
        disableBounce: "true"
    });
    $.__views.heartRateView.add($.__views.heartRateWebView);
<<<<<<< HEAD
    $.__views.__alloyId246 = Ti.UI.createView({
=======
    $.__views.__alloyId239 = Ti.UI.createView({
>>>>>>> origin/master
        height: "1",
        left: "10",
        right: "10",
        bottom: "0",
        backgroundColor: "#dfe0e4",
        width: Ti.UI.FILL,
<<<<<<< HEAD
        id: "__alloyId246"
    });
    $.__views.heartRateView.add($.__views.__alloyId246);
    $.__views.__alloyId247 = Ti.UI.createView({
=======
        id: "__alloyId239"
    });
    $.__views.heartRateView.add($.__views.__alloyId239);
    $.__views.__alloyId240 = Ti.UI.createView({
>>>>>>> origin/master
        height: Ti.UI.SIZE,
        left: "10",
        right: "10",
        top: "10",
        bottom: "10",
<<<<<<< HEAD
        id: "__alloyId247"
    });
    $.__views.heartRateView.add($.__views.__alloyId247);
    $.__views.__alloyId248 = Ti.UI.createLabel({
=======
        id: "__alloyId240"
    });
    $.__views.heartRateView.add($.__views.__alloyId240);
    $.__views.__alloyId241 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        text: "Latest",
        color: "#9197a3",
        font: "fontSize: 12",
        left: "0",
<<<<<<< HEAD
        id: "__alloyId248"
    });
    $.__views.__alloyId247.add($.__views.__alloyId248);
=======
        id: "__alloyId241"
    });
    $.__views.__alloyId240.add($.__views.__alloyId241);
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
    $.__views.__alloyId247.add($.__views.heartRateDetailLabel);
=======
    $.__views.__alloyId240.add($.__views.heartRateDetailLabel);
>>>>>>> origin/master
    $.__views.bodyTemperatureView = Ti.UI.createView({
        id: "bodyTemperatureView",
        gType: "4",
        height: Ti.UI.SIZE,
        layout: "vertical",
        borderRadius: "5",
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
        height: "200",
        width: "100%",
        url: "/html/bodyTemperature.html",
        disableBounce: "true"
    });
    $.__views.bodyTemperatureView.add($.__views.bodyTemperatureWebView);
<<<<<<< HEAD
    $.__views.__alloyId249 = Ti.UI.createView({
=======
    $.__views.__alloyId242 = Ti.UI.createView({
>>>>>>> origin/master
        height: "1",
        left: "10",
        right: "10",
        bottom: "0",
        backgroundColor: "#dfe0e4",
        width: Ti.UI.FILL,
<<<<<<< HEAD
        id: "__alloyId249"
    });
    $.__views.bodyTemperatureView.add($.__views.__alloyId249);
    $.__views.__alloyId250 = Ti.UI.createView({
=======
        id: "__alloyId242"
    });
    $.__views.bodyTemperatureView.add($.__views.__alloyId242);
    $.__views.__alloyId243 = Ti.UI.createView({
>>>>>>> origin/master
        height: Ti.UI.SIZE,
        left: "10",
        right: "10",
        top: "10",
        bottom: "10",
<<<<<<< HEAD
        id: "__alloyId250"
    });
    $.__views.bodyTemperatureView.add($.__views.__alloyId250);
    $.__views.__alloyId251 = Ti.UI.createLabel({
=======
        id: "__alloyId243"
    });
    $.__views.bodyTemperatureView.add($.__views.__alloyId243);
    $.__views.__alloyId244 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        text: "Latest",
        color: "#9197a3",
        font: "fontSize: 12",
        left: "0",
<<<<<<< HEAD
        id: "__alloyId251"
    });
    $.__views.__alloyId250.add($.__views.__alloyId251);
=======
        id: "__alloyId244"
    });
    $.__views.__alloyId243.add($.__views.__alloyId244);
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
    $.__views.__alloyId250.add($.__views.bodyTempDetailLabel);
=======
    $.__views.__alloyId243.add($.__views.bodyTempDetailLabel);
>>>>>>> origin/master
    $.__views.cholestrolView = Ti.UI.createView({
        id: "cholestrolView",
        gType: "7",
        height: Ti.UI.SIZE,
        layout: "vertical",
        borderRadius: "5",
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
        height: "200",
        width: "100%",
        url: "/html/cholestrol.html",
        disableBounce: "true"
    });
    $.__views.cholestrolView.add($.__views.cholestrolWebView);
<<<<<<< HEAD
    $.__views.__alloyId252 = Ti.UI.createView({
=======
    $.__views.__alloyId245 = Ti.UI.createView({
>>>>>>> origin/master
        height: "1",
        left: "10",
        right: "10",
        bottom: "0",
        backgroundColor: "#dfe0e4",
        width: Ti.UI.FILL,
<<<<<<< HEAD
        id: "__alloyId252"
    });
    $.__views.cholestrolView.add($.__views.__alloyId252);
    $.__views.__alloyId253 = Ti.UI.createView({
=======
        id: "__alloyId245"
    });
    $.__views.cholestrolView.add($.__views.__alloyId245);
    $.__views.__alloyId246 = Ti.UI.createView({
>>>>>>> origin/master
        height: Ti.UI.SIZE,
        left: "10",
        right: "10",
        top: "10",
        bottom: "10",
<<<<<<< HEAD
        id: "__alloyId253"
    });
    $.__views.cholestrolView.add($.__views.__alloyId253);
    $.__views.__alloyId254 = Ti.UI.createLabel({
=======
        id: "__alloyId246"
    });
    $.__views.cholestrolView.add($.__views.__alloyId246);
    $.__views.__alloyId247 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        text: "Latest",
        color: "#9197a3",
        font: "fontSize: 12",
        left: "0",
<<<<<<< HEAD
        id: "__alloyId254"
    });
    $.__views.__alloyId253.add($.__views.__alloyId254);
=======
        id: "__alloyId247"
    });
    $.__views.__alloyId246.add($.__views.__alloyId247);
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
    $.__views.__alloyId253.add($.__views.cholestrolDetailLabel);
=======
    $.__views.__alloyId246.add($.__views.cholestrolDetailLabel);
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
    Ti.App.addEventListener("populateDataById", graphLoaded);
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
        $.stepsView.addEventListener("load", function(e) {
            var actualHeight = e.source.evalJS("document.height;");
            e.source.height = parseInt(actualHeight);
        });
    }
    $.bmiView.addEventListener("click", function() {
        nav.navigateWithArgs("myHealth/healthDataSummary", {
            gType: 1
        });
    });
    $.bmiView.addEventListener("load", function(e) {
        var actualHeight = e.source.evalJS("document.height;");
        e.source.height = parseInt(actualHeight);
    });
    $.bloodPressureView.addEventListener("click", function() {
        nav.navigateWithArgs("myHealth/healthDataSummary", {
            gType: 2
        });
    });
    $.bloodPressureView.addEventListener("load", function(e) {
        var actualHeight = e.source.evalJS("document.height;");
        e.source.height = parseInt(actualHeight);
    });
    $.heartRateView.addEventListener("click", function() {
        nav.navigateWithArgs("myHealth/healthDataSummary", {
            gType: 3
        });
    });
    $.heartRateView.addEventListener("load", function(e) {
        var actualHeight = e.source.evalJS("document.height;");
        e.source.height = parseInt(actualHeight);
    });
    $.bodyTemperatureView.addEventListener("click", function() {
        nav.navigateWithArgs("myHealth/healthDataSummary", {
            gType: 4
        });
    });
    $.bodyTemperatureView.addEventListener("load", function(e) {
        var actualHeight = e.source.evalJS("document.height;");
        e.source.height = parseInt(actualHeight);
    });
    $.cholestrolView.addEventListener("click", function() {
        nav.navigateWithArgs("myHealth/healthDataSummary", {
            gType: 7
        });
    });
    $.cholestrolView.addEventListener("load", function(e) {
        var actualHeight = e.source.evalJS("document.height;");
        e.source.height = parseInt(actualHeight);
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
        Ti.App.removeEventListener("populateDataById", graphLoaded);
    });
    "android" == Ti.Platform.osname && $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.myhealth);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;