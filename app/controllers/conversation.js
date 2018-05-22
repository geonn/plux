var args = arguments[0] || {};
var dr_id = args.dr_id || 0;
var loading = Alloy.createController("loading");
var anchor = common.now();
var last_update = common.now();
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
console.log(args);
function saveLocal(param){
	var model = Alloy.createCollection("chat");
	var app_id = Math.random().toString(36).substr(2, 10);
	var local_save = {
		"u_id": u_id,
		"id": app_id,
	    "sender_id": u_id,
	    "message": param.message,
	    "created": common.now(),
	    "is_endUser": 1,
	    "dr_id": dr_id,
	    "format": param.format,
	    "status": 1,
	    "app_id": app_id,
	    "sender_name": Ti.App.Properties.getString('fullname') || ""
	};
	console.log("save dr_id"+dr_id);
	console.log(local_save);
	var id = model.saveArray([local_save]);
	var api_param = {u_id: u_id, dr_id: dr_id, message: param.message, is_endUser:1, app_id: app_id };
	if(param.format == "voice"){
		_.extend(api_param, {media: param.format, Filedata: param.filedata});
	}
	getLatestData();
	API.callByPost({url: "sendMessage", type: param.format, params:api_param}, function(responseText){
		console.log(responseText);
		var res = JSON.parse(responseText);
		$.message_bar.value = "";
		$.message_bar.editable = true;
		sending = false;
		$.message_bar.blur();
		loading.finish();
		socket.fireEvent("socket:sendMessage", {room_id: room_id});
		if(dr_id === 0){
			socket.fireEvent("doctor:refresh_patient_list");
		}
	});
}

/**
 * Send message
 */
var sending = false;
function SendMessage(){
	if($.message_bar.value == "" || sending)
		return;
	loading.start();
	sending = true;
	$.message_bar.editable = false;
	
	
	saveLocal({message: $.message_bar.value,format:"text"});
}

function navToWebview(e){
	var url = parent({name:"url"}, e.source);
	console.log(url);
	var win = Alloy.createController("webview", {url: url}).getView();
	win.open();
}

