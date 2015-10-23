var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            id: "INTEGER PRIMARY KEY",
            u_id: "TEXT",
            duration: "INTEGER",
            clinic_id: "INTEGER",
            start_date: "TEXT",
            end_date: "TEXT",
            remark: "TEXT",
            status: "INTEGER",
            created: "TEXT",
            updated: "TEXT",
            date: "TEXT",
            suggested_date: "TEXT"
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
            addColumn: function(newFieldName, colSpec) {
                var collection = this;
                var db = Ti.Database.open(collection.config.adapter.db_name);
                var fieldExists = false;
                resultSet = db.execute("PRAGMA TABLE_INFO(" + collection.config.adapter.collection_name + ")");
                while (resultSet.isValidRow()) {
                    resultSet.field(1) == newFieldName && (fieldExists = true);
                    resultSet.next();
                }
                fieldExists || db.execute("ALTER TABLE " + collection.config.adapter.collection_name + " ADD COLUMN " + newFieldName + " " + colSpec);
                db.close();
            },
            getAppointmentList: function(ex) {
                var query_clinicid = "undefined" != typeof ex.clinicId ? " AND clinic_id= ? " : "";
                var query_start_date = "undefined" != typeof ex.start_date ? " AND start_date >= ? AND start_date < ? " : "";
                var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE u_id='" + ex.u_id + "' " + query_clinicid + query_start_date + " AND status != 5 ORDER BY created DESC";
                db = Ti.Database.open(collection.config.adapter.db_name);
                if ("undefined" != typeof ex.clinicId) var res = db.execute(sql, ex.clinicId, ex.start_date, ex.end_date); else var res = db.execute(sql);
                var listArr = [];
                var count = 0;
                while (res.isValidRow()) {
                    listArr[count] = {
                        id: res.fieldByName("id"),
                        u_id: res.fieldByName("u_id"),
                        clinic_id: res.fieldByName("clinic_id"),
                        status: res.fieldByName("status"),
                        start_date: res.fieldByName("start_date"),
                        duration: res.fieldByName("duration"),
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
                db.execute("BEGIN");
                arr.forEach(function(entry) {
                    var sql_query = "INSERT OR IGNORE INTO " + collection.config.adapter.collection_name + " (id, u_id,clinic_id, remark,  status,start_date,end_date, duration,suggested_date, created, updated) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
                    db.execute(sql_query, entry.id, entry.u_id, entry.clinic_id, entry.remark, entry.status, entry.start_date, entry.end_date, entry.duration, entry.suggested_date, entry.created, entry.updated);
                    var sql_query = "UPDATE " + collection.config.adapter.collection_name + " SET clinic_id=?,remark=?,status=?,start_date=?,end_date=?, duration=?, suggested_date=?,updated=? WHERE id=?";
                    db.execute(sql_query, entry.clinic_id, entry.remark, entry.status, entry.start_date, entry.end_date, entry.duration, entry.suggested_date, entry.updated, entry.id);
                });
                db.execute("COMMIT");
                db.close();
                collection.trigger("sync");
            },
            updateAppointmentStatus: function(id, statusCode) {
                var collection = this;
                db = Ti.Database.open(collection.config.adapter.db_name);
                var sql_query = "UPDATE " + collection.config.adapter.collection_name + " SET status=? WHERE id=?";
                db.execute(sql_query, statusCode, id);
                db.close();
                collection.trigger("sync");
            },
            getAppointmentById: function(id) {
                var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE id ='" + id + "'";
                db = Ti.Database.open(collection.config.adapter.db_name);
                var res = db.execute(sql);
                var arr = [];
                res.isValidRow() && (arr = {
                    id: res.fieldByName("id"),
                    u_id: res.fieldByName("u_id"),
                    duration: res.fieldByName("duration"),
                    start_date: res.fieldByName("start_date"),
                    end_date: res.fieldByName("end_date"),
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