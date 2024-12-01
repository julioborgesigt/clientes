document.addEventListener('DOMContentLoaded', () => {
    const clientTable = document.getElementById('clientTable');
    const modal = document.getElementById('modal');
    const clientForm = document.getElementById('clientForm');
    const modalTitle = document.getElementById('modalTitle');

    // Dados temporários
    let clients = [];

    // Função para carregar clientes
    function loadClients() {
        clientTable.innerHTML = '';
        clients.forEach((client, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${client.name}</td>
                <td>${client.dueDate}</td>
                <td>${client.service}</td>
                <td>${client.whatsapp}</td>
                <td class="${client.status}">${client.statusText}</td>
                <td>
                    <button class="edit" data-index="${index}">Editar</button>
                    <button class="delete" data-index="${index}">Excluir</button>
                    <button class="pending" data-index="${index}">Pendente</button>
                    <button class="charged" data-index="${index}">Cobrança</button>
                </td>
            `;
            clientTable.appendChild(row);
        });
    }

    // Função para abrir o modal
    function openModal(title) {
        modalTitle.textContent = title;
        modal.classList.remove('hidden');
    }

    // Fechar modal
    document.getElementById('cancel').addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    // Adicionar novo cliente
    document.getElementById('newClient').addEventListener('click', () => {
        openModal('Novo Cliente');
    });

    // Placeholder para salvar cliente (backend será integrado depois)
    clientForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Cliente salvo!');
        modal.classList.add('hidden');
    });

    loadClients(); // Carregar clientes
});
