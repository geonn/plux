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
                width: 80,
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
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var gType = args.gType || 1;
    var hd = require("healthData");
    var lib_health = Alloy.createCollection("health");
    common.construct($);
    common.showLoading();
    loadList("1");
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;