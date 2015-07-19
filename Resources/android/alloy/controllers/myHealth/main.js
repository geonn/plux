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
    $.__views.__alloyId277 = Ti.UI.createView({
        id: "__alloyId277"
=======
    $.__views.__alloyId287 = Ti.UI.createView({
        id: "__alloyId287"
>>>>>>> origin/master
    });
    $.__views.moreHealth = Ti.UI.createImageView({
        right: "0",
        id: "moreHealth",
        width: "30",
        image: "/images/health_love.png"
    });
<<<<<<< HEAD
    $.__views.__alloyId277.add($.__views.moreHealth);
    $.__views.myhealth.rightNavButton = $.__views.__alloyId277;
    $.__views.__alloyId278 = Ti.UI.createView({
        id: "__alloyId278"
    });
    $.__views.myhealth.add($.__views.__alloyId278);
=======
    $.__views.__alloyId287.add($.__views.moreHealth);
    $.__views.myhealth.rightNavButton = $.__views.__alloyId287;
    $.__views.__alloyId288 = Ti.UI.createView({
        id: "__alloyId288"
    });
    $.__views.myhealth.add($.__views.__alloyId288);
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
    $.__views.__alloyId278.add($.__views.loadingBar);
=======
    $.__views.__alloyId288.add($.__views.loadingBar);
>>>>>>> origin/master
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        top: 30,
        left: 30,
        width: 60,
        id: "activityIndicator"
    });
    $.__views.loadingBar.add($.__views.activityIndicator);
<<<<<<< HEAD
    $.__views.__alloyId279 = Ti.UI.createLabel({
=======
    $.__views.__alloyId289 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        top: "5",
        text: "Loading",
        color: "#ffffff",
<<<<<<< HEAD
        id: "__alloyId279"
    });
    $.__views.loadingBar.add($.__views.__alloyId279);
=======
        id: "__alloyId289"
    });
    $.__views.loadingBar.add($.__views.__alloyId289);
>>>>>>> origin/master
    $.__views.main = Ti.UI.createView({
        id: "main",
        layout: "vertical",
        backgroundColor: "#ffffff"
    });
<<<<<<< HEAD
    $.__views.__alloyId278.add($.__views.main);
    $.__views.__alloyId280 = Ti.UI.createView({
=======
    $.__views.__alloyId288.add($.__views.main);
    $.__views.__alloyId290 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        height: "50",
        width: "100%",
        backgroundColor: "#DEDEDE",
<<<<<<< HEAD
        id: "__alloyId280"
    });
    $.__views.main.add($.__views.__alloyId280);
    $.__views.__alloyId281 = Ti.UI.createView({
        left: "0",
        width: "10%",
        id: "__alloyId281"
    });
    $.__views.__alloyId280.add($.__views.__alloyId281);
=======
        id: "__alloyId290"
    });
    $.__views.main.add($.__views.__alloyId290);
    $.__views.__alloyId291 = Ti.UI.createView({
        left: "0",
        width: "10%",
        id: "__alloyId291"
    });
    $.__views.__alloyId290.add($.__views.__alloyId291);
>>>>>>> origin/master
    $.__views.btnBack = Ti.UI.createImageView({
        left: "10",
        id: "btnBack",
        width: "25",
        height: "25",
        image: "/images/btn-back.png"
    });
<<<<<<< HEAD
    $.__views.__alloyId281.add($.__views.btnBack);
=======
    $.__views.__alloyId291.add($.__views.btnBack);
>>>>>>> origin/master
    $.__views.pageTitle = Ti.UI.createView({
        id: "pageTitle",
        width: "80%"
    });
<<<<<<< HEAD
    $.__views.__alloyId280.add($.__views.pageTitle);
    $.__views.__alloyId282 = Ti.UI.createLabel({
=======
    $.__views.__alloyId290.add($.__views.pageTitle);
    $.__views.__alloyId292 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        font: {
            fontSize: "16dp"
        },
        text: "Health Info",
        textAlign: "center",
<<<<<<< HEAD
        id: "__alloyId282"
    });
    $.__views.pageTitle.add($.__views.__alloyId282);
    $.__views.__alloyId283 = Ti.UI.createView({
        width: "10%",
        id: "__alloyId283"
    });
    $.__views.__alloyId280.add($.__views.__alloyId283);
=======
        id: "__alloyId292"
    });
    $.__views.pageTitle.add($.__views.__alloyId292);
    $.__views.__alloyId293 = Ti.UI.createView({
        width: "10%",
        id: "__alloyId293"
    });
    $.__views.__alloyId290.add($.__views.__alloyId293);
>>>>>>> origin/master
    $.__views.moreHealth = Ti.UI.createImageView({
        id: "moreHealth",
        width: "30",
        image: "/images/health_love.png"
    });
