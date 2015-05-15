/**********************************
HEALTH RECORD TYPE CONFIG 
ID       type Name
------------------------------------
1		BMI	 
2 		BLOOD PRESSURE 	 
3 		HEART RATE   
4 		BODY TEMPERATURE
5		HEIGHT
6		WEIGHT 
10		STEPS
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
			getHealthListByTypeInYear : function(type,gType){
				var collection = this; 
                db = Ti.Database.open(collection.config.adapter.db_name);
                
				var theField = "amount";
				if(gType == "6" || gType == "2"){
					theField = "field1";
				}
				if(gType == "5"){
					theField = "field2";
				}
				
				if(gType =="2"){
					var value2 = 0;
					var sql2 = 'SELECT strftime("%Y-%m", date) as datemonth, AVG(field2) as value2 FROM ' + collection.config.adapter.collection_name +" WHERE type='"+type+"' GROUP BY strftime(\"%Y-%m\", date) ORDER BY date  LIMIT 6";
                	var res2 = db.execute(sql2);
                	if(res2.isValidRow()){
                		value2 = res2.fieldByName('value2'); 
                	}
				}
				
				if(gType =="10"){
	               	 var sql = 'SELECT strftime("%Y-%m", date) as datemonth, SUM('+theField+') as value FROM ' + collection.config.adapter.collection_name +" WHERE type='"+type+"' GROUP BY strftime(\"%Y-%m\", date) ORDER BY date  LIMIT 6";
	            }else{
	            	var sql = 'SELECT strftime("%Y-%m", date) as datemonth, AVG('+theField+') as value FROM ' + collection.config.adapter.collection_name +" WHERE type='"+type+"' GROUP BY strftime(\"%Y-%m\", date) ORDER BY date  LIMIT 6";
	            }
                var res = db.execute(sql);
                var listArr = []; 
                var count = 0;
                if(gType =="2"){
                	while (res.isValidRow()){ 
						listArr[count] = {
						 	date: res.fieldByName('datemonth'),
						    value: res.fieldByName('value'),
						    value2: value2 
						}; 
						res.next();
						count++;
					} 
                }else{
                	while (res.isValidRow()){ 
						listArr[count] = {
						 	date: res.fieldByName('datemonth'),
						    value: res.fieldByName('value') 
						}; 
						res.next();
						count++;
					} 	
                } 
                
				res.close();
                db.close();
                collection.trigger('sync');
                return listArr;
			},
			getSteps : function(){
				var collection = this;
                
                db = Ti.Database.open(collection.config.adapter.db_name);
                var sql = "SELECT date , SUM(amount) as amount FROM " + collection.config.adapter.collection_name +" WHERE type=10 GROUP BY date ORDER BY date DESC  LIMIT 6";
               
                var res = db.execute(sql);
                var listArr = []; 
                var count = 0;
                 
                while (res.isValidRow()){ 
					listArr[count] = { 
					    date: res.fieldByName('date'), 
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
             		sql_query = "UPDATE " + collection.config.adapter.collection_name + " SET field1='"+entry.field1+"' , field2='"+entry.field2+"' , amount='"+entry.amount+"' WHERE date='" +entry.date+"' AND time='"+entry.time+"' ";
                }else{
                	sql_query = "INSERT INTO "+ collection.config.adapter.collection_name + "( date, time, type,field1,field2, amount,created) VALUES ('"+entry.date+"', '"+entry.time +"','"+entry.type+"','"+entry.field1+"','"+entry.field2+"' ,'"+entry.amount+"', '"+ currentDateTime() +"')";
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