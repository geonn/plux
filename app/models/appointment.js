exports.definition = {
	config: {
		columns: {
		    "id": "INTEGER PRIMARY KEY",
		    "u_id": "TEXT" , 
		    "duration": "INTEGER",
		    "clinic_name": "TEXT",		//
		    "doctor_name": "TEXT",
		    "specialty_name" : "TEXT",
		    "doctor_panel_id": "INTEGER",
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
				var query_doctor_panel_id = (typeof ex.doctor_panel_id != "undefined")?" doctor_panel_id= ? ":"";
				var query_start_date = (typeof ex.start_date != "undefined")?" AND start_date >= ? AND start_date < ? ":"";
				var query_uid = (typeof ex.u_id != "undefined")?"  u_id=?":"";
				var collection = this;
                var sql = "SELECT * FROM appointment WHERE "+query_uid+query_doctor_panel_id+query_start_date+" AND status != 5 ORDER BY created DESC";
              	 
                db = Ti.Database.open(collection.config.adapter.db_name);
                if(Ti.Platform.osname != "android"){
                	db.file.setRemoteBackup(false);
                }
                if(typeof ex.doctor_panel_id != "undefined"){
                	var res = db.execute(sql, ex.doctor_panel_id.toString(), ex.start_date, ex.end_date);
                }else{
                	var res = db.execute(sql, ex.u_id);
                }
                 
                var listArr = [];
                var count = 0;
                while (res.isValidRow()){ 
                	var row_count = res.fieldCount;
                	 /*
                	 for(var a = 0; a < row_count; a++){
                		 console.log(a+":"+res.fieldName(a)+":"+res.field(a));
                	 }
                	 */
					listArr[count] = { 
						id: res.fieldByName('id'),
						u_id: res.fieldByName('u_id'), 
						clinic_name : res.fieldByName('clinic_name'),
						doctor_name : res.fieldByName('doctor_name'),
						doctor_panel_id : res.fieldByName('doctor_panel_id'),
						status: res.fieldByName('status'), 
						start_date: res.fieldByName('start_date'),
						duration: res.fieldByName('duration'),
						remark: res.fieldByName('remark'),
						created: res.fieldByName('created'),
						updated: res.fieldByName('updated'),
						specialty_name: res.fieldByName('specialty_name'),
					};
					res.next();
					count++;
				}
			 
				res.close();
                db.close();
                collection.trigger('sync');
                return listArr;
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
			updateSuggestedAppointmentStatus : function(doctor_panel_id, statusCode){
				var collection = this;
				
                db = Ti.Database.open(collection.config.adapter.db_name);
                if(Ti.Platform.osname != "android"){
                	db.file.setRemoteBackup(false);
                }
             	
             	var sql_query =  "UPDATE "+collection.config.adapter.collection_name+" SET status=5 WHERE doctor_panel_id=? AND status = 4";
				db.execute(sql_query, doctor_panel_id);
			 
                db.close();
	            collection.trigger('sync');
			},
			getAppointmentById: function(id){ 
                var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name +" WHERE id =?";
                
                db = Ti.Database.open(collection.config.adapter.db_name);
                if(Ti.Platform.osname != "android"){
                	db.file.setRemoteBackup(false);
                }
                var res = db.execute(sql, id);
                var arr = []; 
                if (res.isValidRow()){
					arr = {
					   id: res.fieldByName('id'),
						u_id: res.fieldByName('u_id'), 
						duration: res.fieldByName('duration'), 
						start_date: res.fieldByName('start_date'), 
						end_date: res.fieldByName('end_date'), 
						clinic_name : res.fieldByName('clinic_name'),  
						doctor_name : res.fieldByName('doctor_name'),  
						doctor_panel_id : res.fieldByName('doctor_panel_id'),  
						status: res.fieldByName('status'), 
						date: res.fieldByName('date'),
						remark: res.fieldByName('remark'),
						created: res.fieldByName('created'),
						updated: res.fieldByName('updated'),
						specialty_name: res.fieldByName('specialty_name'),
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