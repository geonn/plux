var args = arguments[0] || {};  
common.construct($);
loadPage();
function loadPage(){
	var isver = Ti.App.Properties.getString('isver');
	var corpcode = Ti.App.Properties.getString('corpcode');
	var memno = Ti.App.Properties.getString('memno');
	var empno = Ti.App.Properties.getString('empno');
	if(isver == "true" || isver > 0){ 
		$.profileContainer.show();
	} 
	Ti.App.removeEventListener('loadPage',loadPage);
}
var data = JSON.parse(Ti.App.Properties.getString('dependent'));
console.log(data.length);
/*for (var i=0; i < data.length; i++) {
	console.log(i);
  	var profile_view = Alloy.createController("_profile_view", {profile_data: data[i]}).getView(); 	
  	$.main.addView(profile_view);
};
*/
var profile_view = Alloy.createController("_profile_view", {profile_data: data}).getView();  
$.main.addView(profile_view);

function changePassword(){
	var nav = require('navigation');
	nav.navigationWindow("asp/changePassword", 0);
} 

if(Ti.Platform.osname == "android"){
	$.btnBack.addEventListener('click', function(){
		console.log('close!!');
		nav.closeWindow($.asp_profile); 
	}); 
}

$.moreBtn.addEventListener('click', function(e){
	var dialog = Ti.UI.createOptionDialog({
	  cancel: 1,
	  options: ['Change Password', 'Cancel'],
	  title: 'More'
	});
	
	dialog.show();
	
	dialog.addEventListener("click", function(e){
		if(e.index == 0){
			changePassword();
			//API.loadCategory({types: "popular"});
		}
	});
});

$.asp_profile.addEventListener("close", function(){
	Ti.App.removeEventListener('loadPage', loadPage);
	$.destroy();
	console.log("window close");
});

if(Ti.Platform.osname == "android"){
    $.asp_profile.addEventListener("open", function(){
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