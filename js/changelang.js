var get_string = null;
var language = null;
function changelang() {
	if(get_string != null) {
		return;
	}
	
	var query = location.search.substring(1);
	var searchPat = /lang=\w{2}/;
	var position = query.search(searchPat);
	
	if(position >= 0) {
		language = query.substr(position + 5, 2);
		
		if(language == "en" || language == "pt") {
			loadJS("js/lang/lang-"+language+".js");
			updatelang();
			return;
		}
	}

	// Se não encontrar o idioma, carrega o padrão
	loadJS("js/lang/lang-pt.js");
	updatelang();
}

function loadJS(url) {
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = url;
	$("head").append(script);
}

function updatelang() {
	if(language != "pt" && language != "en") {
		language = "pt";
	}
	
	$("#page_title").text(get_string.page_title);
	
	$("#header_text").text(get_string.header_text);
	
	$("#home_button").text(get_string.home_button);
	$("#home_button").attr("href", "index.html?lang="+language);
	
	$("#theory_button").text(get_string.theory_button);
	$("#theory_button").attr("href", "theory.html?lang="+language);
	
	$("#credits_button").text(get_string.credits_button);
	$("#credits_button").attr("href", "credits.html?lang="+language);
	
	$("#ack_button").text(get_string.ack_button);
	$("#ack_button").attr("href", "ack.html?lang="+language);
	
	$("#banker_canvas").text(get_string.html5_error);
	
	$("#authors_header_1").text(get_string.authors_header_1);
	$("#authors_title_1").text(get_string.authors_title_1);
	$("#authors_1").text(get_string.authors_1);
	$("#authors_2").text(get_string.authors_2);
	$("#authors_3").text(get_string.authors_3);
	$("#authors_4").text(get_string.authors_4);
	
	$("#ack_1").text(get_string.ack_1);
	$("#ack_2").text(get_string.ack_2);
	
	$("#theory_header").text(get_string.theory_header);
	$("#theory_title_1").text(get_string.theory_title_1);
	$("#theory_title_2").text(get_string.theory_title_2);
	$("#theory_title_3").text(get_string.theory_title_3);
	$("#theory_paragraph_1").text(get_string.theory_paragraph_1);
	$("#theory_paragraph_2").text(get_string.theory_paragraph_2);
	$("#theory_paragraph_3").text(get_string.theory_paragraph_3);
	$("#theory_reference_header").text(get_string.theory_reference_header);
	$("#theory_reference").text(get_string.theory_reference);
}