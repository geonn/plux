var common = require('common');

exports.doLogin = function(username, password) {
	/** include required file**/
	
	var API_DOMAIN = "https://www.asp-medical-clinic.com/aida/";
	var url_doLogin		= API_DOMAIN+"login.aspx";
	var url = url_doLogin+"?LOGINID="+username+"&PASSWORD="+password;
	
	var client = Ti.Network.createHTTPClient({
	     // function called when the response data is available
	     onload : function(e) {
	       var ret = [];
	       var dummy = '{"memno":"AGIL00005","icno":"AGIL00005","name":"KHAIRIL AZMY BIN MOHD AMINUDDIN","relation":"PRINCIPLE","empno":"00005","corpcode":"C001","corpname":"COMPANY DEMO (M) SDN BHD","costcenter":"","dept":""}';
	       //var res = JSON.parse(this.responseText);
	       var res = JSON.parse(dummy);
			console.log(res);
	       if(res.code !== undefined){
	       		ret['status'] = "error";
	       		ret['results'] = res;
	       		common.createAlert(res.message);
	       		
	       }else{
	       		ret['status'] = "success";
	       		ret['results'] = res;
	       		common.createAlert(res.name);
	       		
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