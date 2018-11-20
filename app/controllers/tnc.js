var args = arguments[0] || {};

function navToSignup(){
    var win = Alloy.createController("asp/signup").getView();
    win.open(); 
    $.win.close(); 
}

$.btnBack.addEventListener('click', function(){ 
	$.win.close(); 
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