var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            serial: "INTEGER",
            memno: "TEXT",
            name: "TEXT",
            relation: "TEXT",
            cliniccode: "TEXT",
            clinicname: "TEXT",
            visitdate: "TEXT",
            amount: "INTEGER",
            category: "TEXT",
            mcdays: "INTEGER",
            diagnosis: "TEXT",
            consultation_amt: "INTEGER",
            medication: "TEXT",
            medication_amt: "INTEGER",
            injection: "TEXT",
            injection_amt: "INTEGER",
            labtest: "TEXT",
            labtest_amt: "INTEGER",
            xray: "TEXT",
            xray_amt: "INTEGER",
            surgical: "TEXT",
            surgical_amt: "INTEGER",
            extraction_amt: "INTEGER",
            fillings_amt: "INTEGER",
            scaling_amt: "INTEGER",
            others_amt: "INTEGER",
            bps: "INTEGER",
            bpd: "INTEGER",
            pulse: "INTEGER",
            status: "TEXT",
            claimType: "TEXT",
            appcode: "TEXT"
        },
        adapter: {
            type: "sql",
            collection_name: "claim_detail"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {});
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {
            addColumn: function(newFieldName, colSpec) {
                var collection = this;
                var db = Ti.Database.open(collection.config.adapter.db_name);
                var fieldExists = false;
                resultSet = db.execute("PRAGMA TABLE_INFO(" + collection.config.adapter.collection_name + ")");
                while (resultSet.isValidRow()) {
                    resultSet.field(1) == newFieldName && (fieldExists = true);
                    resultSet.next();
                }
                fieldExists || db.execute("ALTER TABLE " + collection.config.adapter.collection_name + " ADD COLUMN " + newFieldName + " " + colSpec);
                db.close();
            },
            getClaimDetailBySeries: function(e) {
                var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE serial = ?";
                db = Ti.Database.open(collection.config.adapter.db_name);
                var res = db.execute(sql, e.serial);
                var listArr = [];
                var count = 0;
                while (res.isValidRow()) {
                    {
                        res.fieldCount;
                    }
                    listArr = {
                        serial: res.fieldByName("serial"),
                        memno: res.fieldByName("memno"),
                        name: res.fieldByName("name"),
                        relation: res.fieldByName("relation"),
                        cliniccode: res.fieldByName("cliniccode"),
                        clinicname: res.fieldByName("clinicname"),
                        visitdate: res.fieldByName("visitdate"),
                        amount: res.fieldByName("amount"),
                        category: res.fieldByName("category"),
                        mcdays: res.fieldByName("mcdays"),
                        diagnosis: res.fieldByName("diagnosis"),
                        consultation_amt: res.fieldByName("consultation_amt"),
                        medication: res.fieldByName("medication"),
                        medication_amt: res.fieldByName("medication_amt"),
                        injection: res.fieldByName("injection"),
                        injection_amt: res.fieldByName("injection_amt"),
                        labtest: res.fieldByName("labtest"),
                        labtest_amt: res.fieldByName("labtest_amt"),
                        xray: res.fieldByName("xray"),
                        xray_amt: res.fieldByName("xray_amt"),
                        surgical: res.fieldByName("surgical"),
                        surgical_amt: res.fieldByName("surgical_amt"),
                        extraction_amt: res.fieldByName("extraction_amt"),
                        fillings_amt: res.fieldByName("fillings_amt"),
                        scaling_amt: res.fieldByName("scaling_amt"),
                        others_amt: res.fieldByName("others_amt"),
                        bps: res.fieldByName("bps"),
                        bpd: res.fieldByName("bpd"),
                        pulse: res.fieldByName("pulse"),
                        status: res.fieldByName("status"),
                        claimType: res.fieldByName("claimType"),
                        appcode: res.fieldByName("appcode")
                    };
                    res.next();
                    count++;
                }
                res.close();
                db.close();
                collection.trigger("sync");
                return listArr;
            },
            getClaimDetail: function(e) {
                var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE name = ? order by visitdate DESC";
                db = Ti.Database.open(collection.config.adapter.db_name);
                console.log(sql + " " + e.name);
                var res = db.execute(sql, e.name);
                var listArr = [];
                var count = 0;
                while (res.isValidRow()) {
                    {
                        res.fieldCount;
                    }
                    listArr[count] = {
                        serial: res.fieldByName("serial"),
                        memno: res.fieldByName("memno"),
                        name: res.fieldByName("name"),
                        relation: res.fieldByName("relation"),
                        cliniccode: res.fieldByName("cliniccode"),
                        clinicname: res.fieldByName("clinicname"),
                        visitdate: res.fieldByName("visitdate"),
                        amount: res.fieldByName("amount"),
                        category: res.fieldByName("category"),
                        mcdays: res.fieldByName("mcdays"),
                        diagnosis: res.fieldByName("diagnosis"),
                        consultation_amt: res.fieldByName("consultation_amt"),
                        medication: res.fieldByName("medication"),
                        medication_amt: res.fieldByName("medication_amt"),
                        injection: res.fieldByName("injection"),
                        injection_amt: res.fieldByName("injection_amt"),
                        labtest: res.fieldByName("labtest"),
                        labtest_amt: res.fieldByName("labtest_amt"),
                        xray: res.fieldByName("xray"),
                        xray_amt: res.fieldByName("xray_amt"),
                        surgical: res.fieldByName("surgical"),
                        surgical_amt: res.fieldByName("surgical_amt"),
                        extraction_amt: res.fieldByName("extraction_amt"),
                        fillings_amt: res.fieldByName("fillings_amt"),
                        scaling_amt: res.fieldByName("scaling_amt"),
                        others_amt: res.fieldByName("others_amt"),
                        bps: res.fieldByName("bps"),
                        bpd: res.fieldByName("bpd"),
                        pulse: res.fieldByName("pulse"),
                        status: res.fieldByName("status"),
                        claimType: res.fieldByName("claimType"),
                        appcode: res.fieldByName("appcode")
                    };
                    res.next();
                    count++;
                }
                res.close();
                db.close();
                collection.trigger("sync");
                return listArr;
            },
            getCategoryById: function(id) {
                var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE id =? ";
                db = Ti.Database.open(collection.config.adapter.db_name);
                var res = db.execute(sql, id);
                var arr = [];
                res.isValidRow() && (arr = {
                    id: res.fieldByName("id"),
                    category: res.fieldByName("category")
                });
                res.close();
                db.close();
                collection.trigger("sync");
                return arr;
            },
            save_claim_detail: function(serial, memno, name, relation, cliniccode, visitdate, amount, category, mcdays, clinicname, status, claimType, appcode) {
                var collection = this;
                var sql_query = "";
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE serial= ?";
                db = Ti.Database.open(collection.config.adapter.db_name);
                var res = db.execute(sql, serial);
                if (res.isValidRow()) {
                    if (res.fieldByName("memno") != memno || res.fieldByName("name") != name || res.fieldByName("relation") != relation || res.fieldByName("cliniccode") != cliniccode || res.fieldByName("visitdate") != visitdate || res.fieldByName("amount") != amount || res.fieldByName("category") != category || res.fieldByName("mcdays") != mcdays || res.fieldByName("clinicname") != clinicname || res.fieldByName("status") != status || res.fieldByName("claimType") != claimType || res.fieldByName("appcode") != appcode) {
                        sql_query = "UPDATE " + collection.config.adapter.collection_name + " SET memno = ?, name = ?, relation = ?, cliniccode = ?, visitdate = ?, amount = ?, category = ?, mcdays = ?, clinicname = ?, status = ?, claimType = ?, appcode = ? WHERE serial = ?";
                        console.log(sql_query + " " + appcode);
                        db.execute(sql_query, memno, name, relation, cliniccode, visitdate, amount, category, mcdays, clinicname, status, claimType, appcode, serial);
                    }
                } else {
                    sql_query = "INSERT INTO " + collection.config.adapter.collection_name + " (serial, memno, name, relation, cliniccode, visitdate, amount, category, mcdays, clinicname, status, claimType, appcode) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?)";
                    db.execute(sql_query, serial, memno, name, relation, cliniccode, visitdate, amount, category, mcdays, clinicname, status, claimType, appcode);
                }
                db.close();
                collection.trigger("sync");
            },
            save_claim_extra_detail: function(serial, diagnosis, consultation_amt, medication, medication_amt, injection, injection_amt, labtest, labtest_amt, xray, xray_amt, surgical, surgical_amt, extraction_amt, fillings_amt, scaling_amt, others_amt, bps, bpd, pulse) {
                var collection = this;
                var sql_query = "";
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE serial='" + serial + "'";
                db = Ti.Database.open(collection.config.adapter.db_name);
                var res = db.execute(sql);
                if (res.isValidRow() && (res.fieldByName("diagnosis") != diagnosis || res.fieldByName("consultation_amt") != consultation_amt || res.fieldByName("medication") != medication || res.fieldByName("medication_amt") != medication_amt || res.fieldByName("injection") != injection || res.fieldByName("injection_amt") != injection_amt || res.fieldByName("labtest") != labtest || res.fieldByName("labtest_amt") != labtest_amt || res.fieldByName("xray") != xray || res.fieldByName("xray_amt") != xray_amt || res.fieldByName("surgical") != surgical || res.fieldByName("surgical_amt") != surgical_amt || res.fieldByName("extraction_amt") != extraction_amt || res.fieldByName("fillings_amt") != fillings_amt || res.fieldByName("scaling_amt") != scaling_amt || res.fieldByName("others_amt") != others_amt || res.fieldByName("bps") != bps || res.fieldByName("bpd") != bpd || res.fieldByName("pulse") != pulse)) {
                    sql_query = "UPDATE " + collection.config.adapter.collection_name + " SET diagnosis = ?, consultation_amt = ?, medication = ?, medication_amt = ?, injection = ?, injection_amt = ?, labtest = ?, labtest_amt = ?, xray = ?, xray_amt = ?, surgical = ?, surgical_amt = ?, extraction_amt = ?, fillings_amt = ?, scaling_amt = ?, others_amt = ?,  bps = ?,  bpd = ?,  pulse = ? WHERE serial = ?";
                    db.execute(sql_query, diagnosis, consultation_amt, medication, medication_amt, injection, injection_amt, labtest, labtest_amt, xray, xray_amt, surgical, surgical_amt, extraction_amt, fillings_amt, scaling_amt, others_amt, bps, bpd, pulse, serial);
                }
                db.close();
                collection.trigger("sync");
            },
            resetCategory: function() {
                var collection = this;
                var sql = "DELETE FROM " + collection.config.adapter.collection_name;
                db = Ti.Database.open(collection.config.adapter.db_name);
                db.execute(sql);
                db.close();
                collection.trigger("sync");
            }
        });
        return Collection;
    }
};

model = Alloy.M("claim_detail", exports.definition, []);

collection = Alloy.C("claim_detail", exports.definition, model);

exports.Model = model;

exports.Collection = collection;