var common = require("common");

exports.goCreateAccount = function() {
    var page = Alloy.createController("register").getView();
    page.open();
    page.animate({
        curve: Ti.UI.ANIMATION_CURVE_EASE_IN,
        opacity: 1,
        duration: 300
    });
};

exports.doLogin = function(username, password) {
    var API_DOMAIN = "https://www.asp-medical-clinic.com/aida/";
    var url_doLogin = API_DOMAIN + "login.aspx";
    var url = url_doLogin + "?LOGINID=" + username + "&PASSWORD=" + password;
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            var ret = [];
            var dummy = '{"memno":"AGIL00005","icno":"AGIL00005","name":"KHAIRIL AZMY BIN MOHD AMINUDDIN","relation":"PRINCIPLE","empno":"00005","corpcode":"C001","corpname":"COMPANY DEMO (M) SDN BHD","costcenter":"","dept":""}';
            var res = JSON.parse(dummy);
            console.log(res);
            if (void 0 !== res.code) {
                ret["status"] = "error";
                ret["results"] = res;
                common.createAlert(res.message);
            } else {
                ret["status"] = "success";
                ret["results"] = res;
                common.createAlert(res.name);
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