let carrinho = [];

// Funções de manipulação do DOM (Document Object Model)
const listaCarrinho = document.getElementById('lista-carrinho');
const totalCarrinho = document.getElementById('total-carrinho');
const contadorCarrinho = document.getElementById('contador-carrinho');
const btnFinalizar = document.getElementById('finalizar-compra');
const botoesAdicionar = document.querySelectorAll('.adicionar-carrinho');


// Função para atualizar a visualização do carrinho
function atualizarCarrinhoDOM() {
    listaCarrinho.innerHTML = ''; // Limpa a lista atual
    let total = 0;

    carrinho.forEach((item, index) => {
        // 1. Cria o elemento da lista (li)
        const li = document.createElement('li');
        
        // 2. Monta a descrição do item
        let descricao = `${item.nome} - R$ ${item.preco.toFixed(2)}`;
        if (item.personalizacao) {
            descricao += ` (${item.personalizacao})`;
        }

        li.innerHTML = `
            <span>${descricao}</span>
            <button onclick="removerDoCarrinho(${index})">Remover</button>
        `;

        listaCarrinho.appendChild(li);
        total += item.preco;
    });

    // Atualiza o total e o contador
    totalCarrinho.textContent = total.toFixed(2);
    contadorCarrinho.textContent = carrinho.length;

    // Habilita/Desabilita o botão de finalizar
    btnFinalizar.disabled = carrinho.length === 0;
}


// Função para adicionar um item ao carrinho
function adicionarAoCarrinho(produtoElement) {
    const nome = produtoElement.dataset.nome;
    const preco = parseFloat(produtoElement.dataset.preco);
    
    // Pega os valores da personalização
    const textoInput = produtoElement.querySelector('#texto-caneca').value;
    const corSelect = produtoElement.querySelector('#cor-caneca').value;

    let personalizacao = `Texto: "${textoInput}", Cor: ${corSelect}`;
    
    const novoItem = {
        nome: nome,
        preco: preco,
        personalizacao: personalizacao // Adiciona a string de personalização
    };

    carrinho.push(novoItem);
    atualizarCarrinhoDOM();
    alert(`"${novoItem.nome}" personalizado adicionado ao carrinho!`);
}


// Função para remover um item do carrinho
function removerDoCarrinho(index) {
    carrinho.splice(index, 1); // Remove o item no índice especificado
    atualizarCarrinhoDOM();
}

// Lógica de Finalizar Compra (apenas demonstração)
btnFinalizar.addEventListener('click', () => {
    if (carrinho.length > 0) {
        alert(`Compra finalizada! Total: R$ ${totalCarrinho.textContent}. Agradecemos a preferência!`);
        carrinho = []; // Esvazia o carrinho
        atualizarCarrinhoDOM();
    } else {
        alert('Seu carrinho está vazio!');
    }
});


// Adiciona o Event Listener para todos os botões de adicionar
botoesAdicionar.forEach(botao => {
    botao.addEventListener('click', (e) => {
        // Encontra o elemento 'produto' pai
        const produtoPai = e.target.closest('.produto'); 
        adicionarAoCarrinho(produtoPai);
    });
});

// Inicializa a visualização do carrinho
atualizarCarrinhoDOM();