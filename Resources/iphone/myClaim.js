var common = require("common");

exports.API_ClaimInfo = function(MEMNO, CORPCODE) {
    var url = API_DOMAIN + "balchk.aspx";
    var url = url + "?MEMNO=" + MEMNO + "&CORPCODE=" + CORPCODE;
    console.log(url);
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            var res = JSON.parse(this.responseText);
            console.log(res[0].message);
            void 0 !== typeof res[0].message && null != res[0].message ? common.createAlert(res[0].message) : Ti.UI.fireEvent("data_loaded", {
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