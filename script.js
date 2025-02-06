function abrirFerramenta(idFerramenta) {
    // Redireciona para a página da ferramenta específica (ex: conversor.html)
    // OU abre um modal/popup com a ferramenta.  A escolha é sua.

    // Exemplo com redirecionamento:
    window.location.href = idFerramenta + ".html";

    // Exemplo com modal (precisaria de HTML e CSS adicionais para o modal):
    // const modal = document.getElementById(idFerramenta + "-modal");
    // modal.style.display = "block";
}

//  Você pode adicionar aqui funções globais que serão usadas por várias ferramentas.
//  Exemplo:  Função para validar entrada de números:
function isNumber(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}

// Exemplo: Função para formatar números com separadores de milhar:
function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
})

// Função para voltar para o topo da página
function voltarTopo() {
    document.body.scrollTop = 0; // Para navegadores Safari
    document.documentElement.scrollTop = 0; // Para outros navegadores
}

// Mostra ou esconde o botão "Voltar para o Topo" ao rolar a página
window.onscroll = function() {
    scrollFunction()
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("voltarTopo").style.display = "block";
    } else {
        document.getElementById("voltarTopo").style.display = "none";
    }
}

function abrirFerramenta(idFerramenta) {
    // Redireciona para a página da ferramenta específica (ex: conversor.html)
    // OU abre um modal/popup com a ferramenta.  A escolha é sua.

    window.location.href = idFerramenta + ".html";
}