// criador-jogos-palavras.js

function criarJogo() {
    const tipoJogo = document.getElementById('tipo-jogo').value;
    const listaPalavras = document.getElementById('lista-palavras').value;
    const palavras = listaPalavras.split(',').map(palavra => palavra.trim().toUpperCase());

    if (palavras.length === 0 || palavras[0] === "") {
        alert("Por favor, insira uma lista de palavras válida.");
        return;
    }

    document.getElementById('configuracao').style.display = 'none';
    document.getElementById('jogo').style.display = 'block';

    const areaJogo = document.getElementById('area-jogo');
    areaJogo.innerHTML = '';

    switch (tipoJogo) {
        case 'palavras-cruzadas':
            criarPalavrasCruzadas(areaJogo, palavras);
            break;
        case 'anagramas':
            criarAnagramas(areaJogo, palavras);
            break;
        case 'forca':
            criarForca(areaJogo, palavras);
            break;
        case 'caca-palavras':
            criarCacaPalavras(areaJogo, palavras);
            break;
        case 'criptograma':
            criarCriptograma(areaJogo, palavras);
            break;
    }
}

function recomecarJogo() {
    document.getElementById('configuracao').style.display = 'block';
    document.getElementById('jogo').style.display = 'none';
}

//Função para gerar letras aleatórias
function gerarLetraAleatoria() {
    const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return alfabeto[Math.floor(Math.random() * alfabeto.length)];
}
//PALAVRAS CRUZADAS
function criarPalavrasCruzadas(areaJogo, palavras) {
    const tamanhoGrid = 15;
    const grid = Array(tamanhoGrid).fill(null).map(() => Array(tamanhoGrid).fill(''));

    function exibirGrid(grid) {
        let html = '<table>';
        for (let i = 0; i < grid.length; i++) {
            html += '<tr>';
            for (let j = 0; j < grid[i].length; j++) {
                html += `<td>${grid[i][j] || ''}</td>`;
            }
            html += '</tr>';
        }
        html += '</table>';
        return html;
    }
      areaJogo.innerHTML = exibirGrid(grid);
}
//ANAGRAMAS
function criarAnagramas(areaJogo, palavras) {
      function embaralharPalavra(palavra) {
            const array = palavra.split('');
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array.join('');
        }
         let html = '<ul>';
        palavras.forEach(palavra => {
            const anagrama = embaralharPalavra(palavra);
            html += `<li>Descubra a palavra: ${anagrama}</li>`;
        });
        html += '</ul>';
        areaJogo.innerHTML = html;
}
//JOGO DA FORCA
function criarForca(areaJogo, palavras) {
    let palavraSecreta = palavras[Math.floor(Math.random() * palavras.length)];
         let letrasDescobertas = Array(palavraSecreta.length).fill('_');
         let tentativasRestantes = 6;
         let letrasUsadas = [];

         function atualizarJogo() {
             let html = `<p>Palavra: ${letrasDescobertas.join(' ')}</p>`;
             html += `<p>Tentativas Restantes: ${tentativasRestantes}</p>`;
             html += `<p>Letras Usadas: ${letrasUsadas.join(', ')}</p>`;
             html += '<input type="text" id="letra" maxlength="1">';
              html += '<button onclick="adivinharLetra()">Adivinhar</button>';
              areaJogo.innerHTML = html;
         }
        atualizarJogo()
// Função para adivinhar a letra
   window.adivinharLetra = function() {
       const letraInput = document.getElementById('letra');
       const letra = letraInput.value.toUpperCase();

       if (!letra || letrasUsadas.includes(letra)) {
           alert("Por favor, insira uma letra válida que ainda não foi usada.");
           return;
       }

       letrasUsadas.push(letra);

       if (palavraSecreta.includes(letra)) {
           for (let i = 0; i < palavraSecreta.length; i++) {
               if (palavraSecreta[i] === letra) {
                   letrasDescobertas[i] = letra;
               }
           }
       } else {
           tentativasRestantes--;
       }

       if (!letrasDescobertas.includes('_')) {
           areaJogo.innerHTML = `<h2>Parabéns! Você adivinhou a palavra: ${palavraSecreta}</h2>`;
           return;
       }

       if (tentativasRestantes === 0) {
           areaJogo.innerHTML = `<h2>Você perdeu! A palavra era: ${palavraSecreta}</h2>`;
           return;
       }

       atualizarJogo();
        letraInput.value = '';
   }
}

