function addForm(text, type) {
    if ("TextField" == type) {
        var label_textfield = $.UI.create("Label", {
            text: text,
            width: Ti.UI.FILL,
            height: Ti.UI.SIZE
        });
        var cancel = Titanium.UI.createButton({
            backgroundImage: "/images/btn-down.png",
            textAlign: "right",
            right: 0,
            width: 20,
            height: 20
        });
        cancel.addEventListener("click", function() {
            for (a = 0; a < form.length; a++) form[a].blur();
        });
        if ("android" == Ti.Platform.osname) var textField = $.UI.create("TextField", {
            width: Ti.UI.FILL,
            height: 40,
            backgroundColor: "#ffffff",
            borderRadius: 5
        }); else {
            var keyboardToolbarButtons = Ti.UI.iOS.createToolbar({
                items: [ cancel ],
                right: 5,
                width: 20,
                height: 20
            });
            var textField = $.UI.create("TextField", {
                width: Ti.UI.FILL,
                height: 40,
                keyboardToolbar: keyboardToolbarButtons,
                backgroundColor: "#ffffff",
                borderRadius: 5
            });
        }
        var view_textfield = $.UI.create("View", {
            width: Ti.UI.FILL,
            height: Ti.UI.SIZE,
            left: 10,
            right: 10,
            top: 10,
            bottom: 10,
            layout: "vertical"
        });
        form.push(textField);
        view_textfield.add(label_textfield);
        view_textfield.add(textField);
        return view_textfield;
    }
}

function formular() {
    var a = form[0].value;
    var b = form[1].value;
    var c = form[2].value;
    var d = form[3].value;
    var weekly = (a / b * c * 7).toFixed(2);
    var monthly = (a / b * c * 30).toFixed(2);
    var yearly = (a / b * c * 365).toFixed(2);
    var cost_to_date = (a / b * c * 365 * d).toFixed(2);
    resultPopUp("RESULT", "Weekly Cost: RM" + weekly + "\nMonthly Cost: RM" + monthly + "\nYearly Cost: RM" + yearly + "\nCost To-Date: RM" + cost_to_date);
}

function resultPopUp(title, msg) {
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
        color: "#ffffff",
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
        title: "OK",
        width: "100dp",
        backgroundColor: "#CE1D1C",
        color: "#ffffff",
        height: "40dp",
        bottom: "20dp"
    });
    content.add(content_text);
    content.add(okButton);
    box.add(header);
    box.add(content);
    $.hraDetailsWin.add(box);
    $.hraDetailsWin.add(mask);
    okButton.addEventListener("click", function() {
        $.hraDetailsWin.remove(box);
        $.hraDetailsWin.remove(mask);
    });
}

var $ = null;

var form = null;

exports.title = "Smoking Cost Calculator";

exports.construct = function(mv) {
    $ = mv;
    form = [];
};

exports.description = function() {
    var label_desc1 = $.UI.create("Label", {
        classes: [ "title" ],
        text: "Smoking Cost Calculator"
    });
    var label_desc2 = $.UI.create("Label", {
        classes: [ "paragraph" ],
        text: "Quitting smoking really does lead to a richer life. Use this quit calculator tool to see just how much you will be saving once you’re tobacco-free. You’ll be amazed at how much it all adds up! "
    });
    var view_container = $.UI.create("View", {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        layout: "vertical"
    });
    view_container.add(label_desc1);
    view_container.add(label_desc2);
    return view_container;
};

exports.input_box = function() {
    var view_header = $.UI.create("View", {
        classes: [ "header_view" ]
    });
    var label_header_text = $.UI.create("Label", {
        classes: [ "header_text" ],
        text: "Enter the figures to calculate :"
    });
    view_header.add(label_header_text);
    var view_inputbox = $.UI.create("View", {
        backgroundColor: "#efefef",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        layout: "vertical"
    });
    view_inputbox.add(view_header);
    view_inputbox.add(addForm("How much do you pay for a pack of cigarettes?", "TextField"));
    view_inputbox.add(addForm("How many cigarettes are in a pack?", "TextField"));
    view_inputbox.add(addForm("How many cigarettes do you smoke in a day?", "TextField"));
    view_inputbox.add(addForm("How many years have you been smoking?", "TextField"));
    var button_submit = $.UI.create("Button", {
        title: "Calculate",
        top: 10,
        bottom: 10,
        width: 100,
        height: 50,
        backgroundColor: "#ff0000",
        borderColor: "#cccccc",
        color: "#ffffff"
    });
    view_inputbox.add(button_submit);
    var view_container = $.UI.create("View", {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        layout: "vertical"
    });
    view_container.add(view_inputbox);
    button_submit.addEventListener("click", function() {
        formular();
    });
    return view_container;
};