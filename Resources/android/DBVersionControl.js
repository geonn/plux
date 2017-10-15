exports.checkAndUpdate = function(e) {
    var dbVersion = Ti.App.Properties.getString("dbVersion") || "2.7";
    if ("1.5" == dbVersion) {
        var notification = Alloy.createCollection("doctors");
        notification.addColumn("img_path", "TEXT");
        dbVersion = "1.6";
    }
    if ("1.6" == dbVersion) {
        var claim_detail = Alloy.createCollection("claim_detail");
        claim_detail.addColumn("appcode", "TEXT");
        dbVersion = "1.7";
    }
    if ("1.7" == dbVersion) {
        var helpline = Alloy.createCollection("helpline");
        helpline.resetTable();
        var checker = Alloy.createCollection("updateChecker");
        checker.addColumn("u_id", "INTEGER");
        checker.updateModule(7, "getHelplineMessage", "");
        dbVersion = "1.8";
    }
    if ("1.8" == dbVersion) {
        var health = Alloy.createCollection("health");
        health.addColumn("u_id", "INTEGER");
        health.dropTable();
        var medicalRecordsModel = Alloy.createCollection("medicalRecords");
        medicalRecordsModel.addColumn("u_id", "TEXT");
        dbVersion = "1.9";
    }
    if ("1.9" == dbVersion) {
        var helpline = Alloy.createCollection("helpline");
        helpline.addColumn("status", "INTEGER");
        helpline.V1_9DBupdate();
        dbVersion = "2.0";
    }
    if ("2.0" == dbVersion) {
        var panelList = Alloy.createCollection("panelList");
        panelList.addColumn("status", "INTEGER");
        var doctor_panel = Alloy.createCollection("doctor_panel");
        doctor_panel.addColumn("status", "INTEGER");
        dbVersion = "2.1";
    }
    if ("2.1" == dbVersion) {
        var model = Alloy.createCollection("notification");
        model.addColumn("detail", "TEXT");
        dbVersion = "2.2";
    }
    if ("2.2" == dbVersion) {
        var mav2_model = Alloy.createCollection("medicalAttachmentV2");
        mav2_model.addColumn("format", "TEXT");
        var mrv2_model = Alloy.createCollection("medicalRecordsV2");
        mrv2_model.addColumn("lab_report_id", "TEXT");
        dbVersion = "2.3";
    }
    if ("2.3" == dbVersion) {
        var mrv2_model = Alloy.createCollection("medicalRecordsV2");
        mrv2_model.addColumn("lab_report_link", "TEXT");
        dbVersion = "2.4";
    }
    if ("2.4" == dbVersion) {
        var mrv2_model = Alloy.createCollection("helpline");
        mrv2_model.addColumn("format", "TEXT");
        dbVersion = "2.5";
    }
    if ("2.5" == dbVersion) {
        var mrv2_model = Alloy.createCollection("helpline");
        mrv2_model.addColumn("dr_id", "INTEGER");
        mrv2_model.setColumnValue("dr_id", 0);
        dbVersion = "2.6";
    }
    if ("2.6" == dbVersion) {
        Ti.App.Properties.removeProperty("u_id");
        dbVersion = "2.7";
    }
    Ti.App.Properties.setString("dbVersion", dbVersion);
};