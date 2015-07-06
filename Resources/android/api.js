function updateUserService(u_id, service_id, email, password) {
    var url = updateUserServiceUrl + "&u_id=" + u_id + "&service_id=" + service_id + "&email=" + email + "&password=" + password;
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            JSON.parse(this.responseText);
        },
        onerror: function() {},
        timeout: 5e4
    });
    client.open("GET", url);
    client.send();
}

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

var updateUserServiceUrl = "http://" + FREEJINI_DOMAIN + "/api/updateUserService?user=" + USER + "&key=" + KEY;

var getUserServiceUrl = "http://" + FREEJINI_DOMAIN + "/api/getUserService?user=" + USER + "&key=" + KEY;

var updateToken = "http://" + FREEJINI_DOMAIN + "/api/updateToken?user=" + USER + "&key=" + KEY;

var newsfeed = "http://" + FREEJINI_DOMAIN + "/api/grab_newsfeed?user=" + USER + "&key=" + KEY;

var categoryUrl = "http://" + FREEJINI_DOMAIN + "/api/getCategoryList?user=" + USER + "&key=" + KEY;

var leafletUrl = "http://" + FREEJINI_DOMAIN + "/api/getBrochure?user=" + USER + "&key=" + KEY;

var updateUserFromFB = "http://" + FREEJINI_DOMAIN + "/api/updateUserFromFB?user=" + USER + "&key=" + KEY;

var pluxLoginUrl = "http://" + FREEJINI_DOMAIN + "/api/pluxLogin?user=" + USER + "&key=" + KEY;

var pluxSignUpUrl = "http://" + FREEJINI_DOMAIN + "/api/pluxSignUp?user=" + USER + "&key=" + KEY;

var healthDataUrl = "http://" + FREEJINI_DOMAIN + "/api/syncHealthData?user=" + USER + "&key=" + KEY;

var removeHealthDataUrl = "http://" + FREEJINI_DOMAIN + "/api/removeHealthData?user=" + USER + "&key=" + KEY;

var clinicListUrl = "http://" + FREEJINI_DOMAIN + "/api/getClinicLocator?user=" + USER + "&key=" + KEY;

var panelList = "https://" + API_DOMAIN + "/panellist.aspx";

var loginUrl = "https://" + API_DOMAIN + "/login.aspx";

var changePasswordUrl = "https://" + API_DOMAIN + "/chgpwd.aspx";

var checkBalanceUrl = "https://" + API_DOMAIN + "/balchk.aspx";

var getClaimDetailUrl = "https://" + API_DOMAIN + "/claim.aspx";

var aspSignupUrl = "https://" + API_DOMAIN + "/signup.aspx";

var resendVerifUrl = "https://" + API_DOMAIN + "/sendveriemail.aspx";

var getclaimDetailBySeriesUrl = "https://" + API_DOMAIN + "/claimdetails.aspx";

var defaultRetryTimes = 3;

exports.updateUserFromFB = function(e, mainView) {
    var url = updateUserFromFB + "&email=" + e.email + "&fbid=" + e.fbid + "&link=" + e.link + "&name=" + e.name + "&gender=" + e.gender;
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            var res = JSON.parse(this.responseText);
            common.hideLoading();
            if ("success" == res.status) {
                API.syncHealthData({
                    u_id: res.data.u_id
                });
                var usersPluxModel = Alloy.createCollection("users_plux");
                usersPluxModel.addUserData({
                    u_id: res.data.u_id,
                    fullname: res.data.fullname,
                    email: res.data.email,
                    status: res.data.status,
                    facebook_id: res.data.facebook_id,
                    facebook_url: res.data.facebook_url,
                    last_login: currentDateTime()
                });
                if ("undefined" != typeof res.data.user_service) for (var i = 0; i < res.data.user_service.length; i++) if (1 == res.data.user_service[i].service_id) {
                    Ti.App.Properties.setString("asp_email", res.data.user_service[i].email);
                    Ti.App.Properties.setString("asp_password", res.data.user_service[i].password);
                }
                Ti.App.Properties.setString("u_id", res.data.u_id);
                Ti.App.Properties.setString("facebooklogin", 1);
                Ti.App.fireEvent("updateHeader");
                nav.closeWindow(mainView.loginWin);
            }
        },
        onerror: function() {},
        timeout: 7e3
    });
    client.open("GET", url);
    client.send();
};

exports.getUserService = function(e) {
    var url = getUserServiceUrl + "&u_id=" + e.u_id;
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            var res = JSON.parse(this.responseText);
            for (var i = 0; i < res.data.length; i++) if (1 == res.data[i].service_id) {
                Ti.App.Properties.setString("asp_email", res.data[i].email);
                Ti.App.Properties.setString("asp_password", res.data[i].password);
            }
        },
        onerror: function() {},
        timeout: 6e3
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
    var client = Ti.Network.createHTTPClient({
        onload: function() {},
        onerror: function() {},
        timeout: 7e3
    });
    client.open("GET", url);
    client.send();
};

