var args = arguments[0] || {};
var dr_id = args.dr_id || -1;
var loading = Alloy.createController("loading");
var anchor = Alloy.Globals.common.now();
var last_update = Alloy.Globals.common.now();
var start = 0;
var room_set = false;
var refreshIntervalId;
var retry = 0;
var u_id = Ti.App.Properties.getString('u_id') || 0;
var last_id = 0;
var last_uid;
var status_text = ["", "Sending", "Sent", "Read"];
var room_id = 0;
var voice_recorder = Alloy.createWidget('geonn.voicerecorder', {record_callback: saveLocal});
var user_read_status, doctor_read_status;
var data_source = [];
console.log(_);
$.call.hide();

function timeFormat(datetime){
	var timeStamp = datetime.split(" ");
	var newFormat;
	var ampm = "am";
	var date = timeStamp[0].split("-");
	if(timeStamp.length == 1){
		newFormat = date[2]+"/"+date[1]+"/"+date[0] ;
	}else{
		var time = timeStamp[1].split(":");
		if(time[0] >= 12){
			ampm = "pm";
			if(time[0]<= 12){
				time[0] = time[0];
			}else{
				time[0] = time[0] - 12;
			}
		}

		newFormat = date[2]+"/"+date[1]+"/"+date[0] + " "+ time[0]+":"+time[1]+ " "+ ampm;
	}

	return newFormat;
}

function pixelToDp(px) {
    return ( parseInt(px) / (Titanium.Platform.displayCaps.dpi / 160));
}

target_page = "conversation";
Ti.App.Properties.setString('room_id', room_id);
function saveLocal(param){
	var model = Alloy.createCollection("chat");
	var app_id = Math.random().toString(36).substr(2, 10);
	var local_save = {
		"u_id": u_id,
		"id": app_id,
	    "sender_id": u_id,
	    "message": param.message,
	    "created": Alloy.Globals.common.now(),
	    "is_endUser": 1,
	    "dr_id": dr_id,
	    "format": param.format,
	    "status": 1,
	    "sender_name": Ti.App.Properties.getString('fullname') || ""
	};
	var id = model.saveArray([local_save]);
	var api_param = {u_id: u_id, dr_id: dr_id, message: param.message, is_endUser:1, id: app_id };
	if(param.format == "voice" || param.format == "photo"){
		_.extend(api_param, {media: param.format, Filedata: param.filedata});
	}
	data = [{
        "u_id": u_id,
        "id": app_id,
        "sender_id": u_id,
        "message": param.message || param.filedata,
        "created": Alloy.Globals.common.now(),
        "is_endUser": 1,
        "dr_id": dr_id,
        "format": param.format,
        "status": 1,
        "sender_name": Ti.App.Properties.getString('fullname') || ""
    }];
    render_conversation(true, true);
	Alloy.Globals.API.callByPost({url: "sendMessage", type: param.format, params:api_param}, function(responseText){

		var res = JSON.parse(responseText);
		$.message_bar.value = "";
		$.message_bar.editable = true;
		$.message_bar.blur();
		loading.finish();
		Alloy.Globals.socket.sendMessage({room_id: room_id});
		//Ti.App.fireEvent("sendMessage", {room_id: room_id});
	   	//Ti.App.fireEvent("helpdesk_refresh_patient_list");
		Alloy.Globals.socket.helpdesk_refresh_patient_list({});
	});
}

/**
 * Send message
 */
var interval;
var sending = false;
function SendMessage(){
	if(sending || $.message_bar.value == "")
		return;
	loading.start();
	sending = true;
	$.message_bar.editable = false;
	startTimer();
	saveLocal({message: $.message_bar.value,format:"text"});
}

function startTimer(){
    if(dr_id){
        return;
    }
    interval = setTimeout(function(){
        $.call.show();
        if(OS_ANDROID){
            $.call.top = 50;
        }else{
            $.call.top = 0;
        }
    }, 10000);
}

function navToWebview(e){
	var url = e.source.url;
	var win = Alloy.createController("webview", {url: url}).getView();
	win.open();
}

