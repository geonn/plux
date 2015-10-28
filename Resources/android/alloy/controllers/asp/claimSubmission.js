function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function init() {
        userMem = usersModel.getUserByEmpNo();
        userMem.forEach(function(entry) {
            claimName.push(entry.name);
            claimMemNo.push(entry.memno);
        });
        getClaimCategory();
    }
    function checkIfHaveData() {
        if ("" != isEdit) {
            var params = "SERIAL=" + serial;
            common.showLoading();
            API.callByGet({
                url: "getclaimReimbUrl",
                params: params
            }, function(responseText) {
                var res = JSON.parse(responseText);
                var claimer = usersModel.getUserByMemno(res[0].memno);
                $.receiptAmount.value = res[0].amt || "";
                $.diagnosis.value = res[0].diagnosis || "";
                $.glamount.value = res[0].glamt || 0;
                $.gstAmount.value = res[0].gstamt || 0;
                $.clinicName.value = res[0].nclinic || "";
                $.receipt_no.value = res[0].recno || "";
                $.remark.value = res[0].remarks || "";
                $.mc.value = res[0].mcdays || 0;
                var visitDate = res[0].visitdt || "";
                dateVisit = visitDate.split("/");
                dateVisit = dateVisit[1] + "/" + dateVisit[0] + "/" + dateVisit[2];
                $.dateVisit.text = dateVisit;
                $.dateVisit.color = "#000000";
                $.claim_under.text = claimer.name;
                $.claim_under.color = "#000000";
                a = claimCategoryIdArr.indexOf(res[0].category);
                $.category.text = claimCategoryArr[a];
                $.category.color = "#000000";
                common.hideLoading();
            });
            $.saveBtn.visible = false;
        }
    }
    function getClaimCategory() {
        API.callByGet({
            url: "getclaimCategoryUrl",
            params: "CORPCODE=" + user.corpcode
        }, function(responseText) {
            panelCategory = JSON.parse(responseText);
            if (panelCategory.length < 1) {
                common.createAlert("Error", "Your are not allowed to submit claim");
                nav.closeWindow($.win);
                return false;
            }
            panelCategory.forEach(function(entry) {
                claimCategoryIdArr.push(entry.catID);
                claimCategoryArr.push(entry.catDesc);
            });
            common.hideLoading();
            checkIfHaveData();
        });
    }
    function submitClaim() {
        var receiptNo = $.receipt_no.value;
        var claimCategory = claimCategoryId;
        var claimUnder = claimMemId;
        var receiptAmount = $.receiptAmount.value;
        var dateVisit = $.dateVisit.text;
        var clinicName = $.clinicName.value;
        var remark = $.remark.value;
        var gstAmount = $.gstAmount.value;
        var mc = $.mc.value;
        var diagnosis = $.diagnosis.value;
        var glamount = $.glamount.value;
        if ("" == receiptNo.trim()) {
            common.resultPopUp("Error", "Please fill in receipt number");
            return false;
        }
        if ("" == claimCategory.trim()) {
            common.resultPopUp("Error", "Please choose ONE category");
            return false;
        }
        if ("" == claimUnder.trim()) {
            common.resultPopUp("Error", "Please choose ONE claim under");
            return false;
        }
        if ("" == receiptAmount.trim()) {
            common.resultPopUp("Error", "Please fill in receipt amount in RM");
            return false;
        }
        if ("" == dateVisit.trim()) {
            common.resultPopUp("Error", "Please choose date visit to clinic/hospital");
            return false;
        }
        dateVisit = dateVisit.split("/");
        dateVisit = dateVisit[1] + "/" + dateVisit[0] + "/" + dateVisit[2];
        if ("" == clinicName.trim()) {
            common.resultPopUp("Error", "Please fill in clinic/hospital to visit");
            return false;
        }
        var params = "RECNO=" + receiptNo + "&CATEGORY=" + claimCategory + "&MEMNO=" + claimUnder + "&EMPNO=" + user.empno + "&CORPCODE=" + user.corpcode + "&AMT=" + receiptAmount + "&VISITDT=" + dateVisit + "&NCLINIC=" + clinicName + "&REMARKS=" + remark + "&GSTAMT=" + gstAmount + "&MCDAYS=" + mc + "&DIAGNOSIS=" + diagnosis + "&GLAMT=" + glamount;
        common.showLoading();
        API.callByGet({
            url: "getclaimSubmissionUrl",
            params: params
        }, function(responseText) {
            var res = JSON.parse(responseText);
            common.hideLoading();
            if ("02" == res[0]["code"]) {
                common.resultPopUp("Success", res[0]["message"]);
                $.win.close();
            } else common.resultPopUp("Error", res[0]["message"]);
        });
    }
    function changeVisitDate(e) {
        var pickerdate = e.value;
        var day = pickerdate.getDate();
        day = day.toString();
        day.length < 2 && (day = "0" + day);
        var month = pickerdate.getMonth();
        month += 1;
        month = month.toString();
        month.length < 2 && (month = "0" + month);
        var year = pickerdate.getFullYear();
        selDate = day + "/" + month + "/" + year;
        $.dateVisit.text = selDate;
        $.dateVisit.color = "#000000";
    }
    function showVisitPicker() {
        if ("" == isEdit) {
            var curDate = currentDateTime();
            var ed = curDate.substr(0, 10);
            var res_ed = ed.split("-");
            "08" == res_ed[1] && (res_ed[1] = "8");
            "09" == res_ed[1] && (res_ed[1] = "9");
            var datePicker = Ti.UI.createPicker({
                type: Ti.UI.PICKER_TYPE_DATE,
                minDate: new Date(2015, 0, 1),
                id: "datePicker",
                visible: false
            });
            datePicker.showDatePickerDialog({
                value: new Date(res_ed[0], parseInt(res_ed[1]) - 1, res_ed[2]),
                callback: function(e) {
                    e.cancel || changeVisitDate(e);
                }
            });
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "asp/claimSubmission";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        title: "Claim Submission",
        id: "win",
        backButtonTitle: "",
        navTintColor: "#CE1D1C"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.loadingBar = Ti.UI.createView({
        layout: "vertical",
        id: "loadingBar",
        height: "120",
        zIndex: "12",
        width: "120",
        borderRadius: "15",
        backgroundColor: "#2E2E2E"
    });
    $.__views.win.add($.__views.loadingBar);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        top: 30,
        left: 30,
        width: 60,
        id: "activityIndicator"
    });
    $.__views.loadingBar.add($.__views.activityIndicator);
    $.__views.__alloyId229 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#ffffff",
        top: "5",
        bottom: "5",
        text: "Loading",
        id: "__alloyId229"
    });
    $.__views.loadingBar.add($.__views.__alloyId229);
    $.__views.main = Ti.UI.createView({
        id: "main",
        layout: "vertical"
    });
    $.__views.win.add($.__views.main);
    $.__views.__alloyId230 = Ti.UI.createView({
        layout: "horizontal",
        height: "50",
        width: Ti.UI.FILL,
        backgroundColor: "#DEDEDE",
        id: "__alloyId230"
    });
    $.__views.main.add($.__views.__alloyId230);
    $.__views.__alloyId231 = Ti.UI.createView({
        left: "0",
        width: "10%",
        id: "__alloyId231"
    });
    $.__views.__alloyId230.add($.__views.__alloyId231);
    $.__views.btnBack = Ti.UI.createImageView({
        left: "10",
        id: "btnBack",
        width: "25",
        height: "25",
        image: "/images/btn-back.png"
    });
    $.__views.__alloyId231.add($.__views.btnBack);
    $.__views.__alloyId232 = Ti.UI.createView({
        width: "90%",
        id: "__alloyId232"
    });
    $.__views.__alloyId230.add($.__views.__alloyId232);
    $.__views.pageTitle = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#606060",
        font: {
            fontSize: "16dp"
        },
        text: "Claim Submission",
        id: "pageTitle",
        textAlign: "center"
    });
    $.__views.__alloyId232.add($.__views.pageTitle);
    $.__views.__alloyId233 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Titanium.UI.SIZE,
        color: "#606060",
        top: "10",
        left: 10,
        right: 10,
        bottom: 10,
        font: {
            fontSize: 14
        },
        text: "Please fill in below info to claim from ASP",
        id: "__alloyId233"
    });
    $.__views.main.add($.__views.__alloyId233);
    $.__views.table = Ti.UI.createScrollView({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "table",
        top: "10",
        bottom: "10",
        contentWidth: Ti.UI.FILL,
        contentHeight: Ti.UI.SIZE,
        backgroundColor: "#ffffff"
    });
    $.__views.main.add($.__views.table);
    $.__views.tvrReceiptNo = Ti.UI.createView({
        id: "tvrReceiptNo",
        height: Ti.UI.SIZE,
        layout: "vertical",
        selectedBackgroundColor: "#ffffff"
    });
    $.__views.table.add($.__views.tvrReceiptNo);
    $.__views.__alloyId234 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: "45",
        textAlign: "right",
        id: "__alloyId234"
    });
    $.__views.tvrReceiptNo.add($.__views.__alloyId234);
    $.__views.__alloyId235 = Ti.UI.createLabel({
        width: "35%",
        height: Titanium.UI.SIZE,
        color: "#CE1D1C",
        font: {
            fontSize: 14
        },
        left: 10,
        text: "Receipt Number",
        top: "12",
        id: "__alloyId235"
    });
    $.__views.__alloyId234.add($.__views.__alloyId235);
    $.__views.receipt_no = Ti.UI.createTextField({
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        height: "45dp",
        font: {
            fontSize: 12
        },
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        width: Ti.UI.FILL,
        backgroundColor: "#ffffff",
        borderColor: "#ffffff",
        id: "receipt_no",
        bottom: "5",
        right: "5",
        textAlign: "right",
        hintText: "Receipt Number"
    });
    $.__views.__alloyId234.add($.__views.receipt_no);
    $.__views.__alloyId236 = Ti.UI.createView({
        backgroundColor: "#ececec",
        width: Ti.UI.FILL,
        height: 1,
        id: "__alloyId236"
    });
    $.__views.table.add($.__views.__alloyId236);
    $.__views.tvrCategory = Ti.UI.createView({
        id: "tvrCategory",
        height: Ti.UI.SIZE,
        layout: "vertical",
        selectedBackgroundColor: "#ffffff"
    });
    $.__views.table.add($.__views.tvrCategory);
    $.__views.__alloyId237 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: "45",
        textAlign: "right",
        id: "__alloyId237"
    });
    $.__views.tvrCategory.add($.__views.__alloyId237);
    $.__views.__alloyId238 = Ti.UI.createLabel({
        width: "35%",
        height: Titanium.UI.SIZE,
        color: "#CE1D1C",
        font: {
            fontSize: 14
        },
        left: 10,
        text: "Category",
        top: "12",
        id: "__alloyId238"
    });
    $.__views.__alloyId237.add($.__views.__alloyId238);
    $.__views.__alloyId239 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        width: "auto",
        id: "__alloyId239"
    });
    $.__views.__alloyId237.add($.__views.__alloyId239);
    $.__views.category = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Titanium.UI.SIZE,
        color: "#C8C8CD",
        top: "12",
        left: 10,
        right: 10,
        bottom: 10,
        font: {
            fontSize: 12
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        text: "Choose Category",
        id: "category"
    });
    $.__views.__alloyId239.add($.__views.category);
    $.__views.__alloyId240 = Ti.UI.createView({
        backgroundColor: "#ececec",
        width: Ti.UI.FILL,
        height: 1,
        id: "__alloyId240"
    });
    $.__views.table.add($.__views.__alloyId240);
    $.__views.tvrClaimUnder = Ti.UI.createView({
        id: "tvrClaimUnder",
        height: Ti.UI.SIZE,
        layout: "vertical",
        selectedBackgroundColor: "#ffffff"
    });
    $.__views.table.add($.__views.tvrClaimUnder);
    $.__views.__alloyId241 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: "45",
        textAlign: "right",
        id: "__alloyId241"
    });
    $.__views.tvrClaimUnder.add($.__views.__alloyId241);
    $.__views.__alloyId242 = Ti.UI.createLabel({
        width: "35%",
        height: Titanium.UI.SIZE,
        color: "#CE1D1C",
        font: {
            fontSize: 14
        },
        left: 10,
        text: "Claim Under",
        top: "12",
        id: "__alloyId242"
    });
    $.__views.__alloyId241.add($.__views.__alloyId242);
    $.__views.__alloyId243 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        width: "auto",
        id: "__alloyId243"
    });
    $.__views.__alloyId241.add($.__views.__alloyId243);
    $.__views.claim_under = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Titanium.UI.SIZE,
        color: "#C8C8CD",
        top: "12",
        left: 10,
        right: 10,
        bottom: 10,
        font: {
            fontSize: 12
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        text: "Choose Claim Under",
        id: "claim_under"
    });
    $.__views.__alloyId243.add($.__views.claim_under);
    $.__views.__alloyId244 = Ti.UI.createView({
        backgroundColor: "#ececec",
        width: Ti.UI.FILL,
        height: 1,
        id: "__alloyId244"
    });
    $.__views.table.add($.__views.__alloyId244);
    $.__views.tvrReceiptAmount = Ti.UI.createView({
        id: "tvrReceiptAmount",
        height: Ti.UI.SIZE,
        layout: "vertical",
        selectedBackgroundColor: "#ffffff"
    });
    $.__views.table.add($.__views.tvrReceiptAmount);
    $.__views.__alloyId245 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: "45",
        textAlign: "right",
        id: "__alloyId245"
    });
    $.__views.tvrReceiptAmount.add($.__views.__alloyId245);
    $.__views.__alloyId246 = Ti.UI.createLabel({
        width: "35%",
        height: Titanium.UI.SIZE,
        color: "#CE1D1C",
        font: {
            fontSize: 14
        },
        left: 10,
        text: "Receipt Amount",
        top: "12",
        id: "__alloyId246"
    });
    $.__views.__alloyId245.add($.__views.__alloyId246);
    $.__views.receiptAmount = Ti.UI.createTextField({
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        height: "45dp",
        font: {
            fontSize: 12
        },
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        width: Ti.UI.FILL,
        backgroundColor: "#ffffff",
        borderColor: "#ffffff",
        id: "receiptAmount",
        bottom: "5",
        right: "5",
        textAlign: "right",
        horizontalWrap: "true",
        keyboardType: Titanium.UI.KEYBOARD_DECIMAL_PAD,
        hintText: "Receipt amount in RM"
    });
    $.__views.__alloyId245.add($.__views.receiptAmount);
    $.__views.__alloyId247 = Ti.UI.createView({
        backgroundColor: "#ececec",
        width: Ti.UI.FILL,
        height: 1,
        id: "__alloyId247"
    });
    $.__views.table.add($.__views.__alloyId247);
    $.__views.tvrDateVisit = Ti.UI.createView({
        id: "tvrDateVisit",
        height: Ti.UI.SIZE,
        layout: "vertical",
        selectedBackgroundColor: "#ffffff"
    });
    $.__views.table.add($.__views.tvrDateVisit);
    showVisitPicker ? $.addListener($.__views.tvrDateVisit, "click", showVisitPicker) : __defers["$.__views.tvrDateVisit!click!showVisitPicker"] = true;
    $.__views.__alloyId248 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: "45",
        textAlign: "right",
        id: "__alloyId248"
    });
    $.__views.tvrDateVisit.add($.__views.__alloyId248);
    $.__views.__alloyId249 = Ti.UI.createLabel({
        width: "35%",
        height: Titanium.UI.SIZE,
        color: "#CE1D1C",
        font: {
            fontSize: 14
        },
        left: 10,
        text: "Date of Visit",
        top: "12",
        id: "__alloyId249"
    });
    $.__views.__alloyId248.add($.__views.__alloyId249);
    $.__views.__alloyId250 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        width: "auto",
        id: "__alloyId250"
    });
    $.__views.__alloyId248.add($.__views.__alloyId250);
    $.__views.dateVisit = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Titanium.UI.SIZE,
        color: "#C8C8CD",
        top: "12",
        left: 10,
        right: 10,
        bottom: 10,
        font: {
            fontSize: 12
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        text: "Date of visit a clinic",
        id: "dateVisit"
    });
    $.__views.__alloyId250.add($.__views.dateVisit);
    $.__views.__alloyId251 = Ti.UI.createView({
        backgroundColor: "#ececec",
        width: Ti.UI.FILL,
        height: 1,
        id: "__alloyId251"
    });
    $.__views.table.add($.__views.__alloyId251);
    $.__views.tvrClinicVisit = Ti.UI.createView({
        id: "tvrClinicVisit",
        height: Ti.UI.SIZE,
        layout: "vertical",
        selectedBackgroundColor: "#ffffff"
    });
    $.__views.table.add($.__views.tvrClinicVisit);
    $.__views.__alloyId252 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: "45",
        textAlign: "right",
        id: "__alloyId252"
    });
    $.__views.tvrClinicVisit.add($.__views.__alloyId252);
    $.__views.__alloyId253 = Ti.UI.createLabel({
        width: "40%",
        height: Titanium.UI.SIZE,
        color: "#CE1D1C",
        font: {
            fontSize: 14
        },
        left: 10,
        text: "Clinic/Hospital Name",
        top: "12",
        id: "__alloyId253"
    });
    $.__views.__alloyId252.add($.__views.__alloyId253);
    $.__views.__alloyId254 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        width: "auto",
        id: "__alloyId254"
    });
    $.__views.__alloyId252.add($.__views.__alloyId254);
    $.__views.clinicName = Ti.UI.createTextField({
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        height: "45dp",
        font: {
            fontSize: 12
        },
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        width: Ti.UI.FILL,
        backgroundColor: "#ffffff",
        borderColor: "#ffffff",
        id: "clinicName",
        top: "5",
        bottom: "5",
        right: "5",
        textAlign: "right",
        hintText: "Clinic/Hospital Name"
    });
    $.__views.__alloyId254.add($.__views.clinicName);
    $.__views.__alloyId255 = Ti.UI.createView({
        backgroundColor: "#ececec",
        width: Ti.UI.FILL,
        height: 1,
        id: "__alloyId255"
    });
    $.__views.table.add($.__views.__alloyId255);
    $.__views.tvrRemark = Ti.UI.createView({
        id: "tvrRemark",
        height: Ti.UI.SIZE,
        layout: "vertical",
        selectedBackgroundColor: "#ffffff"
    });
    $.__views.table.add($.__views.tvrRemark);
    $.__views.__alloyId256 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: "85",
        textAlign: "right",
        id: "__alloyId256"
    });
    $.__views.tvrRemark.add($.__views.__alloyId256);
    $.__views.__alloyId257 = Ti.UI.createLabel({
        width: "35%",
        height: Titanium.UI.SIZE,
        color: "#CE1D1C",
        font: {
            fontSize: 14
        },
        left: 10,
        text: "Remark",
        top: "12",
        id: "__alloyId257"
    });
    $.__views.__alloyId256.add($.__views.__alloyId257);
    $.__views.remark = Ti.UI.createTextField({
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        height: "45dp",
        font: {
            fontSize: 12
        },
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        width: Ti.UI.FILL,
        backgroundColor: "#ffffff",
        borderColor: "#ffffff",
        id: "remark",
        bottom: "5",
        right: "5",
        textAlign: "right",
        hintText: "Claim remark"
    });
    $.__views.__alloyId256.add($.__views.remark);
    $.__views.__alloyId258 = Ti.UI.createView({
        backgroundColor: "#ececec",
        width: Ti.UI.FILL,
        height: 1,
        id: "__alloyId258"
    });
    $.__views.table.add($.__views.__alloyId258);
    $.__views.tvrGstAmount = Ti.UI.createView({
        id: "tvrGstAmount",
        height: Ti.UI.SIZE,
        layout: "vertical",
        selectedBackgroundColor: "#ffffff"
    });
    $.__views.table.add($.__views.tvrGstAmount);
    $.__views.__alloyId259 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: "45",
        textAlign: "right",
        id: "__alloyId259"
    });
    $.__views.tvrGstAmount.add($.__views.__alloyId259);
    $.__views.__alloyId260 = Ti.UI.createLabel({
        width: "35%",
        height: Titanium.UI.SIZE,
        color: "#CE1D1C",
        font: {
            fontSize: 14
        },
        left: 10,
        text: "GST Amount",
        top: "12",
        id: "__alloyId260"
    });
    $.__views.__alloyId259.add($.__views.__alloyId260);
    $.__views.__alloyId261 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        width: "auto",
        id: "__alloyId261"
    });
    $.__views.__alloyId259.add($.__views.__alloyId261);
    $.__views.gstAmount = Ti.UI.createTextField({
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        height: "45dp",
        font: {
            fontSize: 12
        },
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        width: Ti.UI.FILL,
        backgroundColor: "#ffffff",
        borderColor: "#ffffff",
        id: "gstAmount",
        bottom: "5",
        right: "5",
        textAlign: "right",
        horizontalWrap: "true",
        keyboardType: Titanium.UI.KEYBOARD_DECIMAL_PAD,
        hintText: "GST Amount (If applicable)"
    });
    $.__views.__alloyId261.add($.__views.gstAmount);
    $.__views.__alloyId262 = Ti.UI.createView({
        backgroundColor: "#ececec",
        width: Ti.UI.FILL,
        height: 1,
        id: "__alloyId262"
    });
    $.__views.table.add($.__views.__alloyId262);
    $.__views.tvrMc = Ti.UI.createView({
        id: "tvrMc",
        height: Ti.UI.SIZE,
        layout: "vertical",
        selectedBackgroundColor: "#ffffff"
    });
    $.__views.table.add($.__views.tvrMc);
    $.__views.__alloyId263 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: "45",
        textAlign: "right",
        id: "__alloyId263"
    });
    $.__views.tvrMc.add($.__views.__alloyId263);
    $.__views.__alloyId264 = Ti.UI.createLabel({
        width: "35%",
        height: Titanium.UI.SIZE,
        color: "#CE1D1C",
        font: {
            fontSize: 14
        },
        left: 10,
        text: "MC Issued",
        top: "12",
        id: "__alloyId264"
    });
    $.__views.__alloyId263.add($.__views.__alloyId264);
    $.__views.mc = Ti.UI.createTextField({
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        height: "45dp",
        font: {
            fontSize: 12
        },
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        width: Ti.UI.FILL,
        backgroundColor: "#ffffff",
        borderColor: "#ffffff",
        id: "mc",
        bottom: "5",
        right: "5",
        textAlign: "right",
        horizontalWrap: "true",
        keyboardType: Ti.UI.KEYBOARD_NUMBER_PAD,
        hintText: "MC Issued (Days)"
    });
    $.__views.__alloyId263.add($.__views.mc);
    $.__views.__alloyId265 = Ti.UI.createView({
        backgroundColor: "#ececec",
        width: Ti.UI.FILL,
        height: 1,
        id: "__alloyId265"
    });
    $.__views.table.add($.__views.__alloyId265);
    $.__views.tvrDiagnosis = Ti.UI.createView({
        id: "tvrDiagnosis",
        height: Ti.UI.SIZE,
        layout: "vertical",
        selectedBackgroundColor: "#ffffff"
    });
    $.__views.table.add($.__views.tvrDiagnosis);
    $.__views.__alloyId266 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: "45",
        textAlign: "right",
        id: "__alloyId266"
    });
    $.__views.tvrDiagnosis.add($.__views.__alloyId266);
    $.__views.__alloyId267 = Ti.UI.createLabel({
        width: "35%",
        height: Titanium.UI.SIZE,
        color: "#CE1D1C",
        font: {
            fontSize: 14
        },
        left: 10,
        text: "Diagnosis",
        top: "12",
        id: "__alloyId267"
    });
    $.__views.__alloyId266.add($.__views.__alloyId267);
    $.__views.diagnosis = Ti.UI.createTextField({
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        height: "45dp",
        font: {
            fontSize: 12
        },
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        width: Ti.UI.FILL,
        backgroundColor: "#ffffff",
        borderColor: "#ffffff",
        id: "diagnosis",
        bottom: "5",
        right: "5",
        textAlign: "right",
        hintText: "Diagnosis"
    });
    $.__views.__alloyId266.add($.__views.diagnosis);
    $.__views.__alloyId268 = Ti.UI.createView({
        backgroundColor: "#ececec",
        width: Ti.UI.FILL,
        height: 1,
        id: "__alloyId268"
    });
    $.__views.table.add($.__views.__alloyId268);
    $.__views.tvrGlAmount = Ti.UI.createView({
        id: "tvrGlAmount",
        height: Ti.UI.SIZE,
        layout: "vertical",
        selectedBackgroundColor: "#ffffff"
    });
    $.__views.table.add($.__views.tvrGlAmount);
    $.__views.__alloyId269 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: "45",
        textAlign: "right",
        id: "__alloyId269"
    });
    $.__views.tvrGlAmount.add($.__views.__alloyId269);
    $.__views.__alloyId270 = Ti.UI.createLabel({
        width: "35%",
        height: Titanium.UI.SIZE,
        color: "#CE1D1C",
        font: {
            fontSize: 14
        },
        left: 10,
        text: "GL Amount",
        top: "12",
        id: "__alloyId270"
    });
    $.__views.__alloyId269.add($.__views.__alloyId270);
    $.__views.glamount = Ti.UI.createTextField({
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        height: "45dp",
        font: {
            fontSize: 12
        },
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        width: Ti.UI.FILL,
        backgroundColor: "#ffffff",
        borderColor: "#ffffff",
        id: "glamount",
        bottom: "5",
        right: "5",
        textAlign: "right",
        horizontalWrap: "true",
        keyboardType: Titanium.UI.KEYBOARD_DECIMAL_PAD,
        hintText: "GL Amount (If applicable)"
    });
    $.__views.__alloyId269.add($.__views.glamount);
    $.__views.__alloyId271 = Ti.UI.createView({
        backgroundColor: "#ececec",
        width: Ti.UI.FILL,
        height: 1,
        id: "__alloyId271"
    });
    $.__views.table.add($.__views.__alloyId271);
    $.__views.__alloyId272 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        top: "10",
        id: "__alloyId272"
    });
    $.__views.table.add($.__views.__alloyId272);
    $.__views.saveBtn = Ti.UI.createButton({
        id: "saveBtn",
        title: "Submit Claim",
        borderRadius: "5",
        backgroundColor: "#7B7B7B",
        width: "70%",
        height: "40",
        color: "#ffffff"
    });
    $.__views.__alloyId272.add($.__views.saveBtn);
    submitClaim ? $.addListener($.__views.saveBtn, "click", submitClaim) : __defers["$.__views.saveBtn!click!submitClaim"] = true;
    $.__views.selectorView = Ti.UI.createView({
        height: "0",
        bottom: "0",
        id: "selectorView",
        zIndex: "99"
    });
    $.__views.win.add($.__views.selectorView);
    $.__views.dateVisitPicker = Ti.UI.createPicker({
        format24: false,
        calendarViewShown: false,
        id: "dateVisitPicker",
        type: Ti.UI.PICKER_TYPE_DATE,
        height: "200",
        visible: "false"
    });
    $.__views.selectorView.add($.__views.dateVisitPicker);
    changeVisitDate ? $.addListener($.__views.dateVisitPicker, "change", changeVisitDate) : __defers["$.__views.dateVisitPicker!change!changeVisitDate"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var isEdit = args.edit || "";
    var serial = args.serial || "";
    var usersModel = Alloy.createCollection("users");
    var user = usersModel.getPrincipleData();
    var claimCategoryArr = [];
    var claimCategoryIdArr = [];
    var claimName = [];
    var claimMemNo = [];
    var panelCategory;
    var userMem;
    var claimCategoryId = 0;
    var claimMemId;
    common.construct($);
    common.showLoading();
    init();
    if ("" == isEdit) {
        $.tvrCategory.addEventListener("click", function() {
            var cancelBtn = claimCategoryArr.length - 1;
            var dialog = Ti.UI.createOptionDialog({
                cancel: claimCategoryArr.length - 1,
                options: claimCategoryArr,
                selectedIndex: 0,
                title: "Choose Claim Category"
            });
            dialog.show();
            dialog.addEventListener("click", function(e) {
                if (cancelBtn != e.index) {
                    claimCategoryId = claimCategoryIdArr[e.index];
                    $.category.text = claimCategoryArr[e.index];
                    $.category.color = "#000000";
                }
            });
        });
        $.tvrClaimUnder.addEventListener("click", function() {
            var cancelBtn = claimName.length - 1;
            var dialog = Ti.UI.createOptionDialog({
                cancel: claimName.length - 1,
                options: claimName,
                selectedIndex: 0,
                title: "Choose Claim Under"
            });
            dialog.show();
            dialog.addEventListener("click", function(e) {
                if (cancelBtn != e.index) {
                    claimMemId = claimMemNo[e.index];
                    $.claim_under.text = claimName[e.index];
                    $.claim_under.color = "#000000";
                }
            });
        });
    }
    $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.win);
    });
    __defers["$.__views.tvrDateVisit!click!showVisitPicker"] && $.addListener($.__views.tvrDateVisit, "click", showVisitPicker);
    __defers["$.__views.saveBtn!click!submitClaim"] && $.addListener($.__views.saveBtn, "click", submitClaim);
    __defers["$.__views.dateVisitPicker!change!changeVisitDate"] && $.addListener($.__views.dateVisitPicker, "change", changeVisitDate);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;