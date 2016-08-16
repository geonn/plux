function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "aboutUs";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "#FFFFFF",
        fullscreen: true,
        layout: "vertical",
        width: Ti.UI.FILL,
        navTintColor: "#CE1D1C",
        title: "About PLUX",
        id: "win"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
<<<<<<< HEAD
    $.__views.__alloyId38 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId38"
    });
    $.__views.win.add($.__views.__alloyId38);
    $.__views.__alloyId39 = Ti.UI.createView({
=======
    $.__views.__alloyId26 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId26"
    });
    $.__views.win.add($.__views.__alloyId26);
    $.__views.__alloyId27 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        height: 50,
        width: "100%",
        backgroundColor: "#DEDEDE",
<<<<<<< HEAD
        id: "__alloyId39"
    });
    $.__views.__alloyId38.add($.__views.__alloyId39);
    $.__views.__alloyId40 = Ti.UI.createView({
        left: 0,
        width: "10%",
        id: "__alloyId40"
    });
    $.__views.__alloyId39.add($.__views.__alloyId40);
=======
        id: "__alloyId27"
    });
    $.__views.__alloyId26.add($.__views.__alloyId27);
    $.__views.__alloyId28 = Ti.UI.createView({
        left: 0,
        width: "10%",
        id: "__alloyId28"
    });
    $.__views.__alloyId27.add($.__views.__alloyId28);
>>>>>>> origin/master
    $.__views.btnBack = Ti.UI.createImageView({
        left: 10,
        id: "btnBack",
        width: 25,
        height: 25,
        image: "/images/btn-back.png"
    });
<<<<<<< HEAD
    $.__views.__alloyId40.add($.__views.btnBack);
=======
    $.__views.__alloyId28.add($.__views.btnBack);
>>>>>>> origin/master
    $.__views.pageTitle = Ti.UI.createView({
        id: "pageTitle",
        width: Ti.UI.FILL
    });
<<<<<<< HEAD
    $.__views.__alloyId39.add($.__views.pageTitle);
    $.__views.__alloyId41 = Ti.UI.createLabel({
=======
    $.__views.__alloyId27.add($.__views.pageTitle);
    $.__views.__alloyId29 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#606060",
        font: {
            fontSize: "16dp"
        },
        text: "About PLUX",
        textAlign: "center",
<<<<<<< HEAD
        id: "__alloyId41"
    });
    $.__views.pageTitle.add($.__views.__alloyId41);
=======
        id: "__alloyId29"
    });
    $.__views.pageTitle.add($.__views.__alloyId29);
>>>>>>> origin/master
    $.__views.main = Ti.UI.createScrollView({
        id: "main",
        layout: "vertical",
        height: "100%",
        contentHeight: Ti.UI.SIZE
    });
<<<<<<< HEAD
    $.__views.__alloyId38.add($.__views.main);
    $.__views.__alloyId42 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: 95,
        id: "__alloyId42"
    });
    $.__views.main.add($.__views.__alloyId42);
    $.__views.__alloyId43 = Ti.UI.createImageView({
=======
    $.__views.__alloyId26.add($.__views.main);
    $.__views.__alloyId30 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: 95,
        id: "__alloyId30"
    });
    $.__views.main.add($.__views.__alloyId30);
    $.__views.__alloyId31 = Ti.UI.createImageView({
>>>>>>> origin/master
        borderRadius: 10,
        width: 80,
        height: 80,
        left: 10,
        top: 10,
        image: "/images/logo_plux.png",
<<<<<<< HEAD
        id: "__alloyId43"
    });
    $.__views.__alloyId42.add($.__views.__alloyId43);
    $.__views.__alloyId44 = Ti.UI.createView({
=======
        id: "__alloyId31"
    });
    $.__views.__alloyId30.add($.__views.__alloyId31);
    $.__views.__alloyId32 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        left: 10,
        top: 10,
