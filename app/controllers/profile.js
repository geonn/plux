var args = arguments[0] || {};


function navProfile(e){
	var target = e.source.mod; 
	
	if(target == "asp"){
		nav.navigationWindow(target+"/profile", 1);  
	}else{
		nav.navigationWindow("plux_profile", 1);  
	}
}
		