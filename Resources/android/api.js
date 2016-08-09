function updateUserService(u_id, service_id, email, password) {
    var url = updateUserServiceUrl + "&u_id=" + u_id + "&service_id=" + service_id + "&email=" + email + "&password=" + password;
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            JSON.parse(this.responseText);
        },
        onerror: function() {},
        timeout: 6e4
    });
    client.open("GET", url);
    client.send();
}

function contactServerByGet(url) {
    var client = Ti.Network.createHTTPClient({
        timeout: 6e4
    });
    client.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    client.open("GET", url);
    client.send();
    return client;
}

function contactServerByPost(url, records) {
    var client = Ti.Network.createHTTPClient({
        timeout: 6e4
    });
    client.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    client.open("POST", url);
    client.send(records);
    return client;
}

function contactServerByPostImage(url, photo) {
    var client = Ti.Network.createHTTPClient({
        timeout: 5e4
    });
    client.open("POST", url);
    client.send({
        Filedata: photo
    });
    return client;
}

function onErrorCallback(e) {
    var common = require("common");
    common.createAlert("Error", e);
}

var API_DOMAIN = "appsapi.aspmedic.com/aida/";

var FREEJINI_DOMAIN = "plux.freejini.com.my";

var url_doLogin = API_DOMAIN + "login.aspx";

var url_panelList = API_DOMAIN + "panellist.aspx";

var USER = "freejini";

var KEY = "06b53047cf294f7207789ff5293ad2dc";

var checkAppVersionUrl = "http://" + FREEJINI_DOMAIN + "/api/checkAppVersion?user=" + USER + "&key=" + KEY;

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

var nearbyClinicUrl = "http://" + FREEJINI_DOMAIN + "/api/searchNearbyClinic?user=" + USER + "&key=" + KEY;

var doctorListUrl = "http://" + FREEJINI_DOMAIN + "/api/getDoctorList?user=" + USER + "&key=" + KEY;

var addAppointmentUrl = "http://" + FREEJINI_DOMAIN + "/api/addAppointment?user=" + USER + "&key=" + KEY;

var syncAppointmentUrl = "http://" + FREEJINI_DOMAIN + "/api/syncAppointmentData?user=" + USER + "&key=" + KEY;

var deleteAppointmentUrl = "http://" + FREEJINI_DOMAIN + "/api/deleteAppointment?user=" + USER + "&key=" + KEY;

var syncMedicalUrl = "http://" + FREEJINI_DOMAIN + "/api/syncMedicalRecords?user=" + USER + "&key=" + KEY;

var checkMedicalDataUrl = "http://" + FREEJINI_DOMAIN + "/api/checkMedicalData?user=" + USER + "&key=" + KEY;

var syncAttachmentssUrl = "http://" + FREEJINI_DOMAIN + "/api/syncMedicalAttachments?user=" + USER + "&key=" + KEY;

var getNotificationUrl = "http://" + FREEJINI_DOMAIN + "/api/getNotification?user=" + USER + "&key=" + KEY;

var deleteNotification = "http://" + FREEJINI_DOMAIN + "/api/deleteNotification?user=" + USER + "&key=" + KEY;

var suggestedAppointmentUrl = "http://" + FREEJINI_DOMAIN + "/api/suggestedAppointment?user=" + USER + "&key=" + KEY;

var deleteAttachmentUrl = "http://" + FREEJINI_DOMAIN + "/api/deleteAttachment?user=" + USER + "&key=" + KEY;

var changeMedicalRecord = "http://" + FREEJINI_DOMAIN + "/api/changeMedicalRecord?user=" + USER + "&key=" + KEY;

var addMessageUrl = "http://" + FREEJINI_DOMAIN + "/api/addMessage?user=" + USER + "&key=" + KEY;

var getDoctorByPanel = "http://" + FREEJINI_DOMAIN + "/api/getDoctorByPanel?user=" + USER + "&key=" + KEY;

var getSpecialtylist = "http://" + FREEJINI_DOMAIN + "/api/getSpecialtylist?user=" + USER + "&key=" + KEY;

var getDoctorPanelBySpecialty = "http://" + FREEJINI_DOMAIN + "/api/getDoctorPanelBySpecialty?user=" + USER + "&key=" + KEY;

