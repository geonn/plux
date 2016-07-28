var function_array = [];
var function_onoff_array = [];

exports.fireEvent = function(name, params){
	eval("Ti.App.fireEvent('"+name+"', params)");
};

exports.event_onoff = function(name, bool){
	function_onoff_array[name] = bool;
};

exports.addEventListener = function(name, callback){
	function_array[name] = callback;
	function_onoff_array[name] = true;
};

exports.removeEventListener = function(name){
	function_array[name] = null;
	function_onoff_array[name] = null;
};

function eventManager(e){
	if(function_onoff_array[e.type]){
		function_array[e.type]();
	}
}

function webview_loaded(){
	var u_id = Ti.App.Properties.getString('u_id') || 0;
	API.callByPost({url:"getRoomId", params: {u_id: u_id}}, function(responseText){
		var res = JSON.parse(responseText);
		room_id = res.data;
		Ti.App.fireEvent("web:setRoom", {room_id: res.data});
		Ti.App.fireEvent("conversation:setRoom", {room_id: room_id});
	});
}

Ti.App.addEventListener('socket:message_alert', eventManager);
Ti.App.addEventListener('socket:refresh_chatroom', eventManager);
Ti.App.addEventListener('webview:loaded', webview_loaded);