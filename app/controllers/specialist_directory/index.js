// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = arguments[0] || {};
//var args = $.args;
var loading = Alloy.createController("loading");
var u_id = Ti.App.Properties.getString('u_id'); 

function init(time){
	$.win.add(loading.getView());
	loading.start();
	setTimeout(function(){
		loading.finish();
	}, time);
	
}

function finish(){
    $.win.add(loading.getView());
    loading.finish();
}

init(3000);

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
	if(state == "Any Location" || state == "Choose Location"){
		state="";
	}

	var specialty = $.lblSpecialDialog.text;
	if(specialty == "Any Specialty" || specialty == "Choose Specialty"){
		specialty="";
	}

    var hospital = $.lblHospitalDialog.text;
    if(hospital == "Any Hospital/Medical Center" || hospital == "Choose Hospital/Medical Center"){
        hospital="";
    }
    
    var page = 1;

    init(10000);

    //hospital
    if(hospital == "Avisena Women & Children Specialist Hospital"){
        hospital = "Avisena Women";
    }

    else if(hospital == "Bintulu Specialist Hospital"){
        hospital = "Bintulu Medical Centre";
    }

    else if(hospital == "Gleneagles Medini Johor"){
        hospital = "Gleneagles Medini";
    }

    else if(hospital == "Hospital Islam Az Zahrah"){
        hospital = "Hospital Islam";
    }

    else if(hospital == "Hospital Pakar An-Nur Hasanah"){
        hospital = "Hasanah";
    }

    else if(hospital == "Hospital Pantai Puteri Ipoh"){
        hospital = "Pantai Puteri";
    }

    else if(hospital == "KPJ Sentosa KL"){
        hospital = "KPJ Sentosa";
    }

    else if(hospital == "KPJ Taiping Medical Centre"){
        hospital = "Taiping Medical Centre";
    }

    else if(hospital == "Mawar Medical Centre"){
        hospital = "Mawar Medical";
    }

    else if(hospital == "Prince Court Medical Centre PCMC, Petronas Hospital"){
        hospital = "Prince Court Medical Centre";
    }

    else if(hospital == "Putra Medical Centre (Alor Setar)"){
        hospital = "Putra Medical Centre, Alor Setar";
    }

    else if(hospital == "Putra Specialist Hospital (Melaka)"){
        hospital = "Putra Specialist Hospital";
    }

    else if(hospital == "Ramsay Sime Darby Health Care (SJMC)"){
        hospital = "Subang Jaya Medical Centre";
    }

    else if(hospital == "ReGen Rehabilitation International Hospital"){
        hospital = "ReGen Rehab Hospital";
    }

    else if(hospital == "UM Specialist Centre"){
        hospital = "University Malaya";
    }


    //Ear, Nose & Throat (ENT) -> Otorhinolaryngology
    if(specialty == "Ear, Nose & Throat (ENT)"){
        specialty = "Otorhinolaryngology";
        callNormal(name, state, specialty, hospital, page);
    }

    //"Haematology & Blood Disorder -> Haematology
    else if(specialty == "Haematology & Blood Disorder"){
        specialty = "Haematology";
        callNormal(name, state, specialty, hospital, page);
    }

    //Ophthalmology (Eyes) -> Ophthalmology
    else if(specialty == "Ophthalmology (Eyes)"){
        specialty = "Ophthalmology";
        callNormal(name, state, specialty, hospital, page);
    }

    //go to resultGM.js insted of result.js
    else if(specialty == "General Medicine"){
        callGM(name, state, specialty, hospital, page);
    }

    //go to result.js
    else{
        callNormal(name, state, specialty, hospital, page);
    }

    //hospital change
    var hospitalList = [
        "Choose Hospital/Medical Center",
        "Ar-Ridzuan", //check
        "Ara Damansara Medical Centre",
        "Assunta Hospital",
        "Avisena Specialist Hospital",
        "Avisena Women & Children Specialist Hospital", //Avisena women
        "Bagan Specialist Centre",
        "Bintulu Specialist Hospital", //Bintulu Medical Centre
        "Columbia Asia Seremban", //check
        "Damai Service Hospital",
        "Gleneagles Kota Kinabalu",
        "Gleneagles Kuala Lumpur",
        "Gleneagles Medini Johor", //Gleneagles Medini
        "Gleneagles Penang",
        "Hospital Islam Az Zahrah", //Hospital Islam
        "Hospital Pakar An-Nur Hasanah", //Hasanah
        "Hospital Pantai Puteri Ipoh", //pantai puteri
        "Hospital Pusrawi",
        "HSC Medical Center",
        "Institut Jantung Negara",
        "Kajang Plaza Medical Centre",
        "Kedah Medical Centre",
        "Kelana Jaya Medical Centre",
        "Kensington Green Specialist Centre",
        "Kota Bharu Medical Centre",
        "KPJ Ampang",
        "KPJ Bandar Dato Onn Specialist",
        "KPJ Bandar Maharani",
        "KPJ Batu Pahat",
        "KPJ Centre For Sight",
        "KPJ Damansara",
        "KPJ Ipoh",
        "KPJ Johor",
        "KPJ Kajang Specialist",
        "KPJ Klang",
        "KPJ Kluang Utama",
        "KPJ Kuching Specialist",
        "KPJ Miri",
        "KPJ Pahang",
        "KPJ Pasir Gudang",
        "KPJ Penang",
        "KPJ Perdana",
        "KPJ Perlis",
        "KPJ Puteri",
        "KPJ Rawang",
        "KPJ Sabah Specialist",
        "KPJ Selangor Specialist",
        "KPJ Sentosa KL", //KPJ Sentosa
        "KPJ Seremban Specialist",
        "KPJ Sibu",
        "KPJ Sri Manjung",
        "KPJ Taiping Medical Centre", //Taiping Medical Centre
        "KPJ Tawakkal Health Centre",
        "KPJ Tawakkal KL",
        "Kuala Terengganu Specialist Hospital",
        "Lam Wah Ee Hospital",
        "Loh Guan Lye Specialist Centre",
        "Mahkota Medical Centre",
        "Mawar Medical Centre", //Mawar Medical
        "Metro Specialist Hospital",
        "MSU",
        "Nilai Medical Centre",
        "NSCMH Medical Centre",
        "Oriental Melaka Straits Medical Centre",
        "Pahang Medical Centre",
        "Pantai Hospital Ampang",
        "Pantai Hospital Ayer Keroh",
        "Pantai Hospital Batu Pahat",
        "Pantai Hospital Cheras",
        "Pantai Hospital Klang",
        "Pantai Hospital Kuala Lumpur",
        "Pantai Hospital Laguna Merbok",
        "Pantai Hospital Manjung",
        "Pantai Hospital Penang",
        "Pantai Hospital Sungai Petani",
        "Parkcity Medical Centre",
        "Penang Adventist Hospital",
        "Prince Court Medical Centre PCMC, Petronas Hospital", //Prince Court Medical Centre
        "Putra Medical Centre (Alor Setar)", //Putra Medical Centre, Alor Setar
        "Putra Specialist Hospital (Melaka)", //Putra Specialist Hospital
        "Ramsay Sime Darby Health Care (SJMC)", //Subang Jaya Medical Centre
        "ReGen Rehabilitation International Hospital", //ReGen Rehab Hospital
        "Rejang Medical Centre",
        "Salam Senawang Specialist Hospital",
        "Sunway Medical Centre Velocity",
        "Taiping Medical Centre",
        "Tung Shin Hospital",
        "UiTM Private Specialist Centre",
        "UM Specialist Centre", //University Malaya
        "Any Hospital/Medical Center",
    ];
}

