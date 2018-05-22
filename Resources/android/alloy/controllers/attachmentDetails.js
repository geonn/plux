var Alloy = require('/alloy'),
Backbone = Alloy.Backbone,
_ = Alloy._;




function __processArg(obj, key) {
  var arg = null;
  if (obj) {
    arg = obj[key] || null;
  }
  return arg;
}

function Controller() {

  require('/alloy/controllers/' + 'BaseController').apply(this, Array.prototype.slice.call(arguments));
  this.__controllerPath = 'attachmentDetails';
  this.args = arguments[0] || {};

  if (arguments[0]) {
    var __parentSymbol = __processArg(arguments[0], '__parentSymbol');
    var $model = __processArg(arguments[0], '$model');
    var __itemTemplate = __processArg(arguments[0], '__itemTemplate');
  }
  var $ = this;
  var exports = {};
  var __defers = {};







  $.__views.attachment_Details = Ti.UI.createWindow(
  { backgroundColor: "#535a74", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, id: "attachment_Details", title: "Attachment", navTintColor: "#CE1D1C" });

  $.__views.attachment_Details && $.addTopLevelView($.__views.attachment_Details);
  function __alloyId486() {
    $.__views.attachment_Details.removeEventListener('open', __alloyId486);
    if ($.__views.attachment_Details.activity) {
      $.__views.attachment_Details.activity.actionBar.onHomeIconItemSelected = closeWindow;
    } else {
      Ti.API.warn('You attempted to access an Activity on a lightweight Window or other');
      Ti.API.warn('UI component which does not have an Android activity. Android Activities');
      Ti.API.warn('are valid with only windows in TabGroups or heavyweight Windows.');
    }
  }
  $.__views.attachment_Details.addEventListener('open', __alloyId486);
  $.__views.__alloyId488 = Ti.UI.createLabel(
  { width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#111111", text: 'Close', id: "__alloyId488" });

  closeWindow ? $.addListener($.__views.__alloyId488, 'click', closeWindow) : __defers['$.__views.__alloyId488!click!closeWindow'] = true;$.__views.attachment_Details.rightNavButton = $.__views.__alloyId488;$.__views.albumView = Ti.UI.createView(
  { borderWidth: 0, id: "albumView", height: Ti.UI.SIZE, bottom: 40 });

  $.__views.attachment_Details.add($.__views.albumView);
  exports.destroy = function () {};




  _.extend($, $.__views);


  var args = arguments[0] || {};
  var rec_id = args.rec_id;
  var position = args.position;
  var isLink = args.isLink;
  var attachedLink = args.image;

  var medicalAttachmentModel = Alloy.createCollection('medicalAttachmentV2');
  var getAttImages = function () {
    var items = medicalAttachmentModel.getData(rec_id);
    var counter = 0;
    var imagepath,
    adImage,
    row = '';
    var my_page = 0;


    var the_view = [];
    if (items.length > 0) {
      for (var i = 0; i < items.length; i++) {

        var myImage = items[i].img_path;




        adImage = Ti.UI.createImageView({
          image: myImage,
          width: "100%",
          top: 40 });


        var scrollView = Ti.UI.createScrollView({
          contentWidth: 'auto',
          contentHeight: Ti.UI.SIZE,
          maxZoomScale: 30,
          minZoomScale: 1,
          zoomScale: 1,
          height: Ti.UI.FILL,
          width: '100%' });


        var close_label = Ti.UI.createLabel({
          text: "Close",
          top: 0,
          right: 0,
          height: 40,
          width: Ti.UI.SIZE,
          color: "#ffffff" });


        close_label.addEventListener("click", closeWindow);

        var header = Ti.UI.createView({
          width: Ti.UI.FILL,
          height: 40,
          top: 0 });


        var img_caption = Ti.UI.createLabel({
          text: items[i].category,
          height: 40,
          top: 0,
          color: "#ffffff" });


        row = $.UI.create('View', { classes: ["row"], id: "view" + counter });

        $.attachment_Details.title = items[i].category;
        row.add(adImage);
        header.add(img_caption);
        header.add(close_label);
        row.add(header);
        scrollView.add(row);
        the_view.push(scrollView);

        counter++;
      }
    } else {
      adImage = Ti.UI.createImageView({
        image: attachedLink,
        width: "100%",
        top: 40 });


      var scrollView = Ti.UI.createScrollView({
        contentWidth: 'auto',
        contentHeight: Ti.UI.SIZE,
        maxZoomScale: 30,
        minZoomScale: 1,
        zoomScale: 1,
        height: Ti.UI.FILL,
        width: '100%' });


      var close_label = Ti.UI.createLabel({
        text: "Close",
        top: 0,
        right: 0,
        height: 40,
        width: Ti.UI.SIZE,
        color: "#ffffff" });


      close_label.addEventListener("click", closeWindow);

      var header = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: 40,
        top: 0 });


      row = $.UI.create('View', { classes: ["row"], id: "view" + counter });

      $.attachment_Details.title = "Medical Attachment";
      row.add(adImage);
      header.add(close_label);
      row.add(header);
      scrollView.add(row);
      the_view.push(scrollView);
    }
    var scrollableView = Ti.UI.createScrollableView({
      id: "scrollableView",
      views: the_view,
      backgroundColor: "#000000",
      showPagingControl: true });


    $.albumView.add(scrollableView);

    if (!isLink) {
      var deleteView = Ti.UI.createView({
        height: 40,
        bottom: 0,
        width: "100%",
        backgroundColor: "#EEEEEE" });


      var deleteBtn = Ti.UI.createButton({
        backgroundImage: "/images/btn-remove.png",
        textAlign: "left",
        left: 15,
        width: 30,
        height: 30 });


      deleteView.add(deleteBtn);
      deleteBtn.addEventListener('click', function () {
        my_page = scrollableView.currentPage;
        var dialog = Ti.UI.createAlertDialog({
          cancel: 1,
          buttonNames: ['Cancel', 'Confirm'],
          message: 'Are you sure want to delete this photo?',
          title: 'Delete Confirmation' });

        dialog.addEventListener('click', function (e) {
          if (e.index === e.source.cancel) {

          }
          if (e.index === 1) {
            var param = {
              "img_id": items[my_page].id,
              'status': 2 };

            console.log(param);
            API.callByPost({ url: "deleteAttachment", params: param }, function (responseText) {
              var res = JSON.parse(responseText);
              console.log(res);
              if (res.status == "success") {
                medicalAttachmentModel.saveArray(res.data);
                getAttImages();
                Ti.App.fireEvent('refreshAttachment');
                $.attachment_Details.close({
                  curve: Ti.UI.ANIMATION_CURVE_EASE_OUT,
                  opacity: 0,
                  duration: 200 });

              }
            });
          }
        });
        dialog.show();
      });
      $.attachment_Details.add(deleteView);
    }
  };

  $.albumView.addEventListener('click', function () {
    $.attachment_Details.close({
      curve: Ti.UI.ANIMATION_CURVE_EASE_OUT,
      opacity: 0,
      duration: 200 });

  });

  function closeWindow() {
    $.attachment_Details.close({
      curve: Ti.UI.ANIMATION_CURVE_EASE_OUT,
      opacity: 0,
      duration: 200 });

  }




  getAttImages();





  __defers['$.__views.__alloyId488!click!closeWindow'] && $.addListener($.__views.__alloyId488, 'click', closeWindow);



  _.extend($, exports);
}

module.exports = Controller;