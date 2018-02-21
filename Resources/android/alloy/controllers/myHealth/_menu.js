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
  this.__controllerPath = 'myHealth/_menu';
  this.args = arguments[0] || {};

  if (arguments[0]) {
    var __parentSymbol = __processArg(arguments[0], '__parentSymbol');
    var $model = __processArg(arguments[0], '$model');
    var __itemTemplate = __processArg(arguments[0], '__itemTemplate');
  }
  var $ = this;
  var exports = {};
  var __defers = {};

  $.__views.typeWindowPopUp = Ti.UI.createWindow({ backgroundColor: "#ffffff", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, opacity: 0, id: "typeWindowPopUp" });
  $.__views.typeWindowPopUp && $.addTopLevelView($.__views.typeWindowPopUp);
  $.__views.__alloyId514 = Ti.UI.createView({ right: 3, top: 48, width: "70%", height: 90, borderRadius: 5, borderColor: "#FC7474", borderWidth: 1, layout: "vertical", id: "__alloyId514" });
  $.__views.typeWindowPopUp.add($.__views.__alloyId514);
  $.__views.popup_view = Ti.UI.createView({ id: "popup_view", layout: "horizontal", width: "100%" });
  $.__views.__alloyId514.add($.__views.popup_view);
  exports.destroy = function () {};

  _.extend($, $.__views);

  var args = arguments[0] || {};

  var hideWin = 1;

  $.typeWindowPopUp.addEventListener('touchend', function (e) {
    if (hideWin == 1) {
      $.typeWindowPopUp.close({
        curve: Ti.UI.ANIMATION_CURVE_EASE_OUT,
        opacity: 0,
        duration: 200
      });
    }
    hideWin = 1;
  });

  function navByType(evt) {
    hideWin = 0;

    if (evt.source.source == "profile") {
      nav.navigationWindow("myHealth/profile");
    } else if (evt.source.source == "motion") {
      nav.navigationWindow("myHealth/workout");
    } else {
      Ti.App.fireEvent('filterList', { category: evt.source.source });
    }

    $.typeWindowPopUp.close({
      curve: Ti.UI.ANIMATION_CURVE_EASE_OUT,
      opacity: 0,
      duration: 500
    });
  }

  $.typeWindowPopUp.addEventListener("close", function () {
    $.destroy();
    hideWin = null;
  });

  var TheTable = Titanium.UI.createTableView({
    width: '100%',
    separatorColor: '#FC7474',
    scrollable: false
  });

  var CustomData = [{ image: 'images/measurement.png', title: "Body Measurement", source: 'measurement' }, { image: 'images/vitals.png', title: "Vitals", source: 'vitals' }];

  var data = [];
  console.log(CustomData.length + "number of row");
  for (var i = 0; i < CustomData.length; i++) {
    var row = Titanium.UI.createTableViewRow({
      touchEnabled: true,
      height: 45,
      selectedBackgroundColor: "#FFE1E1",
      source: CustomData[i].source,
      backgroundGradient: {
        type: 'linear',
        colors: ['#FEFEFB', '#F7F7F6'],
        startPoint: { x: 0, y: 0 },
        endPoint: { x: 0, y: 45 },
        backFillStart: false }
    });

    var leftImage = Titanium.UI.createImageView({
      image: CustomData[i].image,
      source: CustomData[i].source,
      width: 25,
      height: 25,
      left: 10,
      top: 10
    });

    var popUpTitle = Titanium.UI.createLabel({
      text: CustomData[i].title,
      source: CustomData[i].source,
      font: { fontSize: 16 },
      color: "#848484",
      width: 'auto',
      textAlign: 'left',
      top: 8,
      left: 40,
      height: 25
    });

    row.addEventListener('touchend', function (e) {
      navByType(e);
    });

    row.add(leftImage);
    row.add(popUpTitle);

    data.push(row);
  };

  TheTable.setData(data);
  $.popup_view.add(TheTable);

  _.extend($, exports);
}

module.exports = Controller;