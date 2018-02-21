var m_names = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");

function currentDate(dayToAdd) {

	var date = new Date();
	var geoDate = date.getTime() + dayToAdd * 24 * 60 * 60 * 1000;
	geoDate = new Date(geoDate);

	var dd = geoDate.getDate();
	var mm = geoDate.getMonth();
	var yy = geoDate.getFullYear();
	return dd + " " + m_names[mm] + "" + yy.toString().substr(2, 2);
}

function currentMonthYear(monthToAdd) {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + monthToAdd;
	var yy = today.getFullYear();
	if (mm < 1) {
		yy--;
		mm = 12 + (today.getMonth() + monthToAdd);
	}
	if (mm > 12) {
		yy++;
		mm = today.getMonth() + monthToAdd - 12;
	}
	return m_names[mm] + " " + yy.toString().substr(2, 2);
}