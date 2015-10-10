var args = arguments[0] || {};
var page_container = [{title: "SELECT A CLINIC"}, {title: "SELECT AN AVAILABLE TIME"}, {title: "CREATE THIS APPOINTMENT"}];

function init(){
	$.sub_back.hide();
}

init();

function update_subheader(e){
	var current_page = $.inner_box.currentPage;
	$.sub_title.text = page_container[current_page].title;
	if(current_page){
		$.sub_back.show();
	}else{
		$.sub_back.hide();
	}
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
	$._appointment_form.update_selectClinic({clinicName:e.clinicName, clinicId:e.clinicId });
}

function update_chooseDateTime(e){
	$._appointment_form.update_chooseDateTime({date:e.date});
}

$.inner_box.addEventListener("scrollend", update_subheader);
$.sub_back.addEventListener("click", movePrevious);

Ti.App.addEventListener("update_chooseDateTime", update_chooseDateTime);
Ti.App.addEventListener("selectClinic", selectClinic);

Ti.App.addEventListener("appointment_index:moveNext", moveNext);
Ti.App.addEventListener("appointment_index:movePrevious", movePrevious);
Ti.App.addEventListener("appointment_index:scrollToViewPage", scrollToViewPage);

$.win.addEventListener("close", function(){
	Ti.App.removeEventListener("selectClinic", selectClinic);
	Ti.App.removeEventListener("appointment_index:moveNext", moveNext);
	Ti.App.removeEventListener("appointment_index:movePrevious", movePrevious);
	Ti.App.removeEventListener("appointment_index:scrollToViewPage", scrollToViewPage);
});