<<<<<<< HEAD
    $.__views.__alloyId283.add($.__views.moreHealth);
=======
    $.__views.__alloyId293.add($.__views.moreHealth);
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
    $.__views.__alloyId284 = Ti.UI.createView({
=======
    $.__views.__alloyId294 = Ti.UI.createView({
>>>>>>> origin/master
        height: "1",
        left: "10",
        right: "10",
        bottom: "0",
        backgroundColor: "#dfe0e4",
        width: Ti.UI.FILL,
<<<<<<< HEAD
        id: "__alloyId284"
    });
    $.__views.bmiView.add($.__views.__alloyId284);
    $.__views.__alloyId285 = Ti.UI.createView({
=======
        id: "__alloyId294"
    });
    $.__views.bmiView.add($.__views.__alloyId294);
    $.__views.__alloyId295 = Ti.UI.createView({
>>>>>>> origin/master
        height: Ti.UI.SIZE,
        left: "10",
        right: "10",
        top: "10",
        bottom: "10",
<<<<<<< HEAD
        id: "__alloyId285"
    });
    $.__views.bmiView.add($.__views.__alloyId285);
    $.__views.__alloyId286 = Ti.UI.createLabel({
=======
        id: "__alloyId295"
    });
    $.__views.bmiView.add($.__views.__alloyId295);
    $.__views.__alloyId296 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        text: "Latest",
        color: "#9197a3",
        font: "fontSize: 12",
        left: "0",
<<<<<<< HEAD
        id: "__alloyId286"
    });
    $.__views.__alloyId285.add($.__views.__alloyId286);
=======
        id: "__alloyId296"
    });
    $.__views.__alloyId295.add($.__views.__alloyId296);
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
    $.__views.__alloyId285.add($.__views.bmiDetailLabel);
=======
    $.__views.__alloyId295.add($.__views.bmiDetailLabel);
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
    $.__views.__alloyId287 = Ti.UI.createView({
=======
    $.__views.__alloyId297 = Ti.UI.createView({
>>>>>>> origin/master
        height: "1",
        left: "10",
        right: "10",
        bottom: "0",
        backgroundColor: "#dfe0e4",
        width: Ti.UI.FILL,
<<<<<<< HEAD
        id: "__alloyId287"
    });
    $.__views.bloodPressureView.add($.__views.__alloyId287);
    $.__views.__alloyId288 = Ti.UI.createView({
=======
        id: "__alloyId297"
    });
    $.__views.bloodPressureView.add($.__views.__alloyId297);
    $.__views.__alloyId298 = Ti.UI.createView({
>>>>>>> origin/master
        height: Ti.UI.SIZE,
        left: "10",
        right: "10",
        top: "10",
        bottom: "10",
<<<<<<< HEAD
        id: "__alloyId288"
    });
    $.__views.bloodPressureView.add($.__views.__alloyId288);
    $.__views.__alloyId289 = Ti.UI.createLabel({
=======
        id: "__alloyId298"
    });
    $.__views.bloodPressureView.add($.__views.__alloyId298);
    $.__views.__alloyId299 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        text: "Latest",
        color: "#9197a3",
        font: "fontSize: 12",
        left: "0",
<<<<<<< HEAD
        id: "__alloyId289"
    });
    $.__views.__alloyId288.add($.__views.__alloyId289);
=======
        id: "__alloyId299"
    });
    $.__views.__alloyId298.add($.__views.__alloyId299);
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
    $.__views.__alloyId288.add($.__views.bloodPressureDetailLabel);
=======
    $.__views.__alloyId298.add($.__views.bloodPressureDetailLabel);
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
    $.__views.__alloyId290 = Ti.UI.createView({
=======
    $.__views.__alloyId300 = Ti.UI.createView({
>>>>>>> origin/master
        height: "1",
        left: "10",
        right: "10",
        bottom: "0",
        backgroundColor: "#dfe0e4",
        width: Ti.UI.FILL,
<<<<<<< HEAD
        id: "__alloyId290"
    });
    $.__views.heartRateView.add($.__views.__alloyId290);
    $.__views.__alloyId291 = Ti.UI.createView({
=======
        id: "__alloyId300"
    });
    $.__views.heartRateView.add($.__views.__alloyId300);
    $.__views.__alloyId301 = Ti.UI.createView({
>>>>>>> origin/master
        height: Ti.UI.SIZE,
        left: "10",
        right: "10",
        top: "10",
        bottom: "10",
<<<<<<< HEAD
        id: "__alloyId291"
    });
    $.__views.heartRateView.add($.__views.__alloyId291);
    $.__views.__alloyId292 = Ti.UI.createLabel({
=======
        id: "__alloyId301"
    });
    $.__views.heartRateView.add($.__views.__alloyId301);
    $.__views.__alloyId302 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        text: "Latest",
        color: "#9197a3",
        font: "fontSize: 12",
        left: "0",
<<<<<<< HEAD
        id: "__alloyId292"
    });
    $.__views.__alloyId291.add($.__views.__alloyId292);
