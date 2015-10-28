exports.checkAndUpdate = function() {
    var dbVersion = Ti.App.Properties.getString("dbVersion");
    console.log(dbVersion);
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
    Ti.App.Properties.setString("dbVersion", dbVersion);
};