exports.definition = {
	config: {
		columns: {
		    "id": "INTEGER PRIMARY KEY",
		   	"title": "TEXT",
		   	"status":"INTEGER",
		   	"created":"DATE",
		   	"updated":"DATE"
		},
		adapter: {
			type: "sql",
			collection_name: "specialty",
			idAttribute: "id"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});	
		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here
			getData : function(){
				var collection = this;
                var sql = "SELECT * FROM "+collection.config.adapter.collection_name+" where status = 1";
                
                db = Ti.Database.open(collection.config.adapter.db_name);
                if(Ti.Platform.osname != "android"){
                	db.file.setRemoteBackup(false);
                }
                var res = db.execute(sql);
                var arr = [];
                var count = 0;
                while (res.isValidRow()){
					arr[count] = {
					    id: res.fieldByName('id'),
					    title: res.fieldByName('title'),
					    status: res.fieldByName('status'),
					};
					res.next();
					count++;
				}
				res.close();
                db.close();
                collection.trigger('sync');
                return arr;
			},
			saveArray : function(arr){
				var collection = this;
                db = Ti.Database.open(collection.config.adapter.db_name);
                if(Ti.Platform.osname != "android"){
                	db.file.setRemoteBackup(false);
                }
                db.execute("BEGIN"); 
                arr.forEach(function(entry) {
	                var sql_query =  "INSERT OR IGNORE INTO "+collection.config.adapter.collection_name+" (id, title, status, created, updated) VALUES (?,?,?,?,?)";
					db.execute(sql_query, entry.id, entry.title, entry.status, entry.created, entry.updated);
					var sql_query =  "UPDATE "+collection.config.adapter.collection_name+" SET title=?, status=?, created=?, updated=? WHERE id=?";
					db.execute(sql_query, entry.title, entry.status, entry.created, entry.updated, entry.id);
				});
				db.execute("COMMIT");
	            db.close();
	            collection.trigger('sync');
			},
			saveRecord: function(entry){
				var collection = this;
				
                db = Ti.Database.open(collection.config.adapter.db_name);
                if(Ti.Platform.osname != "android"){
                	db.file.setRemoteBackup(false);
                }
                
                var sql_query =  "INSERT OR IGNORE INTO "+collection.config.adapter.collection_name+" (id, title, status, created, updated) VALUES (?,?,?,?,?)";
				db.execute(sql_query, entry.id, entry.title, entry.status, entry.created, entry.updated);
				var sql_query =  "UPDATE "+collection.config.adapter.collection_name+" SET title=?, status=?, created=?, updated=? WHERE id=?";
				db.execute(sql_query, entry.title, entry.status, entry.created, entry.updated, entry.id);
				
	            db.close();
	            collection.trigger('sync');
			}
		});

		return Collection;
	}
};