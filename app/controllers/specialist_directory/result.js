// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = arguments[0] || {};
//var args = $.args;
var loading = Alloy.createController("loading");

function init(){
	$.win.add(loading.getView());
	loading.start();
	setTimeout(function(){
		loading.finish();
	}, 2000);
	
}

init();

if(OS_ANDROID){ 
	$.btnBack.addEventListener('click', function(){ 
		$.win.close(); 
	});
}
/////
var obj = args.data;
console.log(obj.data);

var page = args.page;

////////////////////////

if(obj.data.length != 0){
    var vResultMain = $.UI.create("View", {
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        layout: "vertical",
        backgroundColor: "#DEDEDE",
    });
    
    var vWhiteSpace = $.UI.create("View", {
        height: 15,
        width: Ti.UI.FILL,
        backgroundColor: "black"
    });
    
    
    function passItem(obj)
    {
        //id for img and noimg
        var imgID = [];
        var noImgID = [];
    
        for (i = 0; i < obj.data.length; i++) {
            if(obj.data[i].attachment !== undefined) {
                imgID.push(i);
            }
    
            else {
                noImgID.push(i);
            }   
        }
    
        //for user that have img (on top)
        for (i = 0; i < imgID.length; i++) {
            display(imgID[i]);
        }

        //$.svMain.add(vResultMain); //ios problem
    
        //for user that have no img
        for (i = 0; i < noImgID.length; i++) {
            display(noImgID[i]);
        }
    
        $.svMain.add(vResultMain);
    }
    
    var vWhiteSpace2 = $.UI.create("View", {
        height: 15,
        width: Ti.UI.FILL,
        backgroundColor: "black"
    });
    
    passItem(obj);
    
    $.svMain.add(vWhiteSpace2);
    //end result

    if(obj.data.length >= 10){
        var bNext = $.UI.create("Button", {
            height: Ti.UI.SIZE,
            width: "50%",
            title: "Next",
            bottom: 30
        });
        
        var vWhiteSpace3 = $.UI.create("View", {
            height: 10,
            width: Ti.UI.FILL,
        });
        $.svMain.add(vWhiteSpace3);
        $.svMain.add(bNext);
    
        bNext.addEventListener("click", function(e){
    
            var name = args.name;
            var state = args.state;
            var specialty = args.specialty;
            var hospital = args.hospital;
            page = page + 1;
    
            init();
            Alloy.Globals.API.callByPost({url: "getSpecialistV2", new:true, domain: "FREEJINI_DOMAIN",  params: {name: name, state: state, specialty: specialty, hospital: hospital, page: page, limit: 10}}, function(responseText){
                
                var obj = JSON.parse(responseText);
        
                if(OS_IOS){
                    Alloy.Globals.nav.navigationWindow("specialist_directory/result", "", "", {data: obj, page: page, name: name, state: state, specialty: specialty, hospital: hospital});
                } else{
                    var win = Alloy.createController("specialist_directory/result", {data: obj, page: page, name: name, state: state, specialty: specialty, hospital: hospital}).getView();
                    win.open();
                }
            });
        });
    }
}

function display(i){
    var vResultBorder = $.UI.create("View", {
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        backgroundColor: "black",
        //borderRadius: 10
    });

    var vResultRow = $.UI.create("View", {
        height: Ti.UI.SIZE,
        width: "95%",
        backgroundColor: "#DEDEDE",
        //borderRadius: 10,
        borderColor: "black",
        onClick: "doClick"
    });

    vResultRow.addEventListener('click',function(e){
        var obj2 = obj.data[i];
        if(OS_IOS){
            Alloy.Globals.nav.navigationWindow("specialist_directory/resultDetails", "", "", {data: obj2});
        } else{
            var win = Alloy.createController("specialist_directory/resultDetails", {data: obj2}).getView();
            win.open();
        }
    });

    var vResultRowImg = $.UI.create("View", {
        height: Ti.UI.SIZE,
        width: "30%",
        left: "0%",
    });

    var vResultImgFill = $.UI.create("View", {
        height: Ti.UI.SIZE,
        width: "100%"
    });

    var imgResult;

    if (obj.data[i].attachment === undefined){
        imgResult = $.UI.create("ImageView", {
            left: 5,
            image: "/images/specialist_directory/img_placeholder.png",
            height: 150,
            width: Ti.UI.SIZE,
        });
    } else {
        imgResult = $.UI.create("ImageView", {
        left: 5,
        defaultImage: "/images/specialist_directory/img_placeholder.png",
        image: obj.data[i].attachment,
        height: 150,
        width: Ti.UI.SIZE,
        });
    }

    var vResultRowText = $.UI.create("View", {
        height: Ti.UI.SIZE,
        width: "70%",
        left: "30%",
        layout: "vertical"
    });

    //33%
    var vLblName = $.UI.create("View", {
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
    });

    var lblName = $.UI.create("Label", {
        text: obj.data[i].title + " " + obj.data[i].name,
        font: {
            fontWeight: "bold"
        },
        left: 10
    });

    //33%
    var vLblSpecial = $.UI.create("View", {
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
    });

    var lblSpecial = $.UI.create("Label", {
        text: obj.data[i].practice_field,
        left: 10
    });

    //33%
    var vLblLocation = $.UI.create("View", {
        
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
    });

    var vLocationLeft = $.UI.create("View", {
        height: Ti.UI.SIZE,
        width: "10%",
        left: "0%"
    });

    var vLocationImgFill = $.UI.create("View", {
        height: Ti.UI.SIZE,
        width: "100%"
    });

    var imgLocation = $.UI.create("ImageView", {
        height: 60,
        width: Ti.UI.SIZE,
        image: "/images/specialist_directory/icon/location-red.png",
        right: "10%"
    });

    var vLocationRight= $.UI.create("View", {
        height: Ti.UI.SIZE,
        width: "90%",
        left: "10%"
    });

    var lblLocation = $.UI.create("Label", {
        text: obj.data[i].establishment,
        color: "#5E8DCA",
        font: {
            fontWeight: "bold"
        },
        left: "5%"
    });

    var vWhiteSpace = $.UI.create("View", {
        height: 15,
        width: Ti.UI.FILL,
        backgroundColor: "black"
    });

    //add img
    vResultImgFill.add(imgResult);
    vResultRowImg.add(vResultImgFill);

    //add text
    vLblName.add(lblName);
    vLblSpecial.add(lblSpecial);

    //location
    vLocationRight.add(lblLocation);

    vLocationImgFill.add(imgLocation);
    vLocationLeft.add(vLocationImgFill);

    vLblLocation.add(vLocationLeft);
    vLblLocation.add(vLocationRight);

    //add all text
    vResultRowText.add(vLblName);
    vResultRowText.add(vLblSpecial);
    vResultRowText.add(vLblLocation);

    //add content
    vResultRow.add(vResultRowImg);
    vResultRow.add(vResultRowText);

    //add row
    vResultBorder.add(vResultRow);

    //add to main view
    vResultMain.add(vWhiteSpace);
    vResultMain.add(vResultBorder);
}