var args = arguments[0] || {};


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
		nav.closeWindow($.myProfileWin); 
	}); 
}