function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function callNav(e) {
        var nav = require("navigation");
        switch (e.index) {
          case 0:
            nav.navigationWindow("news");
            break;

          case 1:        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "healthInfo";
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
    $.__views.healthInfo = Ti.UI.createWindow({
        title: "Health Info",
        backButtonTitle: "",
        navTintColor: "#CE1D1C",
        id: "healthInfo"
    });
    $.__views.healthInfo && $.addTopLevelView($.__views.healthInfo);
    $.__views.main = Ti.UI.createView({
        id: "main"
    });
    $.__views.healthInfo.add($.__views.main);
    var __alloyId1 = [];
    $.__views.__alloyId2 = Ti.UI.createTableViewRow({
        title: "News",
        id: "__alloyId2"
    });
    __alloyId1.push($.__views.__alloyId2);
    $.__views.__alloyId3 = Ti.UI.createTableViewRow({
        title: "Videos",
        id: "__alloyId3"
    });
    __alloyId1.push($.__views.__alloyId3);
    $.__views.__alloyId4 = Ti.UI.createTableViewRow({
        title: "BMI Calculator",
        id: "__alloyId4"
    });
    __alloyId1.push($.__views.__alloyId4);
    $.__views.__alloyId5 = Ti.UI.createTableViewRow({
        title: "Calorie Calculator",
        id: "__alloyId5"
    });
    __alloyId1.push($.__views.__alloyId5);
    $.__views.__alloyId6 = Ti.UI.createTableViewRow({
        title: "Malaysia Food Calorie Guide",
        id: "__alloyId6"
    });
    __alloyId1.push($.__views.__alloyId6);
    $.__views.__alloyId7 = Ti.UI.createTableViewRow({
        title: "Meal Plan",
        id: "__alloyId7"
    });
    __alloyId1.push($.__views.__alloyId7);
    $.__views.infoList = Ti.UI.createTableView({
        data: __alloyId1,
        id: "infoList"
    });
    $.__views.main.add($.__views.infoList);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    $.infoList.addEventListener("click", callNav);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;