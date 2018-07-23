var args = arguments[0] || {};
var expandmode = false;
var SCANNER = require("scanner"); 
var loading = Alloy.createController('loading');
var new_menu = [
	{mod:"conversation", is_asp:1, title: "ASK ME", onClick: navWindow, subtitle: "24 hour helpdesk support", image_path: "/images/menu_image/conversation.jpg"},
	{mod: "myClaim", is_asp:1, title: "MY CLAIM RECORDS", onClick: navWindow, subtitle: "Entitlement balance and claim history", image_path: "/images/menu_image/myClaim.jpg"},
	{mod: "claimSubmission", is_asp:1, title: "CLAIM SUBMISSION", onClick: navWindow, subtitle: "Submit your claim via APP", image_path: "/images/menu_image/claimSubmission.jpg"},
	{mod: "inpatient_record", is_asp:1, title: "IN-PATIENT", onClick: navWindow, subtitle: "Admission records", image_path: "/images/menu_image/inpatient_record.jpg"},
	{mod: "asp/requestOutpatientGL", is_asp:1, title: "REQUEST GL", onClick: navWindow, subtitle: "Request outpatient GL", image_path: "/images/menu_image/requestOutpatientGL.jpg"},
	{mod:"eCard_list", is_asp:1, title: "E-CARD", onClick: navWindow, subtitle: "Principle and family electronic card", image_path: "/images/menu_image/eCard_list.jpg"},
	{mod:"askDoctor/find_doctor", is_asp:1, title: "ASK DOCTOR", onClick: navWindow, subtitle: "online doctor consultation", image_path: "/images/menu_image/askDoctor.jpg"},
	{mod:"benefit", is_asp:1, title: "FLEXI BENEFIT", onClick: navWindow, subtitle: "make your benefit more flexible", image_path: "/images/menu_image/benefit.jpg"},
	{mod:"myMedicalRecord", is_asp:0, title: "MY MEDICAL RECORD", onClick: navWindow, subtitle: "To record all your blood test or medical report", image_path: "/images/menu_image/myMedicalRecord.jpg"},
	{mod:"clinicLocator", is_asp:0, title: "CLINIC LOCATOR", onClick: navWindow, subtitle: "clinic or hospital location", image_path: "/images/menu_image/clinicLocator.jpg"},
	{mod: "myHealth", is_asp:0, title: "My HEALTH", onClick: navWindow, subtitle: "Personal health record", image_path: "/images/menu_image/myHealth.jpg"},
	//{mod: "aspPay", is_asp:0, title: "ASP PAY", onClick: scanQR, target:"aspPay/index", subtitle: "Use your reward point to pay for the bill", image_path: "/images/menu_image/myHealth.jpg"},
];
$.shadow_header.hide(); 

