// conversor-medidas.js

// Objeto que mapeia os tipos de medida para suas unidades e funções de conversão
const unidadesDeMedida = {
    comprimento: {
        unidades: ["km", "m", "cm", "mm", "mi", "yd", "ft", "in"],
        conversoes: {
            "km": { "m": 1000, "cm": 100000, "mm": 1000000, "mi": 0.621371, "yd": 1093.61, "ft": 3280.84, "in": 39370.1 },
            "m": { "km": 0.001, "cm": 100, "mm": 1000, "mi": 0.000621371, "yd": 1.09361, "ft": 3.28084, "in": 39.3701 },
            "cm": { "km": 0.00001, "m": 0.01, "mm": 10, "mi": 0.0000062137, "yd": 0.0109361, "ft": 0.0328084, "in": 0.393701 },
            "mm": { "km": 0.000001, "m": 0.001, "cm": 0.1, "mi": 0.00000062137, "yd": 0.00109361, "ft": 0.00328084, "in": 0.0393701 },
            "mi": { "km": 1.60934, "m": 1609.34, "cm": 160934, "mm": 1609340, "yd": 1760, "ft": 5280, "in": 63360 },
            "yd": { "km": 0.0009144, "m": 0.9144, "cm": 91.44, "mm": 914.4, "mi": 0.000568182, "ft": 3, "in": 36 },
            "ft": { "km": 0.0003048, "m": 0.3048, "cm": 30.48, "mm": 304.8, "mi": 0.000189394, "yd": 0.333333, "in": 12 },
            "in": { "km": 0.0000254, "m": 0.0254, "cm": 2.54, "mm": 25.4, "mi": 0.000015783, "yd": 0.0277778, "ft": 0.0833333 }
        }
    },
    peso: {
        unidades: ["kg", "g", "mg", "lb", "oz"],
        conversoes: {
            "kg": { "g": 1000, "mg": 1000000, "lb": 2.20462, "oz": 35.274 },
            "g": { "kg": 0.001, "mg": 1000, "lb": 0.00220462, "oz": 0.035274 },
            "mg": { "kg": 0.000001, "g": 0.001, "lb": 0.0000022046, "oz": 0.000035274 },
            "lb": { "kg": 0.453592, "g": 453.592, "mg": 453592, "oz": 16 },
            "oz": { "kg": 0.0283495, "g": 28.3495, "mg": 28349.5, "lb": 0.0625 }
        }
    },
    volume: {
        unidades: ["l", "ml", "gal", "qt", "pt", "fl oz"],
        conversoes: {
            "l": { "ml": 1000, "gal": 0.264172, "qt": 1.05669, "pt": 2.11338, "fl oz": 33.814 },
            "ml": { "l": 0.001, "gal": 0.000264172, "qt": 0.00105669, "pt": 0.00211338, "fl oz": 0.033814 },
            "gal": { "l": 3.78541, "ml": 3785.41, "qt": 4, "pt": 8, "fl oz": 128 },
            "qt": { "l": 0.946353, "ml": 946.353, "gal": 0.25, "pt": 2, "fl oz": 32 },
            "pt": { "l": 0.473176, "ml": 473.176, "gal": 0.125, "qt": 0.5, "fl oz": 16 },
            "fl oz": { "l": 0.0295735, "ml": 29.5735, "gal": 0.0078125, "qt": 0.03125, "pt": 0.0625 }
        }
    },
    temperatura: {
        unidades: ["C", "F", "K"],
        conversoes: {
            // Funções de conversão (não são fatores como nos outros)
            "C": {
                "F": (valor) => (valor * 9/5) + 32,
                "K": (valor) => valor + 273.15
            },
            "F": {
                "C": (valor) => (valor - 32) * 5/9,
                "K": (valor) => (valor - 32) * 5/9 + 273.15
            },
            "K": {
                "C": (valor) => valor - 273.15,
                "F": (valor) => (valor - 273.15) * 9/5 + 32
            }
        }
    },
    area: {
            unidades: ["m2", "km2", "ha", "cm2", "mm2", "ft2", "in2", "ac", "mi2"],
            conversoes:{
                "m2":  {"km2": 0.000001, "ha": 0.0001, "cm2": 10000, "mm2": 1000000, "ft2": 10.7639, "in2": 1550, "ac": 0.000247105, "mi2": 3.86102e-7},
                "km2": {"m2":  1000000, "ha": 100, "cm2": 10000000000, "mm2": 1000000000000, "ft2": 10763910.4, "in2": 1550003100, "ac": 247.105, "mi2": 0.386102},
                "ha":  {"m2":  10000, "km2": 0.01, "cm2": 100000000, "mm2": 10000000000, "ft2": 107639, "in2": 15500031, "ac": 2.47105, "mi2": 0.00386102},
                "cm2": {"m2":  0.0001, "km2": 1e-10, "ha": 1e-8, "mm2": 100, "ft2": 0.00107639, "in2": 0.155, "ac": 2.47105e-8, "mi2": 3.86102e-11},
                "mm2": {"m2":  0.000001, "km2": 1e-12, "ha": 1e-10, "cm2": 0.01, "ft2": 0.0000107639, "in2": 0.00155, "ac": 2.47105e-10, "mi2": 3.86102e-13},
                "ft2": {"m2":  0.092903, "km2": 9.2903e-8, "ha": 9.2903e-6, "cm2": 929.03, "mm2": 92903, "in2": 144, "ac": 0.0000229568, "mi2": 3.587e-8},
                "in2": {"m2":  0.00064516, "km2": 6.4516e-10, "ha": 6.4516e-8, "cm2": 6.4516, "mm2": 645.16, "ft2": 0.00694444, "ac": 0.000001594, "mi2": 2.49098e-10},
                "ac":  {"m2":  4046.86, "km2": 0.00404686, "ha": 0.404686, "cm2": 40468600, "mm2": 4046860000, "ft2": 43560, "in2": 6272640, "mi2": 0.0015625},
                "mi2": {"m2":  2589990, "km2": 2.58999, "ha": 258.999, "cm2": 25899900000, "mm2": 2589990000000, "ft2": 27878400, "in2": 4014489600, "ac": 640}
            }
    },

    velocidade: {
        unidades: ["m/s", "km/h", "mph", "ft/s", "kn"],
        conversoes: {
            "m/s":  {"km/h": 3.6, "mph": 2.23694, "ft/s": 3.28084, "kn": 1.94384},
            "km/h": {"m/s": 0.277778, "mph": 0.621371, "ft/s": 0.911344, "kn": 0.539957},
            "mph":  {"m/s": 0.44704, "km/h": 1.60934, "ft/s": 1.46667, "kn": 0.868976},
            "ft/s":{"m/s": 0.3048, "km/h": 1.09728, "mph": 0.681818, "kn": 0.592484},
            "kn":   {"m/s": 0.514444, "km/h": 1.852, "mph": 1.15078, "ft/s": 1.68781}
        }
    },
    tempo: {
            unidades: ["s", "min", "h", "d", "wk", "mo", "y"],
            conversoes: {
                "s":   {"min": 0.0166667, "h": 0.000277778, "d": 1.15741e-5, "wk": 1.65344e-6, "mo": 3.80517e-7, "y": 3.17098e-8},
                "min": {"s": 60, "h": 0.0166667, "d": 0.000694444, "wk": 9.92063e-5, "mo": 0.000022831, "y": 0.000001902},
                "h":   {"s": 3600, "min": 60, "d": 0.0416667, "wk": 0.00595238, "mo": 0.00136986, "y": 0.00011415},
                "d":   {"s": 86400, "min": 1440, "h": 24, "wk": 0.142857, "mo": 0.0328767, "y": 0.00273973},
                "wk":  {"s": 604800, "min": 10080, "h": 168, "d": 7, "mo": 0.230137, "y": 0.0191781},
                "mo":  {"s": 2628000, "min": 43800, "h": 730, "d": 30.4167, "wk": 4.34524, "y": 0.0833333},
                "y":   {"s": 31536000, "min": 525600, "h": 8760, "d": 365, "wk": 52.1429, "mo": 12}

            }
     },
     dados:{
            unidades: ["b", "Kb", "Mb", "Gb", "Tb", "B", "KB", "MB", "GB", "TB" ],
            conversoes: {
                "b":   {"Kb":  0.000976563, "Mb":  9.53674e-7, "Gb":  9.31323e-10, "Tb":  9.09495e-13, "B":   0.125, "KB":  0.00012207, "MB":  1.19209e-7, "GB":  1.16415e-10, "TB":  1.13687e-13},
                "Kb":  {"b":   1024, "Mb":  0.000976563, "Gb":  9.53674e-7, "Tb":  9.31323e-10, "B":   128, "KB":  0.125, "MB":  0.00012207, "GB":  1.19209e-7, "TB":  1.16415e-10},
                "Mb":  {"b":   1048576, "Kb":  1024, "Gb":  0.000976563, "Tb":  9.53674e-7, "B":   131072, "KB":  128, "MB":  0.125, "GB":  0.00012207, "TB":  1.19209e-7},
                "Gb":  {"b":   1.07374e+9, "Kb":  1048576, "Mb":  1024, "Tb":  0.000976563, "B":   1.34218e+8, "KB":  131072, "MB":  128, "GB":  0.125, "TB":  0.00012207},
                "Tb":  {"b":   1.09951e+12, "Kb":  1.07374e+9, "Mb":  1048576, "Gb":  1024, "B":   1.37439e+11, "KB":  1.34218e+8, "MB":  131072, "GB":  128, "TB":  0.125},
                "B":   {"b":   8, "Kb":  0.0078125, "Mb":  7.62939e-6, "Gb":  7.45058e-9, "Tb":  7.27596e-12, "KB":  0.000976563, "MB":  9.53674e-7, "GB":  9.31323e-10, "TB":  9.09495e-13},
                "KB":  {"b":   8192, "Kb":  8, "Mb":  0.0078125, "Gb":  7.62939e-6, "Tb":  7.45058e-9, "B":   1024, "MB":  0.000976563, "GB":  9.53674e-7, "TB":  9.31323e-10},
                "MB":  {"b":   8388608, "Kb":  8192, "Mb":  8, "Gb":  0.0078125, "Tb":  7.62939e-6, "B":   1048576, "KB":  1024, "GB":  0.000976563, "TB":  9.53674e-7},
                "GB":  {"b":   8.58993e+9, "Kb":  8388608, "Mb":  8192, "Gb":  8, "Tb":  0.0078125, "B":   1.07374e+9, "KB":  1048576, "MB":  1024, "TB":  0.000976563},
                "TB":  {"b":   8.7961e+12, "Kb":  8.58993e+9, "Mb":  8388608, "Gb":  8192, "Tb":  8, "B":   1.09951e+12, "KB":  1.07374e+9, "MB":  1048576, "GB":  1024}
            }
     }
};


