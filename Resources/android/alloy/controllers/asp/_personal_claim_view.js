function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function generate_progressBar(filled) {
        var view_progressBar = $.UI.create("View", {
            classes: [ "progressBar" ]
        });
        var view_progressBarFill = $.UI.create("View", {
            classes: [ "progressBarFill" ],
            width: filled
        });
        view_progressBar.add(view_progressBarFill);
        return view_progressBar;
    }
    function generate_description(balance, limit) {
        var view_desc = $.UI.create("View", {
            classes: [ "wfill", "hsize", "horz" ]
        });
        var label_balance = $.UI.create("Label", {
            text: balance + "/" + limit
        });
        view_desc.add(label_balance);
        return view_desc;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "asp/_personal_claim_view";
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
    $.__views._personal_claim_view = Ti.UI.createView({
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "_personal_claim_view"
    });
    $.__views._personal_claim_view && $.addTopLevelView($.__views._personal_claim_view);
    $.__views.name = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#0c0e15",
        font: {
            fontSize: 18
        },
        id: "name",
        backgroundColor: "#fff",
        left: "10",
        top: "8",
        zIndex: "10"
    });
    $.__views._personal_claim_view.add($.__views.name);
    $.__views.more = Ti.UI.createButton({
        font: {
            fontSize: 10
        },
        title: "More",
        right: "10",
        id: "more",
        top: "0",
        zIndex: "10",
        width: "40dp",
        height: "40dp",
        borderRadius: "20",
        borderColor: "#af2120",
        backgroundColor: "#d2202c",
        color: "#ffffff"
    });
    $.__views._personal_claim_view.add($.__views.more);
    $.__views.main = Ti.UI.createView({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        borderRadius: "5",
        borderColor: "#dfe0e4",
        backgroundColor: "#FFFFFF",
        id: "main",
        top: "18"
    });
    $.__views._personal_claim_view.add($.__views.main);
    $.__views.__alloyId106 = Ti.UI.createView({
        height: "15",
        width: Ti.UI.FILL,
        id: "__alloyId106"
    });
    $.__views.main.add($.__views.__alloyId106);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    console.log(args);
    $.name.text = args.name;
    for (var i = 0; i < args.data.length; i++) {
        var view_container = $.UI.create("View", {
            classes: [ "padding", "wfill", "hsize", "vert" ],
            top: 5
        });
        var label_type = $.UI.create("Label", {
            classes: [ "font_medium" ],
            left: 0,
            text: args.data[i].benefittype
        });
        view_container.add(label_type);
        if (args.data[i].entidvbal < 99999) {
            var balance = Math.ceil((args.data[i].entidv - args.data[i].entidvbal) / args.data[i].entidv * 100);
            console.log(balance);
            view_container.add(generate_progressBar(balance + "%"));
            view_container.add(generate_description("Balance: RM " + args.data[i].entidvbal, args.data[i].entidv));
        }
        if (args.data[i].entshabal < 99999) {
            var share_balance = Math.ceil((args.data[i].entsha - args.data[i].entshabal) / args.data[i].entsha * 100);
            console.log(share_balance);
            view_container.add(generate_progressBar(share_balance + "%"));
            view_container.add(generate_description("Shared Balance: RM " + args.data[i].entshabal, args.data[i].entsha));
        }
        $.main.add(view_container);
    }
    $.more.addEventListener("click", function() {
        var nav = require("navigation");
        nav.navigateWithArgs("asp/claimHistory", {
            name: args.name
        });
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;