function checkserviceByCorpcode(){
	var corpcode = Ti.App.Properties.getString('corpcode');

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
			console.log(new_menu.length+" new_menu after checkserviceByCorpcode");
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

var label_notification = $.UI.create("Label", {id:"notificationText", text: 0, color: "#ffffff"});
var label_helpline = $.UI.create("Label", { text: 0, text:0, color: "#ffffff"});

function render_menu(){
     var pwidth = ((OS_IOS)?Ti.Platform.displayCaps.platformWidth:parseInt(Ti.Platform.displayCaps.platformWidth / (Ti.Platform.displayCaps.logicalDensityFactor || 1), 10));
	for (var i=0; i < new_menu.length; i++) {
	    var cell_width = Math.floor(pwidth/2);
	    console.log(cell_width);
	    console.log(Math.ceil(cell_width*0.333));
		var view = $.UI.create("View", {width: cell_width, height: Math.ceil(cell_width*0.666), records: new_menu[i]});
		var img = $.UI.create("ImageView", {classes:['hsize','wfill'], touchEnabled: false, image: new_menu[i].image_path});
		var view_2 = $.UI.create("View", {zIndex: 10, touchEnabled: false, classes:['wsize','hsize','vert']});
		var label_title = $.UI.create("Label", {classes:['wsize','hsize','h5','bold'], touchEnabled: false, color: "#fff",  textAlign:"center", text: new_menu[i].title});
		var label2_subtitle = $.UI.create("Label", {classes:['wsize','hsize','h7','bold'], touchEnabled: false, color:"#ffffff", textAlign:"center", text: new_menu[i].subtitle});
		view.add(img);
		view_2.add(label_title);
		view_2.add(label2_subtitle);
		view.add(view_2);
		var img_height = 0;
		img.addEventListener("postlayout", function(e){
			img_height = e.source.parent.rect.height;
			console.log(img_height+" img_height");
			setTimeout(function(ex){
				e.source.parent.add($.UI.create("View", {classes:['wfill','hfill'],touchEnabled: false , height: img_height, zIndex: 10, zIndex: 9,  backgroundColor: "#60000000"}));
			}, 200);
		});
		view.addEventListener("click", new_menu[i].onClick);
		$.menu.add(view);
	};
	loading.finish();
} 
var permissionsToRequest = [];
if(OS_ANDROID){
    var storePermission = "android.permission.WRITE_EXTERNAL_STORAGE"; 
    var storagePermission = "android.permission.READ_EXTERNAL_STORAGE";
    var hasStorePermission = Ti.Android.hasPermission(storePermission);
    var hasStoragePermission = Ti.Android.hasPermission(storagePermission);
    
    if (!hasStorePermission) {
        permissionsToRequest.push(storePermission);
        Ti.API.info("PUSHED  1.WRITE_EXTERNAL_STORAGE");
    }
     
    if (!hasStoragePermission) {
     
        permissionsToRequest.push(storagePermission);
        Ti.API.info("PUSHED... 2.READ_EXTERNAL_STORAGE");
     
    }
}

function scanQR(){
    if (Ti.Media.hasCameraPermissions()) {          
        SCANNER.openScanner("1");
    }else{
        Ti.Media.requestCameraPermissions(function(e) {
            if(e.success){
                SCANNER.openScanner("1");
            }else{
                alert('You denied permission');
            }   
        });             
    }
}

function qr_callback(e){
    nav.navigationWindow("aspPay/index","","", {merchant: e.merchant,item: e.item, amount: e.amount});
}

function payment_done_callback(){
    console.log("payment_done_callback");
    alert("Your payment has been successful process");
}

Ti.App.addEventListener("payment_done_callback", payment_done_callback);
Ti.App.addEventListener("qr_callback", qr_callback);

/**********				init				*************/ 
function init(){
	console.log("init start");
	$.win.add(loading.getView());
	loading.start();
	checkserviceByCorpcode();
	var AppVersionControl = require('AppVersionControl');
	AppVersionControl.checkAndUpdate();
	
	refreshHeaderInfo(); 
	
	syncFromServer();
	var PUSH = require('push');
	PUSH.registerPush();
}

function syncFromServer(){
	loading.start();
	console.log("syncFromServer");
	var u_id = Ti.App.Properties.getString('u_id') || "";
	if(u_id == 0){
		return;
	}
	var checker = Alloy.createCollection('updateChecker'); 
	var isUpdate = checker.getCheckerById(2, u_id);
	var last_updated ="";
	
	if(isUpdate != "" ){
		last_updated = isUpdate.updated;
	}  
	var param = { 
		"u_id"	  : u_id,
		"last_updated" : last_updated
	};
 
	API.callByPost({url:"getNotificationV2", domain: "FREEJINI_DOMAIN", new:true, params: param}, function(responseText){ 
		var res = JSON.parse(responseText);  
		if(res.status == "success"){
			var arr = res.data;
			
			var notificationModel = Alloy.createCollection('notificationV2'); 
			notificationModel.saveArray(arr);
		 	checker.updateModule(2, "notificationList",res.last_updated, u_id); 
		 	updateNotification({target: "notification", model: "notificationV2"}); 
		 	loading.finish();
		}
	});
	/*
	var isUpdate = checker.getCheckerById(7, u_id);
	var last_updated ="";
	
	if(isUpdate != "" ){
		last_updated = isUpdate.updated;
	}
 	
	API.callByPost({url:"getHelplineMessageV3", params: {u_id: u_id, last_updated: last_updated}}, function(responseText){ 
		var res = JSON.parse(responseText);  
		if(res.status == "success"){
			var arr = res.data;
			var model = Alloy.createCollection("chat");
			model.saveArray(arr);
		 	checker.updateModule(7,"helpline",res.last_updated, u_id); 
		 	updateNotification({target: "helpline", model:"chat"}); 
		 	loading.finish();
		}
	});*/
}

function updateNotification(e){
	console.log("updateNotification");
	console.log(e);
	var model = Alloy.createCollection(e.model); 
	var unread_no = model.getCountUnread(); 
	if(e.target == "helpline"){
		label_helpline.text = unread_no;
	}else{
		$.label_notification.text = unread_no;
		if(OS_IOS){ 
			Ti.UI.setAppBadge(unread_no); 
		}
	}
}

function refreshHeaderInfo(){
	var memno = Ti.App.Properties.getString('memno') || ""; 
	$.shadow_myInfo.removeAllChildren();
	$.myInfo.removeAllChildren();
	var u_id = Ti.App.Properties.getString('u_id');
	
	$.logo.image = (memno == "")?"/images/logo_plux.png":"/images/asp_logo.png";
	$.shadow_logo.image = (memno == "")?"/images/logo_plux.png":"/images/asp_logo.png";
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
			title: 'Logout'
		});
		dialog.addEventListener('click', function(e){
			if (e.index === 1){
				logoutUser();
			}
		});
		dialog.show(); 
	});
	
	var moment = require('alloy/moment');
    $.day.text = moment(new Date()).format("DD");
    $.days.text = moment(new Date()).format("dddd");
    $.month_year.text = moment(new Date()).format("MMMM, YYYY");
    var hour_left = parseInt(moment().endOf('day').fromNow(true));
    var background_image = (hour_left > 6)?"/images/slideshow/morning_2.png":"/images/slideshow/night_1.png";
    $.bg.image = background_image;
    if(hour_left > 6){
        $.win.backgroundColor = "#ffffff";
    }
    
	var fullname = Ti.App.Properties.getString('fullname') || ""; 
	var welcomeText = "Welcome "+fullname || "";
	
	//$.shadow_myInfo.add(logoutBtn);
	$.shadow_myInfo.add($.UI.create("Label", {text: welcomeText, classes:['welcome_text']}));
	$.myInfo.add($.UI.create("Label", {text: welcomeText, classes:['welcome_text']}));
}	 

