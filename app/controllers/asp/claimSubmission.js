var args = arguments[0] || {};
var mode = (args.mode == "update")? "UPDATE" : "INSERT";
var serial = args.serial || "";
var corpcode = Ti.App.Properties.getString('corpcode');
var empno = Ti.App.Properties.getString('empno');
var memno = Ti.App.Properties.getString('memno');
var name = Ti.App.Properties.getString('fullname');
var loading = Alloy.createController('loading'); 
var error_message = "";
var filedata = "";


function init(){
    console.log(corpcode+" check corpcode");
    var forms_arr = $.forms.getChildren();
    if(corpcode == "IFMY" || corpcode == "IFLP" ){
        for(var i=0; forms_arr.length > i; i++){
            console.log(forms_arr[i].id);
            if(forms_arr[i].id == "REMARKS" || forms_arr[i].id == "GSTAMT" || forms_arr[i].id == "MCDAYS" || forms_arr[i].id == "GLAMT" || forms_arr[i].id == "GLAMT"){
              
              $.forms.remove(forms_arr[i]);
          	}else if(forms_arr[i].id=="tnc"){
          		forms_arr[i].remove(forms_arr[i].children[1]);
          	}
        }
    }else if(corpcode == "SYNTHO"){
    	for(var i=0; forms_arr.length > i; i++){
            console.log(forms_arr[i].id);
            if(forms_arr[i].id == "GSTAMT" || forms_arr[i].id == "MCDAYS" || forms_arr[i].id == "GLAMT" || forms_arr[i].id == "GLAMT"){
              $.forms.remove(forms_arr[i]);
          	}else if(forms_arr[i].id=="tnc"){
      			forms_arr[i].remove(forms_arr[i].children[0]);
      		}
        }
    }else{
        console.log($.forms.children.length);
        for(var i=0; $.forms.children.length > i; i++){
            console.log(forms_arr[i].id);
            if($.forms.children[i].id == "receipt" || $.forms.children[i].id == "MEDICATION" || $.forms.children[i].id == "TREATMENT" || $.forms.children[i].id == "tnc" ){
              $.forms.remove($.forms.children[i]);
            }else if($.forms.children[i].id == 'DIAGNOSIS'){
                console.log($.forms.children[i].children[0].hintText);
                console.log($.forms.children[i].children[0].required);
                $.forms.children[i].children[0].hintText = "Diagnosis";
                console.log($.forms.children[i].children[0].hintText);
                $.forms.children[i].children[0].required = 0;
                console.log($.forms.children[i].children[0].required);
            }
        }
    }
	//loading.start();
	$.win.add(loading.getView());
	$.camera.init({});
}
init();

function textFieldOnBlur(e){
    checkRequired(e.source);
}

function checkRequired(obj){
    if(obj.required && obj.value == ""){
        error_message += obj.hintText+" cannot be empty\n";
        obj.parent.backgroundColor = "#e8534c";
    }else{
        obj.parent.backgroundColor = "#55a939";
    }
}

function doSubmit(){
    var forms_arr = $.forms.getChildren();
    var params = {CORPCODE: corpcode, EMPNO: empno, MODE: "INSERT"};
    var error_message = "";
    for (var i=0; i < forms_arr.length - 1; i++) {
        if(forms_arr[i].format == "photo" && forms_arr[i].children[2].attached){
            console.log(forms_arr[i].children[2].filedata.nativePath+" see what is the file name");
            Alloy.Globals._.extend(params, {B64FS: Ti.Utils.base64encode(forms_arr[i].children[2].filedata).toString()});
            Alloy.Globals._.extend(params, {RCPFILE: Math.random().toString(36).slice(-10)+".jpg"});
        }else{
            
            if(forms_arr[i].children[0].required && forms_arr[i].children[0].value == ""){
                if(forms_arr[i].id == "tnc"){
                    error_message += "You must agree with the Terms and Conditions\n";
                }else{
                    error_message += forms_arr[i].children[0].hintText+" cannot be empty\n";
                }
            }else{
                params[forms_arr[i].id] = forms_arr[i].children[0].value;
            }
        }
    };
    if(error_message != ""){
        alert(error_message);
        return;
    }
    params["u_id"] = Ti.App.Properties.getString('u_id');
    loading.start();
    console.log(params);
    Alloy.Globals.API.callByPost({url: "https://appsapi.aspmedic.com/aida/claimsubmission_post.aspx", fullurl: true, params: params}, function(responseText){
            var result = JSON.parse(responseText);
            if(result[0]['code'] == "02"){
                Alloy.Globals.common.createAlert("Success", result[0]['message'],function(){
                    $.win.close();
                });
            }else{
                Alloy.Globals.common.createAlert("Error", result[0]['message']);
            }
            console.log(result);/*
            var dialog = Ti.UI.createAlertDialog({
                cancel: 1,
                buttonNames: ['Ok'],
                status: result.status,
                message: (result.status == "success")?"Your referral has been successfully submitted":result.data.join("\n"),
                title: (result.status == "success")?"Success":"Error"
            });
            dialog.addEventListener('click', function(e) {
                if(e.source.status == "success"){
                    $.win.close();
                }
            });
            dialog.show();*/
            loading.finish();
    });
}

