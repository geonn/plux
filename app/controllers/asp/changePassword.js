var args = arguments[0] || {};
var loading = Alloy.createController("loading");
$.win.add(loading.getView());

function submitPassword(){
    loading.start();
	var password = $.password.value;
	var confirm = $.password2.value; 
	
	if(password.trim() == ""){
		loading.finish();
		Alloy.Globals.common.createAlert("Error", "Please fill in your password");
		return false;
	}
	
	if(confirm.trim() != password.trim()){
		loading.finish();
		Alloy.Globals.common.createAlert("Error", "Your password are not match");
		return false;
	}
	
	var params = {
		password: password 
	};
	Alloy.Globals.API.doChangePassword(params, $, function(){
	    loading.finish();
	});
}

if(Ti.Platform.osname == "android"){
	$.btnBack.addEventListener('click', function(){ 
		Alloy.Globals.nav.closeWindow($.win); 
	}); 
}