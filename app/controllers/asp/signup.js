var args = arguments[0] || {};
var nav = Alloy.Globals.navMenu;
var loading = Alloy.createController('loading');
$.win.add(loading.getView());

/** To check if keyboard onfocus or onblur**/
var isKeyboardFocus = 0;

function doAspSignup(){
	loading.start();
	var memno = $.memno.children[0].value;
	var empno = $.empno.children[0].value;
	//var view_sms = view_sms_box.children[0].children[0].checked;

	var params = {
		memno: memno,
		empno: empno
	};
	 
	API.do_asp_presignup(params, {
	    finish: function(){
	        loading.finish();
	    },
	    callback: function(){
	        console.log(nav);
	        $.win.close();
	        //nav.closeWindow($.win);
            var win = Alloy.createController("asp/signup2").getView();
            win.open(); 
	    }
	});
}

function textFieldOnFocus(e){
    e.source.parent.backgroundColor = "#ffffff";
    if(e.source.value == e.source.hintText){
        e.source.value = "";
        //e.source.color = "#06141c";
    }
}

function textFieldOnBlur(e){
    console.log(e.source.value+" "+e.source.required);
    if(e.source.required && e.source.value == ""){
        //error_message += forms_arr[i].hintText+" cannot be empty\n";
        e.source.parent.backgroundColor = "#e8534c";
    }else{
        e.source.parent.backgroundColor = "#55a939";
    }
    if(e.source.value==""){
        e.source.value = e.source.hintText;
        //e.source.color = "#06141c";
    }
}

/*$.doSignup.addEventListener("click", function(){
	nav.navigationWindow("asp/signup", 0);
});*/

$.btnBack.addEventListener('click', function(){ 
	$.win.close(); 
});  

if(Ti.Platform.osname == "android"){
    $.win.addEventListener("open", function(){
        if (this.activity) {
            this.activity.onResume = function() {
                setTimeout(function(){
                      push_redirect = false;
                      console.log("redirect as false");
                }, 1000);
              socket.connect();
            };  
            this.activity.onPause = function() {
                push_redirect = true;
                socket.disconnect();
            }; 
        }
    });
}