function redirect(e){
	console.log(e.target);
	nav.navigationWindow(e.target,"","", e.app_param);
} 
 
function navWindow(e){
	var source = (typeof e.source.records != "undefined")?e.source.records:e.source;
	if(source.mod == "eCard" || source.mod == "benefit" || source.mod == "eCard_list" || source.mod == "myClaim" || source.mod == "claimSubmission" || source.mod == "notification" ){
		if(source.mod =="notification"){
			nav.navigationWindow("asp/"+source.mod);  
		}else{
			nav.navigationWindow("asp/"+source.mod, 1);  
		}
		
	}else if(source.mod == "myHealth"){
		nav.navigationWindow(source.mod+"/index"); 
	}else if(source.mod == "clinicLocator"){
		var memno = Ti.App.Properties.getString('memno') || ""; 
		//var hasLocationPermissions = Ti.Geolocation.hasLocationPermissions(Ti.Geolocation.AUTHORIZATION_WHEN_IN_USE);
		//console.log('Ti.Geolocation.hasLocationPermissions', hasLocationPermissions);
		requestLocationPermissions(Ti.Geolocation.AUTHORIZATION_ALWAYS, function(e) {
			if (e.success) {
				if(memno == ""){
                    nav.navigationWindow("clinic/index");
                }else{
                    nav.navigationWindow("clinic/index", 1);
                }
			}else{
				var dialog = Ti.UI.createAlertDialog({
					message : 'You do not have location permissions enabled shake locate needs these to work.',
					ok : 'Got it',
					title : 'Important'
				});
	
				dialog.addEventListener('click', function(e) {
	
					if (OS_IOS) {
	
						Ti.Platform.openURL('app-settings:');
	
					}
	
					if (OS_ANDROID) {
	
						var intent = Ti.Android.createIntent({
							action : 'android.settings.APPLICATION_SETTINGS',
						});
						intent.addFlags(Ti.Android.FLAG_ACTIVITY_NEW_TASK);
						Ti.Android.currentActivity.startActivity(intent);
	
					}
	
				});
	
				dialog.show();
			}
		});
		/*if(hasLocationPermissions){
			contacts({callback: function(){
					console.log('why not calling');
					if(memno == ""){
						nav.navigationWindow("clinic/listing");
					}else{
						nav.navigationWindow("clinic/listing", 1);
					}
				}
			});
			//nav.navigationWindow("clinic/listing", 1);
		}else{
			console.log("permission request");
			
			Ti.Geolocation.requestLocationPermissions(Ti.Geolocation.AUTHORIZATION_WHEN_IN_USE, function(e) {
				if (e.success) {
					if(memno == ""){
						nav.navigationWindow("clinic/listing");
					}else{
						nav.navigationWindow("clinic/listing", 1);
					}
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
		}*/
		
	}else if(source.mod == "conversation"){
		 nav.navigationWindow(source.mod, 1);
	}else if(source.mod == "profile"){
		var empno = Ti.App.Properties.getString('empno');
		if(typeof empno != "undefined" && empno != ""){
			nav.navigationWindow("asp/profile", 1);  
		}else{
			nav.navigationWindow("plux_profile"); 
		}
	}else if(source.mod == "aspPay"){
	   nav.navigationWindow(source.target); 
	}else{
		console.log(source.target+" target");
		nav.navigationWindow(source.mod);
	}	
}

