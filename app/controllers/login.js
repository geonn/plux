var args = arguments[0] || {}; 
var singleton = true; 
common.construct($);
var usersPluxModel = Alloy.createCollection('users_plux'); 
var preset_email = Ti.App.Properties.getString('plux_email') || "";
var loading = Alloy.createController('loading');
$.win.add(loading.getView());
console.log("login open");
closeBox();
$.email.value = preset_email; 

/** To check if keyboard onfocus or onblur**/
var isKeyboardFocus = 0;

function doLogin() { 
	loading.start();
	var email = $.email.value;
	var password = $.password.value;
	
	if(email == "" || password == ""){
		common.createAlert('Authentication warning','Please fill in email and password');
		loading.finish();
		return;
	}
	if(singleton){
		singleton = false;
		var params = { 
			email: email,
			password: password 
		};
		API.do_pluxLogin(params, function(success){
			console.log(success+" success");
			if(success){
				var win = Alloy.createController("home").getView();
				//win.open();
				$.win.close();
			}
			singleton = true;
			loading.finish();
		});
	}
}

function doSignup(){
	var win = Alloy.createController("signup").getView();
	win.open(); 
	//nav.navigationWindow("signup", 0);
}

function doASPSignup(){
	var win = Alloy.createController("asp/signup").getView();
	win.open(); 
	//var nav = require('navigation');
	//nav.navigationWindow("asp/signup", 0);
}

function showForgetPassword(){
	$.forgetPasswordBox.show();
}

function doForgotPassword(){
	if($.box_value.value == ""){
		closeBox();
		$.box_value.value = "";
		return;
	}
	loading.start();
	params = {
		email:$.box_value.value 
	};
	API.callByPost({url: "doforgotPassword", params:params}, function(responseText){
		console.log(responseText);
		var res = JSON.parse(responseText);
		alert(res.data);
		closeBox();
		$.box_value.value = "";
		loading.finish();
	});
}

function closeBox(){
	$.forgetPasswordBox.hide();
}

function openBox(){
	$.forgetPasswordBox.show();
}

$.password.addEventListener("return", function(){
	doLogin();
});

if (Ti.Platform.osname == 'iphone') {
	var email = $.email.value;
	var userData = usersPluxModel.getUserByEmail(email);
	if(userData && email != ""){ 
		TouchId.authenticate({
		    reason: "Please place finger print to login PLUX Healthcare",
		    callback: authCB
		});
	}
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
		//nav.closeWindow($.win); 
		$.win.close();
		
		var win = Alloy.createController("home").getView();
		win.open();
	}
};

var loginAfterRegister =  function(e){
	var email = e.params.email; 
	var password = e.params.password; 
	
	var params = { 
			email: email,
			password: password 
		};
	API.do_pluxLogin(params, function(){
		
		console.log("loginAfterRegister");
		common.createAlert("Success", "Plux account registration successful!");
		var win = Alloy.createController("home").getView();
		win.open(); 
		Ti.App.removeEventListener('loginAfterRegister', loginAfterRegister);
		$.win.close();
	});
	
};
Ti.App.addEventListener('touchLogin', touchLogin);
Ti.App.addEventListener('loginAfterRegister', loginAfterRegister);

if(Ti.Platform.osname == "android"){
	$.win.addEventListener('android:back', function (e) { 
		var dialog = Ti.UI.createAlertDialog({
			    cancel: 1,
			    buttonNames: ['Cancel','Confirm'],
			    message: 'Would you like to exit Plux?',
			    title: 'Exit app'
			});
			dialog.addEventListener('click', function(e){
			  
		    	if (e.index === e.source.cancel){
			      //Do nothing
			    }
			    if (e.index === 1){
			    	var activity = Titanium.Android.currentActivity;
					activity.finish();
			    }
			});
			dialog.show(); 
	});
}

$.win.addEventListener("close", function(){
	console.log("window login close");
	Ti.App.removeEventListener('touchLogin', touchLogin);
	Ti.App.removeEventListener('loginAfterRegister', loginAfterRegister);
	$.destroy(); 
});
