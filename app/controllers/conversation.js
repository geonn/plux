var args = arguments[0] || {};
var dr_id = args.dr_id;
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
/**
 * Send message
 */
var sending = false;
function SendMessage(){
	var model = Alloy.createCollection("helpline");
	if($.message.value == "" || sending){
		return;
	}
	loading.start();
	sending = true;
	$.message.editable = false;
	
	var local_save = [{
		"u_id": u_id,
	    "sender_id": u_id,
	    "message": $.message.value,
	    "created": common.now(),
	    "is_endUser": 1,
	    "format": "text",
	    "status": 1,
	    "sender_name": user.fullname,
	}];
	var id = model.saveArray(local_save);
	API.callByPost({url: "sendHelplineMessage", params:{u_id: u_id, message: $.message.value, is_endUser:1, app_id: id }}, function(responseText){
		
		var res = JSON.parse(responseText);
		$.message.value = "";
		$.message.editable = true;
		sending = false;
		$.message.blur();
		loading.finish();
		socket.fireEvent("socket:sendMessage", {room_id: room_id});
		//Ti.App.fireEvent("web:sendMessage", {room_id: room_id});
		console.log(isShowWatingMsg);
		if(isShowWatingMsg == "0"){
			refreshIntervalId = setInterval(function(){
				$.estimate.text = "Our helpdesk seem busy in others line, please wait for 5-10 min. Sorry for inconvenience caused.";
				$.estimate.parent.show();
				isShowWatingMsg = "1"; 
				clearInterval(refreshIntervalId);
			},30000); 
		}
		
	});
	
	//var params = {u_id: u_id, to_id: to_id, message: $.message.value, type: "text", room_id: room_id};
	//var messager = Alloy.createCollection('message');
	
	//messager.saveRecord(params);
	
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
		
		//console.log("message:"+data[i].message+", is_endUser:"+data[i].is_endUser +"=="+data[i].created);
		/*var thumb_path = (data[i].u_id == u_id)?user_thumb_path:friend_thumb_path;
		var imageview_thumb_path = $.UI.create("ImageView", {
			top: 10,
			width: 50,
			height: "auto",
			defaultImage: "/images/default/small_item.png",
			left: 10,
			image: thumb_path
		});
		*/
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
			newText = (data[i].format == "link")?  newText:newText;
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
			view_text_container.add(label_name);
			if (data[i].format == "link"){
				var label_message2 = $.UI.create("Label", {
					classes:['h5', 'wfill', 'hsize','small_padding'],
					top: 0,
					left:15, 
					text: "Thanks you for contacting our call centre. \nWe would love to hear your thoughts or feedback on how we can improve your experience!\nClick below to start the survey:"
				});
				view_text_container.add(label_message2);
			}
			
			view_text_container.add(label_message);
			
			view_text_container.add(label_time);
			if(data[i].is_endUser){
				view_text_container.setBackgroundColor("#F1FFE3");
				view_text_container.setLeft(10);
				//view_container.add(imageview_thumb_path);
			}else{
				view_text_container.setBackgroundColor("#FFFFE3");
				//view_container.add(imageview_thumb_path);
				view_text_container.setRight(10);
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
   			 	var model = Alloy.createCollection("helpline");
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
	var checker = Alloy.createCollection('updateChecker'); 
	var u_id = Ti.App.Properties.getString('u_id') || 0;
	var isUpdate = checker.getCheckerById(7, u_id);
	var last_updated = isUpdate.updated || "";
	last_update = last_updated;
	console.log(last_updated+" last_updated "+u_id);
	
	API.callByPost({url:"getHelplineMessageV3", new:true, params: {u_id: u_id, last_updated: last_updated}}, function(responseText){
		var model = Alloy.createCollection("helpline");
		var res = JSON.parse(responseText);
		var arr = res.data || undefined;
		if(arr.length > 0 || retry >= 3){
			Ti.App.Properties.setString('estimate_time', res.estimate_time);
			model.saveArray(arr, callback);
			checker.updateModule(7, "getHelplineMessageV3", res.last_updated, u_id);
			var update_id = _.pluck(arr, "id");
			updateStatus(update_id);
			if(!room_id){	//if room_id = 0 
				Ti.App.fireEvent("web:setRoom", {room_id: res.data});
				Ti.App.fireEvent("conversation:setRoom", {room_id: res.data});
			}
			room_id = res.room_id;
			callback && callback();
		}else{
			console.log(retry+" retry times");
			getConversationByRoomId(callback);
			retry ++;
		}
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
		var model = Alloy.createCollection("helpline"); 
		model.messageRead({u_id: u_id});
	});
	
}
var refreshing = false;
var time_offset = common.now();
function refresh_latest(param){
	
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
	var model = Alloy.createCollection("helpline");
	data = model.getData(false, start, anchor);
	var estimate_time = Ti.App.Properties.getString('estimate_time');
	console.log(estimate_time+" estimate time");
	console.log(data);
	last_id = (data.length > 0)?_.first(data)['id']:last_id;
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
	var model = Alloy.createCollection("helpline"); 
	data = model.getData(true,"","", last_id); 
	
	var estimate_time = Ti.App.Properties.getString('estimate_time'); 
	if(estimate_time != 0){
		$.estimate.text = "Our support will serve you soon. Estimate "+estimate_time+" minute left";
		$.estimate.parent.show();
	}else{
		$.estimate.parent.hide();
	}
	console.log("getlatestdata");
	console.log(data);
	last_id = (data.length > 0)?_.first(data)['id']:last_id;
	last_uid = (data.length > 0)?_.first(data)['sender_id']:last_uid;
	console.log(last_id);
	render_conversation(true);
	setTimeout(function(e){scrollToBottom();}, 500);
}

/**
 * Closes the Window
 */
function closeWindow(){
	$.win.close();
}

function init(){
	$.win.add(loading.getView());
	if(!Titanium.Network.online){
		common.createAlert("Alert", "There is no internet connection.", closeWindow);
	}
	console.log(room_id+" room id");
	refresh(getPreviousData, true);
	if(room_id){
		socket.addEventListener("socket:refresh_chatroom", refresh_latest);
		socket.event_onoff("socket:message_alert", false);
	}
}

function set_room(){
	 
	socket.addEventListener("socket:refresh_chatroom", refresh_latest);
	socket.event_onoff("socket:message_alert", false);
}

init();

Ti.App.addEventListener('conversation:refresh', refresh_latest);
Ti.App.addEventListener("conversation:setRoom", set_room);
$.win.addEventListener("close", function(){
	socket.removeEventListener("socket:refresh_chatroom");
	socket.event_onoff("socket:message_alert", true);
	Ti.App.fireEvent("render_menu");
	Ti.App.removeEventListener('conversation:refresh', refresh_latest);
	Ti.App.removeEventListener('conversation:setRoom', set_room);
	$.destroy();
	 
});