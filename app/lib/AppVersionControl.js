/*********************
*** APP VERSION CONTROL ***
* 
* Latest Version 1.1.4
* 
**********************/

// update user device token
exports.checkAndUpdate = function(e){
    win = e;
	Alloy.Globals.API.checkAppVersion(callback_download);
};

function callback_download(e){
	var changelog = e.data.change_log.replace("[br]", "\n");
	var dialog = Ti.UI.createAlertDialog({
	  cancel: 1,
	  buttonNames: ['Download', 'Cancel'],
	  title: "Latest version download",
	  message: 'Latest version found : '+e.currentVersion+"\n "+changelog
	});
	
	dialog.show();
	
	dialog.addEventListener("click", function(ex){
		if(ex.index == 0){
			try {
				Ti.Platform.openURL(e.data.url);/*
				var intent = Ti.Android.createIntent({
				    action: Ti.Android.ACTION_VIEW,
				    data: "http://bit.ly/1U7Qmd8",
				    type: "application/vnd.android.package-archive",
				  });
				  Ti.Android.currentActivity.startActivity(intent);*/
			} catch(e) {
			}
		}
		if(OS_ANDROID){
		    var appActivity = Ti.Android.currentActivity;
            appActivity.finish();
		}else{
		    //Alloy.Globals.navMenu.close();
		}
	});
	
}
