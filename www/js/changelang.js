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
	
	$("#tutorial_button").text(get_string.tutorial_button);
	$("#tutorial_button").attr("href", "tutorial.html?lang="+language);
	
	$("#theory_button").text(get_string.theory_button);
	$("#theory_button").attr("href", "theory.html?lang="+language);
	
	$("#credits_button").text(get_string.credits_button);
	$("#credits_button").attr("href", "credits.html?lang="+language);
	
	$("#ack_button").text(get_string.ack_button);
	$("#ack_button").attr("href", "ack.html?lang="+language);
	
	$("#banker_canvas").text(get_string.html5_error);
	
	$("#authors_header_1").text(get_string.authors_header_1);
	$("#authors_title_1").text(get_string.authors_title_1);
	
	$("#ack_header").text(get_string.ack_header);
	$("#ack_1").text(get_string.ack_1);
	$("#ack_2").text(get_string.ack_2);
	
	$("#tutorial_header_1").text(get_string.tutorial_header_1);
	$("#tutorial_title_1").text(get_string.tutorial_title_1);
	$("#tutorial_paragraph_1").text(get_string.tutorial_paragraph_1);

	$("#tutorial_subtitle_11").text(get_string.tutorial_subtitle_11);
	$("#tutorial_subtitle_12").text(get_string.tutorial_subtitle_12);
	$("#tutorial_subtitle_13").text(get_string.tutorial_subtitle_13);
	$("#tutorial_paragraph_11").text(get_string.tutorial_paragraph_11);
	$("#tutorial_paragraph_12").text(get_string.tutorial_paragraph_12);
	$("#tutorial_paragraph_13").text(get_string.tutorial_paragraph_13);
	$("#tutorial_title_2").text(get_string.tutorial_title_2);
	$("#tutorial_paragraph_21").text(get_string.tutorial_paragraph_21);
	$("#tutorial_paragraph_22").text(get_string.tutorial_paragraph_22);
	$("#tutorial_paragraph_23").text(get_string.tutorial_paragraph_23);
	$("#tutorial_paragraph_24").text(get_string.tutorial_paragraph_24);
	
	$("#interface_img").attr("src", "img/interface_"+language+".png");
	$("#buttons_tutorial_img").attr("src", "img/buttons_tutorial_"+language+".png");
	
	$("#theory_header").text(get_string.theory_header);
	$("#theory_title_1").text(get_string.theory_title_1);
	$("#theory_title_2").text(get_string.theory_title_2);
	$("#theory_title_3").text(get_string.theory_title_3);
	$("#theory_paragraph_1").text(get_string.theory_paragraph_1);
	$("#theory_paragraph_2").text(get_string.theory_paragraph_2);
	$("#theory_paragraph_31").text(get_string.theory_paragraph_31);
	$("#theory_paragraph_32_title").text(get_string.theory_paragraph_32_title);
	$("#theory_paragraph_32").text(get_string.theory_paragraph_32);
	$("#theory_paragraph_33_title").text(get_string.theory_paragraph_33_title);
	$("#theory_paragraph_33").text(get_string.theory_paragraph_33);
	$("#theory_paragraph_34_def1_title").text(get_string.theory_paragraph_34_def1_title);
	$("#theory_paragraph_34_def2_title").text(get_string.theory_paragraph_34_def2_title);
	$("#theory_paragraph_34_def3_title").text(get_string.theory_paragraph_34_def3_title);
	$("#theory_paragraph_34_def1").text(get_string.theory_paragraph_34_def1);
	$("#theory_paragraph_34_def2").text(get_string.theory_paragraph_34_def2);
	$("#theory_paragraph_34_def3").text(get_string.theory_paragraph_34_def3);
	$("#theory_paragraph_35_title").text(get_string.theory_paragraph_35_title);
	$("#theory_paragraph_35").text(get_string.theory_paragraph_35);
	$("#theory_reference_header").text(get_string.theory_reference_header);
	$("#theory_reference").text(get_string.theory_reference);
}