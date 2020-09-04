var args = arguments[0] || {};
var expandmode = false;
var home = true;

var FirebaseCore = require('firebase.core');
Alloy.Globals.FirebaseAnalytics = require('firebase.analytics');
console.log(FirebaseCore.configure()+" check true or false");
// Get the App Instance ID
Ti.API.info('App Instance ID: ' + Alloy.Globals.FirebaseAnalytics.appInstanceID);

// Log to the Firebase console
Alloy.Globals.FirebaseAnalytics.log('My_Event', { name: "homepage"});

// Set user-property string
Alloy.Globals.FirebaseAnalytics.setUserPropertyString({
  name: 'onn',
  value: 'yes'
});

// Set User-ID
Alloy.Globals.FirebaseAnalytics.userID = 'onn';

Alloy.Globals.FirebaseAnalytics.setScreenNameAndScreenClass({
  screenName: 'HomePage',
  screenClass: "Homepage"
});

//var SCANNER = require("scanner");
var loading = Alloy.createController('loading');
var new_menu = [
	{mod:"conversation", is_asp:1, title: "ASK ME", onClick: navWindow, subtitle: "24 hour helpdesk support", image_path: "/images/menu_image/conversation_square.jpg"},
	{mod:"education/index", is_asp:1, title: "EDUCATION", onClick: navWindow, subtitle: "Latest health info", image_path: "/images/menu_image/education_square.jpg"},
	{mod: "myClaim", is_asp:1, title: "MY CLAIM RECORDS", onClick: navWindow, subtitle: "Entitlement balance and claim history", image_path: "/images/menu_image/myClaim_square.jpg"},
	{mod: "claimSubmission", is_asp:1, title: "CLAIM SUBMISSION", onClick: navWindow, subtitle: "Submit your claim via APP", image_path: "/images/menu_image/claimSubmission_square.jpg"},
	{mod: "inpatient_record", is_asp:1, title: "IN-PATIENT", onClick: navWindow, subtitle: "Admission records", image_path: "/images/menu_image/inpatient_record_square.jpg"},
	{mod: "asp/requestOutpatientGL", is_asp:1, title: "REQUEST GL", onClick: navWindow, subtitle: "Request outpatient GL", image_path: "/images/menu_image/requestOutpatientGL_square.jpg"},
	{mod:"eCard_list", is_asp:1, title: "E-CARD", onClick: navWindow, subtitle: "Principle and family electronic card", image_path: "/images/menu_image/eCard_list_square.jpg"},
	{mod:"askDoctor/forms", is_asp:1, title: "ASK DOCTOR", onClick: navWindow, subtitle: "Online doctor consultation", image_path: "/images/menu_image/askDoctor_square.jpg"},
	{mod:"askDoctor/nutitionist_forms", is_asp:1, title: "ASK NUTRITIONIST", onClick: navWindow, subtitle: "Online nutritionist consultation", image_path: "/images/menu_image/nutrition.jpeg"},
	{mod:"askDoctor/counsellor_forms", is_asp:1, title: "ASK PSYCHOLOGIST", onClick: navWindow, subtitle: "Online Psychologist consultation", image_path: "/images/menu_image/psychology.jpeg"},
	{mod:"askDoctor/pharmacist_forms", is_asp:1, title: "ASK PHARMACIST", onClick: navWindow, subtitle: "Online pharmacist consultation", image_path: "/images/menu_image/pharmacist.png"},
	{mod:"benefit", is_asp:1, title: "FLEXI BENEFIT", onClick: navWindow, subtitle: "Make your benefit more flexible", image_path: "/images/menu_image/benefit_square.jpg"},
	{mod:"myMedicalRecord", is_asp:0, title: "MY MEDICAL RECORD", onClick: navWindow, subtitle: "Blood test or medical report", image_path: "/images/menu_image/myMedicalRecord_square.jpg"},
	{mod:"payslip/index", is_asp:0, title: "PAYSLIP", onClick: navWindow, subtitle: "To check your payslip", image_path: "/images/menu_image/payslip_square.jpg"},
	{mod:"clinicLocator", is_asp:1, title: "CLINIC LOCATOR", onClick: navWindow, subtitle: "Clinic, dental & optical location", image_path: "/images/menu_image/clinicLocator_square.jpg"},
	{mod:"hospital/index", is_asp:1, title: "HOSPITAL LOCATOR", onClick: navWindow, subtitle: "Hospital & specialist location", image_path: "/images/menu_image/clinicLocator_square.jpg"},
	{mod: "myHealth", is_asp:0, title: "My HEALTH", onClick: navWindow, subtitle: "Personal health record", image_path: "/images/menu_image/myHealth_square.jpg"},
	{mod: "appointment/index", is_asp:0, title: "APPOINTMENT", onClick: navWindow, subtitle: "Doctor appointment", image_path: "/images/menu_image/calendar_icon.jpg"},
	{mod: "voucher", is_asp:0, title: "VOUCHER", onClick: navWindow, subtitle: "Health Screening Voucher", image_path: "/images/menu_image/voucher_square.jpeg"},
	//{mod: "myHealth", is_asp:0, title: "My HEALTH", onClick: navWindow, subtitle: "Personal health record", image_path: "/images/menu_image/myHealth_square.jpg"},
	//{mod: "ePharmacy/index", is_asp:0, title: "E-PHARMACY", onClick: navWindow, subtitle: "Order your medication here", image_path: "/images/menu_image/myHealth_square.jpg"},
	//{mod: "reward", is_asp:0, title: "REWARD", onClick: navWindow, target:"reward/index", subtitle: "Gain your health and redeem your point here", image_path: "/images/menu_image/myHealth_square.jpg"},
];
$.shadow_header.hide();
Alloy.Globals.socket.connect({});
var PUSH = require('enablePush');
PUSH.pushNotification({receivedPush: received_push});

