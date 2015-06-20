/* Função que gera um número inteiro aleatório.
* Retorno: Número inteiro aleatório compreendido no intervalo [min, max).
*/
function getRandomInt(min, max) {
    if ( max < min ) {
        var swap = max;
        max = min;
        min = swap;
    }
    
    return Math.floor( Math.random() * (max - min) + min );
}