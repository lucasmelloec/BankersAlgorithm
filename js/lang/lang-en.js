get_string = {
	page_title: "Banker's Algorithm",
	header_text: "Banker's Algorithm",
	home_button: "Home",
	theory_button: "Theory",
	credits_button: "Credits",
	ack_button: "Acknowledgments",
	html5_error: "Your browser doesn't support HTML5",
	authors_header_1: "Who did this?",
	authors_title_1: "Project developed in 2015 by the following students of Operating System of the Computer Engineering (ICMC/EESC) at Universidade de São Paulo - Campus São Carlos:",
	authors_1: "Caio César A. Guimarães (Devaneio)",
	authors_2: "Helder de Melo Mendes (Iraque)",
	authors_3: "Henrique Cintra (Oito)",
	authors_4: "Lucas Eduardo C. de Mello (Cabelo) / https://github.com/chapykiller",
	ack_header: "Who helped us?",
	ack_1: "Acknowledgment of gratitude towards Prof. Paulo Sérgio Lopes who gave us classes of Digital Computer Organization and Operating Systems. This project was made possible thanks to him.",
	ack_2: "We are thankful for the the colors and design tips from Carolina Prado.",
	allocated_table: "Allocated",
	m_claim_table: "Max Claimed",
	allocated_array: "Allocated",
	available_array: "Available",
	maximum_array: "Existent",
	banker_init1: "Click on the allocation table's entries",
	banker_init2: "to request resources.",
	banker_iteract: "            Iteraction #",
	banker_11: "Step 1: Find a row whose",
	banker_12: "resource needs until end",
	banker_13: "end execution are smaller",
	banker_14: "or equal to the availability",
	banker_15: "array.",
	banker_1_fail1: "It was impossible to find",
	banker_1_fail2: "any row like that, thus:",
	banker_1_fail3: "Unsafe State.",
	banker_1_succ1: "The highlighted row (proccess)",
	banker_1_succ2: "has been found.",
	banker_21: "Step 2: All the resources were",
	banker_22: "allocated and the execution starts",
	banker_22: "the process executed to termination.",
	banker_31: "Step 3: The execution of the process",
	banker_32: "ends.",
	banker_33: "Repeat the previous steps.",
	banker_imp1: "You've tried to allocate",
	banker_imp2: "an unavailable number",
	banker_imp3: "of resources.",
	banker_end1: "The banker managed to allocate",
	banker_end2: "the needed resources for every",
	banker_end3: "process finish execution. This",
	banker_end4: "is a safe state, and the resources",
	banker_end5: "can be allocated.",
	theory_header: "Concepts involved",
	theory_title_1: "Deadlocks",
	theory_title_2: "Safe and unsafe states",
	theory_title_3: "Avoiding deadlocks - The banker's algorithm",
	theory_paragraph_1: "A set of processes is deadlocked if each process in the set is waiting for an event that only another process in the set can cause.",
	theory_paragraph_2: "If the resources can be allocated in such a way that all processes can be executed to termination, we have a safe state. A safe state never leads to deadlocks. Otherwise, we have an unsafe state, which can lead to a deadlock, but not necessarily will.",
	theory_paragraph_31: "The data needed for the algorithm can be represented in a matrix, where each row is associated to a process, each column is associated to a resource and the elements are the amount of a certain resource allocated to the process.",
	theory_paragraph_32_title: "Respresentation",
	theory_paragraph_32: "An algorithm created by Dijkstra in 1965. It can be used to avoid deadlocks. Everytime resources are requested, the algorithm checks whether grating the request leads to an unsafe state and if it does, the request is denied.",
	theory_paragraph_33_def1_title: "Hypothesis and input",
	theory_paragraph_33_def2_title: "Step 1",
	theory_paragraph_33_def3_title: "Step 2",
	theory_paragraph_33_def4_title: "Step 3",
	theory_paragraph_33_def1: "The algorithm assumes that the system has information about the maximum amount of each resource to be required by each process. The input is a request for resources. Whenever there is a new request for resources the steps below are executed.",
	theory_paragraph_33_def2: "Look for a process (row) whose demand for resources is equal or smaller than the availability of that resource. If no process can be found, we have a unsafe state, what may lead to a deadlock.",
	theory_paragraph_33_def3: "Assume that all resources required by a process are provided to that process and it runs to termination. The resources allocated to that process are then freed and can be used by other processes.",
	theory_paragraph_33_def4: "Repeat the previous steps until all processes run to termination or no process can be granted enough resources to run until completion. If all processes have terminated, the state is safe and the resources requested can be granted. Otherwise, the state is unsafe and the request will not be granted.",
	theory_paragraph_34_title: "Final considerations",
	theory_paragraph_34: "While the banker's algorithm is sufficient to avoid deadlocks in theory, in practice the hypothesis is not satisfied in most systems since there is no information regarding the maximum amount of resources that each process will require throughout its execution.",
	theory_reference_header: "References:",
	theory_reference: "TANENBAUM, A. S. Modern Operating Systems: 3rd Edition - Pearson Education (2008) - United Kingdom"
};