var getDoctorPanel = "http://" + FREEJINI_DOMAIN + "/api/getAllDoctorPanel?user=" + USER + "&key=" + KEY;

var getWorkingHoursByDoctorPanel = "http://" + FREEJINI_DOMAIN + "/api/getWorkingHoursByDoctorPanel?user=" + USER + "&key=" + KEY;

var getHelplineMessage = "http://" + FREEJINI_DOMAIN + "/api/getHelplineMessage?user=" + USER + "&key=" + KEY;

var sendHelplineMessage = "http://" + FREEJINI_DOMAIN + "/api/sendHelplineMessage?user=" + USER + "&key=" + KEY;

var addFeedbackUrl = "http://" + FREEJINI_DOMAIN + "/api/addFeedback?user=" + USER + "&key=" + KEY;

var getAppointmentByDoctorPanel = "http://" + FREEJINI_DOMAIN + "/api/getAppointmentByDoctorPanel?user=" + USER + "&key=" + KEY;

var getClinicLocator2 = "http://" + FREEJINI_DOMAIN + "/api/getClinicLocator2?user=" + USER + "&key=" + KEY;

var getRoomId = "http://" + FREEJINI_DOMAIN + "/api/getRoomId?user=" + USER + "&key=" + KEY;

var dateNow = "http://plux.freejini.com.my/main/dateNow";

var getMedicalRecords = "http://" + FREEJINI_DOMAIN + "/api/getMedicalRecords?user=" + USER + "&key=" + KEY;

var addUpdateMedicalRecord = "http://" + FREEJINI_DOMAIN + "/api/addUpdateMedicalRecord?user=" + USER + "&key=" + KEY;

var getMedicalAttachment = "http://" + FREEJINI_DOMAIN + "/api/getMedicalAttachment?user=" + USER + "&key=" + KEY;

var addMedicalAttachment = "http://" + FREEJINI_DOMAIN + "/api/addMedicalAttachment?user=" + USER + "&key=" + KEY;

var deleteAttachment = "http://" + FREEJINI_DOMAIN + "/api/deleteAttachment?user=" + USER + "&key=" + KEY;

var getHealthDataByUser = "http://" + FREEJINI_DOMAIN + "/api/getHealthDataByUser?user=" + USER + "&key=" + KEY;

var panelList = "http://" + API_DOMAIN + "/panellist.aspx";

var loginUrl = "http://" + API_DOMAIN + "/login.aspx";

var changePasswordUrl = "http://" + API_DOMAIN + "/chgpwd.aspx";

var checkBalanceUrl = "http://" + API_DOMAIN + "/balchk.aspx";

var getClaimDetailUrl = "http://" + API_DOMAIN + "/claim.aspx";

var aspSignupUrl = "http://" + API_DOMAIN + "/signup.aspx";

var resendVerifUrl = "http://" + API_DOMAIN + "/sendveriemail.aspx";

var getclaimDetailBySeriesUrl = "http://" + API_DOMAIN + "/claimdetails.aspx";

var getclaimReimbUrl = "http://" + API_DOMAIN + "/ClaimReimb.aspx";

var aspPreSignupUrl = "http://" + API_DOMAIN + "/presignup.aspx";

var getclaimCategoryUrl = "http://" + API_DOMAIN + "/claimcategory.aspx";

var getclaimSubmissionUrl = "http://" + API_DOMAIN + "/ClaimSubmission.aspx";

var defaultRetryTimes = 3;

var APILoadingList = [ {
    url: getClinicLocator2,
    model: "panelList",
    checkId: "13"
}, {
    url: getDoctorPanel,
    model: "doctor_panel",
    checkId: "8"
}, {
    url: doctorListUrl,
    model: "doctors",
    checkId: "12"
} ];