setTimeout(function(){
	PUSH.unsubscribeToAll({callback: function(){
		PUSH.subscribeToChannel("sound");
	}});
}, 2000);
/*
var unsubscribed = Ti.App.Properties.getString('unsubscribed') || false;
if(!unsubscribed){
	PUSH.unsubscribe({callback: function(){
		PUSH.loginUser({callback: function(){
			PUSH.pushNotification(received_push);
			PUSH.subscribeToChannel("sound2");
		}});
	}});
}else{
	PUSH.loginUser({callback: function(){
		PUSH.pushNotification(received_push);
	}});
}*/


//enablePush.subscribeToChannel("sound");

function home_refresh(){
	home = true;
}

function received_push(res){
	console.log("push received abc "+home);
	console.log(home+" home");
	var sound = Titanium.Media.createSound({
	    url: "/sound/ding.mp3",
	    preload: true
	});
	if(home){
		sound.play();
	}
		console.log(res);
		if (res.error) {
			
				return;

		}else{
				var data = res.data;
				//data = {target: "chatroom", dr_id: 144, room_id: 10648, u_id: 8347, created: "2018-11-29 20:05:04", updated: "2018-11-29 20:05:04", status: 5};
				//data = {target: "askDoctor/conversation", id: 10843, room_id: 10843, u_id: 8347, created: "2018-12-17 14:41:39", updated: "2018-12-17 14:41:39", dr_id: 144};
				eval("Ti.App.fireEvent('"+data.target+":refresh')");
				var room_id = Ti.App.Properties.getString('room_id');

				if((data.target == "conversation" || data.target == "askDoctor/conversation") && data.room_id != room_id && Alloy.Globals.push_redirect){
					redirect(data);
						}else {
							if(data.extra=="survey"){
								var dialog = Titanium.UI.createOptionDialog({
							        title: 'Incoming Notification',
							        options: ['Open','Cancel'],
							        cancel: 1
							    });
							    dialog.show();
							    dialog.addEventListener('click', function(e) {
							    	if((OS_IOS)?e.cancel != e.index:!e.cancel){
								    	if(e.index == "0"){
								    		redirect(data);
								    	}
					            	}
					            });
				            }
				            console.log("incoming notification");
							syncFromServer();
				}
		}
}

