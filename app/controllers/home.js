var args = arguments[0] || {};
var expandmode = false;
var usersModel = Alloy.createCollection('users'); 
refreshHeaderInfo(); 
function refreshHeaderInfo(){
	var auth = require("login");
	removeAllChildren($.myInfo); 
	if(!auth.checkLogin()){ 
		var loginBtn = Ti.UI.createButton({
			backgroundImage : "/images/btn-login.png",
			top: 10,
			right: 10
		});
		
		loginBtn.addEventListener('click', function(){ 
			nav.navigateWithArgs("login",{target : "home"});
		});
		var welcomeTitle = $.UI.create('Label',{
			text: "Welcome guest",
			classes :['welcome_text']
		});
		
		$.myInfo.add(loginBtn);
		$.myInfo.add(welcomeTitle);
	}else{
		var me = usersModel.getUserByMemno();
		var logoutBtn = Ti.UI.createButton({
			backgroundImage : "/images/btn-logout.png",
			top: 10,
			right: 0
		});
		logoutBtn.addEventListener('click', function(){
			var dialog = Ti.UI.createAlertDialog({
				cancel: 1,
				buttonNames: ['Cancel','Confirm'],
				message: 'Would you like to logout?',
				title: 'Logout PLUX'
			});
			dialog.addEventListener('click', function(e){
				if (e.index === e.source.cancel){
				      //Do nothing
				}
				if (e.index === 1){
					logoutUser();
				}
			});
			dialog.show(); 
		});
		var welcomeTitle = $.UI.create('Label',{
			text: "Welcome, "+me.name,
			classes :['welcome_text']
		});
		$.myInfo.add(logoutBtn);
		$.myInfo.add(welcomeTitle);
	}
}	 

Alloy.Globals.navMenu = $.navMenu;
$.scrollboard.addEventListener("scroll", function(e){
	var o = e.source.contentOffset;
	
	if(o.y >= 139 && expandmode){
		$.logo.animate({
	        top: -100,
	        duration: 500
	    }, function(){expandmode = false;});
	}else if(o.y < 139 && !expandmode){
		$.logo.animate({
	        top: 10,
	        duration: 500
	    }, function(){expandmode = true;});
	}else if(o.y < 139){
		$.logo.setTop(o.y+10);
		return ;
	}
});

function navWindow(e){
	var target = e.source.mod;
	var nav = require('navigation');
	if(e.source.mod == "m_eCard" || e.source.mod == "m_myClaim"){
		nav.navigationWindow(target, 1);
	}else{
		nav.navigationWindow(target);
	}	
}

function logoutUser(){
	Ti.App.Properties.setString('memno','');
	refreshHeaderInfo();
}

Ti.App.addEventListener('updateHeader', refreshHeaderInfo);