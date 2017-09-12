function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "privacy";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.privacyWin = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        orientationModes: [ Ti.UI.PORTRAIT ],
        fullscreen: false,
        windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN,
        navTintColor: "#CE1D1C",
        title: "Privacy Policy",
        id: "privacyWin",
        layout: "vertical"
    });
    $.__views.privacyWin && $.addTopLevelView($.__views.privacyWin);
<<<<<<< HEAD
    $.__views.__alloyId245 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId245"
    });
    $.__views.privacyWin.add($.__views.__alloyId245);
    $.__views.__alloyId246 = Ti.UI.createView({
=======
    $.__views.__alloyId213 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId213"
    });
    $.__views.privacyWin.add($.__views.__alloyId213);
    $.__views.__alloyId214 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        height: 50,
        width: "100%",
        backgroundColor: "#DEDEDE",
<<<<<<< HEAD
        id: "__alloyId246"
    });
    $.__views.__alloyId245.add($.__views.__alloyId246);
    $.__views.__alloyId247 = Ti.UI.createView({
        left: 0,
        width: "10%",
        id: "__alloyId247"
    });
    $.__views.__alloyId246.add($.__views.__alloyId247);
=======
        id: "__alloyId214"
    });
    $.__views.__alloyId213.add($.__views.__alloyId214);
    $.__views.__alloyId215 = Ti.UI.createView({
        left: 0,
        width: "10%",
        id: "__alloyId215"
    });
    $.__views.__alloyId214.add($.__views.__alloyId215);
>>>>>>> origin/master
    $.__views.btnBack = Ti.UI.createImageView({
        left: 10,
        id: "btnBack",
        width: 25,
        height: 25,
        image: "/images/btn-back.png"
    });
<<<<<<< HEAD
    $.__views.__alloyId247.add($.__views.btnBack);
=======
    $.__views.__alloyId215.add($.__views.btnBack);
>>>>>>> origin/master
    $.__views.pageTitle = Ti.UI.createView({
        id: "pageTitle",
        width: Ti.UI.FILL
    });
<<<<<<< HEAD
    $.__views.__alloyId246.add($.__views.pageTitle);
    $.__views.__alloyId248 = Ti.UI.createLabel({
=======
    $.__views.__alloyId214.add($.__views.pageTitle);
    $.__views.__alloyId216 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#606060",
        font: {
            fontSize: "16dp"
        },
        text: "Privacy Policy",
        textAlign: "center",
<<<<<<< HEAD
        id: "__alloyId248"
    });
    $.__views.pageTitle.add($.__views.__alloyId248);
=======
        id: "__alloyId216"
    });
    $.__views.pageTitle.add($.__views.__alloyId216);
>>>>>>> origin/master
    $.__views.main = Ti.UI.createScrollView({
        id: "main",
        layout: "vertical",
        height: "100%",
        contentHeight: Ti.UI.SIZE
    });