//normal result.js
function callNormal(name, state, specialty, hospital, page){
    Alloy.Globals.API.callByPost({url: "getSpecialistV2", new:true, domain: "FREEJINI_DOMAIN",  params: {name: name, state: state, specialty: specialty, hospital: hospital, page: page, limit: 10}}, function(responseText){
		
        var obj = JSON.parse(responseText);
        
        //if got data, redirect
        if(obj.data.length != 0){
            if(OS_IOS){
                Alloy.Globals.nav.navigationWindow("specialist_directory/resultGM", "", "", {data: obj, page: page, name: name, state: state, specialty: specialty, hospital: hospital});
            } else{
                var win = Alloy.createController("specialist_directory/resultGM", {data: obj, page: page, name: name, state: state, specialty: specialty, hospital: hospital}).getView();
                win.open();
            }
        }
        //if return no data, alert no result
        else{
            alert("No record found.");
            finish();
        }
        finish();
	});
}

//general medicine to go resultGM.js
function callGM(name, state, specialty, hospital, page){

    specialty = "Gastroenterology";

    Alloy.Globals.API.callByPost({url: "getSpecialistV2", new:true, domain: "FREEJINI_DOMAIN",  params: {name: name, state: state, specialty: specialty, hospital: hospital, page: page, limit: 10}}, function(responseText){
            
        var obj = JSON.parse(responseText);

        if(OS_IOS){
            Alloy.Globals.nav.navigationWindow("specialist_directory/resultGM", "", "", {data: obj, page: page, name: name, state: state, specialty: specialty, hospital: hospital, gm: 0});
        } else{
            var win = Alloy.createController("specialist_directory/resultGM", {data: obj, page: page, name: name, state: state, specialty: specialty, hospital: hospital, gm: 0}).getView();
            win.open();
        }
    });
}

