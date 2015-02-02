var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            id: "INTEGER PRIMARY KEY AUTOINCREMENT",
            date: "TEXT",
            time: "TEXT",
            type: "TEXT",
            field1: "TEXT",
            field2: "TEXT",
            amount: "TEXT",
            created: "TEXT"
        },
        adapter: {
            type: "sql",
            collection_name: "health"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {});
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {
            getHealthListByType: function(type) {
                var collection = this;
                db = Ti.Database.open(collection.config.adapter.db_name);
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE type='" + type + "' ORDER BY date,time ASC LIMIT 6";
                var res = db.execute(sql);
                var listArr = [];
                var count = 0;
                while (res.isValidRow()) {
                    listArr[count] = {
                        date: res.fieldByName("date"),
                        time: res.fieldByName("time"),
                        type: res.fieldByName("type"),
                        field1: res.fieldByName("field1"),
                        field2: res.fieldByName("field2"),
                        amount: res.fieldByName("amount")
                    };
                    res.next();
                    count++;
                }
                res.close();
                db.close();
                collection.trigger("sync");
                return listArr;
            },
            addHealthData: function(entry) {
                var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE date='" + mysql_real_escape_string(entry.date) + "' AND time='" + mysql_real_escape_string(entry.time) + "' ";
                var sql_query = "";
                db = Ti.Database.open(collection.config.adapter.db_name);
                var res = db.execute(sql);
                sql_query = res.isValidRow() ? "UPDATE " + collection.config.adapter.collection_name + " SET field1='" + entry.field1 + "' , field2='" + entry.field2 + "' , amount='" + mysql_real_escape_string(entry.amount) + "' WHERE date='" + mysql_real_escape_string(entry.date) + "' AND time='" + mysql_real_escape_string(entry.time) + "' " : "INSERT INTO " + collection.config.adapter.collection_name + "( date, time, type,field1,field2, amount,created) VALUES ('" + mysql_real_escape_string(entry.date) + "', '" + mysql_real_escape_string(entry.time) + "','" + entry.type + "','" + entry.field1 + "','" + entry.field2 + "' ,'" + mysql_real_escape_string(entry.amount) + "', '" + currentDateTime() + "')";
                console.log(sql_query);
                db.execute(sql_query);
                db.close();
                collection.trigger("sync");
            }
        });
        return Collection;
    }
};

model = Alloy.M("health", exports.definition, []);

collection = Alloy.C("health", exports.definition, model);

exports.Model = model;

exports.Collection = collection;