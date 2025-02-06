// gerador-formulas.js

const areaSelect = document.getElementById('area');
const formulaTextarea = document.getElementById('formula');
const formulaList = document.getElementById('formulaList');

const formulas = {
    algebra: [
        "Equação do 2º grau: ax^2 + bx + c = 0",
        "Fórmula de Bhaskara: x = (-b ± \\sqrt{b^2 - 4ac}) / 2a",
        "Produto notável: (a + b)^2 = a^2 + 2 a b + b^2",
        "Fatoração: a^2 - b^2 = (a + b)(a - b)",
        "Logaritmo: log_a(b) = c  \\Leftrightarrow a^c = b"
    ],
    geometria: [
        "Área do círculo: A = \\pi r^2",
        "Perímetro do círculo: P = 2 \\pi r",
        "Área do triângulo: A = (b h) / 2",
        "Teorema de Pitágoras: a^2 + b^2 = c^2",
        "Volume da esfera: V = (4/3) \\pi r^3"
    ],
    trigonometria: [
        "Seno: sen(θ) = \\frac{cateto oposto}{hipotenusa}",
        "Cosseno: cos(θ) =  \\frac{cateto adjacente}{hipotenusa}",
        "Tangente: tan(θ) =  \\frac{cateto oposto}{cateto adjacente}",
        "Identidade trigonométrica fundamental: sen^2(θ) + cos^2(θ) = 1",
        "Lei dos senos: a / sen(A) = b / sen(B) = c / sen(C)"
    ],
    calculo: [
        "Derivada de x^n: \\frac{d}{dx} (x^n) = n x^{n-1}",
        "Integral de x^n: \\int x^n dx = \\frac{x^{n+1}}{n + 1} + C",
        "Regra da cadeia:  \\frac{d}{dx} [f(g(x))] = f'(g(x))  g'(x)",
        "Teorema Fundamental do Cálculo:  \\int_a^b f(x) dx = F(b) - F(a)",
        "Limite: lim_{x \\to a} f(x) = L"
    ],
    estatistica: [
        "Média: \\mu = \\frac{\\sum x_i}{n}",
        "Desvio padrão: \\sigma = \\sqrt{\\frac{\\sum (x_i - \\mu)^2}{N}}",
        "Variância: \\sigma^2 = \\frac{\\sum (x_i - \\mu)^2}{N}",
        "Correlação de Pearson: r =  \\frac{\\sum [(x_i - \\mu_x)(y_i - \\mu_y)]}{\\sigma_x \\sigma_y n}",
        "Regressão linear: y = mx + b"
    ]
};

function gerarFormula() {
    const areaSelecionada = areaSelect.value;

	if (!formulas[areaSelecionada] || formulas[areaSelecionada].length === 0){
		formulaTextarea.value = "Nenhuma formula encontrada nesta area. \n Contate o suporte.";
		return;
	}

    const formulasDaArea = formulas[areaSelecionada];
    const indiceAleatorio = Math.floor(Math.random() * formulasDaArea.length);
    formulaTextarea.value = formulasDaArea[indiceAleatorio];
     MathJax.typesetPromise()
      .catch(err => console.log('Typeset failed: ' + err.message));
}

function updateFormulaList(){
    const areaSelecionada = areaSelect.value;  //Pega valor
     formulaList.innerHTML = ''; //Limpa a lista

      if (!formulas[areaSelecionada] || formulas[areaSelecionada].length === 0){
		let li = document.createElement('li'); //Cria um novo item
        li.textContent  = "Nenhuma formula encontrada nesta area. \n Contate o suporte."; //seta o texto
		formulaList.appendChild(li) // adiciona a lista HTML
		return;
	}
     const formulasDaArea = formulas[areaSelecionada];
     formulasDaArea.forEach(formula => {
            const listItem = document.createElement('li');
            listItem.textContent = formula;
            formulaList.appendChild(listItem);
        });
       MathJax.typesetPromise()
      .catch(err => console.log('Typeset failed: ' + err.message));
}

function updateFormulaList(){
    const areaSelecionada = areaSelect.value;  //Pega valor
     formulaList.innerHTML = ''; //Limpa a lista

      if (!formulas[areaSelecionada] || formulas[areaSelecionada].length === 0){
		let li = document.createElement('li'); //Cria um novo item
        li.textContent  = "Nenhuma formula encontrada nesta area. \n Contate o suporte."; //seta o texto
		formulaList.appendChild(li) // adiciona a lista HTML
		return;
	}
     const formulasDaArea = formulas[areaSelecionada];
     formulasDaArea.forEach(formula => {
            const listItem = document.createElement('li');

             katex.render(formula, listItem, {
                                throwOnError: false
                            });
            formulaList.appendChild(listItem);
        });
}

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
})