function doSubmitBack(){
    loading.start();
    var childs = $.forms.getChildren();
    var params = "CORPCODE="+corpcode+"&empno="+empno+"&MODE="+mode;
    
    for (var i=0; i < childs.length - 1; i++) {
        if(forms_arr[i].format == "photo" && forms_arr[i].children[2].attached){
            filedata = forms_arr[i].children[2].filedata;
        }else{
            checkRequired(childs[i].children[0]);
            params += "&"+childs[i].id+"="+childs[i].children[0].value;
        }
        
    };
    if(error_message.length > 0){
        alert(error_message);
        loading.finish();
    }else{
        Alloy.Globals.API.callByGet({url: "ClaimSubmission.aspx", params: params }, {
            onload: function(responseText){
                var result = JSON.parse(responseText);
                /*if(result[0]['code'] == "02"){
                    /*if(filedata != ""){
                        Alloy.Globals.API.callByPost({url: "eReceiptInsert.aspx", new: true, domain: "ERECEIPT_DOMAIN", params: {
                            B64Fs: filedata,
                            FileName: ,
                            Serial: ,
                            UserID: empno,
                        }}, function(responseText){
                        Alloy.Globals.common.createAlert("Success", result[0]['message'],function(){
                            $.win.close();
                        });
                      });
                    }else{
                        Alloy.Globals.common.createAlert("Success", result[0]['message'],function(){
                            $.win.close();
                        });
                    }
                }
                    
                }else{
                    Alloy.Globals.common.createAlert("Error", result[0]['message'] );
                } */
                
            }, onfinish: function(){
                loading.finish();
            }, onerror: function(){
               
            }
        });
    }
    error_message = "";
}
var checked = $.UI.create("ImageView", {image: "images/checkbox.png", width:40, height:40, left:0, top:0, touchEnabled: false});
function checkedTnc(e){
    console.log(e.source.parent.parent.value+' e.source.parent.parent.value');
    
    if(e.source.parent.value == ""){
        e.source.parent.value = 1;
        e.source.parent.add(checked);
        //e.source.backgroundColor = "#FFFFFF";
    }else{
        e.source.parent.value = "";
        e.source.parent.remove(checked);
        //e.source.backgroundColor = "transparent";
    }
}

function datePicker(e){
    var val_date = (typeof e.source.children[0].date != "undefined")?e.source.children[0].date:new Date();
    var view_container = $.UI.create("View", {classes:['wfill', 'hfill'], zIndex: 50,});
    var mask = $.UI.create("View",{
        classes:['wfill','hfill'],
        backgroundColor: "#80000000"
    });
    var view_box = $.UI.create("View", {classes:['wfill','hsize','vert'], 
    backgroundGradient:{
        type: 'linear',
        colors: [ { color: '#ffffff', offset: 0.0},{ color: '#67b6e1', offset: 0.4 }, { color: '#67b6e1', offset: 0.6 }, { color: '#ffffff', offset: 1.0 } ],
    }, zIndex: 50});
    var picker = $.UI.create("Picker", {
        type:Ti.UI.PICKER_TYPE_DATE,
        value: val_date,
        backgroundColor: "Transparent",
        dateTimeColor: "#ffffff",
        top: 10,
    });
    var ok_button = $.UI.create("Button", {classes:['wfill'], borderRadius:0, height: 50, title: "Select a Date"});
    view_box.add(picker);
    view_box.add(ok_button);
    view_container.add(view_box);
    view_container.add(mask);
    $.win.add(view_container);
    
    mask.addEventListener("click", function(){ 
        $.win.remove(view_container);
    });
    
    ok_button.addEventListener("click", function(ex){
        var dd = picker.value.getDate();
        var mm = picker.value.getMonth()+1; 
        var yyyy = picker.value.getFullYear();
        e.source.children[0].value = mm+'/'+dd+'/'+yyyy;
        e.source.children[0].date = picker.value;
        e.source.children[0].children[0].text = mm+'/'+dd+'/'+yyyy;
        e.source.children[0].children[0].color = "#000000";
        e.source.backgroundColor = "#55a939";
        $.win.remove(view_container);
    });
}

function popout(e){
    if(e.source.data.length == null || e.source.data.length <= 0){
        alert("Sorry, the "+e.source.children[0].hintText+" listing is empty. Please contact our helpdesk for help.");
        return;
    }
    var options_arr = Alloy.Globals._.pluck(e.source.data, e.source.option_name);
    options_arr.push("Cancel");
    var dialog = Ti.UI.createOptionDialog({
        cancel: (options_arr.length > 0)?options_arr.length - 1:0,
        options: options_arr,
        selectedIndex: e.source.value || 0,
        title: e.source.children[0].text
    });
        
    dialog.show(); 
    dialog.addEventListener("click", function(ex){
        if((OS_IOS)?ex.cancel != ex.index:!ex.cancel){
            e.source.children[0].children[0].text = options_arr[ex.index];
            e.source.children[0].value = e.source.data[ex.index][e.source.option_key];
            e.source.children[0].children[0].color = "#000000";
            e.source.backgroundColor = "#55a939";
        }
    });
}

function loadComboBox(e){
    var indicator = $.UI.create("ActivityIndicator", {classes:['wsize','hsize'], style: Ti.UI.ActivityIndicatorStyle.DARK,});
    indicator.show();
    e.source.add(indicator);
    var params = "CORPCODE="+corpcode+"&memno="+memno+"&empno="+empno;
    Alloy.Globals.API.callByGet({url: e.source.url, params: params }, {
        onload: function(responseText){
            var result = JSON.parse(responseText);
            e.source.data = result;
        }, onfinish: function(){
            e.source.opacity = 1;
            e.source.touchEnabled = true;
            indicator.hide();
        }, onerror: function(){
            
        }
    });
}

if(Ti.Platform.osname == "android"){
	$.btnBack.addEventListener('click', function(){  
		Alloy.Globals.nav.closeWindow($.win); 
	});
}