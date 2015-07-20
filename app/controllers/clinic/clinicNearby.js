var args = arguments[0] || {};
var longitude = args.longitude || "";
var latitude = args.latitude || "";

var list = API.getNearbyClinic({longitude:longitude, latitude:latitude }); 
