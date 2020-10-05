// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = arguments[0] || {};
//var args = $.args;

if(OS_ANDROID){ 
	$.btnBack.addEventListener('click', function(){ 
		$.win.close(); 
	});
}

//////////////////////////////
var obj = args.data;

//image
var vImg = $.UI.create("View", {
	height: Ti.UI.SIZE,
    width: Ti.UI.FILL,
    backgroundColor: 'white'
});

var vImgFill = $.UI.create("View",{
	height: 180,
    width: Ti.UI.FILL,
});

if(obj.attachment == undefined){
	var img = $.UI.create("ImageView", {
		height: Ti.UI.SIZE,
		width: Ti.UI.SIZE,
		image: "/images/specialist_directory/img_placeholder.png"
	});
} else {
	var img = $.UI.create("ImageView", {
		height: Ti.UI.SIZE,
		width: Ti.UI.SIZE,
		defaultImage: "/images/specialist_directory/img_placeholder.png",
		image: obj.attachment
	});
}

//add view for image
vImgFill.add(img);
vImg.add(vImgFill);
$.mainView.add(vImg);

//name
var vNameBorder = $.UI.create("View", {
	height: Ti.UI.SIZE,
    width: Ti.UI.FILL,
    backgroundColor: 'black',
});

var vName = $.UI.create("View", {
	height: Ti.UI.SIZE,
    width: Ti.UI.FILL,
    top: 3,
    bottom: 3,
    layout: 'vertical',
    backgroundColor: 'white',
});

vNameBorder.add(vName);

var lblName = Ti.UI.createLabel({
	textAlign : 'center',
	left: 5,
	right: 5,
	font: {
        fontSize: 24,
        fontWeight: "bold",
	},
	text: obj.title + " " + obj.name,
	color: "black"
});

var lblBio = Ti.UI.createLabel({
	textAlign : 'center',
	left: 5,
	right: 5,
	text: obj.gender + " | " + obj.qualification,
	color: "black"
});

vName.add(lblName);
vName.add(lblBio);

$.mainView.add(vName);

//scroll
var svMain = $.UI.create("ScrollView", {
	height: Ti.UI.FILL,
	width: Ti.UI.FILL,
	layout: "vertical",
	contentHeight: Ti.UI.SIZE,
	contentWidth: Ti.UI.FILL,
	backgroundColor: "white"
});

$.mainView.add(svMain);

//special
var vRowSpecial = $.UI.create(("View"),{
	height: Ti.UI.SIZE,
	width: Ti.UI.FILL
});

svMain.add(vRowSpecial);

var vImgRowSpecial = $.UI.create("View", {
	height: Ti.UI.SIZE,
	width: "20%",
	left: 5
});

vRowSpecial.add(vImgRowSpecial);

var vImgSpecialFill = $.UI.create("View", {
	height: Ti.UI.SIZE,
	width: "60%",
	top: 5,
	bottom: 5
});

vImgRowSpecial.add(vImgSpecialFill);

var imgSpecial = $.UI.create("ImageView", {
	height: 60,
    width: Ti.UI.SIZE,
    image: "/images/specialist_directory/icon/stethoscope.png"
});

vImgSpecialFill.add(imgSpecial);

var vTextSpecial = $.UI.create("View", {
	height: Ti.UI.SIZE,
    width: "80%",
    left: "20%",
	layout: 'vertical',
});

vRowSpecial.add(vTextSpecial);

var lblTitleSpecial = $.UI.create("Label", {
    left: 10,
    font: {
        fontWeight: "bold",
        fontSize: 14
    },
	color: "blue",
	text: "PRACTICE FIELD"
});

vTextSpecial.add(lblTitleSpecial);

var lblInfoSpecial = $.UI.create("Label", {
	left: 10,
    font: {
        fontWeight: "bold",
        fontSize: 11
	},
	text: obj.practice_field
});

vTextSpecial.add(lblInfoSpecial);

