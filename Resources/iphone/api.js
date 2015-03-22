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

exports.loadNewsFeed = function() {
    var url = "http://plux.freejini.com.my/api/grab_newsfeed?user=freejini&key=06b53047cf294f7207789ff5293ad2dc&date=01-01-2015";
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            var res = JSON.parse(this.responseText);
            var library = Alloy.createCollection("health_news_feed");
            library.resetPanel();
            library.addNews(res);
        },
        onerror: function() {},
        timeout: 5e4
    });
    client.open("GET", url);
    client.send();
};

exports.loadPanelList = function() {
    var url = "https://www.asp-medical-clinic.com.my/aida/panellist.aspx?CORPCODE=ASP";
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