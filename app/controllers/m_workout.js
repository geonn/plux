var args = arguments[0] || {}; 
var gStep = Ti.App.Properties.getString('step') || 0;
$.myText.text = "You walked " + gStep + " by far .";
	