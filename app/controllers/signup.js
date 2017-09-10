var args = arguments[0] || {};
var nav = Alloy.Globals.navMenu;
common.construct($);
var loading = Alloy.createController('loading'); 
var view_agreement_box = common.CheckboxwithText("Agree to all the ","terms and conditions", {name: "agreets"},"tnc");
$.tc_area.add(view_agreement_box);
/** To check if keyboard onfocus or onblur**/
var isKeyboardFocus = 0;
$.win.add(loading.getView());
function closeWin(){
	$.win.close();
}

function doSignup(){
	var fullname = $.fullname.value;
	var email = $.email.value;
	var ic_no = $.ic_no.value;
	var password = $.password.value;
	var confirm =  $.confirm.value;
	var view_agreement = view_agreement_box.children[0].children[0].checked;
	
	if(fullname.trim() == ""){
		common.createAlert("Error", "Please fill in your full name");
		return false;
	}
	
	if(ic_no.trim() == ""){
		common.createAlert("Error", "Please fill in your IC number");
		return false;
	}
	 
	if(email.trim() == ""){
		common.createAlert("Error", "Please fill in your email");
		return false;
	}else if(validateEmail(email) != "1"){
		common.createAlert("Error", "Please fill in an valid email");
		return false;	
	}
	
	if(password.trim() == ""){
		common.createAlert("Error", "Please fill in your password");
		return false;
	}
	
	if(confirm.trim() != password.trim()){
		common.createAlert("Error", "Your password are not match");
		return false;
	}
	 
	if(view_agreement != "1"){
		common.createAlert("Error", "You must agree to all the terms and conditions to register as Plux member.");
		return false;
	}
	 
	loading.start();
	var params = {
		fullname: fullname,
		email: email,
		ic_no: ic_no,
		password: password,
		agreets: view_agreement
	};
	 
	API.do_signup(params, $, function(success){
		if(success){
			$.win.close();
			Ti.App.fireEvent('loginAfterRegister',{params: params}); 
		}else{
			
		}
		loading.finish();
	});
}
