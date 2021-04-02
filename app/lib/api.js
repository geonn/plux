/*********************
*** SETTING / API ***
**********************/
var API_DOMAIN = "https://appsapi.aspmedic.com/aida/";
var API_EPHARMACY = "https://epharmacy.freejini.com.my";
var ERECEIPT_DOMAIN = "http://ereceipt.aspmedic.com/aida/";
var FREEJINI_DOMAIN =  "https://app.aspmedic.com";
var VCLINIC_DOMAIN = "https://vclinic.freejini.com.my";
var REZA_DOMAIN = "http://asp.swancount.com";

var url_doLogin		= API_DOMAIN+"login.aspx";
var url_panelList   = API_DOMAIN+"panellist.aspx";

// APP authenticate user and key
var USER  = 'freejini';
var KEY   = '06b53047cf294f7207789ff5293ad2dc';

var getClaimFieldPermission = FREEJINI_DOMAIN+"/api/getClaimFieldPermission?user="+USER+"&key="+KEY;
var syncHealthData = FREEJINI_DOMAIN+"/api/syncHealthData?user="+USER+"&key="+KEY;
var checkAppVersionUrl = FREEJINI_DOMAIN+"/api/checkAppVersion_v2?user="+USER+"&key="+KEY;
var updateUserServiceUrl = FREEJINI_DOMAIN+"/api/updateUserService?user="+USER+"&key="+KEY;
var getUserServiceUrl = FREEJINI_DOMAIN+"/api/getUserService?user="+USER+"&key="+KEY;
var updateToken     = FREEJINI_DOMAIN+"/api/updateToken?user="+USER+"&key="+KEY;
var getCategoryList     = FREEJINI_DOMAIN+"/api/getCategoryList?user="+USER+"&key="+KEY;
var leafletUrl      = FREEJINI_DOMAIN+"/api/getBrochure?user="+USER+"&key="+KEY;
var updateUserFromFB = FREEJINI_DOMAIN+"/api/updateUserFromFB?user="+USER+"&key="+KEY;
var pluxLoginUrl    = FREEJINI_DOMAIN+"/api/pluxLogin?user="+USER+"&key="+KEY;
var pluxDemoLoginUrl    = FREEJINI_DOMAIN+"/api/pluxLogin?user="+USER+"&key="+KEY;
var pluxSignUpUrl   = FREEJINI_DOMAIN+"/api/pluxSignUp?user="+USER+"&key="+KEY;
var healthDataUrl   = FREEJINI_DOMAIN+"/api/syncHealthData?user="+USER+"&key="+KEY;
var removeHealthDataUrl = FREEJINI_DOMAIN+"/api/removeHealthData?user="+USER+"&key="+KEY;
var clinicListUrl 	= FREEJINI_DOMAIN+"/api/getClinicLocator?user="+USER+"&key="+KEY;
var nearbyClinicUrl = FREEJINI_DOMAIN+"/api/searchNearbyClinic?user="+USER+"&key="+KEY;
var doctorListUrl 	= FREEJINI_DOMAIN+"/api/getDoctorList?user="+USER+"&key="+KEY;
var addAppointmentUrl = FREEJINI_DOMAIN+"/api/addAppointment?user="+USER+"&key="+KEY;
var syncAppointmentUrl = FREEJINI_DOMAIN+"/api/syncAppointmentData?user="+USER+"&key="+KEY;
var deleteAppointmentUrl = FREEJINI_DOMAIN+"/api/deleteAppointment?user="+USER+"&key="+KEY;
var syncMedicalUrl = FREEJINI_DOMAIN+"/api/syncMedicalRecords?user="+USER+"&key="+KEY;
var checkMedicalDataUrl = FREEJINI_DOMAIN+"/api/checkMedicalData?user="+USER+"&key="+KEY;
var syncAttachmentssUrl = FREEJINI_DOMAIN+"/api/syncMedicalAttachments?user="+USER+"&key="+KEY;
var getNotificationUrl = FREEJINI_DOMAIN+"/api/getNotification?user="+USER+"&key="+KEY;
var deleteNotification = FREEJINI_DOMAIN+"/api/deleteNotification?user="+USER+"&key="+KEY;
var suggestedAppointmentUrl = FREEJINI_DOMAIN+"/api/suggestedAppointment?user="+USER+"&key="+KEY;
var deleteAttachmentUrl = FREEJINI_DOMAIN+"/api/deleteAttachment?user="+USER+"&key="+KEY;
var changeMedicalRecord = FREEJINI_DOMAIN+"/api/changeMedicalRecord?user="+USER+"&key="+KEY;
var addMedicalAttachment = FREEJINI_DOMAIN+"/api/addMedicalAttachment?user="+USER+"&key="+KEY;
var getCorpPermission = FREEJINI_DOMAIN+"/api/getCorpPermission?user="+USER+"&key="+KEY;
var getMessage = FREEJINI_DOMAIN+"/api/getMessage?user="+USER+"&key="+KEY;
var sendMessage = FREEJINI_DOMAIN+"/api/sendMessage?user="+USER+"&key="+KEY;
var getClinicLocator3 = FREEJINI_DOMAIN+"/api/getClinicLocator3?user="+USER+"&key="+KEY;

