exports.definition = {
	config: {
		columns: {
		    "id": "INTEGER",
		    "title": "TEXT" ,
		    "url": "TEXT" ,
		    "status": "INTEGER" ,
		    "position": "INTEGER" ,
		    "attachment": "TEXT" ,
		    "cover": "TEXT" ,
		    "isDownloaded" : "TEXT",
		    "created": "TEXT" ,
		    "updated": "TEXT" 
		},
		adapter: {
			type: "sql",
			collection_name: "leaflet"
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
			getLeaftletList: function(){
				var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name +" WHERE `status` =1 ORDER BY position ASC";
                
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
						title: res.fieldByName('title'), 
						url: res.fieldByName('url'),
						status: res.fieldByName('status'),
						position: res.fieldByName('position'),
						attachment: res.fieldByName('attachment'),
						isDownloaded: res.fieldByName('isDownloaded'),
						cover: res.fieldByName('cover'),
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
			getBrouchureById: function(id){ 
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
						title: res.fieldByName('title'), 
						url: res.fieldByName('url'),
						status: res.fieldByName('status'),
						position: res.fieldByName('position'),
						attachment: res.fieldByName('attachment'),
						isDownloaded: res.fieldByName('isDownloaded'),
						cover: res.fieldByName('cover'),
						created: res.fieldByName('created'),
						updated: res.fieldByName('updated') 
					};
					
				} 
				res.close();
                db.close();
                collection.trigger('sync');
                return arr;
			}, 
			updateDownloadedBrochure : function(b_id) {
            	var collection = this;
                sql_query = "UPDATE " + collection.config.adapter.collection_name + " SET isDownloaded=1 WHERE id='" +b_id+"'";
    	        db = Ti.Database.open(collection.config.adapter.db_name);	
	            db.execute(sql_query);
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
			resetBrouchure : function(id){
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