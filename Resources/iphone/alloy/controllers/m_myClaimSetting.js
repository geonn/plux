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
    this.__controllerPath = "m_myClaimSetting";
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
    $.__views.m_myClaimSetting = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        title: "More",
        backButtonTitle: "",
        navTintColor: "#CE1D1C",
        id: "m_myClaimSetting"
    });
    $.__views.m_myClaimSetting && $.addTopLevelView($.__views.m_myClaimSetting);
<<<<<<< HEAD
    var __alloyId296 = [];
    $.__views.__alloyId297 = Ti.UI.createTableViewRow({
        hasChild: "true",
        title: "Claim History",
        id: "__alloyId297"
    });
    __alloyId296.push($.__views.__alloyId297);
    $.__views.menu = Ti.UI.createTableView({
        data: __alloyId296,
=======
    var __alloyId294 = [];
    $.__views.__alloyId295 = Ti.UI.createTableViewRow({
        hasChild: "true",
        title: "Claim History",
        id: "__alloyId295"
    });
    __alloyId294.push($.__views.__alloyId295);
    $.__views.menu = Ti.UI.createTableView({
        data: __alloyId294,
>>>>>>> origin/master
        id: "menu"
    });
    $.__views.m_myClaimSetting.add($.__views.menu);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    $.menu.addEventListener("click", function(e) {
        console.log(e.rowData.title);
        var nav = require("navigation");
        nav.navigationWindow("m_ClaimHistory");
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;