var canvas;
var container;
var context;
var objects = [];
var texts = [];
var num_of_images = 3;
var refs = 0;

var fade_timer;
var draw_timer;

drawInit();

/* Função que inicializa o necessario para começar a desenhar no canvas
*   Retorno: sem retorno.
*/
function drawInit() {
    $(window).load(function() {
        canvas = $("#banker_canvas").get(0);
        container = $("#banker_canvas").parent();
        context = canvas.getContext("2d");
        context.font="30px sans-serif";
    
        $(canvas).click(function(event) {
            var x = 0;
            var y = 0;
            var totalOffsetX = 0;
            var totalOffsetY = 0;
            var currentElement = canvas;

            do {
                totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
                totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
                currentElement = currentElement.offsetParent;
            }
            while(currentElement != null);

            if (event.pageX != undefined && event.pageY != undefined) {
                x = event.pageX - totalOffsetX;
                y = event.pageY - totalOffsetY;
            }
            else {// Firefox method to get the position
            x = event.clientX + document.body.scrollLeft +
              document.documentElement.scrollLeft - totalOffsetX;
            y = event.clientY + document.body.scrollTop +
              document.documentElement.scrollTop - totalOffsetY;
            }
        
            x = Math.round(x * (canvas.width / canvas.offsetWidth));
            y = Math.round(y * (canvas.height / canvas.offsetHeight));

            collisions(x, y);
        });
        
        //Executa respondCanvas se o browser for redimensionado
        $(window).resize( respondCanvas );

        loadImage("character");
        loadImage("table");
        loadImage("table");
        objects[0].x = -100;
        objects[1].x = 300;
        objects[2].x = 300;
        objects[2].y = 230;
        //objects[2].visibility = false;
        createText(get_string.home_button);
    });
}

var asd = setTimeout(function() {
    fade(objects[1], 1);
    clearTimeout(asd);
}, 1000);

/* Função que carrega uma imagem.
*   Retorno: sem retorno.
*/
function loadImage(name) {
    var i = objects.length;
    
    objects.push({
        image: new Image(),
        visibility: true,
        x: 0,
        y: 0,
        alpha: 1
    });
    
    $(objects[i].image).load(function() {
        refs++;
        if(refs >= num_of_images) {
            draw_timer = setInterval(function() {draw();}, 34);
        }
    });
    objects[i].image.src = "img/"+name+".png";
}

/* Função para criar um texto a ser impresso no canvas
*   Retorno: sem retorno.
*/
function createText(text) {
    texts.push({
        value: text,
        visibility: true,
        x: 0,
        y: 0
    });
}

/* Função que desenha no canvas correspondente.
*   Retorno: sem retorno.
*/
function draw() {
    context.globalAlpha = 1;
    // Limpa a tela
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    // Desenha todas as imagens visíveis
    var i;
    for (i = 0; i < objects.length; i++) {
        if(objects[i].visibility == true) {
            context.drawImage(objects[i].image, objects[i].x, objects[i].y);
        }
    }
    for (i = 0; i < texts.length; i++) {
        if(texts[i].visibility == true) {
            context.fillText(texts[i].value, texts[i].x, texts[i].y + 22);
        }
    }
}

/* Função que redimensiona o canvas
*   Retorno: sem retorno.
*/
function respondCanvas(){ 
        $(canvas).attr('width', $(container).width() ); //max width
        $(canvas).attr('height', $(container).height() ); //max height

        draw();
}

/* Função que detecta colisoes
*   Retorno: sem retorno.
*/
function collisions(x, y)
{
    //alert("x: " + x + "  y: " + y);
}

/* Função que realiza fade-in(fadeout = false) ou fade-out(fadeout = true)
*   Retorno: sem retorno.
*/
function fade(obj, fadeout) {
    if(fadeout == false) {
        obj.alpha = 0;
    }
    else {
        obj.alpha = 1;
    }
    
    obj.visibility = !obj.visibility;
    
    clearInterval(draw_timer);
    fade_timer = setInterval(function() {fadeloop(obj, fadeout)}, 34);
}

/* Função auxiliar de fade
*   Retorno: sem retorno.
*/
function fadeloop(obj, fadeout) {
    if(fadeout == false) {
        obj.alpha += 0.05;
    }
    else {
        obj.alpha -= 0.05;
    }

    if (obj.alpha <= 0 || obj.alpha >= 1) {
        clearInterval(fade_timer);
        draw_timer = setInterval(function() {draw();}, 34);
    }
        
    /// clear canvas
    context.clearRect(obj.x, obj.y, obj.image.width, obj.image.height);
        
    /// set global alpha
    context.globalAlpha = obj.alpha;
        
    /// re-draw image
    context.drawImage(obj.image, obj.x, obj.y);
}