exports.do_pluxLogin = function(data, mainView) {
    var url = pluxLoginUrl + "&email=" + data.email + "&password=" + data.password;
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            var result = JSON.parse(this.responseText);
            common.hideLoading();
            if ("error" == result.status) {
                common.createAlert("Error", result.data);
                return false;
            }
            var usersPluxModel = Alloy.createCollection("users_plux");
            usersPluxModel.addUserData({
                u_id: result.data.u_id,
                fullname: result.data.fullname,
                email: result.data.email,
                status: result.data.status,
                facebook_id: result.data.facebook_id,
                facebook_url: result.data.facebook_url,
                last_login: currentDateTime()
            });
            Ti.App.Properties.setString("u_id", result.data.u_id);
            Ti.App.Properties.setString("plux_email", result.data.email);
            if ("undefined" != typeof result.data.user_service) for (var i = 0; i < result.data.user_service.length; i++) if (1 == result.data.user_service[i].service_id) {
                Ti.App.Properties.setString("asp_email", result.data.user_service[i].email);
                Ti.App.Properties.setString("asp_password", result.data.user_service[i].password);
            }
            Ti.App.fireEvent("updateHeader");
            nav.closeWindow(mainView.loginWin);
        },
        onerror: function() {},
        timeout: 7e3
    });
    client.open("GET", url);
    client.send();
};

exports.do_signup = function(data, mainView) {
    var url = pluxSignUpUrl + "&fullname=" + data.fullname + "&email=" + data.email + "&password=" + data.password + "&password2=" + data.password;
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            var result = JSON.parse(this.responseText);
            common.hideLoading();
            if ("error" == result.status) {
                common.createAlert("Error", result.data);
                return false;
            }
            nav.closeWindow(mainView.signUpWin);
        },
        onerror: function() {},
        timeout: 7e3
    });
    client.open("GET", url);
    client.send();
};

exports.do_asp_signup = function(data, mainView) {
    var url = aspSignupUrl + "?EMAIL=" + data.email + "&EMAIL2=" + data.email2 + "&PASSWORD=" + data.password + "&NAME=" + data.name + "&MEMNO=" + data.memno + "&EMPNO=" + data.empno + "&MOBILENO=" + data.password + "&SMSME=" + data.smsme + "&AGREETS=" + data.agreets;
    var u_id = Ti.App.Properties.getString("u_id") || "";
    console.log(url);
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
                Ti.App.Properties.setString("asp_email", data.email);
                Ti.App.Properties.setString("asp_password", data.password);
                updateUserService(u_id, 1, data.email, data.password);
                usersModel.addUserData(result);
                common.hideLoading();
                nav.closeWindow(mainView.loginWin);
                Ti.App.fireEvent("updateHeader");
                nav.navigationWindow("home");
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

exports.resendVerificationEmail = function() {
    var url = resendVerifUrl + "?LOGINID=" + Ti.App.Properties.getString("asp_email");
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            common.createAlert("Success", "Verification email sent!");
        },
        onerror: function() {
            common.createAlert("Login Fail", "unexpected error");
            common.hideLoading();
        },
        timeout: 13e4
    });
    client.open("GET", url);
    client.send();
};

exports.doLogin = function(username, password, mainView, target) {
    var u_id = Ti.App.Properties.getString("u_id") || "";
    var url = loginUrl + "?LOGINID=" + username + "&PASSWORD=" + password;
    console.log("asp login" + url);
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
                Ti.App.Properties.setString("asp_email", username);
                Ti.App.Properties.setString("asp_password", password);
                updateUserService(u_id, 1, username, password);
                usersModel.addUserData(result);
                common.hideLoading();
                API.updateNotificationToken();
                if ("refresh" != target) {
                    nav.closeWindow(mainView.loginWin);
                    Ti.App.fireEvent("updateHeader");
                    "" != target && "home" != target && nav.navigationWindow(target);
                } else Ti.App.fireEvent("loadPage");
            }
        },
        onerror: function() {
            common.createAlert("Login Fail", "unexpected error");
            common.hideLoading();
        },
        timeout: 1e4
    });
    client.open("GET", url);
    client.send();
};

