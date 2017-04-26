exports.definition = {
	config: {
		columns: {
		    "id": "INTEGER",
		    "title": "TEXT",
		    "long_title": "TEXT",
		    "category": "TEXT",
		    "caption": "TEXT",
		    "created_date": "TEXT",
		    "modified_date": "TEXT",
		    "images": "TEXT"
		},
		adapter: {
			type: "sql",
			idAttribute: "id",
			collection_name: "health_news_feed"
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
			getRecordsListByCategory: function(category){
				var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name +" WHERE category = ? ORDER by id DESC";
                
                db = Ti.Database.open(collection.config.adapter.db_name);
                if(Ti.Platform.osname != "android"){
                	db.file.setRemoteBackup(false);
                }
                var res = db.execute(sql, category.toString());
                var listArr = []; 
                var count = 0;
                while (res.isValidRow()){ 
					listArr[count] = { 
							id: res.fieldByName('id'),
						    title: res.fieldByName('title'),
						    long_title: res.fieldByName('long_title'), 
						    category: res.fieldByName('category'),
						    created: res.fieldByName('created_date'),
						    updated: res.fieldByName('modified_date'),
						    images: res.fieldByName('images'),
					};	
					 
					res.next();
					count++;
				} 
			 
				res.close();
                db.close();
                collection.trigger('sync');
                return listArr;
			},
			saveArray : function(arr){ // 4th version of save array
				var collection = this;
				var columns = collection.config.columns;
				var names = [];
				for (var k in columns) {
	                names.push(k);
	            }
	            console.log(arr);
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
	                		_.find(names, function(name){
	                			if(name == k){
	                				keys.push(k);
			                		questionmark.push("?");
			                		eval_values.push("entry."+k);
			                		update_questionmark.push(k+"=?");
	                			}
	                		});
	                	}
                	}
                	var without_pk_list = _.rest(update_questionmark);
	                var without_pk_value = _.rest(eval_values);
	                var sql_query =  "INSERT OR REPLACE INTO "+collection.config.adapter.collection_name+" ("+keys.join()+") VALUES ("+questionmark.join()+")";
	                eval("db.execute(sql_query, "+eval_values.join()+")");
				});
				db.execute("COMMIT");
				//console.log(db.getRowsAffected()+" affected row");
	            db.close();
	            collection.trigger('sync');
			},
			getRecordsById: function(id){ 
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
						title: res.fieldByName('title'),
						long_title: res.fieldByName('long_title'), 
					    category: res.fieldByName('category'),
						created: res.fieldByName('created_date'),
					    updated: res.fieldByName('modified_date'),
					    images: res.fieldByName('images'),
					};
					
				} 
				res.close();
                db.close();
                collection.trigger('sync');
                return arr;
			},
			addNews : function(arr) {
				var collection = this;
                db = Ti.Database.open(collection.config.adapter.db_name);
	           
	            db.execute("BEGIN");
				arr.forEach(function(entry) { 
					var title = entry.title;
					if(title != "" &&  title != null){
						title = title.replace(/["']/g, "&quot;"); 
					}
					var long_title = entry.long_title;
					if(long_title != "" &&  long_title != null){
						long_title = long_title.replace(/["']/g, "&quot;"); 
					}

		       		sql_query = "INSERT INTO "+ collection.config.adapter.collection_name + "(id, title, long_title, category, caption,created_date, modified_date, images) VALUES ("+entry.id+", '"+ title+"', '"+long_title +"', '"+mysql_real_escape_string(entry.category)+"', '"+ entry.caption +"', '"+entry.created_date+"', '"+entry.modified_date+"', '"+entry.images+"')";
					 
				    db.execute(sql_query);
				});
				 
                db.execute("COMMIT");
	            db.close();
	            collection.trigger('sync');
            },
            resetNews : function(){
				var collection = this;
                var sql = "DELETE FROM " + collection.config.adapter.collection_name;
                db = Ti.Database.open(collection.config.adapter.db_name);
                db.execute(sql);
                db.close();
                collection.trigger('sync');
			},
		});

		return Collection;
	}
};