exports.loadAPIBySequence = function(ex, counter) {
    counter = "undefined" == typeof counter ? 0 : counter;
    console.log(counter + " >= " + APILoadingList.length);
    if (counter >= APILoadingList.length) {
        console.log("loadAPIBySequence");
        Ti.App.fireEvent("app:loadingViewFinish");
        return false;
    }
    var api = APILoadingList[counter];
    var checker = Alloy.createCollection("updateChecker");
    var isUpdate = checker.getCheckerById(api["checkId"]);
    var last_updated = "";
    var model = Alloy.createCollection(api["model"]);
    "" != isUpdate && (last_updated = isUpdate.updated);
    var url = api["url"] + "&last_updated=" + last_updated;
    console.log(url);
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            var res = JSON.parse(this.responseText);
            console.log(res);
            if ("Success" == res.status || "success" == res.status) {
                var arr = res.data;
                model.saveArray(arr);
            }
            Ti.App.fireEvent("app:update_loading_text", {
                text: APILoadingList[counter]["model"] + " loading..."
            });
            checker.updateModule(APILoadingList[counter]["checkId"], APILoadingList[counter]["model"], res.last_updated);
            counter++;
            API.loadAPIBySequence(ex, counter);
        },
        onerror: function() {
            counter++;
            console.log("API getCategoryList fail, skip sync with server");
            API.loadAPIBySequence(ex, counter);
        },
        timeout: 7e4
    });
    client.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    client.open("POST", url);
    client.send();
};

exports.updateUserFromFB = function(e, mainView) {
    var url = updateUserFromFB + "&email=" + e.email + "&fbid=" + e.fbid + "&link=" + e.link + "&name=" + e.name + "&gender=" + e.gender;
    console.log("updateuserfromFB");
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            var res = JSON.parse(this.responseText);
            common.hideLoading();
            if ("success" == res.status) {
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
                API.updateNotificationToken();
                API.syncHealthData({
                    u_id: res.data.u_id
                });
                Ti.App.fireEvent("updateHeader");
                mainView.win.close();
                if ("undefined" != typeof Alloy.Globals.navMenu) {
                    console.log(typeof Alloy.Globals.navMenu);
                    nav.closeWindow(mainView.win);
                } else {
                    var win = Alloy.createController("home").getView();
                    win.open();
                }
            }
        },
        onerror: function() {},
        timeout: 7e4
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
        timeout: 6e4
    });
    client.open("GET", url);
    client.send();
};

exports.addAppointment = function(e, callback) {
    var url = addAppointmentUrl;
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            var res = JSON.parse(this.responseText);
            callback({
                param: res
            });
        },
        onerror: function() {},
        timeout: 5e4
    });
    client.open("POST", url);
    client.send(e.param);
};

exports.syncAppointmentData = function(callback) {
    var u_id = Ti.App.Properties.getString("u_id") || "";
    if ("" == u_id) return false;
    var url = syncAppointmentUrl + "&u_id=" + u_id;
    console.log(url + " appointment data");
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            var res = JSON.parse(this.responseText);
            callback({
                param: res
            });
        },
        onerror: function() {},
        timeout: 5e4
    });
    client.open("POST", url);
    client.send();
};

exports.checkMedicalDataSync = function(e, callback) {
    var u_id = Ti.App.Properties.getString("u_id") || "";
    if ("" == u_id) return false;
    var url = checkMedicalDataUrl + "&u_id=" + u_id;
    console.log(url);
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            var res = JSON.parse(this.responseText);
            callback({
                param: res
            });
        },
        onerror: function() {},
        timeout: 5e4
    });
    client.open("POST", url);
    client.send(e.param);
};

exports.syncAttachments = function(e, onload) {
    var u_id = Ti.App.Properties.getString("u_id") || "";
    if ("" == u_id) return false;
    var url = syncAttachmentssUrl;
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            onload && onload(this.responseText);
        },
        onerror: function() {},
        timeout: 5e5
    });
    client.open("POST", url);
    client.send(e.param);
};

exports.syncMedicalRecords = function(e, callback) {
    var u_id = Ti.App.Properties.getString("u_id") || "";
    if ("" == u_id) return false;
    var url = syncMedicalUrl;
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            var res = JSON.parse(this.responseText);
            callback({
                param: res
            });
        },
        onerror: function() {},
        timeout: 5e4
    });
    client.open("POST", url);
    client.send(e.param);
};

