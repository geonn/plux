function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    (0 > m || 0 === m && today.getDate() < birthDate.getDate()) && age--;
    return age;
}

function loadInfo(gType, dataPeriod, showDetailsLabel) {
    var info = [];
    var info2 = [];
    var loadType = gType;
    ("5" == loadType || "6" == loadType) && (loadType = "1");
    if ("year" == dataPeriod) {
        var info_details = lib_health.getHealthListByTypeInYear(loadType, gType);
        info_details.forEach(function(entry) {
            var rec = {};
            var convert = entry.date.split("-");
            var month = parseInt(convert[1]) - 1;
            var newDate = m_names[month] + "" + convert[0].substring(2, 4);
            rec["label"] = newDate;
            if ("2" == gType || "7" == gType) {
                rec["y"] = parseFloat(entry.value);
                var rec2 = {};
                rec2["label"] = newDate;
                rec2["y"] = parseFloat(entry.value2);
                info2.push(rec2);
            } else "6" == gType ? rec["y"] = parseFloat(entry.value) : "5" == gType ? rec["y"] = 100 * parseFloat(entry.value) : rec["y"] = parseFloat(entry.value);
            info.push(rec);
        });
    } else {
        if ("10" == gType) var info_details = lib_health.getSteps(); else var info_details = lib_health.getHealthListByType(loadType);
        info_details.reverse();
        var latestData;
        info_details.length > 0 ? info_details.forEach(function(entry) {
            var rec = {};
            var convert = entry.date.split("-");
            var month = convert[1];
            "08" == convert[1] && (month = 8);
            "09" == convert[1] && (month = 9);
            var month = parseInt(month) - 1;
            var newDate = convert[2] + " " + m_names[month] + convert[0].substring(2, 4);
            rec["label"] = newDate;
            if ("2" == gType || "7" == gType) {
                rec["y"] = parseFloat(entry.field1);
                var rec2 = {};
                rec2["label"] = newDate;
                rec2["y"] = parseFloat(entry.field2);
                info2.push(rec2);
                latestData = "-";
            } else if ("6" == gType) {
                rec["y"] = parseFloat(entry.field1);
                latestData = parseFloat(entry.field1);
            } else if ("5" == gType) {
                rec["y"] = 100 * parseFloat(entry.field2);
                latestData = 100 * parseFloat(entry.field2);
            } else {
                rec["y"] = parseFloat(entry.amount);
                latestData = entry.amount;
            }
            info.push(rec);
        }) : latestData = "";
    }
    if (1 == gType) {
        setTimeout(function() {
            Ti.App.fireEvent("app:bmiInfo", {
                message: info,
                dataPeriod: dataPeriod
            });
        }, 950);
        if ("1" == showDetailsLabel) {
            var text = latestData || "N/A";
            Ti.App.fireEvent("loadLatest", {
                gType: gType,
                text: text
            });
        }
    }
    if (2 == gType) {
        setTimeout(function() {
            Ti.App.fireEvent("app:bloodPressureInfo", {
                message: info,
                message2: info2,
                dataPeriod: dataPeriod
            });
        }, 650);
        if ("1" == showDetailsLabel) {
            var text = latestData || "N/A";
            Ti.App.fireEvent("loadLatest", {
                gType: gType,
                text: text
            });
        }
    }
    if (3 == gType) {
        setTimeout(function() {
            Ti.App.fireEvent("app:heartRateInfo", {
                message: info,
                dataPeriod: dataPeriod
            });
        }, 750);
        if ("1" == showDetailsLabel) {
            var text = latestData || "N/A";
            Ti.App.fireEvent("loadLatest", {
                gType: gType,
                text: text
            });
        }
    }
    if (4 == gType) {
        setTimeout(function() {
            Ti.App.fireEvent("app:bodyTemperatureInfo", {
                message: info,
                dataPeriod: dataPeriod
            });
        }, 1e3);
        if ("1" == showDetailsLabel) {
            var text = latestData || "N/A";
            Ti.App.fireEvent("loadLatest", {
                gType: gType,
                text: text
            });
        }
    }
    if (7 == gType) {
        setTimeout(function() {
            Ti.App.fireEvent("app:cholestrol", {
                message: info,
                message2: info2,
                dataPeriod: dataPeriod
            });
        }, 1250);
        if ("1" == showDetailsLabel) {
            var text = latestData || "N/A";
            Ti.App.fireEvent("loadLatest", {
                gType: gType,
                text: text
            });
        }
    }
    if (8 == gType) {
        setTimeout(function() {
            Ti.App.fireEvent("app:bloodGlucose", {
                message: info,
                dataPeriod: dataPeriod
            });
        }, 1500);
        if ("1" == showDetailsLabel) {
            var text = latestData || "N/A";
            Ti.App.fireEvent("loadLatest", {
                gType: gType,
                text: text
            });
        }
    }
    if (10 == gType) {
        setTimeout(function() {
            Ti.App.fireEvent("app:steps", {
                message: info,
                dataPeriod: dataPeriod
            });
        }, 1750);
        "" != latestData && (latestData += " Steps");
        if ("1" == showDetailsLabel) {
            var text = latestData || "N/A";
            Ti.App.fireEvent("loadLatest", {
                gType: gType,
                text: text
            });
        }
    }
    return info;
}