var addMessageUrl = FREEJINI_DOMAIN+"/api/addMessage?user="+USER+"&key="+KEY;
var getDoctorByPanel = FREEJINI_DOMAIN+"/api/getDoctorByPanel?user="+USER+"&key="+KEY;
var getSpecialtylist = FREEJINI_DOMAIN+"/api/getSpecialtylist?user="+USER+"&key="+KEY;
var getDoctorPanelBySpecialty = FREEJINI_DOMAIN+"/api/getDoctorPanelBySpecialty?user="+USER+"&key="+KEY;
var getDoctorPanel = FREEJINI_DOMAIN+"/api/getAllDoctorPanel?user="+USER+"&key="+KEY;
var getWorkingHoursByDoctorPanel = FREEJINI_DOMAIN+"/api/getWorkingHoursByDoctorPanel?user="+USER+"&key="+KEY;
var getHelplineMessage = FREEJINI_DOMAIN+"/api/getHelplineMessage?user="+USER+"&key="+KEY;
var getHelplineMessageV2 = FREEJINI_DOMAIN+"/api/getHelplineMessageV2?user="+USER+"&key="+KEY;
var getHelplineMessageV3 = FREEJINI_DOMAIN+"/api/getHelplineMessageV3?user="+USER+"&key="+KEY;
var getHelplineMessageV4 = FREEJINI_DOMAIN+"/api/getHelplineMessageV4?user="+USER+"&key="+KEY;
var sendHelplineMessage = FREEJINI_DOMAIN+"/api/sendHelplineMessage?user="+USER+"&key="+KEY;
var addFeedbackUrl = FREEJINI_DOMAIN+"/api/addFeedback?user="+USER+"&key="+KEY;
var getAppointmentByDoctorPanel = FREEJINI_DOMAIN+"/api/getAppointmentByDoctorPanel?user="+USER+"&key="+KEY;
var getClinicLocator2 = FREEJINI_DOMAIN+"/api/getClinicLocator2?user="+USER+"&key="+KEY;
var getRoomId = FREEJINI_DOMAIN+"/api/getRoomId?user="+USER+"&key="+KEY;
var dateNow = "https://plux.freejini.com.my/main/dateNow";
var getMedicalRecords = FREEJINI_DOMAIN+"/api/getMedicalRecords?user="+USER+"&key="+KEY+"&version=2";
var addUpdateMedicalRecord = FREEJINI_DOMAIN+"/api/addUpdateMedicalRecord?user="+USER+"&key="+KEY;
var getMedicalAttachment = FREEJINI_DOMAIN+"/api/getMedicalAttachment?user="+USER+"&key="+KEY+"&version=2";
var deleteAttachment = FREEJINI_DOMAIN+"/api/deleteAttachment?user="+USER+"&key="+KEY;
var getHealthDataByUser = FREEJINI_DOMAIN+"/api/getHealthDataByUser?user="+USER+"&key="+KEY;
var getPersonalInfoRecords = FREEJINI_DOMAIN+"/api/getPersonalInfoRecords?user="+USER+"&key="+KEY;
var addUpdateRecords = FREEJINI_DOMAIN+"/api/addUpdateRecords?user="+USER+"&key="+KEY;
var changeRecordStatus = FREEJINI_DOMAIN+"/api/changeRecordStatus?user="+USER+"&key="+KEY;
var doforgotPassword = FREEJINI_DOMAIN+"/api/doforgotPassword?user="+USER+"&key="+KEY;
var getRoomList = FREEJINI_DOMAIN+"/api/getRoomList?user="+USER+"&key="+KEY;

var claimunder  = API_DOMAIN+"/claimunder.aspx";
var panelList       = API_DOMAIN+"/panellist.aspx";
var loginUrl        = API_DOMAIN+"/login.aspx";
var changePasswordUrl= API_DOMAIN+"/chgpwd.aspx";
var checkBalanceUrl = API_DOMAIN+"/balchk.aspx";
var getClaimDetailUrl = API_DOMAIN+"/claim.aspx";
var aspSignupUrl 	= API_DOMAIN+"/signup.aspx";
var resendVerifUrl  = API_DOMAIN+"/sendveriemail.aspx";
var getclaimDetailBySeriesUrl = API_DOMAIN+"/claimdetails.aspx";
var getclaimReimbUrl = API_DOMAIN+"/ClaimReimb.aspx";
var aspPreSignupUrl = API_DOMAIN+"/presignup.aspx";
var ifins = API_DOMAIN+"/ifins.aspx";
var ipinv = API_DOMAIN+"/ipinv.aspx";
/**claim submmission***/
var getclaimCategoryUrl = API_DOMAIN+"/claimcategory.aspx";
var getclaimSubmissionUrl = API_DOMAIN+"/ClaimSubmission.aspx";  

//configuration
var defaultRetryTimes = 3;

//API that call in sequence
var APILoadingList = [

	//{url: getDoctorPanel, model: "doctor_panel", checkId: "8"},
	//{url: getClinicLocator2, model: "panelList", checkId: "13"},
	//{url: doctorListUrl, model: "doctors", checkId: "12"},
	//{url: getCategoryList, model: "categorys", checkId: "18"}
]; 


