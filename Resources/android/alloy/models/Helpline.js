var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            id: "INTEGER PRIMARY KEY AUTOINCREMENT",
            u_id: "INTEGER",
            sender_id: "INTEGER",
            message: "TEXT",
            created: "DATE",
            status: "INTEGER",
            is_endUser: "INTEGER",
            sender_name: "TEXT"
        },
        adapter: {
            type: "sql",
            collection_name: "helpline",
            idAttribute: "id"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {});
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {
            getData: function(latest, start, anchor, last_id) {
                if (latest) {
                    var start_limit = "";
                    var sql_lastupdate = "";
                    var sql_id = " AND id > " + last_id;
                } else {
                    var start_limit = " limit " + start + ", 10";
                    var sql_lastupdate = " AND created <= '" + anchor + "'";
                    var sql_id = "";
                }
                var collection = this;
                var u_id = Ti.App.Properties.getString("u_id");
                var sql = "SELECT * from helpline where u_id = ? " + sql_lastupdate + sql_id + " order by created desc" + start_limit;
                db = Ti.Database.open(collection.config.adapter.db_name);
                var res = db.execute(sql, u_id);
                var arr = [];
                var count = 0;
                while (res.isValidRow()) {
                    arr[count] = {
                        id: res.fieldByName("id"),
                        u_id: res.fieldByName("u_id"),
                        sender_id: res.fieldByName("sender_id"),
                        message: res.fieldByName("message"),
                        status: res.fieldByName("status"),
                        created: res.fieldByName("created"),
                        is_endUser: res.fieldByName("is_endUser"),
                        sender_name: res.fieldByName("sender_name")
                    };
                    res.next();
                    count++;
                }
                res.close();
                db.close();
                collection.trigger("sync");
                return arr;
            },
            removeById: function(m_id) {
                var collection = this;
                db = Ti.Database.open(collection.config.adapter.db_name);
                var sql_query = "DELETE FROM " + collection.config.adapter.collection_name + " WHERE id=?";
                db.execute(sql_query, m_id);
                console.log(db.getRowsAffected() + " deleted");
                db.close();
                collection.trigger("sync");
            },
            messageRead: function(entry) {
                var collection = this;
                db = Ti.Database.open(collection.config.adapter.db_name);
                var sql_query = "UPDATE " + collection.config.adapter.collection_name + " SET read=1 WHERE room_id=?";
                db.execute(sql_query, entry.room_id);
                console.log(db.getRowsAffected() + " " + entry.room_id + " read");
                db.close();
                collection.trigger("sync");
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
                    var sql_query = "INSERT OR REPLACE INTO " + collection.config.adapter.collection_name + " (" + keys.join() + ") VALUES (" + questionmark.join() + ")";
                    eval("db.execute(sql_query, " + eval_values.join() + ")");
                });
                db.execute("COMMIT");
                var last_id = db.lastInsertRowId;
                db.close();
                collection.trigger("sync");
                return last_id;
            },
            saveRecord: function(entry) {
                var collection = this;
                db = Ti.Database.open(collection.config.adapter.db_name);
                console.log(typeof entry.message);
                console.log(entry.message);
                entry.message = entry.message.replace("[br]", "\n");
                var sql_query = "INSERT OR IGNORE INTO " + collection.config.adapter.collection_name + " (sender_id, message, created, is_endUser,sender_name, u_id) VALUES (?,?,?,?,?,?)";
                db.execute(sql_query, entry.sender_id, entry.message, entry.created, entry.is_endUser, entry.sender_name, entry.u_id);
                var last_id = db.lastInsertRowId;
                db.close();
                collection.trigger("sync");
                return last_id;
            },
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
            updateStatus: function(arr, status) {
                var collection = this;
                var sql = "UPDATE helpline set status = ? WHERE id in(?)";
                db = Ti.Database.open(collection.config.adapter.db_name);
                db.execute(sql, status, arr);
                db.close();
                collection.trigger("sync");
            },
            V1_9DBupdate: function() {
                var collection = this;
                var sql = "UPDATE helpline set status = 2";
                db = Ti.Database.open(collection.config.adapter.db_name);
                db.execute(sql);
                db.close();
                collection.trigger("sync");
            },
            resetTable: function() {
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

model = Alloy.M("helpline", exports.definition, []);

collection = Alloy.C("helpline", exports.definition, model);

exports.Model = model;

exports.Collection = collection;