var Alloy = require("/alloy"), _ = require("/alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            id: "INTEGER PRIMARY KEY",
            u_id: "INTEGER",
            type: "TEXT",
            val: "TEXT",
            status: "TEXT",
            created: "TEXT",
            updated: "TEXT"
        },
        adapter: {
            type: "sql",
            collection_name: "personal_info"
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
            getData: function(type) {
                var collection = this;
                var u_id = Ti.App.Properties.getString("u_id");
                var sql = "SELECT * from " + collection.config.adapter.collection_name + " where u_id = ? AND type = ? AND status != 2 order by created desc";
                console.log(type + " type");
                db = Ti.Database.open(collection.config.adapter.db_name);
                var res = db.execute(sql, u_id, type);
                var arr = [];
                var count = 0;
                while (res.isValidRow()) {
                    arr[count] = {
                        id: res.fieldByName("id"),
                        u_id: res.fieldByName("u_id"),
                        type: res.fieldByName("type"),
                        val: res.fieldByName("val"),
                        status: res.fieldByName("status"),
                        created: res.fieldByName("created"),
                        updated: res.fieldByName("updated")
                    };
                    res.next();
                    count++;
                }
                res.close();
                db.close();
                collection.trigger("sync");
                return arr;
            },
            getDataById: function(id) {
                var collection = this;
                Ti.App.Properties.getString("u_id");
                var sql = "SELECT * from " + collection.config.adapter.collection_name + " where id = ?";
                db = Ti.Database.open(collection.config.adapter.db_name);
                var res = db.execute(sql, id);
                var arr;
                var count = 0;
                while (res.isValidRow()) {
                    arr = {
                        id: res.fieldByName("id"),
                        u_id: res.fieldByName("u_id"),
                        type: res.fieldByName("type"),
                        val: res.fieldByName("val"),
                        status: res.fieldByName("status"),
                        created: res.fieldByName("created"),
                        updated: res.fieldByName("updated")
                    };
                    res.next();
                    count++;
                }
                res.close();
                db.close();
                collection.trigger("sync");
                return arr;
            },
            removeRecordById: function(id) {
                var collection = this;
                var sql = "DELETE FROM " + collection.config.adapter.collection_name + " WHERE id=?";
                db = Ti.Database.open(collection.config.adapter.db_name);
                db.execute(sql, id);
                db.close();
                collection.trigger("sync");
            },
            saveArray: function(arr) {
                var collection = this;
                var columns = collection.config.columns;
                var names = [];
                for (var k in columns) names.push(k);
                db = Ti.Database.open(collection.config.adapter.db_name);
                arr.forEach(function(entry) {
                    var keys = [];
                    var eval_values = [];
                    for (var k in entry) entry.hasOwnProperty(k) && _.find(names, function(name) {
                        if (name == k) {
                            keys.push(k);
                            eval_values.push("'" + entry[k] + "'");
                        }
                    });
                    var sql_query = "INSERT OR REPLACE INTO " + collection.config.adapter.collection_name + " (" + keys.join() + ") VALUES (" + eval_values.join() + ")";
                    console.log(sql_query);
                    db.execute(sql_query);
                });
                db.close();
                collection.trigger("sync");
            }
        });
        return Collection;
    }
};

model = Alloy.M("personal_info", exports.definition, []);

collection = Alloy.C("personal_info", exports.definition, model);

exports.Model = model;

exports.Collection = collection;