/*********************
**** API FUNCTION*****
**********************/

exports.loadAPIBySequence = function (ex, counter){
	var u_id = Ti.App.Properties.getString('u_id') || 0;
	counter = (typeof counter == "undefined")?0:counter;
	if(counter >= APILoadingList.length){
		Ti.App.fireEvent('app:loadingViewFinish');
		return false;
	}


	var api = APILoadingList[counter];
	var model = Alloy.createCollection(api['model']);
	var url = api['url'];
	var last_updated ="";
	if(api['model']=="helpline"){
		url = url+"&u_id"+u_id;
		var checker = Alloy.createCollection('updateChecker');
		var isUpdate = checker.getCheckerById(api['checkId'], u_id);
		last_updated = (typeof isUpdate.updated != "undefined")?isUpdate.updated:"";
	}else{
		var checker = Alloy.createCollection('updateChecker');
		var isUpdate = checker.getCheckerById(api['checkId']);
		last_updated = (typeof isUpdate.updated != "undefined")?isUpdate.updated:"";
	}
	url = url+"&last_updated="+last_updated;

	 var client = Ti.Network.createHTTPClient({
	     // function called when the response data is available
	     onload : function(e) {
	       var res = JSON.parse(this.responseText);

	       if(res.status == "Success" || res.status == "success"){
	       	/**reset current category**/
			//library.resetCategory();
			/**load new set of category from API**/
	       	var arr = res.data;
	        model.saveArray(arr);
	       }
			Ti.App.fireEvent('app:update_loading_text', {text: APILoadingList[counter]['model']+" loading..."});
			checker.updateModule(APILoadingList[counter]['checkId'],APILoadingList[counter]['model'], res.last_updated);

			counter++;
			Alloy.Globals.API.loadAPIBySequence(ex, counter);
	     },
	     // function called when an error occurs, including a timeout
	     onerror : function(e) {
	     	counter++;
	     	Alloy.Globals.API.loadAPIBySequence(ex, counter);
	     },
	     timeout : 70000  // in milliseconds
	 });
	 if(Ti.Platform.osname == "android"){
	 	client.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	 }

	 client.open("POST", url);
	 // Send the request.
	client.send();
};
exports.updateUserFromFB = function(e, mainView){
	var url = updateUserFromFB+"&email="+e.email+"&fbid="+e.fbid+"&link="+e.link+"&name="+e.name+"&gender="+e.gender;

	var client = Ti.Network.createHTTPClient({
		// function called when the response data is available
		onload : function(e) {
			var res = JSON.parse(this.responseText);
		    if(res.status == "success"){
				if(typeof res.data.user_service != "undefined"){
					for (var i=0; i < res.data.user_service.length; i++) {
					  if(res.data.user_service[i].service_id == 1){
					  	Ti.App.Properties.setString('asp_email', res.data.user_service[i].email);
					  }
					};
				}
	         	/** User session**/
	         	Ti.App.Properties.setString('u_id', res.data.u_id);
	         	Ti.App.Properties.setString('ic_no', res.data.ic_no);
				//Ti.App.Properties.setString('memno', res.data.ic_no);
	         	Ti.App.Properties.setString('facebooklogin', 1);
	         	Alloy.Globals.API.updateNotificationToken();
	         	Alloy.Globals.API.syncHealthData({u_id:res.data.u_id});
	         	Ti.App.fireEvent('updateHeader');
	         	mainView.win.close();

	         	if(typeof Alloy.Globals.navMenu != "undefined" && Alloy.Globals.navMenu != null){
					Alloy.Globals.nav.closeWindow(mainView.win);
				}else{
					var win = Alloy.createController("home").getView();
				}

	         	//
		    }
		},
		// function called when an error occurs, including a timeout
		onerror : function(e) {
		},
		timeout : 70000  // in milliseconds
	});
	// Prepare the connection.
	client.open("GET", url);
	 // Send the request.
	client.send();
};

exports.addAppointment = function(e, callback){
	var url = addAppointmentUrl;
	var client = Ti.Network.createHTTPClient({
	     // function called when the response data is available
	     onload : function(e) {
	     	var res = JSON.parse(this.responseText);
		 	callback({param: res});
	     },
	     // function called when an error occurs, including a timeout
	     onerror : function(e) {
	     },
	     timeout : 50000  // in milliseconds
	 });

	client.open("POST", url);
	client.send(e.param);
};


exports.syncAppointmentData = function(callback){
	var u_id = Ti.App.Properties.getString('u_id') || "";
	if(u_id == ""){
		return false;
	}
	var url = syncAppointmentUrl + "&u_id="+u_id;
	var client = Ti.Network.createHTTPClient({
	     // function called when the response data is available
	     onload : function(e) {
	     	var res = JSON.parse(this.responseText);
		 	callback({param: res});
	     },
	     // function called when an error occurs, including a timeout
	     onerror : function(e) {
	     },
	     timeout : 50000  // in milliseconds
	 });

	client.open("POST", url);
	client.send();
};

