var args = arguments[0] || {}; 
var singleton = true; 
common.construct($);
var preset_email = Ti.App.Properties.getString('plux_email') || "";
var loading = Alloy.createController('loading');
$.win.add(loading.getView());
console.log("login open");
closeBox();
$.email.value = preset_email; 
$.mask.hide();
$.signup_pop.hide();

/** To check if keyboard onfocus or onblur**/
var isKeyboardFocus = 0;

function doLogin(){
    var forms_arr = $.forms.getChildren();
    var params = {};
    var error_message = "";
    for (var i=0; i < forms_arr.length; i++) {
        console.log(forms_arr[i].id+" "+forms_arr[i].children[0].value);
        if(forms_arr[i].required && forms_arr[i].children[0].value == ""){
            console.log(_.isUndefined(forms_arr[i].children[0].value)+" _.isEmpty(forms_arr[i].value)");
            error_message += forms_arr[i].children[0].hintText+" cannot be empty\n";
        }
        params[forms_arr[i].id] = forms_arr[i].children[0].value;
    };
    if(error_message != ""){
        alert(error_message);
        return;
    }
    _.extend(params, {
        version: Ti.Platform.version,
        os: Ti.Platform.osname,
        model: Ti.Platform.model,
        macaddress: Ti.Platform.macaddress
    });
    console.log(params);
    loading.start();
    api_login(params);
    
}

function openAndroidHome(){
    console.log('openAndroidHome');
    var win = Alloy.createController("home").getView();
    win.open();
    $.win.close();
}


function api_login(params){
    API.callByPost({url: "pluxLoginUrl", params: params}, 
        function(responseText){
            console.log(responseText);
        var result = JSON.parse(responseText);
        console.log(result);
        if(result.status == "success"){
            _.each(result.data, function(value, key){
                Ti.App.Properties.setString(key, value);
            });
            if(typeof result.data.user_service != "undefined"){
                console.log('yes?');
               _.each(result.data.user_service[0], function(value, key){
                    Ti.App.Properties.setString(key, value);
                }); 
            }
            console.log(typeof result.dependent+' typeof result.dependent');
            if(typeof result.dependent != "undefined"){
               Ti.App.Properties.setString("dependent", JSON.stringify(result.dependent[0]));
            }
            if(OS_IOS){
                var navMenu = Titanium.UI.iOS.createNavigationWindow();
                var win = Alloy.createController("home").getView();
                navMenu.window = win;
                Alloy.Globals.navMenu = navMenu;
                console.log(Alloy.Globals.navMenu);
                Alloy.Globals.navMenu.open();
            }else{
                openAndroidHome();
            }
            $.win.close();
        }else{
            alert(result.data);
        }
        loading.finish();
        
    });
}

function doLogin_old() { 
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

function popSignUp(){
    $.signup_pop.show();
    $.mask.show();
}

function doSignup(){
	var win = Alloy.createController("signup").getView();
	win.open();
}

function doASPSignup(){
	var win = Alloy.createController("asp/signup").getView();
	win.open(); 
	//var nav = require('navigation');
	//nav.navigationWindow("asp/signup", 0);
}

function showForgetPassword(){
    $.mask.show();
	$.forgetPasswordBox.show();
}

function doForgotPassword(){
	if($.box_value.children[0].value == ""){
		closeBox();
		return;
	}
	loading.start();
	params = {
		email:$.box_value.children[0].value 
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
	$.signup_pop.hide();
	$.mask.hide();
}

function openBox(){
	$.forgetPasswordBox.show();
}

$.password.addEventListener("return", function(){
	doLogin();
});

var loginAfterRegister =  function(e){
    Ti.App.removeEventListener('loginAfterRegister', loginAfterRegister);
	var email = e.params.email; 
	var password = e.params.password; 
	
	var params = { 
		email: email,
		password: password 
	};
	_.extend(params, {
        version: Ti.Platform.version,
        os: Ti.Platform.osname,
        model: Ti.Platform.model,
        macaddress: Ti.Platform.macaddress
    });
	api_login(params);	
};
/*
function textFieldOnFocus(e){
    e.source.parent.backgroundColor = "#ffffff";
    if(e.source.value == e.source.hintText){
        e.source.value = "";
        //e.source.color = "#06141c";
    }
}
*/
function textFieldOnBlur(e){
    console.log(e.source.value+" "+e.source.required);
    if(e.source.required && e.source.value == ""){
        //error_message += forms_arr[i].hintText+" cannot be empty\n";
        e.source.parent.backgroundColor = "#e8534c";
    }else{
        e.source.parent.backgroundColor = "#55a939";
    }
    /*if(e.source.value==""){
        e.source.value = e.source.hintText;
        //e.source.color = "#06141c";
    }*/
}

Ti.App.addEventListener('loginAfterRegister', loginAfterRegister);

if(Ti.Platform.osname == "android"){
	$.win.addEventListener('android:back', function (e) { 
		var dialog = Ti.UI.createAlertDialog({
			    cancel: 1,
			    buttonNames: ['Cancel','Confirm'],
			    message: 'Would you like to exit APP?',
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
	Ti.App.removeEventListener('loginAfterRegister', loginAfterRegister);
	$.destroy(); 
});
