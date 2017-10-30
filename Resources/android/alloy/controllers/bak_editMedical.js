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
        console.log(recAttachment);
        if (recAttachment.length > 0) {
            removeAllChildren($.attachment);
            recAttachment.forEach(function(att) {
                if (null == att.img_path) var myImage = Ti.Utils.base64decode(att.blob); else var myImage = att.img_path;
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
        iView.addEventListener("click", function(e) {
            API.callByPost({
                url: "https://plux.freejini.com.my/main/tnc2",
                fullurl: true,
                params: {
                    u_id: u_id
                }
            }, function(responseText) {
                console.log(responseText);
                var dialog = Ti.UI.createAlertDialog({
                    cancel: 1,
                    buttonNames: [ "Agree", "Cancel" ],
                    message: responseText,
                    title: "Terms & Conditions"
                });
                dialog.addEventListener("click", function(ex) {
                    if (e.index === ex.source.cancel) console.log("The cancel button was clicked"); else {
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
                    }
                });
                dialog.show();
                loading.finish();
            });
        });
        return iView;
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "bak_editMedical";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
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
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;