// calculadora-frete.js

function calcularFrete() {
    const cepOrigem = document.getElementById('cepOrigem').value;
    const cepDestino = document.getElementById('cepDestino').value;
    const peso = parseFloat(document.getElementById('peso').value);
    const comprimento = parseFloat(document.getElementById('comprimento').value);
    const largura = parseFloat(document.getElementById('largura').value);
    const altura = parseFloat(document.getElementById('altura').value);
    const resultadosDiv = document.getElementById('resultados');

    //Validação
    if (!cepOrigem || !cepDestino || isNaN(peso) || isNaN(comprimento) || isNaN(largura) || isNaN(altura)) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
    }
     resultadosDiv.innerHTML = '<p>Calculando...</p>';

    //Simulação de resultados de diferentes transportadoras
    const simulacaoResultados = {
        correios: {
            nome: "Correios",
            valor: (peso * 0.5) + (comprimento * largura * altura / 10000) * 10,
            prazo: 5
        },
        jadlog: {
            nome: "Jadlog",
            valor: (peso * 0.4) + (comprimento * largura * altura / 10000) * 8,
            prazo: 3
        },
        azul: {
            nome: "Azul Cargo Express",
            valor: (peso * 0.6) + (comprimento * largura * altura / 10000) * 12,
            prazo: 2
        }
    };

    // Formata e exibe os resultados
    let resultadosHTML = '';
    for (const transportadora in simulacaoResultados) {
        const resultado = simulacaoResultados[transportadora];
        resultadosHTML += `
            <div class="transportadora">
                <h3>${resultado.nome}</h3>
                <p>Valor do Frete: R$ ${resultado.valor.toFixed(2)}</p>
                <p>Prazo de Entrega: ${resultado.prazo} dias úteis</p>
            </div>
        `;
    }

    resultadosDiv.innerHTML = resultadosHTML;
}

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
})