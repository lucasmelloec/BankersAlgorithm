// Buscar uma linha cuja demanda de recursos é menor ou igual à disponibilidade.
function rowElementsLessEqualThan( matrix, array )
{
    let i;
    let test = true;
    
    for ( i = 0; i < matrix.length && test == false; i++ )
    {
        test = true;
        for( let j = 0; j < matrix[i].length; j++ )
            if ( matrix[i][j] > array[j] )
                test = false;
    }

    return i;
}

/* Função que executa o algoritmo do banqueiro.
*   Retorno: false se pode ocorrer deadlock, true caso contrário.
*/
function banker( processesCount, resourcesTypeCount )
{
    /* TODO: Permitir editar os elementos da matriz de demanda.
    *        Nomear recursos.
    *        Visualizar processos concluídos. (Atulmente são apenas removidos da matriz)
    */
    let E = Array( resourcesTypeCount ), // Recursos existentes. 
        P = Array( resourcesTypeCount ), // Recursos sobre posse.
        A = Array( resourcesTypeCount ), // Recursos disponíveis.
        allocationMatrix = Array( processesCount ),
        demandMatrix = Array( processesCount ),
        process, j;

    allocationMatrix.forEach( function( element ) { element = Array( resourcesTypeCount ); } );
    demandMatrix.forEach( function( element ) { element = Array( resourcesTypeCount ); } );

    while ( allocationMatrix.length != 0 )
    {
        process = rowElementsLessEqualThan( allocationMatrix, A ); // Passo 1
        if ( process != allocationMatrix.length ) 
        {
            for( j = 0; j < A.length; j++ ) // Passo 2
            {
                A[j] += allocationMatrix[process][j];
                P[j] -= allocationMatrix[process][j];
            }
            allocationMatrix.splice( process, 1 );
        }
        else
            return false;
    } // Loop: Passo 3

    return true;
}