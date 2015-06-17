/*********************
*** SETTING / API ***
**********************/
var API_DOMAIN = "www.asp-medical-clinic.com.my/aida";
var FREEJINI_DOMAIN =  "plux.freejini.com.my";
var url_doLogin		= API_DOMAIN+"login.aspx";
var url_panelList   = API_DOMAIN+"panellist.aspx";

// APP authenticate user and key
var USER  = 'freejini';
var KEY   = '06b53047cf294f7207789ff5293ad2dc';

var updateUserServiceUrl = "http://"+FREEJINI_DOMAIN+"/api/updateUserService?user="+USER+"&key="+KEY;
var getUserServiceUrl = "http://"+FREEJINI_DOMAIN+"/api/getUserService?user="+USER+"&key="+KEY;
var updateToken     = "http://"+FREEJINI_DOMAIN+"/api/updateToken?user="+USER+"&key="+KEY;
var newsfeed        = "http://"+FREEJINI_DOMAIN+"/api/grab_newsfeed?user="+USER+"&key="+KEY;
var categoryUrl     = "http://"+FREEJINI_DOMAIN+"/api/getCategoryList?user="+USER+"&key="+KEY;
var leafletUrl      = "http://"+FREEJINI_DOMAIN+"/api/getBrochure?user="+USER+"&key="+KEY;
var updateUserFromFB = "http://"+FREEJINI_DOMAIN+"/api/updateUserFromFB?user="+USER+"&key="+KEY;
var pluxLoginUrl    = "http://"+FREEJINI_DOMAIN+"/api/pluxLogin?user="+USER+"&key="+KEY;
var pluxSignUpUrl   = "http://"+FREEJINI_DOMAIN+"/api/pluxSignUp?user="+USER+"&key="+KEY;
var healthDataUrl   = "http://"+FREEJINI_DOMAIN+"/api/syncHealthData?user="+USER+"&key="+KEY; 
var removeHealthDataUrl = "http://"+FREEJINI_DOMAIN+"/api/removeHealthData?user="+USER+"&key="+KEY; 
var clinicListUrl 	= "http://"+FREEJINI_DOMAIN+"/api/getClinicLocator?user="+USER+"&key="+KEY; 
var panelList       = "https://"+API_DOMAIN+"/panellist.aspx"; 
var loginUrl        = "https://"+API_DOMAIN+"/login.aspx"; 
var changePasswordUrl= "https://"+API_DOMAIN+"/chgpwd.aspx"; 
var checkBalanceUrl = "https://"+API_DOMAIN+"/balchk.aspx";  
var getClaimDetailUrl = "https://"+API_DOMAIN+"/claim.aspx";
var aspSignupUrl 	= "https://"+API_DOMAIN+"/signup.aspx";
var resendVerifUrl  = "https://"+API_DOMAIN+"/sendveriemail.aspx";
var getclaimDetailBySeriesUrl = "https://"+API_DOMAIN+"/claimdetails.aspx"; 
//configuration 
var defaultRetryTimes = 3;

/*********************
**** API FUNCTION*****
**********************/
exports.updateUserFromFB = function(e, mainView){ 
	var url = updateUserFromFB+"&email="+e.email+"&fbid="+e.fbid+"&link="+e.link+"&name="+e.name+"&gender="+e.gender; 

	var client = Ti.Network.createHTTPClient({
		// function called when the response data is available
		onload : function(e) {
			var res = JSON.parse(this.responseText);
			//console.log(res);
			common.hideLoading();
		    if(res.status == "success"){ 
		        API.syncHealthData({u_id:res.data.u_id});
		        
		        var usersPluxModel = Alloy.createCollection('users_plux'); 
				usersPluxModel.addUserData({
					u_id: res.data.u_id,
					fullname: res.data.fullname,
					email: res.data.email,
					status: res.data.status,
					facebook_id: res.data.facebook_id,
					facebook_url: res.data.facebook_url,
					last_login: currentDateTime()
				}); 
				
				if(typeof res.data.user_service != "undefined"){
					for (var i=0; i < res.data.user_service.length; i++) {
					//console.log(res.data.user_service[i]);
					  if(res.data.user_service[i].service_id == 1){
					  	Ti.App.Properties.setString('asp_email', res.data.user_service[i].email);
		       			Ti.App.Properties.setString('asp_password', res.data.user_service[i].password);
					  }
					};
				}
	         	/** User session**/
	         	Ti.App.Properties.setString('u_id', res.data.u_id); 
	         	Ti.App.Properties.setString('facebooklogin', 1);
	         	
	         	Ti.App.fireEvent('updateHeader');
				nav.closeWindow(mainView.loginWin); 
	         	//API.updateNotificationToken();   
		    }
		},
		// function called when an error occurs, including a timeout
		onerror : function(e) {
		},
		timeout : 7000  // in milliseconds
	});
	// Prepare the connection.
	client.open("GET", url);
	 // Send the request.
	client.send();  
};