=======
        id: "__alloyId302"
    });
    $.__views.__alloyId301.add($.__views.__alloyId302);
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
    $.__views.__alloyId291.add($.__views.heartRateDetailLabel);
=======
    $.__views.__alloyId301.add($.__views.heartRateDetailLabel);
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
    $.__views.__alloyId293 = Ti.UI.createView({
=======
    $.__views.__alloyId303 = Ti.UI.createView({
>>>>>>> origin/master
        height: "1",
        left: "10",
        right: "10",
        bottom: "0",
        backgroundColor: "#dfe0e4",
        width: Ti.UI.FILL,
<<<<<<< HEAD
        id: "__alloyId293"
    });
    $.__views.bodyTemperatureView.add($.__views.__alloyId293);
    $.__views.__alloyId294 = Ti.UI.createView({
=======
        id: "__alloyId303"
    });
    $.__views.bodyTemperatureView.add($.__views.__alloyId303);
    $.__views.__alloyId304 = Ti.UI.createView({
>>>>>>> origin/master
        height: Ti.UI.SIZE,
        left: "10",
        right: "10",
        top: "10",
        bottom: "10",
<<<<<<< HEAD
        id: "__alloyId294"
    });
    $.__views.bodyTemperatureView.add($.__views.__alloyId294);
    $.__views.__alloyId295 = Ti.UI.createLabel({
=======
        id: "__alloyId304"
    });
    $.__views.bodyTemperatureView.add($.__views.__alloyId304);
    $.__views.__alloyId305 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        text: "Latest",
        color: "#9197a3",
        font: "fontSize: 12",
        left: "0",
<<<<<<< HEAD
        id: "__alloyId295"
    });
    $.__views.__alloyId294.add($.__views.__alloyId295);
=======
        id: "__alloyId305"
    });
    $.__views.__alloyId304.add($.__views.__alloyId305);
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
    $.__views.__alloyId294.add($.__views.bodyTempDetailLabel);
=======
    $.__views.__alloyId304.add($.__views.bodyTempDetailLabel);
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
    $.__views.__alloyId296 = Ti.UI.createView({
=======
    $.__views.__alloyId306 = Ti.UI.createView({
>>>>>>> origin/master
        height: "1",
        left: "10",
        right: "10",
        bottom: "0",
        backgroundColor: "#dfe0e4",
        width: Ti.UI.FILL,
<<<<<<< HEAD
        id: "__alloyId296"
    });
    $.__views.cholestrolView.add($.__views.__alloyId296);
    $.__views.__alloyId297 = Ti.UI.createView({
=======
        id: "__alloyId306"
    });
    $.__views.cholestrolView.add($.__views.__alloyId306);
    $.__views.__alloyId307 = Ti.UI.createView({
>>>>>>> origin/master
        height: Ti.UI.SIZE,
        left: "10",
        right: "10",
        top: "10",
        bottom: "10",
<<<<<<< HEAD
        id: "__alloyId297"
    });
    $.__views.cholestrolView.add($.__views.__alloyId297);
    $.__views.__alloyId298 = Ti.UI.createLabel({
=======
        id: "__alloyId307"
    });
    $.__views.cholestrolView.add($.__views.__alloyId307);
    $.__views.__alloyId308 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        text: "Latest",
        color: "#9197a3",
        font: "fontSize: 12",
        left: "0",
<<<<<<< HEAD
        id: "__alloyId298"
    });
    $.__views.__alloyId297.add($.__views.__alloyId298);
=======
        id: "__alloyId308"
    });
    $.__views.__alloyId307.add($.__views.__alloyId308);
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
    $.__views.__alloyId297.add($.__views.cholestrolDetailLabel);
=======
    $.__views.__alloyId307.add($.__views.cholestrolDetailLabel);
>>>>>>> origin/master
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    args.category || "";
    var nav = require("navigation");
    var hd = require("healthData");
    common.construct($);
    hd.construct($);
    Ti.App.addEventListener("filterList", filterList);
    Ti.App.addEventListener("loadLatest", loadLatest);
    Ti.App.addEventListener("populateDataById", graphLoaded);
    Ti.App.addEventListener("populateDataById", populateDataById);
    filterList({
        category: "all"
    });
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
    });
    $.myhealth.addEventListener("close", function() {
        Ti.App.removeEventListener("filterList", filterList);
        Ti.App.removeEventListener("populateDataById", populateDataById);
        Ti.App.removeEventListener("loadLatest", loadLatest);
        Ti.App.removeEventListener("populateDataById", graphLoaded);
    });
    $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.myhealth);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;