<<<<<<< HEAD
    $.__views.__alloyId245.add($.__views.main);
    $.__views.__alloyId249 = Ti.UI.createLabel({
=======
    $.__views.__alloyId213.add($.__views.main);
    $.__views.__alloyId217 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#CC2228",
        font: {
            fontSize: "18"
        },
        left: "10",
        right: "10",
        text: "ENGLISH VERSION",
        bottom: 10,
<<<<<<< HEAD
        id: "__alloyId249"
    });
    $.__views.main.add($.__views.__alloyId249);
    $.__views.__alloyId250 = Ti.UI.createLabel({
=======
        id: "__alloyId217"
    });
    $.__views.main.add($.__views.__alloyId217);
    $.__views.__alloyId218 = Ti.UI.createLabel({
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
        text: "Dear Members,",
        bottom: 5,
<<<<<<< HEAD
        id: "__alloyId250"
    });
    $.__views.main.add($.__views.__alloyId250);
    $.__views.__alloyId251 = Ti.UI.createLabel({
=======
        id: "__alloyId218"
    });
    $.__views.main.add($.__views.__alloyId218);
    $.__views.__alloyId219 = Ti.UI.createLabel({
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
        text: 'The Personal Data Protection Act 2010 has been enforced on 15 November 2013 by the Government to regulate the processing of personal data in commercial transactions. Under the Act, we, ASP Medical Clinic Sdn. Bhd. ("ASP") are required to serve you as our clients, members, Panel Clinics and Panel Hospitals a notice pertaining to your rights in respect of your personal data that is being processed or that is to be collected and further processed by us and the purposes for the data processing.',
        bottom: 5,
<<<<<<< HEAD
        id: "__alloyId251"
    });
    $.__views.main.add($.__views.__alloyId251);
    $.__views.__alloyId252 = Ti.UI.createLabel({
=======
        id: "__alloyId219"
    });
    $.__views.main.add($.__views.__alloyId219);
    $.__views.__alloyId220 = Ti.UI.createLabel({
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
        text: 'Consequently, please be informed that the personal data and other information (collectively referred to as "Personal Data") provided in your application as clients, members, Panel Clinics and Panel Hospitals inclusive any other services which relating thereto to ASP services is being, and will likely continue to be, used and processed by ASP for the following purposes:-',
        bottom: 3,
<<<<<<< HEAD
        id: "__alloyId252"
    });
    $.__views.main.add($.__views.__alloyId252);
    $.__views.__alloyId253 = Ti.UI.createLabel({
=======
        id: "__alloyId220"
    });
    $.__views.main.add($.__views.__alloyId220);
    $.__views.__alloyId221 = Ti.UI.createLabel({
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
        id: "__alloyId253"
    });
    $.__views.main.add($.__views.__alloyId253);
    $.__views.__alloyId254 = Ti.UI.createLabel({
=======
        id: "__alloyId221"
    });
    $.__views.main.add($.__views.__alloyId221);
    $.__views.__alloyId222 = Ti.UI.createLabel({
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
        text: "- for billing and payment processing purposes",
<<<<<<< HEAD
        id: "__alloyId254"
    });
    $.__views.main.add($.__views.__alloyId254);
    $.__views.__alloyId255 = Ti.UI.createLabel({
=======
        id: "__alloyId222"
    });
    $.__views.main.add($.__views.__alloyId222);
    $.__views.__alloyId223 = Ti.UI.createLabel({
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
        text: "- for contact purposes",
<<<<<<< HEAD
        id: "__alloyId255"
    });
    $.__views.main.add($.__views.__alloyId255);
    $.__views.__alloyId256 = Ti.UI.createLabel({
=======
        id: "__alloyId223"
    });
    $.__views.main.add($.__views.__alloyId223);
    $.__views.__alloyId224 = Ti.UI.createLabel({
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
        text: "- to respond to your enquiries",
<<<<<<< HEAD
        id: "__alloyId256"
    });
    $.__views.main.add($.__views.__alloyId256);
    $.__views.__alloyId257 = Ti.UI.createLabel({
=======
        id: "__alloyId224"
    });
    $.__views.main.add($.__views.__alloyId224);
    $.__views.__alloyId225 = Ti.UI.createLabel({
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
        text: "- for administrative purposes",
<<<<<<< HEAD
        id: "__alloyId257"
    });
    $.__views.main.add($.__views.__alloyId257);
    $.__views.__alloyId258 = Ti.UI.createLabel({
=======
        id: "__alloyId225"
    });
    $.__views.main.add($.__views.__alloyId225);
    $.__views.__alloyId226 = Ti.UI.createLabel({
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
        text: "- to meet legal and statutory requirement",
<<<<<<< HEAD
        id: "__alloyId258"
    });
    $.__views.main.add($.__views.__alloyId258);
    $.__views.__alloyId259 = Ti.UI.createLabel({
=======
        id: "__alloyId226"
    });
    $.__views.main.add($.__views.__alloyId226);
    $.__views.__alloyId227 = Ti.UI.createLabel({
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
        text: "- for analysis and planning purposes including historical and statistical record",
<<<<<<< HEAD
        id: "__alloyId259"
    });
    $.__views.main.add($.__views.__alloyId259);
    $.__views.__alloyId260 = Ti.UI.createLabel({
=======
        id: "__alloyId227"
    });
    $.__views.main.add($.__views.__alloyId227);
    $.__views.__alloyId228 = Ti.UI.createLabel({
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
        text: "- general operation and maintenance of the services provided by ASP",
<<<<<<< HEAD
        id: "__alloyId260"
    });
    $.__views.main.add($.__views.__alloyId260);
    $.__views.__alloyId261 = Ti.UI.createLabel({
=======
        id: "__alloyId228"
    });
    $.__views.main.add($.__views.__alloyId228);
    $.__views.__alloyId229 = Ti.UI.createLabel({
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
        text: "- Investigating complaints and suspected suspicious transaction.",
<<<<<<< HEAD
        id: "__alloyId261"
    });
    $.__views.main.add($.__views.__alloyId261);
    $.__views.__alloyId262 = Ti.UI.createLabel({
=======
        id: "__alloyId229"
    });
    $.__views.main.add($.__views.__alloyId229);
    $.__views.__alloyId230 = Ti.UI.createLabel({
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
        text: "This information is necessary to us. If you do not provide all of the information as requested, we will not be able to keep complete information about you, thus affecting our capacity to accomplish the above stated purposes.",
        bottom: 5,
<<<<<<< HEAD
        id: "__alloyId262"
    });
    $.__views.main.add($.__views.__alloyId262);
    $.__views.__alloyId263 = Ti.UI.createLabel({
=======
        id: "__alloyId230"
    });
    $.__views.main.add($.__views.__alloyId230);
    $.__views.__alloyId231 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#404040",
        font: {
            fontSize: "16",
            fontWeight: "bold"
        },
        left: "10",
        right: "10",
        text: "Disclosure of your information",
        bottom: 5,
