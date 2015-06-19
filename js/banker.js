var allocationMatrix = [
    [0, 0, 0], 
    [0, 0, 0], 
    [0, 0, 0]
]; 
var demandMatrix = [ // Quantos recursos de cada tipo o processo irá pedir durante sua execução.
    [3, 1, 3], 
    [5, 1, 0], 
    [3, 1, 2]
];

var previousMatrix = [];

var terminated = {};

var P = [0, 0, 0];
var A = [5, 2, 3];
var E = A.slice(0); // Recursos existentes.

var current_process;

var stateStack = [];

function banker() {
    var local_P = [];
    var local_A = [];
    var local_AllocMatrix = JSON.parse(JSON.stringify(allocationMatrix));
    
    var iteraction = 1;
    
    terminated = {
        check: [ false, false, false ], // True indica que o processo foi concluído
        count: 0 // Contagem de processos concluídos
    };
    
    // Inicialização de local_P a partir da matriz de alocação
    var j;
    var i;
    for ( j = 0; j < local_AllocMatrix[0].length; j++ ) {
        local_P[j] = 0;
        for ( i = 0; i < local_AllocMatrix.length; i++ ) {
            local_P[j] += local_AllocMatrix[i][j];
        }
    }

    // Inicialização de local_A a partir de E e local_P
    for ( i = 0; i < E.length; i++ ) {
        local_A.push( E[i] - local_P[i] );
    }
    
    stateStack.push({
            P: JSON.parse(JSON.stringify(local_P)),
            A: JSON.parse(JSON.stringify(local_A)),
            allocationMatrix: JSON.parse(JSON.stringify(local_AllocMatrix)),
            current_process: null,
            iteraction: iteraction,
            state: "BANKER_1_STATE"
    });

    
    while ( terminated.count != local_AllocMatrix.length ) {
        // Passo 1
        for ( i = 0; i < local_AllocMatrix.length; i++ ) {
            if ( terminated.check[i] != true ) {
                for ( j = 0; j < local_AllocMatrix[0].length; j++ ) {
                    if ( demandMatrix[i][j] - local_AllocMatrix[i][j] > local_A[j] ) {
                        j = local_AllocMatrix[0].length + 1;
                    }
                }
                if ( j == local_AllocMatrix[0].length ) {
                    current_process = i;
                    i = local_AllocMatrix.length;
                }
            }
        }

        if ( j == local_AllocMatrix[0].length && terminated.check[ current_process ] == false ) {
            stateStack.push({
                P: JSON.parse(JSON.stringify(local_P)),
                A: JSON.parse(JSON.stringify(local_A)),
                allocationMatrix: JSON.parse(JSON.stringify(local_AllocMatrix)),
                current_process: current_process,
                iteraction: iteraction,
                state: "BANKER_1_SUCCESS_STATE"
            });
            
            // Passo 2 
            // Fornece todos os recursos de que o processo necessita
            for ( i = 0; i < local_A.length; i++ ) {
                local_A[i] -= demandMatrix[current_process][i] - local_AllocMatrix[current_process][i];
                local_P[i] = E[i] - local_A[i];
            }
            local_AllocMatrix[current_process] = JSON.parse(
                JSON.stringify(demandMatrix[current_process])
            );
            
            stateStack.push({
                P: JSON.parse(JSON.stringify(local_P)),
                A: JSON.parse(JSON.stringify(local_A)),
                allocationMatrix: JSON.parse(JSON.stringify(local_AllocMatrix)),
                current_process: current_process,
                iteraction: iteraction,
                state: "BANKER_2_STATE"
            });

            // Processo se conclui, recursos são liberados
            for( i = 0; i < local_A.length; i++ ) {
                local_A[i] += local_AllocMatrix[current_process][i];
                local_P[i] = E[i] - local_A[i];
            }
            
            for(i = 0; i < local_AllocMatrix[current_process].length; i++) {
                local_AllocMatrix[current_process][i] = 0;
            }

            terminated.check[current_process] = true;
            terminated.count++;
        }
        else {
            stateStack.push({
                P: JSON.parse(JSON.stringify(local_P)),
                A: JSON.parse(JSON.stringify(local_A)),
                allocationMatrix: JSON.parse(JSON.stringify(local_AllocMatrix)),
                current_process: current_process,
                iteraction: iteraction,
                state: "BANKER_1_FAIL_STATE"
            });
            
            allocationMatrix = JSON.parse(JSON.stringify(previousMatrix));
            
            return false;
        }
        
        stateStack.push({
            P: JSON.parse(JSON.stringify(local_P)),
            A: JSON.parse(JSON.stringify(local_A)),
            allocationMatrix: JSON.parse(JSON.stringify(local_AllocMatrix)),
            current_process: current_process,
            iteraction: iteraction,
            state: "BANKER_3_STATE"
        });
        
        iteraction += 1;
        
        stateStack.push({
            P: JSON.parse(JSON.stringify(local_P)),
            A: JSON.parse(JSON.stringify(local_A)),
            allocationMatrix: JSON.parse(JSON.stringify(local_AllocMatrix)),
            current_process: null,
            iteraction: iteraction,
            state: "BANKER_IDLE_STATE"
        });
    } // Loop: Passo 3
    
    stateStack.push({
            P: JSON.parse(JSON.stringify(local_P)),
            A: JSON.parse(JSON.stringify(local_A)),
            allocationMatrix: JSON.parse(JSON.stringify(local_AllocMatrix)),
            current_process: current_process,
            iteraction: iteraction,
            state: "END_STATE"
    });

    return true;
}