exports.deleteAppointment = function(id, callback) {
    var u_id = Ti.App.Properties.getString("u_id") || "";
    if ("" == u_id) return false;
    var url = deleteAppointmentUrl + "&id=" + id + "&status=5";
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            var res = JSON.parse(this.responseText);
            callback({
                param: res
            });
        },
        onerror: function() {},
        timeout: 5e4
    });
    client.open("GET", url);
    client.send();
};

exports.getNearbyClinic = function(e) {
    var url = nearbyClinicUrl + "&longitude=" + e.longitude + "&latitude=" + e.latitude + "&clinicType=" + e.clinicType;
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            var res = JSON.parse(this.responseText);
            "success" == res.status && Ti.App.fireEvent("updateNearbyList", {
                data: res.data
            });
        },
        onerror: function() {},
        timeout: 6e4
    });
    client.open("GET", url);
    client.send();
};

exports.checkAppVersion = function(callback_download) {
    var appVersion = Ti.App.Properties.getString("appVersion");
    var url = checkAppVersionUrl + "&appVersion=" + appVersion + "&appPlatform=android";
    console.log(url);
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            var result = JSON.parse(this.responseText);
            console.log(result);
            "error" == result.status && callback_download && callback_download(result);
        },
        onerror: function() {
            console.log("error check version");
        },
        timeout: 6e4
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
        timeout: 6e4
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
        timeout: 7e4
    });
    client.open("GET", url);
    client.send();
};

exports.do_pluxLogin = function(data) {
    var url = pluxLoginUrl + "&email=" + encodeURIComponent(data.email) + "&password=" + encodeURIComponent(data.password) + "&version=" + Ti.Platform.version + "&os=android&model=" + Ti.Platform.model + "&macaddress=" + Ti.Platform.macaddress;
    console.log(url);
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
                Ti.App.Properties.setString("asp_password", data.password);
            }
            API.updateNotificationToken();
            var win = Alloy.createController("home").getView();
            win.open();
        },
        onerror: function() {},
        timeout: 7e4
    });
    client.open("POST", url);
    client.send();
};

exports.do_signup = function(data, mainView) {
    var url = pluxSignUpUrl + "&fullname=" + data.fullname + "&email=" + data.email + "&password=" + data.password + "&password2=" + data.password;
    var params = {
        email: data.email,
        password: data.password
    };
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            var result = JSON.parse(this.responseText);
            common.hideLoading();
            if ("error" == result.status) {
                common.createAlert("Error", result.data);
                return false;
            }
            nav.closeWindow(mainView.win);
            Ti.App.fireEvent("loginAfterRegister", {
                params: params
            });
        },
        onerror: function() {},
        timeout: 7e4
    });
    client.open("GET", url);
    client.send();
};

exports.plux_signup = function(data, callback) {
    var url = pluxSignUpUrl + "&fullname=" + data.fullname + "&email=" + data.email + "&password=" + data.password + "&password2=" + data.password;
    ({
        email: data.email,
        password: data.password
    });
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            var result = JSON.parse(this.responseText);
            common.hideLoading();
            if ("error" == result.status) {
                common.createAlert("Error", result.data);
                return false;
            }
            Ti.App.Properties.setString("u_id", result.data.u_id);
            Ti.App.Properties.setString("plux_email", result.data.email);
            Ti.App.Properties.setString("asp_email", result.data.email);
            Ti.App.Properties.setString("asp_password", data.password);
            callback();
        },
        onerror: function() {},
        timeout: 7e4
    });
    client.open("GET", url);
    client.send();
};

exports.do_asp_presignup = function(data, mainView) {
    var url = aspPreSignupUrl + "?MEMNO=" + data.memno + "&EMPNO=" + data.empno;
    Ti.App.Properties.getString("u_id") || "";
    console.log(url);
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            var result = JSON.parse(this.responseText);
            res = result[0];
            if (void 0 !== typeof res.message && null != res.message) {
                common.createAlert("Error", res.message);
                common.hideLoading();
            } else {
                {
                    Alloy.createCollection("users");
                }
                Ti.App.Properties.setString("memno", res.memno);
                Ti.App.Properties.setString("empno", res.empno);
                Ti.App.Properties.setString("corpcode", res.corpcode);
                Ti.App.Properties.setString("corpname", res.corpname);
                Ti.App.Properties.setString("name", res.name);
                Ti.App.Properties.setString("signup2", "yes");
                common.hideLoading();
                nav.closeWindow(mainView.aspSignUpWin);
                var win = Alloy.createController("asp/signup2").getView();
                win.open();
            }
        },
        onerror: function(e) {
            common.createAlert("Sign Up Fail", e.error);
            common.hideLoading();
        },
        timeout: 6e4
    });
    client.open("GET", encodeURI(url));
    client.send();
};

