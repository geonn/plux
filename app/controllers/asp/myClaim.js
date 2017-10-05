var args = arguments[0] || {};  
var usersModel = Alloy.createCollection('users');
var loading = Alloy.createController("loading");

common.construct($);
$.win.add(loading.getView());
loading.start();
	
loadPage();

function loadPage(){
	
	user = usersModel.getPrincipleData();
	if(user.isver == "true" || user.isver > 0){
		$.verifyContainer.hide();
		$.claimContainer.show();
		API.claimInfo({memno : user.memno, corpcode : user.corpcode});
		//API.getClaimDetail({empno : user.empno, corpcode : user.corpcode});
		API.ifins({empno : user.empno, corpcode : user.corpcode});
	}else{ 
		$.description.text= "You need to verify your account in order to view claim details. If you didn't received verification email, please click 'Resend Verification' button below.";
		$.verifyContainer.show();
		$.claimContainer.hide();
		loading.finish();
	}
	
}
  
function checkStatus(){
	var asp_email = Ti.App.Properties.getString('asp_email');
	if(typeof asp_email != "undefined" && asp_email != ""){
		//Ti.App.addEventListener('loadPage', loadPage);
		loading.start();
		loadPage();
		//API.doLogin(asp_email, asp_password, $, "refresh", loadPage);
	}else{
		common.createAlert("Error", "Please login your ASP account", function(e){$.win.close();});
	}
} 
		
Ti.App.addEventListener("data_loaded", init);
Ti.App.addEventListener('ifins_loaded', loadIfins);

function loadIfins(){
	var ifins = JSON.parse(Ti.App.Properties.getString('ifins'));
	ifins = ifins[0];
	console.log(ifins);
	var container = $.UI.create("View", {classes:['wfill','hsize','vert','box', 'rounded'], left: 10, top: 0, right: 10});
	var label_EmpIns = $.UI.create("Label", {classes: ['wfill','hsize','padding'], text: "Employee Number: "+ifins.EmpIns});
	var label_SpouseIns = $.UI.create("Label", {classes: ['wfill','hsize','padding'], top:0, text: "Spouse Issured: "+ifins.SpouseIns});
	var label_ChildIns = $.UI.create("Label", {classes: ['wfill','hsize','padding'],top:0, text: "Child Inssured: "+ifins.ChildIns});
	var label_InsPlan = $.UI.create("Label", {classes: ['wfill','hsize','padding', 'bold'],top:0, text: "Insurance Plan: "+ifins.InsPlan});
	var label_Room = $.UI.create("Label", {classes: ['wfill','hsize','padding'],top:0, text: "Room: "+ifins.Room});
	var label_AddIns = $.UI.create("Label", {classes: ['wfill','hsize','padding'],top:0, text: "Additional Information: "+ifins.AddIns});
	var icon_pdf = $.UI.create("ImageView", {classes: ['hsize'], width: 40, image: "/images/pdf_logo.png"});
	container.add(label_EmpIns);
	container.add(label_SpouseIns);
	container.add(label_ChildIns);
	container.add(label_Room);
	container.add(label_AddIns);
	container.add(label_InsPlan);
	container.add(icon_pdf);
	icon_pdf.addEventListener("click", openPdf);
	$.insurance_info.add(container);
}

function openPdf(){
	var ifins = JSON.parse(Ti.App.Properties.getString('ifins'));
	ifins = ifins[0];
	console.log(encodeURI(ifins.InsPlanUrl));
	if(OS_IOS){
		var win = Alloy.createController("webview", {url: encodeURI(ifins.InsPlanUrl)}).getView();
		 win.open();
	}else{
		var url = ifins.InsPlanUrl;
		var PDF = require('pdf'); 
		PDF.createPdf(url, true, "", "", "", function(err, file, base, url){
			PDF.android_launch(file);
		});
	}
	 
}

