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
		    "dept" : "TEXT",
		    "allergy" : "TEXT",
		   	"isver" : "TEXT",
		    "verno" : "TEXT"
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
			addColumn : function( newFieldName, colSpec) {
				var collection = this;
				var db = Ti.Database.open(collection.config.adapter.db_name);
				if(Ti.Platform.osname != "android"){
                	db.file.setRemoteBackup(false);
                }
				var fieldExists = false;
				resultSet = db.execute('PRAGMA TABLE_INFO(' + collection.config.adapter.collection_name + ')');
				while (resultSet.isValidRow()) {
					if(resultSet.field(1)==newFieldName) {
						fieldExists = true;
					}
					resultSet.next();
				}  
			 	if(!fieldExists) { 
					db.execute('ALTER TABLE ' + collection.config.adapter.collection_name + ' ADD COLUMN '+newFieldName + ' ' + colSpec);
				}
				db.close();
			},
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
					    allergy: res.fieldByName('allergy'),
					    isver: res.fieldByName('isver'),
					    verno: res.fieldByName('verno')
			 
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
				var memno = Ti.App.Properties.getString('memno');
                db = Ti.Database.open(collection.config.adapter.db_name);
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE memno=?";
               
                var res = db.execute(sql, memno);
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
					    allergy: res.fieldByName('allergy'),
					    isver: res.fieldByName('isver'),
					    verno: res.fieldByName('verno')
					  };
				}  
				res.close();
                db.close();
                collection.trigger('sync');
                return arr;
			},
			getUserByEmpNo : function(){
				var collection = this;
                db = Ti.Database.open(collection.config.adapter.db_name);
                var empno = Ti.App.Properties.getString('empno');
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE empno=?";
               
                var res = db.execute(sql, empno);
                var arr = []; 
                var count = 0;
                 
                while (res.isValidRow()){ 
					arr[count] = {
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
					    allergy: res.fieldByName('allergy'),
					    isver: res.fieldByName('isver'),
					    verno: res.fieldByName('verno')
					  };
					res.next();
					count++;
				}  
				res.close();
                db.close();
                collection.trigger('sync');
                return arr;
			},
			getOwnerData : function(id){
				var collection = this; 
                db = Ti.Database.open(collection.config.adapter.db_name);
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE id=?";
                
                var res = db.execute(sql, id);
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
					    allergy: res.fieldByName('allergy'),
					    isver: res.fieldByName('isver'),
					    verno: res.fieldByName('verno')
					  };
				}  
				res.close();
                db.close();
                collection.trigger('sync');
                return arr;
			},
			getPrincipleData : function(){
				var collection = this; 
                db = Ti.Database.open(collection.config.adapter.db_name);
                var memno = Ti.App.Properties.getString('memno');
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE relation='PRINCIPLE' and memno=?";
               
                var res = db.execute(sql, memno);
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
					    allergy: res.fieldByName('allergy'),
					    isver: res.fieldByName('isver'),
					    verno: res.fieldByName('verno')
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
	             	//console.log(entry.memno);
	                if (res.isValidRow()){
	             		sql_query = "UPDATE " + collection.config.adapter.collection_name + " SET name=?,  icno=? , relation=?, empno=?, corpcode=?, corpname=?, costcenter=?, dept=?, allergy=?, isver=?, verno=? WHERE memno=? ";
	             		db.execute(sql_query, entry.name, entry.icno, entry.relation, entry.empno, entry.corpcode, entry.corpname, entry.costcenter, entry.dept, entry.allergy, entry.isver, entry.verno, entry.memno);
	                }else{
	                	sql_query = "INSERT INTO "+ collection.config.adapter.collection_name + " (name, memno, icno, relation, empno,corpcode,corpname,costcenter,dept, allergy, isver, verno) VALUES (?, ?,?,?, ?,  ?,  ?,  ?,  ?, ?, ?, ?)";
	                	db.execute(sql_query, entry.name, entry.memno, entry.icno, entry.relation, entry.empno, entry.corpcode, entry.corpname, entry.costcenter, entry.dept, entry.allergy, entry.isver, entry.verno);
					}
					 
	                
	                db.close();
	           		collection.trigger('sync');
	            });
            } 
		});

		return Collection;
	}
};