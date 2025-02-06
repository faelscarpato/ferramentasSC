// velocidade-conexao.js
let downloadStartTime, uploadStartTime;
let downloadSize = 5 * 1024 * 1024; // 5MB
let uploadSize = 1 * 1024 * 1024; // 1MB

const statusElement = document.getElementById('status');
const downloadSpeedElement = document.getElementById('download-speed');
const uploadSpeedElement = document.getElementById('upload-speed');
const startTestButton = document.getElementById('start-test');
const restartTestButton = document.getElementById('restart-test');
const testeSection = document.getElementById('teste');
const resultadosSection = document.getElementById('resultados');

function showStatus(message) {
    statusElement.innerHTML = `<p>${message}</p>`;
}

async function testDownloadSpeed() {
    showStatus('Iniciando teste de download...');
    downloadStartTime = new Date().getTime();
    try {
        const response = await fetch(`random5MB.jpg?cache=${Math.random()}`, {
            method: 'GET',
        });
 if (!response.ok) {
            throw new Error(`Erro ao baixar o arquivo: ${response.status} - ${response.statusText}`);
        }
 // Leitura do stream e medição do progresso
        const reader = response.body.getReader();
        let receivedLength = 0;
        const chunks = [];

   while (true) {
            const { done, value } = await reader.read();

            if (done) {
                break;
            }

            chunks.push(value);
            receivedLength += value.length;

           // Cálculo da velocidade instantânea
            const currentTime = new Date().getTime();
            const duration = (currentTime - downloadStartTime) / 1000;
            const bitsLoaded = receivedLength * 8; // bits
            const speedMbps = (bitsLoaded / duration) / (1024 * 1024); // mbps
           downloadSpeedElement.textContent = `${speedMbps.toFixed(2)} Mbps`; console.log(`progresso ${speedMbps.toFixed(2)}`)
        }
      const blob = new Blob(chunks);
        const downloadEndTime = new Date().getTime();
        const duration = (downloadEndTime - downloadStartTime) / 1000;
        const bitsLoaded = blob.size * 8;
        const speedMbps = (bitsLoaded / duration) / (1024 * 1024);

        downloadSpeedElement.textContent = speedMbps.toFixed(2);
        showStatus('Teste de download concluído.');

    } catch (error) {
        console.error("Erro ao verificar download:", error);
        showStatus("Ocorreu um erro ao verificar a velocidade do download. Por favor, tente novamente mais tarde.");
    }
}
async function testUploadSpeed() {
showStatus('Iniciando teste de upload...');
uploadStartTime = new Date().getTime();

  const blob = new Blob([new ArrayBuffer(uploadSize)]);

  try {
 const response = await fetch('upload.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/octet-stream',
            },
            body: blob,
        });
    if (!response.ok) {
            throw new Error(`Erro ao fazer upload do arquivo: ${response.status} - ${response.statusText}`);
        }

        const uploadEndTime = new Date().getTime();
        const duration = (uploadEndTime - uploadStartTime) / 1000;
        const bitsLoaded = blob.size * 8;
        const speedMbps = (bitsLoaded / duration) / (1024 * 1024);

            uploadSpeedElement.textContent = speedMbps.toFixed(2);
            showStatus('Teste de upload concluído.');
   } catch (error) {
    console.error("Erro ao verificar upload:", error)
        showStatus("Ocorreu um erro ao verificar a velocidade do upload. Por favor, tente novamente mais tarde.");
    }
}
async function startTest() {
    testeSection.style.display = 'none';
    resultadosSection.style.display = 'block';
    downloadSpeedElement.textContent = '';
    uploadSpeedElement.textContent = '';
    statusElement.textContent = '';
    await testDownloadSpeed();
    await testUploadSpeed();
}
function restartTest() {
    testeSection.style.display = 'block';
    resultadosSection.style.display = 'none';
    downloadSpeedElement.textContent = '';
    uploadSpeedElement.textContent = '';
    statusElement.textContent = '';
    showStatus('Pronto para iniciar um novo teste.');
}
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
})