function addRow(row, latest){
	var link_message = (row.format == "link")?row.preview_message:"";
	var arr = {
    id: row.id,
		sender_name: row.sender_name,
   	created: (row.is_endUser)?timeFormat(row.created):timeFormat(row.created)+" "+status_text[(doctor_read_status > row.created)?3:row.status],
   	text_color: (!row.is_endUser)?"#606060":"#ffffff",
		link: row.message,
		sender_name_color: (!row.is_endUser)?"#000000":"#ffffff",
   	newText: (row.format == "text")?row.message.replace("[br]", "\r\n"):(row.format == "link")?link_message:row.message,
   	bgColor: (!row.is_endUser)?"#ffffff":"#22262f",
   	setLeft: (!row.is_endUser)?10:null,
   	setRight: (!row.is_endUser)?null:"10",
    text_visible: (row.format == "text" || row.format == "link")?true:false,
		link_visible: (row.format == "link")?true:false,
		link_height: (row.format == "link")?Ti.UI.SIZE:0,
    photo_visible: (row.format == "photo")?true:false,
    voice_visible: (row.format == "voice")?true:false,
    image_height: (row.format == "photo")?200:0,
    image: (row.format == "photo")?row.message:"",
    voice: (row.format == "voice")?row.message:"",
	};
	console.log(arr);
  if(!latest){
    data_source.unshift(arr);
  }else{
    data_source.push(arr);
  }
}

function addRow_bak(row, latest){
	var view_container = $.UI.create("View",{
		classes: ['hsize','wfill'],
		id: row.id,
		message: row.message,
		status: row.status,
		is_endUser: row.is_endUser,
        created: row.created
	});

	if(row.sender_id){
		var view_text_container = $.UI.create("View", {
			classes:  ['hsize', 'vert', 'rounded'],
			top: 5,
			width: "75%",
			transform: Ti.UI.create2DMatrix().rotate(180),
			url: row.message
		});
		var label_name = $.UI.create("label",{
			classes: ['h6','wfill', 'hsize', 'bold', 'small_padding'],
			left:15,
			color: "#7F7F7F",
			text: row.sender_name
		});

		var ss = row.message;
		var newText = (row.format != "photo")?ss.replace("[br]", "\r\n"):row.message;
		var text_color = (row.format == "link")?"blue":"#606060";
		newText = (row.format == "link")?newText:newText;

		var label_message = $.UI.create("Label", {
			classes:['h5', 'wfill', 'hsize','small_padding'],
			top: 0,
			left:15,
			color: text_color,
			text: newText
		});
		var row_status = row.status;
        if(row.is_endUser && doctor_read_status > row.created){
            row_status = 3;
        }else if(!row.is_endUser && user_read_status > row.created ){
            row_status = 3;
        }
		var label_time = $.UI.create("Label", {
			classes:['h7', 'wfill', 'hsize','small_padding'],
			top:0,

			right:15,
			text: timeFormat(row.created)+" "+status_text[row_status],
			textAlign: "right"
		});

		if (row.format == "link"){
			var label_message2 = $.UI.create("Label", {
				classes:['h5', 'wfill', 'hsize','small_padding'],
				top: 0,
				left:15,
				text: "Thanks you for contacting our call centre. \nWe would love to hear your thoughts or feedback on how we can improve your experience!\nClick below to start the survey:"
			});
			view_text_container.add(label_name);
			view_text_container.add(label_message2);
			view_text_container.add(label_message);
		}else if(row.format == "voice"){
			return;
			var player = Alloy.createWidget('dk.napp.audioplayer', {playIcon: "\uf144", pauseIcon: "\uf28c"});

			player.setUrl(newText);
			//download_video(player, newText);
			var view = $.UI.create("View", {classes:['wfill','hsize','padding']});
			view.add(player.getView());
			view_text_container.add(label_name);
			view_text_container.add(view);
		}else if(row.format == "photo" ){
            var view = $.UI.create("View", {classes:['wfill','hsize','padding'], backgroundColor:"black", height: 200});
            var image_photo = $.UI.create("ImageView", {image: newText, classes:['hsize','wfill']});
            view.add(image_photo);
            view_text_container.add(label_name);
            view_text_container.add(view);
            image_photo.addEventListener("click", imageZoom);
        }else{
			view_text_container.add(label_name);
			view_text_container.add(label_message);
		}

		view_text_container.add(label_time);
		if(row.is_endUser){
			view_text_container.setBackgroundColor("#22262f");
			label_name.color = "#fff";
			label_message.color = "#fff";
			label_time.color = "#fff";
			view_text_container.setLeft(10);

			//view_container.add(imageview_thumb_path);
		}else{

		    view_text_container.borderWidth = 1;
		    view_text_container.borderColor = "#e9e9e9";
			view_text_container.setBackgroundColor("#ffffff");
			view_text_container.right = 10;
			//
		}
		if(row.format == "link"){
			label_message.addEventListener("click", navToWebview);
		}

	}else{
		var view_text_container = $.UI.create("View", {
			transform: Ti.UI.create2DMatrix().rotate(180),
			classes: ['wsize','hsize','box','rounded'],
			top: 5,
			backgroundColor: "#3ddaf6"
		});

		var label_system_msg = $.UI.create("Label",{
			classes: ['wsize', 'hsize','padding','h6'],
			text: row.message
		});
		view_text_container.add(label_system_msg);
	}
	view_container.add(view_text_container);
	view_container.addEventListener("longpress", function(e){
		var m_id = Alloy.Globals.common.parent({name: "m_id"}, e.source);
		var message_box = Alloy.Globals.common.parent({name: "m_id", value: m_id}, e.source);
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
			model.removeById(m_id);
		 	$.inner_area.remove(message_box);
		 }
		});
		dialog.show();
	});
	if(latest){
		$.inner_area.insertAt({view: view_container, position: 0});
	}else{
		$.inner_area.add(view_container);
	}
}

