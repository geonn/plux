var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            id: "INTEGER PRIMARY KEY AUTOINCREMENT",
            medical_id: "INTEGER",
            blob: "BLOB",
            category: "TEXT",
            created: "TEXT",
            updated: "TEXT"
        },
        adapter: {
            type: "sql",
            collection_name: "medicalAttachment"
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
            getRecordByMecId: function(medical_id) {
                var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE  medical_id='" + medical_id + "' ";
                db = Ti.Database.open(collection.config.adapter.db_name);
                var res = db.execute(sql);
                var listArr = [];
                var count = 0;
                while (res.isValidRow()) {
                    listArr[count] = {
                        id: res.fieldByName("id"),
                        medical_id: res.fieldByName("medical_id"),
                        blob: res.fieldByName("blob"),
                        category: res.fieldByName("category"),
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
            removeRecordById: function(id) {
                var collection = this;
                var sql = "DELETE FROM " + collection.config.adapter.collection_name + " WHERE id='" + id + "'";
                db = Ti.Database.open(collection.config.adapter.db_name);
                db.execute(sql);
                db.close();
                collection.trigger("sync");
            },
            removeRecordByRec: function(rec) {
                var collection = this;
                var sql = "DELETE FROM " + collection.config.adapter.collection_name + " WHERE medical_id='" + rec + "'";
                db = Ti.Database.open(collection.config.adapter.db_name);
                db.execute(sql);
                db.close();
                collection.trigger("sync");
            },
            addAttachment: function(entry) {
                var collection = this;
                db = Ti.Database.open(collection.config.adapter.db_name);
                sql_query = "INSERT INTO " + collection.config.adapter.collection_name + "( medical_id,blob, created, updated, category ) VALUES ( '" + entry.medical_id + "', '" + entry.blob + "', '" + currentDateTime() + "', '" + currentDateTime() + "', '" + entry.category + "')";
                db.execute(sql_query);
                db.close();
                collection.trigger("sync");
            }
        });
        return Collection;
    }
};

model = Alloy.M("medicalAttachment", exports.definition, []);

collection = Alloy.C("medicalAttachment", exports.definition, model);

exports.Model = model;

exports.Collection = collection;