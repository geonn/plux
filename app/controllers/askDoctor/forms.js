var args = arguments[0] || {};
var dr_id = "";
var u_id = parseInt(Ti.App.Properties.getString('u_id'));
var gender = "";
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

	gender = e.source.gender;

	e.source.children[0].color = "#ffffff";
	e.source.backgroundColor = "red";
}
var sending = false;
function sendMessage(){
	var model = Alloy.createCollection("chat");
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
		"id": app_id,
	    "sender_id": u_id,
	    "message": gender_text+$.message.value,
	    "created": common.now(),
	    "is_endUser": 1,
	    "dr_id": "",
	    "format": "text",
	    "app_id": app_id,
	    "status": 4,
	    "sender_name": Ti.App.Properties.getString('fullname') || "",
	}];

	var id = model.saveArray(local_save);
	API.callByPost({url: "sendASPPatientMessage",new: true, domain: "FREEJINI_DOMAIN", params:{u_id: u_id, dr_id: dr_id, message: gender_text+$.message.value, is_endUser:1, id: app_id, status: 4 }}, function(responseText){
		//socket.refresh_patient_list();
		Ti.App.fireEvent("refresh_patient_list");
		var res = JSON.parse(responseText);
		//socket.setRoom({room_id: res.data.room_id});
		Ti.App.fireEvent("setRoom", {room_id: res.data.room_id});
		$.message.value = "";
		$.message.editable = true;
		sending = false;
		$.message.blur();
		setTimeout(function(){
		    loading.finish();
            closeWindow();
            nav.navigateWithArgs("askDoctor/conversation", res.data);
		}, 2000);
	});
}

function closeWindow(){
	$.win.close();
}