function imageZoom(e){
    if(typeof e.source.image == "object"){
        return;
    }
    var path = (typeof e.source.image == "object")?e.source.image.nativePath:e.source.image;
    var html = "<img width='100%' height='auto' src='"+path+"'/>";
    if(OS_IOS){
        Alloy.Globals.nav.navigationWindow("webview","","", {url: path, title: ""});
        //var webview = $.UI.create("WebView", {backgroundColor: "#000",  zIndex: 12, classes:['wfill','hsize'], url: e.source.record.attachment});
    }else{
        Alloy.Globals.nav.navigationWindow("webview","","", {content: html, title: ""});
        //var webview = $.UI.create("WebView", {backgroundColor: "#000",  zIndex: 12, classes:['wfill','hsize'], html: html});
    }
}

function updateReadStatus(){
    var inner_area = $.inner_area.getChildren();
    for (var i=0; i < inner_area.length; i++) {
        if(inner_area[i].children[0].children.length <= 1){

        }else if(inner_area[i].is_endUser && typeof inner_area[i].children[0].children[inner_area[i].children[0].children.length - 1] != "undefined" && doctor_read_status > inner_area[i].created ){

           // inner_area[i].children[0].children[inner_area[i].children[0].children.length - 1].text = timeFormat(inner_area[i].created)+" "+status_text[3];
        }else if(!inner_area[i].is_endUser && typeof inner_area[i].children[0].children[inner_area[i].children[0].children.length - 1] != "undefined" && user_read_status > inner_area[i].created && inner_area[i].status == 2){

            inner_area[i].children[0].children[inner_area[i].children[0].children.length - 1].text = timeFormat(inner_area[i].created)+" "+status_text[3];
        }
    }
}