exports.getUserService = function(e){
	 
	var url = getUserServiceUrl + "&u_id="+e.u_id; 
	var client = Ti.Network.createHTTPClient({
	     // function called when the response data is available
	     onload : function(e) { 
	     	var res = JSON.parse(this.responseText);
	     	for (var i=0; i < res.data.length; i++) {
				 
				if(res.data[i].service_id == 1){
				  	Ti.App.Properties.setString('asp_email', res.data[i].email);
	       			Ti.App.Properties.setString('asp_password', res.data[i].password);
				 }
			}
	     },
	     // function called when an error occurs, including a timeout
	     onerror : function(e) {   
	     },
	     timeout : 6000  // in milliseconds
	 });
	 client.open("GET", url);
	 // Send the request.
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
	     timeout : 6000  // in milliseconds
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
		timeout : 7000  // in milliseconds
	}); 
	client.open("GET", url); 
	client.send(); 
};

exports.do_pluxLogin = function(data,mainView){
	var url = pluxLoginUrl +"&email="+data.email+"&password="+data.password;
 
	var client = Ti.Network.createHTTPClient({
		// function called when the response data is available
		onload : function(e) { 
			var result = JSON.parse(this.responseText);
			common.hideLoading(); 
			if(result.status == "error"){
				common.createAlert("Error", result.data);
				return false;
			}else{  
				var usersPluxModel = Alloy.createCollection('users_plux'); 
				usersPluxModel.addUserData({
					u_id: result.data.u_id,
					fullname: result.data.fullname,
					email: result.data.email,
					status: result.data.status,
					facebook_id: result.data.facebook_id,
					facebook_url: result.data.facebook_url,
					last_login: currentDateTime()
				});
				Ti.App.Properties.setString('u_id', result.data.u_id); 
				Ti.App.Properties.setString('plux_email',result.data.email);
				
				if(typeof result.data.user_service != "undefined"){
					for (var i=0; i < result.data.user_service.length; i++) {
					//	console.log(result.data.user_service[i]);
					  if(result.data.user_service[i].service_id == 1){
					  	Ti.App.Properties.setString('asp_email', result.data.user_service[i].email);
		       			Ti.App.Properties.setString('asp_password', result.data.user_service[i].password);
					  }
					};
				}
	       		
	       		
				Ti.App.fireEvent('updateHeader');
				nav.closeWindow(mainView.loginWin); 
			}
		},
		// function called when an error occurs, including a timeout
		onerror : function(e) {
		},
		timeout : 7000  // in milliseconds
	}); 
	client.open("GET", url); 
	client.send(); 
};

exports.do_signup = function(data,mainView){
	 
	var url = pluxSignUpUrl+"&fullname="+data.fullname+"&email="+data.email+"&password="+data.password+"&password2="+data.password;
 
	var client = Ti.Network.createHTTPClient({
		// function called when the response data is available
		onload : function(e) { 
			var result = JSON.parse(this.responseText);
			common.hideLoading(); 
			if(result.status == "error"){
				common.createAlert("Error", result.data);
				return false;
			}else{
				nav.closeWindow(mainView.signUpWin); 
			}
		},
		// function called when an error occurs, including a timeout
		onerror : function(e) {
		},
		timeout : 7000  // in milliseconds
	}); 
	client.open("GET", url); 
	client.send();  
};

