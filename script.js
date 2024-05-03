const quizData = [
    {
      question: 'What is the capital of France?',
      options: ['Paris', 'London', 'Berlin', 'Madrid'],
      answer: 'Paris',
    },
    {
      question: 'What is the largest planet in our solar system?',
      options: ['Mars', 'Saturn', 'Jupiter', 'Neptune'],
      answer: 'Jupiter',
    },
    {
      question: 'Which country won the FIFA World Cup in 2018?',
      options: ['Brazil', 'Germany', 'France', 'Argentina'],
      answer: 'France',
    },
    {
      question: 'What is the tallest mountain in the world?',
      options: ['Mount Everest', 'K2', 'Kangchenjunga', 'Makalu'],
      answer: 'Mount Everest',
    },
    {
      question: 'Which is the largest ocean on Earth?',
      options: [
        'Pacific Ocean',
        'Indian Ocean',
        'Atlantic Ocean',
        'Arctic Ocean',
      ],
      answer: 'Pacific Ocean',
    },
    {
      question: 'What is the chemical symbol for gold?',
      options: ['Au', 'Ag', 'Cu', 'Fe'],
      answer: 'Au',
    },
    {
      question: 'Who painted the Mona Lisa?',
      options: [
        'Pablo Picasso',
        'Vincent van Gogh',
        'Leonardo da Vinci',
        'Michelangelo',
      ],
      answer: 'Leonardo da Vinci',
    },
    {
      question: 'Which planet is known as the Red Planet?',
      options: ['Mars', 'Venus', 'Mercury', 'Uranus'],
      answer: 'Mars',
    },
    {
      question: 'What is the largest species of shark?',
      options: [
        'Great White Shark',
        'Whale Shark',
        'Tiger Shark',
        'Hammerhead Shark',
      ],
      answer: 'Whale Shark',
    },
    {
      question: 'Which animal is known as the King of the Jungle?',
      options: ['Lion', 'Tiger', 'Elephant', 'Giraffe'],
      answer: 'Lion',
    },
  ];
  const registrationForm = document.getElementById('registrationForm');
  const startButton = document.getElementById('register');
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const timerElement = document.getElementById('time');

  const showAnswerButton = document.getElementById('showAnswer');
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  let timeLeft = 10;
  let timerInterval;
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');
    const quizContainer = document.getElementById('quizContainer');
    const timerElement = document.getElementById('time');
  
    let currentQuestion = 0;
    let score = 0;
    let timeLeft = 10;
    let incorrectAnswers = [];
    let timerInterval;
    let quizStarted = false;
  
    registrationForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const formData = new FormData(registrationForm);
      fetch('connect.php', {
        method: 'POST',
        body: formData
      })
      .then(response => response.text())
      .then(data => {
        message.textContent = data; // Display response from server
      })
      .catch(error => {
        console.error('Error:', error);
      });
      const email = document.getElementById('email').value.trim();
      const studentID = document.getElementById('studentID').value.trim();
      if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
      }
      if (studentID === '') {
        alert('Please enter your student ID.');
        return;
      }
      registrationForm.style.display = 'none';
      quizContainer.style.display = 'block';
      if (!quizStarted) {
        startQuiz();
        quizStarted = true;
      }
    });
  
    function startQuiz() {
        displayQuestion();
        startTimer();
      }
  
    // Other functions (displayQuestion, startTimer, etc.) remain unchanged
  
    function validateEmail(email) {
      // Your email validation code
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
    }
  });
  
  
  function startQuiz() {
      startButton.style.display = 'none';
      quizContainer.style.display = 'block';
      displayQuestion();
      startTimer();

  }

  function displayQuestion() {
    
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
    startTimer(); 
    
  }
  function startTimer() {
    clearInterval(timerInterval); // Clear any existing timer
    timeLeft = 10; // Reset time to 10 seconds
    updateTimer();
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    timerElement.textContent = timeLeft;
    if (timeLeft === 0) {
        clearInterval(timerInterval);
        
        displayQuestion(currentQuestion++);

        checkAnswer('');
        
    } else {
        timeLeft--;
    }
}
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
  }
  startButton.addEventListener('click', startQuiz);

  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  
  displayQuestion();