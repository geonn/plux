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
        var model = Alloy.createCollection("helpline");
        if ("" == $.message.value || sending) return;
        loading.start();
        sending = true;
        $.message.editable = false;
        var local_save = [ {
            u_id: u_id,
            sender_id: u_id,
            message: $.message.value,
            created: common.now(),
            is_endUser: 1,
            status: 1,
            sender_name: user.fullname
        } ];
        var id = model.saveArray(local_save);
        getLatestData();
        API.callByPost({
            url: "sendHelplineMessage",
            params: {
                u_id: u_id,
                message: $.message.value,
                is_endUser: 1,
                app_id: id
            }
        }, function(responseText) {
            JSON.parse(responseText);
            $.message.value = "";
            $.message.editable = true;
            sending = false;
            $.message.blur();
            loading.finish();
            socket.fireEvent("socket:sendMessage", {
                room_id: room_id
            });
            console.log(isShowWatingMsg);
            "0" == isShowWatingMsg && (refreshIntervalId = setInterval(function() {
                $.estimate.text = "Our helpdesk seem busy in others line, please wait for 5-10 min. Sorry for inconvenience caused.";
                $.estimate.parent.show();
                isShowWatingMsg = "1";
                clearInterval(refreshIntervalId);
            }, 3e4));
        });
    }
    function render_conversation(latest) {
        !latest;
        latest && data.reverse();
        for (var i = 0; i < data.length; i++) {
            var view_container = $.UI.create("View", {
                classes: [ "hsize", "wfill" ],
                m_id: data[i].id
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
                    text: timeFormat(data[i].created) + " " + status_text[data[i].status],
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
            view_container.addEventListener("longpress", function(e) {
                var m_id = parent({
                    name: "m_id"
                }, e.source);
                var message_box = parent({
                    name: "m_id",
                    value: m_id
                }, e.source);
                var dialog = Ti.UI.createAlertDialog({
                    cancel: 1,
                    buttonNames: [ "Confirm", "Cancel" ],
                    message: "Would you like to delete the message?",
                    title: "Delete"
                });
                dialog.addEventListener("click", function(ex) {
                    if (ex.index === ex.source.cancel) ; else if (0 == ex.index) {
                        var model = Alloy.createCollection("helpline");
                        model.removeById(m_id);
                        $.inner_area.remove(message_box);
                    }
                });
                dialog.show();
            });
            $.inner_area.insertAt(latest ? {
                view: view_container
            } : {
                view: view_container,
                position: 1
            });
        }
        console.log(last_uid + " != " + Ti.App.Properties.getString("u_id"));
        if (last_uid != Ti.App.Properties.getString("u_id")) {
            $.estimate.parent.hide();
            isShowWatingMsg = "0";
            clearInterval(refreshIntervalId);
        }
        "1" == isShowWatingMsg && $.estimate.parent.show();
    }
    function getConversationByRoomId(callback) {
        var checker = Alloy.createCollection("updateChecker");
        var u_id = Ti.App.Properties.getString("u_id") || 0;
        var isUpdate = checker.getCheckerById(7, u_id);
        var last_updated = isUpdate.updated || "";
        last_update = last_updated;
        console.log(last_updated + " last_updated " + u_id);
        API.callByPost({
            url: "getHelplineMessageV2",
            params: {
                u_id: u_id,
                last_updated: last_updated
            }
        }, function(responseText) {
            var model = Alloy.createCollection("helpline");
            var res = JSON.parse(responseText);
            var arr = res.data || void 0;
            if (arr.length > 0 || retry >= 3) {
                Ti.App.Properties.setString("estimate_time", res.estimate_time);
                model.saveArray(arr, callback);
                checker.updateModule(7, "getHelplineMessage", res.last_updated, u_id);
                console.log(res.last_updated + " where is the last update");
                var update_id = _.pluck(arr, "id");
                console.log(arr);
                console.log(update_id);
                updateStatus(update_id);
                if (!room_id) {
                    Ti.App.fireEvent("web:setRoom", {
                        room_id: res.data
                    });
                    Ti.App.fireEvent("conversation:setRoom", {
                        room_id: res.data
                    });
                }
                room_id = res.room_id;
                callback && callback();
            } else {
                console.log(retry + " retry times");
                getConversationByRoomId(callback);
                retry++;
            }
        });
    }
    function updateStatus(arr) {
        for (var i = 0; i < arr.length; i++) {
            {
                $.inner_area.getChildren();
            }
            for (var b = 0; b < $.inner_area.children.length; b++) {
                console.log($.inner_area.children[b].m_id + " " + arr[i]);
                if ($.inner_area.children[b].m_id == arr[i]) {
                    var time = $.inner_area.children[b].children[0].children[2].text.split(" ");
                    $.inner_area.children[b].children[0].children[2].text = time[0] + time[1] + time[2] + " Sent";
                }
            }
        }
    }
    function scrollToBottom() {
        $.chatroom.scrollToBottom();
    }
    function refresh(callback, firsttime) {
        retry = 0;
        loading.start();
        console.log("start refresh");
        getConversationByRoomId(function() {
            callback({
                firsttime: firsttime
            });
            loading.finish();
            refreshing = false;
        });
    }
    function refresh_latest() {
        console.log("refresh_latest " + refreshing);
        console.log(time_offset + " < " + common.now());
        if (!refreshing && time_offset < common.now()) {
            refreshing = true;
            refresh(getLatestData);
            time_offset = common.now();
        }
    }
    function getPreviousData(param) {
        start = parseInt(start);
        var model = Alloy.createCollection("helpline");
        data = model.getData(false, start, anchor);
        var estimate_time = Ti.App.Properties.getString("estimate_time");
        console.log(estimate_time + " estimate time");
        console.log(data);
        last_id = data.length > 0 ? _.first(data)["id"] : last_id;
        last_uid = data.length > 0 ? _.first(data)["sender_id"] : last_uid;
        console.log(last_id + " why");
        if ("0" != estimate_time) {
            $.estimate.text = "Our support will serve you soon. Estimate " + estimate_time + " minute left";
            $.estimate.parent.show();
        } else $.estimate.parent.hide();
        render_conversation(false);
        start += 10;
        "undefined" != typeof param.firsttime && setTimeout(function() {
            scrollToBottom();
        }, 500);
    }
    function getLatestData() {
        var model = Alloy.createCollection("helpline");
        data = model.getData(true, "", "", last_id);
        var estimate_time = Ti.App.Properties.getString("estimate_time");
        if (0 != estimate_time) {
            $.estimate.text = "Our support will serve you soon. Estimate " + estimate_time + " minute left";
            $.estimate.parent.show();
        } else $.estimate.parent.hide();
        console.log("getlatestdata");
        console.log(data);
        last_id = data.length > 0 ? _.first(data)["id"] : last_id;
        last_uid = data.length > 0 ? _.first(data)["sender_id"] : last_uid;
        console.log(last_id);
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
        Titanium.Network.online || common.createAlert("Alert", "There is no internet connection.", closeWindow);
        console.log(room_id + " room id");
        refresh(getPreviousData, true);
        if (room_id) {
            socket.addEventListener("socket:refresh_chatroom", refresh_latest);
            socket.event_onoff("socket:message_alert", false);
        }
    }
    function set_room() {
        socket.addEventListener("socket:refresh_chatroom", refresh_latest);
        socket.event_onoff("socket:message_alert", false);
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
    $.__views.__alloyId104 = Ti.UI.createView({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "__alloyId104"
    });
    $.__views.win.add($.__views.__alloyId104);
    $.__views.__alloyId105 = Ti.UI.createView({
        layout: "horizontal",
        height: 50,
        width: Ti.UI.FILL,
        backgroundColor: "#DEDEDE",
        id: "__alloyId105"
    });
    $.__views.__alloyId104.add($.__views.__alloyId105);
    $.__views.__alloyId106 = Ti.UI.createView({
        left: 0,
        width: "20%",
        id: "__alloyId106"
    });
    $.__views.__alloyId105.add($.__views.__alloyId106);
    $.__views.btnBack = Ti.UI.createImageView({
        left: 10,
        id: "btnBack",
        width: 25,
        height: 25,
        image: "/images/btn-back.png"
    });
    $.__views.__alloyId106.add($.__views.btnBack);
    closeWindow ? $.addListener($.__views.btnBack, "click", closeWindow) : __defers["$.__views.btnBack!click!closeWindow"] = true;
    $.__views.__alloyId107 = Ti.UI.createView({
        width: "60%",
        id: "__alloyId107"
    });
    $.__views.__alloyId105.add($.__views.__alloyId107);
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
    $.__views.__alloyId107.add($.__views.pageTitle);
    $.__views.__alloyId108 = Ti.UI.createScrollView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        contentHeight: Ti.UI.FILL,
        contentWidth: Ti.UI.FILL,
        id: "__alloyId108"
    });
    $.__views.__alloyId104.add($.__views.__alloyId108);
    $.__views.__alloyId109 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        borderColor: "#dfe0e4",
        backgroundColor: "#ffffff",
        borderRadius: "5",
        zIndex: 10,
        width: "80%",
        id: "__alloyId109"
    });
    $.__views.__alloyId108.add($.__views.__alloyId109);
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
    $.__views.__alloyId109.add($.__views.estimate);
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
    $.__views.__alloyId108.add($.__views.chatroom);
    $.__views.inner_area = Ti.UI.createView({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "inner_area",
        bottom: 20
    });
    $.__views.chatroom.add($.__views.inner_area);
    $.__views.__alloyId110 = Ti.UI.createLabel({
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
        m_id: "no",
        textAlign: "center",
        id: "__alloyId110"
    });
    $.__views.inner_area.add($.__views.__alloyId110);
    getPreviousData ? $.addListener($.__views.__alloyId110, "click", getPreviousData) : __defers["$.__views.__alloyId110!click!getPreviousData"] = true;
    $.__views.__alloyId111 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        backgroundColor: "white",
        bottom: 0,
        id: "__alloyId111"
    });
    $.__views.__alloyId108.add($.__views.__alloyId111);
    $.__views.message = Ti.UI.createTextField({
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        height: "45dp",
        font: {
            fontSize: "14dp"
        },
        borderWidth: "1px",
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        width: "70%",
        backgroundColor: "#ffffff",
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
        id: "message"
    });
    $.__views.__alloyId111.add($.__views.message);
    $.__views.__alloyId112 = Ti.UI.createButton({
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
        id: "__alloyId112"
    });
    $.__views.__alloyId111.add($.__views.__alloyId112);
    SendMessage ? $.addListener($.__views.__alloyId112, "click", SendMessage) : __defers["$.__views.__alloyId112!click!SendMessage"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    args.dr_id;
    var loading = Alloy.createController("loading");
    var anchor = common.now();
    var last_update = common.now();
    var start = 0;
    var isShowWatingMsg = "0";
    var refreshIntervalId;
    var retry = 0;
    var u_id = Ti.App.Properties.getString("u_id") || 0;
    var user_model = Alloy.createCollection("users_plux");
    var user = user_model.getUserById(u_id);
    var last_id = 0;
    var last_uid;
    var status_text = [ "", "Sending", "Sent", "Read" ];
    var sending = false;
    var refreshing = false;
    var time_offset = common.now();
    init();
    Ti.App.addEventListener("conversation:refresh", refresh_latest);
    Ti.App.addEventListener("conversation:setRoom", set_room);
    $.win.addEventListener("close", function() {
        socket.removeEventListener("socket:refresh_chatroom");
        socket.event_onoff("socket:message_alert", true);
        Ti.App.removeEventListener("conversation:refresh", refresh_latest);
        Ti.App.removeEventListener("conversation:setRoom", set_room);
        $.destroy();
    });
    __defers["$.__views.btnBack!click!closeWindow"] && $.addListener($.__views.btnBack, "click", closeWindow);
    __defers["$.__views.__alloyId110!click!getPreviousData"] && $.addListener($.__views.__alloyId110, "click", getPreviousData);
    __defers["$.__views.__alloyId112!click!SendMessage"] && $.addListener($.__views.__alloyId112, "click", SendMessage);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;