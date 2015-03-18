function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "m_myHealth";
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
    arguments[0] || {};
    var nav = require("navigation");
    var hd = require("healthData");
    setTimeout(function() {
        hd.populateData();
    }, 2e3);
    $.bmiView.addEventListener("click", function() {
        nav.navigationWindow("healthDataBmi");
    });
    $.bloodPressureView.addEventListener("click", function() {
        nav.navigationWindow("healthDataBloodPressure");
    });
    $.heartRateView.addEventListener("click", function() {
        nav.navigationWindow("healthDataHeartRate");
    });
    $.bodyTemperatureView.addEventListener("click", function() {
        nav.navigationWindow("healthDataBodyTemperature");
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;