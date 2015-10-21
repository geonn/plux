/*********************
*** DB VERSION CONTROL ***
* 
* Latest Version 1.1
* 
**********************/

// update user device token
exports.checkAndUpdate = function(e){
	var dbVersion = Ti.App.Properties.getString("dbVersion");
	console.log(dbVersion);
	if (dbVersion == '1.0') {
	  // do 1.1 upgrade
		var panelList = Alloy.createCollection('panelList'); 
		panelList.addColumn("panel", "INTEGER");
		dbVersion = '1.1';
	}
	if(dbVersion == 1.1){
		// do 1.1 upgrade
		var appointment = Alloy.createCollection('appointment'); 
		appointment.addColumn("start_date", "TEXT");
		appointment.addColumn("end_date", "TEXT");
		appointment.addColumn("duration", "INTEGER");
		dbVersion = '1.2';
	}
	Ti.App.Properties.setString("dbVersion", dbVersion);
};

