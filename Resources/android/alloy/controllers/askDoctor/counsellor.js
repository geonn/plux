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
  this.__controllerPath = 'askDoctor/counsellor';
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
  { backgroundColor: "#535a74", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, title: "Ask Counsellor", id: "win", backButtonTitle: "", navTintColor: "#CE1D1C" });

  $.__views["win"] && $.addTopLevelView($.__views["win"]);
  $.__views["__alloyId79"] = Ti.UI.createScrollView(
  { width: Ti.UI.FILL, height: Ti.UI.FILL, contentHeight: Ti.UI.SIZE, contentWidth: Ti.UI.FILL, id: "__alloyId79" });

  $.__views["win"].add($.__views["__alloyId79"]);
  $.__views["__alloyId80"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.FILL, top: 0, id: "__alloyId80" });

  $.__views["__alloyId79"].add($.__views["__alloyId80"]);
  if (true) {
    $.__views["__alloyId81"] = Ti.UI.createView(
    { borderWidth: 0, layout: "horizontal", width: Ti.UI.FILL, height: 50, backgroundColor: "#DEDEDE", id: "__alloyId81" });

    $.__views["__alloyId80"].add($.__views["__alloyId81"]);
    $.__views["__alloyId82"] = Ti.UI.createView(
    { borderWidth: 0, left: 0, width: "20%", id: "__alloyId82" });

    $.__views["__alloyId81"].add($.__views["__alloyId82"]);
    $.__views["btnBack"] = Ti.UI.createImageView(
    { left: 10, id: "btnBack", width: 25, height: 25, image: "/images/btn-back.png" });

    $.__views["__alloyId82"].add($.__views["btnBack"]);
    closeWindow ? $.addListener($.__views["btnBack"], 'click', closeWindow) : __defers['$.__views["btnBack"]!click!closeWindow'] = true;$.__views["__alloyId83"] = Ti.UI.createView(
    { borderWidth: 0, width: "60%", id: "__alloyId83" });

    $.__views["__alloyId81"].add($.__views["__alloyId83"]);
    $.__views["pageTitle"] = Ti.UI.createLabel(
    { width: Titanium.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial", fontSize: "16dp" }, text: 'Ask Counsellor', id: "pageTitle", textAlign: "center" });

    $.__views["__alloyId83"].add($.__views["pageTitle"]);
  }
  $.__views["__alloyId84"] = Ti.UI.createView(
  { borderWidth: 0, width: Ti.UI.FILL, height: Ti.UI.FILL, id: "__alloyId84" });

  $.__views["__alloyId80"].add($.__views["__alloyId84"]);
  $.__views["chatroom"] = Ti.UI.createScrollView(
  { width: Ti.UI.FILL, height: Ti.UI.FILL, id: "chatroom", backgroundColor: "#f5f5f5", top: 0, bottom: 90, contentHeight: Ti.UI.SIZE, contentWidth: Ti.UI.FILL, transform: Ti.UI.create2DMatrix().rotate(180) });

  $.__views["__alloyId84"].add($.__views["chatroom"]);
  scrollChecker ? $.addListener($.__views["chatroom"], 'scroll', scrollChecker) : __defers['$.__views["chatroom"]!scroll!scrollChecker'] = true;$.__views["inner_area"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.SIZE, id: "inner_area", bottom: 20 });

  $.__views["chatroom"].add($.__views["inner_area"]);
  $.__views["__alloyId85"] = Ti.UI.createButton(
  { borderRadius: 5, backgroundColor: "#00c8a9", height: 40, color: "#ffffff", width: Ti.UI.FILL, title: 'End Session', bottom: 50, id: "__alloyId85" });

  $.__views["__alloyId79"].add($.__views["__alloyId85"]);
  endSession ? $.addListener($.__views["__alloyId85"], 'click', endSession) : __defers['$.__views["__alloyId85"]!click!endSession'] = true;$.__views["bottom_bar"] = Ti.UI.createView(
  { borderWidth: 0, width: Ti.UI.FILL, height: 50, backgroundColor: "white", bottom: 0, id: "bottom_bar" });

  $.__views["__alloyId79"].add($.__views["bottom_bar"]);
  $.__views["__alloyId86"] = Ti.UI.createImageView(
  { image: "/images/icons/icon_photo_camera.png", bottom: 10, zIndex: 3, left: 10, height: 30, width: 30, id: "__alloyId86" });

  $.__views["bottom_bar"].add($.__views["__alloyId86"]);
  popCamera ? $.addListener($.__views["__alloyId86"], 'click', popCamera) : __defers['$.__views["__alloyId86"]!click!popCamera'] = true;$.__views["message_bar"] = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: "fontSize: 40", color: "#000000", hintTextColor: "#000000", backgroundColor: "#ffffff", top: 4, left: 50, right: 50, bottom: 4, id: "message_bar", hintText: "Type a message..." });

  $.__views["bottom_bar"].add($.__views["message_bar"]);
  switchIcon ? $.addListener($.__views["message_bar"], 'change', switchIcon) : __defers['$.__views["message_bar"]!change!switchIcon'] = true;$.__views["action_btn"] = Ti.UI.createView(
  { borderWidth: 0, width: Ti.UI.SIZE, height: Ti.UI.SIZE, id: "action_btn", right: 0 });

  $.__views["bottom_bar"].add($.__views["action_btn"]);
  $.__views["enter_icon"] = Ti.UI.createImageView(
  { id: "enter_icon", backgroundColor: "#ffffff", image: "/images/icons/icon_enter.png", top: 10, bottom: 10, zIndex: 3, right: -50, height: 30, width: 30 });

  $.__views["action_btn"].add($.__views["enter_icon"]);
  SendMessage ? $.addListener($.__views["enter_icon"], 'click', SendMessage) : __defers['$.__views["enter_icon"]!click!SendMessage'] = true;exports.destroy = function () {};

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
  var dr_id;
  var last_id = 0;
  var last_uid;
  var status_text = ["", "Sending", "Sent", "Read"];
  var room_status;
  var room_id = args.room_id || 0;
  var voice_recorder = Alloy.createWidget('geonn.voicerecorder', { record_callback: saveLocal, room_id: room_id });
  var user_read_status, doctor_read_status;
  var opposite_online = "false";
  var opposite_last_update;

  target_page = "askDoctor/conversation";
  Ti.App.Properties.setString('room_id', room_id);

  function pixelToDp(px) {
    return parseInt(px) / (Titanium.Platform.displayCaps.dpi / 160);
  }

  function saveLocal(param) {
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
      "dr_id": dr_id,
      "format": param.format,
      "status": 1,
      "sender_name": Ti.App.Properties.getString('fullname') || "" };

    var id = model.saveArray([local_save]);
    var api_param = { u_id: u_id, dr_id: dr_id, message: param.message, is_endUser: 1, id: app_id, room_id: room_id };
    if (param.format == "voice" || param.format == "photo") {
      loading.start();
      _.extend(api_param, { media: param.format, Filedata: param.filedata });
    }
    data = [{
      "u_id": u_id,
      "id": app_id,
      "sender_id": u_id,
      "message": param.message || param.filedata,
      "created": Alloy.Globals.common.now(),
      "is_endUser": 1,
      "dr_id": dr_id,
      "room_id": room_id,
      "format": param.format,
      "status": 1,
      "sender_name": Ti.App.Properties.getString('fullname') || "" }];

    render_conversation(true, true);
    Alloy.Globals.API.callByPost({ url: "sendASPPatientMessage", new: true, domain: "FREEJINI_DOMAIN", type: param.format, params: api_param }, function (responseText) {

      var res = JSON.parse(responseText);
      $.message_bar.value = "";
      $.message_bar.editable = true;
      $.message_bar.blur();
      loading.finish();
      Alloy.Globals.socket.sendMessage({ room_id: room_id });
      Alloy.Globals.socket.refresh_patient_list();
      $.enter_icon.right = -50;
    });
  }

  /**
       * Send message
       */
  var interval;
  var sending = false;
  function SendMessage() {
    if (sending || $.message_bar.value == "") {
      return;
    }
    loading.start();
    sending = true;
    $.message_bar.editable = false;
    //startTimer();
    saveLocal({ message: $.message_bar.value, format: "text" });
  }

  function navToWebview(e) {
    var url = Alloy.Globals.common.parent({ name: "url" }, e.source);
    var win = Alloy.createController("webview", { url: url }).getView();
    win.open();
  }

  function addRow(row, latest) {
    var view_container = $.UI.create("View", {
      classes: ['hsize', 'wfill'],
      id: row.id,
      message: row.message,
      status: row.status,
      is_endUser: row.is_endUser,
      created: row.created });


    if (row.sender_id) {
      var view_text_container = $.UI.create("View", {
        classes: ['hsize', 'vert', 'rounded'],
        top: 10,
        width: "75%",
        transform: Ti.UI.create2DMatrix().rotate(180),
        url: row.message });

      var label_name = $.UI.create("label", {
        classes: ['h6', 'wfill', 'hsize', 'bold'],
        top: 5,
        left: 60,
        bottom: 15,
        color: "#7F7F7F",
        text: row.sender_name });


      var ss = row.message || "";
      var newText = row.format != "photo" ? ss.replace("[br]", "\r\n") : row.message;
      var text_color = row.format == "link" ? "blue" : "#606060";
      newText = row.format == "link" ? newText : newText;

      var label_message = $.UI.create("Label", {
        classes: ['h5', 'wfill', 'hsize', 'padding'],
        color: text_color,
        text: newText });

      var row_status = row.status;
      if (row.is_endUser) {
        var last_update_by_room = Alloy.Globals.socket.getLastUpdateByRoom(room_id);
        if (last_update_by_room && last_update_by_room.last_update > row.created) {
          row_status = 3;
        }
      }
      var label_time = $.UI.create("Label", {
        classes: ['h7', 'wsize', 'hsize'],
        bottom: 0,
        left: 60,
        //text: timeFormat(row.created)+" "+status_text[row_status],
        text: !row.is_endUser ? timeFormat(row.created) : timeFormat(row.created) + " " + status_text[row_status],
        textAlign: "right" });

      var view_photo_name = $.UI.create("View", { classes: ['wfill', 'hsize'] });
      if (row.dr_img_path != "" && row.dr_img_path != null) {
        var dr_img = $.UI.create("ImageView", { image: row.dr_img_path, width: 50, height: 50, left: 5, top: 5, params: { dr_specialty: row.dr_specialty, dr_qualification: row.dr_qualification, dr_introduction: row.dr_introduction, dr_img_path: row.dr_img_path } });
        view_photo_name.add(dr_img);
        view_photo_name.addEventListener("click", navToDoctorDetail);
      }
      var view_hr = $.UI.create("View", { classes: ['hr'], backgroundColor: "#ccc", top: 10, left: 15, right: 15 });
      view_photo_name.add(label_name);
      view_text_container.add(view_photo_name);
      view_text_container.add(view_hr);
      if (row.format == "link") {
        var label_message2 = $.UI.create("Label", {
          classes: ['h5', 'wfill', 'hsize', 'small_padding'],
          top: 0,
          left: 15,
          text: "Thanks you for contacting our call centre. \nWe would love to hear your thoughts or feedback on how we can improve your experience!\nClick below to start the survey:" });


        view_text_container.add(label_message2);
        view_text_container.add(label_message);
      } else if (row.format == "voice") {
        var player = Alloy.createWidget('dk.napp.audioplayer', { win: $.win, room_id: room_id, playIcon: "\uf144", pauseIcon: "\uf28c", color: row.is_endUser ? "#fff" : "#000" });

        player.setUrl(newText);
        //download_video(player, newText);
        var view = $.UI.create("View", { classes: ['wfill', 'hsize', 'padding'] });
        view.add(player.getView());
        //view_text_container.add(label_name);
        view_text_container.add(view);
      } else if (row.format == "photo") {
        var view = $.UI.create("View", { classes: ['wfill', 'hsize', 'padding'], backgroundColor: "black", height: 200 });
        var image_photo = $.UI.create("ImageView", { image: newText, classes: ['hsize', 'wfill'] });
        view.add(image_photo);
        // view_text_container.add(label_name);
        view_text_container.add(view);
        image_photo.addEventListener("click", imageZoom);
      } else {
        //view_text_container.add(label_name);
        view_text_container.add(label_message);
      }

      view_photo_name.add(label_time);
      if (row.is_endUser) {
        view_text_container.setBackgroundColor("#22262f");
        label_name.color = "#fff";
        label_message.color = "#fff";
        label_time.color = "#fff";
        view_text_container.setLeft(10);
        label_name.left = 10;
        label_time.left = 10;

        //view_container.add(imageview_thumb_path);
      } else {

        view_text_container.borderWidth = 1;
        view_text_container.borderColor = "#e9e9e9";
        view_text_container.setBackgroundColor("#ffffff");
        view_text_container.right = 10;
        /*
                                                                        if(typeof args.dr_id != "undefined"){
                                                                        			view_text_container.setRight(60);
                                                                        }else{
                                                                        	view_text_container.setRight(10);
                                                                        }*/


      }
      if (row.format == "link") {
        label_message.addEventListener("click", navToWebview);
      }

    } else {
      var view_text_container = $.UI.create("View", {
        transform: Ti.UI.create2DMatrix().rotate(180),
        classes: ['wsize', 'hsize', 'box', 'rounded'],
        top: 10,
        backgroundColor: "#3ddaf6" });


      var label_system_msg = $.UI.create("Label", {
        classes: ['wsize', 'hsize', 'padding', 'h6'],
        text: row.message });

      view_text_container.add(label_system_msg);
      $.bottom_bar.hide();
    }
    view_container.add(view_text_container);
    view_container.addEventListener("longpress", function (e) {
      /*var id = this.id;
                                                                                                                        //var message_box = Alloy.Globals.common.parent({name: "m_id", value: m_id}, e.source);
                                                                                                                        var dialog = Ti.UI.createAlertDialog({
                                                                                                                            cancel: 1,
                                                                                                                            buttonNames: ['Confirm', 'Cancel'],
                                                                                                                            message: 'Would you like to delete the message?',
                                                                                                                            title: 'Delete'
                                                                                                                          });
                                                                                                                          dialog.addEventListener('click', function(ex){
                                                                                                                         if (ex.index === ex.source.cancel){
                                                                                                                        	 }else if(ex.index == 0){
                                                                                                                        	 	var model = Alloy.createCollection("chat");
                                                                                                                        	//model.removeById(m_id);
                                                                                                                         	//$.inner_area.remove(message_box);
                                                                                                                         }
                                                                                                                        });
                                                                                                                        dialog.show();*/



    });
    if (latest) {
      $.inner_area.insertAt({ view: view_container, position: 0 });
    } else {
      $.inner_area.add(view_container);
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
        inner_area[i].children[0].children[0].children[inner_area[i].children[0].children[0].children.length - 1].text = timeFormat(inner_area[i].created) + " " + status_text[3];
      } /*else if(!inner_area[i].is_endUser && typeof inner_area[i].children[0].children[inner_area[i].children[0].children.length - 1] != "undefined" && user_read_status > inner_area[i].created){
           inner_area[i].children[0].children[0].children[inner_area[i].children[0].children[0].children.length - 1].text = timeFormat(inner_area[i].created)+" "+status_text[3];
        }*/
    }
  }

  function updateRow(row, latest) {
    var found = false;
    var inner_area = $.inner_area.getChildren();
    for (var i = 0; i < inner_area.length; i++) {
      if (inner_area[i].id == row.id) {
        found = true;
      }
      if (inner_area[i].children[0].children.length > 1 && inner_area[i].status == 1) {
        inner_area[i].status = opposite_online == "true" ? 3 : row.status;
        inner_area[i].children[0].children[0].children[inner_area[i].children[0].children[0].children.length - 1].text = timeFormat(row.created) + " " + status_text[opposite_online == "true" ? 3 : row.status];
      }
    };
    if (!found) {
      addRow(row, latest);
    }
  }

  function render_conversation(latest, local) {
    if (latest && local != true) {
      if (sending) {
        sending = false;
      } else {
        clearInterval(interval);
        //$.call.hide();
      }
      //$.chatroom.setContentOffset({y: 100});
    }
    var contain_height = 50;
    if (latest) {
      data.reverse();
    }
    for (var i = 0; i < data.length; i++) {
      if (data[i].status == 1 && !local) {
        Alloy.Globals.API.callByPost({ url: "sendASPPatientMessage", new: true, domain: "FREEJINI_DOMAIN", type: data[i].format, params: data[i] }, function (responseText) {
          var res = JSON.parse(responseText);
          Alloy.Globals.socket.sendMessage({ room_id: room_id });
        });
      }
      updateRow(data[i], latest);
    }
  }


  var data_loading = false;
  function scrollChecker(e) {
    var total = true ? pixelToDp(e.y) : e.y;
    var nearEnd = $.inner_area.rect.height - $.chatroom.rect.height - 200;
    if (total >= nearEnd && !data_loading) {
      data_loading = true;
      getPreviousData({});
      setTimeout(function () {
        data_loading = false;
      }, 200);
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
        var update_id = _.pluck(arr, "id");
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

  $.chatroom.addEventListener("scroll", function (e) {
    var theEnd = $.inner_area.rect.height;
    var total = true ? pixelToDp(e.y) + e.source.rect.height : e.y + e.source.rect.height;
    var nearEnd = theEnd * 0.1;
  });

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
  var refreshing = false;
  var time_offset = Alloy.Globals.common.now();
  function refresh_latest(param) {
    room_id = param.room_id || room_id;

    if (!refreshing && time_offset <= Alloy.Globals.common.now()) {
      refreshing = true;
      refresh(getLatestData);
      time_offset = Alloy.Globals.common.now();
    }
  }

  function getPreviousData(param) {
    start = typeof start != "undefined" ? start : 0;
    var model = Alloy.createCollection("chat");
    data = model.getDataByRoomId(false, start, anchor, "", room_id);
    last_id = data.length > 0 ? _.first(data)['id'] : last_id;
    last_uid = data.length > 0 ? _.first(data)['sender_id'] : last_uid;
    render_conversation(false, false);
    start = start + 10;
  }

  function getLatestData(local) {
    var model = Alloy.createCollection("chat");
    data = model.getDataByRoomId(true, "", "", last_update, room_id);
    last_id = data.length > 0 ? _.first(data)['id'] : last_id;
    last_update = data.length > 0 ? _.first(data)['created'] : last_update;
    last_uid = data.length > 0 ? _.first(data)['sender_id'] : last_uid;
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

      } else {
        closeRoom();
      }
    });

    dialog.show();
  }

  function closeRoom() {
    var dr_id = Ti.App.Properties.getString('dr_id') || 0;
    Alloy.Globals.API.callByPost({
      url: "closeRoom", new: true, domain: "FREEJINI_DOMAIN", params: { u_id: u_id, room_id: room_id } },
    function (responseText) {
      Alloy.Globals.socket.sendMessage({ room_id: room_id });
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
  Ti.App.addEventListener("socket:refresh_chatroom", refresh_latest);
  Ti.App.addEventListener("askDoctor/conversation:refresh", refresh_latest);
  //Ti.App.addEventListener('socket:startTimer', startTimer);

  function doctor_last_update(e) {
    opposite_online = e.online;
    opposite_last_update = e.last_update;
    updateReadStatus();
  }

  function resume() {
    updateTime({ online: true });
    refresh_latest({});
  }

  function pause() {
    updateTime({ online: false });
  }

  Ti.App.addEventListener("resumed", resume);
  Ti.App.addEventListener("paused", pause);
  Ti.App.addEventListener("socket:user_last_update", updateReadStatus);
  Ti.App.addEventListener("socket:doctor_last_update", doctor_last_update);

  $.win.addEventListener("close", function () {
    Ti.App.Properties.setString('room_id', "");
    target_page = "";
    updateTime({ online: false });
    Alloy.Globals.socket.leave_room({ room_id: room_id });
    Ti.App.fireEvent("render_menu");
    Ti.App.removeEventListener("socket:user_last_update", updateReadStatus);
    Ti.App.removeEventListener("socket:doctor_last_update", doctor_last_update);
    Ti.App.removeEventListener("askDoctor/conversation:refresh", refresh_latest);
    Ti.App.removeEventListener("resumed", resume);
    Ti.App.removeEventListener("paused", pause);
    //Ti.App.removeEventListener('socket:startTimer', startTimer);
    Ti.App.removeEventListener("socket:refresh_chatroom", refresh_latest);
    $.destroy();

  });

  // Generated code that must be executed after all UI and
  // controller code. One example deferred event handlers whose
  // functions are not defined until after the controller code
  // is executed.
  if (true) {
    __defers['$.__views["btnBack"]!click!closeWindow'] && $.addListener($.__views["btnBack"], 'click', closeWindow);}
  __defers['$.__views["chatroom"]!scroll!scrollChecker'] && $.addListener($.__views["chatroom"], 'scroll', scrollChecker);__defers['$.__views["__alloyId85"]!click!endSession'] && $.addListener($.__views["__alloyId85"], 'click', endSession);__defers['$.__views["__alloyId86"]!click!popCamera'] && $.addListener($.__views["__alloyId86"], 'click', popCamera);__defers['$.__views["message_bar"]!change!switchIcon'] && $.addListener($.__views["message_bar"], 'change', switchIcon);__defers['$.__views["enter_icon"]!click!SendMessage'] && $.addListener($.__views["enter_icon"], 'click', SendMessage);

  // Extend the $ instance with all functions and properties
  // defined on the exports object.
  _.extend($, exports);
}

module.exports = Controller;
//# sourceMappingURL=file:///Users/yikonnlau/Documents/Appcelerator_Studio_Workspace/plux/build/map/Resources/android/alloy/controllers/askDoctor/counsellor.js.map