var Alloy = require('/alloy'),
    _ = require("/alloy/underscore")._,
    model,
    collection;

exports.definition = {
	config: {
		columns: {
			"id": "INTEGER PRIMARY KEY",
			"medical_id": "INTEGER",
			"img_path": "TEXT",
			"category": "TEXT",
			"format": "TEXT",
			"created": "TEXT",
			"updated": "TEXT",
			"status": "INTEGET"
		},
		adapter: {
			type: "sql",
			collection_name: "medicalAttachmentV2"
		}
	},
	extendModel: function (Model) {
		_.extend(Model.prototype, {});

		return Model;
	},
	extendCollection: function (Collection) {
		_.extend(Collection.prototype, {
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
			getData: function (medical_id) {
				var collection = this;
				var sql = "SELECT * from " + collection.config.adapter.collection_name + " where status != 2 AND medical_id = ?";

				db = Ti.Database.open(collection.config.adapter.db_name);
				if ("android" != "android") {
					db.file.setRemoteBackup(false);
				}

				var res = db.execute(sql, medical_id);
				var arr = [];
				var count = 0;

				while (res.isValidRow()) {
					arr[count] = {
						id: res.fieldByName('id'),
						medical_id: res.fieldByName('medical_id'),
						img_path: res.fieldByName('img_path'),
						category: res.fieldByName('category'),
						created: res.fieldByName('created'),
						updated: res.fieldByName('updated')
					};
					res.next();
					count++;
				}

				res.close();
				db.close();
				collection.trigger('sync');
				return arr;
			},
			removeById: function (id) {
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
			saveArray: function (arr) {
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
									if (typeof entry[k] == "string") {
										entry[k] = entry[k] == null ? "" : entry[k];
										entry[k] = entry[k].replace(/"/g, "'");
										eval_values.push("\"" + entry[k] + "\"");
									} else if (typeof entry[k] == "number") {
										eval_values.push(entry[k]);
									} else {
										eval_values.push("\"" + entry[k] + "\"");
									}
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
			}
		});

		return Collection;
	}
};

model = Alloy.M('medicalAttachmentV2', exports.definition, []);

collection = Alloy.C('medicalAttachmentV2', exports.definition, model);

exports.Model = model;
exports.Collection = collection;