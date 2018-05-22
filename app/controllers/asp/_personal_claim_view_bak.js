var args = arguments[0] || {}; 
$.name.text = args.name;

for (var i=0; i < args.data.length; i++) {
  var view_container = $.UI.create("View",{classes: ['padding', 'wfill', 'hsize', 'vert'], bottom:0});
  
  var typeHeaderView = $.UI.create("View",{classes: ['wfill', 'hsize']});
  var view_label_type = $.UI.create("View", {classes:['wsize','hsize', 'rounded'], borderRadius: 8, bottom: -8, left: 20, backgroundColor: "#22262f",});
  var label_type = $.UI.create("Label", {classes:['wsize','hsize', 'h7', 'small_padding'], bottom:10, color: "#ffffff", text: args.data[i].benefittype});
  
  if(args.data[i].entidvbal < 99999){
  	var totBal = args.data[i].entidvbal;
  }
  
  if(args.data[i].entshabal < 99999){
  	var totBal = args.data[i].entshabal;
  }
  
  var textTotBal = "RM "+ totBal;
  if(totBal == "9999"){
  	textTotBal = "Unlimited";
  }
  var corpcode = Ti.App.Properties.getString('corpcode'); 
  console.log(args.data[i].benefittype+" "+i);
  if(corpcode == "SANTECH" && args.data[i].benefittype == "MATERNITY"){
  	textTotBal = "T&C Apply";
  }else if(corpcode == "SANTECH" && args.data[i].benefittype == "EXECUTIVE HEALTH SCREENING"){
  	textTotBal = "As Charge";
  }
  
  view_label_type.add(label_type);
  typeHeaderView.add(view_label_type);
  
  view_container.add(typeHeaderView);
  if(args.data[i].entidvbal < 99999){
      var view_row = $.UI.create("View", {classes:['wfill','hsize']});
     var balance = Math.ceil(((args.data[i].entidv-args.data[i].entidvbal)/args.data[i].entidv)*100);
  	 render_row({balance: balance, });
  	 view_container.add(generate_progressBar(balance+"%"));
  	 var view1 = $.UI.create("View", {classes:['wfill'], height: 40});
  	 var view_progress_balance = $.UI.create("View", {classes:['wsize','hsize', 'rounded'], borderRadius: 8, top: -8, right: 20, backgroundColor: "#22262f",});
     var label_progress_balance = $.UI.create("Label", {classes:['wsize','hsize', 'h7', 'small_padding'], top:10, color: "#ffffff", text: balance+"% used"});
     view_progress_balance.add(label_progress_balance);
     view1.add(view_progress_balance);
  	 var view_sub_info = $.UI.create("View", {classes:['wfill','horz'], right: 40, height: 40});
  	 view1.add(view_sub_info);
  	 view_container.add(view1); 
  	 
    view_sub_info.add(generate_description("BALANCE ", "RM "+args.data[i].entidvbal, textTotBal));  
    view_sub_info.add($.UI.create("View", {width:1, height: 30, backgroundColor: "#eeeeee", left: 10, right: 10}));
  	if(corpcode == "SANTECH" && args.data[i].benefittype == "MATERNITY"){
  	    view_sub_info.add(generate_description("LIMIT", "RM "+args.data[i].entidvbal , "T&C Apply"));
  	}else if(corpcode == "SANTECH" && args.data[i].benefittype == "EXECUTIVE HEALTH SCREENING"){
  		view_sub_info.add(generate_description("LIMIT", "RM "+args.data[i].entidvbal , "As Charge"));
  	}else if(args.data[i].entidv == "9999"){
  	 	view_sub_info.add(generate_description("LIMIT", "RM "+args.data[i].entidvbal , "Unlimited"));  
  	}else{
  		view_sub_info.add(generate_description("LIMIT ", "RM "+args.data[i].entidvbal, "RM "+args.data[i].entidv));  
  	}
  	 
  }
  
  if(args.data[i].entshabal < 99999){  
  	 var share_balance = Math.ceil(((args.data[i].entsha-args.data[i].entshabal)/args.data[i].entsha)*100);  
  	 view_container.add(generate_progressBar(share_balance+"%"));
  	 
  	 if(args.data[i].entsha == "9999"){
  	 	view_container.add(generate_description("Shared Limit: ", args.data[i].entshabal, "Unlimited"));  
  	 }else{
  	 	view_container.add(generate_description("Shared Limit: RM ", args.data[i].entshabal, args.data[i].entsha));  
  	 } 
  	 //view_container.add(generate_description("Shared Limit: RM ",args.data[i].entshabal, args.data[i].entsha));  
  }
  
  if(args.data[i].benefittype != "SPECIALIST"){
  	if(args.data[i].relation == "PRINCIPLE"){
  		if(args.data[i].vstidvbal != "99999"){	
		  if(args.data[i].vstidvbal == "9999"){
		  	 	view_container.add(generate_description("No. Visit "+args.data[i].vstTitle+": ", args.data[i].vstshabal, "Unlimited"));  
		  }else{
		  	 	view_container.add(generate_description("No. Visit "+args.data[i].vstTitle+": ", args.data[i].vstidvbal, args.data[i].vstidvbal));  
		  } 
		 }
	}else{
		if(args.data[i].vstidvbal != "99999" && args.data[i].vstshabal != "99999" ){	
		 if(args.data[i].vstidvbal == "9999"){
		  	 	view_container.add(generate_description("No. Visit "+args.data[i].vstTitle+": ", args.data[i].vstshabal, "Unlimited"));  
		  }else{ 
		  	 	view_container.add(generate_description("No. Visit "+args.data[i].vstTitle+": ", args.data[i].vstshabal, args.data[i].vstshabal));  
		 }  	
	  }
	  
	  
	  if(args.data[i].vstshabal != "99999"  ){	
		 if(args.data[i].vstshabal == "9999"){
		  	 	view_container.add(generate_description("No. Visit "+args.data[i].vstTitle+" (shared): ", args.data[i].vstshabal, "Unlimited"));  
		  }else{
		  	 	view_container.add(generate_description("No. Visit "+args.data[i].vstTitle+" (shared): ", args.data[i].vstshabal, args.data[i].vstshabal));  
		 }  	
	  }
	  
	  
	}
  }
  
  if(args.data[i].maxperclaim != "99999"){
 	 view_container.add(generate_description("Limit Per Claim: RM ", args.data[i].maxperclaim, args.data[i].maxperclaim));
  }  	 
  $.main.add(view_container);
};

