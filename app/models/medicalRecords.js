exports.definition = {
	config: {
		columns: {
		    "id": "INTEGER PRIMARY KEY AUTOINCREMENT",
		    "title": "TEXT",
		    "message": "TEXT", 
		    "created": "TEXT",
		    "updated": "TEXT"
		},
		adapter: {
			type: "sql",
			collection_name: "medicalRecords"
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
			getRecordsList: function(){
				var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name +"  order by updated DESC";
                
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
						    message: res.fieldByName('message'), 
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
			getRecordById : function(id){
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
					    id: res.fieldByName('id'),
						title: res.fieldByName('title'),
						message: res.fieldByName('message'), 
						created: res.fieldByName('created'),
						updated: res.fieldByName('updated') 
					};
					
				} 
				res.close();
                db.close();
                collection.trigger('sync');
                return arr;
			},
			removeRecordById : function(id){
				var collection = this;
                var sql = "DELETE FROM " + collection.config.adapter.collection_name + " WHERE id='"+ id+ "'" ;
                db = Ti.Database.open(collection.config.adapter.db_name);
                if(Ti.Platform.osname != "android"){
                	db.file.setRemoteBackup(false);
                }
                db.execute(sql);
                db.close();
                collection.trigger('sync');
			},
			searchRecord: function(query){
				var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE title LIKE '%"+ query+ "%' OR message LIKE '%"+ query+"%'" ;
                
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
						message: res.fieldByName('message'), 
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
			updateRecord : function(entry){
				var collection = this;
                db = Ti.Database.open(collection.config.adapter.db_name);
	            if(Ti.Platform.osname != "android"){
                	db.file.setRemoteBackup(false);
                } 
				var title = entry.title;
                if(title != ""){ 
                	title = title.replace(/["']/g, "&quot;");
                }
				
				var message = entry.message;
				if(message != ""){ 
					message = message.replace(/["']/g, "&quot;");
				} 
		   		sql_query = "UPDATE "+ collection.config.adapter.collection_name + " SET title='"+entry.title+"',  message='"+entry.message+"' WHERE id='" + entry.id + "' "; 
				 
				db.execute(sql_query);
				  
	            db.close();
	            collection.trigger('sync');
			},
			addRecord : function(entry) {
				var collection = this;
                db = Ti.Database.open(collection.config.adapter.db_name);
	            if(Ti.Platform.osname != "android"){
                	db.file.setRemoteBackup(false);
                } 
                
                var title = entry.title;
                if(title != ""){ 
                	title = title.replace(/["']/g, "&quot;");
                }
				
				var message = entry.message;
				if(message != ""){ 
					message = message.replace(/["']/g, "&quot;");
				} 
				 
		   		sql_query = "INSERT INTO "+ collection.config.adapter.collection_name + "( title,message, created, updated ) VALUES ( '"+title+"', '"+message+"', '"+entry.created+"', '"+entry.updated+"')";
				 
				db.execute(sql_query);
				  
	            db.close();
	            collection.trigger('sync');
           },
           getLastId : function(){
           	var collection = this;
                db = Ti.Database.open(collection.config.adapter.db_name);
	            if(Ti.Platform.osname != "android"){
                	db.file.setRemoteBackup(false);
                } 
			 
		   		sql_query = "SELECT * FROM "+ collection.config.adapter.collection_name + " ORDER BY id DESC LIMIT 1";
				  
				var res = db.execute(sql_query);
                var arr = []; 
               
                if (res.isValidRow()){
					arr = {
					    id: res.fieldByName('id')
					};
					
				} 
				res.close();
	            collection.trigger('sync');
	            return arr;
           }
		});

		return Collection;
	}
};  