var Alloy = require("/alloy"), _ = require("/alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            id: "INTEGER PRIMARY KEY AUTOINCREMENT",
            img_path: "TEXT",
            time: "INTEGER"
        },
        adapter: {
            type: "sql",
            collection_name: "home_background"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {});
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {
            getBackgroundList: function() {
                var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + "  order by id";
                db = Ti.Database.open(collection.config.adapter.db_name);
                var res = db.execute(sql);
                var listArr = [];
                var count = 0;
                while (res.isValidRow()) {
                    listArr[count] = {
                        id: res.fieldByName("id"),
                        img_path: res.fieldByName("img_path"),
                        time: res.fieldByName("time")
                    };
                    res.next();
                    count++;
                }
                res.close();
                db.close();
                collection.trigger("sync");
                return listArr;
            },
            getCategoryByTime: function(time) {
                var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE time <= ? order by time desc";
                db = Ti.Database.open(collection.config.adapter.db_name);
                var res = db.execute(sql, time);
                var arr = [];
                res.isValidRow() && (arr = {
                    id: res.fieldByName("id"),
                    img_path: res.fieldByName("img_path"),
                    time: res.fieldByName("time")
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

model = Alloy.M("home_background", exports.definition, []);

collection = Alloy.C("home_background", exports.definition, model);

exports.Model = model;

exports.Collection = collection;