/////state
var stateList = [
    "Choose Location",
    "Cyberjaya",
    "Johor",
    "Kedah",
    "Kelantan",
    "Kuala Lumpur",
    "Labuan",
    "Melaka",
    "Negeri Sembilan",
    "Pahang",
    "Penang",
    "Perak",
    "Perlis",
    "Putrajaya",
    "Sabah",
    "Sarawak",
    "Selangor",
    "Singapore",
    "Terengganu",
    "Any Location"
]

if(OS_ANDROID){
    var dState = $.UI.create("OptionDialog", {
        title: "State",
        options: stateList,
        buttonNames: ["Cancel"]
    });
} else{
    stateList.push("Cancel");
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
    if(stateList[e.index] == "Cancel" || stateList[e.index] == "Choose Location"){
        $.lblStateDialog.text = "Choose Location";
        $.lblStateDialog.color = "gray";

    } else {
        $.lblStateDialog.text = stateList[e.index];
        $.lblStateDialog.color = "black";
    }

    if ($.lblStateDialog.text == undefined || $.lblStateDialog.text == ""){
        $.lblStateDialog.text = "Choose Location";
        $.lblStateDialog.color = "gray";
    }
});
//state done

//general medicine
/* gastroenterology
hepatobiliary
geriatrics
cardiology
dermatology */


//speciality
var specialList = [
    "Choose Specialty",

    "Anaesthesiology And Critical Care",
    "Cardiology",
    "Dermatology",
    "Dentistry",
    "Ear, Nose & Throat (ENT)",
    "Emergency Medicine",
    "Family Medicine",
    "Gastroenterology",
    "General Medicine",
    "Geriatric",
    "Haematology & Blood Disorder",
    "Hepatobiliary",
    "Obstetrics And Gynaecology (O & G)",
    "Oncology",
    "Ophthalmology (Eyes)",
    "Orthopaedic",
    "Paediatric",
    "Pathology",
    "Psychiatry",
    "Radiology",
    "Rehabilitation Medicine",
    "Sports Medicine",
    "Surgery",
    "Transfusion Medicine",
    "Urology",

    "Any Specialty",
];

if(OS_ANDROID){
    var dSpecial = $.UI.create("OptionDialog", {
        title: "Specialty",
        options: specialList,
        buttonNames: ["Cancel"]
    });
} else{
    specialList.push("Cancel");
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
    if (specialList[e.index] == "Cancel" || specialList[e.index] == "Choose Specialty"){
        $.lblSpecialDialog.text = "Choose Specialty";
        $.lblSpecialDialog.color = "gray";
    } else{
        $.lblSpecialDialog.text = specialList[e.index];
        $.lblSpecialDialog.color = "black";
    }

    if ($.lblSpecialDialog.text == undefined || $.lblSpecialDialog.text == ""){
        $.lblSpecialDialog.text = "Choose Specialty";
        $.lblSpecialDialog.color = "gray";
    }
});
//speciality done


