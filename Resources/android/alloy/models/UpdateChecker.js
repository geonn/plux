var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            id: "INTEGER",
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
            getCheckerById: function(id) {
                var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE id='" + id + "'";
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
            updateModule: function(id, typeName, updateDate) {
                var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE id=" + id;
                var sql_query = "";
                db = Ti.Database.open(collection.config.adapter.db_name);
                var res = db.execute(sql);
                sql_query = res.isValidRow() ? "UPDATE " + collection.config.adapter.collection_name + " SET updated='" + updateDate + "' WHERE id='" + id + "'" : "INSERT INTO " + collection.config.adapter.collection_name + " (id, typeName, updated) VALUES ('" + id + "','" + typeName + "','" + updateDate + "')";
                db.execute(sql_query);
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