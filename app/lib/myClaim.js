var common = require('common');

exports.API_ClaimInfo = function(MEMNO, CORPCODE) {
	/** include required file**/
	
	var url	= API_DOMAIN+"balchk.aspx";
	var url = url+"?MEMNO="+MEMNO+"&CORPCODE="+CORPCODE;
	console.log(url);
	var client = Ti.Network.createHTTPClient({
	     // function called when the response data is available
	     onload : function(e) {
	       var ret = [];
	       var res = JSON.parse(this.responseText);
	       console.log(res[0].message);
	       if(typeof res[0].message !== undefined && res[0].message != null){
	       		common.createAlert(res[0].message);
	       }else{
	       		Ti.UI.fireEvent("data_loaded", {data: res});
	       }
	     },
	     // function called when an error occurs, including a timeout
	     onerror : function(e) {
	     	common.createAlert("unexpected error");
       		
	     },
	     timeout : 50000  // in milliseconds
	 });
	 // Prepare the connection.
	 client.open("GET", url);
	 // Send the request.
	 client.send(); 
};