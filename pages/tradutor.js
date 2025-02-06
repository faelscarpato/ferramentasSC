// tradutor.js

//Lista de idiomas -  completa e já ordenada alfabeticamente
const idiomas = {
    "auto": "Detectar Idioma",
	"af": "Africâner",
	"sq": "Albanês",
	"de": "Alemão",
	"am": "Amárico",
	"ar": "Árabe",
	"hy": "Armênio",
	"as": "Assamês",
	"ay": "Aimará",
	"az": "Azerbaijano",
	"bm": "Bambara",
	"eu": "Basco",
	"bn": "Bengali",
	"bho": "Bhojpuri",
	"be": "Bielo-russo",
	"my": "Birmanês",
	"bs": "Bósnio",
	"bg": "Búlgaro",
	"kn": "Canarim",
	"ca": "Catalão",
	"ceb": "Cebuano",
	"ny": "Chichewa",
	"zh-CN": "Chinês (Simplificado)",
	"zh-TW": "Chinês (Tradicional)",
	"si": "Cingalês",
	"ko": "Coreano",
	"co": "Corso",
	"ht": "Crioulo haitiano",
	"hr": "Croata",
	"ku": "Curdo (Kurmanji)",
	"ckb": "Curdo (Sorani)",
	"da": "Dinamarquês",
	"dv": "Divehi",
	"doi": "Dogri",
	"sk": "Eslovaco",
	"sl": "Esloveno",
	"es": "Espanhol",
	"eo": "Esperanto",
	"et": "Estoniano",
	"ee": "Ewe",
	"tl": "Filipino",
	"fi": "Finlandês",
	"fr": "Francês",
	"fy": "Frísio",
	"gd": "Gaélico escocês",
	"gl": "Galego",
	"cy": "Galês",
	"ka": "Georgiano",
	"el": "Grego",
	"gn": "Guarani",
	"gu": "Gujarati",
	"ha": "Hauçá",
	"haw": "Havaiano",
	"iw": "Hebraico",
	"hi": "Hindi",
	"hmn": "Hmong",
	"nl": "Holandês",
	"hu": "Húngaro",
	"ig": "Igbo",
	"ilo": "Ilocano",
	"id": "Indonésio",
	"en": "Inglês",
	"yo": "Iorubá",
	"ga": "Irlandês",
	"is": "Islandês",
	"it": "Italiano",
	"ja": "Japonês",
	"jw": "Javanês",
	"km": "Khmer",
	"rw": "Kinyarwanda",
	"ky": " কিরগিজ",
	"kri": "Krio",
	"lo": "Laosiano",
	"la": "Latim",
	"lv": "Letão",
	"ln": "Lingala",
	"lt": "Lituano",
	"lb": "Luxemburguês",
	"mk": "Macedônio",
	"mai": "Maithili",
	"ml": "Malaiala",
	"ms": "Malaio",
	"mg": "Malgaxe",
	"mt": "Maltês",
	"mi": "Maori",
	"mr": "Marata",
	"mni-Mtei": "Meiteilon (Manipuri)",
	"lus": "Mizo",
	"mn": "Mongol",
	"ne": "Nepalês",
	"no": "Norueguês",
	"or": "Odia (Oriya)",
	"om": "Oromo",
	"ps": "Pachto",
	"fa": "Persa",
	"pl": "Polonês",
	"pt": "Português",
	"pa": "Punjabi",
	"qu": "Quíchua",
	"ro": "Romeno",
	"ru": "Russo",
	"sm": "Samoano",
	"sa": "Sânscrito",
	"sr": "Sérvio",
	"sn": "Shona",
	"sd": "Sindi",
	"so": "Somali",
	"sw": "Suaíli",
	"sv": "Sueco",
	"su": "Sundanês",
	"tg": "Tadjique",
	"th": "Tailandês",
	"ta": "Tâmil",
	"tt": "Tártaro",
	"cs": "Tcheco",
	"te": "Telugu",
	"ti": "Tigrinya",
	"ts": "Tsonga",
	"tr": "Turco",
	"tk": "Turcomano",
	"ak": "Twi",
	"uk": "Ucraniano",
	"ug": "Uigur",
	"ur": "Urdu",
	"uz": "Uzbeque",
	"vi": "Vietnamita",
	"xh": "Xhosa",
	"yi": "Yiddish",
	"zu": "Zulu"
};


// Função para carregar os idiomas nos selects
function carregarIdiomas() {
    const selectOrigem = document.getElementById("idioma-origem");
    const selectDestino = document.getElementById("idioma-destino");

    for (const codigo in idiomas) {
        const optionOrigem = document.createElement("option");
        optionOrigem.value = codigo;
        optionOrigem.textContent = idiomas[codigo];
        selectOrigem.appendChild(optionOrigem);

        const optionDestino = document.createElement("option");
        optionDestino.value = codigo;
        optionDestino.textContent = idiomas[codigo];
        selectDestino.appendChild(optionDestino);

    }

    // Definir valores padrão (opcional)
    selectOrigem.value = "auto"; // Detectar idioma
    selectDestino.value = "pt";   // Português
}

// Função para traduzir o texto
async function traduzirTexto() {  // async para usar await
    const idiomaOrigem = document.getElementById("idioma-origem").value;
    const idiomaDestino = document.getElementById("idioma-destino").value;
    const textoOriginal = document.getElementById("texto-original").value;

		//Validações
    if (!textoOriginal.trim()) {
        alert("Por favor, digite o texto que você deseja traduzir.");
        return; // Sai da função se o campo estiver vazio
    }

    // URL da API do Google Translate (não oficial, mas funciona para testes e aprendizado)
    // Em um ambiente de produção, você precisaria usar a API oficial do Google Cloud Translation, que é paga.
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${idiomaOrigem}&tl=${idiomaDestino}&dt=t&q=${encodeURIComponent(textoOriginal)}`;

    // Faz a requisição à API (usando fetch e await para simplificar)
	try {
		const response = await fetch(url); // Espera a resposta
		const data = await response.json();  // Espera a conversão para JSON

		if (data && data[0] && data[0].length > 0) {
			// Extrai o texto traduzido da resposta da API
			let traducao = "";
			for (let i = 0; i < data[0].length; i++) {
				traducao += data[0][i][0];
			}
			document.getElementById("texto-traduzido").value = traducao;
		} else {
			// Trata resposta inesperada
			document.getElementById("texto-traduzido").value = "Erro na tradução.";
		}
		
    } catch(error){ //Captura de ERRO
        console.error("Erro ao traduzir:", error);
        document.getElementById("texto-traduzido").value = "Erro na tradução. Verifique sua conexão ou tente novamente.";
    }
}

function limparCampos(){
    document.getElementById("texto-original").value = '';
    document.getElementById("texto-traduzido").value = '';
}
// Carrega os idiomas quando a página é carregada
document.addEventListener("DOMContentLoaded", carregarIdiomas);


const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
})