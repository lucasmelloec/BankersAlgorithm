//Run function when browser resizes
$(window).resize( respondCanvas );
var container;
var canvas;
var context;
var image;
var table;
    
$(window).ready(function() {
    canvas = $("#banker_canvas").get(0);
    container = $("#banker_canvas").parent();
    context = canvas.getContext("2d");
    
    image = new Image();
    table = new Image();
    image.onload = function() {
        context.drawImage(image, -40, 150);
    };
    image.src = "img/character.png";
    table.onload = function() {
        context.drawImage(table, 300, 30);
    };
    table.src = "img/table.png";
});

function respondCanvas(){ 
        canvas.attr('width', $(container).width() ); //max width
        canvas.attr('height', $(container).height() ); //max height

        //Call a function to redraw other content (texts, images etc)
        context.drawImage(image, 0, 150);
        context.drawImage(table, 0, 0);
}