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
        u_id = Ti.App.Properties.getString("u_id") || "";
        $.email.value = Ti.App.Properties.getString("plux_email") || "";
        if ("" != u_id) {
            var usersPluxModel = Alloy.createCollection("users_plux");
            var plux_user = usersPluxModel.getUserById(u_id);
            $.name.value = plux_user.fullname;
        }
    }
    function submitFeedback() {
        var name = $.name.value;
        var email = $.email.value;
        var mobile = $.mobile.value;
        var comment = $.comment.value;
        if ("" == name) {
            common.createAlert("Error", "Please fill in your name");
            return false;
        }
        if ("" == email) {
            common.createAlert("Error", "Please fill in your email");
            return false;
        }
        if ("1" != validateEmail(email)) {
            common.createAlert("Error", "Please fill in an valid email");
            return false;
        }
        if ("" == mobile) {
            common.createAlert("Error", "Please fill in your mobile number");
            return false;
        }
        if (0 == IsNumeric(mobile)) {
            common.createAlert("Error", "Please fill in valid mobile number");
            return false;
        }
        if ("" == comment) {
            common.createAlert("Error", "Please fill in your feedback/comment");
            return false;
        }
        var params = "name=" + name + "&email=" + email + "&mobile=" + mobile + "&comment=" + comment + "&u_id=" + u_id;
        common.showLoading();
        API.callByPost({
            url: "addFeedbackUrl",
            params: params
        }, function(responseText) {
            var res = JSON.parse(responseText);
            if ("success" == res.status) {
                common.hideLoading();
                common.createAlert("Success", "Thanks for your feedback! ");
                $.win.close();
            } else common.hideLoading();
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "feedback";
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
        title: "Feedback",
        id: "win",
        backButtonTitle: "",
        navTintColor: "#CE1D1C"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.loadingBar = Ti.UI.createView({
        layout: "vertical",
        id: "loadingBar",
        height: 120,
        width: 120,
        borderRadius: 15,
        backgroundColor: "#2E2E2E"
    });
    $.__views.win.add($.__views.loadingBar);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
<<<<<<< HEAD
        top: 30,
=======
        top: 10,
>>>>>>> origin/master
        left: 30,
        width: 60,
        id: "activityIndicator"
    });
    $.__views.loadingBar.add($.__views.activityIndicator);
    $.__views.loading = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#ffffff",
        id: "loading",
        top: 5,
<<<<<<< HEAD
=======
        bottom: 10,
>>>>>>> origin/master
        text: "Loading"
    });
    $.__views.loadingBar.add($.__views.loading);
    $.__views.main = Ti.UI.createView({
        id: "main",
        layout: "vertical"
    });
    $.__views.win.add($.__views.main);
<<<<<<< HEAD
    $.__views.__alloyId127 = Ti.UI.createView({
=======
    $.__views.__alloyId128 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        height: 50,
        width: Ti.UI.FILL,
        backgroundColor: "#DEDEDE",
<<<<<<< HEAD
        id: "__alloyId127"
    });
    $.__views.main.add($.__views.__alloyId127);
    $.__views.__alloyId128 = Ti.UI.createView({
        left: 0,
        width: "10%",
        id: "__alloyId128"
    });
    $.__views.__alloyId127.add($.__views.__alloyId128);
=======
        id: "__alloyId128"
    });
    $.__views.main.add($.__views.__alloyId128);
    $.__views.__alloyId129 = Ti.UI.createView({
        left: 0,
        width: "10%",
        id: "__alloyId129"
    });
    $.__views.__alloyId128.add($.__views.__alloyId129);
>>>>>>> origin/master
    $.__views.btnBack = Ti.UI.createImageView({
        left: 10,
        id: "btnBack",
        width: 25,
        height: 25,
        image: "/images/btn-back.png"
    });
