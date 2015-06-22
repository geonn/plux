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
            $.description.text = "You need to verify your account in order to view claim details. If you didn't received verification email, please click 'Resend Verification' button below.";
            $.verifyContainer.show();
            $.claimContainer.hide();
        }
        Ti.App.removeEventListener("loadPage", loadPage);
    }
    function init() {
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
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var usersModel = Alloy.createCollection("users");
    var user = usersModel.getOwnerData();
    common.construct($);
    loadPage();
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