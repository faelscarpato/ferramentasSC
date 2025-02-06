// gerador-citacoes.js

const citacoes = [
    {
        texto: "Acredite que você pode e já estará no meio do caminho.",
        autor: "Theodore Roosevelt"
    },
    {
        texto: "O sucesso não é a chave para a felicidade. A felicidade é a chave para o sucesso. Se você ama o que faz, você será bem-sucedido.",
        autor: "Albert Schweitzer"
    },
    {
        texto: "A única maneira de fazer um ótimo trabalho é amar o que você faz.",
        autor: "Steve Jobs"
    },
    {
        texto: "Não espere. O tempo nunca estará 'certo'.",
        autor: "Napoleon Hill"
    },
    {
        texto: "O futuro pertence àqueles que acreditam na beleza de seus sonhos.",
        autor: "Eleanor Roosevelt"
    },
    {
        texto: "A vida não é sobre se encontrar. A vida é sobre se criar.",
        autor: "George Bernard Shaw"
    },
    {
        texto: "A maior glória em viver não está em nunca cair, mas em se levantar cada vez que caímos.",
        autor: "Nelson Mandela"
    }
];

function gerarCitacao() {
    const indiceAleatorio = Math.floor(Math.random() * citacoes.length);
    const citacao = citacoes[indiceAleatorio];

    document.getElementById('texto-citacao').textContent = citacao.texto;
    document.getElementById('autor-citacao').textContent = `- ${citacao.autor}`;
}

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
})