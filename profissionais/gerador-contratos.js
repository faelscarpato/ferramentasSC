// gerador-contratos.js
const tipoContratoSelect = document.getElementById('tipo');
const camposPersonalizadosDiv = document.getElementById('campos-personalizados');
const contratoTextarea = document.getElementById('contrato');

//Variáveis com os templates
const templateCompraEVenda = `CONTRATO DE COMPRA E VENDA DE IMÓVEL

IDENTIFICAÇÃO DAS PARTES

VENDEDOR(A): [vendedorNome], CPF nº [vendedorCPF], residente e domiciliado(a) em [imovelEndereco].

COMPRADOR(A): [compradorNome], CPF nº [compradorCPF], residente e domiciliado(a) em [imovelEndereco].

O presente contrato tem como objetivo a compra e venda do imóvel situado em [imovelEndereco], pelo valor total de [valorImovel], que será pago da seguinte forma: [formaPagamento].

As partes estabelecem que o imóvel será entregue ao COMPRADOR(A) livre e desimpedido de quaisquer ônus e dívidas até a data da assinatura deste contrato.

Fica eleito o foro da comarca de [foro] para dirimir quaisquer dúvidas ou litígios decorrentes deste contrato.

E, por estarem assim justos e contratados, as partes assinam o presente contrato em duas vias de igual teor, juntamente com duas testemunhas.

[data]

____________________________
Vendedor(a)

____________________________
Comprador(a)`;

const templateArrendamento = `CONTRATO DE ARRENDAMENTO

IDENTIFICAÇÃO DAS PARTES

ARRENDADOR(A): [arrendadorNome], CPF nº [arrendadorCPF], residente e domiciliado(a) em [imovelEndereco].

ARRENDATÁRIO(A): [arrendatarioNome], CPF nº [arrendatarioCPF], residente e domiciliado(a) em [imovelEndereco].

OBJETO: O presente contrato tem como objeto o arrendamento do imóvel situado em [imovelEndereco], para fins de [finalidadeArrendamento].

PRAZO: O prazo de arrendamento é de [prazoArrendamento], com início em [dataInicio] e término em [dataTermino].

VALOR DO ARRENDAMENTO: O valor mensal do arrendamento é de [valorArrendamento], a ser pago até o dia [diaPagamento] de cada mês.

Fica eleito o foro da comarca de [foro] para dirimir quaisquer dúvidas ou litígios decorrentes deste contrato.

E, por estarem assim justos e contratados, as partes assinam o presente contrato em duas vias de igual teor, juntamente com duas testemunhas.

[data]

____________________________
Arrendador(a)

____________________________
Arrendatário(a)`;

const templateServicos = `CONTRATO DE PRESTAÇÃO DE SERVIÇOS

IDENTIFICAÇÃO DAS PARTES

CONTRATANTE: [contratanteNome], CPF nº [contratanteCPF], residente e domiciliado(a) em [contratanteEndereco].

CONTRATADO(A): [contratadoNome], CPF nº [contratadoCPF], residente e domiciliado(a) em [contratadoEndereco].

OBJETO: O presente contrato tem como objeto a prestação de serviços de [servicoDescricao], conforme detalhado no anexo A deste contrato.

VALOR: O valor total dos serviços é de [valorServico], a ser pago da seguinte forma: [formaPagamento].

PRAZO: O prazo para a prestação dos serviços é de [prazoServicos], com início em [dataInicio] e término em [dataTermino].

Fica eleito o foro da comarca de [foro] para dirimir quaisquer dúvidas ou litígios decorrentes deste contrato.

E, por estarem assim justos e contratados, as partes assinam o presente contrato em duas vias de igual teor, juntamente com duas testemunhas.

[data]

____________________________
Contratante

____________________________
Contratado(a)`;

//Variáveis com o tipo de input
const camposCompraEVenda = [
{ nome: "vendedorNome", label: "Nome do Vendedor",  tipo:"text"  },
{ nome: "vendedorCPF", label: "CPF Vendedor",  tipo:"number" },
{ nome: "compradorNome", label: "Nome do Comprador", tipo:"text" },
{ nome: "compradorCPF", label: "CPF Comprador", tipo:"number" },
{ nome: "imovelEndereco", label: "Endereço do Imóvel", tipo:"text" },
{ nome: "valorImovel", label: "Valor do Imóvel (R$)",tipo:"number" },
{ nome: "formaPagamento", label: "Forma de Pagamento", tipo:"text" },
{ nome: "data", label: "Data da Assinatura", tipo:"date" },
{ nome: "foro", label: "Foro", tipo:"text" }
];

