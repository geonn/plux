var Alloy = require("/alloy"), _ = require("/alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            id: "INTEGER PRIMARY KEY",
            name: "TEXT",
            dr_code: "TEXT",
            status: "INTEGER",
            email: "TEXT",
            mobile: "TEXT",
            specialty: "TEXT",
            qualification: "TEXT",
            introduction: "TEXT",
            created: "TEXT",
            updated: "TEXT",
            img_path: "TEXT"
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
            getDoctorListGroupBySpecialty: function(params) {
                var addon = "";
                var params_length = "undefined" != typeof params ? params.length : 0;
                for (var i = 0; params_length > i; i++) {
                    var key = params[i].key || "";
                    var value = params[i].value || "";
                    console.log(params[i]);
                    addon += " AND " + key + " like '%" + value + "%'";
                }
                var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE `status` =1 " + addon + " group by specialty ORDER BY name ASC";
                db = Ti.Database.open(collection.config.adapter.db_name);
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
                        updated: res.fieldByName("updated"),
                        img_path: res.fieldByName("img_path")
                    };
                    res.next();
                    count++;
                }
                console.log(listArr);
                res.close();
                db.close();
                collection.trigger("sync");
                return listArr;
            },
            getDoctorList: function(params) {
                var addon = "";
                for (var i = 0; i < params.length; i++) {
                    var key = params[i].key || "";
                    var value = params[i].value || "";
                    addon = " AND " + key + " = '" + value + "'";
                }
                var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE `status` = 1 " + addon + " ORDER BY name ASC";
                db = Ti.Database.open(collection.config.adapter.db_name);
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
                        updated: res.fieldByName("updated"),
                        img_path: res.fieldByName("img_path")
                    };
                    res.next();
                    console.log(count);
                    count++;
                }
                console.log(listArr);
                res.close();
                db.close();
                collection.trigger("sync");
                return listArr;
            },
            getDoctorById: function(id) {
                var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE id = ? ";
                db = Ti.Database.open(collection.config.adapter.db_name);
                var res = db.execute(sql, id);
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
                    updated: res.fieldByName("updated"),
                    img_path: res.fieldByName("img_path")
                });
                res.close();
                db.close();
                collection.trigger("sync");
                return arr;
            },
            saveArray: function(arr) {
                var collection = this;
                var columns = collection.config.columns;
                var names = [];
                for (var k in columns) names.push(k);
                db = Ti.Database.open(collection.config.adapter.db_name);
                console.log(arr.length + " number of arr to save into " + collection.config.adapter.db_name);
                db.execute("BEGIN");
                arr.forEach(function(entry) {
                    var keys = [];
                    var eval_values = [];
                    for (var k in entry) entry.hasOwnProperty(k) && _.find(names, function(name) {
                        if (name == k) {
                            keys.push(k);
                            entry[k] = null == entry[k] ? "" : entry[k];
                            entry[k] = entry[k].replace(/'/g, "\\'");
                            eval_values.push('"' + entry[k] + '"');
                        }
                    });
                    var sql_query = "INSERT OR REPLACE INTO " + collection.config.adapter.collection_name + " (" + keys.join() + ") VALUES (" + eval_values.join() + ")";
                    console.log(sql_query);
                    db.execute(sql_query);
                });
                db.execute("COMMIT");
                db.close();
                collection.trigger("sync");
            },
            resetDoctors: function(id) {
                var collection = this;
                var sql = "DELETE FROM " + collection.config.adapter.collection_name;
                db = Ti.Database.open(collection.config.adapter.db_name);
                db.execute(sql);
                db.close();
                collection.trigger("sync");
            },
            rebuildDb: function() {
                console.log("rebuildDb");
                var collection = this;
                db = Ti.Database.open(collection.config.adapter.db_name);
                db.execute("DROP TABLE IF EXISTS doctors");
                db.execute("CREATE TABLE IF NOT EXISTS doctors(id INTEGER PRIMARY KEY, name TEXT, dr_code TEXT, status INTEGER, email TEXT, mobile TEXT, specialty TEXT, qualification TEXT, introduction TEXT, created DATE, updated DATE);");
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