<<<<<<< HEAD
    $.__views.__alloyId128.add($.__views.btnBack);
    $.__views.__alloyId129 = Ti.UI.createView({
        width: "90%",
        id: "__alloyId129"
    });
    $.__views.__alloyId127.add($.__views.__alloyId129);
=======
    $.__views.__alloyId129.add($.__views.btnBack);
    $.__views.__alloyId130 = Ti.UI.createView({
        width: "90%",
        id: "__alloyId130"
    });
    $.__views.__alloyId128.add($.__views.__alloyId130);
>>>>>>> origin/master
    $.__views.pageTitle = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#606060",
        font: {
            fontSize: "16dp"
        },
        text: "Feedback",
        id: "pageTitle",
        textAlign: "center"
    });
<<<<<<< HEAD
    $.__views.__alloyId129.add($.__views.pageTitle);
    $.__views.__alloyId130 = Ti.UI.createLabel({
=======
    $.__views.__alloyId130.add($.__views.pageTitle);
    $.__views.__alloyId131 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Ti.UI.FILL,
        height: Titanium.UI.SIZE,
        color: "#606060",
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
        font: {
            fontSize: 14
        },
        text: "Please complete this form and submit to us.",
<<<<<<< HEAD
        id: "__alloyId130"
    });
    $.__views.main.add($.__views.__alloyId130);
=======
        id: "__alloyId131"
    });
    $.__views.main.add($.__views.__alloyId131);
>>>>>>> origin/master
    $.__views.table = Ti.UI.createScrollView({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "table",
        top: 10,
        bottom: 10,
        contentWidth: Ti.UI.FILL,
        contentHeight: Ti.UI.SIZE,
        backgroundColor: "#ffffff"
    });
    $.__views.main.add($.__views.table);
    $.__views.tvrName = Ti.UI.createView({
        id: "tvrName",
        height: Ti.UI.SIZE,
        layout: "vertical",
        selectedBackgroundColor: "#ffffff"
    });
    $.__views.table.add($.__views.tvrName);
<<<<<<< HEAD
    $.__views.__alloyId131 = Ti.UI.createView({
=======
    $.__views.__alloyId132 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: 45,
        textAlign: "right",
<<<<<<< HEAD
        id: "__alloyId131"
    });
    $.__views.tvrName.add($.__views.__alloyId131);
    $.__views.__alloyId132 = Ti.UI.createLabel({
=======
        id: "__alloyId132"
    });
    $.__views.tvrName.add($.__views.__alloyId132);
    $.__views.__alloyId133 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: "35%",
        height: Titanium.UI.SIZE,
        color: "#CE1D1C",
        font: {
            fontSize: 14
        },
        left: 10,
        text: "Name",
        top: 12,
<<<<<<< HEAD
        id: "__alloyId132"
    });
    $.__views.__alloyId131.add($.__views.__alloyId132);
=======
        id: "__alloyId133"
    });
    $.__views.__alloyId132.add($.__views.__alloyId133);
>>>>>>> origin/master
    $.__views.name = Ti.UI.createTextField({
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        height: "45dp",
        font: {
            fontSize: 12
        },
        borderWidth: "1px",
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        width: Ti.UI.FILL,
        backgroundColor: "#ffffff",
        borderColor: "#ffffff",
        id: "name",
        bottom: 5,
        right: 5,
        textAlign: "right",
        hintText: "Your name"
    });
<<<<<<< HEAD
    $.__views.__alloyId131.add($.__views.name);
    $.__views.__alloyId133 = Ti.UI.createView({
        backgroundColor: "#ececec",
        width: Ti.UI.FILL,
        height: 1,
        id: "__alloyId133"
    });
    $.__views.table.add($.__views.__alloyId133);
=======
    $.__views.__alloyId132.add($.__views.name);
    $.__views.__alloyId134 = Ti.UI.createView({
        backgroundColor: "#ececec",
        width: Ti.UI.FILL,
        height: 1,
        id: "__alloyId134"
    });
    $.__views.table.add($.__views.__alloyId134);