exports.do_asp_signup = function(data, mainView) {
    var url = aspSignupUrl + "?EMAIL=" + data.email + "&EMAIL2=" + data.email2 + "&PASSWORD=" + data.password + "&NAME=" + data.name + "&MEMNO=" + data.memno + "&EMPNO=" + data.empno + "&MOBILENO=" + data.password + "&SMSME=1&AGREETS=" + data.agreets;
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
                usersModel.addUserData(result);
                Ti.App.Properties.setString("signup2", "");
                if ("" != u_id) {
                    console.log(u_id + " " + data.email + " " + data.password);
                    updateUserService(u_id, 1, data.email, data.password);
                } else {
                    var params = {
                        fullname: data.name,
                        email: data.email,
                        password: data.password,
                        agreets: 1
                    };
                    API.plux_signup(params, function() {
                        u_id = Ti.App.Properties.getString("u_id") || "";
                        console.log(u_id + " " + data.email + " " + data.password);
                        updateUserService(u_id, 1, data.email, data.password);
                    });
                }
                common.hideLoading();
                nav.closeWindow(mainView.aspSignUpWin);
                Ti.App.fireEvent("updateHeader");
                var win = Alloy.createController("home").getView();
                win.open();
            }
        },
        onerror: function(e) {
            common.createAlert("Sign Up Fail", e.error);
            common.hideLoading();
        },
        timeout: 6e4
    });
    client.open("GET", encodeURI(url));
    client.send();
};

exports.resendVerificationEmail = function() {
    var url = resendVerifUrl + "?LOGINID=" + Ti.App.Properties.getString("asp_email");
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            common.createAlert("Success", "Verification email sent!");
        },
        onerror: function() {
            common.createAlert("Error", "Unable connect to the server. Please try again later.");
            common.hideLoading();
        },
        timeout: 13e4
    });
    client.open("GET", encodeURI(url));
    client.send();
};

exports.doLogin = function(username, password, mainView, target) {
    var u_id = Ti.App.Properties.getString("u_id") || "";
    var url = loginUrl + "?LOGINID=" + encodeURIComponent(username) + "&PASSWORD=" + encodeURIComponent(password);
    console.log("asp login" + url);
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
                Ti.App.Properties.setString("asp_email", username);
                Ti.App.Properties.setString("asp_password", password);
                Ti.App.Properties.setString("cardno", res.cardno);
                updateUserService(u_id, 1, username, password);
                usersModel.addUserData(result);
                common.hideLoading();
                API.updateNotificationToken();
                if ("refresh" != target) {
                    nav.closeWindow(mainView.aspLoginWin);
                    Ti.App.fireEvent("updateHeader");
                    "" != target && "home" != target && nav.navigationWindow(target);
                } else Ti.App.fireEvent("loadPage");
                API.loadPanelList({
                    clinicType: ""
                });
            }
        },
        onerror: function() {
            common.createAlert("Error", "Unable connect to the server. Please try again later.");
            common.hideLoading();
        },
        timeout: 7e4
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
            common.createAlert("Error", "Unable connect to the server. Please try again later.");
            common.hideLoading();
        },
        timeout: 6e4
    });
    client.open("GET", encodeURI(url));
    client.send();
};

exports.claimDetailBySeries = function(e) {
    var url = getclaimDetailBySeriesUrl + "?SERIAL=" + e.serial;
    var retryTimes = "undefined" != typeof e.retryTimes ? e.retryTimes : defaultRetryTimes;
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
            if (0 !== retryTimes && Titanium.Network.online) {
                _.extend(e, {
                    retryTimes: retryTimes
                });
                API.claimDetailBySeries(e);
            } else Ti.App.fireEvent("load_claim_detail");
        },
        timeout: 7e4
    });
    client.open("GET", encodeURI(url));
    client.send();
};