function render_row(e){
    
    // console.log(balance);
     view_container.add(generate_progressBar(e.balance+"%"));
     var view1 = $.UI.create("View", {classes:['wfill'], height: 40});
     var view_progress_balance = $.UI.create("View", {classes:['wsize','hsize', 'rounded'], borderRadius: 8, top: -8, right: 20, backgroundColor: "#22262f",});
     var label_progress_balance = $.UI.create("Label", {classes:['wsize','hsize', 'h7', 'small_padding'], top:10, color: "#ffffff", text: balance+"% used"});
     view_progress_balance.add(label_progress_balance);
     view1.add(view_progress_balance);
     var view_sub_info = $.UI.create("View", {classes:['wfill','horz'], right: 40, height: 40});
     view1.add(view_sub_info);
     view_container.add(view1); 
     
    view_sub_info.add(generate_description("BALANCE ", "RM "+args.data[i].entidvbal, textTotBal));  
    view_sub_info.add($.UI.create("View", {width:1, height: 30, backgroundColor: "#eeeeee", left: 10, right: 10}));
    if(corpcode == "SANTECH" && args.data[i].benefittype == "MATERNITY"){
        view_sub_info.add(generate_description("LIMIT", "RM "+args.data[i].entidvbal , "T&C Apply"));
    }else if(corpcode == "SANTECH" && args.data[i].benefittype == "EXECUTIVE HEALTH SCREENING"){
        view_sub_info.add(generate_description("LIMIT", "RM "+args.data[i].entidvbal , "As Charge"));
    }else if(args.data[i].entidv == "9999"){
        view_sub_info.add(generate_description("LIMIT", "RM "+args.data[i].entidvbal , "Unlimited"));  
    }else{
        view_sub_info.add(generate_description("LIMIT ", "RM "+args.data[i].entidvbal, "RM "+args.data[i].entidv));  
    }
}

function generate_progressBar(filled){
	var view_progressBar = $.UI.create("View",{
		classes: ['progressBar']
	});
	  
	var view_progressBarFill = $.UI.create("View",{
		classes: ['progressBarFill'],
		width: filled
	});
	
	view_progressBar.add(view_progressBarFill);
	return view_progressBar;
}

function generate_description(desc, balance, limit){
    var view = $.UI.create("View",{classes:['vert','wsize'], width: "40%", bottom: 0, top:5, height: 40});
    
    var label_category_title = $.UI.create("Label", {classes:['wsize','hsize','h6'], left:0, text: desc});
    var label_category = $.UI.create("Label", {classes:['wsize','hsize','h6','bold'], left:0, minimumFontSize: 10, text: limit});
    view.add(label_category_title);
    view.add(label_category);
    return view;
}

$.personalClaimVw.addEventListener("click", function(){
	var nav = require('navigation');
	nav.navigateWithArgs("asp/claimHistory", {name: args.name});
});
