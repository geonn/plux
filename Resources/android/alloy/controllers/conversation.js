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
            Ti.App.fireEvent("web:sendMessage", {
                room_id: room_id
            });
        });
    }
    function render_conversation(latest) {
        !latest;
        for (var i = 0; i < data.length; i++) {
            var view_container = $.UI.create("View", {
                classes: [ "hsize", "wfill" ]
            });
            if (data[i].sender_id) {
                var view_text_container = $.UI.create("View", {
                    classes: [ "hsize", "vert", "box", "bigRounded" ],
                    top: 2,
                    width: "75%"
                });
                var label_name = $.UI.create("label", {
                    classes: [ "h6", "wfill", "hsize", "bold", "small_padding" ],
                    left: 15,
                    color: "#7F7F7F",
                    text: data[i].sender_name
                });
                var ss = data[i].message;
                var newText = ss.replace("[br]", "\r\n");
                var label_message = $.UI.create("Label", {
                    classes: [ "h5", "wfill", "hsize", "small_padding" ],
                    top: 0,
                    left: 15,
                    text: newText
                });
                var label_time = $.UI.create("Label", {
                    classes: [ "h7", "wfill", "hsize", "small_padding" ],
                    top: 0,
                    right: 15,
                    text: timeFormat(data[i].created),
                    textAlign: "right"
                });
                view_text_container.add(label_name);
                view_text_container.add(label_message);
                view_text_container.add(label_time);
                if (data[i].is_endUser) {
                    view_text_container.setBackgroundColor("#F1FFE3");
                    view_text_container.setLeft(10);
                } else {
                    view_text_container.setBackgroundColor("#FFFFE3");
                    view_text_container.setRight(10);
                }
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
            $.inner_area.insertAt(latest ? {
                view: view_container
            } : {
                view: view_container,
                position: 1
            });
        }
    }
    function getConversationByRoomId(callback) {
        var checker = Alloy.createCollection("updateChecker");
        var u_id = Ti.App.Properties.getString("u_id") || 0;
        var isUpdate = checker.getCheckerById(7, u_id);
        var last_updated = isUpdate.updated || "";
        API.callByPost({
            url: "getHelplineMessage",
            params: {
                u_id: u_id,
                last_updated: last_updated
            }
        }, function(responseText) {
            var model = Alloy.createCollection("helpline");
            var res = JSON.parse(responseText);
            var arr = res.data || null;
            Ti.App.Properties.setString("estimate_time", res.estimate_time);
            console.log("getConversationByRoomId function");
            console.log(arr);
            model.saveArray(arr, callback);
            checker.updateModule(7, "getHelplineMessage", common.now(), u_id);
            if (!room_id) {
                console.log(res.room_id + " room id");
                room_id = res.room_id;
                setTimeout(function() {
                    Ti.App.fireEvent("web:setRoom", {
                        room_id: room_id
                    });
                }, 1e3);
            }
            callback && callback();
        });
    }
    function scrollToBottom() {
        $.chatroom.scrollToBottom();
    }
    function refresh(callback, firsttime) {
        loading.start();
        getConversationByRoomId(function() {
            callback({
                firsttime: firsttime
            });
        });
        loading.finish();
    }
    function refresh_latest() {
        console.log("refresh_latest");
        refresh(getLatestData);
    }
    function getPreviousData(param) {
        start = parseInt(start);
        var model = Alloy.createCollection("helpline");
        data = model.getData(false, "", start, anchor);
        var estimate_time = Ti.App.Properties.getString("estimate_time");
        console.log(estimate_time + " estimate time");
        if ("0" != estimate_time) {
            $.estimate.text = "Our support will serve you soon. Estimate " + estimate_time + " minute left";
            $.estimate.parent.show();
        } else $.estimate.parent.hide();
        render_conversation(false);
        start += 11;
        "undefined" != typeof param.firsttime && setTimeout(function() {
            scrollToBottom();
        }, 500);
    }
    function getLatestData() {
        var model = Alloy.createCollection("helpline");
        data = model.getData(true, last_update);
        last_update = common.now();
        var estimate_time = Ti.App.Properties.getString("estimate_time");
        if (0 != estimate_time) {
            $.estimate.text = "Our support will serve you soon. Estimate " + estimate_time + " minute left";
            $.estimate.parent.show();
        } else $.estimate.parent.hide();
        render_conversation(true);
        setTimeout(function() {
            scrollToBottom();
        }, 500);
    }
    function closeWindow() {
        $.win.close();
    }
    function init() {
        $.win.add(loading.getView());
        refresh(getPreviousData, true);
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
    $.__views.socket = Ti.UI.createWebView({
        width: Ti.UI.FILL,
        url: "/html/index.html",
        id: "socket",
        height: 0
    });
    $.__views.win.add($.__views.socket);
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
    closeWindow ? $.addListener($.__views.btnBack, "click", closeWindow) : __defers["$.__views.btnBack!click!closeWindow"] = true;
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
    $.__views.chatroom = Ti.UI.createScrollView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "chatroom",
        backgroundRepeat: true,
        backgroundImage: "/images/grey-patern-bg.png",
        bottom: 60,
        contentHeight: Ti.UI.SIZE,
        contentWidth: Ti.UI.FILL
    });
    $.__views.__alloyId82.add($.__views.chatroom);
    $.__views.inner_area = Ti.UI.createView({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "inner_area",
        bottom: 20
    });
    $.__views.chatroom.add($.__views.inner_area);
    $.__views.__alloyId84 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#606060",
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
        borderColor: "#dfe0e4",
        backgroundColor: "#FFFFFF",
        font: {
            fontSize: 14
        },
        text: "More",
        textAlign: "center",
        id: "__alloyId84"
    });
    $.__views.inner_area.add($.__views.__alloyId84);
    getPreviousData ? $.addListener($.__views.__alloyId84, "click", getPreviousData) : __defers["$.__views.__alloyId84!click!getPreviousData"] = true;
    $.__views.__alloyId85 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        backgroundColor: "white",
        bottom: 0,
        id: "__alloyId85"
    });
    $.__views.__alloyId82.add($.__views.__alloyId85);
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
    $.__views.__alloyId85.add($.__views.message);
    $.__views.__alloyId86 = Ti.UI.createButton({
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
        id: "__alloyId86"
    });
    $.__views.__alloyId85.add($.__views.__alloyId86);
    SendMessage ? $.addListener($.__views.__alloyId86, "click", SendMessage) : __defers["$.__views.__alloyId86!click!SendMessage"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    args.dr_id;
    var loading = Alloy.createController("loading");
    var room_id = 0;
    var anchor = common.now();
    var last_update = common.now();
    var start = 0;
    init();
    Ti.App.addEventListener("conversation:refresh", refresh_latest);
    $.win.addEventListener("close", function() {
        Ti.App.removeEventListener("conversation:refresh", refresh_latest);
        $.destroy();
        console.log("window close");
    });
    __defers["$.__views.btnBack!click!closeWindow"] && $.addListener($.__views.btnBack, "click", closeWindow);
    __defers["$.__views.__alloyId84!click!getPreviousData"] && $.addListener($.__views.__alloyId84, "click", getPreviousData);
    __defers["$.__views.__alloyId86!click!SendMessage"] && $.addListener($.__views.__alloyId86, "click", SendMessage);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;