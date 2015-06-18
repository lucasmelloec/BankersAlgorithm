var allocationMatrix = [];
var demandMatrix = [[3, 1, 3], [5, 1, 0], [3, 1, 2]]; // Matriz que indica quantos recursos de cada tipo o processo irá pedir durante sua execução.
var terminated = {
    check: [ false, false, false ], // True indica que o processo foi concluído
    count: 0 // Contagem de processos concluídos
};
var P = [];
var A = [];
var E = [5, 2, 3]; // Recursos existentes.

var stateStack = [];

function banker() {
    var current_process;
    
    // Inicialização de P a partir da matriz de alocação
    var j;
    var i;
    for ( j = 0; j < allocationMatrix[0].length; j++ ) {
        P[j] = 0;
        for ( i = 0; i < allocationMatrix.length; i++ ) {
            P[j] += allocationMatrix[i][j];
        }
    }

    // Inicialização de A a partir de E e P
    for ( i = 0; i < E.length; i++ ) {
        A.push( E[i] - P[i] );
    }

    while ( terminated.count != allocationMatrix.length ) {
        // Passo 1
        for ( i = 0; i < allocationMatrix.length; i++ ) {
            if ( terminated.check[i] != true ) {
                for ( j = 0; j < allocationMatrix[0].length; j++ ) {
                    if ( demandMatrix[i][j] - allocationMatrix[i][j] > A[j] ) {
                        j = allocationMatrix[0].length + 1;
                    }
                }
                if ( j == allocationMatrix[0].length ) {
                    current_process = i;
                    i = allocationMatrix.length;
                }
            }
        }

        if ( terminated.check[ current_process ] == false ) {
            // Passo 2 
            // Fornece todos os recursos de que o processo necessita
            for ( i = 0; i < A.length; i++ ) {
                A[i] -= demandMatrix[current_process][i] - allocationMatrix[current_process][i];
                P[i] = E[i] - A[i];
            }
            allocationMatrix[current_process] = demandMatrix[current_process].splice();
            
            stateStack.push({
                P: P,
                A: A,
                allocationMatrix: allocationMatrix,
                state: "BANKER_1_SUCCESS_STATE"
            });

            // Processo se conclui, recursos são liberados
            for( i = 0; i < A.length; i++ ) {
                A[i] += allocationMatrix[current_process][i];
                P[i] = E[i] - A[i];
            }
            allocationMatrix[current_process].forEach(
                function( element ) {
                    element = 0;
                }
            );

            terminated.check[current_process] = true;
            terminated.count++;
            stateStack.push({
                P: P,
                A: A,
                allocationMatrix: allocationMatrix,
                state: "BANKER_2_STATE"
            });

        }
        else {
            stateStack.push({
                P: P,
                A: A,
                allocationMatrix: allocationMatrix,
                state: "BANKER_1_FAIL_STATE"
            });
            
            return false;
        }
    } // Loop: Passo 3

    return true;
}