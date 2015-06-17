// Classe que representa uma matriz
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
            for ( let j = 0; j < this.elements[i].length && test; j++ )
                if ( this.elements[i][j] > array[j] )
                    test = false;
        }
        return i;
    },
    setElement: function( row, column, value ) {
        this.elements[row][column] = value;
    },
    clone: function() {
        let i, newMatrix = new Matrix (
            this.names.splice(), 
            this.vHeaders.splice(),
            this.hHeaders.splice()
        );
        for ( i = 0; i < newMatrix.elements.length; i++ )
            newMatrix.elements[i] = this.elements[i].splice();
        return newMatrix;
    }
};

// Classe para salvar o estado do algoritmo do banqueiro
function BankerState( E, P, A, allocationMatrix, demandMatrix ) {
  this.E = E;
  this.P = P;
  this.A = A;
  this.allocationMatrix = allocationMatrix;
  this.demandMatrix = demandMatrix;
}

BankerState.prototype = {
    clone: function() {
        return new BankerState( this.E.splice(), this.P.splice(), this.A.splice(), this.allocationMatrix.clone(), this.demandMatrix.clone() );
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
        E = [ 5, 2, 10, 2 ], // Recursos existentes, ler do usuário.
        P = Array( E.length ), // Recursos sobre posse, definir pela matriz de alocação.
        A, // Recursos disponíveis, (E - P)
        process, i, j;
        
        
        /* TODO: Ler os valores dos elementos da matriz de demanda e de alocação 
        * e a quantidade de cada recurso disponível (vetor E).
        */

        // Inicialização de P a partir da matriz de alocação
        P.forEach( function( element ) { element = 0 } );
        P.forEach( function( element ) {
            for ( j = 0; j < allocationMatrix.elements[i].length; j++ )
                for ( i = 0; i < allocationMatrix.elements.length; i++ )
                    element += allocationMatrix.elements[i][j];
        } );
        
        // Inicialização de A a partir de E e P
        for ( i = 0; i < E.length; i++ )
            A.push( E[i] - P[i] );

    while ( allocationMatrix.elements.length != 0 )
    {
        process = demandMatrix.rowElementsLessEqualThan( A ); // Passo 1
        if ( process != demandMatrix.elements.length )
        {
            for( let j = 0; j < A.length; j++ ) // Passo 2
            {
                A[j] += allocationMatrix.elements[process][j];
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