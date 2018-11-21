var args = arguments[0] || {};
var nav = Alloy.Globals.navMenu;
var loading = Alloy.createController("loading");
$.win.add(loading.getView());

var error_message = "";
//var view_sms_box = common.CheckboxwithText("Agree to receive SMS Service", {name: "smsme"});
//var view_agreement_box = common.CheckboxwithText("I have read and agree to the ","Privacy Policy", {name: "agreets"},"privacy");

var memno = Ti.App.Properties.getString('memno');
var empno = Ti.App.Properties.getString('empno');
var name = Ti.App.Properties.getString('name');

//$.view_agreement.add(view_sms_box);
//$.view_agreement.add(view_agreement_box);
/** To check if keyboard onfocus or onblur**/
var isKeyboardFocus = 0;

function doAspSignup(){
	loading.start();
	var email = $.email.value;
	var password = $.password.value;
	var repassword = $.repassword.value;
	var name = $.email.value;
	var memno = $.memno.value;
	var empno = $.empno.value;
	var mobileno = $.mobileno.value;
	var valid_email = ValidateEmail(email);
	if(!valid_email){
		loading.finish();
		return false;
	}
	if(password != repassword){
		common.createAlert("Error", "Password does not match the confirm password.");
		loading.finish();
		return false;
	}
	
	//var view_sms = view_sms_box.children[0].children[0].checked;
	/*var view_agreement = view_agreement_box.children[0].children[0].checked;
	if(view_agreement != "1"){
		common.createAlert("Error", "You must agree to the Privacy Policy to register as ASP member.");
		loading.finish();
		return false;
	}*/
	var params = {
		email: email,
		password: password,
		name: name,
		memno: memno,
		empno: empno,
		mobileno: mobileno,
		//smsme: view_sms,
		agreets: "1"
	};
	
	 
	API.do_asp_signup(params, {
	       onload: function(){
	           nav.navigationWindow("home");
               nav.closeWindow(mainView.aspSignUpWin); 
               Ti.App.fireEvent('updateHeader');
	       },
           finish: function(){
               loading.finish();
           }	      
    });
}

function ValidateEmail(mail)
{
	var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; 
	if(mail.match(mailformat))  
	{  
		return true;  
	}else{  
		alert("You have entered an invalid email address!");  
		return false;  
	}  
}

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

function openAndroidHome(){
    console.log('openAndroidHome');
    var win = Alloy.createController("home").getView();
    win.open();
    $.win.close();
}

function doSubmit(){
    var forms_arr = $.forms.getChildren();
    var params = {};
    var error_message = "";
    for (var i=0; i < forms_arr.length - 1; i++) {
        
        console.log(forms_arr[i].id+" "+forms_arr[i].children[0].value);
        if(forms_arr[i].format == "photo" && forms_arr[i].children[2].attached){
            _.extend(params, {Filedata: forms_arr[i].children[2].filedata});
        }else if(forms_arr[i].format == "photo" && !forms_arr[i].children[2].attached){
            error_message += "Please upload your referral letter\n";
        }else if(forms_arr[i].skip != "1"){
            console.log(forms_arr[i].skip+" check skip");
            console.log(forms_arr[i].children[0].value+" "+forms_arr[i].children[0].required);
            if(forms_arr[i].children[0].required && forms_arr[i].children[0].value == ""){
                console.log(_.isUndefined(forms_arr[i].children[0].value)+" _.isEmpty(forms_arr[i].children[0].value)");
                error_message += forms_arr[i].children[0].hintText+" cannot be empty\n";
            }else{
                console.log(forms_arr[i].children[0].value);
                console.log(forms_arr[i].children[0].id);
                params[forms_arr[i].id] = forms_arr[i].children[0].value.trim();
            }
        }
        if(forms_arr[i].id == "password2"){
            if(forms_arr[i].children[0].value != forms_arr[i-1].children[0].value){
                error_message += "Your password are not match\n";
            }
        }
    };
    if(error_message != ""){
        alert(error_message);
        return;
    }
    /*
    var view_agreement = view_agreement_box.children[0].children[0].checked;
    if(view_agreement != "1"){
        common.createAlert("Error", "You must agree to the Privacy Policy to register as ASP member.");
        loading.finish();
        return false;
    }*/
    params['agreets'] = "1";
    params['name'] = name;
    params['memno'] = memno;
    params['empno'] = empno;
    
    console.log(params);
    loading.start();
    
    API.do_asp_signup(params, {
       onload: function(){
           if(OS_IOS){
                var navMenu = Titanium.UI.iOS.createNavigationWindow();
                var win = Alloy.createController("home").getView();
                navMenu.window = win;
                Alloy.Globals.navMenu = navMenu;
                console.log(Alloy.Globals.navMenu);
                Alloy.Globals.navMenu.open();
                $.win.close();
            }else{
                openAndroidHome();
            }
            
       },
       finish: function(){
           loading.finish();
       }          
    });
    
    return;
    API.callByPost({url: "pluxSignUp", new: true, domain: "FREEJINI_DOMAIN", params: params}, function(responseText){
            console.log(responseText);
            var result = JSON.parse(responseText);
            if(result.status == "error"){
                common.createAlert("Error", result.data);
            }else{
                $.win.close();
                Ti.App.fireEvent('loginAfterRegister',{params: params}); 
                loading.finish();
            }
    });
}

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
