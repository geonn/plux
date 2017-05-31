var args = arguments[0] || {};
var expandmode = false;
var usersModel = Alloy.createCollection('users'); 
var loading = Alloy.createController('loading'); 
var usersPluxModel = Alloy.createCollection('users_plux'); 

var notificationModel = Alloy.createCollection('notification'); 
var menu_info;
var new_menu = [];

common.construct($);
PUSH.registerPush();

var loadingView = Alloy.createController("loader");
loadingView.getView().open();
loadingView.start();

function loadHomePageItem(){
	menu_info   = new_menu = [
<<<<<<< HEAD
		{mod:"inpatient_record", image:"/images/test.png"},
=======
		{mod:"notification", image:"/images/btn/btn_notification.png"},
>>>>>>> 6ef7403d5af7b3f3ade54ed40058bb95a4a0ea5e
		{mod:"feedback", image:"/images/btn/btn_feedback.png"},
		{mod:"benefit", image:"/images/btn/btn_flexi_benefit.png"},
		{mod:"clinicLocator", image:"/images/btn/btn_clinic_location.png"},
		{mod:"hra", image:"/images/btn/btn_hra.png"},
		{mod:"myMedicalRecord", image:"/images/btn/btn_my_medical_record.png"},
		{mod:"conversation", image:"/images/btn/btn_ask_me.png"},
		{mod:"profile", image:"/images/btn/btn_profile.png"},
		{mod:"claimSubmission", image:"/images/btn/btn_claim_submission.png"},
		{mod:"myClaim", image:"/images/btn/btn_my_claim_detail.png"},
		//{mod:"healthInfo", image:"/images/btn/btn_healthInfo.png"},
		{mod: "myHealth", image:"/images/btn/btn_my_health.png"},
		{mod: "eCard_list", image:"/images/btn/btn_asp_e_card_pass.png"},
		//{mod: "askDoctor/find_doctor", image:"/images/btn/btn_ask_doctor.png"},
	]; 
	console.log(menu_info.length+" loadHomePageItem");
}	

function loadingViewFinish(){
	 
	if(OS_IOS){
		$.navMenu.open();
	}else{
		$.win.open();
	}
	console.log("loadingViewFinish");
	loadingView.finish(function(){
		
	});
	init();
}

if(Ti.Platform.osname != "android"){ 
	Alloy.Globals.navMenu = $.navMenu;
}

