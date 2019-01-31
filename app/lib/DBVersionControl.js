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
		var medicalAttachmentV2 = Alloy.createCollection('medicalAttachmentV2');
		var chat = Alloy.createCollection('chat');
		var updateChecker = Alloy.createCollection('updateChecker');
		var notification = Alloy.createCollection('notification');

		notification.addColumn("detail", "TEXT");

		medicalAttachmentV2.addColumn("format", "TEXT");
		medicalRecordsV2.addColumn("lab_report_id", "TEXT");
		medicalRecordsV2.addColumn("lab_report_link", "TEXT");

		updateChecker.addColumn("extra", "TEXT");

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
