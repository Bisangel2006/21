// Sincronizar las letras con la canción
var audio = document.querySelector("audio");
var lyrics = document.querySelector("#lyrics");

// Tiempos exactos (inicio y fin) sincronizados con Risk_all_for_you.mp3
var lyricsData = [
  { text: "For just the chance to win your heart", start: 20.3, end: 26.5 },
  { text: "You could set the bar beyond the stars", start: 26.5, end: 32.5 },
  { text: "I'll do anything", start: 32.5, end: 35.2 },
  { text: "Anything you ask me to", start: 35.2, end: 42.0 },
  { text: "Say you want the Moon", start: 42.5, end: 45.3 },
  { text: "Watch me learn to fly", start: 45.4, end: 48.0 },
  { text: "Ain't no mountain you could point to", start: 48.1, end: 51.5 },
  { text: "I wouldn't climb", start: 51.6, end: 53.8 },
  { text: "It's crazy, but it's true", start: 53.9, end: 56.8 },
  { text: "There's nothing I won't do", start: 56.9, end: 59.2 },
  { text: "I'd risk it all for you", start: 59.3, end: 65.5 },
  { text: "To hold your hand and call you mine", start: 65.8, end: 71.0 },
  { text: "I'm tryna be your man till the end of time", start: 71.1, end: 76.5 },
  { text: "Oh, I'll do anything", start: 76.6, end: 80.0 },
  { text: "Anything you ask me to", start: 80.1, end: 86.8 },
  { text: "I would run through a fire", start: 87.0, end: 90.2 },
  { text: "Just to be by your side", start: 90.3, end: 93.3 },
  { text: "If your heart's on the line", start: 93.4, end: 96.0 },
  { text: "You could take mine", start: 96.1, end: 98.4 },
  { text: "It's crazy, but it's true", start: 98.5, end: 101.2 },
  { text: "There's nothing I won't do", start: 101.3, end: 104.0 },
  { text: "I'd risk it all for you", start: 104.1, end: 110.5 },
  { text: "I would swim across the sea just to show you", start: 110.8, end: 116.5 },
  { text: "Sacrifice my life just to hold you", start: 116.6, end: 121.2 },
  { text: "I could go on and on", start: 121.3, end: 124.2 },
  { text: "To prove that you belong here in my arms", start: 124.3, end: 139.0 },
  { text: "Say you want the Moon", start: 153.8, end: 156.6 },
  { text: "Watch me learn to fly", start: 156.7, end: 159.8 },
  { text: "Ain't no mountain you could point to", start: 159.9, end: 163.0 },
  { text: "I wouldn't climb", start: 163.1, end: 165.2 },
  { text: "It's crazy, but it's true", start: 165.3, end: 168.0 },
  { text: "There's nothing I won't do", start: 168.1, end: 170.8 },
  { text: "I'd risk it all for you", start: 170.9, end: 176.6 },
  { text: "It's crazy, but it's true", start: 176.7, end: 179.3 },
  { text: "There's nothing I won't do", start: 179.4, end: 182.8 },
  { text: "I'd risk it all for you", start: 182.9, end: 198.0 }
];

// Animar las letras en tiempo real con el audio
audio.addEventListener("timeupdate", () => {
  var currentTime = audio.currentTime;
  var currentLine = lyricsData.find(
    (line) => currentTime >= line.start && currentTime <= line.end
  );

  if (currentLine) {
    lyrics.style.opacity = 1;
    lyrics.innerHTML = currentLine.text;
  } else {
    lyrics.style.opacity = 0;
    lyrics.innerHTML = "";
  }
});

// Función para ocultar el título después de 216 segundos
function ocultarTitulo() {
  var titulo = document.querySelector(".titulo");
  if (titulo) {
    titulo.style.animation = "fadeOut 3s ease-in-out forwards";
    setTimeout(function () {
      titulo.style.display = "none";
    }, 3000);
  }
}

// Llama a la función después de 216 segundos (216,000 milisegundos)
setTimeout(ocultarTitulo, 216000);