<<<<<<< HEAD
        id: "__alloyId44"
    });
    $.__views.__alloyId42.add($.__views.__alloyId44);
    $.__views.__alloyId45 = Ti.UI.createLabel({
=======
        id: "__alloyId32"
    });
    $.__views.__alloyId30.add($.__views.__alloyId32);
    $.__views.__alloyId33 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Ti.UI.FILL,
        height: Titanium.UI.SIZE,
        color: "#CE1D1C",
        font: {
            fontSize: 18,
            fontWeight: "bold"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        text: "PLUX",
<<<<<<< HEAD
        id: "__alloyId45"
    });
    $.__views.__alloyId44.add($.__views.__alloyId45);
    $.__views.__alloyId46 = Ti.UI.createLabel({
=======
        id: "__alloyId33"
    });
    $.__views.__alloyId32.add($.__views.__alloyId33);
    $.__views.__alloyId34 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Ti.UI.FILL,
        height: Titanium.UI.SIZE,
        color: "#606060",
        font: {
            fontSize: 14
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        text: "Version 1.0.0",
<<<<<<< HEAD
        id: "__alloyId46"
    });
    $.__views.__alloyId44.add($.__views.__alloyId46);
    $.__views.__alloyId47 = Ti.UI.createLabel({
=======
        id: "__alloyId34"
    });
    $.__views.__alloyId32.add($.__views.__alloyId34);
    $.__views.__alloyId35 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Ti.UI.FILL,
        height: Titanium.UI.SIZE,
        color: "#606060",
        font: {
            fontSize: 14
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        text: "Copyright ©2015. All Rights Reserved.",
<<<<<<< HEAD
        id: "__alloyId47"
    });
    $.__views.__alloyId44.add($.__views.__alloyId47);
    $.__views.__alloyId48 = Ti.UI.createLabel({
=======
        id: "__alloyId35"
    });
    $.__views.__alloyId32.add($.__views.__alloyId35);
    $.__views.__alloyId36 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#6E6E6E",
        font: {
            fontSize: "14"
        },
        left: "10",
        textAlign: "left",
        right: "10",
        text: "Plux is an app by ASP Medical Group that is reinventing the way companies manage their health care benefits programmes.",
        top: 10,
<<<<<<< HEAD
        id: "__alloyId48"
    });
    $.__views.main.add($.__views.__alloyId48);
    $.__views.__alloyId49 = Ti.UI.createLabel({
=======
        id: "__alloyId36"
    });
    $.__views.main.add($.__views.__alloyId36);
    $.__views.__alloyId37 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#6E6E6E",
        font: {
            fontSize: "14"
        },
        left: "10",
        textAlign: "left",
        right: "10",
        text: "The ASP Medical Group is committed to improving the quality of health care through the use of technology. Our expertise is in providing comprehensive, hassle-free support for corporate medical benefit programmes. Hundreds of companies have already benefitted from our powerful employee medical benefit administration system, which makes cashless consultations available at a network of over 1000 clinics in Malaysia via our comprehensive claim management service.",
        bottom: 5,
<<<<<<< HEAD
        id: "__alloyId49"
    });
    $.__views.main.add($.__views.__alloyId49);
    $.__views.__alloyId50 = Ti.UI.createLabel({
=======
        id: "__alloyId37"
    });
    $.__views.main.add($.__views.__alloyId37);
    $.__views.__alloyId38 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#6E6E6E",
        font: {
            fontSize: "14"
        },
        left: "10",
        textAlign: "left",
        right: "10",
        text: "Now, we are making administrating corporate health care programmes even simpler, with Plux.",
        bottom: 5,
<<<<<<< HEAD
        id: "__alloyId50"
    });
    $.__views.main.add($.__views.__alloyId50);
    $.__views.__alloyId51 = Ti.UI.createLabel({
=======
        id: "__alloyId38"
    });
    $.__views.main.add($.__views.__alloyId38);
    $.__views.__alloyId39 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#6E6E6E",
        font: {
            fontSize: "14"
        },
        left: "10",
        textAlign: "left",
        right: "10",
        text: "Plux is a FREE app that automates most of the management, claims and tracking functions that are performed by companies’ HR departments. Plux also helps employees keep track of their own medical claims with just a few taps on their smartphones. In addition, Plux members enjoy amazing convenience at their fingertips – they can speak to doctors live via video, as well as access tips and tools to help them manage their health and feel good every day!",
        bottom: 5,
