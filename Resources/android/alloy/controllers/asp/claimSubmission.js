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
        loading.start();
        $.win.add(loading.getView());
        Titanium.Network.online || common.createAlert("Alert", "There is no internet connection.", closeWindow);
        var dependent = Ti.App.Properties.getString("dependent");
        userMem = JSON.parse(dependent);
        userMem.forEach(function(entry) {
            claimName.push(entry.name);
            claimMemNo.push(entry.memno);
        });
        claimName.push("Cancel");
        getClaimCategory();
        customize_setting();
    }
    function customize_setting() {
        if ("IFMY" == corpcode || "IFLP" == corpcode) {
            $.view_remark.children[0].text = "Diagnosis / Illness";
            $.view_remark.children[0].hintText = "Diagnosis / Illness";
        }
        loading.finish();
    }
    function checkIfHaveData() {
        if ("" != isEdit) {
            claimMode = "UPDATE";
            claimSerial = serial;
            var params = "SERIAL=" + serial;
            loading.start();
            API.callByGet({
                url: "getclaimReimbUrl",
                params: params
            }, function(responseText) {
                var res = JSON.parse(responseText);
                claimMemId = res[0].memno;
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
                $.claim_under.text = name;
                $.claim_under.color = "#000000";
                a = claimCategoryIdArr.indexOf(res[0].category);
                claimCategoryId = claimCategoryArr[a];
                $.category.text = claimCategoryArr[a];
                $.category.color = "#000000";
                loading.finish();
            });
            $.saveBtn.visible = false;
        }
    }
    function getClaimCategory() {
        API.callByGet({
            url: "getclaimCategoryUrl",
            params: "CORPCODE=" + corpcode
        }, function(responseText) {
            panelCategory = JSON.parse(responseText);
            if (panelCategory.length < 1) {
                common.createAlert("Error", "You are not allowed to submit claim");
                nav.closeWindow($.win);
                return false;
            }
            panelCategory.forEach(function(entry) {
                claimCategoryIdArr.push(entry.catID);
                claimCategoryArr.push(entry.catDesc);
            });
            claimCategoryIdArr.push("Cancel");
            claimCategoryArr.push("Cancel");
            loading.finish();
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
        var mode = claimMode;
        if (("IFMY" == corpcode || "IFLP" == corpcode) && "" == remark) {
            common.resultPopUp("Error", "Please fill in Diagnosis / Illness.");
            return false;
        }
        if ("" == receiptNo.trim()) {
            common.resultPopUp("Error", "Please fill in receipt number");
            return false;
        }
        if ("" == claimCategory) {
            common.resultPopUp("Error", "Please choose ONE category");
            return false;
        }
        if ("undefined" == typeof claimUnder) {
            common.resultPopUp("Error", "Please choose ONE claim under");
            return false;
        }
        if ("" == receiptAmount || 0 >= receiptAmount) {
            common.resultPopUp("Error", "Please fill in receipt amount in RM");
            return false;
        }
        if ("" == dateVisit) {
            common.resultPopUp("Error", "Please choose date visit to clinic/hospital");
            return false;
        }
        dateVisit = dateVisit.split("/");
        dateVisit = dateVisit[1] + "/" + dateVisit[0] + "/" + dateVisit[2];
        if ("" == clinicName) {
            common.resultPopUp("Error", "Please fill in clinic/hospital to visit");
            return false;
        }
        var ser = "";
        "" != isEdit && (ser = "&SERIAL=" + claimSerial);
        var params = "RECNO=" + receiptNo + "&CATEGORY=" + claimCategory + "&MEMNO=" + claimUnder + "&EMPNO=" + empno + "&CORPCODE=" + corpcode + "&AMT=" + receiptAmount + "&VISITDT=" + dateVisit + "&NCLINIC=" + clinicName + "&REMARKS=" + remark + "&GSTAMT=" + gstAmount + "&MCDAYS=" + mc + "&DIAGNOSIS=" + diagnosis + "&GLAMT=" + glamount + "&MODE=" + mode + ser;
        console.log(params);
        loading.start();
        API.callByGet({
            url: "getclaimSubmissionUrl",
            params: params
        }, function(responseText) {
            var res = JSON.parse(responseText);
            console.log(res);
            loading.finish();
            "02" == res[0]["code"] ? common.createAlert("Success", res[0]["message"], function() {
                $.win.close();
            }) : common.createAlert("Error", res[0]["message"]);
        }, function(responseText) {
            loading.finish();
            common.createAlert("Error", "The Server is busy. Please try again later.");
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
        console.log("trigger!");
        console.log(selDate);
        $.dateVisit.text = selDate;
        $.dateVisit.color = "#000000";
    }
    function showVisitPicker() {
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
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "asp/claimSubmission";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        orientationModes: [ Ti.UI.PORTRAIT ],
        fullscreen: false,
        windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN,
        title: "Claim Submission",
        id: "win",
        backButtonTitle: "",
        navTintColor: "#CE1D1C"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.main = Ti.UI.createView({
        id: "main",
        layout: "vertical"
    });
    $.__views.win.add($.__views.main);
    $.__views.__alloyId464 = Ti.UI.createView({
        layout: "horizontal",
        height: 50,
        width: Ti.UI.FILL,
        backgroundColor: "#DEDEDE",
        id: "__alloyId464"
    });
    $.__views.main.add($.__views.__alloyId464);
    $.__views.__alloyId465 = Ti.UI.createView({
        left: 0,
        width: "10%",
        id: "__alloyId465"
    });
    $.__views.__alloyId464.add($.__views.__alloyId465);
    $.__views.btnBack = Ti.UI.createImageView({
        left: 10,
        id: "btnBack",
        width: 25,
        height: 25,
        image: "/images/btn-back.png"
    });
    $.__views.__alloyId465.add($.__views.btnBack);
    $.__views.__alloyId466 = Ti.UI.createView({
        width: "90%",
        id: "__alloyId466"
    });
    $.__views.__alloyId464.add($.__views.__alloyId466);
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
    $.__views.__alloyId466.add($.__views.pageTitle);
    $.__views.__alloyId467 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Titanium.UI.SIZE,
        color: "#606060",
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
        font: {
            fontSize: 14
        },
        text: "Please fill in below info to claim from ASP",
        id: "__alloyId467"
    });
    $.__views.main.add($.__views.__alloyId467);
    $.__views.table = Ti.UI.createScrollView({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "table",
        top: 10,
        bottom: 10,
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
    $.__views.__alloyId468 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: 45,
        textAlign: "right",
        id: "__alloyId468"
    });
    $.__views.tvrReceiptNo.add($.__views.__alloyId468);
    $.__views.__alloyId469 = Ti.UI.createLabel({
        width: "35%",
        height: Titanium.UI.SIZE,
        color: "#CE1D1C",
        font: {
            fontSize: 14
        },
        left: 10,
        text: "Receipt Number",
        top: 12,
        id: "__alloyId469"
    });
    $.__views.__alloyId468.add($.__views.__alloyId469);
    $.__views.receipt_no = Ti.UI.createTextField({
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        height: "45dp",
        font: {
            fontSize: 12
        },
        color: "#222222",
        borderWidth: "1px",
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        width: Ti.UI.FILL,
        backgroundColor: "#ffffff",
        borderColor: "#ffffff",
        id: "receipt_no",
        bottom: 5,
        right: 5,
        textAlign: "right",
        maxLength: 30,
        hintText: "Receipt Number"
    });
    $.__views.__alloyId468.add($.__views.receipt_no);
    $.__views.__alloyId470 = Ti.UI.createView({
        backgroundColor: "#ececec",
        width: Ti.UI.FILL,
        height: 1,
        id: "__alloyId470"
    });
    $.__views.tvrReceiptNo.add($.__views.__alloyId470);
    $.__views.tvrCategory = Ti.UI.createView({
        id: "tvrCategory",
        height: Ti.UI.SIZE,
        layout: "vertical",
        selectedBackgroundColor: "#ffffff"
    });
    $.__views.table.add($.__views.tvrCategory);
    $.__views.__alloyId471 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: 45,
        textAlign: "right",
        id: "__alloyId471"
    });
    $.__views.tvrCategory.add($.__views.__alloyId471);
    $.__views.__alloyId472 = Ti.UI.createLabel({
        width: "35%",
        height: Titanium.UI.SIZE,
        color: "#CE1D1C",
        font: {
            fontSize: 14
        },
        left: 10,
        text: "Category",
        top: 12,
        id: "__alloyId472"
    });
    $.__views.__alloyId471.add($.__views.__alloyId472);
    $.__views.__alloyId473 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        skip_checking: 1,
        width: "auto",
        id: "__alloyId473"
    });
    $.__views.__alloyId471.add($.__views.__alloyId473);
    $.__views.category = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Titanium.UI.SIZE,
        color: "#C8C8CD",
        top: 12,
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
    $.__views.__alloyId473.add($.__views.category);
    $.__views.__alloyId474 = Ti.UI.createView({
        backgroundColor: "#ececec",
        width: Ti.UI.FILL,
        height: 1,
        id: "__alloyId474"
    });
    $.__views.tvrCategory.add($.__views.__alloyId474);
    $.__views.tvrClaimUnder = Ti.UI.createView({
        id: "tvrClaimUnder",
        height: Ti.UI.SIZE,
        layout: "vertical",
        selectedBackgroundColor: "#ffffff"
    });
    $.__views.table.add($.__views.tvrClaimUnder);
    $.__views.__alloyId475 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: 45,
        textAlign: "right",
        id: "__alloyId475"
    });
    $.__views.tvrClaimUnder.add($.__views.__alloyId475);
    $.__views.__alloyId476 = Ti.UI.createLabel({
        width: "35%",
        height: Titanium.UI.SIZE,
        color: "#CE1D1C",
        font: {
            fontSize: 14
        },
        left: 10,
        text: "Claim Under",
        top: 12,
        id: "__alloyId476"
    });
    $.__views.__alloyId475.add($.__views.__alloyId476);
    $.__views.__alloyId477 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        skip_checking: 1,
        width: "auto",
        id: "__alloyId477"
    });
    $.__views.__alloyId475.add($.__views.__alloyId477);
    $.__views.claim_under = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Titanium.UI.SIZE,
        color: "#C8C8CD",
        top: 12,
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
    $.__views.__alloyId477.add($.__views.claim_under);
    $.__views.__alloyId478 = Ti.UI.createView({
        backgroundColor: "#ececec",
        width: Ti.UI.FILL,
        height: 1,
        id: "__alloyId478"
    });
    $.__views.tvrClaimUnder.add($.__views.__alloyId478);
    $.__views.tvrReceiptAmount = Ti.UI.createView({
        id: "tvrReceiptAmount",
        height: Ti.UI.SIZE,
        layout: "vertical",
        selectedBackgroundColor: "#ffffff"
    });
    $.__views.table.add($.__views.tvrReceiptAmount);
    $.__views.__alloyId479 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: 45,
        textAlign: "right",
        id: "__alloyId479"
    });
    $.__views.tvrReceiptAmount.add($.__views.__alloyId479);
    $.__views.__alloyId480 = Ti.UI.createLabel({
        width: "35%",
        height: Titanium.UI.SIZE,
        color: "#CE1D1C",
        font: {
            fontSize: 14
        },
        left: 10,
        text: "Receipt Amount",
        top: 12,
        id: "__alloyId480"
    });
    $.__views.__alloyId479.add($.__views.__alloyId480);
    $.__views.receiptAmount = Ti.UI.createTextField({
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        height: "45dp",
        font: {
            fontSize: 12
        },
        color: "#222222",
        borderWidth: "1px",
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        width: Ti.UI.FILL,
        backgroundColor: "#ffffff",
        borderColor: "#ffffff",
        id: "receiptAmount",
        bottom: 5,
        right: 5,
        textAlign: "right",
        horizontalWrap: true,
        keyboardType: Titanium.UI.KEYBOARD_DECIMAL_PAD,
        hintText: "Receipt amount in RM"
    });
    $.__views.__alloyId479.add($.__views.receiptAmount);
    $.__views.__alloyId481 = Ti.UI.createView({
        backgroundColor: "#ececec",
        width: Ti.UI.FILL,
        height: 1,
        id: "__alloyId481"
    });
    $.__views.tvrReceiptAmount.add($.__views.__alloyId481);
    $.__views.tvrDateVisit = Ti.UI.createView({
        id: "tvrDateVisit",
        height: Ti.UI.SIZE,
        layout: "vertical",
        selectedBackgroundColor: "#ffffff"
    });
    $.__views.table.add($.__views.tvrDateVisit);
    showVisitPicker ? $.addListener($.__views.tvrDateVisit, "click", showVisitPicker) : __defers["$.__views.tvrDateVisit!click!showVisitPicker"] = true;
    $.__views.__alloyId482 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: 45,
        textAlign: "right",
        id: "__alloyId482"
    });
    $.__views.tvrDateVisit.add($.__views.__alloyId482);
    $.__views.__alloyId483 = Ti.UI.createLabel({
        width: "35%",
        height: Titanium.UI.SIZE,
        color: "#CE1D1C",
        font: {
            fontSize: 14
        },
        left: 10,
        text: "Date of Visit",
        top: 12,
        id: "__alloyId483"
    });
    $.__views.__alloyId482.add($.__views.__alloyId483);
    $.__views.__alloyId484 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        skip_checking: 1,
        width: "auto",
        id: "__alloyId484"
    });
    $.__views.__alloyId482.add($.__views.__alloyId484);
    $.__views.dateVisit = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Titanium.UI.SIZE,
        color: "#C8C8CD",
        top: 12,
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
    $.__views.__alloyId484.add($.__views.dateVisit);
    $.__views.__alloyId485 = Ti.UI.createView({
        backgroundColor: "#ececec",
        width: Ti.UI.FILL,
        height: 1,
        id: "__alloyId485"
    });
    $.__views.table.add($.__views.__alloyId485);
    $.__views.tvrClinicVisit = Ti.UI.createView({
        id: "tvrClinicVisit",
        height: Ti.UI.SIZE,
        layout: "vertical",
        selectedBackgroundColor: "#ffffff"
    });
    $.__views.table.add($.__views.tvrClinicVisit);
    $.__views.__alloyId486 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: 45,
        textAlign: "right",
        id: "__alloyId486"
    });
    $.__views.tvrClinicVisit.add($.__views.__alloyId486);
    $.__views.__alloyId487 = Ti.UI.createLabel({
        width: "40%",
        height: Titanium.UI.SIZE,
        color: "#CE1D1C",
        font: {
            fontSize: 14
        },
        left: 10,
        text: "Clinic/Hospital Name",
        top: 12,
        id: "__alloyId487"
    });
    $.__views.__alloyId486.add($.__views.__alloyId487);
    $.__views.clinicName = Ti.UI.createTextField({
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        height: "45dp",
        font: {
            fontSize: 12
        },
        color: "#222222",
        borderWidth: "1px",
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        width: Ti.UI.FILL,
        backgroundColor: "#ffffff",
        maxLength: 40,
        borderColor: "#ffffff",
        id: "clinicName",
        top: 5,
        bottom: 5,
        right: 5,
        textAlign: "right",
        hintText: "Clinic/Hospital Name"
    });
    $.__views.__alloyId486.add($.__views.clinicName);
    $.__views.__alloyId488 = Ti.UI.createView({
        backgroundColor: "#ececec",
        width: Ti.UI.FILL,
        height: 1,
        id: "__alloyId488"
    });
    $.__views.tvrClinicVisit.add($.__views.__alloyId488);
    $.__views.tvrRemark = Ti.UI.createView({
        id: "tvrRemark",
        height: Ti.UI.SIZE,
        layout: "vertical",
        selectedBackgroundColor: "#ffffff"
    });
    $.__views.table.add($.__views.tvrRemark);
    $.__views.view_remark = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.FILL,
        id: "view_remark",
        height: 85,
        textAlign: "right"
    });
    $.__views.tvrRemark.add($.__views.view_remark);
    $.__views.__alloyId489 = Ti.UI.createLabel({
        width: "35%",
        height: Titanium.UI.SIZE,
        color: "#CE1D1C",
        font: {
            fontSize: 14
        },
        left: 10,
        text: "Remark",
        top: 12,
        id: "__alloyId489"
    });
    $.__views.view_remark.add($.__views.__alloyId489);
    $.__views.remark = Ti.UI.createTextField({
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        height: "45dp",
        font: {
            fontSize: 12
        },
        color: "#222222",
        borderWidth: "1px",
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        width: Ti.UI.FILL,
        backgroundColor: "#ffffff",
        borderColor: "#ffffff",
        compulsory: 0,
        id: "remark",
        bottom: 5,
        right: 5,
        textAlign: "right",
        hintText: "Claim remark"
    });
    $.__views.view_remark.add($.__views.remark);
    $.__views.__alloyId490 = Ti.UI.createView({
        backgroundColor: "#ececec",
        width: Ti.UI.FILL,
        height: 1,
        id: "__alloyId490"
    });
    $.__views.tvrRemark.add($.__views.__alloyId490);
    $.__views.tvrGstAmount = Ti.UI.createView({
        id: "tvrGstAmount",
        height: Ti.UI.SIZE,
        layout: "vertical",
        selectedBackgroundColor: "#ffffff"
    });
    $.__views.table.add($.__views.tvrGstAmount);
    $.__views.__alloyId491 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: 45,
        textAlign: "right",
        id: "__alloyId491"
    });
    $.__views.tvrGstAmount.add($.__views.__alloyId491);
    $.__views.__alloyId492 = Ti.UI.createLabel({
        width: "35%",
        height: Titanium.UI.SIZE,
        color: "#CE1D1C",
        font: {
            fontSize: 14
        },
        left: 10,
        text: "GST Amount",
        top: 12,
        id: "__alloyId492"
    });
    $.__views.__alloyId491.add($.__views.__alloyId492);
    $.__views.gstAmount = Ti.UI.createTextField({
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        height: "45dp",
        font: {
            fontSize: 12
        },
        color: "#222222",
        borderWidth: "1px",
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        width: Ti.UI.FILL,
        backgroundColor: "#ffffff",
        borderColor: "#ffffff",
        id: "gstAmount",
        bottom: 5,
        right: 5,
        textAlign: "right",
        horizontalWrap: true,
        keyboardType: Titanium.UI.KEYBOARD_DECIMAL_PAD,
        hintText: "GST Amount (If applicable)"
    });
    $.__views.__alloyId491.add($.__views.gstAmount);
    $.__views.__alloyId493 = Ti.UI.createView({
        backgroundColor: "#ececec",
        width: Ti.UI.FILL,
        height: 1,
        id: "__alloyId493"
    });
    $.__views.tvrGstAmount.add($.__views.__alloyId493);
    $.__views.tvrMc = Ti.UI.createView({
        id: "tvrMc",
        height: Ti.UI.SIZE,
        layout: "vertical",
        selectedBackgroundColor: "#ffffff"
    });
    $.__views.table.add($.__views.tvrMc);
    $.__views.__alloyId494 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: 45,
        textAlign: "right",
        id: "__alloyId494"
    });
    $.__views.tvrMc.add($.__views.__alloyId494);
    $.__views.__alloyId495 = Ti.UI.createLabel({
        width: "35%",
        height: Titanium.UI.SIZE,
        color: "#CE1D1C",
        font: {
            fontSize: 14
        },
        left: 10,
        text: "MC Issued",
        top: 12,
        id: "__alloyId495"
    });
    $.__views.__alloyId494.add($.__views.__alloyId495);
    $.__views.mc = Ti.UI.createTextField({
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        height: "45dp",
        font: {
            fontSize: 12
        },
        color: "#222222",
        borderWidth: "1px",
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        width: Ti.UI.FILL,
        backgroundColor: "#ffffff",
        borderColor: "#ffffff",
        id: "mc",
        bottom: 5,
        right: 5,
        textAlign: "right",
        horizontalWrap: true,
        keyboardType: Ti.UI.KEYBOARD_NUMBER_PAD,
        hintText: "MC Issued (Days)"
    });
    $.__views.__alloyId494.add($.__views.mc);
    $.__views.__alloyId496 = Ti.UI.createView({
        backgroundColor: "#ececec",
        width: Ti.UI.FILL,
        height: 1,
        id: "__alloyId496"
    });
    $.__views.tvrMc.add($.__views.__alloyId496);
    $.__views.tvrDiagnosis = Ti.UI.createView({
        id: "tvrDiagnosis",
        height: Ti.UI.SIZE,
        layout: "vertical",
        selectedBackgroundColor: "#ffffff"
    });
    $.__views.table.add($.__views.tvrDiagnosis);
    $.__views.__alloyId497 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: 45,
        textAlign: "right",
        id: "__alloyId497"
    });
    $.__views.tvrDiagnosis.add($.__views.__alloyId497);
    $.__views.__alloyId498 = Ti.UI.createLabel({
        width: "35%",
        height: Titanium.UI.SIZE,
        color: "#CE1D1C",
        font: {
            fontSize: 14
        },
        left: 10,
        text: "Diagnosis",
        top: 12,
        id: "__alloyId498"
    });
    $.__views.__alloyId497.add($.__views.__alloyId498);
    $.__views.diagnosis = Ti.UI.createTextField({
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        height: "45dp",
        font: {
            fontSize: 12
        },
        color: "#222222",
        borderWidth: "1px",
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        width: Ti.UI.FILL,
        backgroundColor: "#ffffff",
        borderColor: "#ffffff",
        id: "diagnosis",
        bottom: 5,
        right: 5,
        textAlign: "right",
        hintText: "Diagnosis"
    });
    $.__views.__alloyId497.add($.__views.diagnosis);
    $.__views.__alloyId499 = Ti.UI.createView({
        backgroundColor: "#ececec",
        width: Ti.UI.FILL,
        height: 1,
        id: "__alloyId499"
    });
    $.__views.tvrDiagnosis.add($.__views.__alloyId499);
    $.__views.tvrGlAmount = Ti.UI.createView({
        id: "tvrGlAmount",
        height: Ti.UI.SIZE,
        layout: "vertical",
        selectedBackgroundColor: "#ffffff"
    });
    $.__views.table.add($.__views.tvrGlAmount);
    $.__views.__alloyId500 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: 45,
        textAlign: "right",
        id: "__alloyId500"
    });
    $.__views.tvrGlAmount.add($.__views.__alloyId500);
    $.__views.__alloyId501 = Ti.UI.createLabel({
        width: "35%",
        height: Titanium.UI.SIZE,
        color: "#CE1D1C",
        font: {
            fontSize: 14
        },
        left: 10,
        text: "GL Amount",
        top: 12,
        id: "__alloyId501"
    });
    $.__views.__alloyId500.add($.__views.__alloyId501);
    $.__views.glamount = Ti.UI.createTextField({
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        height: "45dp",
        font: {
            fontSize: 12
        },
        color: "#222222",
        borderWidth: "1px",
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        width: Ti.UI.FILL,
        backgroundColor: "#ffffff",
        borderColor: "#ffffff",
        id: "glamount",
        bottom: 5,
        right: 5,
        textAlign: "right",
        horizontalWrap: true,
        keyboardType: Titanium.UI.KEYBOARD_DECIMAL_PAD,
        hintText: "GL Amount (If applicable)"
    });
    $.__views.__alloyId500.add($.__views.glamount);
    $.__views.__alloyId502 = Ti.UI.createView({
        backgroundColor: "#ececec",
        width: Ti.UI.FILL,
        height: 1,
        id: "__alloyId502"
    });
    $.__views.tvrGlAmount.add($.__views.__alloyId502);
    $.__views.__alloyId503 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        top: 10,
        id: "__alloyId503"
    });
    $.__views.table.add($.__views.__alloyId503);
    $.__views.saveBtn = Ti.UI.createButton({
        id: "saveBtn",
        title: "Submit Claim",
        borderRadius: 5,
        backgroundColor: "#7B7B7B",
        width: "70%",
        height: 40,
        color: "#ffffff"
    });
    $.__views.__alloyId503.add($.__views.saveBtn);
    submitClaim ? $.addListener($.__views.saveBtn, "click", submitClaim) : __defers["$.__views.saveBtn!click!submitClaim"] = true;
    $.__views.selectorView = Ti.UI.createView({
        height: 0,
        bottom: 0,
        id: "selectorView",
        zIndex: 99
    });
    $.__views.win.add($.__views.selectorView);
    $.__views.dateVisitPicker = Ti.UI.createPicker({
        format24: false,
        calendarViewShown: false,
        id: "dateVisitPicker",
        type: Ti.UI.PICKER_TYPE_DATE,
        height: 200,
        visible: false
    });
    $.__views.selectorView.add($.__views.dateVisitPicker);
    changeVisitDate ? $.addListener($.__views.dateVisitPicker, "change", changeVisitDate) : __defers["$.__views.dateVisitPicker!change!changeVisitDate"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var isEdit = args.edit || "";
    var serial = args.serial || "";
    var corpcode = Ti.App.Properties.getString("corpcode");
    var empno = Ti.App.Properties.getString("empno");
    var name = Ti.App.Properties.getString("fullname");
    var claimCategoryArr = [];
    var claimCategoryIdArr = [];
    var claimName = [];
    var claimMemNo = [];
    var panelCategory;
    var userMem;
    var claimCategoryId = 0;
    var claimMemId;
    var claimSerial;
    var claimMode = "INSERT";
    var loading = Alloy.createController("loading");
    common.construct($);
    init();
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
    console.log("claimName");
    console.log(claimName);
    $.tvrClaimUnder.addEventListener("click", function() {
        var cancelBtn = claimName.length - 1;
        var dialog = Ti.UI.createOptionDialog({
            cancel: claimName.length - 1,
            options: claimName,
            title: "Choose Claim Under"
        });
        dialog.show();
        dialog.addEventListener("click", function(e) {
            if ("1" == claimName.length || cancelBtn != e.index) {
                claimMemId = claimMemNo[e.index];
                $.claim_under.text = claimName[e.index];
                $.claim_under.color = "#000000";
            }
        });
    });
    $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.win);
    });
    __defers["$.__views.tvrDateVisit!click!showVisitPicker"] && $.addListener($.__views.tvrDateVisit, "click", showVisitPicker);
    __defers["$.__views.saveBtn!click!submitClaim"] && $.addListener($.__views.saveBtn, "click", submitClaim);
    __defers["$.__views.dateVisitPicker!change!changeVisitDate"] && $.addListener($.__views.dateVisitPicker, "change", changeVisitDate);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;