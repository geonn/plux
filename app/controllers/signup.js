var args = arguments[0] || {};
var nav = Alloy.Globals.navMenu;
common.construct($);
var view_agreement_box = common.CheckboxwithText("Agree to all the terms and conditions", {name: "agreets"});console.log(view_agreement_box.children[0].children[0].name);
$.tc_area.add(view_agreement_box);
/** To check if keyboard onfocus or onblur**/
var isKeyboardFocus = 0;

function doSignup(){
	var email = $.email.value;
	var password = $.password.value;
	var view_agreement = view_agreement_box.children[0].children[0].checked;
	
	var params = {
		email: email,
		password: password,
		agreets: view_agreement
	};
	console.log(params);
	API.do_signup(params);
}

function hideProductFormKeyboard(e){
	var exception = ["email", "password"];

	if(exception.indexOf(e.source.id) >= 0){
		console.log(e.source.id);
		return false;
	} 
	
	$.email.blur();
	$.password.blur();
}; 

/*$.doSignup.addEventListener("click", function(){
	nav.navigationWindow("asp/signup", 0);
});*/

/** To fixed keyboard hide/show when textfield is activate**/
$.loginWin.addEventListener('click',hideProductFormKeyboard);
