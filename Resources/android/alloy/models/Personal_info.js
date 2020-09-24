var Alloy = require('/alloy'),
_ = require("/alloy/underscore")._,
model,collection;



exports.definition = {
  config: {
    columns: {
      "id": "INTEGER PRIMARY KEY",
      "u_id": "INTEGER",
      "type": "TEXT",
      "val": "TEXT",
      "status": "TEXT",
      "created": "TEXT",
      "updated": "TEXT" },

    adapter: {
      type: "sql",
      collection_name: "personal_info" } },


  extendModel: function (Model) {
    _.extend(Model.prototype, {
      // extended functions and properties go here
    });

    return Model;
  },
  extendCollection: function (Collection) {
    _.extend(Collection.prototype, {
      // extended functions and properties go here
      addColumn: function (newFieldName, colSpec) {
        var collection = this;
        var db = Ti.Database.open(collection.config.adapter.db_name);
        if ("android" != "android") {
          db.file.setRemoteBackup(false);
        }
        var fieldExists = false;
        resultSet = db.execute('PRAGMA TABLE_INFO(' + collection.config.adapter.collection_name + ')');
        while (resultSet.isValidRow()) {
          if (resultSet.field(1) == newFieldName) {
            fieldExists = true;
          }
          resultSet.next();
        }
        if (!fieldExists) {
          db.execute('ALTER TABLE ' + collection.config.adapter.collection_name + ' ADD COLUMN ' + newFieldName + ' ' + colSpec);
        }
        db.close();
      },
      getData: function (type) {
        var collection = this;
        var u_id = Ti.App.Properties.getString('u_id');
        var sql = "SELECT * from " + collection.config.adapter.collection_name + " where u_id = ? AND type = ? AND status != 2 order by created desc";
        console.log(type + " type");
        db = Ti.Database.open(collection.config.adapter.db_name);
        if ("android" != "android") {
          db.file.setRemoteBackup(false);
        }

        var res = db.execute(sql, u_id, type);
        var arr = [];
        var count = 0;
        /**
                       * debug use
                       
                       var row_count = res.fieldCount;
                       /** for(var a = 0; a < row_count; a++){
                       console.log(a+":"+res.fieldName(a)+":"+res.field(a));
                       }
                       */
        while (res.isValidRow()) {
          arr[count] = {
            id: res.fieldByName('id'),
            u_id: res.fieldByName('u_id'),
            type: res.fieldByName('type'),
            val: res.fieldByName('val'),
            status: res.fieldByName('status'),
            created: res.fieldByName('created'),
            updated: res.fieldByName('updated') };

          res.next();
          count++;
        }

        res.close();
        db.close();
        collection.trigger('sync');
        return arr;
      },
      getDataById: function (id) {
        var collection = this;
        var u_id = Ti.App.Properties.getString('u_id');
        var sql = "SELECT * from " + collection.config.adapter.collection_name + " where id = ?";

        db = Ti.Database.open(collection.config.adapter.db_name);
        if ("android" != "android") {
          db.file.setRemoteBackup(false);
        }

        var res = db.execute(sql, id);
        var arr;
        var count = 0;
        /**
                       * debug use
                       
                       var row_count = res.fieldCount;
                       /** for(var a = 0; a < row_count; a++){
                       console.log(a+":"+res.fieldName(a)+":"+res.field(a));
                       }
                       */
        while (res.isValidRow()) {
          arr = {
            id: res.fieldByName('id'),
            u_id: res.fieldByName('u_id'),
            type: res.fieldByName('type'),
            val: res.fieldByName('val'),
            status: res.fieldByName('status'),
            created: res.fieldByName('created'),
            updated: res.fieldByName('updated') };

          res.next();
          count++;
        }

        res.close();
        db.close();
        collection.trigger('sync');
        return arr;
      },
      removeRecordById: function (id) {
        var collection = this;
        var sql = "DELETE FROM " + collection.config.adapter.collection_name + " WHERE id=?";
        db = Ti.Database.open(collection.config.adapter.db_name);
        if ("android" != "android") {
          db.file.setRemoteBackup(false);
        }
        db.execute(sql, id);
        db.close();
        collection.trigger('sync');
      },
      saveArray: function (arr) {// 5.1th version of save array by onn
        var collection = this;
        var columns = collection.config.columns;
        var names = [];
        for (var k in columns) {
          names.push(k);
        }
        db = Ti.Database.open(collection.config.adapter.db_name);
        if ("android" != "android") {
          db.file.setRemoteBackup(false);
        }
        console.log(arr.length + " number of arr to save into " + collection.config.adapter.db_name);
        db.execute("BEGIN");
        arr.forEach(function (entry) {
          var keys = [];
          var eval_values = [];
          for (var k in entry) {
            if (entry.hasOwnProperty(k)) {
              _.find(names, function (name) {
                if (name == k) {
                  keys.push(k);
                  entry[k] = entry[k] == null ? "" : entry[k];
                  entry[k] = entry[k].replace(/'/g, "\\'");
                  eval_values.push("\"" + entry[k] + "\"");
                }
              });
            }
          }
          var sql_query = "INSERT OR REPLACE INTO " + collection.config.adapter.collection_name + " (" + keys.join() + ") VALUES (" + eval_values.join() + ")";
          console.log(sql_query);
          db.execute(sql_query);
        });
        db.execute("COMMIT");
        db.close();
        collection.trigger('sync');
      } });


    return Collection;
  } };


model = Alloy.M('personal_info',
exports.definition,
[]);


collection = Alloy.C('personal_info',
exports.definition,
model);


exports.Model = model;
exports.Collection = collection;