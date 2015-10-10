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
            right: 5,
            bottom: 0
        });
        var iImage = Ti.UI.createImageView({
            image: image,
            position: position,
            width: Ti.UI.FILL
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
        var pWidth = Ti.Platform.displayCaps.platformWidth;
        var pHeight = Ti.Platform.displayCaps.platformHeight;
        console.log(pWidth + "wwww");
        dialog.addEventListener("click", function(e) {
            0 == e.index ? Titanium.Media.showCamera({
                success: function(event) {
                    var image = event.media;
                    if (image.width > image.height) {
                        var newWidth = pWidth;
                        var ratio = pWidth / image.width;
                        var newHeight = image.height * ratio;
                    } else {
                        var newHeight = pHeight;
                        var ratio = pHeight / image.height;
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
                        var newWidth = pWidth;
                        var ratio = pWidth / image.width;
                        var newHeight = image.height * ratio;
                    } else {
                        var newHeight = pHeight;
                        var ratio = pHeight / image.height;
                        var newWidth = image.width * ratio;
                    }
                    image = image.imageAsResized(newWidth, newHeight);
                    blobContainer = image;
                    console.log(pWidth + " " + newWidth);
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
<<<<<<< HEAD
    $.__views.__alloyId47 = Ti.UI.createView({
        layout: "vertical",
        bottom: "90",
        id: "__alloyId47"
    });
    $.__views.editRecWin.add($.__views.__alloyId47);
    $.__views.__alloyId48 = Ti.UI.createView({
=======
    $.__views.__alloyId22 = Ti.UI.createView({
        layout: "vertical",
        bottom: "90",
        id: "__alloyId22"
    });
    $.__views.editRecWin.add($.__views.__alloyId22);
    $.__views.__alloyId23 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        height: "50",
        width: Ti.UI.FILL,
        backgroundColor: "#DEDEDE",
<<<<<<< HEAD
        id: "__alloyId48"
    });
    $.__views.__alloyId47.add($.__views.__alloyId48);
    $.__views.__alloyId49 = Ti.UI.createView({
        left: "0",
        width: "20%",
        id: "__alloyId49"
    });
    $.__views.__alloyId48.add($.__views.__alloyId49);
=======
        id: "__alloyId23"
    });
    $.__views.__alloyId22.add($.__views.__alloyId23);
    $.__views.__alloyId24 = Ti.UI.createView({
        left: "0",
        width: "20%",
        id: "__alloyId24"
    });
    $.__views.__alloyId23.add($.__views.__alloyId24);
>>>>>>> origin/master
    $.__views.btnBack = Ti.UI.createImageView({
        left: "10",
        id: "btnBack",
        width: "25",
        height: "25",
        image: "/images/btn-back.png"
    });
<<<<<<< HEAD
    $.__views.__alloyId49.add($.__views.btnBack);
    $.__views.__alloyId50 = Ti.UI.createView({
        width: "60%",
        id: "__alloyId50"
    });
    $.__views.__alloyId48.add($.__views.__alloyId50);
=======
    $.__views.__alloyId24.add($.__views.btnBack);
    $.__views.__alloyId25 = Ti.UI.createView({
        width: "60%",
        id: "__alloyId25"
    });
    $.__views.__alloyId23.add($.__views.__alloyId25);
>>>>>>> origin/master
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
<<<<<<< HEAD
    $.__views.__alloyId50.add($.__views.pageTitle);
    $.__views.__alloyId51 = Ti.UI.createView({
        left: "0",
        width: "20%",
        id: "__alloyId51"
    });
    $.__views.__alloyId48.add($.__views.__alloyId51);
=======
    $.__views.__alloyId25.add($.__views.pageTitle);
    $.__views.__alloyId26 = Ti.UI.createView({
        left: "0",
        width: "20%",
        id: "__alloyId26"
    });
    $.__views.__alloyId23.add($.__views.__alloyId26);
>>>>>>> origin/master
    $.__views.saveRecord = Ti.UI.createButton({
        font: {
            fontSize: "10dp"
        },
        color: "#000",
        id: "saveRecord",
        title: "Done"
    });
<<<<<<< HEAD
    $.__views.__alloyId51.add($.__views.saveRecord);
=======
    $.__views.__alloyId26.add($.__views.saveRecord);
>>>>>>> origin/master
    $.__views.titleRecord = Ti.UI.createTextField({
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        height: "40",
        font: {
            fontSize: "20dp"
        },
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        width: "95%",
        backgroundColor: "#ffffff",
        top: "0",
        id: "titleRecord",
        hintText: "Medical Problem"
    });
<<<<<<< HEAD
    $.__views.__alloyId47.add($.__views.titleRecord);
    $.__views.__alloyId52 = Ti.UI.createView({
        height: "1",
        width: "100%",
        backgroundColor: "#CE1D1C",
        id: "__alloyId52"
    });
    $.__views.__alloyId47.add($.__views.__alloyId52);
=======
    $.__views.__alloyId22.add($.__views.titleRecord);
    $.__views.__alloyId27 = Ti.UI.createView({
        height: "1",
        width: "100%",
        backgroundColor: "#CE1D1C",
        id: "__alloyId27"
    });
    $.__views.__alloyId22.add($.__views.__alloyId27);
>>>>>>> origin/master
    $.__views.aView = Ti.UI.createScrollView({
        id: "aView",
        height: Ti.UI.FILL,
        contentHeight: Ti.UI.SIZE,
        layout: "vertical"
    });
<<<<<<< HEAD
    $.__views.__alloyId47.add($.__views.aView);
    $.__views.__alloyId53 = Ti.UI.createLabel({
=======
    $.__views.__alloyId22.add($.__views.aView);
    $.__views.__alloyId28 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        text: "Clinic/Hospital/Specialist",
        left: "10",
        top: "10",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
<<<<<<< HEAD
        id: "__alloyId53"
    });
    $.__views.aView.add($.__views.__alloyId53);
=======
        id: "__alloyId28"
    });
    $.__views.aView.add($.__views.__alloyId28);
>>>>>>> origin/master
    $.__views.clinicRecord = Ti.UI.createTextField({
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        height: "40",
        font: {
            fontSize: "14dp"
        },
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        width: Ti.UI.FILL,
        backgroundColor: "#F6F6F6",
        top: "0",
        left: "10",
        right: "10",
        id: "clinicRecord",
        hintText: ""
    });
    $.__views.aView.add($.__views.clinicRecord);
<<<<<<< HEAD
    $.__views.__alloyId54 = Ti.UI.createLabel({
=======
    $.__views.__alloyId29 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        text: "Treatment",
        left: "10",
        top: "10",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
<<<<<<< HEAD
        id: "__alloyId54"
    });
    $.__views.aView.add($.__views.__alloyId54);
=======
        id: "__alloyId29"
    });
    $.__views.aView.add($.__views.__alloyId29);
>>>>>>> origin/master
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
<<<<<<< HEAD
    $.__views.__alloyId55 = Ti.UI.createLabel({
=======
    $.__views.__alloyId30 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        text: "Procedures",
        left: "10",
        top: "10",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
<<<<<<< HEAD
        id: "__alloyId55"
    });
    $.__views.aView.add($.__views.__alloyId55);
=======
        id: "__alloyId30"
    });
    $.__views.aView.add($.__views.__alloyId30);