exports.checkMedicalDataSync = function(e, callback){
	var u_id = Ti.App.Properties.getString('u_id') || "";
	if(u_id == ""){
		return false;
	}
	var url = checkMedicalDataUrl + "&u_id="+u_id;
	var client = Ti.Network.createHTTPClient({
	     // function called when the response data is available
	     onload : function(e) {
	     	var res = JSON.parse(this.responseText);
		 	callback({param: res});
	     },
	     // function called when an error occurs, including a timeout
	     onerror : function(e) {
	     },
	     timeout : 50000  // in milliseconds
	 });

	client.open("POST", url);
	client.send(e.param);
};

exports.syncAttachments = function(e,onload){
	var u_id = Ti.App.Properties.getString('u_id') || "";
	if(u_id == ""){
		return false;
	}
	var url = syncAttachmentssUrl ;
	var client = Ti.Network.createHTTPClient({
	     // function called when the response data is available
	     onload : function(e) {
			onload && onload(this.responseText);

	     },
	     // function called when an error occurs, including a timeout
	     onerror : function(e) {
	     },
	     timeout : 500000  // in milliseconds
	 });

	client.open("POST", url);
	client.send(e.param);
};

exports.syncMedicalRecords = function(e,callback){
	var u_id = Ti.App.Properties.getString('u_id') || "";
	if(u_id == ""){
		return false;
	}
	var url = syncMedicalUrl ;
	var client = Ti.Network.createHTTPClient({
	     // function called when the response data is available
	     onload : function(e) {
	     	var res = JSON.parse(this.responseText);
		 	callback({param: res});
	     },
	     // function called when an error occurs, including a timeout
	     onerror : function(e) {
	     },
	     timeout : 50000  // in milliseconds
	 });

	client.open("POST", url);
	client.send(e.param);
};

exports.deleteAppointment = function(id, callback){
	var u_id = Ti.App.Properties.getString('u_id') || "";
	if(u_id == ""){
		return false;
	}
	var url = deleteAppointmentUrl + "&id="+id+ "&status=5";
	var client = Ti.Network.createHTTPClient({
	     // function called when the response data is available
	     onload : function(e) {
	     	var res = JSON.parse(this.responseText);
		 	callback({param: res});
	     },
	     // function called when an error occurs, including a timeout
	     onerror : function(e) {
	     },
	     timeout : 50000  // in milliseconds
	 });

	client.open("GET", url);
	client.send();
};

exports.getNearbyClinic = function(e){
	var url = nearbyClinicUrl + "&longitude="+e.longitude + "&latitude="+e.latitude+"&clinicType="+e.clinicType;

	var client = Ti.Network.createHTTPClient({
	     // function called when the response data is available
	     onload : function(e) {
	     	var res = JSON.parse(this.responseText);

	     	if(res.status == "success"){
	     		Ti.App.fireEvent("updateNearbyList", {data:res.data });
	     	}
	     },
	     // function called when an error occurs, including a timeout
	     onerror : function(e) {
	     },
	     timeout : 60000  // in milliseconds
	 });
	 client.open("GET", url);
	 // Send the request.
	 client.send();
};

exports.checkAppVersion = function(callback_download){
	var appVersion = Ti.App.version;
	console.log(appVersion);
	var url = checkAppVersionUrl + "&appVersion="+appVersion+"&appPlatform="+Titanium.Platform.osname;
	var client = Ti.Network.createHTTPClient({
		// function called when the response data is available
		onload : function(e) {
			var result = JSON.parse(this.responseText);

			if(result.status == "error"){
				callback_download && callback_download(result);
			}
		},
		// function called when an error occurs, including a timeout
		onerror : function(e) {
		},
		timeout : 60000  // in milliseconds
	});
	client.open("GET", url);
	client.setRequestHeader('Connection', "close");
	client.send();
};

exports.syncHealthData = function(e){
	var healthModel = Alloy.createCollection('health');
	var records = healthModel.getHealthList();

	var url = healthDataUrl + "&u_id="+e.u_id;
	var client = Ti.Network.createHTTPClient({
	     // function called when the response data is available
	     onload : function(e) {
	     },
	     // function called when an error occurs, including a timeout
	     onerror : function(e) {
	     },
	     timeout : 60000  // in milliseconds
	 });
	 client.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	 client.open("POST", url);
	 // Send the request.
	 client.send({list: JSON.stringify(records)});
};

exports.removeHealthDataById = function(id){
	var u_id = Ti.App.Properties.getString('u_id') || "";
	if(u_id == ""){
		return false;
	}
	var url = removeHealthDataUrl+"&u_id="+u_id+"&h_id="+id;
	//console.log(url);
	var client = Ti.Network.createHTTPClient({
		// function called when the response data is available
		onload : function(e) {
		},
		// function called when an error occurs, including a timeout
		onerror : function(e) {
		},
		timeout : 70000  // in milliseconds
	});
	client.open("GET", url);
	client.send();
};