function updateRow(row, latest){
	var found = false;
	for (var i=0; i < data_source.length; i++) {
        if(data_source[i].id == row.id){
            found = true;
            var link_message = (row.format == "link")?row.preview_message:"";
            data_source[i] = {
							id: row.id,
							sender_name: row.sender_name,
					   	created: (row.is_endUser)?timeFormat(row.created):timeFormat(row.created)+" "+status_text[(doctor_read_status > row.created)?3:row.status],
					   	text_color: (!row.is_endUser)?"#606060":"#ffffff",
							link: row.message,
							sender_name_color: (!row.is_endUser)?"#000000":"#ffffff",
					   	newText: (row.format == "text")?row.message.replace("[br]", "\r\n"):(row.format == "link")?link_message:row.message,
					   	bgColor: (!row.is_endUser)?"#ffffff":"#22262f",
					   	setLeft: (!row.is_endUser)?10:null,
					   	setRight: (!row.is_endUser)?null:"10",
					    text_visible: (row.format == "text" || row.format == "link")?true:false,
							link_visible: (row.format == "link")?true:false,
							link_height: (row.format == "link")?Ti.UI.SIZE:0,
					    photo_visible: (row.format == "photo")?true:false,
					    voice_visible: (row.format == "voice")?true:false,
					    image_height: (row.format == "photo")?200:0,
					    image: (row.format == "photo")?row.message:"",
					    voice: (row.format == "voice")?row.message:"",
          	};
            Alloy.Globals.mocx.createCollection("chats", data_source);
        }
  };
	if(!found){
		addRow(row, latest);
	}
}

function updateRow_bak(row, latest){
	var found = false;
	var inner_area = $.inner_area.getChildren();
	for (var i=0; i < inner_area.length; i++) {
	    if(inner_area[i].id == row.id){
	        found = true;
	    }
		if(inner_area[i].children[0].children.length > 1 && inner_area[i].status == 1){
            inner_area[i].children[0].children[inner_area[i].children[0].children.length - 1].text = timeFormat(row.created)+" "+status_text[row.status];
        }
	};
	if(!found){
		addRow(row, latest);
	}
}

var first_time_load = true;
function render_conversation(latest, local){
	if(latest && local != true){
			if(sending){
					sending = false;
					console.log("sending set false");
			}
	}
	if(latest){
			data.reverse();
	}
	for (var i=0; i < data.length; i++) {
	     if(data[i].status == 1 && !local && data[i].message != ""){
            Alloy.Globals.API.callByPost({url: "sendMessage", type: data[i].format, params:data[i]},  function(responseText){
                var res = JSON.parse(responseText);
                Alloy.Globals.socket.sendMessage({room_id: room_id});
                //Ti.App.fireEvent("sendMessage", {room_id: room_id});
            });
        }
	    updateRow(data[i], latest);
		/*if((data[i].is_endUser && data[i].status > 1) || data[i].status == 3){
			updateRow(data[i], latest);
		}else{
			addRow(data[i], latest);
		}*/
	}
	var screenHeight = Ti.Platform.displayCaps.platformHeight;
	Alloy.Globals.mocx.createCollection("chats", data_source);
	/*if(latest){
		$.chatroom.scrollToIndex(0,  { animated: false});
		first_time_load = false;
	}*/
	if(first_time_load){
    	console.log(data.length+" first time load to bottom");
    	$.chatroom.scrollToIndex(data.length - 1,  { animated: false});
    	//setTimeout(function(){}, 1000);
    	first_time_load = false;
    }else if(latest){
    	console.log($.chatroom.data);
      $.chatroom.scrollToIndex(data_source.length -1,  { animated: false});
      console.log("latest scroll to"+data_source.length - 1);
    }else if(data.length > 0){
    	console.log(data.length+" data.length+1");
    	if(OS_IOS){
    		$.chatroom.scrollToIndex(data.length,  { animated: false, position:Titanium.UI.iOS.TableViewScrollPosition.TOP});
    	}else{
    		$.chatroom.scrollToIndex(data.length,  { animated: false});
    	}
	}
}

