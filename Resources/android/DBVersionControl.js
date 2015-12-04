exports.checkAndUpdate = function() {
    var dbVersion = Ti.App.Properties.getString("dbVersion") || 1;
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
    dbVersion = "1.2";
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
    Ti.App.Properties.setString("dbVersion", dbVersion);
};