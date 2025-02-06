// encurtador-links.js

async function encurtarURL() {
    const urlOriginal = document.getElementById('url-original').value;
  
    if (!urlOriginal) {
      alert("Por favor, insira uma URL válida.");
      return;
    }
  
    const accessToken = '206957a93a850b25e1da07d55681fd2d8874b98b';
    const groupGuid = 'Ba1bc23dE4'; // Substitua pelo seu Group GUID da Bitly
  
    const apiUrl = 'https://api-ssl.bitly.com/v4/shorten';
  
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          long_url: urlOriginal,
          group_guid: groupGuid, // Inclui o Group GUID
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Erro na requisição: ${response.status} - ${response.statusText} - ${JSON.stringify(errorData)}`);
      }
  
      const data = await response.json();
      const urlEncurtada = data.link;
  
      document.getElementById('link-encurtado').href = urlEncurtada;
      document.getElementById('link-encurtado').textContent = urlEncurtada;
      document.getElementById('link-encurtado').title = "Clique para acessar a URL encurtada";
      document.getElementById('resultado').style.display = 'block';
  
    } catch (error) {
      console.error("Erro ao encurtar URL:", error);
      alert("Ocorreu um erro ao encurtar a URL. Por favor, tente novamente mais tarde.\nDetalhes: " + error.message);
    }
  }
  
  function copiarURL() {
      const urlEncurtada = document.getElementById('link-encurtado').textContent;
  
      navigator.clipboard.writeText(urlEncurtada)
          .then(() => {
              alert("URL copiada para a área de transferência!");
          })
          .catch(err => {
              console.error("Erro ao copiar URL:", err);
              alert("Erro ao copiar URL. Por favor, copie manualmente.");
          });
  }
  

  const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
})