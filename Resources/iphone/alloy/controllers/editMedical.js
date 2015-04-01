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
        var message = details.message;
        $.titleRecord.value = title;
        $.recordsTextArea.value = message;
        $.lastUpdated.text = "Last updated: " + timeFormat(details.updated);
    }
    function loadImage() {
        var recAttachment = medicalAttachmentModel.getRecordByMecId(rec_id);
        var counter = 0;
        if (recAttachment.length > 0) {
            removeAllChildren($.attachment);
            recAttachment.forEach(function(att) {
                var myImage = Ti.Utils.base64decode(att.blob);
                $.attachment.add(attachedPhoto(myImage, counter));
                counter++;
            });
        }
    }
    function saveRecord() {
        var title = $.titleRecord.value;
        var message = $.recordsTextArea.value;
        "" == title.trim() && (title = "Untitled - " + currentDateTime());
        medicalRecordsModel.updateRecord({
            id: rec_id,
            title: title,
            message: message,
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
        var message = $.recordsTextArea.value;
        if ("" == title.trim() && "" == message.trim()) {
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
    $.__views.__alloyId6 = Ti.UI.createView({
        id: "__alloyId6"
    });
    $.__views.saveRecord = Ti.UI.createButton({
        id: "saveRecord",
        title: "Done"
    });
    $.__views.__alloyId6.add($.__views.saveRecord);
    $.__views.editRecWin.rightNavButton = $.__views.__alloyId6;
    $.__views.__alloyId7 = Ti.UI.createView({
        id: "__alloyId7"
    });
    $.__views.editRecWin.add($.__views.__alloyId7);
    $.__views.titleRecord = Ti.UI.createTextField({
        font: {
            fontSize: "20dp"
        },
        top: "0",
        id: "titleRecord",
        height: "40",
        hintText: "Records title...",
        width: "95%"
    });
    $.__views.__alloyId7.add($.__views.titleRecord);
    $.__views.__alloyId8 = Ti.UI.createView({
        height: "1",
        width: "100%",
        backgroundColor: "#CE1D1C",
        top: "40",
        id: "__alloyId8"
    });
    $.__views.__alloyId7.add($.__views.__alloyId8);
    $.__views.aView = Ti.UI.createScrollView({
        id: "aView",
        top: "42",
        height: Ti.UI.SIZE,
        layout: "vertical",
        bottom: "90"
    });
    $.__views.__alloyId7.add($.__views.aView);
    var __alloyId12 = [];
    $.__views.__alloyId13 = Ti.UI.createButton({
        systemButton: Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
    });
    __alloyId12.push($.__views.__alloyId13);
    $.__views.__alloyId14 = Ti.UI.createButton({
        backgroundImage: "/images/btn-down.png",
        textAlign: "right",
        right: "5",
        width: "20",
        height: "20",
        id: "__alloyId14"
    });
    __alloyId12.push($.__views.__alloyId14);
    hideKeyboard ? $.__views.__alloyId14.addEventListener("click", hideKeyboard) : __defers["$.__views.__alloyId14!click!hideKeyboard"] = true;
    $.__views.__alloyId10 = Ti.UI.iOS.createToolbar({
        items: __alloyId12,
        id: "__alloyId10"
    });
    $.__views.recordsTextArea = Ti.UI.createTextArea({
        font: {
            fontSize: "16dp"
        },
        keyboardToolbar: $.__views.__alloyId10,
        id: "recordsTextArea",
        color: "#888",
        textAlign: "left",
        value: "",
        width: "95%",
        height: "100%",
        suppressReturn: "false"
    });
    $.__views.aView.add($.__views.recordsTextArea);
    $.__views.__alloyId10 = Ti.UI.iOS.createToolbar({
        keyboardToolbar: $.__views.__alloyId10,
        id: "recordsTextArea",
        color: "#888",
        textAlign: "left",
        value: "",
        width: "95%",
        height: "100%",
        suppressReturn: "false"
    });
    $.__views.__alloyId15 = Ti.UI.createView({
        bottom: "40",
        height: Ti.UI.SIZE,
        layout: "horizontal",
        width: "100%",
        id: "__alloyId15"
    });
    $.__views.__alloyId7.add($.__views.__alloyId15);
    $.__views.attachment = Ti.UI.createScrollView({
        id: "attachment",
        scrollType: "horizontal",
        layout: "horizontal",
        height: Ti.UI.SIZE,
        width: "80%"
    });
    $.__views.__alloyId15.add($.__views.attachment);
    $.__views.__alloyId16 = Ti.UI.createView({
        width: "auto",
        height: Ti.UI.SIZE,
        id: "__alloyId16"
    });
    $.__views.__alloyId15.add($.__views.__alloyId16);
    takePhoto ? $.__views.__alloyId16.addEventListener("click", takePhoto) : __defers["$.__views.__alloyId16!click!takePhoto"] = true;
    $.__views.__alloyId17 = Ti.UI.createView({
        backgroundColor: "#CE1D1C",
        height: "50",
        width: Ti.UI.FILL,
        right: "0",
        id: "__alloyId17"
    });
    $.__views.__alloyId16.add($.__views.__alloyId17);
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
    $.__views.__alloyId17.add($.__views.addLbl);
    $.__views.__alloyId18 = Ti.UI.createView({
        height: "40",
        layout: "horizontal",
        bottom: "0",
        width: "100%",
        backgroundColor: "#EEEEEE",
        id: "__alloyId18"
    });
    $.__views.__alloyId7.add($.__views.__alloyId18);
    $.__views.__alloyId19 = Ti.UI.createButton({
        backgroundImage: "/images/btn-remove.png",
        textAlign: "left",
        left: "15",
        width: "30",
        height: "30",
        id: "__alloyId19"
    });
    $.__views.__alloyId18.add($.__views.__alloyId19);
    deleteRecord ? $.__views.__alloyId19.addEventListener("click", deleteRecord) : __defers["$.__views.__alloyId19!click!deleteRecord"] = true;
    $.__views.__alloyId20 = Ti.UI.createView({
        width: "auto",
        height: Ti.UI.FILL,
        id: "__alloyId20"
    });
    $.__views.__alloyId18.add($.__views.__alloyId20);
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
    $.__views.__alloyId20.add($.__views.lastUpdated);
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
    $.recordsTextArea.addEventListener("focus", function() {
        $.recordsTextArea.setHeight("70%");
    });
    $.editRecWin.addEventListener("close", function() {
        backAndSave();
    });
    Ti.App.addEventListener("refreshAttachment", loadImage);
    $.saveRecord.addEventListener("click", saveRecord);
    __defers["$.__views.__alloyId14!click!hideKeyboard"] && $.__views.__alloyId14.addEventListener("click", hideKeyboard);
    __defers["$.__views.__alloyId16!click!takePhoto"] && $.__views.__alloyId16.addEventListener("click", takePhoto);
    __defers["$.__views.__alloyId19!click!deleteRecord"] && $.__views.__alloyId19.addEventListener("click", deleteRecord);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;