exports.do_asp_signup = function(data, mainView){
	var url = aspSignupUrl+"?EMAIL="+data.email+"&EMAIL2="+data.email2+"&PASSWORD="+data.password+"&NAME="+data.name+"&MEMNO="+data.memno+"&EMPNO="+data.empno+"&MOBILENO="+data.password+"&SMSME="+data.smsme+"&AGREETS="+data.agreets; 
	var u_id = Ti.App.Properties.getString('u_id') || "";
	console.log(url);
	var client = Ti.Network.createHTTPClient({
	     // function called when the response data is available
	     onload : function(e) {
	       var ret = []; 
	       var result = JSON.parse(this.responseText);
	       res = result[0];
	       //console.log(res);
	       if(typeof res.message !== undefined && res.message != null){
	       		 common.createAlert("Error",res.message);
	       		 common.hideLoading();
	       }else{ 
	       		var usersModel = Alloy.createCollection('users'); 
	       		Ti.App.Properties.setString('memno', res.memno);
	       		Ti.App.Properties.setString('empno', res.empno);
	       		Ti.App.Properties.setString('corpcode', res.corpcode);
	       		Ti.App.Properties.setString('asp_email', data.email);
	       		Ti.App.Properties.setString('asp_password', data.password);
	       		
	       		updateUserService(u_id, 1, data.email, data.password);
	       		usersModel.addUserData(result);
	       		common.hideLoading();
	       		 
				nav.closeWindow(mainView.loginWin); 
				Ti.App.fireEvent('updateHeader');
				nav.navigationWindow("home");
	       }
	     },
	     // function called when an error occurs, including a timeout
	     onerror : function(e) { 
	     	common.createAlert("Sign Up Fail", "unexpected error");
	     	common.hideLoading();
	     },
	     timeout : 6000  // in milliseconds
	 });
	 // Prepare the connection.
	 client.open("GET", url);
	 // Send the request.
	 client.send();
};

exports.resendVerificationEmail = function(){
	var url = resendVerifUrl+"?LOGINID="+ Ti.App.Properties.getString('asp_email'); 
	 console.log(url);
	var client = Ti.Network.createHTTPClient({
	     // function called when the response data is available
	     onload : function(e) { 
	       common.createAlert("Success", "Verification email sent!");
	     },
	     // function called when an error occurs, including a timeout
	     onerror : function(e) { 
	     	common.createAlert("Login Fail", "unexpected error");
	     	common.hideLoading();
       		
	     },
	     timeout : 130000  // in milliseconds
	 });
	 // Prepare the connection.
	 client.open("GET", url);
	 // Send the request.
	 client.send(); 
};

exports.doLogin = function(username, password, mainView, target) { 
	var u_id = Ti.App.Properties.getString('u_id') || ""; 
	var url = loginUrl+"?LOGINID="+username+"&PASSWORD="+password; 
	 
	var client = Ti.Network.createHTTPClient({
	     // function called when the response data is available
	     onload : function(e) {
	       var ret = []; 
	       var result = JSON.parse(this.responseText); 
	       res = result[0]; 
	       //console.log(res);
	       if(typeof res.message !== undefined && res.message != null){
	       		 common.createAlert("Error",res.message);
	       		 common.hideLoading();
	       }else{
	       		var usersModel = Alloy.createCollection('users'); 
	       		Ti.App.Properties.setString('memno', res.memno);
	       		Ti.App.Properties.setString('empno', res.empno);
	       		Ti.App.Properties.setString('corpcode', res.corpcode); 
	       		Ti.App.Properties.setString('asp_email', username);
	       		Ti.App.Properties.setString('asp_password',password);
	       		updateUserService(u_id, 1,username, password);
	       		usersModel.addUserData(result);
	       		common.hideLoading();
	       		
	       		if(target != 'refresh'){
	       			nav.closeWindow(mainView.loginWin); 
					Ti.App.fireEvent('updateHeader');
					//console.log("["+target+"]");
					if(target != "" && target != "home"){
						nav.navigationWindow(target);
					}
					
	       		}else{
	       			Ti.App.fireEvent('loadPage');
	       		}
				
	       }
	       
	       
	     },
	     // function called when an error occurs, including a timeout
	     onerror : function(e) { 
	     	common.createAlert("Login Fail", "unexpected error");
	     	common.hideLoading();
       		
	     },
	     timeout : 130000  // in milliseconds
	 });
	 // Prepare the connection.
	 client.open("GET", url);
	 // Send the request.
	 client.send(); 
}; 

