/**********************************
HEALTH RECORD TYPE CONFIG 
ID       type Name
------------------------------------
1		BMI	 
2 		BLOOD PRESSURE 	 
3 		HEART RATE   
4 		BODY TEMPERATURE	
************************************/

exports.definition = {
	config: {
		columns: {
		    "id": "INTEGER PRIMARY KEY AUTOINCREMENT",
		    "date": "TEXT",
		    "time": "TEXT",
		    "type" : "TEXT",
		    "amount": "TEXT",
		    "created" : "TEXT"
		},
		adapter: {
			type: "sql",
			collection_name: "health"
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
			getHealthList : function(){
				var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name ;
                
                db = Ti.Database.open(collection.config.adapter.db_name);
                var res = db.execute(sql);
                var listArr = []; 
                var count = 0;
                while (res.isValidRow()){
					listArr[count] = {
					    id: res.fieldByName('id'),
					    clinicName: res.fieldByName('clinicName'),
					    add1: res.fieldByName('add1'),
					    add2: res.fieldByName('add2'),
					    city: res.fieldByName('city'),
					    postcode: res.fieldByName('postcode'),
					    state: res.fieldByName('state'),
					    tel : res.fieldByName('tel'),
					    latitude: res.fieldByName('latitude'),
					    longitude: res.fieldByName('longitude')
					};
					res.next();
					count++;
				} 
				res.close();
                db.close();
                collection.trigger('sync');
                return listArr;
			},
			addHealthData : function(entry) {
				var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE date='" +mysql_real_escape_string(entry.date)+"' AND time='"+mysql_real_escape_string(entry.time)+"' ";
                var sql_query =  "";
                db = Ti.Database.open(collection.config.adapter.db_name);
                var res = db.execute(sql);
             
	            db.execute("BEGIN");
				
               
                if (res.isValidRow()){
             		sql_query = "UPDATE " + collection.config.adapter.collection_name + " SET amount='"+mysql_real_escape_string(entry.amount)+"' WHERE date='" +mysql_real_escape_string(entry.date)+"' AND time='"+mysql_real_escape_string(entry.time)+"' ";
                }else{
                	sql_query = "INSERT INTO "+ collection.config.adapter.collection_name + "( date, time, amount,created) VALUES ('"+mysql_real_escape_string(entry.date)+"', '"+mysql_real_escape_string(entry.time) +"','"+entry.type+"' ,'"+mysql_real_escape_string(entry.amount)+"', '"+ currentDateTime() +"')";
				}
                db.execute("COMMIT");
	            db.close();
	            collection.trigger('sync');
            } 
		});

		return Collection;
	}
};