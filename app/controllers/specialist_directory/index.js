// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = arguments[0] || {};
//var args = $.args;
var loading = Alloy.createController("loading");
var u_id = Ti.App.Properties.getString('u_id'); 

function init(){
	$.win.add(loading.getView());
	loading.start();
	setTimeout(function(){
		loading.finish();
	}, 1000);
	
}

function init2(){
	$.win.add(loading.getView());
	loading.start();
	setTimeout(function(){
		loading.finish();
	}, 3000);
	
}

init();

if(OS_ANDROID){ 
	$.btnBack.addEventListener('click', function(){ 
		$.win.close(); 
	});
}

// $.win.addEventListener("close", function(){
// 	$.destroy();
// });

function doClick(e) {

    //abort autocomplete
    //Titanium.Network.HTTPClientabort();

	var name = $.tfName.value;

	var state = $.lblStateDialog.text;
	if(state == "ANY STATE" || state == "CHOOSE STATE"){
		state="";
	}

	var specialty = $.lblSpecialDialog.text;
	if(specialty == "ANY SPECIALTY" || specialty == "CHOOSE SPECIALTY"){
		specialty="";
	}

    var hospital = $.lblHospitalDialog.text;
    if(hospital == "ANY HOSPITAL/MEDICAL CENTER" || hospital == "CHOOSE HOSPITAL/MEDICAL CENTER"){
        hospital="";
    }
    
    var page = 1;

	init2();
	Alloy.Globals.API.callByPost({url: "getSpecialistV2", new:true, domain: "FREEJINI_DOMAIN",  params: {name: name, state: state, specialty: specialty, hospital: hospital, page: page, limit: 10}}, function(responseText){
		
		var obj = JSON.parse(responseText);

		if(OS_IOS){
            Alloy.Globals.nav.navigationWindow("specialist_directory/result", "", "", {data: obj, page: page, name: name, state: state, specialty: specialty, hospital: hospital});
        } else{
            var win = Alloy.createController("specialist_directory/result", {data: obj, page: page, name: name, state: state, specialty: specialty, hospital: hospital}).getView();
            win.open();
        }
	});
}

/////state
var stateList = [
    "CHOOSE STATE",
    "JOHOR",
    "KEDAH",
    "KELANTAN",
    "KUALA LUMPUR",
    "LABUAN",
    "MELAKA",
    "NEGERI SEMBILAN",
    "PAHANG",
    "PENANG",
    "PERAK",
    "PERLIS",
    "PUTRAJAYA",
    "SABAH",
    "SARAWAK",
    "SELANGOR",
    "TERENGGANU",
    "ANY STATE"
]

if(OS_ANDROID){
    var dState = $.UI.create("OptionDialog", {
        title: "State",
        options: stateList,
        buttonNames: ["CANCEL"]
    });
} else{
    stateList.push("CANCEL");
    var dState = $.UI.create("OptionDialog", {
        title: "State",
        options: stateList,
        cancel: stateList.length - 1
    });
    
}

$.win.add(dState);

function stateClick(e){
    dState.show();
}

dState.addEventListener('click', function(e){
    if(stateList[e.index] == "CANCEL"){
        $.lblStateDialog.text = "CHOOSE STATE";
    } else {
        $.lblStateDialog.text = stateList[e.index];
    }
});
//state done


//speciality
var specialList = [
    "CHOOSE SPECIALTY",
    "ANAESTHESIOLOGY AND CRITICAL CARE",
    "EMERGENCY MEDICINE",
    "FAMILY MEDICINE",
    "GENERAL MEDICINE",
    "NUCLEAR MEDICINE",
    "REHABILITATION MEDICINE",
    "SPORTS MEDICINE",
    "CLINICAL ONCOLOGY",
    "RADIATION ONCOLOGY",
    "CLINCIAL RADIOLOGY",
    "PAEDIATRICS",
    "GENERAL PATHOLOGY",
    "ANATOMICAL PATHOLOGY",
    "CHEMICAL PATHOLOGY",
    "HAEMATOLOGY",
    "MEDICAL MICROBIOLOGY",
    "FORENSIC PATHOLOGY",
    "TRANSFUSION MEDICINE",
    "PSYCHIATRY",
    "PUBLIC HEALTH MEDICINE",
    "OBSTETRICS AND GYNAECOLOGY (O & G)",
    "SURGERY",
    "CARDIOTHORACIC SURGERY",
    "NEUROSURGERY",
    "PAEDIATRIC SURGERY",
    "PLASTIC SURGERY",
    "OPHTHALMOLOGY",
    "OTORHINOLARYNGOLOGY",
    "ORTHOPAEDIC SURGERY",
    "UROLOGY",
    "ANY SPECIALTY",
];

