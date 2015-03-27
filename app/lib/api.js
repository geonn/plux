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
var panelList       = "https://"+API_DOMAIN+"/panellist.aspx?CORPCODE=ASP"; 
var loginUrl        = "https://"+API_DOMAIN+"/login.aspx"; 
var checkBalanceUrl = "https://"+API_DOMAIN+"/balchk.aspx";  
/*********************
**** API FUNCTION*****
**********************/

exports.doLogin = function(username, password, mainView, target) { 
	var url = loginUrl+"?LOGINID="+username+"&PASSWORD="+password;
	console.log(url);
	var client = Ti.Network.createHTTPClient({
	     // function called when the response data is available
	     onload : function(e) {
	       var ret = []; 
	       var result = JSON.parse(this.responseText);
	       res = result[0];
	      
	       if(typeof res.message !== undefined && res.message != null){
	       		 common.createAlert("Error",res.message);
	       		 
	       }else{
	       		var usersModel = Alloy.createCollection('users'); 
	       		Ti.App.Properties.setString('memno', res.memno);
	       		Ti.App.Properties.setString('empno', res.empno);
	       		Ti.App.Properties.setString('corpcode', res.corpcode);
	       		
	       		usersModel.addUserData(result);
	       		var nav = require('navigation');
				nav.closeWindow(mainView.login); 
				nav.navigationWindow(target);
	       }
	     },
	     // function called when an error occurs, including a timeout
	     onerror : function(e) { 
	     	common.createAlert("Login Fail", "unexpected error");
       		
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
	console.log(url);
	var client = Ti.Network.createHTTPClient({
	     // function called when the response data is available
	     onload : function(e) {
	       var ret = [];
	       var res = JSON.parse(this.responseText); 
	       if(typeof res[0].message !== undefined && res[0].message != null){
	       		common.createAlert(res[0].message);
	       }else{
	       		Ti.UI.fireEvent("data_loaded", {data: res});
	       }
	     },
	     // function called when an error occurs, including a timeout
	     onerror : function(ex) {
	     	API.claimInfo({memno : e.memno, corpcode : e.corpcode});
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

exports.loadNewsFeed = function (ex){
	var url = newsfeed+'&date=01-01-2015'; 

	var client = Ti.Network.createHTTPClient({
	     // function called when the response data is available
	     onload : function(e) {
	    
	     	var res = JSON.parse(this.responseText);
		 	/**reset current category**/
		 	var library = Alloy.createCollection('health_news_feed'); 
			library.resetPanel();
					
			/**load new set of category from API**/ 
			library.addNews(res); 
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
