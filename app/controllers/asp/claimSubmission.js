var args = arguments[0] || {};
var isEdit = args.edit || "";
var serial = args.serial || "";
var usersModel = Alloy.createCollection('users');
var user = usersModel.getPrincipleData();
var claimCategoryArr = [];
var claimCategoryIdArr = [];
var claimName = [];
var claimMemNo = [];
var geoCate = [];
var panelCategory;
var userMem;
var claimCategoryId = 0;
var claimMemId;
var claimSerial;
var claimMode = "INSERT";
common.construct($);
common.showLoading();
init();

function init(){
	if(!Titanium.Network.online){
		common.createAlert("Alert", "There is no internet connection.", closeWindow);
	}
	userMem =  usersModel.getUserByEmpNo();
	userMem.forEach(function(entry) {  
		claimName.push(entry.name);
		claimMemNo.push(entry.memno);
	}); 
	getClaimCategory(); 
	if(OS_IOS){
		claimName.push("Cancel");
	}
	 	 
}

function checkIfHaveData(){
 if(isEdit != ""){
		claimMode = "UPDATE";
		claimSerial = serial;
		var params = "SERIAL="+serial; 
		common.showLoading();  
		API.callByGet({url:"getclaimReimbUrl", params: params}, function(responseText){ 
			var res = JSON.parse(responseText); 
			claimMemId = res[0].memno;
			var claimer = usersModel.getUserByMemno(res[0].memno); 
		 	$.receiptAmount.value = res[0].amt || "";
		 	$.diagnosis.value = res[0].diagnosis || "";
		 	$.glamount.value = res[0].glamt || 0;
		 	$.gstAmount.value = res[0].gstamt || 0;
		 	$.clinicName.value = res[0].nclinic || "";
		 	$.receipt_no.value = res[0].recno || "";
		 	$.remark.value = res[0].remarks || "";
		 	$.mc.value = res[0].mcdays || 0;
		 	var visitDate = res[0].visitdt || "";
		 	dateVisit = visitDate.split("/");  
			dateVisit = dateVisit[1]+"/"+dateVisit[0]+"/"+dateVisit[2];
		 	$.dateVisit.text = dateVisit;
		 	$.dateVisit.color = "#000000";
		 	$.claim_under.text = claimer.name;
		 	$.claim_under.color = "#000000";
		 	 
		 	a = claimCategoryIdArr.indexOf(res[0].category);
		 	claimCategoryId = claimCategoryArr[a];
		 	$.category.text = claimCategoryArr[a];
		 	$.category.color = "#000000"; 
	 		//claimCategoryIdArr.push(entry.catID);
			//claimCategoryArr;
		 	common.hideLoading(); 
		}); 
		$.saveBtn.visible = false;
	} 
}

function getClaimCategory(){  
	API.callByGet({url:"getclaimCategoryUrl", params: "CORPCODE="+user.corpcode }, function(responseText){ 
		panelCategory = JSON.parse(responseText); 
		
		if(panelCategory.length < 1){
			common.createAlert("Error", "Your are not allowed to submit claim" );
			nav.closeWindow($.win); 
			return false;
		}
		panelCategory.forEach(function(entry) {  
			claimCategoryIdArr.push(entry.catID);
			claimCategoryArr.push( entry.catDesc); 
		}); 
		if(OS_ANDROID){
			claimCategoryIdArr.push("Cancel");
			claimCategoryArr.push( "Cancel"); 
		}
		
	 	if(OS_IOS){
			claimCategoryArr.push("Cancel"); 
		}
		common.hideLoading();
		checkIfHaveData();
	}); 
}