exports.doChangePassword = function(e, mainView) {
    var url = changePasswordUrl + "?LOGINID=" + e.username + "&NEW_PASSWORD=" + e.password;
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            var result = JSON.parse(this.responseText);
            res = result[0];
            if ("99" != res.code) {
                common.createAlert("Error", res.message);
                return false;
            }
            common.createAlert("Done", res.message);
            nav.closeWindow(mainView.changePasswordWin);
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
            0 == res.length || ("undefined" != typeof res[0].message && null != res[0].message ? common.createAlert(res[0].message) : res.forEach(function(entry) {
                var claim_detail_model = Alloy.createCollection("claim_detail");
                claim_detail_model.save_claim_extra_detail(entry.serial, entry.diagnosis, entry.consultation_amt, entry.medication, entry.medication_amt, entry.injection, entry.injection_amt, entry.labtest, entry.labtest_amt, entry.xray, entry.xray_amt, entry.surgical, entry.surgical_amt, entry.extraction_amt, entry.fillings_amt, entry.scaling_amt, entry.others_amt, entry.bps, entry.bpd, entry.pulse);
            }));
            Ti.App.fireEvent("load_claim_detail");
        },
        onerror: function() {
            retryTimes--;
            0 !== retryTimes ? API.claimDetailBySeries({
                serial: e.serial
            }) : Ti.App.fireEvent("load_claim_detail");
        },
        timeout: 1e4
    });
    client.open("GET", url);
    client.send();
};

exports.getClaimDetail = function(e) {
    var url = getClaimDetailUrl + "?EMPNO=" + e.empno + "&CORPCODE=" + e.corpcode + "&PERIOD=ALL";
    console.log("getClaimDetail : " + url);
    var retryTimes = "undefined" != typeof e.retryTimes ? e.retryTimes : defaultRetryTimes;
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            var res = JSON.parse(this.responseText);
            console.log(res);
            0 == res.length || ("undefined" != typeof res[0].message && null != res[0].message ? common.createAlert(res[0].message) : res.forEach(function(entry) {
                var claim_detail_model = Alloy.createCollection("claim_detail");
                claim_detail_model.save_claim_detail(entry.serial, entry.memno, entry.name, entry.relation, entry.cliniccode, entry.visitdate, entry.amount, entry.category, entry.mcdays, entry.clinicname, entry.status, entry.claimtype);
            }));
        },
        onerror: function(ex) {
            console.log(ex);
            retryTimes--;
            0 !== retryTimes && API.getClaimDetail({
                empno: e.empno,
                corpcode: e.corpcode,
                retryTimes: retryTimes
            });
        },
        timeout: 1e4
    });
    client.open("GET", url);
    client.send();
};

exports.claimInfo = function(e) {
    var url = checkBalanceUrl + "?MEMNO=" + e.memno + "&CORPCODE=" + e.corpcode;
    console.log("claim Info : " + url);
    var retryTimes = "undefined" != typeof e.retryTimes ? e.retryTimes : defaultRetryTimes;
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            var res = JSON.parse(this.responseText);
            console.log(res);
            if (void 0 !== typeof res[0].message && null != res[0].message) common.createAlert(res[0].message); else {
                Ti.App.Properties.setString("balchk", this.responseText);
                Ti.App.Properties.setString("balchkUpdatedDate", currentDateTime());
                Ti.App.fireEvent("data_loaded");
                console.log("fired");
            }
        },
        onerror: function() {
            retryTimes--;
            0 !== retryTimes ? API.claimInfo({
                memno: e.memno,
                corpcode: e.corpcode,
                retryTimes: retryTimes
            }) : Ti.App.fireEvent("data_loaded");
        },
        timeout: 1e4
    });
    client.open("GET", url);
    client.send();
};

exports.updateNotificationToken = function() {
    var deviceToken = Ti.App.Properties.getString("deviceToken");
    var memno = Ti.App.Properties.getString("memno");
    if ("" != deviceToken) {
        var url = updateToken + "&token=" + deviceToken + "&member_no=" + memno;
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

exports.loadClinicList = function() {
    var checker = Alloy.createCollection("updateChecker");
    var isUpdate = checker.getCheckerById("1");
    var last_updated = "";
    "" != isUpdate && (last_updated = isUpdate.updated);
    var url = clinicListUrl + "&last_updated=" + last_updated;
    console.log(url);
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            var res = JSON.parse(this.responseText);
            if ("success" == res.status && ("" !== isUpdate || res.last_updated != isUpdate.updated)) {
                var library = Alloy.createCollection("panelList");
                var arr = res.data;
                library.addPanel(arr);
                checker.updateModule("1", "clinicList", currentDateTime());
            }
        },
        onerror: function() {},
        timeout: 5e4
    });
    client.open("GET", url);
    client.send();
};

exports.loadPanelList = function(ex) {
    var corp = Ti.App.Properties.getString("corpcode");
    var url = panelList + "?CORPCODE=" + corp;
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            var res = JSON.parse(this.responseText);
            var library = Alloy.createCollection("panelList");
            var codeStr = "";
            res.forEach(function(entry) {
                codeStr += '"' + entry.cliniccode + '",';
            });
            codeStr = codeStr.substring(0, codeStr.length - 1);
            details = "" == ex.clinicType ? library.getPanelListCount(codeStr) : library.getPanelListByCode(codeStr, ex.clinicType);
            Ti.App.fireEvent("aspClinic", {
                details: details
            });
        },
        onerror: function() {},
        timeout: 5e4
    });
    client.open("GET", url);
    client.send();
};