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
        cancel.addEventListener("click", function(e) {
            for (a = 0; a < form.length; a++) form[a].blur();
        });
        var textField;
        var textField = $.UI.create("TextField", {
            width: Ti.UI.FILL,
            height: 40,
            backgroundColor: "#ffffff",
            borderRadius: 5
        });
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
    var weight = form[0].value;
    var height = form[1].value;
    if ("" == weight || "" == height) {
        common.createAlert("Error", "You must key in both weight and height");
        return false;
    }
    var result = weight / (height / 100 * (height / 100));
    var result = result.toFixed(2);
    18.5 >= result ? resultPopUp("RESULT", "Your BMI " + result + " \n\nUNDERWEIGHT\n\nYou are under weight for your height. It's important to aim to keep within your healthy weight range. Being in the healthy weight range will improve your body's ability to fight off infection or illness.") : 23 >= result ? resultPopUp("RESULT", "Your BMI " + result + " \n\nHEALTHY RANGE\n\nYou are a healthy range for your height. Aim to keep within the ideal weight range by eating a healthy, well-balanced diet and exercising regularly. Most adults should be active for 30 minutes on most days. ") : 27.5 >= result ? resultPopUp("RESULT", "Your BMI " + result + " \n\nOVERWEIGHT\n\nBeing overweight increases your risk of developing coronary heart disease, as well as other health conditions such as diabetes. Keeping to a healthy weight will help you control your blood pressure and cholesterol levels. You lose weight if the amount of energy coming into your body is less than what is being used up by your body. Aim to exercise more and eat a healthy balanced diet. ") : resultPopUp("RESULT", "Your BMI " + result + " \n\nOBESE\n\nBeing obese increases your risk of developing coronary heart disease, as well as other health conditions such as diabetes. Keeping to a healthy weight will help you control your blood pressure and cholesterol levels. You lose weight if the amount of energy coming into your body is less than what is being used up by your body. Aim to exercise more and eat a healthy balanced diet. ");
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
        backgroundColor: "#CE1D1C"
    });
    var head_title = $.UI.create("Label", {
        text: title,
        classes: [ "padding" ],
        color: "#ffffff"
    });
    header.add(head_title);
    var content = Titanium.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        backgroundColor: "#fff",
        layout: "vertical"
    });
    var content_text = $.UI.create("Label", {
        classes: [ "hsize", "wfill", "padding" ],
        text: msg
    });
    var btnView = Titanium.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        backgroundColor: "#fff",
        textAlign: "center",
        layout: "horizontal"
    });
    var okButton = Ti.UI.createButton({
        left: 40,
        title: "OK",
        width: "30%",
        backgroundColor: "#F1F1F1",
        borderColor: "#CE1D1C",
        color: "#CE1D1C",
        borderRadius: 10,
        height: Ti.UI.SIZE,
        bottom: "20dp"
    });
    var saveButton = Ti.UI.createButton({
        title: "Save BMI",
        width: "50%",
        left: 10,
        backgroundColor: "#F1F1F1",
        borderColor: "#CE1D1C",
        color: "#CE1D1C",
        borderRadius: 10,
        height: Ti.UI.SIZE,
        bottom: "20dp"
    });
    btnView.add(okButton);
    btnView.add(saveButton);
    content.add(content_text);
    content.add(btnView);
    box.add(header);
    box.add(content);
    $.hraDetailsWin.add(box);
    $.hraDetailsWin.add(mask);
    okButton.addEventListener("click", function() {
        $.hraDetailsWin.remove(box);
        $.hraDetailsWin.remove(mask);
    });
    saveButton.addEventListener("click", function() {
        var weight = form[0].value;
        var height = form[1].value;
        var result = weight / (height / 100 * (height / 100));
        var result = result.toFixed(2);
        var currentDT = currentDateTime();
        var datetime = currentDT.split(" ");
        var lib_health = Alloy.createCollection("health");
        lib_health.addHealthData({
            date: datetime[0],
            time: datetime[1],
            field1: weight,
            field2: height / 100,
            amount: result,
            type: 1
        });
        saveButton.hide();
        common.createAlert("BMI", "BMI's record saved");
    });
}

var $ = null;

var form = null;

exports.title = "Body Mass Index (BMI) Calculator";

exports.construct = function(mv) {
    $ = mv;
    form = [];
};

exports.description = function() {
    var label_desc1 = $.UI.create("Label", {
        classes: [ "title" ],
        text: "Body Mass Index (BMI) Calculator"
    });
    var label_desc2 = $.UI.create("Label", {
        classes: [ "paragraph" ],
        text: "BMI stands for Body Mass index. It is used to give you an idea of whether you’re underweight, overweight or an ideal weight for your height. It’s useful to know because if your weight increases or decreases outside of the ideal range, your health risks may increase. "
    });
    var label_desc3 = $.UI.create("Label", {
        classes: [ "title" ],
        top: 10,
        text: "How accurate is BMI?"
    });
    var label_desc4 = $.UI.create("Label", {
        classes: [ "paragraph" ],
        text: "The BMI is a useful measurement for most people over 18. However there are some limitations to be aware of as it may be influenced by age, gender and ethnicity. If you're pregnant, the BMI does not apply. You should seek advice from your healthcare professional on what a healthy weight is. "
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
    view_container.add(label_desc3);
    view_container.add(label_desc4);
    return view_container;
};

exports.input_box = function() {
    var view_header = $.UI.create("View", {
        classes: [ "header_view" ]
    });
    var label_header_text = $.UI.create("Label", {
        classes: [ "header_text" ],
        text: "Enter your height and weight to calculate :"
    });
    view_header.add(label_header_text);
    var view_inputbox = $.UI.create("View", {
        backgroundColor: "#efefef",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        layout: "vertical"
    });
    view_inputbox.add(view_header);
    view_inputbox.add(addForm("Weight (kg)", "TextField"));
    view_inputbox.add(addForm("Height (cm)", "TextField"));
    var button_submit = $.UI.create("Button", {
        title: "Calculate",
        top: 10,
        bottom: 10,
        width: 100,
        height: 50,
        backgroundColor: "#CE1D1C",
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
    button_submit.addEventListener("click", function(e) {
        formular();
    });
    return view_container;
};