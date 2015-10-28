var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

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
            clinicType: "TEXT"
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
            getDataByID: function(id) {
                var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " where id = '" + id + "'";
                db = Ti.Database.open(collection.config.adapter.db_name);
                var res = db.execute(sql);
                var arr = [];
                if (res.isValidRow()) {
                    console.log("wtf");
                    arr = {
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
                    };
                }
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
                return listArr;
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
                var sql = "SELECT DISTINCT(state) FROM " + collection.config.adapter.collection_name + " WHERE state !='' GROUP BY state";
                console.log(sql);
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
                var sql = "SELECT clinicType, count(DISTINCT(id)) as total FROM " + collection.config.adapter.collection_name + " WHERE clinicCode IN (" + clinicCode + ") GROUP BY clinicType ";
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
                if ("" != corp) var sql = "SELECT clinicType, count(DISTINCT(id)) as total FROM " + collection.config.adapter.collection_name + " where panel=1 GROUP BY clinicType "; else var sql = "SELECT clinicType, count(DISTINCT(id)) as total FROM " + collection.config.adapter.collection_name + " GROUP BY clinicType ";
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
                var clinicLocationSelection = Ti.App.Properties.getString("clinicLocationSelection");
                var location_sql = null != clinicLocationSelection ? " AND state='" + clinicLocationSelection.toUpperCase() + "' " : "";
                var panel_sql = "" != corp ? " AND panel=1" : "";
                if ("" != searchKey) var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE clinicType ='" + ClinicType.toUpperCase() + "' AND (clinicName LIKE '%" + searchKey + "%' OR add1 LIKE '%" + searchKey + "%' OR city LIKE '%" + searchKey + "%' OR postcode LIKE '%" + searchKey + "%' OR state LIKE '%" + searchKey + "%') " + panel_sql + location_sql + "  GROUP BY id  ORDER BY state, postcode, clinicName"; else var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE clinicType ='" + ClinicType.toUpperCase() + "' " + panel_sql + location_sql + " GROUP BY id ORDER BY state, postcode, clinicName";
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
                var clinicLocationSelection = Ti.App.Properties.getString("clinicLocationSelection");
                var location_sql = null != clinicLocationSelection ? " AND state='" + clinicLocationSelection.toUpperCase() + "' " : "";
                var corp_sql = "" != corp ? "AND panel = 1" : "";
                if ("" != searchKey) var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE openHour LIKE '%24 HOURS%' AND (clinicName LIKE '%" + searchKey + "%' OR add1 LIKE '%" + searchKey + "%' OR city LIKE '%" + searchKey + "%' OR postcode LIKE '%" + searchKey + "%' OR state LIKE '%" + searchKey + "%') " + corp_sql + location_sql + "  GROUP BY id "; else var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE openHour LIKE '%24 HOURS%' " + corp_sql + location_sql + "  GROUP BY id ";
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
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " where clinicCode IN (" + clinicCode + ") AND clinicType='" + clinicType + "'  GROUP BY id ";
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
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " where clinicCode IN (" + clinicCode + ") AND openHour LIKE '%24 HOURS%' GROUP BY id";
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
                    db.execute(sql_query, entry.id, entry.clinicname, entry.cliniccode, entry.clinictype, entry.openhour, entry.add1, entry.add2, entry.city, entry.postcode, entry.state, entry.tel, entry.latitude, entry.longitude);
                    var sql_query = "UPDATE " + collection.config.adapter.collection_name + " SET clinicName=?,clinicCode=?,clinicType=?,openHour=?,add1=?,add2=?, city=?, postcode=?, state=?, tel=?, latitude=?, longitude=? WHERE id=?";
                    db.execute(sql_query, entry.clinicname, entry.cliniccode, entry.clinictype, entry.openhour, entry.add1, entry.add2, entry.city, entry.postcode, entry.state, entry.tel, entry.latitude, entry.longitude, entry.id);
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