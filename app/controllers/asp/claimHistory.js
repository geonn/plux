var args = arguments[0] || {}; 
var arg_name = (typeof args.name != "undefined")?args.name:"%";
var title = (arg_name == "%")?"All Claim Records":arg_name;
var nav = require('navigation');
var loading = Alloy.createController("loading");

if(Ti.Platform.osname == "android"){
	$.pageTitle.text = title;
}else{
	$.win.title = title;
}

function init(){
	$.win.add(loading.getView());
	loading.start();
	var usersModel = Alloy.createCollection('users');
	user = usersModel.getPrincipleData();
	API.callByGet({url: "getClaimDetailUrl", params: "EMPNO="+user.empno+"&CORPCODE="+user.corpcode+"&PERIOD=ALL"}, function(responseText){
		var res = JSON.parse(responseText);
		   if(res.length == 0){
		   }else if( typeof res[0].message !== "undefined"){
			//console.log('got error message');
		   		common.createAlert(res[0].message);
		   }else{
				render(res);
		   }
		loading.finish();	   
	});
}

init();

function render(data){
	data = _.sortBy(data, "visitdate");
	data.reverse();
	
	data.forEach(function(entry){
		//console.log(entry);  
		var row = $.UI.create("TableViewRow",{ 
			height: 130, 
			status: entry.status,
		});
		 
		var statusColor = "#CE1D1C"; //rejected
		if(entry.status == "Pending"){ //Pending 
			statusColor = "#8A6500";
		}else if(entry.status == "Approved"){ //Approved 
			statusColor = "#2C8A00";
		} 
		
		var horzView = $.UI.create('View',{
			classes: ['horz', 'hsize','wfill'], 
			serial: entry.serial ,
			appcode: entry.appcode,
			status: entry.status,
		});
		
		var statustView = $.UI.create('View',{ 
			height: 130, 
			serial: entry.serial,
			appcode: entry.appcode,
			width: 10,
			backgroundColor: statusColor
		});
		horzView.add(statustView);
			
		var view_container = $.UI.create("View",{
			classes: ['vert','hsize'],
			width: "auto",
			record: entry,
			claimType:entry.claimType,
			serial: entry.serial,
			appcode: entry.appcode,
			top: 5,
			right: 5,
			left: 5,
			bottom: 5,
		});
		 
		var view_detail = $.UI.create("View",{
			height: 35,
			classes: ['wfill'], 
			serial: entry.serial,
			touchEnabled:false,
			appcode: entry.appcode, 
			claimType:entry.claimType
		});
		
		
		var labelClinicView = $.UI.create("View",{  
			serial: entry.serial,
			appcode: entry.appcode,
			touchEnabled:false,
			height: 35,
			top:0,
			claimType:entry.claimType
		});
		
		var label_clinic = $.UI.create("Label",{ 
			classes: ['h5','bold'],
			text:entry.clinicname,
			claimType:entry.claimType,
			top: 0,
			left: 0,
			width: "70%", 
			serial: entry.serial,
			appcode: entry.appcode,
			touchEnabled:false,
		});
		labelClinicView.add(label_clinic);
		
		var label_amount = $.UI.create("Label",{
			classes: ['amount','bold'],
			serial: entry.serial,
			appcode: entry.appcode,
			claimType:entry.claimType,
			text: "RM "+ (entry.amount).toFixed(2),
			right:20,
			touchEnabled:false,
			
		});
		
		var view_detail2 = $.UI.create("View",{ 
			serial: entry.serial,
			appcode: entry.appcode,
			claimType:entry.claimType, 
			touchEnabled:false,
			classes: [ "hsize"]
		});
		
		var label_category = $.UI.create("Label",{
			classes: ['h5','hsize','wsize','left-align'],
			serial: entry.serial,
			appcode: entry.appcode,
			left:0,
			touchEnabled:false,
			claimType:entry.claimType,
			text: "Category: "+entry.category
		});
		
	 
		var label_date = $.UI.create("Label",{ 
			serial: entry.serial,
			appcode: entry.appcode,
			claimType:entry.claimType,
			touchEnabled:false,
			text: timeFormat(entry.visitdate),
			right: 10,
			classes: ['h5','hsize','wsize','right-align'],
		}); 
	 
		var label_name = $.UI.create("Label",{
			classes: ['h5','hsize','wfill','left-align'],
			serial: entry.serial,
			touchEnabled:false,
			appcode: entry.appcode,
			claimType:entry.claimType, 
			text: "Claim Under: "+entry.name
		});
		
		var label_mc = $.UI.create("Label",{
			classes: ['mc'],
			serial: entry.serial,
			touchEnabled:false,
			appcode: entry.appcode,
			claimType:entry.claimType,
			text: "MC Days: "+entry.mcdays
		});
		var claim_type_text = (entry.claimType == "Reimbursement")?entry.claimType:entry.claimtype+" [Details]";
		var label_claimType = $.UI.create("Label",{
			classes: ['h5','hsize','wfill','left-align'],
			serial: entry.serial,
			appcode: entry.appcode,
			claimType:entry.claimType,
			touchEnabled:false,
			text: "Claim Type: "+claim_type_text
		});
		var forwardImg = $.UI.create('ImageView',{
				classes : ['wsize', 'hsize'],
				image : "/images/btn-forward.png",
				width: 15,
				zIndex: 10,
				touchEnabled:false,
				right:5,
				top:2
			});  
			 
		//
		/**var label_status = $.UI.create("Label",{
			classes: ['mc'],
			serial: entry.serial,
			claimType:entry.claimType,
			text: "Status: "+entry.status
		});**/
		view_detail.add(labelClinicView);
		view_detail.add(label_amount);
		view_detail.add(forwardImg);
		view_detail2.add(label_category);
		view_detail2.add(label_date);
		view_container.add(view_detail); 
		view_container.add(label_name); 
		view_container.add(label_mc);
		view_container.add(label_claimType);
		view_container.add(view_detail2);
		//view_container.add(label_status);
		horzView.add(view_container);
		row.add(horzView);
		$.tv.appendRow(row);
		
		view_container.addEventListener("click", function(e){
			var status = parent({name: "status"}, e.source);
			console.log(status+" status");
			if(status == "Pending"){ 
				nav.navigateWithArgs("asp/claimSubmission", {serial: e.source.serial, edit:1});
				//common.createAlert('Claim Details', 'Sorry, the claim details is not available.');
				return false;
			}else{ 
				nav.navigateWithArgs("asp/claimDetail", {serial: e.source.serial, appcode: e.source.appcode, record: e.source.record});
			}
			
		});
	});	
}

$.win.addEventListener("close", function(){
	
});

if(Ti.Platform.osname == "android"){
	$.btnBack.addEventListener('click', function(){  
		nav.closeWindow($.win); 
	});
}