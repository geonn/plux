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
        var tableData = [];
        var balanceData = [];
        val = e.data;
        tableData = [ {
            properties: {
                title: "Member Name",
                subtitle: String(val.name)
            },
            template: Ti.UI.LIST_ITEM_TEMPLATE_SUBTITLE
        }, {
            properties: {
                title: "Member Number",
                subtitle: String(val.memno)
            },
            template: Ti.UI.LIST_ITEM_TEMPLATE_SUBTITLE
        }, {
            properties: {
                title: "Benefit Type",
                subtitle: String(val.benefittype)
            },
            template: Ti.UI.LIST_ITEM_TEMPLATE_SUBTITLE
        }, {
            properties: {
                title: "Relation",
                subtitle: String(val.relation)
            },
            template: Ti.UI.LIST_ITEM_TEMPLATE_SUBTITLE
        }, {
            properties: {
                title: "Maximum amount per claim",
                subtitle: String(val.maxperclaim)
            },
            template: Ti.UI.LIST_ITEM_TEMPLATE_SUBTITLE
        } ];
        balanceData = [ {
            properties: {
                title: "Entitlement (Individual) Balance",
                subtitle: String(val.entidvbal)
            },
            template: Ti.UI.LIST_ITEM_TEMPLATE_SUBTITLE
        }, {
            properties: {
                title: "Entitlement (Individual)",
                subtitle: String(val.entidv),
                accessoryType: Titanium.UI.LIST_ACCESSORY_TYPE_DISCLOSURE
            }
        }, {
            properties: {
                title: "Entitlement (Shared) Balance",
                subtitle: String(val.entshabal)
            },
            template: Ti.UI.LIST_ITEM_TEMPLATE_SUBTITLE
        }, {
            properties: {
                title: "Entitlement (Shared)",
                subtitle: String(val.entsha),
                accessoryType: Titanium.UI.LIST_ACCESSORY_TYPE_DISCLOSURE
            }
        }, {
            properties: {
                title: "Visitation Entitlment (Individual) Balance",
                subtitle: String(val.vstidvbal)
            },
            template: Ti.UI.LIST_ITEM_TEMPLATE_SUBTITLE
        }, {
            properties: {
                title: "Visitation Entitlment (Individual)",
                subtitle: String(val.vstidv),
                accessoryType: Titanium.UI.LIST_ACCESSORY_TYPE_DISCLOSURE
            }
        }, {
            properties: {
                title: "Visitation Entitlment (Shared) Balance",
                subtitle: String(val.vstshabal)
            },
            template: Ti.UI.LIST_ITEM_TEMPLATE_SUBTITLE
        }, {
            properties: {
                title: "Visitation Entitlment (Shared)",
                subtitle: String(val.vstsha),
                accessoryType: Titanium.UI.LIST_ACCESSORY_TYPE_DISCLOSURE
            }
        } ];
        $.info.setItems(tableData);
        $.balance.setItems(balanceData);
        Ti.UI.removeEventListener("data_loaded", init);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "m_profile";
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
    $.__views.m_profile = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        title: "My Claim Details",
        backButtonTitle: "",
        navTintColor: "#CE1D1C",
        id: "m_profile"
    });
    $.__views.m_profile && $.addTopLevelView($.__views.m_profile);
    $.__views.main = Ti.UI.createView({
        id: "main"
    });
    $.__views.m_profile.add($.__views.main);
    $.__views.info = Ti.UI.createListSection({
        id: "info",
        headerTitle: "Member Info"
    });
<<<<<<< HEAD
    var __alloyId311 = [];
    __alloyId311.push($.__views.info);
=======
    var __alloyId217 = [];
    __alloyId217.push($.__views.info);
>>>>>>> origin/master
    $.__views.balance = Ti.UI.createListSection({
        id: "balance",
        headerTitle: "Balance"
    });
<<<<<<< HEAD
    __alloyId311.push($.__views.balance);
    $.__views.__alloyId309 = Ti.UI.createListView({
        sections: __alloyId311,
        style: Titanium.UI.iPhone.ListViewStyle.GROUPED,
        defaultItemTemplate: Titanium.UI.LIST_ITEM_TEMPLATE_SUBTITLE,
        id: "__alloyId309"
    });
    $.__views.main.add($.__views.__alloyId309);
=======
    __alloyId217.push($.__views.balance);
    $.__views.__alloyId215 = Ti.UI.createListView({
        sections: __alloyId217,
        style: Titanium.UI.iPhone.ListViewStyle.GROUPED,
        defaultItemTemplate: Titanium.UI.LIST_ITEM_TEMPLATE_SUBTITLE,
        id: "__alloyId215"
    });
    $.__views.main.add($.__views.__alloyId215);
>>>>>>> origin/master
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