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
  this.__controllerPath = 'askDoctor/conversation';
  this.args = arguments[0] || {};

  if (arguments[0]) {
    var __parentSymbol = __processArg(arguments[0], '__parentSymbol');
    var $model = __processArg(arguments[0], '$model');
    var __itemTemplate = __processArg(arguments[0], '__itemTemplate');
  }
  var $ = this;
  var exports = {};
  var __defers = {};

  // Generated code that must be executed before all UI and/or
  // controller code. One example is all model and collection
  // declarations from markup.


  // Generated UI code
  $.__views["win"] = Ti.UI.createWindow(
  { barColor: "transparent", backgroundColor: "#535a74", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, title: "Ask Doctor", id: "win", backButtonTitle: "", navTintColor: "#CE1D1C" });

  $.__views["win"] && $.addTopLevelView($.__views["win"]);
  $.__views["__alloyId97"] = Ti.UI.createScrollView(
  { width: Ti.UI.FILL, height: Ti.UI.FILL, contentHeight: Ti.UI.SIZE, contentWidth: Ti.UI.FILL, id: "__alloyId97" });

  $.__views["win"].add($.__views["__alloyId97"]);
  $.__views["__alloyId98"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.FILL, top: 0, id: "__alloyId98" });

  $.__views["__alloyId97"].add($.__views["__alloyId98"]);
  if (true) {
    $.__views["__alloyId99"] = Ti.UI.createView(
    { borderWidth: 0, layout: "horizontal", width: Ti.UI.FILL, height: 50, backgroundColor: "#DEDEDE", id: "__alloyId99" });

    $.__views["__alloyId98"].add($.__views["__alloyId99"]);
    $.__views["__alloyId100"] = Ti.UI.createView(
    { borderWidth: 0, left: 0, width: "20%", id: "__alloyId100" });

    $.__views["__alloyId99"].add($.__views["__alloyId100"]);
    $.__views["btnBack"] = Ti.UI.createImageView(
    { left: 10, id: "btnBack", width: 25, height: 25, image: "/images/btn-back.png" });

    $.__views["__alloyId100"].add($.__views["btnBack"]);
    closeWindow ? $.addListener($.__views["btnBack"], 'click', closeWindow) : __defers['$.__views["btnBack"]!click!closeWindow'] = true;$.__views["__alloyId101"] = Ti.UI.createView(
    { borderWidth: 0, width: "60%", id: "__alloyId101" });

    $.__views["__alloyId99"].add($.__views["__alloyId101"]);
    $.__views["pageTitle"] = Ti.UI.createLabel(
    { width: Titanium.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial", fontSize: "16dp" }, text: 'Ask Doctor', id: "pageTitle", textAlign: "center" });

    $.__views["__alloyId101"].add($.__views["pageTitle"]);
  }
  $.__views["__alloyId102"] = Ti.UI.createView(
  { borderWidth: 0, width: Ti.UI.FILL, height: Ti.UI.FILL, id: "__alloyId102" });

  $.__views["__alloyId98"].add($.__views["__alloyId102"]);
  $.__views["chatroom"] = Ti.UI.createTableView(
  { contentHeight: Ti.UI.SIZE, contentWidth: Ti.UI.FILL, backgroundColor: "transparent", separatorStyle: "none", selectionStyle: "none", layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.FILL, bubbleParent: false, bottom: 110, top: 0, id: "chatroom" });

  $.__views["__alloyId102"].add($.__views["chatroom"]);
  var __alloyId124 = Alloy.Collections['chats'] || chats;function __alloyId125(e) {if (e && e.fromAdapter) {return;}var opts = __alloyId125.opts || {};var models = __alloyId124.models;var len = models.length;var rows = [];for (var i = 0; i < len; i++) {var __alloyId103 = models[i];__alloyId103.__transform = _.isFunction(__alloyId103.transform) ? __alloyId103.transform() : __alloyId103.toJSON();var __alloyId105 = Ti.UI.createTableViewRow(
      {});

      rows.push(__alloyId105);
      var __alloyId107 = Ti.UI.createView(
      { borderWidth: 0, layout: "vertical", height: Ti.UI.SIZE, borderRadius: "5", format: __alloyId103.__transform.format, width: "75%", top: 10, backgroundColor: __alloyId103.__transform.bgColor, left: __alloyId103.__transform.setLeft, right: __alloyId103.__transform.setRight });

      __alloyId105.add(__alloyId107);
      var __alloyId109 = Ti.UI.createLabel(
      { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: __alloyId103.__transform.sender_name_color, font: { fontFamily: "Roboto-Bold", fontSize: 12 }, top: 5, left: 10, text: __alloyId103.__transform.sender_name });

      __alloyId107.add(__alloyId109);
      var __alloyId111 = Ti.UI.createLabel(
      { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: __alloyId103.__transform.sender_name_color, font: { fontFamily: "Roboto-Regular, arial", fontSize: 11 }, left: 10, bottom: 0, text: __alloyId103.__transform.created });

      __alloyId107.add(__alloyId111);
      var __alloyId113 = Ti.UI.createView(
      { borderWidth: 0, height: 1, width: Ti.UI.FILL, backgroundColor: "#ccc", top: 5, left: 10, right: 10 });

      __alloyId107.add(__alloyId113);
      var __alloyId115 = Ti.UI.createView(
      { borderWidth: 0, width: Ti.UI.SIZE, height: Ti.UI.SIZE });

      __alloyId107.add(__alloyId115);
      var __alloyId117 = Ti.UI.createLabel(
      { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: __alloyId103.__transform.text_color, font: { fontFamily: "Roboto-Regular, arial", fontSize: 16 }, top: 5, left: 10, right: 10, bottom: 10, visible: __alloyId103.__transform.text_visible, text: __alloyId103.__transform.newText });

      __alloyId115.add(__alloyId117);
      var __alloyId119 = Ti.UI.createImageView(
      { top: 10, left: 10, right: 10, bottom: 10, width: Ti.UI.FILL, height: __alloyId103.__transform.image_height, visible: __alloyId103.__transform.photo_visible, image: __alloyId103.__transform.image });

      __alloyId115.add(__alloyId119);
      imageZoom ? $.addListener(__alloyId119, 'click', imageZoom) : __defers['__alloyId119!click!imageZoom'] = true;var __alloyId121 = Ti.UI.createView(
      { borderWidth: 0, visible: __alloyId103.__transform.voice_visible, width: Ti.UI.FILL, height: 30 });

      __alloyId115.add(__alloyId121);
      var __alloyId122 = Ti.UI.createImageView(
      { new: true, image: "/images/play_button.png", voice: __alloyId103.__transform.voice, top: 0, height: 30, width: 30, left: 10, right: 10, zIndex: 10 });

      __alloyId121.add(__alloyId122);
      onPlayStopBtnClicked ? $.addListener(__alloyId122, 'click', onPlayStopBtnClicked) : __defers['__alloyId122!click!onPlayStopBtnClicked'] = true;var __alloyId123 = Ti.UI.createLabel(
      { width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#fff", font: { fontFamily: "Roboto-Regular, arial" }, left: 50 });

      __alloyId121.add(__alloyId123);
    }$.__views["chatroom"].setData(rows);};__alloyId124.on('fetch destroy change add remove reset', __alloyId125);blurKeyboard ? $.addListener($.__views["chatroom"], 'click', blurKeyboard) : __defers['$.__views["chatroom"]!click!blurKeyboard'] = true;scrollChecker ? $.addListener($.__views["chatroom"], 'scroll', scrollChecker) : __defers['$.__views["chatroom"]!scroll!scrollChecker'] = true;$.__views["__alloyId126"] = Ti.UI.createButton(
  { borderRadius: 5, backgroundColor: "#00c8a9", height: 40, color: "#ffffff", width: Ti.UI.FILL, title: 'End Session', bottom: 60, id: "__alloyId126" });

  $.__views["__alloyId97"].add($.__views["__alloyId126"]);
  endSession ? $.addListener($.__views["__alloyId126"], 'click', endSession) : __defers['$.__views["__alloyId126"]!click!endSession'] = true;$.__views["bottom_bar"] = Ti.UI.createView(
  { borderWidth: 0, width: Ti.UI.FILL, height: Ti.UI.SIZE, backgroundColor: "white", bottom: 10, id: "bottom_bar" });

  $.__views["__alloyId97"].add($.__views["bottom_bar"]);
  $.__views["__alloyId127"] = Ti.UI.createImageView(
  { image: "/images/icons/icon_photo_camera.png", top: 15, bottom: 15, zIndex: 3, left: 10, height: 30, width: 30, id: "__alloyId127" });

  $.__views["bottom_bar"].add($.__views["__alloyId127"]);
  popCamera ? $.addListener($.__views["__alloyId127"], 'click', popCamera) : __defers['$.__views["__alloyId127"]!click!popCamera'] = true;$.__views["message_bar"] = Ti.UI.createTextArea(
  { color: "#fff", font: "fontSize: 40", width: Ti.UI.FILL, backgroundColor: "#439FE6", borderRadius: 5, id: "message_bar", top: 10, left: 50, right: 50, suppressReturn: false, lines: 1 });

  $.__views["bottom_bar"].add($.__views["message_bar"]);
  switchIcon ? $.addListener($.__views["message_bar"], 'change', switchIcon) : __defers['$.__views["message_bar"]!change!switchIcon'] = true;$.__views["action_btn"] = Ti.UI.createView(
  { borderWidth: 0, width: Ti.UI.SIZE, height: 50, id: "action_btn", right: 0 });

  $.__views["bottom_bar"].add($.__views["action_btn"]);
  $.__views["enter_icon"] = Ti.UI.createImageView(
  { id: "enter_icon", backgroundColor: "#ffffff", image: "/images/icons/icon_enter.png", top: 10, bottom: 10, zIndex: 3, right: -50, height: 30, width: 30 });

  $.__views["action_btn"].add($.__views["enter_icon"]);
  SendMessage ? $.addListener($.__views["enter_icon"], 'click', SendMessage) : __defers['$.__views["enter_icon"]!click!SendMessage'] = true;exports.destroy = function () {__alloyId124 && __alloyId124.off('fetch destroy change add remove reset', __alloyId125);};

  // make all IDed elements in $.__views available right on the $ in a
  // controller's internal code. Externally the IDed elements will
  // be accessed with getView().
  _.extend($, $.__views);

  // Controller code directly from the developer's controller file
  var args = arguments[0] || {};
  var loading = Alloy.createController("loading");
  var anchor = Alloy.Globals.common.now();
  var last_update = Alloy.Globals.common.now();
  var start = 0;
  var u_id = Ti.App.Properties.getString('u_id') || 0;
  var last_id = 0;
  var last_uid;
  var status_text = ["", "Sending", "Sent", "Read"];
  var room_status;
  var room_id = args.room_id || 0;
  var voice_recorder = Alloy.createWidget('geonn.voicerecorder', { record_callback: saveLocal, room_id: room_id });
  var user_read_status, doctor_read_status;
  var opposite_online = "false";
  var opposite_last_update;
  var moment = require('alloy/moment');
  var data_source = [];
  var socket_offline = false;
  $.win.title = args.from;

  var sound = Titanium.Media.createSound({
    url: '/sound/ding.mp3',
    preload: true });



  if (true) {
    $.pageTitle.text = args.from;
  }
  target_page = "askDoctor/conversation";
  Ti.App.Properties.setString('room_id', room_id);
  function saveLocal(param) {
    var last_arr = data_source.length;
    var model = Alloy.createCollection("chat");
    var app_id = Math.random().toString(36).substr(2, 10);
    var local_save = {
      "u_id": u_id,
      "id": app_id,
      "sender_id": u_id,
      "message": param.message,
      "room_id": room_id,
      "created": Alloy.Globals.common.now(),
      "is_endUser": 1,
      "format": param.format,
      "status": 1,
      "sender_name": Ti.App.Properties.getString('fullname') || "" };

    var id = model.saveArray([local_save]);
    var api_param = { u_id: u_id, message: param.message, "created": Alloy.Globals.common.now(), is_endUser: 1, id: app_id, room_id: room_id };
    if (param.format == "voice" || param.format == "photo") {

      Alloy.Globals._.extend(api_param, { media: param.format, Filedata: param.filedata });
    }
    data = [{
      "u_id": u_id,
      "id": app_id,
      "sender_id": u_id,
      "message": param.message || param.filedata,
      "created": Alloy.Globals.common.now(),
      "is_endUser": 1,
      "room_id": room_id,
      "format": param.format,
      "status": 1,
      "sender_name": Ti.App.Properties.getString('fullname') || "" }];

    $.message_bar.value = "";
    $.enter_icon.right = -50;
    render_conversation(true, true);
    Alloy.Globals.API.callByPost({ url: "sendASPPatientMessage", new: true, domain: "FREEJINI_DOMAIN", type: param.format, params: api_param }, function (responseText) {

      var res = JSON.parse(responseText);
      Alloy.Globals.mocx.createCollection("chats", data_source);

      var new_arr = _.omit(local_save, "u_id");

      if (param.format != "text") {
        new_arr.message = res.data.media_url;
      }

      Alloy.Globals.socket.sendMessage({ room_id: room_id, msg: JSON.stringify(new_arr), callback: function () {
          console.log("callback here");
          data_source[last_arr].created = timeFormat(Alloy.Globals.common.now()) + " " + status_text[2];
          Alloy.Globals.mocx.createCollection("chats", data_source);
        } });
      //Ti.App.fireEvent("sendMessage", {room_id: room_id});
      //Ti.App.fireEvent("refresh_patient_list");
      Alloy.Globals.socket.refresh_patient_list({});

    });
  }

  function timeFormat(datetime) {
    var timeStamp = datetime.split(" ");
    var newFormat;
    var ampm = "am";
    var date = timeStamp[0].split("-");
    if (timeStamp.length == 1) {
      newFormat = date[2] + "/" + date[1] + "/" + date[0];
    } else {
      var time = timeStamp[1].split(":");
      if (time[0] >= 12) {
        ampm = "pm";
        if (time[0] <= 12) {
          time[0] = time[0];
        } else {
          time[0] = time[0] - 12;
        }
      }

      newFormat = date[2] + "/" + date[1] + "/" + date[0] + " " + time[0] + ":" + time[1] + " " + ampm;
    }

    return newFormat;
  }

  /**
       * Send message
       */
  var interval;
  var sending = false;
  function SendMessage() {
    if ($.message_bar.value == "") {
      return;
    }

    //startTimer();
    saveLocal({ message: $.message_bar.value, format: "text" });
  }

  function navToWebview(e) {
    var url = Alloy.Globals.common.parent({ name: "url" }, e.source);
    var win = Alloy.createController("webview", { url: url }).getView();
    win.open();
  }

  function pixelToDp(px) {
    return parseInt(px) / (Titanium.Platform.displayCaps.dpi / 160);
  }


  function blurKeyboard() {
    $.message_bar.blur();
  }

  function addRow(row, latest) {
    var arr = {
      id: row.id,
      sender_name: row.sender_name,
      created: !row.is_endUser ? timeFormat(row.created) : timeFormat(row.created) + " " + status_text[opposite_last_update > row.created || opposite_online == "true" ? 3 : row.status],
      text_color: row.format == "link" ? "blue" : !row.is_endUser ? "#606060" : "#ffffff",
      sender_name_color: !row.is_endUser ? "#000000" : "#ffffff",
      newText: row.format != "photo" ? row.message.replace(/\[br\]/gi, "\r\n") : row.message,
      bgColor: !row.is_endUser ? "#ffffff" : "#22262f",
      setLeft: !row.is_endUser ? 10 : null,
      setRight: !row.is_endUser ? null : "10",
      text_visible: row.format == "text" ? true : false,
      photo_visible: row.format == "photo" ? true : false,
      voice_visible: row.format == "voice" ? true : false,
      image_height: row.format == "photo" ? 200 : 0,
      image: row.format == "photo" ? row.message : "",
      voice: row.format == "voice" ? row.message : "" };


    if (!latest) {
      data_source.unshift(arr);
    } else {
      data_source.push(arr);
    }
  }

  function navToDoctorDetail(e) {
    alert("Doctor Specialty: " + e.source.params.dr_specialty + "\nDoctor Qualification: " + e.source.params.dr_qualification + "\nIntroduction: " + e.source.params.dr_introduction);
  }

  function imageZoom(e) {
    if (typeof e.source.image == "object") {
      return;
    }
    var path = typeof e.source.image == "object" ? e.source.image.nativePath : e.source.image;
    var html = "<img width='100%' height='auto' src='" + path + "'/>";
    if (false) {
      Alloy.Globals.nav.navigationWindow("webview", "", "", { url: path, title: "" });
      //var webview = $.UI.create("WebView", {backgroundColor: "#000",  zIndex: 12, classes:['wfill','hsize'], url: e.source.record.attachment});
    } else {
      Alloy.Globals.nav.navigationWindow("webview", "", "", { content: html, title: "" });
      //var webview = $.UI.create("WebView", {backgroundColor: "#000",  zIndex: 12, classes:['wfill','hsize'], html: html});
    }
  }

  function updateReadStatus(e) {
    var inner_area = $.inner_area.getChildren();
    for (var i = 0; i < inner_area.length; i++) {
      if (inner_area[i].children[0].children.length <= 1) {
        $.bottom_bar.hide();
      } else if (inner_area[i].is_endUser && typeof inner_area[i].children[0].children[inner_area[i].children[0].children.length - 1] != "undefined" && (opposite_last_update > inner_area[i].created || opposite_online == "true") && inner_area[i].status == 2) {
        inner_area[i].status = 3;
        inner_area[i].children[0].children[0].children[inner_area[i].children[0].children[0].children.length - 1].text = moment(inner_area[i].created).format("DD/MM/YYYY hh:mm A") + " " + status_text[3];
      } /*else if(!inner_area[i].is_endUser && typeof inner_area[i].children[0].children[inner_area[i].children[0].children.length - 1] != "undefined" && user_read_status > inner_area[i].created){
           inner_area[i].children[0].children[0].children[inner_area[i].children[0].children[0].children.length - 1].text = timeFormat(inner_area[i].created)+" "+status_text[3];
        }*/
    }
  }

  function updateRow(row, latest) {
    var found = false;
    for (var i = 0; i < data_source.length; i++) {
      if (data_source[i].id == row.id) {
        found = true;
        data_source[i] = {
          id: row.id,
          sender_name: row.sender_name,
          created: !row.is_endUser ? timeFormat(row.created) : timeFormat(row.created) + " " + status_text[opposite_last_update > row.created || opposite_online == "true" ? 3 : row.status],
          text_color: row.format == "link" ? "blue" : !row.is_endUser ? "#606060" : "#ffffff",
          sender_name_color: !row.is_endUser ? "#000000" : "#ffffff",
          newText: row.format != "photo" ? row.message.replace(/\[br\]/gi, "\r\n") : row.message,
          bgColor: !row.is_endUser ? "#ffffff" : "#22262f",
          setLeft: !row.is_endUser ? 10 : null,
          setRight: !row.is_endUser ? null : "10",
          text_visible: row.format == "text" ? true : false,
          photo_visible: row.format == "photo" ? true : false,
          image_height: row.format == "photo" ? 200 : 0,
          voice_visible: row.format == "voice" ? true : false,
          image: row.format == "photo" ? row.message : "",
          voice: row.format == "voice" ? row.voice : "" };

        Alloy.Globals.mocx.createCollection("chats", data_source);
      }
    };
    if (!found) {

      addRow(row, latest);
    }
  }

  var first_time_load = true;
  function render_conversation(latest, local) {
    if (latest && local != true) {
      if (sending) {
        sending = false;
        console.log("sending set false");
      }
    }
    if (latest) {
      console.log("latest so reverse");
      data.reverse();
    }
    for (var i = 0; i < data.length; i++) {
      if (data[i].status == 1 && !local) {
        Alloy.Globals.API.callByPost({ url: "sendASPPatientMessage", new: true, domain: "FREEJINI_DOMAIN", type: data[i].format, params: data[i] }, function (responseText) {
          var res = JSON.parse(responseText);
          Alloy.Globals.socket.sendMessage({ room_id: room_id, callback: function () {} });
          //Ti.App.fireEvent("sendMessage", {room_id: room_id});

        });
      }
      updateRow(data[i], latest);
    }
    var screenHeight = Ti.Platform.displayCaps.platformHeight;
    Alloy.Globals.mocx.createCollection("chats", data_source);
    /*if(latest){
                                                                                                                          	$.chatroom.scrollToIndex(0,  { animated: false});
                                                                                                                          	first_time_load = false;
                                                                                                                          }*/
    if (first_time_load) {
      console.log(data.length + " first time load to bottom");
      $.chatroom.scrollToIndex(data.length - 1, { animated: false });
      //setTimeout(function(){}, 1000);
      first_time_load = false;
    } else if (latest) {

      $.chatroom.scrollToIndex(data_source.length - 1, { animated: false });
      console.log("latest scroll to" + data_source.length - 1);
    } else if (data.length > 0) {
      console.log(data.length + " data.length+1");
      if (false) {
        $.chatroom.scrollToIndex(data.length, { animated: false, position: Titanium.UI.iOS.TableViewScrollPosition.TOP });
      } else {
        $.chatroom.scrollToIndex(data.length, { animated: false });
      }
      //setTimeout(function(){}, 0);
    }
  }


  var data_loading = false;
  function scrollChecker(e) {
    if (false) {
      var total = true ? pixelToDp(e.y) : e.contentOffset.y;
      var nearEnd = e.contentSize.height - $.chatroom.rect.height - 200;

      if (total <= 0 && !data_loading && !first_time_load) {
        data_loading = true;
        getPreviousData();
        setTimeout(function () {
          data_loading = false;
        }, 2000);
      }
    } else {
      var firstVisibleItemIndex = e.firstVisibleItem;
      var totalItems = e.totalItemCount;
      var visibleItemCount = e.visibleItemCount;
      //if ((firstVisibleItemIndex + visibleItemCount) >= (totalItems*0.75) && !data_loading && !first_time_load){
      if (firstVisibleItemIndex <= 0 && !data_loading && !first_time_load) {
        data_loading = true;
        getPreviousData();
        setTimeout(function () {
          data_loading = false;
        }, 2000);
      }
    }

  }

  function scrollChecker_bak(e) {
    if (false) {
      var total = true ? pixelToDp(e.y) : e.contentOffset.y;
      var nearEnd = e.contentSize.height - $.chatroom.rect.height - 200;

      if (total >= nearEnd && !data_loading) {
        data_loading = true;
        getPreviousData();
        setTimeout(function () {
          data_loading = false;
        }, 2000);
      }
    } else {
      var firstVisibleItemIndex = e.firstVisibleItem;
      var totalItems = e.totalItemCount;
      var visibleItemCount = e.visibleItemCount;
      if (firstVisibleItemIndex + visibleItemCount >= totalItems * 0.75 && !data_loading) {
        data_loading = true;
        getPreviousData();
        setTimeout(function () {
          data_loading = false;
        }, 2000);
      }
    }
  }

  function callHelpdesk() {
    Titanium.Platform.openURL('tel:6046091611');
  }

  function getConversationByRoomId(callback) {
    var url = "getMessageListForPatient";
    var checker_id = 19;
    var u_id = Ti.App.Properties.getString('u_id') || 0;
    Alloy.Globals.API.callByPost({ url: url, new: true, domain: "FREEJINI_DOMAIN", params: { u_id: u_id, room_id: room_id } }, function (responseText) {
      var model = Alloy.createCollection("chat");

      var res = JSON.parse(responseText);
      var arr = res.data || [];
      if (arr.length > 0) {
        model.saveArray(arr);
        var update_id = Alloy.Globals._.pluck(arr, "id");
      }
      room_status = res.room_status;
      callback && callback();
    });
  }

  function updateStatus(arr) {
    for (var i = 0; i < arr.length; i++) {
      var c = $.inner_area.getChildren();
      for (var b = 0; b < $.inner_area.children.length; b++) {

        if ($.inner_area.children[b].m_id == arr[i]) {
          var time = $.inner_area.children[b].children[0].children[2].text.split(" ");
          $.inner_area.children[b].children[0].children[2].text = time[0] + time[1] + time[2] + " Sent";
        }
      };
    };
  }

  /*
       	Refresh
       * */
  function refresh(callback, firsttime) {
    loading.start();
    getConversationByRoomId(function () {//API + saveArray
      callback({ firsttime: firsttime }); //render UI
      loading.finish();
      refreshing = false;
    });

  }

  function conversation_refresh(param) {
    console.log("conversation_refresh");

    var row = JSON.parse(param.msg);
    console.log(param);
    if (typeof row.room_id != "undefined" && row.room_id != room_id) {
      return;
    }
    sound.play();

    if (typeof row.room_status != "undefined" && row.room_status == 3) {
      args.status = row.room_status;
      $.bottom_bar.hide();
    }
    row.status = 3;
    Alloy.Globals._.extend(row, { u_id: u_id });
    data = [row];
    render_conversation(true, true);
  }

  var refreshing = false;
  var time_offset = Alloy.Globals.common.now();
  function refresh_latest(param) {
    room_id = param.room_id || room_id;

    if (!refreshing && time_offset <= Alloy.Globals.common.now() && socket_offline) {
      refreshing = true;
      refresh(getLatestData);
      time_offset = Alloy.Globals.common.now();
    }
  }

  function getPreviousData(param) {
    start = typeof start != "undefined" ? start : 0;
    var model = Alloy.createCollection("chat");
    data = model.getDataByRoomId(false, start, anchor, "", room_id);
    last_id = data.length > 0 ? Alloy.Globals._.first(data)['id'] : last_id;
    last_uid = data.length > 0 ? Alloy.Globals._.first(data)['sender_id'] : last_uid;
    render_conversation(false, false);
    start = start + 10;
  }

  function getLatestData(local) {
    var model = Alloy.createCollection("chat");
    data = model.getDataByRoomId(true, "", "", last_update, room_id);
    last_id = data.length > 0 ? Alloy.Globals._.first(data)['id'] : last_id;
    last_update = data.length > 0 ? Alloy.Globals._.first(data)['created'] : last_update;
    last_uid = data.length > 0 ? Alloy.Globals._.first(data)['sender_id'] : last_uid;
    render_conversation(true, local);
  }


  function switchIcon(e) {
    if (e.source.value != "") {
      $.enter_icon.right = 10;
    } else {
      $.enter_icon.right = -50;
    }
  }

  /**
       * Closes the Window
       */
  function closeWindow() {
    $.win.close();
  }

  function init() {
    if (false) {
      second_init();
    } else {
      $.win.setWindowSoftInputMode(Ti.UI.Android.SOFT_INPUT_ADJUST_PAN);
      if (Ti.Android.hasPermission("android.permission.RECORD_AUDIO")) {
        checkingInternalPermission();
      } else {
        setTimeout(function () {
          Ti.Android.requestPermissions("android.permission.RECORD_AUDIO", function (e) {
            if (e.success) {
              checkingInternalPermission();
            } else {
              Alloy.Globals.common.createAlert("Warning", "You don't have voice recorder permission!!!\nYou can go to setting enabled the permission.", function (e) {
                closeWindow();
              });
            }
          });
        }, 1000);
      }
    }
  }
  function checkingInternalPermission() {
    if (Titanium.Filesystem.hasStoragePermissions()) {
      second_init();
    } else {
      setTimeout(function () {
        Titanium.Filesystem.requestStoragePermissions(function (e) {
          if (e.success) {
            second_init();
          } else {
            Alloy.Globals.common.createAlert("Warning", "You don't have file storage permission!!!\nYou can go to setting enabled the permission.", function (e) {
              closeWindow();
            });
          }
        });
      }, 1000);
    }
  }
  function second_init() {
    var mic = voice_recorder.getView();
    $.action_btn.add(mic);
    $.win.add(loading.getView());
    if (!Titanium.Network.online) {
      Alloy.Globals.common.createAlert("Alert", "There is no internet connection.", closeWindow);
    }
    Alloy.Globals.socket.setRoom({ room_id: room_id });
    //Ti.App.fireEvent("setRoom", {room_id: room_id});
    updateTime({ online: true });
    Ti.App.Properties.setString('room_id', room_id);
    refresh(getPreviousData, true);
  }

  function updateTime(e) {
    var u_id = Ti.App.Properties.getString('u_id') || 0;
    //Ti.App.fireEvent("update_room_member_time", {last_update: Alloy.Globals.common.now(), u_id: u_id, room_id: room_id, online: e.online});
    Alloy.Globals.socket.update_room_member_time({ last_update: Alloy.Globals.common.now(), u_id: u_id, room_id: room_id, online: e.online });

  }

  function endSession() {
    var dialog = Ti.UI.createAlertDialog({
      cancel: 1,
      buttonNames: ['Confirm', 'Cancel'],
      message: 'Would you like to end the conversation?',
      title: 'End Session' });


    dialog.addEventListener('click', function (ex) {
      if (ex.index === ex.source.cancel) {
        console.log("cancel?");
      } else {
        closeRoom();
      }
    });

    dialog.show();
  }

  function closeRoom() {
    Alloy.Globals.API.callByPost({
      url: "closeRoom", new: true, domain: "FREEJINI_DOMAIN", params: { u_id: u_id, room_id: room_id } },
    function (responseText) {
      var res = JSON.parse(responseText);
      var new_arr = _.omit(res.data, "u_id");
      new_arr['room_status'] = "3";
      Alloy.Globals.socket.sendMessage({ room_id: room_id, msg: JSON.stringify(new_arr), callback: function () {
        } });
      closeWindow();
    });
  }

  function filepermittion()
  {
    if (true)
    {
      if (Ti.Filesystem.hasStoragePermissions()) return true;else
      {
        Ti.Filesystem.requestStoragePermissions(function (e) {
          if (e.success) {
            return true;
          } else
          {
            alert("You denied permission.");
            return false;
          }
        });
      }
    } else {
      if (Ti.Media.hasPhotoGalleryPermissions()) return true;else
      {
        Ti.Media.requestPhotoGalleryPermissions(function (e) {
          if (e.success) {
            return true;
          } else
          {
            alert("You denied permission.");
            return false;
          }
        });
      }
    }
  }

  function onPlayStopBtnClicked(e) {
    if (e.source.new) {
      try {
        if (false) {
          Ti.Media.audioSessionCategory = Ti.Media.AUDIO_SESSION_CATEGORY_SOLO_AMBIENT;
        }
        audioPlayer = Ti.Media.createAudioPlayer({
          url: e.source.voice,
          allowBackground: true });

        console.log(audioPlayer.volume + "sound volume");
        audioPlayer.volume = 1;
        audioPlayer.release();
        console.log(audioPlayer.volume + "sound volume new");
      } catch (e) {
        console.log(e.message);
      }
      e.source.image = "images/play_button.png";

      audioPlayer.addEventListener('change', function (ex) {
        console.log('State: ' + ex.description + ' (' + ex.state + ')');
        //updateTimeLabel();
        var image;
        if (ex.state == 7) {//7 = stopped
          image = "/images/play_button.png";
        } else if (ex.state == 5) {//7 = stopped
          //$.time.text = "";
          image = "/images/play_button.png";
        } else if (ex.state == 2) {
          //$.time.text = "Pause";
          image = "/images/play_button.png";
        } else if (ex.state == 3) {
          //$.time.text = "Playing...";
          image = "/images/pause_button.png";
        }
        e.source.image = image;
      });

      audioPlayer.addEventListener("complete", function (e) {
        e.source.image = "/images/play_button.png";
        audioPlayer.release();
        console.log("audio release");
        //$.time.text = "";
        Ti.Media.audioSessionCategory = Ti.Media.AUDIO_SESSION_CATEGORY_SOLO_AMBIENT;
      });
      e.source.new = false;
    }
    // If both are false, playback is stopped.
    console.log(audioPlayer.playing + " audioPlayer.playing");
    if (audioPlayer.playing) {
      audioPlayer.pause();
      //$.time.text = "Pause";
      Ti.Media.audioSessionCategory = Ti.Media.AUDIO_SESSION_CATEGORY_SOLO_AMBIENT;
      e.source.image = "/images/play_button.png";
    } else {
      try {
        audioPlayer.start();
      } catch (e) {
        console.log("see what error here");
        console.log(e);
      }
      //.time.text = "Playing...";
      Ti.Media.audioSessionCategory = Ti.Media.AUDIO_SESSION_CATEGORY_PLAYBACK;
      e.source.image = "/images/pause_button.png";
    }
    //updateTimeLabel();

  }

  function popCamera(e) {

    if (!filepermittion()) return;

    var dialog = Titanium.UI.createOptionDialog({
      title: 'Choose an image source...',
      options: ['Camera', 'Photo Gallery', 'Cancel'],
      cancel: 2 //index of cancel button
    });
    var pWidth = Ti.Platform.displayCaps.platformWidth;
    var pHeight = Ti.Platform.displayCaps.platformHeight;

    dialog.addEventListener('click', function (e) {

      if (e.index == 0) {//if first option was selected
        //then we are getting image from camera]
        if (Ti.Media.hasCameraPermissions()) {
          Titanium.Media.showCamera({
            success: photoSuccessCallback,
            cancel: function () {
              //do somehting if user cancels operation
            },
            error: function (error) {
              //error happend, create alert
              var a = Titanium.UI.createAlertDialog({ title: 'Camera' });
              //set message
              if (error.code == Titanium.Media.NO_CAMERA) {
                a.setMessage('Device does not have camera');
              } else {
                a.setMessage('Unexpected error: ' + error.code);
              }

              // show alert
              a.show();
            },
            allowImageEditing: true,
            mediaTypes: [Ti.Media.MEDIA_TYPE_PHOTO],
            saveToPhotoGallery: true });

        } else {
          Ti.Media.requestCameraPermissions(function (e) {

            if (e.success) {
              Titanium.Media.showCamera({
                success: photoSuccessCallback,
                cancel: function () {
                  //do somehting if user cancels operation
                },
                error: function (error) {
                  //error happend, create alert
                  var a = Titanium.UI.createAlertDialog({ title: 'Camera' });
                  //set message
                  if (error.code == Titanium.Media.NO_CAMERA) {
                    a.setMessage('Device does not have camera');
                  } else {
                    a.setMessage('Unexpected error: ' + error.code);
                  }

                  // show alert
                  a.show();
                },
                allowImageEditing: true,
                mediaTypes: [Ti.Media.MEDIA_TYPE_PHOTO],
                saveToPhotoGallery: true });

            } else
            {
              alert("You denied permission.");
            }
          });
        }
      } else if (e.index == 1) {

        if (true)
        {
          if (Ti.Filesystem.hasStoragePermissions()) {
            Titanium.Media.openPhotoGallery({

              success: photoSuccessCallback,
              cancel: function () {
                // called when user cancels taking a picture
              },
              error: function (error) {
                // called when there's an error
                var a = Titanium.UI.createAlertDialog({ title: 'Camera' });
                if (error.code == Titanium.Media.NO_CAMERA) {
                  a.setMessage('Please run this test on device');
                } else {
                  a.setMessage('Unexpected error: ' + error.code);
                }
                a.show();
              },
              // allowEditing and mediaTypes are iOS-only settings
              allowEditing: true,
              mediaTypes: [Ti.Media.MEDIA_TYPE_PHOTO] });

          } else {
            Ti.Filesystem.requestStoragePermissions(function (e) {

              if (e.success) {
                Titanium.Media.openPhotoGallery({

                  success: photoSuccessCallback,
                  cancel: function () {
                    // called when user cancels taking a picture
                  },
                  error: function (error) {
                    // called when there's an error
                    var a = Titanium.UI.createAlertDialog({ title: 'Camera' });
                    if (error.code == Titanium.Media.NO_CAMERA) {
                      a.setMessage('Please run this test on device');
                    } else {
                      a.setMessage('Unexpected error: ' + error.code);
                    }
                    a.show();
                  },
                  // allowEditing and mediaTypes are iOS-only settings
                  allowEditing: true,
                  mediaTypes: [Ti.Media.MEDIA_TYPE_PHOTO] });

              } else
              {
                alert("You denied permission.");
              }
            });
          }
        } else {
          if (Ti.Media.hasPhotoGalleryPermissions()) {
            Titanium.Media.openPhotoGallery({

              success: photoSuccessCallback,
              cancel: function () {
                // called when user cancels taking a picture
              },
              error: function (error) {
                // called when there's an error
                var a = Titanium.UI.createAlertDialog({ title: 'Camera' });
                if (error.code == Titanium.Media.NO_CAMERA) {
                  a.setMessage('Please run this test on device');
                } else {
                  a.setMessage('Unexpected error: ' + error.code);
                }
                a.show();
              },
              // allowEditing and mediaTypes are iOS-only settings
              allowEditing: true,
              mediaTypes: [Ti.Media.MEDIA_TYPE_PHOTO] });

          } else {
            Ti.Media.requestPhotoGalleryPermissions(function (e) {

              if (e.success) {
                Titanium.Media.openPhotoGallery({

                  success: photoSuccessCallback,
                  cancel: function () {
                    // called when user cancels taking a picture
                  },
                  error: function (error) {
                    // called when there's an error
                    var a = Titanium.UI.createAlertDialog({ title: 'Camera' });
                    if (error.code == Titanium.Media.NO_CAMERA) {
                      a.setMessage('Please run this test on device');
                    } else {
                      a.setMessage('Unexpected error: ' + error.code);
                    }
                    a.show();
                  },
                  // allowEditing and mediaTypes are iOS-only settings
                  allowEditing: true,
                  mediaTypes: [Ti.Media.MEDIA_TYPE_PHOTO] });

              } else
              {
                alert("You denied permission.");
              }
            });
          }
        }
      } else {

      }
    });

    //show dialog
    dialog.show();
  }

  function startTimer() {
    console.log("timer start");
  }

  function photoSuccessCallback(event) {
    var new_height = event.media.height <= event.media.width ? event.media.height * (1024 / event.media.width) : 1024;
    var new_width = event.media.width <= event.media.height ? event.media.width * (1024 / event.media.height) : 1024;
    var blob = event.media;
    blob = blob.imageAsResized(new_width, new_height);
    saveLocal({ message: event.media.nativePath, format: "photo", filedata: blob });
  }

  init();

  //Ti.App.addEventListener('socket:startTimer', startTimer);

  function doctor_last_update(e) {
    opposite_online = e.online;
    opposite_last_update = e.last_update;
    //updateReadStatus();
  }

  function resume() {
    updateTime({ online: true });
    socket_offline = true;
    Alloy.Globals.socket.connect();
    refresh_latest({});
  }

  function pause() {
    //updateTime({online:false});
  }

  function socket_dc() {
    socket_offline = true;
  }

  function socket_online() {
    socket_offline = false;
  }

  Ti.App.addEventListener("socket:refresh_chatroom", conversation_refresh);
  Ti.App.addEventListener("askDoctor/conversation:refresh", refresh_latest);
  Ti.App.addEventListener("resumed", resume);
  Ti.App.addEventListener("paused", pause);
  Ti.App.addEventListener("socket:user_last_update", updateReadStatus);
  Ti.App.addEventListener("socket:doctor_last_update", doctor_last_update);
  Ti.App.addEventListener("socket_dc", socket_dc);
  Ti.App.addEventListener("socket_online", socket_online);

  $.win.addEventListener("close", function () {
    Ti.App.Properties.setString('room_id', "");
    target_page = "";
    updateTime({ online: false });
    Alloy.Globals.socket.leave_room({ room_id: room_id });
    //Ti.App.fireEvent("leave_room", {room_id: room_id});
    Ti.App.fireEvent("render_menu");
    Ti.App.removeEventListener("socket:user_last_update", updateReadStatus);
    Ti.App.removeEventListener("socket:doctor_last_update", doctor_last_update);
    Ti.App.removeEventListener("askDoctor/conversation:refresh", refresh_latest);
    Ti.App.removeEventListener("resumed", resume);
    Ti.App.removeEventListener("paused", pause);
    //Ti.App.removeEventListener('socket:startTimer', startTimer);
    Ti.App.removeEventListener("socket:refresh_chatroom", conversation_refresh);
    Ti.App.removeEventListener("socket_dc", socket_dc);
    Ti.App.removeEventListener("socket_online", socket_online);
    $.destroy();

  });

  // Generated code that must be executed after all UI and
  // controller code. One example deferred event handlers whose
  // functions are not defined until after the controller code
  // is executed.
  if (true) {
    __defers['$.__views["btnBack"]!click!closeWindow'] && $.addListener($.__views["btnBack"], 'click', closeWindow);}
  __defers['__alloyId119!click!imageZoom'] && $.addListener(__alloyId119, 'click', imageZoom);__defers['__alloyId122!click!onPlayStopBtnClicked'] && $.addListener(__alloyId122, 'click', onPlayStopBtnClicked);__defers['$.__views["chatroom"]!click!blurKeyboard'] && $.addListener($.__views["chatroom"], 'click', blurKeyboard);__defers['$.__views["chatroom"]!scroll!scrollChecker'] && $.addListener($.__views["chatroom"], 'scroll', scrollChecker);__defers['$.__views["__alloyId126"]!click!endSession'] && $.addListener($.__views["__alloyId126"], 'click', endSession);__defers['$.__views["__alloyId127"]!click!popCamera'] && $.addListener($.__views["__alloyId127"], 'click', popCamera);__defers['$.__views["message_bar"]!change!switchIcon'] && $.addListener($.__views["message_bar"], 'change', switchIcon);__defers['$.__views["enter_icon"]!click!SendMessage'] && $.addListener($.__views["enter_icon"], 'click', SendMessage);

  // Extend the $ instance with all functions and properties
  // defined on the exports object.
  _.extend($, exports);
}

module.exports = Controller;
//# sourceMappingURL=file:///Users/yikonnlau/Documents/Appcelerator_Studio_Workspace/plux/build/map/Resources/android/alloy/controllers/askDoctor/conversation.js.map