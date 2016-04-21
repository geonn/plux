var args = arguments[0] || {};
var dr_id = args.dr_id;
var room_id = args.room_id;
var loading = Alloy.createController("loading");

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
		console.log('message sent');
		
		refresh();
		setTimeout(scrollToBottom, 500);
		});
	
	//var params = {u_id: u_id, to_id: to_id, message: $.message.value, type: "text", room_id: room_id};
	//var messager = Alloy.createCollection('message');
	
	//messager.saveRecord(params);
	
}


function render_conversation(){
	$.inner_box.removeAllChildren();
	console.log("render_conversation");
	console.log(data);
	for (var i=0; i < data.length; i++) {
		var view_container = $.UI.create("View",{
			classes: ['hsize','wfill'],
		});
		console.log("message:"+data[i].message+", is_endUser:"+data[i].is_endUser);
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
		var view_text_container = $.UI.create("View", {
			classes:  ['hsize', 'vert', 'box'],
			top: 10,
			width: "75%"
		});
		var label_name = $.UI.create("label",{
			classes: ['h5','wfill', 'hsize', 'bold', 'padding'],
			text: data[i].sender_name
		});
		var label_message = $.UI.create("Label", {
			classes:['h5', 'wfill', 'hsize','padding'],
			text: data[i].message
		});
		var label_time = $.UI.create("Label", {
			classes:['h5', 'wfill', 'hsize','padding'],
			top:0,
			text: data[i].created,
			textAlign: "right"
		});
		view_text_container.add(label_name);
		view_text_container.add(label_message);
		view_text_container.add(label_time);
		if(data[i].is_endUser){
			view_text_container.setLeft(10);
			//view_container.add(imageview_thumb_path);
		}else{
			//view_container.add(imageview_thumb_path);
			view_text_container.setRight(10);
		}
		view_container.add(view_text_container);
		$.inner_box.add(view_container);
	}
	scrollToBottom();
}

function getConversationByRoomId(callback){
	var checker = Alloy.createCollection('updateChecker'); 
	var u_id = Ti.App.Properties.getString('u_id') || 0;
	var isUpdate = checker.getCheckerById(7, u_id);
	var last_updated = isUpdate.updated || "";
	console.log(u_id);
	API.callByPost({url:"getHelplineMessage", params: {u_id: u_id, last_updated: last_updated}}, function(responseText){
		var model = Alloy.createCollection("helpline");
		console.log(responseText);
		var res = JSON.parse(responseText);
		var arr = res.data || null;
		
		console.log('api get message');
		console.log(arr);
		model.saveArray(arr, callback);
		checker.updateModule(7, "getHelplineMessage", common.now(), u_id);
		
		callback && callback();
	});
}

function scrollToBottom(){
	$.chatroom.scrollToBottom();
}

/*
 	Refresh
 * */
function refresh(){
	loading.start();
	getConversationByRoomId(function(){
		var model = Alloy.createCollection("helpline");
		data = model.getData();
		render_conversation();
	});
	loading.finish();
}

/**
 * Closes the Window
 */
function closeWindow(){
	$.win.close();
}

function updateFriendInfo(callback){
	//friend_thumb_path = doctors_data[0].thumb_path;
	$.f_name.text = "Helpline";
	callback && callback();
	
	return;
	/*
	API.callByPost({url:"getFriendListUrl", params: {u_id: u_id}}, function(responseText){
		var res = JSON.parse(responseText);
		var arr = res.data || null;
		doctors.saveArray(arr);
		var doctors_data = doctors.getData(dr_id);
		//friend_thumb_path = doctors_data[0].thumb_path;
		$.f_name.text = doctors_data[0].fullname;
		callback && callback();
	});*/
}

function init(){
	$.win.add(loading.getView());
	updateFriendInfo(refresh);
}

init();

$.chatroom.addEventListener("postlayout", scrollToBottom);

Ti.App.addEventListener('conversation:refresh', refresh);

$.win.addEventListener("close", function(){
	Ti.App.removeEventListener('conversation:refresh',refresh);
	$.destroy();
	console.log("window close");
});