exports.do_pluxLogin = function(data, callback){
	var url = pluxLoginUrl +"&email="+data.email+"&password="+encodeURIComponent(data.password)+"&version="+Ti.Platform.version+"&os="+Ti.Platform.osname+"&model="+Ti.Platform.model+"&macaddress="+ Ti.Platform.macaddress ;

	var client = Ti.Network.createHTTPClient({
		// function called when the response data is available
		onload : function(e) {
			var result = JSON.parse(this.responseText);
			if(result.status == "error"){
				Alloy.Globals.common.createAlert("Error", result.data);
				callback(false);
				return false;
			}else{
				Ti.App.Properties.setString('fullname', result.data.fullname);
				Ti.App.Properties.setString('plux_user_status', result.data.status);
				Ti.App.Properties.setString('last_login', Alloy.Globals.common.now());
				Ti.App.Properties.setString('u_id', result.data.u_id);
				Ti.App.Properties.setString('ic_no', result.data.ic_no);
				Ti.App.Properties.setString('plux_email',result.data.email);
				Ti.App.Properties.setString('isver', result.data.isver);
				if(typeof result.data.user_service != "undefined"){
					Ti.App.Properties.setString('memno', result.data.user_service[0].memno);
		       		Ti.App.Properties.setString('empno', result.data.user_service[0].empno);
		       		Ti.App.Properties.setString('corpcode', result.data.user_service[0].corpcode);
		       		Ti.App.Properties.setString('cardno', result.data.user_service[0].cardno);
				}
				if(typeof result.dependent != "undefined"){
					Ti.App.Properties.setString('dependent', JSON.stringify(result.dependent));
				}
	       		Alloy.Globals.API.updateNotificationToken();
				/*Ti.App.fireEvent('updateHeader');
				  */
				callback(true);
			}
		},
		// function called when an error occurs, including a timeout
		onerror : function(e) {
		},
		timeout : 70000  // in milliseconds
	});
	client.open("POST", url);
	client.send();
};

exports.do_signup = function(data,mainView, callback){

	var url = pluxSignUpUrl+"&fullname="+data.fullname+"&ic_no="+data.ic_no+"&email="+data.email+"&password="+data.password+"&password2="+data.password;
  	var params = {
			email: data.email,
			password: data.password
	};

	var client = Ti.Network.createHTTPClient({
		// function called when the response data is available
		onload : function(e) {
			var result = JSON.parse(this.responseText);
			if(result.status == "error"){
				Alloy.Globals.common.createAlert("Error", result.data);
				callback(false);
			}else{
				callback(true);
				mainView.win.close();
			}
		},
		// function called when an error occurs, including a timeout
		onerror : function(e) {
			console.log(e);
		},
		timeout : 70000  // in milliseconds
	});
	client.open("GET", url);
	client.send();
};

exports.do_asp_presignup = function(data, handle){
	var url = aspPreSignupUrl+"?MEMNO="+data.memno+"&EMPNO="+data.empno;
	var u_id = Ti.App.Properties.getString('u_id') || "";
	var client = Ti.Network.createHTTPClient({
	     // function called when the response data is available
	     onload : function(e) {
	       var ret = [];
	       var result = JSON.parse(this.responseText);
	       res = result[0];
	       if(typeof res.message != "undefined" && res.message != null){
	       		 Alloy.Globals.common.createAlert("Error",res.message);
	       		 handle.finish();
	       }else{
	       		Ti.App.Properties.setString('memno', res.memno);
	       		Ti.App.Properties.setString('empno', res.empno);
	       		Ti.App.Properties.setString('corpcode', res.corpcode);
	       		Ti.App.Properties.setString('corpname', res.corpname);
	       		Ti.App.Properties.setString('name', res.name);
	       		Ti.App.Properties.setString('signup2', "yes");
	       		handle.finish();
	       		handle.callback();
	       }
	     },
	     // function called when an error occurs, including a timeout
	     onerror : function(e) {
	     	Alloy.Globals.common.createAlert("Sign Up Fail", e.error);
	     	handle.finish();
	     },
	     timeout : 60000  // in milliseconds
	 });
	 // Prepare the connection.
	 client.open("GET", encodeURI(url));
	 // Send the request.
	 client.send();
};

exports.do_asp_signup = function(data, handler){

	var url = aspSignupUrl+"?EMAIL="+data.email+"&EMAIL2="+data.email2+"&PASSWORD="+data.password+"&NAME="+data.name+"&MEMNO="+data.memno+"&EMPNO="+data.empno+"&MOBILENO="+data.mobileno+"&SMSME=1&AGREETS="+data.agreets;
	var u_id = Ti.App.Properties.getString('u_id') || "";
	var client = Ti.Network.createHTTPClient({
	     // function called when the response data is available
	     onload : function(e) {
	       var ret = [];
	       var result = JSON.parse(this.responseText);
	       res = result[0];
	       if(typeof res.message !== "undefined" && res.message != null){
	       		 Alloy.Globals.common.createAlert("Error",res.message);
	       		 handler.finish();
	       }else{
	       		Ti.App.Properties.setString('memno', res.memno);
	       		Ti.App.Properties.setString('empno', res.empno);
	       		Ti.App.Properties.setString('corpcode', res.corpcode);
	       		Ti.App.Properties.setString('email', data.email);
	       		Ti.App.Properties.setString('name', res.name);
	       		Ti.App.Properties.setString('signup2', "");
	       		if(u_id != ""){
	       			updateUserService(u_id, 1, data.email, data.password);
	       		}else{
	       			/*var params = {
						fullname: data.name,
						email: data.email,
						password: data.password,
						ic_no: res.memno,
						agreets: 1
					};

					Alloy.Globals.API.plux_signup(params);*/
					setTimeout(function(){
						api_login({
							email: data.email,
							password: data.password,
							version: Ti.Platform.version,
					        os: Ti.Platform.osname,
					        model: Ti.Platform.model,
					        macaddress: Ti.Platform.macaddress
						});
					}, 1000);
	       		}
	       		handler.onload();
	       }
	     },
	     // function called when an error occurs, including a timeout
	     onerror : function(e) {
	     	Alloy.Globals.common.createAlert("Sign Up Fail", e.error);
	     	loading.finish();
	     },
	     timeout : 60000  // in milliseconds
	 });
	 // Prepare the connection.
	 client.open("GET", encodeURI(url));
	 // Send the request.
	 client.send();
};

