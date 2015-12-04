exports.definition = {
	config: {
		columns: {
		    "id": "INTEGER PRIMARY KEY AUTOINCREMENT",
		    "medical_id": "INTEGER",
		    "server_id": "INTEGER",
		    "blob": "BLOB", 
		    "img_path": "TEXT", 
		    "category": "TEXT",
		    "created": "TEXT",
		    "updated": "TEXT"
		},
		adapter: {
			type: "sql",
			collection_name: "medicalAttachment"
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
			getRecordById : function(id){
				var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE id='"+ id+ "'" ;
                db = Ti.Database.open(collection.config.adapter.db_name);
                if(Ti.Platform.osname != "android"){
                	db.file.setRemoteBackup(false);
                }
               
                var res = db.execute(sql);
                var arr = []; 
               
                if (res.isValidRow()){
					arr = {
					    id: res.fieldByName('id'),
						server_id: res.fieldByName('server_id'),
						medical_id: res.fieldByName('medical_id'),
						blob: res.fieldByName('blob'), 
					  	img_path: res.fieldByName('img_path'), 
						category: res.fieldByName('category'), 
						created: res.fieldByName('created'),
						updated: res.fieldByName('updated') 
					  };
				}  
                db.close();
                collection.trigger('sync');
                return arr;
			},
			// extended functions and properties go here
			getRecordByMecId: function(medical_id){
				var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name +" WHERE  medical_id='"+medical_id+"' ";
                
                db = Ti.Database.open(collection.config.adapter.db_name);
                if(Ti.Platform.osname != "android"){
                	db.file.setRemoteBackup(false);
                }
                var res = db.execute(sql);
                var listArr = []; 
                var count = 0;
                while (res.isValidRow()){ 
					listArr[count] = { 
							id: res.fieldByName('id'),
							server_id: res.fieldByName('server_id'),
						    medical_id: res.fieldByName('medical_id'),
						    blob: res.fieldByName('blob'), 
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
                return listArr;
			},
			// extended functions and properties go here
			getUnuploadAttachment: function(medical_id){
				var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name +" WHERE  medical_id='"+medical_id+"' AND img_path IS NULL  ";
                
                db = Ti.Database.open(collection.config.adapter.db_name);
                if(Ti.Platform.osname != "android"){
                	db.file.setRemoteBackup(false);
                }
                var res = db.execute(sql);
                var listArr = []; 
                var count = 0;
                while (res.isValidRow()){ 
					listArr[count] = { 
							id: res.fieldByName('id'),
							server_id: res.fieldByName('server_id'),
						    medical_id: res.fieldByName('medical_id'),
						    blob: res.fieldByName('blob'), 
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
                return listArr;
			}, 
			removeRecordById : function(id){
				var collection = this;
                var sql = "DELETE FROM " + collection.config.adapter.collection_name + " WHERE id='"+ id+ "'" ;
                db = Ti.Database.open(collection.config.adapter.db_name);
                if(Ti.Platform.osname != "android"){
                	db.file.setRemoteBackup(false);
                }
                db.execute(sql);
                db.close();
                collection.trigger('sync');
			},
			removeRecordByRec : function(rec){
				var collection = this;
                var sql = "DELETE FROM " + collection.config.adapter.collection_name + " WHERE medical_id='"+ rec+ "'" ;
                db = Ti.Database.open(collection.config.adapter.db_name);
                if(Ti.Platform.osname != "android"){
                	db.file.setRemoteBackup(false);
                }
                db.execute(sql);
                db.close();
                collection.trigger('sync');
			}, 
			addAttachment : function(entry) {
				var collection = this;
                db = Ti.Database.open(collection.config.adapter.db_name);
	            if(Ti.Platform.osname != "android"){
                	db.file.setRemoteBackup(false);
                } 
				 
		   		sql_query = "INSERT INTO "+ collection.config.adapter.collection_name + "( medical_id,blob, created, updated, category ) VALUES ( '"+entry.medical_id+"', '"+entry.blob+"', '"+currentDateTime()+"', '"+currentDateTime()+"', '"+entry.category+"')";
				 
				db.execute(sql_query);
				  
	            db.close();
	            collection.trigger('sync');
           },
           addFromServer : function(medical_id, arr){
				var collection = this;
                db = Ti.Database.open(collection.config.adapter.db_name);
	            if(Ti.Platform.osname != "android"){
                	db.file.setRemoteBackup(false);
                }  
		   		
	
				db.execute("BEGIN");
                arr.forEach(function(entry) { 
	            	sql_query = "INSERT INTO "+ collection.config.adapter.collection_name + "( medical_id, server_id, img_path, created, updated, category ) VALUES ( '"+ medical_id+"', '"+entry.img_id+"', '"+entry.img_path+"', '"+entry.created+"', '"+entry.updated+"', '"+entry.img_caption+"')";
					db.execute(sql_query );
					 
				});
				db.execute("COMMIT");
	            db.close();
	            collection.trigger('sync');
			} ,
           updateFromServer : function(arr){
				var collection = this;
                db = Ti.Database.open(collection.config.adapter.db_name);
	            if(Ti.Platform.osname != "android"){
                	db.file.setRemoteBackup(false);
                }  
		   		
	
				db.execute("BEGIN");
                arr.forEach(function(entry) { 
	                var sql_query =  "UPDATE "+collection.config.adapter.collection_name+" SET img_path=?  WHERE id=?";
					db.execute(sql_query,   entry.img_path, entry.id);
				});
				db.execute("COMMIT");
	            db.close();
	            collection.trigger('sync');
			} 
		});

		return Collection;
	}
};  