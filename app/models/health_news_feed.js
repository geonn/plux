exports.definition = {
	config: {
		columns: {
		    "id": "int",
		    "title": "string",
		    "long_title": "string",
		    "category": "string",
		    "caption": "string",
		    "created_date": "datetime",
		    "modified_date": "datetime",
		    "images": "string"
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
			addPanel : function(arr) {
				var collection = this;
                db = Ti.Database.open(collection.config.adapter.db_name);
	           
	            db.execute("BEGIN");
				arr.forEach(function(entry) {
					console.log(entry.latitude+" "+entry.longitude);
		       		sql_query = "INSERT INTO "+ collection.config.adapter.collection_name + "(id, title, long_title, category, caption,created_date, modified_date, images) VALUES ("+entry.id+"'"+mysql_real_escape_string(entry.title)+"', '"+mysql_real_escape_string(entry.long_title) +"', '"+mysql_real_escape_string(entry.category)+"', '"+ entry.caption +"', '"+entry.created_date+"', '"+entry.modified_date+"', '"+entry.images+"')";
					 
				    db.execute(sql_query);
				});
                db.execute("COMMIT");
	            db.close();
	            collection.trigger('sync');
            },
            resetPanel : function(){
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