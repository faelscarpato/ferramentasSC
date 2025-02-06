// corretor.js

function corrigirTexto() {
    const textoOriginal = document.getElementById('texto').value;

    if (!textoOriginal.trim()) {
        alert("Por favor, insira o texto que você deseja corrigir.");
        return;
    }

    const textoCorrigidoTextarea = document.getElementById('textoCorrigido');
    textoCorrigidoTextarea.value = 'Corrigindo texto...';//Aguarde

    //URL da API (LanguageTool)
    const apiUrl = 'https://api.languagetoolplus.com/v2/check';
    const apiKey = 'YOUR_API_KEY';// Troque pelo seu

    const data = new URLSearchParams();
    data.append('text', textoOriginal);
    data.append('language', 'pt-BR');

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': apiKey
        },
        body: data.toString()
    })
    .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }
            return response.json();
    })  
    .then(data => {
        if (data && data.matches) {
            let textoCorrigido = textoOriginal;
            //Aplicar as correções do LanguageTool
            data.matches.forEach(match => {
                if (match.replacements && match.replacements.length > 0) {
                    const replacement = match.replacements[0].value;
                    textoCorrigido = textoCorrigido.replace(textoCorrigido.substring(match.offset, match.offset + match.length), replacement);
                }
            });
            textoCorrigidoTextarea.value = textoCorrigido;
         } else {
            textoCorrigidoTextarea.value = 'Nenhum erro encontrado ou erro na API.';
        }
    })
    .catch(error => {
        console.error('Erro ao corrigir texto:', error);
        textoCorrigidoTextarea.value = `Erro ao corrigir o texto. Verifique sua conexão ou tente novamente mais tarde.`;
    });
}

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
})
