// script.js

let tarefas = [];
let filtroStatus = 'todos';  // Pode ser 'todos', 'concluidas', 'pendentes'

// Função para exibir as tarefas
function exibirTarefas() {
    const listaTarefas = document.getElementById('lista-tarefas');
    listaTarefas.innerHTML = ''; // Limpa a lista antes de adicionar as tarefas

    // Filtra as tarefas com base no status
    const tarefasFiltradas = tarefas.filter(tarefa => {
        if (filtroStatus === 'todos') return true;
        return filtroStatus === 'concluidas' ? tarefa.concluida : !tarefa.concluida;
    });

    // Ordena as tarefas por prioridade e data de conclusão
    tarefasFiltradas.sort((a, b) => {
        if (a.prioridade === b.prioridade) {
            return a.dataConclusao - b.dataConclusao;
        }
        const prioridades = { alta: 1, media: 2, baixa: 3 };
        return prioridades[a.prioridade] - prioridades[b.prioridade];
    });

    // Exibe as tarefas na tela
    tarefasFiltradas.forEach(tarefa => {
        const li = document.createElement('li');
        li.classList.add(tarefa.concluida ? 'concluida' : '', tarefa.dataConclusao <= new Date() ? 'urgente' : '');

        li.innerHTML = `
            <span><strong>${tarefa.nome}</strong> - ${tarefa.dataConclusao.toLocaleDateString()} (Prioridade: ${tarefa.prioridade})</span>
            <input type="checkbox" ${tarefa.concluida ? 'checked' : ''} onclick="marcarConcluida('${tarefa.nome}')">
            <button onclick="editarTarefa('${tarefa.nome}')">Editar</button>
            <button onclick="deletarTarefa('${tarefa.nome}')">Deletar</button>
        `;

        listaTarefas.appendChild(li);  // Adiciona cada tarefa na lista
    });
}

// Função para adicionar uma tarefa
document.getElementById('form-tarefa').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtendo dados do formulário
    const nomeTarefa = document.getElementById('nome-tarefa').value;
    const dataConclusao = document.getElementById('data-conclusao').value;
    const prioridade = document.getElementById('prioridade').value;

    // Adicionando a nova tarefa ao array
    const novaTarefa = {
        nome: nomeTarefa,
        dataConclusao: new Date(dataConclusao),
        prioridade: prioridade,
        concluida: false,
    };

    tarefas.push(novaTarefa);  // Salva a nova tarefa no array

    // Limpar os campos
    document.getElementById('nome-tarefa').value = '';
    document.getElementById('data-conclusao').value = '';
    document.getElementById('prioridade').value = 'media';

    // Exibir a lista de tarefas atualizada
    exibirTarefas();
});

// Função para marcar uma tarefa como concluída
function marcarConcluida(nome) {
    const tarefa = tarefas.find(t => t.nome === nome);
    if (tarefa) {
        tarefa.concluida = !tarefa.concluida;  // Inverte o status da tarefa (concluída/pendente)
        exibirTarefas();  // Atualiza a lista de tarefas
    }
}

// Função para editar uma tarefa
function editarTarefa(nome) {
    const tarefa = tarefas.find(t => t.nome === nome);
    if (tarefa) {
        const novaData = prompt('Nova data de conclusão (formato: YYYY-MM-DD):', tarefa.dataConclusao.toISOString().split('T')[0]);
        if (novaData) tarefa.dataConclusao = new Date(novaData);
        
        const novaPrioridade = prompt('Nova prioridade (alta, media, baixa):', tarefa.prioridade);
        if (novaPrioridade) tarefa.prioridade = novaPrioridade;

        exibirTarefas();  // Atualiza a lista de tarefas
    }
}

// Função para deletar uma tarefa
function deletarTarefa(nome) {
    tarefas = tarefas.filter(t => t.nome !== nome);  // Remove a tarefa do array
    exibirTarefas();  // Atualiza a lista de tarefas
}

// Função de filtro de tarefas (mostrar todas, concluídas ou pendentes)
document.getElementById('btn-filtrar').addEventListener('click', function() {
    // Alterna entre os filtros de tarefas
    if (filtroStatus === 'todos') {
        filtroStatus = 'concluidas';
    } else if (filtroStatus === 'concluidas') {
        filtroStatus = 'pendentes';
    } else {
        filtroStatus = 'todos';
    }

    const btnFiltrar = document.getElementById('btn-filtrar');
    if (filtroStatus === 'concluidas') {
        btnFiltrar.textContent = 'Mostrar Pendentes';
    } else if (filtroStatus === 'pendentes') {
        btnFiltrar.textContent = 'Mostrar Todos';
    } else {
        btnFiltrar.textContent = 'Filtrar Concluídas';
    }

    exibirTarefas();  // Atualiza a lista com o novo filtro
});

// Função para ordenar as tarefas
document.getElementById('btn-ordenar').addEventListener('click', function() {
    // Ordena as tarefas por prioridade e data de conclusão
    tarefas.sort((a, b) => {
        if (a.prioridade === b.prioridade) {
            return a.dataConclusao - b.dataConclusao;
        }
        const prioridades = { alta: 1, media: 2, baixa: 3 };
        return prioridades[a.prioridade] - prioridades[b.prioridade];
    });

    exibirTarefas();  // Atualiza a lista após a ordenação
});

// Exibe as tarefas inicialmente (caso já existam no array)
exibirTarefas();