function logoutUser(){
	Ti.App.Properties.removeProperty('fullname');
	Ti.App.Properties.removeProperty('plux_user_status');
	Ti.App.Properties.removeProperty('last_login'); 
	Ti.App.Properties.removeProperty('u_id');
	Ti.App.Properties.removeProperty('ic_no');
	Ti.App.Properties.removeProperty('plux_email');
	Ti.App.Properties.removeProperty('memno');
	Ti.App.Properties.removeProperty('empno');
	Ti.App.Properties.removeProperty('corpcode');
	Ti.App.Properties.removeProperty('cardno');
	Ti.App.Properties.removeProperty("dependent");
	
	var win = Alloy.createController("login").getView();
	win.open(); 
	
	if(OS_IOS){
		Alloy.Globals.navMenu.close();
		Alloy.Globals.navMenu = null;
	}else{
		console.log("window sudah close");
		$.win.close();
	}
}


if(Ti.Platform.osname == "android"){
	/*$.win.addEventListener('android:back', function (e) {
		var dialog = Ti.UI.createAlertDialog({
			cancel: 0,
			buttonNames: ['Cancel','Confirm'],
			message: 'Would you like to logout?',
			title: 'Logout ASP'
		});
		dialog.addEventListener('click', function(e){ 
			if (e.index == 1){ 
				logoutUser();
			} 
		});
		dialog.show(); 
	});*/
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

	// The new cross-platform way to request permissions
	Ti.Contacts.requestContactsPermissions(function(e) {
		console.log('Ti.Contacts.requestContactsPermissions', e);

		if (e.success) {

			// Instead, probably call the same method you call if hasContactsPermissions() is true
			ex.callback();
		} else if (OS_ANDROID) {
			alert('You have denied permission before.');

		} else {

			// We already check AUTHORIZATION_DENIED earlier so we can be sure it was denied now and not before
			alert('You denied permission.');
		}
	});
}

