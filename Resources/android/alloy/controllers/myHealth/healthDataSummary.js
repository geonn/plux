function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function loadBarData(e) {
        loadGraph("0" == e.index ? "month" : "year");
    }
    function loadGraph(dataPeriod) {
        hd.loadGraphByType(gType, dataPeriod);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "myHealth/healthDataSummary";
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
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var gType = args.gType || 1;
    var hd = require("healthData");
    common.construct($);
    common.showLoading();
    "1" == gType && $.graphWebView.setUrl("/html/bmi.html");
    "2" == gType && $.graphWebView.setUrl("/html/bloodPressure.html");
    "3" == gType && $.graphWebView.setUrl("/html/heartRate.html");
    "4" == gType && $.graphWebView.setUrl("/html/bodyTemperature.html");
    "5" == gType && $.graphWebView.setUrl("/html/height.html");
    "6" == gType && $.graphWebView.setUrl("/html/weight.html");
    "10" == gType && $.graphWebView.setUrl("/html/steps.html");
    $.buttonbarData.addEventListener("click", loadBarData);
    setTimeout(function() {
        loadGraph("month");
        common.hideLoading();
    }, 900);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;