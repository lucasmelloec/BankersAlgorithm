var get_string;
function changelang(language) {
	if (typeof(language)=="string") {
		loadJS("js/lang/lang-"+language+".js");
		updatelang();
		return;
	}

	// If no language found, let's load the default language file:
	loadJS("js/lang/lang-en.js");
	updatelang();
};

function loadJS(url) {
	var script=document.createElement('script');
	script.type='text/javascript';
	script.src=url;
	$("head").append(script);
};

function updatelang() {
	$('#page_title').text(get_string.page_title);
	$('#header_text').text(get_string.header_text);
}