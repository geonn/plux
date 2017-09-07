var Alloy = require("/alloy"), _ = require("/alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            id: "INTEGER PRIMARY KEY",
            title: "TEXT",
            status: "INTEGER",
            created: "DATE",
            updated: "DATE"
        },
        adapter: {
            type: "sql",
            collection_name: "specialty",
            idAttribute: "id"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {});
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {
            getData: function() {
                var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " where status = 1";
                db = Ti.Database.open(collection.config.adapter.db_name);
                var res = db.execute(sql);
                var arr = [];
                var count = 0;
                while (res.isValidRow()) {
                    arr[count] = {
                        id: res.fieldByName("id"),
                        title: res.fieldByName("title"),
                        status: res.fieldByName("status")
                    };
                    res.next();
                    count++;
                }
                res.close();
                db.close();
                collection.trigger("sync");
                return arr;
            },
            getAvailableData: function() {
                var collection = this;
                var sql = "SELECT specialty.* FROM specialty, doctor_panel where doctor_panel.specialty_id = specialty.id group by specialty.id";
                db = Ti.Database.open(collection.config.adapter.db_name);
                var res = db.execute(sql);
                var arr = [];
                var count = 0;
                while (res.isValidRow()) {
                    arr[count] = {
                        id: res.fieldByName("id"),
                        title: res.fieldByName("title"),
                        status: res.fieldByName("status")
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
                    var sql_query = "INSERT OR IGNORE INTO " + collection.config.adapter.collection_name + " (id, title, status, created, updated) VALUES (?,?,?,?,?)";
                    db.execute(sql_query, entry.id, entry.title, entry.status, entry.created, entry.updated);
                    var sql_query = "UPDATE " + collection.config.adapter.collection_name + " SET title=?, status=?, created=?, updated=? WHERE id=?";
                    db.execute(sql_query, entry.title, entry.status, entry.created, entry.updated, entry.id);
                });
                db.execute("COMMIT");
                db.close();
                collection.trigger("sync");
            },
            saveRecord: function(entry) {
                var collection = this;
                db = Ti.Database.open(collection.config.adapter.db_name);
                var sql_query = "INSERT OR IGNORE INTO " + collection.config.adapter.collection_name + " (id, title, status, created, updated) VALUES (?,?,?,?,?)";
                db.execute(sql_query, entry.id, entry.title, entry.status, entry.created, entry.updated);
                var sql_query = "UPDATE " + collection.config.adapter.collection_name + " SET title=?, status=?, created=?, updated=? WHERE id=?";
                db.execute(sql_query, entry.title, entry.status, entry.created, entry.updated, entry.id);
                db.close();
                collection.trigger("sync");
            }
        });
        return Collection;
    }
};

model = Alloy.M("specialty", exports.definition, []);

collection = Alloy.C("specialty", exports.definition, model);

exports.Model = model;

exports.Collection = collection;