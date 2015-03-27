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

var loginUrl = "https://" + API_DOMAIN + "/login.aspx";

var checkBalanceUrl = "https://" + API_DOMAIN + "/balchk.aspx";

exports.doLogin = function(username, password, mainView, target) {
    var url = loginUrl + "?LOGINID=" + username + "&PASSWORD=" + password;
    console.log(url);
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            var result = JSON.parse(this.responseText);
            res = result[0];
            if (void 0 !== typeof res.message && null != res.message) common.createAlert("Error", res.message); else {
                var usersModel = Alloy.createCollection("users");
                Ti.App.Properties.setString("memno", res.memno);
                Ti.App.Properties.setString("empno", res.empno);
                Ti.App.Properties.setString("corpcode", res.corpcode);
                usersModel.addUserData(result);
                var nav = require("navigation");
                nav.closeWindow(mainView.login);
                nav.navigationWindow(target);
            }
        },
        onerror: function() {
            common.createAlert("Login Fail", "unexpected error");
        },
        timeout: 1e4
    });
    client.open("GET", url);
    client.send();
};

exports.claimInfo = function(e) {
    var url = checkBalanceUrl + "?MEMNO=" + e.memno + "&CORPCODE=" + e.corpcode;
    console.log(url);
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            var res = JSON.parse(this.responseText);
            void 0 !== typeof res[0].message && null != res[0].message ? common.createAlert(res[0].message) : Ti.UI.fireEvent("data_loaded", {
                data: res
            });
        },
        onerror: function() {
            API.claimInfo({
                memno: e.memno,
                corpcode: e.corpcode
            });
        },
        timeout: 5e3
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