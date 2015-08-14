var args = arguments[0] || {};
var nav = Alloy.Globals.navMenu;
common.construct($);
//var view_sms_box = common.CheckboxwithText("Agree to receive SMS Service", {name: "smsme"});
var view_agreement_box = common.CheckboxwithText("I have read and agree to the ","Privacy Policy", {name: "agreets"},"https://www.asp-medical-clinic.com.my/EmployeeReg.aspx");

var preset_email = Ti.App.Properties.getString('plux_email') || "";
var preset_password = Ti.App.Properties.getString('plux_password') || "";
$.email.value = preset_email;
$.email.password = preset_password;

//$.tc_area.add(view_sms_box);
$.tc_area.add(view_agreement_box);
/** To check if keyboard onfocus or onblur**/
var isKeyboardFocus = 0;

function doAspSignup(){
	common.showLoading();
	var email = $.email.value;
	var email2 = $.email2.value;
	var password = $.password.value;
	var name = $.email.value;
	var memno = $.memno.value;
	var empno = $.empno.value;
	var mobileno = $.mobileno.value;
	//var view_sms = view_sms_box.children[0].children[0].checked;
	var view_agreement = view_agreement_box.children[0].children[0].checked;
	if(view_agreement != "1"){
		common.createAlert("Error", "You must agree to the Privacy Policy to register as ASP Plux member.");
		return false;
	}
	var params = {
		email: email,
		email2: email2,
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

 

if(Ti.Platform.osname == "android"){
	var nav = require('navigation');
	$.btnBack.addEventListener('click', function(){ 
		nav.closeWindow($.aspSignUpWin); 
	}); 
}
