// Módulo de encriptación
const Encriptador = (() => {
    const textArea = document.querySelector(".text-area");
    const mensaje = document.querySelector(".mensaje");

    const matizCodigo = [
        ["e", "enter"],
        ["i", "imes"],
        ["a", "ai"],
        ["o", "ober"],
        ["u", "ufat"]
    ];

    // Elimina tildes y caracteres especiales, dejando solo letras minúsculas y espacios
    const limpiarTexto = (texto) =>
        texto
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z\sñ]/g, "")
            .replace(/ñ/g, "n");

    // Encripta el texto usando la matriz de códigos
    const encriptar = (texto) =>
        matizCodigo.reduce((acc, [letra, codigo]) => acc.replaceAll(letra, codigo), limpiarTexto(texto));

    // Desencripta el texto usando la matriz de códigos
    const desencriptar = (texto) =>
        matizCodigo.reduce((acc, [letra, codigo]) => acc.replaceAll(codigo, letra), limpiarTexto(texto));

    // Maneja la validación de la entrada del usuario
    const validarEntrada = (evento) => {
        const tecla = evento.key;
        if (evento.ctrlKey || evento.altKey || evento.metaKey || tecla.length > 1 || !/^[a-z\sñ]$/.test(tecla)) {
            evento.preventDefault();
        }
    };

    // Maneja el pegado de texto en el área de texto
    const procesarPegado = (evento) => {
        evento.preventDefault();
        const textoPegado = (evento.clipboardData || window.clipboardData).getData("text");
        const textoFiltrado = limpiarTexto(textoPegado);
        document.execCommand("insertText", false, textoFiltrado);
    };

    // Maneja el proceso de encriptación
    const btnEncriptar = () => {
        mensaje.value = encriptar(textArea.value);
        textArea.value = "";
        mensaje.style.backgroundImage = "none";
    };

    // Maneja el proceso de desencriptación
    const btnDesencriptar = () => {
        mensaje.value = desencriptar(textArea.value);
        textArea.value = "";
        mensaje.style.backgroundImage = "none";
    };

    // Copia el texto encriptado/desencriptado al portapapeles
    const copiarTexto = () => {
        const textoCopiado = mensaje.value;
        navigator.clipboard.writeText(textoCopiado).then(() => {
            mensaje.value = "";
            alert("Texto copiado al portapapeles!");
        }).catch(err => {
            console.error("Error al copiar el texto: ", err);
        });
    };

    // Inicializa los eventos
    const init = () => {
        textArea.addEventListener("keydown", validarEntrada);
        textArea.addEventListener("paste", procesarPegado);
        document.querySelector(".btn-encriptar").addEventListener("click", btnEncriptar);
        document.querySelector(".btn-desencriptar").addEventListener("click", btnDesencriptar);
        document.querySelector(".btn-copiar").addEventListener("click", copiarTexto);
    };

    // Exponemos solo lo necesario
    return {
        init
    };
})();

// Inicialización del módulo de encriptación
document.addEventListener("DOMContentLoaded", Encriptador.init);