var data_loading = false;
function scrollChecker(e){
  if(OS_IOS){
	   var total = (OS_ANDROID)?pixelToDp(e.y): e.contentOffset.y;
	   var nearEnd = (e.contentSize.height-$.chatroom.rect.height) - 200;

     if(total <= 0 && !data_loading && !first_time_load){
   		data_loading = true;
   		getPreviousData();
   		setTimeout(function(){
   			data_loading = false;
   		}, 2000);
   	}
  }else{
    var firstVisibleItemIndex = e.firstVisibleItem;
    var totalItems = e.totalItemCount;
    var visibleItemCount = e.visibleItemCount;
    //if ((firstVisibleItemIndex + visibleItemCount) >= (totalItems*0.75) && !data_loading && !first_time_load){
     if(firstVisibleItemIndex <= 0 && !data_loading && !first_time_load){
      data_loading = true;
      getPreviousData();
      setTimeout(function(){
        data_loading = false;
      }, 2000);
    }
  }

}
/*
var data_loading = false;
function scrollChecker(e){
	if(OS_IOS){
	   var total = (OS_ANDROID)?pixelToDp(e.y): e.contentOffset.y;
	   var nearEnd = (e.contentSize.height-$.chatroom.rect.height) - 200;

     if(total >= nearEnd && !data_loading){
   		data_loading = true;
   		getPreviousData();
   		setTimeout(function(){
   			data_loading = false;
   		}, 2000);
   	}
  }else{
    var firstVisibleItemIndex = e.firstVisibleItem;
    var totalItems = e.totalItemCount;
    var visibleItemCount = e.visibleItemCount;
    if ((firstVisibleItemIndex + visibleItemCount) >= (totalItems*0.75) && !data_loading){
      data_loading = true;
      getPreviousData();
      setTimeout(function(){
        data_loading = false;
      }, 2000);
    }
  }
}*/

function callHelpdesk(){
    Titanium.Platform.openURL('tel:6046091611');
}

function getConversationByRoomId(callback){
	var url = (dr_id == -1)?"getHelplineMessageV4":"getMessage";
	var checker_id = (dr_id == -1)?7:19;
	var checker = Alloy.createCollection('updateChecker');
	var u_id = Ti.App.Properties.getString('u_id') || 0;
	var isUpdate = checker.getCheckerById(checker_id, u_id, dr_id);
	var last_updated = isUpdate.updated || Alloy.Globals.common.now();
	Alloy.Globals.API.callByPost({url: url, params: {u_id: u_id, dr_id: dr_id, last_updated: last_updated}}, function(responseText){
		var model = Alloy.createCollection("chat");

		var res = JSON.parse(responseText);
		var arr = res.data || [];
		if(arr.length > 0){
			model.saveArray(arr, callback);
			var update_id = _.pluck(arr, "id");
			//updateStatus(update_id);
		}
		checker.updateModule(checker_id, url, res.last_updated, u_id, dr_id);
		if(!room_id){	//if room_id = 0
			Alloy.Globals.socket.setRoom({room_id: res.room_id});
			//Ti.App.fireEvent("setRoom", {room_id: res.room_id});
			//Ti.App.Properties.setString('room_id', res.room_id);
			Ti.App.fireEvent("conversation:setRoom", {room_id: res.data});
		}
		room_id = res.room_id;
		user_read_status = res.user_read_status;
        doctor_read_status = res.doctor_read_status;
		callback && callback();
	});
}

function updateStatus(arr){
	for (var i=0; i < arr.length; i++) {
		var c = $.inner_area.getChildren();
		for (var b=0; b < $.inner_area.children.length; b++) {

			if($.inner_area.children[b].m_id == arr[i]){
				var time = $.inner_area.children[b].children[0].children[2].text.split(" ");
				$.inner_area.children[b].children[0].children[2].text = time[0]+time[1]+time[2]+" Sent";
			}
		};
	};
}


/*
 	Refresh
 * */
function refresh(callback, firsttime){
	retry = 0;
	loading.start();
	getConversationByRoomId(function(){
		callback({firsttime: firsttime});
		loading.finish();
		refreshing = false;
		//var model = Alloy.createCollection("chat");
		//model.messageRead({u_id: u_id});
	});

}
var refreshing = false;
var time_offset = Alloy.Globals.common.now();
function refresh_latest(param){
	if(!refreshing && time_offset < Alloy.Globals.common.now()){
		refreshing = true;
		refresh(getLatestData);
		time_offset = Alloy.Globals.common.now();
	}
}

