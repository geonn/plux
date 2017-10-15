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
        details.message;
        var treatment = treatment;
        $.titleRecord.value = title;
        $.clinicRecord.value = clinic;
        $.lastUpdated.text = "Last updated: " + timeFormat(details.updated);
    }
    function loadImage() {
        var recAttachment = medicalAttachmentModel.getData(id);
        console.log(details);
        console.log("loadImage" + id);
        console.log(recAttachment);
        var counter = 0;
        $.attachment.views = [];
        if ("" != details.lab_report_link) {
            counter++;
            $.attachment.addView(attachedPhoto(details.lab_report_link, counter, 1));
        }
        recAttachment.length > 0 && recAttachment.forEach(function(att) {
            var myImage = att.img_path;
            $.attachment.addView(attachedPhoto(myImage, counter, 0, att));
            counter++;
        });
    }
    function saveRecord() {
        var title = $.titleRecord.value;
        var clinic = $.clinicRecord.value;
        "" == title.trim() && (title = "Untitled - " + common.now());
        var param = {
            id: id,
            u_id: Ti.App.Properties.getString("u_id"),
            clinic: clinic,
            title: title,
            created: details.created,
            updated: common.now()
        };
        API.callByPost({
            url: "addUpdateMedicalRecord",
            params: param
        }, function() {
            medicalRecordsModel.saveArray([ {
                id: id,
                title: title.trim(),
                clinic: clinic.trim(),
                updated: common.now()
            } ]);
            Ti.App.fireEvent("displayRecords");
            nav.closeWindow($.editRecWin);
        });
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
                var param = {
                    id: id,
                    status: 2
                };
                API.callByPost({
                    url: "changeMedicalRecord",
                    params: param
                }, function(responseText) {
                    console.log(responseText);
                    var res = JSON.parse(responseText);
                    if ("success" == res.status) {
                        medicalRecordsModel.saveArray(res.data);
                        skipUpdate = true;
                        nav.closeWindow($.editRecWin);
                    }
                });
            }
        });
        dialog.show();
    }
    function backAndSave() {
        var title = $.titleRecord.value;
        if ("" == title.trim()) {
            var recAttachment = medicalAttachmentModel.getRecordByMecId(id);
            0 == recAttachment.length && medicalRecordsModel.removeRecordById(id);
        } else saveRecord();
        Ti.App.fireEvent("displayRecords");
    }
    function attachedPhoto(image, position, isLink, image_record) {
        var getFormat = image.split(".");
        var thumbImg = image;
        var pWidth = parseInt(Ti.Platform.displayCaps.platformWidth / (Ti.Platform.displayCaps.logicalDensityFactor || 1), 10);
        ("pdf" == getFormat[getFormat.length - 1] || "PDF" == getFormat[getFormat.length - 1]) && (thumbImg = "/images/pdf_logo.png");
        var iView = $.UI.create("View", {
            width: pWidth,
            height: pWidth,
            position: position,
            backgroundColor: "#cccccc"
        });
        var text_category = isLink ? "Attachment" : image_record.category;
        var label_category = $.UI.create("Label", {
            classes: [ "wfill", " hsize", "padding" ],
            color: "#ffffff",
            text: text_category
        });
        var view_label = $.UI.create("View", {
            classes: [ "wfill", "hsize" ],
            backgroundColor: "#80000000",
            bottom: 0,
            zIndex: 2
        });
        view_label.add(label_category);
        var iImage = Ti.UI.createImageView({
            image: thumbImg,
            position: position,
            enableZoomControls: true,
            width: Ti.UI.FILL
        });
        iView.add(view_label);
        iView.add(iImage);
        iView.addEventListener("click", function(e) {
            var currentTime = new Date();
            if (1e3 > currentTime - clickTime) return;
            clickTime = currentTime;
            console.log(image);
            ("pdf" == getFormat[getFormat.length - 1] || "PDF" == getFormat[getFormat.length - 1]) && downloadPDF(image);
        });
        return iView;
    }
    function showCategory() {
        var dialog = Titanium.UI.createOptionDialog({
            title: "Choose a test category...",
            options: [ "Blood Test", "X Ray", "ECG/Stress test", "Urine test", "Medication Records", "Allergic History", "etc", "Cancel" ],
            cancel: 7
        });
        dialog.addEventListener("click", function(e) {
            0 == e.index ? categoryType = "Blood Test" : 1 == e.index ? categoryType = "X Ray" : 2 == e.index ? categoryType = "ECG/Stress test" : 3 == e.index ? categoryType = "Urine test" : 4 == e.index ? categoryType = "Medication Records" : 5 == e.index ? categoryType = "Allergic History" : 6 == e.index && (categoryType = "etc");
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
        Ti.Platform.displayCaps.platformWidth;
        Ti.Platform.displayCaps.platformHeight;
        dialog.addEventListener("click", function(e) {
            if (0 == e.index) Titanium.Media.showCamera({
                success: function(event) {
                    var image = event.media;
                    if (image.width > image.height) {
                        var newWidth = 640;
                        var ratio = 640 / image.width;
                        var newHeight = image.height * ratio;
                    } else {
                        var newHeight = 640;
                        var ratio = 640 / image.height;
                        var newWidth = image.width * ratio;
                    }
                    image = image.imageAsResized(newWidth, newHeight);
                    if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
                        blobContainer = image;
                        var getStr = "&medical_id=" + id + "&u_id=" + Ti.App.Properties.getString("u_id") + "&caption=" + categoryType;
                        API.callByPostImage({
                            url: "addMedicalAttachment",
                            params: getStr,
                            image: image
                        }, function(responseText) {
                            var res = JSON.parse(responseText);
                            if ("success" == res.status) {
                                var model = Alloy.createCollection("medicalAttachmentV2");
                                var res = JSON.parse(responseText);
                                var arr = res.data || null;
                                model.saveArray(arr);
                            }
                            loadImage();
                        });
                    }
                },
                cancel: function() {},
                error: function(error) {
                    var a = Titanium.UI.createAlertDialog({
                        title: "Camera"
                    });
                    error.code == Titanium.Media.NO_CAMERA ? a.setMessage("Device does not have camera") : a.setMessage("Unexpected error: " + error.code);
                    a.show();
                },
                allowImageEditing: true,
                mediaTypes: [ Ti.Media.MEDIA_TYPE_PHOTO ],
                saveToPhotoGallery: true
            }); else if (1 == e.index) {
                Titanium.Media.openPhotoGallery({
                    success: function(event) {
                        var image = event.media;
                        if (image.width > image.height) {
                            var newWidth = 640;
                            var ratio = 640 / image.width;
                            var newHeight = image.height * ratio;
                        } else {
                            var newHeight = 640;
                            var ratio = 640 / image.height;
                            var newWidth = image.width * ratio;
                        }
                        image = image.imageAsResized(newWidth, newHeight);
                        blobContainer = image;
                        ({
                            medical_id: id,
                            u_id: Ti.App.Properties.getString("u_id"),
                            caption: categoryType,
                            Filedata: image
                        });
                        console.log("check blob");
                        console.log(image);
                        var getStr = "&medical_id=" + id + "&u_id=" + Ti.App.Properties.getString("u_id") + "&caption=" + categoryType;
                        API.callByPostImage({
                            url: "addMedicalAttachment",
                            params: getStr,
                            image: image
                        }, function(responseText) {
                            var res = JSON.parse(responseText);
                            if ("success" == res.status) {
                                var model = Alloy.createCollection("medicalAttachmentV2");
                                var res = JSON.parse(responseText);
                                var arr = res.data || null;
                                model.saveArray(arr);
                            }
                            loadImage();
                        });
                    },
                    cancel: function() {},
                    mediaTypes: [ Ti.Media.MEDIA_TYPE_PHOTO ]
                });
            }
        });
        dialog.show();
    }
    function downloadPDF(content) {
        var indView = Ti.UI.createView({
            height: 100,
            layout: "vertical",
            backgroundColor: "#ffffff",
            bottom: 5,
            width: Ti.UI.SIZE
        });
        if ("1" == isDownloading) {
            var label = Ti.UI.createLabel({
                color: "#CE1D1C",
                font: {
                    fontSize: 10,
                    fontWeight: "bold"
                },
                text: "Please wait until current downloading is done.",
                bottom: 10,
                width: "100%",
                height: 10,
                textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
            });
            if ("0" == isDownloadLbl) {
                $.bigView.add(label);
                setTimeout(function() {
                    isDownloadLbl = "0";
                    $.bigView.remove(label);
                }, 3e3);
            }
            isDownloadLbl = "1";
            return false;
        }
        isDownloading = "1";
        var ind = Titanium.UI.createProgressBar({
            width: "90%",
            height: 50,
            min: 0,
            max: 1,
            value: 0,
            top: 5,
            message: "Downloading " + content.title + "...",
            font: {
                fontSize: 12
            },
            color: "#CE1D1C"
        });
        var label = Ti.UI.createLabel({
            color: "#CE1D1C",
            font: {
                fontSize: 14,
                fontWeight: "bold"
            },
            text: "0%",
            top: 0,
            width: "100%",
            height: 30,
            textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
        });
        if ("1" == content.isDownloaded) {
            indView.remove(ind);
            indView.remove(label);
            $.bigView.setVisible(false);
        } else {
            ind.show();
            indView.add(ind);
            indView.add(label);
            $.bigView.add(indView);
            $.bigView.setVisible(true);
        }
        PDF.createPdf(content, true, ind, label, indView, function(err, file, base, url) {
            if (err) alert(err); else {
                isDownloading = "0";
                indView.hide();
                $.bigView.remove(indView);
                console.log("file return : " + file.getNativePath());
                PDF.android_launch(file);
            }
        });
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "editMedical";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.editRecWin = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        orientationModes: [ Ti.UI.PORTRAIT ],
        fullscreen: false,
        windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN,
        id: "editRecWin",
        title: "My Medical Record",
        backButtonTitle: "",
        navTintColor: "#CE1D1C"
    });
    $.__views.editRecWin && $.addTopLevelView($.__views.editRecWin);
    $.__views.__alloyId123 = Ti.UI.createView({
        layout: "vertical",
        bottom: 90,
        id: "__alloyId123"
    });
    $.__views.editRecWin.add($.__views.__alloyId123);
    $.__views.__alloyId124 = Ti.UI.createView({
        layout: "horizontal",
        height: 50,
        width: Ti.UI.FILL,
        backgroundColor: "#DEDEDE",
        id: "__alloyId124"
    });
    $.__views.__alloyId123.add($.__views.__alloyId124);
    $.__views.__alloyId125 = Ti.UI.createView({
        left: 0,
        width: "20%",
        id: "__alloyId125"
    });
    $.__views.__alloyId124.add($.__views.__alloyId125);
    $.__views.btnBack = Ti.UI.createImageView({
        left: 10,
        id: "btnBack",
        width: 25,
        height: 25,
        image: "/images/btn-back.png"
    });
    $.__views.__alloyId125.add($.__views.btnBack);
    $.__views.__alloyId126 = Ti.UI.createView({
        width: "60%",
        id: "__alloyId126"
    });
    $.__views.__alloyId124.add($.__views.__alloyId126);
    $.__views.pageTitle = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#606060",
        font: {
            fontSize: "16dp"
        },
        text: "My Medical Record",
        id: "pageTitle",
        textAlign: "center"
    });
    $.__views.__alloyId126.add($.__views.pageTitle);
    $.__views.__alloyId127 = Ti.UI.createView({
        left: 0,
        width: "20%",
        id: "__alloyId127"
    });
    $.__views.__alloyId124.add($.__views.__alloyId127);
    $.__views.saveRecord = Ti.UI.createButton({
        font: {
            fontSize: "10dp"
        },
        color: "#000",
        id: "saveRecord",
        title: "Done"
    });
    $.__views.__alloyId127.add($.__views.saveRecord);
    $.__views.titleRecord = Ti.UI.createTextField({
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        height: 40,
        font: {
            fontSize: "14dp"
        },
        color: "#222222",
        borderWidth: "1px",
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        width: "95%",
        backgroundColor: "#ffffff",
        top: 0,
        id: "titleRecord",
        borderColor: "#ffffff",
        hintText: "Medical Problem"
    });
    $.__views.__alloyId123.add($.__views.titleRecord);
    $.__views.__alloyId128 = Ti.UI.createView({
        height: 1,
        width: "100%",
        backgroundColor: "#CE1D1C",
        id: "__alloyId128"
    });
    $.__views.__alloyId123.add($.__views.__alloyId128);
    $.__views.aView = Ti.UI.createView({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "aView"
    });
    $.__views.__alloyId123.add($.__views.aView);
    $.__views.__alloyId129 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#CE1D1C",
        font: {
            fontSize: 14,
            fontWeight: "bold"
        },
        text: "Clinic/Hospital/Specialist",
        left: 10,
        top: 10,
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        id: "__alloyId129"
    });
    $.__views.aView.add($.__views.__alloyId129);
    $.__views.clinicRecord = Ti.UI.createTextField({
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        height: 40,
        font: {
            fontSize: "14dp"
        },
        color: "#222222",
        borderWidth: "1px",
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        width: Ti.UI.FILL,
        backgroundColor: "#f6f6f6",
        top: 0,
        left: 10,
        right: 10,
        id: "clinicRecord",
        borderColor: "#f6f6f6",
        hintText: "Please fill in Clinic/Hospital/Specialist"
    });
    $.__views.aView.add($.__views.clinicRecord);
    var __alloyId130 = [];
    $.__views.attachment = Ti.UI.createScrollableView({
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        contentHeight: Ti.UI.SIZE,
        contentWidth: Ti.UI.FILL,
        views: __alloyId130,
        backgroundColor: "#cccccc",
        id: "attachment",
        showPagingControl: true
    });
    $.__views.aView.add($.__views.attachment);
    $.__views.bigView = Ti.UI.createScrollView({
        id: "bigView",
        zIndex: 99,
        height: Ti.UI.SIZE,
        layout: "vertical",
        backgroundColor: "#ffffff",
        opacity: .8,
        bottom: 0,
        width: "80%",
        visible: false
    });
    $.__views.editRecWin.add($.__views.bigView);
    $.__views.__alloyId131 = Ti.UI.createView({
        width: Ti.UI.FILL,
        bottom: 40,
        layout: "horizontal",
        height: 50,
        id: "__alloyId131"
    });
    $.__views.editRecWin.add($.__views.__alloyId131);
    $.__views.__alloyId132 = Ti.UI.createView({
        width: "auto",
        height: Ti.UI.SIZE,
        id: "__alloyId132"
    });
    $.__views.__alloyId131.add($.__views.__alloyId132);
    showCategory ? $.addListener($.__views.__alloyId132, "click", showCategory) : __defers["$.__views.__alloyId132!click!showCategory"] = true;
    $.__views.__alloyId133 = Ti.UI.createView({
        backgroundColor: "#CE1D1C",
        height: 50,
        width: Ti.UI.FILL,
        right: 0,
        id: "__alloyId133"
    });
    $.__views.__alloyId132.add($.__views.__alloyId133);
    $.__views.addLbl = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#ffffff",
        id: "addLbl",
        text: "+"
    });
    $.__views.__alloyId133.add($.__views.addLbl);
    $.__views.__alloyId134 = Ti.UI.createView({
        height: 40,
        layout: "horizontal",
        bottom: 0,
        width: "100%",
        backgroundColor: "#EEEEEE",
        id: "__alloyId134"
    });
    $.__views.editRecWin.add($.__views.__alloyId134);
    $.__views.__alloyId135 = Ti.UI.createButton({
        backgroundImage: "/images/btn-remove.png",
        textAlign: "left",
        left: 15,
        width: 30,
        height: 30,
        id: "__alloyId135"
    });
    $.__views.__alloyId134.add($.__views.__alloyId135);
    deleteRecord ? $.addListener($.__views.__alloyId135, "click", deleteRecord) : __defers["$.__views.__alloyId135!click!deleteRecord"] = true;
    $.__views.__alloyId136 = Ti.UI.createView({
        width: "auto",
        height: Ti.UI.FILL,
        id: "__alloyId136"
    });
    $.__views.__alloyId134.add($.__views.__alloyId136);
    $.__views.lastUpdated = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#888",
        font: {
            fontSize: "12dp"
        },
        id: "lastUpdated",
        textAlign: "right",
        right: 10
    });
    $.__views.__alloyId136.add($.__views.lastUpdated);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var id = args.id || "";
    var MRECORDS = require("medicalRecords");
    MRECORDS.construct($);
    var clickTime = null;
    var skipUpdate = false;
    var medicalAttachmentModel = Alloy.createCollection("medicalAttachmentV2");
    var medicalRecordsModel = Alloy.createCollection("medicalRecordsV2");
    var PDF = require("pdf");
    var details = medicalRecordsModel.getDataById(id);
    loadMedicalInfo();
    var categoryType = "Blood Test";
    var isDownloading = "0";
    var isDownloadLbl = "0";
    $.editRecWin.addEventListener("close", function() {
        skipUpdate || backAndSave();
        Ti.App.removeEventListener("refreshAttachment", loadImage);
        $.destroy();
        Ti.App.fireEvent("myMedicalRecord:refresh");
        console.log("window close");
    });
    Ti.App.addEventListener("refreshAttachment", loadImage);
    $.saveRecord.addEventListener("click", saveRecord);
    $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.editRecWin);
    });
    var applicationDatDirectory = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory);
    applicationDatDirectory.getDirectoryListing();
    __defers["$.__views.__alloyId132!click!showCategory"] && $.addListener($.__views.__alloyId132, "click", showCategory);
    __defers["$.__views.__alloyId135!click!deleteRecord"] && $.addListener($.__views.__alloyId135, "click", deleteRecord);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;