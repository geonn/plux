/*********************
*** APP VERSION CONTROL ***
* 
* Latest Version 1.0
* 
**********************/

// update user device token
exports.checkAndUpdate = function(e){
	API.checkAppVersion(callback_download);
};

function updateAppVersion(appVersion){
	Ti.App.Properties.setString("appVersion", appVersion);
};

function callback_download(e){
	var dialog = Ti.UI.createAlertDialog({
	  cancel: 1,
	  buttonNames: ['Download', 'Cancel'],
	  title: "Latest version download",
	  message: 'Latest version found : '+e.currentVersion
	});
	
	dialog.show();
	
	dialog.addEventListener("click", function(ex){
		if(ex.index == 0){
			try {
				console.log(e.data);
				Ti.Platform.openURL(e.data);/*
				var intent = Ti.Android.createIntent({
				    action: Ti.Android.ACTION_VIEW,
				    data: "http://bit.ly/1U7Qmd8",
				    type: "application/vnd.android.package-archive",
				  });
				  Ti.Android.currentActivity.startActivity(intent);*/
			} catch(e) {
			    Ti.API.info("e ==> " + JSON.stringify(e));
			}
		}
	});
	updateAppVersion(e.currentVersion);
}
