function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function SendMessage() {
        if ("" == $.message.value) return;
        var u_id = Ti.App.Properties.getString("u_id") || 0;
        API.callByPost({
            url: "sendHelplineMessage",
            params: {
                u_id: u_id,
                message: $.message.value,
                is_endUser: 1
            }
        }, function(responseText) {
            Alloy.createCollection("helpline");
            var res = JSON.parse(responseText);
            res.data || null;
            $.message.value = "";
            $.message.blur();
            $.message.value = "";
            $.message.blur();
            refresh();
            setTimeout(scrollToBottom, 500);
        });
    }
    function render_conversation() {
        $.inner_box.removeAllChildren();
        console.log("render_conversation");
        console.log(data);
        for (var i = 0; i < data.length; i++) {
            var view_container = $.UI.create("View", {
                classes: [ "hsize", "wfill" ]
            });
            if (data[i].sender_id) {
                var view_text_container = $.UI.create("View", {
                    classes: [ "hsize", "vert", "box" ],
                    top: 10,
                    width: "75%"
                });
                var label_name = $.UI.create("label", {
                    classes: [ "h5", "wfill", "hsize", "bold", "padding" ],
                    text: data[i].sender_name
                });
                var label_message = $.UI.create("Label", {
                    classes: [ "h5", "wfill", "hsize", "padding" ],
                    top: 0,
                    bottom: 5,
                    text: data[i].message
                });
                var label_time = $.UI.create("Label", {
                    classes: [ "h5", "wfill", "hsize", "padding" ],
                    top: 0,
                    text: data[i].created,
                    textAlign: "right"
                });
                view_text_container.add(label_name);
                view_text_container.add(label_message);
                view_text_container.add(label_time);
                data[i].is_endUser ? view_text_container.setLeft(10) : view_text_container.setRight(10);
            } else {
                var view_text_container = $.UI.create("View", {
                    classes: [ "wsize", "hsize", "box", "rounded" ],
                    top: 10,
                    backgroundColor: "#3ddaf6"
                });
                var label_system_msg = $.UI.create("Label", {
                    classes: [ "wsize", "hsize", "padding", "h6" ],
                    text: data[i].message
                });
                view_text_container.add(label_system_msg);
            }
            view_container.add(view_text_container);
            $.inner_box.add(view_container);
        }
        scrollToBottom();
    }
    function getConversationByRoomId(callback) {
        var checker = Alloy.createCollection("updateChecker");
        var u_id = Ti.App.Properties.getString("u_id") || 0;
        var isUpdate = checker.getCheckerById(7, u_id);
        var last_updated = isUpdate.updated || "";
        console.log(u_id);
        API.callByPost({
            url: "getHelplineMessage",
            params: {
                u_id: u_id,
                last_updated: last_updated
            }
        }, function(responseText) {
            var model = Alloy.createCollection("helpline");
            console.log(responseText);
            var res = JSON.parse(responseText);
            var arr = res.data || null;
            Ti.App.Properties.setString("estimate_time", res.estimate_time);
            console.log("api get message");
            console.log(arr);
            model.saveArray(arr, callback);
            checker.updateModule(7, "getHelplineMessage", common.now(), u_id);
            callback && callback();
        });
    }
    function scrollToBottom() {
        $.chatroom.scrollToBottom();
    }
    function refresh() {
        loading.start();
        getConversationByRoomId(function() {
            var model = Alloy.createCollection("helpline");
            data = model.getData();
            var estimate_time = Ti.App.Properties.getString("estimate_time");
            console.log(estimate_time + " estimate time");
            if (0 != estimate_time) {
                $.estimate.text = "Our support will serve you soon. Estimate " + estimate_time + " minute left";
                $.estimate.parent.show();
            } else {
                console.log("wtf");
                $.estimate.parent.hide();
            }
            render_conversation();
        });
        loading.finish();
    }
    function updateFriendInfo(callback) {
        callback && callback();
        return;
    }
    function init() {
        $.win.add(loading.getView());
        setTimeout(function() {
            updateFriendInfo(refresh);
        }, 1e3);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "conversation";
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
    var __defers = {};
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        title: "Ask Me - Helpline",
        id: "win",
        backButtonTitle: "",
        navTintColor: "#CE1D1C"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.__alloyId78 = Ti.UI.createView({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "__alloyId78"
    });
    $.__views.win.add($.__views.__alloyId78);
    $.__views.__alloyId79 = Ti.UI.createView({
        layout: "horizontal",
        height: 50,
        width: Ti.UI.FILL,
        backgroundColor: "#DEDEDE",
        id: "__alloyId79"
    });
    $.__views.__alloyId78.add($.__views.__alloyId79);
    $.__views.__alloyId80 = Ti.UI.createView({
        left: 0,
        width: "20%",
        id: "__alloyId80"
    });
    $.__views.__alloyId79.add($.__views.__alloyId80);
    $.__views.btnBack = Ti.UI.createImageView({
        left: 10,
        id: "btnBack",
        width: 25,
        height: 25,
        image: "/images/btn-back.png"
    });
    $.__views.__alloyId80.add($.__views.btnBack);
    $.__views.__alloyId81 = Ti.UI.createView({
        width: "60%",
        id: "__alloyId81"
    });
    $.__views.__alloyId79.add($.__views.__alloyId81);
    $.__views.pageTitle = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#606060",
        font: {
            fontSize: "16dp"
        },
        text: "Ask Me - Helpline",
        id: "pageTitle",
        textAlign: "center"
    });
    $.__views.__alloyId81.add($.__views.pageTitle);
    $.__views.__alloyId82 = Ti.UI.createScrollView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        contentHeight: Ti.UI.FILL,
        contentWidth: Ti.UI.FILL,
        id: "__alloyId82"
    });
    $.__views.__alloyId78.add($.__views.__alloyId82);
    $.__views.__alloyId83 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        borderColor: "#dfe0e4",
        backgroundColor: "#ffffff",
        borderRadius: "5",
        zIndex: 10,
        width: 200,
        id: "__alloyId83"
    });
    $.__views.__alloyId82.add($.__views.__alloyId83);
    $.__views.estimate = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#f63d3d",
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
        font: {
            fontSize: 14
        },
        id: "estimate"
    });
    $.__views.__alloyId83.add($.__views.estimate);
    $.__views.__alloyId84 = Ti.UI.createView({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "__alloyId84"
    });
    $.__views.__alloyId82.add($.__views.__alloyId84);
    $.__views.__alloyId85 = Ti.UI.createView({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        borderColor: "#dfe0e4",
        backgroundColor: "#FFFFFF",
        bottom: 10,
        id: "__alloyId85"
    });
    $.__views.__alloyId84.add($.__views.__alloyId85);
    $.__views.chatroom = Ti.UI.createScrollView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "chatroom",
        backgroundColor: "#e5e5e5",
        bottom: 55,
        contentHeight: Ti.UI.SIZE,
        contentWidth: Ti.UI.FILL
    });
    $.__views.__alloyId85.add($.__views.chatroom);
    $.__views.inner_box = Ti.UI.createView({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "inner_box",
        top: 0
    });
    $.__views.chatroom.add($.__views.inner_box);
    $.__views.__alloyId86 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        backgroundColor: "white",
        bottom: 0,
        id: "__alloyId86"
    });
    $.__views.__alloyId82.add($.__views.__alloyId86);
    $.__views.message = Ti.UI.createTextField({
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        height: "45dp",
        font: {
            fontSize: "14dp"
        },
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        width: "70%",
        backgroundColor: "#ffffff",
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
        id: "message"
    });
    $.__views.__alloyId86.add($.__views.message);
    $.__views.__alloyId87 = Ti.UI.createButton({
        borderColor: "#CE1D1C",
        backgroundColor: "#ffffff",
        color: "#CE1D1C",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        width: 60,
        height: 35,
        font: {
            fontSize: 14
        },
        title: "Send",
        right: 10,
        id: "__alloyId87"
    });
    $.__views.__alloyId86.add($.__views.__alloyId87);
    SendMessage ? $.addListener($.__views.__alloyId87, "click", SendMessage) : __defers["$.__views.__alloyId87!click!SendMessage"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    args.dr_id;
    args.room_id;
    var loading = Alloy.createController("loading");
    init();
    $.chatroom.addEventListener("postlayout", scrollToBottom);
    Ti.App.addEventListener("conversation:refresh", refresh);
    $.win.addEventListener("close", function() {
        Ti.App.removeEventListener("conversation:refresh", refresh);
        $.destroy();
        console.log("window close");
    });
    __defers["$.__views.__alloyId87!click!SendMessage"] && $.addListener($.__views.__alloyId87, "click", SendMessage);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;