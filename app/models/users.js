

exports.definition = {
	config: {
		columns: {
		    "id": "INTEGER PRIMARY KEY AUTOINCREMENT",
		    "memno": "TEXT",
		    "icno": "TEXT",
		    "name" : "TEXT",
		    "relation" : "TEXT", 
		    "empno" : "TEXT",
		    "corpcode" : "TEXT",
		    "corpname" : "TEXT",
		    "costcenter" : "TEXT",
		    "allergy" : "TEXT",
		    "dept" : "TEXT"
		},
		adapter: {
			type: "sql",
			collection_name: "users"
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
			getUserList : function(){
				var collection = this;
                
                db = Ti.Database.open(collection.config.adapter.db_name);
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name ;
               
                var res = db.execute(sql);
                var listArr = []; 
                var count = 0;
                 
                while (res.isValidRow()){ 
					listArr[count] = {
					    id: res.fieldByName('id'),
					    name: res.fieldByName('name'),
					    memno: res.fieldByName('memno'),
					    icno: res.fieldByName('icno'),
					    relation: res.fieldByName('relation'), 
					    empno: res.fieldByName('empno'),
					    corpcode: res.fieldByName('corpcode'),
					    corpname: res.fieldByName('corpname'),
					    costcenter: res.fieldByName('costcenter'),
					    dept: res.fieldByName('dept'),
					    allergy: res.fieldByName('allergy')
			 
					}; 
					res.next();
					count++;
				} 
				res.close();
                db.close();
                collection.trigger('sync');
                return listArr;
			},
			getUserByMemno : function(){
				var collection = this; 
                db = Ti.Database.open(collection.config.adapter.db_name);
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE memno='"+Ti.App.Properties.getString('memno')+"' ";
               
                var res = db.execute(sql);
                var arr = []; 
               
                if (res.isValidRow()){
					arr = {
					    id: res.fieldByName('id'),
					    name: res.fieldByName('name'),
					    memno: res.fieldByName('memno'),
					    icno: res.fieldByName('icno'),
					    relation: res.fieldByName('relation'), 
					    empno: res.fieldByName('empno'),
					    corpcode: res.fieldByName('corpcode'),
					    corpname: res.fieldByName('corpname'),
					    costcenter: res.fieldByName('costcenter'),
					    dept: res.fieldByName('dept'),
					    allergy: res.fieldByName('allergy')
					  };
				}  
				res.close();
                db.close();
                collection.trigger('sync');
                return arr;
			},
			getOwnerData : function(){
				var collection = this; 
                db = Ti.Database.open(collection.config.adapter.db_name);
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE relation='PRINCIPLE'";
               
                var res = db.execute(sql);
                var arr = []; 
               
                if (res.isValidRow()){
					arr = {
					    id: res.fieldByName('id'),
					    name: res.fieldByName('name'),
					    memno: res.fieldByName('memno'),
					    icno: res.fieldByName('icno'),
					    relation: res.fieldByName('relation'), 
					    empno: res.fieldByName('empno'),
					    corpcode: res.fieldByName('corpcode'),
					    corpname: res.fieldByName('corpname'),
					    costcenter: res.fieldByName('costcenter'),
					    dept: res.fieldByName('dept'),
					    allergy: res.fieldByName('allergy')
					  };
				}  
				res.close();
                db.close();
                collection.trigger('sync');
                return arr;
			},
			addUserData : function(arr) {
				var collection = this;
				arr.forEach(function(entry) {
	                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE memno='" +entry.memno+"' ";
	                var sql_query =  "";
	                db = Ti.Database.open(collection.config.adapter.db_name);
	                var res = db.execute(sql);
	              
	                if (res.isValidRow()){
	             		sql_query = "UPDATE " + collection.config.adapter.collection_name + " SET name='"+entry.name+"',  icno='"+entry.icno+"' , relation='"+entry.relation+"', empno='"+entry.empno+"', corpcode='"+entry.corpcode+"', corpname='"+entry.corpname+"', costcenter='"+entry.costcenter+"', dept='"+entry.dept+"', allergy='"+entry.allergy+"' WHERE memno='" +entry.memno+"' ";
	                }else{
	                	sql_query = "INSERT INTO "+ collection.config.adapter.collection_name + "(name, memno, icno, relation, empno,corpcode,corpname,costcenter,dept,allergy) VALUES ('"+entry.name+"', '"+entry.memno +"','"+entry.icno+"','"+entry.relation+"', '"+ entry.empno +"',  '"+ entry.corpcode +"',  '"+ entry.corpname +"',  '"+ entry.costcenter +"',  '"+ entry.dept +"',  '"+ entry.allergy +"')";
					}
					//console.log(sql_query);
	                db.execute(sql_query);
	                db.close();
	           		collection.trigger('sync');
	            });
	           
            } 
		});

		return Collection;
	}
};