>>>>>>> origin/master
    $.__views.tvrEmail = Ti.UI.createView({
        id: "tvrEmail",
        height: Ti.UI.SIZE,
        layout: "vertical",
        selectedBackgroundColor: "#ffffff"
    });
    $.__views.table.add($.__views.tvrEmail);
<<<<<<< HEAD
    $.__views.__alloyId134 = Ti.UI.createView({
=======
    $.__views.__alloyId135 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: 45,
        textAlign: "right",
<<<<<<< HEAD
        id: "__alloyId134"
    });
    $.__views.tvrEmail.add($.__views.__alloyId134);
    $.__views.__alloyId135 = Ti.UI.createLabel({
=======
        id: "__alloyId135"
    });
    $.__views.tvrEmail.add($.__views.__alloyId135);
    $.__views.__alloyId136 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: "35%",
        height: Titanium.UI.SIZE,
        color: "#CE1D1C",
        font: {
            fontSize: 14
        },
        left: 10,
        text: "Email",
        top: 12,
<<<<<<< HEAD
        id: "__alloyId135"
    });
    $.__views.__alloyId134.add($.__views.__alloyId135);
=======
        id: "__alloyId136"
    });
    $.__views.__alloyId135.add($.__views.__alloyId136);
>>>>>>> origin/master
    $.__views.email = Ti.UI.createTextField({
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        height: "45dp",
        font: {
            fontSize: 12
        },
        borderWidth: "1px",
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        width: Ti.UI.FILL,
        backgroundColor: "#ffffff",
        borderColor: "#ffffff",
        id: "email",
        bottom: 5,
        right: 5,
        textAlign: "right",
        hintText: "Your email"
    });
<<<<<<< HEAD
    $.__views.__alloyId134.add($.__views.email);
    $.__views.__alloyId136 = Ti.UI.createView({
        backgroundColor: "#ececec",
        width: Ti.UI.FILL,
        height: 1,
        id: "__alloyId136"
    });
    $.__views.table.add($.__views.__alloyId136);
=======
    $.__views.__alloyId135.add($.__views.email);
    $.__views.__alloyId137 = Ti.UI.createView({
        backgroundColor: "#ececec",
        width: Ti.UI.FILL,
        height: 1,
        id: "__alloyId137"
    });
    $.__views.table.add($.__views.__alloyId137);
>>>>>>> origin/master
    $.__views.tvrMobile = Ti.UI.createView({
        id: "tvrMobile",
        height: Ti.UI.SIZE,
        layout: "vertical",
        selectedBackgroundColor: "#ffffff"
    });
    $.__views.table.add($.__views.tvrMobile);
<<<<<<< HEAD
    $.__views.__alloyId137 = Ti.UI.createView({
=======
    $.__views.__alloyId138 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: 45,
        textAlign: "right",
<<<<<<< HEAD
        id: "__alloyId137"
    });
    $.__views.tvrMobile.add($.__views.__alloyId137);
    $.__views.__alloyId138 = Ti.UI.createLabel({
=======
        id: "__alloyId138"
    });
    $.__views.tvrMobile.add($.__views.__alloyId138);
    $.__views.__alloyId139 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: "35%",
        height: Titanium.UI.SIZE,
        color: "#CE1D1C",
        font: {
            fontSize: 14
        },
        left: 10,
        text: "Mobile No.",
        top: 12,
<<<<<<< HEAD
        id: "__alloyId138"
    });
    $.__views.__alloyId137.add($.__views.__alloyId138);
=======
        id: "__alloyId139"
    });
    $.__views.__alloyId138.add($.__views.__alloyId139);
