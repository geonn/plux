var Alloy = require("/alloy"), _ = require("/alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            id: "INTEGER PRIMARY KEY",
            doctor_id: "INTEGER",
            clinic_id: "INTEGER",
            specialty_id: "INTEGER",
            status: "INTEGER",
            created: "TEXT",
            updated: "TEXT"
        },
        adapter: {
            type: "sql",
            collection_name: "doctor_panel",
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
            getData: function(specialty_id) {
                var collection = this;
                var sql = "SELECT doctor_panel.*, doctors.name as doctor_name, doctors.img_path as doctor_img_path, specialty.title as specialty, panelList.clinicName FROM " + collection.config.adapter.collection_name + " LEFT OUTER JOIN doctors ON doctors.id = doctor_panel.doctor_id LEFT OUTER JOIN panelList on panelList.id = doctor_panel.clinic_id LEFT OUTER JOIN specialty on doctor_panel.specialty_id = specialty.id where doctor_panel.specialty_id = ? ORDER BY doctor_panel.clinic_id";
                sql = "select panel_table.*, specialty.title as specialty from (select doctor_table.*, panelList.clinicName from (select doctor_panel.*, doctors.name as doctor_name, doctors.img_path as doctor_img_path from doctor_panel LEFT OUTER JOIN doctors ON doctors.id = doctor_panel.doctor_id where doctor_panel.specialty_id = ?) as doctor_table LEFT OUTER JOIN panelList on panelList.id = doctor_table.clinic_id) as panel_table LEFT OUTER JOIN specialty on panel_table.specialty_id = specialty.id";
                sql = "select doctor_panel.*, doctors.name as doctor_name, doctors.img_path as doctor_img_path from doctor_panel LEFT OUTER JOIN doctors ON doctors.id = doctor_panel.doctor_id where doctors.status =1 AND doctor_panel.status != 2 AND doctor_panel.specialty_id = ?";
                db = Ti.Database.open(collection.config.adapter.db_name);
                var res = db.execute(sql, specialty_id);
                console.log(specialty_id + " " + sql);
                var arr = [];
                var count = 0;
                while (res.isValidRow()) {
                    arr[count] = {
                        id: res.fieldByName("id"),
                        clinic_id: res.fieldByName("clinic_id"),
                        doctor_id: res.fieldByName("doctor_id"),
                        doctor_img_path: res.fieldByName("doctor_img_path"),
                        doctor_name: res.fieldByName("doctor_name"),
                        status: res.fieldByName("status"),
                        specialty_id: res.fieldByName("specialty_id"),
                        status: res.fieldByName("status"),
                        clinic_id: res.fieldByName("clinic_id")
                    };
                    res.next();
                    count++;
                }
                console.log("geo debug:");
                console.log(arr);
                res.close();
                db.close();
                collection.trigger("sync");
                return arr;
            },
            getDataWithClinic: function(doctor_id) {
                var collection = this;
                var sql = "SELECT doctor_panel.*, panelList.clinicName FROM " + collection.config.adapter.collection_name + " left outer join panelList on panelList.id = doctor_panel.clinic_id where doctor_panel.doctor_id = ?";
                db = Ti.Database.open(collection.config.adapter.db_name);
                var res = db.execute(sql, doctor_id);
                var arr = [];
                var count = 0;
                while (res.isValidRow()) {
                    arr[count] = {
                        id: res.fieldByName("id"),
                        doctor_id: res.fieldByName("doctor_id"),
                        clinic_id: res.fieldByName("clinic_id"),
                        clinicName: res.fieldByName("clinicName")
                    };
                    res.next();
                    count++;
                }
                res.close();
                db.close();
                collection.trigger("sync");
                return arr;
            },
            saveArray: function(arr) {
                var collection = this;
                db = Ti.Database.open(collection.config.adapter.db_name);
                db.execute("BEGIN");
                arr.forEach(function(entry) {
                    var sql_query = "INSERT OR IGNORE INTO " + collection.config.adapter.collection_name + " (id, doctor_id, clinic_id, created, updated, specialty_id, status) VALUES (?,?,?,?,?,?,?)";
                    db.execute(sql_query, entry.id, entry.doctor_id, entry.clinic_id, entry.created, entry.updated, entry.specialty_id, entry.status);
                    var sql_query = "UPDATE " + collection.config.adapter.collection_name + " SET doctor_id=?, clinic_id=?, created=?, updated=?, specialty_id=?, status=? WHERE id=?";
                    db.execute(sql_query, entry.doctor_id, entry.clinic_id, entry.created, entry.updated, entry.specialty_id, entry.status, entry.id);
                });
                db.execute("COMMIT");
                db.close();
                collection.trigger("sync");
            },
            saveRecord: function(entry) {
                var collection = this;
                db = Ti.Database.open(collection.config.adapter.db_name);
                var sql_query = "INSERT OR IGNORE INTO " + collection.config.adapter.collection_name + " (id, doctor_id, clinic_id, created, updated, specialty_id) VALUES (?,?,?,?,?,?)";
                db.execute(sql_query, entry.id, entry.doctor_id, entry.clinic_id, entry.created, entry.updated, entry.specialty_id);
                var sql_query = "UPDATE " + collection.config.adapter.collection_name + " SET doctor_id=?, clinic_id=?, created=?, updated=?, specialty_id=? WHERE id=?";
                db.execute(sql_query, entry.doctor_id, entry.clinic_id, entry.created, entry.updated, entry.specialty_id, entry.id);
                db.close();
                collection.trigger("sync");
            },
            resetData: function() {
                var collection = this;
                var sql = "DELETE FROM " + collection.config.adapter.collection_name;
                db = Ti.Database.open(collection.config.adapter.db_name);
                db.execute(sql);
                db.close();
                collection.trigger("sync");
            }
        });
        return Collection;
    }
};

model = Alloy.M("doctor_panel", exports.definition, []);

collection = Alloy.C("doctor_panel", exports.definition, model);

exports.Model = model;

exports.Collection = collection;