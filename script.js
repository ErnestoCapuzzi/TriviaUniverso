const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

let currentQuestionIndex = 0;
let score = 0;

// Preguntas del juego
const questions = [
  {
    question: "¿Qué fuerza invisible está arrastrando a nuestra galaxia a más de 2 millones de km/h?",
    answers: [
      { text: "El Gran Atractor", correct: true },
      { text: "Materia Oscura", correct: false },
      { text: "Agujero Negro Supermasivo", correct: false },
      { text: "Energía Oscura", correct: false },
    ],
    justification: "El Gran Atractor es una región masiva y misteriosa que ejerce una inmensa atracción gravitacional, pero sigue siendo un enigma para los científicos."
  },
  {
    question: "¿Qué porcentaje del universo es materia que podemos ver?",
    answers: [
      { text: "25%", correct: false },
      { text: "50%", correct: false },
      { text: "5%", correct: true },
      { text: "75%", correct: false },
    ],
    justification: "Solo el 5% del universo es materia visible. El resto está compuesto por materia oscura y energía oscura, que aún no comprendemos completamente."
  },
  {
    question: "¿Sabías que hay una lluvia de diamantes en algunos planetas?",
    answers: [
      { text: "Sí, en Marte y Venus", correct: false },
      { text: "Sí, en Júpiter y Saturno", correct: true },
      { text: "No, eso es un mito", correct: false },
      { text: "Sí, pero solo en exoplanetas", correct: false },
    ],
    justification: "En planetas como Júpiter y Saturno, las altas presiones convierten el carbono en cristales de diamante, lo que crea lluvias de diamantes en sus atmósferas superiores. Este fenómeno es posible gracias a las intensas condiciones gravitacionales y químicas en esos gigantes gaseosos. Un espectáculo verdaderamente fuera de este mundo"
  },
  {
    question: "Si el universo es infinito, ¿por qué el cielo no está lleno de luz?",
    answers: [
      { text: "Porque el universo se expande", correct: true },
      { text: "Porque no hay suficientes estrellas", correct: false },
      { text: "Porque la luz no puede viajar al infinito", correct: false },
      { text: "Porque la materia oscura bloquea la luz", correct: false },
    ],
    justification: "Aunque el universo tiene infinitas estrellas, su luz no nos alcanza debido a la expansión del universo y a que muchas están fuera de nuestro horizonte observable."
  },
  {
    question: "¿Dónde dura un día más que un año?",
    answers: [
      { text: "Urano", correct: false },
      { text: "Neptuno", correct: false },
      { text: "Venus", correct: true },
      { text: "Teegarden b", correct: false },
    ],
    justification: "Venus tarda más en girar sobre su eje (un día) que en completar una órbita alrededor del Sol (un año). ¡Un día ahi dura 243 días terrestres!."
  },
  {
    question: "¿Qué pasará cuando el universo deje de expandirse?",
    answers: [
      { text: "El tiempo se detendrá", correct: false },
      { text: "No pasará nada", correct: false },
      { text: "Se llenará de estrellas", correct: false },
      { text: "Podría colapsar o morir congelado", correct: true },
    ],
    justification: "Las teorías sugieren que el universo podría contraerse en un Big Crunch o expandirse indefinidamente hasta un Big Freeze."
  },
  {
    question: "¿Qué son los púlsares?",
    answers: [
      { text: "Estrellas muertas que emiten radiación periódica", correct: true },
      { text: "Agujeros negros pequeños", correct: false },
      { text: "Planetas giratorios rápidos", correct: false },
      { text: "Estrellas que giran al revés", correct: false },
    ],
    justification: "Los púlsares son restos de supernovas que emiten pulsos regulares de radiación mientras giran rápidamente sobre su eje. Las famosas estrellas que parpadean."
  },
  {
    question: "¿Qué causa las fases de la Luna?",
    answers: [
      
      { text: "La sombra de la Tierra", correct: false },
      { text: "La rotación de la Luna", correct: false },
      { text: "La posición de la Luna respecto al Sol", correct: true },
      { text: "El brillo de las estrellas", correct: false },
    ],
    justification: "Las fases de la Luna se deben a cómo la luz del Sol ilumina diferentes partes de la Luna, dependiendo de su posición relativa con la Tierra."
  },
  {
    question: "¿Qué ocurre con el tiempo cerca de un agujero negro?",
    answers: [
      { text: "El tiempo se detiene", correct: true },
      { text: "El tiempo se acelera", correct: false },
      { text: "El tiempo no se ve afectado", correct: false },
      { text: "El tiempo se invierte", correct: false },
    ],
    justification: "Cerca de un agujero negro, la gravedad es tan intensa que el tiempo prácticamente se detiene para un observador externo. Este fenómeno, conocido como dilatación gravitacional del tiempo, ocurre porque la enorme gravedad curva el espacio-tiempo de manera extrema. Desde la perspectiva de alguien lejos del agujero negro, cualquier objeto que se acerque parece ralentizarse hasta detenerse."
  },
  {
    question: "¿Qué porcentaje de los átomos de tu cuerpo provienen de estrellas que murieron hace miles de millones de años?",
    answers: [
      { text: "50%", correct: false },
      { text: "100%", correct: true },
      { text: "75%", correct: false },
      { text: "25%", correct: false },
    ],
    justification: "¡Todos los átomos de tu cuerpo son polvo de estrellas! Los elementos pesados como el carbono, el oxígeno y el hierro se forman en el núcleo de las estrellas y se liberan al espacio cuando estas explotan como supernovas. Cada parte de ti proviene de esas explosiones cósmicas."
  },
];

