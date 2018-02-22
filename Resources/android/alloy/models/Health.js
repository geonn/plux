var Alloy = require('/alloy'),
    _ = require("/alloy/underscore")._,
    model,
    collection;

exports.definition = {
	config: {
		columns: {
			"id": "INTEGER PRIMARY KEY AUTOINCREMENT",
			"u_id": "INTEGER",
			"date": "TEXT",
			"time": "TEXT",
			"type": "TEXT",
			"field1": "TEXT",
			"field2": "TEXT",
			"field3": "TEXT",
			"field4": "TEXT",
			"remark": "TEXT",
			"amount": "TEXT",
			"created": "TEXT"
		},
		adapter: {
			type: "sql",
			collection_name: "health"
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
			getData: function () {
				var collection = this;
				var u_id = Ti.App.Properties.getString('u_id');
				db = Ti.Database.open(collection.config.adapter.db_name);
				var sql = "SELECT *, strftime(date, '%d-%m-%Y') as newdate FROM " + collection.config.adapter.collection_name + " WHERE u_id = ?";

				var res = db.execute(sql, u_id);
				var listArr = [];
				var count = 0;

				while (res.isValidRow()) {
					listArr[count] = {
						id: res.fieldByName('id'),
						u_id: res.fieldByName("u_id"),
						date: res.fieldByName('date'),
						newdate: res.fieldByName('newdate'),
						time: res.fieldByName('time'),
						type: res.fieldByName('type'),
						field1: res.fieldByName('field1'),
						field2: res.fieldByName('field2'),
						field3: res.fieldByName('field3'),
						field4: res.fieldByName('field4'),
						remark: res.fieldByName('remark'),
						amount: res.fieldByName('amount'),
						created: res.fieldByName('created')
					};
					res.next();
					count++;
				}
				res.close();
				db.close();
				collection.trigger('sync');

				return listArr;
			},
			getLatestByType: function (e) {
				var collection = this;
				var u_id = Ti.App.Properties.getString('u_id');

				db = Ti.Database.open(collection.config.adapter.db_name);
				var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE u_id = ? group by type order by date desc";
				var res = db.execute(sql, u_id);
				var listArr = [];
				var count = 0;

				while (res.isValidRow()) {
					listArr[count] = {
						id: res.fieldByName('id'),
						u_id: res.fieldByName("u_id"),
						date: res.fieldByName('date'),
						time: res.fieldByName('time'),
						type: res.fieldByName('type'),
						field1: res.fieldByName('field1'),
						field2: res.fieldByName('field2'),
						field3: res.fieldByName('field3'),
						field4: res.fieldByName('field4'),
						remark: res.fieldByName('remark'),
						amount: res.fieldByName('amount'),
						created: res.fieldByName('created')
					};
					res.next();
					count++;
				}
				res.close();
				db.close();
				collection.trigger('sync');

				return listArr;
			},
			getDataGroupByMonth: function (e) {
				var collection = this;
				var type = e.type;
				var select_year = e.select_year + "";
				var u_id = Ti.App.Properties.getString('u_id');

				db = Ti.Database.open(collection.config.adapter.db_name);
				var sql = "SELECT *, strftime('%m', date) as day FROM " + collection.config.adapter.collection_name + " WHERE u_id = ? AND `type` = ? AND strftime('%Y', date) = ? group by strftime('%Y-%m', date)";

				var library = Alloy.Collections.instance("health");
				library.fetch({ query: {
						statement: sql,
						params: [u_id, type, select_year]
					}
				});

				var res = db.execute(sql, u_id, type, select_year);
				var listArr = [];
				var count = 0;

				while (res.isValidRow()) {
					listArr[count] = {
						id: res.fieldByName('id'),
						u_id: res.fieldByName("u_id"),
						date: res.fieldByName('date'),
						day: res.fieldByName('day'),
						time: res.fieldByName('time'),
						type: res.fieldByName('type'),
						field1: res.fieldByName('field1'),
						field2: res.fieldByName('field2'),
						field3: res.fieldByName('field3'),
						field4: res.fieldByName('field4'),
						remark: res.fieldByName('remark'),
						amount: res.fieldByName('amount'),
						created: res.fieldByName('created')
					};
					res.next();
					count++;
				}
				res.close();
				db.close();
				collection.trigger('sync');

				return listArr;
			},
			getDataGroupByDay: function (e) {
				var collection = this;
				var type = e.type;
				var select_month = e.select_month + "";
				var u_id = Ti.App.Properties.getString('u_id');

				db = Ti.Database.open(collection.config.adapter.db_name);
				var sql = "SELECT *, strftime('%d', date) as day FROM " + collection.config.adapter.collection_name + " WHERE u_id = ? AND `type` = ? AND strftime('%Y-%m', date) = ? group by strftime('%Y-%m-%d', date)";

				var library = Alloy.Collections.instance("health");
				library.fetch({ query: {
						statement: sql,
						params: [u_id, type, select_month]
					}
				});

				var res = db.execute(sql, u_id, type, select_month);
				var listArr = [];
				var count = 0;

				while (res.isValidRow()) {
					listArr[count] = {
						id: res.fieldByName('id'),
						u_id: res.fieldByName("u_id"),
						date: res.fieldByName('date'),
						day: res.fieldByName('day'),
						time: res.fieldByName('time'),
						type: res.fieldByName('type'),
						field1: res.fieldByName('field1'),
						field2: res.fieldByName('field2'),
						field3: res.fieldByName('field3'),
						field4: res.fieldByName('field4'),
						remark: res.fieldByName('remark'),
						amount: res.fieldByName('amount'),
						created: res.fieldByName('created')
					};
					res.next();
					count++;
				}
				res.close();
				db.close();
				collection.trigger('sync');

				return listArr;
			},
			getHealthAllListByType: function (type) {
				var collection = this;
				var u_id = Ti.App.Properties.getString('u_id');
				db = Ti.Database.open(collection.config.adapter.db_name);
				var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE type='" + type + "' AND u_id = ? ORDER BY date DESC ,time DESC";

				var res = db.execute(sql, u_id);
				var listArr = [];
				var count = 0;

				while (res.isValidRow()) {
					listArr[count] = {
						id: res.fieldByName('id'),
						u_id: res.fieldByName("u_id"),
						date: res.fieldByName('date'),
						time: res.fieldByName('time'),
						type: res.fieldByName('type'),
						field1: res.fieldByName('field1'),
						field2: res.fieldByName('field2'),
						amount: res.fieldByName('amount')
					};
					res.next();
					count++;
				}
				res.close();
				db.close();
				collection.trigger('sync');

				return listArr;
			},
			getHealthListByTypeInYear: function (type, gType) {
				var collection = this;
				db = Ti.Database.open(collection.config.adapter.db_name);
				var u_id = Ti.App.Properties.getString('u_id');

				var theField = "amount";
				if (gType == "6" || gType == "2") {
					theField = "field1";
				}
				if (gType == "5") {
					theField = "field2";
				}

				if (gType == "2") {
					var value2 = 0;
					var sql2 = 'SELECT strftime("%Y-%m", date) as datemonth, AVG(field2) as value2 FROM ' + collection.config.adapter.collection_name + " WHERE type='" + type + "' AND u_id = ? GROUP BY strftime(\"%Y-%m\", date) ORDER BY date LIMIT 6";
					var res2 = db.execute(sql2, u_id);
					if (res2.isValidRow()) {
						value2 = res2.fieldByName('value2');
					}
				}

				if (gType == "10") {
					var sql = 'SELECT strftime("%Y-%m", date) as datemonth, SUM(' + theField + ') as value FROM ' + collection.config.adapter.collection_name + " WHERE type='" + type + "' AND u_id = ? GROUP BY strftime(\"%Y-%m\", date) ORDER BY date  LIMIT 6";
				} else {
					var sql = 'SELECT strftime("%Y-%m", date) as datemonth, AVG(' + theField + ') as value FROM ' + collection.config.adapter.collection_name + " WHERE type='" + type + "' AND u_id = ? GROUP BY strftime(\"%Y-%m\", date) ORDER BY date  LIMIT 6";
				}
				var res = db.execute(sql, u_id);
				var listArr = [];
				var count = 0;
				if (gType == "2") {
					while (res.isValidRow()) {
						listArr[count] = {
							date: res.fieldByName('datemonth'),
							value: res.fieldByName('value'),
							value2: value2
						};
						res.next();
						count++;
					}
				} else {
					while (res.isValidRow()) {
						listArr[count] = {
							date: res.fieldByName('datemonth'),
							value: res.fieldByName('value')
						};
						res.next();
						count++;
					}
				}

				res.close();
				db.close();
				collection.trigger('sync');
				return listArr;
			},
			getSteps: function () {
				var collection = this;
				var u_id = Ti.App.Properties.getString('u_id');
				db = Ti.Database.open(collection.config.adapter.db_name);
				var sql = "SELECT date , SUM(amount) as amount FROM " + collection.config.adapter.collection_name + " WHERE type=10 AND u_id = ? GROUP BY date ORDER BY date DESC  LIMIT 6";
				console.log("getSteps");
				var res = db.execute(sql, u_id);
				var listArr = [];
				var count = 0;

				while (res.isValidRow()) {
					listArr[count] = {
						date: res.fieldByName('date'),
						amount: res.fieldByName('amount')
					};
					res.next();
					count++;
				}
				res.close();
				db.close();
				collection.trigger('sync');
				return listArr;
			},
			getHealthListByType: function (type) {
				var collection = this;
				var u_id = Ti.App.Properties.getString('u_id');
				db = Ti.Database.open(collection.config.adapter.db_name);
				var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE type='" + type + "' AND u_id = ?  GROUP BY date   ORDER BY date DESC ,time DESC LIMIT 6";

				var res = db.execute(sql, u_id);
				var listArr = [];
				var count = 0;

				while (res.isValidRow()) {
					listArr[count] = {
						id: res.fieldByName('id'),
						date: res.fieldByName('date'),
						time: res.fieldByName('time'),
						type: res.fieldByName('type'),
						field1: res.fieldByName('field1'),
						field2: res.fieldByName('field2'),
						amount: res.fieldByName('amount')
					};
					res.next();
					count++;
				}
				console.log(listArr);
				res.close(listArr);
				db.close();
				collection.trigger('sync');
				return listArr;
			},
			addHealthData: function (entry, callback) {
				var collection = this;
				var u_id = Ti.App.Properties.getString('u_id');
				var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE date='" + mysql_real_escape_string(entry.date) + "' AND time='" + mysql_real_escape_string(entry.time) + "' AND u_id = ?";
				var sql_query = "";
				console.log("addHealthData");
				db = Ti.Database.open(collection.config.adapter.db_name);
				var res = db.execute(sql, u_id);

				if (res.isValidRow()) {
					sql_query = "UPDATE " + collection.config.adapter.collection_name + " SET field1='" + entry.field1 + "' , field2='" + entry.field2 + "' , amount='" + entry.amount + "' WHERE date='" + entry.date + "' AND time='" + entry.time + "' ";
				} else {
					sql_query = "INSERT INTO " + collection.config.adapter.collection_name + "( date, time, type,field1,field2, amount,created, u_id) VALUES ('" + entry.date + "', '" + entry.time + "','" + entry.type + "','" + entry.field1 + "','" + entry.field2 + "' ,'" + entry.amount + "', '" + currentDateTime() + "', " + u_id + ")";
				}

				db.execute(sql_query);
				db.close();
				callback();
				collection.trigger('sync');
				API.syncHealthData({ u_id: Ti.App.Properties.getString('u_id') });
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
			updateUid: function () {
				var collection = this;
				var u_id = Ti.App.Properties.getString('u_id');
				sql_query = "UPDATE " + collection.config.adapter.collection_name + " SET u_id = ?";
				db = Ti.Database.open(collection.config.adapter.db_name);

				var res = db.execute(sql_query, u_id);
				db.close();
				collection.trigger('sync');
			},
			dropTable: function () {
				var collection = this;
				var sql = "DELETE FROM " + collection.config.adapter.collection_name;
				db = Ti.Database.open(collection.config.adapter.db_name);
				if ("android" != "android") {
					db.file.setRemoteBackup(false);
				}
				db.execute(sql);
				db.close();
				collection.trigger('sync');
			},
			removeHealthDataById: function (id) {
				var collection = this;
				var sql = "DELETE FROM " + collection.config.adapter.collection_name + " WHERE id='" + id + "' ";
				db = Ti.Database.open(collection.config.adapter.db_name);
				db.execute(sql);
				db.close();
				API.removeHealthDataById(id);
				collection.trigger('sync');
			}
		});

		return Collection;
	}
};

model = Alloy.M('health', exports.definition, []);

collection = Alloy.C('health', exports.definition, model);

exports.Model = model;
exports.Collection = collection;