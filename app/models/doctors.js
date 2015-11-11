exports.definition = {
	config: {
		columns: {
		    "id": "INTEGER",
		    "name": "TEXT" ,
		    "dr_code": "TEXT" ,
		    "status": "INTEGER" ,
		    "email": "INTEGER" ,
		    "mobile": "TEXT" ,
		    "specialty": "TEXT" ,
		    "qualification" : "TEXT",
		    "introduction" : "TEXT",
		    "created": "TEXT" ,
		    "updated": "TEXT",
		    "clinic_id": "INTEGER"
		},
		adapter: {
			type: "sql",
			collection_name: "doctors",
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
			getDoctorListGroupBySpecialty: function(params){
				var addon = "";
				console.log(params);
				for (var i=0; i < params.length; i++) {
				  var key = params[i].key || "";
				  var value = params[i].value || "";
				  console.log(params[i]);
				  addon += " AND "+key+" = '"+value+"'";
				};
				var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name +" WHERE `status` =1 "+addon+" group by specialty ORDER BY name ASC";
                console.log("getDoctorListGroupBySpecialty "+sql);
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
						name: res.fieldByName('name'), 
						dr_code : res.fieldByName('dr_code'), 
						email: res.fieldByName('email'),
						status: res.fieldByName('status'),
						mobile: res.fieldByName('mobile'),
						specialty: res.fieldByName('specialty'),
						qualification: res.fieldByName('qualification'),
						introduction: res.fieldByName('introduction'),
						created: res.fieldByName('created'),
						updated: res.fieldByName('updated'),
						clinic_id: res.fieldByName('clinic_id')
					};	
					 
					res.next();
					count++;
				} 
			 
				res.close();
                db.close();
                collection.trigger('sync');
                return listArr;
			},
			getDoctorList: function(params){
				var addon = "";
				for (var i=0; i < params.length; i++) {
				  var key = params[i].key || "";
				  var value = params[i].value || "";
				  
				  addon = " AND "+key+" = '"+value+"'";
				};
				var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name +" WHERE `status` =1 "+addon+" ORDER BY name ASC";
                
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
						name: res.fieldByName('name'), 
						dr_code : res.fieldByName('dr_code'), 
						email: res.fieldByName('email'),
						status: res.fieldByName('status'),
						mobile: res.fieldByName('mobile'),
						specialty: res.fieldByName('specialty'),
						qualification: res.fieldByName('qualification'),
						introduction: res.fieldByName('introduction'),
						created: res.fieldByName('created'),
						updated: res.fieldByName('updated'),
						clinic_id: res.fieldByName('clinic_id')
					};	
					 
					res.next();
					count++;
				} 
			 
				res.close();
                db.close();
                collection.trigger('sync');
                return listArr;
			},
			getDoctorById: function(id){ 
                var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name +" WHERE id ='"+id+"' ";
                
                db = Ti.Database.open(collection.config.adapter.db_name);
                if(Ti.Platform.osname != "android"){
                	db.file.setRemoteBackup(false);
                }
                var res = db.execute(sql);
                var arr = []; 
               
                if (res.isValidRow()){
					arr = {
					   id: res.fieldByName('id'),
						name: res.fieldByName('name'), 
						dr_code : res.fieldByName('dr_code'), 
						email: res.fieldByName('email'),
						status: res.fieldByName('status'),
						mobile: res.fieldByName('mobile'),
						specialty: res.fieldByName('specialty'),
						qualification: res.fieldByName('qualification'),
						introduction: res.fieldByName('introduction'),
						created: res.fieldByName('created'),
						updated: res.fieldByName('updated'),
						clinic_id: res.fieldByName('clinic_id')
					};
					
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
	                var sql_query =  "INSERT OR IGNORE INTO "+collection.config.adapter.collection_name+" (id, name,dr_code, email, mobile,status,specialty,qualification,introduction, created, updated, clinic_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
					db.execute(sql_query, entry.id, entry.name,entry.dr_code, entry.email,entry.mobile,entry.status ,entry.specialty,entry.qualification,entry.introduction,entry.created,entry.updated, entry.clinic_id);
					 
					var sql_query =  "UPDATE "+collection.config.adapter.collection_name+" SET name=?,dr_code=?, email=?,mobile=?,status=?,specialty=?,qualification=?,introduction=?,updated=?, clinic_id=? WHERE id=?";
					db.execute(sql_query, entry.name,entry.dr_code,entry.email,entry.mobile,entry.status,entry.specialty,entry.qualification,entry.introduction, entry.updated, entry.clinic_id, entry.id);
				});
				db.execute("COMMIT");
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
			resetDoctors : function(id){
				var collection = this;
                var sql = "DELETE FROM " + collection.config.adapter.collection_name ;
                db = Ti.Database.open(collection.config.adapter.db_name);
                if(Ti.Platform.osname != "android"){
                	db.file.setRemoteBackup(false);
                }
                db.execute(sql);
                db.close();
                collection.trigger('sync');
			}
		});

		return Collection;
	}
};  