function eventManager(e) {
    console.log(e.type + " fired!");
    console.log(e);
    function_onoff_array[e.type] && function_array[e.type](e);
}

var function_array = [];

var function_onoff_array = [];

exports.fireEvent = function(name, params) {
    eval("Ti.App.fireEvent('" + name + "', params)");
};

exports.event_onoff = function(name, bool) {
    function_onoff_array[name] = bool;
};

exports.addEventListener = function(name, callback) {
    Ti.App.addEventListener(name, eventManager);
    function_array[name] = callback;
    function_onoff_array[name] = true;
};

exports.removeEventListener = function(name) {
    Ti.App.removeEventListener(name, eventManager);
    function_array[name] = null;
    function_onoff_array[name] = null;
};