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
        $.date.text = "Up to date " + timeFormat(updated_date);
        var groups = {};
        var balance_groups = {};
        for (var i = 0; i < e.length; i++) {
            var val = e[i];
            groups[val.name] = groups[val.name] || [];
            groups[val.name].push(val);
        }
        GenerateClaimBalanceTable(balance_groups);
        Object.keys(groups).map(function(group) {
            var personal_claim_view = Alloy.createController("asp/_personal_claim_view", {
                data: groups[group],
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
<<<<<<< HEAD
                        fontSize: "16dp"
=======
                        fontSize: "16sp"
>>>>>>> origin/master
                    },
                    width: "70%",
                    text: b
                });
                var label_balance_limit = $.UI.create("Label", {
                    height: Ti.UI.SIZE,
                    wordWrap: false,
                    ellipsize: true,
<<<<<<< HEAD
                    font: {
                        fontSize: "12dp"
                    },
=======
>>>>>>> origin/master
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
<<<<<<< HEAD
    $.__views.__alloyId122 = Ti.UI.createView({
        id: "__alloyId122"
    });
    $.__views.myClaim.rightNavButton = $.__views.__alloyId122;
=======
    $.__views.__alloyId126 = Ti.UI.createView({
        id: "__alloyId126"
    });
    $.__views.myClaim.rightNavButton = $.__views.__alloyId126;
>>>>>>> origin/master
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
<<<<<<< HEAD
    $.__views.__alloyId123 = Ti.UI.createLabel({
=======
    $.__views.__alloyId127 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "16sp"
        },
        top: "5",
        bottom: "5",
        text: "Loading",
        color: "#ffffff",
<<<<<<< HEAD
        id: "__alloyId123"
    });
    $.__views.loadingBar.add($.__views.__alloyId123);
    $.__views.__alloyId124 = Ti.UI.createView({
        layout: "vertical",
        backgroundColor: "#F6F6F6",
        height: "100%",
        id: "__alloyId124"
    });
    $.__views.myClaim.add($.__views.__alloyId124);
    $.__views.__alloyId125 = Ti.UI.createView({
=======
        id: "__alloyId127"
    });
    $.__views.loadingBar.add($.__views.__alloyId127);
    $.__views.__alloyId128 = Ti.UI.createView({
        layout: "vertical",
        backgroundColor: "#F6F6F6",
        height: "100%",
        id: "__alloyId128"
    });
    $.__views.myClaim.add($.__views.__alloyId128);
    $.__views.__alloyId129 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        height: "50",
        width: Ti.UI.FILL,
        backgroundColor: "#DEDEDE",
<<<<<<< HEAD
        id: "__alloyId125"
    });
    $.__views.__alloyId124.add($.__views.__alloyId125);
    $.__views.__alloyId126 = Ti.UI.createView({
        left: "0",
        width: "10%",
        id: "__alloyId126"
    });
    $.__views.__alloyId125.add($.__views.__alloyId126);
=======
        id: "__alloyId129"
    });
    $.__views.__alloyId128.add($.__views.__alloyId129);
    $.__views.__alloyId130 = Ti.UI.createView({
        left: "0",
        width: "10%",
        id: "__alloyId130"
    });
    $.__views.__alloyId129.add($.__views.__alloyId130);
>>>>>>> origin/master
    $.__views.btnBack = Ti.UI.createImageView({
        left: "10",
        id: "btnBack",
        width: "25",
        height: "25",
        image: "/images/btn-back.png"
    });
<<<<<<< HEAD
    $.__views.__alloyId126.add($.__views.btnBack);
=======
    $.__views.__alloyId130.add($.__views.btnBack);
>>>>>>> origin/master
    $.__views.pageTitle = Ti.UI.createView({
        id: "pageTitle",
        width: "90%"
    });
<<<<<<< HEAD
    $.__views.__alloyId125.add($.__views.pageTitle);
    $.__views.__alloyId127 = Ti.UI.createLabel({
=======
    $.__views.__alloyId129.add($.__views.pageTitle);
    $.__views.__alloyId131 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        font: {
            fontSize: "16dp"
        },
        text: "My Claim Details",
        textAlign: "center",
<<<<<<< HEAD
        id: "__alloyId127"
    });
    $.__views.pageTitle.add($.__views.__alloyId127);
    $.__views.__alloyId128 = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        id: "__alloyId128"
    });
    $.__views.__alloyId124.add($.__views.__alloyId128);
=======
        id: "__alloyId131"
    });
    $.__views.pageTitle.add($.__views.__alloyId131);