exports.doChangePassword = function(e, mainView) { 
	 
	var url = changePasswordUrl+"?LOGINID="+e.username+"&NEW_PASSWORD="+e.password; 
	//console.log(url);
	var client = Ti.Network.createHTTPClient({
	     // function called when the response data is available
	     onload : function(e) {
	       var ret = []; 
	       var result = JSON.parse(this.responseText); 
	       res = result[0]; 
	        //GEO TO EDIT
	        console.log(res);
	        if(res.code == "99"){ //success
	        	common.createAlert("Done", res.message);
	        	nav.closeWindow(mainView.changePasswordWin); 
	        }else{
	        	common.createAlert("Error", res.message);
	        	return false;
	        }
	       	
	     },
	     // function called when an error occurs, including a timeout
	     onerror : function(e) { 
	     	common.createAlert("Login Fail", "unexpected error");
	     	common.hideLoading();
       		
	     },
	     timeout : 6000  // in milliseconds
	 });
	 // Prepare the connection.
	 client.open("GET", url);
	 // Send the request.
	 client.send(); 
}; 

exports.claimDetailBySeries = function(e){
	var url = getclaimDetailBySeriesUrl+"?SERIAL="+e.serial;
	var retryTimes = defaultRetryTimes;
	//console.log(url);
	var client = Ti.Network.createHTTPClient({
		// function called when the response data is available
	     onload : function(e) {
	       var ret = [];
	       var res = JSON.parse(this.responseText);
	       if(res.length == 0){
	       	
	       	}else if( typeof res[0].message !== "undefined" && res[0].message != null){
	       		//console.log('got error message');
	       		common.createAlert(res[0].message);
	       }else{
       			res.forEach(function(entry) {
       				 var claim_detail_model = Alloy.createCollection('claim_detail');
       				 claim_detail_model.save_claim_extra_detail(entry.serial,entry.diagnosis, entry.consultation_amt, entry.medication, entry.medication_amt, entry.injection, entry.injection_amt, entry.labtest, entry.labtest_amt, entry.xray, entry.xray_amt, entry.surgical, entry.surgical_amt, entry.extraction_amt, entry.fillings_amt, entry.scaling_amt, entry.others_amt, entry.bps, entry.bpd, entry.pulse);
       			});
	       }
	       Ti.UI.fireEvent("load_claim_detail");
	     },
	     // function called when an error occurs, including a timeout
	     onerror : function(ex) {
	     	//console.log('error');
	     	retryTimes --;
	     	
	     	if(retryTimes !== 0){
	     		API.claimDetailBySeries({serial : serial});
	     	}else{
	     		Ti.UI.fireEvent("load_claim_detail");
	     	}
	     },
	     timeout : 10000  // in milliseconds
	});
	
	// Prepare the connection.
	 client.open("GET", url);
	 // Send the request.
	 client.send(); 
};

exports.getClaimDetail = function(e){
	
	var url = getClaimDetailUrl+"?EMPNO="+e.empno+"&CORPCODE="+e.corpcode;
	//console.log(url);
	var retryTimes = (typeof e.retryTimes != "undefined")?e.retryTimes: defaultRetryTimes;
	//console.log(url);
	var client = Ti.Network.createHTTPClient({
		// function called when the response data is available
	     onload : function(e) {
	       var ret = [];
	       var res = JSON.parse(this.responseText);
	       if(res.length == 0){
	       	
	       	}else if( typeof res[0].message !== "undefined" && res[0].message != null){
	       		//console.log('got error message');
	       		common.createAlert(res[0].message);
	       }else{
       			res.forEach(function(entry) {
       				 var claim_detail_model = Alloy.createCollection('claim_detail');
       				  
       				 claim_detail_model.save_claim_detail(entry.serial, entry.memno, entry.name, entry.relation, entry.cliniccode, entry.visitdate, entry.amount, entry.category, entry.mcdays, entry.clinicname, entry.status, entry.claimtype);
       				 /* API update - removed the details portion to increase the Apps Response time
       				  * entry.diagnosis, entry.consultation_amt, entry.medication, entry.medication_amt, entry.injection, entry.injection_amt, entry.labtest, entry.labtest_amt, entry.xray, entry.xray_amt, entry.surgical, entry.surgical_amt, entry.extraction_amt, entry.fillings_amt, entry.scaling_amt, entry.others_amt, entry.bps, entry.bpd, entry.pulse, */
       			});
	       }
	     },
	     // function called when an error occurs, including a timeout
	     onerror : function(ex) {
	     	//console.log('error');
	     	retryTimes --;
	     	
	     	if(retryTimes !== 0){
	     		API.getClaimDetail({empno : e.empno, corpcode : e.corpcode, retryTimes: retryTimes});
	     	}else{
	     		Ti.UI.fireEvent("data_loaded");
	     	}
	     },
	     timeout : 120000  // in milliseconds
	});
	
	// Prepare the connection.
	 client.open("GET", url);
	 // Send the request.
	 client.send(); 
};

