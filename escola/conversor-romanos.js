// conversor-romanos.js

function converter() {
    const inputValue = document.getElementById('input').value.toUpperCase(); /*Converte  string para maiuscula*/
    const tipoConversao = document.getElementById('tipo').value;
    const resultadoElement = document.getElementById('resultado');

     //Limpar o campo de resultados
     resultadoElement.value = '';

    let resultado;

    try {
        if (tipoConversao === 'romano') {
            resultado = decimalParaRomano(parseInt(inputValue, 10)); /*Base 10*/
        } else if (tipoConversao === 'decimal') {
            resultado = romanoParaDecimal(inputValue);
        } else {
            throw new Error('Tipo de conversão inválido.');
        }
        resultadoElement.value = resultado;
    } catch (error) {
        resultadoElement.value = 'Erro: ' + error.message;
    }
}

function decimalParaRomano(num) {
     //Validação
    if (isNaN(num) || num <= 0 || num >= 4000) {
        throw new Error('Por favor, insira um número entre 1 e 3999.');
    }

    const numerosRomanos = {
        M: 1000,
        CM: 900,
        D: 500,
        CD: 400,
        C: 100,
        XC: 90,
        L: 50,
        XL: 40,
        X: 10,
        IX: 9,
        V: 5,
        IV: 4,
        I: 1
    };

    let resultado = '';

    for (let key in numerosRomanos) {
        const valorRomano = numerosRomanos[key];
        while (num >= valorRomano) {
            resultado += key;
            num -= valorRomano;
        }
    }

    return resultado;
}

function romanoParaDecimal(romano) {

 if (!/^(M{0,4})(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/.test(romano)) {
        throw new Error('Número romano inválido.');
    }

    const numerosRomanos = {
        M: 1000,
        CM: 900,
        D: 500,
        CD: 400,
        C: 100,
        XC: 90,
        L: 50,
        XL: 40,
        X: 10,
        IX: 9,
        V: 5,
        IV: 4,
        I: 1
    };

    let resultado = 0;

    for (let i = 0; i < romano.length; i++) {
        const currentChar = romano [i];
        const nextChar = romano[i + 1];
        const currentValue = numerosRomanos[currentChar];
        const nextValue = numerosRomanos[nextChar];

        if (nextValue && currentValue < nextValue){
             resultado += nextValue - currentValue;
            i++;
        } else {
            resultado += currentValue;
        }

    } return resultado;
}

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
})