<<<<<<< HEAD
        id: "__alloyId51"
    });
    $.__views.main.add($.__views.__alloyId51);
    $.__views.__alloyId52 = Ti.UI.createLabel({
=======
        id: "__alloyId39"
    });
    $.__views.main.add($.__views.__alloyId39);
    $.__views.__alloyId40 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#CC2228",
        font: {
            fontSize: "18"
        },
        left: "10",
        right: "10",
        text: "FEATURES:",
        top: 10,
<<<<<<< HEAD
        id: "__alloyId52"
    });
    $.__views.main.add($.__views.__alloyId52);
    $.__views.__alloyId53 = Ti.UI.createLabel({
=======
        id: "__alloyId40"
    });
    $.__views.main.add($.__views.__alloyId40);
    $.__views.__alloyId41 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#6E6E6E",
        font: {
            fontSize: "14"
        },
        left: "10",
        textAlign: "left",
        right: "10",
        text: "- for the maintenance of customer database and customer service related processes;",
        bottom: 3,
<<<<<<< HEAD
        id: "__alloyId53"
    });
    $.__views.main.add($.__views.__alloyId53);
    $.__views.__alloyId54 = Ti.UI.createView({
=======
        id: "__alloyId41"
    });
    $.__views.main.add($.__views.__alloyId41);
    $.__views.__alloyId42 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        left: 10,
        bottom: 3,
<<<<<<< HEAD
        id: "__alloyId54"
    });
    $.__views.main.add($.__views.__alloyId54);
    $.__views.__alloyId55 = Ti.UI.createLabel({
=======
        id: "__alloyId42"
    });
    $.__views.main.add($.__views.__alloyId42);
    $.__views.__alloyId43 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#6E6E6E",
        font: {
            fontWeight: "bold",
            fontSize: "14"
        },
        left: "10",
        textAlign: "left",
        right: "10",
        text: "- Save Time",
<<<<<<< HEAD
        id: "__alloyId55"
    });
    $.__views.__alloyId54.add($.__views.__alloyId55);
    $.__views.__alloyId56 = Ti.UI.createLabel({
=======
        id: "__alloyId43"
    });
    $.__views.__alloyId42.add($.__views.__alloyId43);
    $.__views.__alloyId44 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#6E6E6E",
        font: {
            fontSize: "14"
        },
        left: "10",
        textAlign: "left",
        right: "10",
        text: "Plux takes the pain out of administering a medical benefits programme! No more paper forms, manual claims, or calling the doctor. Much of the paperwork is automated with Plux.",
<<<<<<< HEAD
        id: "__alloyId56"
    });
    $.__views.__alloyId54.add($.__views.__alloyId56);
    $.__views.__alloyId57 = Ti.UI.createView({
=======
        id: "__alloyId44"
    });
    $.__views.__alloyId42.add($.__views.__alloyId44);
    $.__views.__alloyId45 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        left: 10,
        bottom: 3,
<<<<<<< HEAD
        id: "__alloyId57"
    });
    $.__views.main.add($.__views.__alloyId57);
    $.__views.__alloyId58 = Ti.UI.createLabel({
=======
        id: "__alloyId45"
    });
    $.__views.main.add($.__views.__alloyId45);
    $.__views.__alloyId46 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#6E6E6E",
        font: {
            fontWeight: "bold",
            fontSize: "14"
        },
        left: "10",
        textAlign: "left",
        right: "10",
        text: "- Save Money",
<<<<<<< HEAD
        id: "__alloyId58"
    });
    $.__views.__alloyId57.add($.__views.__alloyId58);
    $.__views.__alloyId59 = Ti.UI.createLabel({
=======
        id: "__alloyId46"
    });
    $.__views.__alloyId45.add($.__views.__alloyId46);
    $.__views.__alloyId47 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#6E6E6E",
        font: {
            fontSize: "14"
        },
        left: "10",
        textAlign: "left",
        right: "10",
        text: "Plux powerful back-end support automates much of the administration process involved in medical benefits programmes, freeing up company resources that can be used more effectively elsewhere.",
