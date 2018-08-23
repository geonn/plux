// load the Scandit SDK module
var scanditsdk = require("com.mirasense.scanditsdk"); 
if(Ti.Platform.osname == 'iphone' || Ti.Platform.osname == 'ipad'){
	//Titanium.UI.iOS.statusBarHidden = true;
}
scanditsdk.appKey = "qt/U+huGEeSG62SYxtngPa7xVDA0BLRMw7gQLH8qAB0"; 
scanditsdk.cameraFacingPreference = 0; 

// Sets up the scanner and starts it in a new window.
exports.openScanner = function(scanType) {
	// First set the app key and which direction the camera should face.
	console.log("scanType"+scanType);
	// Only after setting the app key instantiate the Scandit SDK Barcode Picker view
	var picker = scanditsdk.createView({
		width:"100%",
		height:"100%"
	});
	// Before calling any other functions on the picker you have to call init()
	picker.init();
	// add a tool bar at the bottom of the scan view with a cancel button (iphone/ipad only)
	picker.showToolBar(true);
	// Create a window to add the picker to and display it. 
	var window = Titanium.UI.createWindow({  
			title:'Scandit SDK',
			navBarHidden:true
	});
	// Set callback functions for when scanning succeeds and for when the 
	// scanning is canceled. This callback is called on the scan engine's
	// thread to allow you to synchronously call stopScanning or
	// pauseScanning. Any UI specific calls from within this function 
	// have to be issued through setTimeout to switch to the UI thread
	// first.
	picker.setSuccessCallback(function(e) {
	    var barcode = e.barcode;
	    console.log(barcode);
	    var barRes = barcode.split('||');
	    Ti.App.fireEvent('qr_callback', {merchant : barRes[0], item: barRes[1], amount: barRes[2]});
	    setTimeout(function() {
            window.close();
            window.remove(picker);
        }, 1);
	    return;
		var time1 = Ti.App.Properties.getString('time1') || ""; 
		var time2 = Ti.App.Properties.getString('time2') || ""; 
		var barcode = e.barcode;
		var barRes = barcode.split('||');

		if(time1 == ""){
			Ti.App.Properties.setString('time1',barRes[13] ); 
		}else{
			if(time1 == barRes[13]){
				console.log("Invalid scan. Please scan again with PLUX Health app");
			}else{
				var param = {
					name : barRes[0],
					id : barRes[1],
					icno : barRes[2],
					memno : barRes[3],
					empno : barRes[4],
					relation : barRes[5],
					corpcode : barRes[6],
					corpname : barRes[7],
					costcenter : barRes[8],
					dept : barRes[9],
					allergy : barRes[10],
					isver : barRes[11],
					verno : barRes[12],
					cardno : barRes[14],
				}; 
			
				Ti.App.Properties.setString('time1', '');  
				Ti.App.fireEvent('getCardData', {data : param});
				setTimeout(function() {
					window.close();
					window.remove(picker);
				}, 1);
			}
		}
	});
	picker.setCancelCallback(function(e) {
		picker.stopScanning();
		window.close();
		window.remove(picker);
	});

	window.add(picker);
	window.addEventListener('open', function(e) {
		picker.startScanning();		// startScanning() has to be called after the window is opened. 
	});
	window.open();
};
