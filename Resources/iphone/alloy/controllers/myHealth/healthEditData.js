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
        var theAmount;
        var loadType = gType;
        ("5" == loadType || "6" == loadType) && (loadType = "1");
        var info_details = lib_health.getHealthAllListByType(loadType);
        if (1 > info_details) {
            var row = Titanium.UI.createTableViewRow({
                touchEnabled: false,
                height: 100,
                bottom: 20,
                top: 20,
                selectedBackgroundColor: "#ffffff"
            });
            var noDataView = Titanium.UI.createView({
                height: Ti.UI.SIZE,
                width: Ti.UI.SIZE,
                layout: "vertical",
                bottom: 20
            });
            var noDataLbl = $.UI.create("Label", {
                text: "No records found",
                classes: [ "noData" ]
            });
            var addDataView = Titanium.UI.createButton({
                title: "Add Data",
                height: 40,
                width: 120,
                backgroundColor: "#CE1D1C",
                color: "#ffffff",
                top: 30,
                borderRadius: 5
            });
            noDataView.addEventListener("click", function() {
                hd.navigateGraph(gType);
                nav.closeWindow($.healthEditWindow);
            });
            noDataView.add(noDataLbl);
            noDataView.add(addDataView);
            row.add(noDataView);
            data.push(row);
            $.editButton.setVisible(false);
            $.healthTableData.setData(data);
            common.hideLoading();
            return false;
        }
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
                    console.log(re);
                    lib_health.removeHealthDataById("android" == Ti.Platform.osname ? re.source.source : re.rowData.source);
                    hd.loadInfo(gType, "", "1");
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
            theAmount = "2" == gType ? "Systolic : " + parseFloat(entry.field1) + "\r\nDiastolic : " + parseFloat(entry.field2) : "6" == gType ? parseFloat(entry.field1) + " kg" : "5" == gType ? 100 * parseFloat(entry.field2) + " cm" : entry.amount;
            var bmiLeft = heartLeft + 40;
            var bmiLbl = Titanium.UI.createLabel({
                text: theAmount,
                source: entry.id,
                left: bmiLeft,
                color: "#929292",
                font: {
                    fontSize: 14
                },
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
    this.__controllerPath = "myHealth/healthEditData";
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
    $.__views.healthEditWindow = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        title: "All Recorded Data",
        id: "healthEditWindow",
        backButtonTitle: "",
        navTintColor: "#CE1D1C"
    });
    $.__views.healthEditWindow && $.addTopLevelView($.__views.healthEditWindow);
    $.__views.__alloyId343 = Ti.UI.createView({
        id: "__alloyId343"
    });
    $.__views.editButton = Ti.UI.createButton({
        touchEnabled: true,
        id: "editButton",
        title: "Edit",
        right: "0",
        visible: "true"
    });
    $.__views.__alloyId343.add($.__views.editButton);
    doEditRecords ? $.addListener($.__views.editButton, "touchend", doEditRecords) : __defers["$.__views.editButton!touchend!doEditRecords"] = true;
    $.__views.doneButton = Ti.UI.createButton({
        touchEnabled: true,
        id: "doneButton",
        title: "Done",
        right: "0",
        visible: "false"
    });
    $.__views.__alloyId343.add($.__views.doneButton);
    doDone ? $.addListener($.__views.doneButton, "touchend", doDone) : __defers["$.__views.doneButton!touchend!doDone"] = true;
    $.__views.healthEditWindow.rightNavButton = $.__views.__alloyId343;
    $.__views.__alloyId344 = Ti.UI.createView({
        id: "__alloyId344"
    });
    $.__views.healthEditWindow.add($.__views.__alloyId344);
    $.__views.loadingBar = Ti.UI.createView({
        layout: "vertical",
        id: "loadingBar",
        height: "120",
        width: "120",
        borderRadius: "15",
        backgroundColor: "#2E2E2E"
    });
    $.__views.__alloyId344.add($.__views.loadingBar);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        top: 30,
        left: 30,
        width: 60,
        id: "activityIndicator"
    });
    $.__views.loadingBar.add($.__views.activityIndicator);
    $.__views.__alloyId345 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        top: "5",
        text: "Loading",
        color: "#ffffff",
        id: "__alloyId345"
    });
    $.__views.loadingBar.add($.__views.__alloyId345);
    $.__views.main = Ti.UI.createScrollView({
        id: "main",
        height: Ti.UI.FILL,
        contentHeight: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        contentWidth: Ti.UI.FILL,
        layout: "vertical",
        backgroundColor: "#ffffff",
        top: "0"
    });
    $.__views.__alloyId344.add($.__views.main);
    $.__views.healthTableData = Ti.UI.createTableView({
        id: "healthTableData",
        height: Ti.UI.SIZE,
        contentWidth: Ti.UI.FILL,
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
    "android" == Ti.Platform.osname && $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.healthEditWindow);
    });
    __defers["$.__views.editButton!touchend!doEditRecords"] && $.addListener($.__views.editButton, "touchend", doEditRecords);
    __defers["$.__views.doneButton!touchend!doDone"] && $.addListener($.__views.doneButton, "touchend", doDone);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;