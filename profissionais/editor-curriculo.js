// editor-curriculo.js

// Helper function to generate unique IDs
function gerarIdUnico() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Dynamic counters
let contadorExperiencia = 0;
let contadorEducacao = 0;
let contadorHabilidades = 0;

// Function to show selected section
function mostrarSecao(secaoId) {
    // Hide all sections
    document.querySelectorAll('.main-content > section').forEach(section => {
        section.style.display = 'none';
    });

    // Remove 'active' from all sidebar items
    document.querySelectorAll('.sidebar ul li').forEach(li => {
        li.classList.remove('active');
    });

    // Show selected section and set 'active' class
    document.getElementById(secaoId).style.display = 'block';
    document.querySelector(`.sidebar ul li[data-section="${secaoId}"]`).classList.add('active');
}

// Dynamic experience section
function adicionarExperiencia() {
    contadorExperiencia++;
    const idUnico = gerarIdUnico();
    const divExperiencia = document.getElementById('experiencia-container');

    const novaExperiencia = `
        <div class="experiencia-item" id="experiencia-${idUnico}">
            <label for="empresa-${idUnico}">Empresa:</label>
            <input type="text" id="empresa-${idUnico}" name="empresa-${idUnico}" placeholder="Nome da empresa">

            <label for="cargo-${idUnico}">Cargo:</label>
            <input type="text" id="cargo-${idUnico}" name="cargo-${idUnico}" placeholder="Seu cargo">

            <label for="periodo-${idUnico}">Período:</label>
            <input type="text" id="periodo-${idUnico}" name="periodo-${idUnico}" placeholder="Período trabalhado">

            <label for="descricao-${idUnico}">Descrição:</label>
            <textarea id="descricao-${idUnico}" name="descricao-${idUnico}" placeholder="Descreva suas atividades e responsabilidades"></textarea>

            <button type="button" onclick="removerExperiencia('experiencia-${idUnico}')">Remover</button>
        </div>
    `;

    divExperiencia.innerHTML += novaExperiencia;
}

// Dynamic education section
function adicionarEducacao() {
    contadorEducacao++;
    const idUnico = gerarIdUnico();
    const educacaoContainer = document.getElementById('educacao-container');

    const novaEducacao = `
        <div class="educacao-item" id="educacao-${idUnico}">
            <label for="instituicao-${idUnico}">Instituição:</label>
            <input type="text" id="instituicao-${idUnico}" name="instituicao-${idUnico}" placeholder="Nome da instituição">

            <label for="curso-${idUnico}">Curso:</label>
            <input type="text" id="curso-${idUnico}" name="curso-${idUnico}" placeholder="Nome do curso">

            <label for="periodo-${idUnico}">Período:</label>
            <input type="text" id="periodo-${idUnico}" name="periodo-${idUnico}" placeholder="Período do curso">

            <button type="button" onclick="removerEducacao('educacao-${idUnico}')">Remover</button>
        </div>
    `;

    educacaoContainer.innerHTML += novaEducacao;
}

// Dynamic skills section
function adicionarHabilidade() {
    contadorHabilidades++;
    const idUnico = gerarIdUnico();
    const habilidadesContainer = document.getElementById('habilidades-container');

    const novaHabilidade = `
        <div class="habilidade-item" id="habilidade-${idUnico}">
            <label for="habilidade-${idUnico}">Habilidade:</label>
            <input type="text" id="habilidade-${idUnico}" name="habilidade-${idUnico}" placeholder="Digite a habilidade">
           <button type="button" onclick="removerHabilidade('habilidade-${idUnico}')">Remover</button>

        </div>
    `;

    habilidadesContainer.innerHTML += novaHabilidade;
}

// Generic function to remove an element
function removerItem(itemId) {
    const itemParaRemover = document.getElementById(itemId);
    if (itemParaRemover) {
        itemParaRemover.remove();
    }
}

// Specific remove functions
function removerExperiencia(id) {
    removerItem(id);
}
function removerEducacao(id) {
    removerItem(id);
}
function removerHabilidade(id) {
    removerItem(id);
}

// Generate HTML Resume
function gerarCurriculoHTML() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const linkedin = document.getElementById('linkedin').value;
    const github = document.getElementById('github').value;
    const portfolio = document.getElementById('portfolio').value;
    const resumoTexto = document.getElementById('resumo-texto').value;

    let experienciaHTML = '';
    document.querySelectorAll('.experiencia-item').forEach(item => {
        const id = item.id.replace('experiencia-', '');
        const empresa = document.getElementById(`empresa-${id}`).value;
        const cargo = document.getElementById(`cargo-${id}`).value;
        const periodo = document.getElementById(`periodo-${id}`).value;
        const descricao = document.getElementById(`descricao-${id}`).value;

        experienciaHTML += `
            <div class="experiencia">
                <h3>${cargo} - ${empresa}</h3>
                <p class="periodo">${periodo}</p>
                <p>${descricao}</p>
            </div>
        `;
    });

    let educacaoHTML = '';
    document.querySelectorAll('.educacao-item').forEach(item => {
        const id = item.id.replace('educacao-', '');
        const instituicao = document.getElementById(`instituicao-${id}`).value;
        const curso = document.getElementById(`curso-${id}`).value;
        const periodo = document.getElementById(`periodo-${id}`).value;

        educacaoHTML += `
            <div class="educacao">
                <h3>${curso} - ${instituicao}</h3>
                <p class="periodo">${periodo}</p>
            </div>
        `;
    });

    let habilidadesHTML = '';
    document.querySelectorAll('.habilidade-item').forEach(item => {
        const id = item.id.replace('habilidade-', '');
        const habilidade = document.getElementById(`habilidade-${id}`).value;
        habilidadesHTML += `<span class="habilidade">${habilidade}</span>`;
    });

    const curriculoHTML = `
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Currículo - ${nome}</title>
            <style>
                body { font-family: sans-serif; margin: 20px; }
                h1, h2, h3 { color: #333; }
                .experiencia, .educacao { margin-bottom: 15px; }
                .periodo { font-style: italic; color: #777; }
                .habilidade { display: inline-block; margin-right: 10px; padding: 5px; border: 1px solid #ccc; border-radius: 5px; }
            </style>
        </head>
        <body>
            <h1>${nome}</h1>
            <p>Email: ${email} | Telefone: ${telefone}</p>
            <p>LinkedIn: ${linkedin} | GitHub: ${github} | Portfolio: ${portfolio}</p>

            <h2>Resumo</h2>
            <p>${resumoTexto}</p>

            <h2>Experiência Profissional</h2>
            ${experienciaHTML}

            <h2>Formação Acadêmica</h2>
            ${educacaoHTML}

            <h2>Habilidades</h2>
            ${habilidadesHTML}
        </body>
        </html>
    `;

        // Preview
        const iframe = document.getElementById('preview');
    iframe.srcdoc = curriculoHTML;
}

function downloadCurriculoPDF() {
    const nome = document.getElementById('nome').value;
    const curriculoHTML = document.getElementById('preview').srcdoc;

    if (!curriculoHTML) {
        alert("Por favor, gere o currículo antes de fazer o download.");
        return;
    }
//configurações
        const opt = {
        margin:       10,
        filename:     `curriculo-${nome}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

    html2pdf().set(opt).from(curriculoHTML).save();
}

// Sidebar event listeners
document.querySelectorAll('.sidebar ul li').forEach(li => {
    li.addEventListener('click', function(e) {
        const secao = e.target.dataset.section;
        mostrarSecao(secao);
    });
});

// Initialize default section
mostrarSecao('pessoal');

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
})