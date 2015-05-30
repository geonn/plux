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
        var treatment = details.treatment;
        "undefined" == treatment && (treatment = "");
        var message = details.message;
        var treatment = treatment;
        $.titleRecord.value = title;
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
        var message = $.proceduceTextArea.value;
        var treatment = $.treatmentTextArea.value;
        "" == title.trim() && (title = "Untitled - " + currentDateTime());
        medicalRecordsModel.updateRecord({
            id: rec_id,
            title: title,
            message: message,
            treatment: treatment,
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
    function hideKeyboard() {
        MRECORDS.hideKeyboard();
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
    $.__views.__alloyId25 = Ti.UI.createView({
        id: "__alloyId25"
    });
    $.__views.saveRecord = Ti.UI.createButton({
        id: "saveRecord",
        title: "Done"
    });
    $.__views.__alloyId25.add($.__views.saveRecord);
    $.__views.editRecWin.rightNavButton = $.__views.__alloyId25;
    $.__views.__alloyId26 = Ti.UI.createView({
        id: "__alloyId26"
    });
    $.__views.editRecWin.add($.__views.__alloyId26);
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
    $.__views.__alloyId26.add($.__views.titleRecord);
    $.__views.__alloyId27 = Ti.UI.createView({
        height: "1",
        width: "100%",
        backgroundColor: "#CE1D1C",
        top: "40",
        id: "__alloyId27"
    });
    $.__views.__alloyId26.add($.__views.__alloyId27);
    $.__views.aView = Ti.UI.createScrollView({
        id: "aView",
        top: "42",
        height: Ti.UI.FILL,
        contentHeight: Ti.UI.SIZE,
        layout: "vertical",
        bottom: "90"
    });
    $.__views.__alloyId26.add($.__views.aView);
    $.__views.__alloyId28 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        text: "Proceduce",
        left: "10",
        top: "10",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        id: "__alloyId28"
    });
    $.__views.aView.add($.__views.__alloyId28);
    var __alloyId32 = [];
    $.__views.__alloyId33 = Ti.UI.createButton({
        systemButton: Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
    });
    __alloyId32.push($.__views.__alloyId33);
    $.__views.__alloyId34 = Ti.UI.createButton({
        backgroundImage: "/images/btn-down.png",
        textAlign: "right",
        right: "5",
        width: "20",
        height: "20",
        id: "__alloyId34"
    });
    __alloyId32.push($.__views.__alloyId34);
    hideKeyboard ? $.__views.__alloyId34.addEventListener("click", hideKeyboard) : __defers["$.__views.__alloyId34!click!hideKeyboard"] = true;
    $.__views.__alloyId30 = Ti.UI.iOS.createToolbar({
        items: __alloyId32,
        id: "__alloyId30"
    });
    $.__views.proceduceTextArea = Ti.UI.createTextArea({
        keyboardToolbar: $.__views.__alloyId30,
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
    $.__views.__alloyId30 = Ti.UI.iOS.createToolbar({
        keyboardToolbar: $.__views.__alloyId30,
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
    $.__views.__alloyId35 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        text: "Treatment",
        left: "10",
        top: "10",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        id: "__alloyId35"
    });
    $.__views.aView.add($.__views.__alloyId35);
    var __alloyId39 = [];
    $.__views.__alloyId40 = Ti.UI.createButton({
        systemButton: Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
    });
    __alloyId39.push($.__views.__alloyId40);
    $.__views.__alloyId41 = Ti.UI.createButton({
        backgroundImage: "/images/btn-down.png",
        textAlign: "right",
        right: "5",
        width: "20",
        height: "20",
        id: "__alloyId41"
    });
    __alloyId39.push($.__views.__alloyId41);
    hideKeyboard ? $.__views.__alloyId41.addEventListener("click", hideKeyboard) : __defers["$.__views.__alloyId41!click!hideKeyboard"] = true;
    $.__views.__alloyId37 = Ti.UI.iOS.createToolbar({
        items: __alloyId39,
        id: "__alloyId37"
    });
    $.__views.treatmentTextArea = Ti.UI.createTextArea({
        keyboardToolbar: $.__views.__alloyId37,
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
    $.__views.__alloyId37 = Ti.UI.iOS.createToolbar({
        keyboardToolbar: $.__views.__alloyId37,
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
    $.__views.__alloyId42 = Ti.UI.createView({
        bottom: "40",
        height: Ti.UI.SIZE,
        layout: "horizontal",
        width: "100%",
        id: "__alloyId42"
    });
    $.__views.__alloyId26.add($.__views.__alloyId42);
    $.__views.attachment = Ti.UI.createScrollView({
        id: "attachment",
        scrollType: "horizontal",
        layout: "horizontal",
        height: Ti.UI.SIZE,
        width: "80%"
    });
    $.__views.__alloyId42.add($.__views.attachment);
    $.__views.__alloyId43 = Ti.UI.createView({
        width: "auto",
        height: Ti.UI.SIZE,
        id: "__alloyId43"
    });
    $.__views.__alloyId42.add($.__views.__alloyId43);
    showCategory ? $.__views.__alloyId43.addEventListener("click", showCategory) : __defers["$.__views.__alloyId43!click!showCategory"] = true;
    $.__views.__alloyId44 = Ti.UI.createView({
        backgroundColor: "#CE1D1C",
        height: "50",
        width: Ti.UI.FILL,
        right: "0",
        id: "__alloyId44"
    });
    $.__views.__alloyId43.add($.__views.__alloyId44);
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
    $.__views.__alloyId44.add($.__views.addLbl);
    $.__views.__alloyId45 = Ti.UI.createView({
        height: "40",
        layout: "horizontal",
        bottom: "0",
        width: "100%",
        backgroundColor: "#EEEEEE",
        id: "__alloyId45"
    });
    $.__views.__alloyId26.add($.__views.__alloyId45);
    $.__views.__alloyId46 = Ti.UI.createButton({
        backgroundImage: "/images/btn-remove.png",
        textAlign: "left",
        left: "15",
        width: "30",
        height: "30",
        id: "__alloyId46"
    });
    $.__views.__alloyId45.add($.__views.__alloyId46);
    deleteRecord ? $.__views.__alloyId46.addEventListener("click", deleteRecord) : __defers["$.__views.__alloyId46!click!deleteRecord"] = true;
    $.__views.__alloyId47 = Ti.UI.createView({
        width: "auto",
        height: Ti.UI.FILL,
        id: "__alloyId47"
    });
    $.__views.__alloyId45.add($.__views.__alloyId47);
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
    $.__views.__alloyId47.add($.__views.lastUpdated);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var rec_id = args.id || "";
    var MRECORDS = require("medicalRecords");
    MRECORDS.construct($);
    var clickTime = null;
    var medicalAttachmentModel = Alloy.createCollection("medicalAttachment");
    medicalAttachmentModel.addColumn("category", "TEXT");
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
    __defers["$.__views.__alloyId34!click!hideKeyboard"] && $.__views.__alloyId34.addEventListener("click", hideKeyboard);
    __defers["$.__views.__alloyId41!click!hideKeyboard"] && $.__views.__alloyId41.addEventListener("click", hideKeyboard);
    __defers["$.__views.__alloyId43!click!showCategory"] && $.__views.__alloyId43.addEventListener("click", showCategory);
    __defers["$.__views.__alloyId46!click!deleteRecord"] && $.__views.__alloyId46.addEventListener("click", deleteRecord);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;