exports.getClaimDetail = function(e) {
    var url = getClaimDetailUrl + "?EMPNO=" + e.empno + "&CORPCODE=" + e.corpcode + "&PERIOD=ALL";
    var retryTimes = "undefined" != typeof e.retryTimes ? e.retryTimes : defaultRetryTimes;
    console.log("getClaimDetail");
    console.log(url);
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            var res = JSON.parse(this.responseText);
            0 == res.length || ("undefined" != typeof res[0].message && null != res[0].message ? common.createAlert(res[0].message) : res.forEach(function(entry) {
                var claim_detail_model = Alloy.createCollection("claim_detail");
                claim_detail_model.save_claim_detail(entry.serial, entry.memno, entry.name, entry.relation, entry.cliniccode, entry.visitdate, entry.amount, entry.category, entry.mcdays, entry.clinicname, entry.status, entry.claimtype, entry.appcode);
            }));
        },
        onerror: function() {
            retryTimes--;
            0 !== retryTimes && Titanium.Network.online && API.getClaimDetail({
                empno: e.empno,
                corpcode: e.corpcode,
                retryTimes: retryTimes
            });
        },
        timeout: 7e4
    });
    client.open("GET", encodeURI(url));
    client.send();
};

exports.claimInfo = function(e) {
    var url = checkBalanceUrl + "?MEMNO=" + e.memno + "&CORPCODE=" + e.corpcode;
    var retryTimes = "undefined" != typeof e.retryTimes ? e.retryTimes : defaultRetryTimes;
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            var res = JSON.parse(this.responseText);
            if (void 0 !== typeof res[0].message && null != res[0].message) common.createAlert(res[0].message); else {
                Ti.App.Properties.setString("balchk", this.responseText);
                Ti.App.Properties.setString("balchkUpdatedDate", currentDateTime());
                Ti.App.fireEvent("data_loaded");
            }
        },
        onerror: function() {
            retryTimes--;
            0 !== retryTimes && Titanium.Network.online ? API.claimInfo({
                memno: e.memno,
                corpcode: e.corpcode,
                retryTimes: retryTimes
            }) : Ti.App.fireEvent("data_loaded");
        },
        timeout: 7e4
    });
    client.open("GET", encodeURI(url));
    client.send();
};

exports.updateNotificationToken = function() {
    var deviceToken = Ti.App.Properties.getString("deviceToken");
    var memno = Ti.App.Properties.getString("memno");
    var u_id = Ti.App.Properties.getString("u_id") || "";
    if ("" != deviceToken) {
        var url = updateToken + "&token=" + deviceToken + "&member_no=" + memno + "&u_id=" + u_id;
        var client = Ti.Network.createHTTPClient({
            onload: function() {
                var res = JSON.parse(this.responseText);
                "success" == res.status;
            },
            onerror: function() {},
            timeout: 6e4
        });
        client.open("GET", url);
        client.send();
    }
};

exports.loadLeaflet = function() {
    var url = leafletUrl;
    console.log(url);
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
        timeout: 6e4
    });
    client.open("GET", url);
    client.send();
};

exports.getDoctorList = function() {
    var url = doctorListUrl;
    console.log(url);
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            var res = JSON.parse(this.responseText);
            var doctorsModel = Alloy.createCollection("doctors");
            var info = res.data;
            doctorsModel.saveArray(info);
        },
        onerror: function() {},
        timeout: 6e4
    });
    client.open("GET", url);
    client.send();
};

exports.loadNewsFeed = function() {
    var url = newsfeed + "&date=01-01-2015";
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            var res = JSON.parse(String(this.responseText));
            var library = Alloy.createCollection("health_news_feed");
            var newElementModel = Alloy.createCollection("news_element");
            library.resetNews();
            newElementModel.resetNewsElement();
            library.addNews(res.data);
            var newsFe = res.data;
            newsFe.forEach(function(nf) {
                var elements = nf.element;
                elements.forEach(function(entry) {
                    var content = entry.content;
                    "" != content && null != content && (content = content.replace(/["']/g, "&quot;"));
                    var eleModel = Alloy.createModel("news_element", {
                        id: entry.id,
                        news_id: nf.id,
                        content: content,
                        type: entry.type,
                        images: entry.media,
                        position: entry.position
                    });
                    eleModel.save();
                });
            });
        },
        onerror: function() {},
        timeout: 6e4
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
        timeout: 6e4
    });
    client.open("GET", url);
    client.send();
};

