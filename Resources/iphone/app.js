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

var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

var common = require("common");

var API = require("api");

var nav = require("navigation");

Alloy.Globals.Map = require("ti.map");

var API_DOMAIN = "https://www.asp-medical-clinic.com.my/aida/";

"android" == Ti.Platform.osname ? Alloy.Globals.loadingStyle = "Ti.UI.ActivityIndicatorStyle.BIG" : "iphone" == Ti.Platform.osname && (Alloy.Globals.topbarTop = "Ti.UI.iPhone.ActivityIndicatorStyle.BIG");

Alloy.createController("index");