console.log("Empno"+Ti.App.Properties.getString("empno")+" corpcode:"+Ti.App.Properties.getString("corpcode"));
function checkserviceByCorpcode(){
	var corpcode = Ti.App.Properties.getString('corpcode');
	 
	new_menu = menu_info;
	console.log(menu_info.length);
	console.log(new_menu.length+" new_menu checkserviceByCorpcode");
	if(corpcode != "null"){
		 console.log(corpcode+" corpcode");
		API.callByPost({url:"getCorpPermission", params: {corpcode: corpcode}}, function(responseText){ 
			var res = JSON.parse(responseText); 
			console.log('why no response?');
			console.log(res); 
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

var notification_number_label = $.UI.create("Label", {id:"notificationText", text: 0, color: "#ffffff"});
function render_menu(){
	var button_width = 139;
	console.log(new_menu.length+" new_menu number");
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
		var view = $.UI.create("View", {classes: ['wsize','hsize']});
		if(new_menu[i].mod == "conversation"){
			var model = Alloy.createCollection("helpline");
			var total = model.getUnread();
			console.log(total+" total unread");
			var view_notification = $.UI.create("View", { top:20, right:15, borderRadius: 15, backgroundColor: "#CE1D1C", width: 30, height: 30});
			var label_notification = $.UI.create("Label", { text: total, color: "#ffffff"});
			view_notification.add(label_notification);
			view.add(imageView_menu);
			view.add(view_notification);
		}else if(new_menu[i].mod == "notification"){
			var total = notificationModel.getCountUnread({member_no: Ti.App.Properties.getString('memno') });  
			console.log(total+" total unread");
			var view_notification = $.UI.create("View", { top:20, right:15, borderRadius: 15, backgroundColor: "#CE1D1C", width: 30, height: 30});
			view_notification.add(notification_number_label);
			view.add(imageView_menu);
			view.add(view_notification);
		}else{
			view.add(imageView_menu);	
		}
		imageView_menu.addEventListener("click", navWindow);
		$.scrollboard.insertAt({view: view, position: 0});
	}
}

/**********				init				*************/ 
function init(){
	console.log("init start");
	$.win.add(loading.getView());
	loading.start();
	loadHomePageItem();
	loadInpatientRecord();
	checkserviceByCorpcode();
	var AppVersionControl = require('AppVersionControl');
	AppVersionControl.checkAndUpdate();
	
	//checkMyHealthData();
	
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
function loadInpatientRecord(e){
	var empno = Ti.App.Properties.getString("empno");
	var corpcode = Ti.App.Properties.getString("corpcode");	
	API.callByGet({url:"ipinv",params:"EMPNO="+empno+"&CORPCODE="+corpcode}, function(responseText){
		var model = Alloy.createCollection("inpatient_record");
		console.log(responseText);
		var res = JSON.parse(responseText);
		var arr = res || undefined;
		model.resetInpatientRecord();		
		model.saveArray(arr);
        var model = null;
        var res = null;
        var arr = null;
	});
	
}
function syncFromServer(){
	console.log("syncFromServer");
	var checker = Alloy.createCollection('updateChecker'); 
	var isUpdate = checker.getCheckerById("2");
	var last_updated ="";
	 
	if(isUpdate != "" ){
		last_updated = isUpdate.updated;
	}  
	var param = { 
		"member_no"	  : Ti.App.Properties.getString('memno') || Ti.App.Properties.getString('ic_no'),
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
	
	var u_id = Ti.App.Properties.getString('u_id') || 0;
	var isUpdate = checker.getCheckerById(7, u_id);
	var last_updated = isUpdate.updated || "";
	var u_id = Ti.App.Properties.getString('u_id') || 0;
	API.callByPost({url:"getHelplineMessageV3", params: {u_id: u_id, last_updated: last_updated}}, function(responseText){
		var model = Alloy.createCollection("helpline");
		var res = JSON.parse(responseText);
		var arr = res.data || undefined;
		model.saveArray(arr);
		checker.updateModule("7","notificationList",res.last_updated, u_id); 
		render_menu();
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
	var gotNotification = notificationModel.getCountUnread({member_no: Ti.App.Properties.getString('memno') });  
	//console.log("gotNotification : "+gotNotification);
	if(parseInt(gotNotification) > 0){
		notification_number_label.text = gotNotification;
	}else{
		notification_number_label.text = 0;
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
	console.log(target+" target");
	if(e.source.mod == "eCard" || e.source.mod == "benefit" || e.source.mod == "eCard_list" || e.source.mod == "myClaim" || e.source.mod == "claimSubmission" || e.source.mod == "notification" ){
		if(e.source.mod =="notification"){
			nav.navigationWindow("asp/"+target);  
		}else{
			nav.navigationWindow("asp/"+target, 1);  
		}
		
	}else if(e.source.mod == "myHealth"){
		nav.navigationWindow(target+"/main"); 
	}else if(e.source.mod == "clinicLocator"){
		var hasLocationPermissions = Ti.Geolocation.hasLocationPermissions(Ti.Geolocation.AUTHORIZATION_ALWAYS);
		console.log('Ti.Geolocation.hasLocationPermissions', hasLocationPermissions);
		
		if(hasLocationPermissions){
			contacts({callback: function(){
					console.log('why not calling');
					nav.navigationWindow("clinic/listing", 1);
				}
			});
			//nav.navigationWindow("clinic/listing", 1);
		}else{
			Ti.Geolocation.requestLocationPermissions(Ti.Geolocation.AUTHORIZATION_ALWAYS, function(e) {
				if (e.success) {
					nav.navigationWindow("clinic/listing", 1);
				}else if (OS_ANDROID) {
					alert('You denied permission for now, forever or the dialog did not show at all because it you denied forever before.');
				}else{
					Ti.UI.createAlertDialog({
					title: 'You denied permission.',
						// We also end up here if the NSLocationAlwaysUsageDescription is missing from tiapp.xml in which case e.error will say so
						message: e.error
					}).show();
	
				}
			});
		}
		
	}else if(e.source.mod == "conversation"){
		nav.navigationWindow(target, 1);
	}else{
		console.log(target+" target");
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
		Ti.App.Properties.removeProperty('memno');
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
	//
Ti.Android.currentActivity.onResume = syncFromServer;
	//Ti.Android.Activity.onResume(syncFromServer);
}

function contacts(ex) {

	// The new cross-platform way to check permissions
	var hasContactsPermissions = Ti.Contacts.hasContactsPermissions();

	if (hasContactsPermissions) {

		// We have to actually use a Ti.Contacts method for the permissions to be generated
		// FIXME: https://jira.appcelerator.org/browse/TIMOB-19933
		if (OS_IOS) {
			
		}

		ex.callback();
	}

	// On iOS we can get information on the reason why we might not have permission
	if (OS_IOS) {

		// Map constants to names
		var map = {};
		map[Ti.Contacts.AUTHORIZATION_AUTHORIZED] = 'AUTHORIZATION_AUTHORIZED';
		map[Ti.Contacts.AUTHORIZATION_DENIED] = 'AUTHORIZATION_DENIED';
		map[Ti.Contacts.AUTHORIZATION_RESTRICTED] = 'AUTHORIZATION_RESTRICTED';
		map[Ti.Contacts.AUTHORIZATION_UNKNOWN] = 'AUTHORIZATION_UNKNOWN';

		// Available since Ti 2.1.3 and always returns AUTHORIZATION_AUTHORIZED on iOS<6 and Android
		var contactsAuthorization = Ti.Contacts.contactsAuthorization;
		console.log('Ti.Contacts.contactsAuthorization', 'Ti.Contacts.' + map[contactsAuthorization]);

		if (contactsAuthorization === Ti.Contacts.AUTHORIZATION_RESTRICTED) {
			return alert('Because permission are restricted by some policy which you as user cannot change, we don\'t request as that might also cause issues.');

		} else if (contactsAuthorization === Ti.Calendar.AUTHORIZATION_DENIED) {
			return dialogs.confirm({
				title: 'You denied permission before',
				message: 'We don\'t request again as that won\'t show the dialog anyway. Instead, press Yes to open the Settings App to grant permission there.',
				callback: editPermissions
			});
		}
	}

	// The new cross-platform way to request permissions
	Ti.Contacts.requestContactsPermissions(function(e) {
		console.log('Ti.Contacts.requestContactsPermissions', e);

		if (e.success) {

			// Instead, probably call the same method you call if hasContactsPermissions() is true
			ex.callback();
		} else if (OS_ANDROID) {
			alert('You don\'t have the required uses-permissions in tiapp.xml or you denied permission for now, forever or the dialog did not show at all because you denied forever before.');

		} else {

			// We already check AUTHORIZATION_DENIED earlier so we can be sure it was denied now and not before
			alert('You denied permission.');
		}
	});
}


$.win.addEventListener("close", function(){
	Ti.App.removeEventListener('resumed', syncFromServer);
	Ti.App.removeEventListener('updateNotification', updateNotification); 
	Ti.App.removeEventListener('render_menu', render_menu); 
	Ti.App.removeEventListener('updateHeader', refreshHeaderInfo); 
	Ti.App.removeEventListener('updateMenu', checkserviceByCorpcode); 
	Ti.App.removeEventListener('app:loadingViewFinish', loadingViewFinish);
	$.destroy();
	 
});
Ti.App.addEventListener('render_menu', render_menu);
Ti.App.addEventListener('resumed', syncFromServer);
Ti.App.addEventListener('app:loadingViewFinish', loadingViewFinish);
Ti.App.addEventListener('updateNotification', updateNotification); 
Ti.App.addEventListener('updateMenu', checkserviceByCorpcode); 
Ti.App.addEventListener('updateHeader', refreshHeaderInfo); 