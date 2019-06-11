/**********************************
CHECKER CONFIG 
ID       type Name
------------------------------------
1		getClinicList	 
2 		notification 
3		getMessageByRoom
4 		getDoctorByPanel
5		getSpecialtylist
6		getDoctorPanelBySpecialty
7		getHelplineMessageV3 || u_id
8		getDcotroPanel
9		getAppointmentByDoctorPanel
10		categoryUrl
11		leafletUrl
12		doctorListUrl
13		getClinicLocator2
14		getHealthDataByUser	|| u_id
15		getPersonalInfoRecords	|| u_id
16		getRoomList	|| u_id
17		grab_newsfeed
18		getCategoryList
19		getMessage || u_id
************************************/

exports.definition = {
	config: {
		columns: {
		    "id": "INTEGER",
		    "u_id": "INTEGER",
		    "extra": "TEXT",
		    "typeName": "TEXT",
		    "updated": "TEXT"
		},
		adapter: {
			type: "sql",
			collection_name: "updateChecker"
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
					resultSet.close();
				}
				db.close();
			},
			getCheckerById : function(id, u_id, extra){
				var collection = this;
				var addon = "";
				if(typeof u_id != "undefined"){
					addon = " AND u_id = "+u_id;
				}
				if(typeof extra != "undefined"){
					addon += " AND extra = "+extra;
				}
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE id='"+ id+ "' "+addon ;

                db = Ti.Database.open(collection.config.adapter.db_name);
                if(Ti.Platform.osname != "android"){
                	db.file.setRemoteBackup(false);
                }
                var res = db.execute(sql);

                var arr = []; 
               
                if (res.isValidRow()){
					arr = {
					    typeName: res.fieldByName('typeName'),
					    updated: res.fieldByName('updated')
					};
				} 
			 //console.log(arr);
				res.close();
                db.close();
                collection.trigger('sync');
                return arr;
			},
			updateModule : function (id,typeName, updateDate, u_id, extra){
				var collection = this;
				var addon = "";
				if(typeof u_id != "undefined"){
					addon = " AND u_id = "+u_id;
				}else{
					u_id = 0;
				}
				
				if(typeof extra != "undefined"){
					addon += " AND extra = "+extra;
				}
				
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE id="+ id+addon ;
                var sql_query =  "";
                db = Ti.Database.open(collection.config.adapter.db_name);
                if(Ti.Platform.osname != "android"){
                	db.file.setRemoteBackup(false);
                }
                var res = db.execute(sql);
             
                if (res.isValidRow()){
             		sql_query = "UPDATE " + collection.config.adapter.collection_name + " SET updated='"+updateDate+"' WHERE id='" +id+"'"+addon;
                }else{
                	sql_query = "INSERT INTO " + collection.config.adapter.collection_name + " (id, typeName, updated, u_id) VALUES ('"+id+"','"+typeName+"','"+updateDate+"', "+u_id+")" ;
				}
       			res.close();
	            db.execute(sql_query);
	            res.close();
	            db.close();
	            
	            collection.trigger('sync');
			}
		});

		return Collection;
	}
};