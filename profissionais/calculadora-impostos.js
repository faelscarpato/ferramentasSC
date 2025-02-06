// calculadora-impostos.js

// Funções auxiliares para formatar números como moeda
function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

//INSS
function calcularINSS() {
    const salarioBruto = parseFloat(document.getElementById('salario-bruto-inss').value);
    const resultadoDiv = document.getElementById('resultado-inss');

     if (isNaN(salarioBruto) || salarioBruto <= 0) {
        resultadoDiv.innerHTML = "Por favor, insira um salário bruto válido (maior que zero).";
        return;
    }

    let aliquota, deducao;

    if (salarioBruto <= 1320.00) {
        aliquota = 0.075;
        deducao = 0;
    } else if (salarioBruto <= 2571.29) {
        aliquota = 0.09;
        deducao = 19.80;
    } else if (salarioBruto <= 3856.94) {
        aliquota = 0.12;
        deducao = 96.94;
    } else if (salarioBruto <= 7507.49) {
        aliquota = 0.14;
        deducao = 174.08;
    } else {
        aliquota = 0.14;
        deducao = 174.08; //Teto
    }

    const valorINSS = salarioBruto * aliquota - deducao;
    resultadoDiv.innerHTML = `Valor do INSS: ${formatarMoeda(valorINSS)}`;
}

//IRPF
function calcularIRPF() {
    const salarioBruto = parseFloat(document.getElementById('salario-bruto-ir').value);
    const numDependentes = parseInt(document.getElementById('dependentes-ir').value) || 0;
    const outrasDeducoes = parseFloat(document.getElementById('outras-deducoes-ir').value) || 0;
    const resultadoDiv = document.getElementById('resultado-ir');

    //Validacao
    if (isNaN(salarioBruto) || salarioBruto <= 0) {
        resultadoDiv.innerHTML = "Por favor, insira um salário bruto válido (maior que zero).";
        return;
    }

     const descontoINSS = calcularINSS2(salarioBruto);
    const baseCalculo = salarioBruto - descontoINSS - (numDependentes * 189.59) - outrasDeducoes;


    let aliquota, deducao;
     if (baseCalculo <= 2112.00) {
        aliquota = 0;
        deducao = 0;
    } else if (baseCalculo <= 2826.65) {
        aliquota = 0.075;
        deducao = 158.40;
    } else if (baseCalculo <= 3751.05) {
        aliquota = 0.15;
        deducao = 370.40;
    } else if (baseCalculo <= 4664.68) {
        aliquota = 0.225;
        deducao = 651.73;
    } else {
        aliquota = 0.275;
        deducao = 884.96;
    }

    const valorIRPF = baseCalculo * aliquota - deducao;
    resultadoDiv.innerHTML = `Valor do IRPF: ${"R$" + valorIRPF.toFixed(2)}`;
}

//Função separada para ser usada no IRPF
function calcularINSS2(salarioBruto) {


     let aliquota;
     let deducao;

      if (salarioBruto <= 1320.00) {
            aliquota = 0.075;
            deducao = 0;
        } else if (salarioBruto <= 2571.29) {
            aliquota = 0.09;
            deducao = 19.80;
        } else if (salarioBruto <= 3856.94) {
            aliquota = 0.12;
            deducao = 96.94;
        } else if (salarioBruto <= 7507.49){
             aliquota = 0.14;
             deducao = 174.08;
        } else {
            aliquota = 0.14
            deducao = 174.08
        }
    return (salarioBruto * aliquota) - deducao;
}

function calcularISS() {
    const receitaBruta = parseFloat(document.getElementById('receita-bruta').value);
    const aliquotaISS = parseFloat(document.getElementById('aliquota-iss').value);
    const resultadoDiv = document.getElementById('resultado-iss');

    if (isNaN(receitaBruta) ||  isNaN(aliquotaISS) ){
         resultadoDiv.innerHTML = "Por favor, preencha todos os valores.";
         return;
    }
     if (receitaBruta <= 0 || aliquotaISS <= 0) {
        resultadoDiv.innerHTML = "Por favor, insira valores maiores que zero.";
        return;
    }
       if (aliquotaISS > 100) {
        resultadoDiv.innerHTML = "A alíquota não pode ser maior que 100%.";
        return;
    }

    const valorISS = receitaBruta * (aliquotaISS / 100);
    resultadoDiv.innerHTML = `Valor do ISS: ${formatarMoeda(valorISS)}`;
}

//Mostrar ou esconder os formularios
function showForm(formId) {
    const forms = document.querySelectorAll('.imposto-form');
    forms.forEach(form => {
        form.style.display = 'none';
    });
    document.getElementById(formId).style.display = 'block';
}

//Evento inicial para selecionar form
const tipoSelect = document.getElementById('tipo');
tipoSelect.addEventListener('change', function() {
    const selectedValue = tipoSelect.value;
    switch (selectedValue) {
        case 'ir':
            showForm('form-ir');
            break;
        case 'inss':
            showForm('form-inss');
            break;
        case 'iss':
            showForm('form-iss');
            break;
        default:
            showForm('form-ir');
            break;
    }
});
//Chama a função pra garantir que tenha algo ativo ao carregar
showForm('form-ir');

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
})