<<<<<<< HEAD
        id: "__alloyId59"
    });
    $.__views.__alloyId57.add($.__views.__alloyId59);
    $.__views.__alloyId60 = Ti.UI.createView({
=======
        id: "__alloyId47"
    });
    $.__views.__alloyId45.add($.__views.__alloyId47);
    $.__views.__alloyId48 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        left: 10,
        bottom: 3,
<<<<<<< HEAD
        id: "__alloyId60"
    });
    $.__views.main.add($.__views.__alloyId60);
    $.__views.__alloyId61 = Ti.UI.createLabel({
=======
        id: "__alloyId48"
    });
    $.__views.main.add($.__views.__alloyId48);
    $.__views.__alloyId49 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#6E6E6E",
        font: {
            fontWeight: "bold",
            fontSize: "14"
        },
        left: "10",
        textAlign: "left",
        right: "10",
        text: "- Smart Claims Tracking",
<<<<<<< HEAD
        id: "__alloyId61"
    });
    $.__views.__alloyId60.add($.__views.__alloyId61);
    $.__views.__alloyId62 = Ti.UI.createLabel({
=======
        id: "__alloyId49"
    });
    $.__views.__alloyId48.add($.__views.__alloyId49);
    $.__views.__alloyId50 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#6E6E6E",
        font: {
            fontSize: "14"
        },
        left: "10",
        textAlign: "left",
        right: "10",
        text: "Plux members can keep track of their benefits entitlements via their smartphone so that they can manage their claim levels themselves. Access details of entitlements, claims made, claims remaining, etc.",
<<<<<<< HEAD
        id: "__alloyId62"
    });
    $.__views.__alloyId60.add($.__views.__alloyId62);
    $.__views.__alloyId63 = Ti.UI.createView({
=======
        id: "__alloyId50"
    });
    $.__views.__alloyId48.add($.__views.__alloyId50);
    $.__views.__alloyId51 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        left: 10,
        bottom: 3,
<<<<<<< HEAD
        id: "__alloyId63"
    });
    $.__views.main.add($.__views.__alloyId63);
    $.__views.__alloyId64 = Ti.UI.createLabel({
=======
        id: "__alloyId51"
    });
    $.__views.main.add($.__views.__alloyId51);
    $.__views.__alloyId52 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#6E6E6E",
        font: {
            fontWeight: "bold",
            fontSize: "14"
        },
        left: "10",
        textAlign: "left",
        right: "10",
        text: "- Convenient Live Virtual Consults",
<<<<<<< HEAD
        id: "__alloyId64"
    });
    $.__views.__alloyId63.add($.__views.__alloyId64);
    $.__views.__alloyId65 = Ti.UI.createLabel({
=======
        id: "__alloyId52"
    });
    $.__views.__alloyId51.add($.__views.__alloyId52);
    $.__views.__alloyId53 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#6E6E6E",
        font: {
            fontSize: "14"
        },
        left: "10",
        textAlign: "left",
        right: "10",
        text: "Plux members can connect with any doctor in the ASP Medical Group via video for an affordable pay-as-you-go fee. Doctors can then decide on the best course of action for the employee immediately. This way, employees can get medical advice from doctors without having to take time off to wait at the doctor’s clinic.",
<<<<<<< HEAD
        id: "__alloyId65"
    });
    $.__views.__alloyId63.add($.__views.__alloyId65);
    $.__views.__alloyId66 = Ti.UI.createView({
=======
        id: "__alloyId53"
    });
    $.__views.__alloyId51.add($.__views.__alloyId53);
    $.__views.__alloyId54 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        left: 10,
        bottom: 3,
<<<<<<< HEAD
        id: "__alloyId66"
    });
    $.__views.main.add($.__views.__alloyId66);
    $.__views.__alloyId67 = Ti.UI.createLabel({
=======
        id: "__alloyId54"
    });
    $.__views.main.add($.__views.__alloyId54);
    $.__views.__alloyId55 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#6E6E6E",
        font: {
            fontWeight: "bold",
            fontSize: "14"
        },
        left: "10",
        textAlign: "left",
        right: "10",
        text: "- Simple Doctor Appointment Booking",
