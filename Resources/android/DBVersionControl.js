exports.checkAndUpdate = function() {
    var dbVersion = Ti.App.Properties.getString("dbVersion");
    console.log(dbVersion);
    if (dbVersion = "1.0") {
        var panelList = Alloy.createCollection("panelList");
        panelList.addColumn("panel", "INTEGER");
        dbVersion = "1.1";
    }
    Ti.App.Properties.setString("dbVersion", dbVersion);
};