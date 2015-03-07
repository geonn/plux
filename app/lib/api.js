/*********************
*** SETTING / API ***
**********************/
var API_DOMAIN = "https://www.asp-medical-clinic.com/aida/";

var url_doLogin		= API_DOMAIN+"login.aspx";
var url_panelList   = API_DOMAIN+"panellist.aspx";
/*********************
**** API FUNCTION*****
**********************/

// update user device token
exports.doLogin = function(LOGINID, PASSWORD){
	
	var client = Ti.Network.createHTTPClient({
	     // function called when the response data is available
	     onload : function(e) {
	       var ret = [];
	       console.log(this.responseText);
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

exports.loadNewsFeed = function (ex){
	var url = 'http://plux.freejini.com.my/api/grab_newsfeed?user=freejini&key=06b53047cf294f7207789ff5293ad2dc&date=01-01-2015';//url_panelList+"?CORPCODE="+ex;

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
	var url = 'https://www.asp-medical-clinic.com.my/aida/panellist.aspx?CORPCODE=ASP';//url_panelList+"?CORPCODE="+ex;

	var client = Ti.Network.createHTTPClient({
	     // function called when the response data is available
	     onload : function(e) {
	    
	     	var res = JSON.parse(this.responseText);
		 	/**reset current category**/
		 	var library = Alloy.createCollection('panelList'); 
			library.resetPanel();
					
			/**load new set of category from API**/ 
			library.addPanel(res); 
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



function onErrorCallback(e) {
	var common = require('common');
	// Handle your errors in here
	common.createAlert("Error", e);
};
