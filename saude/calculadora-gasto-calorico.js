// calculadora-gasto-calorico.js

function calcularGastoCalorico() {
    const peso = parseFloat(document.getElementById('peso').value);
    const atividade = document.getElementById('atividade').value;
    const tempo = parseFloat(document.getElementById('tempo').value);
    const resultadoCalorias = document.getElementById('resultado-calorias');

    if (isNaN(peso) || isNaN(tempo) || peso <= 0 || tempo <= 0) {
        resultadoCalorias.textContent = 'Por favor, insira valores válidos para peso e tempo.';
        return;
    }

    let fatorAtividade;
    switch (atividade) {
        case 'repouso':
            fatorAtividade = 1.0;
            break;
        case 'leve':
            fatorAtividade = 3.0; // Exemplo: 3 calorias por kg por hora
            break;
        case 'moderada':
            fatorAtividade = 6.0; // Exemplo: 6 calorias por kg por hora
            break;
        case 'intensa':
            fatorAtividade = 9.0; // Exemplo: 9 calorias por kg por hora
            break;
        default:
            fatorAtividade = 1.0;
    }

    const caloriasGastas = (peso * fatorAtividade * (tempo / 60));

    resultadoCalorias.textContent = `Você gastou aproximadamente ${caloriasGastas.toFixed(2)} calorias.`;
}

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
})