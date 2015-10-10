var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            id: "INTEGER PRIMARY KEY AUTOINCREMENT",
            member_no: "TEXT",
            subject: "TEXT",
            message: "TEXT",
            url: "TEXT",
            expired: "TEXT",
            created: "TEXT",
            updated: "TEXT"
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
<<<<<<< HEAD
            getList: function(e) {
                var collection = this;
                db = Ti.Database.open(collection.config.adapter.db_name);
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE member_no='" + e.member_no + "' ";
                console.log(sql);
=======
            getList: function() {
                var collection = this;
                db = Ti.Database.open(collection.config.adapter.db_name);
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name;
>>>>>>> origin/master
                var res = db.execute(sql);
                var listArr = [];
                var count = 0;
                while (res.isValidRow()) {
                    listArr[count] = {
                        id: res.fieldByName("id"),
                        member_no: res.fieldByName("member_no"),
                        subject: res.fieldByName("subject"),
                        message: res.fieldByName("message"),
                        url: res.fieldByName("url"),
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
            addData: function(entry) {
                var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE id='" + entry.id + "' ";
                var sql_query = "";
                db = Ti.Database.open(collection.config.adapter.db_name);
                var res = db.execute(sql);
                sql_query = res.isValidRow() ? "UPDATE " + collection.config.adapter.collection_name + " SET subject='" + entry.subject + "', message='" + entry.message + "' , url='" + entry.url + "' , expired='" + entry.expired + "', updated='" + entry.updated + "' WHERE id='" + entry.id + "' " : "INSERT INTO " + collection.config.adapter.collection_name + "(id, member_no, subject, message, url,expired,created,updated) VALUES ('" + entry.id + "', '" + entry.member_no + "','" + entry.subject + "','" + entry.message + "','" + entry.url + "', '" + entry.expired + "', '" + entry.created + "', '" + entry.updated + "')";
<<<<<<< HEAD
                console.log(sql_query);
=======
>>>>>>> origin/master
                db.execute(sql_query);
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