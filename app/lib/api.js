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

var updateToken     = "http://"+FREEJINI_DOMAIN+"/api/updateToken?user="+USER+"&key="+KEY;
var newsfeed        = "http://"+FREEJINI_DOMAIN+"/api/grab_newsfeed?user="+USER+"&key="+KEY;
var categoryUrl     = "http://"+FREEJINI_DOMAIN+"/api/getCategoryList?user="+USER+"&key="+KEY;
var leafletUrl      = "http://"+FREEJINI_DOMAIN+"/api/getBrochure?user="+USER+"&key="+KEY;
var panelList       = "https://"+API_DOMAIN+"/panellist.aspx?CORPCODE=ASP"; 
var loginUrl        = "https://"+API_DOMAIN+"/login.aspx"; 
var checkBalanceUrl = "https://"+API_DOMAIN+"/balchk.aspx";  
var getClaimDetailUrl = "https://"+API_DOMAIN+"/claim.aspx";

//configuration 
var defaultRetryTimes = 3;

/*********************
**** API FUNCTION*****
**********************/

exports.doLogin = function(username, password, mainView, target) { 
	 
	var url = loginUrl+"?LOGINID="+username+"&PASSWORD="+password; 
	var client = Ti.Network.createHTTPClient({
	     // function called when the response data is available
	     onload : function(e) {
	       var ret = []; 
	       var result = JSON.parse(this.responseText);
	       //console.log(result);
	       res = result[0];
	       //console.log(result);
	       if(typeof res.message !== undefined && res.message != null){
	       		 common.createAlert("Error",res.message);
	       		 common.hideLoading();
	       }else{
	       		var usersModel = Alloy.createCollection('users'); 
	       		Ti.App.Properties.setString('memno', res.memno);
	       		Ti.App.Properties.setString('empno', res.empno);
	       		Ti.App.Properties.setString('corpcode', res.corpcode);
	       		
	       		usersModel.addUserData(result);
	       		common.hideLoading();
	       		 
				nav.closeWindow(mainView.loginWin); 
				Ti.App.fireEvent('updateHeader');
				//console.log("["+target+"]");
				if(target != "" && target != "home"){
					nav.navigationWindow(target);
				}
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

exports.getClaimDetail = function(e){
	
	var url = getClaimDetailUrl+"?EMPNO="+e.empno+"&CORPCODE="+e.corpcode;
	var retryTimes = (typeof e.retryTimes != "undefined")?e.retryTimes: defaultRetryTimes;
	console.log(url);
	var client = Ti.Network.createHTTPClient({
		// function called when the response data is available
	     onload : function(e) {
	       var ret = [];
	       var res = JSON.parse(this.responseText);
	       console.log("onload");
	       if(typeof res[0].message !== undefined && res[0].message != null){
	       		console.log('got error message');
	       		common.createAlert(res[0].message);
	       }else{
       			res.forEach(function(entry) {
       				 var claim_detail_model = Alloy.createCollection('claim_detail');
       				 claim_detail_model.save_claim_detail(entry.serial, entry.memno, entry.name, entry.relation, entry.cliniccode, entry.visitdate, entry.amount, entry.category, entry.mcdays, entry.diagnosis, entry.consultation_amt, entry.medication, entry.medication_amt, entry.injection, entry.injection_amt, entry.labtest, entry.labtest_amt, entry.xray, entry.xray_amt, entry.surgical, entry.surgical_amt, entry.extraction_amt, entry.fillings_amt, entry.scaling_amt, entry.others_amt, entry.bps, entry.bpd, entry.pulse, entry.clinicname);
       			});
	       }
	     },
	     // function called when an error occurs, including a timeout
	     onerror : function(ex) {
	     	console.log('error');
	     	retryTimes --;
	     	
	     	if(retryTimes !== 0){
	     		API.getClaimDetail({empno : e.empno, corpcode : e.corpcode, retryTimes: retryTimes});
	     	}else{
	     		Ti.UI.fireEvent("data_loaded");
	     	}
	     },
	     timeout : 10000  // in milliseconds
	});
	
	// Prepare the connection.
	 client.open("GET", url);
	 // Send the request.
	 client.send(); 
};

exports.claimInfo = function(e) { 
	var url = checkBalanceUrl+"?MEMNO="+e.memno+"&CORPCODE="+e.corpcode;
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
		console.log(url);
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

exports.loadPanelList = function (ex){
	var url =  panelList;

	var client = Ti.Network.createHTTPClient({ 
	     onload : function(e) { 
	     	var res = JSON.parse(this.responseText);
		 	/**reset current category**/
		 	var library = Alloy.createCollection('panelList'); 
			library.resetPanel();
					
			/**load new set of category from API**/ 
			library.addPanel(res); 
	     }, 
	     onerror : function(e) { },
	     timeout : 50000  // in milliseconds
	 });
	 // Prepare the connection.
	 client.open("GET", url);
	 // Send the request.
	 client.send(); 
};



function onErrorCallback(e) {
	var common = require('common');
	// Handle your errors in here
	common.createAlert("Error", e);
};
