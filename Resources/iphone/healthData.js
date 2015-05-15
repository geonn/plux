function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    (0 > m || 0 === m && today.getDate() < birthDate.getDate()) && age--;
    return age;
}

function loadInfo(gType, dataPeriod) {
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
            if ("2" == gType) {
                rec["y"] = parseFloat(entry.value);
                var rec2 = {};
                rec2["label"] = newDate;
                rec2["y"] = parseFloat(entry.value2);
                info2.push(rec2);
            } else rec["y"] = "6" == gType ? parseFloat(entry.value) : "5" == gType ? 100 * parseFloat(entry.value) : parseFloat(entry.value);
            info.push(rec);
        });
    } else {
        if ("10" == gType) var info_details = lib_health.getSteps(); else var info_details = lib_health.getHealthListByType(loadType);
        info_details.reverse();
        info_details.forEach(function(entry) {
            var rec = {};
            var convert = entry.date.split("-");
            var month = parseInt(convert[1]) - 1;
            var newDate = convert[2] + " " + m_names[month] + convert[0].substring(2, 4);
            rec["label"] = newDate;
            if ("2" == gType) {
                rec["y"] = parseFloat(entry.field1);
                var rec2 = {};
                rec2["label"] = newDate;
                rec2["y"] = parseFloat(entry.field2);
                info2.push(rec2);
            } else rec["y"] = "6" == gType ? parseFloat(entry.field1) : "5" == gType ? 100 * parseFloat(entry.field2) : parseFloat(entry.amount);
            info.push(rec);
        });
    }
    1 == gType && Ti.App.fireEvent("app:bmiInfo", {
        message: info,
        dataPeriod: dataPeriod
    });
    2 == gType && Ti.App.fireEvent("app:bloodPressureInfo", {
        message: info,
        message2: info2,
        dataPeriod: dataPeriod
    });
    3 == gType && Ti.App.fireEvent("app:heartRateInfo", {
        message: info,
        dataPeriod: dataPeriod
    });
    4 == gType && Ti.App.fireEvent("app:bodyTemperatureInfo", {
        message: info,
        dataPeriod: dataPeriod
    });
    5 == gType && Ti.App.fireEvent("app:height", {
        message: info,
        dataPeriod: dataPeriod
    });
    6 == gType && Ti.App.fireEvent("app:weight", {
        message: info,
        dataPeriod: dataPeriod
    });
    10 == gType && Ti.App.fireEvent("app:steps", {
        message: info,
        dataPeriod: dataPeriod
    });
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

exports.disableSaveButton = function() {
    mainView.saveButton.color = "#ADADAD";
    mainView.saveButton.touchEnabled = "false";
};

exports.enableSaveButton = function() {
    mainView.saveButton.color = "#CE1D1C";
    mainView.saveButton.touchEnabled = "true";
};

exports.populateData = function() {
    for (var i = 1; 6 >= i; i++) var info = loadInfo(i);
    info = loadInfo(10);
};

exports.loadGraphByType = function(gType, dataPeriod) {
    loadInfo(gType, dataPeriod);
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
    "1" == gType && nav.navigationWindow("healthDataBmi");
    "2" == gType && nav.navigationWindow("healthDataBloodPressure");
    "3" == gType && nav.navigationWindow("healthDataHeartRate");
    "4" == gType && nav.navigationWindow("healthDataBodyTemperature");
    "5" == gType && nav.navigationWindow("healthDataBmi");
    "6" == gType && nav.navigationWindow("healthDataBmi");
};

exports.stepsMotion = function() {
    var info_details = lib_health.getHealthListByType(10);
    console.log(info_details);
    var gCurH = Ti.App.Properties.getString("curH") || "";
    var gStep = Ti.App.Properties.getString("step") || 0;
    console.log(gCurH + " == " + gStep);
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