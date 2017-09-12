function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function addField(title_text, value_text, view) {
        if ("undefined" == typeof value_text || "" == value_text) return;
        var parent = $.UI.create("View", {
            layout: "horizontal",
            width: Ti.UI.FILL,
            height: Ti.UI.SIZE
        });
        var title = $.UI.create("Label", {
            width: "100sp",
            top: 0,
            bottom: "10sp",
            height: Ti.UI.SIZE,
            font: {
                fontSize: "14sp"
            },
            text: title_text,
            color: "#000000",
            textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT
        });
        var value = $.UI.create("Label", {
            width: "auto",
            top: 0,
            bottom: "10sp",
            left: "10sp",
            font: {
                fontSize: "14sp"
            },
            text: value_text,
            color: "#000000",
            height: Ti.UI.SIZE
        });
        parent.add(title);
        parent.add(value);
        view.add(parent);
    }
    function init() {
        $.win.add(loading.getView());
        $.addbox.hide();
        refresh(render_personal_health);
    }
    function render_personal_health() {
        console.log(personal_health_type + " before call");
        var listing = model.getData(personal_health_type);
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
        var u_id = Ti.App.Properties.getString("u_id");
        var checker = Alloy.createCollection("updateChecker");
        var isUpdate = checker.getCheckerById("15", u_id);
        var last_updated = "";
        "" != isUpdate && (last_updated = isUpdate.updated);
        loading.start();
        API.callByPost({
            url: "getPersonalInfoRecords",
            params: {
                last_updated: last_updated,
                u_id: u_id
            }
        }, function(responseText) {
            var res = JSON.parse(responseText);
            var arr = res.data || null;
            console.log(res);
            model.saveArray(arr);
            checker.updateModule(15, "getPersonalInfoRecords", res.last_updated, u_id);
            callback();
            loading.finish();
        });
    }
    function addRecord() {
        $.box_value.value;
        var u_id = Ti.App.Properties.getString("u_id");
        if ("" == $.box_value.value) {
            closeBox();
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
            var res = JSON.parse(responseText);
            model.saveArray(res.data);
            refresh(render_personal_health);
            closeBox();
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
    this.__controllerPath = "_profile_view";
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
    $.__views.__alloyId34 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "__alloyId34"
    });
    $.__views.addbox.add($.__views.__alloyId34);
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
    $.__views.__alloyId34.add($.__views.addbox_title);
    $.__views.__alloyId35 = Ti.UI.createImageView({
        height: 40,
        image: "/images/cross.png",
        right: 0,
        id: "__alloyId35"
    });
    $.__views.__alloyId34.add($.__views.__alloyId35);
    closeBox ? $.addListener($.__views.__alloyId35, "click", closeBox) : __defers["$.__views.__alloyId35!click!closeBox"] = true;
    $.__views.box_value = Ti.UI.createTextField({
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        height: "45dp",
        font: {
            fontSize: "14dp"
        },
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
    $.__views.__alloyId36 = Ti.UI.createButton({
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
        id: "__alloyId36"
    });
    $.__views.addbox.add($.__views.__alloyId36);
    addRecord ? $.addListener($.__views.__alloyId36, "click", addRecord) : __defers["$.__views.__alloyId36!click!addRecord"] = true;
    $.__views.__alloyId37 = Ti.UI.createView({
        backgroundColor: "#fff",
        top: 0,
        height: Ti.UI.SIZE,
        layout: "vertical",
        id: "__alloyId37"
    });
    $.__views.win.add($.__views.__alloyId37);
    $.__views.__alloyId38 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: Titanium.UI.FILL,
        backgroundColor: "#CE1D1C",
        id: "__alloyId38"
    });
    $.__views.__alloyId37.add($.__views.__alloyId38);
    $.__views.__alloyId39 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        color: "#ffffff",
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "Personal Information",
        id: "__alloyId39"
    });
    $.__views.__alloyId38.add($.__views.__alloyId39);
    $.__views.profile_data = Ti.UI.createView({
        id: "profile_data",
        layout: "vertical",
        top: 10,
        bottom: 10,
        height: Ti.UI.SIZE
    });
    $.__views.__alloyId37.add($.__views.profile_data);
    $.__views.__alloyId40 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: Titanium.UI.FILL,
        backgroundColor: "#CE1D1C",
        id: "__alloyId40"
    });
    $.__views.__alloyId37.add($.__views.__alloyId40);
    $.__views.__alloyId41 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        color: "#ffffff",
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "My Health Records",
        id: "__alloyId41"
    });
    $.__views.__alloyId40.add($.__views.__alloyId41);
    $.__views.__alloyId42 = Ti.UI.createImageView({
        width: Ti.UI.SIZE,
        image: "/images/white-add.png",
        height: 40,
        right: 0,
        id: "__alloyId42"
    });
    $.__views.__alloyId40.add($.__views.__alloyId42);
    openBox ? $.addListener($.__views.__alloyId42, "click", openBox) : __defers["$.__views.__alloyId42!click!openBox"] = true;
    $.__views.my_health = Ti.UI.createView({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "my_health",
        top: 10,
        bottom: 10
    });
    $.__views.__alloyId37.add($.__views.my_health);
    $.__views.__alloyId43 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "__alloyId43"
    });
    $.__views.my_health.add($.__views.__alloyId43);
    $.__views.__alloyId44 = Ti.UI.createView({
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        horizontalWrap: false,
        id: "__alloyId44"
    });
    $.__views.__alloyId43.add($.__views.__alloyId44);
    $.__views.firstTab = Ti.UI.createView({
        id: "firstTab",
        tab: 1,
        height: 40,
        width: "50%"
    });
    $.__views.__alloyId44.add($.__views.firstTab);
    switchListing ? $.addListener($.__views.firstTab, "click", switchListing) : __defers["$.__views.firstTab!click!switchListing"] = true;
    $.__views.__alloyId45 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#CE1D1C",
        font: {
            fontSize: 14
        },
        text: "Medication Records",
        v: "label",
        id: "__alloyId45"
    });
    $.__views.firstTab.add($.__views.__alloyId45);
    switchListing ? $.addListener($.__views.__alloyId45, "click", switchListing) : __defers["$.__views.__alloyId45!click!switchListing"] = true;
    $.__views.__alloyId46 = Ti.UI.createImageView({
        width: Ti.UI.SIZE,
        v: "label",
        height: 40,
        image: "/images/icons/dotted.png",
        id: "__alloyId46"
    });
    $.__views.__alloyId44.add($.__views.__alloyId46);
    $.__views.secondTab = Ti.UI.createView({
        tab: 2,
        id: "secondTab",
        height: 40,
        width: "50%"
    });
    $.__views.__alloyId44.add($.__views.secondTab);
    switchListing ? $.addListener($.__views.secondTab, "click", switchListing) : __defers["$.__views.secondTab!click!switchListing"] = true;
    $.__views.__alloyId47 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#606060",
        font: {
            fontSize: 14
        },
        text: "Allergic History",
        v: "label",
        id: "__alloyId47"
    });
    $.__views.secondTab.add($.__views.__alloyId47);
    switchListing ? $.addListener($.__views.__alloyId47, "click", switchListing) : __defers["$.__views.__alloyId47!click!switchListing"] = true;
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
    var profile = args.profile_data;
    var model = Alloy.createCollection("personal_info");
    var loading = Alloy.createController("loading");
    var personal_health_type = "Medication Records";
    addField("Corporate Name : ", profile.corpname, $.profile_data);
    addField("Name : ", profile.name, $.profile_data);
    addField("Member No : ", profile.memno, $.profile_data);
    addField("IC : ", profile.icno, $.profile_data);
    addField("Relation : ", profile.relation, $.profile_data);
    init();
    __defers["$.__views.__alloyId35!click!closeBox"] && $.addListener($.__views.__alloyId35, "click", closeBox);
    __defers["$.__views.__alloyId36!click!addRecord"] && $.addListener($.__views.__alloyId36, "click", addRecord);
    __defers["$.__views.__alloyId42!click!openBox"] && $.addListener($.__views.__alloyId42, "click", openBox);
    __defers["$.__views.firstTab!click!switchListing"] && $.addListener($.__views.firstTab, "click", switchListing);
    __defers["$.__views.__alloyId45!click!switchListing"] && $.addListener($.__views.__alloyId45, "click", switchListing);
    __defers["$.__views.secondTab!click!switchListing"] && $.addListener($.__views.secondTab, "click", switchListing);
    __defers["$.__views.__alloyId47!click!switchListing"] && $.addListener($.__views.__alloyId47, "click", switchListing);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;