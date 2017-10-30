var Alloy = require("/alloy"), _ = require("/alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            id: "TEXT PRIMARY KEY",
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
            clinicType: "TEXT",
            status: "INTEGER"
        },
        adapter: {
            type: "sql",
            collection_name: "panelList",
            idAttribute: "id"
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
            getData: function(type, str, corp, counter) {
                var collection = this;
                var clinicLocationSelection = Ti.App.Properties.getString("clinicLocationSelection");
                var location_sql = null != clinicLocationSelection ? " AND state='" + clinicLocationSelection.toUpperCase() + "' " : "";
                var type_sql = "24 Hours" == type ? "openHour LIKE '%24 HOURS%' " : " clinicType = '" + type + "'";
                var corp_sql = "" != corp ? " AND panel = 1" : "";
                var str_sql = "" != str ? " AND (clinicName LIKE '%' || '" + str + "' ||'%' OR add1 LIKE '%'|| '" + str + "' ||'%' OR city LIKE '%'|| '" + str + "' ||'%' OR postcode LIKE '%'|| '" + str + "' ||'%' OR state LIKE '%'|| '" + str + "' ||'%')" : "";
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " where " + type_sql + corp_sql + str_sql + location_sql + " AND status = 1 limit " + counter + ", 20";
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
                return listArr;
            },
            getDataByID: function(id) {
                var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " where id = '" + id + "'";
                db = Ti.Database.open(collection.config.adapter.db_name);
                var res = db.execute(sql);
                var arr = [];
                res.isValidRow() && (arr = {
                    id: res.fieldByName("id"),
                    clinicCode: res.fieldByName("clinicCode"),
                    clinicName: res.fieldByName("clinicName"),
                    add1: res.fieldByName("add1"),
                    city: res.fieldByName("city"),
                    postcode: res.fieldByName("postcode"),
                    state: res.fieldByName("state"),
                    tel: res.fieldByName("tel"),
                    latitude: res.fieldByName("latitude"),
                    longitude: res.fieldByName("longitude"),
                    panel: res.fieldByName("panel"),
                    openHour: res.fieldByName("openHour"),
                    clinicType: res.fieldByName("clinicType")
                });
                res.close();
                db.close();
                collection.trigger("sync");
                return arr;
            },
            updatePanelList: function(clinicCode) {
                var collection = this;
                db = Ti.Database.open(collection.config.adapter.db_name);
                sql_query = "UPDATE " + collection.config.adapter.collection_name + " SET panel=0";
                db.execute(sql_query);
                sql_query = "UPDATE " + collection.config.adapter.collection_name + " SET panel=1 WHERE clinicCode IN (" + clinicCode + ")";
                db.execute(sql_query);
                db.close();
                collection.trigger("sync");
            },
            getPanelListTest: function() {
                var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE clinicType ='SPECIALIST'  LIMIT 0,100 ";
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
                return listArr;
            },
            getPanelByState: function(state) {
                var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE state=? AND status = 1";
                db = Ti.Database.open(collection.config.adapter.db_name);
                var res = db.execute(sql, state);
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
                var sql = "SELECT DISTINCT(state) FROM " + collection.config.adapter.collection_name + " WHERE state !='' AND status = 1 GROUP BY state";
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
                var sql = "SELECT clinicType, count(DISTINCT(id)) as total FROM " + collection.config.adapter.collection_name + " WHERE clinicCode IN (" + clinicCode + ") AND status = 1 GROUP BY clinicType ";
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
                if ("" != corp) var sql = "SELECT clinicType, count(DISTINCT(id)) as total FROM " + collection.config.adapter.collection_name + " where openHour NOT LIKE '%24 HOURS%' AND panel=1 AND status = 1 GROUP BY clinicType "; else var sql = "SELECT clinicType, count(DISTINCT(id)) as total FROM " + collection.config.adapter.collection_name + " WHERE openHour NOT LIKE '%24 HOURS%' AND status = 1 GROUP BY clinicType ";
                db = Ti.Database.open(collection.config.adapter.db_name);
                var res = db.execute(sql);
                var listArr = [];
                var count = 0;
                while (res.isValidRow()) {
                    var row_count = res.fieldCount;
                    for (var a = 0; row_count > a; a++) console.log(a + ":" + res.fieldName(a) + ":" + res.field(a));
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
                if ("" != corp) var sql = "SELECT count(*) as total FROM " + collection.config.adapter.collection_name + " WHERE panel =1 AND openHour LIKE '%24 HOURS%' AND status = 1 "; else var sql = "SELECT count(*) as total FROM " + collection.config.adapter.collection_name + " WHERE openHour LIKE '%24 HOURS%' AND status = 1 ";
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
                var clinicLocationSelection = Ti.App.Properties.getString("clinicLocationSelection");
                var location_sql = null != clinicLocationSelection ? " AND state='" + clinicLocationSelection.toUpperCase() + "' " : "";
                var panel_sql = "" != corp ? " AND panel=1" : "";
                db = Ti.Database.open(collection.config.adapter.db_name);
                if ("" != searchKey) {
                    var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE clinicType ='" + ClinicType.toUpperCase() + "' AND (clinicName LIKE '%'|| ? ||'%' OR add1 LIKE '%'|| ? ||'%' OR city LIKE '%'|| ? ||'%' OR postcode LIKE '%'|| ? ||'%' OR state LIKE '%'|| ? ||'%') AND status = 1 " + panel_sql + location_sql + "  GROUP BY id  ORDER BY state, postcode, clinicName";
                    var res = db.execute(sql, searchKey, searchKey, searchKey, searchKey, searchKey);
                } else {
                    var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE clinicType ='" + ClinicType.toUpperCase() + "' " + panel_sql + location_sql + " AND status = 1 GROUP BY id ORDER BY state, postcode, clinicName";
                    var res = db.execute(sql);
                }
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
            getPanelBy24Hours: function(searchKey, corp, getPanelBy24Hours) {
                var collection = this;
                var clinicLocationSelection = Ti.App.Properties.getString("clinicLocationSelection");
                var location_sql = null != clinicLocationSelection ? " AND state='" + clinicLocationSelection.toUpperCase() + "' " : "";
                var corp_sql = "" != corp ? "AND panel = 1" : "";
                db = Ti.Database.open(collection.config.adapter.db_name);
                if ("" != searchKey) {
                    var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE openHour LIKE '%24 HOURS%' AND (clinicName LIKE '%'|| ? ||'%' OR add1 LIKE '%'|| ? ||'%' OR city LIKE '%'|| ? ||'%' OR postcode LIKE '%'|| ? ||'%' OR state LIKE '%'|| ? ||'%') AND status = 1 " + corp_sql + location_sql + "  GROUP BY id ";
                    var res = db.execute(sql, searchKey, searchKey, searchKey, searchKey, searchKey);
                } else {
                    var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE openHour LIKE '%24 HOURS%' " + corp_sql + location_sql + " AND status = 1 GROUP BY id ";
                    var res = db.execute(sql);
                }
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
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " where id = ?";
                db = Ti.Database.open(collection.config.adapter.db_name);
                var res = db.execute(sql, id);
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
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " where clinicCode IN (" + clinicCode + ") AND clinicType='" + clinicType + "' AND status = 1  GROUP BY id ";
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
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " where clinicCode IN (" + clinicCode + ") AND openHour LIKE '%24 HOURS%' AND status = 1 GROUP BY id";
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
                    var sql_query = "INSERT OR IGNORE INTO " + collection.config.adapter.collection_name + " (id, clinicName,clinicCode,clinicType,openHour, add1, add2, city,postcode, state, tel, latitude, longitude ) VALUES (?,?, ?, ?, ?, ?,?, ?,?,?,?,?, ?)";
                    db.execute(sql_query, entry.id, entry.clinicName, entry.clinicCode, entry.clinicType, entry.openHour, entry.add1, entry.add2, entry.city, entry.postcode, entry.state, entry.tel, entry.latitude, entry.longitude);
                    var sql_query = "UPDATE " + collection.config.adapter.collection_name + " SET clinicName=?,clinicCode=?,clinicType=?,openHour=?,add1=?,add2=?, city=?, postcode=?, state=?, tel=?, latitude=?, longitude=? WHERE id=?";
                    db.execute(sql_query, entry.clinicName, entry.clinicCode, entry.clinicType, entry.openHour, entry.add1, entry.add2, entry.city, entry.postcode, entry.state, entry.tel, entry.latitude, entry.longitude, entry.id);
                });
                db.execute("COMMIT");
                db.close();
                collection.trigger("sync");
            },
            saveArray: function(arr) {
                var collection = this;
                var columns = collection.config.columns;
                var names = [];
                for (var k in columns) names.push(k);
                db = Ti.Database.open(collection.config.adapter.db_name);
                arr.forEach(function(entry) {
                    var keys = [];
                    var eval_values = [];
                    for (var k in entry) entry.hasOwnProperty(k) && _.find(names, function(name) {
                        if (name == k) {
                            keys.push(k);
                            eval_values.push("'" + entry[k] + "'");
                        }
                    });
                    var sql_query = "INSERT OR REPLACE INTO " + collection.config.adapter.collection_name + " (" + keys.join() + ") VALUES (" + eval_values.join() + ")";
                    db.execute(sql_query);
                });
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