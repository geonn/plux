var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            id: "INTEGER",
            category: "TEXT"
        },
        adapter: {
            type: "sql",
            collection_name: "category"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {});
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {
            getCategoryList: function() {
                var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + "  order by id";
                db = Ti.Database.open(collection.config.adapter.db_name);
                var res = db.execute(sql);
                var listArr = [];
                var count = 0;
                while (res.isValidRow()) {
                    listArr[count] = {
                        id: res.fieldByName("id"),
                        category: res.fieldByName("category")
                    };
                    res.next();
                    count++;
                }
                res.close();
                db.close();
                collection.trigger("sync");
                return listArr;
            },
            getCategoryById: function(id) {
                var collection = this;
<<<<<<< HEAD
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE id =? ";
                db = Ti.Database.open(collection.config.adapter.db_name);
                var res = db.execute(sql, id);
=======
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE id ='" + id + "' ";
                db = Ti.Database.open(collection.config.adapter.db_name);
                var res = db.execute(sql);
>>>>>>> origin/master
                var arr = [];
                res.isValidRow() && (arr = {
                    id: res.fieldByName("id"),
                    category: res.fieldByName("category")
                });
                res.close();
                db.close();
                collection.trigger("sync");
                return arr;
            },
            resetCategory: function() {
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

model = Alloy.M("category", exports.definition, []);

collection = Alloy.C("category", exports.definition, model);

exports.Model = model;

exports.Collection = collection;