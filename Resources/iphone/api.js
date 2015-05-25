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

var categoryUrl = "http://" + FREEJINI_DOMAIN + "/api/getCategoryList?user=" + USER + "&key=" + KEY;

var leafletUrl = "http://" + FREEJINI_DOMAIN + "/api/getBrochure?user=" + USER + "&key=" + KEY;

var updateUserFromFB = "http://" + FREEJINI_DOMAIN + "/api/updateUserFromFB?user=" + USER + "&key=" + KEY;

var healthDataUrl = "http://" + FREEJINI_DOMAIN + "/api/syncHealthData?user=" + USER + "&key=" + KEY;

var removeHealthDataUrl = "http://" + FREEJINI_DOMAIN + "/api/removeHealthData?user=" + USER + "&key=" + KEY;

var panelList = "https://" + API_DOMAIN + "/panellist.aspx";

var loginUrl = "https://" + API_DOMAIN + "/login.aspx";

var checkBalanceUrl = "https://" + API_DOMAIN + "/balchk.aspx";

var getClaimDetailUrl = "https://" + API_DOMAIN + "/claim.aspx";

var aspSignupUrl = "https://" + API_DOMAIN + "/signup.aspx";

var getclaimDetailBySeriesUrl = "https://" + API_DOMAIN + "/claimdetails.aspx";

var defaultRetryTimes = 3;

exports.updateUserFromFB = function(e) {
    var url = updateUserFromFB + "&email=" + e.email + "&fbid=" + e.fbid + "&link=" + e.link + "&name=" + e.name + "&gender=" + e.gender;
    console.log(url);
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            var res = JSON.parse(this.responseText);
            if ("success" == res.status) {
                API.syncHealthData({
                    u_id: res.data.u_id
                });
                Ti.App.Properties.setString("u_id", res.data.u_id);
                Ti.App.Properties.setString("facebooklogin", 1);
                common.hideLoading();
            }
        },
        onerror: function() {},
        timeout: 7e3
    });
    client.open("GET", url);
    client.send();
};

exports.syncHealthData = function(e) {
    var healthModel = Alloy.createCollection("health");
    var records = healthModel.getHealthList();
    var url = healthDataUrl + "&u_id=" + e.u_id;
    var client = Ti.Network.createHTTPClient({
        onload: function() {},
        onerror: function() {},
        timeout: 6e3
    });
    client.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    client.open("POST", url);
    client.send({
        list: JSON.stringify(records)
    });
};

exports.removeHealthDataById = function(id) {
    var u_id = Ti.App.Properties.getString("u_id") || "";
    if ("" == u_id) return false;
    var url = removeHealthDataUrl + "&u_id=" + u_id + "&h_id=" + id;
    console.log(url);
    var client = Ti.Network.createHTTPClient({
        onload: function() {},
        onerror: function() {},
        timeout: 7e3
    });
    client.open("GET", url);
    client.send();
};

exports.do_signup = function() {};

exports.do_asp_signup = function(data) {
    var url = aspSignupUrl + "?EMAIL=" + data.email + "&PASSWORD=" + data.password + "&NAME=" + data.name + "&MEMNO=" + data.memno + "&EMPNO=" + data.empono + "&MOBILENO=" + data.password + "&SMSME=" + data.smsme + "&AGREETS=" + data.agreets + "&EMAIL2=";
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            var result = JSON.parse(this.responseText);
            res = result[0];
            console.log(res);
            if (void 0 !== typeof res.message && null != res.message) {
                common.createAlert("Error", res.message);
                common.hideLoading();
            } else {
                var usersModel = Alloy.createCollection("users");
                Ti.App.Properties.setString("memno", res.memno);
                Ti.App.Properties.setString("empno", res.empno);
                Ti.App.Properties.setString("corpcode", res.corpcode);
                usersModel.addUserData(result);
                common.hideLoading();
                nav.closeWindow(mainView.loginWin);
                Ti.App.fireEvent("updateHeader");
                "" != target && "home" != target && nav.navigationWindow(target);
            }
        },
        onerror: function() {
            common.createAlert("Sign Up Fail", "unexpected error");
            common.hideLoading();
        },
        timeout: 6e3
    });
    client.open("GET", url);
    client.send();
};

exports.doLogin = function(username, password, mainView, target) {
    var url = loginUrl + "?LOGINID=" + username + "&PASSWORD=" + password;
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            var result = JSON.parse(this.responseText);
            res = result[0];
            if (void 0 !== typeof res.message && null != res.message) {
                common.createAlert("Error", res.message);
                common.hideLoading();
            } else {
                var usersModel = Alloy.createCollection("users");
                Ti.App.Properties.setString("memno", res.memno);
                Ti.App.Properties.setString("empno", res.empno);
                Ti.App.Properties.setString("corpcode", res.corpcode);
                usersModel.addUserData(result);
                common.hideLoading();
                nav.closeWindow(mainView.loginWin);
                Ti.App.fireEvent("updateHeader");
                "" != target && "home" != target && nav.navigationWindow(target);
            }
        },
        onerror: function() {
            common.createAlert("Login Fail", "unexpected error");
            common.hideLoading();
        },
        timeout: 6e3
    });
    client.open("GET", url);
    client.send();
};

