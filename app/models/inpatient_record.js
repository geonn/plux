exports.definition = {
	config: {
		columns: {
		    "invno": "TEXT",
		    "memno": "INTEGER",
		    "nric": "INTEGER",
		    "name": "TEXT",
		    "relation": "TEXT",
		    "hospitalcode": "TEXT",
		    "hospitalname": "TEXT",
		    "admdt": "DATE",
		    "disdt": "DATE",
		    "diagnosis": "TEXT",
		    "amount": "DOUBLE",
		    "pdfurl": "TEXT"
		},
		adapter: {
			type: "sql",
			idAttribute: "invno",
			collection_name: "inpatient_record"
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
			saveArray : function(arr){ // 4th version of save array
				var collection = this;
				var columns = collection.config.columns;
				var names = [];
				for (var k in columns) {
	                names.push(k);
	            }
	            console.log(arr);
                db = Ti.Database.open(collection.config.adapter.db_name);
                if(Ti.Platform.osname != "android"){
                	db.file.setRemoteBackup(false);
                }
                db.execute("BEGIN");
                arr.forEach(function(entry) {
                	var keys = [];
                	var questionmark = [];
                	var eval_values = [];
                	var update_questionmark = [];
                	var update_value = [];
                	for(var k in entry){
	                	if (entry.hasOwnProperty(k)){
	                		_.find(names, function(name){
	                			if(name == k){
	                				keys.push(k);
			                		questionmark.push("?");
			                		eval_values.push("entry."+k);
			                		update_questionmark.push(k+"=?");
	                			}
	                		});
	                	}
                	}
                	var without_pk_list = _.rest(update_questionmark);
	                var without_pk_value = _.rest(eval_values);
	                var sql_query =  "INSERT OR REPLACE INTO "+collection.config.adapter.collection_name+" ("+keys.join()+") VALUES ("+questionmark.join()+")";
	                eval("db.execute(sql_query, "+eval_values.join()+")");
				});
				db.execute("COMMIT");
				//console.log(db.getRowsAffected()+" affected row");
	            db.close();
	            collection.trigger('sync');
			},
			getRecordsById: function(id){ 
                var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name +" WHERE invno =? ";
                
                db = Ti.Database.open(collection.config.adapter.db_name);
                if(Ti.Platform.osname != "android"){
                	db.file.setRemoteBackup(false);
                }
                var res = db.execute(sql, id);
                var arr = []; 
               
                if (res.isValidRow()){
					arr = {
					    invno: res.fieldByName('invno'),
						memno: res.fieldByName('memno'),
						nric: res.fieldByName('nric'), 
					    name: res.fieldByName('name'),
						relation: res.fieldByName('relation'),
					    hospitalcode: res.fieldByName('hospitalcode'),
					    hospitalname: res.fieldByName('hospitalname'),
					    admdt : res.fieldByName('admdt'),
					    disdt : res.fieldByName('disdt'),
					    diagnosis: res.fieldByName('diagnosis'),
					    amount : res.fieldByName('amount'),
					    pdfurl : res.fieldByName("pdfurl")
					};
					
				} 
				res.close();
                db.close();
                collection.trigger('sync');
                return arr;
			},
			getAllRecords: function(){ 
                var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name +"";
                
                db = Ti.Database.open(collection.config.adapter.db_name);
                if(Ti.Platform.osname != "android"){
                	db.file.setRemoteBackup(false);
                }
                var res = db.execute(sql);
                var arr = []; 
                var count = 0;
                while(res.isValidRow()){
					arr[count] = {
					    invno: res.fieldByName('invno'),
						memno: res.fieldByName('memno'),
						nric: res.fieldByName('nric'), 
					    name: res.fieldByName('name'),
						relation: res.fieldByName('relation'),
					    hospitalcode: res.fieldByName('hospitalcode'),
					    hospitalname: res.fieldByName('hospitalname'),
					    admdt : res.fieldByName('admdt'),
					    disdt : res.fieldByName('disdt'),
					    diagnosis: res.fieldByName('diagnosis'),
					    amount : res.fieldByName('amount'),
					    pdfurl : res.fieldByName("pdfurl")
					};
					res.next();
					count++;
				} 
				res.close();
                db.close();
                collection.trigger('sync');
                return arr;
			},			
            resetInpatientRecord : function(){
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