function getPreviousData(param){
	start = (typeof start != "undefined")? start : 0;
	var model = Alloy.createCollection("chat");
	data = model.getData(false, start, anchor,"", dr_id);
	last_id = (data.length > 0)?_.first(data)['id']:last_id;
	last_update = (data.length > 0)?_.last(data)['created']:last_update;
	last_uid = (data.length > 0)?_.first(data)['sender_id']:last_uid;
	render_conversation(false, false);
	start = start + 10;
}

function getLatestData(local){
	var model = Alloy.createCollection("chat");
	data = model.getData(true,"","", last_update, dr_id);
	last_id = (data.length > 0)?_.first(data)['id']:last_id;
	last_update = (data.length > 0)?_.first(data)['created']:last_update;
	last_uid = (data.length > 0)?_.first(data)['sender_id']:last_uid;
	render_conversation(true, local);
	//setTimeout(function(e){scrollToBottom();}, 500);
}


function switchIcon(e){
	if(e.source.value != ""){
		$.enter_icon.right = 10;
	}else{
		$.enter_icon.right = -50;
	}
}

/**
 * Closes the Window
 */
function closeWindow(){
	$.win.close();
}

function init(){
	if(OS_IOS){
		second_init();
	}else{
	    $.win.setWindowSoftInputMode(Ti.UI.Android.SOFT_INPUT_ADJUST_PAN);
		if(Ti.Android.hasPermission("android.permission.RECORD_AUDIO")){
			checkingInternalPermission();
		}else{
			setTimeout(function(){
				Ti.Android.requestPermissions("android.permission.RECORD_AUDIO", function(e) {
				    if (e.success) {
						checkingInternalPermission();
				    } else {
						Alloy.Globals.common.createAlert("Warning","You don't have voice recorder permission!!!\nYou can go to setting enabled the permission.",function(e){
							closeWindow();
						});
				    }
				});
			},1000);
		}
	}
}
function checkingInternalPermission(){
	if(Titanium.Filesystem.hasStoragePermissions()){
		second_init();
	}else{
		setTimeout(function(){
			Titanium.Filesystem.requestStoragePermissions(function(e) {
			    if (e.success) {
					second_init();
			    } else {
					Alloy.Globals.common.createAlert("Warning","You don't have file storage permission!!!\nYou can go to setting enabled the permission.",function(e){
						closeWindow();
					});
			    }
			});
		},1000);
	}
}
function second_init(){
	var mic = voice_recorder.getView();
	$.action_btn.add(mic);
	$.win.add(loading.getView());
	if(!Titanium.Network.online){
		Alloy.Globals.common.createAlert("Alert", "There is no internet connection.", closeWindow);
	}
	if(dr_id > 0){
		//$.win.title = "Ask Doctor - "+args.record.name;
		if(OS_ANDROID){
			//$.pageTitle.text = "Ask Doctor - "+args.record.name;
		}
	}
	refresh(getPreviousData, true);
}

function filepermittion()
{
    if(OS_ANDROID)
    {
        if(Ti.Filesystem.hasStoragePermissions()) return true;
        else{
             Ti.Filesystem.requestStoragePermissions(function(e){
                if(e.success){
                    return true;
                }
                else{
                    alert("You denied permission.");
                    return false;
                }
             });
        }
    }else{
        if(Ti.Media.hasPhotoGalleryPermissions()) return true;
        else{
             Ti.Media.requestPhotoGalleryPermissions(function(e){
                if(e.success){
                    return true;
                }
                else{
                    alert("You denied permission.");
                    return false;
                }
             });
        }
    }
}

