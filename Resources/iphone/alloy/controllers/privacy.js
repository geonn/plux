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
    this.__controllerPath = "privacy";
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
    $.__views.privacyWin = Ti.UI.createWindow({
        backgroundColor: "#FFFFF6",
        fullscreen: true,
        layout: "vertical",
        width: Ti.UI.FILL,
        navTintColor: "#CE1D1C",
        title: "Privacy Policy",
        id: "privacyWin"
    });
    $.__views.privacyWin && $.addTopLevelView($.__views.privacyWin);
    $.__views.__alloyId90 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId90"
    });
    $.__views.privacyWin.add($.__views.__alloyId90);
    $.__views.main = Ti.UI.createScrollView({
        id: "main",
        layout: "vertical",
        height: "100%",
        contentHeight: Ti.UI.SIZE
    });
    $.__views.__alloyId90.add($.__views.main);
    $.__views.__alloyId91 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "18"
        },
        color: "#CC2228",
        left: "10",
        right: "10",
        text: "ENGLISH VERSION",
        bottom: "10",
        id: "__alloyId91"
    });
    $.__views.main.add($.__views.__alloyId91);
    $.__views.__alloyId92 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "14"
        },
        color: "#6E6E6E",
        left: "10",
        textAlign: "left",
        right: "10",
        text: "Dear Members,",
        bottom: "5",
        id: "__alloyId92"
    });
    $.__views.main.add($.__views.__alloyId92);
    $.__views.__alloyId93 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "14"
        },
        color: "#6E6E6E",
        left: "10",
        textAlign: "left",
        right: "10",
        text: 'The Personal Data Protection Act 2010 has been enforced on 15 November 2013 by the Government to regulate the processing of personal data in commercial transactions. Under the Act, we, ASP Medical Clinic Sdn. Bhd. ("ASP") are required to serve you as our clients, members, Panel Clinics and Panel Hospitals a notice pertaining to your rights in respect of your personal data that is being processed or that is to be collected and further processed by us and the purposes for the data processing.',
        bottom: "5",
        id: "__alloyId93"
    });
    $.__views.main.add($.__views.__alloyId93);
    $.__views.__alloyId94 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "14"
        },
        color: "#6E6E6E",
        left: "10",
        textAlign: "left",
        right: "10",
        text: 'Consequently, please be informed that the personal data and other information (collectively referred to as "Personal Data") provided in your application as clients, members, Panel Clinics and Panel Hospitals inclusive any other services which relating thereto to ASP services is being, and will likely continue to be, used and processed by ASP for the following purposes:-',
        bottom: "3",
        id: "__alloyId94"
    });
    $.__views.main.add($.__views.__alloyId94);
    $.__views.__alloyId95 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "14"
        },
        color: "#6E6E6E",
        left: "10",
        textAlign: "left",
        right: "10",
        text: "- for the maintenance of customer database and customer service related processes;",
        bottom: "3",
        id: "__alloyId95"
    });
    $.__views.main.add($.__views.__alloyId95);
    $.__views.__alloyId96 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "14"
        },
        color: "#6E6E6E",
        left: "10",
        textAlign: "left",
        right: "10",
        text: "- for billing and payment processing purposes",
        id: "__alloyId96"
    });
    $.__views.main.add($.__views.__alloyId96);
    $.__views.__alloyId97 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "14"
        },
        color: "#6E6E6E",
        left: "10",
        textAlign: "left",
        right: "10",
        text: "- for contact purposes",
        id: "__alloyId97"
    });
    $.__views.main.add($.__views.__alloyId97);
    $.__views.__alloyId98 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "14"
        },
        color: "#6E6E6E",
        left: "10",
        textAlign: "left",
        right: "10",
        text: "- to respond to your enquiries",
        id: "__alloyId98"
    });
    $.__views.main.add($.__views.__alloyId98);
    $.__views.__alloyId99 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "14"
        },
        color: "#6E6E6E",
        left: "10",
        textAlign: "left",
        right: "10",
        text: "- for administrative purposes",
        id: "__alloyId99"
    });
    $.__views.main.add($.__views.__alloyId99);
    $.__views.__alloyId100 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "14"
        },
        color: "#6E6E6E",
        left: "10",
        textAlign: "left",
        right: "10",
        text: "- to meet legal and statutory requirement",
        id: "__alloyId100"
    });
    $.__views.main.add($.__views.__alloyId100);
    $.__views.__alloyId101 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "14"
        },
        color: "#6E6E6E",
        left: "10",
        textAlign: "left",
        right: "10",
        text: "- for analysis and planning purposes including historical and statistical record",
        id: "__alloyId101"
    });
    $.__views.main.add($.__views.__alloyId101);
    $.__views.__alloyId102 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "14"
        },
        color: "#6E6E6E",
        left: "10",
        textAlign: "left",
        right: "10",
        text: "- general operation and maintenance of the services provided by ASP",
        id: "__alloyId102"
    });
    $.__views.main.add($.__views.__alloyId102);
    $.__views.__alloyId103 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "14"
        },
        color: "#6E6E6E",
        left: "10",
        textAlign: "left",
        right: "10",
        text: "- Investigating complaints and suspected suspicious transaction.",
        id: "__alloyId103"
    });
    $.__views.main.add($.__views.__alloyId103);
    $.__views.__alloyId104 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "14"
        },
        color: "#6E6E6E",
        left: "10",
        textAlign: "left",
        right: "10",
        text: "This information is necessary to us. If you do not provide all of the information as requested, we will not be able to keep complete information about you, thus affecting our capacity to accomplish the above stated purposes.",
        bottom: "5",
        id: "__alloyId104"
    });
    $.__views.main.add($.__views.__alloyId104);
    $.__views.__alloyId105 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "16",
            fontWeight: "bold"
        },
        color: "#404040",
        left: "10",
        right: "10",
        text: "Disclosure of your information",
        bottom: "5",
        id: "__alloyId105"
    });
    $.__views.main.add($.__views.__alloyId105);
    $.__views.__alloyId106 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "14"
        },
        color: "#6E6E6E",
        left: "10",
        textAlign: "left",
        right: "10",
        text: "We may disclose the Personal Data to the following parties for the purposes stated above:",
        bottom: "3",
        id: "__alloyId106"
    });
    $.__views.main.add($.__views.__alloyId106);
    $.__views.__alloyId107 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "14"
        },
        color: "#6E6E6E",
        left: "10",
        textAlign: "left",
        right: "10",
        text: "- Our agents providing services relating to the purposes for which the Personal Data is collected;",
        id: "__alloyId107"
    });
    $.__views.main.add($.__views.__alloyId107);
    $.__views.__alloyId108 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "14"
        },
        color: "#6E6E6E",
        left: "10",
        textAlign: "left",
        right: "10",
        text: "- In circumstances where delay or default payment has occurred, to our appointed lawyers, debt collection agencies, credit reporting agencies; and",
        id: "__alloyId108"
    });
    $.__views.main.add($.__views.__alloyId108);
    $.__views.__alloyId109 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "14"
        },
        color: "#6E6E6E",
        left: "10",
        textAlign: "left",
        right: "10",
        text: "- Any person who is under a duty of confidentiality who has undertaken to keep such data confidential.",
        bottom: "5",
        id: "__alloyId109"
    });
    $.__views.main.add($.__views.__alloyId109);
    $.__views.__alloyId110 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "14"
        },
        color: "#6E6E6E",
        left: "10",
        textAlign: "left",
        right: "10",
        text: "We may also disclose the Personal Data if required to do so by law or in good faith, if such action is necessary to (i) comply with requirements of any law enforcement agency, court order, or legal process; or (ii) protect and defend rights or property of ASP and its personnel.",
        bottom: "5",
        id: "__alloyId110"
    });
    $.__views.main.add($.__views.__alloyId110);
    $.__views.__alloyId111 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "16",
            fontWeight: "bold"
        },
        color: "#404040",
        left: "10",
        right: "10",
        text: "Access, corrections and complaints",
        bottom: "5",
        id: "__alloyId111"
    });
    $.__views.main.add($.__views.__alloyId111);
    $.__views.__alloyId112 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "14"
        },
        color: "#6E6E6E",
        left: "10",
        textAlign: "left",
        right: "10",
        text: "If you would like to make any enquiries or complaints or request access or correction of your Personal Data, you may contact our IT Manager by calling them at 03-2022 2677 or faxing 03-2072 2699 from 9.00 am to 5.00 pm or you can email us at pdpa@asp-medical-clinic.com. Any request to access or correct the Personal Data may be subject to a fee and also to requirements under the Personal Data Protection Act 2010.",
        bottom: "3",
        id: "__alloyId112"
    });
    $.__views.main.add($.__views.__alloyId112);
    $.__views.__alloyId113 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "14"
        },
        color: "#6E6E6E",
        left: "10",
        textAlign: "left",
        right: "10",
        text: "Where you elect to limit our rights to process your Personal Data, you may also contact the above mentioned IT Manager, in writing.",
        bottom: "3",
        id: "__alloyId113"
    });
    $.__views.main.add($.__views.__alloyId113);
    $.__views.__alloyId114 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "14"
        },
        color: "#6E6E6E",
        left: "10",
        textAlign: "left",
        right: "10",
        text: "In the event of any inconsistency or conflict between the English version and the Bahasa Malaysia version of this Personal Data Protection Notice to customer, the English version shall prevail.",
        bottom: "3",
        id: "__alloyId114"
    });
    $.__views.main.add($.__views.__alloyId114);
    $.__views.__alloyId115 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 1,
        backgroundColor: "#F6F6F6",
        id: "__alloyId115"
    });
    $.__views.main.add($.__views.__alloyId115);
    $.__views.__alloyId116 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "18"
        },
        color: "#CC2228",
        left: "10",
        right: "10",
        text: "BAHASA MALAYSIA VERSION",
        top: "10",
        bottom: "10",
        id: "__alloyId116"
    });
    $.__views.main.add($.__views.__alloyId116);
    $.__views.__alloyId117 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "14"
        },
        color: "#6E6E6E",
        left: "10",
        textAlign: "left",
        right: "10",
        text: "Pelanggan yang dihargai,",
        bottom: "5",
        id: "__alloyId117"
    });
    $.__views.main.add($.__views.__alloyId117);
    $.__views.__alloyId118 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "14"
        },
        color: "#6E6E6E",
        left: "10",
        textAlign: "left",
        right: "10",
        text: 'Akta Perlindungan Data Peribadi 2010 telah dikuatkuasakan oleh pihak Kerajaan pada 15 November 2013 untuk mengawal selia pemprosesan data dalam transaksi komersial. Di bawah peruntukan Akta ini, kami, ASP Medical Clinic Sdn. Bhd. ("ASP") dikehendaki untuk mengemukakan notis mengenai hak anda ke atas Data Peribadi anda yang telah diproses, yang akan diterima dan akan diproses di masa hadapan oleh pihak kami dan juga tujuan Data Peribadi tersebut dikumpulkan.',
        bottom: "5",
        id: "__alloyId118"
    });
    $.__views.main.add($.__views.__alloyId118);
    $.__views.__alloyId119 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "14"
        },
        color: "#6E6E6E",
        left: "10",
        textAlign: "left",
        right: "10",
        text: 'Justeru itu, kami ingin memaklumkan bahawa data peribadi dan maklumat (selepas ini disebut sebagai "Data Peribadi tersebut") selainnya yang diberikan di dalam permohonan anda sebagai pelanggan, ahli, Klinik Panel dan Hospital Panel termasuklah perkhidmatan¬ lain yang berkaitan dengan ASP bagi maksud-maksud berikut:-',
        bottom: "3",
        id: "__alloyId119"
    });
    $.__views.main.add($.__views.__alloyId119);
    $.__views.__alloyId120 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "14"
        },
        color: "#6E6E6E",
        left: "10",
        textAlign: "left",
        right: "10",
        text: "- penyenggaraan pengkalan data pelanggan dan proses-proses yang berkaitan dengan perkhidmatan pelanggan",
        bottom: "3",
        id: "__alloyId120"
    });
    $.__views.main.add($.__views.__alloyId120);
    $.__views.__alloyId121 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "14"
        },
        color: "#6E6E6E",
        left: "10",
        textAlign: "left",
        right: "10",
        text: "- tujuan pengebilan dan proses pembayaran",
        id: "__alloyId121"
    });
    $.__views.main.add($.__views.__alloyId121);
    $.__views.__alloyId122 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "14"
        },
        color: "#6E6E6E",
        left: "10",
        textAlign: "left",
        right: "10",
        text: "- bagi menghubungi anda",
        id: "__alloyId122"
    });
    $.__views.main.add($.__views.__alloyId122);
    $.__views.__alloyId123 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "14"
        },
        color: "#6E6E6E",
        left: "10",
        textAlign: "left",
        right: "10",
        text: "- bagi menjawab sebarang pertanyaan",
        id: "__alloyId123"
    });
    $.__views.main.add($.__views.__alloyId123);
    $.__views.__alloyId124 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "14"
        },
        color: "#6E6E6E",
        left: "10",
        textAlign: "left",
        right: "10",
        text: "- tujuan pentadbiran",
        id: "__alloyId124"
    });
    $.__views.main.add($.__views.__alloyId124);
    $.__views.__alloyId125 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "14"
        },
        color: "#6E6E6E",
        left: "10",
        textAlign: "left",
        right: "10",
        text: "- memenuhi keperluan undang-undang dan badan-badan berkanun",
        id: "__alloyId125"
    });
    $.__views.main.add($.__views.__alloyId125);
    $.__views.__alloyId126 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "14"
        },
        color: "#6E6E6E",
        left: "10",
        textAlign: "left",
        right: "10",
        text: "- bagi tujuan analisa dan perancangan termasuk penyimpanan rekod sejarah dan statistik",
        id: "__alloyId126"
    });
    $.__views.main.add($.__views.__alloyId126);
    $.__views.__alloyId127 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "14"
        },
        color: "#6E6E6E",
        left: "10",
        textAlign: "left",
        right: "10",
        text: "- bagi tujuan operasi dan penyenggaraan perkhidmatan yang disediakan oleh ASP",
        id: "__alloyId127"
    });
    $.__views.main.add($.__views.__alloyId127);
    $.__views.__alloyId128 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "14"
        },
        color: "#6E6E6E",
        left: "10",
        textAlign: "left",
        right: "10",
        text: "- bagi tujuan siasatan sebarang aduan dan urusniaga yang disyaki.",
        id: "__alloyId128"
    });
    $.__views.main.add($.__views.__alloyId128);
    $.__views.__alloyId129 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "14"
        },
        color: "#6E6E6E",
        left: "10",
        textAlign: "left",
        right: "10",
        text: "Kami memerlukan Data Peribadi tersebut, sekiranya anda tidak membekalkan semua maklumat seperti yang diminta, kami tidak akan dapat menyimpan rekod lengkap mengenai anda, dan justeru itu akan menjejaskan keupayaan kami untuk mencapai maksud seperti di atas.",
        bottom: "5",
        id: "__alloyId129"
    });
    $.__views.main.add($.__views.__alloyId129);
    $.__views.__alloyId130 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "16",
            fontWeight: "bold"
        },
        color: "#404040",
        left: "10",
        right: "10",
        text: "Pendedahan Data Peribadi Anda",
        bottom: "5",
        id: "__alloyId130"
    });
    $.__views.main.add($.__views.__alloyId130);
    $.__views.__alloyId131 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "14"
        },
        color: "#6E6E6E",
        left: "10",
        textAlign: "left",
        right: "10",
        text: "Kami mungkin mendedahkan Data Peribadi tersebut kepada pihak-pihak berikut bagi tujuan seperti yang dinyatakan di atas:",
        bottom: "3",
        id: "__alloyId131"
    });
    $.__views.main.add($.__views.__alloyId131);
    $.__views.__alloyId132 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "14"
        },
        color: "#6E6E6E",
        left: "10",
        textAlign: "left",
        right: "10",
        text: "- Ejen-ejen yang menyediakan perkhidmatan yang berkaitan dengan tujuan Data Peribadi tersebut dikumpul;",
        id: "__alloyId132"
    });
    $.__views.main.add($.__views.__alloyId132);
    $.__views.__alloyId133 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "14"
        },
        color: "#6E6E6E",
        left: "10",
        textAlign: "left",
        right: "10",
        text: "- Di dalam keadaan di mana kelewatan atau keingkaran pembayaran telah berlaku, Data Peribadi tersebut akan didedahkan kepada peguam yang dilantik oleh ASP, agensi kutipan hutang, dan agensi rujukan kredit; dan",
        id: "__alloyId133"
    });
    $.__views.main.add($.__views.__alloyId133);
    $.__views.__alloyId134 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "14"
        },
        color: "#6E6E6E",
        left: "10",
        textAlign: "left",
        right: "10",
        text: "- Mana-mana individu di bawah kewajipan kerahsiaan yang telah mengakujanji untuk memastikan data tersebut dirahsiakan.",
        bottom: "5",
        id: "__alloyId134"
    });
    $.__views.main.add($.__views.__alloyId134);
    $.__views.__alloyId135 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "14"
        },
        color: "#6E6E6E",
        left: "10",
        textAlign: "left",
        right: "10",
        text: "Kami juga mungkin akan mendedahkan Data Peribadi anda jika dikehendaki berbuat demkian oleh undang-undang secara niat baik, jika tindakan tersebut adalah perlu bagi (i) mematuhi kehendak mana-mana agensi penguatkuasaan undang-undang, perintah mahkamah atau proses undang-undang; atau (ii) melindungi dan mempertahankan hak atau harta ASP dan kakitangan kami.",
        bottom: "5",
        id: "__alloyId135"
    });
    $.__views.main.add($.__views.__alloyId135);
    $.__views.__alloyId136 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "16",
            fontWeight: "bold"
        },
        color: "#404040",
        left: "10",
        right: "10",
        text: "Akses,Pembetulan dan Aduan",
        bottom: "5",
        id: "__alloyId136"
    });
    $.__views.main.add($.__views.__alloyId136);
    $.__views.__alloyId137 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "14"
        },
        color: "#6E6E6E",
        left: "10",
        textAlign: "left",
        right: "10",
        text: "Jika anda ingin membuat sebarang pertanyaan,aduan atau permohonan untuk akses atau pembetulan ke atas Data Peribadi, anda boleh menghubungi Pegawai IT kami di lbu Pejabat ASP dengan menelefon kami di talian 03-2022 2677 atau fakskan kepada kami di talian 03-2072 2699 dari pukul 9.00 pagi sehingga 5.00 petang dan juga boleh diemelkan kepada kami di pdpa@asp-medical-clinic.com. Sebarang permintaan untuk mengakses atau membetulkan Data Peribadi anda akan tertakluk kepada bayaran dan juga keperluan di bawah Akta Perlindungan Data Peribadi 2010.",
        bottom: "3",
        id: "__alloyId137"
    });
    $.__views.main.add($.__views.__alloyId137);
    $.__views.__alloyId138 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "14"
        },
        color: "#6E6E6E",
        left: "10",
        textAlign: "left",
        right: "10",
        text: "Jika anda memilih untuk menghadkan hak kami untuk memproses Data Peribadi anda, anda boleh menghubungi Pegawai IT kami seperti yang dinyatakan di atas, secara bertulis.",
        bottom: "3",
        id: "__alloyId138"
    });
    $.__views.main.add($.__views.__alloyId138);
    $.__views.__alloyId139 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "14"
        },
        color: "#6E6E6E",
        left: "10",
        textAlign: "left",
        right: "10",
        text: "Sekiranya terdapat sebarang perbezaan atau konflik di antara versi Bahasa lnggeris dan versi Bahasa Malaysia di dalam Notis Perlindungan Data Peribadi Pelanggan ini, versi Bahasa lnggeris harus digunapakai dan diterima.",
        bottom: "3",
        id: "__alloyId139"
    });
    $.__views.main.add($.__views.__alloyId139);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    "android" == Ti.Platform.osname && $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.privacyWin);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;