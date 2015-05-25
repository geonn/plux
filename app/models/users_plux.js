exports.definition = {
	config: {
		columns: {
		    "id": "INTEGER", 
		    "fullname" : "TEXT",
		    "email" : "TEXT", 
		    "status" : "TEXT",
		    "facebook_id" : "TEXT",
		    "facebook_url" : "TEXT",
		    "last_login" : "TEXT"
		},
		adapter: {
			type: "sql",
			collection_name: "users_PLUX"
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
			getUserById : function(id){
				var collection = this;
                
                db = Ti.Database.open(collection.config.adapter.db_name);
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE id='"+id+"' " ;
               
                var res = db.execute(sql);
                var listArr = [];  
                 
                while (res.isValidRow()){ 
					listArr = { 
					    id: res.fieldByName('id'),
					    fullname: res.fieldByName('fullname'),
					    email: res.fieldByName('email'),
					    status: res.fieldByName('status'),
					    facebook_id: res.fieldByName('facebook_id'),
					    facebook_url: res.fieldByName('facebook_url'),
					    last_login: res.fieldByName('last_login') 
					};
					res.next(); 
				} 
				res.close();
                db.close();
                collection.trigger('sync');
                return listArr;
			}, 
			addUserData : function(entry) {
				var collection = this; 
	            var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE id='" +entry.id+"' ";
	            var sql_query =  "";
	            db = Ti.Database.open(collection.config.adapter.db_name);
	            var res = db.execute(sql);
	            //console.log(entry.memno);
	            if (res.isValidRow()){
	            	sql_query = "UPDATE " + collection.config.adapter.collection_name + " SET fullname='"+entry.fullname+"',  email='"+entry.email+"' , status='"+entry.status+"', facebook_id='"+entry.facebook_id+"', facebook_url='"+entry.facebook_url+"', last_login='"+entry.last_login+"' WHERE id='" +entry.id+"' ";
	            }else{
	            	sql_query = "INSERT INTO "+ collection.config.adapter.collection_name + "(id, fullname, email,status, facebook_id, facebook_url,last_login) VALUES ('"+entry.u_id+"', '"+entry.fullname +"','"+entry.email+"','"+entry.status+"', '"+ entry.facebook_id +"',  '"+ entry.facebook_url +"',  '"+ entry.last_login +"')";
				}
				//console.log(sql_query);
	            db.execute(sql_query);
	            db.close();
	           	collection.trigger('sync'); 
            } 
		});

		return Collection;
	}
};