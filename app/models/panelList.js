exports.definition = {
	config: {
		columns: {
		    "id": "INTEGER PRIMARY KEY AUTOINCREMENT",
		    "clinicName": "TEXT",
		    "add1": "TEXT",
		    "add2": "TEXT",
		    "city": "TEXT",
		    "postcode": "TEXT",
		    "state": "TEXT",
		    "tel": "TEXT",
		    "latitude": "TEXT",
		    "longitude": "TEXT" 
		},
		adapter: {
			type: "sql",
			collection_name: "panelList"
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
			getPanelList : function(){
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
			getPanelByState : function(state){
				var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name +" WHERE state='"+state+"' ";
                
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
			getPanelListByState : function(){
				var collection = this;
                var sql = "SELECT DISTINCT(state) FROM " + collection.config.adapter.collection_name + " GROUP BY state" ;
                
                db = Ti.Database.open(collection.config.adapter.db_name);
                var res = db.execute(sql);
                var arr = []; 
                var count = 0;
                while (res.isValidRow()){
					arr[count] = { 
					    state: res.fieldByName('state') 
					};
					res.next();
					count++;
				} 
				res.close();
                db.close();
                collection.trigger('sync');
                return arr;
			},
			getPanelListById : function(id){
				var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " where id = "+id ;
                
                db = Ti.Database.open(collection.config.adapter.db_name);
                var res = db.execute(sql);
                var listArr;
                var count = 0;
                while (res.isValidRow()){
					listArr = {
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
			addPanel : function(arr) {
				var collection = this;
                db = Ti.Database.open(collection.config.adapter.db_name);
	           
	            db.execute("BEGIN");
				arr.forEach(function(entry) {
					 
		       		sql_query = "INSERT INTO "+ collection.config.adapter.collection_name + "( clinicName, add1, add2, city,postcode, state, tel, latitude, longitude ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
					 
				    db.execute(sql_query, entry.clinicname, entry.add1, entry.add2, entry.city, entry.postcode, entry.state, entry.tel, entry.latitude, entry.longitude);
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