exports.claimDetailBySeries = function(e) {
    var url = getclaimDetailBySeriesUrl + "?SERIAL=" + e.serial;
    var retryTimes = defaultRetryTimes;
    console.log(url);
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            var res = JSON.parse(this.responseText);
            if (0 == res.length) ; else if ("undefined" != typeof res[0].message && null != res[0].message) {
                console.log("got error message");
                common.createAlert(res[0].message);
            } else res.forEach(function(entry) {
                var claim_detail_model = Alloy.createCollection("claim_detail");
                claim_detail_model.save_claim_extra_detail(entry.serial, entry.diagnosis, entry.consultation_amt, entry.medication, entry.medication_amt, entry.injection, entry.injection_amt, entry.labtest, entry.labtest_amt, entry.xray, entry.xray_amt, entry.surgical, entry.surgical_amt, entry.extraction_amt, entry.fillings_amt, entry.scaling_amt, entry.others_amt, entry.bps, entry.bpd, entry.pulse);
            });
            Ti.UI.fireEvent("load_claim_detail");
        },
        onerror: function() {
            retryTimes--;
            0 !== retryTimes ? API.claimDetailBySeries({
                serial: serial
            }) : Ti.UI.fireEvent("load_claim_detail");
        },
        timeout: 1e4
    });
    client.open("GET", url);
    client.send();
};

exports.getClaimDetail = function(e) {
    var url = getClaimDetailUrl + "?EMPNO=" + e.empno + "&CORPCODE=" + e.corpcode;
    console.log(url);
    var retryTimes = "undefined" != typeof e.retryTimes ? e.retryTimes : defaultRetryTimes;
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            var res = JSON.parse(this.responseText);
            if (0 == res.length) ; else if ("undefined" != typeof res[0].message && null != res[0].message) {
                console.log("got error message");
                common.createAlert(res[0].message);
            } else res.forEach(function(entry) {
                var claim_detail_model = Alloy.createCollection("claim_detail");
                claim_detail_model.save_claim_detail(entry.serial, entry.memno, entry.name, entry.relation, entry.cliniccode, entry.visitdate, entry.amount, entry.category, entry.mcdays, entry.clinicname);
            });
        },
        onerror: function() {
            retryTimes--;
            0 !== retryTimes ? API.getClaimDetail({
                empno: e.empno,
                corpcode: e.corpcode,
                retryTimes: retryTimes
            }) : Ti.UI.fireEvent("data_loaded");
        },
        timeout: 1e4
    });
    client.open("GET", url);
    client.send();
};

exports.claimInfo = function(e) {
    var url = checkBalanceUrl + "?MEMNO=" + e.memno + "&CORPCODE=" + e.corpcode;
    console.log(url);
    var retryTimes = "undefined" != typeof e.retryTimes ? e.retryTimes : defaultRetryTimes;
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            var res = JSON.parse(this.responseText);
            if (void 0 !== typeof res[0].message && null != res[0].message) common.createAlert(res[0].message); else {
                Ti.App.Properties.setString("balchk", this.responseText);
                Ti.App.Properties.setString("balchkUpdatedDate", currentDateTime());
                Ti.UI.fireEvent("data_loaded");
            }
        },
        onerror: function() {
            retryTimes--;
            0 !== retryTimes ? API.claimInfo({
                memno: e.memno,
                corpcode: e.corpcode,
                retryTimes: retryTimes
            }) : Ti.UI.fireEvent("data_loaded");
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

exports.loadLeaflet = function() {
    var url = leafletUrl;
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            var res = JSON.parse(this.responseText);
            var leafletModel = Alloy.createCollection("leaflet");
            leafletModel.resetBrouchure();
            var leaf = res.data;
            leaf.forEach(function(entry) {
                var lfModel = Alloy.createModel("leaflet", {
                    id: entry.b_id,
                    title: entry.b_title,
                    url: entry.b_url,
                    status: entry.b_status,
                    position: entry.b_position,
                    attachment: entry.attachment,
                    cover: entry.cover,
                    created: entry.b_created,
                    updated: entry.b_updated
                });
                lfModel.save();
            });
        },
        onerror: function() {},
        timeout: 5e4
    });
    client.open("GET", url);
    client.send();
};

exports.loadNewsFeed = function() {
    var url = newsfeed + "&date=01-01-2015";
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            var res = JSON.parse(this.responseText);
            var library = Alloy.createCollection("health_news_feed");
            var newElementModel = Alloy.createCollection("news_element");
            library.resetNews();
            newElementModel.resetNewsElement();
            library.addNews(res.data);
            var newsFe = res.data;
            newsFe.forEach(function(nf) {
                var elements = nf.element;
                elements.forEach(function(entry) {
                    var eleModel = Alloy.createModel("news_element", {
                        id: entry.id,
                        news_id: nf.id,
                        content: entry.content,
                        type: entry.type,
                        images: entry.media,
                        position: entry.position
                    });
                    eleModel.save();
                });
            });
        },
        onerror: function() {},
        timeout: 5e4
    });
    client.open("GET", url);
    client.send();
};

exports.loadCategoryList = function() {
    var url = categoryUrl;
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            var res = JSON.parse(this.responseText);
            var library = Alloy.createCollection("category");
            library.resetCategory();
            var arr = res.data;
            arr.forEach(function(entry) {
                var category = Alloy.createModel("category", {
                    id: entry.key,
                    category: entry.value
                });
                category.save();
            });
        },
        onerror: function() {},
        timeout: 5e4
    });
    client.open("GET", url);
    client.send();
};

exports.loadPanelList = function() {
    var corp = Ti.App.Properties.getString("corpcode");
    var url = panelList + "?CORPCODE=" + corp;
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