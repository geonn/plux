var args = arguments[0] || {};

var asp_email = Ti.App.Properties.getString('asp_email');
if(typeof asp_email != "undefined" && asp_email != ""){
	$.asp_logo.hide();
}else{
	$.plux_logo.hide(); 
}


function navProfile(e){
	var target = e.source.mod; 
	
	if(target == "asp"){
		nav.navigationWindow(target+"/profile", 1);  
	}else{
		nav.navigateWithArgs("plux_profile",{});  
	}
}

if(Ti.Platform.osname == "android"){		
	$.btnBack.addEventListener('click', function(){  
		nav.closeWindow($.myProfile); 
	}); 
}