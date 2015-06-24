exports.definition = {
	config: {
		columns: {
		    "id": "TEXT",
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
					    clinicCode: res.fieldByName('clinicCode'),
					    clinicName: res.fieldByName('clinicName'),
					    clinicType: res.fieldByName('clinicType'),
					    add1: res.fieldByName('add1'),
					    add2: res.fieldByName('add2'),
					    city: res.fieldByName('city'),
					    postcode: res.fieldByName('postcode'),
					    state: res.fieldByName('state'),
					    tel : res.fieldByName('tel'),
					    openHour : res.fieldByName('openHour'),
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
					    clinicCode: res.fieldByName('clinicCode'),
					    clinicName: res.fieldByName('clinicName'),
					    clinicType: res.fieldByName('clinicType'),
					    add1: res.fieldByName('add1'),
					    add2: res.fieldByName('add2'),
					    city: res.fieldByName('city'),
					    postcode: res.fieldByName('postcode'),
					    state: res.fieldByName('state'),
					    tel : res.fieldByName('tel'),
					    openHour : res.fieldByName('openHour'),
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
			getPanelListCount : function(clinicCode){
				var collection = this;
                var sql = "SELECT clinicType, count(*) as total FROM " + collection.config.adapter.collection_name +" WHERE clinicCode IN ("+clinicCode+") GROUP BY clinicType ";
                
                db = Ti.Database.open(collection.config.adapter.db_name);
                var res = db.execute(sql);
                var listArr = []; 
                var count = 0;
                while (res.isValidRow()){ 
					listArr[count] = {  
					    clinicType: res.fieldByName('clinicType'),
					    total: res.fieldByName('total')  
					};
					res.next();
					count++;
				} 
				 
				res.close();
                db.close();
                collection.trigger('sync');
                return listArr;
			},
			getCountClinicType : function(){
				var collection = this;
                var sql = "SELECT clinicType, count(*) as total FROM " + collection.config.adapter.collection_name +" GROUP BY clinicType ";
                
                db = Ti.Database.open(collection.config.adapter.db_name);
                var res = db.execute(sql);
                var listArr = []; 
                var count = 0;
                while (res.isValidRow()){ 
					listArr[count] = {  
					    clinicType: res.fieldByName('clinicType'),
					    total: res.fieldByName('total')  
					};
					res.next();
					count++;
				} 
				 
				res.close();
                db.close();
                collection.trigger('sync');
                return listArr;
			},
			getPanelByClinicType : function(ClinicType){
				var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name +" WHERE clinicType ='"+ClinicType+"' ";
              
                db = Ti.Database.open(collection.config.adapter.db_name);
                var res = db.execute(sql);
                var listArr = []; 
                var count = 0;
                while (res.isValidRow()){ 
					listArr[count] = {  
					    id: res.fieldByName('id'),
					    clinicCode: res.fieldByName('clinicCode'),
					    clinicName: res.fieldByName('clinicName'),
					    clinicType: res.fieldByName('clinicType'),
					    add1: res.fieldByName('add1'),
					    add2: res.fieldByName('add2'),
					    city: res.fieldByName('city'),
					    postcode: res.fieldByName('postcode'),
					    state: res.fieldByName('state'),
					    tel : res.fieldByName('tel'),
					    openHour : res.fieldByName('openHour'),
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
					    clinicCode: res.fieldByName('clinicCode'),
					    clinicName: res.fieldByName('clinicName'),
					    clinicType: res.fieldByName('clinicType'),
					    add1: res.fieldByName('add1'),
					    add2: res.fieldByName('add2'),
					    city: res.fieldByName('city'),
					    postcode: res.fieldByName('postcode'),
					    state: res.fieldByName('state'),
					    tel : res.fieldByName('tel'),
					    openHour : res.fieldByName('openHour'),
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
			getPanelListByCode : function(clinicCode, clinicType){
				var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " where clinicCode IN ("+clinicCode+") AND clinicType='"+clinicType+"' " ;
            
                db = Ti.Database.open(collection.config.adapter.db_name);
                var res = db.execute(sql);
                var listArr = [];
                var count = 0;
                while (res.isValidRow()){
					listArr[count] = {
					    id: res.fieldByName('id'),
					    clinicCode: res.fieldByName('clinicCode'),
					    clinicName: res.fieldByName('clinicName'),
					    clinicType: res.fieldByName('clinicType'),
					    add1: res.fieldByName('add1'),
					    add2: res.fieldByName('add2'),
					    city: res.fieldByName('city'),
					    postcode: res.fieldByName('postcode'),
					    state: res.fieldByName('state'),
					    tel : res.fieldByName('tel'),
					    openHour : res.fieldByName('openHour'),
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
					//console.log( entry.id+"||");
					var qsql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE id="+ entry.id ;
					var qres = db.execute(qsql);
		       		
		       		 if (qres.isValidRow()){
	             		sql_query = "UPDATE " + collection.config.adapter.collection_name + " SET clinicName='"+entry.clinicname+"', clinicType='"+entry.clinictype+"', clinicCode='"+entry.cliniccode+"', openHour='"+entry.openhour+"', add1='"+entry.add1+"', add2='"+entry.add2+"', city='"+ entry.city+"', state='"+entry.state+"', longitude='"+entry.longitude+"', latitude='"+entry.latitude+"' WHERE id='" +entry.id+"'";
	                }else{
	                	sql_query = "INSERT INTO "+ collection.config.adapter.collection_name + "( id, clinicName,clinicCode,clinicType,openHour, add1, add2, city,postcode, state, tel, latitude, longitude ) VALUES ('"+entry.id+"','"+entry.clinicname+"', '"+entry.cliniccode+"', '"+entry.clinictype+"', '"+entry.openhour+"', '"+entry.add1+"','"+entry.add2+"', '"+entry.city+"','"+entry.postcode+"', '"+entry.state+"', '"+entry.tel+"', '"+entry.latitude+"', '"+entry.longitude+"')";
					                                                                                                            																									 
				    }
		       		//console.log(sql_query);
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