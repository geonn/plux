var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            id: "INTEGER PRIMARY KEY AUTOINCREMENT",
            title: "TEXT",
            message: "TEXT",
            created: "TEXT",
            updated: "TEXT"
        },
        adapter: {
            type: "sql",
            collection_name: "medicalRecords"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {});
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {
            getRecordsList: function() {
                var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + "  order by updated DESC";
                db = Ti.Database.open(collection.config.adapter.db_name);
                "android" != Ti.Platform.osname && db.file.setRemoteBackup(false);
                var res = db.execute(sql);
                var listArr = [];
                var count = 0;
                while (res.isValidRow()) {
                    listArr[count] = {
                        id: res.fieldByName("id"),
                        title: res.fieldByName("title"),
                        message: res.fieldByName("message"),
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
            getRecordById: function(id) {
                var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE id='" + id + "'";
                db = Ti.Database.open(collection.config.adapter.db_name);
                "android" != Ti.Platform.osname && db.file.setRemoteBackup(false);
                var res = db.execute(sql);
                var arr = [];
                res.isValidRow() && (arr = {
                    id: res.fieldByName("id"),
                    title: res.fieldByName("title"),
                    message: res.fieldByName("message"),
                    created: res.fieldByName("created"),
                    updated: res.fieldByName("updated")
                });
                res.close();
                db.close();
                collection.trigger("sync");
                return arr;
            },
            removeRecordById: function() {
                var collection = this;
                var sql = "DELETE FROM " + collection.config.adapter.collection_name + " WHERE id='" + id + "'";
                db = Ti.Database.open(collection.config.adapter.db_name);
                "android" != Ti.Platform.osname && db.file.setRemoteBackup(false);
                db.execute(sql);
                db.close();
                collection.trigger("sync");
            },
            searchRecord: function(query) {
                var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE title LIKE '%" + query + "%' OR message LIKE '%" + query + "%'";
                db = Ti.Database.open(collection.config.adapter.db_name);
                "android" != Ti.Platform.osname && db.file.setRemoteBackup(false);
                var res = db.execute(sql);
                var listArr = [];
                var count = 0;
                while (res.isValidRow()) {
                    listArr[count] = {
                        id: res.fieldByName("id"),
                        title: res.fieldByName("title"),
                        message: res.fieldByName("message"),
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
                var title = entry.title;
                title = title.replace(/["']/g, "&quot;");
                var message = entry.message;
                message = message.replace(/["']/g, "&quot;");
                sql_query = "INSERT INTO " + collection.config.adapter.collection_name + "( title,message, created, updated ) VALUES ( '" + title + "', '" + message + "', '" + entry.created + "', '" + entry.updated + "')";
                db.execute(sql_query);
                db.close();
                collection.trigger("sync");
            }
        });
        return Collection;
    }
};

model = Alloy.M("medicalRecords", exports.definition, []);

collection = Alloy.C("medicalRecords", exports.definition, model);

exports.Model = model;

exports.Collection = collection;