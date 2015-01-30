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

var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

var common = require("common");

var API = require("api");

Alloy.Globals.Map = require("ti.map");

var API_DOMAIN = "https://www.asp-medical-clinic.com.my/aida/";

"android" == Ti.Platform.osname ? Alloy.Globals.loadingStyle = "Ti.UI.ActivityIndicatorStyle.BIG" : "iphone" == Ti.Platform.osname && (Alloy.Globals.topbarTop = "Ti.UI.iPhone.ActivityIndicatorStyle.BIG");

Alloy.createController("index");