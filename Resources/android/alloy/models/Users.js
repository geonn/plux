var Alloy = require("/alloy"), _ = require("/alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            id: "INTEGER PRIMARY KEY AUTOINCREMENT",
            memno: "TEXT",
            icno: "TEXT",
            name: "TEXT",
            relation: "TEXT",
            empno: "TEXT",
            corpcode: "TEXT",
            corpname: "TEXT",
            costcenter: "TEXT",
            dept: "TEXT",
            allergy: "TEXT",
            isver: "TEXT",
            verno: "TEXT"
        },
        adapter: {
            type: "sql",
            collection_name: "users"
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
            getUserList: function() {
                var collection = this;
                db = Ti.Database.open(collection.config.adapter.db_name);
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name;
                var res = db.execute(sql);
                var listArr = [];
                var count = 0;
                while (res.isValidRow()) {
                    listArr[count] = {
                        id: res.fieldByName("id"),
                        name: res.fieldByName("name"),
                        memno: res.fieldByName("memno"),
                        icno: res.fieldByName("icno"),
                        relation: res.fieldByName("relation"),
                        empno: res.fieldByName("empno"),
                        corpcode: res.fieldByName("corpcode"),
                        corpname: res.fieldByName("corpname"),
                        costcenter: res.fieldByName("costcenter"),
                        dept: res.fieldByName("dept"),
                        allergy: res.fieldByName("allergy"),
                        isver: res.fieldByName("isver"),
                        verno: res.fieldByName("verno")
                    };
                    res.next();
                    count++;
                }
                res.close();
                db.close();
                collection.trigger("sync");
                return listArr;
            },
            getUserByMemno: function() {
                var collection = this;
                var memno = Ti.App.Properties.getString("memno");
                db = Ti.Database.open(collection.config.adapter.db_name);
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE memno=?";
                var res = db.execute(sql, memno);
                var arr = [];
                res.isValidRow() && (arr = {
                    id: res.fieldByName("id"),
                    name: res.fieldByName("name"),
                    memno: res.fieldByName("memno"),
                    icno: res.fieldByName("icno"),
                    relation: res.fieldByName("relation"),
                    empno: res.fieldByName("empno"),
                    corpcode: res.fieldByName("corpcode"),
                    corpname: res.fieldByName("corpname"),
                    costcenter: res.fieldByName("costcenter"),
                    dept: res.fieldByName("dept"),
                    allergy: res.fieldByName("allergy"),
                    isver: res.fieldByName("isver"),
                    verno: res.fieldByName("verno")
                });
                res.close();
                db.close();
                collection.trigger("sync");
                return arr;
            },
            getUserByEmpNo: function() {
                var collection = this;
                db = Ti.Database.open(collection.config.adapter.db_name);
                var empno = Ti.App.Properties.getString("empno");
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE empno=?";
                console.log(sql + " " + empno);
                var res = db.execute(sql, empno);
                var arr = [];
                var count = 0;
                while (res.isValidRow()) {
                    arr[count] = {
                        id: res.fieldByName("id"),
                        name: res.fieldByName("name"),
                        memno: res.fieldByName("memno"),
                        icno: res.fieldByName("icno"),
                        relation: res.fieldByName("relation"),
                        empno: res.fieldByName("empno"),
                        corpcode: res.fieldByName("corpcode"),
                        corpname: res.fieldByName("corpname"),
                        costcenter: res.fieldByName("costcenter"),
                        dept: res.fieldByName("dept"),
                        allergy: res.fieldByName("allergy"),
                        isver: res.fieldByName("isver"),
                        verno: res.fieldByName("verno")
                    };
                    res.next();
                    count++;
                }
                res.close();
                db.close();
                collection.trigger("sync");
                return arr;
            },
            getOwnerData: function(id) {
                var collection = this;
                db = Ti.Database.open(collection.config.adapter.db_name);
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE id=?";
                var res = db.execute(sql, id);
                var arr = [];
                res.isValidRow() && (arr = {
                    id: res.fieldByName("id"),
                    name: res.fieldByName("name"),
                    memno: res.fieldByName("memno"),
                    icno: res.fieldByName("icno"),
                    relation: res.fieldByName("relation"),
                    empno: res.fieldByName("empno"),
                    corpcode: res.fieldByName("corpcode"),
                    corpname: res.fieldByName("corpname"),
                    costcenter: res.fieldByName("costcenter"),
                    dept: res.fieldByName("dept"),
                    allergy: res.fieldByName("allergy"),
                    isver: res.fieldByName("isver"),
                    verno: res.fieldByName("verno")
                });
                res.close();
                db.close();
                collection.trigger("sync");
                return arr;
            },
            getPrincipleData: function() {
                var collection = this;
                db = Ti.Database.open(collection.config.adapter.db_name);
                var memno = Ti.App.Properties.getString("memno");
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE relation='PRINCIPLE' and memno=?";
                var res = db.execute(sql, memno);
                var arr = [];
                res.isValidRow() && (arr = {
                    id: res.fieldByName("id"),
                    name: res.fieldByName("name"),
                    memno: res.fieldByName("memno"),
                    icno: res.fieldByName("icno"),
                    relation: res.fieldByName("relation"),
                    empno: res.fieldByName("empno"),
                    corpcode: res.fieldByName("corpcode"),
                    corpname: res.fieldByName("corpname"),
                    costcenter: res.fieldByName("costcenter"),
                    dept: res.fieldByName("dept"),
                    allergy: res.fieldByName("allergy"),
                    isver: res.fieldByName("isver"),
                    verno: res.fieldByName("verno")
                });
                res.close();
                db.close();
                collection.trigger("sync");
                return arr;
            },
            saveArray: function(arr) {
                var collection = this;
<<<<<<< HEAD
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
=======
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
                    console.log(sql_query);
                    db.execute(sql_query);
                });
