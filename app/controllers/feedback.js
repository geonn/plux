// Arguments passed into this controller can be accessed off of the `$.args` object directly or:
var args = $.args;
var u_id;
common.construct($);

init();

function init(){
	u_id = Ti.App.Properties.getString('u_id') || ""; 
	$.email.value	= Ti.App.Properties.getString('plux_email') || "";
	
	if(u_id != ""){
		$.name.value	= Ti.App.Properties.getString('fullname') || "";
	}
	
	
}
function hideKeyboard(){
	$.mobile.blur();
	$.name.blur();
	$.email.blur();
	$.comment.blur(); 
}


function submitFeedback(){
	
	var name        = $.name.value;
	var email       = $.email.value;
	var mobile      = $.mobile.value;
	var comment     = $.comment.value; 
	 
	if(name == ""){
		common.createAlert("Error", "Please fill in your name" );
		return false;
	}
	
	if(email  == ""){
		common.createAlert("Error", "Please fill in your email" );
		return false;
	}else if(validateEmail(email) != "1"){
		common.createAlert("Error", "Please fill in an valid email");
		return false;	
	}
	
	if(mobile  == ""){
		common.createAlert("Error", "Please fill in your mobile number" );
		return false;
	}else if(IsNumeric(mobile) == 0){
		common.createAlert("Error", "Please fill in valid mobile number" );
		return false;
	}
	
	if(comment  == ""){
		common.createAlert("Error", "Please fill in your feedback/comment" );
		return false;
	}
	
	
	var params = "name="+name+"&email="+email+"&mobile="+mobile+"&comment="+comment+"&u_id="+u_id;
	 
	common.showLoading(); 
	API.callByPost({url:"addFeedbackUrl", params: params}, function(responseText){ 
		var res = JSON.parse(responseText); 
		if(res.status == "success"){
			common.hideLoading();
			common.createAlert("Success","Thanks for your feedback! " );
			$.win.close();
		}else{
			common.hideLoading();
		}
	}); 
	 
}

 if(Ti.Platform.osname == "android"){
	$.btnBack.addEventListener('click', function(){  
		nav.closeWindow($.win); 
	});
	if(Ti.Platform.osname == "android"){
    $.win.addEventListener("open", function(){
        if (this.activity) {
            this.activity.onResume = function() {
                setTimeout(function(){
                      redirect = false;
                      console.log("redirect as false");
                }, 1000);
              socket.connect();
            };  
            this.activity.onPause = function() {
                redirect = true;
              socket.disconnect();
            }; 
        }
    });
}
