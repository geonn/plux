exports.definition = {
	config: {
		columns: {
		    "id": "INTEGER PRIMARY KEY AUTOINCREMENT",
		    "medical_id": "INTEGER",
		    "blob": "BLOB", 
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
						    medical_id: res.fieldByName('medical_id'),
						    blob: res.fieldByName('blob'), 
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
				 
		   		sql_query = "INSERT INTO "+ collection.config.adapter.collection_name + "( medical_id,blob, created, updated ) VALUES ( '"+entry.medical_id+"', '"+entry.blob+"', '"+currentDateTime()+"', '"+currentDateTime()+"')";
				 
				db.execute(sql_query);
				  
	            db.close();
	            collection.trigger('sync');
            }
		});

		return Collection;
	}
};  