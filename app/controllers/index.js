var args = {};
var u_id = Ti.App.Properties.getString('u_id') || "";

function init(){
	var isShowIntro = Ti.App.Properties.getString('isShowIntro') || "";
	var isSignup2 = Ti.App.Properties.getString('signup2');
	if(isShowIntro	!= ""){
		if(u_id == ""){ 
			if(isSignup2 == "yes"){
				var win = Alloy.createController("login").getView();
				win.open(); 
				var win2 = Alloy.createController("asp/signup2").getView();
				win2.open(); 
			}else{ 
				var win = Alloy.createController("login").getView();
				win.open(); 
			}
		}else{
			if(isSignup2 == "yes"){
				var win = Alloy.createController("login").getView();
				win.open(); 
				var win2 = Alloy.createController("asp/signup2").getView();
				win2.open(); 
			}else{ 
				var win = Alloy.createController("home").getView();
			}
		}
	}else{  
		$.index.win.open();
	}
}

init();

API.callByPost({url: "dateNow"}, function(responseText){
	var res = JSON.parse(responseText);
	
	if(res.status != "error"){
		common.sync_time(res.data);
	}
	
});