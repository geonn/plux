var args = arguments[0] || {};
var expandmode = false;
var usersModel = Alloy.createCollection('users'); 
var loading = Alloy.createController('loading'); 
var usersPluxModel = Alloy.createCollection('users_plux'); 
var notificationModel = Alloy.createCollection('notification'); 
var menu_info;
var new_menu;

common.construct($);
PUSH.registerPush();

function loadHomePageItem(){
	menu_info   = new_menu = [
		{mod:"feedback", image:"/images/btn/btn_feedback.png"},
		{mod:"clinicLocator", image:"/images/btn/btn_clinic_location.png"},
		{mod:"hra", image:"/images/btn/btn_hra.png"},
		{mod:"myMedicalRecord", image:"/images/btn/btn_my_medical_record.png"},
		{mod:"conversation", image:"/images/btn/btn_ask_me.png"},
		{mod:"profile", image:"/images/btn/btn_profile.png"},
		{mod:"claimSubmission", image:"/images/btn/btn_claim_submission.png"},
		{mod:"myClaim", image:"/images/btn/btn_my_claim_detail.png"},
		{mod: "myHealth", image:"/images/btn/btn_my_health.png"},
		{mod: "eCard_list", image:"/images/btn/btn_asp_e_card_pass.png"},
	]; 
}	

function loadingViewFinish(){
	 
	if(OS_IOS){
		$.navMenu.open();
	}else{
		$.win.open();
	}
//	loadingView.finish(function(){
	init();
	//loadingView = null;
	// });
}

if(Ti.Platform.osname != "android"){ 
	Alloy.Globals.navMenu = $.navMenu;
}

function checkserviceByCorpcode(){
	var corpcode = Ti.App.Properties.getString('corpcode');
	 
	new_menu = menu_info;
	if(corpcode != "null"){
		 
		API.callByPost({url:"getCorpPermission", params: {corpcode: corpcode}}, function(responseText){ 
			var res = JSON.parse(responseText);  
			if(res.status == "success"){  
				var takeout = res.data;
				for (var i=0; i < takeout.length; i++) { 
				  var index = findIndexInData(new_menu, "mod", takeout[i]);
				  
				  if(index >= 0){
				  	new_menu.splice(index, 1);
				  }
				  
				};
				 
			}
			render_menu();
		});
	}else{
		 
		render_menu();
	}
	
}

function findIndexInData(data, property, value) {
    var result = -1;
    data.some(function (item, i) {
        if (item[property] === value) {
            result = i;
            return true;
        }
    });
    return result;
}

function render_menu(){
	var button_width = 139;
	
	removeAllChildren($.scrollboard);
	for (var i=0; i < new_menu.length; i++) {
		var topR =10;
		if(i == new_menu.length - 1 || i == new_menu.length - 2){
			topR = 239;
		}
		var imageView_menu = $.UI.create("ImageView", {
			mod: new_menu[i].mod,
			width: button_width,
			left: 5,
			top: topR,
			image: new_menu[i].image,
		});
		//var view = $.UI.create("View", {classes: ['wsize','hsize']});
		//view.add(imageView_menu);
		imageView_menu.addEventListener("click", navWindow);
		$.scrollboard.insertAt({view: imageView_menu, position: 0});
	}
}

/**********				init				*************/ 
function init(){
	$.win.add(loading.getView());
	loading.start();
	loadHomePageItem();
	checkserviceByCorpcode();
	var AppVersionControl = require('AppVersionControl');
	AppVersionControl.checkAndUpdate();
	
	//checkMyHealthData();
	
	syncFromServer(); 
	
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
	setTimeout(function(){
		PUSH.setInApp();
	},2000);
	
}

