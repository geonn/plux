exports.checkAndUpdate = function() {
    var dbVersion = Ti.App.Properties.getString("dbVersion") || 1.8;
    if ("1.0" == dbVersion) {
        var panelList = Alloy.createCollection("panelList");
        panelList.addColumn("panel", "INTEGER");
        dbVersion = "1.1";
    }
    if (1.1 == dbVersion) {
        var appointment = Alloy.createCollection("appointment");
        appointment.addColumn("start_date", "TEXT");
        appointment.addColumn("end_date", "TEXT");
        appointment.addColumn("duration", "INTEGER");
        dbVersion = "1.2";
    }
    if (1.2 == dbVersion) {
        var doctors = Alloy.createCollection("doctors");
        doctors.addColumn("clinic_id", "INTEGER");
        var appointment = Alloy.createCollection("appointment");
        appointment.addColumn("specialty", "TEXT");
        dbVersion = "1.3";
    }
    if ("1.3" == dbVersion) {
        var notification = Alloy.createCollection("notification");
        notification.addColumn("status", "INTEGER");
        dbVersion = "1.4";
    }
    if ("1.4" == dbVersion) {
        var doctors_model = Alloy.createCollection("doctors");
        doctors_model.rebuildDb();
        dbVersion = "1.5";
    }
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
    dbVersion = "1.7";
    if ("1.7" == dbVersion) {
        var helpline = Alloy.createCollection("helpline");
        helpline.resetTable();
        var checker = Alloy.createCollection("updateChecker");
        checker.addColumn("u_id", "INTEGER");
        checker.updateModule(7, "getHelplineMessage", "");
        dbVersion = "1.8";
    }
    Ti.App.Properties.setString("dbVersion", dbVersion);
};