>>>>>>> origin/master
    $.__views.proceduceTextArea = Ti.UI.createTextArea({
        id: "proceduceTextArea",
        backgroundColor: "#f6f6f6",
        color: "#888",
        textAlign: "left",
        hintText: "Procedures",
        value: "",
        width: Ti.UI.FILL,
        left: "10",
        right: "10",
        height: "200",
        suppressReturn: "false"
    });
    $.__views.aView.add($.__views.proceduceTextArea);
<<<<<<< HEAD
    $.__views.__alloyId56 = Ti.UI.createView({
=======
    $.__views.__alloyId31 = Ti.UI.createView({
>>>>>>> origin/master
        bottom: "40",
        height: Ti.UI.SIZE,
        layout: "horizontal",
        width: "100%",
<<<<<<< HEAD
        id: "__alloyId56"
    });
    $.__views.editRecWin.add($.__views.__alloyId56);
=======
        id: "__alloyId31"
    });
    $.__views.editRecWin.add($.__views.__alloyId31);
>>>>>>> origin/master
    $.__views.attachment = Ti.UI.createScrollView({
        id: "attachment",
        scrollType: "horizontal",
        layout: "horizontal",
        height: Ti.UI.SIZE,
        width: "80%"
    });
<<<<<<< HEAD
    $.__views.__alloyId56.add($.__views.attachment);
    $.__views.__alloyId57 = Ti.UI.createView({
        width: "auto",
        height: Ti.UI.SIZE,
        id: "__alloyId57"
    });
    $.__views.__alloyId56.add($.__views.__alloyId57);
    showCategory ? $.addListener($.__views.__alloyId57, "click", showCategory) : __defers["$.__views.__alloyId57!click!showCategory"] = true;
    $.__views.__alloyId58 = Ti.UI.createView({
=======
    $.__views.__alloyId31.add($.__views.attachment);
    $.__views.__alloyId32 = Ti.UI.createView({
        width: "auto",
        height: Ti.UI.SIZE,
        id: "__alloyId32"
    });
    $.__views.__alloyId31.add($.__views.__alloyId32);
    showCategory ? $.addListener($.__views.__alloyId32, "click", showCategory) : __defers["$.__views.__alloyId32!click!showCategory"] = true;
    $.__views.__alloyId33 = Ti.UI.createView({
>>>>>>> origin/master
        backgroundColor: "#CE1D1C",
        height: "50",
        width: Ti.UI.FILL,
        right: "0",
<<<<<<< HEAD
        id: "__alloyId58"
    });
    $.__views.__alloyId57.add($.__views.__alloyId58);
=======
        id: "__alloyId33"
    });
    $.__views.__alloyId32.add($.__views.__alloyId33);
