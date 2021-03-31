var args = arguments[0] || {};
var dr_id = "";
var u_id = parseInt(Ti.App.Properties.getString('u_id'));
var gender = "";
var loading = Alloy.createController("loading");
var combo_list = {
	Ethnic: [L('Malay'), L('Chinese'), L('Indian'), L('Other'),L('Cancel')],
	any_medical_condition: [L('Hypertension'), L('Diabetes'), L('Hyperlipidemia'), L('None'), L('Other'),L('Cancel')],
	find_your_diet_intake: [L('Proper_Meal_Time'), L('Skip_Meal'), L('Other'),L('Cancel')],
	exercise_regularly: [L('one_per_week'), L('two_per_week'), L('Everyday'), L('None'), L('Other'),L('Cancel')],
	your_target: [L('Cholesterol_Level'), L('Sugar_Level'), L('Weight_Loss'), L('Other'),L('Cancel')],
	often_oder_food: [L("Yes"), L("No") ,L('Cancel')],
	servings_of_fruits: [L('one_2_per_week'), L('three_4_per_week'), L('None'), L('Other'),L('Cancel')],
	glass_of_plain_water: [L('one_3_per_week'),L('four_6_per_week'),L('seven_9_per_week'),  L('None'), L('Other'), L('Cancel')]
};

function blurAll(source){
	for(var a=0; a<$.forms.children.length; a++){
		if(typeof($.forms.children[a].blur) == "function" && source.id != $.forms.children[a].id){
			$.forms.children[a].blur();
		}
	}
}

function loadComboBoxLocal(e){
	var arr = combo_list[e.source.id];
    e.source.data  = arr;
    e.source.data_arr  = arr;
    
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

function popout(e){
    if(e.source.data.length == null || e.source.data.length <= 0){
        alert("Sorry, the "+e.source.children[0].hintText+" listing is empty. Please contact our helpdesk for help.");
        return;
    }
    var options_arr = e.source.data_arr;
    var dialog = Ti.UI.createOptionDialog({
        cancel: options_arr.length - 1,
        options: options_arr,
        selectedIndex: e.source.selectedIndex || 0,
        title: e.source.HintText
    });
        
    dialog.show(); 
    dialog.addEventListener("click", function(ex){
    	console.log(ex.cancel+" "+ex.index);
        if((OS_IOS)?ex.cancel != ex.index:!ex.cancel){
            e.source.children[0].text = options_arr[ex.index];
            e.source.value = options_arr[ex.index];
            e.source.selectedIndex = ex.index;
        }
    });
}

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
				console.log(forms[i].value);
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
	    "message":message,
	    "created": Alloy.Globals.common.now(),
	    "is_endUser": 1,
	    "dr_id": "",
	    "format": "text",
	    "app_id": app_id,
	    "status": 4,
	    "sender_name": Ti.App.Properties.getString('fullname') || "",
	}];

	var id = model.saveArray(local_save);
	Alloy.Globals.API.callByPost({url: "sendASPPatientMessage",new: true, domain: "FREEJINI_DOMAIN", params:{u_id: u_id, dr_id: dr_id, message: message, is_endUser:1,category: "nutritionist", id: app_id, status: 4 }}, function(responseText){
		Alloy.Globals.socket.refresh_patient_list({});
		//Ti.App.fireEvent("refresh_patient_list");
		var res = JSON.parse(responseText);
		Alloy.Globals.socket.setRoom({room_id: res.data.room_id});
		//Ti.App.fireEvent("setRoom", {room_id: res.data.room_id});
		sending = false;
		setTimeout(function(){
		    loading.finish();
            closeWindow();
            Alloy.Globals._.extend(res.data, {from: "Ask Nutritionist"});
            Alloy.Globals.nav.navigateWithArgs("askDoctor/conversation", res.data);
		}, 2000);
	});
}

function closeWindow(){
	$.win.close();
}
