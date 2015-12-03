var args = arguments[0] || {};
var expandmode = false;
var usersModel = Alloy.createCollection('users'); 
var loading = Alloy.createController('loading'); 
var usersPluxModel = Alloy.createCollection('users_plux'); 
var notificationModel = Alloy.createCollection('notification'); 
common.construct($);
init();


if(Ti.Platform.osname != "android"){ 
	Alloy.Globals.navMenu = $.navMenu;
}

/**********				init				*************/ 
function init(){
	$.win.add(loading.getView());
	loading.start();
	var ismemno = Ti.App.Properties.getString('memno') || ""; 
	if(ismemno != ""){
		var gotNotification = notificationModel.getCountUnread({member_no: Ti.App.Properties.getString('memno') });  
		if(gotNotification.total > 0){
			$.notificationText.text = gotNotification.total;
		}else{
			$.notificationIcon.visible = false;
		}
	}else{
			$.notificationIcon.visible = false;
		} 
	
	refreshHeaderInfo(); 
	
	/** app home page background***/
	var initBackground = [
		{img_path: "/images/background1.jpg", time: 0},
		{img_path: "/images/background2.jpg", time: 10},
		{img_path: "/images/background3.jpg", time: 18},
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
	loading.finish();
}

function updateNotification(){ 
	var ismemno = Ti.App.Properties.getString('memno') || ""; 
	if(ismemno != ""){
		var gotNotification = notificationModel.getCountUnread({member_no: Ti.App.Properties.getString('memno') });  
		if(gotNotification.total > 0){
			$.notificationText.text = gotNotification.total;
		}else{
			$.notificationIcon.visible = false;
		}
	}else{
		$.notificationIcon.visible = false;
	} 
	console.log("notification counter refresh");
}

function refreshHeaderInfo(){
	var auth = require("auth_login");
	removeAllChildren($.myInfo); 
	var u_id = Ti.App.Properties.getString('u_id');
	 
	//
	//if(!auth.checkLogin()){  
	if(!auth.checkLogin()){  
		$.logo.image = "/images/logo_plux.png";
		var plux_user = usersPluxModel.getUserById(u_id); 
		 
		var logoutBtn = Ti.UI.createButton({
			backgroundImage : "/images/btn-logout.png",
			width: 40,
			height: 40,
			left: 5,
			right: 5,
			zIndex: 20,
		});
		logoutBtn.addEventListener('click', function(){
			var dialog = Ti.UI.createAlertDialog({
				cancel: 0,
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
		 
		var title_view = $.UI.create("View", {
			width: "auto",
			height: Ti.UI.FILL,
		});
		var welcomeTitle = $.UI.create('Label',{
			text: "Welcome, "+plux_user.fullname,
			classes :['welcome_text']
		});
		
		title_view.add(welcomeTitle);
		$.myInfo.add(logoutBtn);
		$.myInfo.add(title_view);
		
		$.logo.addEventListener('click',function(){ 
			nav.navigationWindow("aboutUs");
		});
	}else{
		$.logo.image = "/images/asp_logo.png";
		var me = usersModel.getUserByMemno();
		var button_view = $.UI.create("View", {
			width: Ti.UI.SIZE,
			height: Ti.UI.FILL,
		});
		var logoutBtn = Ti.UI.createButton({
			backgroundImage : "/images/btn-logout.png",
			width: 40,
			height: 40,
			left: 5,
			right: 5,
		});
		logoutBtn.addEventListener('click', function(){
			var dialog = Ti.UI.createAlertDialog({
				cancel: 0,
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
		var title_view = $.UI.create("View", {
			width: "auto",
			height: Ti.UI.FILL,
		});
		var welcomeTitle = $.UI.create('Label',{
			text: "Welcome, "+me.name,
			classes :['welcome_text']
		});
		
		title_view.add(welcomeTitle);
		button_view.add(logoutBtn);
		
		$.myInfo.add(button_view);
		$.myInfo.add(title_view);
	}
}	 

 
function navWindow(e){
	var target = e.source.mod;  
	if(e.source.mod == "eCard" || e.source.mod == "eCard_list" || e.source.mod == "myClaim" || e.source.mod == "claimSubmission" || e.source.mod == "notification" ){
		nav.navigationWindow("asp/"+target, 1);  
	}else if(e.source.mod == "myHealth"){
		nav.navigationWindow(target+"/main"); 
	}else if(e.source.mod == "clinicLocator"){
		nav.navigateWithArgs("clinic/listing", 1);
	}else{
		nav.navigationWindow(target);
	}	
}

function logoutUser(){
	loading.start();
	var isCorpCode = Ti.App.Properties.getString('corpcode','');
	
	if(isCorpCode != "" ){
		Ti.App.Properties.removeProperty('memno');
		Ti.App.Properties.removeProperty('empno');
		Ti.App.Properties.removeProperty('corpcode'); 
		Ti.App.Properties.removeProperty('asp_email');
		Ti.App.Properties.removeProperty('asp_password');
	}else{
		Ti.App.Properties.setString('u_id',''); 
		FACEBOOK.logout();
		nav.navigateWithArgs("login", {});  
	}
	 
	refreshHeaderInfo(); 
	loading.finish();
}

function setBackground(){
	var home_background = Alloy.createCollection('home_background');
	var today = new Date();
	var hours = today.getHours();
	var bg = home_background.getCategoryByTime(hours);
	
	$.daily_background.setBackgroundImage(bg.img_path);
}

if(Ti.Platform.osname == "android"){
	$.win.addEventListener('android:back', function (e) {
		var dialog = Ti.UI.createAlertDialog({
			cancel: 0,
			buttonNames: ['Cancel','Confirm'],
			message: 'Would you like to logout?',
			title: 'Logout PLUX'
		});
		dialog.addEventListener('click', function(e){ 
			if (e.index == 1){ 
				logoutUser();
			} 
		});
		dialog.show(); 
	});
}

Ti.App.addEventListener('updateNotification', updateNotification); 
Ti.App.addEventListener('updateHeader', refreshHeaderInfo); 