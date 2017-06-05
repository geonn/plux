var args = arguments[0] || {};
var param = args.params || 0;
var model = Alloy.createCollection("inpatient_record");
var data = model.getRecordsById(param);
var loading = Alloy.createController("loading");
var bol = true;
//****all of this value for design***
$.invno.text = data.invno;
//$.memno.text = data.memno;
$.nric.text = data.nric;
$.name.text = data.name;
$.relation.text = data.relation;
//$.hospitalcode.text = data.hospitalcode;
$.hospitalname.text = data.hospitalname;
$.admdt.text = data.admdt;
$.disdt.text = data.disdt;
$.diagnosis.text = data.diagnosis;
$.amount.text = data.amount;
//************************************
$.pdfurl.addEventListener('touchend', function(e){
	if(bol) {
		$.win.add(loading.getView());
		loading.start();
		bol = false;
		if(OS_IOS){
			var win = Alloy.createController("webview", {url: data.pdfurl}).getView();
			win.open();
		}else{
			var PDF = require('pdf');
			PDF.createPdf(data.pdfurl, true, "", "", "", function(err, file, base, url){
				PDF.android_launch(file);
			});
		}
	}
});

function pdfOneTime(e) {
	bol = true;
	loading.finish();
}
Ti.App.addEventListener("inpatient_detail:pdfOneTime",pdfOneTime);

function closeWindow(){
	$.destroy();
	$.win.close();
}

$.win.addEventListener('close',function(e){
	closeWindow();
});

