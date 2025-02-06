// dicionario.js

function buscarSignificado() {
    const termo = document.getElementById('termo').value;
    const significadoDiv = document.getElementById('significado');
    significadoDiv.innerHTML = '<p>Buscando significado...</p>';

    //Chama a API
    fetch(`https://od-api-sandbox.oxforddictionaries.com/api/v2/significado/${encodeURIComponent(termo)}`)//encodeU.. para evitar erro
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }
            return response.json();
        })
         .then(data => {
            if (data && data.length > 0) {
                significadoDiv.innerHTML = ''; //Limpar

                data.forEach(item => {
                    const classe = item.classe || 'Sem classe gramatical';
                    const significados = item.significados || [];

                    const classeElement = document.createElement('h3');
                    classeElement.textContent = classe;
                    significadoDiv.appendChild(classeElement);

                    const listaSignificados = document.createElement('ul');
                    significados.forEach(significado => {
                        const listItem = document.createElement('li');
                        listItem.textContent = significado;
                        listaSignificados.appendChild(listItem);
                    });
                    significadoDiv.appendChild(listaSignificados);
                });

             } else {
                significadoDiv.innerHTML = '<p>Nenhum significado encontrado para este termo.</p>';
            }
        })
        .catch(error => {
            console.error('Erro ao buscar significado:', error);
            significadoDiv.innerHTML = `<p>Ocorreu um erro ao buscar o significado. Verifique sua conexão com a internet e tente novamente.</p>`;
        });
}

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
})
