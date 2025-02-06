function gerarQRCode() {
    const texto = document.getElementById('texto').value;

    if (!texto) {
        alert("Por favor, insira um texto ou URL.");
        return;
    }

    const qrcodeContainer = document.getElementById('qrcode-container');
    qrcodeContainer.innerHTML = ""; // Limpa qualquer QRCode anterior

    const qrcode = new QRCode(qrcodeContainer, {
        text: texto,
        width: 256,
        height: 256,
        colorDark : "#000",
        colorLight : "#fff",
        correctLevel : QRCode.CorrectLevel.H
    });

    document.getElementById('qrcode').style.display = 'block';
}

function baixarQRCode() {
    const qrcodeContainer = document.getElementById('qrcode-container');
    const qrcodeCanvas = qrcodeContainer.querySelector('canvas');
  
    if (!qrcodeCanvas) {
      alert("QRCode ainda não foi gerado.");
      return;
    }
  
    const imageUrl = qrcodeCanvas.toDataURL("image/png");
    const downloadLink = document.createElement('a');
  
    downloadLink.href = imageUrl;
    downloadLink.download = "qrcode.png"; // Nome do arquivo a ser baixado
  
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
  
  function gerarQRCode() {
      const texto = document.getElementById('texto').value;
  
      if (!texto) {
          alert("Por favor, insira um texto ou URL.");
          return;
      }
  
      const qrcodeContainer = document.getElementById('qrcode-container');
      qrcodeContainer.innerHTML = ""; // Limpa qualquer QRCode anterior
  
      const qrcode = new QRCode(qrcodeContainer, {
          text: texto,
          width: 256,
          height: 256,
          colorDark : "#000",
          colorLight : "#fff",
          correctLevel : QRCode.CorrectLevel.H
      });
      // Após gerar o QRCode mostra o botão de baixar
      document.getElementById('qrcode').style.display = 'block';
      document.getElementById('baixar-qrcode').style.display = 'inline-block';
  
  }

  const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
})