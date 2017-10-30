function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function init() {
        $.win.add(loading.getView());
        $.addbox.hide();
        refresh(render_personal_health);
    }
    function render_personal_health(arr) {
        console.log(personal_health_type + " before call");
        var listing = "undefined" != typeof arr ? arr : args.records;
        var arr = [];
        listing.length <= 0 && listing.push({
            val: "No records found"
        });
        for (var i = 0; i < listing.length; i++) {
            var row = $.UI.create("TableViewRow", {
                title: listing[i].val,
                classes: [ "wfill", "hsize" ],
                id: listing[i].id
            });
            arr.push(row);
        }
        $.tblview.setData(arr);
    }
    function refresh(callback) {
        var u_id = Ti.App.Properties.getString("u_id") || 0;
        API.callByPost({
            url: "getPersonalInfoRecords",
            params: {
                u_id: u_id
            }
        }, function(responseText) {
            var res = JSON.parse(responseText);
            var arr = res.data || null;
            callback(arr);
            loading.finish();
        });
    }
    function addRecord() {
        var u_id = Ti.App.Properties.getString("u_id");
        if ("" == $.box_value.value) {
            closeBox();
            $.box_value.value = "";
            return;
        }
        loading.start();
        params = {
            u_id: u_id,
            type: personal_health_type,
            val: $.box_value.value
        };
        API.callByPost({
            url: "addUpdateRecords",
            params: params
        }, function(responseText) {
            JSON.parse(responseText);
            refresh(render_personal_health);
            closeBox();
            $.box_value.value = "";
            loading.finish();
        });
    }
    function closeBox() {
        $.addbox.hide();
    }
    function openBox() {
        $.addbox.show();
    }
    function switchListing(e) {
        var tab = parent({
            name: "tab"
        }, e.source);
        var text = children({
            name: "v",
            value: "label"
        }, $.firstTab);
        var secondtext = children({
            name: "v",
            value: "label"
        }, $.secondTab);
        if (1 == tab) {
            personal_health_type = "Medication Records";
            text.color = "#CE1D1C";
            $.secondTab.backgroundColor = "transparent";
            secondtext.color = "#606060";
        } else if (2 == tab) {
            personal_health_type = "Allergic History";
            secondtext.color = "#CE1D1C";
            $.firstTab.backgroundColor = "transparent";
            text.color = "#606060";
        }
        render_personal_health();
        $.addbox_title.text = personal_health_type;
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "_plux_profile_view";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.win = Ti.UI.createView({
        id: "win"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.addbox = Ti.UI.createView({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        borderColor: "#dfe0e4",
        backgroundColor: "#FFFFFF",
        id: "addbox",
        zIndex: 10,
        left: 10,
        right: 10
    });
    $.__views.win.add($.__views.addbox);
    $.__views.__alloyId17 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "__alloyId17"
    });
    $.__views.addbox.add($.__views.__alloyId17);
    $.__views.addbox_title = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#606060",
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
        text: "Medication Records",
        id: "addbox_title",
        verticalAlign: "center"
    });
    $.__views.__alloyId17.add($.__views.addbox_title);
    $.__views.__alloyId18 = Ti.UI.createImageView({
        height: 40,
        image: "/images/cross.png",
        right: 0,
        id: "__alloyId18"
    });
    $.__views.__alloyId17.add($.__views.__alloyId18);
    closeBox ? $.addListener($.__views.__alloyId18, "click", closeBox) : __defers["$.__views.__alloyId18!click!closeBox"] = true;
    $.__views.box_value = Ti.UI.createTextField({
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        height: "45dp",
        font: {
            fontSize: "14dp"
        },
        color: "#222222",
        borderWidth: "1px",
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        width: Ti.UI.FILL,
        backgroundColor: "#ffffff",
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
        id: "box_value",
        hintText: "New record"
    });
    $.__views.addbox.add($.__views.box_value);
    $.__views.__alloyId19 = Ti.UI.createButton({
        height: 40,
        borderColor: "#C6C8CA",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        backgroundColor: "#ED1C24",
        borderRadius: 6,
        color: "#ffffff",
        width: Titanium.UI.FILL,
        left: 10,
        right: 10,
        top: 10,
        font: {
            fontFamily: "Lato-Regular"
        },
        title: "Add",
        bottom: 10,
        id: "__alloyId19"
    });
    $.__views.addbox.add($.__views.__alloyId19);
    addRecord ? $.addListener($.__views.__alloyId19, "click", addRecord) : __defers["$.__views.__alloyId19!click!addRecord"] = true;
    $.__views.__alloyId20 = Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.FILL,
        backgroundColor: "#fff",
        id: "__alloyId20"
    });
    $.__views.win.add($.__views.__alloyId20);
    $.__views.__alloyId21 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: Titanium.UI.FILL,
        backgroundColor: "#CE1D1C",
        id: "__alloyId21"
    });
    $.__views.__alloyId20.add($.__views.__alloyId21);
    $.__views.__alloyId22 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        color: "#ffffff",
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "Personal Information",
        id: "__alloyId22"
    });
    $.__views.__alloyId21.add($.__views.__alloyId22);
    $.__views.profile_data = Ti.UI.createView({
        id: "profile_data",
        layout: "vertical",
        top: 10,
        bottom: 10,
        height: Ti.UI.SIZE
    });
    $.__views.__alloyId20.add($.__views.profile_data);
    $.__views.__alloyId23 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "__alloyId23"
    });
    $.__views.__alloyId20.add($.__views.__alloyId23);
    $.__views.fullname = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#000000",
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
        font: {
            fontSize: 14
        },
        id: "fullname"
    });
    $.__views.__alloyId23.add($.__views.fullname);
    $.__views.__alloyId24 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "__alloyId24"
    });
    $.__views.__alloyId20.add($.__views.__alloyId24);
    $.__views.email = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#000000",
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
        font: {
            fontSize: 14
        },
        id: "email"
    });
    $.__views.__alloyId24.add($.__views.email);
    $.__views.__alloyId25 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "__alloyId25"
    });
    $.__views.__alloyId20.add($.__views.__alloyId25);
    $.__views.last_login = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#000000",
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
        font: {
            fontSize: 14
        },
        id: "last_login"
    });
    $.__views.__alloyId25.add($.__views.last_login);
    $.__views.__alloyId26 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: Titanium.UI.FILL,
        backgroundColor: "#CE1D1C",
        id: "__alloyId26"
    });
    $.__views.__alloyId20.add($.__views.__alloyId26);
    $.__views.__alloyId27 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        color: "#ffffff",
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "My Health Records",
        id: "__alloyId27"
    });
    $.__views.__alloyId26.add($.__views.__alloyId27);
    $.__views.__alloyId28 = Ti.UI.createImageView({
        width: Ti.UI.SIZE,
        image: "/images/white-add.png",
        height: 40,
        right: 0,
        id: "__alloyId28"
    });
    $.__views.__alloyId26.add($.__views.__alloyId28);
    openBox ? $.addListener($.__views.__alloyId28, "click", openBox) : __defers["$.__views.__alloyId28!click!openBox"] = true;
    $.__views.my_health = Ti.UI.createView({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "my_health",
        top: 10,
        bottom: 10
    });
    $.__views.__alloyId20.add($.__views.my_health);
    $.__views.__alloyId29 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "__alloyId29"
    });
    $.__views.my_health.add($.__views.__alloyId29);
    $.__views.__alloyId30 = Ti.UI.createView({
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        horizontalWrap: false,
        id: "__alloyId30"
    });
    $.__views.__alloyId29.add($.__views.__alloyId30);
    $.__views.firstTab = Ti.UI.createView({
        id: "firstTab",
        tab: 1,
        height: 40,
        width: "50%"
    });
    $.__views.__alloyId30.add($.__views.firstTab);
    switchListing ? $.addListener($.__views.firstTab, "click", switchListing) : __defers["$.__views.firstTab!click!switchListing"] = true;
    $.__views.__alloyId31 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#CE1D1C",
        font: {
            fontSize: 14
        },
        text: "Medication Records",
        v: "label",
        id: "__alloyId31"
    });
    $.__views.firstTab.add($.__views.__alloyId31);
    switchListing ? $.addListener($.__views.__alloyId31, "click", switchListing) : __defers["$.__views.__alloyId31!click!switchListing"] = true;
    $.__views.__alloyId32 = Ti.UI.createImageView({
        width: Ti.UI.SIZE,
        v: "label",
        height: 40,
        image: "/images/icons/dotted.png",
        id: "__alloyId32"
    });
    $.__views.__alloyId30.add($.__views.__alloyId32);
    $.__views.secondTab = Ti.UI.createView({
        tab: 2,
        id: "secondTab",
        height: 40,
        width: "50%"
    });
    $.__views.__alloyId30.add($.__views.secondTab);
    switchListing ? $.addListener($.__views.secondTab, "click", switchListing) : __defers["$.__views.secondTab!click!switchListing"] = true;
    $.__views.__alloyId33 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#606060",
        font: {
            fontSize: 14
        },
        text: "Allergic History",
        v: "label",
        id: "__alloyId33"
    });
    $.__views.secondTab.add($.__views.__alloyId33);
    switchListing ? $.addListener($.__views.__alloyId33, "click", switchListing) : __defers["$.__views.__alloyId33!click!switchListing"] = true;
    $.__views.tblview = Ti.UI.createTableView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "tblview",
        separatorColor: "#ebebeb",
        backgroundColor: "#ffffff"
    });
    $.__views.my_health.add($.__views.tblview);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var loading = Alloy.createController("loading");
    var personal_health_type = "Medication Records";
    $.fullname.text = "Full Name : " + Ti.App.Properties.getString("fullname") || "";
    $.email.text = "Email : " + Ti.App.Properties.getString("plux_email") || "";
    $.last_login = "Last Login : " + Ti.App.Properties.getString("last_login") || "";
    init();
    $.tblview.addEventListener("longpress", function(e) {
        var id = e.rowData.id;
        var dialog = Ti.UI.createAlertDialog({
            cancel: 1,
            buttonNames: [ "Confirm", "Cancel" ],
            message: "Would you like to delete the record?",
            title: "Delete"
        });
        console.log(id + "remove id");
        dialog.addEventListener("click", function(ex) {
            if (ex.index === ex.source.cancel) console.log("cancel"); else if (0 == ex.index) {
                var params = {
                    id: id,
                    status: 2
                };
                loading.start();
                API.callByPost({
                    url: "changeRecordStatus",
                    params: params
                }, function(responseText) {
                    JSON.parse(responseText);
                    refresh(render_personal_health);
                    closeBox();
                    loading.finish();
                });
            }
        });
        dialog.show();
    });
    __defers["$.__views.__alloyId18!click!closeBox"] && $.addListener($.__views.__alloyId18, "click", closeBox);
    __defers["$.__views.__alloyId19!click!addRecord"] && $.addListener($.__views.__alloyId19, "click", addRecord);
    __defers["$.__views.__alloyId28!click!openBox"] && $.addListener($.__views.__alloyId28, "click", openBox);
    __defers["$.__views.firstTab!click!switchListing"] && $.addListener($.__views.firstTab, "click", switchListing);
    __defers["$.__views.__alloyId31!click!switchListing"] && $.addListener($.__views.__alloyId31, "click", switchListing);
    __defers["$.__views.secondTab!click!switchListing"] && $.addListener($.__views.secondTab, "click", switchListing);
    __defers["$.__views.__alloyId33!click!switchListing"] && $.addListener($.__views.__alloyId33, "click", switchListing);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;