function atualizarUnidades() {
    const tipoSelecionado = document.getElementById("tipo").value;
    const unidades = unidadesDeMedida[tipoSelecionado].unidades;

    const selectDe = document.getElementById("unidade-de");
    const selectPara = document.getElementById("unidade-para");

    // Limpa os selects
    selectDe.innerHTML = "";
    selectPara.innerHTML = "";

    // Preenche os selects com as novas unidades
    for (const unidade of unidades) {
        const optionDe = document.createElement("option");
        optionDe.value = unidade;
        optionDe.textContent = unidade;
        selectDe.appendChild(optionDe);

        const optionPara = document.createElement("option");
        optionPara.value = unidade;
        optionPara.textContent = unidade;
        selectPara.appendChild(optionPara);
    }
}

function converter() {
    const tipo = document.getElementById("tipo").value;
    const valor = parseFloat(document.getElementById("valor").value);
    const unidadeDe = document.getElementById("unidade-de").value;
    const unidadePara = document.getElementById("unidade-para").value;

    // Verifica se o valor é um número válido
    if (isNaN(valor)) {
        document.getElementById("resultado").value = "Valor inválido";
        return;
    }

    let resultado;

    // Caso especial para temperatura (usa funções)
    if (tipo === "temperatura") {
        if (unidadeDe === unidadePara) {
            resultado = valor;
        } else {
            resultado = unidadesDeMedida[tipo].conversoes[unidadeDe][unidadePara](valor);
        }
    } else { // Outros tipos (usam fatores de conversão)
        if (unidadeDe === unidadePara) {
            resultado = valor;
        } else {
            // Converte para a unidade base primeiro (se necessário) e depois para a unidade de destino
             const fatorDe = unidadesDeMedida[tipo].conversoes[unidadeDe][unidadePara] !== undefined
                ? unidadesDeMedida[tipo].conversoes[unidadeDe][unidadePara]
                : 1;
            resultado = valor * fatorDe;
        }
    }

      // Formata e exibe o resultado
    document.getElementById("resultado").value = isNaN(resultado) ? "Erro na conversão" : resultado.toFixed(4);
}



// Inicializa as unidades quando a página carrega
atualizarUnidades();

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
})