<<<<<<< HEAD
        id: "__alloyId263"
    });
    $.__views.main.add($.__views.__alloyId263);
    $.__views.__alloyId264 = Ti.UI.createLabel({
=======
        id: "__alloyId231"
    });
    $.__views.main.add($.__views.__alloyId231);
    $.__views.__alloyId232 = Ti.UI.createLabel({
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
        text: "We may disclose the Personal Data to the following parties for the purposes stated above:",
        bottom: 3,
<<<<<<< HEAD
        id: "__alloyId264"
    });
    $.__views.main.add($.__views.__alloyId264);
    $.__views.__alloyId265 = Ti.UI.createLabel({
=======
        id: "__alloyId232"
    });
    $.__views.main.add($.__views.__alloyId232);
    $.__views.__alloyId233 = Ti.UI.createLabel({
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
        text: "- Our agents providing services relating to the purposes for which the Personal Data is collected;",
<<<<<<< HEAD
        id: "__alloyId265"
    });
    $.__views.main.add($.__views.__alloyId265);
    $.__views.__alloyId266 = Ti.UI.createLabel({
=======
        id: "__alloyId233"
    });
    $.__views.main.add($.__views.__alloyId233);
    $.__views.__alloyId234 = Ti.UI.createLabel({
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
        text: "- In circumstances where delay or default payment has occurred, to our appointed lawyers, debt collection agencies, credit reporting agencies; and",
<<<<<<< HEAD
        id: "__alloyId266"
    });
    $.__views.main.add($.__views.__alloyId266);
    $.__views.__alloyId267 = Ti.UI.createLabel({
=======
        id: "__alloyId234"
    });
    $.__views.main.add($.__views.__alloyId234);
    $.__views.__alloyId235 = Ti.UI.createLabel({
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
        text: "- Any person who is under a duty of confidentiality who has undertaken to keep such data confidential.",
        bottom: 5,
<<<<<<< HEAD
        id: "__alloyId267"
    });
    $.__views.main.add($.__views.__alloyId267);
    $.__views.__alloyId268 = Ti.UI.createLabel({
=======
        id: "__alloyId235"
    });
    $.__views.main.add($.__views.__alloyId235);
    $.__views.__alloyId236 = Ti.UI.createLabel({
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
        text: "We may also disclose the Personal Data if required to do so by law or in good faith, if such action is necessary to (i) comply with requirements of any law enforcement agency, court order, or legal process; or (ii) protect and defend rights or property of ASP and its personnel.",
        bottom: 5,
<<<<<<< HEAD
        id: "__alloyId268"
    });
    $.__views.main.add($.__views.__alloyId268);
    $.__views.__alloyId269 = Ti.UI.createLabel({
=======
        id: "__alloyId236"
    });
    $.__views.main.add($.__views.__alloyId236);
    $.__views.__alloyId237 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#404040",
        font: {
            fontSize: "16",
            fontWeight: "bold"
        },
        left: "10",
        right: "10",
        text: "Access, corrections and complaints",
        bottom: 5,
