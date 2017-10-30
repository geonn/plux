function updateUserService(u_id, service_id, email, password) {
    var url = updateUserServiceUrl + "&u_id=" + u_id + "&service_id=" + service_id + "&email=" + email + "&password=" + password;
    var client = Ti.Network.createHTTPClient({
        onload: function(e) {
            JSON.parse(this.responseText);
        },
        onerror: function(e) {},
        timeout: 6e4
    });
    client.open("GET", url);
    client.send();
}

function contactServerByGet(url) {
    var client = Ti.Network.createHTTPClient({
        timeout: 1e4
    });
    client.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    client.open("GET", url);
    client.send();
    return client;
}

function contactServerByPostVideo(url, params) {
    var client = Ti.Network.createHTTPClient({
        timeout: 5e4
    });
    client.open("POST", url);
    client.onsendstream = function(e) {
        console.log(Math.floor(100 * e.progress) + "%");
    };
    client.send(params);
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

var checkAppVersionUrl = "https://" + FREEJINI_DOMAIN + "/api/checkAppVersion_v2?user=" + USER + "&key=" + KEY;

var updateUserServiceUrl = "https://" + FREEJINI_DOMAIN + "/api/updateUserService?user=" + USER + "&key=" + KEY;

var getUserServiceUrl = "https://" + FREEJINI_DOMAIN + "/api/getUserService?user=" + USER + "&key=" + KEY;

var updateToken = "https://" + FREEJINI_DOMAIN + "/api/updateToken?user=" + USER + "&key=" + KEY;

var grab_newsfeed = "https://" + FREEJINI_DOMAIN + "/api/grab_newsfeed?user=" + USER + "&key=" + KEY;

var getCategoryList = "https://" + FREEJINI_DOMAIN + "/api/getCategoryList?user=" + USER + "&key=" + KEY;

var leafletUrl = "https://" + FREEJINI_DOMAIN + "/api/getBrochure?user=" + USER + "&key=" + KEY;

var updateUserFromFB = "https://" + FREEJINI_DOMAIN + "/api/updateUserFromFB?user=" + USER + "&key=" + KEY;

var pluxLoginUrl = "https://" + FREEJINI_DOMAIN + "/api/pluxLogin?user=" + USER + "&key=" + KEY;

var pluxSignUpUrl = "https://" + FREEJINI_DOMAIN + "/api/pluxSignUp?user=" + USER + "&key=" + KEY;

var healthDataUrl = "https://" + FREEJINI_DOMAIN + "/api/syncHealthData?user=" + USER + "&key=" + KEY;

var removeHealthDataUrl = "https://" + FREEJINI_DOMAIN + "/api/removeHealthData?user=" + USER + "&key=" + KEY;

var clinicListUrl = "https://" + FREEJINI_DOMAIN + "/api/getClinicLocator?user=" + USER + "&key=" + KEY;

var nearbyClinicUrl = "https://" + FREEJINI_DOMAIN + "/api/searchNearbyClinic?user=" + USER + "&key=" + KEY;

var doctorListUrl = "https://" + FREEJINI_DOMAIN + "/api/getDoctorList?user=" + USER + "&key=" + KEY;

var addAppointmentUrl = "https://" + FREEJINI_DOMAIN + "/api/addAppointment?user=" + USER + "&key=" + KEY;

var syncAppointmentUrl = "https://" + FREEJINI_DOMAIN + "/api/syncAppointmentData?user=" + USER + "&key=" + KEY;

var deleteAppointmentUrl = "https://" + FREEJINI_DOMAIN + "/api/deleteAppointment?user=" + USER + "&key=" + KEY;

var syncMedicalUrl = "https://" + FREEJINI_DOMAIN + "/api/syncMedicalRecords?user=" + USER + "&key=" + KEY;

var checkMedicalDataUrl = "https://" + FREEJINI_DOMAIN + "/api/checkMedicalData?user=" + USER + "&key=" + KEY;

var syncAttachmentssUrl = "https://" + FREEJINI_DOMAIN + "/api/syncMedicalAttachments?user=" + USER + "&key=" + KEY;

var getNotificationUrl = "https://" + FREEJINI_DOMAIN + "/api/getNotification?user=" + USER + "&key=" + KEY;

var deleteNotification = "https://" + FREEJINI_DOMAIN + "/api/deleteNotification?user=" + USER + "&key=" + KEY;

var suggestedAppointmentUrl = "https://" + FREEJINI_DOMAIN + "/api/suggestedAppointment?user=" + USER + "&key=" + KEY;

var deleteAttachmentUrl = "https://" + FREEJINI_DOMAIN + "/api/deleteAttachment?user=" + USER + "&key=" + KEY;

var changeMedicalRecord = "https://" + FREEJINI_DOMAIN + "/api/changeMedicalRecord?user=" + USER + "&key=" + KEY;

var addMedicalAttachment = "https://" + FREEJINI_DOMAIN + "/api/addMedicalAttachment?user=" + USER + "&key=" + KEY;

var getCorpPermission = "https://" + FREEJINI_DOMAIN + "/api/getCorpPermission?user=" + USER + "&key=" + KEY;

var getMessage = "https://" + FREEJINI_DOMAIN + "/api/getMessage?user=" + USER + "&key=" + KEY;

var sendMessage = "https://" + FREEJINI_DOMAIN + "/api/sendMessage?user=" + USER + "&key=" + KEY;

var addMessageUrl = "https://" + FREEJINI_DOMAIN + "/api/addMessage?user=" + USER + "&key=" + KEY;

var getDoctorByPanel = "https://" + FREEJINI_DOMAIN + "/api/getDoctorByPanel?user=" + USER + "&key=" + KEY;

var getSpecialtylist = "https://" + FREEJINI_DOMAIN + "/api/getSpecialtylist?user=" + USER + "&key=" + KEY;

var getDoctorPanelBySpecialty = "https://" + FREEJINI_DOMAIN + "/api/getDoctorPanelBySpecialty?user=" + USER + "&key=" + KEY;

var getDoctorPanel = "https://" + FREEJINI_DOMAIN + "/api/getAllDoctorPanel?user=" + USER + "&key=" + KEY;

var getWorkingHoursByDoctorPanel = "https://" + FREEJINI_DOMAIN + "/api/getWorkingHoursByDoctorPanel?user=" + USER + "&key=" + KEY;

var getHelplineMessage = "https://" + FREEJINI_DOMAIN + "/api/getHelplineMessage?user=" + USER + "&key=" + KEY;

var getHelplineMessageV2 = "https://" + FREEJINI_DOMAIN + "/api/getHelplineMessageV2?user=" + USER + "&key=" + KEY;

var getHelplineMessageV3 = "https://" + FREEJINI_DOMAIN + "/api/getHelplineMessageV3?user=" + USER + "&key=" + KEY;

var sendHelplineMessage = "https://" + FREEJINI_DOMAIN + "/api/sendHelplineMessage?user=" + USER + "&key=" + KEY;

var addFeedbackUrl = "https://" + FREEJINI_DOMAIN + "/api/addFeedback?user=" + USER + "&key=" + KEY;

var getAppointmentByDoctorPanel = "https://" + FREEJINI_DOMAIN + "/api/getAppointmentByDoctorPanel?user=" + USER + "&key=" + KEY;

var getClinicLocator2 = "https://" + FREEJINI_DOMAIN + "/api/getClinicLocator2?user=" + USER + "&key=" + KEY;

var getRoomId = "https://" + FREEJINI_DOMAIN + "/api/getRoomId?user=" + USER + "&key=" + KEY;

var dateNow = "https://plux.freejini.com.my/main/dateNow";

var getMedicalRecords = "https://" + FREEJINI_DOMAIN + "/api/getMedicalRecords?user=" + USER + "&key=" + KEY + "&version=2";

var addUpdateMedicalRecord = "https://" + FREEJINI_DOMAIN + "/api/addUpdateMedicalRecord?user=" + USER + "&key=" + KEY;

var getMedicalAttachment = "https://" + FREEJINI_DOMAIN + "/api/getMedicalAttachment?user=" + USER + "&key=" + KEY + "&version=2";

var deleteAttachment = "https://" + FREEJINI_DOMAIN + "/api/deleteAttachment?user=" + USER + "&key=" + KEY;

var getHealthDataByUser = "https://" + FREEJINI_DOMAIN + "/api/getHealthDataByUser?user=" + USER + "&key=" + KEY;

var getPersonalInfoRecords = "https://" + FREEJINI_DOMAIN + "/api/getPersonalInfoRecords?user=" + USER + "&key=" + KEY;

var addUpdateRecords = "https://" + FREEJINI_DOMAIN + "/api/addUpdateRecords?user=" + USER + "&key=" + KEY;

var changeRecordStatus = "https://" + FREEJINI_DOMAIN + "/api/changeRecordStatus?user=" + USER + "&key=" + KEY;

var doforgotPassword = "https://" + FREEJINI_DOMAIN + "/api/doforgotPassword?user=" + USER + "&key=" + KEY;

var getRoomList = "https://" + FREEJINI_DOMAIN + "/api/getRoomList?user=" + USER + "&key=" + KEY;

var panelList = "https://" + API_DOMAIN + "/panellist.aspx";

var loginUrl = "https://" + API_DOMAIN + "/login.aspx";

var changePasswordUrl = "https://" + API_DOMAIN + "/chgpwd.aspx";

var checkBalanceUrl = "https://" + API_DOMAIN + "/balchk.aspx";

var getClaimDetailUrl = "https://" + API_DOMAIN + "/claim.aspx";

var aspSignupUrl = "https://" + API_DOMAIN + "/signup.aspx";

var resendVerifUrl = "https://" + API_DOMAIN + "/sendveriemail.aspx";

var getclaimDetailBySeriesUrl = "https://" + API_DOMAIN + "/claimdetails.aspx";

var getclaimReimbUrl = "https://" + API_DOMAIN + "/ClaimReimb.aspx";

var aspPreSignupUrl = "https://" + API_DOMAIN + "/presignup.aspx";

var ifins = "https://" + API_DOMAIN + "/ifins.aspx";

var ipinv = "https://" + API_DOMAIN + "/ipinv.aspx";

var getclaimCategoryUrl = "https://" + API_DOMAIN + "/claimcategory.aspx";

var getclaimSubmissionUrl = "https://" + API_DOMAIN + "/ClaimSubmission.aspx";

var defaultRetryTimes = 3;

var APILoadingList = [ {
    url: getDoctorPanel,
    model: "doctor_panel",
    checkId: "8"
}, {
    url: getClinicLocator2,
    model: "panelList",
    checkId: "13"
}, {
    url: doctorListUrl,
    model: "doctors",
    checkId: "12"
}, {
    url: getCategoryList,
    model: "categorys",
    checkId: "18"
} ];

exports.loadAPIBySequence = function(ex, counter) {
    var u_id = Ti.App.Properties.getString("u_id") || 0;
    counter = "undefined" == typeof counter ? 0 : counter;
    console.log(counter + " >= " + APILoadingList.length);
    if (counter >= APILoadingList.length) {
        console.log("loadAPIBySequence");
        Ti.App.fireEvent("app:loadingViewFinish");
        return false;
    }
    var api = APILoadingList[counter];
    var model = Alloy.createCollection(api["model"]);
    var url = api["url"];
    var last_updated = "";
    console.log("here");
    if ("helpline" == api["model"]) {
        url = url + "&u_id" + u_id;
        var checker = Alloy.createCollection("updateChecker");
        var isUpdate = checker.getCheckerById(api["checkId"], u_id);
        console.log(isUpdate);
        last_updated = "undefined" != typeof isUpdate.updated ? isUpdate.updated : "";
    } else {
        var checker = Alloy.createCollection("updateChecker");
        var isUpdate = checker.getCheckerById(api["checkId"]);
        console.log(api["checkId"] + " api['checkId']");
        console.log(isUpdate);
        last_updated = "undefined" != typeof isUpdate.updated ? isUpdate.updated : "";
    }
    url = url + "&last_updated=" + last_updated;
    console.log(url);
    var client = Ti.Network.createHTTPClient({
        onload: function(e) {
            var res = JSON.parse(this.responseText);
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
        onerror: function(e) {
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
    var client = Ti.Network.createHTTPClient({
        onload: function(e) {
            var res = JSON.parse(this.responseText);
            console.log(res);
            if ("success" == res.status) {
                if ("undefined" != typeof res.data.user_service) for (var i = 0; i < res.data.user_service.length; i++) 1 == res.data.user_service[i].service_id && Ti.App.Properties.setString("asp_email", res.data.user_service[i].email);
                Ti.App.Properties.setString("u_id", res.data.u_id);
                Ti.App.Properties.setString("ic_no", res.data.ic_no);
                Ti.App.Properties.setString("facebooklogin", 1);
                API.updateNotificationToken();
                API.syncHealthData({
                    u_id: res.data.u_id
                });
                Ti.App.fireEvent("updateHeader");
                mainView.win.close();
                if ("undefined" != typeof Alloy.Globals.navMenu && null != Alloy.Globals.navMenu) {
                    console.log(Alloy.Globals.navMenu);
                    console.log(typeof Alloy.Globals.navMenu);
                    nav.closeWindow(mainView.win);
                } else {
                    Alloy.createController("home").getView();
                }
            }
        },
        onerror: function(e) {},
        timeout: 7e4
    });
    client.open("GET", url);
    client.send();
};

exports.getUserService = function(e) {
    var url = getUserServiceUrl + "&u_id=" + e.u_id;
    var client = Ti.Network.createHTTPClient({
        onload: function(e) {
            var res = JSON.parse(this.responseText);
            for (var i = 0; i < res.data.length; i++) 1 == res.data[i].service_id && Ti.App.Properties.setString("asp_email", res.data[i].email);
        },
        onerror: function(e) {},
        timeout: 6e4
    });
    client.open("GET", url);
    client.send();
};

exports.addAppointment = function(e, callback) {
    var url = addAppointmentUrl;
    var client = Ti.Network.createHTTPClient({
        onload: function(e) {
            var res = JSON.parse(this.responseText);
            callback({
                param: res
            });
        },
        onerror: function(e) {},
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
        onload: function(e) {
            var res = JSON.parse(this.responseText);
            callback({
                param: res
            });
        },
        onerror: function(e) {},
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
        onload: function(e) {
            var res = JSON.parse(this.responseText);
            callback({
                param: res
            });
        },
        onerror: function(e) {},
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
        onload: function(e) {
            onload && onload(this.responseText);
        },
        onerror: function(e) {},
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
        onload: function(e) {
            var res = JSON.parse(this.responseText);
            callback({
                param: res
            });
        },
        onerror: function(e) {},
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
        onload: function(e) {
            var res = JSON.parse(this.responseText);
            callback({
                param: res
            });
        },
        onerror: function(e) {},
        timeout: 5e4
    });
    client.open("GET", url);
    client.send();
};

exports.getNearbyClinic = function(e) {
    var url = nearbyClinicUrl + "&longitude=" + e.longitude + "&latitude=" + e.latitude + "&clinicType=" + e.clinicType;
    var client = Ti.Network.createHTTPClient({
        onload: function(e) {
            var res = JSON.parse(this.responseText);
            if ("success" == res.status) {
                console.log("data get!");
                Ti.App.fireEvent("updateNearbyList", {
                    data: res.data
                });
            }
        },
        onerror: function(e) {},
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
        onload: function(e) {
            var result = JSON.parse(this.responseText);
            "error" == result.status && callback_download && callback_download(result);
        },
        onerror: function(e) {
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
        onload: function(e) {},
        onerror: function(e) {},
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
        onload: function(e) {},
        onerror: function(e) {},
        timeout: 7e4
    });
    client.open("GET", url);
    client.send();
};

exports.do_pluxLogin = function(data, callback) {
    var url = pluxLoginUrl + "&email=" + data.email + "&password=" + encodeURIComponent(data.password) + "&version=" + Ti.Platform.version + "&os=android&model=" + Ti.Platform.model + "&macaddress=" + Ti.Platform.macaddress;
    console.log(url);
    var client = Ti.Network.createHTTPClient({
        onload: function(e) {
            var result = JSON.parse(this.responseText);
            if ("error" == result.status) {
                common.createAlert("Error", result.data);
                callback(false);
                return false;
            }
            console.log("check result");
            console.log(result.data);
            Ti.App.Properties.setString("fullname", result.data.fullname);
            Ti.App.Properties.setString("plux_user_status", result.data.status);
            Ti.App.Properties.setString("last_login", currentDateTime());
            Ti.App.Properties.setString("u_id", result.data.u_id);
            Ti.App.Properties.setString("ic_no", result.data.ic_no);
            Ti.App.Properties.setString("plux_email", result.data.email);
            Ti.App.Properties.setString("isver", result.data.isver);
            if ("undefined" != typeof result.data.user_service) {
                console.log(result.data.user_service.memno + " result.data.user_service.memno");
                Ti.App.Properties.setString("memno", result.data.user_service[0].memno);
                Ti.App.Properties.setString("empno", result.data.user_service[0].empno);
                Ti.App.Properties.setString("corpcode", result.data.user_service[0].corpcode);
                Ti.App.Properties.setString("cardno", result.data.user_service[0].cardno);
            }
            "undefined" != typeof result.dependent && Ti.App.Properties.setString("dependent", JSON.stringify(result.dependent));
            API.updateNotificationToken();
            callback(true);
        },
        onerror: function(e) {},
        timeout: 7e4
    });
    client.open("POST", url);
    client.send();
};

exports.do_signup = function(data, mainView, callback) {
    var url = pluxSignUpUrl + "&fullname=" + data.fullname + "&ic_no=" + data.ic_no + "&email=" + data.email + "&password=" + data.password + "&password2=" + data.password;
    ({
        email: data.email,
        password: data.password
    });
    var client = Ti.Network.createHTTPClient({
        onload: function(e) {
            var result = JSON.parse(this.responseText);
            if ("error" == result.status) {
                common.createAlert("Error", result.data);
                callback(false);
            } else {
                console.log("success");
                callback(true);
                mainView.win.close();
            }
        },
        onerror: function(e) {
            console.log(e);
        },
        timeout: 7e4
    });
    client.open("GET", url);
    client.send();
};

exports.plux_signup = function(data, callback) {
    var url = pluxSignUpUrl + "&fullname=" + data.fullname + "&ic_no=" + data.ic_no + "&email=" + data.email + "&password=" + data.password + "&password2=" + data.password;
    ({
        email: data.email,
        password: data.password
    });
    var client = Ti.Network.createHTTPClient({
        onload: function(e) {
            var result = JSON.parse(this.responseText);
            common.hideLoading();
            if ("error" == result.status) {
                common.createAlert("Error", result.data);
                return false;
            }
            Ti.App.Properties.setString("u_id", result.data.u_id);
            Ti.App.Properties.setString("plux_email", result.data.email);
            Ti.App.Properties.setString("asp_email", result.data.email);
            callback();
        },
        onerror: function(e) {},
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
        onload: function(e) {
            var result = JSON.parse(this.responseText);
            res = result[0];
            if ("undefined" != typeof res.message && null != res.message) {
                common.createAlert("Error", res.message);
                common.hideLoading();
            } else {
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
    console.log("here");
    console.log(url);
    var client = Ti.Network.createHTTPClient({
        onload: function(e) {
            var result = JSON.parse(this.responseText);
            res = result[0];
            console.log(res);
            if ("undefined" != typeof res.message && null != res.message) {
                common.createAlert("Error", res.message);
                common.hideLoading();
            } else {
                Ti.App.Properties.setString("memno", res.memno);
                Ti.App.Properties.setString("empno", res.empno);
                Ti.App.Properties.setString("corpcode", res.corpcode);
                Ti.App.Properties.setString("asp_email", data.email);
                Ti.App.Properties.setString("signup2", "");
                if ("" != u_id) {
                    console.log(u_id + " " + data.email + " " + data.password);
                    updateUserService(u_id, 1, data.email, data.password);
                } else {
                    var params = {
                        fullname: data.name,
                        email: data.email,
                        password: data.password,
                        ic_no: res.memno,
                        agreets: 1
                    };
                    API.plux_signup(params, function(e) {
                        u_id = Ti.App.Properties.getString("u_id") || "";
                        updateUserService(u_id, 1, data.email, data.password);
                    });
                }
                common.hideLoading();
                nav.navigationWindow("home");
                nav.closeWindow(mainView.aspSignUpWin);
                Ti.App.fireEvent("updateHeader");
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
        onload: function(e) {
            common.createAlert("Success", "Verification email sent!");
        },
        onerror: function(e) {
            common.createAlert("Error", "Unable connect to the server. Please try again later.");
            common.hideLoading();
        },
        timeout: 13e4
    });
    client.open("GET", encodeURI(url));
    client.send();
};

exports.doLogin = function(username, password, mainView, target, callback) {
    var u_id = Ti.App.Properties.getString("u_id") || "";
    var url = loginUrl + "?LOGINID=" + encodeURIComponent(username) + "&PASSWORD=" + encodeURIComponent(password);
    var client = Ti.Network.createHTTPClient({
        onload: function(e) {
            var result = JSON.parse(this.responseText);
            res = result[0];
            if ("undefined" != typeof res.message && null != res.message) {
                common.createAlert("Error", res.message);
                common.hideLoading();
            } else {
                Ti.App.Properties.setString("memno", res.memno);
                Ti.App.Properties.setString("empno", res.empno);
                Ti.App.Properties.setString("corpcode", res.corpcode);
                Ti.App.Properties.setString("asp_email", username);
                Ti.App.Properties.setString("cardno", res.cardno);
                Ti.App.Properties.setString("empno_1", res.empno);
                Ti.App.Properties.setString("corpcode_1", res.corpcode);
                console.log("tipt:" + JSON.stringify(res));
                console.log("empno:" + Ti.App.Properties.getString("empno") + " " + Ti.App.Properties.getString("corpcode"));
                updateUserService(u_id, 1, username, password);
                console.log(result);
                API.updateNotificationToken();
                Ti.App.fireEvent("updateMenu");
                if ("refresh" != target) {
                    nav.closeWindow(mainView.aspLoginWin);
                    Ti.App.fireEvent("updateHeader");
                    var toRedirect = false;
                    if ("" != target && "home" != target) {
                        API.callByPost({
                            url: "getCorpPermission",
                            params: {
                                corpcode: res.corpcode
                            }
                        }, function(responseText) {
                            var res = JSON.parse(responseText);
                            var splitRes = target.split("/");
                            var myTarget = splitRes[0];
                            splitRes.length > 1 && (myTarget = splitRes[1]);
                            if ("success" == res.status) {
                                var takeout = res.data;
                                for (var i = 0; i < takeout.length; i++) if (myTarget == takeout[i]) {
                                    common.createAlert("Error", "You are not allowed to view this section", function() {});
                                    toRedirect = false;
                                    return false;
                                }
                                nav.navigationWindow(target);
                            }
                        });
                        console.log("toRedirect : " + toRedirect);
                        true == toRedirect && nav.navigationWindow(target);
                    }
                } else callback();
                API.loadPanelList({
                    clinicType: ""
                });
            }
        },
        onerror: function(e) {
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
        onload: function(e) {
            var result = JSON.parse(this.responseText);
            res = result[0];
            if ("99" != res.code) {
                common.createAlert("Error", res.message);
                return false;
            }
            common.createAlert("Done", res.message);
            nav.closeWindow(mainView.changePasswordWin);
        },
        onerror: function(e) {
            common.createAlert("Error", "Unable connect to the server. Please try again later.");
            common.hideLoading();
        },
        timeout: 6e4
    });
    client.open("GET", encodeURI(url));
    client.send();
};

exports.claimDetailBySeries = function(e, callback) {
    var url = getclaimDetailBySeriesUrl + "?SERIAL=" + e.serial;
    var retryTimes = "undefined" != typeof e.retryTimes ? e.retryTimes : defaultRetryTimes;
    console.log(url);
    var client = Ti.Network.createHTTPClient({
        onload: function(e) {
            var res = JSON.parse(this.responseText);
            callback(res[0]);
        },
        onerror: function(ex) {
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
        onload: function(e) {
            var res = JSON.parse(this.responseText);
            0 == res.length || ("undefined" != typeof res[0].message ? common.createAlert(res[0].message) : res.forEach(function(entry) {
                var claim_detail_model = Alloy.createCollection("claim_detail");
                claim_detail_model.save_claim_detail(entry.serial, entry.memno, entry.name, entry.relation, entry.cliniccode, entry.visitdate, entry.amount, entry.category, entry.mcdays, entry.clinicname, entry.status, entry.claimtype, entry.appcode);
            }));
        },
        onerror: function(ex) {
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
        onload: function(e) {
            var res = JSON.parse(this.responseText);
            if ("undefined" != typeof res[0].message) common.createAlert(res[0].message); else {
                Ti.App.Properties.setString("balchk", this.responseText);
                Ti.App.Properties.setString("balchkUpdatedDate", currentDateTime());
                Ti.App.fireEvent("data_loaded");
            }
        },
        onerror: function(ex) {
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

exports.ifins = function(e) {
    var url = ifins + "?EMPNO=" + e.empno + "&CORPCODE=" + e.corpcode;
    console.log("ifins");
    console.log(url);
    var retryTimes = "undefined" != typeof e.retryTimes ? e.retryTimes : defaultRetryTimes;
    var client = Ti.Network.createHTTPClient({
        onload: function(e) {
            var res = JSON.parse(this.responseText);
            console.log(res);
            console.log("here");
            if (_.isEmpty(res)) console.log("empty!"); else if ("undefined" != typeof res[0].message) common.createAlert(res[0].message); else {
                Ti.App.Properties.setString("ifins", this.responseText);
                Ti.App.fireEvent("ifins_loaded");
            }
        },
        onerror: function(ex) {
            retryTimes--;
            console.log(retryTimes + " ifins");
            0 !== retryTimes && Titanium.Network.online ? API.ifins({
                memno: e.memno,
                corpcode: e.corpcode,
                retryTimes: retryTimes
            }) : Ti.App.fireEvent("ifins_loaded");
        },
        timeout: 7e4
    });
    client.open("GET", encodeURI(url));
    client.send();
};

exports.updateNotificationToken = function(e) {
    var deviceToken = Ti.App.Properties.getString("deviceToken");
    var memno = Ti.App.Properties.getString("memno");
    var u_id = Ti.App.Properties.getString("u_id") || "";
    if ("" != deviceToken) {
        var url = updateToken + "&token=" + deviceToken + "&member_no=" + memno + "&u_id=" + u_id;
        var client = Ti.Network.createHTTPClient({
            onload: function(e) {
                var res = JSON.parse(this.responseText);
                "success" == res.status;
            },
            onerror: function(e) {},
            timeout: 6e4
        });
        client.open("GET", url);
        client.send();
    }
};

exports.loadLeaflet = function(ex) {
    var url = leafletUrl;
    var client = Ti.Network.createHTTPClient({
        onload: function(e) {
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
        onerror: function(e) {},
        timeout: 6e4
    });
    client.open("GET", url);
    client.send();
};

exports.getDoctorList = function(ex) {
    var url = doctorListUrl;
    var client = Ti.Network.createHTTPClient({
        onload: function(e) {
            var res = JSON.parse(this.responseText);
            var doctorsModel = Alloy.createCollection("doctors");
            var info = res.data;
            doctorsModel.saveArray(info);
        },
        onerror: function(e) {},
        timeout: 6e4
    });
    client.open("GET", url);
    client.send();
};

exports.loadNewsFeed = function(ex) {
    var url = newsfeed;
    var client = Ti.Network.createHTTPClient({
        onload: function(e) {
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
        onerror: function(e) {},
        timeout: 6e4
    });
    client.open("GET", url);
    client.send();
};

exports.loadCategoryList = function(ex) {
    var url = categoryUrl;
    var client = Ti.Network.createHTTPClient({
        onload: function(e) {
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
        onerror: function(e) {},
        timeout: 6e4
    });
    client.open("GET", url);
    client.send();
};

exports.loadDoctorPanel = function(ex) {
    var checker = Alloy.createCollection("updateChecker");
    var isUpdate = checker.getCheckerById("8");
    var last_updated = "";
    "" != isUpdate && (last_updated = isUpdate.updated);
    var url = getDoctorPanel + "&last_updated=";
    var client = Ti.Network.createHTTPClient({
        onload: function(e) {
            var res = JSON.parse(this.responseText);
            if ("success" == res.status && ("" !== isUpdate || res.last_updated != isUpdate.updated)) {
                var library = Alloy.createCollection("doctor_panel");
                var arr = res.data;
                library.resetData();
                library.saveArray(arr);
            }
        },
        onerror: function(e) {},
        timeout: 6e4
    });
    client.open("GET", url);
    client.send();
};

exports.loadClinicList = function(ex) {
    var checker = Alloy.createCollection("updateChecker");
    var isUpdate = checker.getCheckerById("1");
    var last_updated = "";
    "" != isUpdate && (last_updated = isUpdate.updated);
    var url = clinicListUrl + "&last_updated=" + last_updated;
    console.log(url);
    var client = Ti.Network.createHTTPClient({
        onload: function(e) {
            var res = JSON.parse(this.responseText);
            if ("success" == res.status && ("" !== isUpdate || res.last_updated != isUpdate.updated)) {
                var library = Alloy.createCollection("panelList");
                var arr = res.data;
                library.addPanel(arr);
                checker.updateModule("1", "clinicList", res.last_updated);
            }
        },
        onerror: function(e) {},
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
        onload: function(e) {
            var res = JSON.parse(this.responseText);
            var library = Alloy.createCollection("panelList");
            var codeStr = "";
            console.log(this.responseText);
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
            } else "hours24" == ex.clinicType ? details = library.getPanelListBy24Hours(codeStr) : details = library.getPanelListByCode(codeStr, ex.clinicType);
            Ti.App.fireEvent("aspClinic", {
                details: details
            });
        },
        onerror: function(e) {},
        timeout: 6e4
    });
    client.open("GET", encodeURI(url));
    client.send();
};

exports.callByGet = function(e, onload, onerror) {
    console.log("callbyget");
    var url = eval(e.url) + "?" + e.params;
    console.log("url:" + url);
    var _result = contactServerByGet(encodeURI(url));
    _result.onload = function(e) {
        onload && onload(this.responseText);
    };
    _result.onerror = function(e) {
        onerror && onerror();
    };
};

exports.callByPostImage = function(e, onload, getParam) {
    var url = eval(e.url) + e.params;
    var _result = contactServerByPostImage(url, e.image || {});
    _result.onload = function(e) {
        onload && onload(this.responseText);
    };
    _result.onerror = function(e) {
        onerror && onerror();
    };
};

var callByPost_error_popup = false;

exports.callByPost = function(e, onload, onerror) {
    var retryTimes = "undefined" != typeof e.retryTimes ? e.retryTimes : defaultRetryTimes;
    var deviceToken = Ti.App.Properties.getString("deviceToken");
    if ("" != deviceToken) {
        var url = "";
        if ("undefined" != typeof e.fullurl) url = e.url; else {
            var domain = "undefined" != typeof e.domain ? eval(e.domain) : API_DOMAIN;
            url = "undefined" != typeof e["new"] ? "https://" + domain + "/api/" + e.url + "?user=" + USER + "&key=" + KEY : eval(e.url);
        }
        console.log(url);
        console.log(e.params || {});
        if ("voice" == e.type) var _result = contactServerByPostVideo(url, e.params || {}); else var _result = contactServerByPost(url, e.params || {});
        _result.onload = function(ex) {
            onload && onload(this.responseText);
        };
        _result.onerror = function(ex) {
            console.log(ex);
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