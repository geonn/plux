var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            id: "INTEGER",
            u_id: "INTEGER",
            typeName: "TEXT",
            updated: "TEXT"
        },
        adapter: {
            type: "sql",
            collection_name: "updateChecker"
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
            getCheckerById: function(id, u_id) {
                var collection = this;
                var addon = "";
                "undefined" != typeof u_id && (addon = "AND u_id = " + u_id);
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE id='" + id + "' " + addon;
                db = Ti.Database.open(collection.config.adapter.db_name);
                var res = db.execute(sql);
                var arr = [];
                res.isValidRow() && (arr = {
                    typeName: res.fieldByName("typeName"),
                    updated: res.fieldByName("updated")
                });
                res.close();
                db.close();
                collection.trigger("sync");
                return arr;
            },
            updateModule: function(id, typeName, updateDate, u_id) {
                var collection = this;
                var addon = "";
                "undefined" != typeof u_id ? addon = " AND u_id = " + u_id : u_id = 0;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE id=" + id + addon;
                var sql_query = "";
                db = Ti.Database.open(collection.config.adapter.db_name);
                var res = db.execute(sql);
                sql_query = res.isValidRow() ? "UPDATE " + collection.config.adapter.collection_name + " SET updated='" + updateDate + "' WHERE id='" + id + "'" + addon : "INSERT INTO " + collection.config.adapter.collection_name + " (id, typeName, updated, u_id) VALUES ('" + id + "','" + typeName + "','" + updateDate + "', " + u_id + ")";
                db.execute(sql_query);
                res.close();
                db.close();
                collection.trigger("sync");
            }
        });
        return Collection;
    }
};

model = Alloy.M("updateChecker", exports.definition, []);

collection = Alloy.C("updateChecker", exports.definition, model);

exports.Model = model;

exports.Collection = collection;