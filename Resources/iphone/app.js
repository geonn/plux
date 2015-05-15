function countStep() {
    var starts = new Date(new Date().getTime() - 1e3);
    var ends = new Date();
    CoreMotion.queryStepCount({
        start: starts,
        end: ends
    }, function(e) {
        var gCurH = Ti.App.Properties.getString("curH") || "";
        var gStep = Ti.App.Properties.getString("step") || 0;
        gStep = parseInt(gStep);
        var myCur = currentDateTime();
        var d = myCur.split(":");
        d[0].split(" ");
        if (gCurH != d[1] || "" == gCurH) {
            if (gStep > 0) {
                var stepDateTime = Ti.App.Properties.getString("stepDateTime");
                if ("" != stepDateTime) {
                    var splitDT = stepDateTime.split(" ");
                    var splitTT = splitDT[1].split(":");
                    var lib_health = Alloy.createCollection("health");
                    lib_health.addHealthData({
                        date: splitDT[0],
                        time: splitTT[0] + ":" + splitTT[1] + ":00",
                        field1: "",
                        field2: "",
                        amount: gStep,
                        type: 10
                    });
                }
            }
            Ti.App.Properties.setString("step", "0");
            Ti.App.Properties.setString("curH", d[1]);
        }
        if (e.numberOfSteps > 0) {
            gStep += e.numberOfSteps;
            Ti.App.Properties.setString("stepDateTime", myCur);
            Ti.App.Properties.setString("curH", d[1]);
            Ti.App.Properties.setString("step", gStep);
        }
    });
}

function mysql_real_escape_string(str) {
    return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function(char) {
        switch (char) {
          case "\x00":
            return "\\0";

          case "\b":
            return "\\b";

          case "	":
            return "\\t";

          case "":
            return "\\z";

          case "\n":
            return "\\n";

          case "\r":
            return "\\r";

          case '"':
          case "'":
          case "\\":
          case "%":
            return "\\" + char;
        }
    });
}

function timeFormat(datetime) {
    var timeStamp = datetime.split(" ");
    var newFormat;
    var ampm = "am";
    var date = timeStamp[0].split("-");
    var time = timeStamp[1].split(":");
    if (time[0] > 12) {
        ampm = "pm";
        time[0] = time[0] - 12;
    }
    newFormat = date[2] + "/" + date[1] + "/" + date[0] + " " + time[0] + ":" + time[1] + " " + ampm;
    return newFormat;
}

function currentDateTime() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    var hours = today.getHours();
    var minutes = today.getMinutes();
    var sec = today.getSeconds();
    10 > minutes && (minutes = "0" + minutes);
    10 > sec && (sec = "0" + sec);
    10 > dd && (dd = "0" + dd);
    10 > mm && (mm = "0" + mm);
    datetime = yyyy + "-" + mm + "-" + dd + " " + hours + ":" + minutes + ":" + sec;
    return datetime;
}

function removeAllChildren(viewObject) {
    var children = viewObject.children.slice(0);
    for (var i = 0; i < children.length; ++i) viewObject.remove(children[i]);
}

var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

var common = require("common");

var API = require("api");

var PUSH = require("push");

var nav = require("navigation");

var CoreMotion = require("ti.coremotion");

Alloy.Globals.Map = require("ti.map");

var API_DOMAIN = "https://www.asp-medical-clinic.com.my/aida/";

CoreMotion.isStepCountingAvailable() ? CoreMotion.startStepCountingUpdates({
    stepCounts: 1
}, function() {
    setInterval(function() {
        countStep();
    }, 1e3);
}) : Ti.API.warn("This device does not support counting steps.");

Titanium.UI.iPhone.setAppBadge("0");

PUSH.registerPush();

Alloy.createController("index");