const camposArrendamento = [
{ nome: "arrendadorNome", label: "Nome do Arrendador",  tipo:"text"  },
{ nome: "arrendadorCPF", label: "CPF Arrendador",  tipo:"number" },
{ nome: "arrendatarioNome", label: "Nome do Arrendatário", tipo:"text" },
{ nome: "arrendatarioCPF", label: "CPF Arrendatário", tipo:"number" },
{ nome: "imovelEndereco", label: "Endereço do Imóvel", tipo:"text" },
{ nome: "finalidadeArrendamento", label: "Finalidade do Arrendamento",  tipo:"text"  },
{ nome: "prazoArrendamento", label: "Prazo do Arrendamento",  tipo:"text" },
{ nome: "valorArrendamento", label: "Valor do Arrendamento (R$)",tipo:"number" },
{ nome: "dataInicio", label: "Data de Inicio", tipo:"date" },
{ nome: "dataTermino", label: "Data de Término", tipo:"date" },
{ nome: "diaPagamento", label: "Dia de Pagamento", tipo:"number" },
{ nome: "foro", label: "Foro", tipo:"text" }
];

const camposServicos = [
{ nome: "contratanteNome", label: "Nome do Contratante",  tipo:"text"  },
{ nome: "contratanteCPF", label: "CPF Contratante",  tipo:"number" },
{ nome: "contratanteEndereco", label: "Endereço Contratante", tipo:"text" },
{ nome: "contratadoNome", label: "Nome do Contratado",  tipo:"text" },
{ nome: "contratadoCPF", label: "CPF Contratado",  tipo:"number" },
{ nome: "contratadoEndereco", label: "Endereço Contratado", tipo:"text" },
{ nome: "servicoDescricao", label: "Descrição do Serviço", tipo:"text" },
{ nome: "valorServico", label: "Valor do Serviço (R$)",tipo:"number" },
{ nome: "formaPagamento", label: "Forma de Pagamento", tipo:"text" },
{ nome: "prazoServicos", label: "Prazo dos Serviços",  tipo:"text" },
{ nome: "dataInicio", label: "Data de Inicio", tipo:"date" },
{ nome: "dataTermino", label: "Data de Término", tipo:"date" },
{ nome: "foro", label: "Foro", tipo:"text" }
];

// Objeto principal com os templates de contrato
const tiposContrato = {
    "compra-venda": {
        titulo: "Contrato de Compra e Venda de Imóvel",
        campos:camposCompraEVenda,
        template:templateCompraEVenda
    },
     "arrendamento": {
        titulo: "Contrato de Arrendamento",
        campos: camposArrendamento,
        template: templateArrendamento
    },
    "prestacao-servicos": {
        titulo: "Contrato de Prestação de Serviços",
        campos: camposServicos,
        template:templateServicos
    }
    //Adicione mais tipo de contrato aqui
};

//Funcao para criar form
function criarCamposPersonalizados(tipoContrato) {
    camposPersonalizadosDiv.innerHTML = ''; //Limpa

    const campos = tiposContrato[tipoContrato].campos;

    campos.forEach(campo => {
        const label = document.createElement('label');
        label.textContent = campo.label + ':';
        label.setAttribute('for', campo.nome); //Adiciona for

        let input;
        if(campo.tipo === 'text') {
            input = document.createElement('input');
             input.type = 'text';
        } else if (campo.tipo === 'number') {
            input = document.createElement('input');
             input.type = 'number';
        }  else if (campo.tipo === 'date') {
            input = document.createElement('input');
             input.type = 'date';
        }
        input.id = campo.nome;
        input.name = campo.nome;
        camposPersonalizadosDiv.appendChild(label);
        camposPersonalizadosDiv.appendChild(input);
    });
    camposPersonalizadosDiv.appendChild(inputTituloContrato)//Adiciona sempre
}

//Funcao para gerar os contratos
function gerarContrato() {
    const tipoContrato = tipoContratoSelect.value;
    const contratoData = tiposContrato[tipoContrato];

    let contratoGerado = contratoData.template;

    contratoData.campos.forEach(campo => {
        const valorCampo = document.getElementById(campo.nome).value;
        contratoGerado = contratoGerado.replace(`[${campo.nome}]`, valorCampo);
    });
     editor.root.innerHTML = contratoGerado
}

//Evento do select
tipoContratoSelect.addEventListener('change', function() {
    const selectedValue = tipoContratoSelect.value;
    criarCamposPersonalizados(selectedValue);
});

//Quill
const editor = new Quill('#editor', {
    theme: 'snow'
});
const inputTituloContrato = document.createElement("input");
inputTituloContrato.placeholder = "Defina um título para salvar o contrato";

//camposPersonalizadosDiv.appendChild(inputTituloContrato);

function salvarContrato() {
    const titulo = inputTituloContrato.value;
    const conteudo = editor.root.innerHTML;

    if (!titulo.trim()) {
         alert('Por favor, insira um título para o contrato.');
        return;
    }
     if (!conteudo.trim()) {
         alert('Por favor, insira um conteudo para o contrato.');
        return;
    }
    //Precisa de titulo e conteudo

    let contratos = JSON.parse(localStorage.getItem('contratos')) || [];
    contratos.push({ titulo: titulo, conteudo: conteudo });
    localStorage.setItem('contratos', JSON.stringify(contratos));
    alert('Contrato salvo com sucesso!');//Feedback

}
//Evento inicial para selecionar form
criarCamposPersonalizados(tipoContratoSelect.value);


const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
})