var mainView = null;

exports.construct = function(mv) {
    mainView = mv;
};

exports.deconstruct = function() {
    mainView = null;
};

exports.createAlert = function(tt, msg, callback) {
    var box = Titanium.UI.createAlertDialog({
        title: tt,
        ok: "OK",
        message: msg
    });
    box.show();
    box.addEventListener("click", function(e) {
        0 == e.index && "function" == typeof callback && callback && callback();
    });
};

exports.showImageIndicator = function() {
    var ind;
    var ind = Ti.UI.createActivityIndicator({
        style: Ti.UI.ActivityIndicatorStyle.DARK,
        bottom: 10,
        right: 20,
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        zIndex: 11
    });
    return ind;
};

exports.imageIndicatorEvent = function(theImage, activityIndicator) {
    theImage.addEventListener("load", function() {
        activityIndicator.hide();
    });
};

exports.noRecord = function() {
    var data = [];
    var row = Titanium.UI.createTableViewRow({
        touchEnabled: false,
        backgroundColor: "transparent"
    });
    var tblView = Ti.UI.createView({
        height: "auto"
    });
    var noRecord = Ti.UI.createLabel({
        text: "No record found",
        color: "#375540",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontSize: 14,
            fontStyle: "italic"
        },
        top: 15,
        bottom: 15,
        width: "100%"
    });
    tblView.add(noRecord);
    row.add(tblView);
    data.push(row);
    return data;
};

exports.showLoading = function() {
    mainView.loadingBar.opacity = "1";
    mainView.loadingBar.zIndex = "100";
    mainView.loadingBar.height = "120";
    mainView.activityIndicator.style = Ti.UI.ActivityIndicatorStyle.BIG;
    mainView.activityIndicator.show();
};

exports.hideLoading = function() {
    mainView.activityIndicator.hide();
    mainView.loadingBar.opacity = "0";
    mainView.loadingBar.height = "0";
};

exports.createCustomAlert = function(win, title, msg) {
    var mask = Titanium.UI.createView({
        width: "100%",
        height: "100%",
        zIndex: 19,
        backgroundColor: "#000",
        opacity: .45
    });
    var box = Titanium.UI.createView({
        width: "90%",
        height: Ti.UI.SIZE,
        layout: "vertical",
        opacity: 1,
        zIndex: 20
    });
    var header = Titanium.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        backgroundColor: "#EA2035"
    });
    var head_title = Titanium.UI.createLabel({
        text: title,
        top: "20dp",
        left: "20dp",
        right: "20dp",
        bottom: "20dp",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE
    });
    header.add(head_title);
    var content = Titanium.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        backgroundColor: "#fff",
        layout: "vertical"
    });
    var content_text = Titanium.UI.createLabel({
        text: msg,
        top: "20dp",
        left: "20dp",
        right: "20dp",
        bottom: "20dp",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE
    });
    var okButton = Ti.UI.createButton({
        title: "ok",
        width: "100dp",
        height: "40dp",
        bottom: "20dp"
    });
    content.add(content_text);
    content.add(okButton);
    box.add(header);
    box.add(content);
    win.add(box);
    win.add(mask);
    okButton.addEventListener("click", function() {
        win.remove(box);
        win.remove(mask);
    });
};

exports.CheckboxwithText = function(text, highlightText, checkboxspecs) {
    var checkbox = this.createCheckbox({}, checkboxspecs);
    var label_sms = Titanium.UI.createLabel({
        text: text,
        width: "auto",
        height: Ti.UI.SIZE,
        font: {
            fontSize: 12
        }
    });
    var label_privacy = Titanium.UI.createLabel({
        text: highlightText,
        width: "auto",
        height: Ti.UI.SIZE,
        color: "#CE1D1C",
        font: {
            fontWeight: "bold",
            fontSize: 12
        }
    });
    var view_sms_box = Titanium.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        layout: "horizontal"
    });
    view_sms_box.add(checkbox);
    view_sms_box.add(label_sms);
    view_sms_box.add(label_privacy);
    label_privacy.addEventListener("touchend", function() {
        nav.navigationWindow("tnc");
    });
    return view_sms_box;
};

