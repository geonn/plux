var args = arguments[0] || {}; 
var arg_name = (typeof args.name != "undefined")?args.name:"%";
var title = (arg_name == "%")?"All Claim Records":arg_name;
var nav = require('navigation');
var loading = Alloy.createController("loading");
var corpcode = Ti.App.Properties.getString('corpcode');
var empno = Ti.App.Properties.getString('empno');
console.log(args);
if(Ti.Platform.osname == "android"){
	$.pageTitle.text = title;
}else{
	$.win.title = title;
}

function init(){
	$.win.add(loading.getView());
	loading.start();
	
	API.callByGet({url: "claim.aspx", params: "EMPNO="+empno+"&CORPCODE="+corpcode+"&PERIOD=ALL"}, {
        onload: function(responseText){
    	   var res = JSON.parse(responseText);
		   if(res.length == null || res.length <= 0){
		   }else if( typeof res[0] !== "undefined" && typeof res[0].message !== "undefined"){
			//console.log('got error message');
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

init();

function render(data){
    var pWidth = ((OS_IOS)?Ti.Platform.displayCaps.platformWidth:parseInt(Ti.Platform.displayCaps.platformWidth / (Ti.Platform.displayCaps.logicalDensityFactor || 1), 10)) - 20;

    data = _.sortBy(data, "visitdate");
    data.reverse();
    for (var i=0; i < data.length; i++) {
       
        console.log(args.benefittype+" "+data[i].category);
        console.log(_.contains(args.benefittype.split("/"), data[i].category));
        if(_.contains(args.benefittype.split("/"), data[i].category) || true){
            var left_indicator_bg_color = (data[i].status == "Pending")?"#fba81c":(data[i].status == "Approved")?"#55a939":"#e8534c";
            var row = $.UI.create("View", {classes:['wfill','padding','rounded'], bottom: (data.length -1 == i)?10:0, height: 120, backgroundColor: left_indicator_bg_color, record: data[i]});
            var view_container = $.UI.create("View", {classes:['wfill','hfill'], touchEnabled: false, backgroundColor: "#fff", left: 5});
            row.add(view_container);
            
            var view_left_container = $.UI.create("View", {classes:['hfill'], touchEnabled: false, width: "30%", left: 0, top: 10, bottom:10});
            view_container.add(view_left_container);
            var view_cutoff = $.UI.create("View", {zIndex: 100, touchEnabled: false, width: 30, height: 30, borderRadius:15, backgroundColor: "#535a74", top: -20, left: Math.floor(pWidth*0.30) - 15});
            var view_cutoff2 = $.UI.create("View", {zIndex: 100, touchEnabled: false, width: 30, height: 30, borderRadius:15, backgroundColor: "#535a74", bottom: -20, left: Math.floor(pWidth*0.30) - 15});
            view_container.add(view_cutoff);
            view_container.add(view_cutoff2);
            var view_amount = $.UI.create("View", {classes:['wfill', 'vert'], touchEnabled: false, height: 60, top: 0});
            var view_date = $.UI.create("View", {classes:['wfill', 'vert'], touchEnabled: false, height: 40, left: 10, bottom: 0});
            view_left_container.add(view_amount);
            view_left_container.add(view_date);
            
            var label_status = $.UI.create("Label", {classes:['wfill','hsize','h5'], bottom: 50, touchEnabled: false, left: 10, right:10, minimumFontSize: 10, color: left_indicator_bg_color, text: data[i].status});
            view_left_container.add(label_status);
            var label_amount = $.UI.create("Label", {classes:['wfill','hsize','h4','bold'], touchEnabled: false, left: 10, right:10, minimumFontSize: 10, text: "RM "+ data[i].amount});
            view_amount.add(label_amount);
            
            var label_date_title = $.UI.create("Label", {classes:['wfill','hsize','h6'], touchEnabled: false, text: "DATE"});
            var label_date = $.UI.create("Label", {classes:['wfill','hsize','h6','bold'], touchEnabled: false, text: data[i].visitdate});
            view_date.add(label_date_title);
            view_date.add(label_date);
            
            var view_separator = $.UI.create("View", {classes:['hfill'], touchEnabled: false, width: 1, left: "30%", top: 10, bottom: 10, backgroundColor: "#eeeeee"});
            view_container.add(view_separator);
            var view_right_container = $.UI.create("View", {classes:['hfill'], touchEnabled: false, width: "70%", left: "30%", right: 10, bottom:10, top:10});
            view_container.add(view_right_container);
            
            var view_right_top = $.UI.create("View",{classes:['wfill','vert','padding'], touchEnabled: false, top: 0, bottom: 0, height: 60});
            view_right_container.add(view_right_top);
            
            var label_clinic = $.UI.create("Label", {classes:['wfill','hsize','h6','bold'], touchEnabled: false, minimumFontSize: 10, text: data[i].clinicname});
            var label_claimUnder_title = $.UI.create("Label", {classes:['wfill','hsize','h6'], touchEnabled: false, top:5, text: "CLAIM UNDER"});
            var label_claimUnder = $.UI.create("Label", {classes:['wfill','hsize','h6','bold'], touchEnabled: false, minimumFontSize: 10, text: data[i].name});
            view_right_top.add(label_clinic);
            view_right_top.add(label_claimUnder_title);
            view_right_top.add(label_claimUnder);
            
            var view_right_bottom = $.UI.create("View",{classes:['vert'], touchEnabled: false, width: "50%", left: 10, bottom: 0, height: 40});
            view_right_container.add(view_right_bottom);
            var label_type_title = $.UI.create("Label", {classes:['wfill','hsize','h6'], touchEnabled: false, text: "CLAIM TYPE"});
            var label_type = $.UI.create("Label", {classes:['wfill','hsize','h6','bold'], touchEnabled: false, minimumFontSize: 10, text:data[i].claimtype});
            view_right_bottom.add(label_type_title);
            view_right_bottom.add(label_type);
            
            var view_right_bottom2 = $.UI.create("View",{classes:['vert'], touchEnabled: false, width: "32%", left: "53%", bottom: 0, height: 40});
            view_right_container.add(view_right_bottom2);
            
            var label_category_title = $.UI.create("Label", {classes:['wfill','hsize','h6'], touchEnabled: false, text: "CATEGORY"});
            var label_category = $.UI.create("Label", {classes:['wfill','hsize','h6','bold'], touchEnabled: false, minimumFontSize: 10, text: data[i].category});
            view_right_bottom2.add(label_category_title);
            view_right_bottom2.add(label_category);
          
            var view_right_bottom3 = $.UI.create("View",{classes:['vert'], touchEnabled: false, width: "15%", left: "86%", bottom: 0, height: 40});
            view_right_container.add(view_right_bottom3);
            
            var label_mc_title = $.UI.create("Label", {classes:['wfill','hsize','h6'], touchEnabled: false, text: "MC"});
            var label_mc = $.UI.create("Label", {classes:['wfill','hsize','h6','bold'], touchEnabled: false, minimumFontSize: 10, text: data[i].mcdays});
            view_right_bottom3.add(label_mc_title);
            view_right_bottom3.add(label_mc);
            
            row.addEventListener("click", function(e){
               nav.navigateWithArgs("asp/claimDetail", e.source.record); 
            });
            
            $.listing.add(row);
        }
    };
    if(data.length <= 0){
        var row = $.UI.create("View", {classes:['wfill','hsize','padding','rounded'], bottom: 0, backgroundColor: "#fff"});
        var view_container = $.UI.create("View", {classes:['wfill','hsize','padding'], touchEnabled: false });
        var label = $.UI.create("Label", {classes:['wfill','hsize','h5'], textAlign:"center", text: "No record found"});
        row.add(view_container);
        view_container.add(label);
        $.listing.add(row);
    }
}

$.win.addEventListener("close", function(){
	
});

if(Ti.Platform.osname == "android"){
	$.btnBack.addEventListener('click', function(){  
		nav.closeWindow($.win); 
	});
}