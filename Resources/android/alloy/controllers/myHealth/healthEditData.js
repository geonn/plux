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
                    lib_health.removeHealthDataById(re.source.source);
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
<<<<<<< HEAD
    $.__views.__alloyId521 = Ti.UI.createView({
        id: "__alloyId521"
=======
    $.__views.__alloyId523 = Ti.UI.createView({
        id: "__alloyId523"
>>>>>>> origin/master
    });
    $.__views.editButton = Ti.UI.createButton({
        touchEnabled: true,
        id: "editButton",
        title: "Edit",
        right: "0",
        visible: "true"
    });
<<<<<<< HEAD
    $.__views.__alloyId521.add($.__views.editButton);
=======
    $.__views.__alloyId523.add($.__views.editButton);
>>>>>>> origin/master
    doEditRecords ? $.addListener($.__views.editButton, "touchend", doEditRecords) : __defers["$.__views.editButton!touchend!doEditRecords"] = true;
    $.__views.doneButton = Ti.UI.createButton({
        touchEnabled: true,
        id: "doneButton",
        title: "Done",
        right: "0",
        visible: "false"
    });
<<<<<<< HEAD
    $.__views.__alloyId521.add($.__views.doneButton);
    doDone ? $.addListener($.__views.doneButton, "touchend", doDone) : __defers["$.__views.doneButton!touchend!doDone"] = true;
    $.__views.healthEditWindow.rightNavButton = $.__views.__alloyId521;
    $.__views.__alloyId522 = Ti.UI.createView({
        id: "__alloyId522"
    });
    $.__views.healthEditWindow.add($.__views.__alloyId522);
=======
    $.__views.__alloyId523.add($.__views.doneButton);
    doDone ? $.addListener($.__views.doneButton, "touchend", doDone) : __defers["$.__views.doneButton!touchend!doDone"] = true;
    $.__views.healthEditWindow.rightNavButton = $.__views.__alloyId523;
    $.__views.__alloyId524 = Ti.UI.createView({
        id: "__alloyId524"
    });
    $.__views.healthEditWindow.add($.__views.__alloyId524);
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
    $.__views.__alloyId522.add($.__views.loadingBar);
=======
    $.__views.__alloyId524.add($.__views.loadingBar);
>>>>>>> origin/master
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        top: 30,
        left: 30,
        width: 60,
        id: "activityIndicator"
    });
    $.__views.loadingBar.add($.__views.activityIndicator);
<<<<<<< HEAD
    $.__views.__alloyId523 = Ti.UI.createLabel({
=======
    $.__views.__alloyId525 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#ffffff",
        top: "5",
        text: "Loading",
<<<<<<< HEAD
        id: "__alloyId523"
    });
    $.__views.loadingBar.add($.__views.__alloyId523);
=======
        id: "__alloyId525"
    });
    $.__views.loadingBar.add($.__views.__alloyId525);
>>>>>>> origin/master
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
<<<<<<< HEAD
    $.__views.__alloyId522.add($.__views.main);
    $.__views.__alloyId524 = Ti.UI.createView({
=======
    $.__views.__alloyId524.add($.__views.main);
    $.__views.__alloyId526 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        height: "50",
        width: "100%",
        backgroundColor: "#DEDEDE",
<<<<<<< HEAD
        id: "__alloyId524"
    });
    $.__views.main.add($.__views.__alloyId524);
    $.__views.__alloyId525 = Ti.UI.createView({
        left: "0",
        width: "20%",
        id: "__alloyId525"
    });
    $.__views.__alloyId524.add($.__views.__alloyId525);
=======
        id: "__alloyId526"
    });
    $.__views.main.add($.__views.__alloyId526);
    $.__views.__alloyId527 = Ti.UI.createView({
        left: "0",
        width: "20%",
        id: "__alloyId527"
    });
    $.__views.__alloyId526.add($.__views.__alloyId527);
>>>>>>> origin/master
    $.__views.btnBack = Ti.UI.createImageView({
        left: "10",
        id: "btnBack",
        width: "25",
        height: "25",
        image: "/images/btn-back.png"
    });
<<<<<<< HEAD
    $.__views.__alloyId525.add($.__views.btnBack);
=======
    $.__views.__alloyId527.add($.__views.btnBack);
>>>>>>> origin/master
    $.__views.pageTitle = Ti.UI.createView({
        id: "pageTitle",
        width: "60%"
    });
<<<<<<< HEAD
    $.__views.__alloyId524.add($.__views.pageTitle);
    $.__views.__alloyId526 = Ti.UI.createLabel({
=======
    $.__views.__alloyId526.add($.__views.pageTitle);
    $.__views.__alloyId528 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#606060",
        font: {
            fontSize: "16dp"
        },
        text: "All Recorded Data",
        textAlign: "center",
<<<<<<< HEAD
        id: "__alloyId526"
    });
    $.__views.pageTitle.add($.__views.__alloyId526);
    $.__views.__alloyId527 = Ti.UI.createView({
        width: "20%",
        id: "__alloyId527"
    });
    $.__views.__alloyId524.add($.__views.__alloyId527);
=======
        id: "__alloyId528"
    });
    $.__views.pageTitle.add($.__views.__alloyId528);
    $.__views.__alloyId529 = Ti.UI.createView({
        width: "20%",
        id: "__alloyId529"
    });
    $.__views.__alloyId526.add($.__views.__alloyId529);
>>>>>>> origin/master
    $.__views.editButton = Ti.UI.createButton({
        font: {
            fontSize: "10dp"
        },
        color: "#000",
        touchEnabled: true,
        id: "editButton",
        title: "Edit",
        right: "0",
        visible: "true"
    });
<<<<<<< HEAD
    $.__views.__alloyId527.add($.__views.editButton);
=======
    $.__views.__alloyId529.add($.__views.editButton);
>>>>>>> origin/master
    doEditRecords ? $.addListener($.__views.editButton, "touchend", doEditRecords) : __defers["$.__views.editButton!touchend!doEditRecords"] = true;
    $.__views.doneButton = Ti.UI.createButton({
        font: {
            fontSize: "10dp"
        },
        color: "#000",
        touchEnabled: true,
        id: "doneButton",
        title: "Done",
        right: "0",
        visible: "false"
    });
<<<<<<< HEAD
    $.__views.__alloyId527.add($.__views.doneButton);
=======
    $.__views.__alloyId529.add($.__views.doneButton);
>>>>>>> origin/master
    doDone ? $.addListener($.__views.doneButton, "touchend", doDone) : __defers["$.__views.doneButton!touchend!doDone"] = true;
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
    $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.healthEditWindow);
    });
    __defers["$.__views.editButton!touchend!doEditRecords"] && $.addListener($.__views.editButton, "touchend", doEditRecords);
    __defers["$.__views.doneButton!touchend!doDone"] && $.addListener($.__views.doneButton, "touchend", doDone);
    __defers["$.__views.editButton!touchend!doEditRecords"] && $.addListener($.__views.editButton, "touchend", doEditRecords);
    __defers["$.__views.doneButton!touchend!doDone"] && $.addListener($.__views.doneButton, "touchend", doDone);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;