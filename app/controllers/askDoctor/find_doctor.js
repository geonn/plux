var args = arguments[0] || {};
var page_container = [{title: "SELECT A SPECIALTY"}, {title: "DOCTOR NAME"}];
var loading = Alloy.createController("loading");

function init(){
	syncData({url: "getRoomList", checkerId: 16, model: "room"});
	syncData({url: "doctorListUrl", checkerId: 12, model: "doctors"});
	$.win.add(loading.getView());
	loading.start();
	//$.sub_back.hide();
}

init();

function syncData(e){
	var checker = Alloy.createCollection('updateChecker'); 
	var u_id = Ti.App.Properties.getString('u_id') || 0;
	var isUpdate = checker.getCheckerById(e.checkerId, u_id);
	var last_updated = isUpdate.updated || "";
	last_update = last_updated;
	
	var params = {u_id: u_id};
	
	if(isUpdate != ""){
		params = _.extend(params,  {last_updated: isUpdate.updated});
	}
	
	params = _.extend(params,  e.params);
	
	console.log(params);
	API.callByPost({url: e.url, params: params}, function(responseText){
		var model = Alloy.createCollection(e.model);
		console.log(responseText);
		var res = JSON.parse(responseText);
		var arr = res.data || undefined;
		var res = JSON.parse(responseText);
				
        model.saveArray(arr);
        checker.updateModule(e.checkerId, e.model, res.last_updated, u_id);
	});
	
}

function postlayout(){
	$.win.removeEventListener("postlayout", postlayout);
	loading.finish();
}

function update_subheader(e){
	var current_page = $.inner_box.currentPage;
	$.sub_title.text = page_container[current_page].title;
	if(current_page){
		$.sub_back.show();
	}else{
		$.sub_back.hide();
	}
}

function closeWindow(){
	$.win.close();
}

function scrollToViewPage(e){
	$.inner_box.scrollToView(e.number);
}

function moveNext(){
	$.inner_box.moveNext();
}

function movePrevious(){
	$.inner_box.movePrevious();
}

function selectClinic(e){
	$._available_timeslot.set_clinicId({clinicId:e.clinicId });
	$._specialty_list.set_clinicId({clinicId:e.clinicId });
}

function update_specialty(e){
	$._doctor_list.update_doctor_list({specialty:e.specialty});
}

function loadingStart(){
	loading.start();
}

function loadingFinish(){
	loading.finish();
}

//$.inner_box.addEventListener("scrollend", update_subheader);
//$.sub_back.addEventListener("click", movePrevious);

Ti.App.addEventListener("update_specialty", update_specialty);
Ti.App.addEventListener("selectClinic", selectClinic);

Ti.App.addEventListener("askDoctor_index:windowClose", closeWindow);
Ti.App.addEventListener("askDoctor_index:loadingStart", loadingStart);
Ti.App.addEventListener("askDoctor_index:loadingFinish", loadingFinish);
Ti.App.addEventListener("askDoctor_index:moveNext", moveNext);
Ti.App.addEventListener("askDoctor_index:movePrevious", movePrevious);
Ti.App.addEventListener("askDoctor_index:scrollToViewPage", scrollToViewPage);

$.win.addEventListener("postlayout", postlayout);

$.win.addEventListener("close", function(){
	Ti.App.removeEventListener("update_specialty", update_specialty);
	Ti.App.removeEventListener("selectClinic", selectClinic);
	Ti.App.removeEventListener("askDoctor_index:windowClose", closeWindow);
	Ti.App.removeEventListener("askDoctor_index:loadingStart", loadingStart);
	Ti.App.removeEventListener("askDoctor_index:loadingFinish", loadingFinish);
	Ti.App.removeEventListener("askDoctor_index:moveNext", moveNext);
	Ti.App.removeEventListener("askDoctor_index:movePrevious", movePrevious);
	Ti.App.removeEventListener("askDoctor_index:scrollToViewPage", scrollToViewPage);
});