function addRow(row, latest){
	var view_container = $.UI.create("View",{
		classes: ['hsize','wfill'],
		id: row.id
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
		var newText = ss.replace("[br]", "\r\n");
		var text_color = (row.format == "link")?"blue":"#606060";
		newText = (row.format == "link")?newText:newText;
		
		var label_message = $.UI.create("Label", {
			classes:['h5', 'wfill', 'hsize','small_padding'],
			top: 0,
			left:15,
			color: text_color,
			text: newText
		});
		
		var label_time = $.UI.create("Label", {
			classes:['h7', 'wfill', 'hsize','small_padding'],
			top:0,
			
			right:15,
			text: timeFormat(row.created)+" "+status_text[row.status],
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
			var player = Alloy.createWidget('dk.napp.audioplayer', {playIcon: "\uf144", pauseIcon: "\uf28c"});
			console.log(newText);
			player.setUrl(newText);
			//download_video(player, newText);
			var view = $.UI.create("View", {classes:['wfill','hsize','padding']});
			view.add(player.getView());
			view_text_container.add(label_name);
			view_text_container.add(view);
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
			//
			if(typeof args.record != "undefined"){
				var imageview_thumb_path = $.UI.create("ImageView", {
					top: 10,
					width: 50,
					height: "auto",
					defaultImage: "/images/default/small_item.png",
					right: 10,
					image: args.record.img_path
				});
				view_container.add(imageview_thumb_path);
				view_text_container.width = "60%";
				view_text_container.setRight(60);
			}else{
				view_text_container.setRight(10);
			}
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
		var m_id = parent({name: "m_id"}, e.source);
		var message_box = parent({name: "m_id", value: m_id}, e.source);
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

function updateRow(row, latest){
	var found = false;
	var inner_area = $.inner_area.getChildren();
	for (var i=0; i < inner_area.length; i++) {
		console.log(row.id+" compare "+inner_area[i].id);
		if(inner_area[i].id == row.id && !row.sender_id){
			found = true;
			console.log(inner_area[i].children[0]);
			console.log(inner_area[i].children[0].children.length);
			console.log(inner_area[i].children[0].children[inner_area[i].children[0].children.length - 1].text);
			inner_area[i].children[0].children[inner_area[i].children[0].children.length - 1].text = timeFormat(row.created)+" "+status_text[row.status];
		}
		//console.log(inner_area[i].children[0].children[inner_area[i].children[0].length - 1].text);
	};
	if(!found){
		addRow(row, latest);
	}
}

function render_conversation(latest){
	if(!latest){
		//$.chatroom.setContentOffset({y: 100});
	}
	var contain_height = 50;
	console.log(data);
	if(latest){
		data.reverse();
	}
	for (var i=0; i < data.length; i++) {
		if(data[i].is_endUser && data[i].status > 1 ){
			updateRow(data[i], latest);
		}else{
			addRow(data[i], latest);
		}
	}
	console.log(last_uid+" != "+Ti.App.Properties.getString('u_id'));
	
}


var data_loading = false;
function scrollChecker(e){
	var total = (OS_ANDROID)?pixelToDp(e.y): e.y;
	var nearEnd = ($.inner_area.rect.height-$.chatroom.rect.height) - 200;
	console.log(total+" "+nearEnd);
	if(total >= nearEnd && !data_loading){
		data_loading = true;
		getPreviousData({});
		/*
		var model = Alloy.createCollection("conversations");
		limit = model.getData(false, limit, anchor,"", args.u_id);
		*/
		setTimeout(function(){
			//$.chatroom.setContentOffset({y: top}, {animated: false});
			data_loading = false;
		}, 200);
	}	
}

function getConversationByRoomId(callback){
	var url = (dr_id == 0)?"getHelplineMessageV3":"getMessage";
	var checker_id = (dr_id == 0)?7:19;
	var checker = Alloy.createCollection('updateChecker'); 
	var u_id = Ti.App.Properties.getString('u_id') || 0;
	var isUpdate = checker.getCheckerById(checker_id, u_id);
	var last_updated = isUpdate.updated || "";
	last_update = last_updated;
	console.log({u_id: u_id, dr_id: dr_id, last_updated: last_updated});
	
	API.callByPost({url: url, params: {u_id: u_id, dr_id: dr_id, last_updated: last_updated}}, function(responseText){
		var model = Alloy.createCollection("chat");
		console.log('check here room id'+room_id);
		var res = JSON.parse(responseText);
		var arr = res.data || undefined;
		if(arr.length > 0){
			console.log(arr);
			model.saveArray(arr, callback);
			var update_id = _.pluck(arr, "id");
			//updateStatus(update_id);
		}
		checker.updateModule(checker_id, url, res.last_updated, u_id);
		if(!room_id){	//if room_id = 0 
			console.log(res);
			Ti.App.fireEvent("web:setRoom", {room_id: res.room_id});
			setup_socket();
			//Ti.App.fireEvent("conversation:setRoom", {room_id: res.data});
		}
		room_id = res.room_id;
		console.log(room_id+" roomid real");
		callback && callback();
	});
}

function updateStatus(arr){
	for (var i=0; i < arr.length; i++) {
		var c = $.inner_area.getChildren();
		for (var b=0; b < $.inner_area.children.length; b++) {
			console.log($.inner_area.children[b].m_id+" "+arr[i]);
			if($.inner_area.children[b].m_id == arr[i]){
				var time = $.inner_area.children[b].children[0].children[2].text.split(" ");
				$.inner_area.children[b].children[0].children[2].text = time[0]+time[1]+time[2]+" Sent";
			}
		};
	};
}

function scrollToBottom(){
	console.log("is that possible here?");
	console.log(Ti.Platform.displayCaps.platformHeight / (Ti.Platform.displayCaps.logicalDensityFactor || 1));
	
	var pHeight = (OS_IOS)?Ti.Platform.displayCaps.platformHeight:Ti.Platform.displayCaps.platformHeight / (Ti.Platform.displayCaps.logicalDensityFactor || 1);
	console.log($.inner_area.rect.height - pHeight + 110);
	//$.chatroom.setContentOffset({y: $.inner_area.rect.height - pHeight + 110});
	$.chatroom.scrollToBottom();
}

$.chatroom.addEventListener("scroll", function (e){
	var theEnd = $.inner_area.rect.height;
	var total = (OS_ANDROID)?pixelToDp(e.y)+e.source.rect.height: e.y+e.source.rect.height;
	var nearEnd = theEnd * 0.1;
});

/*
 	Refresh
 * */
function refresh(callback, firsttime){
	retry = 0;
	loading.start();
	console.log("start refresh");
	getConversationByRoomId(function(){
		callback({firsttime: firsttime});
		loading.finish();
		refreshing = false;
		var model = Alloy.createCollection("chat"); 
		model.messageRead({u_id: u_id});
	});
	
}
var refreshing = false;
var time_offset = common.now();
function refresh_latest(param){
	console.log('check here');
	console.log(param);
	var player = Ti.Media.createSound({url:"/sound/doorbell.wav"});
	player.play();
	
	console.log("refresh_latest "+refreshing);

	console.log(time_offset+" < "+common.now());
	if(!refreshing && time_offset < common.now()){
		refreshing = true;
		refresh(getLatestData);
		time_offset = common.now();
	}
}

function getPreviousData(param){ 
	console.log(console.log(typeof start));
	start = (typeof start != "undefined")? start : 0;
	var model = Alloy.createCollection("chat");
	console.log(dr_id+" dr_id");
	data = model.getData(false, start, anchor,"", dr_id);
	console.log(data.length+" data length");
	last_id = (data.length > 0)?_.first(data)['id']:last_id;
	last_update = (data.length > 0)?_.last(data)['created']:last_update;
	last_uid = (data.length > 0)?_.first(data)['sender_id']:last_uid;
	console.log(last_id+" why");
	render_conversation(false);
	start = start + 10;
}

function getLatestData(){
	var model = Alloy.createCollection("chat");
	data = model.getData(true,"","", last_update, dr_id); 
	
	console.log("getlatestdata");
	console.log(data.length);
	last_id = (data.length > 0)?_.first(data)['id']:last_id;
	last_update = (data.length > 0)?_.first(data)['created']:last_update;
	last_uid = (data.length > 0)?_.first(data)['sender_id']:last_uid;
	console.log(last_id);
	render_conversation(true);
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
		if(Ti.Android.hasPermission("android.permission.RECORD_AUDIO")){
			checkingInternalPermission();		    	
		}else{
			setTimeout(function(){
				Ti.Android.requestPermissions("android.permission.RECORD_AUDIO", function(e) {
				    if (e.success) {
						checkingInternalPermission();		    	
				    } else {
						common.createAlert("Warning","You don't have voice recorder permission!!!\nYou can go to setting enabled the permission.",function(e){
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
					common.createAlert("Warning","You don't have file storage permission!!!\nYou can go to setting enabled the permission.",function(e){
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
		common.createAlert("Alert", "There is no internet connection.", closeWindow);
	}
	if(dr_id > 0){
		console.log(args.record);
		$.win.title = "Ask Doctor - "+args.record.name;
		if(OS_ANDROID){
			$.pageTitle.text = "Ask Doctor - "+args.record.name;
		}
	}
	console.log(room_id+" room id");
	refresh(getPreviousData, true);
	if(room_id){
		socket.addEventListener("socket:refresh_chatroom", refresh_latest);
		socket.event_onoff("socket:message_alert", false);
	}	
}

function setup_socket(){
	console.log("setup_socket");
	socket.addEventListener("socket:refresh_chatroom", refresh_latest);
	socket.event_onoff("socket:message_alert", false);
}

init();

Ti.App.addEventListener('conversation:refresh', refresh_latest);
$.win.addEventListener("close", function(){
	
	Ti.App.fireEvent("socket:leave_room", {room_id: room_id});
	socket.removeEventListener("socket:refresh_chatroom");
	socket.event_onoff("socket:message_alert", true);
	Ti.App.fireEvent("render_menu");
	Ti.App.removeEventListener('conversation:refresh', refresh_latest);
	$.destroy();
	 
});