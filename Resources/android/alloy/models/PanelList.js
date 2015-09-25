var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            id: "TEXT",
            clinicCode: "TEXT",
            clinicName: "TEXT",
            add1: "TEXT",
            add2: "TEXT",
            city: "TEXT",
            postcode: "TEXT",
            state: "TEXT",
            tel: "TEXT",
            latitude: "TEXT",
            longitude: "TEXT",
            panel: "INTEGER",
            openHour: "TEXT",
            clinicType: "TEXT"
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
            updatePanelList: function(clinicCode) {
                var collection = this;
                db = Ti.Database.open(collection.config.adapter.db_name);
                sql_query = "UPDATE " + collection.config.adapter.collection_name + " SET panel=0";
                console.log("a");
                db.execute(sql_query);
                console.log(db.rowsAffected);
                console.log("b");
                sql_query = "UPDATE " + collection.config.adapter.collection_name + " SET panel=1 WHERE clinicCode IN (" + clinicCode + ")";
                db.execute(sql_query);
                console.log(db.rowsAffected);
                db.close();
                collection.trigger("sync");
            },
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
                        clinicCode: res.fieldByName("clinicCode"),
                        clinicName: res.fieldByName("clinicName"),
                        clinicType: res.fieldByName("clinicType"),
                        add1: res.fieldByName("add1"),
                        add2: res.fieldByName("add2"),
                        city: res.fieldByName("city"),
                        postcode: res.fieldByName("postcode"),
                        state: res.fieldByName("state"),
                        panel: res.fieldByName("panel"),
                        tel: res.fieldByName("tel"),
                        openHour: res.fieldByName("openHour"),
                        latitude: res.fieldByName("latitude"),
                        longitude: res.fieldByName("longitude")
                    };
                    res.next();
                    count++;
                }
                res.close();
                db.close();
                collection.trigger("sync");
                console.log(count);
                return listArr;
            },
            getPanelListTest: function() {
                var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " LIMIT 0,30 ";
                db = Ti.Database.open(collection.config.adapter.db_name);
                var res = db.execute(sql);
                var listArr = [];
                var count = 0;
                while (res.isValidRow()) {
                    listArr[count] = {
                        id: res.fieldByName("id"),
                        clinicCode: res.fieldByName("clinicCode"),
                        clinicName: res.fieldByName("clinicName"),
                        clinicType: res.fieldByName("clinicType"),
                        add1: res.fieldByName("add1"),
                        add2: res.fieldByName("add2"),
                        city: res.fieldByName("city"),
                        postcode: res.fieldByName("postcode"),
                        state: res.fieldByName("state"),
                        panel: res.fieldByName("panel"),
                        tel: res.fieldByName("tel"),
                        openHour: res.fieldByName("openHour"),
                        latitude: res.fieldByName("latitude"),
                        longitude: res.fieldByName("longitude")
                    };
                    res.next();
                    count++;
                }
                res.close();
                db.close();
                collection.trigger("sync");
                console.log(count);
                return listArr;
            },
            getPanelByState: function(state) {
                var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE state='" + state + "' ";
                db = Ti.Database.open(collection.config.adapter.db_name);
                var res = db.execute(sql);
                var listArr = [];
                var count = 0;
                while (res.isValidRow()) {
                    listArr[count] = {
                        id: res.fieldByName("id"),
                        clinicCode: res.fieldByName("clinicCode"),
                        clinicName: res.fieldByName("clinicName"),
                        clinicType: res.fieldByName("clinicType"),
                        add1: res.fieldByName("add1"),
                        add2: res.fieldByName("add2"),
                        city: res.fieldByName("city"),
                        postcode: res.fieldByName("postcode"),
                        state: res.fieldByName("state"),
                        tel: res.fieldByName("tel"),
                        openHour: res.fieldByName("openHour"),
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
            getPanelListCount: function(clinicCode) {
                var collection = this;
                var sql = "SELECT clinicType, count(*) as total FROM " + collection.config.adapter.collection_name + " WHERE clinicCode IN (" + clinicCode + ") GROUP BY clinicType ";
                db = Ti.Database.open(collection.config.adapter.db_name);
                var res = db.execute(sql);
                var listArr = [];
                var count = 0;
                while (res.isValidRow()) {
                    listArr[count] = {
                        clinicType: res.fieldByName("clinicType"),
                        total: res.fieldByName("total")
                    };
                    res.next();
                    count++;
                }
                res.close();
                db.close();
                collection.trigger("sync");
                return listArr;
            },
            getCountClinicType: function(corp) {
                var collection = this;
                if ("" != corp) var sql = "SELECT clinicType, count(*) as total FROM " + collection.config.adapter.collection_name + " where panel=1 GROUP BY clinicType "; else var sql = "SELECT clinicType, count(*) as total FROM " + collection.config.adapter.collection_name + " GROUP BY clinicType ";
                console.log(sql);
                db = Ti.Database.open(collection.config.adapter.db_name);
                var res = db.execute(sql);
                var listArr = [];
                var count = 0;
                while (res.isValidRow()) {
                    listArr[count] = {
                        clinicType: res.fieldByName("clinicType"),
                        total: res.fieldByName("total")
                    };
                    res.next();
                    count++;
                }
                res.close();
                db.close();
                collection.trigger("sync");
                return listArr;
            },
            getCount24Hours: function(corp) {
                var collection = this;
                if ("" != corp) var sql = "SELECT count(*) as total FROM " + collection.config.adapter.collection_name + " WHERE panel =1 AND openHour LIKE '%24 HOURS%' "; else var sql = "SELECT count(*) as total FROM " + collection.config.adapter.collection_name + " WHERE openHour LIKE '%24 HOURS%' ";
                db = Ti.Database.open(collection.config.adapter.db_name);
                var res = db.execute(sql);
                var listArr;
                while (res.isValidRow()) {
                    listArr = {
                        total: res.fieldByName("total")
                    };
                    res.next();
                }
                res.close();
                db.close();
                collection.trigger("sync");
                return listArr;
            },
            getPanelByClinicType: function(ClinicType, searchKey, corp) {
                var collection = this;
                var panel_sql = "" != corp ? " AND panel=1" : "";
                if ("" != searchKey) var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE clinicType ='" + ClinicType + "' AND clinicName LIKE '%" + searchKey + "%' " + panel_sql; else var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE clinicType ='" + ClinicType + "' " + panel_sql;
                console.log(sql);
                db = Ti.Database.open(collection.config.adapter.db_name);
                var res = db.execute(sql);
                var listArr = [];
                var count = 0;
                while (res.isValidRow()) {
                    listArr[count] = {
                        id: res.fieldByName("id"),
                        clinicCode: res.fieldByName("clinicCode"),
                        clinicName: res.fieldByName("clinicName"),
                        clinicType: res.fieldByName("clinicType"),
                        add1: res.fieldByName("add1"),
                        add2: res.fieldByName("add2"),
                        city: res.fieldByName("city"),
                        postcode: res.fieldByName("postcode"),
                        state: res.fieldByName("state"),
                        tel: res.fieldByName("tel"),
                        openHour: res.fieldByName("openHour"),
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
            getPanelBy24Hours: function(searchKey, corp) {
                var collection = this;
                var corp_sql = "" != corp ? "AND panel = 1" : "";
                if ("" != searchKey) var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE openHour LIKE '%24 HOURS%' AND clinicName LIKE '%" + searchKey + "%' " + corp_sql; else var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE openHour LIKE '%24 HOURS%' " + corp_sql;
                console.log(sql);
                db = Ti.Database.open(collection.config.adapter.db_name);
                var res = db.execute(sql);
                var listArr = [];
                var count = 0;
                while (res.isValidRow()) {
                    listArr[count] = {
                        id: res.fieldByName("id"),
                        clinicCode: res.fieldByName("clinicCode"),
                        clinicName: res.fieldByName("clinicName"),
                        clinicType: res.fieldByName("clinicType"),
                        add1: res.fieldByName("add1"),
                        add2: res.fieldByName("add2"),
                        city: res.fieldByName("city"),
                        postcode: res.fieldByName("postcode"),
                        state: res.fieldByName("state"),
                        tel: res.fieldByName("tel"),
                        openHour: res.fieldByName("openHour"),
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
                        clinicCode: res.fieldByName("clinicCode"),
                        clinicName: res.fieldByName("clinicName"),
                        clinicType: res.fieldByName("clinicType"),
                        add1: res.fieldByName("add1"),
                        add2: res.fieldByName("add2"),
                        city: res.fieldByName("city"),
                        postcode: res.fieldByName("postcode"),
                        state: res.fieldByName("state"),
                        tel: res.fieldByName("tel"),
                        openHour: res.fieldByName("openHour"),
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
            getPanelListByCode: function(clinicCode, clinicType) {
                var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " where clinicCode IN (" + clinicCode + ") AND clinicType='" + clinicType + "' ";
                db = Ti.Database.open(collection.config.adapter.db_name);
                var res = db.execute(sql);
                var listArr = [];
                var count = 0;
                while (res.isValidRow()) {
                    listArr[count] = {
                        id: res.fieldByName("id"),
                        clinicCode: res.fieldByName("clinicCode"),
                        clinicName: res.fieldByName("clinicName"),
                        clinicType: res.fieldByName("clinicType"),
                        add1: res.fieldByName("add1"),
                        add2: res.fieldByName("add2"),
                        city: res.fieldByName("city"),
                        postcode: res.fieldByName("postcode"),
                        state: res.fieldByName("state"),
                        tel: res.fieldByName("tel"),
                        openHour: res.fieldByName("openHour"),
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
            getPanelListBy24Hours: function(clinicCode) {
                var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " where clinicCode IN (" + clinicCode + ") AND openHour LIKE '%24 HOURS%' ";
                db = Ti.Database.open(collection.config.adapter.db_name);
                var res = db.execute(sql);
                var listArr = [];
                var count = 0;
                while (res.isValidRow()) {
                    listArr[count] = {
                        id: res.fieldByName("id"),
                        clinicCode: res.fieldByName("clinicCode"),
                        clinicName: res.fieldByName("clinicName"),
                        clinicType: res.fieldByName("clinicType"),
                        add1: res.fieldByName("add1"),
                        add2: res.fieldByName("add2"),
                        city: res.fieldByName("city"),
                        postcode: res.fieldByName("postcode"),
                        state: res.fieldByName("state"),
                        tel: res.fieldByName("tel"),
                        openHour: res.fieldByName("openHour"),
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
                arr.length;
                db.execute("BEGIN");
                arr.forEach(function(entry) {
                    sql_query = "INSERT INTO " + collection.config.adapter.collection_name + "( id, clinicName,clinicCode,clinicType,openHour, add1, add2, city,postcode, state, tel, latitude, longitude ) VALUES (?,?, ?, ?, ?, ?,?, ?,?,?,?,?, ?)";
                    db.execute(sql_query, entry.id, entry.clinicname, entry.cliniccode, entry.clinictype, entry.openhour, entry.add1, entry.add2, entry.city, entry.postcode, entry.state, entry.tel, entry.latitude, entry.longitude);
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