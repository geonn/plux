var args = arguments[0] || {};
var loginId = Ti.App.Properties.getString('asp_email');
$.description.text = "You are about to change password for "+loginId;
function submitPassword(){
	common.showLoading();
	var password = $.password.value;
	var confirm = $.password2.value; 
	
	if(password.trim() == ""){
		common.hideLoading();
		common.createAlert("Error", "Please fill in your password");
		return false;
	}
	
	if(confirm.trim() != password.trim()){
		common.hideLoading();
		common.createAlert("Error", "Your password are not match");
		return false;
	}
	
	var params = {
		username: loginId, 
		password: password 
	};
	API.doChangePassword(params, $);
}

if(Ti.Platform.osname == "android"){
	$.btnBack.addEventListener('click', function(){ 
		nav.closeWindow($.changePasswordWin); 
	}); 
}