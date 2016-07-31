/*********************
*** DB VERSION CONTROL ***
* 
* Latest Version 1.8
* 
**********************/

// update user device token
exports.checkAndUpdate = function(e){
	var dbVersion = Ti.App.Properties.getString("dbVersion") || 1.9;
	 
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
	
	if(dbVersion == 1.2){
		var doctors = Alloy.createCollection('doctors'); 
		doctors.addColumn("clinic_id", "INTEGER");
		var appointment = Alloy.createCollection('appointment');
		appointment.addColumn("specialty", "TEXT"); 
		dbVersion = '1.3';
	}
	
	if(dbVersion == "1.3"){
		var notification = Alloy.createCollection('notification'); 
		notification.addColumn("status", "INTEGER");
		dbVersion = '1.4';
	}
	
	if(dbVersion == "1.4"){
		var doctors_model = Alloy.createCollection('doctors'); 
		doctors_model.rebuildDb();
		dbVersion = '1.5';
	}
	if(dbVersion == "1.5"){
		
		var notification = Alloy.createCollection('doctors'); 
		notification.addColumn("img_path", "TEXT");
		dbVersion = '1.6';
	}
	if(dbVersion == "1.6"){
		
		var claim_detail = Alloy.createCollection('claim_detail'); 
		claim_detail.addColumn("appcode", "TEXT");
		dbVersion = '1.7';
	}
	
	if(dbVersion == "1.7"){
		var helpline = Alloy.createCollection('helpline'); 
		helpline.resetTable();
		var checker = Alloy.createCollection('updateChecker'); 
		checker.addColumn("u_id", "INTEGER");
		checker.updateModule(7, "getHelplineMessage", "");
		dbVersion = '1.8';
	}
	
	if(dbVersion == "1.8"){
		var medicalRecordsModel = Alloy.createCollection('medicalRecords');   
		medicalRecordsModel.addColumn("u_id", "TEXT"); 
		dbVersion = '1.9';
	}
	Ti.App.Properties.setString("dbVersion", dbVersion);
};

