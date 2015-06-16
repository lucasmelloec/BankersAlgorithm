function Matrix( names, vHeaders, hHeaders ) {
  this.names = names; // Nome dos tipos de objetos na 0 - vertical ex: processos, 1 - horizontal
  this.vH = vHeaders; // Nome dos ítens na vertical. Ex: recursos, impressora, etc.
  this.hH = hHeaders; // Nome dos ítens na horizontal. Ex: processo A, gimp, etc 
  this.elements = Array( this.hH.length );
  this.elements.forEach( function (row) { 
      row = Array( this.vH.length ); 
      row.forEach( function(element) { element = 0; } );
  } );
}

Matrix.prototype = {
    addRow: function( header ) {
        this.vH.push( header );
        this.elements.push( Array( this.hH.length ) );
        this.elements[ this.elements.length - 1 ].forEach( 
            function( element ) { element = 0 } 
        );
    },
    addColumn: function( header ) {
        this.hH.push( header );
        this.elements.forEach( function( row ) { row.push( 0 ) } );
    },
    rowElementsLessEqualThan: function( array ) {
        let i, test = true;
        for ( i = 0; i < this.elements.length && test == false; i++ )
        {
            test = true;
            for( let j = 0; j < this.elements[i].length && test; j++ )
                if ( this.elements[i][j] > array[j] )
                    test = false;
        }
        return i;
    },
    setElement: function( row, column, value ) {
        this.elements[row][column] = value;
    }
};

/* Função que executa o algoritmo do banqueiro.
*   Retorno: false se pode ocorrer deadlock, true caso contrário.
*/
function banker()
{
    // TODO: Visualizar processos concluídos. (Atualmente são apenas removidos da matriz)
    let names = [ 'Processos', 'Recursos' ],
        vHeaders = [ 'A', 'B', 'C', 'D' ], // 4 processos.
        hHeaders = [ 'Impressora', 'Scanner', 'CD-ROM', 'Disquete' ], // 4 recursos.
        demandMatrix = Matrix( names, vHeaders, hHeaders ), // Matriz que indica quantos recursos de cada tipo o processo irá pedir durante sua execução.
        allocationMatrix = Matrix( names, vHeaders, hHeaders ), // Matriz que indica quantos recursos de cada tipo estão alocados a um determinado processo.
        E = Array( vHeaders.length ), // Recursos existentes, ler do usuário.
        P = Array( vHeaders.length ), // Recursos sobre posse, aleatório ou definido pelo usuário.
        A = Array( vHeaders.length ), // Recursos disponíveis.
        process, j;

    /*
    * TODO: Ler os valores dos elementos da matrix de demanda, quantidade
    * de cada recurso disponível, nomes dos recursos e processos.
    */

    while ( allocationMatrix.elements.length != 0 )
    {
        process = demandMatrix.rowElementsLessEqualThan( A ); // Passo 1
        if ( process != demandMatrix.elements.length )
        {
            for( j = 0; j < A.length; j++ ) // Passo 2
            {
                A[j] += demandMatrix.elements[process][j] 
                        - allocationMatrix.elements[process][j];
                P[j] -= demandMatrix.elements[process][j] 
                        + allocationMatrix[process][j];
            }
            allocationMatrix.elements.splice( process, 1 );
        }
        else
            return false;
    } // Loop: Passo 3

    return true;
}