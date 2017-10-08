function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function navToEcard(e) {
        console.log("navToEcard");
        console.log(e.source);
        nav.navigateWithArgs("asp/eCard", {
            user: e.source.user
        });
    }
    function render_ecard_list() {
        $.inner_box.removeAllChildren();
        for (var i = 0; i < data.length; i++) {
            var row = Titanium.UI.createTableViewRow({
                touchEnabled: true,
                height: 50,
                user: data[i],
                backgroundSelectedColor: "#FFE1E1",
                color: "transparent"
            });
            var rowView = $.UI.create("View", {
                touchEnabled: false,
                classes: [ "wfill", "hfill" ]
            });
            var Label_name = $.UI.create("Label", {
                touchEnabled: false,
                classes: [ "themeColor", "h5", "bold", "padding", "hfill" ],
                text: data[i].name || "",
                font: {
                    fontSize: 14
                },
                textAlign: "left"
            });
            var forwardImg = $.UI.create("ImageView", {
                touchEnabled: false,
                classes: [ "wsize", "hsize" ],
                image: "/images/btn-forward.png",
                width: 15,
                zIndex: 10,
                right: 5
            });
            rowView.add(Label_name);
            rowView.add(forwardImg);
            row.add(rowView);
            $.inner_box.appendRow(row);
            row.addEventListener("click", navToEcard);
        }
    }
    function refresh() {
        loading.start();
        var dependent = Ti.App.Properties.getString("dependent");
        data = JSON.parse(dependent);
        render_ecard_list();
        loading.finish();
    }
    function init() {
        $.inner_box.add(loading.getView());
        refresh();
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "asp/eCard_list";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "#fff",
        orientationModes: [ Ti.UI.PORTRAIT ],
        fullscreen: false,
        windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN,
        id: "win",
        title: "ASP eCARD",
        backButtonTitle: "",
        navTintColor: "#CE1D1C"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.__alloyId514 = Ti.UI.createView({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "__alloyId514"
    });
    $.__views.win.add($.__views.__alloyId514);
    $.__views.__alloyId515 = Ti.UI.createView({
        top: 0,
        layout: "horizontal",
        height: 50,
        width: Ti.UI.FILL,
        backgroundColor: "#DEDEDE",
        id: "__alloyId515"
    });
    $.__views.__alloyId514.add($.__views.__alloyId515);
    $.__views.__alloyId516 = Ti.UI.createView({
        left: 0,
        width: "20%",
        id: "__alloyId516"
    });
    $.__views.__alloyId515.add($.__views.__alloyId516);
    $.__views.btnBack = Ti.UI.createImageView({
        left: 10,
        id: "btnBack",
        width: 25,
        height: 25,
        image: "/images/btn-back.png"
    });
    $.__views.__alloyId516.add($.__views.btnBack);
    $.__views.__alloyId517 = Ti.UI.createView({
        width: "60%",
        id: "__alloyId517"
    });
    $.__views.__alloyId515.add($.__views.__alloyId517);
    $.__views.pageTitle = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#606060",
        font: {
            fontSize: "16dp"
        },
        text: "eCard List",
        id: "pageTitle",
        textAlign: "center"
    });
    $.__views.__alloyId517.add($.__views.pageTitle);
    $.__views.__alloyId518 = Ti.UI.createImageView({
        width: Ti.UI.SIZE,
        top: 10,
        left: 10,
        right: 10,
        image: "/images/eCard-front.png",
        id: "__alloyId518"
    });
    $.__views.__alloyId514.add($.__views.__alloyId518);
    $.__views.inner_box = Ti.UI.createTableView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "inner_box",
        top: 0,
        contentWidth: Ti.UI.FILL,
        contentHeight: Ti.UI.SIZE,
        separatorColor: "#375540"
    });
    $.__views.__alloyId514.add($.__views.inner_box);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var loading = Alloy.createController("loading");
    var data = [];
    init();
    Ti.App.addEventListener("eCard_list:refresh", refresh);
    $.win.addEventListener("close", function() {
        Ti.App.removeEventListener("eCard_list:refresh", refresh);
        $.destroy();
    });
    $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.win);
    });
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;