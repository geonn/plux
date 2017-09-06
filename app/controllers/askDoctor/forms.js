var args = arguments[0] || {};
var dr_id = args.dr_id || 0; 
var u_id = parseInt(Ti.App.Properties.getString('u_id'));
var gender = "";
var user_model = Alloy.createCollection("users_plux");
var user = user_model.getUserById(u_id);
var loading = Alloy.createController("loading");

function init(){
	$.win.add(loading.getView());
}

init();

function genderSelect(e){
	var gender_child = $.gender_view.getChildren();
	console.log(gender_child.length+" children! number");
	for (var i=0; i < gender_child.length; i++) {
	  gender_child[i].backgroundColor = "#ffffff";
	  gender_child[i].children[0].color = "#606060";
	};
	
	//var gender = parent({name: "gender"}, e.source);
	console.log(gender);
	gender = e.source.gender;
	
	e.source.children[0].color = "#ffffff";
	e.source.backgroundColor = "red";
}
var sending = false;
function sendMessage(){
	var model = Alloy.createCollection("helpline");
	if($.message.value == "" || sending || $.message.value == $.message._hintText){
		alert("Please write something about your condition.");
		return;
	}
	loading.start();
	sending = true;
	$.message.editable = false;
	var gender_text = (gender != "")?"Gender: "+gender+"\r\n":"";
	var app_id = Math.random().toString(36).substr(2, 10);
	var local_save = [{
		"u_id": u_id,
	    "sender_id": u_id,
	    "message": gender_text+$.message.value,
	    "created": common.now(),
	    "is_endUser": 1,
	    "dr_id": dr_id,
	    "format": "text",
	    "app_id": app_id,
	    "status": 1,
	    "sender_name": user.fullname,
	}];
	
	var id = model.saveArray(local_save);
	console.log({u_id: u_id, dr_id: dr_id, message: gender_text+$.message.value, is_endUser:1, app_id: app_id });
	API.callByPost({url: "sendMessage", params:{u_id: u_id, dr_id: dr_id, message: gender_text+$.message.value, is_endUser:1, app_id: app_id }}, function(responseText){
		socket.fireEvent("doctor:refresh_patient_list");
		var res = JSON.parse(responseText);
		$.message.value = "";
		$.message.editable = true;
		sending = false;
		$.message.blur();
		loading.finish();
		nav.navigateWithArgs("conversation", {dr_id : dr_id, record: args.record});
	});
}

function closeWindow(){
	$.win.close();
}
