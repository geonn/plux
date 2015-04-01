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
		    "field1" : "TEXT",
		    "field2" : "TEXT",
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
			getHealthAllListByType: function(type){
				var collection = this;
                
                db = Ti.Database.open(collection.config.adapter.db_name);
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name +" WHERE type='"+type+"' ORDER BY date DESC ,time DESC";
               
                var res = db.execute(sql);
                var listArr = []; 
                var count = 0;
                 
                while (res.isValidRow()){ 
					listArr[count] = {
					 	id: res.fieldByName('id'),
					    date: res.fieldByName('date'),
					    time: res.fieldByName('time'),
					    type: res.fieldByName('type'),
					    field1: res.fieldByName('field1'),
					    field2: res.fieldByName('field2'),
					    amount: res.fieldByName('amount')  
					}; 
					res.next();
					count++;
				} 
				res.close();
                db.close();
                collection.trigger('sync');
                return listArr;
			},
			getHealthListByType : function(type){
				var collection = this;
                
                db = Ti.Database.open(collection.config.adapter.db_name);
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name +" WHERE type='"+type+"' GROUP BY date ORDER BY date DESC ,time DESC LIMIT 6";
               
                var res = db.execute(sql);
                var listArr = []; 
                var count = 0;
                 
                while (res.isValidRow()){ 
					listArr[count] = {
					 	id: res.fieldByName('id'),
					    date: res.fieldByName('date'),
					    time: res.fieldByName('time'),
					    type: res.fieldByName('type'),
					    field1: res.fieldByName('field1'),
					    field2: res.fieldByName('field2'),
					    amount: res.fieldByName('amount')  
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
             
                if (res.isValidRow()){
             		sql_query = "UPDATE " + collection.config.adapter.collection_name + " SET field1='"+entry.field1+"' , field2='"+entry.field2+"' , amount='"+mysql_real_escape_string(entry.amount)+"' WHERE date='" +mysql_real_escape_string(entry.date)+"' AND time='"+mysql_real_escape_string(entry.time)+"' ";
                }else{
                	sql_query = "INSERT INTO "+ collection.config.adapter.collection_name + "( date, time, type,field1,field2, amount,created) VALUES ('"+mysql_real_escape_string(entry.date)+"', '"+mysql_real_escape_string(entry.time) +"','"+entry.type+"','"+entry.field1+"','"+entry.field2+"' ,'"+mysql_real_escape_string(entry.amount)+"', '"+ currentDateTime() +"')";
				}
				console.log(sql_query);
                db.execute(sql_query);
	            db.close();
	            collection.trigger('sync');
            },
            removeHealthDataById : function(id) {
            	var collection = this;
                var sql = "DELETE FROM " + collection.config.adapter.collection_name+ " WHERE id='"+id+"' ";
                db = Ti.Database.open(collection.config.adapter.db_name);
                db.execute(sql);
                db.close();
                collection.trigger('sync');
            } 
		});

		return Collection;
	}
};