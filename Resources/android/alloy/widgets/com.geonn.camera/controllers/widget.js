var Alloy = require('/alloy'),
Backbone = Alloy.Backbone,
_ = Alloy._;


function WPATH(s) {
  var index = s.lastIndexOf('/');
  var path = index === -1 ?
  'com.geonn.camera/' + s :
  s.substring(0, index) + '/com.geonn.camera/' + s.substring(index + 1);

  return path.indexOf('/') !== 0 ? '/' + path : path;
}

function __processArg(obj, key) {
  var arg = null;
  if (obj) {
    arg = obj[key] || null;
  }
  return arg;
}

function Controller() {
  var Widget = new (require('/alloy/widget'))('com.geonn.camera');this.__widgetId = 'com.geonn.camera';
  require('/alloy/controllers/' + 'BaseController').apply(this, Array.prototype.slice.call(arguments));
  this.__controllerPath = 'widget';
  this.args = arguments[0] || {};

  if (arguments[0]) {
    var __parentSymbol = __processArg(arguments[0], '__parentSymbol');
    var $model = __processArg(arguments[0], '$model');
    var __itemTemplate = __processArg(arguments[0], '__itemTemplate');
  }
  var $ = this;
  var exports = {};
  var __defers = {};







  $.__views.container = Ti.UI.createView(
  { borderWidth: 0, top: 10, left: 10, right: 10, bottom: 10, width: Ti.UI.FILL, borderRadius: "5", height: 120, id: "container" });

  $.__views.container && $.addTopLevelView($.__views.container);
  popCamera ? $.addListener($.__views.container, 'click', popCamera) : __defers['$.__views.container!click!popCamera'] = true;$.__views.image_preview = Ti.UI.createImageView(
  { height: 30, id: "image_preview", width: 30 });

  $.__views.container.add($.__views.image_preview);
  exports.destroy = function () {};




  _.extend($, $.__views);


  var args = {};

  $.init = function (arg) {
    console.log(args);
    $.image_preview.image = WPATH('images/upload_arrow.png');
    console.log(WPATH('images/upload_arrow.png') + " check image path");
    args = arg;
  };

  function camera_callback(event) {
    console.log(320 / event.media.width + " " + 320 / event.media.height);
    var new_height = event.media.height <= event.media.width ? event.media.height * (320 / event.media.width) : 320;
    var new_width = event.media.width <= event.media.height ? event.media.width * (320 / event.media.height) : 320;
    var blob = event.media;
    console.log(" " + event.media.width + " " + event.media.height);
    console.log(new_width + " " + new_height);
    blob = blob.imageAsResized(new_width, new_height);
    $.image_preview.height = 120;
    $.image_preview.width = Ti.UI.SIZE;
    $.image_preview.image = blob;
    $.image_preview.parent.filedata = blob;
    $.image_preview.parent.attached = 1;
  }

  function showCamera() {
    Titanium.Media.showCamera({
      success: function (event) {

        camera_callback(event);
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
      allowImageEditing: false,
      mediaTypes: [Ti.Media.MEDIA_TYPE_PHOTO],
      saveToPhotoGallery: true });

  }

  function popCamera(e) {

    if (!filepermittion()) return;

    var dialog = Titanium.UI.createOptionDialog({
      title: 'Choose an image source...',
      options: ['Camera', 'Photo Gallery', 'Cancel'],
      cancel: 2 });

    var pWidth = Ti.Platform.displayCaps.platformWidth;
    var pHeight = Ti.Platform.displayCaps.platformHeight;

    dialog.addEventListener('click', function (ex) {

      if (ex.index == 0) {


        if (Ti.Media.hasCameraPermissions()) {
          console.log("Success to open camera");
          showCamera();
        } else {
          Ti.Media.requestCameraPermissions(function (request_e) {
            if (request_e.success) {
              showCamera();
            } else {
              alert("You denied permission.");
            }
          });
        }
      } else if (ex.index == 1) {

        Titanium.Media.openPhotoGallery({

          success: function (event) {


            camera_callback(event);
          },
          cancel: function () {

          },
          error: function (error) {

            var a = Titanium.UI.createAlertDialog({ title: 'Camera' });
            if (error.code == Titanium.Media.NO_CAMERA) {
              a.setMessage('Please run this test on device');
            } else {
              a.setMessage('Unexpected error: ' + error.code);
            }
            a.show();
          },

          allowEditing: false,
          mediaTypes: [Ti.Media.MEDIA_TYPE_PHOTO] });

      }
    });


    dialog.show();
  }

  function filepermittion() {
    if (true) {
      if (Ti.Filesystem.hasStoragePermissions()) return true;else {
        Ti.Filesystem.requestStoragePermissions(function (e) {
          if (e.success) {
            return true;
          } else {
            alert("You have denied the permission.");
            return false;
          }
        });
      }
    } else {
      if (Ti.Media.hasPhotoGalleryPermissions()) return true;else {
        Ti.Media.requestPhotoGalleryPermissions(function (e) {
          if (e.success) {
            return true;
          } else {
            alert("You have denied the permission.");
            return false;
          }
        });
      }
    }
  }

  function image_preview(event) {
    if (typeof $.container.children[1] != "undefined") {
      $.container.children[1].image = event.media;
    } else {
      $.container.add($.UI.create("ImageView", { image: event.media, width: 120, classes: ['hsize'] }));
    }
  }





  __defers['$.__views.container!click!popCamera'] && $.addListener($.__views.container, 'click', popCamera);



  _.extend($, exports);
}

module.exports = Controller;