<<<<<<< HEAD
        id: "__alloyId269"
    });
    $.__views.main.add($.__views.__alloyId269);
    $.__views.__alloyId270 = Ti.UI.createLabel({
=======
        id: "__alloyId237"
    });
    $.__views.main.add($.__views.__alloyId237);
    $.__views.__alloyId238 = Ti.UI.createLabel({
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
        text: "If you would like to make any enquiries or complaints or request access or correction of your Personal Data, you may contact our IT Manager by calling them at 03-2022 2677 or faxing 03-2072 2699 from 9.00 am to 5.00 pm or you can email us at pdpa@asp-medical-clinic.com. Any request to access or correct the Personal Data may be subject to a fee and also to requirements under the Personal Data Protection Act 2010.",
        bottom: 3,
<<<<<<< HEAD
        id: "__alloyId270"
    });
    $.__views.main.add($.__views.__alloyId270);
    $.__views.__alloyId271 = Ti.UI.createLabel({
=======
        id: "__alloyId238"
    });
    $.__views.main.add($.__views.__alloyId238);
    $.__views.__alloyId239 = Ti.UI.createLabel({
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
        text: "Where you elect to limit our rights to process your Personal Data, you may also contact the above mentioned IT Manager, in writing.",
        bottom: 3,
<<<<<<< HEAD
        id: "__alloyId271"
    });
    $.__views.main.add($.__views.__alloyId271);
    $.__views.__alloyId272 = Ti.UI.createLabel({
=======
        id: "__alloyId239"
    });
    $.__views.main.add($.__views.__alloyId239);
    $.__views.__alloyId240 = Ti.UI.createLabel({
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
        text: "In the event of any inconsistency or conflict between the English version and the Bahasa Malaysia version of this Personal Data Protection Notice to customer, the English version shall prevail.",
        bottom: 3,
<<<<<<< HEAD
        id: "__alloyId272"
    });
    $.__views.main.add($.__views.__alloyId272);
    $.__views.__alloyId273 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 1,
        backgroundColor: "#F6F6F6",
        id: "__alloyId273"
    });
    $.__views.main.add($.__views.__alloyId273);
    $.__views.__alloyId274 = Ti.UI.createLabel({
=======
        id: "__alloyId240"
    });
    $.__views.main.add($.__views.__alloyId240);
    $.__views.__alloyId241 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 1,
        backgroundColor: "#F6F6F6",
        id: "__alloyId241"
    });
    $.__views.main.add($.__views.__alloyId241);
    $.__views.__alloyId242 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#CC2228",
        font: {
            fontSize: "18"
        },
        left: "10",
        right: "10",
        text: "BAHASA MALAYSIA VERSION",
        top: 10,
        bottom: 10,
