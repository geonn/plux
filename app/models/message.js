exports.definition = {
	config: {
		columns: {
		    "id": "INTEGER PRIMARY KEY AUTOINCREMENT",
		    "u_id": "INTEGER",
		    "dr_id": "INTEGER",
		    "room_id": "INTEGER",
		    "message": "TEXT",
		    "read": "INTEGER",
		    "type":"TEXT",
		    "sender_is_doctor": "INTEGER",
		    "created" : "DATE",
		},
		adapter: {
			type: "sql",
			collection_name: "message",
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
			getData: function(room_id){
				var collection = this;
				var room_id_sql = (typeof room_id != "undefined")?"AND message.room_id = ?":"";
				var u_id = Ti.App.Properties.getString('u_id');
                var sql = "SELECT message.*, doctors.name as doctor_name, doctors.specialty as doctor_specialty FROM message LEFT OUTER JOIN doctors ON doctors.id = message.dr_id WHERE message.u_id = ? "+room_id_sql+" order by message.id" ;
                
                db = Ti.Database.open(collection.config.adapter.db_name);
                if(Ti.Platform.osname != "android"){
                	db.file.setRemoteBackup(false);
                }
                
                if(typeof room_id != "undefined"){
                	 var res = db.execute(sql, u_id, room_id);
                }else{
                	 var res = db.execute(sql, u_id);
                }
               
               	var arr = [];
                var count = 0;
                 /**
                 * debug use
                 */
                var row_count = res.fieldCount;
                for(var a = 0; a < row_count; a++){
            		 console.log(a+":"+res.fieldName(a)+":"+res.field(a));
            	 }
            	
                while (res.isValidRow()){
					arr[count] = {
					    id: res.fieldByName('id'),
					    doctor_name: res.fieldByName('doctor_name'),
					    doctor_specialty: res.fieldByName('doctor_specialty'),
					    u_id: res.fieldByName('u_id'),
					    dr_id: res.fieldByName('dr_id'),
					    room_id: res.fieldByName('room_id'),
					    message: res.fieldByName('message'),
					    type: res.fieldByName('type'),
					    created: res.fieldByName('created')
					};
					res.next();
					count++;
				} 
			 
				res.close();
                db.close();
                collection.trigger('sync');
                return arr;
			},
			getDataGroupDrid: function(){
				var collection = this;
				var u_id = Ti.App.Properties.getString('u_id');
                var sql = "SELECT message.*, doctors.name as doctor_name, doctors.specialty as doctor_specialty FROM message LEFT OUTER JOIN doctors ON doctors.id = message.dr_id WHERE message.u_id = ? group by dr_id order by message.id" ;
                
                db = Ti.Database.open(collection.config.adapter.db_name);
                if(Ti.Platform.osname != "android"){
                	db.file.setRemoteBackup(false);
                }
                
                if(typeof room_id != "undefined"){
                	 var res = db.execute(sql, u_id, room_id);
                }else{
                	 var res = db.execute(sql, u_id);
                }
               
               	var arr = [];
                var count = 0;
                 /**
                 * debug use
                 */
                var row_count = res.fieldCount;
                for(var a = 0; a < row_count; a++){
            		 console.log(a+":"+res.fieldName(a)+":"+res.field(a));
            	 }
            	
                while (res.isValidRow()){
					arr[count] = {
					    id: res.fieldByName('id'),
					    doctor_name: res.fieldByName('doctor_name'),
					    doctor_specialty: res.fieldByName('doctor_specialty'),
					    u_id: res.fieldByName('u_id'),
					    dr_id: res.fieldByName('dr_id'),
					    room_id: res.fieldByName('room_id'),
					    message: res.fieldByName('message'),
					    type: res.fieldByName('type'),
					    created: res.fieldByName('created')
					};
					res.next();
					count++;
				} 
			 
				res.close();
                db.close();
                collection.trigger('sync');
                return arr;
			},
			/*
			 Deprecated function
			 * */
			getData_deprecated : function(f_id){
				var u_id = Ti.App.Properties.getString('u_id') || 0;
				var collection = this;
                var sql = "SELECT message.*, friends.thumb_path FROM message LEFT OUTER JOIN friends on friends.f_id = message.u_id WHERE (message.u_id=? AND message.dr_id=?) OR (message.u_id=? AND message.dr_id=?) order by message.created DESC" ;
                
                db = Ti.Database.open(collection.config.adapter.db_name);
                if(Ti.Platform.osname != "android"){
                	db.file.setRemoteBackup(false);
                }
                
                var res = db.execute(sql, u_id, f_id, f_id, u_id);
               	var arr = [];
                var count = 0;
                /**
                 * debug use
                 
                var row_count = res.fieldCount;
                for(var a = 0; a < row_count; a++){
            		 console.log(a+":"+res.fieldName(a)+":"+res.field(a));
            	 }*/
            	
                while (res.isValidRow()){
					arr[count] = {
					    id: res.fieldByName('id'),
					    u_id: res.fieldByName('u_id'),
					    dr_id: res.fieldByName('dr_id'),
					    message: res.fieldByName('message'),
					    thumb_path: res.fieldByName('thumb_path'),
					    type: res.fieldByName('type'),
					    sender_is_doctor: res.fieldByName('sender_is_doctor'),
					    created: res.fieldByName('created')
					};
					res.next();
					count++;
				} 
			 
				res.close();
                db.close();
                collection.trigger('sync');
                return arr;
			},
			getDataUnread : function(f_id){
				var u_id = Ti.App.Properties.getString('u_id') || 0;
				var collection = this;
                var sql = "select count(*) as total, u_id from message where dr_id = ? AND read is null group by u_id" ;
                
                db = Ti.Database.open(collection.config.adapter.db_name);
                if(Ti.Platform.osname != "android"){
                	db.file.setRemoteBackup(false);
                }
                
                var res = db.execute(sql, u_id);
               	var arr = [];
                var count = 0;
                while (res.isValidRow()){
					arr[count] = {
					    id: res.fieldByName('total'),
					    u_id: res.fieldByName('u_id')
					};
					res.next();
					count++;
				} 
			 
				res.close();
                db.close();
                collection.trigger('sync');
                return arr;
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
                var sql_query =  "INSERT OR IGNORE INTO "+collection.config.adapter.collection_name+" (u_id, dr_id, message, type,room_id, read,  created, sender_is_doctor) VALUES (?,?,?,?,?,?,?,?)";
				db.execute(sql_query, entry.u_id, entry.dr_id, entry.message, entry.type, entry.room_id, 1, entry.created, entry.sender_is_doctor);
				
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