//CAÇA PALAVRAS
function criarCacaPalavras(areaJogo, palavras) {
    const tamanhoGrid = 15;
    const grid = Array(tamanhoGrid).fill(null).map(() => Array(tamanhoGrid).fill(''));

    // Preencher o grid com letras aleatórias
    for (let i = 0; i < tamanhoGrid; i++) {
        for (let j = 0; j < tamanhoGrid; j++) {
            grid[i][j] = gerarLetraAleatoria();
        }
    }

    // Função para inserir palavras no grid
    function inserirPalavra(grid, palavra) {
    const direcoes = [[0, 1], [1, 0], [1, 1], [-1, 1]]; // Horizontal, Vertical, Diagonal
    let direcaoEscolhida = direcoes[Math.floor(Math.random() * direcoes.length)];//Direção aleatória
    let palavraInserida = false //Verifica se já foi inserida

    for (let tentativas = 0; tentativas < 100; tentativas++) {
        let linha = Math.floor(Math.random() * tamanhoGrid);
        let colunaInicia = Math.floor(Math.random() * tamanhoGrid);
        let linhaFinal = linha + direcaoEscolhida[0] * (palavra.length - 1);
        let colunaFinal = colunaInicia + direcaoEscolhida[1] * (palavra.length - 1);

//Confirmações
       if (linhaFinal < 0 || linhaFinal >= tamanhoGrid || colunaFinal < 0 || colunaFinal >= tamanhoGrid) {
            continue;  // Tenta novamente se sair do grid
        }
//Confirmações de segurança
        let podeInserir = true;
        for (let i = 0; i < palavra.length; i++) {
            let linhaAtual = linha + dire

            let colunaAtual = colunaInicia + direcaoEscolhida[1] * i;
            if (grid[linhaAtual][colunaAtual] !== '' && grid[linhaAtual][colunaAtual] !== palavra[i]) {
                podeInserir = false;
                break;
            }
        }
    //Inserir
        if (podeInserir) {
            for (let i = 0; i < palavra.length; i++) {
                let linhaAtual = linha + direcaoEscolhida[0] * i;
                let colunaAtual = colunaInicia + direcaoEscolhida[1] * i;
                grid[linhaAtual][colunaAtual] = palavra[i];
            }
            palavraInserida = true;
            break;
        }
    }
    return palavraInserida
}

    //Insere as palavras uma a uma.
   palavras.forEach(palavra =>{
    inserirPalavra(grid, palavra)
   })

    // Exibe o grid no HTML
       function exibirGrid(grid) {
           let html = '<table>';
           for (let i = 0; i < grid.length; i++) {
               html += '<tr>';
               for (let j = 0; j < grid[i].length; j++) {
         html += `<td>${grid[i][j] || gerarLetraAleatoria()}</td>`; // Preenche vazios com letras aleatórias
               }
               html += '</tr>';
           }
           html += '</table>';
           return html;
       }

      areaJogo.innerHTML = exibirGrid(grid);
  }

//CRIPTOGRAMA
 function cripotografarMensagem(mensagem) {
          const alfabeto = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';//Caso queira adicionar letras, adicione aqui.
          const chave = Array.from({ length: alfabeto.length }, (_, i) => i)
              .sort(() => Math.random() - 0.5); // Embaralha os indices do alfabeto

          const criptoMap = {};// Aqui será salvo as alterações da criptografia

          for (let i = 0; i < alfabeto.length; i++) {
              criptoMap[alfabeto[i]] = alfabeto[chave[i]];//Salva as letras criptografadas.
         }

          let resultado = '';
         for (const letra of mensagem.toUpperCase()) {
              resultado += criptoMap[letra] || letra; // Mantém caracteres não alfabéticos
         }
          return resultado;
      }
 function criarCriptograma(areaJogo, palavras) {
          if (palavras.length === 0){
              areaJogo.innerHTML ="<h2>Você precisa adicionar alguma palavra antes</h2>"
              return;
          }
          const  palavraSecreta = palavras[Math.floor(Math.random() * palavras.length)];

     console.log(`A palavra secreta ${palavraSecreta}`)

          const mensagemCriptografada = cripotografarMensagem(palavraSecreta);
          console.log(`A palavra criptografada ${mensagemCriptografada}`)
          areaJogo.innerHTML = `<h2>Descubra a palavra: "${mensagemCriptografada}"</h2>`;
  }

  const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
})