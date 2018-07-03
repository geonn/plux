var args = arguments[0] || {};
var medicalAttachmentModel = Alloy.createCollection('medicalAttachment');
var loading = Alloy.createController("loading");
var u_id = Ti.App.Properties.getString('u_id'); 

function newRecord(){
    nav.navigateWithArgs("addMedicalRecord"); 
    /*
	loading.start();
	API.callByPost({url: "addUpdateMedicalRecord", params:{title: "untitled - "+ common.now(), u_id: u_id}}, function(responseText){
		var model = Alloy.createCollection("medicalRecordsV2");
		var res = JSON.parse(responseText);
		var arr = res.data || null;
		model.saveArray(arr);
		loading.finish();
		nav.navigateWithArgs("editMedical", {id: arr[0].id}); 
	});*/
}

function render_listing(data){
    $.listing.removeAllChildren();
	for (var i=0; i < data.length; i++) {
	    var left_indicator_bg_color = "#55a939";
		var row = $.UI.create("View", {classes:['wfill','padding','hsize','rounded'], bottom: 0, backgroundColor: left_indicator_bg_color, record: data[i]});
        var view_container = $.UI.create("View", {classes:['wfill','hsize', 'vert'], touchEnabled: false, backgroundColor: "#fff", left: 5});
        var view_container_bottom = $.UI.create("View", {classes:['wfill','hsize'], touchEnabled: false,});
        var view_left_content = $.UI.create("View", {classes:['hsize','vert'], touchEnabled: false, width: "60%", left: 10, bottom:10});
        var label_title = $.UI.create("Label", {classes:['wfill','hsize','h6'], left:10, top:10, touchEnabled: false, text: "TITLE"});
        var label_title_value = $.UI.create("Label", {classes:['wfill','hsize','h6','bold'], left: 10, touchEnabled: false, minimumFontSize: 10, text: data[i].title});
        view_container.add(label_title);
        view_container.add(label_title_value);
        
        var label_category = $.UI.create("Label", {classes:['wfill','hsize','h6'], touchEnabled: false, top:5, text: "CATEGORY"});
        var label_category_value = $.UI.create("Label", {classes:['wfill','hsize','h6','bold'], touchEnabled: false, minimumFontSize: 10, text: data[i].category});
        view_left_content.add(label_category);
        view_left_content.add(label_category_value);
        
        var view_right_container = $.UI.create("View", {classes:['hsize', 'vert'], touchEnabled: false, width: "40%", right: 10, bottom:10});
        var label_updated = $.UI.create("Label", {classes:['wfill','hsize','h6'], touchEnabled: false, top:5, text: "DATE"});
        var label_updated_value = $.UI.create("Label", {classes:['wfill','hsize','h6','bold'], touchEnabled: false, minimumFontSize: 10, text: data[i].updated});
        view_right_container.add(label_updated);
        view_right_container.add(label_updated_value);
        
        view_container_bottom.add(view_right_container);
        view_container_bottom.add(view_left_content);
        view_container.add(view_container_bottom);
        row.add(view_container);
        
        var delete_button = $.UI.create("Label", {classes:['h5'], text: "X", top: 5, right: 5, width: 20, height: 20, bubbleParent: false});
        row.add(delete_button);
        
        delete_button.addEventListener("click", deleteRecord);
        row.addEventListener("click", recordClicked);
        $.listing.add(row);
	};
}

function recordClicked(e){
    if(typeof e.source.record.validation_code !="undefined" && e.source.record.validation_code != "" && e.source.record.category == "Lab report"){
        keyInPin(e.source.record.validation_code, e);
    }else{
        openAttachment(e);
    }
}

function keyInPin(ic, ex){
    console.log(ic);
    var view = $.UI.create("View", {classes:['wfill','hsize','vert'],left:10, right:10, zIndex: 9, backgroundColor: "#ccc"});
    var text = $.UI.create("Label", {classes:['wfill','hsize','h6','padding'], text: "Please key in your IC / Passport to open this file."});
    var textfield = $.UI.create("TextField", {classes:['wfill','padding'],top:0, height: 42});
    var ok_button = $.UI.create("Button", {classes:['wfill',"padding"], borderRadius:0, top:0, bottom:10, height: 50, title: "Ok"}); 
    var mask = $.UI.create("View",{
        zIndex: 8,
        classes:['wfill','hfill'],
        backgroundColor: "#80000000"
    });
    mask.addEventListener("click", function(){
        $.win.remove(mask);
        $.win.remove(view);
    });
    ok_button.addEventListener("click", function(e){
        console.log(textfield.value+" "+ic);
        if(textfield.value == ic){
            openAttachment(ex);
        }else{
            alert("NRIC / Passport is not match");
        }
        $.win.remove(mask);
        $.win.remove(view);
    });
    view.add(text);
    view.add(textfield);
    view.add(ok_button);
    $.win.add(mask);
    $.win.add(view);
}

