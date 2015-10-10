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
    this.__controllerPath = "index";
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
    $.__views.root = Ti.UI.createWindow({
        backgroundColor: "white",
        fullscreen: true,
        id: "root",
        title: ""
    });
    $.__views.root && $.addTopLevelView($.__views.root);
    $.__views.main = Ti.UI.createView({
        id: "main"
    });
    $.__views.root.add($.__views.main);
    $.__views.__alloyId100 = Ti.UI.createImageView({
        width: "100%",
        height: "100%",
        image: "/dummy/dummy-introduce.jpg",
        id: "__alloyId100"
    });
    $.__views.main.add($.__views.__alloyId100);
    $.__views.link_visitor = Ti.UI.createImageView({
        id: "link_visitor",
        width: "130",
        top: "210",
        left: "30",
        image: "/btn/btn-visitor.jpg"
    });
    $.__views.main.add($.__views.link_visitor);
    $.__views.link_member = Ti.UI.createImageView({
        id: "link_member",
        width: "130",
        top: "210",
        left: "170",
        image: "/btn/btn-member.jpg"
    });
    $.__views.main.add($.__views.link_member);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var u_id = Ti.App.Properties.getString("u_id") || "";
    API.loadCategoryList();
    API.loadNewsFeed();
    API.loadLeaflet();
    API.loadClinicList();
    var win = Alloy.createController("home").getView();
    win.open();
    "" == u_id && nav.navigateWithArgs("login", {});
    var AppVersionControl = require("AppVersionControl");
    AppVersionControl.checkAndUpdate();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;