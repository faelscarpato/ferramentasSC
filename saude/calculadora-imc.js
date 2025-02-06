// calculadora-imc.js

function calcularIMC() {
    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value);
    const resultadoIMC = document.getElementById('resultado-imc');
    const classificacao = document.getElementById('classificacao');

    if (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
        resultadoIMC.textContent = 'Por favor, insira valores válidos para peso e altura.';
        classificacao.textContent = '';
        return;
    }

    const imc = peso / (altura * altura);
    resultadoIMC.textContent = `Seu IMC é: ${imc.toFixed(2)}`;

    let classificacaoText = '';
    if (imc < 18.5) {
        classificacaoText = 'Abaixo do peso';
    } else if (imc < 25) {
        classificacaoText = 'Peso normal';
    } else if (imc < 30) {
        classificacaoText = 'Sobrepeso';
    } else if (imc < 35) {
        classificacaoText = 'Obesidade grau 1';
    } else if (imc < 40) {
        classificacaoText = 'Obesidade grau 2';
    } else {
        classificacaoText = 'Obesidade grau 3';
    }

    classificacao.textContent = `Classificação: ${classificacaoText}`;
}

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
})