//state
var vRowState = $.UI.create(("View"),{
	height: Ti.UI.SIZE,
	width: Ti.UI.FILL
});

svMain.add(vRowState);

var vImgRowState = $.UI.create("View", {
	height: Ti.UI.SIZE,
	width: "20%",
	left: 5
});

vRowState.add(vImgRowState);

var vImgStateFill = $.UI.create("View", {
	height: Ti.UI.SIZE,
	width: "60%",
	top: 5,
	bottom: 5
});

vImgRowState.add(vImgStateFill);

var imgState = $.UI.create("ImageView", {
	height: 60,
    width: Ti.UI.SIZE,
    image: "/images/specialist_directory/icon/location-red.png"
});

vImgStateFill.add(imgState);

var vTextState = $.UI.create("View", {
	height: Ti.UI.SIZE,
    width: "80%",
    left: "20%",
	layout: 'vertical',
});

vRowState.add(vTextState);

var lblTitleState = $.UI.create("Label", {
	left: 10,
	right: 5,
    font: {
        fontWeight: "bold",
        fontSize: 14
    },
	color: "blue",
	text: "STATE"
});

vTextState.add(lblTitleState);

var lblInfoState = $.UI.create("Label", {
	left: 10,
	right: 5,
    font: {
        fontWeight: "bold",
        fontSize: 11
	},
	text: obj.location
});

vTextState.add(lblInfoState);

//contact
var vRowContact = $.UI.create(("View"),{
	height: Ti.UI.SIZE,
	width: Ti.UI.FILL
});

svMain.add(vRowContact);

var vImgRowContact = $.UI.create("View", {
	height: Ti.UI.SIZE,
	width: "20%",
	left: 5
});

vRowContact.add(vImgRowContact);

var vImgContactFill = $.UI.create("View", {
	height: Ti.UI.SIZE,
	width: "40%",
	top: 5,
	bottom: 5
});

vImgRowContact.add(vImgContactFill);

var imgContact = $.UI.create("ImageView", {
	height: 60,
    width: Ti.UI.SIZE,
    image: "/images/specialist_directory/icon/phone.png"
});

vImgContactFill.add(imgContact);

var vTextContact = $.UI.create("View", {
	height: Ti.UI.SIZE,
    width: "80%",
    left: "20%",
	layout: 'vertical',
});

vRowContact.add(vTextContact);

var lblTitleContact = $.UI.create("Label", {
	left: 10,
	right: 5,
    font: {
        fontWeight: "bold",
        fontSize: 14
    },
	color: "blue",
	text: "CONTACT"
});

vTextContact.add(lblTitleContact);

var lblInfoContact1 = $.UI.create("Label", {
	left: 10,
	right: 5,
    font: {
        fontWeight: "bold",
        fontSize: 11
	},
	text: obj.mobile + " (Click here to call)"
});

lblInfoContact1.addEventListener("click", function (e){
	Titanium.Platform.openURL('tel:' + obj.mobile);
});

var lblInfoContact2 = $.UI.create("Label", {
	left: 10,
	right: 5,
    font: {
        fontWeight: "bold",
        fontSize: 11
	},
	text: obj.email
});

vTextContact.add(lblInfoContact1);
vTextContact.add(lblInfoContact2);

//languages
var vRowLanguages = $.UI.create(("View"),{
	height: Ti.UI.SIZE,
	width: Ti.UI.FILL
});

svMain.add(vRowLanguages);

var vImgRowLanguages = $.UI.create("View", {
	height: Ti.UI.SIZE,
	width: "20%",
	left: 5
});

vRowLanguages.add(vImgRowLanguages);

var vImgLanguagesFill = $.UI.create("View", {
	height: Ti.UI.SIZE,
	width: "45%",
	top: 5,
	bottom: 5
});

vImgRowLanguages.add(vImgLanguagesFill);

var imgLanguages = $.UI.create("ImageView", {
	height: 60,
    width: Ti.UI.SIZE,
    image: "/images/specialist_directory/icon/message.png"
});

