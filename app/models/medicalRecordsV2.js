exports.definition = {
	config: {
		columns: {
		    "id": "INTEGER PRIMARY KEY",
		    "title": "TEXT",
		    "message": "TEXT", 
		    "u_id": "TEXT",
		    "treatment": "TEXT", 
		    "clinic": "TEXT",
		    "lab_report_id": "TEXT",
		    "lab_report_link" : "TEXT",
		    "created": "TEXT",
		    "updated": "TEXT",
		    "status": "INTEGER"
		},
		adapter: {
			type: "sql",
			collection_name: "medicalRecordsV2"
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
			getData: function(){
				var collection = this;
				var u_id = Ti.App.Properties.getString('u_id'); 
                var sql = "SELECT * from "+collection.config.adapter.collection_name+" where u_id = ? AND status != 2 order by created desc"; 
                
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
					    title: res.fieldByName('title'),
					    message: res.fieldByName('message'),
					    u_id: res.fieldByName('u_id'),
					    treatment: res.fieldByName('treatment'),
					    clinic: res.fieldByName('clinic'),
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
			getDataById: function(id){
				var collection = this;
				var u_id = Ti.App.Properties.getString('u_id'); 
                var sql = "SELECT * from "+collection.config.adapter.collection_name+" where id = ?"; 
                
                db = Ti.Database.open(collection.config.adapter.db_name);
                if(Ti.Platform.osname != "android"){
                	db.file.setRemoteBackup(false);
                }
            	
            	var res = db.execute(sql, id);
               	var arr;
                var count = 0;
                 /**
                 * debug use
                 
                var row_count = res.fieldCount;
               /** for(var a = 0; a < row_count; a++){
            		 console.log(a+":"+res.fieldName(a)+":"+res.field(a));
            	 }
            	*/
                while (res.isValidRow()){
					arr = {
					    id: res.fieldByName('id'),
					    title: res.fieldByName('title'),
					    message: res.fieldByName('message'),
					    u_id: res.fieldByName('u_id'),
					    treatment: res.fieldByName('treatment'),
					    clinic: res.fieldByName('clinic'),
					    lab_report_link: res.fieldByName('lab_report_link'),
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
			removeRecordById : function(id){
				var collection = this;
                var sql = "DELETE FROM " + collection.config.adapter.collection_name + " WHERE id=?" ;
                db = Ti.Database.open(collection.config.adapter.db_name);
                if(Ti.Platform.osname != "android"){
                	db.file.setRemoteBackup(false);
                }
                db.execute(sql, id);
                db.close();
                collection.trigger('sync');
			},
			saveArray : function(arr){
				var collection = this;
				
                db = Ti.Database.open(collection.config.adapter.db_name);
                if(Ti.Platform.osname != "android"){
                	db.file.setRemoteBackup(false);
                }
                db.execute("BEGIN");
                arr.forEach(function(entry) {
                	var keys = [];
                	var questionmark = [];
                	var eval_values = [];
                	var update_questionmark = [];
                	var update_value = [];
                	for(var k in entry){
	                	if (entry.hasOwnProperty(k)){
	                		keys = _.keys(entry);
	                		questionmark.push("?");
	                		eval_values.push("entry."+k);
	                		update_questionmark.push(k+"=?");
	                	}
                	}
                	var without_pk_list = _.rest(update_questionmark);
	                var without_pk_value = _.rest(eval_values);
	                
	                var sql_query =  "INSERT OR IGNORE INTO "+collection.config.adapter.collection_name+" ("+keys.join()+") VALUES ("+questionmark.join()+")";
	                eval("db.execute(sql_query, "+eval_values.join()+")");
	                
	                var sql_query =  "UPDATE "+collection.config.adapter.collection_name+" SET "+without_pk_list.join()+" WHERE "+_.first(update_questionmark);
	                eval("db.execute(sql_query, "+without_pk_value.join()+","+_.first(eval_values)+")");
				});
				db.execute("COMMIT");
				//console.log(db.getRowsAffected()+" affected row");
	            db.close();
	            collection.trigger('sync');
			},
		});

		return Collection;
	}
};  