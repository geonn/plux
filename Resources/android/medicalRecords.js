var mainView = null;

exports.construct = function(mv) {
    mainView = mv;
};

exports.hideKeyboard = function() {
    mainView.recordsTextArea.blur();
    mainView.recordsTextArea.setHeight("100%");
};