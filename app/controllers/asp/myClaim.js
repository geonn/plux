var args = arguments[0] || {};  
var loading = Alloy.createController("loading");
$.win.add(loading.getView());
loading.start();
	
loadPage();

function timeFormat(datetime){
	var timeStamp = datetime.split(" ");
	var newFormat;
	var ampm = "am";
	var date = timeStamp[0].split("-");
	if(timeStamp.length == 1){
		newFormat = date[2]+"/"+date[1]+"/"+date[0] ;
	}else{
		var time = timeStamp[1].split(":");
		if(time[0] >= 12){
			ampm = "pm";
			time[0] = time[0] - 12;
		}

		newFormat = date[2]+"/"+date[1]+"/"+date[0] + " "+ time[0]+":"+time[1]+ " "+ ampm;
	}

	return newFormat;
}

function loadPage(){
    $.insurance_info.hide();
    console.log("loadPage "+isver );
	var isver = Ti.App.Properties.getString('isver');
	var corpcode = Ti.App.Properties.getString('corpcode');
	var memno = Ti.App.Properties.getString('memno');//"AGIL00005";//
	var empno = Ti.App.Properties.getString('empno');
	if(isver == "true" || isver > 0){
		$.claimContainer.show();
		//Alloy.Globals.API.claimInfo({memno : memno, corpcode : corpcode});
		callbyget({url: "balchk.aspx", params: "MEMNO="+memno+"&CORPCODE="+corpcode, callback: init});
		var params = "EMPNO="+empno+"&CORPCODE="+corpcode;//"EMPNO=05152314&CORPCODE=IFMY";
		callbyget({url: "ifins.aspx", params: params, callback: loadIfins});//"EMPNO="+empno+"&CORPCODE="+corpcode
		//Alloy.Globals.API.ifins({empno : empno, corpcode : corpcode});
		
	}else{ 
		loading.finish();
	}
}

function callbyget(e){
    Alloy.Globals.API.callByGet({url: e.url, params: e.params}, {
        onload: function(responseText){
           var res = JSON.parse(responseText);
           if(res.length == null || res.length <= 0){
               if(e.url == "balchk.aspx"){
                    var row = $.UI.create("View", {classes:['wfill','hsize','padding','rounded'], bottom: 0, backgroundColor: "#fff"});
                    var view_container = $.UI.create("View", {classes:['wfill','hsize','padding'], touchEnabled: false });
                    var label = $.UI.create("Label", {classes:['wfill','hsize','h5'], textAlign:"center", text: "No Entitlement found"});
                    row.add(view_container);
                    view_container.add(label);
                    $.personal_claim.add(row);
                }
           }else if( typeof res[0] !== "undefined" && typeof res[0].message !== "undefined"){
            //console.log('got error message');
                Alloy.Globals.common.createAlert(res[0].message);
           }else{
                e.callback(res || []);
           }
       }, onfinish: function(){
           if(e.url == "balchk.aspx"){
                loading.finish();
           }
       }, onerror: function(){
            $.win.close();
       }
   });
}
	
Ti.App.addEventListener("data_loaded", init);

function loadIfins(ifins){
	ifins = ifins[0];
	$.EmpIns.text = ifins.EmpIns;
	$.SpouseIns.text = ifins.SpouseIns;
	$.ChildIns.text = ifins.ChildIns;
    $.InsPlan.text = ifins.InsPlan;
    $.AddIns.text = ifins.AddIns;
    $.InsPlanUrl.InsPlanUrl = ifins.InsPlanUrl;
    $.insurance_info.show();
}

function openPdf(e){
	console.log(encodeURI(e.source.InsPlanUrl)+" encodeURI(e.source.InsPlanUrl)");
	if(OS_IOS){
		var win = Alloy.createController("webview", {url: encodeURI(e.source.InsPlanUrl)}).getView();
		 win.open();
	}else{
		var url = e.source.InsPlanUrl;
		var PDF = require('pdf'); 
		PDF.createPdf(url, true, "", "", "", function(err, file, base, url){
			PDF.android_launch(file);
		});
	}
	 
}

function init(e){
    
 	var month = ['January','February','March','April','May','June','July','August','September','October','November','December'];
 	
	if(e == ""){
		alert("No records found");
		return false;
	}
	$.date.text = timeFormat(Alloy.Globals.common.now());
 
	var groups = {};
	var balance_groups = {};
	var balance_user_groups = {}; 
	for(var i=0; i < e.length; i++){
		var val = e[i];
		groups[val.name] = groups[val.name] || [];
   	    groups[val.name].push( val );
	}
	console.log("after");
	console.log(groups);
	Object.keys(groups).map( function( group ){
	    var personal_claim_view = Alloy.createController("asp/_personal_claim_view", {data: groups[group], name: group, category: groups[group]['category']}).getView();
	    $.personal_claim.add(personal_claim_view);
	});
	loading.finish();
}


if(Ti.Platform.osname == "android"){
	$.btnBack.addEventListener('click', function(){  
		Alloy.Globals.nav.closeWindow($.win); 
	});
}

$.win.addEventListener("close", function(){
	$.destroy();
});
