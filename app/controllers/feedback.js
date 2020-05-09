// Arguments passed into this controller can be accessed off of the `$.args` object directly or:
var args = $.args;
var u_id;
Alloy.Globals.common.construct($);

init();

function init(){
	u_id = Ti.App.Properties.getString('u_id') || "";
	$.email.value	= Ti.App.Properties.getString('plux_email') || "";

	if(u_id != ""){
		$.name.value	= Ti.App.Properties.getString('fullname') || "";
	}
}

function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}

function IsNumeric(input){
    return (input - 0) == input && (''+input).trim().length > 0;
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
		Alloy.Globals.common.createAlert("Error", "Please fill in your name" );
		return false;
	}

	if(email  == ""){
		Alloy.Globals.common.createAlert("Error", "Please fill in your email" );
		return false;
	}else if(validateEmail(email) != "1"){
		Alloy.Globals.common.createAlert("Error", "Please fill in an valid email");
		return false;
	}

	if(mobile  == ""){
		Alloy.Globals.common.createAlert("Error", "Please fill in your mobile number" );
		return false;
	}else if(IsNumeric(mobile) == 0){
		Alloy.Globals.common.createAlert("Error", "Please fill in valid mobile number" );
		return false;
	}

	if(comment  == ""){
		Alloy.Globals.common.createAlert("Error", "Please fill in your feedback/comment" );
		return false;
	}


	var params = "name="+name+"&email="+email+"&mobile="+mobile+"&comment="+comment+"&u_id="+u_id;

	Alloy.Globals.common.showLoading();
	Alloy.Globals.API.callByPost({url:"addFeedbackUrl", params: params}, function(responseText){
		var res = JSON.parse(responseText);
		if(res.status == "success"){
			Alloy.Globals.common.hideLoading();
			Alloy.Globals.common.createAlert("Success","Thanks for your feedback! " );
			$.win.close();
		}else{
			Alloy.Globals.common.hideLoading();
		}
	});

}

 if(Ti.Platform.osname == "android"){
	$.btnBack.addEventListener('click', function(){
		Alloy.Globals.nav.closeWindow($.win);
	});
}
