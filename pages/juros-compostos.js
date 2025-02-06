// juros-compostos.js

function calcularJurosCompostos() {
    // 1. Obter os valores dos campos de entrada
    const capitalInicial = parseFloat(document.getElementById("capital-inicial").value);
    const taxaJuros = parseFloat(document.getElementById("taxa-juros").value) / 100; // Transforma em decimal
    const tempo = parseInt(document.getElementById("tempo").value);
    const aporteMensal = parseFloat(document.getElementById("aporte-mensal").value) || 0;  //Se for vazio,aporte = 0

    // 2. Validar entradas (verificar se são números positivos)
    if (isNaN(capitalInicial) || capitalInicial <= 0 ||
        isNaN(taxaJuros) || taxaJuros < 0 ||
        isNaN(tempo) || tempo <= 0 ||
        isNaN(aporteMensal)) {

        alert("Por favor, insira valores numéricos válidos (maiores que zero para Capital Inicial e Tempo, e não negativos para a Taxa). O Aporte Mensal pode ser zero.");
        return;
    }

    // 3. Calcular o montante final (com e sem aportes mensais)
    let montante = capitalInicial;
    let totalInvestido = capitalInicial;
    const labelsGrafico = [];
    const dadosGrafico = [];

    for (let i = 1; i <= tempo; i++) {
        montante = montante * (1 + taxaJuros);
        if(aporteMensal > 0){
            montante += aporteMensal;
            totalInvestido += aporteMensal;
        }
        labelsGrafico.push(`Mês ${i}`);  // Rótulos do eixo X do gráfico
        dadosGrafico.push(montante.toFixed(2)); // Dados do eixo Y do gráfico
    }

    const jurosTotais = montante - totalInvestido;

    // 4. Exibir os resultados na tela

    // Formatação com toLocaleString para moeda brasileira:
    document.getElementById("montante-final").textContent = montante.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    document.getElementById("total-investido").textContent = totalInvestido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    document.getElementById("juros-totais").textContent = jurosTotais.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    // 5. Criar/atualizar o gráfico (usando Chart.js)
      criarGrafico(labelsGrafico, dadosGrafico);


}

function criarGrafico(labels, dados) {
    const ctx = document.getElementById('grafico-juros').getContext('2d');

    // Destruir o gráfico anterior se existir (para evitar sobreposição)
    if (window.meuGrafico) {
        window.meuGrafico.destroy();
    }

    window.meuGrafico = new Chart(ctx, {
        type: 'line', // Tipo de gráfico (linha)
        data: {
            labels: labels,  // Rótulos do eixo X (meses)
            datasets: [{
                label: 'Evolução do Investimento',
                data: dados,   // Dados do eixo Y (montante)
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // Cor de fundo
                borderColor: 'rgba(75, 192, 192, 1)',      // Cor da linha
                borderWidth: 2
            }]
        },
        options: {  // Opções de configuração do gráfico
            scales: {
                y: {
                    beginAtZero: false // Começa no valor do capital inicial (ou do primeiro aporte, se houver)
                }
            },
            plugins: { // tirar opcoes de zoom
                zoom: {
                    pan:{
                        enabled: false
                    },
                    zoom:{
                        wheel:{
                            enabled:false
                        }
                      }
                    }
                }
        }
    });
}

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
})