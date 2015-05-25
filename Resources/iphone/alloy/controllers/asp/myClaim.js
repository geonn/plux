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
        var e = JSON.parse(Ti.App.Properties.getString("balchk"));
        var updated_date = Ti.App.Properties.getString("balchkUpdatedDate");
        $.date.text = timeFormat(updated_date);
        var groups = {};
        var balance_groups = {};
        for (var i = 0; i < e.length; i++) {
            var val = e[i];
            if (val.entidvbal < 99999) {
                balance_groups["entidvbal"] = balance_groups["entidvbal"] || [];
                balance_groups["entidvbal"].push(val);
            }
            if (val.entshabal < 99999) {
                balance_groups["entshabal"] = balance_groups["entshabal"] || [];
                balance_groups["entshabal"].push(val);
            }
            if (val.vstidvbal < 99999) {
                balance_groups["vstidvbal"] = balance_groups["vstidvbal"] || [];
                balance_groups["vstidvbal"].push(val);
            }
            if (val.vstshabal < 99999) {
                balance_groups["vstshabal"] = balance_groups["vstshabal"] || [];
                balance_groups["vstshabal"].push(val);
            }
            groups[val.name] = groups[val.name] || [];
            groups[val.name].push(val);
        }
        GenerateClaimBalanceTable(balance_groups);
        Object.keys(groups).map(function(group) {
            var personal_claim_view = Alloy.createController("_person_claim_view", {
                claim_data: groups[group],
                name: group
            }).getView();
            $.main.add(personal_claim_view);
        });
        Ti.UI.removeEventListener("data_loaded", init);
        common.hideLoading();
    }
    function GenerateClaimBalanceTable(balance_groups) {
        var claim_balance_name = {
            entidvbal: "Claim Balance",
            entshabal: "Claim Shared Balance",
            vstidvbal: "Visitation Balance",
            vstshabal: "Visitation Shared Balance"
        };
        Object.keys(balance_groups).map(function(group) {
            var view_title = $.UI.create("View", {
                backgroundColor: "#CE1D1C",
                height: Ti.UI.SIZE,
                width: Ti.UI.FILL
            });
            var label_title = $.UI.create("Label", {
                classes: [ "title" ],
                color: "#ffffff",
                text: claim_balance_name[group]
            });
            view_title.add(label_title);
            $.view_balance.add(view_title);
            var tmp_group = {};
            for (var a = 0; balance_groups[group].length > a; a++) {
                tmp_group[balance_groups[group][a]["name"]] = tmp_group[balance_groups[group][a]["name"]] || [];
                tmp_group[balance_groups[group][a]["name"]].push(balance_groups[group][a]);
            }
            Object.keys(tmp_group).map(function(b) {
                var view_line = $.UI.create("View", {
                    classes: [ "line" ]
                });
                var label_name = $.UI.create("Label", {
                    classes: [ "padding" ],
                    wordWrap: false,
                    ellipsize: true,
                    text: b
                });
                $.view_balance.add(view_line);
                $.view_balance.add(label_name);
                for (var c = 0; tmp_group[b].length > c; c++) {
                    var view_category = $.UI.create("View", {
                        width: Ti.UI.FILL,
                        height: Ti.UI.SIZE,
                        layout: "horizontal"
                    });
                    var label_category = $.UI.create("Label", {
                        classes: [ "subtitle" ],
                        text: tmp_group[b][c]["benefittype"]
                    });
                    var label_amount = $.UI.create("Label", {
                        classes: [ "subvalue" ],
                        text: "RM " + tmp_group[b][c][group]
                    });
                    view_category.add(label_category);
                    view_category.add(label_amount);
                    $.view_balance.add(view_category);
                }
            });
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "asp/myClaim";
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
    $.__views.myClaim = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        title: "My Claim Details",
        backButtonTitle: "",
        navTintColor: "#CE1D1C",
        id: "myClaim"
    });
    $.__views.myClaim && $.addTopLevelView($.__views.myClaim);
<<<<<<< HEAD
    $.__views.__alloyId87 = Ti.UI.createView({
        id: "__alloyId87"
=======
    $.__views.__alloyId85 = Ti.UI.createView({
        id: "__alloyId85"
>>>>>>> origin/master
    });
    $.__views.myClaim.rightNavButton = $.__views.__alloyId85;
    $.__views.__alloyId86 = Ti.UI.createView({
        id: "__alloyId86"
    });
<<<<<<< HEAD
    $.__views.__alloyId87.add($.__views.setting);
    $.__views.myClaim.rightNavButton = $.__views.__alloyId87;
    $.__views.__alloyId88 = Ti.UI.createView({
        id: "__alloyId88"
    });
    $.__views.myClaim.add($.__views.__alloyId88);
=======
    $.__views.myClaim.add($.__views.__alloyId86);
>>>>>>> origin/master
    $.__views.loadingBar = Ti.UI.createView({
        layout: "vertical",
        id: "loadingBar",
        height: "120",
        width: "120",
        borderRadius: "15",
        backgroundColor: "#2E2E2E"
    });
<<<<<<< HEAD
    $.__views.__alloyId88.add($.__views.loadingBar);
=======
    $.__views.__alloyId86.add($.__views.loadingBar);
>>>>>>> origin/master
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        style: Alloy.Globals.topbarTop,
        top: 30,
        left: 30,
        width: 60,
        id: "activityIndicator"
    });
    $.__views.loadingBar.add($.__views.activityIndicator);
<<<<<<< HEAD
    $.__views.__alloyId89 = Ti.UI.createLabel({
=======
    $.__views.__alloyId87 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "16dp"
        },
        top: "5",
        text: "Loading",
        color: "#ffffff",
<<<<<<< HEAD
        id: "__alloyId89"
    });
    $.__views.loadingBar.add($.__views.__alloyId89);
