var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            id: "INTEGER PRIMARY KEY",
            u_id: "TEXT",
            clinic_id: "INTEGER",
            date: "TEXT",
            remark: "TEXT",
            status: "INTEGER",
            suggested_date: "TEXT",
            created: "TEXT",
            updated: "TEXT"
        },
        adapter: {
            type: "sql",
            collection_name: "appointment",
            idAttribute: "id"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {});
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {
            getAppointmentList: function(ex) {
                var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE u_id=" + ex.u_id + " AND status != 5 ORDER BY created DESC";
                db = Ti.Database.open(collection.config.adapter.db_name);
                "android" != Ti.Platform.osname && db.file.setRemoteBackup(false);
                var res = db.execute(sql);
                var listArr = [];
                var count = 0;
                while (res.isValidRow()) {
                    listArr[count] = {
                        id: res.fieldByName("id"),
                        u_id: res.fieldByName("u_id"),
                        clinic_id: res.fieldByName("clinic_id"),
                        status: res.fieldByName("status"),
                        date: res.fieldByName("date"),
                        remark: res.fieldByName("remark"),
                        created: res.fieldByName("created"),
                        updated: res.fieldByName("updated")
                    };
                    res.next();
                    count++;
                }
                res.close();
                db.close();
                collection.trigger("sync");
                return listArr;
            },
            saveArray: function(arr) {
                var collection = this;
                db = Ti.Database.open(collection.config.adapter.db_name);
                "android" != Ti.Platform.osname && db.file.setRemoteBackup(false);
                db.execute("BEGIN");
                arr.forEach(function(entry) {
                    var sql_query = "INSERT OR IGNORE INTO " + collection.config.adapter.collection_name + " (id, u_id,clinic_id, remark,  status,date,suggested_date, created, updated) VALUES (?,?,?,?,?,?,?,?,?)";
                    db.execute(sql_query, entry.id, entry.u_id, entry.clinic_id, entry.remark, entry.status, entry.date, entry.suggested_date, entry.created, entry.updated);
                    var sql_query = "UPDATE " + collection.config.adapter.collection_name + " SET clinic_id=?,remark=?,status=?,date=?,suggested_date=?,updated=? WHERE id=?";
                    db.execute(sql_query, entry.clinic_id, entry.remark, entry.status, entry.date, entry.suggested_date, entry.updated, entry.id);
                });
                db.execute("COMMIT");
                db.close();
                collection.trigger("sync");
            },
            updateAppointmentStatus: function(id, statusCode) {
                var collection = this;
                db = Ti.Database.open(collection.config.adapter.db_name);
                "android" != Ti.Platform.osname && db.file.setRemoteBackup(false);
                var sql_query = "UPDATE " + collection.config.adapter.collection_name + " SET status=? WHERE id=?";
                db.execute(sql_query, statusCode, id);
                db.close();
                collection.trigger("sync");
            },
            getAppointmentById: function(id) {
                var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE id ='" + id + "' AND status != 5 ";
                db = Ti.Database.open(collection.config.adapter.db_name);
                "android" != Ti.Platform.osname && db.file.setRemoteBackup(false);
                var res = db.execute(sql);
                var arr = [];
                res.isValidRow() && (arr = {
                    id: res.fieldByName("id"),
                    u_id: res.fieldByName("u_id"),
                    clinic_id: res.fieldByName("clinic_id"),
                    status: res.fieldByName("status"),
                    date: res.fieldByName("date"),
                    remark: res.fieldByName("remark"),
                    created: res.fieldByName("created"),
                    updated: res.fieldByName("updated")
                });
                res.close();
                db.close();
                collection.trigger("sync");
                return arr;
            }
        });
        return Collection;
    }
};

model = Alloy.M("appointment", exports.definition, []);

collection = Alloy.C("appointment", exports.definition, model);

exports.Model = model;

exports.Collection = collection;