function syncFromServer(){
	var checker = Alloy.createCollection('updateChecker'); 
	var isUpdate = checker.getCheckerById("2");
	var last_updated ="";
	 
	if(isUpdate != "" ){
		last_updated = isUpdate.updated;
	}  
	var param = { 
		"member_no"	  : Ti.App.Properties.getString('memno'),
		"last_updated" : last_updated
	};
 
	API.callByPost({url:"getNotificationUrl", params: param}, function(responseText){ 
		var res = JSON.parse(responseText);  
		if(res.status == "success"){  
			var record = res.data;
			if(record.length > 0){ 
				record.forEach(function(entry) {
					var param = {
						"id": entry.id || "",
						"member_no": entry.member_no || "",
						"subject":entry.subject || "",
						"message" : entry.message || "",
						"status" : entry.status || 1,
						"url" : entry.url || "", 
						"status" : entry.status || "",
						"expired" : entry.expired || "",
						"detail" : entry.detail || "",
						"created" : entry.created,
						"updated" : entry.updated,
						"from" : "home"
					};
					notificationModel.addData(param);
				});
				 checker.updateModule("2","notificationList",res.last_updated); 
				 updateNotification(); 
			}
		}
		
	});
	
}

function checkMyHealthData(){ 
	var u_id = Ti.App.Properties.getString('u_id') || ""; 
	var checker = Alloy.createCollection('updateChecker');
	var isUpdate = checker.getCheckerById("14", u_id);
	var last_updated ="";
	 
	if(isUpdate != "" ){
		last_updated = isUpdate.updated;
	}
	
	API.callByPost({url: "getHealthDataByUser", params:{u_id: u_id, last_updated: last_updated}}, function(responseText){
 
		var model2 = Alloy.createCollection("health");
		var res2 = JSON.parse(responseText);
		 
		var arr2 = res2.data || null;
		model2.saveArray(arr2);
		
		checker.updateModule(14,"getHealthDataByUser", res2.last_updated, u_id);
	});
}

function updateNotification(){ 
	var ismemno = Ti.App.Properties.getString('memno') || ""; 
	if(ismemno != ""){
		var gotNotification = notificationModel.getCountUnread({member_no: Ti.App.Properties.getString('memno') });  
		//console.log("gotNotification : "+gotNotification);
		if(parseInt(gotNotification) > 0){
			$.notificationText.text = gotNotification;
		}else{
			$.notificationIcon.visible = false;
		}
	}else{
		$.notificationIcon.visible = false;
	} 
	 
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
		
		var welcomeText = (plux_user.fullname != "undefined")?"Welcome, "+plux_user.fullname:"Welcome";
		var welcomeTitle = $.UI.create('Label',{
			text: welcomeText,
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
	}else if(e.source.mod == "conversation"){
		nav.navigationWindow(target, 1);
	}else{
		nav.navigationWindow(target);
	}	
}

function logoutUser(){
	loading.start();
	var isCorpCode = Ti.App.Properties.getString('corpcode');
 	removeAllChildren($.scrollboard);
 	loadHomePageItem(); 
 	new_menu = menu_info; 
	render_menu();
	if(isCorpCode != "" && isCorpCode != "null"  && isCorpCode != null){
		Ti.App.Properties.removeProperty('memno');
		Ti.App.Properties.removeProperty('empno');
		Ti.App.Properties.removeProperty('corpcode'); 
		Ti.App.Properties.removeProperty('asp_email');
		Ti.App.Properties.removeProperty('asp_password'); 
	}else{ 
		Ti.App.Properties.setString('u_id',''); 
		FACEBOOK.logout();
		
		var win = Alloy.createController("login").getView();
		win.open(); 
		
		if(OS_IOS){
			$.navMenu.close();
			Alloy.Globals.navMenu = null;
		}else{
			console.log("window sudah close");
			$.win.close();
		}
		return; 
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
	console.log("start loader lo");
	var loadingView = Alloy.createController("loader");
	loadingView.getView().open();
	loadingView.start();


$.win.addEventListener("close", function(){
	Ti.App.removeEventListener('resumed', syncFromServer);
	Ti.App.removeEventListener('updateNotification', updateNotification); 
	Ti.App.removeEventListener('updateHeader', refreshHeaderInfo); 
	Ti.App.removeEventListener('updateMenu', checkserviceByCorpcode); 
	Ti.App.removeEventListener('app:loadingViewFinish', loadingViewFinish);
	$.destroy();
	 
});

Ti.App.addEventListener('resumed', syncFromServer);
Ti.App.addEventListener('app:loadingViewFinish', loadingViewFinish);
Ti.App.addEventListener('updateNotification', updateNotification); 
Ti.App.addEventListener('updateMenu', checkserviceByCorpcode); 
Ti.App.addEventListener('updateHeader', refreshHeaderInfo); 