var args = arguments[0] || {};
var dr_id = "";
var u_id = parseInt(Ti.App.Properties.getString('u_id'));
var gender = "";
var loading = Alloy.createController("loading");
var combo_list = {
	Ethnic: [L('Malay'), L('Chinese'), L('Indian'), L("Other"),L('Cancel')],
	Status: [L('Single'), L('Married'), L('Divorced'), L('Widowed'),L('Cancel')],
	any_medical_condition: [L('Yes'), L('No'),L('Cancel')],
	wish_to_share: [L('Stress'),L('Depression'),L('Loneliness'),L('Anger'),L('Worries'),L('Personality'),L('Family'),L('Career'),L('Financial'),L('Motivation'),L('Health'),L('Other'),L('Cancel')],
	attended_any_counseling: [L('Yes'), L('No'), L('Cancel')]
};

console.log(combo_list['Ethnic']);

function init(){
	$.win.add(loading.getView());
	preset();
}

init();

function loadComboBoxLocal(e){
   	var arr = combo_list[e.source.id];
    e.source.data  = arr;
    e.source.opacity = 1;
    e.source.touchEnabled = true;
}

function ValidateEmail(mail)
{
	var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; 
	if(mail.match(mailformat))  
	{  
		return true;  
	}else{  
		return false;  
	}  
}

function datePicker(e){
	console.log("datePicker clicked");
    var val_date = (typeof e.source.date != "undefined")?e.source.date:new Date();
    var view_container = $.UI.create("View", {classes:['wfill', 'hfill'], zIndex: 50,});
    var mask = $.UI.create("View",{
        classes:['wfill','hfill'],
        backgroundColor: "#80000000"
    });
    var view_box = $.UI.create("View", {classes:['wfill','hsize','vert'], 
    backgroundGradient:{
        type: 'linear',
        colors: [ { color: '#ffffff', offset: 0.0},{ color: '#67b6e1', offset: 0.4 }, { color: '#67b6e1', offset: 0.6 }, { color: '#ffffff', offset: 1.0 } ],
    }, zIndex: 50});
    var picker = $.UI.create("Picker", {
        type:Ti.UI.PICKER_TYPE_DATE,
        value: val_date,
        backgroundColor: "Transparent",
        dateTimeColor: "#ffffff",
        top: 10,
    });
    var ok_button = $.UI.create("Button", {classes:['wfill'], borderRadius:0, height: 50, title: "Select a Date"});
    view_box.add(picker);
    view_box.add(ok_button);
    view_container.add(view_box);
    view_container.add(mask);
    $.win.add(view_container);
    console.log("datepicker added");
    mask.addEventListener("click", function(){ 
        $.win.remove(view_container);
    });
    
    ok_button.addEventListener("click", function(ex){
        var dd = picker.value.getDate();
        var mm = picker.value.getMonth()+1; 
        var yyyy = picker.value.getFullYear();
        e.source.value = dd+'/'+mm+'/'+yyyy;
        e.source.date = picker.value;
        e.source.children[0].text = mm+'/'+dd+'/'+yyyy;
        $.win.remove(view_container);
    });
}

function popout(e){
    if(e.source.data.length == null || e.source.data.length <= 0){
        alert("Sorry, the "+e.source.children[0].hintText+" listing is empty. Please contact our helpdesk for help.");
        return;
    }
    var options_arr = e.source.data;
    var dialog = Ti.UI.createOptionDialog({
        cancel: options_arr.length -1,
        options: options_arr,
        selectedIndex: e.source.selectedIndex || 0,
        title: e.source.HintText
    });
        
    dialog.show(); 
    dialog.addEventListener("click", function(ex){
        if((OS_IOS)?ex.cancel != ex.index:!ex.cancel){
            e.source.children[0].text = options_arr[ex.index];
            e.source.value = options_arr[ex.index];
            e.source.selectedIndex = ex.index;
        }
    });
}

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
	var email = Ti.App.Properties.getString('email') || "";
	$.email.value = email;
	$.name.value = name;
	$.age.value = age;
}

function genderSelect(e){
	var gender_child = $.gender_view.getChildren();
	console.log(gender_child.length+" children! number");
	for (var i=0; i < gender_child.length; i++) {
	  gender_child[i].backgroundColor = "#ffffff";
	  gender_child[i].children[0].color = "#606060";
	};

	e.source.parent.value = e.source.gender;

	e.source.children[0].color = "#ffffff";
	e.source.backgroundColor = "red";
}
var sending = false;
function sendMessage(){
	var model = Alloy.createCollection("chat");
	
	loading.start();
	sending = true;
	
	var forms = $.forms.getChildren();
	var message = "";
	var required = 0;
	
	var error_message = "Please fill in all the required question";
	for (var i=0; i < forms.length - 1; i++) {
		if(forms[i].required == 1){
			if(forms[i].value == ""){
				forms[i].borderWidth = 1;
				forms[i].borderColor = "red";
				required = 1;
			}else{
				forms[i].borderWidth = 0;
				if(forms[i].id == 'email'){
					if(!ValidateEmail(forms[i].value)){
						forms[i].borderWidth = 1;
						forms[i].borderColor = "red";
						required = 1;
						error_message += "\r\nInvalid email address";
					}
				}
				if(forms[i].id == 'age'){
					if(forms[i].value < 1){
						forms[i].borderWidth = 1;
						forms[i].borderColor = "red";
						required = 1;
						error_message += "\r\nAge cannot small than one";
					}
				}
			}
		}
		var msg = (forms[i].value == "")?"-":forms[i].value;
		if(typeof forms[i].newline != "undefined"){
			message += forms[i].hintText+"\r\n "+msg+"\r\n\r\n";
		}else{
			message += forms[i].hintText+"\r\n "+msg+"\r\n";
		}
		
	};
	if(required){
		loading.finish();
		alert(error_message);
		return;
	}
	var app_id = Math.random().toString(36).substr(2, 10);
	var local_save = [{
		"u_id": u_id,
		"id": app_id,
	    "sender_id": u_id,
	    "message": message,
	    "is_endUser": 1,
	    "dr_id": "",
	    "format": "text",
	    "app_id": app_id,
	    "status": 4,
	    "sender_name": Ti.App.Properties.getString('fullname') || "",
	}];

	var id = model.saveArray(local_save);
	Alloy.Globals.API.callByPost({url: "sendASPPatientMessage",new: true, domain: "FREEJINI_DOMAIN", params:{u_id: u_id, dr_id: dr_id,category: "phycologist", message: message, is_endUser:1, id: app_id, status: 4 }}, function(responseText){
		Alloy.Globals.socket.refresh_patient_list({});
		//Ti.App.fireEvent("refresh_patient_list");
		var res = JSON.parse(responseText);
		//Alloy.Globals.socket.setRoom({room_id: res.data.room_id});
		//Ti.App.fireEvent("setRoom", {room_id: res.data.room_id});
		sending = false;
		setTimeout(function(){
		    loading.finish();
		    Alloy.Globals._.extend(res.data, {from: "Ask Psychologist"});
            closeWindow();
            Alloy.Globals.nav.navigateWithArgs("askDoctor/conversation", res.data);
		}, 2000);
	});
}

function closeWindow(){
	$.win.close();
}
