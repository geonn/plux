exports.definition = {
	config: {
		columns: {
		    "id": "INTEGER PRIMARY KEY",
		   	"doctor_id": "INTEGER",
		   	"clinic_id":"INTEGER",
		   	"specialty_id":"INTEGER",
		   	"status":"INTEGER",
		   	"created":"TEXT",
		   	"updated":"TEXT"
		},
		adapter: {
			type: "sql",
			collection_name: "doctor_panel",
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
			getData : function(specialty_id){
				var collection = this;
                var sql = "SELECT doctor_panel.*, doctors.name as doctor_name, doctors.img_path as doctor_img_path, specialty.title as specialty, panelList.clinicName FROM "+collection.config.adapter.collection_name+" LEFT OUTER JOIN doctors ON doctors.id = doctor_panel.doctor_id LEFT OUTER JOIN panelList on panelList.id = doctor_panel.clinic_id LEFT OUTER JOIN specialty on doctor_panel.specialty_id = specialty.id where doctor_panel.specialty_id = ? ORDER BY doctor_panel.clinic_id";
                // 
                sql = "select panel_table.*, specialty.title as specialty from (select doctor_table.*, panelList.clinicName from (select doctor_panel.*, doctors.name as doctor_name, doctors.img_path as doctor_img_path from doctor_panel LEFT OUTER JOIN doctors ON doctors.id = doctor_panel.doctor_id where doctor_panel.specialty_id = ?) as doctor_table LEFT OUTER JOIN panelList on panelList.id = doctor_table.clinic_id) as panel_table LEFT OUTER JOIN specialty on panel_table.specialty_id = specialty.id";
                //sql = "select a.*, panelList.clinicName from (select doctor_panel.*, doctors.name as doctor_name, doctors.img_path as doctor_img_path from doctor_panel LEFT OUTER JOIN doctors ON doctors.id = doctor_panel.doctor_id where doctor_panel.specialty_id = ?) as a LEFT OUTER JOIN panelList on panelList.id = a.clinic_id";
 
                sql = "select doctor_panel.*, doctors.name as doctor_name, doctors.img_path as doctor_img_path from doctor_panel LEFT OUTER JOIN doctors ON doctors.id = doctor_panel.doctor_id where doctors.status =1 AND doctor_panel.status != 2 AND doctor_panel.specialty_id = ?";
 
                db = Ti.Database.open(collection.config.adapter.db_name);
                if(Ti.Platform.osname != "android"){
                	db.file.setRemoteBackup(false);
                }
                var res = db.execute(sql, specialty_id);
                console.log(specialty_id+" "+sql);
                var arr = [];
                var count = 0;
                while (res.isValidRow()){
					arr[count] = {
					    id: res.fieldByName('id'),
					    clinic_id: res.fieldByName('clinic_id'),
					    doctor_id: res.fieldByName('doctor_id'),
					    doctor_img_path: res.fieldByName('doctor_img_path'),
					    doctor_name: res.fieldByName('doctor_name'),
					    status: res.fieldByName('status'),
					    specialty_id: res.fieldByName('specialty_id'),
					    status: res.fieldByName("status"),
					    clinic_id: res.fieldByName('clinic_id')
					};
					res.next();
					count++;
				}
				console.log("geo debug:");
				console.log(arr);
				res.close();
                db.close();
                collection.trigger('sync');
                return arr;
			},
			getDataWithClinic : function(doctor_id){
				var collection = this;
                var sql = "SELECT doctor_panel.*, panelList.clinicName FROM "+collection.config.adapter.collection_name+" left outer join panelList on panelList.id = doctor_panel.clinic_id where doctor_panel.doctor_id = ?";
                
                db = Ti.Database.open(collection.config.adapter.db_name);
                if(Ti.Platform.osname != "android"){
                	db.file.setRemoteBackup(false);
                }
                var res = db.execute(sql, doctor_id);
                var arr = []; 
                var count = 0;
                while (res.isValidRow()){
					arr[count] = {
					    id: res.fieldByName('id'),
					    doctor_id: res.fieldByName('doctor_id'),
					    clinic_id: res.fieldByName('clinic_id'),
					    clinicName: res.fieldByName('clinicName')
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
	            db.close();
	            collection.trigger('sync');
			},
			saveRecord: function(entry){
				var collection = this;
				
                db = Ti.Database.open(collection.config.adapter.db_name);
                if(Ti.Platform.osname != "android"){
                	db.file.setRemoteBackup(false);
                }
                
				var sql_query =  "INSERT OR IGNORE INTO "+collection.config.adapter.collection_name+" (id, doctor_id, clinic_id, created, updated, specialty_id) VALUES (?,?,?,?,?,?)";
				db.execute(sql_query, entry.id, entry.doctor_id, entry.clinic_id, entry.created, entry.updated, entry.specialty_id);
				var sql_query =  "UPDATE "+collection.config.adapter.collection_name+" SET doctor_id=?, clinic_id=?, created=?, updated=?, specialty_id=? WHERE id=?";
				db.execute(sql_query, entry.doctor_id, entry.clinic_id, entry.created, entry.updated, entry.specialty_id, entry.id);
	            db.close();
	            collection.trigger('sync');
			},
			resetData : function(){
				var collection = this;
                var sql = "DELETE FROM " + collection.config.adapter.collection_name;
                db = Ti.Database.open(collection.config.adapter.db_name);
                db.execute(sql);
                db.close();
                collection.trigger('sync');
			}
		});

		return Collection;
	}
};