document.querySelectorAll('.nav-details a').forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const topic = event.target.getAttribute('data-topic');
        localStorage.setItem('selectedTopic', topic);
        showQuiz(topic);
    });
});  //When you click on a topic link in the navigation, it stops the page from jumping to a new URL. It saves the selected topic in your browser's storage and starts the quiz for that topic.


//getiing questions from api
const API_TOKEN = 'yzFMKVEJvTAem0KzqcGFKgd1NxeGoT9koTtQMyQp';
const BASE_URL = 'https://quizapi.io/api/v1/questions';
let questions = [];
let currentQuestionIndex = 0;
let selectedAnswers = [];

async function fetchQuizQuestions(topic, limit = 10) {
    const url = `${BASE_URL}?apiKey=${API_TOKEN}&category=${topic}&limit=${limit}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('API response data:', data); // Debugging: log the response data
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        return [];
    }
}


//showing quiz questions
async function showQuiz(topic) {
    document.querySelector('.title').style.display = 'none';
    document.querySelector('.enter').style.display = 'none';

    // Fetch questions from QuizAPI
    questions = await fetchQuizQuestions(topic);

    if (!questions || questions.length === 0) {
        alert('No questions found for this topic.');
        return;
    }

    const quizSection = document.getElementById('quiz-section');
    quizSection.innerHTML = `
        <div class="quiz-container">
            <a class="exitbtn" href="#">Exit Quiz</a>
            <div class="quiz-header">
                <h2>Quiz for ${topic}</h2>
                <div class="progress-container">
                    <div class="progress-bar" id="progress-bar"></div>
                </div>
            </div>
            <div class="quiz-body">
                <div class="quiz-question" id="quiz-question"></div>
                <ul class="quiz-options" id="quiz-options"></ul>
            </div>
            <div class="quiz-footer">
                <a class="prevbtn" href="#" style="display: none;">Previous</a>
                <a class="nextbtn" href="#" style="display: none;">Next</a>
                <a class="submitbtn" href="#" style="display: none;">Submit</a>
                <a class="resultbtn" href="#" style="display: none;">Show Results</a>
            </div>
        </div>`;
    quizSection.style.display = 'block';
    attachOptionListeners();
    attachExitListener();
    currentQuestionIndex = 0;
    selectedAnswers = new Array(questions.length).fill(null);
    showQuestion(currentQuestionIndex);
}


//marks the selected answer
function attachOptionListeners() {
    document.querySelectorAll('.quiz-options li').forEach(option => {
        option.addEventListener('click', () => {
            document.querySelectorAll('.quiz-options li').forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            selectedAnswers[currentQuestionIndex] = Array.from(option.parentElement.children).indexOf(option);
        });
    });
}


//when clicked in exit , returns to home menu.
function attachExitListener() {
    document.querySelector('.exitbtn').addEventListener('click', (event) => {
        event.preventDefault();
        document.querySelector('.title').style.display = 'block';
        document.querySelector('.enter').style.display = 'block';
        document.getElementById('quiz-section').style.display = 'none';
    });
}


function showQuestion(index) {
    const questionData = questions[index];
    document.getElementById('quiz-question').textContent = questionData.question;
    const optionsContainer = document.getElementById('quiz-options');
    optionsContainer.innerHTML = '';
    Object.values(questionData.answers).forEach((option, i) => {
        if (option) { 
            const li = document.createElement('li');
            li.textContent = option;
            if (selectedAnswers[index] === i) {
                li.classList.add('selected');
            }
            optionsContainer.appendChild(li);
        }
    });
    updateProgressBar();
    attachOptionListeners();
    updateNavigationButtons();
}

function updateNavigationButtons() {
    document.querySelector('.prevbtn').style.display = currentQuestionIndex > 0 ? 'inline-block' : 'none';
    document.querySelector('.nextbtn').style.display = currentQuestionIndex < questions.length - 1 ? 'inline-block' : 'none';
    document.querySelector('.submitbtn').style.display = currentQuestionIndex === questions.length - 1 ? 'inline-block' : 'none';
    document.querySelector('.resultbtn').style.display = 'none';
}

function updateProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}


// Handles clicks on navigation buttons. It moves to the previous or next question, shows the results, or detailed results when clicked.
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('prevbtn')) {
        event.preventDefault();
        currentQuestionIndex--;
        showQuestion(currentQuestionIndex);
    } else if (event.target.classList.contains('nextbtn')) {
        event.preventDefault();
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
    } else if (event.target.classList.contains('submitbtn')) {
        event.preventDefault();
        document.querySelector('.resultbtn').style.display = 'inline-block';
        showResults();
    } else if (event.target.classList.contains('resultbtn')) {
        event.preventDefault();
        showDetailedResults();
    }
});

function showResults() {
    const quizSection = document.getElementById('quiz-section');
    let score = 0;
    questions.forEach((question, index) => {
        const correctIndex = Object.values(question.correct_answers).findIndex(val => val === "true");
        if (selectedAnswers[index] === correctIndex) {
            score++;
        }
    });

    quizSection.innerHTML = `
        <div class="quiz-container">
            <div class="quiz-header">
                <h2>Results</h2>
            </div>
            <div class="quiz-body">
                <div class="quiz-question">You scored ${score} out of ${questions.length}</div>
                <a class="resultbtn" href="#">Show Detailed Results</a>
            </div>
            <div class="quiz-footer"></div>
        </div>`;
    attachExitListener(); 
}

function showDetailedResults() {
    const quizSection = document.getElementById('quiz-section');
    let detailedResultsHTML = '';

    questions.forEach((question, index) => {
        const correctIndex = Object.values(question.correct_answers).findIndex(val => val === "true");
        detailedResultsHTML += `
            <div class="quiz-container">
                <div class="quiz-header">
                    <h2>${question.question}</h2>
                </div>
                <div class="quiz-body">
                    <ul class="quiz-options">
                        ${Object.values(question.answers).map((option, i) => `
                            <li class="${i === correctIndex ? 'correct' : i === selectedAnswers[index] ? 'wrong' : ''}">
                                ${option}
                            </li>
                        `).join('')}
                    </ul>
                    <div class="explanation">
                        <p>${question.explanation || ''}</p>
                    </div>
                </div>
            </div>`;
    });

    quizSection.innerHTML = detailedResultsHTML;
    attachExitListener(); 
}


// for contaact and join us 

document.addEventListener('DOMContentLoaded', function() {
    const contactButton = document.getElementById('contactButton');
    const joinButton = document.getElementById('joinButton');
    const contactForm = document.getElementById('contactForm');
    const joinForm = document.getElementById('joinForm');
  
    // Show contact form by default
    contactForm.style.display = 'block';
  
    // Event listener for contact button
    contactButton.addEventListener('click', function() {
      contactForm.style.display = 'block';
      joinForm.style.display = 'none';
    });
  
    // Event listener for join button
    joinButton.addEventListener('click', function() {
      contactForm.style.display = 'none';
      joinForm.style.display = 'block';
    });
  });



//   for courses 

document.addEventListener('DOMContentLoaded', function() {
    const topicsNav = document.getElementById('topicsNav');
    const topicsContent = document.getElementById('topicsContent');
    
    const topics = {
        semester1: [
            { title: 'Mathematics', badge: 14, description: 'Introduction to Calculus', image: '/images/courses/maths1.jpg' },
            { title: 'Physics', badge: 75, description: 'Schrodinger\'s equation xa tara cat xaina.', image: '/images/courses/physics-1.jpg' },
            { title: 'C-Programming', badge: 100, description: 'Basic Concepts in programming', image: '/images/courses/cprogramming-1.jpg' },
            { title: 'Digital Logic', badge: 50, description: 'Introduction to 0 and 1', image: '/images/courses/digitallogic-1.jpg' },
            { title: 'Introduction to Information Technology', badge: 30, description: 'Title says all.', image: '/images/courses/iit-1.gif' }
        ],
        semester2: [
            { title: 'Advanced Mathematics', badge: 20, description: 'Linear Algebra and Differential Equations', image: '/images/courses/advanced_math.jpg' },
            { title: 'Thermodynamics', badge: 45, description: 'Principles of Thermodynamics', image: '/images/courses/thermodynamics.jpg' },
            { title: 'Organic Chemistry', badge: 60, description: 'Introduction to Organic Chemistry', image: '/images/courses/organic_chemistry.jpg' },
            { title: 'Data Structures', badge: 55, description: 'Fundamentals of Data Structures', image: '/images/courses/data_structures.jpg' },
            { title: 'Communication Skills', badge: 40, description: 'Effective Communication Techniques', image: '/images/courses/communication_skills.jpg' }
        ],
        semester3: [
            { title: 'Discrete Mathematics', badge: 25, description: 'Theory of Computation and Graph Theory', image: '/images/courses/discrete_math.jpg' }
        ]
    };
    
    function renderContent(topic) {
        topicsContent.innerHTML = '';
        topics[topic].forEach(course => {
            const courseElement = document.createElement('div');
            courseElement.className = 'col-md-4 mb-4';
            courseElement.innerHTML = `
                <div class="card h-100">
                    <div class="img-container">
                        <img src="${course.image}" alt="${course.title}" class="img-fluid">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${course.title} <span class="badge float-end">${course.badge}</span></h5>
                        <p class="card-text">${course.description}</p>
                    </div>
                </div>
            `;
            topicsContent.appendChild(courseElement);
        });
    }
    
    topicsNav.addEventListener('click', function(event) {
        if (event.target.classList.contains('courseko-nav-link')) {
            event.preventDefault(); // Prevent default anchor click behavior

            const activeLink = document.querySelector('.courseko-nav-link.active');
            if (activeLink) activeLink.classList.remove('active');
            event.target.classList.add('active');
            renderContent(event.target.getAttribute('data-topic'));
        }
    });
    
    renderContent('semester1'); // Default topic
});


   
  