if(OS_ANDROID){
    var dSpecial = $.UI.create("OptionDialog", {
        title: "Specialities",
        options: specialList,
        buttonNames: ["CANCEL"]
    });
} else{
    specialList.push("CANCEL");
    var dSpecial = $.UI.create("OptionDialog", {
        title: "Specialities",
        options: specialList,
        cancel: specialList.length - 1
    });
    
}

$.win.add(dSpecial);

function specialClick(e){
    dSpecial.show();
}

dSpecial.addEventListener('click', function(e){
    if (specialList[e.index] == "CANCEL"){
        $.lblSpecialDialog.text = "CHOOSE SPECIALTY";
    } else{
        $.lblSpecialDialog.text = specialList[e.index];
    }
});
//speciality done


//medical center
var hospitalList = [
    "CHOOSE HOSPITAL/MEDICAL CENTER",
    "AR-RIDZUAN",
    "ARA DAMANSARA MEDICAL CENTRE",
    "ASSUNTA HOSPITAL",
    "AVISENA SPECIALIST HOSPITAL",
    "AVISENA WOMEN & CHILDREN SPECIALIST HOSPITAL",
    "BAGAN SPECIALIST CENTRE",
    "BINTULU SPECIALIST HOSPITAL SDN BHD",
    "COLUMBIA ASIA SEREMBAN",
    "DAMAI SERVICE HOSPITAL",
    "GLENEAGLES KOTA KINABALU",
    "GLENEAGLES KUALA LUMPUR",
    "GLENEAGLES MEDINI JOHOR",
    "GLENEAGLES PENANG (GLENEAGLES MEDICAL CENTRE)",
    "HOSPITAL ISLAM AZ ZAHRAH",
    "HOSPITAL PAKAR AN-NUR HASANAH",
    "HOSPITAL PANTAI PUTERI IPOH",
    "HOSPITAL PUSRAWI",
    "HSC MEDICAL CENTER",
    "INSTITUT JANTUNG NEGARA",
    "KAJANG PLAZA MEDICAL CENTRE",
    "KEDAH MEDICAL CENTRE",
    "KELANA JAYA MEDICAL CENTRE",
    "KENSINGTON GREEN SPECIALIST CENTRE SDN BHD",
    "KOTA BHARU MEDICAL CENTRE",
    "KPJ AMPANG",
    "KPJ BANDAR DATO ONN SPECIALIST",
    "KPJ BANDAR MAHARANI",
    "KPJ BATU PAHAT",
    "KPJ CENTRE FOR SIGHT",
    "KPJ DAMANSARA",
    "KPJ IPOH",
    "KPJ JOHOR",
    "KPJ KAJANG SPECIALIST",
    "KPJ KLANG",
    "KPJ KLUANG UTAMA",
    "KPJ KUCHING SPECIALIST",
    "KPJ MIRI",
    "KPJ PAHANG",
    "KPJ PASIR GUDANG",
    "KPJ PENANG",
    "KPJ PERDANA",
    "KPJ PERLIS",
    "KPJ PUTERI",
    "KPJ RAWANG",
    "KPJ SABAH SPECIALIST",
    "KPJ SELANGOR SPECIALIST",
    "KPJ SENTOSA KL",
    "KPJ SEREMBAN SPECIALIST",
    "KPJ SIBU",
    "KPJ SRI MANJUNG",
    "KPJ TAIPING MEDICAL CENTRE",
    "KPJ TAWAKKAL HEALTH CENTRE",
    "KPJ TAWAKKAL KL",
    "KUALA TERENGGANU SPECIALIST HOSPITAL",
    "LAM WAH EE HOSPITAL",
    "LOH GUAN LYE SPECIALIST CENTRE",
    "MAHKOTA MEDICAL CENTRE",
    "MAWAR MEDICAL CENTER",
    "METRO SPECIALIST HOSPITAL",
    "MSU",
    "NILAI MEDICAL CENTRE",
    "NSCMH MEDICAL CENTRE",
    "ORIENTAL MELAKA STRAITS MEDICAL CENTRE",
    "PAHANG MEDICAL CENTRE",
    "PANTAI HOSPITAL AMPANG",
    "PANTAI HOSPITAL AYER KEROH",
    "PANTAI HOSPITAL BATU PAHAT",
    "PANTAI HOSPITAL CHERAS",
    "PANTAI HOSPITAL KLANG",
    "PANTAI HOSPITAL KUALA LUMPUR",
    "PANTAI HOSPITAL LAGUNA MERBOK",
    "PANTAI HOSPITAL MANJUNG",
    "PANTAI HOSPITAL PENANG",
    "PANTAI HOSPITAL SUNGAI PETANI",
    "PARKCITY MEDICAL CENTRE",
    "PENANG ADVENTIST HOSPITAL",
    "PRINCE COURT MEDICAL CENTRE PCMC, PETRONAS HOSPITAL",
    "PUTRA MEDICAL CENTRE (ALOR SETAR)",
    "PUTRA SPECIALIST HOSPITAL (MELAKA) SDN BHD",
    "RAMSAY SIME DARBY HEALTH CARE (SJMC)",
    "REGEN REHABILITATION INTERNATIONAL HOSPITAL",
    "REJANG MEDICAL CENTRE",
    "SALAM SENAWANG SPECIALIST HOSPITAL",
    "SUNWAY MEDICAL CENTRE VELOCITY",
    "TAIPING MEDICAL CENTRE",
    "TUNG SHIN HOSPITAL",
    "UITM PRIVATE SPECIALIST CENTRE",
    "UM SPECIALIST CENTRE",
    "ANY HOSPITAL/MEDICAL CENTER",
];