exports.loadDoctorPanel = function() {
    var checker = Alloy.createCollection("updateChecker");
    var isUpdate = checker.getCheckerById("8");
    var last_updated = "";
    "" != isUpdate && (last_updated = isUpdate.updated);
    var url = getDoctorPanel + "&last_updated=";
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            var res = JSON.parse(this.responseText);
            if ("success" == res.status && ("" !== isUpdate || res.last_updated != isUpdate.updated)) {
                var library = Alloy.createCollection("doctor_panel");
                var arr = res.data;
                library.resetData();
                library.saveArray(arr);
            }
        },
        onerror: function() {},
        timeout: 6e4
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
                checker.updateModule("1", "clinicList", res.last_updated);
            }
        },
        onerror: function() {},
        timeout: 6e4
    });
    client.open("GET", url);
    client.send();
};

exports.loadPanelList = function(ex) {
    var corp = Ti.App.Properties.getString("corpcode");
    var url = panelList + "?CORPCODE=" + corp;
    console.log(url);
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            var res = JSON.parse(this.responseText);
            var library = Alloy.createCollection("panelList");
            var codeStr = "";
            res.cliniccode.forEach(function(entry) {
                codeStr += '"' + entry + '",';
            });
            codeStr = codeStr.substr(0, codeStr.length - 1);
            library.updatePanelList(codeStr);
            if ("" == ex.clinicType) {
                details = library.getPanelListCount(codeStr);
                details24 = library.getPanelListBy24Hours(codeStr);
                var det24 = {
                    clinicType: "hours24",
                    total: details24.length
                };
                details.push(det24);
            } else details = "hours24" == ex.clinicType ? library.getPanelListBy24Hours(codeStr) : library.getPanelListByCode(codeStr, ex.clinicType);
            Ti.App.fireEvent("aspClinic", {
                details: details
            });
        },
        onerror: function() {},
        timeout: 6e4
    });
    client.open("GET", encodeURI(url));
    client.send();
};

exports.callByGet = function(e, onload, onerror) {
    var url = eval(e.url) + "?" + e.params;
    console.log(url);
    var _result = contactServerByGet(encodeURI(url));
    _result.onload = function() {
        onload && onload(this.responseText);
    };
    _result.onerror = function() {
        onerror && onerror();
    };
};

exports.callByPostImage = function(e, onload, getParam) {
    var url = eval(e.url) + e.params;
    var _result = contactServerByPostImage(url, e.image || {});
    _result.onload = function() {
        onload && onload(this.responseText);
    };
    _result.onerror = function() {
        onerror && onerror();
    };
};

var callByPost_error_popup = false;

exports.callByPost = function(e, onload, onerror) {
    var retryTimes = "undefined" != typeof e.retryTimes ? e.retryTimes : defaultRetryTimes;
    var deviceToken = Ti.App.Properties.getString("deviceToken");
    if ("" != deviceToken) {
        var url = eval(e.url);
        console.log(url);
        console.log(e.params);
        var _result = contactServerByPost(url, e.params || {});
        _result.onload = function() {
            console.log("success callByPost");
            console.log(this.responseText);
            onload && onload(this.responseText);
        };
        _result.onerror = function() {
            if (0 !== retryTimes && Titanium.Network.online) {
                retryTimes--;
                _.extend(e, {
                    retryTimes: retryTimes
                });
                API.callByPost(e, onload, onerror);
            } else {
                if (!callByPost_error_popup) {
                    callByPost_error_popup = true;
                    common.createAlert("Error", "Unable connect to the server. Please try again later.", function() {
                        callByPost_error_popup = false;
                    });
                }
                onload('{"status":"error","error_message":"No internet connection."}');
            }
        };
    }
};