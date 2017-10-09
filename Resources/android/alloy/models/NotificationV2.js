var Alloy = require("/alloy"), _ = require("/alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            id: "INTEGER PRIMARY KEY",
            u_id: "INTEGER",
            subject: "TEXT",
            url: "TEXT",
            is_read: "TEXT",
            extra: "TEXT",
            app_param: "TEXT",
            content: "TEXT",
            target: "TEXT",
            created: "TEXT",
            updated: "TEXT",
            status: "INTEGER"
        },
        adapter: {
            type: "sql",
            collection_name: "notificationV2"
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
            getList: function(e) {
                var collection = this;
                var columns = collection.config.columns;
                var names = [];
                for (var k in columns) names.push(k);
                db = Ti.Database.open(collection.config.adapter.db_name);
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE u_id=? AND status=1 ORDER BY id DESC";
                var res = db.execute(sql, e.u_id);
                var arr = [];
                var count = 0;
                var eval_column = "";
                for (var i = 0; i < names.length; i++) eval_column = eval_column + names[i] + ": res.fieldByName('" + names[i] + "'),";
                while (res.isValidRow()) {
                    eval("arr[count] = {" + eval_column + "}");
                    res.next();
                    count++;
                }
                res.close();
                db.close();
                collection.trigger("sync");
                return arr;
            },
            getCountUnread: function(e) {
                var collection = this;
                var u_id = Ti.App.Properties.getString("u_id");
                db = Ti.Database.open(collection.config.adapter.db_name);
                var sql = "SELECT COUNT(*) AS total FROM " + collection.config.adapter.collection_name + " WHERE u_id=? and is_read='0'";
                console.log(sql);
                var res = db.execute(sql, u_id);
                var listArr = 0;
                while (res.isValidRow()) {
                    listArr = res.fieldByName("total");
                    res.next();
                }
                res.close();
                db.close();
                collection.trigger("sync");
                return listArr;
            },
            setAllAsRead: function(entry) {
                var collection = this;
                db = Ti.Database.open(collection.config.adapter.db_name);
                var sql_query = "UPDATE " + collection.config.adapter.collection_name + " SET is_read=1 WHERE u_id=? ";
                db.execute(sql_query, entry.u_id);
                db.close();
                collection.trigger("sync");
            },
            update_status: function(entry) {
                var collection = this;
                db = Ti.Database.open(collection.config.adapter.db_name);
                var sql_query = "UPDATE " + collection.config.adapter.collection_name + " SET status=? WHERE id=? ";
                db.execute(sql_query, entry.status, entry.id);
                db.close();
                collection.trigger("sync");
            },
            saveArray: function(arr) {
                var collection = this;
                console.log(arr);
                var columns = collection.config.columns;
                var names = [];
                for (var k in columns) names.push(k);
                db = Ti.Database.open(collection.config.adapter.db_name);
                db.execute("BEGIN");
                arr.forEach(function(entry) {
                    var keys = [];
                    var questionmark = [];
                    var eval_values = [];
                    var update_questionmark = [];
                    var update_value = [];
                    for (var k in entry) entry.hasOwnProperty(k) && _.find(names, function(name) {
                        if (name == k) {
                            keys.push(k);
                            questionmark.push("?");
                            eval_values.push("entry." + k);
                            update_questionmark.push(k + "=?");
                        }
                    });
                    var without_pk_list = _.rest(update_questionmark);
                    var without_pk_value = _.rest(eval_values);
                    var sql_query = "INSERT OR REPLACE INTO " + collection.config.adapter.collection_name + " (" + keys.join() + ") VALUES (" + questionmark.join() + ")";
                    eval("db.execute(sql_query, " + eval_values.join() + ")");
                });
                db.execute("COMMIT");
                console.log(db.getRowsAffected() + " affected row");
                db.close();
                collection.trigger("sync");
            },
            addData: function(entry) {
                console.log("add data");
                console.log(entry);
                var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE id=? ";
                var sql_query = "";
                db = Ti.Database.open(collection.config.adapter.db_name);
                var res = db.execute(sql, entry.id);
                if (res.isValidRow()) if ("push" == entry.from) {
                    sql_query = "UPDATE " + collection.config.adapter.collection_name + " SET member_no=?, subject=?, message=? , url=? ,status=? ,  isRead=?, expired=?, updated=?, detail=? WHERE id=? ";
                    db.execute(sql_query, entry.member_no, entry.subject, entry.message, entry.url, parseInt(entry.status), entry.isRead, entry.expired, entry.updated, entry.detail, entry.id);
                } else {
                    sql_query = "UPDATE " + collection.config.adapter.collection_name + " SET member_no=?, subject=?, message=? , url=? ,status=?,  expired=?, updated=?, detail=? WHERE id=? ";
                    db.execute(sql_query, entry.member_no, entry.subject, entry.message, entry.url, parseInt(entry.status), entry.expired, entry.updated, entry.detail, entry.id);
                } else {
                    sql_query = "INSERT INTO " + collection.config.adapter.collection_name + "(id, member_no, subject, message, url,isRead, expired,status,detail,created,updated) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
                    db.execute(sql_query, parseInt(entry.id), entry.member_no, entry.subject, entry.message, entry.url, "0", entry.expired, parseInt(entry.status), entry.detail, entry.created, entry.updated);
                }
                db.close();
                collection.trigger("sync");
            }
        });
        return Collection;
    }
};

model = Alloy.M("notificationV2", exports.definition, []);

collection = Alloy.C("notificationV2", exports.definition, model);

exports.Model = model;

exports.Collection = collection;