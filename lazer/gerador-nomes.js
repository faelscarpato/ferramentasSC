// gerador-nomes.js

const nomes = {
    "personagem": [
        "Arthur Pendragon",
        "Guinevere Blackwood",
        "Merlin Ambrosius",
        "Morgana Le Fay",
        "Sir Lancelot",
        "Isolde Whitecliff",
        "Tristan Thorne",
        "Galahad Rivers",
        "Percival Ironwood",
        "Bedivere Sterling"
    ],
    "empresa": [
        "InovaTech Solutions",
        "Global Dynamics Corp",
        "Apex Innovations Ltd",
        "Zenith Enterprises",
        "Veridian Group",
        "Stellaris Systems",
        "NovaCore Industries",
        "Ethereal Visions",
        "Celestial Horizon",
        "Synergy Global Partners"
    ],
    "projeto": [
        "Projeto Aurora",
        "Projeto Phoenix",
        "Projeto Gemini",
        "Projeto Nebula",
        "Projeto Vanguard",
        "Projeto Odyssey",
        "Projeto Horizon",
        "Projeto Zenith",
        "Projeto Infinity",
        "Projeto Quantum"
    ],
         "lugar": [
        "New York",
        "Los ângeles",
        "Texas",
        "California"
    ],
             "animal": [
        "Gato",
        "Cachorro",
        "Leão",
        "Ornintorrinco"
    ]
};

function gerarNomes() {
    const tipo = document.getElementById('tipo').value;
    const quantidade = parseInt(document.getElementById('quantidade').value);
    const listaNomes = document.getElementById('lista-nomes');

    listaNomes.innerHTML = '';

    if (isNaN(quantidade) || quantidade <= 0 || quantidade > 10) {
        alert('Por favor, insira uma quantidade válida entre 1 e 10.');
        return;
    }

    const nomesDisponiveis = nomes[tipo];

    if (!nomesDisponiveis || nomesDisponiveis.length === 0) {
        listaNomes.innerHTML = '<li>Nenhum nome disponível para este tipo.</li>';
        return;
    }

    const nomesGerados = [];
    const nomesUtilizados = new Set();

    while (nomesGerados.length < quantidade && nomesUtilizados.size < nomesDisponiveis.length) {
        const indiceAleatorio = Math.floor(Math.random() * nomesDisponiveis.length);
        const nomeAleatorio = nomesDisponiveis[indiceAleatorio];

        if (!nomesUtilizados.has(nomeAleatorio)) {
            nomesGerados.push(nomeAleatorio);
            nomesUtilizados.add(nomeAleatorio);
        }
    }

    if (nomesGerados.length === 0) {
        listaNomes.innerHTML = '<li>Não foi possível gerar nomes únicos suficientes.</li>';
        return;
    }

    nomesGerados.forEach(nome => {
        const listItem = document.createElement('li');
        listItem.textContent = nome;
        listaNomes.appendChild(listItem);
    });
}
function adicionarNome() {
    const novoNome = document.getElementById('novo-nome').value;
    const novoTipo = document.getElementById('novo-tipo').value;

    if (novoNome.trim() === "") {
        alert("Por favor, digite um nome.");
        return;
    }

    if (!nomes[novoTipo]) {
        nomes[novoTipo] = [];
    }

    nomes[novoTipo].push(novoNome);
    document.getElementById('novo-nome').value = "";
}
function gerarNomesComBase() {
    const nomeBase = document.getElementById('nome-base').value;
    const tipo = document.getElementById('tipo').value;
    const quantidade = parseInt(document.getElementById('quantidade').value);
    const listaNomes = document.getElementById('lista-nomes');

    listaNomes.innerHTML = '';

    if (nomeBase.trim() === "") {
        alert("Por favor, digite um nome base.");
        return;
    }

    if (isNaN(quantidade) || quantidade <= 0 || quantidade > 10) {
        alert('Por favor, insira uma quantidade válida entre 1 e 10.');
        return;
    }

    const nomesGerados = [];
    for (let i = 0; i < quantidade; i++) {
        const sufixos = ["ix",  "us",  "on", "ex"];//Coloquei poucos para exemplo
        const sufixoAleatorio = sufixos[Math.floor(Math.random() * sufixos.length)];
        const nomeGerado = nomeBase + sufixoAleatorio;
        nomesGerados.push(nomeGerado);
    }

    nomesGerados.forEach(nome => {
        const listItem = document.createElement('li');
        listItem.textContent = nome;
        listaNomes.appendChild(listItem);
    });
}

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
})