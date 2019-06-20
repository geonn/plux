var args = arguments[0] || {}; 
var corpcode = Ti.App.Properties.getString('corpcode'); 
$.name.text = args.name;

function init(){
    render_extra_info();
    render_balance_list();
}

init();

function render_extra_info(){
}

function changeTitleByCorpAndBenefit(textTotBal, benefittype){
    if(corpcode == "SANTECH" && benefittype == "MATERNITY"){
        textTotBal = "T&C Apply";
    }else if(corpcode == "SANTECH" && benefittype == "EXECUTIVE HEALTH SCREENING"){
        textTotBal = "As Charge";
    }
    return textTotBal;
} 

function setup_visit_row(e){
    var balance = Math.ceil(((e.limit-e.balance)/e.limit)*100);
    var textTotBal = "";
    switch(e.balance){
        case 9999:
            textTotBal = "UNLIMITED";
            break;
        case 99999:
            textTotBal = "-";
            break;
        default: 
            textTotBal = e.balance;
    }
    //var textTotBal = (e.balance == "9999")?"UNLIMITED":e.ent_type+e.balance;
    textTotBal = changeTitleByCorpAndBenefit(textTotBal, e.benefittype);
    var subvalue = (e.limit == "9999")?"UNLIMITED":e.limit;
    subvalue = changeTitleByCorpAndBenefit(subvalue, e.benefittype);
    return render_visit_row({balance: balance, textTotBal: textTotBal, title: e.entTitle.toUpperCase(), subtitle: e.subtitle, subvalue: subvalue, benefittype: e.benefittype, category: e.category, maxperclaim: e.maxperclaim});
}

function setup_row(e){
    var balance = Math.ceil(((e.limit-e.balance)/e.limit)*100);
    var textTotBal = "";
    switch(e.balance){
        case 9999:
            textTotBal = "UNLIMITED";
            break;
        case 99999:
            textTotBal = "-";
            break;
        default: 
            textTotBal = e.ent_type+e.balance;
    }
    //var textTotBal = (e.balance == "9999")?"UNLIMITED":e.ent_type+e.balance;
    textTotBal = changeTitleByCorpAndBenefit(textTotBal, e.benefittype);
    var subvalue = (e.limit == "9999")?"UNLIMITED":e.ent_type+e.limit;
    subvalue = changeTitleByCorpAndBenefit(subvalue, e.benefittype);
    return render_row({balance: balance, textTotBal: textTotBal, title: e.entTitle.toUpperCase(), subtitle: e.subtitle, subvalue: subvalue, benefittype: e.benefittype, category: e.category, maxperclaim: e.maxperclaim});
}

function render_balance_list(){
    for (var i=0; i < args.data.length; i++) {
        var view_container = $.UI.create("View",{classes: ['padding', 'wfill', 'hsize', 'vert'], record: args.data[i]});
        if(args.data[i].entidvbal < 99999){
            view_container.add(setup_row({limit: args.data[i].entidv, balance: args.data[i].entidvbal, benefittype: args.data[i].benefittype, entTitle: args.data[i].entTitle, category: "", subtitle: "LIMIT", ent_type: "RM ", maxperclaim: args.data[i].maxperclaim}));
        }
        if(args.data[i].entshabal < 99999){
            view_container.add(setup_row({limit: args.data[i].entsha, balance: args.data[i].entshabal, benefittype: args.data[i].benefittype, entTitle: args.data[i].entTitle, category: " | SHARED", subtitle: "SHARED LIMIT", ent_type: "RM ", maxperclaim: args.data[i].maxperclaim}));
        }
        if(args.data[i].vstidvbal < 99999){
            view_container.add(setup_visit_row({limit: args.data[i].vstidv, balance: args.data[i].vstidvbal, benefittype: args.data[i].benefittype, entTitle: "VISIT BALANCE", category: " | VISIT", subtitle: "VISIT LIMIT", ent_type: "VISIT: ", maxperclaim: args.data[i].maxperclaim}));
        }
        if(args.data[i].vstsha < 99999){
            view_container.add(setup_visit_row({limit: args.data[i].vstsha, balance: args.data[i].vstshabal, benefittype: args.data[i].benefittype, entTitle: "SHARED VISIT BALANCE", category: " | VISIT | SHARED", subtitle: "SHARED VISIT LIMIT", ent_type: "VISIT: ", maxperclaim: args.data[i].maxperclaim}));
        }
        
        if(args.data[i].maxperclaim != "99999"){
            view_container.add(generate_description("MAXIMUM AMOUNT PER CLAIM", args.data[i].maxperclaim, "100%"));
        }
        view_container.addEventListener("click", navToHistory);
        $.main.add(view_container);   
    }
}