<<<<<<< HEAD
        id: "__alloyId274"
    });
    $.__views.main.add($.__views.__alloyId274);
    $.__views.__alloyId275 = Ti.UI.createLabel({
=======
        id: "__alloyId242"
    });
    $.__views.main.add($.__views.__alloyId242);
    $.__views.__alloyId243 = Ti.UI.createLabel({
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
        text: "Pelanggan yang dihargai,",
        bottom: 5,
<<<<<<< HEAD
        id: "__alloyId275"
    });
    $.__views.main.add($.__views.__alloyId275);
    $.__views.__alloyId276 = Ti.UI.createLabel({
=======
        id: "__alloyId243"
    });
    $.__views.main.add($.__views.__alloyId243);
    $.__views.__alloyId244 = Ti.UI.createLabel({
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
        text: 'Akta Perlindungan Data Peribadi 2010 telah dikuatkuasakan oleh pihak Kerajaan pada 15 November 2013 untuk mengawal selia pemprosesan data dalam transaksi komersial. Di bawah peruntukan Akta ini, kami, ASP Medical Clinic Sdn. Bhd. ("ASP") dikehendaki untuk mengemukakan notis mengenai hak anda ke atas Data Peribadi anda yang telah diproses, yang akan diterima dan akan diproses di masa hadapan oleh pihak kami dan juga tujuan Data Peribadi tersebut dikumpulkan.',
        bottom: 5,
<<<<<<< HEAD
        id: "__alloyId276"
    });
    $.__views.main.add($.__views.__alloyId276);
    $.__views.__alloyId277 = Ti.UI.createLabel({
=======
        id: "__alloyId244"
    });
    $.__views.main.add($.__views.__alloyId244);
    $.__views.__alloyId245 = Ti.UI.createLabel({
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
        text: 'Justeru itu, kami ingin memaklumkan bahawa data peribadi dan maklumat (selepas ini disebut sebagai "Data Peribadi tersebut") selainnya yang diberikan di dalam permohonan anda sebagai pelanggan, ahli, Klinik Panel dan Hospital Panel termasuklah perkhidmatan¬ lain yang berkaitan dengan ASP bagi maksud-maksud berikut:-',
        bottom: 3,
<<<<<<< HEAD
        id: "__alloyId277"
    });
    $.__views.main.add($.__views.__alloyId277);
    $.__views.__alloyId278 = Ti.UI.createLabel({
=======
        id: "__alloyId245"
    });
    $.__views.main.add($.__views.__alloyId245);
    $.__views.__alloyId246 = Ti.UI.createLabel({
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
        text: "- penyenggaraan pengkalan data pelanggan dan proses-proses yang berkaitan dengan perkhidmatan pelanggan",
        bottom: 3,
<<<<<<< HEAD
        id: "__alloyId278"
    });
    $.__views.main.add($.__views.__alloyId278);
    $.__views.__alloyId279 = Ti.UI.createLabel({
=======
        id: "__alloyId246"
    });
    $.__views.main.add($.__views.__alloyId246);
    $.__views.__alloyId247 = Ti.UI.createLabel({
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
        text: "- tujuan pengebilan dan proses pembayaran",
<<<<<<< HEAD
        id: "__alloyId279"
    });
    $.__views.main.add($.__views.__alloyId279);
    $.__views.__alloyId280 = Ti.UI.createLabel({
=======
        id: "__alloyId247"
    });
    $.__views.main.add($.__views.__alloyId247);
    $.__views.__alloyId248 = Ti.UI.createLabel({
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
        text: "- bagi menghubungi anda",
<<<<<<< HEAD
        id: "__alloyId280"
    });
    $.__views.main.add($.__views.__alloyId280);
    $.__views.__alloyId281 = Ti.UI.createLabel({
=======
        id: "__alloyId248"
    });
    $.__views.main.add($.__views.__alloyId248);
    $.__views.__alloyId249 = Ti.UI.createLabel({
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
        text: "- bagi menjawab sebarang pertanyaan",
<<<<<<< HEAD
        id: "__alloyId281"
    });
    $.__views.main.add($.__views.__alloyId281);
    $.__views.__alloyId282 = Ti.UI.createLabel({
=======
        id: "__alloyId249"
    });
    $.__views.main.add($.__views.__alloyId249);
    $.__views.__alloyId250 = Ti.UI.createLabel({
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
        text: "- tujuan pentadbiran",
<<<<<<< HEAD
        id: "__alloyId282"
    });
    $.__views.main.add($.__views.__alloyId282);
    $.__views.__alloyId283 = Ti.UI.createLabel({
=======
        id: "__alloyId250"
    });
    $.__views.main.add($.__views.__alloyId250);
    $.__views.__alloyId251 = Ti.UI.createLabel({
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
        text: "- memenuhi keperluan undang-undang dan badan-badan berkanun",
<<<<<<< HEAD
        id: "__alloyId283"
    });
    $.__views.main.add($.__views.__alloyId283);
    $.__views.__alloyId284 = Ti.UI.createLabel({
=======
        id: "__alloyId251"
    });
    $.__views.main.add($.__views.__alloyId251);
    $.__views.__alloyId252 = Ti.UI.createLabel({
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
        text: "- bagi tujuan analisa dan perancangan termasuk penyimpanan rekod sejarah dan statistik",
<<<<<<< HEAD
        id: "__alloyId284"
    });
    $.__views.main.add($.__views.__alloyId284);
    $.__views.__alloyId285 = Ti.UI.createLabel({
=======
        id: "__alloyId252"
    });
    $.__views.main.add($.__views.__alloyId252);
    $.__views.__alloyId253 = Ti.UI.createLabel({
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
        text: "- bagi tujuan operasi dan penyenggaraan perkhidmatan yang disediakan oleh ASP",
<<<<<<< HEAD
        id: "__alloyId285"
    });
    $.__views.main.add($.__views.__alloyId285);
    $.__views.__alloyId286 = Ti.UI.createLabel({
=======
        id: "__alloyId253"
    });
    $.__views.main.add($.__views.__alloyId253);
    $.__views.__alloyId254 = Ti.UI.createLabel({
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
        text: "- bagi tujuan siasatan sebarang aduan dan urusniaga yang disyaki.",
<<<<<<< HEAD
        id: "__alloyId286"
    });
    $.__views.main.add($.__views.__alloyId286);
    $.__views.__alloyId287 = Ti.UI.createLabel({
=======
        id: "__alloyId254"
    });
    $.__views.main.add($.__views.__alloyId254);
    $.__views.__alloyId255 = Ti.UI.createLabel({
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
        text: "Kami memerlukan Data Peribadi tersebut, sekiranya anda tidak membekalkan semua maklumat seperti yang diminta, kami tidak akan dapat menyimpan rekod lengkap mengenai anda, dan justeru itu akan menjejaskan keupayaan kami untuk mencapai maksud seperti di atas.",
        bottom: 5,
<<<<<<< HEAD
        id: "__alloyId287"
    });
    $.__views.main.add($.__views.__alloyId287);
    $.__views.__alloyId288 = Ti.UI.createLabel({
=======
        id: "__alloyId255"
    });
    $.__views.main.add($.__views.__alloyId255);
    $.__views.__alloyId256 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#404040",
        font: {
            fontSize: "16",
            fontWeight: "bold"
        },
        left: "10",
        right: "10",
        text: "Pendedahan Data Peribadi Anda",
        bottom: 5,
