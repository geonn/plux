var Alloy = require('/alloy'),
    _ = require("/alloy/underscore")._,
    model,
    collection;

exports.definition = {
	config: {
		columns: {
			"id": "INTEGER PRIMARY KEY AUTOINCREMENT",
			"u_id": "TEXT",
			"title": "TEXT",
			"server_id": "TEXT",
			"message": "TEXT",
			"treatment": "TEXT",
			"created": "TEXT",
			"updated": "TEXT",
			"clinic": "TEXT"
		},
		adapter: {
			type: "sql",
			collection_name: "medicalRecords"
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
			getUnsyncList: function () {
				var collection = this;
				var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE server_id IS NULL ";

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
						server_id: res.fieldByName('server_id'),
						title: res.fieldByName('title'),
						clinic: res.fieldByName('clinic'),
						treatment: res.fieldByName('treatment'),
						message: res.fieldByName('message'),
						created: res.fieldByName('created'),
						updated: res.fieldByName('updated')
					};

					res.next();
					count++;
				}

				res.close();
				db.close();
				collection.trigger('sync');
				return listArr;
			},
			getRecordsList: function () {
				var collection = this;
				var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE u_id=" + Ti.App.Properties.getString('u_id') + " order by created DESC";
				console.log(sql);
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
						server_id: res.fieldByName('server_id'),
						title: res.fieldByName('title'),
						clinic: res.fieldByName('clinic'),
						treatment: res.fieldByName('treatment'),
						message: res.fieldByName('message'),
						created: res.fieldByName('created'),
						updated: res.fieldByName('updated')
					};

					res.next();
					count++;
				}

				res.close();
				db.close();
				collection.trigger('sync');
				return listArr;
			},
			getRecordById: function (id) {
				var collection = this;
				var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE id='" + id + "'";

				db = Ti.Database.open(collection.config.adapter.db_name);
				if ("android" != "android") {
					db.file.setRemoteBackup(false);
				}
				var res = db.execute(sql);
				var arr = [];

				if (res.isValidRow()) {
					arr = {
						id: res.fieldByName('id'),
						title: res.fieldByName('title'),
						treatment: res.fieldByName('treatment'),
						clinic: res.fieldByName('clinic'),
						message: res.fieldByName('message'),
						created: res.fieldByName('created'),
						updated: res.fieldByName('updated')
					};
				}
				res.close();
				db.close();
				collection.trigger('sync');
				return arr;
			},
			removeRecordById: function (id) {
				var collection = this;
				var sql = "DELETE FROM " + collection.config.adapter.collection_name + " WHERE id='" + id + "'";
				db = Ti.Database.open(collection.config.adapter.db_name);
				if ("android" != "android") {
					db.file.setRemoteBackup(false);
				}
				db.execute(sql);
				db.close();
				collection.trigger('sync');
			},
			searchRecord: function (query) {
				var collection = this;
				var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE title LIKE '%" + query + "%' OR message LIKE '%" + query + "%'";

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
						title: res.fieldByName('title'),
						treatment: res.fieldByName('treatment'),
						clinic: res.fieldByName('clinic'),
						message: res.fieldByName('message'),
						created: res.fieldByName('created'),
						updated: res.fieldByName('updated')
					};
					res.next();
					count++;
				}
				res.close();
				db.close();
				collection.trigger('sync');
				return listArr;
			},
			updateRecord: function (entry) {
				var collection = this;
				db = Ti.Database.open(collection.config.adapter.db_name);
				if ("android" != "android") {
					db.file.setRemoteBackup(false);
				}
				var title = entry.title;
				if (title != "") {
					title = title.replace(/["']/g, "&quot;");
				}

				var clinic = entry.clinic;
				if (clinic != "") {
					clinic = clinic.replace(/["']/g, "&quot;");
				}

				var treatment = entry.treatment;
				if (treatment != "") {
					treatment = treatment.replace(/["']/g, "&quot;");
				}

				var message = entry.message;
				if (message != "") {
					message = message.replace(/["']/g, "&quot;");
				}
				sql_query = "UPDATE " + collection.config.adapter.collection_name + " SET title='" + entry.title + "',u_id='" + entry.u_id + "',   message='" + entry.message + "', clinic='" + clinic + "', treatment='" + treatment + "' WHERE id='" + entry.id + "' ";

				db.execute(sql_query);

				db.close();
				collection.trigger('sync');
			},
			updateFromServer: function (entry) {
				var collection = this;
				db = Ti.Database.open(collection.config.adapter.db_name);
				if ("android" != "android") {
					db.file.setRemoteBackup(false);
				}
				sql_query = "UPDATE " + collection.config.adapter.collection_name + " SET server_id='" + entry.server_id + "' WHERE id='" + entry.id + "' ";

				db.execute(sql_query);
				db.close();
				collection.trigger('sync');
			},
			addRecord: function (entry) {
				var collection = this;
				db = Ti.Database.open(collection.config.adapter.db_name);
				if ("android" != "android") {
					db.file.setRemoteBackup(false);
				}

				var title = entry.title;
				if (title != "") {
					title = title.replace(/["']/g, "&quot;");
				}

				var message = entry.message;
				if (message != "") {
					message = message.replace(/["']/g, "&quot;");
				}

				sql_query = "INSERT INTO " + collection.config.adapter.collection_name + "( title,message, created, updated, treatment,clinic ) VALUES ( '" + title + "', '" + message + "', '" + entry.created + "', '" + entry.updated + "', '" + entry.treatment + "', '" + entry.clinic + "')";

				db.execute(sql_query);

				db.close();
				collection.trigger('sync');
			},
			addRecordFromServer: function (entry) {
				var collection = this;
				db = Ti.Database.open(collection.config.adapter.db_name);
				if ("android" != "android") {
					db.file.setRemoteBackup(false);
				}

				var title = entry.title;
				if (title != "") {
					title = title.replace(/["']/g, "&quot;");
				}

				var message = entry.message;
				if (message != "") {
					message = message.replace(/["']/g, "&quot;");
				}

				sql_query = "INSERT INTO " + collection.config.adapter.collection_name + "( id, server_id,title,message, created, updated, treatment,clinic ) VALUES ( '" + entry.id + "','" + entry.server_id + "','" + title + "', '" + message + "', '" + entry.created + "', '" + entry.updated + "', '" + entry.treatment + "', '" + entry.clinic + "')";

				db.execute(sql_query);

				db.close();
				collection.trigger('sync');
			},
			getLastId: function () {
				var collection = this;
				db = Ti.Database.open(collection.config.adapter.db_name);
				if ("android" != "android") {
					db.file.setRemoteBackup(false);
				}

				sql_query = "SELECT * FROM " + collection.config.adapter.collection_name + " ORDER BY id DESC LIMIT 1";

				var res = db.execute(sql_query);
				var arr = [];

				if (res.isValidRow()) {
					arr = {
						id: res.fieldByName('id')
					};
				}
				res.close();
				collection.trigger('sync');
				return arr;
			}
		});

		return Collection;
	}
};

model = Alloy.M('medicalRecords', exports.definition, []);

collection = Alloy.C('medicalRecords', exports.definition, model);

exports.Model = model;
exports.Collection = collection;