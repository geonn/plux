var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            id: "INTEGER PRIMARY KEY AUTOINCREMENT",
            u_id: "INTEGER",
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
            getHealthList: function() {
                var collection = this;
                var u_id = Ti.App.Properties.getString("u_id");
                db = Ti.Database.open(collection.config.adapter.db_name);
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE u_id = ?";
                console.log("getHealthList");
                var res = db.execute(sql, u_id);
                var listArr = [];
                var count = 0;
                while (res.isValidRow()) {
                    listArr[count] = {
                        id: res.fieldByName("id"),
                        u_id: res.fieldByName("u_id"),
                        date: res.fieldByName("date"),
                        time: res.fieldByName("time"),
                        type: res.fieldByName("type"),
                        field1: res.fieldByName("field1"),
                        field2: res.fieldByName("field2"),
                        amount: res.fieldByName("amount"),
                        created: res.fieldByName("created")
                    };
                    res.next();
                    count++;
                }
                res.close();
                db.close();
                collection.trigger("sync");
                return listArr;
            },
            getHealthAllListByType: function(type) {
                var collection = this;
                var u_id = Ti.App.Properties.getString("u_id");
                db = Ti.Database.open(collection.config.adapter.db_name);
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE type=? AND u_id = ? ORDER BY date DESC ,time DESC";
                var res = db.execute(sql, type, u_id);
                var listArr = [];
                var count = 0;
                while (res.isValidRow()) {
                    listArr[count] = {
                        id: res.fieldByName("id"),
                        u_id: res.fieldByName("u_id"),
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
                var u_id = Ti.App.Properties.getString("u_id");
                console.log("getHealthListByTypeInYear");
                var theField = "amount";
                ("6" == gType || "2" == gType) && (theField = "field1");
                "5" == gType && (theField = "field2");
                if ("2" == gType) {
                    var value2 = 0;
                    var sql2 = 'SELECT strftime("%Y-%m", date) as datemonth, AVG(field2) as value2 FROM ' + collection.config.adapter.collection_name + ' WHERE type=? AND u_id = ? GROUP BY strftime("%Y-%m", date) ORDER BY date LIMIT 6';
                    var res2 = db.execute(sql2, type, u_id);
                    res2.isValidRow() && (value2 = res2.fieldByName("value2"));
                }
                if ("10" == gType) var sql = 'SELECT strftime("%Y-%m", date) as datemonth, SUM(' + theField + ") as value FROM " + collection.config.adapter.collection_name + ' WHERE type=? AND u_id = ? GROUP BY strftime("%Y-%m", date) ORDER BY date  LIMIT 6'; else var sql = 'SELECT strftime("%Y-%m", date) as datemonth, AVG(' + theField + ") as value FROM " + collection.config.adapter.collection_name + ' WHERE type=? AND u_id = ? GROUP BY strftime("%Y-%m", date) ORDER BY date  LIMIT 6';
                var res = db.execute(sql, type, u_id);
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
                var u_id = Ti.App.Properties.getString("u_id");
                db = Ti.Database.open(collection.config.adapter.db_name);
                var sql = "SELECT date , SUM(amount) as amount FROM " + collection.config.adapter.collection_name + " WHERE type=10 AND u_id = ? GROUP BY date ORDER BY date DESC  LIMIT 6";
                console.log("getSteps");
                var res = db.execute(sql, u_id);
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
                var u_id = Ti.App.Properties.getString("u_id");
                db = Ti.Database.open(collection.config.adapter.db_name);
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE type=? AND u_id = ?  GROUP BY date   ORDER BY date DESC ,time DESC LIMIT 6";
                console.log("getHealthListByType : " + u_id);
                console.log(sql);
                var res = db.execute(sql, type, u_id);
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
                console.log(listArr);
                res.close(listArr);
                db.close();
                collection.trigger("sync");
                return listArr;
            },
            addHealthData: function(entry) {
                var collection = this;
                var u_id = Ti.App.Properties.getString("u_id");
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE date='" + mysql_real_escape_string(entry.date) + "' AND time='" + mysql_real_escape_string(entry.time) + "' AND u_id = ?";
                var sql_query = "";
                console.log("addHealthData");
                db = Ti.Database.open(collection.config.adapter.db_name);
                var res = db.execute(sql, u_id);
                if (res.isValidRow()) {
                    sql_query = "UPDATE " + collection.config.adapter.collection_name + " SET field1=? , field2=? , amount=? WHERE date=? AND time=? ";
                    db.execute(sql_query, entry.field1, entry.field2, entry.amount, entry.date, entry.time);
                } else {
                    sql_query = "INSERT INTO " + collection.config.adapter.collection_name + "( date, time, type,field1,field2, amount,created, u_id) VALUES (?, ?,?,?,? ,?, ?, ?)";
                    db.execute(sql_query, entry.date, entry.time, entry.type, entry.field1, entry.field2, entry.amount, currentDateTime(), u_id);
                }
                db.close();
                collection.trigger("sync");
                API.syncHealthData({
                    u_id: Ti.App.Properties.getString("u_id")
                });
            },
            saveArray: function(arr) {
                var collection = this;
                db = Ti.Database.open(collection.config.adapter.db_name);
                db.execute("BEGIN");
                arr.forEach(function(entry) {
                    var keys = [];
                    var questionmark = [];
                    var eval_values = [];
                    var update_questionmark = [];
                    var update_value = [];
                    for (var k in entry) if (entry.hasOwnProperty(k)) {
                        keys = _.keys(entry);
                        questionmark.push("?");
                        eval_values.push("entry." + k);
                        update_questionmark.push(k + "=?");
                    }
                    var without_pk_list = _.rest(update_questionmark);
                    var without_pk_value = _.rest(eval_values);
                    var sql_query = "INSERT OR IGNORE INTO " + collection.config.adapter.collection_name + " (" + keys.join() + ") VALUES (" + questionmark.join() + ")";
                    eval("db.execute(sql_query, " + eval_values.join() + ")");
                    var sql_query = "UPDATE " + collection.config.adapter.collection_name + " SET " + without_pk_list.join() + " WHERE " + _.first(update_questionmark);
                    eval("db.execute(sql_query, " + without_pk_value.join() + "," + _.first(eval_values) + ")");
                });
                db.execute("COMMIT");
                db.close();
                collection.trigger("sync");
            },
            updateUid: function() {
                var collection = this;
                var u_id = Ti.App.Properties.getString("u_id");
                sql_query = "UPDATE " + collection.config.adapter.collection_name + " SET u_id = ?";
                db = Ti.Database.open(collection.config.adapter.db_name);
                console.log("updateUid");
                db.execute(sql_query, u_id);
                db.close();
                collection.trigger("sync");
            },
            dropTable: function() {
                var collection = this;
                var sql = "DELETE FROM " + collection.config.adapter.collection_name;
                db = Ti.Database.open(collection.config.adapter.db_name);
                db.execute(sql);
                db.close();
                collection.trigger("sync");
            },
            removeHealthDataById: function(id) {
                var collection = this;
                var sql = "DELETE FROM " + collection.config.adapter.collection_name + " WHERE id='" + id + "' ";
                db = Ti.Database.open(collection.config.adapter.db_name);
                db.execute(sql);
                db.close();
                API.removeHealthDataById(id);
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