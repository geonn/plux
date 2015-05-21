var args = arguments[0] || {};
var usersModel = Alloy.createCollection('users');
var data = usersModel.getUserByEmpNo();
var healthModel = Alloy.createCollection('personalInfo');
var personal_health_data = healthModel.getOwnerData();
//var tmp_data = '[{"memno":"AGIL00005","icno":"AGIL00005","name":"KHAIRIL AZMY BIN MOHD AMINUDDIN","relation":"PRINCIPLE","allergy":"Peanut Allergy, Skin","empno":"00005","corpcode":"C001","corpname":"COMPANY DEMO (M) SDN BHD","costcenter":"","dept":""},{"memno":"AGIL00005W","icno":"","name":"ZETI AZRI ZAMBAHARI","relation":"WIFE","allergy":"","empno":"00005","corpcode":"C001","corpname":"COMPANY DEMO (M) SDN BHD","costcenter":"","dept":""},{"memno":"AGIL00005C1","icno":"","name":"ELEESYA SOFEA","relation":"CHILD","allergy":"","empno":"00005","corpcode":"C001","corpname":"COMPANY DEMO (M) SDN BHD","costcenter":"","dept":""},{"memno":"AGIL00005C2","icno":"","name":"MUHAMMAD IMRAN","relation":"CHILD","allergy":"Peanut Allergy, Skin","empno":"00005","corpcode":"C001","corpname":"COMPANY DEMO (M) SDN BHD","costcenter":"","dept":""}]';

data[0]['personal_health'] = personal_health_data;
for (var i=0; i < data.length; i++) {
  	var profile_view = Alloy.createController("_profile_view", {profile_data: data[i]}).getView(); 	
  	$.main.addView(profile_view);
};