>>>>>>> origin/master
    $.__views.mobile = Ti.UI.createTextField({
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        height: "45dp",
        font: {
            fontSize: 12
        },
        borderWidth: "1px",
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        width: Ti.UI.FILL,
        backgroundColor: "#ffffff",
        borderColor: "#ffffff",
        id: "mobile",
        bottom: 5,
        right: 5,
        textAlign: "right",
        hintText: "Your mobile number"
    });
<<<<<<< HEAD
    $.__views.__alloyId137.add($.__views.mobile);
    $.__views.__alloyId139 = Ti.UI.createView({
        backgroundColor: "#ececec",
        width: Ti.UI.FILL,
        height: 1,
        id: "__alloyId139"
    });
    $.__views.table.add($.__views.__alloyId139);
=======
    $.__views.__alloyId138.add($.__views.mobile);
    $.__views.__alloyId140 = Ti.UI.createView({
        backgroundColor: "#ececec",
        width: Ti.UI.FILL,
        height: 1,
        id: "__alloyId140"
    });
    $.__views.table.add($.__views.__alloyId140);
>>>>>>> origin/master
    $.__views.tvrComment = Ti.UI.createView({
        id: "tvrComment",
        height: Ti.UI.SIZE,
        layout: "vertical",
        selectedBackgroundColor: "#ffffff"
    });
    $.__views.table.add($.__views.tvrComment);
<<<<<<< HEAD
    $.__views.__alloyId140 = Ti.UI.createView({
=======
    $.__views.__alloyId141 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "vertical",
        width: Ti.UI.FILL,
        height: 250,
        textAlign: "right",
<<<<<<< HEAD
        id: "__alloyId140"
    });
    $.__views.tvrComment.add($.__views.__alloyId140);
    $.__views.__alloyId141 = Ti.UI.createLabel({
=======
        id: "__alloyId141"
    });
    $.__views.tvrComment.add($.__views.__alloyId141);
    $.__views.__alloyId142 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: "100%",
        height: Titanium.UI.SIZE,
        color: "#CE1D1C",
        font: {
            fontSize: 14
        },
        left: 10,
        text: "Comment",
        top: 12,
<<<<<<< HEAD
        id: "__alloyId141"
    });
    $.__views.__alloyId140.add($.__views.__alloyId141);
=======
        id: "__alloyId142"
    });
    $.__views.__alloyId141.add($.__views.__alloyId142);
>>>>>>> origin/master
    $.__views.comment = Ti.UI.createTextArea({
        id: "comment",
        backgroundColor: "#F2F2F2",
        color: "#888",
        textAlign: "left",
        hintText: "Feedback",
        value: "",
        width: Ti.UI.FILL,
        left: 10,
        right: 10,
        height: 800,
        suppressReturn: false
    });
<<<<<<< HEAD
    $.__views.__alloyId140.add($.__views.comment);
    $.__views.__alloyId142 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        top: 10,
        id: "__alloyId142"
    });
    $.__views.table.add($.__views.__alloyId142);
=======
    $.__views.__alloyId141.add($.__views.comment);
    $.__views.__alloyId143 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        top: 10,
        id: "__alloyId143"
    });
    $.__views.table.add($.__views.__alloyId143);
>>>>>>> origin/master
    $.__views.saveBtn = Ti.UI.createButton({
        id: "saveBtn",
        title: "Submit Feedback",
        borderRadius: 5,
        backgroundColor: "#7B7B7B",
        width: "70%",
        height: 40,
        color: "#ffffff"
    });
<<<<<<< HEAD
    $.__views.__alloyId142.add($.__views.saveBtn);
=======
    $.__views.__alloyId143.add($.__views.saveBtn);
>>>>>>> origin/master
    submitFeedback ? $.addListener($.__views.saveBtn, "click", submitFeedback) : __defers["$.__views.saveBtn!click!submitFeedback"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.args;
    var u_id;
    common.construct($);
    init();
    $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.win);
    });
    __defers["$.__views.saveBtn!click!submitFeedback"] && $.addListener($.__views.saveBtn, "click", submitFeedback);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;