exports.claimInfo = function(e) { 
	var url = checkBalanceUrl+"?MEMNO="+e.memno+"&CORPCODE="+e.corpcode;
	//console.log(url);
	var retryTimes = (typeof e.retryTimes != "undefined")?e.retryTimes: defaultRetryTimes;
	var client = Ti.Network.createHTTPClient({
	     // function called when the response data is available
	     onload : function(e) {
	       var ret = [];
	       var res = JSON.parse(this.responseText);
	       if(typeof res[0].message !== undefined && res[0].message != null){
	       		common.createAlert(res[0].message);
	       }else{
	       		Ti.App.Properties.setString('balchk', this.responseText);
	       		Ti.App.Properties.setString('balchkUpdatedDate', currentDateTime());
	       		Ti.UI.fireEvent("data_loaded");
	       }
	     },
	     // function called when an error occurs, including a timeout
	     onerror : function(ex) {
	     	retryTimes --;
	     	
	     	if(retryTimes !== 0){
	     		API.claimInfo({memno : e.memno, corpcode : e.corpcode, retryTimes: retryTimes});
	     	}else{
	     		Ti.UI.fireEvent("data_loaded");
	     	}
	     },
	     timeout : 5000  // in milliseconds
	 });
	 // Prepare the connection.
	 client.open("GET", url);
	 // Send the request.
	 client.send(); 
};

// update user device token
exports.updateNotificationToken = function(e){
	var deviceToken = Ti.App.Properties.getString('deviceToken');
	var memno = Ti.App.Properties.getString('memno'); 
	if(deviceToken != ""){ 
		var url = updateToken+"&token="+deviceToken+"&member_no="+memno;
		//console.log(url);
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
		     timeout : 50000  // in milliseconds
		 });
		 // Prepare the connection.
		 client.open("GET", url);
		 // Send the request.
		 client.send(); 
	}
	
};

exports.loadLeaflet = function(ex){
	var url = leafletUrl;
	var client = Ti.Network.createHTTPClient({
	     // function called when the response data is available
	     onload : function(e) { 
	     	var res = JSON.parse(this.responseText);
		 	/**reset current category**/
		 	var leafletModel = Alloy.createCollection('leaflet');  
			leafletModel.resetBrouchure();  
			var leaf = res.data; 
			leaf.forEach(function(entry) {  
				var lfModel = Alloy.createModel('leaflet', {
					id      	: entry.b_id, 
					title		: entry.b_title,
					url			: entry.b_url,
					status		: entry.b_status,
					position	: entry.b_position,
					attachment	: entry.attachment,
				 	cover		: entry.cover,
		   			created		: entry.b_created,
		   			updated		: entry.b_updated 
				});
				lfModel.save();  
			});
	     },
	     // function called when an error occurs, including a timeout
	     onerror : function(e) {
	     },
	     timeout : 50000  // in milliseconds
	 });
	 // Prepare the connection.
	 client.open("GET", url);
	 // Send the request.
	 client.send(); 
};

exports.loadNewsFeed = function (ex){
	var url = newsfeed+'&date=01-01-2015'; 

	var client = Ti.Network.createHTTPClient({
	     // function called when the response data is available
	     onload : function(e) { 
	     	var res = JSON.parse(this.responseText);
		 	/**reset current category**/
		 	var library = Alloy.createCollection('health_news_feed'); 
		 	var newElementModel = Alloy.createCollection('news_element'); 
			library.resetNews();
			newElementModel.resetNewsElement();		
			/**load new set of category from API**/ 
			
			library.addNews(res.data); 
			var newsFe = res.data;
			newsFe.forEach(function(nf) { 
				var elements = nf.element;
				elements.forEach(function(entry) {  
					var eleModel = Alloy.createModel('news_element', {
					        id         : entry.id, 
							news_id		: nf.id,
							content		: entry.content ,
							type		: entry.type ,
							images		: entry.media ,
							position	: entry.position ,
							
					});
					eleModel.save(); 
				});
				
			});
	     },
	     // function called when an error occurs, including a timeout
	     onerror : function(e) {
	     },
	     timeout : 50000  // in milliseconds
	 });
	 // Prepare the connection.
	 client.open("GET", url);
	 // Send the request.
	 client.send(); 
};

