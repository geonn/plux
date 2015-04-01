var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            id: "INTEGER PRIMARY KEY AUTOINCREMENT",
            clinicName: "TEXT",
            add1: "TEXT",
            add2: "TEXT",
            city: "TEXT",
            postcode: "TEXT",
            state: "TEXT",
            tel: "TEXT",
            latitude: "TEXT",
            longitude: "TEXT"
        },
        adapter: {
            type: "sql",
            collection_name: "panelList"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {});
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {
            getPanelList: function() {
                var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name;
                db = Ti.Database.open(collection.config.adapter.db_name);
                var res = db.execute(sql);
                var listArr = [];
                var count = 0;
                while (res.isValidRow()) {
                    listArr[count] = {
                        id: res.fieldByName("id"),
                        clinicName: res.fieldByName("clinicName"),
                        add1: res.fieldByName("add1"),
                        add2: res.fieldByName("add2"),
                        city: res.fieldByName("city"),
                        postcode: res.fieldByName("postcode"),
                        state: res.fieldByName("state"),
                        tel: res.fieldByName("tel"),
                        latitude: res.fieldByName("latitude"),
                        longitude: res.fieldByName("longitude")
                    };
                    res.next();
                    count++;
                }
                res.close();
                db.close();
                collection.trigger("sync");
                return listArr;
            },
            getPanelByState: function(state) {
                var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE state='" + state + "' ";
                console.log(sql);
                db = Ti.Database.open(collection.config.adapter.db_name);
                var res = db.execute(sql);
                var listArr = [];
                var count = 0;
                while (res.isValidRow()) {
                    listArr[count] = {
                        id: res.fieldByName("id"),
                        clinicName: res.fieldByName("clinicName"),
                        add1: res.fieldByName("add1"),
                        add2: res.fieldByName("add2"),
                        city: res.fieldByName("city"),
                        postcode: res.fieldByName("postcode"),
                        state: res.fieldByName("state"),
                        tel: res.fieldByName("tel"),
                        latitude: res.fieldByName("latitude"),
                        longitude: res.fieldByName("longitude")
                    };
                    res.next();
                    count++;
                }
                console.log(listArr);
                res.close();
                db.close();
                collection.trigger("sync");
                return listArr;
            },
            getPanelListByState: function() {
                var collection = this;
                var sql = "SELECT DISTINCT(state) FROM " + collection.config.adapter.collection_name + " GROUP BY state";
                db = Ti.Database.open(collection.config.adapter.db_name);
                var res = db.execute(sql);
                var arr = [];
                var count = 0;
                while (res.isValidRow()) {
                    arr[count] = {
                        state: res.fieldByName("state")
                    };
                    res.next();
                    count++;
                }
                res.close();
                db.close();
                collection.trigger("sync");
                return arr;
            },
            getPanelListById: function(id) {
                var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " where id = " + id;
                db = Ti.Database.open(collection.config.adapter.db_name);
                var res = db.execute(sql);
                var listArr;
                var count = 0;
                while (res.isValidRow()) {
                    listArr = {
                        id: res.fieldByName("id"),
                        clinicName: res.fieldByName("clinicName"),
                        add1: res.fieldByName("add1"),
                        add2: res.fieldByName("add2"),
                        city: res.fieldByName("city"),
                        postcode: res.fieldByName("postcode"),
                        state: res.fieldByName("state"),
                        tel: res.fieldByName("tel"),
                        latitude: res.fieldByName("latitude"),
                        longitude: res.fieldByName("longitude")
                    };
                    res.next();
                    count++;
                }
                res.close();
                db.close();
                collection.trigger("sync");
                return listArr;
            },
            addPanel: function(arr) {
                var collection = this;
                db = Ti.Database.open(collection.config.adapter.db_name);
                db.execute("BEGIN");
                arr.forEach(function(entry) {
                    console.log(entry.latitude + " " + entry.longitude);
                    sql_query = "INSERT INTO " + collection.config.adapter.collection_name + "( clinicName, add1, add2, city,postcode, state, tel, latitude, longitude ) VALUES ('" + mysql_real_escape_string(entry.clinicname) + "', '" + mysql_real_escape_string(entry.add1) + "', '" + mysql_real_escape_string(entry.add2) + "', '" + entry.city + "', '" + entry.postcode + "', '" + entry.state + "', '" + entry.tel + "', '" + entry.latitude + "', '" + entry.longitude + "')";
                    db.execute(sql_query);
                });
                db.execute("COMMIT");
                db.close();
                collection.trigger("sync");
            },
            resetPanel: function() {
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

model = Alloy.M("panelList", exports.definition, []);

collection = Alloy.C("panelList", exports.definition, model);

exports.Model = model;

exports.Collection = collection;