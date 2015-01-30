var common = require("common");

exports.API_ClaimInfo = function(MEMNO, CORPCODE) {
    var url = API_DOMAIN + "balchk.aspx";
    var url = url + "?MEMNO=" + MEMNO + "&CORPCODE=" + CORPCODE;
    console.log(url);
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            var ret = [];
            var res = JSON.parse(this.responseText);
            res = res[0];
            console.log(res);
            if (void 0 !== typeof res.message && null != res.message) {
                ret["status"] = "error";
                ret["results"] = res;
                common.createAlert(res.message);
            } else Ti.UI.fireEvent("data_loaded", {
                data: res
            });
        },
        onerror: function() {
            common.createAlert("unexpected error");
        },
        timeout: 5e4
    });
    client.open("GET", url);
    client.send();
};