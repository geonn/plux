var common = require('common');

exports.checkLogin = function(){
	var memno = Ti.App.Properties.getString('memno');
	console.log('should have'+memno);
	if(typeof memno === undefined || memno == null){
		return false;
	}else{
		return true;
	}
};

exports.doLogin = function(username, password, $, target) {
	/** include required file**/
	
	var url_doLogin		= API_DOMAIN+"login.aspx";
	var url = url_doLogin+"?LOGINID="+username+"&PASSWORD="+password;
	
	var client = Ti.Network.createHTTPClient({
	     // function called when the response data is available
	     onload : function(e) {
	       var ret = [];
	       console.log(this.responseText);
	       var res = JSON.parse(this.responseText);
	       res = res[0];
	      
	       if(typeof res.message !== undefined && res.message != null){
	       		common.createAlert(res.message);
	       		Ti.App.Properties.setString('memno', "temp");
	       		var nav = require('navigation');
				nav.closeWindow($.login);
				nav.navigationWindow(target);
	       }else{
	       		console.log('yes'+res.memno);
	       		Ti.App.Properties.setString('memno', res.memno);
	       		Ti.App.Properties.setString('empno', res.empno);
	       		Ti.App.Properties.setString('corpcode', res.corpcode);
	       		var nav = require('navigation');
				nav.closeWindow($.login);
				 console.log("success login"+target);
				nav.navigationWindow(target);
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