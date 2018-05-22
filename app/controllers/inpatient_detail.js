var args = arguments[0] || {};
var param = args.params || 0;
var data = args;
var loading = Alloy.createController("loading");

//[{"invno":"HTJ/2016/1243381","memno":"871212055104","nric":"871212055104","name":"NORAZLINA BINTI ZANUDIN","relation":"PRINCIPLE","hospitalcode":"H0051","hospitalname":"GH-HOSPITAL BESAR TUANKU JAAFAR","admdt":"2016-08-08","disdt":"2016-08-10","diagnosis":"MATERNITY","amount":135.00,"pdfurl":"https://tpa.aspmedic.com/tpa/gl/PN3780.pdf"}]

function init(){
    //$.pdf.opacity = 0;
    $.pdf.animate({height: 60, width: 60, opacity:1, duration: 500});
    //****all of this value for design***
    $.invno.text = data.invno || "-";;
    //$.memno.text = data.memno;
    $.nric.text = data.nric || "-";;
    $.name.text = data.name || "-";;
    //$.relation.text = data.relation;
    $.hospitalname.text = data.hospitalname || "-";;
    $.admdt.text = data.admdt || "-";;
    $.disdt.text = data.disdt || "-";;
    $.diagnosis.text = data.diagnosis || "-";
    $.amount.text = "RM "+data.amount || "-";
    $.win.add(loading.getView());
}
init();
$.pdf.addEventListener('touchend', function(e){
	
	loading.start();
	if(OS_IOS){
		var win = Alloy.createController("webview", {url: data.pdfurl}).getView();
		win.open();
		loading.finish();
	}else{
		var PDF = require('pdf');
		PDF.createPdf(data.pdfurl, true, "", "", "", function(err, file, base, url){
			PDF.android_launch(file);
			loading.finish();
		});
	}
});

function closeWindow(){
	$.destroy();
	$.win.close();
}

$.win.addEventListener('close',function(e){
	closeWindow();
});

