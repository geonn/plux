var Alloy = require("/alloy"), _ = require("/alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            id: "INTEGER PRIMARY KEY AUTOINCREMENT",
            member_no: "TEXT",
            subject: "TEXT",
            message: "TEXT",
            detail: "TEXT",
            url: "TEXT",
            expired: "TEXT",
            isRead: "TEXT",
            status: "TEXT",
            created: "TEXT",
            updated: "TEXT",
            status: "INTEGER"
        },
        adapter: {
            type: "sql",
            collection_name: "notification"
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
                db = Ti.Database.open(collection.config.adapter.db_name);
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE member_no=? AND status=1 AND (expired !='' OR expired <=?) ORDER BY id DESC";
                var res = db.execute(sql, e.member_no, currentDateTime());
                var listArr = [];
                var count = 0;
                while (res.isValidRow()) {
                    listArr[count] = {
                        id: res.fieldByName("id"),
                        member_no: res.fieldByName("member_no"),
                        subject: res.fieldByName("subject"),
                        message: res.fieldByName("message"),
                        detail: res.fieldByName("detail"),
                        url: res.fieldByName("url"),
                        isRead: res.fieldByName("isRead"),
                        status: res.fieldByName("status"),
                        expired: res.fieldByName("expired"),
                        created: res.fieldByName("created"),
                        updated: res.fieldByName("updated")
                    };
                    res.next();
                    count++;
                }
                res.close();
                db.close();
                collection.trigger("sync");
                return listArr;
            },
            getCountUnread: function(e) {
                var collection = this;
                db = Ti.Database.open(collection.config.adapter.db_name);
                var sql = "SELECT COUNT(*) AS total FROM " + collection.config.adapter.collection_name + " WHERE member_no='" + e.member_no + "' and isRead='0' and (expired !='' OR expired <='" + currentDateTime() + "') ";
                console.log(sql);
                var res = db.execute(sql);
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
                var sql_query = "UPDATE " + collection.config.adapter.collection_name + " SET isRead=1 WHERE member_no=? ";
                db.execute(sql_query, entry.member_no);
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

model = Alloy.M("notification", exports.definition, []);

collection = Alloy.C("notification", exports.definition, model);

exports.Model = model;

exports.Collection = collection;