<<<<<<< HEAD
        id: "__alloyId67"
    });
    $.__views.__alloyId66.add($.__views.__alloyId67);
    $.__views.__alloyId68 = Ti.UI.createLabel({
=======
        id: "__alloyId55"
    });
    $.__views.__alloyId54.add($.__views.__alloyId55);
    $.__views.__alloyId56 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#6E6E6E",
        font: {
            fontSize: "14"
        },
        left: "10",
        textAlign: "left",
        right: "10",
        text: "Plux members can easily book appointments with any doctor in the ASP Medical Group via their mobile phones. Employees can choose from a panel of thousands of doctors for unparalleled convenience.",
<<<<<<< HEAD
        id: "__alloyId68"
    });
    $.__views.__alloyId66.add($.__views.__alloyId68);
    $.__views.__alloyId69 = Ti.UI.createView({
=======
        id: "__alloyId56"
    });
    $.__views.__alloyId54.add($.__views.__alloyId56);
    $.__views.__alloyId57 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        left: 10,
        bottom: 3,
<<<<<<< HEAD
        id: "__alloyId69"
    });
    $.__views.main.add($.__views.__alloyId69);
    $.__views.__alloyId70 = Ti.UI.createLabel({
=======
        id: "__alloyId57"
    });
    $.__views.main.add($.__views.__alloyId57);
    $.__views.__alloyId58 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#6E6E6E",
        font: {
            fontWeight: "bold",
            fontSize: "14"
        },
        left: "10",
        textAlign: "left",
        right: "10",
        text: "- Easy Clinic Locator",
<<<<<<< HEAD
        id: "__alloyId70"
    });
    $.__views.__alloyId69.add($.__views.__alloyId70);
    $.__views.__alloyId71 = Ti.UI.createLabel({
=======
        id: "__alloyId58"
    });
    $.__views.__alloyId57.add($.__views.__alloyId58);
    $.__views.__alloyId59 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#6E6E6E",
        font: {
            fontSize: "14"
        },
        left: "10",
        textAlign: "left",
        right: "10",
        text: "Plux members can easily search for a clinic closest to them through our comprehensive clinic listing. Search through our panel of thousands of doctors, located all over Malaysia.",
<<<<<<< HEAD
        id: "__alloyId71"
    });
    $.__views.__alloyId69.add($.__views.__alloyId71);
    $.__views.__alloyId72 = Ti.UI.createView({
=======
        id: "__alloyId59"
    });
    $.__views.__alloyId57.add($.__views.__alloyId59);
    $.__views.__alloyId60 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        left: 10,
        bottom: 3,
<<<<<<< HEAD
        id: "__alloyId72"
    });
    $.__views.main.add($.__views.__alloyId72);
    $.__views.__alloyId73 = Ti.UI.createLabel({
=======
        id: "__alloyId60"
    });
    $.__views.main.add($.__views.__alloyId60);
    $.__views.__alloyId61 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#6E6E6E",
        font: {
            fontWeight: "bold",
            fontSize: "14"
        },
        left: "10",
        textAlign: "left",
        right: "10",
        text: "- Powerful Health Checklists",
<<<<<<< HEAD
        id: "__alloyId73"
    });
    $.__views.__alloyId72.add($.__views.__alloyId73);
    $.__views.__alloyId74 = Ti.UI.createLabel({
=======
        id: "__alloyId61"
    });
    $.__views.__alloyId60.add($.__views.__alloyId61);
    $.__views.__alloyId62 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#6E6E6E",
        font: {
            fontSize: "14"
        },
        left: "10",
        textAlign: "left",
        right: "10",
        text: "Every Plux member has access to health checklists that help them manage their own health goals. Healthier employees translates to happier and more productive employees. It also means less resources spent on therapy.",
<<<<<<< HEAD
        id: "__alloyId74"
    });
    $.__views.__alloyId72.add($.__views.__alloyId74);
    $.__views.__alloyId75 = Ti.UI.createView({
=======
        id: "__alloyId62"
    });
    $.__views.__alloyId60.add($.__views.__alloyId62);
    $.__views.__alloyId63 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        left: 10,
        bottom: 3,
