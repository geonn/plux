function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function loadList(showDelete) {
        var data = [];
        var info_details = lib_health.getHealthAllListByType(gType);
        info_details.forEach(function(entry) {
            var row = Titanium.UI.createTableViewRow({
                touchEnabled: true,
                height: 45,
                source: entry.id,
                top: 10,
                bottom: 10,
                selectedBackgroundColor: "#FFE1E1"
            });
            if ("2" == showDelete) {
                var rmvBtn = Ti.UI.createImageView({
                    left: 5,
                    width: 20,
                    source: entry.id,
                    height: Ti.UI.SIZE,
                    image: "/images/btn-delete.png"
                });
                rmvBtn.addEventListener("click", function(re) {
                    lib_health.removeHealthDataById(re.rowData.source);
                    hd.populateData();
                    loadList("2");
                });
            }
            var heartLeft = 15;
            "2" == showDelete && (heartLeft = 35);
            var heartImg = Titanium.UI.createImageView({
                image: "/images/health_love.png",
                source: entry.id,
                width: 15,
                left: heartLeft
            });
            var bmiLeft = heartLeft + 40;
            var bmiLbl = Titanium.UI.createLabel({
                text: entry.amount,
                source: entry.id,
                left: bmiLeft,
                color: "#929292",
                selectedBackgroundColor: "#FFE1E1"
            });
            var datetimeLbl = Titanium.UI.createLabel({
                text: timeFormat(entry.date + " " + entry.time),
                source: entry.id,
                right: 15,
                color: "#929292",
                font: {
                    fontSize: 14
                },
                selectedBackgroundColor: "#FFE1E1"
            });
            "2" == showDelete && row.add(rmvBtn);
            row.add(heartImg);
            row.add(bmiLbl);
            row.add(datetimeLbl);
            data.push(row);
        });
        $.healthTableData.setData(data);
        common.hideLoading();
    }
    function doEditRecords() {
        loadList("2");
        $.doneButton.setVisible(true);
        $.editButton.setVisible(false);
    }
    function doDone() {
        loadList("1");
        $.editButton.setVisible(true);
        $.doneButton.setVisible(false);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "healthEditData";
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
    $.__views.healthEditData = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        title: "All Recorded Data",
        backButtonTitle: "",
        navTintColor: "#CE1D1C",
        id: "healthEditData"
    });
    $.__views.healthEditData && $.addTopLevelView($.__views.healthEditData);
    $.__views.__alloyId72 = Ti.UI.createView({
        id: "__alloyId72"
    });
    $.__views.editButton = Ti.UI.createButton({
        touchEnabled: true,
        id: "editButton",
        title: "Edit",
        right: "0",
        visible: "true"
    });
    $.__views.__alloyId72.add($.__views.editButton);
    doEditRecords ? $.__views.editButton.addEventListener("touchend", doEditRecords) : __defers["$.__views.editButton!touchend!doEditRecords"] = true;
    $.__views.doneButton = Ti.UI.createButton({
        touchEnabled: true,
        id: "doneButton",
        title: "Done",
        right: "0",
        visible: "false"
    });
    $.__views.__alloyId72.add($.__views.doneButton);
    doDone ? $.__views.doneButton.addEventListener("touchend", doDone) : __defers["$.__views.doneButton!touchend!doDone"] = true;
    $.__views.healthEditData.rightNavButton = $.__views.__alloyId72;
    $.__views.__alloyId73 = Ti.UI.createView({
        id: "__alloyId73"
    });
    $.__views.healthEditData.add($.__views.__alloyId73);
    $.__views.loadingBar = Ti.UI.createView({
        layout: "vertical",
        id: "loadingBar",
        height: "120",
        width: "120",
        borderRadius: "15",
        backgroundColor: "#2E2E2E"
    });
    $.__views.__alloyId73.add($.__views.loadingBar);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        style: Alloy.Globals.topbarTop,
        top: 30,
        left: 30,
        width: 60,
        id: "activityIndicator"
    });
    $.__views.loadingBar.add($.__views.activityIndicator);
    $.__views.__alloyId74 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        top: "5",
        text: "Loading",
        color: "#ffffff",
        id: "__alloyId74"
    });
    $.__views.loadingBar.add($.__views.__alloyId74);
    $.__views.main = Ti.UI.createScrollView({
        id: "main",
        height: Ti.UI.SIZE,
        layout: "vertical",
        backgroundColor: "#ffffff",
        top: "0"
    });
    $.__views.__alloyId73.add($.__views.main);
    $.__views.healthTableData = Ti.UI.createTableView({
        id: "healthTableData",
        height: Ti.UI.SIZE,
        width: "100%",
        scrollable: "false"
    });
    $.__views.main.add($.__views.healthTableData);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var gType = args.gType || 1;
    var hd = require("healthData");
    var lib_health = Alloy.createCollection("health");
    common.construct($);
    common.showLoading();
    loadList("1");
    __defers["$.__views.editButton!touchend!doEditRecords"] && $.__views.editButton.addEventListener("touchend", doEditRecords);
    __defers["$.__views.doneButton!touchend!doDone"] && $.__views.doneButton.addEventListener("touchend", doDone);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;