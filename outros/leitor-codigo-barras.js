// leitor-codigo-barras.js

//Verifica se o quagga está instalado
if (typeof Quagga === 'undefined') {
    alert('Por favor, adicione a biblioteca QuaggaJS ao seu projeto.\n'
         + 'Você pode adicionar pelo link:\n'
         + '<script src="https://unpkg.com/quagga@0.12.1/dist/quagga.min.js"></script>\n'
         + 'Ou instalar via npm: npm install quagga');
}

const camera = document.getElementById('camera');
const iniciarCameraBtn = document.getElementById('iniciar-camera');
const codigoBarrasResultado = document.getElementById('codigo');
const resultadoSection = document.getElementById('resultado');

iniciarCameraBtn.addEventListener('click', function() {
    Quagga.init({
        inputStream: {
            name: "Live",
            type: "LiveStream",
            target: camera,    // Or '#yourElement' (optional)
            constraints: {
                width: 640,
                height: 480,
                facingMode: "environment" // or user
            }
        },
        decoder: {
            readers: ["ean_reader"]
        }
    }, function(err) {
        if (err) {
            console.log(err);
            alert("Não foi possível iniciar a câmera: " + err.message);
            return
         }
        console.log("Inicialização concluída. Iniciando...");
        Quagga.start();

        iniciarCameraBtn.style.display = 'none';
    });

    Quagga.onDetected(function(result) {
            console.log("Código de barras detectado e lido: [" + result.codeResult.code + "]", result);
        codigoBarrasResultado.textContent = result.codeResult.code;
        resultadoSection.style.display = 'block';
            Quagga.stop();
    });
});

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
})