var mainView = null;

exports.construct = function(mv) {
    mainView = mv;
};

exports.hideKeyboard = function() {
    mainView.treatmentTextArea.blur();
    mainView.proceduceTextArea.blur();
};