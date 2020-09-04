var args = {};
var u_id = Ti.App.Properties.getString('u_id') || "";
console.log("index");
function init(){
	var isShowIntro = Ti.App.Properties.getString('isShowIntro') || "";
	var isSignup2 = Ti.App.Properties.getString('signup2');
	console.log(isShowIntro+" "+isSignup2+" "+u_id);
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

				if(OS_IOS){
					var navMenu = Titanium.UI.iOS.createNavigationWindow();
					var win = Alloy.createController("home").getView();
					navMenu.window = win;
					Alloy.Globals.navMenu = navMenu;
					Alloy.Globals.navMenu.open();
				}else{
					var win = Alloy.createController("home").getView();
					win.open();
				}
			}
		}
	}else{
		$.index.win.open();
	}
}

init();

Alloy.Globals.API.callByPost({url: "dateNow"}, function(responseText){
	var res = JSON.parse(responseText);

	if(res.status != "error"){
		Alloy.Globals.common.sync_time(res.data);
	}

});
