/*********************
*** APP VERSION CONTROL ***
* 
* Latest Version 1.1.4
* 
**********************/

// update user device token
exports.checkAndUpdate = function(e){
	Ti.App.Properties.setString("appVersion", "1.1.988");

	API.checkAppVersion(callback_download);
};

function callback_download(e){
	var changelog = e.data.change_log.replace("[br]", "\n");
	console.log(changelog);
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
				console.log(e.data);
				Ti.Platform.openURL(e.data.url);/*
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
	
}
