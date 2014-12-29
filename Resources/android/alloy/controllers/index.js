function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.root = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "root",
        title: "",
        navBarHidden: "true"
    });
    $.__views.root && $.addTopLevelView($.__views.root);
    $.__views.main = Ti.UI.createView({
        id: "main"
    });
    $.__views.root.add($.__views.main);
    $.__views.__alloyId20 = Ti.UI.createImageView({
        width: "100%",
        height: "100%",
        image: "/dummy/dummy-introduce.jpg",
        id: "__alloyId20"
    });
    $.__views.main.add($.__views.__alloyId20);
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
    $.root.open({
        fullscreen: true
    });
    $.link_visitor.addEventListener("click", function() {
        var win = Alloy.createController("home").getView();
        win.open();
    });
    $.link_member.addEventListener("click", function() {
        var win = Alloy.createController("home").getView();
        win.open();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;