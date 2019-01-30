/*********************
*** DB VERSION CONTROL ***
* 
* Latest Version 1.9
* 
**********************/

// update user device token
exports.checkAndUpdate = function(e){
	var dbVersion = Ti.App.Properties.getString("dbVersion") || 3.2;
	if(parseFloat(dbVersion) < 3.1){
		var health = Alloy.createCollection('health');
		var medicalRecordsV2 = Alloy.createCollection('medicalRecordsV2');
		var chat = Alloy.createCollection('chat');
		
		health.addColumn("field3", "TEXT");
		health.addColumn("field4", "TEXT");
		health.addColumn("remark", "TEXT");
		
		medicalRecordsV2.addColumn("editable", "INTEGER");
        
        chat.addColumn("room_id", "TEXT");
        chat.addColumn("dr_specialty", "TEXT");
        chat.addColumn("dr_qualification", "TEXT");
        chat.addColumn("dr_introduction", "TEXT");
        chat.addColumn("dr_img_path", "TEXT");
        dbVersion = 3.2;
    }
	Ti.App.Properties.setString("dbVersion", dbVersion);
};