<<<<<<< HEAD
        id: "__alloyId75"
    });
    $.__views.main.add($.__views.__alloyId75);
    $.__views.__alloyId76 = Ti.UI.createLabel({
=======
        id: "__alloyId63"
    });
    $.__views.main.add($.__views.__alloyId63);
    $.__views.__alloyId64 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#6E6E6E",
        font: {
            fontWeight: "bold",
            fontSize: "14"
        },
        left: "10",
        textAlign: "left",
        right: "10",
        text: "- Personalized Health Tracking",
<<<<<<< HEAD
        id: "__alloyId76"
    });
    $.__views.__alloyId75.add($.__views.__alloyId76);
    $.__views.__alloyId77 = Ti.UI.createLabel({
=======
        id: "__alloyId64"
    });
    $.__views.__alloyId63.add($.__views.__alloyId64);
    $.__views.__alloyId65 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#6E6E6E",
        font: {
            fontSize: "14"
        },
        left: "10",
        textAlign: "left",
        right: "10",
        text: "A personal digital map of health and well-being is automatically created for all Plux members, so they are aware if their lifestyles needs to change to become healthier.",
<<<<<<< HEAD
        id: "__alloyId77"
    });
    $.__views.__alloyId75.add($.__views.__alloyId77);
    $.__views.__alloyId78 = Ti.UI.createView({
=======
        id: "__alloyId65"
    });
    $.__views.__alloyId63.add($.__views.__alloyId65);
    $.__views.__alloyId66 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        left: 10,
        bottom: 3,
<<<<<<< HEAD
        id: "__alloyId78"
    });
    $.__views.main.add($.__views.__alloyId78);
    $.__views.__alloyId79 = Ti.UI.createLabel({
=======
        id: "__alloyId66"
    });
    $.__views.main.add($.__views.__alloyId66);
    $.__views.__alloyId67 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#6E6E6E",
        font: {
            fontWeight: "bold",
            fontSize: "14"
        },
        left: "10",
        textAlign: "left",
        right: "10",
        text: "- Health tips delivered regularly",
<<<<<<< HEAD
        id: "__alloyId79"
    });
    $.__views.__alloyId78.add($.__views.__alloyId79);
    $.__views.__alloyId80 = Ti.UI.createLabel({
=======
        id: "__alloyId67"
    });
    $.__views.__alloyId66.add($.__views.__alloyId67);
    $.__views.__alloyId68 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#6E6E6E",
        font: {
            fontSize: "14"
        },
        left: "10",
        textAlign: "left",
        right: "10",
        text: "Plux members receive health news tips to help them make better lifestyle choices and stay healthy.",
<<<<<<< HEAD
        id: "__alloyId80"
    });
    $.__views.__alloyId78.add($.__views.__alloyId80);
    $.__views.__alloyId81 = Ti.UI.createView({
=======
        id: "__alloyId68"
    });
    $.__views.__alloyId66.add($.__views.__alloyId68);
    $.__views.__alloyId69 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        left: 10,
        bottom: 3,
<<<<<<< HEAD
        id: "__alloyId81"
    });
    $.__views.main.add($.__views.__alloyId81);
    $.__views.__alloyId82 = Ti.UI.createLabel({
=======
        id: "__alloyId69"
    });
    $.__views.main.add($.__views.__alloyId69);
    $.__views.__alloyId70 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#6E6E6E",
        font: {
            fontWeight: "bold",
            fontSize: "14"
        },
        left: "10",
        textAlign: "left",
        right: "10",
        text: "- IT’S FREE",
<<<<<<< HEAD
        id: "__alloyId82"
    });
    $.__views.__alloyId81.add($.__views.__alloyId82);
    $.__views.__alloyId83 = Ti.UI.createLabel({
=======
        id: "__alloyId70"
    });
    $.__views.__alloyId69.add($.__views.__alloyId70);
    $.__views.__alloyId71 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#6E6E6E",
        font: {
            fontSize: "14"
        },
        left: "10",
        textAlign: "left",
        right: "10",
        text: "Companies and members get all the benefits of this powerful app at no charge!",
<<<<<<< HEAD
        id: "__alloyId83"
    });
    $.__views.__alloyId81.add($.__views.__alloyId83);
=======
        id: "__alloyId71"
    });
    $.__views.__alloyId69.add($.__views.__alloyId71);
>>>>>>> origin/master
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.win);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;