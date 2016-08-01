var args = arguments[0] || {};
var nav = Alloy.Globals.navMenu;
common.construct($);

/** To check if keyboard onfocus or onblur**/
var isKeyboardFocus = 0;

function doAspSignup(){
	common.showLoading();
	var memno = $.memno.value;
	var empno = $.empno.value;
	//var view_sms = view_sms_box.children[0].children[0].checked;

	var params = {
		memno: memno,
		empno: empno
	};
	 
	API.do_asp_presignup(params, $);
}

function hideProductFormKeyboard(e){
	var exception = ["email", "password", "name", "memno", "empno", "mobileno"];

	if(exception.indexOf(e.source.id) >= 0){
		console.log(e.source.id);
		return false;
	} 
	
	$.memno.blur();
	$.empno.blur();
}; 

/*$.doSignup.addEventListener("click", function(){
	nav.navigationWindow("asp/signup", 0);
});*/

/** To fixed keyboard hide/show when textfield is activate**/
$.aspSignUpWin.addEventListener('click',hideProductFormKeyboard);

 
$.btnBack.addEventListener('click', function(){ 
	$.aspSignUpWin.close(); 
});  
