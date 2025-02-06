// gerador-dicas-saude.js

const dicasSaude = {
    "geral": [
        "Mantenha uma dieta equilibrada rica em frutas, vegetais e grãos integrais.",
        "Pratique exercícios físicos regularmente, como caminhar, correr ou nadar.",
        "Durma de 7 a 8 horas por noite para garantir um descanso adequado.",
        "Beba bastante água ao longo do dia para manter-se hidratado.",
        "Reserve um tempo para relaxar e meditar para reduzir o estresse.",
        "Evite o consumo excessivo de álcool e tabaco.",
        "Faça check-ups médicos regulares para monitorar sua saúde."
    ],
    "emagrecimento": [
        "Consuma alimentos ricos em fibras, como野菜, frutas e grãos integrais, para aumentar a sensação de saciedade.",
        "Reduza o consumo de alimentos processados, ricos em açúcares, gorduras e sódio.",
        "Pratique exercícios aeróbicos, como corrida ou bicicleta, para queimar calorias.",
        "Controle as porções das refeições e evite comer por impulso.",
        "Beba água antes das refeições para ajudar a controlar o apetite.",
        "Consulte um nutricionista para um plano alimentar personalizado.",
        "Monitore seu progresso e ajuste sua dieta e exercícios conforme necessário."
    ],
    "ganho-massa": [
        "Consuma alimentos ricos em proteínas, como carne, ovos, peixe e leguminosas, para construir massa muscular.",
        "Inclua carboidratos complexos em sua dieta, como batata doce e arroz integral, para fornecer energia.",
        "Faça exercícios de força, como musculação, para estimular o crescimento muscular.",
        "Consulte um nutricionista para um plano alimentar personalizado.",
        "Descanse e recupere-se adequadamente após os treinos.",
        "Suplemente sua dieta com creatina e whey protein, se necessário.",
        "Aumente gradualmente a intensidade dos treinos para desafiar seus músculos."
    ],
    "melhorar-sono": [
	"Crie uma rotina de sono consistente, indo para a cama e acordando no mesmo horário todos os dias.",
        "Evite o uso de eletrônicos, como celulares e tablets, antes de dormir.",
        "Crie um ambiente relaxante no quarto, com temperatura agradável e pouca luz.",
        "Pratique técnicas de relaxamento, como meditação ou respiração profunda, antes de dormir.",
        "Evite cafeína e álcool antes de dormir.",
        "Faça atividades físicas durante o dia, mas evite exercícios intensos perto da hora de dormir.",
 ],
    "reduzir-stress": [
        "Pratique técnicas de relaxamento, como meditação, yoga ou tai chi.",
        "Reserve um tempo para atividades que lhe dão prazer, como ler, ouvir música ou passar tempo com amigos e familiares.",
	"Faça atividades físicas regularmente, como caminhar, correr ou nadar.",
        "Evite o consumo excessivo de álcool e cafeína.",

        "Priorize o sono e descanse adequadamente.",

        "Aprenda a dizer não a compromissos excessivos.",
        "Procure apoio de amigos, familiares ou um profissional de saúde mental, se necessário."
    ]
};

function gerarDica() {
    const objetivo = document.getElementById('objetivo').value;
    const dicas = dicasSaude[objetivo];

    if (dicas && dicas.length > 0) {
        const indiceAleatorio = Math.floor(Math.random() * dicas.length);
        document.getElementById('dica-saude').textContent = dicas[indiceAleatorio];
    } else {
        document.getElementById('dica-saude').textContent = 'Nenhuma dica encontrada para este objetivo.';
    }
}

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
})