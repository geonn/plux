var Alloy = require('/alloy'),
    _ = require("/alloy/underscore")._,
    model,
    collection;

exports.definition = {
	config: {
		columns: {
			"id": "INTEGER",
			"news_id": "INTEGER",
			"content": "TEXT",
			"type": "TEXT",
			"images": "TEXT",
			"position": "INTEGER"
		},
		adapter: {
			type: "sql",
			collection_name: "news_element"
		}
	},
	extendModel: function (Model) {
		_.extend(Model.prototype, {});

		return Model;
	},
	extendCollection: function (Collection) {
		_.extend(Collection.prototype, {
			getListByNews: function (news_id) {
				var collection = this;
				var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE news_id ='" + news_id + "' ORDER by position DESC";

				db = Ti.Database.open(collection.config.adapter.db_name);
				if ("android" != "android") {
					db.file.setRemoteBackup(false);
				}
				var res = db.execute(sql);
				var listArr = [];
				var count = 0;
				while (res.isValidRow()) {
					listArr[count] = {
						id: res.fieldByName('id'),
						news_id: res.fieldByName('news_id'),
						content: res.fieldByName('content'),
						type: res.fieldByName('type'),
						images: res.fieldByName('images'),
						position: res.fieldByName('position')
					};

					res.next();
					count++;
				}

				res.close();
				db.close();
				collection.trigger('sync');
				return listArr;
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
			addElement: function (arr) {
				var collection = this;
				db = Ti.Database.open(collection.config.adapter.db_name);

				db.execute("BEGIN");
				arr.forEach(function (entry) {
					sql_query = "INSERT INTO " + collection.config.adapter.collection_name + "(id, news_id, content, type, images,position) VALUES (" + entry.id + ", '" + entry.news_id + "', '" + mysql_real_escape_string(entry.content) + "', '" + entry.type + "', '" + entry.images + "', '" + entry.position + "')";

					db.execute(sql_query);
				});

				db.execute("COMMIT");
				db.close();
				collection.trigger('sync');
			},
			resetNewsElement: function () {
				var collection = this;
				var sql = "DELETE FROM " + collection.config.adapter.collection_name;
				db = Ti.Database.open(collection.config.adapter.db_name);
				db.execute(sql);
				db.close();
				collection.trigger('sync');
			}
		});

		return Collection;
	}
};

model = Alloy.M('news_element', exports.definition, []);

collection = Alloy.C('news_element', exports.definition, model);

exports.Model = model;
exports.Collection = collection;