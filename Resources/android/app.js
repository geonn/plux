function ucwords(str) {
    str = str.toLowerCase();
    return str.replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g, function($1) {
        return $1.toUpperCase();
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

function IsNumeric(input) {
    return input - 0 == input && ("" + input).trim().length > 0;
}

function convertToDBDateFormat(datetime) {
    var timeStamp = datetime.split(" ");
    var newFormat;
    var date = timeStamp[0].split("/");
    if (1 == timeStamp.length) newFormat = date[2] + "-" + date[1] + "-" + date[0]; else {
        var time = timeStamp[1].split(":");
        var hour = "pm" == timeStamp[2] ? 12 + parseInt(time[0]) : time[0];
        var min = time[1] || "00";
        var sec = time[2] || "00";
        newFormat = date[2] + "-" + date[1] + "-" + date[0] + " " + hour + ":" + min + ":" + sec;
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

function nl2br(str, is_xhtml) {
    str.replace(/\\n/g, "\\n").replace(/\\'/g, "\\'").replace(/\\"/g, '\\"').replace(/\\&/g, "\\&").replace(/\\r/g, "\\r").replace(/\\t/g, "\\t").replace(/\\b/g, "\\b").replace(/\\f/g, "\\f");
    return str;
}

function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
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

function monthFormat(datetime) {
    var monthNames = [ "Jan", "Feb", "Mar", "April", "May", "June", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
    var timeStamp = datetime.split(" ");
    var newFormat;
    var ampm = "am";
    var date = timeStamp[0].split("-");
    "08" == date[1] && (date[1] = "8");
    "09" == date[1] && (date[1] = "9");
    month = parseInt(date[1]) - 1;
    if (1 == timeStamp.length) newFormat = date[2] + " " + monthNames[month] + " " + date[0]; else {
        var time = timeStamp[1].split(":");
        if (time[0] > 12) {
            ampm = "pm";
            time[0] = time[0] - 12;
        }
        newFormat = date[2] + " " + monthNames[month] + " " + date[0] + ", " + time[0] + ":" + time[1] + " " + ampm;
    }
    return newFormat;
}

function removeAllChildren(viewObject) {
    var children = viewObject.children.slice(0);
    for (var i = 0; i < children.length; ++i) viewObject.remove(children[i]);
}

function parent(key, e) {
    if ("undefined" != typeof key.value) {
        if (eval("e." + key.name) == key.value) return e;
        if (eval("e.parent." + key.name) == key.value) return e.parent;
        if (eval("e.parent.parent." + key.name) == key.value) return e.parent.parent;
        console.log("key and value not match");
    } else {
        if ("undefined" != eval("typeof e." + key.name)) return eval("e." + key.name);
        if ("undefined" != eval("typeof e.parent." + key.name)) return eval("e.parent." + key.name);
        if ("undefined" != eval("typeof e.parent.parent." + key.name)) return eval("e.parent.parent." + key.name);
        console.log("key not found");
    }
}

function children(key, e) {
    if (eval("e." + key.name) == key.value) return e;
    for (var i = 0; i < e.children.length; i++) {
        if (eval("e.children[i]." + key.name) == key.value) return e.children[i];
        for (var a = 0; a < e.children[i].children.length; a++) {
            if (eval("e.children[i].children[a]." + key.name) == key.value) return e.children[i].children[a];
            for (var c = 0; c < e.children[i].children[a].children.length; c++) if (eval("e.children[i].children[a].children[c]." + key.name) == key.value) return e.children[i].children[a].children[c];
        }
    }
}

function createIndicator() {
    var style;
    style = Ti.UI.ActivityIndicatorStyle.DARK;
    var activityIndicator = Ti.UI.createActivityIndicator({
        color: "black",
        font: {
            fontFamily: "Helvetica Neue",
            fontSize: 12
        },
        message: "Loading...",
        style: style,
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE
    });
    return activityIndicator;
}

function popup(e) {
    var dialog = Ti.UI.createAlertDialog({
        cancel: 1,
        buttonNames: [ "Cancel", "OK" ],
        message: e.message,
        title: e.title
    });
    dialog.addEventListener("click", function(ex) {
        0 === ex.index || e.callback();
        message_popup = false;
    });
    if (!message_popup) {
        dialog.show();
        message_popup = true;
    }
}

function message_alert(e) {
    popup({
        message: "You got replied from helpdesk. Do you want to read now?",
        title: "Helpdesk replied",
        callback: function() {
            nav.navigateWithArgs("conversation");
        }
    });
}

function hinttextOnFocus(e) {
    e.source.value == e.source._hintText && (e.source.value = "");
}

function hinttextOnBlur(e) {
    "" == e.source.value && (e.source.value = e.source._hintText);
}

var Alloy = require("/alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

var _ = require("underscore")._;

var common = require("common");

var API = require("api");

var PUSH = require("push");

var nav = require("navigation");

var socket = require("socket");

var room_id = 0;

socket.addEventListener("socket:message_alert", message_alert);

Alloy.Globals.Map = require("ti.map");

var DBVersionControl = require("DBVersionControl");

DBVersionControl.checkAndUpdate();

var TouchId;

Alloy.Globals.Map = require("ti.map");

var FACEBOOK = require("facebook");

FACEBOOK.appid = "684687638302896";

FACEBOOK.permissions = [ "email", "public_profile", "user_friends" ];

FACEBOOK.initialize(1e3);

FACEBOOK.forceDialogAuth = true;

var API_DOMAIN = "https://www.asp-medical-clinic.com.my/aida/";

Titanium.App.addEventListener("resumed", function(e) {});

var message_popup = false;

Alloy.createController("index");