exports.definition = {
	config: {
		columns: {
		    "id": "INTEGER",
		    "category": "TEXT" 
		},
		adapter: {
			type: "sql",
			collection_name: "categorys",
			idAttribute: "room_id"
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
			getCategoryList: function(){
				var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name +"  order by id";
                
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
						    category: res.fieldByName('category') 
					};	
					 
					res.next();
					count++;
				} 
			 
				res.close();
                db.close();
                collection.trigger('sync');
                return listArr;
			},
			getCategoryById: function(id){ 
                var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name +" WHERE id =? ";
                
                db = Ti.Database.open(collection.config.adapter.db_name);
                if(Ti.Platform.osname != "android"){
                	db.file.setRemoteBackup(false);
                }
                var res = db.execute(sql, id);
                var arr = []; 
               
                if (res.isValidRow()){
					arr = {
					    id: res.fieldByName('id'),
						category: res.fieldByName('category')
					};
					
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
			resetCategory : function(id){
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