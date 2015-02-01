function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function init(e) {
        var d = new Date();
        var month = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
        $.date.text = d.getDate() + " " + month[d.getMonth()] + " " + d.getFullYear();
        console.log(e);
        var balanceData = [];
        var val = e.data;
        var principle_val = val.entidv;
        var balance = val.entidvbal;
        var claim_limit = balance + principle_val;
        balanceData = [ {
            properties: {
                title: "Principle",
                subtitle: String(principle_val.toFixed(2)),
                accessoryType: Titanium.UI.LIST_ACCESSORY_TYPE_DISCLOSURE
            }
        }, {
            properties: {
                title: "Optical",
                subtitle: "0.00",
                accessoryType: Titanium.UI.LIST_ACCESSORY_TYPE_DISCLOSURE
            }
        }, {
            properties: {
                title: "Dental",
                subtitle: "0.00",
                accessoryType: Titanium.UI.LIST_ACCESSORY_TYPE_DISCLOSURE
            }
        }, {
            properties: {
                title: "GP",
                subtitle: "0.00",
                accessoryType: Titanium.UI.LIST_ACCESSORY_TYPE_DISCLOSURE
            }
        } ];
        $.balance.setItems(balanceData);
        $.rm_value.text = balance.toFixed(2);
        $.claim_limit_value.text = claim_limit.toFixed(2);
        Ti.UI.removeEventListener("data_loaded", init);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "m_myClaim";
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
    $.__views.m_myClaim = Ti.UI.createWindow({
        fullscreen: true,
        title: "My Claim Details",
        backButtonTitle: "",
        navTintColor: "#CE1D1C",
        id: "m_myClaim"
    });
    $.__views.m_myClaim && $.addTopLevelView($.__views.m_myClaim);
    $.__views.main = Ti.UI.createView({
        backgroundColor: "#ffffff",
        id: "main",
        layout: "vertical"
    });
    $.__views.m_myClaim.add($.__views.main);
    $.__views.date = Ti.UI.createLabel({
        color: "#ff0000",
        font: {
            fontSize: "16dp"
        },
        height: Titanium.UI.SIZE,
        top: "10dp",
        id: "date"
    });
    $.__views.main.add($.__views.date);
    $.__views.balance_view = Ti.UI.createView({
        borderColor: "#cccccc",
        height: Titanium.UI.SIZE,
        top: "10dp",
        left: "10dp",
        right: "10dp",
        id: "balance_view"
    });
    $.__views.main.add($.__views.balance_view);
    $.__views.cb2_text = Ti.UI.createLabel({
        left: "10dp",
        top: "20dp",
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        wordWrap: true,
        font: {
            fontSize: "28dp"
        },
        text: "Current Balance :",
        id: "cb2_text"
    });
    $.__views.balance_view.add($.__views.cb2_text);
    $.__views.entitlement_text = Ti.UI.createLabel({
        left: "10dp",
        top: "53dp",
        bottom: "5dp",
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "18dp"
        },
        text: "Entitlement (RM)",
        id: "entitlement_text"
    });
    $.__views.balance_view.add($.__views.entitlement_text);
    $.__views.vs2_text = Ti.UI.createLabel({
        left: "10dp",
        top: "78dp",
        bottom: "20dp",
        width: "140dp",
        height: Titanium.UI.SIZE,
        wordWrap: true,
        font: {
            fontSize: "18dp"
        },
        text: "Visitation (Times)",
        id: "vs2_text"
    });
    $.__views.balance_view.add($.__views.vs2_text);
    $.__views.rm2_view = Ti.UI.createView({
        right: "10dp",
        top: "48dp",
        height: Titanium.UI.SIZE,
        width: Titanium.UI.SIZE,
        layout: "vertical",
        id: "rm2_view"
    });
    $.__views.balance_view.add($.__views.rm2_view);
    $.__views.rm_value = Ti.UI.createLabel({
        height: Titanium.UI.SIZE,
        width: Titanium.UI.SIZE,
        color: "#ff0000",
        font: {
            fontSize: "24dp"
        },
        text: "0.00",
        id: "rm_value"
    });
    $.__views.rm2_view.add($.__views.rm_value);
    $.__views.vs2_value = Ti.UI.createLabel({
        height: Titanium.UI.SIZE,
        width: Titanium.UI.SIZE,
        color: "#ff0000",
        right: 0,
        bottom: "5dp",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        font: {
            fontSize: "20dp"
        },
        text: "24",
        id: "vs2_value"
    });
    $.__views.rm2_view.add($.__views.vs2_value);
    $.__views.__alloyId173 = Ti.UI.createView({
        top: "10dp",
        left: "10dp",
        right: "10dp",
        height: Ti.UI.SIZE,
        bottom: "10dp",
        layout: "vertical",
        id: "__alloyId173"
    });
    $.__views.main.add($.__views.__alloyId173);
    $.__views.__alloyId174 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "__alloyId174"
    });
    $.__views.__alloyId173.add($.__views.__alloyId174);
    $.__views.__alloyId175 = Ti.UI.createLabel({
        text: "Claim Limit",
        left: "0",
        bottom: "5dp",
        id: "__alloyId175"
    });
    $.__views.__alloyId174.add($.__views.__alloyId175);
    $.__views.claim_limit_value = Ti.UI.createLabel({
        text: "0.00",
        right: "0",
        bottom: "5dp",
        id: "claim_limit_value"
    });
    $.__views.__alloyId174.add($.__views.claim_limit_value);
    $.__views.__alloyId176 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "__alloyId176"
    });
    $.__views.__alloyId173.add($.__views.__alloyId176);
    $.__views.__alloyId177 = Ti.UI.createLabel({
        text: "Limit per visit",
        left: "0",
        bottom: "10dp",
        id: "__alloyId177"
    });
    $.__views.__alloyId176.add($.__views.__alloyId177);
    $.__views.maxperclaim_value = Ti.UI.createLabel({
        text: "300",
        right: "0",
        bottom: "10dp",
        id: "maxperclaim_value"
    });
    $.__views.__alloyId176.add($.__views.maxperclaim_value);
    $.__views.__alloyId178 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: "1px",
        bottom: "0",
        backgroundColor: "#ff0000",
        id: "__alloyId178"
    });
    $.__views.__alloyId173.add($.__views.__alloyId178);
    $.__views.balance = Ti.UI.createListSection({
        id: "balance"
    });
    var __alloyId181 = [];
    __alloyId181.push($.__views.balance);
    $.__views.__alloyId179 = Ti.UI.createListView({
        sections: __alloyId181,
        defaultItemTemplate: Titanium.UI.LIST_ITEM_TEMPLATE_SETTINGS,
        id: "__alloyId179"
    });
    $.__views.main.add($.__views.__alloyId179);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    require("login");
    var method = require("myClaim");
    method.API_ClaimInfo("910128035500", "ASP");
    Ti.UI.addEventListener("data_loaded", init);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;