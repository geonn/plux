var args = arguments[0] || {}; 
var singleton = true;
common.construct($);
var usersPluxModel = Alloy.createCollection('users_plux'); 
var preset_email = Ti.App.Properties.getString('plux_email') || "";

$.email.value = preset_email;

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

function doSignup(){
	nav.navigationWindow("signup", 0);
}

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
	   	readPermissions: ['email','public_profile','user_friends'],
	    style : FACEBOOK.BUTTON_STYLE_WIDE
}));  
  
function loginFacebook(e){ 
	if (e.success) { 
		common.showLoading();
	    FACEBOOK.requestWithGraphPath('me', { }, 'GET', function(e) {
	    	 
		    if (e.success) { 
		    	var fbRes = JSON.parse(e.result);
		     	Ti.App.Properties.setString('plux_email',fbRes.email);
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

if (Ti.Platform.osname == 'iphone') {
	TouchId.authenticate({
	    reason: "Please place finger print to login PLUX",
	    callback: authCB
	});
}

function authCB(e){ 
	if(e.success == "1"){
		var email = $.email.value;
		if(email.trim() == ""){
		 	alert( "Email or user not found. Please login manually."); 
		}else{
			Ti.App.fireEvent('touchLogin');
		}
		
	}
}

var touchLogin =  function(){
	var email = $.email.value;
	var userData = usersPluxModel.getUserByEmail(email);
	if(userData && email != ""){ 
		Ti.App.removeEventListener('touchLogin', touchLogin);
		API.getUserService({u_id : userData.id});
		Ti.App.Properties.setString('u_id', userData.id); 
		Ti.App.Properties.setString('plux_email',userData.email);
		Ti.App.fireEvent('updateHeader'); 
		nav.closeWindow($.loginWin);  
	}
};

Ti.App.addEventListener('touchLogin', touchLogin);
