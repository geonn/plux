var args = arguments[0] || {};
var dr_id = args.dr_id;
var loading = Alloy.createController("loading");
var room_id = 0;
var anchor = common.now();
var last_update = common.now();
var start = 0;
/**
 * Send message
 */
function SendMessage(){
	if($.message.value == ""){
		return;
	}
	var u_id = Ti.App.Properties.getString('u_id') || 0;
	API.callByPost({url: "sendHelplineMessage", params:{u_id: u_id, message: $.message.value, is_endUser:1}}, function(responseText){
		var model = Alloy.createCollection("helpline");
		var res = JSON.parse(responseText);
		var arr = res.data || null;
		$.message.value = "";
		$.message.blur();
		Ti.App.fireEvent("web:sendMessage", {room_id: room_id});
		});
	
	//var params = {u_id: u_id, to_id: to_id, message: $.message.value, type: "text", room_id: room_id};
	//var messager = Alloy.createCollection('message');
	
	//messager.saveRecord(params);
	
}


function render_conversation(latest){
	if(!latest){
		//$.chatroom.setContentOffset({y: 100});
	}
	var contain_height = 50;
	for (var i=0; i < data.length; i++) {
		var view_container = $.UI.create("View",{
			classes: ['hsize','wfill'],
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
				width: "75%"
			});
			var label_name = $.UI.create("label",{
				classes: ['h6','wfill', 'hsize', 'bold', 'small_padding'],
				left:15,
				color: "#7F7F7F",
				text: data[i].sender_name
			});
			
			var ss = data[i].message;
			var newText = ss.replace("[br]", "\r\n");
			var label_message = $.UI.create("Label", {
				classes:['h5', 'wfill', 'hsize','small_padding'],
				top: 0,
				left:15,
				text: newText
			});
			var label_time = $.UI.create("Label", {
				classes:['h7', 'wfill', 'hsize','small_padding'],
				top:0,
				right:15,
				text: data[i].created,//timeFormat(),
				textAlign: "right"
			});
			view_text_container.add(label_name);
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
		if(latest){
			$.inner_area.insertAt({view: view_container});
		}else{
			$.inner_area.insertAt({view: view_container, position: 1});
		}
		
	}
}

function getConversationByRoomId(callback){
	var checker = Alloy.createCollection('updateChecker'); 
	var u_id = Ti.App.Properties.getString('u_id') || 0;
	var isUpdate = checker.getCheckerById(7, u_id);
	var last_updated = isUpdate.updated || "";
	
	API.callByPost({url:"getHelplineMessage", params: {u_id: u_id, last_updated: last_updated}}, function(responseText){
		var model = Alloy.createCollection("helpline");
		
		var res = JSON.parse(responseText);
		var arr = res.data || null;
		Ti.App.Properties.setString('estimate_time', res.estimate_time);
		console.log("getConversationByRoomId function");
		console.log(arr);
		model.saveArray(arr, callback);
		checker.updateModule(7, "getHelplineMessage", common.now(), u_id);
		if(!room_id){
			console.log(res.room_id+" room id");
			room_id = res.room_id;
			setTimeout(function(e){Ti.App.fireEvent("web:setRoom", {room_id: room_id});}, 1000);
		}
		callback && callback();
	});
}

function scrollToBottom(){
	$.chatroom.scrollToBottom();
}

/*
 	Refresh
 * */
function refresh(callback, firsttime){
	loading.start();
	getConversationByRoomId(function(){
		callback({firsttime: firsttime});
	});
	loading.finish();
}

function refresh_latest(){
	console.log("refresh_latest");
	refresh(getLatestData);
}

function getPreviousData(param){
	var model = Alloy.createCollection("helpline");
	data = model.getData(false, "", start, anchor);
	var estimate_time = Ti.App.Properties.getString('estimate_time');
	console.log(estimate_time+" estimate time");
	if(estimate_time != 0){
		$.estimate.text = "Our support will serve you soon. Estimate "+estimate_time+" minute left";
		$.estimate.parent.show();
	}else{
		$.estimate.parent.hide();
	}
	render_conversation(false);
	start = start + 11;
	if(typeof param.firsttime != "undefined"){
		console.log("not posible"+param.firsttime);
		setTimeout(function(e){scrollToBottom();}, 500);
	}else{
		$.chatroom.setContentOffset({y: 1000}, {animated: false});
	}
}

function getLatestData(){
	var model = Alloy.createCollection("helpline");
	data = model.getData(true, last_update);
	last_update = common.now();
	var estimate_time = Ti.App.Properties.getString('estimate_time');
	console.log(estimate_time+" estimate time");
	if(estimate_time != 0){
		$.estimate.text = "Our support will serve you soon. Estimate "+estimate_time+" minute left";
		$.estimate.parent.show();
	}else{
		$.estimate.parent.hide();
	}
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
	refresh(getPreviousData, true);
}

init();

Ti.App.addEventListener('conversation:refresh', refresh_latest);

$.win.addEventListener("close", function(){
	Ti.App.removeEventListener('conversation:refresh', refresh_latest);
	$.destroy();
	console.log("window close");
});