<<<<<<< HEAD
        id: "__alloyId288"
    });
    $.__views.main.add($.__views.__alloyId288);
    $.__views.__alloyId289 = Ti.UI.createLabel({
=======
        id: "__alloyId256"
    });
    $.__views.main.add($.__views.__alloyId256);
    $.__views.__alloyId257 = Ti.UI.createLabel({
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
        text: "Kami mungkin mendedahkan Data Peribadi tersebut kepada pihak-pihak berikut bagi tujuan seperti yang dinyatakan di atas:",
        bottom: 3,
<<<<<<< HEAD
        id: "__alloyId289"
    });
    $.__views.main.add($.__views.__alloyId289);
    $.__views.__alloyId290 = Ti.UI.createLabel({
=======
        id: "__alloyId257"
    });
    $.__views.main.add($.__views.__alloyId257);
    $.__views.__alloyId258 = Ti.UI.createLabel({
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
        text: "- Ejen-ejen yang menyediakan perkhidmatan yang berkaitan dengan tujuan Data Peribadi tersebut dikumpul;",
<<<<<<< HEAD
        id: "__alloyId290"
    });
    $.__views.main.add($.__views.__alloyId290);
    $.__views.__alloyId291 = Ti.UI.createLabel({
=======
        id: "__alloyId258"
    });
    $.__views.main.add($.__views.__alloyId258);
    $.__views.__alloyId259 = Ti.UI.createLabel({
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
        text: "- Di dalam keadaan di mana kelewatan atau keingkaran pembayaran telah berlaku, Data Peribadi tersebut akan didedahkan kepada peguam yang dilantik oleh ASP, agensi kutipan hutang, dan agensi rujukan kredit; dan",
<<<<<<< HEAD
        id: "__alloyId291"
    });
    $.__views.main.add($.__views.__alloyId291);
    $.__views.__alloyId292 = Ti.UI.createLabel({
=======
        id: "__alloyId259"
    });
    $.__views.main.add($.__views.__alloyId259);
    $.__views.__alloyId260 = Ti.UI.createLabel({
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
        text: "- Mana-mana individu di bawah kewajipan kerahsiaan yang telah mengakujanji untuk memastikan data tersebut dirahsiakan.",
        bottom: 5,
<<<<<<< HEAD
        id: "__alloyId292"
    });
    $.__views.main.add($.__views.__alloyId292);
    $.__views.__alloyId293 = Ti.UI.createLabel({
=======
        id: "__alloyId260"
    });
    $.__views.main.add($.__views.__alloyId260);
    $.__views.__alloyId261 = Ti.UI.createLabel({
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
        text: "Kami juga mungkin akan mendedahkan Data Peribadi anda jika dikehendaki berbuat demkian oleh undang-undang secara niat baik, jika tindakan tersebut adalah perlu bagi (i) mematuhi kehendak mana-mana agensi penguatkuasaan undang-undang, perintah mahkamah atau proses undang-undang; atau (ii) melindungi dan mempertahankan hak atau harta ASP dan kakitangan kami.",
        bottom: 5,
<<<<<<< HEAD
        id: "__alloyId293"
    });
    $.__views.main.add($.__views.__alloyId293);
    $.__views.__alloyId294 = Ti.UI.createLabel({
=======
        id: "__alloyId261"
    });
    $.__views.main.add($.__views.__alloyId261);
    $.__views.__alloyId262 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#404040",
        font: {
            fontSize: "16",
            fontWeight: "bold"
        },
        left: "10",
        right: "10",
        text: "Akses,Pembetulan dan Aduan",
        bottom: 5,
