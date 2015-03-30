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
<<<<<<< HEAD
    $.__views.__alloyId186 = Ti.UI.createImageView({
        width: "100%",
        height: "100%",
        image: "/dummy/dummy-introduce.jpg",
        id: "__alloyId186"
    });
    $.__views.main.add($.__views.__alloyId186);
=======
    $.__views.__alloyId92 = Ti.UI.createImageView({
        width: "100%",
        height: "100%",
        image: "/dummy/dummy-introduce.jpg",
        id: "__alloyId92"
    });
    $.__views.main.add($.__views.__alloyId92);
>>>>>>> origin/master
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
    var win = Alloy.createController("home").getView();
    API.loadPanelList();
    API.loadCategoryList();
    win.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;