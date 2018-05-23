var Alloy = require('/alloy'),
    _ = require("/alloy/underscore")._,
    model,
    collection;

exports.definition = {
	config: {
		columns: {
			"id": "INTEGER PRIMARY KEY AUTOINCREMENT",
			"u_id": "INTEGER",
			"sender_id": "INTEGER",
			"message": "TEXT",
			"created": "DATE",
			"status": "INTEGER",
			"format": "TEXT",
			"dr_id": "INTEGER",
			"is_endUser": "INTEGER",
			"sender_name": "TEXT"
		},
		adapter: {
			type: "sql",
			collection_name: "helpline",
			idAttribute: "id"
		}
	},
	extendModel: function (Model) {
		_.extend(Model.prototype, {});

		return Model;
	},
	extendCollection: function (Collection) {
		_.extend(Collection.prototype, {
			getCountUnread: function (e) {
				var collection = this;
				var u_id = Ti.App.Properties.getString('u_id') || 0;
				var sql = "SELECT count(*) as total from helpline where u_id = ? AND status = 2 group by u_id";

				db = Ti.Database.open(collection.config.adapter.db_name);
				if ("android" != "android") {
					db.file.setRemoteBackup(false);
				}

				var res = db.execute(sql, u_id);
				if (res.isValidRow()) {
					var total = res.fieldByName('total');
					res.close();
					db.close();
					collection.trigger('sync');
					return total;
				}
				return 0;
			},
			getData: function (latest, start, anchor, last_id, dr_id) {
				if (latest) {
					var start_limit = "";

					var sql_lastupdate = "";
					var sql_id = " AND id > " + last_id;
				} else {
					var start_limit = " limit " + start + ", 10";
					var sql_lastupdate = " AND created <= '" + anchor + "'";
					var sql_id = "";
				}

				dr_id = dr_id === 0 ? 0 : dr_id;

				var collection = this;
				var u_id = Ti.App.Properties.getString('u_id');
				var sql = "SELECT * from helpline where u_id = ? AND dr_id = ? " + sql_lastupdate + sql_id + " order by created desc" + start_limit;
				console.log(sql + " " + dr_id + " " + u_id);

				db = Ti.Database.open(collection.config.adapter.db_name);
				if ("android" != "android") {
					db.file.setRemoteBackup(false);
				}

				var res = db.execute(sql, u_id, dr_id);
				var arr = [];
				var count = 0;

				while (res.isValidRow()) {
					arr[count] = {
						id: res.fieldByName('id'),
						u_id: res.fieldByName('u_id'),
						sender_id: res.fieldByName('sender_id'),
						message: res.fieldByName('message'),
						status: res.fieldByName('status'),
						dr_id: res.fieldByName('dr_id'),
						created: res.fieldByName('created'),
						format: res.fieldByName("format"),
						is_endUser: res.fieldByName('is_endUser'),
						sender_name: res.fieldByName('sender_name')
					};
					res.next();
					count++;
				}

				res.close();
				db.close();
				collection.trigger('sync');
				return arr;
			},
			removeById: function (m_id) {
				var collection = this;

				db = Ti.Database.open(collection.config.adapter.db_name);
				if ("android" != "android") {
					db.file.setRemoteBackup(false);
				}
				var sql_query = "DELETE FROM " + collection.config.adapter.collection_name + " WHERE id=?";
				db.execute(sql_query, m_id);
				console.log(db.getRowsAffected() + " deleted");
				db.close();
				collection.trigger('sync');
			},
			setColumnValue: function () {
				var collection = this;

				db = Ti.Database.open(collection.config.adapter.db_name);
				if ("android" != "android") {
					db.file.setRemoteBackup(false);
				}
				var sql_query = "UPDATE " + collection.config.adapter.collection_name + " set dr_id = 0";
				db.execute(sql_query);
				console.log(db.getRowsAffected() + " deleted");
				db.close();
				collection.trigger('sync');
			},
			messageRead: function (entry) {
				var collection = this;

				db = Ti.Database.open(collection.config.adapter.db_name);
				if ("android" != "android") {
					db.file.setRemoteBackup(false);
				}
				var sql_query = "UPDATE " + collection.config.adapter.collection_name + " SET status=3 WHERE u_id=?";
				db.execute(sql_query, entry.u_id);
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
			},
			saveRecord: function (entry) {
				var collection = this;

				db = Ti.Database.open(collection.config.adapter.db_name);
				if ("android" != "android") {
					db.file.setRemoteBackup(false);
				}

				entry.message = entry.message.replace("[br]", "\n");
				var sql_query = "INSERT OR IGNORE INTO " + collection.config.adapter.collection_name + " (sender_id, message, created, is_endUser,sender_name, u_id) VALUES (?,?,?,?,?,?)";
				db.execute(sql_query, entry.sender_id, entry.message, entry.created, entry.is_endUser, entry.sender_name, entry.u_id);
				var last_id = db.lastInsertRowId;
				db.close();
				collection.trigger('sync');
				return last_id;
			},
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
			updateStatus: function (arr, status) {
				var collection = this;
				var sql = "UPDATE helpline set status = ? WHERE id in(?)";
				db = Ti.Database.open(collection.config.adapter.db_name);
				if ("android" != "android") {
					db.file.setRemoteBackup(false);
				}
				db.execute(sql, status, arr);
				db.close();
				collection.trigger('sync');
			},
			V1_9DBupdate: function () {
				var collection = this;
				var sql = "UPDATE helpline set status = 2";
				db = Ti.Database.open(collection.config.adapter.db_name);
				if ("android" != "android") {
					db.file.setRemoteBackup(false);
				}
				db.execute(sql);
				db.close();
				collection.trigger('sync');
			},
			resetTable: function () {
				var collection = this;
				var sql = "DELETE FROM " + collection.config.adapter.collection_name;
				db = Ti.Database.open(collection.config.adapter.db_name);
				if ("android" != "android") {
					db.file.setRemoteBackup(false);
				}
				db.execute(sql);
				db.close();
				collection.trigger('sync');
			}
		});

		return Collection;
	}
};

model = Alloy.M('helpline', exports.definition, []);

collection = Alloy.C('helpline', exports.definition, model);

exports.Model = model;
exports.Collection = collection;