function init(){
	//var d = new Date();
	 
 	var month = ['January','February','March','April','May','June','July','August','September','October','November','December'];
 	
	var e = JSON.parse(Ti.App.Properties.getString('balchk'));
	
	if(e == ""){
		alert("No records found");
		return false;
	}
	var updated_date = currentDateTime();//Ti.App.Properties.getString('balchkUpdatedDate');
	$.date.text = timeFormat(updated_date);
 
	var groups = {};
	var balance_groups = {};
	var balance_user_groups = {}; 
	for(var i=0; i < e.length; i++){
		var val = e[i];
		/*if(val.entidvbal < 99999){
			balance_groups['entidvbal'] = balance_groups['entidvbal'] || [];
			balance_groups['entidvbal'].push(val);
		}
		
		if(val.entshabal < 99999){
			balance_groups['entshabal'] = balance_groups['entshabal'] || [];
			balance_groups['entshabal'].push(val);
		}
		if(val.vstidvbal < 99999){
			balance_groups['vstidvbal'] = balance_groups['vstidvbal'] || [];
			balance_groups['vstidvbal'].push(val);
		}
		if(val.vstshabal < 99999){
			balance_groups['vstshabal'] = balance_groups['vstshabal'] || [];
			balance_groups['vstshabal'].push(val);
		}*/
		
		groups[val.name] = groups[val.name] || [];
   	    groups[val.name].push( val );
	}
	
	 
	GenerateClaimBalanceTable(balance_groups);
	Object.keys(groups).map( function( group ){ 
		//GenerateClaimBalanceTable({claim_data: groups[group], name: group});
	    var personal_claim_view = Alloy.createController("asp/_personal_claim_view", {data: groups[group], name: group}).getView();
	    $.personal_claim.add(personal_claim_view);
	});
	Ti.App.removeEventListener("data_loaded", init);
	loading.finish()
}

function GenerateClaimBalanceTable(balance_groups){
	var claim_balance_name = {"entidvbal": "Claim Balance", "entshabal": "Claim Shared Balance", "vstidvbal": "Visitation Balance", "vstshabal": "Visitation Shared Balance" };
	Object.keys(balance_groups).map( function( group ){
		var view_title = $.UI.create("View",{
			backgroundColor: "#CE1D1C",
			height: Ti.UI.SIZE,
			width: Ti.UI.FILL
		});
		
		var label_title = $.UI.create("Label",{
			classes: ['title'],
			color: "#ffffff",
			height: Titanium.UI.SIZE ,
			text: claim_balance_name[group],
		});
		
		view_title.add(label_title);
		$.view_balance.add(view_title);
		var tmp_group = {};
		for(var a = 0; balance_groups[group].length > a; a++){
			tmp_group[balance_groups[group][a]['name']] = tmp_group[balance_groups[group][a]['name']] || [];
			tmp_group[balance_groups[group][a]['name']].push(balance_groups[group][a]);
		}
		Object.keys(tmp_group).map( function( b ){
			
			var view_line = $.UI.create("View",{
					classes: ['line']
				});
			
			var view_header = $.UI.create("View", {
				width: Ti.UI.FILL,
				height: Ti.UI.SIZE,
				left:10,
				right:10,
				layout: "horizontal",
			});
			
			var label_name = $.UI.create("Label",{
				height: Ti.UI.SIZE,
				wordWrap: false,
				ellipsize: true,
				font:{
					fontSize: "16dp"
				},
				width: "70%",
				text: b,
			});
			
			var label_balance_limit = $.UI.create("Label",{
				height: Ti.UI.SIZE,
				wordWrap: false,
				ellipsize: true,
				font:{
					fontSize: "12dp"
				},
				width: "30%",
				text: "balance / limit",
			});
			view_header.add(label_name);
			view_header.add(label_balance_limit);
			$.view_balance.add(view_line);
			$.view_balance.add(view_header);
			for(var c = 0; tmp_group[b].length > c; c++){
				var view_category = $.UI.create("View",{
					width: Ti.UI.FILL,
					height: Ti.UI.SIZE,
					layout: "horizontal"
				});
				
				var label_category = $.UI.create("Label",{
					classes: ['subtitle'],
					text: tmp_group[b][c]['benefittype']
				});
				
				var label_amount = $.UI.create("Label",{
					classes: ['subvalue'],
					text: "RM "+tmp_group[b][c][group]
				});
				view_category.add(label_category);
				view_category.add(label_amount);
				
				$.view_balance.add(view_category);
			}
		});
	});
}


if(Ti.Platform.osname == "android"){
	$.btnBack.addEventListener('click', function(){  
		nav.closeWindow($.win); 
	});
}

$.win.addEventListener("close", function(){
	Ti.App.removeEventListener('ifinsPage', loadIfins);	
	Ti.App.removeEventListener('loadPage', loadPage);		
	Ti.App.removeEventListener("data_loaded", init);
	$.destroy();
});
