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
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name +" WHERE category ='"+category+"' ORDER by id DESC";
                
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
			getRecordsById: function(id){ 
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
					console.log(entry.latitude+" "+entry.longitude);
		       		sql_query = "INSERT INTO "+ collection.config.adapter.collection_name + "(id, title, long_title, category, caption,created_date, modified_date, images) VALUES ("+entry.id+", '"+mysql_real_escape_string(entry.title)+"', '"+mysql_real_escape_string(entry.long_title) +"', '"+mysql_real_escape_string(entry.category)+"', '"+ entry.caption +"', '"+entry.created_date+"', '"+entry.modified_date+"', '"+entry.images+"')";
					 
				    db.execute(sql_query);
				});
				console.log("GEOMILANO HERE");
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