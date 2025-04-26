
let synth = window.speechSynthesis;
let voices = [];

function populateVoices() {
  voices = synth.getVoices();
}

populateVoices();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoices;
}

function speak(text) {
  let utterance = new SpeechSynthesisUtterance(text);
  const userLang = navigator.language || navigator.userLanguage;
  
  if (userLang.startsWith('es')) {
    utterance.lang = 'es-ES';
    utterance.voice = voices.find(voice => voice.lang.startsWith('es'));
  } else {
    utterance.lang = 'en-US';
    utterance.voice = voices.find(voice => voice.lang.startsWith('en'));
  }

  synth.speak(utterance);
}

window.onload = () => {
  speak("¡Hola! Soy Clara, tu asesora inmobiliaria personal. Estoy aquí para ayudarte a encontrar la propiedad de tus sueños.");
}

document.getElementById('send-button').addEventListener('click', () => {
  let input = document.getElementById('user-input').value;
  if (input.trim() !== '') {
    document.getElementById('chat-log').innerHTML += `<div><strong>Tú:</strong> ${input}</div>`;
    generateClaraResponse(input);
    document.getElementById('user-input').value = '';
  }
});

function generateClaraResponse(userInput) {
  let response = "Gracias por tu consulta. En breve te enviaré más detalles.";
  document.getElementById('chat-log').innerHTML += `<div><strong>Clara:</strong> ${response}</div>`;
  speak(response);
}
