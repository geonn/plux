var Alloy = require("/alloy"), _ = require("/alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            id: "INTEGER",
            title: "TEXT",
            long_title: "TEXT",
            category: "TEXT",
            caption: "TEXT",
            created_date: "TEXT",
            modified_date: "TEXT",
            images: "TEXT"
        },
        adapter: {
            type: "sql",
            idAttribute: "id",
            collection_name: "health_news_feed"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {});
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {
            getRecordsListByCategory: function(category) {
                var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE category = ? ORDER by id DESC";
                db = Ti.Database.open(collection.config.adapter.db_name);
                var res = db.execute(sql, category.toString());
                var listArr = [];
                var count = 0;
                while (res.isValidRow()) {
                    listArr[count] = {
                        id: res.fieldByName("id"),
                        title: res.fieldByName("title"),
                        long_title: res.fieldByName("long_title"),
                        category: res.fieldByName("category"),
                        created: res.fieldByName("created_date"),
                        updated: res.fieldByName("modified_date"),
                        images: res.fieldByName("images")
                    };
                    res.next();
                    count++;
                }
                res.close();
                db.close();
                collection.trigger("sync");
                return listArr;
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
            getRecordsById: function(id) {
                var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE id =? ";
                db = Ti.Database.open(collection.config.adapter.db_name);
                var res = db.execute(sql, id);
                var arr = [];
                res.isValidRow() && (arr = {
                    id: res.fieldByName("id"),
                    title: res.fieldByName("title"),
                    long_title: res.fieldByName("long_title"),
                    category: res.fieldByName("category"),
                    created: res.fieldByName("created_date"),
                    updated: res.fieldByName("modified_date"),
                    images: res.fieldByName("images")
                });
                res.close();
                db.close();
                collection.trigger("sync");
                return arr;
            },
            addNews: function(arr) {
                var collection = this;
                db = Ti.Database.open(collection.config.adapter.db_name);
                db.execute("BEGIN");
                arr.forEach(function(entry) {
                    var title = entry.title;
                    "" != title && null != title && (title = title.replace(/["']/g, "&quot;"));
                    var long_title = entry.long_title;
                    "" != long_title && null != long_title && (long_title = long_title.replace(/["']/g, "&quot;"));
                    sql_query = "INSERT INTO " + collection.config.adapter.collection_name + "(id, title, long_title, category, caption,created_date, modified_date, images) VALUES (" + entry.id + ", '" + title + "', '" + long_title + "', '" + mysql_real_escape_string(entry.category) + "', '" + entry.caption + "', '" + entry.created_date + "', '" + entry.modified_date + "', '" + entry.images + "')";
                    db.execute(sql_query);
                });
                db.execute("COMMIT");
                db.close();
                collection.trigger("sync");
            },
            resetNews: function() {
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

model = Alloy.M("health_news_feed", exports.definition, []);

collection = Alloy.C("health_news_feed", exports.definition, model);

exports.Model = model;

exports.Collection = collection;