exports.createCheckbox = function(specs, checkboxspecs, image) {
    function togglecheck() {
        if (viw.checked) {
            viw.checked = false;
            imageView.opacity = 0;
        } else {
            viw.checked = true;
            imageView.opacity = 1;
        }
    }
    "object" != typeof checkboxspecs && (checkboxspecs = {});
    checkboxspecs.width = checkboxspecs.width || 25;
    checkboxspecs.backgroundColor = checkboxspecs.unCheckedColor || "white";
    checkboxspecs.height = checkboxspecs.height || 25;
    checkboxspecs.border = checkboxspecs.border || 1;
    checkboxspecs.borderColor = checkboxspecs.borderColor || "silver";
    var imageView = Ti.UI.createImageView({
        image: image || "images/checkbox.gif",
        height: 1.5 * checkboxspecs.height,
        bottom: 3 + .5 * checkboxspecs.height,
        left: 3 + .5 * checkboxspecs.width,
        opacity: 0
    });
    var viw = Ti.UI.createView(checkboxspecs);
    specs.width = 1.5 * checkboxspecs.width;
    specs.height = 1.5 * checkboxspecs.height;
    var outerview = Ti.UI.createView({
        width: 1.5 * specs.width,
        height: 1.5 * specs.height
    });
    var clickview = Ti.UI.createView({
        width: checkboxspecs.width,
        height: checkboxspecs.height
    });
    outerview.add(viw);
    outerview.add(imageView);
    outerview.add(clickview);
    clickview.addEventListener("click", togglecheck);
    return outerview;
};

exports.resultPopUp = function(title, msg) {
    var mask = Titanium.UI.createView({
        width: "100%",
        height: "100%",
        zIndex: 999,
        backgroundColor: "#000",
        opacity: .45
    });
    var box = mainView.UI.create("View", {
        classes: [ "hsize", "vert" ],
        width: "90%",
        opacity: 1,
        zIndex: 1999
    });
    var header = mainView.UI.create("View", {
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        backgroundColor: "#CE1D1C"
    });
    var head_title = mainView.UI.create("Label", {
        text: title,
        classes: [ "padding" ],
        color: "#ffffff"
    });
    header.add(head_title);
    var content = mainView.UI.create("View", {
        classes: [ "hsize", "wfill", "vert" ],
        backgroundColor: "#fff"
    });
    var content_text = mainView.UI.create("Label", {
        classes: [ "hsize", "wfill", "padding" ],
        text: msg
    });
    var btnView = mainView.UI.create("View", {
        classes: [ "hsize", "wfill" ],
        backgroundColor: "#fff",
        textAlign: "center"
    });
    var okButton = Ti.UI.createButton({
        title: "OK",
        width: "30%",
        backgroundColor: "#F1F1F1",
        borderColor: "#CE1D1C",
        color: "#CE1D1C",
        borderRadius: 10,
        height: Ti.UI.SIZE,
        bottom: "20dp"
    });
    btnView.add(okButton);
    content.add(content_text);
    content.add(btnView);
    box.add(header);
    box.add(content);
    mainView.win.add(box);
    mainView.win.add(mask);
    okButton.addEventListener("click", function() {
        mainView.win.remove(box);
        mainView.win.remove(mask);
    });
};

exports.now = function() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    var hours = today.getHours();
    var minutes = today.getMinutes();
    var sec = today.getSeconds();
    10 > minutes && (minutes = "0" + minutes);
    10 > sec && (sec = "0" + sec);
    10 > dd && (dd = "0" + dd);
    10 > mm && (mm = "0" + mm);
    datetime = yyyy + "-" + mm + "-" + dd + " " + hours + ":" + minutes + ":" + sec;
    return datetime;
};