exports.definition = {
	config: {
		columns: {
		    "id": "INTEGER",
		    "news_id" : "INTEGER",
		    "content": "TEXT",
		    "type": "TEXT",
		    "images": "TEXT",
		    "position" : "INTEGER"
		},
		adapter: {
			type: "sql",
			collection_name: "news_element"
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
			getListByNews: function(news_id){
				var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name +" WHERE news_id ='"+news_id+"' ORDER by position DESC";
               // console.log(sql);
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
						    news_id: res.fieldByName('news_id'),
						    content: res.fieldByName('content'), 
						    type: res.fieldByName('type'),
						    images: res.fieldByName('images'),
						    position: res.fieldByName('position') 
					};	
					 
					res.next();
					count++;
				} 
			 
				res.close();
                db.close();
                collection.trigger('sync');
                return listArr;
			},
			addElement : function(arr) {
				var collection = this;
                db = Ti.Database.open(collection.config.adapter.db_name);
	           
	            db.execute("BEGIN");
				arr.forEach(function(entry) { 
		       		sql_query = "INSERT INTO "+ collection.config.adapter.collection_name + "(id, news_id, content, type, images,position) VALUES ("+entry.id+", '"+entry.news_id+"', '"+mysql_real_escape_string(entry.content) +"', '"+entry.type+"', '"+ entry.images +"', '"+entry.position+"')";
					 
				    db.execute(sql_query);
				});
				 
                db.execute("COMMIT");
	            db.close();
	            collection.trigger('sync');
            },
            resetNewsElement : function(){
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