// Classe que representa uma matriz
function Matrix( rows, columns ) {
    this.elements = Array( rows );
    this.elements.forEach( function (row) { 
        row = Array( columns ); 
        row.forEach( function(element) { element = 0; } );
    } );
    this.check = Array( rows );
    this.check.forEach( function( element ) {
        element = true;
    } );
}

Matrix.prototype = {
    clone: function() {
        var i, newMatrix = new Matrix( this.elements.length, this.elements[0].length );
        for ( i = 0; i < newMatrix.elements.length; i++ ) {
            newMatrix.elements[i] = this.elements[i].splice();
        }
        return newMatrix;
    }
};

// Classe para salvar o estado do algoritmo do banqueiro
function BankerState( E, P, A, allocationMatrix, demandMatrix, process, state ) {
  this.E = E;
  this.P = P;
  this.A = A;
  this.allocationMatrix = allocationMatrix;
  this.demandMatrix = demandMatrix;
  this.process = process;
  this.state = state;
}

BankerState.prototype = {
    clone: function() {
        return new BankerState( this.E.splice(), this.P.splice(), this.A.splice(), this.allocationMatrix.clone(), this.demandMatrix.clone(), this.process, this.state );
    }
};


var stateStack = []; // Para uso da máquina de estados

/* Função que executa o algoritmo do banqueiro.
*   Retorno: false se pode ocorrer deadlock, true caso contrário.
*/
function banker( allocationMatrix ) {
    var E = [ 5, 2, 3 ], // Recursos existentes, ler do usuário.
        demandMatrix = new Matrix( 0, 0 ), // Matriz que indica quantos recursos de cada tipo o processo irá pedir durante sua execução.
        P = new Array( E.length ), // Recursos sobre posse, definir pela matriz de alocação.
        A = [], // Recursos disponíveis, (E - P)
        current,
        i, j,
        test;

        demandMatrix.elements[0] = [ 3, 1, 3 ];
        demandMatrix.elements[1] = [ 5, 1, 0 ];
        demandMatrix.elements[2] = [ 3, 1, 2 ];

        // Inicialização de P a partir da matriz de alocação
        for ( j = 0; j < allocationMatrix.elements[0].length; j++ ) {
            P[j] = 0;
            for ( i = 0; i < allocationMatrix.elements.length; i++ ) {
                P[j] += allocationMatrix.elements[i][j];
            }
        }
        // Inicialização de A a partir de E e P
        for ( i = 0; i < E.length; i++ ) {
            A.push( E[i] - P[i] );
        }

        // Estado atual, para ser clonado a cada passo
        current = new BankerState( E, P, A, allocationMatrix, demandMatrix, null );

    while ( allocationMatrix.elements.length != 0 ) {
        // Passo 1
        current.process = null;
        for ( i = 0; i < allocationMatrix.elements.length; i++ ) {
            test = true;
            for ( j = 0; j < allocationMatrix.elements[0].length; j++ ) {
                if ( allocationMatrix.check[i] != true && demandMatrix.elements[i][j] - allocationMatrix.elements[i][j] > A[j] ) {
                    test = false;
                    j = allocationMatrix.elements[0].length;
                }
            }
            if ( test == true ) {
                current.process = i;
                i = allocationMatrix.elements.length;
            }
        }

        if ( current.process != null ) {
            // Passo 2 
            // Fornece todos os recursos de que o processo necessita
            for ( i = 0; i < A.length; i++ ) {
                A[i] -= demandMatrix.elements[current.process][i] - allocationMatrix.elements[current.process][i];
                P[i] = E[i] - A[i];
            }
            allocationMatrix.elements[current.process] = demandMatrix.elements[current.process];
            
            current.state = "BANKER_1_SUCCESS_STATE";
            
            stateStack.push( current.clone() );

            // Processo se conclui, recursos são liberados
            for( i = 0; i < A.length; i++ ) {
                A[i] += allocationMatrix.elements[current.process][i];
                P[i] = E[i] - A[i];
            }
            
            current.state = "BANKER_2_STATE";
            
            allocationMatrix.check[ current.process ] = false;
            stateStack.push( current.clone() );

        }
        else {
            current.state = "BANKER_1_FAIL_STATE";
            
            stateStack.push( current.clone() );
            
            return false;
        }
    } // Loop: Passo 3

    return true;
}