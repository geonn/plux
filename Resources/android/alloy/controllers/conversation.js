function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function saveLocal(param) {
        var model_name = 0 == dr_id ? "helpline" : "chat";
        var model = Alloy.createCollection(model_name);
        var app_id = Math.random().toString(36).substr(2, 10);
        var local_save = {
            u_id: u_id,
            sender_id: u_id,
            message: param.message,
            created: common.now(),
            is_endUser: 1,
            dr_id: dr_id,
            format: param.format,
            status: 1,
            app_id: app_id,
            sender_name: user.fullname
        };
        dr_id > 0 && (local_save = _.extend(local_save, {
            id: app_id
        }));
        var id = model.saveArray([ local_save ]);
        app_id = 0 == dr_id ? id : app_id;
        var api_param = {
            u_id: u_id,
            dr_id: dr_id,
            message: param.message,
            is_endUser: 1,
            app_id: app_id
        };
        "voice" == param.format && _.extend(api_param, {
            media: param.format,
            Filedata: param.filedata
        });
        API.callByPost({
            url: "sendMessage",
            type: param.format,
            params: api_param
        }, function(responseText) {
            console.log(responseText);
            JSON.parse(responseText);
            $.message_bar.value = "";
            $.message_bar.editable = true;
            sending = false;
            $.message_bar.blur();
            loading.finish();
            socket.fireEvent("socket:sendMessage", {
                room_id: room_id
            });
            refresh_latest();
            0 === dr_id && socket.fireEvent("doctor:refresh_patient_list");
            "0" == isShowWatingMsg && (refreshIntervalId = setInterval(function() {
                $.estimate.text = "Our helpdesk seem busy in others line, please wait for 5-10 min. Sorry for inconvenience caused.";
                $.estimate.parent.show();
                isShowWatingMsg = "1";
                clearInterval(refreshIntervalId);
            }, 3e4));
        });
    }
    function SendMessage() {
        if ("" == $.message_bar.value || sending) return;
        loading.start();
        sending = true;
        $.message_bar.editable = false;
        saveLocal({
            message: $.message_bar.value,
            format: "text"
        });
    }
    function navToWebview(e) {
        var url = parent({
            name: "url"
        }, e.source);
        console.log(url);
        var win = Alloy.createController("webview", {
            url: url
        }).getView();
        win.open();
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
                    width: "75%",
                    url: data[i].message
                });
                var label_name = $.UI.create("label", {
                    classes: [ "h6", "wfill", "hsize", "bold", "small_padding" ],
                    left: 15,
                    color: "#7F7F7F",
                    text: data[i].sender_name
                });
                var ss = data[i].message;
                var newText = ss.replace("[br]", "\r\n");
                var text_color = "link" == data[i].format ? "blue" : "#606060";
                newText = "link" == data[i].format ? newText : newText;
                console.log(data[i]);
                var label_message = $.UI.create("Label", {
                    classes: [ "h5", "wfill", "hsize", "small_padding" ],
                    top: 0,
                    left: 15,
                    color: text_color,
                    text: newText
                });
                var label_time = $.UI.create("Label", {
                    classes: [ "h7", "wfill", "hsize", "small_padding" ],
                    top: 0,
                    right: 15,
                    text: timeFormat(data[i].created) + " " + status_text[data[i].status],
                    textAlign: "right"
                });
                if ("link" == data[i].format) {
                    var label_message2 = $.UI.create("Label", {
                        classes: [ "h5", "wfill", "hsize", "small_padding" ],
                        top: 0,
                        left: 15,
                        text: "Thanks you for contacting our call centre. \nWe would love to hear your thoughts or feedback on how we can improve your experience!\nClick below to start the survey:"
                    });
                    view_text_container.add(label_name);
                    view_text_container.add(label_message2);
                    view_text_container.add(label_message);
                } else if ("voice" == data[i].format) {
                    var player = Alloy.createWidget("dk.napp.audioplayer", {
                        playIcon: "",
                        pauseIcon: ""
                    });
                    console.log(newText);
                    player.setUrl(newText);
                    var view = $.UI.create("View", {
                        classes: [ "wfill", "hsize", "padding" ]
                    });
                    view.add(player.getView());
                    view_text_container.add(label_name);
                    view_text_container.add(view);
                } else {
                    view_text_container.add(label_name);
                    view_text_container.add(label_message);
                }
                view_text_container.add(label_time);
                if (data[i].is_endUser) {
                    view_text_container.setBackgroundColor("#F1FFE3");
                    view_text_container.setLeft(10);
                } else {
                    view_text_container.setBackgroundColor("#FFFFE3");
                    if ("undefined" != typeof args.record) {
                        var imageview_thumb_path = $.UI.create("ImageView", {
                            top: 10,
                            width: 50,
                            height: "auto",
                            defaultImage: "/images/default/small_item.png",
                            right: 10,
                            image: args.record.img_path
                        });
                        view_container.add(imageview_thumb_path);
                        view_text_container.width = "60%";
                        view_text_container.setRight(60);
                    } else view_text_container.setRight(10);
                }
                "link" == data[i].format && label_message.addEventListener("click", navToWebview);
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
                        var model_name = 0 == dr_id ? "helpline" : "chat";
                        var model = Alloy.createCollection(model_name);
                        model.removeById(m_id);
                        $.inner_area.remove(message_box);
                    }
                });
                dialog.show();
            });
            latest ? $.inner_area.insertAt({
                view: view_container
            }) : $.inner_area.insertAt({
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
        var url = 0 == dr_id ? "getHelplineMessageV3" : "getMessage";
        var model_name = 0 == dr_id ? "helpline" : "chat";
        var checker_id = 0 == dr_id ? 7 : 19;
        var checker = Alloy.createCollection("updateChecker");
        var u_id = Ti.App.Properties.getString("u_id") || 0;
        var isUpdate = checker.getCheckerById(checker_id, u_id);
        var last_updated = isUpdate.updated || "";
        last_update = last_updated;
        console.log({
            u_id: u_id,
            dr_id: dr_id,
            last_updated: last_updated
        });
        API.callByPost({
            url: url,
            params: {
                u_id: u_id,
                dr_id: dr_id,
                last_updated: last_updated
            }
        }, function(responseText) {
            var model = Alloy.createCollection(model_name);
            console.log("check here " + room_id);
            var res = JSON.parse(responseText);
            var arr = res.data || void 0;
            if (arr.length > 0) {
                console.log(arr);
                model.saveArray(arr, callback);
                _.pluck(arr, "id");
            }
            Ti.App.Properties.setString("estimate_time", res.estimate_time);
            checker.updateModule(checker_id, url, res.last_updated, u_id);
            if (!room_id) {
                console.log(res);
                Ti.App.fireEvent("web:setRoom", {
                    room_id: res.room_id
                });
                setup_socket();
            }
            room_id = res.room_id;
            callback && callback();
        });
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
            var model_name = 0 == dr_id ? "helpline" : "chat";
            var model = Alloy.createCollection(model_name);
            model.messageRead({
                u_id: u_id
            });
        });
    }
    function refresh_latest(param) {
        var player = Ti.Media.createSound({
            url: "/sound/doorbell.wav"
        });
        player.play();
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
        var model_name = 0 == dr_id ? "helpline" : "chat";
        var model = Alloy.createCollection(model_name);
        console.log(dr_id + " dr_id");
        data = model.getData(false, start, anchor, "", dr_id);
        var estimate_time = Ti.App.Properties.getString("estimate_time");
        console.log(estimate_time + " estimate time");
        console.log(data.length);
        last_id = data.length > 0 ? _.first(data)["id"] : last_id;
        last_update = data.length > 0 ? _.last(data)["created"] : last_update;
        last_uid = data.length > 0 ? _.first(data)["sender_id"] : last_uid;
        console.log(last_id + " why");
        if ("0" != estimate_time) {
            $.estimate.text = "Our support will serve you soon. Estimate " + estimate_time + " minute left";
            $.estimate.parent.show();
        } else $.estimate.parent.hide();
        render_conversation(false);
        start += 10;
        "undefined" != typeof param.firsttime && setTimeout(function(e) {
            scrollToBottom();
        }, 500);
    }
    function getLatestData() {
        var model_name = 0 == dr_id ? "helpline" : "chat";
        var model = Alloy.createCollection(model_name);
        console.log(last_id + " last id");
        data = model.getData(true, "", "", 0 == dr_id ? last_id : last_update, dr_id);
        var estimate_time = Ti.App.Properties.getString("estimate_time");
        if (0 != estimate_time) {
            $.estimate.text = "Our support will serve you soon. Estimate " + estimate_time + " minute left";
            $.estimate.parent.show();
        } else $.estimate.parent.hide();
        console.log("getlatestdata");
        console.log(data.length);
        last_id = data.length > 0 ? _.first(data)["id"] : last_id;
        last_update = data.length > 0 ? _.first(data)["created"] : last_update;
        last_uid = data.length > 0 ? _.first(data)["sender_id"] : last_uid;
        console.log(last_id);
        render_conversation(true);
        setTimeout(function(e) {
            scrollToBottom();
        }, 500);
    }
    function switchIcon(e) {
        "" != e.source.value ? $.enter_icon.right = 10 : $.enter_icon.right = -50;
    }
    function closeWindow() {
        $.win.close();
    }
    function init() {
        var mic = voice_recorder.getView();
        $.action_btn.add(mic);
        $.win.add(loading.getView());
        Titanium.Network.online || common.createAlert("Alert", "There is no internet connection.", closeWindow);
        if (dr_id > 0) {
            $.win.title = "Ask Doctor - " + args.record.name;
            $.pageTitle.text = "Ask Doctor - " + args.record.name;
        }
        console.log(room_id + " room id");
        refresh(getPreviousData, true);
        if (room_id) {
            socket.addEventListener("socket:refresh_chatroom", refresh_latest);
            socket.event_onoff("socket:message_alert", false);
        }
    }
    function setup_socket() {
        console.log("setup_socket");
        socket.addEventListener("socket:refresh_chatroom", refresh_latest);
        socket.event_onoff("socket:message_alert", false);
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "conversation";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN,
        title: "Ask Me - Helpline",
        id: "win",
        backButtonTitle: "",
        navTintColor: "#CE1D1C"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.__alloyId69 = Ti.UI.createView({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "__alloyId69"
    });
    $.__views.win.add($.__views.__alloyId69);
    $.__views.__alloyId70 = Ti.UI.createView({
        layout: "horizontal",
        height: 50,
        width: Ti.UI.FILL,
        backgroundColor: "#DEDEDE",
        id: "__alloyId70"
    });
    $.__views.__alloyId69.add($.__views.__alloyId70);
    $.__views.__alloyId71 = Ti.UI.createView({
        left: 0,
        width: "20%",
        id: "__alloyId71"
    });
    $.__views.__alloyId70.add($.__views.__alloyId71);
    $.__views.btnBack = Ti.UI.createImageView({
        left: 10,
        id: "btnBack",
        width: 25,
        height: 25,
        image: "/images/btn-back.png"
    });
    $.__views.__alloyId71.add($.__views.btnBack);
    closeWindow ? $.addListener($.__views.btnBack, "click", closeWindow) : __defers["$.__views.btnBack!click!closeWindow"] = true;
    $.__views.__alloyId72 = Ti.UI.createView({
        width: "60%",
        id: "__alloyId72"
    });
    $.__views.__alloyId70.add($.__views.__alloyId72);
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
    $.__views.__alloyId72.add($.__views.pageTitle);
    $.__views.__alloyId73 = Ti.UI.createScrollView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        contentHeight: Ti.UI.FILL,
        contentWidth: Ti.UI.FILL,
        id: "__alloyId73"
    });
    $.__views.__alloyId69.add($.__views.__alloyId73);
    $.__views.__alloyId74 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        borderColor: "#dfe0e4",
        backgroundColor: "#ffffff",
        borderRadius: "5",
        zIndex: 10,
        width: "80%",
        id: "__alloyId74"
    });
    $.__views.__alloyId73.add($.__views.__alloyId74);
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
    $.__views.__alloyId74.add($.__views.estimate);
    $.__views.chatroom = Ti.UI.createScrollView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "chatroom",
        backgroundRepeat: true,
        backgroundImage: "/images/grey-patern-bg.png",
        bottom: 50,
        contentHeight: Ti.UI.SIZE,
        contentWidth: Ti.UI.FILL
    });
    $.__views.__alloyId73.add($.__views.chatroom);
    $.__views.inner_area = Ti.UI.createView({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "inner_area",
        bottom: 20
    });
    $.__views.chatroom.add($.__views.inner_area);
    $.__views.__alloyId75 = Ti.UI.createLabel({
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
        id: "__alloyId75"
    });
    $.__views.inner_area.add($.__views.__alloyId75);
    getPreviousData ? $.addListener($.__views.__alloyId75, "click", getPreviousData) : __defers["$.__views.__alloyId75!click!getPreviousData"] = true;
    $.__views.bottom_bar = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: 50,
        backgroundColor: "white",
        bottom: 0,
        id: "bottom_bar"
    });
    $.__views.__alloyId73.add($.__views.bottom_bar);
    $.__views.message_bar = Ti.UI.createTextField({
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        height: 40,
        font: "fontSize: 40",
        borderWidth: "1px",
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        width: Ti.UI.FILL,
        backgroundColor: "#ffffff",
        top: 4,
        left: 5,
        right: 50,
        bottom: 4,
        id: "message_bar",
        borderColor: "#ccc"
    });
    $.__views.bottom_bar.add($.__views.message_bar);
    switchIcon ? $.addListener($.__views.message_bar, "change", switchIcon) : __defers["$.__views.message_bar!change!switchIcon"] = true;
    $.__views.action_btn = Ti.UI.createView({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        id: "action_btn",
        right: 0
    });
    $.__views.bottom_bar.add($.__views.action_btn);
    $.__views.enter_icon = Ti.UI.createImageView({
        id: "enter_icon",
        backgroundColor: "#ffffff",
        image: "/images/icons/icon_enter.png",
        top: 10,
        bottom: 10,
        zIndex: 3,
        right: -50,
        height: 30,
        width: 30
    });
    $.__views.action_btn.add($.__views.enter_icon);
    SendMessage ? $.addListener($.__views.enter_icon, "click", SendMessage) : __defers["$.__views.enter_icon!click!SendMessage"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var dr_id = args.dr_id || 0;
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
    var room_id = 0;
    var voice_recorder = Alloy.createWidget("geonn.voicerecorder", {
        record_callback: saveLocal
    });
    var sending = false;
    var refreshing = false;
    var time_offset = common.now();
    init();
    Ti.App.addEventListener("conversation:refresh", refresh_latest);
    $.win.addEventListener("close", function() {
        Ti.App.fireEvent("socket:leave_room", {
            room_id: room_id
        });
        socket.removeEventListener("socket:refresh_chatroom");
        socket.event_onoff("socket:message_alert", true);
        Ti.App.fireEvent("render_menu");
        Ti.App.removeEventListener("conversation:refresh", refresh_latest);
        $.destroy();
    });
    __defers["$.__views.btnBack!click!closeWindow"] && $.addListener($.__views.btnBack, "click", closeWindow);
    __defers["$.__views.__alloyId75!click!getPreviousData"] && $.addListener($.__views.__alloyId75, "click", getPreviousData);
    __defers["$.__views.message_bar!change!switchIcon"] && $.addListener($.__views.message_bar, "change", switchIcon);
    __defers["$.__views.enter_icon!click!SendMessage"] && $.addListener($.__views.enter_icon, "click", SendMessage);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;