>>>>>>> origin/master
                db.close();
                collection.trigger("sync");
            },
            addUserData: function(arr) {
                var collection = this;
                arr.forEach(function(entry) {
                    var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE memno='" + entry.memno + "' ";
                    var sql_query = "";
                    db = Ti.Database.open(collection.config.adapter.db_name);
                    var res = db.execute(sql);
                    if (res.isValidRow()) {
                        sql_query = "UPDATE " + collection.config.adapter.collection_name + " SET name=?,  icno=? , relation=?, empno=?, corpcode=?, corpname=?, costcenter=?, dept=?, allergy=?, isver=?, verno=? WHERE memno=? ";
                        db.execute(sql_query, entry.name, entry.icno, entry.relation, entry.empno, entry.corpcode, entry.corpname, entry.costcenter, entry.dept, entry.allergy, entry.isver, entry.verno, entry.memno);
                    } else {
                        sql_query = "INSERT INTO " + collection.config.adapter.collection_name + " (name, memno, icno, relation, empno,corpcode,corpname,costcenter,dept, allergy, isver, verno) VALUES (?, ?,?,?, ?,  ?,  ?,  ?,  ?, ?, ?, ?)";
                        db.execute(sql_query, entry.name, entry.memno, entry.icno, entry.relation, entry.empno, entry.corpcode, entry.corpname, entry.costcenter, entry.dept, entry.allergy, entry.isver, entry.verno);
                    }
                    db.close();
                });
                collection.trigger("sync");
            },
            resetData: function() {
                var collection = this;
                db = Ti.Database.open(collection.config.adapter.db_name);
                db.execute("DELETE from " + collection.config.adapter.collection_name);
                collection.trigger("sync");
                db.close();
            }
        });
        return Collection;
    }
};

model = Alloy.M("users", exports.definition, []);

collection = Alloy.C("users", exports.definition, model);

exports.Model = model;

exports.Collection = collection;