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
			width: "40",
			left: 5,
			right: 5,
			zIndex: 20,
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
			width: "40",
			left: 5,
			right: 5,
			zIndex: 20,
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
	var ract = $.logo.rect;
	/*if(o.y >= 139 && expandmode){
		$.logo.animate({
	        top: -100,
	        duration: 500
	    }, function(){expandmode = false;});
	}
	else if(o.y < 139 && !expandmode){
		$.logo.animate({
	        top: 10,
	        duration: 500
	    }, function(){expandmode = true;});
	}else*/ 
	
	if(o.y > 139){
		var pos = ract.top - (o.y - 139);
		$.logo.setTop(pos);
		$.myinfo_view.setTop(pos+10);
		return ;
	}else if(o.y < 139 && o.y > 0){
		$.logo.animate({
	        top: 10,
	        duration: 500
	    }, function(){});
	    
	    $.myinfo_view.animate({
	        top: 20,
	        duration: 500
	    }, function(){});
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