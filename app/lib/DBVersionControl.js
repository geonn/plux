/*********************
*** DB VERSION CONTROL ***
* 
* Latest Version 1.9
* 
**********************/

// update user device token
exports.checkAndUpdate = function(e){
	var dbVersion = Ti.App.Properties.getString("dbVersion") || "2.9"; 
	
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
		var health = Alloy.createCollection('health');
		health.addColumn("u_id", "INTEGER");
		health.dropTable();
		var medicalRecordsModel = Alloy.createCollection('medicalRecords');   
		medicalRecordsModel.addColumn("u_id", "TEXT"); 

		dbVersion = '1.9';
	}
	
	if(dbVersion == "1.9"){
		var helpline = Alloy.createCollection('helpline');
		helpline.addColumn("status", "INTEGER");
		helpline.V1_9DBupdate();
		dbVersion = '2.0';
	}
	
	if(dbVersion == "2.0"){
		var panelList = Alloy.createCollection('panelList');
		panelList.addColumn("status", "INTEGER");
		
		var doctor_panel = Alloy.createCollection('doctor_panel');
		doctor_panel.addColumn("status", "INTEGER");
		
		dbVersion = '2.1';
	}
	
	if(dbVersion == "2.1"){
		var model = Alloy.createCollection('notification');
		model.addColumn("detail", "TEXT");
		
		dbVersion = '2.2';
	}
	if(dbVersion == "2.2"){
		var mav2_model = Alloy.createCollection('medicalAttachmentV2');
		mav2_model.addColumn("format", "TEXT");
		
		var mrv2_model = Alloy.createCollection('medicalRecordsV2');
		mrv2_model.addColumn("lab_report_id", "TEXT");
		
		dbVersion = '2.3';
	}
	if(dbVersion == "2.3"){
		 
		var mrv2_model = Alloy.createCollection('medicalRecordsV2');
		mrv2_model.addColumn("lab_report_link", "TEXT");
		
		dbVersion = '2.4';
	}
	if(dbVersion == "2.4"){
		 
		var mrv2_model = Alloy.createCollection('helpline');
		mrv2_model.addColumn("format", "TEXT");
		
		dbVersion = '2.5';
	}
	if(dbVersion == "2.5"){
		 
		var mrv2_model = Alloy.createCollection('helpline');
		mrv2_model.addColumn("dr_id", "INTEGER");
		mrv2_model.setColumnValue("dr_id", 0);
		
		dbVersion = '2.6';
	}
	if(dbVersion == "2.6"){
		Ti.App.Properties.removeProperty('u_id');
		
		dbVersion = '2.7';
	}
	if(dbVersion == "2.7"){
		var mrv2_model = Alloy.createCollection('updateChecker');
		mrv2_model.addColumn("extra", "TEXT");
		
		dbVersion = '2.8';
	}
	if(dbVersion == "2.8"){
		var mrv2_model = Alloy.createCollection('health');
		mrv2_model.addColumn("field3", "TEXT");
		mrv2_model.addColumn("field4", "TEXT");
		mrv2_model.addColumn("remark", "TEXT");
		var medicalRecordsV2_model = Alloy.createCollection('medicalRecordsV2');
		medicalRecordsV2_model.addColumn("editable", "INTEGER");
		dbVersion = '2.9';
	}
	Ti.App.Properties.setString("dbVersion", dbVersion);
};

