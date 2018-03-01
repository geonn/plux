var args = arguments[0] || {};
var nav = Alloy.Globals.navMenu;
common.construct($);
//var view_sms_box = common.CheckboxwithText("Agree to receive SMS Service", {name: "smsme"});
var view_agreement_box = common.CheckboxwithText("I have read and agree to the ","Privacy Policy", {name: "agreets"},"privacy");

var memno = Ti.App.Properties.getString('memno');
var empno = Ti.App.Properties.getString('empno');
var name = Ti.App.Properties.getString('name');

$.name.value = name;
$.memno.value = memno;
$.empno.value = empno;

//$.tc_area.add(view_sms_box);
$.tc_area.add(view_agreement_box);
/** To check if keyboard onfocus or onblur**/
var isKeyboardFocus = 0;

function doAspSignup(){
	common.showLoading();
	var email = $.email.value;
	var password = $.password.value;
	var repassword = $.repassword.value;
	var name = $.email.value;
	var memno = $.memno.value;
	var empno = $.empno.value;
	var mobileno = $.mobileno.value;
	var valid_email = ValidateEmail(email);
	if(!valid_email){
		common.hideLoading();
		return false;
	}
	if(password != repassword){
		common.createAlert("Error", "Password does not match the confirm password.");
		common.hideLoading();
		return false;
	}
	
	//var view_sms = view_sms_box.children[0].children[0].checked;
	var view_agreement = view_agreement_box.children[0].children[0].checked;
	if(view_agreement != "1"){
		common.createAlert("Error", "You must agree to the Privacy Policy to register as ASP member.");
		common.hideLoading();
		return false;
	}
	var params = {
		email: email,
		password: password,
		name: name,
		memno: memno,
		empno: empno,
		mobileno: mobileno,
		//smsme: view_sms,
		agreets: view_agreement
	};
	 
	API.do_asp_signup(params, $);
}

function ValidateEmail(mail)
{
	var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; 
	if(mail.match(mailformat))  
	{  
		return true;  
	}else{  
		alert("You have entered an invalid email address!");  
		return false;  
	}  
}

function hideProductFormKeyboard(e){
	var exception = ["email", "password", "name", "memno", "empno", "mobileno"];

	if(exception.indexOf(e.source.id) >= 0){
		console.log(e.source.id);
		return false;
	} 
	
	$.email.blur();
	$.password.blur();
	$.name.blur();
	$.memno.blur();
	$.empno.blur();
	$.mobileno.blur();
}; 

/*$.doSignup.addEventListener("click", function(){
	nav.navigationWindow("asp/signup", 0);
});*/

/** To fixed keyboard hide/show when textfield is activate**/
$.aspSignUpWin.addEventListener('click',hideProductFormKeyboard);

 
$.btnBack.addEventListener('click', function(){ 
	$.aspSignUpWin.close(); 
});  