function submitClaim(){ 
	var receiptNo     = $.receipt_no.value;
	var claimCategory = claimCategoryId;
	var claimUnder    = claimMemId;
	var receiptAmount =  $.receiptAmount.value;
	
	var dateVisit	  = $.dateVisit.text;
	var clinicName    = $.clinicName.value;
	var remark        = $.remark.value;
	var gstAmount     = $.gstAmount.value;
	var mc            = $.mc.value;
	var diagnosis     = $.diagnosis.value;
	var glamount      = $.glamount.value;
	var mode     = claimMode; 
	if(receiptNo.trim() == ""){
		common.resultPopUp("Error", "Please fill in receipt number" );
		return false;
	}
	
	if(claimCategory  == ""){
		common.resultPopUp("Error", "Please choose ONE category" );
		return false;
	}
	
	if(typeof claimUnder == "undefined"){
		common.resultPopUp("Error", "Please choose ONE claim under" );
		return false;
	}
	
	if(receiptAmount == ""){
		common.resultPopUp("Error", "Please fill in receipt amount in RM" );
		return false;
	}
	
	if(dateVisit  == ""){
		common.resultPopUp("Error", "Please choose date visit to clinic/hospital" );
		return false;
	}else{ 
		dateVisit = dateVisit.split("/");  
		dateVisit = dateVisit[1]+"/"+dateVisit[0]+"/"+dateVisit[2];
	}
	
	if(clinicName == ""){
		common.resultPopUp("Error", "Please fill in clinic/hospital to visit" );
		return false;
	}
	
	var ser = "";
	if(isEdit != ""){ 
		ser = "&SERIAL="+claimSerial;
	}
	var params = "RECNO="+receiptNo+"&CATEGORY="+claimCategory+"&MEMNO="+claimUnder+"&EMPNO="+user.empno+"&CORPCODE="+user.corpcode+
				 "&AMT="+receiptAmount+"&VISITDT="+dateVisit+"&NCLINIC="+clinicName+"&REMARKS="+remark+"&GSTAMT="+gstAmount+
				 "&MCDAYS="+mc+"&DIAGNOSIS="+diagnosis+"&GLAMT="+glamount+"&MODE="+mode +ser;
	//console.log(params);
	common.showLoading(); 
	API.callByGet({url:"getclaimSubmissionUrl", params: params}, function(responseText){ 
		var res = JSON.parse(responseText); 
		common.hideLoading();
		if(res[0]['code'] == "02"){
			common.createAlert("Success",res[0]['message'],function(){
				$.win.close();
			} );
			
		}else{
			common.createAlert("Error",res[0]['message'] );
		} 
	}); 
}

function hideKeyboard(){
	$.receiptAmount.blur();
	$.gstAmount.blur();
	$.remark.blur();
	$.mc.blur();
	$.glamount.blur();
}

function changeVisitDate(e){  
	var pickerdate = e.value; 
    var day = pickerdate.getDate();
    day = day.toString();
 
    if (day.length < 2) {
        day = '0' + day;
    }
  
    var month = pickerdate.getMonth();
    month = month + 1;
    month = month.toString();
 
    if (month.length < 2) {
        month = '0' + month;
    }
 
    var year = pickerdate.getFullYear(); 
    selDate = day + "/" + month + "/" + year; 
     
	$.dateVisit.text = selDate ;  
	$.dateVisit.color = "#000000" ;
}
 
	$.tvrCategory.addEventListener('click', function(){ 
		var cancelBtn = claimCategoryArr.length -1;
		var dialog = Ti.UI.createOptionDialog({
		  cancel: claimCategoryArr.length -1,
		  options: claimCategoryArr,
		  selectedIndex: 0,
		  title: 'Choose Claim Category'
		});
		
		dialog.show(); 
		dialog.addEventListener("click", function(e){   
			if(cancelBtn != e.index){ 
				claimCategoryId = claimCategoryIdArr[e.index];
				$.category.text = claimCategoryArr[e.index];  
				$.category.color = "#000000";
			}
		});
	});
	
	$.tvrClaimUnder.addEventListener('click', function(){
		var cancelBtn = claimName.length -1;
		var dialog = Ti.UI.createOptionDialog({
		  cancel: claimName.length -1,
		  options: claimName,
		  title: 'Choose Claim Under'
		});
		
		dialog.show(); 
		dialog.addEventListener("click", function(e){   
			if(claimName.length =="1" || cancelBtn != e.index){ 
				claimMemId = claimMemNo[e.index];
				$.claim_under.text = claimName[e.index];  
				$.claim_under.color = "#000000";
			}
		});
	});
 

function hideDatePicker(){
	$.dateVisitPicker.visible = false; 
	$.dateToolbar.visible = false;
	$.selectorView.height = 0;
}

function showVisitPicker(){  
 
		if(OS_ANDROID){ 
			var curDate = currentDateTime();   
			var ed = curDate.substr(0, 10); 
			var res_ed = ed.split('-'); 
			if(res_ed[1] == "08"){
				res_ed[1] = "8";
			}
			if(res_ed[1] == "09"){
				res_ed[1] = "9";
			}
			var datePicker = Ti.UI.createPicker({
				  type: Ti.UI.PICKER_TYPE_DATE,
				  minDate: new Date(2015,0,1),
				  id: "datePicker",
				  visible: false
			});
			datePicker.showDatePickerDialog({
				value: new Date(res_ed[0],parseInt(res_ed[1]) -1,res_ed[2]),
				callback: function(e) {
				if (e.cancel) { 
					} else {
						 changeVisitDate(e);
					}
				}
			});
		}else{ 
			$.dateVisitPicker.visible = true;
			$.selectorView.height = Ti.UI.SIZE;
			$.dateToolbar.visible = true;
		} 
}

 if(Ti.Platform.osname == "android"){
	$.btnBack.addEventListener('click', function(){  
		nav.closeWindow($.win); 
	});
}


