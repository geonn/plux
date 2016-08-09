var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            id: "INTEGER PRIMARY KEY AUTOINCREMENT",
            u_id: "INTEGER",
            sender_id: "INTEGER",
            message: "TEXT",
            created: "DATE",
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
            getData: function(latest, last_update, start, anchor) {
                var last_update = last_update || common.now();
                if (latest) {
                    var a = last_update;
                    a = a.replace("  ", " ");
                    var b = a.split(" ");
                    var start_limit = "";
                    var sql_lastupdate = " AND created > '" + b[0] + " " + b[1] + "'";
                } else {
                    var start_limit = " limit " + start + ", 10";
                    var sql_lastupdate = " AND created <= '" + anchor + "'";
                }
                console.log(sql_lastupdate);
                var collection = this;
                var u_id = Ti.App.Properties.getString("u_id");
                var sql = "SELECT * from helpline where u_id = ? " + sql_lastupdate + " order by created desc" + start_limit;
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
                if ("undefined" == typeof arr || "no room found" == arr) return;
                var collection = this;
                db = Ti.Database.open(collection.config.adapter.db_name);
                db.execute("BEGIN");
                arr.forEach(function(entry) {
                    entry.message = entry.message.replace("[br]", "\n");
                    var sql_query = "INSERT OR IGNORE INTO " + collection.config.adapter.collection_name + " (sender_id, message, created, is_endUser,sender_name, u_id) VALUES (?,?,?,?,?,?)";
                    db.execute(sql_query, entry.sender_id, entry.message, entry.created, entry.is_endUser, entry.sender_name, entry.u_id);
                });
                db.execute("COMMIT");
                db.close();
                collection.trigger("sync");
            },
            saveRecord: function(entry) {
                var collection = this;
                db = Ti.Database.open(collection.config.adapter.db_name);
                entry.message = entry.message.replace("[br]", "\n");
                var sql_query = "INSERT OR IGNORE INTO " + collection.config.adapter.collection_name + " (sender_id, message, created, is_endUser,sender_name, u_id) VALUES (?,?,?,?,?,?)";
                db.execute(sql_query, entry.sender_id, entry.message, entry.created, entry.is_endUser, entry.sender_name, entry.u_id);
                db.close();
                collection.trigger("sync");
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