function pixelToDp(px) {
    return ( parseInt(px) / (Titanium.Platform.displayCaps.dpi / 160));
}

function checkserviceByCorpcode(){
	var corpcode = Ti.App.Properties.getString('corpcode');

	if(corpcode != "null"){
		Alloy.Globals.API.callByPost({url:"getCorpPermission", params: {corpcode: corpcode}}, function(responseText){
			var res = JSON.parse(responseText);
			if(res.status == "success"){
				var takeout = res.data;
				for (var i=0; i < takeout.length; i++) {
				  var index = findIndexInData(new_menu, "mod", takeout[i]);

				  if(index >= 0 && new_menu[index].force != 1){
				  	new_menu.splice(index, 1);
				  }

				};

			}
			render_menu();
		});
	}else{
		render_menu();
	}
	$.scrollview.add($.UI.create("Label", {classes: ['wfill','hsize','padding'], color:"#fff", textAlign: "right", text: "ver "+Titanium.App.version}));
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
		var view = $.UI.create("View", {classes:['small_padding'], borderWidth: 3, borderColor: "#ddd", width: cell_width - 10, borderRadius: (cell_width-10)/2, height: (cell_width-10), records: new_menu[i]});//Math.ceil(cell_width*0.666)
		var img = $.UI.create("ImageView", {classes:['wsize'], height: cell_width, touchEnabled: false, image: new_menu[i].image_path});
		var view_2 = $.UI.create("View", {zIndex: 10, touchEnabled: false, classes:['wsize','hsize','vert']});
		var label_title = $.UI.create("Label", {classes:['wfill','hsize','h5','bold'], left: 10, right:10, touchEnabled: false, color: "#fff",  textAlign:"center", text: new_menu[i].title});
		var label2_subtitle = $.UI.create("Label", {classes:['wfill','hsize','h7','bold'], left: 10, right:10, touchEnabled: false, color:"#ffffff", textAlign:"center", text: new_menu[i].subtitle});
		view.add(img);
		view_2.add(label_title);
		view_2.add(label2_subtitle);
		view.add(view_2);
		var img_height = 0;
		img.addEventListener("postlayout", function(e){
			img_height = e.source.parent.rect.height;
			setTimeout(function(ex){
				e.source.parent.add($.UI.create("View", {classes:['wfill','hfill'],touchEnabled: false , height: img_height, zIndex: 10, zIndex: 9,  backgroundColor: "#30000000"}));
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
    }

    if (!hasStoragePermission) {

        permissionsToRequest.push(storagePermission);

    }
}
/**
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
**/
function changeBackground(){
    var pwidth = ((OS_IOS)?Ti.Platform.displayCaps.platformWidth:parseInt(Ti.Platform.displayCaps.platformWidth / (Ti.Platform.displayCaps.logicalDensityFactor || 1), 10));
    var initBackground = [
        {img_path: "/images/background1.jpg", time: 0},
        {img_path: "/images/background2.jpg", time: 10},
        {img_path: "/images/background3.jpg", time: 18},
    ];
    var today = new Date();
    var hours = today.getHours();
    var background_img = (hours > 9)?((hours > 19)?"/images/background3.jpg":"/images/background2.jpg"):"/images/background1.jpg";


    $.daily_background.setImage(background_img);
    if(OS_IOS){
        $.daily_background.width = pwidth+100;
        $.daily_background.verticalMotionEffect = {min: -50, max: 50};
        $.daily_background.horizontalMotionEffect = {min: -50, max: 50};
    }
}

/**********				init				*************/
function init(){
    changeBackground();
	$.win.add(loading.getView());
	loading.start();
	checkserviceByCorpcode();
	var AppVersionControl = require('AppVersionControl');
	AppVersionControl.checkAndUpdate();

	refreshHeaderInfo();

	syncFromServer();
	//PUSH.registerPush();
}

function syncFromServer(){
	loading.start();
	var u_id = Ti.App.Properties.getString('u_id') || "";
	if(u_id == 0){
	    loading.finish();
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

	Alloy.Globals.API.callByPost({url:"getNotificationV2", domain: "FREEJINI_DOMAIN", new:true, params: param}, function(responseText){
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
	Ti.App.fireEvent("askDoctor/conversation:refresh");
	Ti.App.fireEvent("conversation:refresh");
}

function updateNotification(e){
	var model = Alloy.createCollection(e.model);
	var unread_no = model.getCountUnread();
	if(e.target == "helpline"){
		label_helpline.text = unread_no;
	}else{
		$.label_notification.text = unread_no;
		if(OS_IOS){
			Ti.UI.iOS.setAppBadge(unread_no);
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

	var fullname = Ti.App.Properties.getString('fullname') || Ti.App.Properties.getString('name');
	var welcomeText = "Welcome "+fullname || "";

	//$.shadow_myInfo.add(logoutBtn);
	$.shadow_myInfo.add($.UI.create("Label", {text: welcomeText, classes:['welcome_text']}));
	$.myInfo.add($.UI.create("Label", {text: welcomeText, classes:['welcome_text']}));
	
	render_point();
	
}

function render_point(){
	var u_id = Ti.App.Properties.getString('u_id') || "";
		Alloy.Globals.API.callByPost({url: "getMemberPoints", new:true, domain: "FREEJINI_DOMAIN",  params: {u_id: u_id}}, function(responseText)	{
	        var res = JSON.parse(responseText);
			var point_view = $.UI.create("View", {classes:['wsize','hsize','vert']});
			var points = $.UI.create("Label", {classes:['wsize','hsize','h5'], color: "#fff", text: "Points: "+res.data.currentBalance});
			//point_view.add(points);
			Ti.App.Properties.setString('referral_link', res.data.referral_link);
			var sharea_btn = $.UI.create("Label", {text: "POINTS", classes:['h6','wsize','hsize'], right:10, top:12, left:10, color: "#000"});
			var view_share = $.UI.create("View", {backgroundColor: "#fff", classes:['wsize','horz'], height: 40, borderRadius: 20});
			var image_share = $.UI.create("ImageView", {image:"/images/icons/share.png", left:10, top:10, width: 20, height: 20});
			view_share.add(image_share);
			view_share.add(sharea_btn);
			view_share.addEventListener("click", function(){
				Alloy.Globals.nav.navigationWindow("points/index");
			});
			
			/*view_share.addEventListener("click", function(){
				require('com.alcoapps.socialshare').share({
					status 					: res.data.referral_link,
					androidDialogTitle 		: 'Share this APP to get points!',
				//image 					: fileToShare.nativePath,
				});
			});*/
			$.myPoints.add(points);
			$.myPoints.add(view_share);
		});
}

function redirect(e){
	   Alloy.Globals.nav.navigationWindow(e.target,"","", e);
}

function navWindow(e){
	
	var source = (typeof e.source.records != "undefined")?e.source.records:e.source;
	Alloy.Globals.FirebaseAnalytics.setScreenNameAndScreenClass({
	  screenName: source.title,
	  screenClass: source.title
	});
	Alloy.Globals.FirebaseAnalytics.log('My_Event', { name: source.title});
	if(source.mod == "benefit" || source.mod == "eCard_list" || source.mod == "myClaim" || source.mod == "claimSubmission" || source.mod == "notification" ){
		if(source.mod =="notification"){
			Alloy.Globals.nav.navigationWindow("asp/"+source.mod);
		}else{
			Alloy.Globals.nav.navigationWindow("asp/"+source.mod, 1);
		}
	}else if(source.mod == "myHealth"){
		Alloy.Globals.nav.navigationWindow(source.mod+"/index");
	}else if(source.mod == "clinicLocator" || source.mod == "hospital/index"){
		var tar = (source.mod == "hospital/index")?source.mod:"clinic/index";
		var memno = Ti.App.Properties.getString('memno') || "";
		requestLocationPermissions(Ti.Geolocation.AUTHORIZATION_ALWAYS, function(e) {
			if (e.success) {
				if(memno == ""){
            Alloy.Globals.nav.navigationWindow(tar);
        }else{
            Alloy.Globals.nav.navigationWindow(tar, 1);
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

	}else if(source.mod == "conversation"){
		 Alloy.Globals.nav.navigationWindow(source.mod, 1);
	}else if(source.mod == "askDoctor/forms"){
	    	checkNewRoom(source.mod, "doctor");
	}else if(source.mod == "askDoctor/pharmacist_forms"){
	    	checkNewRoom(source.mod, "pharmacist");
	}else if(source.mod == "askDoctor/nutitionist_forms"){
	    checkNewRoom(source.mod, "nutritionist");
	}else if(source.mod == "askDoctor/counsellor_forms"){
	    checkNewRoom(source.mod, "phycologist");
	}else if(source.mod == "profile"){
		var empno = Ti.App.Properties.getString('empno');
		if(typeof empno != "undefined" && empno != ""){
			Alloy.Globals.nav.navigationWindow("asp/profile", 1);
		}else{
			Alloy.Globals.nav.navigationWindow("plux_profile");
		}
	}else if(source.mod == "voucher"){
		var url = "https://dellhs.aspmedic.com/apps/voucher?corpcode="+Ti.App.Properties.getString('corpcode')+"&memno="+Ti.App.Properties.getString('memno')+"&empno="+Ti.App.Properties.getString('empno');
		Alloy.Globals.nav.navigationWindow("webview","","", {title: "Health Screening Voucher",url: url});
	}else{
		console.log(source.mod);
		Alloy.Globals.nav.navigationWindow(source.mod);
	}
}

function checkNewRoom(path, category){
    var u_id = Ti.App.Properties.getString('u_id') || "";
    Alloy.Globals.API.callByPost({url: "getPatientRoomId", new:true, domain: "FREEJINI_DOMAIN",  params: {u_id: u_id, category: category}}, function(responseText){
        var res = JSON.parse(responseText);
        console.log("check here homepage");
        console.log(res);
        var room_id = res.data.room_id || "";
		if(res.status == "error"){
			alert(res.data.error_message);
			return;
		}
        if(room_id != ""){
            Alloy.Globals.socket.setRoom({room_id: room_id});
            //Ti.App.fireEvent("setRoom", {room_id: room_id});
            console.log(category+" Ask "+(category == "phycologist"?"Psychologist":category));
            Alloy.Globals.nav.navigateWithArgs("askDoctor/conversation", {room_id:room_id, from: "Ask "+(category == "phycologist"?"Psychologist":category)});
            home = false;
        }else{
        	var dialog = Titanium.UI.createOptionDialog({
		        title: 'Choose a Language',
		        options: ['English','Melayu','Chinese','Cancel'],
		        cancel: 3
		    });
		    dialog.show();
		    dialog.addEventListener('click', function(e) {
		    	if((OS_IOS)?e.cancel != e.index:!e.cancel){
			    	if(e.index == "0"){
			    		Titanium.Locale.setLanguage("en");
			    	}else if(e.index == "1"){
			    		Titanium.Locale.setLanguage("ms-MY");
			    	}else if(e.index == "2"){
			    		Titanium.Locale.setLanguage("zh");
			    	}
			    	Alloy.Globals.nav.navigateWithArgs(path);
			    	home = false;
            	}
            });
        }
    });
}

function logoutUser(){
	Ti.App.Properties.removeAllProperties();
	var win = Alloy.createController("login").getView();
	win.open();

	if(OS_IOS){
		Alloy.Globals.navMenu.close();
		Alloy.Globals.navMenu = null;
	}else{
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
    //Ti.Android.currentActivity.onResume = syncFromServer;
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
	if (Ti.Geolocation.hasLocationPermissions(authorizationType) || Ti.Geolocation.hasLocationPermissions(Ti.Geolocation.AUTHORIZATION_WHEN_IN_USE)) {
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
    var fullname = Ti.App.Properties.getString('fullname') || "";
    Alloy.Globals.socket.updateUserInfo({fullname: fullname});
}

init();

function checkReminderToRate() {
    var now = new Date().getTime();
    var remindToRate = Ti.App.Properties.getString('RemindToRate');
    if (!remindToRate) {
        Ti.App.Properties.setString('RemindToRate', now);
    }
    else if (remindToRate < now) {
        var alertDialog = Titanium.UI.createAlertDialog({
            title: 'Please rate this app!',
            message: 'Would you take a moment to rate this app?',
            buttonNames: ['OK', 'Remind Me Later', 'Never'],
            cancel: 2
        });
        alertDialog.addEventListener('click', function(evt) {
            switch (evt.index) {
                case 0:
                    Ti.App.Properties.setString('RemindToRate', Number.MAX_VALUE);
                    // NOTE: replace this with your own iTunes link; also, this won't WON'T WORK IN THE SIMULATOR!
                    if (Ti.Android) {
                        try{
                           var intent = Ti.Android.createIntent({
                               action: Ti.Android.ACTION_VIEW,
                               data: "market://details?id=com.plux.healthcare"
                           });
                           Ti.Android.currentActivity.startActivity(intent);
                         }
                         catch(e){
                           Titanium.Platform.openURL("market://details?id=com.plux.healthcare");
                         }
                    }
                    else {
                        Ti.Platform.openURL("https://itunes.apple.com/us/app/asp-healthcare/id1062772627?action=write-review");
                    }
                    break;
                case 1:
                    // "Remind Me Later"? Ok, we'll remind them tomorrow when they launch the app.
                    Ti.App.Properties.setString('RemindToRate', now + (1000 * 60 * 60 * 24));
                    break;
                case 2:
                    Ti.App.Properties.setString('RemindToRate', Number.MAX_VALUE);
                    break;
            }
        });
        alertDialog.show();
    }
}

//checkReminderToRate();
$.win.addEventListener("postlayout", function(){

});

setTimeout(function(){
      Alloy.Globals.push_redirect = false;
}, 2000);


$.win.addEventListener("open", function(){
	//alert("jenny 4");
         if (permissionsToRequest.length > 0) {

            Ti.Android.requestPermissions(permissionsToRequest, function(e) {


                if (e.success) {

                } else {


                }

            });

        }
 });

function onResumed() {
    syncFromServer();
}

$.win.addEventListener("close", function(){
	Ti.App.removeEventListener('resumed', onResumed);
	Ti.App.removeEventListener("getUserInfo", getUserInfo);
	Ti.App.removeEventListener('logout', logoutUser);
	Ti.App.removeEventListener('updateNotification', updateNotification);
	Ti.App.removeEventListener('home:refresh', home_refresh);
	Ti.App.removeEventListener('updateHeader', refreshHeaderInfo);
	Ti.App.removeEventListener('updateMenu', checkserviceByCorpcode);
	$.destroy();
});

$.win.addEventListener("postlayout", function(){
    //PUSH.registerPush();
});

function webview_loaded(){
    var time_offset = parseInt(Ti.App.Properties.getString('time_offset'))+0 || 0;
    Ti.App.fireEvent("connect", {u_id: Ti.App.Properties.getString('u_id') || 0, time_offset: time_offset});
}

Ti.App.addEventListener('home:refresh', home_refresh);
Ti.App.addEventListener("webview_loaded", webview_loaded);
Ti.App.addEventListener("getUserInfo", getUserInfo);
Ti.App.addEventListener('logout', logoutUser);
Ti.App.addEventListener('resumed', onResumed);
Ti.App.addEventListener('updateNotification', updateNotification);
Ti.App.addEventListener('updateMenu', checkserviceByCorpcode);
Ti.App.addEventListener('updateHeader', refreshHeaderInfo);