function openAttachment(e){
    console.log(e.source.record);  
    var file_format = e.source.record.attachment.substr(-3);
    if(file_format == "pdf"){
        openURLPDF(e.source.record);
    }else{
        var html = "<img width='100%' height='auto' src='"+e.source.record.attachment+"'/>";
        if(OS_IOS){
            nav.navigationWindow("webview","","", {url: e.source.record.attachment, title: e.source.record.category});
            //var webview = $.UI.create("WebView", {backgroundColor: "#000",  zIndex: 12, classes:['wfill','hsize'], url: e.source.record.attachment});
        }else{
            nav.navigationWindow("webview","","", {content: html, title: e.source.record.category});
            //var webview = $.UI.create("WebView", {backgroundColor: "#000",  zIndex: 12, classes:['wfill','hsize'], html: html});
        }
        //$.win.add(webview);   
    }
}

function openURLPDF(e) {
    loading.start();
    var filename = e.attachment.split("/");
    filename = filename[filename.length - 1];
    console.log(filename);
    var appFile;
    
    if(OS_ANDROID) {
        appFile = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, filename); 
    } else {
        appFile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, filename);
    }
    var appfilepath = appFile.nativePath;
    
    //Check if file has been downloaded yet
    if(appFile.exists()===false) {
        var xhr = Ti.Network.createHTTPClient();
        xhr.onload = function() {
            appFile.write(this.responseData);
            viewPDF(appfilepath);
        };
        xhr.onerror = function() {
            alert("Cannot retrieve PDF form web site");
        };
        xhr.timeout = 10000;
        xhr.open("GET", e.attachment);
        xhr.send();
    
    } else {
        viewPDF(appfilepath);   
    }
}

function viewPDF(appfilepath) {
    if(OS_ANDROID) {
        try{
            Ti.Android.currentActivity.startActivity(Ti.Android.createIntent({
                action: Ti.Android.ACTION_VIEW,
                type: 'application/pdf',
                data: appfilepath
            }));
        } catch(e) {
            Ti.API.info('error trying to launch activity, e = '+e);
            alert('No PDF apps installed!');
        }
    } else {
        docViewer = Ti.UI.iOS.createDocumentViewer({url:appfilepath});
        docViewer.show();
    }
    loading.finish();
}

function deleteRecord(e){
    
    console.log(e.source.parent.record);
    popup({title: "Delete",message: "Are you sure to delete this record?",callback: function(){
        API.callByPost({url: "changeMedicalRecord", new: true, domain: "FREEJINI_DOMAIN", params:{id: e.source.parent.record.id, status: 2}}, function(responseText){
            var res = JSON.parse(responseText);
            console.log(res);
            refresh();
        });
    }});
}

function closeBox(){
    $.mask.hide();
    $.win.remove($.win.children[$.win.children.length - 1]);
}

function refresh(){
	loading.start();
	
	API.callByPost({url: "getMedicalAttachmentList", new: true, domain: "FREEJINI_DOMAIN", params:{u_id: u_id}}, function(responseText){
		var res = JSON.parse(responseText);
        var arr = res.data || [];
        console.log(arr);
        render_listing(arr);
        loading.finish();
		/*var model = Alloy.createCollection("medicalRecordsV2");
		
		model.saveArray(arr);
		
		API.callByPost({url: "getMedicalAttachment", params:{u_id: u_id}}, function(responseText){
			var model2 = Alloy.createCollection("medicalAttachmentV2");
			var res2 = JSON.parse(responseText);
			var arr2 = res2.data || null;
			model2.saveArray(arr2);
			
			
			loading.finish();
		});*/
	});
}

function init(){
	$.win.add(loading.getView());
	refresh();
	
	$.mask.hide();
}

init();

if(OS_ANDROID){ 
	$.btnBack.addEventListener('click', function(){ 
		$.win.close(); 
	});
}

Ti.App.addEventListener('myMedicalRecord:refresh', refresh);

$.win.addEventListener("close", function(){
	Ti.App.removeEventListener('myMedicalRecord:refresh', refresh);
	$.destroy();
	console.log("window close");
});
