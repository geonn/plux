function onErrorCallback(e) {
    var common = require("common");
    common.createAlert("Error", e);
}

var API_DOMAIN = "https://www.asp-medical-clinic.com/aida/";

var url_doLogin = API_DOMAIN + "login.aspx";

var url_panelList = API_DOMAIN + "panellist.aspx";

exports.doLogin = function() {
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            var ret = [];
            console.log(this.responseText);
            var res = JSON.parse(this.responseText);
            if (void 0 !== res.code) {
                ret["status"] = "error";
                ret["results"] = res;
                return ret;
            }
            ret["status"] = "success";
            ret["results"] = res;
            return ret;
        },
        onerror: function() {
            ret["status"] = "error";
            ret["results"] = "";
            return ret;
        },
        timeout: 5e4
    });
    client.open("GET", url);
    client.send();
};

exports.loadPanelList = function() {
    var url = "http://54.169.180.5/eqsport/jsonList.php";
    console.log(url);
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            var res = JSON.parse(this.responseText);
            var library = Alloy.createCollection("panelList");
            library.resetPanel();
            library.addPanel(res);
        },
        onerror: function() {},
        timeout: 5e4
    });
    client.open("GET", url);
    client.send();
};