var args = arguments[0] || {};

function navProfile(e){
	var target = e.source.mod; 
	
	if(target == "asp"){
		Alloy.Globals.nav.navigationWindow(target+"/profile", 1);  
	}else{
		Alloy.Globals.nav.navigateWithArgs("plux_profile",{});  
	}
}

if(Ti.Platform.osname == "android"){		
	$.btnBack.addEventListener('click', function(){  
		Alloy.Globals.nav.closeWindow($.myProfile); 
	}); 
}