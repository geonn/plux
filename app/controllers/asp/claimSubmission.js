var args = arguments[0] || {};
var mode = (args.mode == "update")? "UPDATE" : "INSERT";
var serial = args.serial || "";
var corpcode = Ti.App.Properties.getString('corpcode');
var empno = Ti.App.Properties.getString('empno');
var memno = Ti.App.Properties.getString('memno');
var name = Ti.App.Properties.getString('fullname');
var loading = Alloy.createController('loading'); 
var error_message = "";

function init(){
	//loading.start();
	$.win.add(loading.getView());
}
init();

function textFieldOnBlur(e){
    checkRequired(e.source);
}

function checkRequired(obj){
    console.log(obj.value+" check value"+obj.required);
    if(obj.required && obj.value == ""){
        error_message += obj.hintText+" cannot be empty\n";
        obj.parent.backgroundColor = "#e8534c";
    }else{
        obj.parent.backgroundColor = "#55a939";
    }
}

function doSubmit(){
    loading.start();
    var childs = $.forms.getChildren();
    var params = "CORPCODE="+corpcode+"&empno="+empno+"&MODE="+mode;
    
    for (var i=0; i < childs.length - 1; i++) {
        checkRequired(childs[i].children[0]);
        console.log(childs[i].id+" "+childs[i].children[0].value);
        params += "&"+childs[i].id+"="+childs[i].children[0].value;
    };
    if(error_message.length > 0){
        alert(error_message);
        loading.finish();
    }else{
        console.log(params);
        API.callByGet({url: "ClaimSubmission.aspx", params: params }, {
            onload: function(responseText){
                var result = JSON.parse(responseText);
                console.log(result);
                if(result[0]['code'] == "02"){
                        common.createAlert("Success", result[0]['message'],function(){
                        $.win.close();
                    });
                }else{
                    common.createAlert("Error", result[0]['message'] );
                } 
                
            }, onfinish: function(){
                loading.finish();
            }, onerror: function(){
               
            }
        });
    }
    error_message = "";
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
    console.log(e.source.data);
    console.log(e.source.data.length);
    console.log(e.source.option_name);
    console.log(typeof e.source.data);
    if(e.source.data.length == null || e.source.data.length <= 0){
        alert("Sorry, the "+e.source.children[0].hintText+" listing is empty. Please contact our helpdesk for help.");
        return;
    }
    var options_arr = _.pluck(e.source.data, e.source.option_name);
    options_arr.push("Cancel");
    var dialog = Ti.UI.createOptionDialog({
        cancel: (options_arr.length > 0)?options_arr.length - 1:0,
        options: options_arr,
        selectedIndex: e.source.value || 0,
        title: e.source.children[0].text
    });
        
    dialog.show(); 
    dialog.addEventListener("click", function(ex){
        console.log(ex.index+" "+ex.cancel);
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
    API.callByGet({url: e.source.url, params: params }, {
        onload: function(responseText){
            var result = JSON.parse(responseText);
            console.log(result);
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
		nav.closeWindow($.win); 
	});
}

if(Ti.Platform.osname == "android"){
    $.win.addEventListener("open", function(){
        if (this.activity) {
            this.activity.onResume = function() {
                setTimeout(function(){
                      redirect = false;
                      console.log("redirect as false");
                }, 1000);
              socket.connect();
            };  
            this.activity.onPause = function() {
                redirect = true;
                socket.disconnect();
            }; 
        }
    });
}