=======
        id: "__alloyId87"
    });
    $.__views.loadingBar.add($.__views.__alloyId87);
>>>>>>> origin/master
    $.__views.main = Ti.UI.createScrollView({
        backgroundColor: "#ffffff",
        id: "main",
        layout: "vertical",
        scrollType: "vertical"
    });
<<<<<<< HEAD
    $.__views.__alloyId88.add($.__views.main);
=======
    $.__views.__alloyId86.add($.__views.main);
>>>>>>> origin/master
    $.__views.date = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "16dp"
        },
        color: "#ff0000",
        top: "10dp",
        id: "date"
    });
    $.__views.main.add($.__views.date);
<<<<<<< HEAD
    $.__views.__alloyId90 = Ti.UI.createView({
=======
    $.__views.__alloyId88 = Ti.UI.createView({
>>>>>>> origin/master
        left: "10",
        right: "10",
        top: "10",
        bottom: "10",
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
<<<<<<< HEAD
        id: "__alloyId90"
    });
    $.__views.main.add($.__views.__alloyId90);
=======
        id: "__alloyId88"
    });
    $.__views.main.add($.__views.__alloyId88);
>>>>>>> origin/master
    $.__views.view_balance = Ti.UI.createView({
        borderColor: "#000000",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        layout: "vertical",
        id: "view_balance"
    });
<<<<<<< HEAD
    $.__views.__alloyId90.add($.__views.view_balance);
=======
    $.__views.__alloyId88.add($.__views.view_balance);
>>>>>>> origin/master
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var usersModel = Alloy.createCollection("users");
    var user = usersModel.getOwnerData();
    API.claimInfo({
        memno: user.icno,
        corpcode: user.corpcode
    });
    API.getClaimDetail({
        empno: user.empno,
        corpcode: user.corpcode
    });
    common.construct($);
    common.showLoading();
    Ti.UI.addEventListener("data_loaded", init);
    $.view_balance.addEventListener("click", function() {
        var nav = require("navigation");
        nav.navigateWithArgs("asp/claimHistory", {
            memno: user.icno
        });
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;