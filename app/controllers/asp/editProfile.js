var args = arguments[0] || {};
var loading = Alloy.createController("loading");
$.win.add(loading.getView());

function submitPassword(){
	loading.start();
	var email = $.email.value;
	var hp = $.hp.value;
	if(email.trim() != ""){
		var param = "&value="+email;
		var target = "EMAIL";
		callAPI(param, target);
	}
	
	if(hp.trim() != ""){
		var param = "&value="+hp;
		var target = "MOBILE";
		callAPI(param, target);
	}
	
	if(param == ""){
	    loading.finish();
	    return;
	}
	
}

function callAPI(param, target){
    var LOGINID = Ti.App.Properties.getString('email');
    API.callByGet({url: "updateemailhp.aspx", params: "LOGINID="+LOGINID+param+"&TARGET="+target}, {
        onload: function(responseText){
           var res = JSON.parse(responseText);
           if(res.length == null || res.length <= 0){
           }else if( typeof res[0] !== "undefined" && typeof res[0].message !== "undefined"){
            //console.log('got error message');
               common.createAlert(res[0].message);
           }else{
               Ti.App.Properties.setString('email', email);
               common.createAlert("Done", res.message);
           }
       }, onfinish: function(){
           loading.finish();
       }, onerror: function(e){
           alert("Server busy, please try again later.");
           //$.win.close();
       }
   });
}

if(Ti.Platform.osname == "android"){
	$.btnBack.addEventListener('click', function(){ 
		nav.closeWindow($.win); 
	}); 
}