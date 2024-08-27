// Espera a que el documento esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
  // Obtiene referencias a los elementos
  const textArea1 = document.getElementById('textArea1');
  const textArea2 = document.getElementById('textArea2');
  const intercambiar = document.getElementById('intercambiar');
  const botonEncriptar = document.getElementById("botonEncriptar");
  const botonCopiar = document.getElementById("botonCopiar");

  // Inicializa el estado de los textareas
  textArea1.disabled = false; // Habilita textArea1 al inicio
  textArea2.disabled = true;   // Deshabilita textArea2 al inicio

  // Agrega un evento de clic a la imagen
  intercambiar.addEventListener('click', function() {
      // Intercambia el estado de los textareas
      textArea1.disabled = !textArea1.disabled;
      textArea2.disabled = !textArea2.disabled;
      textArea1.value = "";
      textArea2.value = "";
      textArea1.placeholder = textArea1.disabled ? "Esperando Resultado, da clic en Encriptar!!!" : "Ingresa aqui tu texto...";
      textArea2.placeholder = textArea2.disabled ? "Esperando Resultado, da clic en Encriptar!!!" : "Ingresa aqui tu texto...";
      botonEncriptar.textContent = !textArea1.disabled ? "Encriptar" : "Desencriptar";
  });
  //Expresion para validar minusculas y caracteres expeciales
  var regex = /^[a-z!\s]+$/;

  // Agrega un evento de clic al botón Encriptar
  botonEncriptar.addEventListener("click", function() {
    if (!textArea1.disabled) {
      const textoValido = textArea1.value;
      if (!regex.test(textoValido)) {
        alert('Por favor ingresa solo letras minusculas sin tildes ni caracteres especiales');
      }else{
        textArea2.value = encriptar(textArea1.value);
      }    
      
    } else {
      const textoValido = textArea2.value;
        if (!regex.test(textoValido)) {
          alert('Por favor ingresa solo letras minusculas sin tildes ni caracteres especiales');
        }else{
          textArea1.value = desencriptar(textArea2.value);
        }            
    }
  });

  botonCopiar.addEventListener("click", function() {
    var textToCopy;
    if (!textArea1.disabled) {
      textToCopy = textArea2.value;
     } else {
      textToCopy = textArea1.value;
     }
    navigator.clipboard.writeText(textToCopy);
    alert('Tu mensaje ha sido copiado: ' + textToCopy +' , Puedes usarlo desde el portapapeles');
  });




});

function encriptar (area1) {
  let arrayArea1 = [];
  arrayArea1 = area1.split('');
  for (let index = 0; index < arrayArea1.length; index++) {
    if (arrayArea1[index] == "e"){
      arrayArea1[index] = "enter";
    }
    if (arrayArea1[index] == "i"){
      arrayArea1[index] = "imes";
    }
    if (arrayArea1[index] == "a"){
      arrayArea1[index] = "ai";
    }
    if (arrayArea1[index] == "o"){
      arrayArea1[index] = "ober";
    }
    if (arrayArea1[index] == "u"){
      arrayArea1[index] = "ufat";
    }
  }
  return arrayArea1.join('');
}

function desencriptar(texto) {
  const reemplazos = [
    { original: "enter", reemplazo: "e" },
    { original: "imes", reemplazo: "i" },
    { original: "ai", reemplazo: "a" },
    { original: "ober", reemplazo: "o" },
    { original: "ufat", reemplazo: "u" }
  ];

  reemplazos.forEach(({ original, reemplazo }) => {
    texto = texto.replaceAll(original, reemplazo);
  });

  return texto;
}
