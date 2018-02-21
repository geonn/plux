var Alloy = require('/alloy'),
    Backbone = Alloy.Backbone,
    _ = Alloy._;

function __processArg(obj, key) {
	var arg = null;
	if (obj) {
		arg = obj[key] || null;
		delete obj[key];
	}
	return arg;
}

function Controller() {

	require('/alloy/controllers/' + 'BaseController').apply(this, Array.prototype.slice.call(arguments));
	this.__controllerPath = 'privacy';
	this.args = arguments[0] || {};

	if (arguments[0]) {
		var __parentSymbol = __processArg(arguments[0], '__parentSymbol');
		var $model = __processArg(arguments[0], '$model');
		var __itemTemplate = __processArg(arguments[0], '__itemTemplate');
	}
	var $ = this;
	var exports = {};
	var __defers = {};

	$.__views.privacyWin = Ti.UI.createWindow({ backgroundColor: "#ffffff", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, navTintColor: "#CE1D1C", title: "Privacy Policy", id: "privacyWin", layout: "vertical" });
	$.__views.privacyWin && $.addTopLevelView($.__views.privacyWin);
	$.__views.__alloyId719 = Ti.UI.createView({ layout: "vertical", id: "__alloyId719" });
	$.__views.privacyWin.add($.__views.__alloyId719);
	$.__views.__alloyId720 = Ti.UI.createView({ layout: "horizontal", height: 50, width: "100%", backgroundColor: "#DEDEDE", id: "__alloyId720" });
	$.__views.__alloyId719.add($.__views.__alloyId720);
	$.__views.__alloyId721 = Ti.UI.createView({ left: 0, width: "10%", id: "__alloyId721" });
	$.__views.__alloyId720.add($.__views.__alloyId721);
	$.__views.btnBack = Ti.UI.createImageView({ left: 10, id: "btnBack", width: 25, height: 25, image: "/images/btn-back.png" });
	$.__views.__alloyId721.add($.__views.btnBack);
	$.__views.pageTitle = Ti.UI.createView({ id: "pageTitle", width: Ti.UI.FILL });
	$.__views.__alloyId720.add($.__views.pageTitle);
	$.__views.__alloyId722 = Ti.UI.createLabel({ width: Titanium.UI.SIZE, height: Ti.UI.SIZE, color: "#606060", font: { fontSize: "16dp" }, text: 'Privacy Policy', textAlign: "center", id: "__alloyId722" });
	$.__views.pageTitle.add($.__views.__alloyId722);
	$.__views.main = Ti.UI.createScrollView({ id: "main", layout: "vertical", height: "100%", contentHeight: Ti.UI.SIZE });
	$.__views.__alloyId719.add($.__views.main);
	$.__views.__alloyId723 = Ti.UI.createLabel({ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#CC2228", font: { fontSize: "18" }, left: "10", right: "10", text: 'ENGLISH VERSION', bottom: 10, id: "__alloyId723" });
	$.__views.main.add($.__views.__alloyId723);
	$.__views.__alloyId724 = Ti.UI.createLabel({ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#6E6E6E", font: { fontSize: "14" }, left: "10", textAlign: "left", right: "10", text: 'Dear Members,', bottom: 5, id: "__alloyId724" });
	$.__views.main.add($.__views.__alloyId724);
	$.__views.__alloyId725 = Ti.UI.createLabel({ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#6E6E6E", font: { fontSize: "14" }, left: "10", textAlign: "left", right: "10", text: 'The Personal Data Protection Act 2010 has been enforced on 15 November 2013 by the Government to regulate the processing of personal data in commercial transactions. Under the Act, we, ASP Medical Clinic Sdn. Bhd. ("ASP") are required to serve you as our clients, members, Panel Clinics and Panel Hospitals a notice pertaining to your rights in respect of your personal data that is being processed or that is to be collected and further processed by us and the purposes for the data processing.', bottom: 5, id: "__alloyId725" });
	$.__views.main.add($.__views.__alloyId725);
	$.__views.__alloyId726 = Ti.UI.createLabel({ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#6E6E6E", font: { fontSize: "14" }, left: "10", textAlign: "left", right: "10", text: 'Consequently, please be informed that the personal data and other information (collectively referred to as "Personal Data") provided in your application as clients, members, Panel Clinics and Panel Hospitals inclusive any other services which relating thereto to ASP services is being, and will likely continue to be, used and processed by ASP for the following purposes:-', bottom: 3, id: "__alloyId726" });
	$.__views.main.add($.__views.__alloyId726);
	$.__views.__alloyId727 = Ti.UI.createLabel({ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#6E6E6E", font: { fontSize: "14" }, left: "10", textAlign: "left", right: "10", text: '- for the maintenance of customer database and customer service related processes;', bottom: 3, id: "__alloyId727" });
	$.__views.main.add($.__views.__alloyId727);
	$.__views.__alloyId728 = Ti.UI.createLabel({ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#6E6E6E", font: { fontSize: "14" }, left: "10", textAlign: "left", right: "10", text: '- for billing and payment processing purposes', id: "__alloyId728" });
	$.__views.main.add($.__views.__alloyId728);
	$.__views.__alloyId729 = Ti.UI.createLabel({ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#6E6E6E", font: { fontSize: "14" }, left: "10", textAlign: "left", right: "10", text: '- for contact purposes', id: "__alloyId729" });
	$.__views.main.add($.__views.__alloyId729);
	$.__views.__alloyId730 = Ti.UI.createLabel({ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#6E6E6E", font: { fontSize: "14" }, left: "10", textAlign: "left", right: "10", text: '- to respond to your enquiries', id: "__alloyId730" });
	$.__views.main.add($.__views.__alloyId730);
	$.__views.__alloyId731 = Ti.UI.createLabel({ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#6E6E6E", font: { fontSize: "14" }, left: "10", textAlign: "left", right: "10", text: '- for administrative purposes', id: "__alloyId731" });
	$.__views.main.add($.__views.__alloyId731);
	$.__views.__alloyId732 = Ti.UI.createLabel({ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#6E6E6E", font: { fontSize: "14" }, left: "10", textAlign: "left", right: "10", text: '- to meet legal and statutory requirement', id: "__alloyId732" });
	$.__views.main.add($.__views.__alloyId732);
	$.__views.__alloyId733 = Ti.UI.createLabel({ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#6E6E6E", font: { fontSize: "14" }, left: "10", textAlign: "left", right: "10", text: '- for analysis and planning purposes including historical and statistical record', id: "__alloyId733" });
	$.__views.main.add($.__views.__alloyId733);
	$.__views.__alloyId734 = Ti.UI.createLabel({ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#6E6E6E", font: { fontSize: "14" }, left: "10", textAlign: "left", right: "10", text: '- general operation and maintenance of the services provided by ASP', id: "__alloyId734" });
	$.__views.main.add($.__views.__alloyId734);
	$.__views.__alloyId735 = Ti.UI.createLabel({ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#6E6E6E", font: { fontSize: "14" }, left: "10", textAlign: "left", right: "10", text: '- Investigating complaints and suspected suspicious transaction.', id: "__alloyId735" });
	$.__views.main.add($.__views.__alloyId735);
	$.__views.__alloyId736 = Ti.UI.createLabel({ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#6E6E6E", font: { fontSize: "14" }, left: "10", textAlign: "left", right: "10", text: 'This information is necessary to us. If you do not provide all of the information as requested, we will not be able to keep complete information about you, thus affecting our capacity to accomplish the above stated purposes.', bottom: 5, id: "__alloyId736" });
	$.__views.main.add($.__views.__alloyId736);
	$.__views.__alloyId737 = Ti.UI.createLabel({ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#404040", font: { fontSize: "16", fontWeight: "bold" }, left: "10", right: "10", text: 'Disclosure of your information', bottom: 5, id: "__alloyId737" });
	$.__views.main.add($.__views.__alloyId737);
	$.__views.__alloyId738 = Ti.UI.createLabel({ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#6E6E6E", font: { fontSize: "14" }, left: "10", textAlign: "left", right: "10", text: 'We may disclose the Personal Data to the following parties for the purposes stated above:', bottom: 3, id: "__alloyId738" });
	$.__views.main.add($.__views.__alloyId738);
	$.__views.__alloyId739 = Ti.UI.createLabel({ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#6E6E6E", font: { fontSize: "14" }, left: "10", textAlign: "left", right: "10", text: '- Our agents providing services relating to the purposes for which the Personal Data is collected;', id: "__alloyId739" });
	$.__views.main.add($.__views.__alloyId739);
	$.__views.__alloyId740 = Ti.UI.createLabel({ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#6E6E6E", font: { fontSize: "14" }, left: "10", textAlign: "left", right: "10", text: '- In circumstances where delay or default payment has occurred, to our appointed lawyers, debt collection agencies, credit reporting agencies; and', id: "__alloyId740" });
	$.__views.main.add($.__views.__alloyId740);
	$.__views.__alloyId741 = Ti.UI.createLabel({ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#6E6E6E", font: { fontSize: "14" }, left: "10", textAlign: "left", right: "10", text: '- Any person who is under a duty of confidentiality who has undertaken to keep such data confidential.', bottom: 5, id: "__alloyId741" });
	$.__views.main.add($.__views.__alloyId741);
	$.__views.__alloyId742 = Ti.UI.createLabel({ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#6E6E6E", font: { fontSize: "14" }, left: "10", textAlign: "left", right: "10", text: 'We may also disclose the Personal Data if required to do so by law or in good faith, if such action is necessary to (i) comply with requirements of any law enforcement agency, court order, or legal process; or (ii) protect and defend rights or property of ASP and its personnel.', bottom: 5, id: "__alloyId742" });
	$.__views.main.add($.__views.__alloyId742);
	$.__views.__alloyId743 = Ti.UI.createLabel({ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#404040", font: { fontSize: "16", fontWeight: "bold" }, left: "10", right: "10", text: 'Access, corrections and complaints', bottom: 5, id: "__alloyId743" });
	$.__views.main.add($.__views.__alloyId743);
	$.__views.__alloyId744 = Ti.UI.createLabel({ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#6E6E6E", font: { fontSize: "14" }, left: "10", textAlign: "left", right: "10", text: 'If you would like to make any enquiries or complaints or request access or correction of your Personal Data, you may contact our IT Manager by calling them at 03-2022 2677 or faxing 03-2072 2699 from 9.00 am to 5.00 pm or you can email us at pdpa@asp-medical-clinic.com. Any request to access or correct the Personal Data may be subject to a fee and also to requirements under the Personal Data Protection Act 2010.', bottom: 3, id: "__alloyId744" });
	$.__views.main.add($.__views.__alloyId744);
	$.__views.__alloyId745 = Ti.UI.createLabel({ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#6E6E6E", font: { fontSize: "14" }, left: "10", textAlign: "left", right: "10", text: 'Where you elect to limit our rights to process your Personal Data, you may also contact the above mentioned IT Manager, in writing.', bottom: 3, id: "__alloyId745" });
	$.__views.main.add($.__views.__alloyId745);
	$.__views.__alloyId746 = Ti.UI.createLabel({ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#6E6E6E", font: { fontSize: "14" }, left: "10", textAlign: "left", right: "10", text: 'In the event of any inconsistency or conflict between the English version and the Bahasa Malaysia version of this Personal Data Protection Notice to customer, the English version shall prevail.', bottom: 3, id: "__alloyId746" });
	$.__views.main.add($.__views.__alloyId746);
	$.__views.__alloyId747 = Ti.UI.createView({ width: Titanium.UI.FILL, height: 1, backgroundColor: "#F6F6F6", id: "__alloyId747" });
	$.__views.main.add($.__views.__alloyId747);
	$.__views.__alloyId748 = Ti.UI.createLabel({ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#CC2228", font: { fontSize: "18" }, left: "10", right: "10", text: 'BAHASA MALAYSIA VERSION', top: 10, bottom: 10, id: "__alloyId748" });
	$.__views.main.add($.__views.__alloyId748);
	$.__views.__alloyId749 = Ti.UI.createLabel({ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#6E6E6E", font: { fontSize: "14" }, left: "10", textAlign: "left", right: "10", text: 'Pelanggan yang dihargai,', bottom: 5, id: "__alloyId749" });
	$.__views.main.add($.__views.__alloyId749);
	$.__views.__alloyId750 = Ti.UI.createLabel({ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#6E6E6E", font: { fontSize: "14" }, left: "10", textAlign: "left", right: "10", text: 'Akta Perlindungan Data Peribadi 2010 telah dikuatkuasakan oleh pihak Kerajaan pada 15 November 2013 untuk mengawal selia pemprosesan data dalam transaksi komersial. Di bawah peruntukan Akta ini, kami, ASP Medical Clinic Sdn. Bhd. ("ASP") dikehendaki untuk mengemukakan notis mengenai hak anda ke atas Data Peribadi anda yang telah diproses, yang akan diterima dan akan diproses di masa hadapan oleh pihak kami dan juga tujuan Data Peribadi tersebut dikumpulkan.', bottom: 5, id: "__alloyId750" });
	$.__views.main.add($.__views.__alloyId750);
	$.__views.__alloyId751 = Ti.UI.createLabel({ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#6E6E6E", font: { fontSize: "14" }, left: "10", textAlign: "left", right: "10", text: 'Justeru itu, kami ingin memaklumkan bahawa data peribadi dan maklumat (selepas ini disebut sebagai "Data Peribadi tersebut") selainnya yang diberikan di dalam permohonan anda sebagai pelanggan, ahli, Klinik Panel dan Hospital Panel termasuklah perkhidmatan¬ lain yang berkaitan dengan ASP bagi maksud-maksud berikut:-', bottom: 3, id: "__alloyId751" });
	$.__views.main.add($.__views.__alloyId751);
	$.__views.__alloyId752 = Ti.UI.createLabel({ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#6E6E6E", font: { fontSize: "14" }, left: "10", textAlign: "left", right: "10", text: '- penyenggaraan pengkalan data pelanggan dan proses-proses yang berkaitan dengan perkhidmatan pelanggan', bottom: 3, id: "__alloyId752" });
	$.__views.main.add($.__views.__alloyId752);
	$.__views.__alloyId753 = Ti.UI.createLabel({ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#6E6E6E", font: { fontSize: "14" }, left: "10", textAlign: "left", right: "10", text: '- tujuan pengebilan dan proses pembayaran', id: "__alloyId753" });
	$.__views.main.add($.__views.__alloyId753);
	$.__views.__alloyId754 = Ti.UI.createLabel({ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#6E6E6E", font: { fontSize: "14" }, left: "10", textAlign: "left", right: "10", text: '- bagi menghubungi anda', id: "__alloyId754" });
	$.__views.main.add($.__views.__alloyId754);
	$.__views.__alloyId755 = Ti.UI.createLabel({ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#6E6E6E", font: { fontSize: "14" }, left: "10", textAlign: "left", right: "10", text: '- bagi menjawab sebarang pertanyaan', id: "__alloyId755" });
	$.__views.main.add($.__views.__alloyId755);
	$.__views.__alloyId756 = Ti.UI.createLabel({ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#6E6E6E", font: { fontSize: "14" }, left: "10", textAlign: "left", right: "10", text: '- tujuan pentadbiran', id: "__alloyId756" });
	$.__views.main.add($.__views.__alloyId756);
	$.__views.__alloyId757 = Ti.UI.createLabel({ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#6E6E6E", font: { fontSize: "14" }, left: "10", textAlign: "left", right: "10", text: '- memenuhi keperluan undang-undang dan badan-badan berkanun', id: "__alloyId757" });
	$.__views.main.add($.__views.__alloyId757);
	$.__views.__alloyId758 = Ti.UI.createLabel({ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#6E6E6E", font: { fontSize: "14" }, left: "10", textAlign: "left", right: "10", text: '- bagi tujuan analisa dan perancangan termasuk penyimpanan rekod sejarah dan statistik', id: "__alloyId758" });
	$.__views.main.add($.__views.__alloyId758);
	$.__views.__alloyId759 = Ti.UI.createLabel({ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#6E6E6E", font: { fontSize: "14" }, left: "10", textAlign: "left", right: "10", text: '- bagi tujuan operasi dan penyenggaraan perkhidmatan yang disediakan oleh ASP', id: "__alloyId759" });
	$.__views.main.add($.__views.__alloyId759);
	$.__views.__alloyId760 = Ti.UI.createLabel({ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#6E6E6E", font: { fontSize: "14" }, left: "10", textAlign: "left", right: "10", text: '- bagi tujuan siasatan sebarang aduan dan urusniaga yang disyaki.', id: "__alloyId760" });
	$.__views.main.add($.__views.__alloyId760);
	$.__views.__alloyId761 = Ti.UI.createLabel({ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#6E6E6E", font: { fontSize: "14" }, left: "10", textAlign: "left", right: "10", text: 'Kami memerlukan Data Peribadi tersebut, sekiranya anda tidak membekalkan semua maklumat seperti yang diminta, kami tidak akan dapat menyimpan rekod lengkap mengenai anda, dan justeru itu akan menjejaskan keupayaan kami untuk mencapai maksud seperti di atas.', bottom: 5, id: "__alloyId761" });
	$.__views.main.add($.__views.__alloyId761);
	$.__views.__alloyId762 = Ti.UI.createLabel({ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#404040", font: { fontSize: "16", fontWeight: "bold" }, left: "10", right: "10", text: 'Pendedahan Data Peribadi Anda', bottom: 5, id: "__alloyId762" });
	$.__views.main.add($.__views.__alloyId762);
	$.__views.__alloyId763 = Ti.UI.createLabel({ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#6E6E6E", font: { fontSize: "14" }, left: "10", textAlign: "left", right: "10", text: 'Kami mungkin mendedahkan Data Peribadi tersebut kepada pihak-pihak berikut bagi tujuan seperti yang dinyatakan di atas:', bottom: 3, id: "__alloyId763" });
	$.__views.main.add($.__views.__alloyId763);
	$.__views.__alloyId764 = Ti.UI.createLabel({ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#6E6E6E", font: { fontSize: "14" }, left: "10", textAlign: "left", right: "10", text: '- Ejen-ejen yang menyediakan perkhidmatan yang berkaitan dengan tujuan Data Peribadi tersebut dikumpul;', id: "__alloyId764" });
	$.__views.main.add($.__views.__alloyId764);
	$.__views.__alloyId765 = Ti.UI.createLabel({ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#6E6E6E", font: { fontSize: "14" }, left: "10", textAlign: "left", right: "10", text: '- Di dalam keadaan di mana kelewatan atau keingkaran pembayaran telah berlaku, Data Peribadi tersebut akan didedahkan kepada peguam yang dilantik oleh ASP, agensi kutipan hutang, dan agensi rujukan kredit; dan', id: "__alloyId765" });
	$.__views.main.add($.__views.__alloyId765);
	$.__views.__alloyId766 = Ti.UI.createLabel({ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#6E6E6E", font: { fontSize: "14" }, left: "10", textAlign: "left", right: "10", text: '- Mana-mana individu di bawah kewajipan kerahsiaan yang telah mengakujanji untuk memastikan data tersebut dirahsiakan.', bottom: 5, id: "__alloyId766" });
	$.__views.main.add($.__views.__alloyId766);
	$.__views.__alloyId767 = Ti.UI.createLabel({ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#6E6E6E", font: { fontSize: "14" }, left: "10", textAlign: "left", right: "10", text: 'Kami juga mungkin akan mendedahkan Data Peribadi anda jika dikehendaki berbuat demkian oleh undang-undang secara niat baik, jika tindakan tersebut adalah perlu bagi (i) mematuhi kehendak mana-mana agensi penguatkuasaan undang-undang, perintah mahkamah atau proses undang-undang; atau (ii) melindungi dan mempertahankan hak atau harta ASP dan kakitangan kami.', bottom: 5, id: "__alloyId767" });
	$.__views.main.add($.__views.__alloyId767);
	$.__views.__alloyId768 = Ti.UI.createLabel({ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#404040", font: { fontSize: "16", fontWeight: "bold" }, left: "10", right: "10", text: 'Akses,Pembetulan dan Aduan', bottom: 5, id: "__alloyId768" });
	$.__views.main.add($.__views.__alloyId768);
	$.__views.__alloyId769 = Ti.UI.createLabel({ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#6E6E6E", font: { fontSize: "14" }, left: "10", textAlign: "left", right: "10", text: 'Jika anda ingin membuat sebarang pertanyaan,aduan atau permohonan untuk akses atau pembetulan ke atas Data Peribadi, anda boleh menghubungi Pegawai IT kami di lbu Pejabat ASP dengan menelefon kami di talian 03-2022 2677 atau fakskan kepada kami di talian 03-2072 2699 dari pukul 9.00 pagi sehingga 5.00 petang dan juga boleh diemelkan kepada kami di pdpa@asp-medical-clinic.com. Sebarang permintaan untuk mengakses atau membetulkan Data Peribadi anda akan tertakluk kepada bayaran dan juga keperluan di bawah Akta Perlindungan Data Peribadi 2010.', bottom: 3, id: "__alloyId769" });
	$.__views.main.add($.__views.__alloyId769);
	$.__views.__alloyId770 = Ti.UI.createLabel({ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#6E6E6E", font: { fontSize: "14" }, left: "10", textAlign: "left", right: "10", text: 'Jika anda memilih untuk menghadkan hak kami untuk memproses Data Peribadi anda, anda boleh menghubungi Pegawai IT kami seperti yang dinyatakan di atas, secara bertulis.', bottom: 3, id: "__alloyId770" });
	$.__views.main.add($.__views.__alloyId770);
	$.__views.__alloyId771 = Ti.UI.createLabel({ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#6E6E6E", font: { fontSize: "14" }, left: "10", textAlign: "left", right: "10", text: 'Sekiranya terdapat sebarang perbezaan atau konflik di antara versi Bahasa lnggeris dan versi Bahasa Malaysia di dalam Notis Perlindungan Data Peribadi Pelanggan ini, versi Bahasa lnggeris harus digunapakai dan diterima.', bottom: 3, id: "__alloyId771" });
	$.__views.main.add($.__views.__alloyId771);
	exports.destroy = function () {};

	_.extend($, $.__views);

	var args = arguments[0] || {};

	$.btnBack.addEventListener('click', function () {
		$.privacyWin.close();
	});

	_.extend($, exports);
}

module.exports = Controller;