var mainView = null;

var lib_health = Alloy.createCollection("health");

var m_names = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");

exports.construct = function(mv) {
    mainView = mv;
};

exports.showDatePicker = function(e) {
    e.date.visible = "true";
    e.time.visible = "false";
};

exports.showTimePicker = function(e) {
    e.date.visible = "false";
    e.time.visible = "true";
};

exports.showBirthDatePicker = function(e) {
    e.date.visible = "true";
    e.gender.visible = "false";
    e.bloodType.visible = "false";
};

exports.showGenderPicker = function(e) {
    e.gender.visible = "true";
    e.bloodType.visible = "false";
    e.date.visible = "false";
};

exports.showBloodTypePicker = function(e) {
    e.bloodType.visible = "true";
    e.gender.visible = "false";
    e.date.visible = "false";
};

exports.disableSaveButton = function(e) {
    mainView.saveButton.color = "#ADADAD";
    mainView.saveButton.touchEnabled = "false";
};

exports.enableSaveButton = function(e) {
    mainView.saveButton.color = "#CE1D1C";
    mainView.saveButton.touchEnabled = "true";
};

exports.populateData = function(e) {
    for (var i = 1; 8 >= i; i++) var info = loadInfo(i, "", "1");
    info = loadInfo(10, "", "1");
};

exports.loadInfo = function(gType, dataPeriod, showDetailsLabel) {
    loadInfo(gType, dataPeriod, showDetailsLabel);
};

exports.loadGraphByType = function(gType, dataPeriod) {
    loadInfo(gType, dataPeriod, "");
};

exports.todayDate = function() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    var hh = today.getHours();
    var min = today.getMinutes();
    10 > dd && (dd = "0" + dd);
    10 > mm && (mm = "0" + mm);
    10 > hh && (hh = "0" + hh);
    10 > min && (min = "0" + min);
    today = dd + "/" + mm + "/" + yyyy;
    var ampm = hh >= 12 ? "PM" : "AM";
    hh > 12 && (hh -= 12);
    mainView.date_value.text = today;
    mainView.time_value.text = hh + ":" + min + " " + ampm;
};

exports.getAge = function(bday) {
    return getAge(bday);
};

exports.changeDate = function(e) {
    var pickerdate = e.date;
    var day = pickerdate.getDate();
    day = day.toString();
    day.length < 2 && (day = "0" + day);
    var month = pickerdate.getMonth();
    month += 1;
    month = month.toString();
    month.length < 2 && (month = "0" + month);
    var year = pickerdate.getFullYear();
    selDate = day + "/" + month + "/" + year;
    var age = "";
    "1" == e.age && (age = "(" + getAge(year + "-" + month + "-" + day) + ")");
    mainView.date_value.text = selDate + age;
};

exports.changeGender = function(e) {
    mainView.gender_value.text = e.gender;
};

exports.changeBloodType = function(e) {
    mainView.bloodType_value.text = e.bloodType;
};

exports.navigateGraph = function(gType) {
    "1" == gType && nav.navigationWindow("myHealth/healthDataBmi");
    "2" == gType && nav.navigationWindow("myHealth/healthDataBloodPressure");
    "3" == gType && nav.navigationWindow("myHealth/healthDataHeartRate");
    "4" == gType && nav.navigationWindow("myHealth/healthDataBodyTemperature");
    "5" == gType && nav.navigationWindow("myHealth/healthDataBmi");
    "6" == gType && nav.navigationWindow("myHealth/healthDataBmi");
    "7" == gType && nav.navigationWindow("myHealth/healthDataCholestrol");
    "8" == gType && nav.navigationWindow("myHealth/healthDataGlucose");
};

exports.stepsMotion = function(e) {
    lib_health.getHealthListByType(10);
    Ti.App.Properties.getString("curH") || "";
    Ti.App.Properties.getString("step") || 0;
};

exports.changeTime = function(e) {
    var pickerdate = e.time;
    pickerdate.getDate();
    var hour = pickerdate.getHours();
    hour = hour.toString();
    var ampm = hour >= 12 ? "PM" : "AM";
    hour > 12 && (hour -= 12);
    var minute = pickerdate.getMinutes();
    10 > minute && (minute = "0" + minute);
    selTime = hour + ":" + minute + " " + ampm;
    mainView.time_value.text = selTime;
};