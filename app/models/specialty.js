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
			getAvailableData : function(){
				var collection = this;
                var sql = "SELECT specialty.* FROM specialty, doctor_panel where doctor_panel.specialty_id = specialty.id group by specialty.id";
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
			saveArray : function(arr){ // 5.1th version of save array by onn
				var collection = this;
				var columns = collection.config.columns;
				var names = [];
				for (var k in columns) {
	                names.push(k);
	            }
                db = Ti.Database.open(collection.config.adapter.db_name);
                if(Ti.Platform.osname != "android"){
                	db.file.setRemoteBackup(false);
                }
                console.log(arr.length+" number of arr to save into "+ collection.config.adapter.db_name);
                db.execute("BEGIN");
                arr.forEach(function(entry) {
                	var keys = [];
                	var eval_values = [];
                	for(var k in entry){
	                	if (entry.hasOwnProperty(k)){
	                		_.find(names, function(name){
	                			if(name == k){
	                				keys.push(k);
	                				entry[k] = (entry[k] == null)?"":entry[k];
	                				entry[k] = entry[k].replace(/'/g, "\\'");
			                		eval_values.push("\""+entry[k]+"\"");
	                			}
	                		});
	                	}
                	}
		            var sql_query =  "INSERT OR REPLACE INTO "+collection.config.adapter.collection_name+" ("+keys.join()+") VALUES ("+eval_values.join()+")";
		            console.log(sql_query);
		            db.execute(sql_query);
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