function render_visit_row(e){
    var row = $.UI.create("View",{classes: ['wfill', 'hsize', 'vert'], touchEnabled: false});
   
    var view_sub_info = $.UI.create("View", {classes:['wfill','horz', 'hsize'], touchEnabled: false, right: 40});
    row.add(view_sub_info); 
     
    view_sub_info.add(generate_description(e.title, e.textTotBal));
    view_sub_info.add($.UI.create("View", {width:1, height: 30, touchEnabled: false, backgroundColor: "#eeeeee", left: 10, right: 10}));
    view_sub_info.add(generate_description(e.subtitle, e.subvalue));
    
    return row;
}

function render_row(e){
    var row = $.UI.create("View",{classes: ['wfill', 'hsize', 'vert'], touchEnabled: false});
    var view_label_type = $.UI.create("View", {classes:['wsize','hsize', 'rounded'], touchEnabled: false, borderRadius: 8, bottom: -8, left: 20, backgroundColor: "#22262f",});
    var label_type = $.UI.create("Label", {classes:['wsize','hsize', 'h7', 'small_padding'], touchEnabled: false, bottom:10, color: "#ffffff", text: e.benefittype});//+e.category});
    view_label_type.add(label_type);
    row.add(view_label_type);
    row.add(generate_progressBar(e.balance+"%"));
    var view1 = $.UI.create("View", {classes:['wfill','hsize'], touchEnabled: false});
    var view_progress_balance = $.UI.create("View", {classes:['wsize','hsize', 'rounded'], touchEnabled: false, borderRadius: 8, top: -8, right: 20, backgroundColor: "#22262f",});
    var label_progress_balance = $.UI.create("Label", {classes:['wsize','hsize', 'h7', 'small_padding'], touchEnabled: false, top:10, color: "#ffffff", text: e.balance+"% used"});
    view_progress_balance.add(label_progress_balance);
    view1.add(view_progress_balance);
    var view_sub_info = $.UI.create("View", {classes:['wfill','horz', 'hsize'], touchEnabled: false, right: 40});
    view1.add(view_sub_info);
    row.add(view1); 
     
    view_sub_info.add(generate_description(e.title, e.textTotBal));
    view_sub_info.add($.UI.create("View", {width:1, height: 30, touchEnabled: false, backgroundColor: "#eeeeee", left: 10, right: 10}));
    view_sub_info.add(generate_description(e.subtitle, e.subvalue));
    
    return row;
}

function generate_progressBar(filled){
	var view_progressBar = $.UI.create("View",{
		classes: ['progressBar'], touchEnabled: false
	});
	  
	var view_progressBarFill = $.UI.create("View",{
		classes: ['progressBarFill'], touchEnabled: false,
		width: filled
	});
	
	view_progressBar.add(view_progressBarFill);
	return view_progressBar;
}

function generate_description(title, value, width){
    var view = $.UI.create("View",{classes:['vert','wsize','hsize'], touchEnabled: false, width: width || "40%", bottom: 0, top:5});
    
    var label_category_title = $.UI.create("Label", {classes:['wsize','hsize','h6'], touchEnabled: false, left:0, text: title});
    var label_category = $.UI.create("Label", {classes:['wsize','hsize','h6','bold'], touchEnabled: false, left:0, minimumFontSize: 10, text: value});
    view.add(label_category_title);
    view.add(label_category);
  return view;
}

function navToHistory(e){
    var nav = require('navigation');
    nav.navigateWithArgs("asp/claimHistory", e.source.record);
}
