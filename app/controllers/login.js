var args = arguments[0] || {};

var nav = Alloy.Globals.navMenu;


/** To check if keyboard onfocus or onblur**/
var isKeyboardFocus = 0;

function doLogin() {
	/** include required file**/
	var lib_login = require('login');
	var common = require('common');

	var username = $.username.value;
	var password = $.password.value;
	
	if(username == "" || password == ""){
		common.createAlert('Authentication warning','Please fill in username and password');
		return;
	}
	
	lib_login.doLogin(username, password);
}

/** To fixed keyboard hide/show when textfield is activate**/


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