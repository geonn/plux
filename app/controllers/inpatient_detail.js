var args = arguments[0] || {};
var param = args.params || 0;
var model = Alloy.createCollection("inpatient_record");
var data = model.getRecordsById(param);
//****all of this value for design***
var invno = data.invno;
var memno = data.memno;
var nric = data.nric;
var name = data.name;
var relation = data.relation;
var hospitalcode = data.hospitalcode;
var hospitalname = data.hospitalname;
var admdt = data.admdt;
var disdt = data.disdt;
var diagnosis = data.diagnosis;
var amount = data.amount;
var pdfurl = data.pdfurl;
//************************************
function closeWindow(){
	$.destroy();
	$.win.close();
}
$.win.addEventListener('close',function(e){
	closeWindow();
});