function requestLocationPermissions(authorizationType, callback) {

	// FIXME: Always returns false on Android 6
	// https://jira.appcelerator.org/browse/TIMOB-23135
	if (OS_IOS && !Ti.Geolocation.locationServicesEnabled) {
		return callback({
			success : false,
			error : 'Location Services Disabled'
		});
	}

	// Permissions already granted
	if (Ti.Geolocation.hasLocationPermissions(authorizationType)) {
		return callback({
			success : true
		});
	}

	// On iOS we can determine why we do not have permission
	if (OS_IOS) {

		if (Ti.Geolocation.locationServicesAuthorization === Ti.Geolocation.AUTHORIZATION_RESTRICTED) {
			return callback({
				success : false,
				error : 'Your device policy does not allow Geolocation'
			});

		} else if (Ti.Geolocation.locationServicesAuthorization === Ti.Geolocation.AUTHORIZATION_DENIED) {

			dialogs.confirm({
				title : 'You denied permission before',
				message : 'Tap Yes to open the Settings app to restore permissions, then try again.',
				callback : function() {
					Ti.Platform.openURL(Ti.App.iOS.applicationOpenSettingsURL);
				}
			});

			// return success:false without an error since we've informed the user already
			return callback({
				success : false
			});
		}
	}

	// Request permission
	Ti.Geolocation.requestLocationPermissions(authorizationType, function(e) {

		if (!e.success) {
			return callback({
				success : false,
				error : e.error || 'Failed to request Location Permissions'
			});
		}

		callback({
			success : true
		});

	});
}
var header_height = 0;

$.scrollview.addEventListener("scroll", function(e){
	//console.log(e.x+" "+Math.ceil(pixelToDp(e.y))+" "+menu_top);
	if(e.x > 0){
		return;
	}
	var y = (OS_IOS)?e.y:Math.ceil(pixelToDp(e.y));
	if(y < ( $.header.rect.height - 80)){
		//$.header.animate({top: - y, duration: 0});
		$.shadow_header.hide();
	}else{
		$.shadow_header.show();
	}
});

function getUserInfo(){
    console.log("socket:updateUserInfo");
    var fullname = Ti.App.Properties.getString('fullname') || ""; 
    Ti.App.fireEvent("socket:updateUserInfo", {fullname: fullname});
}

init();

$.win.addEventListener("open", function(){
     if (permissionsToRequest.length > 0 && OS_ANDROID) {
     
        Ti.Android.requestPermissions(permissionsToRequest, function(e) {
            
            Ti.API.info('Requesting Permission', e);
            
            if (e.success) {
     
                console.log("SUCCESS");
     
            } else {
     
                console.log("ERROR: " + e.error);
     
            }
     
        });
     
    }
 });

$.win.addEventListener("close", function(){
	Ti.App.removeEventListener('resumed', syncFromServer);
	Ti.App.removeEventListener("getUserInfo", getUserInfo);
	Ti.App.removeEventListener('syncFromServer', syncFromServer);
	Ti.App.removeEventListener('logout', logoutUser); 
	Ti.App.removeEventListener('updateNotification', updateNotification); 
	//Ti.App.removeEventListener('render_menu', render_menu); 
	Ti.App.removeEventListener('redirect', redirect); 
	Ti.App.removeEventListener('updateHeader', refreshHeaderInfo); 
	Ti.App.removeEventListener('updateMenu', checkserviceByCorpcode); 
	$.destroy();
	 
});

//Ti.App.addEventListener('render_menu', render_menu);
Ti.App.addEventListener("getUserInfo", getUserInfo);
Ti.App.addEventListener('logout', logoutUser); 
Ti.App.addEventListener("redirect", redirect);
Ti.App.addEventListener('resumed', syncFromServer);
Ti.App.addEventListener('syncFromServer', syncFromServer);
Ti.App.addEventListener('updateNotification', updateNotification); 
Ti.App.addEventListener('updateMenu', checkserviceByCorpcode); 
Ti.App.addEventListener('updateHeader', refreshHeaderInfo); 