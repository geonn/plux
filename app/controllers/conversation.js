var args = arguments[0] || {};
var dr_id = args.dr_id || 0;
var loading = Alloy.createController("loading");
var anchor = common.now();
var last_update = common.now();
var start = 0;
var isShowWatingMsg = "0";
var room_set = false;
var refreshIntervalId;
var retry = 0;
var u_id = Ti.App.Properties.getString('u_id') || 0;
var user_model = Alloy.createCollection("users_plux");
var user = user_model.getUserById(u_id);
var last_id = 0;
var last_uid;
var status_text = ["", "Sending", "Sent", "Read"];
var room_id = 0;
var voice_recorder = Alloy.createWidget('geonn.voicerecorder', {record_callback: saveLocal});

function saveLocal(param){
	var model_name = (dr_id == 0)?"helpline":"chat";
	var model = Alloy.createCollection(model_name);
	var app_id = Math.random().toString(36).substr(2, 10);
	var local_save = {
		"u_id": u_id,
	    "sender_id": u_id,
	    "message": param.message,
	    "created": common.now(),
	    "is_endUser": 1,
	    "dr_id": dr_id,
	    "format": param.format,
	    "status": 1,
	    "app_id": app_id,
	    "sender_name": user.fullname,
	};
	
	if(dr_id > 0){
		local_save = _.extend(local_save, {id: app_id});
	}
	var id = model.saveArray([local_save]);
	app_id = (dr_id == 0)?id:app_id;
	var api_param = {u_id: u_id, dr_id: dr_id, message: param.message, is_endUser:1, app_id: app_id };
	if(param.format == "voice"){
		_.extend(api_param, {media: param.format, Filedata: param.filedata});
	}
	API.callByPost({url: "sendMessage", type: param.format, params:api_param}, function(responseText){
		console.log(responseText);
		var res = JSON.parse(responseText);
		$.message_bar.value = "";
		$.message_bar.editable = true;
		sending = false;
		$.message_bar.blur();
		loading.finish();
		socket.fireEvent("socket:sendMessage", {room_id: room_id});
		refresh_latest();
		if(dr_id === 0){
			socket.fireEvent("doctor:refresh_patient_list");
		}
		if(isShowWatingMsg == "0"){
			refreshIntervalId = setInterval(function(){
				$.estimate.text = "Our helpdesk seem busy in others line, please wait for 5-10 min. Sorry for inconvenience caused.";
				$.estimate.parent.show();
				isShowWatingMsg = "1"; 
				clearInterval(refreshIntervalId);
			},30000); 
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

function render_conversation(latest){
	if(!latest){
		//$.chatroom.setContentOffset({y: 100});
	}
	var contain_height = 50;
	
	if(latest){
		data.reverse();
	}
	for (var i=0; i < data.length; i++) {
		var view_container = $.UI.create("View",{
			classes: ['hsize','wfill'],
			m_id: data[i].id
		});
		console.log("asdf:"+JSON.stringify(data[i]));
		
		
		if(data[i].sender_id){
			var view_text_container = $.UI.create("View", {
				classes:  ['hsize', 'vert', 'box','bigRounded'],
				top: 2,
				width: "75%",
				url: data[i].message
			});
			var label_name = $.UI.create("label",{
				classes: ['h6','wfill', 'hsize', 'bold', 'small_padding'],
				left:15,
				color: "#7F7F7F",
				text: data[i].sender_name
			});
			
			var ss = data[i].message;
			var newText = ss.replace("[br]", "\r\n");
			var text_color = (data[i].format == "link")?"blue":"#606060";
			newText = (data[i].format == "link")?newText:newText;
			console.log(data[i]);
			
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
				text: timeFormat(data[i].created)+" "+status_text[data[i].status],
				textAlign: "right"
			});
			
			if (data[i].format == "link"){
				var label_message2 = $.UI.create("Label", {
					classes:['h5', 'wfill', 'hsize','small_padding'],
					top: 0,
					left:15, 
					text: "Thanks you for contacting our call centre. \nWe would love to hear your thoughts or feedback on how we can improve your experience!\nClick below to start the survey:"
				});
				view_text_container.add(label_name);
				view_text_container.add(label_message2);
				view_text_container.add(label_message);
			}else if(data[i].format == "voice"){
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
			if(data[i].is_endUser){
				view_text_container.setBackgroundColor("#F1FFE3");
				view_text_container.setLeft(10);
				//view_container.add(imageview_thumb_path);
			}else{
				view_text_container.setBackgroundColor("#FFFFE3");
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
			if(data[i].format == "link"){
				label_message.addEventListener("click", navToWebview);
			}
			
		}else{
			var view_text_container = $.UI.create("View", {
				classes: ['wsize','hsize','box','rounded'],
				top: 10,
				backgroundColor: "#3ddaf6"
			});
			
			var label_system_msg = $.UI.create("Label",{
				classes: ['wsize', 'hsize','padding','h6'],
				text: data[i].message
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
   			 	var model_name = (dr_id == 0)?"helpline":"chat";
   			 	var model = Alloy.createCollection(model_name);
				model.removeById(m_id);
   			 	$.inner_area.remove(message_box);
   			 }
   			});
   			dialog.show();
		});
		if(latest){
			$.inner_area.insertAt({view: view_container});
		}else{
			$.inner_area.insertAt({view: view_container, position: 1});
		}
	}
	console.log(last_uid+" != "+Ti.App.Properties.getString('u_id'));
	if(last_uid != Ti.App.Properties.getString('u_id') ){
		$.estimate.parent.hide();
		isShowWatingMsg = "0";
		clearInterval(refreshIntervalId);
	}
	 
	if(isShowWatingMsg == "1"){
		$.estimate.parent.show();
	}
}

function getConversationByRoomId(callback){
	var url = (dr_id == 0)?"getHelplineMessageV3":"getMessage";
	var model_name = (dr_id == 0)?"helpline":"chat";
	var checker_id = (dr_id == 0)?7:19;
	var checker = Alloy.createCollection('updateChecker'); 
	var u_id = Ti.App.Properties.getString('u_id') || 0;
	var isUpdate = checker.getCheckerById(checker_id, u_id);
	var last_updated = isUpdate.updated || "";
	last_update = last_updated;
	console.log({u_id: u_id, dr_id: dr_id, last_updated: last_updated});
	
	API.callByPost({url: url, params: {u_id: u_id, dr_id: dr_id, last_updated: last_updated}}, function(responseText){
		var model = Alloy.createCollection(model_name);
		console.log('check here '+room_id);
		var res = JSON.parse(responseText);
		var arr = res.data || undefined;
		if(arr.length > 0){
			console.log(arr);
			model.saveArray(arr, callback);
			var update_id = _.pluck(arr, "id");
			//updateStatus(update_id);
		}
		Ti.App.Properties.setString('estimate_time', res.estimate_time);
		checker.updateModule(checker_id, url, res.last_updated, u_id);
		if(!room_id){	//if room_id = 0 
			console.log(res);
			Ti.App.fireEvent("web:setRoom", {room_id: res.room_id});
			setup_socket();
			//Ti.App.fireEvent("conversation:setRoom", {room_id: res.data});
		}
		room_id = res.room_id;
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
	$.chatroom.scrollToBottom();
}

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
		var model_name = (dr_id == 0)?"helpline":"chat";
		var model = Alloy.createCollection(model_name); 
		model.messageRead({u_id: u_id});
	});
	
}
var refreshing = false;
var time_offset = common.now();
function refresh_latest(param){
	
	var player = Ti.Media.createSound({url:"/sound/doorbell.wav"});
	player.play();
	
	console.log("refresh_latest "+refreshing);
	/*if(typeof(param.admin) != "undefined"){
		Ti.App.Properties.setString('estimate_time', "0");
	}else{
		
	}*/
	console.log(time_offset+" < "+common.now());
	if(!refreshing && time_offset < common.now()){
		refreshing = true;
		refresh(getLatestData);
		time_offset = common.now();
	}
}

function getPreviousData(param){ 
	start = parseInt(start);
	var model_name = (dr_id == 0)?"helpline":"chat";
	var model = Alloy.createCollection(model_name);
	console.log(dr_id+" dr_id");
	data = model.getData(false, start, anchor,"", dr_id);
	var estimate_time = Ti.App.Properties.getString('estimate_time');
	console.log(estimate_time+" estimate time");
	console.log(data.length);
	last_id = (data.length > 0)?_.first(data)['id']:last_id;
	last_update = (data.length > 0)?_.last(data)['created']:last_update;
	last_uid = (data.length > 0)?_.first(data)['sender_id']:last_uid;
	console.log(last_id+" why");
	if(estimate_time != "0"){
		$.estimate.text = "Our support will serve you soon. Estimate "+estimate_time+" minute left";
		$.estimate.parent.show();
	}else{
		$.estimate.parent.hide();
	}
	render_conversation(false);
	start = start + 10;
	if(typeof param.firsttime != "undefined"){ 
		setTimeout(function(e){scrollToBottom();}, 500);
	}else{
		if(OS_IOS){
			$.chatroom.setContentOffset({y: 1000}, {animated: false});
		} 
	}
 
}

function getLatestData(){
	var model_name = (dr_id == 0)?"helpline":"chat";
	var model = Alloy.createCollection(model_name); 
	console.log(last_id+" last id");
	data = model.getData(true,"","", (dr_id == 0)?last_id:last_update, dr_id); 
	
	var estimate_time = Ti.App.Properties.getString('estimate_time'); 
	if(estimate_time != 0){
		$.estimate.text = "Our support will serve you soon. Estimate "+estimate_time+" minute left";
		$.estimate.parent.show();
	}else{
		$.estimate.parent.hide();
	}
	console.log("getlatestdata");
	console.log(data.length);
	last_id = (data.length > 0)?_.first(data)['id']:last_id;
	last_update = (data.length > 0)?_.first(data)['created']:last_update;
	last_uid = (data.length > 0)?_.first(data)['sender_id']:last_uid;
	console.log(last_id);
	render_conversation(true);
	setTimeout(function(e){scrollToBottom();}, 500);
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
	var model_name = (dr_id == 0)?"helpline":"chat";
	if(dr_id > 0){
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