>>>>>>> origin/master
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
<<<<<<< HEAD
    $.__views.__alloyId58.add($.__views.addLbl);
    $.__views.__alloyId59 = Ti.UI.createView({
=======
    $.__views.__alloyId33.add($.__views.addLbl);
    $.__views.__alloyId34 = Ti.UI.createView({
>>>>>>> origin/master
        height: "40",
        layout: "horizontal",
        bottom: "0",
        width: "100%",
        backgroundColor: "#EEEEEE",
<<<<<<< HEAD
        id: "__alloyId59"
    });
    $.__views.editRecWin.add($.__views.__alloyId59);
    $.__views.__alloyId60 = Ti.UI.createButton({
=======
        id: "__alloyId34"
    });
    $.__views.editRecWin.add($.__views.__alloyId34);
    $.__views.__alloyId35 = Ti.UI.createButton({
>>>>>>> origin/master
        backgroundImage: "/images/btn-remove.png",
        textAlign: "left",
        left: "15",
        width: "30",
        height: "30",
<<<<<<< HEAD
        id: "__alloyId60"
    });
    $.__views.__alloyId59.add($.__views.__alloyId60);
    deleteRecord ? $.addListener($.__views.__alloyId60, "click", deleteRecord) : __defers["$.__views.__alloyId60!click!deleteRecord"] = true;
    $.__views.__alloyId61 = Ti.UI.createView({
        width: "auto",
        height: Ti.UI.FILL,
        id: "__alloyId61"
    });
    $.__views.__alloyId59.add($.__views.__alloyId61);
=======
        id: "__alloyId35"
    });
    $.__views.__alloyId34.add($.__views.__alloyId35);
    deleteRecord ? $.addListener($.__views.__alloyId35, "click", deleteRecord) : __defers["$.__views.__alloyId35!click!deleteRecord"] = true;
    $.__views.__alloyId36 = Ti.UI.createView({
        width: "auto",
        height: Ti.UI.FILL,
        id: "__alloyId36"
    });
    $.__views.__alloyId34.add($.__views.__alloyId36);
>>>>>>> origin/master
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
<<<<<<< HEAD
    $.__views.__alloyId61.add($.__views.lastUpdated);
=======
    $.__views.__alloyId36.add($.__views.lastUpdated);
>>>>>>> origin/master
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
        nav.closeWindow($.editRecWin);
    });
<<<<<<< HEAD
    __defers["$.__views.__alloyId57!click!showCategory"] && $.addListener($.__views.__alloyId57, "click", showCategory);
    __defers["$.__views.__alloyId60!click!deleteRecord"] && $.addListener($.__views.__alloyId60, "click", deleteRecord);
=======
    __defers["$.__views.__alloyId32!click!showCategory"] && $.addListener($.__views.__alloyId32, "click", showCategory);
    __defers["$.__views.__alloyId35!click!deleteRecord"] && $.addListener($.__views.__alloyId35, "click", deleteRecord);
>>>>>>> origin/master
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;