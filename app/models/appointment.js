exports.definition = {
	config: {
		columns: {
		    "id": "INTEGER PRIMARY KEY",
		    "u_id": "TEXT" , 
		    "duration": "INTEGER",
		    "clinic_id": "INTEGER" ,
		    "start_date" : "TEXT",
		    "end_date" : "TEXT",
		    "remark" : "TEXT",
		    "status": "INTEGER" ,
		    "created": "TEXT" ,
		    "updated": "TEXT",
		    "date" : "TEXT",
		    "suggested_date" : "TEXT",
		},
		adapter: {
			type: "sql",
			collection_name: "appointment",
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
			getAppointmentList: function(ex){
				var query_clinicid = (typeof ex.clinicId != "undefined")?" AND clinic_id= ? ":"";
				var query_start_date = (typeof ex.start_date != "undefined")?" AND start_date >= ? AND start_date < ? ":"";
				var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name +" WHERE u_id='"+ex.u_id+"' "+query_clinicid+query_start_date+" AND status != 5 ORDER BY created DESC";
              	 
                db = Ti.Database.open(collection.config.adapter.db_name);
                if(Ti.Platform.osname != "android"){
                	db.file.setRemoteBackup(false);
                }
                if(typeof ex.clinicId != "undefined"){
                	var res = db.execute(sql, ex.clinicId, ex.start_date, ex.end_date);
                }else{
                	var res = db.execute(sql);
                }
                console.log(sql);
                console.log(ex);
                var listArr = []; 
                var count = 0;
                while (res.isValidRow()){ 
					listArr[count] = { 
						id: res.fieldByName('id'),
						u_id: res.fieldByName('u_id'), 
						clinic_id : res.fieldByName('clinic_id'),  
						status: res.fieldByName('status'), 
						start_date: res.fieldByName('start_date'),
						duration: res.fieldByName('duration'),
						remark: res.fieldByName('remark'),
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
			saveArray : function(arr){
				var collection = this;
				
                db = Ti.Database.open(collection.config.adapter.db_name);
                if(Ti.Platform.osname != "android"){
                	db.file.setRemoteBackup(false);
                }
                db.execute("BEGIN"); 
               	arr.forEach(function(entry) {
		            var sql_query =  "INSERT OR IGNORE INTO "+collection.config.adapter.collection_name+" (id, u_id,clinic_id, remark,  status,start_date,end_date, duration,suggested_date, created, updated) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
					db.execute(sql_query, entry.id, entry.u_id,entry.clinic_id, entry.remark,entry.status ,entry.start_date, entry.end_date,entry.duration,entry.suggested_date, entry.created,entry.updated);
				 	var sql_query =  "UPDATE "+collection.config.adapter.collection_name+" SET clinic_id=?,remark=?,status=?,start_date=?,end_date=?, duration=?, suggested_date=?,updated=? WHERE id=?";
				 	console.log(sql_query);
					db.execute(sql_query,entry.clinic_id,entry.remark, entry.status,entry.start_date,entry.end_date,entry.duration,entry.suggested_date,entry.updated, entry.id);
				});
				db.execute("COMMIT");
	            db.close();
	            collection.trigger('sync');
			},
			updateAppointmentStatus : function(id, statusCode){
				var collection = this;
				
                db = Ti.Database.open(collection.config.adapter.db_name);
                if(Ti.Platform.osname != "android"){
                	db.file.setRemoteBackup(false);
                }
             	
             	var sql_query =  "UPDATE "+collection.config.adapter.collection_name+" SET status=? WHERE id=?";
				db.execute(sql_query, statusCode,  id);
			 
                db.close();
	            collection.trigger('sync');
			},
			getAppointmentById: function(id){ 
                var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name +" WHERE id ='"+id+"'";
                
                db = Ti.Database.open(collection.config.adapter.db_name);
                if(Ti.Platform.osname != "android"){
                	db.file.setRemoteBackup(false);
                }
                var res = db.execute(sql);
                var arr = []; 
                if (res.isValidRow()){
					arr = {
					   id: res.fieldByName('id'),
						u_id: res.fieldByName('u_id'), 
						duration: res.fieldByName('duration'), 
						start_date: res.fieldByName('start_date'), 
						end_date: res.fieldByName('end_date'), 
						clinic_id : res.fieldByName('clinic_id'),  
						status: res.fieldByName('status'), 
						date: res.fieldByName('date'),
						remark: res.fieldByName('remark'),
						created: res.fieldByName('created'),
						updated: res.fieldByName('updated') 
					};
					
				} 
				res.close();
                db.close();
                collection.trigger('sync');
                return arr;
			}, 
			  
		});

		return Collection;
	}
};  