function api_login(params){
    Alloy.Globals.API.callByPost({url: "pluxLoginUrl", params: params}, 
        function(responseText){
        var result = JSON.parse(responseText);
        console.log(result);
        if(result.status == "success"){
            _.each(result.data, function(value, key){
                Ti.App.Properties.setString(key, value);
            });
            if(typeof result.data.user_service != "undefined"){
               _.each(result.data.user_service[0], function(value, key){
                    Ti.App.Properties.setString(key, value);
                }); 
            }
            if(typeof result.dependent != "undefined"){
               Ti.App.Properties.setString("dependent", JSON.stringify(result.dependent[0]));
            }
        }else{
            alert(result.data);
        }
    });
}

exports.resendVerificationEmail = function(){
	var url = resendVerifUrl+"?LOGINID="+ Ti.App.Properties.getString('email');
	var client = Ti.Network.createHTTPClient({
	     // function called when the response data is available
	     onload : function(e) {
	       Alloy.Globals.common.createAlert("Success", "Verification email sent!");
	     },
	     // function called when an error occurs, including a timeout
	     onerror : function(e) {
	     	Alloy.Globals.common.createAlert("Error", "Unable connect to the server. Please try again later.");
	     	Alloy.Globals.common.hideLoading();
	     },
	     timeout : 130000  // in milliseconds
	 });
	 // Prepare the connection.
	 client.open("GET", encodeURI(url));
	 // Send the request.
	 client.send();
};

exports.doLogin = function(username, password, mainView, target, callback) {
	var u_id = Ti.App.Properties.getString('u_id') || "";
	var url = loginUrl+"?LOGINID="+encodeURIComponent(username)+"&PASSWORD="+encodeURIComponent(password);

	var client = Ti.Network.createHTTPClient({
	     // function called when the response data is available
	     onload : function(e) {
	       var ret = [];
	       var result = JSON.parse(this.responseText);
	       res = result[0];
	       if(typeof res.message != "undefined" && res.message != null){
	       		 Alloy.Globals.common.createAlert("Error",res.message);
	       		 Alloy.Globals.common.hideLoading();
	       }else{
	       		Ti.App.Properties.setString('memno', res.memno);
	       		Ti.App.Properties.setString('empno', res.empno);
	       		Ti.App.Properties.setString('corpcode', res.corpcode);
	       		Ti.App.Properties.setString('email', username);
	       		Ti.App.Properties.setString('cardno', res.cardno);
	       		Ti.App.Properties.setString("empno_1",res.empno);
	       		Ti.App.Properties.setString("corpcode_1",res.corpcode);
	       		updateUserService(u_id, 1,username, password);
	       		Alloy.Globals.API.updateNotificationToken();
	       		Ti.App.fireEvent('updateMenu');


	       		if(target != 'refresh'){
	       			Alloy.Globals.nav.closeWindow(mainView.aspLoginWin);
					Ti.App.fireEvent('updateHeader');
					var toRedirect = false;
					if(target != "" && target != "home"){
						Alloy.Globals.API.callByPost({url:"getCorpPermission", params: {corpcode: res.corpcode}}, function(responseText){
						var res = JSON.parse(responseText);

						var splitRes = target.split("/");

						var myTarget = splitRes[0];
						if(splitRes.length > 1){
							myTarget = splitRes[1];
						}

						if(res.status == "success"){
							var takeout = res.data;
							for (var i=0; i < takeout.length; i++) {

							  if(myTarget == takeout[i]){
							  	Alloy.Globals.common.createAlert("Error", "You are not allowed to view this section",function(){

							  	});
							  	toRedirect = false;
							  	return false;
							  }


							};

							Alloy.Globals.nav.navigationWindow(target);

						}

					});
						if(toRedirect ==true ){
							Alloy.Globals.nav.navigationWindow(target);
						}

					}

	       		}else{
	       			callback();
	       		}

	       }


	     },
	     // function called when an error occurs, including a timeout
	     onerror : function(e) {
	     	Alloy.Globals.common.createAlert("Error", "Unable connect to the server. Please try again later.");
	     	Alloy.Globals.common.hideLoading();

	     },
	     timeout : 70000  // in milliseconds
	 });
	 // Prepare the connection.
	 client.open("GET", url);
	 // Send the request.
	 client.send();
};

