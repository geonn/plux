var args = arguments[0] || {}; 
var singleton = true;
common.construct($);

/** To check if keyboard onfocus or onblur**/
var isKeyboardFocus = 0;

function doLogin() { 
	common.showLoading();
	var email = $.email.value;
	var password = $.password.value;
	
	if(email == "" || password == ""){
		common.createAlert('Authentication warning','Please fill in email and password');
		common.hideLoading();
		return;
	}
	if(singleton){
		//singleton = false;
		var params = { 
			email: email,
			password: password 
		};
		API.do_pluxLogin(params, $ );
	}
}

function hideProductFormKeyboard(e){
	if (e.source.id != 'TextField'  ) {
    	 
    	if(e.source.id == 'email'){
			return false;
		}
		if(e.source.id == 'password'){
			return false;
		} 
		 
		$.email.blur();
		$.password.blur(); 
	}
}; 

$.doSignup.addEventListener("click", function(){ 
	nav.navigationWindow("signup", 0);
});

/** To fixed keyboard hide/show when textfield is activate**/
$.loginWin.addEventListener('click',hideProductFormKeyboard);

$.email.addEventListener('touchend', function(e){
    $.email.focus();
    isKeyboardFocus = 1;
});
$.password.addEventListener('touchend', function(e){
    $.password.focus();
    isKeyboardFocus = 1;
});

$.email.addEventListener("return", function(){
	$.password.focus();
});

$.password.addEventListener("return", function(){
	doLogin();
});

/*** Facebook login***/ 
$.fbloginView.add(FACEBOOK.createLoginButton({
	    top : 10,
	    style : FACEBOOK.BUTTON_STYLE_WIDE
}));  

function loginFacebook(e){
	if (e.success) { 
		common.showLoading();
	    FACEBOOK.requestWithGraphPath('me', {}, 'GET', function(e) {
		    if (e.success) { 
		    	var fbRes = JSON.parse(e.result);
		     	API.updateUserFromFB({
			       	email: fbRes.email,
			       	fbid: fbRes.id,
			       	link: fbRes.link,
			       	name: fbRes.name,
			       	gender:fbRes.gender,
			    }, $);
			   
		    }
		}); 
		FACEBOOK.removeEventListener('login', loginFacebook); 
	}  else if (e.error) {
		       
	} else if (e.cancelled) {
		        
	}  	 
} 
	 
FACEBOOK.addEventListener('login', loginFacebook); 
FACEBOOK.addEventListener('logout', function(e) {
    //alert('Logged out');
});