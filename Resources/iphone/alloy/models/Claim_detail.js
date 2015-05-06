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
            pulse: "INTEGER"
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
            getClaimDetail: function() {
                var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name;
                db = Ti.Database.open(collection.config.adapter.db_name);
                "android" != Ti.Platform.osname && db.file.setRemoteBackup(false);
                var res = db.execute(sql);
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
                        pulse: res.fieldByName("pulse")
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
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE id ='" + id + "' ";
                db = Ti.Database.open(collection.config.adapter.db_name);
                "android" != Ti.Platform.osname && db.file.setRemoteBackup(false);
                var res = db.execute(sql);
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
            save_claim_detail: function(serial, memno, name, relation, cliniccode, visitdate, amount, category, mcdays, diagnosis, consultation_amt, medication, medication_amt, injection, injection_amt, labtest, labtest_amt, xray, xray_amt, surgical, surgical_amt, extraction_amt, fillings_amt, scaling_amt, others_amt, bps, bpd, pulse, clinicname) {
                var collection = this;
                var sql_query = "";
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE serial='" + serial + "'";
                db = Ti.Database.open(collection.config.adapter.db_name);
                "android" != Ti.Platform.osname && db.file.setRemoteBackup(false);
                var res = db.execute(sql);
                if (res.isValidRow()) {
                    if (res.fieldByName("memno") != memno || res.fieldByName("name") != name || res.fieldByName("relation") != relation || res.fieldByName("cliniccode") != cliniccode || res.fieldByName("visitdate") != visitdate || res.fieldByName("amount") != amount || res.fieldByName("category") != category || res.fieldByName("mcdays") != mcdays || res.fieldByName("diagnosis") != diagnosis || res.fieldByName("consultation_amt") != consultation_amt || res.fieldByName("medication") != medication || res.fieldByName("medication_amt") != medication_amt || res.fieldByName("injection") != injection || res.fieldByName("injection_amt") != injection_amt || res.fieldByName("labtest") != labtest || res.fieldByName("labtest_amt") != labtest_amt || res.fieldByName("xray") != xray || res.fieldByName("xray_amt") != xray_amt || res.fieldByName("surgical") != surgical || res.fieldByName("surgical_amt") != surgical_amt || res.fieldByName("extraction_amt") != extraction_amt || res.fieldByName("fillings_amt") != fillings_amt || res.fieldByName("scaling_amt") != scaling_amt || res.fieldByName("others_amt") != others_amt || res.fieldByName("bps") != bps || res.fieldByName("bpd") != bpd || res.fieldByName("pulse") != pulse || res.fieldByName("clinicname") != clinicname) {
                        sql_query = "UPDATE " + collection.config.adapter.collection_name + " SET memno = ?, name = ?, relation = ?, cliniccode = ?, visitdate = ?, amount = ?, category = ?, mcdays = ?, diagnosis = ?, consultation_amt = ?, medication = ?, medication_amt = ?, injection = ?, injection_amt = ?, labtest = ?, labtest_amt = ?, xray = ?, xray_amt = ?, surgical = ?, surgical_amt = ?, extraction_amt = ?, fillings_amt = ?, scaling_amt = ?, others_amt = ?,  bps = ?,  bpd = ?,  pulse = ?, clinicname = ? WHERE serial = ?";
                        db.execute(sql_query, memno, name, relation, cliniccode, visitdate, amount, category, mcdays, diagnosis, consultation_amt, medication, medication_amt, injection, injection_amt, labtest, labtest_amt, xray, xray_amt, surgical, surgical_amt, extraction_amt, fillings_amt, scaling_amt, others_amt, bps, bpd, pulse, clinicname, serial);
                    }
                } else {
                    sql_query = "INSERT INTO " + collection.config.adapter.collection_name + " (serial, memno, name, relation, cliniccode, visitdate, amount, category, mcdays, diagnosis, consultation_amt, medication, medication_amt, injection, injection_amt, labtest, labtest_amt, xray, xray_amt, surgical, surgical_amt, extraction_amt, fillings_amt, scaling_amt, others_amt, bps, bpd, pulse, clinicname) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
                    db.execute(sql_query, serial, memno, name, relation, cliniccode, visitdate, amount, category, mcdays, diagnosis, consultation_amt, medication, medication_amt, injection, injection_amt, labtest, labtest_amt, xray, xray_amt, surgical, surgical_amt, extraction_amt, fillings_amt, scaling_amt, others_amt, bps, bpd, pulse, clinicname);
                }
                db.close();
                collection.trigger("sync");
            },
            resetCategory: function() {
                var collection = this;
                var sql = "DELETE FROM " + collection.config.adapter.collection_name;
                db = Ti.Database.open(collection.config.adapter.db_name);
                "android" != Ti.Platform.osname && db.file.setRemoteBackup(false);
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