if(OS_ANDROID){
    var dHospital = $.UI.create("OptionDialog", {
        title: "Hospital/Medical Center",
        options: hospitalList,
        buttonNames: ["CANCEL"],
    });
} else{
    hospitalList.push("CANCEL");
    var dHospital = $.UI.create("OptionDialog", {
        title: "Hospital/Medical Center",
        options: hospitalList,
        cancel: hospitalList.length - 1
    });
    
}

$.win.add(dHospital);

function hospitalClick(e){
    dHospital.show();
}

dHospital.addEventListener('click', function(e){
    if (hospitalList[e.index] == "CANCEL"){
        $.lblHospitalDialog.text = "CHOOSE HOSPITAL/MEDICAL CENTER";
    } else{
        $.lblHospitalDialog.text = hospitalList[e.index];
    }
});


//medical center done

//////////////////////////autocomplete shit/////////////////

//Table view showing your autocomplete values
var tblvAutoComplete = Ti.UI.createTableView({
    width           : '90%',
    backgroundColor : '#EFEFEF',
    height          : 0,
    maxRowHeight    : 35,
    minRowHeight    : 35,
    allowSelection  : true
});

var vAutocomplete = Ti.UI.createView({
    height: Ti.UI.SIZE,
    width: Ti.UI.FILL,
    left: "15%"
});



// Starts auto complete
$.tfName.addEventListener('change', function(e){ 
    var pattern = e.source.value;

    //create tableview
    vAutocomplete.add(tblvAutoComplete);
    $.vAutocompletePlace.add(vAutocomplete);
    ///end create table

    if(pattern.length <= 2){
        $.vAutocompletePlace.remove(vAutocomplete);
    }

	if(pattern.length >= 2 && pattern.value != ''){

		//add searchArray values
		Alloy.Globals.API.callByPost({url: "getSpecialistV2", new:true, domain: "FREEJINI_DOMAIN",  params: {name: pattern, page: 1, limit: 10}}, function(responseText){
		
            var obj = JSON.parse(responseText);
            
            console.log("total obj" + obj.data.length);
	
			var searchArray = [];
	
			for (index = 0; index < obj.data.length; index++) {
				searchArray[index] = obj.data[index].name;
            }
	
            //var tempArray = PatternMatch(searchArray, pattern);

			CreateAutoCompleteList(searchArray);
		});
	}

	else{
		//$.vAutocompletePlace.remove(tblvAutoComplete);
	}
});

//You got the required value and you clicks the word
tblvAutoComplete.addEventListener('click', function(e){
    $.tfName.value = e.rowData.result;

    $.vAutocompletePlace.remove(vAutocomplete);
});

//Returns the array which contains a match with the pattern
function PatternMatch(arrayToSearch, pattern){
    var searchLen = pattern.length;
    arrayToSearch.sort();
    var tempArray = [];
    for(var index = 0, len = arrayToSearch.length; index< len; index++){
        if(arrayToSearch[index].substring(0,searchLen).toUpperCase() === pattern.toUpperCase()){
            tempArray.push(arrayToSearch[index]);
        }
    }
    return tempArray;
}
//setting the tableview values
function CreateAutoCompleteList(searchResults){
    var tableData = [];
    for(var index=0, len = searchResults.length; index < len; index++){

            var lblSearchResult = Ti.UI.createLabel({
                top            : 2,
                width          : '80%',
                height         : 34,
                left           : '5%',
                font           : { fontSize : 10 },
                color          : '#000000',
                text           : searchResults[index]
            });

            //Creating the table view row
            var row = Ti.UI.createTableViewRow({
               backgroundColor : 'transparent',
               focusable       : true,
               height          : Ti.UI.SIZE,
               result          : searchResults[index]
            });

            row.add(lblSearchResult);
            tableData.push(row);
    }

    tblvAutoComplete.data = tableData;
	tblvAutoComplete.height = tableData.length * 35;
}

function doHome(){
    if(OS_IOS){
        Alloy.Globals.nav.navigationWindow("home", "", "", {});
    } else{
        var win = Alloy.createController("home").getView();
        win.open();
    }
}