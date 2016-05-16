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
7		getHelplineMessage
8		getDcotroPanel
************************************/

exports.definition = {
	config: {
		columns: {
		    "id": "INTEGER",
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
			getCheckerById : function(id){
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
					    typeName: res.fieldByName('typeName'),
					    updated: res.fieldByName('updated')
					};
				} 
			 
				res.close();
                db.close();
                collection.trigger('sync');
                return arr;
			},
			updateModule : function (id,typeName, updateDate){
				var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE id="+ id ;
                var sql_query =  "";
                db = Ti.Database.open(collection.config.adapter.db_name);
                if(Ti.Platform.osname != "android"){
                	db.file.setRemoteBackup(false);
                }
                var res = db.execute(sql);
             
                if (res.isValidRow()){
             		sql_query = "UPDATE " + collection.config.adapter.collection_name + " SET updated='"+updateDate+"' WHERE id='" +id+"'";
                }else{
                	sql_query = "INSERT INTO " + collection.config.adapter.collection_name + " (id, typeName, updated) VALUES ('"+id+"','"+typeName+"','"+updateDate+"')" ;
				}
       
	            db.execute(sql_query);
	            db.close();
	            collection.trigger('sync');
			}
		});

		return Collection;
	}
};