function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function loadMedicalInfo() {
        loadImage();
        var title = details.title;
        "" != title && (title = title.replace(/&quot;/g, "'"));
        var clinic = details.clinic;
        "undefined" == clinic && (clinic = "");
        var treatment = details.treatment;
        "undefined" == treatment && (treatment = "");
        var message = details.message;
        var treatment = treatment;
        $.titleRecord.value = title;
        $.clinicRecord.value = clinic;
        $.proceduceTextArea.value = message;
        $.treatmentTextArea.value = treatment;
        $.lastUpdated.text = "Last updated: " + timeFormat(details.updated);
    }
    function loadImage() {
        var recAttachment = medicalAttachmentModel.getRecordByMecId(rec_id);
        var counter = 0;
        removeAllChildren($.attachment);
        recAttachment.length > 0 && recAttachment.forEach(function(att) {
            var myImage = Ti.Utils.base64decode(att.blob);
            $.attachment.add(attachedPhoto(myImage, counter));
            counter++;
        });
    }
    function saveRecord() {
        var title = $.titleRecord.value;
        var clinic = $.clinicRecord.value;
        var message = $.proceduceTextArea.value;
        var treatment = $.treatmentTextArea.value;
        "" == title.trim() && (title = "Untitled - " + currentDateTime());
        medicalRecordsModel.updateRecord({
            id: rec_id,
            title: title.trim(),
            clinic: clinic.trim(),
            message: message.trim(),
            treatment: treatment.trim(),
            updated: currentDateTime()
        });
        Ti.App.fireEvent("displayRecords");
        nav.closeWindow($.editRecWin);
    }
    function deleteRecord() {
        var dialog = Ti.UI.createAlertDialog({
            cancel: 1,
            buttonNames: [ "Cancel", "Confirm" ],
            message: "Are you sure want to delete this records?",
            title: "Delete Confirmation"
        });
        dialog.addEventListener("click", function(e) {
            e.index === e.source.cancel;
            if (1 === e.index) {
                medicalRecordsModel.removeRecordById(rec_id);
                medicalAttachmentModel.removeRecordByRec(rec_id);
                Ti.App.fireEvent("displayRecords");
                nav.closeWindow($.editRecWin);
            }
        });
        dialog.show();
    }
    function backAndSave() {
        var title = $.titleRecord.value;
        var message = $.proceduceTextArea.value;
        var treatment = $.treatmentTextArea.value;
        if ("" == title.trim() && "" == message.trim() && "" == treatment.trim()) {
            var recAttachment = medicalAttachmentModel.getRecordByMecId(rec_id);
            0 == recAttachment.length && medicalRecordsModel.removeRecordById(rec_id);
        } else saveRecord();
        Ti.App.fireEvent("displayRecords");
    }
    function attachedPhoto(image, position) {
        var iView = Ti.UI.createView({
            backgroundColor: "#D5D5D5",
            height: 50,
            position: position,
            width: 50,
            left: 5,
            right: 5
        });
        var iImage = Ti.UI.createImageView({
            image: image,
            position: position
        });
        iView.add(iImage);
        iView.addEventListener("click", function() {
            var currentTime = new Date();
            if (1e3 > currentTime - clickTime) return;
            clickTime = currentTime;
            console.log("position : " + position);
            var page = Alloy.createController("attachmentDetails", {
                rec_id: rec_id,
                position: position
            }).getView();
            page.open();
            page.animate({
                curve: Ti.UI.ANIMATION_CURVE_EASE_IN,
                opacity: 1,
                duration: 300
            });
        });
        return iView;
    }
    function showCategory() {
        var dialog = Titanium.UI.createOptionDialog({
            title: "Choose a test category...",
            options: [ "Blood Test", "X Ray", "ECG/Stress test", "Urine test", "etc", "Cancel" ],
            cancel: 5
        });
        dialog.addEventListener("click", function(e) {
            0 == e.index ? categoryType = "Blood Test" : 1 == e.index ? categoryType = "X Ray" : 1 == e.index ? categoryType = "ECG/Stress test" : 1 == e.index ? categoryType = "Urine test" : 1 == e.index && (categoryType = "etc");
            takePhoto();
        });
        dialog.show();
    }
    function takePhoto() {
        var dialog = Titanium.UI.createOptionDialog({
            title: "Choose an image source...",
            options: [ "Camera", "Photo Gallery", "Cancel" ],
            cancel: 2
        });
        dialog.addEventListener("click", function(e) {
            0 == e.index ? Titanium.Media.showCamera({
                success: function(event) {
                    var image = event.media;
                    if (image.width > image.height) {
                        var newWidth = 320;
                        var ratio = 320 / image.width;
                        var newHeight = image.height * ratio;
                    } else {
                        var newHeight = 320;
                        var ratio = 320 / image.height;
                        var newWidth = image.width * ratio;
                    }
                    image = image.imageAsResized(newWidth, newHeight);
                    if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
                        blobContainer = image;
                        medicalAttachmentModel.addAttachment({
                            medical_id: rec_id,
                            category: categoryType,
                            blob: Ti.Utils.base64encode(image)
                        });
                        loadImage();
                    }
                },
                cancel: function() {},
                error: function(error) {
                    var a = Titanium.UI.createAlertDialog({
                        title: "Camera"
                    });
                    a.setMessage(error.code == Titanium.Media.NO_CAMERA ? "Device does not have camera" : "Unexpected error: " + error.code);
                    a.show();
                },
                allowImageEditing: true,
                mediaTypes: [ Ti.Media.MEDIA_TYPE_PHOTO ],
                saveToPhotoGallery: true
            }) : 1 == e.index && Titanium.Media.openPhotoGallery({
                success: function(event) {
                    var image = event.media;
                    if (image.width > image.height) {
                        var newWidth = 320;
                        var ratio = 320 / image.width;
                        var newHeight = image.height * ratio;
                    } else {
                        var newHeight = 320;
                        var ratio = 320 / image.height;
                        var newWidth = image.width * ratio;
                    }
                    image = image.imageAsResized(newWidth, newHeight);
                    blobContainer = image;
                    medicalAttachmentModel.addAttachment({
                        medical_id: rec_id,
                        category: categoryType,
                        blob: Ti.Utils.base64encode(image)
                    });
                    loadImage();
                },
                cancel: function() {},
                mediaTypes: [ Ti.Media.MEDIA_TYPE_PHOTO ]
            });
        });
        dialog.show();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "editMedical";
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
    $.__views.editRecWin = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        id: "editRecWin",
        title: "My Medical Record",
        backButtonTitle: "",
        navTintColor: "#CE1D1C"
    });
    $.__views.editRecWin && $.addTopLevelView($.__views.editRecWin);
    $.__views.__alloyId12 = Ti.UI.createView({
        id: "__alloyId12"
    });
    $.__views.saveRecord = Ti.UI.createButton({
        id: "saveRecord",
        title: "Done"
    });
    $.__views.__alloyId12.add($.__views.saveRecord);
    $.__views.editRecWin.rightNavButton = $.__views.__alloyId12;
    $.__views.__alloyId13 = Ti.UI.createView({
        layout: "vertical",
        bottom: "90",
        id: "__alloyId13"
    });
    $.__views.editRecWin.add($.__views.__alloyId13);
    $.__views.__alloyId14 = Ti.UI.createView({
        layout: "horizontal",
        height: "50",
        width: Ti.UI.FILL,
        backgroundColor: "#DEDEDE",
        id: "__alloyId14"
    });
    $.__views.__alloyId13.add($.__views.__alloyId14);
    $.__views.__alloyId15 = Ti.UI.createView({
        left: "0",
        width: "20%",
        id: "__alloyId15"
    });
    $.__views.__alloyId14.add($.__views.__alloyId15);
    $.__views.btnBack = Ti.UI.createImageView({
        left: "10",
        id: "btnBack",
        width: "25",
        height: "25",
        image: "/images/btn-back.png"
    });
    $.__views.__alloyId15.add($.__views.btnBack);
    $.__views.__alloyId16 = Ti.UI.createView({
        width: "60%",
        id: "__alloyId16"
    });
    $.__views.__alloyId14.add($.__views.__alloyId16);
    $.__views.pageTitle = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        font: {
            fontSize: "16dp"
        },
        text: "My Medical Record",
        id: "pageTitle",
        textAlign: "center"
    });
    $.__views.__alloyId16.add($.__views.pageTitle);
    $.__views.__alloyId17 = Ti.UI.createView({
        left: "0",
        width: "20%",
        id: "__alloyId17"
    });
    $.__views.__alloyId14.add($.__views.__alloyId17);
    $.__views.saveRecord = Ti.UI.createButton({
        font: {
            fontSize: "10dp"
        },
        id: "saveRecord",
        title: "Done"
    });
    $.__views.__alloyId17.add($.__views.saveRecord);
    $.__views.titleRecord = Ti.UI.createTextField({
        font: {
            fontSize: "20dp"
        },
        top: "0",
        id: "titleRecord",
        height: "40",
        hintText: "Medical Problem",
        width: "95%"
    });
    $.__views.__alloyId13.add($.__views.titleRecord);
    $.__views.__alloyId18 = Ti.UI.createView({
        height: "1",
        width: "100%",
        backgroundColor: "#CE1D1C",
        id: "__alloyId18"
    });
    $.__views.__alloyId13.add($.__views.__alloyId18);
    $.__views.aView = Ti.UI.createScrollView({
        id: "aView",
        height: Ti.UI.FILL,
        contentHeight: Ti.UI.SIZE,
        layout: "vertical"
    });
    $.__views.__alloyId13.add($.__views.aView);
    $.__views.__alloyId19 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        text: "Clinic/Hospital/Specialist",
        left: "10",
        top: "10",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        id: "__alloyId19"
    });
    $.__views.aView.add($.__views.__alloyId19);
    $.__views.clinicRecord = Ti.UI.createTextField({
        backgroundColor: "#F6F6F6",
        top: "0",
        left: "10",
        right: "10",
        id: "clinicRecord",
        height: "40",
        hintText: "",
        width: Ti.UI.FILL
    });
    $.__views.aView.add($.__views.clinicRecord);
    $.__views.__alloyId20 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        text: "Treatment",
        left: "10",
        top: "10",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        id: "__alloyId20"
    });
    $.__views.aView.add($.__views.__alloyId20);
    $.__views.treatmentTextArea = Ti.UI.createTextArea({
        id: "treatmentTextArea",
        backgroundColor: "#f6f6f6",
        color: "#888",
        textAlign: "left",
        hintText: "Treatment",
        value: "",
        width: Ti.UI.FILL,
        left: "10",
        right: "10",
        height: "200",
        suppressReturn: "false"
    });
    $.__views.aView.add($.__views.treatmentTextArea);
    $.__views.__alloyId21 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        text: "Proceduce",
        left: "10",
        top: "10",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        id: "__alloyId21"
    });
    $.__views.aView.add($.__views.__alloyId21);
    $.__views.proceduceTextArea = Ti.UI.createTextArea({
        id: "proceduceTextArea",
        backgroundColor: "#f6f6f6",
        color: "#888",
        textAlign: "left",
        hintText: "Proceduce",
        value: "",
        width: Ti.UI.FILL,
        left: "10",
        right: "10",
        height: "200",
        suppressReturn: "false"
    });
    $.__views.aView.add($.__views.proceduceTextArea);
    $.__views.__alloyId22 = Ti.UI.createView({
        bottom: "40",
        height: Ti.UI.SIZE,
        layout: "horizontal",
        width: "100%",
        id: "__alloyId22"
    });
    $.__views.editRecWin.add($.__views.__alloyId22);
    $.__views.attachment = Ti.UI.createScrollView({
        id: "attachment",
        scrollType: "horizontal",
        layout: "horizontal",
        height: Ti.UI.SIZE,
        width: "80%"
    });
    $.__views.__alloyId22.add($.__views.attachment);
    $.__views.__alloyId23 = Ti.UI.createView({
        width: "auto",
        height: Ti.UI.SIZE,
        id: "__alloyId23"
    });
    $.__views.__alloyId22.add($.__views.__alloyId23);
    showCategory ? $.__views.__alloyId23.addEventListener("click", showCategory) : __defers["$.__views.__alloyId23!click!showCategory"] = true;
    $.__views.__alloyId24 = Ti.UI.createView({
        backgroundColor: "#CE1D1C",
        height: "50",
        width: Ti.UI.FILL,
        right: "0",
        id: "__alloyId24"
    });
    $.__views.__alloyId23.add($.__views.__alloyId24);
    $.__views.addLbl = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "20dp"
        },
        id: "addLbl",
        color: "#ffffff",
        text: "+"
    });
    $.__views.__alloyId24.add($.__views.addLbl);
    $.__views.__alloyId25 = Ti.UI.createView({
        height: "40",
        layout: "horizontal",
        bottom: "0",
        width: "100%",
        backgroundColor: "#EEEEEE",
        id: "__alloyId25"
    });
    $.__views.editRecWin.add($.__views.__alloyId25);
    $.__views.__alloyId26 = Ti.UI.createButton({
        backgroundImage: "/images/btn-remove.png",
        textAlign: "left",
        left: "15",
        width: "30",
        height: "30",
        id: "__alloyId26"
    });
    $.__views.__alloyId25.add($.__views.__alloyId26);
    deleteRecord ? $.__views.__alloyId26.addEventListener("click", deleteRecord) : __defers["$.__views.__alloyId26!click!deleteRecord"] = true;
    $.__views.__alloyId27 = Ti.UI.createView({
        width: "auto",
        height: Ti.UI.FILL,
        id: "__alloyId27"
    });
    $.__views.__alloyId25.add($.__views.__alloyId27);
    $.__views.lastUpdated = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#888",
        font: {
            fontSize: "12dp"
        },
        id: "lastUpdated",
        textAlign: "right",
        right: "10"
    });
    $.__views.__alloyId27.add($.__views.lastUpdated);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var rec_id = args.id || "";
    var MRECORDS = require("medicalRecords");
    MRECORDS.construct($);
    var clickTime = null;
    var medicalAttachmentModel = Alloy.createCollection("medicalAttachment");
    var medicalRecordsModel = Alloy.createCollection("medicalRecords");
    var details = medicalRecordsModel.getRecordById(rec_id);
    loadMedicalInfo();
    var categoryType = "Blood Test";
    $.proceduceTextArea.addEventListener("focus", function() {});
    $.editRecWin.addEventListener("close", function() {
        backAndSave();
    });
    Ti.App.addEventListener("refreshAttachment", loadImage);
    $.saveRecord.addEventListener("click", saveRecord);
    $.btnBack.addEventListener("click", function() {
        console.log("close!!");
        nav.closeWindow($.editRecWin);
    });
    __defers["$.__views.__alloyId23!click!showCategory"] && $.__views.__alloyId23.addEventListener("click", showCategory);
    __defers["$.__views.__alloyId26!click!deleteRecord"] && $.__views.__alloyId26.addEventListener("click", deleteRecord);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;