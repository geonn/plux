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
    if (1 == timeStamp.length) newFormat = date[2] + "/" + date[1] + "/" + date[0]; else {
        var time = timeStamp[1].split(":");
        if (time[0] > 12) {
            ampm = "pm";
            time[0] = time[0] - 12;
        }
        newFormat = date[2] + "/" + date[1] + "/" + date[0] + " " + time[0] + ":" + time[1] + " " + ampm;
    }
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

function resendVerificationEmail() {
    API.resendVerificationEmail();
}

function PixelsToDPUnits(ThePixels) {
    return ThePixels / (Titanium.Platform.displayCaps.dpi / 160);
}

function DPUnitsToPixels(TheDPUnits) {
    return TheDPUnits * (Titanium.Platform.displayCaps.dpi / 160);
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

var TouchId;

Alloy.Globals.Map = require("ti.map");

var FACEBOOK = require("facebook");

FACEBOOK.appid = "684687638302896";

FACEBOOK.permissions = [ "email", "public_profile", "user_friends" ];

FACEBOOK.initialize(1e3);

FACEBOOK.forceDialogAuth = true;

var API_DOMAIN = "https://www.asp-medical-clinic.com.my/aida/";

PUSH.registerPush();

Alloy.createController("index");