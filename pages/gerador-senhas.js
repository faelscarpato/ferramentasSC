// gerador-senhas.js
function gerarSenha() {
    const tamanho = parseInt(document.getElementById("tamanho").value);
    const incluirMaiusculas = document.getElementById("maiusculas").checked;
    const incluirMinusculas = document.getElementById("minusculas").checked;
    const incluirNumeros = document.getElementById("numeros").checked;
    const incluirSimbolos = document.getElementById("simbolos").checked;

    // Validação: pelo menos um tipo de caractere deve ser selecionado
    if (!incluirMaiusculas && !incluirMinusculas && !incluirNumeros && !incluirSimbolos) {
        alert("Selecione pelo menos um tipo de caractere (maiúsculas, minúsculas, números ou símbolos).");
        return;
    }
    //Validação do tamanho
      if(isNaN(tamanho) || tamanho < 4 || tamanho > 128){
        alert("O tamanho da senha deve ser um número entre 4 e 128");
        return;
    }

    // Define os caracteres possíveis (baseado nas opções selecionadas)
    let caracteresPossiveis = "";
    if (incluirMaiusculas) caracteresPossiveis += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (incluirMinusculas) caracteresPossiveis += "abcdefghijklmnopqrstuvwxyz";
    if (incluirNumeros) caracteresPossiveis += "0123456789";
    if (incluirSimbolos) caracteresPossiveis += "!@#$%^&*()_+-=[]{}|;':\",./<>?";

    let senha = "";
    for (let i = 0; i < tamanho; i++) {
        const indiceAleatorio = Math.floor(Math.random() * caracteresPossiveis.length);
        senha += caracteresPossiveis[indiceAleatorio];
    }

    document.getElementById("senha-gerada").value = senha;
    //Ajustar visibilidade botão de copiar
    document.getElementById("copiar-senha").style.display = "inline-block";

    // --- AVALIAÇÃO DA FORÇA DA SENHA (zxcvbn) ---
    const resultadoZxcvbn = zxcvbn(senha); // Chama a função zxcvbn
    const score = resultadoZxcvbn.score; // Pontuação de 0 (fraco) a 4 (forte)
    const feedback = resultadoZxcvbn.feedback; // Objeto com sugestões e avisos
    const tempoEstimado = resultadoZxcvbn.crack_times_display.online_throttling_100_per_hour;//Estimativa de tempo

      // Atualizar a barra de progresso e o feedback
       atualizarMedidorForca(score, feedback, tempoEstimado);
}

function copiarSenha() {
    const senhaGerada = document.getElementById("senha-gerada");

    //Verifica se o campo está vazio
    if(!senhaGerada.value){
        alert("Gere uma senha primeiro!");
        return;
    }

    senhaGerada.select();  // Seleciona o texto do campo
    senhaGerada.setSelectionRange(0, 99999);  // Para mobile (iOS)

    navigator.clipboard.writeText(senhaGerada.value) //Copia (agora navigator.clipboard é recomendado)
        .then(() => {
            alert("Senha copiada para a área de transferência!"); //Mensagem de sucesso
        })
        .catch(err => {
            console.error('Erro ao copiar a senha: ', err); //Mensagem de erro
            alert('Erro ao copiar a senha.  Por favor, copie manualmente.');//Mensagem em caso de permissao
        });
}

// Função para atualizar a barra e o texto de feedback
function atualizarMedidorForca(score, feedback, tempoEstimado) {
    const barraProgresso = document.getElementById("progresso-forca");
    const feedbackTexto = document.getElementById("feedback-forca");

    // Define a largura e a cor da barra de progresso com base no score
    const cores = ["#ff0000", "#ff6600", "#ffff00", "#99cc00", "#33cc33"]; // Cores de vermelho a verde
    barraProgresso.style.width = `${(score + 1) * 20}%`; // 0 -> 20%, 1 -> 40%, ..., 4 -> 100%
    barraProgresso.style.backgroundColor = cores[score];

    // Monta a mensagem de feedback
    let mensagem = `Força: ${getForcaTexto(score)}.  `;
     mensagem += `Tempo estimado para quebrar: ${tempoEstimado}. `;

    if (feedback.warning) {
        mensagem += `${feedback.warning}. `;
    }
    if (feedback.suggestions && feedback.suggestions.length > 0) {
        mensagem += "Sugestões: " + feedback.suggestions.join(" ") + "";
    }
    feedbackTexto.textContent = mensagem;
}

// Função auxiliar para obter o texto descritivo da força
function getForcaTexto(score) {
    const textos = ["Muito Fraca", "Fraca", "Razoável", "Forte", "Muito Forte"];
    return textos[score];
}

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
})