vImgLanguagesFill.add(imgLanguages);

var vTextLanguages = $.UI.create("View", {
	height: Ti.UI.SIZE,
    width: "80%",
    left: "20%",
	layout: 'vertical',
});

vRowLanguages.add(vTextLanguages);

var lblTitleLanguages = $.UI.create("Label", {
	left: 10,
	right: 5,
    font: {
        fontWeight: "bold",
        fontSize: 14
    },
	color: "blue",
	text: "LANGUAGES"
});

vTextLanguages.add(lblTitleLanguages);

var lblInfoLanguages = $.UI.create("Label", {
	left: 10,
	right: 5,
    font: {
        fontWeight: "bold",
        fontSize: 11
	},
	text: obj.language
});

vTextLanguages.add(lblInfoLanguages);

//hospital
var vRowHospital = $.UI.create(("View"),{
	height: Ti.UI.SIZE,
	width: Ti.UI.FILL
});

svMain.add(vRowHospital);

var vImgRowHospital = $.UI.create("View", {
	height: Ti.UI.SIZE,
	width: "20%",
	left: 5
});

vRowHospital.add(vImgRowHospital);

var vImgHospitalFill = $.UI.create("View", {
	height: Ti.UI.SIZE,
	width: "50%",
	top: 5,
	bottom: 5
});

vImgRowHospital.add(vImgHospitalFill);

var imgHospital = $.UI.create("ImageView", {
	height: 60,
    width: Ti.UI.SIZE,
    image: "/images/specialist_directory/icon/first_aid_kit.png"
});

vImgHospitalFill.add(imgHospital);

var vTextHospital = $.UI.create("View", {
	height: Ti.UI.SIZE,
    width: "80%",
    left: "20%",
	layout: 'vertical',
});

vRowHospital.add(vTextHospital);

var lblTitleHospital = $.UI.create("Label", {
	left: 10,
	right: 5,
    font: {
        fontWeight: "bold",
        fontSize: 14
    },
	color: "blue",
	text: "HOSPITAL"
});

vTextHospital.add(lblTitleHospital);

var lblInfoHospital = $.UI.create("Label", {
	left: 10,
	right: 5,
    font: {
        fontWeight: "bold",
        fontSize: 11
	},
	text: obj.establishment
});

vTextHospital.add(lblInfoHospital);

//qualification
var vRowQualification = $.UI.create(("View"),{
	height: Ti.UI.SIZE,
	width: Ti.UI.FILL
});

svMain.add(vRowQualification);

var vImgRowQualification = $.UI.create("View", {
	height: Ti.UI.SIZE,
	width: "20%",
	left: 5
});

vRowQualification.add(vImgRowQualification);

var vImgQualificationFill = $.UI.create("View", {
	height: Ti.UI.SIZE,
	width: "50%",
	top: 5,
	bottom: 5
});

vImgRowQualification.add(vImgQualificationFill);

var imgQualification = $.UI.create("ImageView", {
	height: 60,
    width: Ti.UI.SIZE,
    image: "/images/specialist_directory/icon/graduation_cap.png"
});

vImgQualificationFill.add(imgQualification);

var vTextQualification = $.UI.create("View", {
	height: Ti.UI.SIZE,
    width: "80%",
    left: "20%",
	layout: 'vertical',
});

vRowQualification.add(vTextQualification);

var lblTitleQualification = $.UI.create("Label", {
	left: 10,
	right: 5,
    font: {
        fontWeight: "bold",
        fontSize: 14
    },
	color: "blue",
	text: "QUALIFICATION"
});

vTextQualification.add(lblTitleQualification);

var lblInfoQualification = $.UI.create("Label", {
	left: 10,
	right: 5,
    font: {
        fontWeight: "bold",
        fontSize: 11
	},
	text: obj.qualification
});

vTextQualification.add(lblInfoQualification);