function onPlayStopBtnClicked(e) {
  if(e.source.new){
    try{
  		if(OS_IOS){
  		    Ti.Media.audioSessionCategory = Ti.Media.AUDIO_SESSION_CATEGORY_SOLO_AMBIENT;
  		}
  		audioPlayer = Ti.Media.createAudioPlayer({
          url : e.source.voice,
          allowBackground : true
      });
      console.log(audioPlayer.volume+"sound volume");
      audioPlayer.volume = 1;
      audioPlayer.release();
      console.log(audioPlayer.volume+"sound volume new");
  	}catch(e){
  		console.log(e.message);
  	}
  	e.source.image = "images/play_button.png";

  	audioPlayer.addEventListener('change', function(ex) {
  		console.log('State: ' + ex.description + ' (' + ex.state + ')');
  	    //updateTimeLabel();
        var image;
  	    if(ex.state == 7){	//7 = stopped
  	    	  image = "/images/play_button.png";
  	    }else if(ex.state == 5){    //7 = stopped
              //$.time.text = "";
            image = "/images/play_button.png";
        }else if(ex.state == 2){
  			//$.time.text = "Pause";
        image = "/images/play_button.png";
  		}else if(ex.state == 3){
  			//$.time.text = "Playing...";
        image = "/images/pause_button.png";
  		}
      e.source.image = image;
  	});

  	audioPlayer.addEventListener("complete", function(e){
  		e.source.image = "/images/play_button.png";
          audioPlayer.release();
          console.log("audio release");
  		//$.time.text = "";
  		Ti.Media.audioSessionCategory = Ti.Media.AUDIO_SESSION_CATEGORY_SOLO_AMBIENT;
  	});
    e.source.new = false;
  }
	// If both are false, playback is stopped.
	console.log(audioPlayer.playing+" audioPlayer.playing");
	if (audioPlayer.playing) {
		audioPlayer.pause();
		//$.time.text = "Pause";
		Ti.Media.audioSessionCategory = Ti.Media.AUDIO_SESSION_CATEGORY_SOLO_AMBIENT;
		e.source.image = "/images/play_button.png";
	} else {
		try{
			audioPlayer.start();
		}catch(e){
			console.log("see what error here");
			console.log(e);
		}
		//.time.text = "Playing...";
		Ti.Media.audioSessionCategory = Ti.Media.AUDIO_SESSION_CATEGORY_PLAYBACK;
		e.source.image = "/images/pause_button.png";
	}
	//updateTimeLabel();

}

