// verificador-cep.js

function buscarCEP() {
    const cep = document.getElementById("cep").value.replace(/\D/g, ''); // Remove caracteres não numéricos

    //Validação do CEP
    if (cep.length !== 8) {
        alert("CEP inválido.  Digite um CEP com 8 dígitos (sem hífen).");
        return;
    }

    //Limpa resultados anteriores.
    limparResultados();

    // Consulta a API ViaCEP
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`); // Trata erros de rede e HTTP
            }
            return response.json();
        })
        .then(data => {
            if (data.erro) {
                // CEP não encontrado (mas a requisição foi válida)
                alert("CEP não encontrado.");
                return;
            }
            // Preenche os campos com os dados da API
            document.getElementById("resultado-cep").textContent = data.cep;
            document.getElementById("resultado-logradouro").textContent = data.logradouro;
            document.getElementById("resultado-complemento").textContent = data.complemento;
            document.getElementById("resultado-bairro").textContent = data.bairro;
            document.getElementById("resultado-localidade").textContent = `${data.localidade} / ${data.uf}`;
            document.getElementById("resultado-ibge").textContent = data.ibge;
            document.getElementById("resultado-ddd").textContent = data.ddd;
             // Obtém latitude e longitude usando outra API
            obterLatLong(data.logradouro, data.localidade, data.uf);

        })
        .catch(error => {
            console.error("Erro ao buscar CEP:", error);
            alert("Ocorreu um erro ao buscar o CEP.  Verifique sua conexão com a internet ou tente novamente mais tarde.");
        });

    //Função para obter latitude e longitude e mostrar mapa
    function obterLatLong(logradouro, localidade, uf) {
        const enderecoCompleto = `${logradouro}, ${localidade}, ${uf}`;
        //Você pode usar outra API como  OpenCage Geocoding API, LocationIQ, etc
        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(enderecoCompleto)}`)
            .then(response => response.json())
            .then(data => {
                if (data && data.length > 0) {
                    const lat = parseFloat(data[0].lat);
                    const lon = parseFloat(data[0].lon);
                    mostrarMapa(lat, lon);
                } else {
                    document.getElementById('mapa').innerText = 'Localização não encontrada.';
                }
            })
            .catch(error => {
                console.error("Erro ao obter latitude/longitude:", error);
                 document.getElementById('mapa').innerText = 'Erro ao carregar mapa.';
            });
    }

    //Função para mostrar mapa
   function mostrarMapa(lat, lon) {
    const mapaDiv = document.getElementById('mapa');
    mapaDiv.style.height = '300px';  // Define uma altura para o mapa

    // Destruir mapa existente, se houver
      if (window.mapaLeaflet) {
        window.mapaLeaflet.remove(); // Remove o mapa anterior
      }

    const mapa = L.map('mapa').setView([lat, lon], 15); // Cria o mapa
      window.mapaLeaflet = mapa; // Armazena a referência globalmente

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {  // Adiciona camada base
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);

    L.marker([lat, lon]).addTo(mapa)  // Adiciona um marcador
        .bindPopup('Localização aproximada') // Popup do marcador
        .openPopup();
   }
}

function limparResultados(){
     //Limpa os campos com os dados da API
    document.getElementById("resultado-cep").textContent = '';
    document.getElementById("resultado-logradouro").textContent = '';
    document.getElementById("resultado-complemento").textContent = '';
    document.getElementById("resultado-bairro").textContent = '';
    document.getElementById("resultado-localidade").textContent = '';
    document.getElementById("resultado-ibge").textContent = '';
    document.getElementById("resultado-ddd").textContent = '';
     // Limpa/remove mapa anterior
     const mapaDiv = document.getElementById('mapa');
     mapaDiv.style.height = '0';  // Remove a altura para esconder
      if (window.mapaLeaflet) {
        window.mapaLeaflet.remove();
         window.mapaLeaflet = null; // Limpa a referência
    }

}

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
})