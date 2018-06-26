var function_array = [];
var function_onoff_array = [];

exports.fireEvent = function(name, params){
	Ti.App.fireEvent(name, params);
};

exports.event_onoff = function(name, bool){
	function_onoff_array[name] = bool;
};

exports.addEventListener = function(name, callback){
    console.log(name+" socket event added");
	Ti.App.addEventListener(name, eventManager);
	//Ti.App.fireEvent("socket:add_event", {name: name});
	function_array[name] = callback;
	function_onoff_array[name] = true;
};

exports.removeEventListener = function(name){
	Ti.App.removeEventListener(name, eventManager);
	function_array[name] = null;
	function_onoff_array[name] = null;
};

function eventManager(e){
	console.log(e.type+" fired!");
	console.log(e);
	if(function_onoff_array[e.type]){
		function_array[e.type](e);
	}
}

//Ti.App.addEventListener('socket:message_alert', eventManager);
//Ti.App.addEventListener('socket:refresh_chatroom', eventManager);