exports.doChangePassword = function(e, mainView, onfinish) {
    var LOGINID = Ti.App.Properties.getString('email');
	var url = changePasswordUrl+"?LOGINID="+LOGINID+"&NEW_PASSWORD="+e.password;

	var client = Ti.Network.createHTTPClient({
	     // function called when the response data is available
	     onload : function(e) {
	       var ret = [];
	       var result = JSON.parse(this.responseText);
	       res = result[0];
	        //GEO TO EDIT
	        if(res.code == "99"){ //success
	        	Alloy.Globals.common.createAlert("Done", res.message);
	        	Alloy.Globals.nav.closeWindow(mainView.win);
	        }else{
	        	Alloy.Globals.common.createAlert("Error", res.message);
	        	onfinish();
	        	return false;
	        }

	     },
	     // function called when an error occurs, including a timeout
	     onerror : function(e) {
	     	Alloy.Globals.common.createAlert("Error", "Unable connect to the server. Please try again later.");
	     	onfinish();

	     },
	     timeout : 60000  // in milliseconds
	 });
	 // Prepare the connection.
	 client.open("GET", encodeURI(url));
	 // Send the request.
	 client.send();
};

exports.claimDetailBySeries = function(e, callback){
	var url = getclaimDetailBySeriesUrl+"?SERIAL="+e.serial;
	console.log(url);
	var retryTimes = (typeof e.retryTimes != "undefined")?e.retryTimes: defaultRetryTimes;
	var client = Ti.Network.createHTTPClient({
		// function called when the response data is available
	     onload : function(e) {
	       var ret = [];
	       var res = JSON.parse(this.responseText);

	       callback(res[0]);
	       //Ti.App.fireEvent("load_claim_detail");
	     },
	     // function called when an error occurs, including a timeout
	     onerror : function(ex) {
	     	retryTimes --;

	     	if(retryTimes !== 0 && Titanium.Network.online){
	     		_.extend(e, {retryTimes: retryTimes});
	     		//Alloy.Globals.API.claimDetailBySeries(e);
	     	}else{
	     		Ti.App.fireEvent("load_claim_detail");
	     	}
	     },
	     timeout : 70000  // in milliseconds
	});

	// Prepare the connection.
	 client.open("GET", encodeURI(url));
	 // Send the request.
	 client.send();
};

// update user device token
exports.updateNotificationToken = function(e){
	var deviceToken = Ti.App.Properties.getString('deviceToken');
	var memno = Ti.App.Properties.getString('memno');
	var u_id = Ti.App.Properties.getString('u_id') || "";
	if(deviceToken != ""){
		var url = updateToken+"&token="+deviceToken+"&member_no="+memno+"&u_id="+u_id;

		var client = Ti.Network.createHTTPClient({
		     // function called when the response data is available
		     onload : function(e) {

		       var res = JSON.parse(this.responseText);

		       if(res.status == "success"){

		       }
		     },
		     // function called when an error occurs, including a timeout
		     onerror : function(e) {
		     },
		     timeout : 60000  // in milliseconds
		 });
		 // Prepare the connection.
		 client.open("GET", url);
		 // Send the request.
		 client.send();
	}

};

exports.callByGet  = function(e, handler){
	var domain = (typeof e.domain != "undefined")?eval(e.domain):API_DOMAIN;
    var url = (e.fullurl)?e.url:domain+e.url+"?user="+USER+"&key="+KEY;
	url =  url+"&"+e.params;
	console.log("callByGet");
	console.log(url);
	var timestart = new Date();
	var _result = contactServerByGet(encodeURI(url));
	_result.onload = function(e) {
		console.log(url);
		var timeend = new Date();
		var dif = timeend.getTime() - timestart.getTime();
		console.log(timeend);
		console.log(dif/1000);
		
	    if(e.skipJSON){
            _.isFunction(handler.onload) && handler.onload(this.responseText);
            _.isFunction(handler.onfinish) && handler.onfinish(this.responseText);
            return ;
        }
        try{
            JSON.parse(this.responseText);
        }
        catch(e){
        	console.log(url+" error");
        	console.log(e);
            Alloy.Globals.common.createAlert("Whoops","There is a problem with the server, please try again later.", handler.onerror);
            //_.isFunction(handler.onerror) && handler.onerror(this.responseText);
            //_.isFunction(handler.onfinish) && handler.onfinish(this.responseText);
            return;
        }
        _.isFunction(handler.onload) && handler.onload(this.responseText);
        _.isFunction(handler.onfinish) && handler.onfinish(this.responseText);
	};

	_result.onerror = function(ex) {
		console.log(url);
		if(ex.code == "-1009"){       //The Internet connection appears to be offline.
            Alloy.Globals.common.createAlert("Error", ex.error, handler.onerror);
            return;
        }else{
        	Alloy.Globals.common.createAlert("Error", ex.error, handler.onerror);
        }
        
        return;
        if(_.isNumber(e.retry_times)){
            e.retry_times --;
            if(e.retry_times > 0){
                Alloy.Globals.API.callByGet(e, handler);
            }else{
                console.log('onerror msg');
                console.log(ex);
                Alloy.Globals.common.createAlert("Error", ex.error, handler.onerror);
                //_.isFunction(handler.onerror) && handler.onerror(this.responseText);
                //_.isFunction(handler.onfinish) && handler.onfinish(this.responseText);
            }
        }else{
            console.log('onerror msg without no');
            console.log(ex);
            e.retry_times = 2;
            Alloy.Globals.API.callByGet(e, handler);
        }
	};
};