exports.loadCategoryList = function (ex){
	var url = categoryUrl; 

	var client = Ti.Network.createHTTPClient({
	     // function called when the response data is available
	     onload : function(e) {
	    
	     	var res = JSON.parse(this.responseText);
		 	/**reset current category**/
		 	var library = Alloy.createCollection('category'); 
			library.resetCategory();
					
			/**load new set of category from API**/ 
			var arr = res.data;  
	       	arr.forEach(function(entry) { 
				var category = Alloy.createModel('category', {
				        id         : entry.key,
				        category   : entry.value
				});
				category.save(); 
			});
	     },
	     // function called when an error occurs, including a timeout
	     onerror : function(e) {
	     },
	     timeout : 50000  // in milliseconds
	 });
	 // Prepare the connection.
	 client.open("GET", url);
	 // Send the request.
	 client.send(); 
};

exports.loadClinicList = function (ex){ 
	var checker = Alloy.createCollection('updateChecker'); 
	var isUpdate = checker.getCheckerById("1");
	var last_updated ="";
	 
	if(isUpdate != "" ){
		last_updated = isUpdate.updated;
	} 
	var url = clinicListUrl+"&last_updated="+last_updated; 
  
	var client = Ti.Network.createHTTPClient({
	     // function called when the response data is available
	     onload : function(e) { 
	     	 
	     	var res = JSON.parse(this.responseText);
	     	
	     	if(res.status == "success"){  
			 	 if(isUpdate	 !== "" || (res.last_updated != isUpdate.updated)){ 
			 		
				 	var library = Alloy.createCollection('panelList'); 
					 
					/**load new set of category from API**/ 
					var arr = res.data;   
			        library.addPanel(arr); 
			        checker.updateModule("1","clinicList",currentDateTime());  
			 	 }else{
			 		// alert("?");
			 	 }
	        }
		 	
	     },
	     // function called when an error occurs, including a timeout
	     onerror : function(e) {
	     },
	     timeout : 50000  // in milliseconds
	 });
	 // Prepare the connection.
	 client.open("GET", url);
	 // Send the request.
	 client.send(); 
};

exports.loadPanelList = function (ex){
	var corp = Ti.App.Properties.getString('corpcode');
	var url =  panelList+"?CORPCODE="+corp;
	 
	var client = Ti.Network.createHTTPClient({ 
	     onload : function(e) { 
	     	var res = JSON.parse(this.responseText); 
	     	var library = Alloy.createCollection('panelList');
	     	var codeStr = "";
			res.forEach(function(entry) {
				codeStr += '"'+entry.cliniccode+'",'; 
			});
			codeStr = codeStr.substring(0, codeStr.length - 1);
			details = library.getPanelListByCode(codeStr);
			 
	     	Ti.App.fireEvent('aspClinic', {returnData:details});
	     	 
	     }, 
	     onerror : function(e) { },
	     timeout : 50000  // in milliseconds
	 });
	 // Prepare the connection.
	 client.open("GET", url);
	 // Send the request.
	 client.send(); 
};

function updateUserService(u_id, service_id, email, password){
	var url =  updateUserServiceUrl+"&u_id="+u_id+"&service_id="+service_id+"&email="+email+"&password="+password;

	var client = Ti.Network.createHTTPClient({ 
	     onload : function(e) { 
	     	var res = JSON.parse(this.responseText);
	     	 
	     }, 
	     onerror : function(e) { },
	     timeout : 50000  // in milliseconds
	 });
	 // Prepare the connection.
	 client.open("GET", url);
	 // Send the request.
	 client.send(); 
}

function onErrorCallback(e) {
	var common = require('common');
	// Handle your errors in here
	common.createAlert("Error", e);
};