>>>>>>> origin/master
    $.__views.claimContainer = Ti.UI.createView({
        id: "claimContainer",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        visible: "false"
    });
    $.__views.__alloyId128.add($.__views.claimContainer);
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
<<<<<<< HEAD
=======
    $.__views.__alloyId132 = Ti.UI.createView({
        left: "10",
        right: "10",
        top: "10",
        bottom: "10",
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        id: "__alloyId132"
    });
    $.__views.main.add($.__views.__alloyId132);
    $.__views.view_balance = Ti.UI.createView({
        borderColor: "#000000",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        layout: "vertical",
        id: "view_balance"
    });
    $.__views.__alloyId132.add($.__views.view_balance);
>>>>>>> origin/master
    $.__views.verifyContainer = Ti.UI.createView({
        id: "verifyContainer",
        visible: "false",
        layout: "vertical"
    });
    $.__views.__alloyId128.add($.__views.verifyContainer);
<<<<<<< HEAD
    $.__views.__alloyId129 = Ti.UI.createImageView({
=======
    $.__views.__alloyId133 = Ti.UI.createImageView({
>>>>>>> origin/master
        width: "40%",
        borderRadius: "10",
        height: Ti.UI.SIZE,
        backgroundColor: "#ff0000",
        bottom: "30dp",
        top: "30dp",
        image: "/images/asp_logo.png",
<<<<<<< HEAD
        id: "__alloyId129"
    });
    $.__views.verifyContainer.add($.__views.__alloyId129);
=======
        id: "__alloyId133"
    });
    $.__views.verifyContainer.add($.__views.__alloyId133);
>>>>>>> origin/master
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
<<<<<<< HEAD
    $.__views.__alloyId130 = Ti.UI.createButton({
=======
    $.__views.__alloyId134 = Ti.UI.createButton({
>>>>>>> origin/master
        borderRadius: "5",
        backgroundColor: "#CE1D1C",
        title: "Resend Verification",
        width: "70%",
        top: "10",
        height: "40",
        color: "#ffffff",
<<<<<<< HEAD
        id: "__alloyId130"
    });
    $.__views.verifyContainer.add($.__views.__alloyId130);
    resendVerificationEmail ? $.__views.__alloyId130.addEventListener("touchend", resendVerificationEmail) : __defers["$.__views.__alloyId130!touchend!resendVerificationEmail"] = true;
    $.__views.__alloyId131 = Ti.UI.createButton({
=======
        id: "__alloyId134"
    });
    $.__views.verifyContainer.add($.__views.__alloyId134);
    resendVerificationEmail ? $.__views.__alloyId134.addEventListener("touchend", resendVerificationEmail) : __defers["$.__views.__alloyId134!touchend!resendVerificationEmail"] = true;
    $.__views.__alloyId135 = Ti.UI.createButton({
>>>>>>> origin/master
        borderRadius: "5",
        backgroundColor: "#7B7B7B",
        title: "Refresh",
        width: "70%",
        top: "10",
        height: "40",
        color: "#ffffff",
<<<<<<< HEAD
        id: "__alloyId131"
    });
    $.__views.verifyContainer.add($.__views.__alloyId131);
    checkStatus ? $.__views.__alloyId131.addEventListener("touchend", checkStatus) : __defers["$.__views.__alloyId131!touchend!checkStatus"] = true;
=======
        id: "__alloyId135"
    });
    $.__views.verifyContainer.add($.__views.__alloyId135);
    checkStatus ? $.__views.__alloyId135.addEventListener("touchend", checkStatus) : __defers["$.__views.__alloyId135!touchend!checkStatus"] = true;
>>>>>>> origin/master
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var usersModel = Alloy.createCollection("users");
    common.construct($);
    loadPage();
    Ti.App.addEventListener("data_loaded", init);
    $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.myClaim);
    });
<<<<<<< HEAD
    __defers["$.__views.__alloyId130!touchend!resendVerificationEmail"] && $.__views.__alloyId130.addEventListener("touchend", resendVerificationEmail);
    __defers["$.__views.__alloyId131!touchend!checkStatus"] && $.__views.__alloyId131.addEventListener("touchend", checkStatus);
=======
    __defers["$.__views.__alloyId134!touchend!resendVerificationEmail"] && $.__views.__alloyId134.addEventListener("touchend", resendVerificationEmail);
    __defers["$.__views.__alloyId135!touchend!checkStatus"] && $.__views.__alloyId135.addEventListener("touchend", checkStatus);
>>>>>>> origin/master
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;