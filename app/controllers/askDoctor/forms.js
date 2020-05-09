var args = arguments[0] || {};
var dr_id = "";
var u_id = parseInt(Ti.App.Properties.getString('u_id'));
var gender = "";
var loading = Alloy.createController("loading");

function init(){
	$.win.add(loading.getView());
	preset();
}

init();

function hinttextOnFocus(e){
	if(e.source.value == e.source._hintText){
        e.source.value = "";
    }
}


function hinttextOnBlur(e){
	if(e.source.value==""){
        e.source.value = e.source._hintText;
    }
}

function preset(){
	var name = Ti.App.Properties.getString('fullname') || Ti.App.Properties.getString('name');
	var ic = Ti.App.Properties.getString('ic_no') || Ti.App.Properties.getString('ic');
	var age = Ti.App.Properties.getString('age') || "";
	$.name.value = name;
	$.ic.value = ic;
	$.age.value = age;
}

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
		alert("Please write something about your concerns/symptoms.");
		return;
	}
	
	if($.age.value == "" || $.age.value < 1){
		alert("Please enter your age correctly.");
		return;
	}
	if($.message2.value == $.message2._hintText){
		$.message2.value = "";
	}
	
	
	
	if($.name.value == ""){
		alert("Please write your name.");
		return;
	}
	loading.start();
	sending = true;
	$.message.editable = false;
	var gender_text = (gender != "")?"Gender: "+gender+"\r\n":"";
	var name_text = "Name: "+$.name.value+"\r\n";
	var ic_text = "IC: "+$.ic.value+"\r\n";
	var age_text = "Age: "+$.age.value+"\r\n";
	var app_id = Math.random().toString(36).substr(2, 10);
	var local_save = [{
		"u_id": u_id,
		"id": app_id,
	    "sender_id": u_id,
	    "message": name_text+ic_text+age_text+gender_text+"\nHow can we help you today? Please list if you have any concerns/symptoms.\n> "+$.message.value+"\r\n\r\n Please list duration for the symptoms.\n> "+$.message2.value,
	    "created": Alloy.Globals.common.now(),
	    "is_endUser": 1,
	    "dr_id": "",
	    "format": "text",
	    "app_id": app_id,
	    "status": 4,
	    "sender_name": Ti.App.Properties.getString('fullname') || "",
	}];

	var id = model.saveArray(local_save);
	Alloy.Globals.API.callByPost({url: "sendASPPatientMessage",new: true, domain: "FREEJINI_DOMAIN", params:{u_id: u_id, dr_id: dr_id, message: name_text+ic_text+age_text+gender_text+"\nHow can we help you today? Please list if you have any concerns/symptoms.\n> "+$.message.value+"\r\n\r\nPlease list duration for the symptoms.\n> "+$.message2.value, is_endUser:1, id: app_id, status: 4 }}, function(responseText){
		Alloy.Globals.socket.refresh_patient_list({});
		//Ti.App.fireEvent("refresh_patient_list");
		var res = JSON.parse(responseText);
		//Alloy.Globals.socket.setRoom({room_id: res.data.room_id});
		//Ti.App.fireEvent("setRoom", {room_id: res.data.room_id});
		$.message.value = "";
		$.message.editable = true;
		sending = false;
		$.message.blur();
		setTimeout(function(){
		    loading.finish();
            closeWindow();
            Alloy.Globals._.extend(res.data, {from: "Ask Doctor"});
            Alloy.Globals.nav.navigateWithArgs("askDoctor/conversation", res.data);
		}, 2000);
	});
}

function closeWindow(){
	$.win.close();
}