<<<<<<< HEAD
        id: "__alloyId294"
    });
    $.__views.main.add($.__views.__alloyId294);
    $.__views.__alloyId295 = Ti.UI.createLabel({
=======
        id: "__alloyId262"
    });
    $.__views.main.add($.__views.__alloyId262);
    $.__views.__alloyId263 = Ti.UI.createLabel({
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
        text: "Jika anda ingin membuat sebarang pertanyaan,aduan atau permohonan untuk akses atau pembetulan ke atas Data Peribadi, anda boleh menghubungi Pegawai IT kami di lbu Pejabat ASP dengan menelefon kami di talian 03-2022 2677 atau fakskan kepada kami di talian 03-2072 2699 dari pukul 9.00 pagi sehingga 5.00 petang dan juga boleh diemelkan kepada kami di pdpa@asp-medical-clinic.com. Sebarang permintaan untuk mengakses atau membetulkan Data Peribadi anda akan tertakluk kepada bayaran dan juga keperluan di bawah Akta Perlindungan Data Peribadi 2010.",
        bottom: 3,
<<<<<<< HEAD
        id: "__alloyId295"
    });
    $.__views.main.add($.__views.__alloyId295);
    $.__views.__alloyId296 = Ti.UI.createLabel({
=======
        id: "__alloyId263"
    });
    $.__views.main.add($.__views.__alloyId263);
    $.__views.__alloyId264 = Ti.UI.createLabel({
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
        text: "Jika anda memilih untuk menghadkan hak kami untuk memproses Data Peribadi anda, anda boleh menghubungi Pegawai IT kami seperti yang dinyatakan di atas, secara bertulis.",
        bottom: 3,
<<<<<<< HEAD
        id: "__alloyId296"
    });
    $.__views.main.add($.__views.__alloyId296);
    $.__views.__alloyId297 = Ti.UI.createLabel({
=======
        id: "__alloyId264"
    });
    $.__views.main.add($.__views.__alloyId264);
    $.__views.__alloyId265 = Ti.UI.createLabel({
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
        text: "Sekiranya terdapat sebarang perbezaan atau konflik di antara versi Bahasa lnggeris dan versi Bahasa Malaysia di dalam Notis Perlindungan Data Peribadi Pelanggan ini, versi Bahasa lnggeris harus digunapakai dan diterima.",
        bottom: 3,
<<<<<<< HEAD
        id: "__alloyId297"
    });
    $.__views.main.add($.__views.__alloyId297);
=======
        id: "__alloyId265"
    });
    $.__views.main.add($.__views.__alloyId265);
>>>>>>> origin/master
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    $.btnBack.addEventListener("click", function() {
        $.privacyWin.close();
    });
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;