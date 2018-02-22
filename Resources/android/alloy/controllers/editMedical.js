var Alloy = require('/alloy'),
Backbone = Alloy.Backbone,
_ = Alloy._;




function __processArg(obj, key) {
  var arg = null;
  if (obj) {
    arg = obj[key] || null;
    delete obj[key];
  }
  return arg;
}

function Controller() {

  require('/alloy/controllers/' + 'BaseController').apply(this, Array.prototype.slice.call(arguments));
  this.__controllerPath = 'editMedical';
  this.args = arguments[0] || {};

  if (arguments[0]) {
    var __parentSymbol = __processArg(arguments[0], '__parentSymbol');
    var $model = __processArg(arguments[0], '$model');
    var __itemTemplate = __processArg(arguments[0], '__itemTemplate');
  }
  var $ = this;
  var exports = {};
  var __defers = {};







  $.__views.editRecWin = Ti.UI.createWindow(
  { backgroundColor: "#ffffff", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, id: "editRecWin", title: "My Medical Record", backButtonTitle: "", navTintColor: "#CE1D1C" });

  $.__views.editRecWin && $.addTopLevelView($.__views.editRecWin);
  $.__views.__alloyId408 = Ti.UI.createView(
  { layout: "vertical", bottom: 90, id: "__alloyId408" });

  $.__views.editRecWin.add($.__views.__alloyId408);
  if (true) {
    $.__views.__alloyId409 = Ti.UI.createView(
    { layout: "horizontal", height: 50, width: Ti.UI.FILL, backgroundColor: "#DEDEDE", id: "__alloyId409" });

    $.__views.__alloyId408.add($.__views.__alloyId409);
    $.__views.__alloyId410 = Ti.UI.createView(
    { left: 0, width: "20%", id: "__alloyId410" });

    $.__views.__alloyId409.add($.__views.__alloyId410);
    $.__views.btnBack = Ti.UI.createImageView(
    { left: 10, id: "btnBack", width: 25, height: 25, image: "/images/btn-back.png" });

    $.__views.__alloyId410.add($.__views.btnBack);
    $.__views.__alloyId411 = Ti.UI.createView(
    { width: "60%", id: "__alloyId411" });

    $.__views.__alloyId409.add($.__views.__alloyId411);
    $.__views.pageTitle = Ti.UI.createLabel(
    { width: Titanium.UI.SIZE, height: Ti.UI.SIZE, color: "#606060", font: { fontSize: "16dp" }, text: 'My Medical Record', id: "pageTitle", textAlign: "center" });

    $.__views.__alloyId411.add($.__views.pageTitle);
    $.__views.__alloyId412 = Ti.UI.createView(
    { left: 0, width: "20%", id: "__alloyId412" });

    $.__views.__alloyId409.add($.__views.__alloyId412);
    $.__views.saveRecord = Ti.UI.createButton(
    { font: { fontSize: "10dp" }, color: "#000", id: "saveRecord", title: "Done" });

    $.__views.__alloyId412.add($.__views.saveRecord);
  }
  $.__views.titleRecord = Ti.UI.createTextField(
  { verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER, height: 40, font: { fontSize: "14dp" }, color: "#222222", borderWidth: "1px", borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED, width: "95%", backgroundColor: "#ffffff", top: 0, id: "titleRecord", borderColor: "#ffffff", hintText: "Medical Problem" });

  $.__views.__alloyId408.add($.__views.titleRecord);
  $.__views.__alloyId413 = Ti.UI.createView(
  { height: 1, width: "100%", backgroundColor: "#CE1D1C", id: "__alloyId413" });

  $.__views.__alloyId408.add($.__views.__alloyId413);
  $.__views.aView = Ti.UI.createView(
  { layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.FILL, id: "aView" });

  $.__views.__alloyId408.add($.__views.aView);
  $.__views.__alloyId414 = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#CE1D1C", font: { fontSize: 14, fontWeight: "bold" }, text: 'Clinic/Hospital/Specialist', left: 10, top: 10, textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT, id: "__alloyId414" });

  $.__views.aView.add($.__views.__alloyId414);
  $.__views.clinicRecord = Ti.UI.createTextField(
  { verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER, height: 40, font: { fontSize: "14dp" }, color: "#222222", borderWidth: "1px", borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED, width: Ti.UI.FILL, backgroundColor: "#f6f6f6", top: 0, left: 10, right: 10, id: "clinicRecord", borderColor: "#f6f6f6", hintText: "Please fill in Clinic/Hospital/Specialist" });

  $.__views.aView.add($.__views.clinicRecord);
  $.__views.message = Ti.UI.createView(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, id: "message" });

  $.__views.aView.add($.__views.message);
  var __alloyId415 = [];
  $.__views.attachment = Ti.UI.createScrollableView(
  { layout: "horizontal", width: Ti.UI.FILL, height: Ti.UI.FILL, contentHeight: Ti.UI.SIZE, contentWidth: Ti.UI.FILL, views: __alloyId415, backgroundColor: "#cccccc", id: "attachment", showPagingControl: true });

  $.__views.aView.add($.__views.attachment);
  $.__views.bigView = Ti.UI.createScrollView(
  { id: "bigView", zIndex: 99, height: Ti.UI.SIZE, layout: "vertical", backgroundColor: "#ffffff", opacity: 0.8, bottom: 0, width: "80%", visible: false });

  $.__views.editRecWin.add($.__views.bigView);
  $.__views.__alloyId416 = Ti.UI.createView(
  { width: Ti.UI.FILL, bottom: 40, layout: "horizontal", height: 50, id: "__alloyId416" });

  $.__views.editRecWin.add($.__views.__alloyId416);
  $.__views.__alloyId417 = Ti.UI.createView(
  { width: "auto", height: Ti.UI.SIZE, id: "__alloyId417" });

  $.__views.__alloyId416.add($.__views.__alloyId417);
  showCategory ? $.addListener($.__views.__alloyId417, 'click', showCategory) : __defers['$.__views.__alloyId417!click!showCategory'] = true;$.__views.__alloyId418 = Ti.UI.createView(
  { backgroundColor: "#CE1D1C", height: 50, width: Ti.UI.FILL, right: 0, id: "__alloyId418" });

  $.__views.__alloyId417.add($.__views.__alloyId418);
  $.__views.addLbl = Ti.UI.createLabel(
  { width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#ffffff", id: "addLbl", text: "+" });

  $.__views.__alloyId418.add($.__views.addLbl);
  $.__views.__alloyId419 = Ti.UI.createView(
  { height: 40, layout: "horizontal", bottom: 0, width: "100%", backgroundColor: "#EEEEEE", id: "__alloyId419" });

  $.__views.editRecWin.add($.__views.__alloyId419);
  $.__views.__alloyId420 = Ti.UI.createButton(
  { backgroundImage: "/images/btn-remove.png", textAlign: "left", left: 15, width: 30, height: 30, id: "__alloyId420" });

  $.__views.__alloyId419.add($.__views.__alloyId420);
  deleteRecord ? $.addListener($.__views.__alloyId420, 'click', deleteRecord) : __defers['$.__views.__alloyId420!click!deleteRecord'] = true;$.__views.__alloyId421 = Ti.UI.createView(
  { width: "auto", height: Ti.UI.FILL, id: "__alloyId421" });

  $.__views.__alloyId419.add($.__views.__alloyId421);
  $.__views.lastUpdated = Ti.UI.createLabel(
  { width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#888", font: { fontSize: "12dp" }, id: "lastUpdated", textAlign: "right", right: 10 });

  $.__views.__alloyId421.add($.__views.lastUpdated);
  exports.destroy = function () {};




  _.extend($, $.__views);


  var args = arguments[0] || {};
  var id = args.id || "";
  var MRECORDS = require('medicalRecords');
  MRECORDS.construct($);
  var clickTime = null;
  var skipUpdate = false;
  var medicalAttachmentModel = Alloy.createCollection('medicalAttachmentV2');
  var medicalRecordsModel = Alloy.createCollection('medicalRecordsV2');
  var PDF = require('pdf');
  var details = medicalRecordsModel.getDataById(id);
  if (false) {
    var MediaPickerModule = require('MediaPicker').MediaPicker;
    var MediaPicker = new MediaPickerModule();
  }
  var editable_textfield;

  loadMedicalInfo();

  function loadMedicalInfo() {
    loadImage();
    var title = details.title;
    if (title != "") {
      title = title.replace(/&quot;/g, "'");
    }
    var clinic = details.clinic;
    if (clinic == "undefined") {
      clinic = "";
    }

    var treatment = details.treatment;
    if (treatment == "undefined") {
      treatment = "";
    }
    var treatment = treatment;
    console.log(details.editable + " details.editable");
    if (details.editable) {
      editable_textfield = $.UI.create("TextArea", { classes: ['wfill', 'padding'], backgroundColor: "#f6f6f6", borderColor: "#f6f6f6", height: 150, value: details.message, hintText: "Remark" });
      $.message.add(editable_textfield);
    } else {
      var content = details.message;
      content = content.replace(/\[\[/g, "<");
      content = content.replace(/\]\]/g, ">");
      var webview = $.UI.create("WebView", { classes: ['wfill', 'padding'], backgroundColor: "#f6f6f6", height: 150, html: nl2br(content) });
      $.message.add(webview);
      editable_textfield = null;
    }
    $.titleRecord.value = title;
    $.clinicRecord.value = clinic;
    $.lastUpdated.text = "Last updated: " + timeFormat(details.updated);
  }

  function nl2br(str, is_xhtml) {
    var breakTag = is_xhtml || typeof is_xhtml === 'undefined' ? '<br />' : '<br>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
  }

  function loadImage() {
    var recAttachment = medicalAttachmentModel.getData(id);
    console.log(details);
    console.log("loadImage" + id);
    console.log(recAttachment);
    var counter = 0;

    $.attachment.views = [];

    if (details.lab_report_link != "") {
      counter++;
      $.attachment.addView(attachedPhoto(details.lab_report_link, counter, 1));
    }
    if (recAttachment.length > 0) {
      recAttachment.forEach(function (att) {


        var myImage = att.img_path;




        $.attachment.addView(attachedPhoto(myImage, counter, 0, att));
        counter++;
      });
    }
  }

  function saveRecord() {
    var title = $.titleRecord.value;
    var clinic = $.clinicRecord.value;

    if (title.trim() == "") {
      title = "Untitled - " + common.now();
    }


    var param = {
      id: id,
      u_id: Ti.App.Properties.getString('u_id'),
      clinic: clinic,
      title: title,
      created: details.created,
      updated: common.now() };

    if (editable_textfield != null) {
      _.extend(param, { message: editable_textfield.value });
    }
    console.log(param);
    API.callByPost({ url: "addUpdateMedicalRecord", params: param }, function () {
      medicalRecordsModel.saveArray([{
        id: id,
        title: title.trim(),
        clinic: clinic.trim(),
        updated: common.now() }]);

      Ti.App.fireEvent('displayRecords');
      nav.closeWindow($.editRecWin);
    });
  }
  function deleteRecord() {

    var dialog = Ti.UI.createAlertDialog({
      cancel: 1,
      buttonNames: ['Cancel', 'Confirm'],
      message: 'Are you sure want to delete this records?',
      title: 'Delete Confirmation' });

    dialog.addEventListener('click', function (e) {
      if (e.index === e.source.cancel) {

      }
      if (e.index === 1) {
        var param = {
          "id": id,
          'status': 2 };

        API.callByPost({ url: "changeMedicalRecord", params: param }, function (responseText) {
          console.log(responseText);
          var res = JSON.parse(responseText);

          if (res.status == "success") {
            medicalRecordsModel.saveArray(res.data);
            skipUpdate = true;
            nav.closeWindow($.editRecWin);
          }
        });
      }
    });
    dialog.show();
  }

  function hideKeyboard() {
    MRECORDS.hideKeyboard();
  }

  function backAndSave() {
    var title = $.titleRecord.value;
    if (title.trim() == "") {
      var recAttachment = medicalAttachmentModel.getRecordByMecId(id);

      if (recAttachment.length == 0) {
        medicalRecordsModel.removeRecordById(id);
      }
    } else {
      saveRecord();
    }

    Ti.App.fireEvent('displayRecords');

  }

  function attachedPhoto(image, position, isLink, image_record) {
    var getFormat = image.split(".");
    var thumbImg = image;
    var pWidth = false ? Ti.Platform.displayCaps.platformWidth : parseInt(Ti.Platform.displayCaps.platformWidth / (Ti.Platform.displayCaps.logicalDensityFactor || 1), 10);

    if (getFormat[getFormat.length - 1] == "pdf" || getFormat[getFormat.length - 1] == "PDF") {
      thumbImg = "/images/pdf_logo.png";
    }

    var iView = $.UI.create("View", { width: pWidth, height: pWidth, position: position, backgroundColor: "#cccccc" });
    var text_category = isLink ? "Attachment" : image_record.category;
    var label_category = $.UI.create("Label", { classes: ['wfill', ' hsize', 'padding'], color: "#ffffff", text: text_category });
    var view_label = $.UI.create("View", { classes: ['wfill', 'hsize'], backgroundColor: "#80000000", bottom: 0, zIndex: 2 });
    view_label.add(label_category);
    var iImage = Ti.UI.createImageView({
      image: thumbImg,
      position: position,
      enableZoomControls: true,
      width: Ti.UI.FILL });


    iView.add(view_label);
    iView.add(iImage);

    iView.addEventListener('click', function (e) {
      API.callByPost({ url: "https://plux.freejini.com.my/main/tnc2", fullurl: true, params: {} }, function (responseText) {
        console.log(responseText);
        var dialog = Ti.UI.createAlertDialog({
          cancel: 1,
          buttonNames: ['Agree', 'Cancel'],
          message: responseText,
          title: 'PLUX Healthcare Terms of Service' });

        dialog.addEventListener('click', function (ex) {
          if (ex.index === ex.source.cancel) {
            console.log('The cancel button was clicked');
          } else {

            var currentTime = new Date();
            if (currentTime - clickTime < 1000) {
              return;
            };
            clickTime = currentTime;
            console.log(image);

            if (getFormat[getFormat.length - 1] == "pdf" || getFormat[getFormat.length - 1] == "PDF") {
              downloadPDF(image);
            } else {

              var page = Alloy.createController("attachmentDetails", { rec_id: id, position: position, isLink: isLink, image: image }).getView();
              page.open();
              page.animate({
                curve: Ti.UI.ANIMATION_CURVE_EASE_IN,
                opacity: 1,
                duration: 300 });

            }
          }
        });
        dialog.show();
      });
    });
    return iView;
  }
  var categoryType = "Blood Test";

  function showCategory() {
    var dialog = Titanium.UI.createOptionDialog({
      title: 'Choose a test category...',
      options: ['Blood Test', 'X Ray', 'ECG/Stress test', 'Urine test', 'Medication Records', 'Allergic History', 'etc', 'Cancel'],
      cancel: 7 });


    dialog.addEventListener('click', function (e) {
      if (e.index == 0) {
        categoryType = "Blood Test";
      } else if (e.index == 1) {
        categoryType = "X Ray";
      } else if (e.index == 2) {
        categoryType = "ECG/Stress test";
      } else if (e.index == 3) {
        categoryType = "Urine test";
      } else if (e.index == 4) {
        categoryType = "Medication Records";
      } else if (e.index == 5) {
        categoryType = "Allergic History";
      } else if (e.index == 6) {
        categoryType = "etc";
      }
      takePhoto();
    });

    dialog.show();
  }

  function takePhoto() {
    var dialog = Titanium.UI.createOptionDialog({
      title: 'Choose an image source...',
      options: ['Camera', 'Photo Gallery', 'Cancel'],
      cancel: 2 });

    var pWidth = Ti.Platform.displayCaps.platformWidth;
    var pHeight = Ti.Platform.displayCaps.platformHeight;

    dialog.addEventListener('click', function (e) {

      if (e.index == 0) {


        Titanium.Media.showCamera({
          success: function (event) {
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
              var getStr = "&medical_id=" + id + "&u_id=" + Ti.App.Properties.getString('u_id') + "&caption=" + categoryType;

              API.callByPostImage({ url: "addMedicalAttachment", params: getStr, image: image }, function (responseText) {

                var res = JSON.parse(responseText);
                if (res.status == "success") {
                  var model = Alloy.createCollection("medicalAttachmentV2");
                  var res = JSON.parse(responseText);
                  var arr = res.data || null;
                  model.saveArray(arr);
                }

                loadImage();
              });
            }
          },
          cancel: function () {

          },
          error: function (error) {

            var a = Titanium.UI.createAlertDialog({ title: 'Camera' });

            if (error.code == Titanium.Media.NO_CAMERA) {
              a.setMessage('Device does not have camera');
            } else {
              a.setMessage('Unexpected error: ' + error.code);
            }


            a.show();
          },
          allowImageEditing: true,
          mediaTypes: [Ti.Media.MEDIA_TYPE_PHOTO],
          saveToPhotoGallery: true });

      } else if (e.index == 1) {
        if (false) {
          var maximumImageCount = 20;
          MediaPicker.show(function (e) {
            saveImage(e);
          }, maximumImageCount, 'photos', 'Choose up to four images! Longlick image for preview.');
        } else {

          Titanium.Media.openPhotoGallery({
            success: function (event) {

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

              var param = {
                medical_id: id,
                u_id: Ti.App.Properties.getString('u_id'),
                caption: categoryType,
                Filedata: image };

              console.log('check blob');
              console.log(image);
              var getStr = "&medical_id=" + id + "&u_id=" + Ti.App.Properties.getString('u_id') + "&caption=" + categoryType;
              API.callByPostImage({ url: "addMedicalAttachment", params: getStr, image: image }, function (responseText) {

                var res = JSON.parse(responseText);
                if (res.status == "success") {
                  var model = Alloy.createCollection("medicalAttachmentV2");
                  var res = JSON.parse(responseText);
                  var arr = res.data || null;
                  model.saveArray(arr);
                }

                loadImage();
              });
            },
            cancel: function () {},

            mediaTypes: [Ti.Media.MEDIA_TYPE_PHOTO] });

        }
      } else {}
    });


    dialog.show();
  }

  var isDownloading = "0";
  var isDownloadLbl = "0";


  function downloadPDF(content) {

    var indView = Ti.UI.createView({
      height: 100,
      layout: "vertical",
      backgroundColor: "#ffffff",
      bottom: 5,
      width: Ti.UI.SIZE });

    if (isDownloading == "1") {
      var label = Ti.UI.createLabel({
        color: '#CE1D1C',
        font: { fontSize: 10, fontWeight: "bold" },
        text: 'Please wait until current downloading is done.',
        bottom: 10,
        width: "100%",
        height: 10,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER });


      if (isDownloadLbl == "0") {
        $.bigView.add(label);

        setTimeout(function () {
          isDownloadLbl = "0";
          $.bigView.remove(label);
        }, 3000);
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
      message: 'Downloading ' + content.title + '...',
      font: { fontSize: 12 },
      color: '#CE1D1C' });


    var label = Ti.UI.createLabel({
      color: '#CE1D1C',
      font: { fontSize: 14, fontWeight: "bold" },
      text: '0%',
      top: 0,
      width: "100%",
      height: 30,
      textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER });


    if (content.isDownloaded == "1") {
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

    PDF.createPdf(content, true, ind, label, indView, function (err, file, base, url) {
      if (err) {
        alert(err);
      } else {
        isDownloading = "0";

        indView.hide();
        $.bigView.remove(indView);

        if ('android' == "android") {
          console.log("file return : " + file.getNativePath());
          PDF.android_launch(file);
        } else {

          var myModal = Ti.UI.createWindow({
            title: 'Read PDF',
            backgroundColor: 'transparent',
            fullscreen: true });

          var leftBtn = Ti.UI.createButton({
            title: "Close",
            color: "#CE1D1C",
            left: 15 });

          var wrapperView = Ti.UI.createView({
            layout: "vertical",
            height: Ti.UI.SIZE });


          var topView = Ti.UI.createView({
            backgroundColor: '#EEEEEE',
            top: 0,
            height: 40 });

          var containerView = Ti.UI.createView({
            height: Ti.UI.SIZE,
            width: Ti.UI.FILL,
            backgroundColor: 'transparent' });

          var webview = Ti.UI.createWebView({
            data: file.read(),
            height: Ti.UI.FILL,
            width: Ti.UI.FILL,
            backgroundColor: "#ffffff",
            bottom: 10 });


          containerView.add(webview);
          topView.add(leftBtn);
          wrapperView.add(topView);
          wrapperView.add(containerView);
          myModal.add(wrapperView);
          myModal.open({
            modal: true });

          leftBtn.addEventListener('click', function (ex) {
            myModal.close({ animated: true });
          });
        }
      }
    });

  }

  function iterate(item) {
    MediaPicker.getImageByURL({
      key: item.url,
      id: item.id,
      success: function (e) {
        var image;
        if (e.image.apiName == 'Ti.Blob') {
          image = e.image;
        } else {
          var imageview = Ti.UI.createImageView({
            image: 'file://' + e.image });

          image = imageview.toBlob();
        }

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

        var param = {
          medical_id: id,
          u_id: Ti.App.Properties.getString('u_id'),
          caption: categoryType,
          Filedata: image };

        console.log(param);
        API.callByPost({ url: "addMedicalAttachment", params: param }, function (responseText) {
          var res = JSON.parse(responseText);
          if (res.status == "success") {
            var model = Alloy.createCollection("medicalAttachmentV2");
            var res = JSON.parse(responseText);
            var arr = res.data || null;
            console.log(responseText);
            model.saveArray(arr);
          }

          loadImage();
        });
      } });

  }

  function saveImage(items) {
    console.log(items.length + "?total image picker");
    for (var a = 0; items.length > a; a++) {
      iterate(items[a]);
    }
  }

  $.editRecWin.addEventListener('close', function () {
    if (!skipUpdate) {
      backAndSave();
    }
    Ti.App.removeEventListener('refreshAttachment', loadImage);
    $.destroy();
    Ti.App.fireEvent("myMedicalRecord:refresh");
    console.log("window close");
  });
  Ti.App.addEventListener('refreshAttachment', loadImage);
  $.saveRecord.addEventListener('click', saveRecord);

  if ('android' == "android") {
    $.btnBack.addEventListener('click', function () {
      nav.closeWindow($.editRecWin);
    });
  }

  var applicationDatDirectory = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory);
  var filesInFolder = applicationDatDirectory.getDirectoryListing();





  __defers['$.__views.__alloyId417!click!showCategory'] && $.addListener($.__views.__alloyId417, 'click', showCategory);__defers['$.__views.__alloyId420!click!deleteRecord'] && $.addListener($.__views.__alloyId420, 'click', deleteRecord);



  _.extend($, exports);
}

module.exports = Controller;