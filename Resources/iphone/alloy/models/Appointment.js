var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            id: "INTEGER",
            u_id: "TEXT",
            clinic_id: "INTEGER",
            date: "TEXT",
            remark: "TEXT",
            status: "INTEGER",
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
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE u_id=" + ex.u_id + " ORDER BY created DESC";
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
            addRecord: function(entry) {
                var collection = this;
                db = Ti.Database.open(collection.config.adapter.db_name);
                "android" != Ti.Platform.osname && db.file.setRemoteBackup(false);
                db.execute("BEGIN");
                var sql_query = "INSERT OR IGNORE INTO " + collection.config.adapter.collection_name + " (id, name,dr_code, email, mobile,status,specialty,qualification,introduction, created, updated) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
                db.execute(sql_query, entry.id, entry.name, entry.dr_code, entry.email, entry.mobile, entry.status, entry.specialty, entry.qualification, entry.introduction, entry.created, entry.updated);
                db.execute("COMMIT");
                db.close();
                collection.trigger("sync");
            },
            getAppointmentById: function(id) {
                var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE id ='" + id + "' ";
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