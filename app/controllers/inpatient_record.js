var args = arguments[0] || {};
var loading = Alloy.createController("loading");

function init(){
	$.win.add(loading.getView());
	refresh();
}

init();

function refresh(){
	loading.start();
	var empno = Ti.App.Properties.getString("empno"); //"19701950"
	var corpcode = Ti.App.Properties.getString("corpcode"); // "ONSEMI"
	API.callByGet({url:"ipinv.aspx",params:"EMPNO="+empno+"&CORPCODE="+corpcode},
	{
	    onload: function(responseText){
           var res = JSON.parse(responseText);
           if(res.length == null || res.length <= 0){
                var row = $.UI.create("View", {classes:['wfill','hsize','padding','rounded'], bottom: 0, backgroundColor: "#fff"});
                var view_container = $.UI.create("View", {classes:['wfill','hsize','padding'], touchEnabled: false });
                var label = $.UI.create("Label", {classes:['wfill','hsize','h5'], textAlign:"center", text: "No record found"});
                row.add(view_container);
                view_container.add(label);
                $.listing.add(row);
           }else if( typeof res[0] !== "undefined" && typeof res[0].message !== "undefined"){
                common.createAlert(res[0].message);
           }else{
                render(res || []);
           }
       }, onfinish: function(){
           loading.finish();
       }, onerror: function(){
            $.win.close();
       }
	});
}

function render(data){
    var pWidth = ((OS_IOS)?Ti.Platform.displayCaps.platformWidth:parseInt(Ti.Platform.displayCaps.platformWidth / (Ti.Platform.displayCaps.logicalDensityFactor || 1), 10)) - 20;

    data = _.sortBy(data, "admdt");
    data.reverse();
    for (var i=0; i < data.length; i++) {
        var left_indicator_bg_color = "#55a939";
        var row = $.UI.create("View", {classes:['wfill','padding','rounded'], bottom: 0, height: 130, backgroundColor: left_indicator_bg_color, record: data[i]});
        var view_container = $.UI.create("View", {classes:['wfill','hfill'], touchEnabled: false, backgroundColor: "#fff", left: 5});
        row.add(view_container);

        var view_left_container = $.UI.create("View", {classes:['hfill', 'vert'], touchEnabled: false, width: "30%", left: 0, top: 10, bottom:10});
        view_container.add(view_left_container);
        var view_cutoff = $.UI.create("View", {zIndex: 100, touchEnabled: false, width: 30, height: 30, borderRadius:15, backgroundColor: "#535a74", top: -20, left: Math.floor(pWidth*0.30) - 15});
        var view_cutoff2 = $.UI.create("View", {zIndex: 100, touchEnabled: false, width: 30, height: 30, borderRadius:15, backgroundColor: "#535a74", bottom: -20, left: Math.floor(pWidth*0.30) - 15});
        view_container.add(view_cutoff);
        view_container.add(view_cutoff2);
        var view_amount = $.UI.create("View", {classes:['wfill', 'vert'], touchEnabled: false, height: 60, top: 0});

        view_left_container.add(view_amount);

        var label_amount = $.UI.create("Label", {classes:['wfill','hsize','h4','bold'], touchEnabled: false, left: 10, right:10, minimumFontSize: 10, text: "RM "+ data[i].amount});
        view_amount.add(label_amount);

				var label_diagnosis_title = $.UI.create("Label", {classes:['wfill','hsize','h6'], touchEnabled: false, top:5, left:10, text: "DIAGNOSIS"});
				var label_diagnosis = $.UI.create("Label", {classes:['wfill','hsize','h6','bold'], touchEnabled: false, left:10, minimumFontSize: 10, text: data[i].diagnosis});
				view_left_container.add(label_diagnosis_title);
				view_left_container.add(label_diagnosis);

        var view_separator = $.UI.create("View", {classes:['hfill'], touchEnabled: false, width: 1, left: "30%", top: 10, bottom: 10, backgroundColor: "#eeeeee"});
        view_container.add(view_separator);
        var view_right_container = $.UI.create("View", {classes:['hfill'], touchEnabled: false, width: "70%", left: "30%", right: 10, bottom:10, top:10});
        view_container.add(view_right_container);

        var view_right_top = $.UI.create("View",{classes:['wfill','vert','padding'], touchEnabled: false, top: 0, bottom: 0, height: 80});
        view_right_container.add(view_right_top);

        var label_clinic = $.UI.create("Label", {classes:['wfill','hsize','h6','bold'], touchEnabled: false, text: data[i].hospitalname});
        var label_claimUnder_title = $.UI.create("Label", {classes:['wfill','hsize','h6'], touchEnabled: false, top:5, text: "CLAIM UNDER"});
        var label_claimUnder = $.UI.create("Label", {classes:['wfill','hsize','h6','bold'], touchEnabled: false, minimumFontSize: 10, text: data[i].name});
        view_right_top.add(label_clinic);
        view_right_top.add(label_claimUnder_title);
        view_right_top.add(label_claimUnder);

        var view_right_bottom = $.UI.create("View",{classes:['vert','wfill'], touchEnabled: false, left: 10, bottom: 0, height: 40});
        view_right_container.add(view_right_bottom);
        var view_date = $.UI.create("View", {classes:['wfill', 'vert'], touchEnabled: false, height: 40, bottom: 0});
        var label_date_title = $.UI.create("Label", {classes:['wfill','hsize','h6'], top: 5, touchEnabled: false, text: "DATE"});
        var label_date = $.UI.create("Label", {classes:['wfill','hsize','h6','bold'], minimumFontSize: 10, touchEnabled: false, text: data[i].admdt+" "+data[i].disdt});
        view_right_bottom.add(label_date_title);
        view_right_bottom.add(label_date);

        row.addEventListener("click", function(e){
           nav.navigateWithArgs("inpatient_detail", e.source.record);
        });

        $.listing.add(row);
    };
}

function viewDetails(e){
	var nav = require('navigation');
	nav.navigateWithArgs("inpatient_detail", {
		params: e.source
	});
}
function closeWindow(){
	$.destroy();
	$.win.close();
}
$.win.addEventListener('close',function(e){
	closeWindow();
});