function popCamera(e){

    if(!filepermittion()) return;

    var dialog = Titanium.UI.createOptionDialog({
        title: 'Choose an image source...',
        options: ['Camera','Photo Gallery', 'Cancel'],
        cancel:2 //index of cancel button
    });
    var pWidth = Ti.Platform.displayCaps.platformWidth;
    var pHeight = Ti.Platform.displayCaps.platformHeight;

    dialog.addEventListener('click', function(e) {

        if(e.index == 0) { //if first option was selected
            //then we are getting image from camera]
            if(Ti.Media.hasCameraPermissions()){
                Titanium.Media.showCamera({
                    success:photoSuccessCallback,
                    cancel:function(){
                        //do somehting if user cancels operation
                    },
                    error:function(error) {
                        //error happend, create alert
                        var a = Titanium.UI.createAlertDialog({title:'Camera'});
                        //set message
                        if (error.code == Titanium.Media.NO_CAMERA){
                            a.setMessage('Device does not have camera');
                        }else{
                            a.setMessage('Unexpected error: ' + error.code);
                        }

                        // show alert
                        a.show();
                    },
                    allowImageEditing:true,
                    mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO],
                    saveToPhotoGallery:true
                });
            }else{
                Ti.Media.requestCameraPermissions(function(e){

                    if(e.success){
                        Titanium.Media.showCamera({
                            success:photoSuccessCallback,
                            cancel:function(){
                                //do somehting if user cancels operation
                            },
                            error:function(error) {
                                //error happend, create alert
                                var a = Titanium.UI.createAlertDialog({title:'Camera'});
                                //set message
                                if (error.code == Titanium.Media.NO_CAMERA){
                                    a.setMessage('Device does not have camera');
                                }else{
                                    a.setMessage('Unexpected error: ' + error.code);
                                }

                                // show alert
                                a.show();
                            },
                            allowImageEditing:true,
                            mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO],
                            saveToPhotoGallery:true
                        });
                    }
                    else{
                        alert("You denied permission.");
                    }
                });
            }
        } else if(e.index == 1){

            if(OS_ANDROID)
            {
                if(Ti.Filesystem.hasStoragePermissions()){
                    Titanium.Media.openPhotoGallery({

                        success: photoSuccessCallback,
                        cancel:function() {
                            // called when user cancels taking a picture
                        },
                        error:function(error) {
                            // called when there's an error
                            var a = Titanium.UI.createAlertDialog({title:'Camera'});
                            if (error.code == Titanium.Media.NO_CAMERA) {
                                a.setMessage('Please run this test on device');
                            } else {
                                a.setMessage('Unexpected error: ' + error.code);
                            }
                            a.show();
                        },
                        // allowEditing and mediaTypes are iOS-only settings
                        allowEditing: true,
                        mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO],
                    });
                }else{
                    Ti.Filesystem.requestStoragePermissions(function(e){

                        if(e.success){
                            Titanium.Media.openPhotoGallery({

                                success:photoSuccessCallback,
                                cancel:function() {
                                    // called when user cancels taking a picture
                                },
                                error:function(error) {
                                    // called when there's an error
                                    var a = Titanium.UI.createAlertDialog({title:'Camera'});
                                    if (error.code == Titanium.Media.NO_CAMERA) {
                                        a.setMessage('Please run this test on device');
                                    } else {
                                        a.setMessage('Unexpected error: ' + error.code);
                                    }
                                    a.show();
                                },
                                // allowEditing and mediaTypes are iOS-only settings
                                allowEditing: true,
                                mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO],
                            });
                        }
                        else{
                            alert("You denied permission.");
                        }
                    });
                }
            }else{
                if(Ti.Media.hasPhotoGalleryPermissions()){
                    Titanium.Media.openPhotoGallery({

                        success:photoSuccessCallback,
                        cancel:function() {
                            // called when user cancels taking a picture
                        },
                        error:function(error) {
                            // called when there's an error
                            var a = Titanium.UI.createAlertDialog({title:'Camera'});
                            if (error.code == Titanium.Media.NO_CAMERA) {
                                a.setMessage('Please run this test on device');
                            } else {
                                a.setMessage('Unexpected error: ' + error.code);
                            }
                            a.show();
                        },
                        // allowEditing and mediaTypes are iOS-only settings
                        allowEditing: true,
                        mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO],
                    });
                }else{
                    Ti.Media.requestPhotoGalleryPermissions(function(e){

                        if(e.success){
                            Titanium.Media.openPhotoGallery({

                                success:photoSuccessCallback,
                                cancel:function() {
                                    // called when user cancels taking a picture
                                },
                                error:function(error) {
                                    // called when there's an error
                                    var a = Titanium.UI.createAlertDialog({title:'Camera'});
                                    if (error.code == Titanium.Media.NO_CAMERA) {
                                        a.setMessage('Please run this test on device');
                                    } else {
                                        a.setMessage('Unexpected error: ' + error.code);
                                    }
                                    a.show();
                                },
                                // allowEditing and mediaTypes are iOS-only settings
                                allowEditing: true,
                                mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO],
                            });
                        }
                        else{
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

function photoSuccessCallback(event) {
    var new_height = (event.media.height <= event.media.width)?event.media.height*(1024 / event.media.width):1024;
    var new_width = (event.media.width <= event.media.height)?event.media.width*(1024 / event.media.height):1024;
    var blob = event.media;
    blob = blob.imageAsResized(new_width, new_height);
    saveLocal({message: event.media.nativePath, format:"photo", filedata: blob});
}

init();
Ti.App.addEventListener("socket:refresh_chatroom", refresh_latest);
Ti.App.addEventListener('conversation:refresh', refresh_latest);

$.win.addEventListener("close", function(){
	Alloy.Globals.socket.leave_room({room_id: room_id});
	//Ti.App.fireEvent("leave_room", {room_id: room_id});
	Ti.App.Properties.setString('room_id', "");
	target_page = "";
	Ti.App.fireEvent("render_menu");
	Ti.App.removeEventListener("socket:refresh_chatroom", refresh_latest);
	Ti.App.removeEventListener('conversation:refresh', refresh_latest);
	$.destroy();

});
