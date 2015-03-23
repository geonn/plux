function onErrorCallback(e) {
    var common = require("common");
    common.createAlert("Error", e);
}

var API_DOMAIN = "www.asp-medical-clinic.com.my/aida";

var FREEJINI_DOMAIN = "plux.freejini.com.my";

var url_doLogin = API_DOMAIN + "login.aspx";

var url_panelList = API_DOMAIN + "panellist.aspx";

var USER = "freejini";

var KEY = "06b53047cf294f7207789ff5293ad2dc";

var updateToken = "http://" + FREEJINI_DOMAIN + "/api/updateToken?user=" + USER + "&key=" + KEY;

var newsfeed = "http://" + FREEJINI_DOMAIN + "/api/grab_newsfeed?user=" + USER + "&key=" + KEY;

var panelList = "https://" + API_DOMAIN + "/panellist.aspx?CORPCODE=ASP";

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

exports.updateNotificationToken = function() {
    var deviceToken = Ti.App.Properties.getString("deviceToken");
    var memno = Ti.App.Properties.getString("memno");
    if ("" != deviceToken) {
        var url = updateToken + "&token=" + deviceToken + "&member_no=" + memno;
        console.log(url);
        var client = Ti.Network.createHTTPClient({
            onload: function() {
                var res = JSON.parse(this.responseText);
                "success" == res.status;
            },
            onerror: function() {},
            timeout: 5e4
        });
        client.open("GET", url);
        client.send();
    }
};

exports.loadNewsFeed = function() {
    var url = newsfeed + "&date=01-01-2015";
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
    var url = panelList;
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