//medical center
var hospitalList = [
    "Choose Hospital/Medical Center",
    "Ar-Ridzuan", //check
    "Ara Damansara Medical Centre",
    "Assunta Hospital",
    "Avisena Specialist Hospital",
    "Avisena Women & Children Specialist Hospital", //Avisena women
    "Bagan Specialist Centre",
    "Bintulu Specialist Hospital", //Bintulu Medical Centre
    "Columbia Asia Seremban", //check
    "Damai Service Hospital",
    "Gleneagles Kota Kinabalu",
    "Gleneagles Kuala Lumpur",
    "Gleneagles Medini Johor", //Gleneagles Medini
    "Gleneagles Penang",
    "Hospital Islam Az Zahrah", //Hospital Islam
    "Hospital Pakar An-Nur Hasanah", //Hasanah
    "Hospital Pantai Puteri Ipoh", //pantai puteri
    "Hospital Pusrawi",
    "HSC Medical Center",
    "Institut Jantung Negara",
    "Kajang Plaza Medical Centre",
    "Kedah Medical Centre",
    "Kelana Jaya Medical Centre",
    "Kensington Green Specialist Centre",
    "Kota Bharu Medical Centre",
    "KPJ Ampang",
    "KPJ Bandar Dato Onn Specialist",
    "KPJ Bandar Maharani",
    "KPJ Batu Pahat",
    "KPJ Centre For Sight",
    "KPJ Damansara",
    "KPJ Ipoh",
    "KPJ Johor",
    "KPJ Kajang Specialist",
    "KPJ Klang",
    "KPJ Kluang Utama",
    "KPJ Kuching Specialist",
    "KPJ Miri",
    "KPJ Pahang",
    "KPJ Pasir Gudang",
    "KPJ Penang",
    "KPJ Perdana",
    "KPJ Perlis",
    "KPJ Puteri",
    "KPJ Rawang",
    "KPJ Sabah Specialist",
    "KPJ Selangor Specialist",
    "KPJ Sentosa KL", //KPJ Sentosa
    "KPJ Seremban Specialist",
    "KPJ Sibu",
    "KPJ Sri Manjung",
    "KPJ Taiping Medical Centre", //Taiping Medical Centre
    "KPJ Tawakkal Health Centre",
    "KPJ Tawakkal KL",
    "Kuala Terengganu Specialist Hospital",
    "Lam Wah Ee Hospital",
    "Loh Guan Lye Specialist Centre",
    "Mahkota Medical Centre",
    "Mawar Medical Centre", //Mawar Medical Centre
    "Metro Specialist Hospital",
    "MSU",
    "Nilai Medical Centre",
    "NSCMH Medical Centre",
    "Oriental Melaka Straits Medical Centre",
    "Pahang Medical Centre",
    "Pantai Hospital Ampang",
    "Pantai Hospital Ayer Keroh",
    "Pantai Hospital Batu Pahat",
    "Pantai Hospital Cheras",
    "Pantai Hospital Klang",
    "Pantai Hospital Kuala Lumpur",
    "Pantai Hospital Laguna Merbok",
    "Pantai Hospital Manjung",
    "Pantai Hospital Penang",
    "Pantai Hospital Sungai Petani",
    "Parkcity Medical Centre",
    "Penang Adventist Hospital",
    "Prince Court Medical Centre PCMC, Petronas Hospital", //Prince Court Medical Centre
    "Putra Medical Centre (Alor Setar)", //Putra Medical Centre, Alor Setar
    "Putra Specialist Hospital (Melaka)", //Putra Specialist Hospital
    "Ramsay Sime Darby Health Care (SJMC)", //Subang Jaya Medical Centre
    "ReGen Rehabilitation International Hospital", //ReGen Rehab Hospital
    "Rejang Medical Centre",
    "Salam Senawang Specialist Hospital",
    "Sunway Medical Centre Velocity",
    "Taiping Medical Centre",
    "Tung Shin Hospital",
    "UiTM Private Specialist Centre",
    "UM Specialist Centre", //University Malaya
    "Any Hospital/Medical Center",
];

if(OS_ANDROID){
    var dHospital = $.UI.create("OptionDialog", {
        title: "Hospital/Medical Center",
        options: hospitalList,
        buttonNames: ["Cancel"],
    });
} else{
    hospitalList.push("Cancel");
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
    if (hospitalList[e.index] == "Cancel" || hospitalList[e.index] == "Choose Hospital/Medical Center"){
        $.lblHospitalDialog.text = "Choose Hospital/Medical Center";
        $.lblHospitalDialog.color = "gray";
    } else{
        $.lblHospitalDialog.text = hospitalList[e.index];
        $.lblHospitalDialog.color = "black";
    }

    if ($.lblHospitalDialog.text == undefined || $.lblHospitalDialog.text == ""){
        $.lblHospitalDialog.text = "Choose Hospital/Medical Center";
        $.lblHospitalDialog.color = "gray";
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
////auto complete done

function doHome(){
    if(OS_IOS){
        Alloy.Globals.nav.navigationWindow("home", "", "", {});
    } else{
        var win = Alloy.createController("home").getView();
        win.open();
    }
}

