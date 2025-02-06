// media-ponderada.js

const inputsDiv = document.getElementById('inputs');
let counter = 0;

function adicionarCampo() {
	counter++;
    const newInput = document.createElement('div');
    newInput.classList.add('input-materia'); // Adiciona uma classe CSS

    newInput.innerHTML = `
        <label for="nota${counter}">Nota ${counter}:</label>
        <input type="number" id="nota${counter}" class="nota" placeholder="0-10" min="0" max="10">
        <label for="peso${counter}">Peso ${counter}:</label>
        <input type="number" id="peso${counter}" class="peso"  placeholder="1-10" min="1" max="10">
    `;

    inputsDiv.appendChild(newInput);
}

function calcularMedia() {
    let somaNotasPesos = 0;
    let somaPesos = 0;

    const notas = document.querySelectorAll('.nota');
    const pesos = document.querySelectorAll('.peso');

    for (let i = 0; i < notas.length; i++) {
        const nota = parseFloat(notas[i].value);
        const peso = parseFloat(pesos[i].value);

		//Validação valores NaN
        if (isNaN(nota) || isNaN(peso)) {
            alert('Por favor, preencha todos os campos com valores numéricos.');
            return;
        }
		//Validação valores MIN MAX
		if (nota < 0 || nota > 10 || peso < 1 || peso > 10) {
            alert('As notas devem estar entre 0 e 10, e os pesos entre 1 e 10.');
            return;
        }

        somaNotasPesos += nota * peso;
        somaPesos += peso;
    }

    if (somaPesos === 0) {
        document.getElementById('media').value = 'Nenhum peso inserido.';
        return;
    }

    const mediaPonderada = somaNotasPesos / somaPesos;
    document.getElementById('media').value = mediaPonderada.toFixed(2);
}

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
})
