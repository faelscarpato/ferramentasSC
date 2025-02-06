async function verificarIP() {
    const ipAddress = document.getElementById('ip-address').value;

    if (!ipAddress) {
        alert("Por favor, insira um endereço IP.");
        return;
    }

    try {
        const response = await fetch(`https://ipinfo.io/${ipAddress}/json`);

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();

        document.getElementById('ip').textContent = data.ip || "Não disponível";
        document.getElementById('location').textContent = data.city + ', ' + data.country || "Não disponível";
        document.getElementById('org').textContent = data.org || "Não disponível";
                document.getElementById('region').textContent = data.region || "Não disponível";

        document.getElementById('resultado').style.display = 'block';

    } catch (error) {
        console.error("Erro ao verificar IP:", error);
        alert("Ocorreu um erro ao verificar o IP. Por favor, tente novamente mais tarde.");
    }
}

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
})