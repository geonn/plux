var args = arguments[0] || {};
var mod = args.mod;

var module = require("hra/"+mod);
module.construct($);
$.win.title = module.title;
$.description.add(module.description());
$.input_box.add(module.input_box());
