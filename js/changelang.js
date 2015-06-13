var get_string;
var language;
function changelang() {
	language = location.search.substring(6, 8);
	if(language == "en" || language == "pt") {
		loadJS("js/lang/lang-"+language+".js");
		updatelang();
		return;
	}

	// If no language found, let's load the default language file:
	loadJS("js/lang/lang-en.js");
	updatelang();
}

function loadJS(url) {
	var script=document.createElement('script');
	script.type='text/javascript';
	script.src=url;
	$("head").append(script);
}

function updatelang() {
	$('#page_title').text(get_string.page_title);
	$('#header_text').text(get_string.header_text);
	
	$('#home_button').text(get_string.home_button);
	document.getElementById("home_button").setAttribute("href", "index.html?lang="+language);
	
	$('#credits_button').text(get_string.credits_button);
	document.getElementById("credits_button").setAttribute("href", "credits.html?lang="+language);
	
	$('#ack_button').text(get_string.ack_button);
	document.getElementById("ack_button").setAttribute("href", "ack.html?lang="+language);
}