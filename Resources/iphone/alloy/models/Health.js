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
            getHealthAllListByType: function(type) {
                var collection = this;
                db = Ti.Database.open(collection.config.adapter.db_name);
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE type='" + type + "' ORDER BY date DESC ,time DESC";
                var res = db.execute(sql);
                var listArr = [];
                var count = 0;
                while (res.isValidRow()) {
                    listArr[count] = {
                        id: res.fieldByName("id"),
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
            getHealthListByTypeInYear: function(type, gType) {
                var collection = this;
                db = Ti.Database.open(collection.config.adapter.db_name);
                var theField = "amount";
                ("6" == gType || "2" == gType) && (theField = "field1");
                "5" == gType && (theField = "field2");
                if ("2" == gType) {
                    var value2 = 0;
                    var sql2 = 'SELECT strftime("%Y-%m", date) as datemonth, AVG(field2) as value2 FROM ' + collection.config.adapter.collection_name + " WHERE type='" + type + '\' GROUP BY strftime("%Y-%m", date) ORDER BY date  LIMIT 6';
                    var res2 = db.execute(sql2);
                    res2.isValidRow() && (value2 = res2.fieldByName("value2"));
                }
                if ("10" == gType) var sql = 'SELECT strftime("%Y-%m", date) as datemonth, SUM(' + theField + ") as value FROM " + collection.config.adapter.collection_name + " WHERE type='" + type + '\' GROUP BY strftime("%Y-%m", date) ORDER BY date  LIMIT 6'; else var sql = 'SELECT strftime("%Y-%m", date) as datemonth, AVG(' + theField + ") as value FROM " + collection.config.adapter.collection_name + " WHERE type='" + type + '\' GROUP BY strftime("%Y-%m", date) ORDER BY date  LIMIT 6';
                var res = db.execute(sql);
                var listArr = [];
                var count = 0;
                if ("2" == gType) while (res.isValidRow()) {
                    listArr[count] = {
                        date: res.fieldByName("datemonth"),
                        value: res.fieldByName("value"),
                        value2: value2
                    };
                    res.next();
                    count++;
                } else while (res.isValidRow()) {
                    listArr[count] = {
                        date: res.fieldByName("datemonth"),
                        value: res.fieldByName("value")
                    };
                    res.next();
                    count++;
                }
                res.close();
                db.close();
                collection.trigger("sync");
                return listArr;
            },
            getSteps: function() {
                var collection = this;
                db = Ti.Database.open(collection.config.adapter.db_name);
                var sql = "SELECT date , SUM(amount) as amount FROM " + collection.config.adapter.collection_name + " WHERE type=10 GROUP BY date ORDER BY date DESC  LIMIT 6";
                var res = db.execute(sql);
                var listArr = [];
                var count = 0;
                while (res.isValidRow()) {
                    listArr[count] = {
                        date: res.fieldByName("date"),
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
            getHealthListByType: function(type) {
                var collection = this;
                db = Ti.Database.open(collection.config.adapter.db_name);
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE type='" + type + "' GROUP BY date ORDER BY date DESC ,time DESC LIMIT 6";
                var res = db.execute(sql);
                var listArr = [];
                var count = 0;
                while (res.isValidRow()) {
                    listArr[count] = {
                        id: res.fieldByName("id"),
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
                sql_query = res.isValidRow() ? "UPDATE " + collection.config.adapter.collection_name + " SET field1='" + entry.field1 + "' , field2='" + entry.field2 + "' , amount='" + entry.amount + "' WHERE date='" + entry.date + "' AND time='" + entry.time + "' " : "INSERT INTO " + collection.config.adapter.collection_name + "( date, time, type,field1,field2, amount,created) VALUES ('" + entry.date + "', '" + entry.time + "','" + entry.type + "','" + entry.field1 + "','" + entry.field2 + "' ,'" + entry.amount + "', '" + currentDateTime() + "')";
                console.log(sql_query);
                db.execute(sql_query);
                db.close();
                collection.trigger("sync");
            },
            removeHealthDataById: function(id) {
                var collection = this;
                var sql = "DELETE FROM " + collection.config.adapter.collection_name + " WHERE id='" + id + "' ";
                db = Ti.Database.open(collection.config.adapter.db_name);
                db.execute(sql);
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