var args = arguments[0] || {};
var loading = Alloy.createController("loading");
$.win.add(loading.getView());

function submitPassword(){
    loading.start();
	var password = $.password.value;
	var confirm = $.password2.value; 
	
	if(password.trim() == ""){
		loading.finish();
		common.createAlert("Error", "Please fill in your password");
		return false;
	}
	
	if(confirm.trim() != password.trim()){
		loading.finish();
		common.createAlert("Error", "Your password are not match");
		return false;
	}
	
	var params = {
		password: password 
	};
	API.doChangePassword(params, $, function(){
	    loading.finish();
	});
}

if(Ti.Platform.osname == "android"){
	$.btnBack.addEventListener('click', function(){ 
		nav.closeWindow($.win); 
	}); 
}

if(Ti.Platform.osname == "android"){
    $.win.addEventListener("open", function(){
        if (this.activity) {
            this.activity.onResume = function() {
                setTimeout(function(){
                      push_redirect = false;
                      console.log("redirect as false");
                }, 1000);
              socket.connect();
            };  
            this.activity.onPause = function() {
                push_redirect = true;
                socket.disconnect();
            }; 
        }
    });
}