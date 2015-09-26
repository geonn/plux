var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            id: "INTEGER",
            name: "TEXT",
            dr_code: "TEXT",
            status: "INTEGER",
            email: "INTEGER",
            mobile: "TEXT",
            specialty: "TEXT",
            qualification: "TEXT",
            introduction: "TEXT",
            created: "TEXT",
            updated: "TEXT"
        },
        adapter: {
            type: "sql",
            collection_name: "doctors",
            idAttribute: "id"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {});
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {
            getDoctorList: function() {
                var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE `status` =1 ORDER BY name ASC";
                db = Ti.Database.open(collection.config.adapter.db_name);
                "android" != Ti.Platform.osname && db.file.setRemoteBackup(false);
                var res = db.execute(sql);
                var listArr = [];
                var count = 0;
                while (res.isValidRow()) {
                    listArr[count] = {
                        id: res.fieldByName("id"),
                        name: res.fieldByName("name"),
                        dr_code: res.fieldByName("dr_code"),
                        email: res.fieldByName("email"),
                        status: res.fieldByName("status"),
                        mobile: res.fieldByName("mobile"),
                        specialty: res.fieldByName("specialty"),
                        qualification: res.fieldByName("qualification"),
                        introduction: res.fieldByName("introduction"),
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
            getDoctorById: function(id) {
                var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE id ='" + id + "' ";
                db = Ti.Database.open(collection.config.adapter.db_name);
                "android" != Ti.Platform.osname && db.file.setRemoteBackup(false);
                var res = db.execute(sql);
                var arr = [];
                res.isValidRow() && (arr = {
                    id: res.fieldByName("id"),
                    name: res.fieldByName("name"),
                    dr_code: res.fieldByName("dr_code"),
                    email: res.fieldByName("email"),
                    status: res.fieldByName("status"),
                    mobile: res.fieldByName("mobile"),
                    specialty: res.fieldByName("specialty"),
                    qualification: res.fieldByName("qualification"),
                    introduction: res.fieldByName("introduction"),
                    created: res.fieldByName("created"),
                    updated: res.fieldByName("updated")
                });
                res.close();
                db.close();
                collection.trigger("sync");
                return arr;
            },
            saveArray: function(arr) {
                var collection = this;
                db = Ti.Database.open(collection.config.adapter.db_name);
                "android" != Ti.Platform.osname && db.file.setRemoteBackup(false);
                db.execute("BEGIN");
                arr.forEach(function(entry) {
                    var sql_query = "INSERT OR IGNORE INTO " + collection.config.adapter.collection_name + " (id, name,dr_code, email, mobile,status,specialty,qualification,introduction, created, updated) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
                    db.execute(sql_query, entry.id, entry.name, entry.dr_code, entry.email, entry.mobile, entry.status, entry.specialty, entry.qualification, entry.introduction, entry.created, entry.updated);
                    var sql_query = "UPDATE " + collection.config.adapter.collection_name + " SET name=?,dr_code=?, email=?,mobile=?,status=?,specialty=?,qualification=?,introduction=?,updated=? WHERE id=?";
                    db.execute(sql_query, entry.name, entry.dr_code, entry.email, entry.mobile, entry.status, entry.specialty, entry.qualification, entry.introduction, entry.updated, entry.id);
                });
                db.execute("COMMIT");
                db.close();
                collection.trigger("sync");
            },
            resetDoctors: function() {
                var collection = this;
                var sql = "DELETE FROM " + collection.config.adapter.collection_name;
                db = Ti.Database.open(collection.config.adapter.db_name);
                "android" != Ti.Platform.osname && db.file.setRemoteBackup(false);
                db.execute(sql);
                db.close();
                collection.trigger("sync");
            }
        });
        return Collection;
    }
};

model = Alloy.M("doctors", exports.definition, []);

collection = Alloy.C("doctors", exports.definition, model);

exports.Model = model;

exports.Collection = collection;