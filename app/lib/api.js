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

/*********************
**** API FUNCTION*****
**********************/

// update user device token
exports.doLogin = function(LOGINID, PASSWORD){
	
	var client = Ti.Network.createHTTPClient({
	     // function called when the response data is available
	     onload : function(e) {
	       var ret = [];
	      // console.log(this.responseText);
	       var res = JSON.parse(this.responseText);
			
	       if(res.code !== undefined){
	       		ret['status'] = "error";
	       		ret['results'] = res;
	       		return ret;
	       }else{
	       		ret['status'] = "success";
	       		ret['results'] = res;
	       		return ret;
	       }
	     },
	     // function called when an error occurs, including a timeout
	     onerror : function(e) {
	     	ret['status'] = "error";
       		ret['results'] = "";
       		return ret;
	     },
	     timeout : 50000  // in milliseconds
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
