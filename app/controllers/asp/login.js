var args = arguments[0] || {};
var nav = Alloy.Globals.navMenu;
var singleton = true;
common.construct($);

/** To check if keyboard onfocus or onblur**/
var isKeyboardFocus = 0;

function doLogin() { 
	common.showLoading();
	var username = $.username.value;
	var password = $.password.value;
	
	if(username == "" || password == ""){
		common.createAlert('Authentication warning','Please fill in username and password');
		common.hideLoading();
		return;
	}
	if(singleton){
		//singleton = false;
		API.doLogin(username, password, $, args.target);
	}
}

function doRegister(){
	
}

function hideProductFormKeyboard(e){
	if (e.source.id != 'TextField'  ) {
    	 
    	if(e.source.id == 'username'){
			return false;
		}
		if(e.source.id == 'password'){
			return false;
		} 
		 
		$.username.blur();
		$.password.blur(); 
	}
}; 

$.doSignup.addEventListener("click", function(){
	var nav = require('navigation');
	nav.navigationWindow("asp/signup", 0);
});

/** To fixed keyboard hide/show when textfield is activate**/
$.loginWin.addEventListener('click',hideProductFormKeyboard);

$.username.addEventListener('touchend', function(e){
    $.username.focus();
    isKeyboardFocus = 1;
});
$.password.addEventListener('touchend', function(e){
    $.password.focus();
    isKeyboardFocus = 1;
});

$.username.addEventListener("return", function(){
	$.password.focus();
});

$.password.addEventListener("return", function(){
	doLogin();
});