function updateUserService(u_id, service_id, email, password){
	var url =  updateUserServiceUrl+"&u_id="+u_id+"&service_id="+service_id+"&email="+email+"&password="+password;

	var client = Ti.Network.createHTTPClient({
	     onload : function(e) {
	     	var res = JSON.parse(this.responseText);

	     },
	     onerror : function(e) { },
	     timeout : 60000  // in milliseconds
	 });
	 // Prepare the connection.
	 client.open("GET", url);
	 // Send the request.
	 client.send();
}

function contactServerByGet(url) {
	var client = Ti.Network.createHTTPClient({
		timeout : 30000
	});
  	var reward_token = Ti.App.Properties.getString('reward_token') || "";

	client.open("GET", url);
	client.setRequestHeader('Content-Type', "application/json");
	client.setRequestHeader('Connection', "close");
	client.setRequestHeader('Authorization', "Bearer "+reward_token);
	client.send();
	return client;
};

function contactServerByPostVideo(url,params) {
	var client = Ti.Network.createHTTPClient({
		timeout : 50000
	});

	//client.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	client.open("POST", url);
	client.onsendstream = function(e) {
	    console.log( Math.floor(e.progress * 100) + "%");
	};
	client.send(params);
	return client;
};

function contactServerByPost(url,params) {
	var client = Ti.Network.createHTTPClient({
		timeout : 60000
	});
	/*if(OS_ANDROID){
	 	client.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	 }*/
	var reward_token = Ti.App.Properties.getString('reward_token') || "";
	client.open("POST", url);
	console.log("after contactServerByPost");
	client.setRequestHeader('Connection', "close");
	client.send(params);
	return client;
};

exports.callByPostImage = function(e, onload, getParam){
	var url =  eval(e.url)+e.params;
	var _result = contactServerByPostImage(url, e.image || {});
	_result.onload = function(e) {
		onload && onload(this.responseText);
	};

	_result.onerror = function(e) {
		onerror && onerror();
	};
};

function contactServerByPostImage(url,photo) {
	var client = Ti.Network.createHTTPClient({
		timeout : 50000
	});

	//client.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	client.open("POST", url);
	client.send({Filedata: photo});
	return client;
};

var callByPost_error_popup = false;
exports.callByPost = function(e, onload, onerror){
	var timestart = new Date();
	var retryTimes = (typeof e.retryTimes != "undefined")?e.retryTimes: defaultRetryTimes;
	var deviceToken = Ti.App.Properties.getString('deviceToken');
	if(deviceToken != ""){
		var url = "";
		if(typeof e.fullurl != "undefined"){
			url = e.url;
		}else{
			var domain = (typeof e.domain != "undefined")?eval(e.domain):API_DOMAIN;
			url = (typeof e.new != "undefined")?domain+"/api/"+e.url+"?user="+USER+"&key="+KEY:eval(e.url);
		}
		console.log(url);
		if(e.type == "voice"){
			var _result = contactServerByPostVideo(url, e.params || {});
		}else{
			var _result = contactServerByPost(url, e.params || {});
		}
		_result.onload = function(ex) {
			console.log("onload");
			var timeend = new Date();
			var dif = timeend.getTime() - timestart.getTime();
			try{
				JSON.parse(this.responseText);
			}
			catch(e){
				console.log(this.responseText);
				console.log('callbypost JSON exception');
				console.log("Error", e.message);
				return;
			}
			
			onload && onload(this.responseText);
		};

		_result.onerror = function(ex) {
			console.log(url);
			console.log(e.params);
			console.log(ex);
			if(ex.code == "-1009"){       //The Internet connection appears to be offline.
	            Alloy.Globals.common.createAlert("Error", ex.error);
	            return;
	        }else{
	        	Alloy.Globals.common.createAlert("Error", ex.error);
	        }
			return;
			
			if(retryTimes !== 0 && Titanium.Network.online){
				retryTimes --;
				_.extend(e, {retryTimes: retryTimes});
				//Alloy.Globals.API.callByPost(e, onload, onerror);
			}else{
				if(!callByPost_error_popup){
					callByPost_error_popup = true;
					Alloy.Globals.common.createAlert("Error", "Unable connect to the server. Please try again later.", function(){
						callByPost_error_popup = false;
					});
				}
				onload(JSON.stringify(ex));
			}
		};
	}
};



function onerrorCallback(e) {
	var common = require('common');
	// Handle your errors in here
	Alloy.Globals.common.createAlert("Error", e);
};