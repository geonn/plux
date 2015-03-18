var common = require("common");

exports.checkLogin = function() {
    var memno = Ti.App.Properties.getString("memno");
    console.log("should have" + memno);
    return void 0 === typeof memno || null == memno ? false : true;
};

exports.doLogin = function(username, password, $, target) {
    var url_doLogin = API_DOMAIN + "login.aspx";
    var url = url_doLogin + "?LOGINID=" + username + "&PASSWORD=" + password;
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            console.log(this.responseText);
            var res = JSON.parse(this.responseText);
            res = res[0];
            if (void 0 !== typeof res.message && null != res.message) {
                Ti.App.Properties.setString("memno", "temp");
                var nav = require("navigation");
                nav.closeWindow($.login);
                nav.navigationWindow(target);
            } else {
                console.log("yes" + res.memno);
                Ti.App.Properties.setString("memno", res.memno);
                Ti.App.Properties.setString("empno", res.empno);
                Ti.App.Properties.setString("corpcode", res.corpcode);
                var nav = require("navigation");
                nav.closeWindow($.login);
                console.log("success login" + target);
                nav.navigationWindow(target);
            }
        },
        onerror: function() {
            common.createAlert("unexpected error");
        },
        timeout: 5e4
    });
    client.open("GET", url);
    client.send();
};