// Eventos
startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    setNextQuestion();
  } else {
    endGame();
  }
});

// Iniciar el juego
function startGame() {
  startButton.classList.add('hide');
  questionContainer.classList.remove('hide');
  currentQuestionIndex = 0;
  score = 0;
  setNextQuestion();
}

// Configurar la siguiente pregunta
function setNextQuestion() {
  resetState();
  showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

// Resetear el estado entre preguntas
function resetState() {
  nextButton.classList.add('hide');
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

// Selección de respuesta
function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct === 'true';
  const justification = questions[currentQuestionIndex].justification;

  // Efecto en el portal
  triggerPortalEffect(correct);

  // Resaltar respuestas
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct === 'true');
  });

  showPopup(correct, correct ? "¡Correcto! Muy bien." : "Incorrecto. Pero ganaste un conocimiento nvo :).", justification
  );
  if (correct) {
    score++;
  }
  nextButton.classList.remove('hide');
}

// Cambiar clases según el estado
function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}

// Limpiar clases de estado
function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}

// Función para mostrar el popup
function showPopup(correct, message,justification) {
  const popup = document.createElement('div');
  popup.classList.add('popup', 'show');

  popup.innerHTML = `
    <div class="popup-content">
      <h3>${correct ? "¡Respuesta Correcta!" : "Respuesta Incorrecta"}</h3>
      <p>${message}</p>
      <p class="justification">${justification}</p>
      <button class="btn close-popup">Cerrar</button>
    </div>
  `;

  document.body.appendChild(popup);

  // Botón de cierre del popup
  const closeButton = popup.querySelector('.close-popup');
  closeButton.addEventListener('click', () => {
    popup.classList.remove('show');
    setTimeout(() => popup.remove(), 500); // Eliminar después de la animación
  });
}

function triggerPortalEffect(correct) {
    const portal = document.querySelector('.portal');
    const color = correct ? '#00ff00' : '#ff0000';
    portal.style.boxShadow = `0 0 40px ${color}, 0 0 80px ${color}`;
    portal.style.transform = 'scale(1.2)'; // Efecto de expansión
  
    setTimeout(() => {
      portal.style.boxShadow = '';
      portal.style.transform = 'scale(1)';
    }, 500);
  }
  

// Finalizar el juego
function endGame() {
  questionContainer.classList.add('hide');
  const resultContainer = document.getElementById('result-container');
  resultContainer.classList.remove('hide');
  const finalScore = document.getElementById('final-score');
  finalScore.innerText = `Puntaje Final: ${score}`;
}

// Generar partículas rotatorias
let particleCount = 0;
const maxParticles = 50; // Máximo de partículas permitidas

function generateRotatingParticles() {
  const portal = document.querySelector('.portal');

  if (particleCount >= maxParticles) return; // Limitar el número de partículas

  for (let i = 0; i < 15; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particleCount++;

    const angle = (Math.random() * 360) * (Math.PI / 180);
    const radius = Math.random() * 100 + 50;

    particle.style.position = 'absolute';
    particle.style.width = '5px';
    particle.style.height = '5px';
    particle.style.borderRadius = '50%';
    particle.style.background = 'rgba(255, 255, 255, 0.8)';
    particle.style.animation = `rotate ${Math.random() * 5 + 3}s linear infinite`;

    const x = Math.cos(angle) * radius + portal.offsetWidth / 2;
    const y = Math.sin(angle) * radius + portal.offsetHeight / 2;

    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;

    portal.appendChild(particle);

    setTimeout(() => {
      particle.remove();
      particleCount--;
    }, 6000);
  }
}


// Generar partículas periódicamente
setInterval(generateRotatingParticles, 2000);
