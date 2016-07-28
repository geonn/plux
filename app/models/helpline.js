exports.definition = {
	config: {
		columns: {
		    "id": "INTEGER PRIMARY KEY AUTOINCREMENT",
		    "u_id": "INTEGER",
		    "sender_id": "INTEGER",
		    "message": "TEXT",
		    "created": "DATE",
		    "is_endUser": "INTEGER",
		    "sender_name": "TEXT",
		},
		adapter: {
			type: "sql",
			collection_name: "helpline",
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
			getData: function(latest, last_update, start, anchor){
				var last_update = last_update || common.now();
				if(latest){
					var start_limit = "";
					var sql_lastupdate = " AND created >= '"+last_update+"'";
				}else{
					var start_limit = " limit "+start+", 10";
					var sql_lastupdate = " AND created <= '"+anchor+"'";
				}
				
				var collection = this;
				var u_id = Ti.App.Properties.getString('u_id'); 
                var sql = "SELECT * from helpline where u_id = ? "+sql_lastupdate+" order by created desc"+start_limit ; 
                
                db = Ti.Database.open(collection.config.adapter.db_name);
                if(Ti.Platform.osname != "android"){
                	db.file.setRemoteBackup(false);
                }
            	
            	var res = db.execute(sql, u_id);
               	var arr = [];
                var count = 0;
                 /**
                 * debug use
                 
                var row_count = res.fieldCount;
               /** for(var a = 0; a < row_count; a++){
            		 console.log(a+":"+res.fieldName(a)+":"+res.field(a));
            	 }
            	*/
                while (res.isValidRow()){
					arr[count] = {
					    id: res.fieldByName('id'),
					    u_id: res.fieldByName('u_id'),
					    sender_id: res.fieldByName('sender_id'),
					    message: res.fieldByName('message'),
					    created: res.fieldByName('created'),
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
			removeById: function(m_id){
				var collection = this;
				
                db = Ti.Database.open(collection.config.adapter.db_name);
                if(Ti.Platform.osname != "android"){
                	db.file.setRemoteBackup(false);
                }
				var sql_query =  "DELETE FROM "+collection.config.adapter.collection_name+" WHERE id=?";
				db.execute(sql_query, m_id);
				console.log(db.getRowsAffected()+" deleted");
	            db.close();
	            collection.trigger('sync');
			},
			messageRead : function(entry){
				var collection = this;
				
                db = Ti.Database.open(collection.config.adapter.db_name);
                if(Ti.Platform.osname != "android"){
                	db.file.setRemoteBackup(false);
                }
				var sql_query =  "UPDATE "+collection.config.adapter.collection_name+" SET read=1 WHERE room_id=?";
				db.execute(sql_query, entry.room_id);
				console.log(db.getRowsAffected()+" "+entry.room_id+" read");
	            db.close();
	            collection.trigger('sync');
			},
			saveArray : function(arr){
				console.log(typeof arr);
				console.log(arr);
				console.log(arr.length);
				if(typeof arr == "undefined" || arr == "no room found"){
					return;
				}
				var collection = this;
                db = Ti.Database.open(collection.config.adapter.db_name);
                if(Ti.Platform.osname != "android"){
                	db.file.setRemoteBackup(false);
                }
                db.execute("BEGIN");
                arr.forEach(function(entry) {
                	entry.message = entry.message.replace("[br]", "\n");
	                var sql_query =  "INSERT OR IGNORE INTO "+collection.config.adapter.collection_name+" (sender_id, message, created, is_endUser,sender_name, u_id) VALUES (?,?,?,?,?,?)";
					db.execute(sql_query, entry.sender_id, entry.message, entry.created, entry.is_endUser, entry.sender_name, entry.u_id);
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
                
                console.log(typeof entry.message);
                console.log(entry.message);
                entry.message = entry.message.replace("[br]", "\n");
                var sql_query =  "INSERT OR IGNORE INTO "+collection.config.adapter.collection_name+" (sender_id, message, created, is_endUser,sender_name, u_id) VALUES (?,?,?,?,?,?)";
				db.execute(sql_query, entry.sender_id, entry.message, entry.created, entry.is_endUser, entry.sender_name, entry.u_id);
	            db.close();
	            collection.trigger('sync');
			},
			addColumn : function( newFieldName, colSpec) {
				var collection = this;
				var db = Ti.Database.open(collection.config.adapter.db_name);
				if(Ti.Platform.osname != "android"){
                	db.file.setRemoteBackup(false);
                }
				var fieldExists = false;
				resultSet = db.execute('PRAGMA TABLE_INFO(' + collection.config.adapter.collection_name + ')');
				while (resultSet.isValidRow()) {
					if(resultSet.field(1)==newFieldName) {
						fieldExists = true;
					}
					resultSet.next();
				}  
			 	if(!fieldExists) { 
					db.execute('ALTER TABLE ' + collection.config.adapter.collection_name + ' ADD COLUMN '+newFieldName + ' ' + colSpec);
				}
				db.close();
			},
		});

		return Collection;
	}
};