var args = arguments[0] || {};
var expandmode = false;
var usersModel = Alloy.createCollection('users'); 
var usersPluxModel = Alloy.createCollection('users_plux'); 
refreshHeaderInfo(); 
common.construct($);
Alloy.Globals.navMenu = $.navMenu;
/**********				init				*************/
var initBackground = [
	{img_path: "images/background1.jpg", time: 0},
	{img_path: "images/background2.jpg", time: 10},
	{img_path: "images/background3.jpg", time: 18},
];

var initBackgroundData = Ti.App.Properties.getString('initBackgroundData');
initBackgroundData = 0;
if(initBackgroundData != "1"){
	Ti.App.Properties.setString('initBackgroundData',"1");
	var homebgModel = Alloy.createCollection('home_background'); 
	homebgModel.resetCategory();
	for (var i=0; i < initBackground.length; i++) {
		
	    var model = Alloy.createModel('home_background', {img_path: initBackground[i].img_path, time: initBackground[i].time});
		model.save();
	};
}

setBackground();

function refreshHeaderInfo(){
	var auth = require("login");
	removeAllChildren($.myInfo); 
	var u_id = Ti.App.Properties.getString('u_id');
	//
	//if(!auth.checkLogin()){  
	if(!auth.checkLogin()){  
		$.logo.image = "/appicon-60@3x.png";
		var plux_user = usersPluxModel.getUserById(u_id); 
		 
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
			text: "Welcome "+ plux_user.fullname,
			classes :['welcome_text']
		});
		
		$.myInfo.add(logoutBtn);
		$.myInfo.add(welcomeTitle);
	}else{
		$.logo.image = "/asp_logo.png";
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
	
	if(e.source.mod == "eCard" || e.source.mod == "myClaim" || e.source.mod == "profile"){ 
 
		nav.navigationWindow("asp/"+target, 1);  
	}else if(e.source.mod == "myHealth"){
		nav.navigationWindow(target+"/main"); 
	}else if(e.source.mod == "state"){
		nav.navigationWindow("clinic/"+target, 1);  
  
	}else{
		nav.navigationWindow(target);
	}	
}

function logoutUser(){
	Ti.App.Properties.setString('memno','');
	Ti.App.Properties.setString('empno','');
	Ti.App.Properties.setString('corpcode',''); 
	Ti.App.Properties.setString('u_id','');
	Ti.App.Properties.removeProperty('asp_email');
	Ti.App.Properties.removeProperty('asp_password');
	
	refreshHeaderInfo();
	FACEBOOK.logout();
	nav.navigateWithArgs("login", {});  
}

function setBackground(){
	var home_background = Alloy.createCollection('home_background');
	var today = new Date();
	var hours = today.getHours();
	var bg = home_background.getCategoryByTime(hours);
	
	$.daily_background.setBackgroundImage(bg.img_path);
}


Ti.App.addEventListener('updateHeader', refreshHeaderInfo);