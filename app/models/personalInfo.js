

exports.definition = {
	config: {
		columns: {
		    "id": "INTEGER PRIMARY KEY AUTOINCREMENT",
		    "name": "TEXT",
		    "birthDate": "TEXT",
		    "gender" : "TEXT",
		    "bloodType" : "TEXT", 
		    "isOwner" : "TEXT",
		    "created" : "TEXT",
		    "updated" : "TEXT"
		},
		adapter: {
			type: "sql",
			collection_name: "personalInfo"
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
					    birthDate: res.fieldByName('birthDate'),
					    gender: res.fieldByName('gender'),
					    bloodType: res.fieldByName('bloodType') 
					}; 
					res.next();
					count++;
				} 
				res.close();
                db.close();
                collection.trigger('sync');
                return listArr;
			},
			getOwnerData : function(){
				var collection = this; 
                db = Ti.Database.open(collection.config.adapter.db_name);
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE isOwner='1'";
               
                var res = db.execute(sql);
                var arr = []; 
               
                if (res.isValidRow()){
					arr = {
					    id: res.fieldByName('id'),
					    name: res.fieldByName('name'), 
					    gender: res.fieldByName('gender'),
					    bloodType: res.fieldByName('bloodType'),
					    birthDate : res.fieldByName('birthDate'), 
					};
				} else{
					var entry = {};
					entry.name = "Not Set";
					entry.birthDate = "Not Set";
					entry.gender = "Not Set";
					entry.bloodType = "Not Set";
					entry.isOwner = "1";
					var library = Alloy.createCollection('personalInfo');
					library.addPersonalData(entry);
					library.getOwnerData();
				}
				res.close();
                db.close();
                collection.trigger('sync');
                return arr;
			},
			addPersonalData : function(entry) {
				var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE id='" +entry.id+"' ";
                var sql_query =  "";
                db = Ti.Database.open(collection.config.adapter.db_name);
                var res = db.execute(sql);
             
                if (res.isValidRow()){
             		sql_query = "UPDATE " + collection.config.adapter.collection_name + " SET name='"+entry.name+"', gender='"+entry.gender+"' , bloodType='"+entry.bloodType+"' , birthDate='"+entry.birthDate+"', updated='"+currentDateTime()+"' WHERE id='" +entry.id+"' ";
                }else{
                	sql_query = "INSERT INTO "+ collection.config.adapter.collection_name + "(name, birthDate, gender, bloodType, isOwner,created,updated) VALUES ('"+entry.name+"', '"+entry.birthDate +"','"+entry.gender+"','"+entry.bloodType+"','1', '"+ currentDateTime() +"', '"+ currentDateTime() +"')";
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