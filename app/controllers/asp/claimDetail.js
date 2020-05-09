var args = arguments[0] || {}; 
var arg_serial = (typeof args.serial != "undefined")?args.serial:0;
var loading = Alloy.createController("loading");
var img_path = "";
console.log(args);
if(args.rcpfile != ""){
    img_path = "http://ereceipt.aspmedic.com/ereceipt/"+args.rcpfile;
    console.log('yes');
}else if(args.appcode.charAt(0) != "T"){
	if(OS_IOS){
		$.win.setRightNavButton(null);
	}else{
		$.recepit.hide();
	}
}else{
    img_path = "https://tslip.aspmedic.com/"+args.appcode+".png";
}
console.log(img_path);



function init(){
    $.win.add(loading.getView());
    $.status_view.opacity = 0;
    loading.start();
    loadBasicInfo();
    Alloy.Globals.API.callByGet({url: "claimdetails.aspx", params: "SERIAL="+arg_serial}, {
        onload: function(responseText){
        	var res = JSON.parse(responseText);
		   if(res.length == null || res.length <= 0){
		   }else if( typeof res[0] !== "undefined" && typeof res[0].message !== "undefined"){
		   		Alloy.Globals.common.createAlert(res[0].message);
		   }else{
				loadDetail(res[0] || []);
		   }
	   }, onfinish: function(){
	       loading.finish();
	   }, onerror: function(){
            $.win.close();
       }
   });
   // Alloy.Globals.API.claimDetailBySeries({serial : arg_serial}, loadDetail);
}

init();

function loadBasicInfo(){
    var indicator_bg_color = (args.status == "Pending")?"#fba81c":(args.status == "Approved")?"#55a939":"#e8534c";
    $.status_view.borderColor = indicator_bg_color;
    $.status.color = indicator_bg_color;
    
    var key_to_load = ['status', 'name','category','claimtype', 'mcdays', 'memno', 'visitdate', 'clinicname', 'amount'];
    for (var i=0; i < key_to_load.length; i++) {
       // var text = ;
        $[key_to_load[i]].text = (args[key_to_load[i]])?($[key_to_load[i]].text||"")+" "+args[key_to_load[i]]:"-";
    };
}

function loadDetail(data){
    if(typeof data == "undefined"){
        $.status_view.animate({height: 60, width: 60, opacity:1, duration: 500});
        loading.finish();
        return;
    }
    var key_to_load = ['medication_amt', 'injection_amt','labtest_amt','xray_amt', 'surgical_amt', 'extraction_amt', 'fillings_amt', 'scaling_amt', 'others_amt', 'bps', 'bpd', 'pulse','diagnosis', 'consultation_amt'];
    for (var i=0; i < key_to_load.length; i++) {
       // $[key_to_load[i]].text = args[key_to_load[i]] || $[key_to_load[i]].text;
        if(typeof data[key_to_load[i]] != "undefined"){
            $[key_to_load[i]].parent.data = data[key_to_load[i].slice(0, -4)];
            $[key_to_load[i]].text = (data[key_to_load[i]])?($[key_to_load[i]].text||"")+" "+data[key_to_load[i]]:"-";
        }
    };
    $.status_view.animate({height: 60, width: 60, opacity:1, duration: 500});
    loading.finish();
}

function view_detail(e){
    e.source.backgroundColor = "#f58505";
    e.source.animate({backgroundColor: "#fff", duration: 500});
    if(e.source.data != "" && typeof e.source.data != "undefined"){
        alert(e.source.data);
    }
}

function openReceipt(){
    console.log(img_path);
	Alloy.Globals.common.lightbox({img_path: img_path}, $.win);
}

if(Ti.Platform.osname == "android"){
	$.btnBack.addEventListener('click', function(){  
		Alloy.Globals.nav.closeWindow($.win); 
	});
}

$.win.addEventListener("close", function(){
});