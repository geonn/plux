function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function loadPage() {
        user = usersModel.getOwnerData();
        if ("true" == user.isver) {
            console.log("show claim");
            common.showLoading();
            $.verifyContainer.hide();
            $.claimContainer.show();
            API.claimInfo({
                memno: user.icno,
                corpcode: user.corpcode
            });
            API.getClaimDetail({
                empno: user.empno,
                corpcode: user.corpcode
            });
        } else {
            common.hideLoading();
            $.description.text = "You need to verify your account in order to view claim details. If you didn't received verification email, please click 'Resend Verification' button below.";
            $.verifyContainer.show();
            $.claimContainer.hide();
        }
        Ti.App.removeEventListener("loadPage", loadPage);
    }
    function checkStatus() {
        var asp_email = Ti.App.Properties.getString("asp_email");
        var asp_password = Ti.App.Properties.getString("asp_password");
        if (asp_email) {
            Ti.App.addEventListener("loadPage", loadPage);
            common.showLoading();
            API.doLogin(asp_email, asp_password, $, "refresh");
        }
    }
    function init() {
        console.log("init");
        var e = JSON.parse(Ti.App.Properties.getString("balchk"));
        var updated_date = currentDateTime();
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
        Ti.App.removeEventListener("data_loaded", init);
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
                height: Titanium.UI.SIZE,
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
                var view_header = $.UI.create("View", {
                    width: Ti.UI.FILL,
                    height: Ti.UI.SIZE,
                    left: 10,
                    right: 10,
                    layout: "horizontal"
                });
                var label_name = $.UI.create("Label", {
                    height: Ti.UI.SIZE,
                    wordWrap: false,
                    ellipsize: true,
                    font: {
                        fontSize: "16dp"
                    },
                    width: "70%",
                    text: b
                });
                var label_balance_limit = $.UI.create("Label", {
                    height: Ti.UI.SIZE,
                    wordWrap: false,
                    ellipsize: true,
                    font: {
                        fontSize: "12dp"
                    },
                    width: "30%",
                    text: "balance / limit"
                });
                view_header.add(label_name);
                view_header.add(label_balance_limit);
                $.view_balance.add(view_line);
                $.view_balance.add(view_header);
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
    this.__controllerPath = "asp/myClaim_bak";
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
    $.__views.myClaim = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        title: "My Claim Details",
        id: "myClaim",
        backButtonTitle: "",
        navTintColor: "#CE1D1C"
    });
    $.__views.myClaim && $.addTopLevelView($.__views.myClaim);
    $.__views.__alloyId119 = Ti.UI.createView({
        id: "__alloyId119"
    });
    $.__views.myClaim.rightNavButton = $.__views.__alloyId119;
    $.__views.loadingBar = Ti.UI.createView({
        layout: "vertical",
        id: "loadingBar",
        height: "120",
        zIndex: "12",
        width: "120",
        borderRadius: "15",
        backgroundColor: "#2E2E2E"
    });
    $.__views.myClaim.add($.__views.loadingBar);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        top: 30,
        left: 30,
        width: 60,
        id: "activityIndicator"
    });
    $.__views.loadingBar.add($.__views.activityIndicator);
    $.__views.__alloyId120 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "16dp"
        },
        top: "5",
        bottom: "5",
        text: "Loading",
        color: "#ffffff",
        id: "__alloyId120"
    });
    $.__views.loadingBar.add($.__views.__alloyId120);
    $.__views.__alloyId121 = Ti.UI.createView({
        layout: "vertical",
        backgroundColor: "#F6F6F6",
        height: "100%",
        id: "__alloyId121"
    });
    $.__views.myClaim.add($.__views.__alloyId121);
    $.__views.__alloyId122 = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        id: "__alloyId122"
    });
    $.__views.__alloyId121.add($.__views.__alloyId122);
    $.__views.claimContainer = Ti.UI.createView({
        id: "claimContainer",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        visible: "false"
    });
    $.__views.__alloyId122.add($.__views.claimContainer);
    $.__views.main = Ti.UI.createScrollView({
        backgroundColor: "#ffffff",
        id: "main",
        layout: "vertical",
        scrollType: "vertical"
    });
    $.__views.claimContainer.add($.__views.main);
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
    $.__views.__alloyId123 = Ti.UI.createView({
        left: "10",
        right: "10",
        top: "10",
        bottom: "10",
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        id: "__alloyId123"
    });
    $.__views.main.add($.__views.__alloyId123);
    $.__views.view_balance = Ti.UI.createView({
        borderColor: "#000000",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        layout: "vertical",
        id: "view_balance"
    });
    $.__views.__alloyId123.add($.__views.view_balance);
    $.__views.verifyContainer = Ti.UI.createView({
        id: "verifyContainer",
        visible: "false",
        layout: "vertical"
    });
    $.__views.__alloyId122.add($.__views.verifyContainer);
    $.__views.__alloyId124 = Ti.UI.createImageView({
        width: "40%",
        borderRadius: "10",
        height: Ti.UI.SIZE,
        backgroundColor: "#ff0000",
        bottom: "30dp",
        top: "30dp",
        image: "/images/asp_logo.png",
        id: "__alloyId124"
    });
    $.__views.verifyContainer.add($.__views.__alloyId124);
    $.__views.description = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: "80dp",
        font: {
            fontSize: "16sp"
        },
        color: "#6E6E6E",
        bottom: "10dp",
        textAlign: "center",
        id: "description"
    });
    $.__views.verifyContainer.add($.__views.description);
    $.__views.__alloyId125 = Ti.UI.createButton({
        borderRadius: "5",
        backgroundColor: "#CE1D1C",
        title: "Resend Verification",
        width: "70%",
        top: "10",
        height: "40",
        color: "#ffffff",
        id: "__alloyId125"
    });
    $.__views.verifyContainer.add($.__views.__alloyId125);
    resendVerificationEmail ? $.__views.__alloyId125.addEventListener("touchend", resendVerificationEmail) : __defers["$.__views.__alloyId125!touchend!resendVerificationEmail"] = true;
    $.__views.__alloyId126 = Ti.UI.createButton({
        borderRadius: "5",
        backgroundColor: "#7B7B7B",
        title: "Refresh",
        width: "70%",
        top: "10",
        height: "40",
        color: "#ffffff",
        id: "__alloyId126"
    });
    $.__views.verifyContainer.add($.__views.__alloyId126);
    checkStatus ? $.__views.__alloyId126.addEventListener("touchend", checkStatus) : __defers["$.__views.__alloyId126!touchend!checkStatus"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var usersModel = Alloy.createCollection("users");
    var user = usersModel.getOwnerData();
    common.construct($);
    loadPage();
    Ti.App.addEventListener("data_loaded", init);
    $.view_balance.addEventListener("click", function() {
        var nav = require("navigation");
        nav.navigateWithArgs("asp/claimHistory", {
            memno: user.icno
        });
    });
    "android" == Ti.Platform.osname && $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.myClaim);
    });
    __defers["$.__views.__alloyId125!touchend!resendVerificationEmail"] && $.__views.__alloyId125.addEventListener("touchend", resendVerificationEmail);
    __defers["$.__views.__alloyId126!touchend!checkStatus"] && $.__views.__alloyId126.addEventListener("touchend", checkStatus);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;