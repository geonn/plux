var args = arguments[0] || {};


function navProfile(e){
	var target = e.source.mod; 
	
	if(target == "asp"){
		var usersModel = Alloy.createCollection('users');
		var data = usersModel.getOwnerData();
		if(data.isver == "false"){
			var dialog = Ti.UI.createAlertDialog({
				cancel: 1,
				buttonNames: ['Cancel','Confirm'],
				message: 'Your account is not verified yet. Would you like to resend verification to '+Ti.App.Properties.getString('asp_email')+'?',
				title: 'Account Unverified'
			});
			dialog.addEventListener('click', function(e){
				if (e.index === e.source.cancel){
				      //Do nothing
				}
				if (e.index === 1){
					API.resendVerificationEmail();
				}
			});
			dialog.show();  
		}else{
			nav.navigationWindow(target+"/profile", 1);  
		}
		
	}else{
		nav.navigateWithArgs("plux_profile",{});  
	}
}
		