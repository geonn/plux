var common = require("common");

exports.checkLogin = function() {
    var memno = Ti.App.Properties.getString("memno");
    return void 0 === typeof memno || null == memno || "" == memno ? false : true;
};